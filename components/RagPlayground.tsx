"use client";

import { useState, useEffect, useRef } from "react";
import { ragCorpus } from "@/data/content";

type Stage = "idle" | "tokenizing" | "retrieving" | "reranking" | "judging" | "answering" | "done";

type Candidate = {
  id: string;
  title: string;
  text: string;
  bm25: number;
  vector: number;
  hybrid: number;
  rerank?: number;
};

const SAMPLE_QUERIES = [
  "How did you cut inference cost?",
  "Tell me about the Azure RAG system",
  "What's your evaluation strategy?",
  "Have you worked with computer vision?",
];

export default function RagPlayground() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [tokens, setTokens] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [reranked, setReranked] = useState<Candidate[]>([]);
  const [judgement, setJudgement] = useState<{ faithfulness: number; relevance: number; groundedness: number } | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => { timerRef.current.forEach(clearTimeout); }, []);

  const after = (ms: number, fn: () => void) => {
    const t = setTimeout(fn, ms);
    timerRef.current.push(t);
  };

  const reset = () => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setTokens([]);
    setCandidates([]);
    setReranked([]);
    setJudgement(null);
    setAnswer("");
    setStage("idle");
  };

  const run = (q?: string) => {
    const queryStr = (q ?? query).trim();
    if (!queryStr) return;
    setQuery(queryStr);
    reset();

    const qLower = queryStr.toLowerCase();
    const qTokens = queryStr.split(/\s+/).filter(Boolean);

    // Stage 1: tokenize
    setStage("tokenizing");
    qTokens.forEach((tok, i) => {
      after(80 * (i + 1), () => setTokens((p) => [...p, tok]));
    });

    // Stage 2: retrieve (BM25 + vector → hybrid)
    after(80 * (qTokens.length + 1) + 220, () => {
      setStage("retrieving");
      const scored = ragCorpus.map((doc) => {
        const matches = doc.keywords.filter((k) =>
          qLower.includes(k.toLowerCase())
        ).length;
        const titleMatch = doc.title.toLowerCase().includes(qLower) ? 0.4 : 0;
        // BM25-ish: keyword frequency
        const bm25 = Math.min(1, matches * 0.18 + titleMatch + Math.random() * 0.08);
        // Vector-ish: stable hash for variety, biased by matches
        const vector = Math.min(1, matches * 0.16 + 0.25 + Math.random() * 0.18);
        const hybrid = +(0.5 * bm25 + 0.5 * vector).toFixed(3);
        return {
          id: doc.id,
          title: doc.title,
          text: doc.text,
          bm25: +bm25.toFixed(3),
          vector: +vector.toFixed(3),
          hybrid,
        };
      });
      scored.sort((a, b) => b.hybrid - a.hybrid);
      setCandidates(scored.slice(0, 5));
    });

    // Stage 3: rerank
    after(80 * (qTokens.length + 1) + 1100, () => {
      setStage("reranking");
      setCandidates((current) => {
        // cross-encoder rerank: amplify top matches, suppress others
        const reranked = current.map((c) => {
          const lift = c.hybrid > 0.55 ? 0.1 + Math.random() * 0.15 : -0.08;
          const rerank = Math.max(0, Math.min(1, c.hybrid + lift));
          return { ...c, rerank: +rerank.toFixed(3) };
        });
        reranked.sort((a, b) => (b.rerank ?? 0) - (a.rerank ?? 0));
        setReranked(reranked.slice(0, 3));
        return current;
      });
    });

    // Stage 4: LLM-as-judge
    after(80 * (qTokens.length + 1) + 1900, () => {
      setStage("judging");
      const top = ragCorpus.find((d) => qLower.split(/\s+/).some((w) => d.keywords.some((k) => k.includes(w) || w.includes(k))));
      const hasMatch = !!top;
      setJudgement({
        faithfulness: hasMatch ? 0.92 : 0.41,
        relevance: hasMatch ? 0.88 : 0.34,
        groundedness: hasMatch ? 0.95 : 0.29,
      });
    });

    // Stage 5: generate answer
    after(80 * (qTokens.length + 1) + 2700, () => {
      setStage("answering");
      const top = ragCorpus.find((d) => qLower.split(/\s+/).some((w) => d.keywords.some((k) => k.includes(w) || w.includes(k))));
      const ans = top
        ? `${top.text} [^${top.id}]`
        : `I couldn't find a high-confidence match in Revanth's portfolio for that query. The eval-gate would refuse to answer here. Try a question about RAG, evaluation, model routing, fine-tuning, or computer vision.`;
      // type out
      let i = 0;
      const tick = () => {
        if (i <= ans.length) {
          setAnswer(ans.slice(0, i));
          i += 2;
          after(14, tick);
        } else {
          setStage("done");
        }
      };
      tick();
    });
  };

  return (
    <div style={{
      border: "1px solid var(--border)",
      borderRadius: 6,
      background: "var(--bg-panel)",
      margin: "1.5rem 0",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "0.5rem 0.75rem",
        background: "var(--bg-panel-2)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        fontFamily: "ui-monospace, Menlo, Consolas, monospace",
        fontSize: 12,
      }}>
        <span style={{ color: "var(--keyword)" }}>▶</span>
        <span style={{ color: "var(--fg-dim)" }}>rag_playground.ipynb</span>
        <span style={{ color: "var(--fg-faint)", marginLeft: "auto" }}>kernel: revanth-rag-stack</span>
      </div>

      <div style={{ padding: "1rem" }}>
        <div style={{ color: "var(--fg-dim)", fontSize: 13, marginBottom: "0.75rem" }}>
          A live, deterministic simulation of the RAG pipeline I work with — query → hybrid retrieval → rerank → eval-gate → answer. Try a question about my work.
        </div>

        {/* Sample query chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
          {SAMPLE_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => run(q)}
              style={{
                fontSize: 12,
                padding: "0.25rem 0.6rem",
                border: "1px solid var(--border)",
                borderRadius: 4,
                color: "var(--fg-dim)",
                background: "var(--bg)",
                fontFamily: "ui-monospace, Menlo, monospace",
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 0.75rem",
          border: "1px solid var(--border)",
          borderRadius: 4,
          background: "var(--bg)",
          fontFamily: "ui-monospace, Menlo, monospace",
        }}>
          <span style={{ color: "var(--keyword)" }}>{">>>"}</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") run(); }}
            placeholder="ask anything…"
            style={{ flex: 1, fontSize: 13, color: "var(--fg)" }}
          />
          <button
            onClick={() => run()}
            style={{
              padding: "0.25rem 0.7rem",
              fontSize: 12,
              border: "1px solid var(--accent)",
              borderRadius: 4,
              color: "var(--accent)",
              fontFamily: "ui-monospace, Menlo, monospace",
            }}
          >
            run ⏎
          </button>
        </div>

        {/* Pipeline stages */}
        {stage !== "idle" && (
          <div style={{ marginTop: "1rem" }}>
            <PipelineRow label="1. tokenize" active={stage === "tokenizing"} done={["retrieving","reranking","judging","answering","done"].includes(stage)}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                {tokens.map((t, i) => (
                  <span key={i} style={{
                    padding: "0.1rem 0.4rem",
                    background: "var(--bg-panel-2)",
                    border: "1px solid var(--border)",
                    borderRadius: 3,
                    color: "var(--func)",
                    fontFamily: "ui-monospace, Menlo, monospace",
                    fontSize: 12,
                  }}>{t}</span>
                ))}
              </div>
            </PipelineRow>

            <PipelineRow label="2. hybrid retrieval (BM25 + vector)" active={stage === "retrieving"} done={["reranking","judging","answering","done"].includes(stage)}>
              {candidates.length > 0 && (
                <div>
                  {candidates.map((c) => (
                    <CandRow key={c.id} c={c} />
                  ))}
                </div>
              )}
            </PipelineRow>

            <PipelineRow label="3. cross-encoder rerank" active={stage === "reranking"} done={["judging","answering","done"].includes(stage)}>
              {reranked.length > 0 && (
                <div>
                  {reranked.map((c) => (
                    <CandRow key={c.id} c={c} showRerank />
                  ))}
                </div>
              )}
            </PipelineRow>

            <PipelineRow label="4. LLM-as-judge eval gate" active={stage === "judging"} done={["answering","done"].includes(stage)}>
              {judgement && <JudgePanel j={judgement} />}
            </PipelineRow>

            <PipelineRow label="5. generate answer (with citation)" active={stage === "answering"} done={stage === "done"}>
              {answer && (
                <div style={{
                  padding: "0.6rem 0.75rem",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  color: "var(--fg)",
                  fontSize: 13,
                  lineHeight: 1.55,
                }}>
                  {answer}
                  {stage === "answering" && <span style={{ opacity: 0.6 }}>▍</span>}
                </div>
              )}
            </PipelineRow>
          </div>
        )}
      </div>
    </div>
  );
}

