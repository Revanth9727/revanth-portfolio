"use client";

import { profile, stats, experience, skills, education, projects } from "@/data/content";
import { aboutMd, experienceJson, skillsYaml, educationMd, projectMd, contactTs } from "@/lib/files";
import { HighlightJSON, HighlightYAML, MarkdownLite } from "@/lib/highlight";
import RagPlayground from "@/components/RagPlayground";
import { getDiagram } from "@/components/ProjectDiagrams";
import React from "react";

export type FileId =
  | "about"
  | "experience"
  | "skills"
  | "education"
  | "contact"
  | "rag"
  | "project:raoc"
  | "project:bugfix-ai-pilot"
  | "project:llm-eval-harness";

export const FILES: Record<FileId, { name: string; lang: "md" | "json" | "yaml" | "ts" | "ipynb" }> = {
  about: { name: "about.md", lang: "md" },
  experience: { name: "experience.json", lang: "json" },
  skills: { name: "skills.yaml", lang: "yaml" },
  education: { name: "education.md", lang: "md" },
  contact: { name: "contact.ts", lang: "ts" },
  rag: { name: "rag_playground.ipynb", lang: "ipynb" },
  "project:raoc": { name: "raoc.md", lang: "md" },
  "project:bugfix-ai-pilot": { name: "bugfix-ai-pilot.md", lang: "md" },
  "project:llm-eval-harness": { name: "llm-eval-harness.md", lang: "md" },
};

