"use client";

import { useState, useEffect, useRef } from "react";
import { ragCorpus } from "@/data/content";

type Stage = "idle" | "tokenizing" | "retrieving" | "reranking" | "judging" | "answering" | "done";

type Candidate = {
  id: string;
  title: string;
  text: string;
  keywordScore: number;
  meaningScore: number;
  combined: number;
  finalScore?: number;
};

const SAMPLE_QUERIES = [
  "How did you cut inference cost?",
  "Tell me about the Azure HR project",
  "What's your evaluation strategy?",
  "Have you worked with computer vision?",
];

export default function RagDemo() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [tokens, setTokens] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [reranked, setReranked] = useState<Candidate[]>([]);
  const [judgement, setJudgement] = useState<{ trust: number; relevance: number; grounded: number } | null>(null);
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

    setStage("tokenizing");
    qTokens.forEach((tok, i) => {
      after(70 * (i + 1), () => setTokens((p) => [...p, tok]));
    });

    after(70 * (qTokens.length + 1) + 250, () => {
      setStage("retrieving");
      const scored = ragCorpus.map((doc) => {
        const matches = doc.keywords.filter((k) =>
          qLower.includes(k.toLowerCase())
        ).length;
        const titleMatch = doc.title.toLowerCase().includes(qLower) ? 0.4 : 0;
        const keywordScore = Math.min(1, matches * 0.18 + titleMatch + Math.random() * 0.07);
        const meaningScore = Math.min(1, matches * 0.16 + 0.25 + Math.random() * 0.16);
        const combined = +(0.5 * keywordScore + 0.5 * meaningScore).toFixed(3);
        return {
          id: doc.id,
          title: doc.title,
          text: doc.text,
          keywordScore: +keywordScore.toFixed(2),
          meaningScore: +meaningScore.toFixed(2),
          combined,
        };
      });
      scored.sort((a, b) => b.combined - a.combined);
      setCandidates(scored.slice(0, 4));
    });

    after(70 * (qTokens.length + 1) + 1300, () => {
      setStage("reranking");
      setCandidates((current) => {
        const reranked = current.map((c) => {
          const lift = c.combined > 0.55 ? 0.1 + Math.random() * 0.15 : -0.08;
          const finalScore = +Math.max(0, Math.min(1, c.combined + lift)).toFixed(2);
          return { ...c, finalScore };
        });
        reranked.sort((a, b) => (b.finalScore ?? 0) - (a.finalScore ?? 0));
        setReranked(reranked.slice(0, 3));
        return current;
      });
    });

    after(70 * (qTokens.length + 1) + 2200, () => {
      setStage("judging");
      const top = ragCorpus.find((d) =>
        qLower.split(/\s+/).some((w) => d.keywords.some((k) => k.includes(w) || w.includes(k)))
      );
      const hasMatch = !!top;
      setJudgement({
        trust: hasMatch ? 0.92 : 0.41,
        relevance: hasMatch ? 0.88 : 0.34,
        grounded: hasMatch ? 0.95 : 0.29,
      });
    });

    after(70 * (qTokens.length + 1) + 3100, () => {
      setStage("answering");
      const top = ragCorpus.find((d) =>
        qLower.split(/\s+/).some((w) => d.keywords.some((k) => k.includes(w) || w.includes(k)))
      );
      const ans = top
        ? top.text
        : "I couldn't find a confident match in the available information for that question. A well-built system would refuse to answer here rather than guess. Try asking about my work — projects, costs, evaluation, or computer vision.";
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
    <div
      style={{
        background: "var(--bg-soft)",
        border: "1px solid var(--rule)",
        borderRadius: "4px",
        padding: "1.5rem",
      }}
    >
      {/* Sample queries */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1rem" }}>
        <span className="tele" style={{ alignSelf: "center", marginRight: "0.25rem" }}>
          presets:
        </span>
        {SAMPLE_QUERIES.map((q) => (
          <button
            key={q}
            onClick={() => run(q)}
            className="mono"
            style={{
              fontSize: "0.78rem",
              padding: "0.35rem 0.7rem",
              border: "1px solid var(--rule-strong)",
              borderRadius: "2px",
              color: "var(--ink-soft)",
              background: "var(--bg-elev)",
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          padding: "0.45rem 0.45rem 0.45rem 0.85rem",
          border: "1px solid var(--rule-strong)",
          borderRadius: "2px",
          background: "var(--bg)",
          alignItems: "center",
        }}
      >
        <span className="mono" style={{ color: "var(--accent)" }}>{">"}</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") run();
          }}
          placeholder="ask anything…"
          className="mono"
          style={{ flex: 1, fontSize: "0.92rem", color: "var(--ink)" }}
        />
        <button
          onClick={() => run()}
          className="mono"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "2px",
            background: "var(--accent)",
            color: "#0e1218",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          RUN ↩
        </button>
      </div>

      {stage !== "idle" && (
        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Step
            num={1}
            title="Break down the question"
            blurb="The system splits your question into pieces it can reason about."
            active={stage === "tokenizing"}
            done={["retrieving", "reranking", "judging", "answering", "done"].includes(stage)}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {tokens.map((t, i) => (
                <span
                  key={i}
                  className="mono"
                  style={{
                    padding: "0.15rem 0.55rem",
                    background: "var(--accent-soft)",
                    borderRadius: "2px",
                    color: "var(--accent)",
                    fontSize: "0.82rem",
                    border: "1px solid rgba(239,59,44,0.3)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Step>

          <Step
            num={2}
            title="Search for relevant information"
            blurb="Two searches run in parallel — one on exact words, one on meaning. Results are merged."
            active={stage === "retrieving"}
            done={["reranking", "judging", "answering", "done"].includes(stage)}
          >
            {candidates.length > 0 && (
              <div>
                {candidates.map((c) => (
                  <CandidateRow key={c.id} c={c} />
                ))}
              </div>
            )}
          </Step>

          <Step
            num={3}
            title="Rank by what's most useful"
            blurb="A second model takes a closer look and reorders the top results."
            active={stage === "reranking"}
            done={["judging", "answering", "done"].includes(stage)}
          >
            {reranked.length > 0 && (
              <div>
                {reranked.map((c) => (
                  <CandidateRow key={c.id} c={c} showFinal />
                ))}
              </div>
            )}
          </Step>

          <Step
            num={4}
            title="Check whether the answer can be trusted"
            blurb="Before answering, an evaluator checks: is the source reliable? Is it actually relevant? Is the answer grounded in real information?"
            active={stage === "judging"}
            done={["answering", "done"].includes(stage)}
          >
            {judgement && <JudgePanel j={judgement} />}
          </Step>

          <Step
            num={5}
            title="Write the answer"
            blurb="Only now does the system actually respond — using the verified information."
            active={stage === "answering"}
            done={stage === "done"}
          >
            {answer && (
              <div
                style={{
                  fontFamily: "Source Serif 4, Georgia, serif",
                  padding: "1rem 1.15rem",
                  background: "var(--bg)",
                  borderLeft: "2px solid var(--accent)",
                  borderRadius: "2px",
                  fontSize: "1rem",
                  lineHeight: 1.55,
                  color: "var(--ink)",
                }}
              >
                {answer}
                {stage === "answering" && <span style={{ opacity: 0.5 }}>▍</span>}
              </div>
            )}
          </Step>
        </div>
      )}
    </div>
  );
}

function Step({
  num,
  title,
  blurb,
  active,
  done,
  children,
}: {
  num: number;
  title: string;
  blurb: string;
  active: boolean;
  done: boolean;
  children?: React.ReactNode;
}) {
  const state = active ? "active" : done ? "done" : "pending";
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "32px 1fr",
        gap: "0.85rem",
        opacity: state === "pending" ? 0.5 : 1,
        transition: "opacity 0.3s",
      }}
    >
      <div
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          background: state === "done" ? "var(--accent)" : state === "active" ? "var(--accent-soft)" : "var(--bg-elev)",
          color: state === "done" ? "#0e1218" : state === "active" ? "var(--accent)" : "var(--ink-faint)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          fontWeight: 600,
          marginTop: "0.1rem",
          border: state === "active" ? "2px solid var(--accent)" : "1px solid var(--rule)",
          fontFamily: "JetBrains Mono, ui-monospace, monospace",
        }}
      >
        {state === "done" ? "✓" : num}
      </div>
      <div>
        <h3 style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--ink)",
          marginBottom: "0.15rem",
        }}>
          {title}
        </h3>
        <p style={{ fontSize: "0.88rem", color: "var(--ink-mute)", marginBottom: children ? "0.75rem" : 0 }}>
          {blurb}
        </p>
        {children}
      </div>
    </div>
  );
}