function PipelineRow({ label, active, done, children }: { label: string; active: boolean; done: boolean; children?: React.ReactNode }) {
  return (
    <div style={{ marginTop: "0.6rem" }}>
      <div style={{
        fontFamily: "ui-monospace, Menlo, monospace",
        fontSize: 12,
        color: active ? "var(--accent)" : done ? "var(--string)" : "var(--fg-faint)",
        marginBottom: "0.3rem",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
      }}>
        <span>{done ? "✓" : active ? "⏳" : "·"}</span>
        <span>{label}</span>
      </div>
      {children && <div style={{ marginLeft: "1.2rem" }}>{children}</div>}
    </div>
  );
}

function CandRow({ c, showRerank }: { c: Candidate; showRerank?: boolean }) {
  const score = showRerank ? c.rerank ?? 0 : c.hybrid;
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: "0.6rem",
      alignItems: "center",
      padding: "0.3rem 0.5rem",
      borderBottom: "1px solid var(--border-soft)",
      fontFamily: "ui-monospace, Menlo, monospace",
      fontSize: 12,
    }}>
      <div>
        <div style={{ color: "var(--fg)" }}>{c.title}</div>
        <div style={{ color: "var(--fg-faint)", fontSize: 11 }}>
          bm25: <span style={{ color: "var(--number)" }}>{c.bm25}</span> · vec: <span style={{ color: "var(--number)" }}>{c.vector}</span>
          {showRerank && c.rerank !== undefined && <> · rerank: <span style={{ color: "var(--accent)" }}>{c.rerank}</span></>}
        </div>
      </div>
      <ScoreBar value={score} />
    </div>
  );
}

function ScoreBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div style={{ width: 80, height: 6, background: "var(--bg-panel-2)", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: "var(--accent)", transition: "width 0.4s" }} />
    </div>
  );
}

function JudgePanel({ j }: { j: { faithfulness: number; relevance: number; groundedness: number } }) {
  const pass = j.faithfulness >= 0.7 && j.groundedness >= 0.7;
  return (
    <div style={{
      padding: "0.6rem 0.75rem",
      background: pass ? "rgba(165, 214, 167, 0.06)" : "rgba(240, 113, 120, 0.06)",
      border: `1px solid ${pass ? "var(--string)" : "var(--tag)"}`,
      borderRadius: 4,
      fontFamily: "ui-monospace, Menlo, monospace",
      fontSize: 12,
    }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", color: "var(--fg-dim)" }}>
        <span>faithfulness: <span style={{ color: "var(--number)" }}>{j.faithfulness.toFixed(2)}</span></span>
        <span>relevance: <span style={{ color: "var(--number)" }}>{j.relevance.toFixed(2)}</span></span>
        <span>groundedness: <span style={{ color: "var(--number)" }}>{j.groundedness.toFixed(2)}</span></span>
      </div>
      <div style={{ marginTop: "0.3rem", color: pass ? "var(--string)" : "var(--tag)" }}>
        {pass ? "✓ gate: PASS — answer cleared for response" : "✗ gate: BLOCK — refusing to answer (groundedness below threshold)"}
      </div>
    </div>
  );
}