export default function FileView({ fileId }: { fileId: FileId }) {
  const f = FILES[fileId];

  if (fileId === "rag") {
    return (
      <EditorFrame fileName={f.name} lang="ipynb">
        {/* About-mode: a header + the playground */}
        <div style={{ padding: "0 0 1rem", borderBottom: "1px solid var(--border)" }}>
          <h1 style={{ fontSize: "1.55rem", fontWeight: 600, margin: 0, color: "var(--fg)" }}>RAG Playground</h1>
          <div style={{ color: "var(--fg-dim)", marginTop: "0.3rem" }}>
            A live, deterministic simulation of the production RAG pipeline I work with daily.
          </div>
        </div>
        <RagPlayground />
        <div style={{ color: "var(--fg-faint)", fontSize: 12, fontFamily: "ui-monospace, Menlo, monospace", marginTop: "1rem" }}>
          # NOTE: This is a deterministic mock retrieving from a small portfolio corpus.
          # The eval-gate, reranker, and faithfulness scoring follow the same shape as my production system.
        </div>
      </EditorFrame>
    );
  }

  if (fileId === "about") {
    return (
      <EditorFrame fileName={f.name} lang="md">
        <Hero />
        <MarkdownLite src={aboutMd()} />
      </EditorFrame>
    );
  }

  if (fileId === "experience") {
    return (
      <EditorFrame fileName={f.name} lang="json">
        {/* Render experience as: header + JSON-style highlighted text + readable cards */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.55rem", fontWeight: 600, color: "var(--fg)", margin: 0 }}>Experience</h1>
          <div style={{ color: "var(--fg-dim)", marginTop: "0.3rem" }}>
            {experience.length} roles · production GenAI, RAG, ML platforms
          </div>
        </div>
        {experience.map((e, i) => (
          <RoleCard key={i} role={e} />
        ))}

        <div style={{ marginTop: "2rem" }}>
          <CollapsibleSource label="view as experience.json">
            <pre className="mono" style={{ fontSize: 12, lineHeight: 1.55, whiteSpace: "pre-wrap", padding: "0.75rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 4, color: "var(--fg-dim)" }}>
              <HighlightJSON src={experienceJson()} />
            </pre>
          </CollapsibleSource>
        </div>
      </EditorFrame>
    );
  }

  if (fileId === "skills") {
    return (
      <EditorFrame fileName={f.name} lang="yaml">
        <h1 style={{ fontSize: "1.55rem", fontWeight: 600, color: "var(--fg)", margin: "0 0 1rem" }}>Skills</h1>
        <p style={{ color: "var(--fg-dim)", marginBottom: "1rem" }}>
          Tools used in production to solve real reliability, latency, retrieval, or cost problems.
        </p>
        <pre className="mono" style={{ fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap", padding: "1rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 4 }}>
          <HighlightYAML src={skillsYaml()} />
        </pre>
      </EditorFrame>
    );
  }

  if (fileId === "education") {
    return (
      <EditorFrame fileName={f.name} lang="md">
        <MarkdownLite src={educationMd()} />
      </EditorFrame>
    );
  }

  if (fileId === "contact") {
    return (
      <EditorFrame fileName={f.name} lang="ts">
        <h1 style={{ fontSize: "1.55rem", fontWeight: 600, color: "var(--fg)", margin: "0 0 0.4rem" }}>Get in touch</h1>
        <p style={{ color: "var(--fg-dim)", marginBottom: "1rem" }}>
          <strong style={{ color: "var(--fg)" }}>What I&apos;m looking for:</strong> Senior / Lead roles building production GenAI platforms — RAG systems, LLM evaluation infrastructure, AI agents, and enterprise AI products.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.5rem" }}>
          <CTA href={`mailto:${profile.email}`} primary>{profile.email}</CTA>
          <CTA href={profile.linkedin}>LinkedIn</CTA>
          <CTA href={profile.github}>GitHub</CTA>
          <CTA href={profile.resume} download>Download Resume</CTA>
        </div>
        <pre className="mono" style={{ fontSize: 12.5, lineHeight: 1.6, whiteSpace: "pre-wrap", padding: "1rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 4, color: "var(--fg-dim)" }}>
          <HighlightTS src={contactTs()} />
        </pre>
      </EditorFrame>
    );
  }

  // Project files
  if (fileId.startsWith("project:")) {
    const id = fileId.replace("project:", "");
    const p = projects.find((x) => x.id === id);
    if (!p) return null;
    return (
      <EditorFrame fileName={f.name} lang="md">
        <ProjectView projectId={id} />
      </EditorFrame>
    );
  }

  return null;
}

// ── Hero shown above about.md ──
function Hero() {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, color: "var(--fg-faint)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
        // {profile.title}
      </div>
      <h1 style={{ fontSize: "2.2rem", fontWeight: 600, color: "var(--fg)", margin: 0, letterSpacing: "-0.02em" }}>
        {profile.name}
      </h1>
      <p style={{ color: "var(--fg-dim)", margin: "0.75rem 0 1rem", maxWidth: 720 }}>
        {profile.summary}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 2rem", padding: "0.75rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12, color: "var(--fg-dim)" }}>
        {stats.map((s) => (
          <span key={s.label}>
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>{s.value}</span>{" "}
            <span style={{ color: "var(--fg-faint)" }}>{s.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Single role card ──
function RoleCard({ role }: { role: typeof experience[number] }) {
  return (
    <div style={{ marginBottom: "1.75rem", padding: "1rem", border: "1px solid var(--border)", borderRadius: 6, background: "var(--bg-panel)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <div>
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>{role.role}</span>
          <span style={{ color: "var(--fg-faint)" }}> · {role.company}</span>
        </div>
        <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12, color: "var(--fg-faint)" }}>
          {role.period}
        </div>
      </div>
      {role.items.map((item, i) => (
        <div key={i} style={{ marginTop: "0.85rem" }}>
          <div style={{ color: "var(--accent)", fontSize: 14, fontWeight: 500, marginBottom: "0.2rem" }}>{item.title}</div>
          <div style={{ color: "var(--fg-dim)", fontSize: 13.5, lineHeight: 1.55 }}>{item.body}</div>
        </div>
      ))}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.75rem" }}>
        {role.stack.map((s) => (
          <span key={s} style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, padding: "0.1rem 0.45rem", border: "1px solid var(--border)", borderRadius: 3, color: "var(--fg-dim)" }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectView({ projectId }: { projectId: string }) {
  const p = projects.find((x) => x.id === projectId);
  if (!p) return null;
  const diagram = getDiagram(projectId);

  return (
    <div>
      <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, color: "var(--fg-faint)", letterSpacing: ".05em", marginBottom: "0.3rem" }}>
        // {p.badge}
      </div>
      <h1 style={{ fontSize: "1.7rem", fontWeight: 600, color: "var(--fg)", margin: 0 }}>{p.name}</h1>
      <div style={{ color: "var(--accent)", marginTop: "0.2rem" }}>{p.tagline}</div>
      <p style={{ color: "var(--fg-dim)", marginTop: "0.75rem" }}>{p.description}</p>

      <div style={{ display: "grid", gridTemplateColumns: diagram ? "1fr 1fr" : "1fr", gap: "2rem", marginTop: "1.25rem", alignItems: "start" }}>
        <div>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--fg)", margin: "0.5rem 0" }}>Highlights</h3>
          <ul style={{ paddingLeft: "1.3rem", color: "var(--fg-dim)" }}>
            {p.bullets.map((b, i) => (
              <li key={i} style={{ margin: "0.45rem 0" }}>
                <BulletText text={b} />
              </li>
            ))}
          </ul>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--fg)", margin: "1rem 0 0.5rem" }}>Stack</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {p.stack.map((s) => (
              <span key={s} style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, padding: "0.1rem 0.45rem", border: "1px solid var(--border)", borderRadius: 3, color: "var(--fg-dim)" }}>{s}</span>
            ))}
          </div>
          <a href={p.url} target="_blank" rel="noopener" style={{ display: "inline-block", marginTop: "1rem", color: "var(--accent)" }}>
            View on GitHub →
          </a>
        </div>
        {diagram && (
          <div style={{ background: "var(--bg-panel-2)", border: "1px solid var(--border)", borderRadius: 6, padding: "1rem" }}>
            <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, color: "var(--fg-faint)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "0.5rem" }}>
              pipeline diagram
            </div>
            {diagram}
          </div>
        )}
      </div>
    </div>
  );
}

function BulletText({ text }: { text: string }) {
  // Render **bold** segments
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={i} style={{ color: "var(--fg)", fontWeight: 600 }}>{p.slice(2, -2)}</strong>
          : <React.Fragment key={i}>{p}</React.Fragment>
      )}
    </>
  );
}