function CandidateRow({ c, showFinal }: { c: Candidate; showFinal?: boolean }) {
  const score = showFinal ? c.finalScore ?? 0 : c.combined;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "1rem",
        alignItems: "center",
        padding: "0.5rem 0",
        borderBottom: "1px solid var(--rule-soft)",
      }}
    >
      <div>
        <div style={{ color: "var(--ink)", fontSize: "0.92rem", marginBottom: "0.1rem" }}>{c.title}</div>
        <div className="mono" style={{ fontSize: "0.72rem", color: "var(--ink-faint)" }}>
          word: <strong style={{ color: "var(--ink-mute)" }}>{c.keywordScore}</strong> · meaning:{" "}
          <strong style={{ color: "var(--ink-mute)" }}>{c.meaningScore}</strong>
          {showFinal && c.finalScore !== undefined && (
            <>
              {" "}
              · final: <strong style={{ color: "var(--accent)" }}>{c.finalScore}</strong>
            </>
          )}
        </div>
      </div>
      <ScoreBar value={score} />
    </div>
  );
}

function ScoreBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div
      style={{
        width: "70px",
        height: "5px",
        background: "var(--bg-elev)",
        borderRadius: "3px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: "var(--accent)",
          transition: "width 0.5s ease-out",
        }}
      />
    </div>
  );
}

function JudgePanel({ j }: { j: { trust: number; relevance: number; grounded: number } }) {
  const pass = j.trust >= 0.7 && j.grounded >= 0.7;
  return (
    <div
      style={{
        padding: "0.85rem 1.1rem",
        background: pass ? "rgba(93, 217, 160, 0.06)" : "rgba(245, 193, 80, 0.06)",
        border: `1px solid ${pass ? "rgba(93, 217, 160, 0.3)" : "rgba(245, 193, 80, 0.3)"}`,
        borderRadius: "2px",
        fontSize: "0.88rem",
      }}
    >
      <div className="mono" style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", color: "var(--ink-soft)" }}>
        <span>
          trust: <strong style={{ color: "var(--ink)" }}>{(j.trust * 100).toFixed(0)}%</strong>
        </span>
        <span>
          relevance: <strong style={{ color: "var(--ink)" }}>{(j.relevance * 100).toFixed(0)}%</strong>
        </span>
        <span>
          grounded: <strong style={{ color: "var(--ink)" }}>{(j.grounded * 100).toFixed(0)}%</strong>
        </span>
      </div>
      <div className="mono" style={{
        marginTop: "0.5rem",
        color: pass ? "var(--success)" : "var(--warn)",
        fontWeight: 600,
        fontSize: "0.82rem",
      }}>
        {pass
          ? "✓ GATE: PASS — cleared to answer."
          : "✗ GATE: BLOCK — refusing to answer (low confidence)."}
      </div>
    </div>
  );
}