function CTA({ href, children, primary, download }: { href: string; children: React.ReactNode; primary?: boolean; download?: boolean }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener"
      download={download ? "Revanth_Gollapudi_Resume.pdf" : undefined}
      style={{
        padding: "0.45rem 0.9rem",
        border: `1px solid ${primary ? "var(--accent)" : "var(--border)"}`,
        borderRadius: 4,
        color: primary ? "#0d1117" : "var(--fg)",
        background: primary ? "var(--accent)" : "transparent",
        fontWeight: primary ? 600 : 400,
        textDecoration: "none",
        fontSize: 13,
      }}
    >
      {children}
    </a>
  );
}

function CollapsibleSource({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details>
      <summary style={{ cursor: "pointer", color: "var(--fg-faint)", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12 }}>
        {label}
      </summary>
      <div style={{ marginTop: "0.5rem" }}>{children}</div>
    </details>
  );
}

// Tiny TypeScript-ish highlighter
function HighlightTS({ src }: { src: string }) {
  const lines = src.split("\n");
  return (
    <>
      {lines.map((line, idx) => {
        if (/^\s*\/\//.test(line)) {
          return <div key={idx}><span style={{ color: "var(--comment)", fontStyle: "italic" }}>{line}</span></div>;
        }
        // simple keyword colorize
        const colored = line
          .split(/(\s+)/)
          .map((tok, i) => {
            if (/^(const|let|var|export|async|await|function|return|as)$/.test(tok)) {
              return <span key={i} style={{ color: "var(--keyword)" }}>{tok}</span>;
            }
            if (/^"/.test(tok) && /"$/.test(tok)) {
              return <span key={i} style={{ color: "var(--string)" }}>{tok}</span>;
            }
            return <span key={i}>{tok}</span>;
          });
        return <div key={idx}>{colored}</div>;
      })}
    </>
  );
}

// ── Editor frame: small toolbar + scrollable content ──
function EditorFrame({ fileName, lang, children }: { fileName: string; lang: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <div style={{
        padding: "0.5rem 1rem",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontFamily: "ui-monospace, Menlo, monospace",
        fontSize: 11.5,
        color: "var(--fg-faint)",
        background: "var(--bg-panel)",
      }}>
        <FileIcon lang={lang} />
        <span>{fileName}</span>
        <span style={{ marginLeft: "auto" }}>{lang.toUpperCase()}</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 2rem" }}>
        {children}
      </div>
    </div>
  );
}

function FileIcon({ lang }: { lang: string }) {
  const colors: Record<string, string> = {
    md: "var(--accent)",
    json: "var(--yellow)",
    yaml: "var(--tag)",
    ts: "var(--func)",
    ipynb: "var(--keyword)",
  };
  return (
    <span style={{
      width: 12,
      height: 12,
      borderRadius: 2,
      background: colors[lang] || "var(--fg-faint)",
      opacity: 0.8,
      display: "inline-block",
    }} />
  );
}
