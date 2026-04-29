"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import {
  profile,
  tagline,
  intro,
  experience,
  skills,
  education,
  projects,
  lookingFor,
} from "@/data/content";
import RagDemo from "@/components/RagDemo";

type FileId =
  | "about"
  | "experience"
  | "skills"
  | "projects"
  | "education"
  | "rag"
  | "contact";

const FILES: Record<FileId, { name: string; lang: "md" | "json" | "yaml" | "ts" | "ipynb" }> = {
  about: { name: "about.md", lang: "md" },
  experience: { name: "experience.json", lang: "json" },
  skills: { name: "skills.yaml", lang: "yaml" },
  projects: { name: "projects.md", lang: "md" },
  education: { name: "education.md", lang: "md" },
  rag: { name: "rag_demo.ipynb", lang: "ipynb" },
  contact: { name: "contact.ts", lang: "ts" },
};

export default function DevMode() {
  const [openTabs, setOpenTabs] = useState<FileId[]>(["about"]);
  const [active, setActive] = useState<FileId>("about");
  const [terminalOpen, setTerminalOpen] = useState(true);

  const open = (id: FileId) => {
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActive(id);
  };

  const close = (id: FileId, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t !== id);
      if (active === id && next.length > 0) setActive(next[next.length - 1]);
      return next;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "var(--ide-bg)",
        color: "var(--ide-fg)",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        lineHeight: 1.55,
      }}
      className="ide-root"
    >
      {/* Title bar */}
      <div
        style={{
          height: 32,
          background: "var(--ide-panel)",
          borderBottom: "1px solid var(--ide-rule)",
          display: "flex",
          alignItems: "center",
          padding: "0 0.75rem",
          fontFamily: "JetBrains Mono, ui-monospace, monospace",
          fontSize: 11.5,
          color: "var(--ide-fg-faint)",
          flexShrink: 0,
        }}
      >
        <span style={{ display: "flex", gap: "0.4rem", marginRight: "0.75rem" }}>
          <Dot color="#ff5f56" />
          <Dot color="#ffbd2e" />
          <Dot color="#27c93f" />
        </span>
        <span style={{ marginLeft: "0.5rem" }}>{profile.name} — portfolio · main</span>
      </div>

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 240,
            background: "var(--ide-panel)",
            borderRight: "1px solid var(--ide-rule)",
            overflowY: "auto",
            flexShrink: 0,
          }}
          className="ide-sidebar"
        >
          <div
            style={{
              padding: "0.6rem 0.85rem",
              fontFamily: "JetBrains Mono, ui-monospace, monospace",
              fontSize: 10.5,
              color: "var(--ide-fg-faint)",
              textTransform: "uppercase",
              letterSpacing: ".1em",
            }}
          >
            Explorer
          </div>
          <div style={{ padding: "0 0.4rem 1rem" }}>
            {(Object.keys(FILES) as FileId[]).map((id) => (
              <FileItem
                key={id}
                id={id}
                active={id === active}
                onClick={() => open(id)}
              />
            ))}
          </div>
        </aside>

        {/* Editor area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              background: "var(--ide-panel)",
              borderBottom: "1px solid var(--ide-rule)",
              overflowX: "auto",
              flexShrink: 0,
            }}
          >
            {openTabs.map((tab) => (
              <Tab
                key={tab}
                tab={tab}
                active={active === tab}
                onClick={() => setActive(tab)}
                onClose={(e) => close(tab, e)}
              />
            ))}
          </div>

          {/* Editor + terminal */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div
              style={{
                flex: terminalOpen ? "1 1 60%" : "1 1 100%",
                overflow: "auto",
                background: "var(--ide-bg)",
                padding: "1.5rem 2rem",
              }}
            >
              {openTabs.length === 0 ? (
                <EmptyState onOpen={open} />
              ) : (
                <FileView fileId={active} />
              )}
            </div>

            {terminalOpen && (
              <div
                style={{
                  flex: "0 0 220px",
                  borderTop: "1px solid var(--ide-rule)",
                  background: "var(--ide-bg)",
                  display: "flex",
                  flexDirection: "column",
                }}
                className="ide-terminal"
              >
                <div
                  style={{
                    padding: "0.3rem 0.6rem",
                    background: "var(--ide-panel)",
                    borderBottom: "1px solid var(--ide-rule-soft)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "JetBrains Mono, ui-monospace, monospace",
                    fontSize: 11,
                    color: "var(--ide-fg-faint)",
                  }}
                >
                  <span style={{ color: "var(--ide-accent)" }}>●</span>
                  <span>TERMINAL</span>
                  <button
                    onClick={() => setTerminalOpen(false)}
                    style={{
                      marginLeft: "auto",
                      color: "var(--ide-fg-faint)",
                      padding: "0 0.4rem",
                    }}
                  >
                    ×
                  </button>
                </div>
                <div style={{ flex: 1, minHeight: 0 }}>
                  <Terminal onOpenFile={open} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div
        style={{
          height: 24,
          background: "var(--ide-statusbar)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          padding: "0 0.75rem",
          fontFamily: "JetBrains Mono, ui-monospace, monospace",
          fontSize: 11,
          gap: "1rem",
          flexShrink: 0,
        }}
      >
        <span>⎇ main</span>
        <span>● 0 errors</span>
        <span style={{ marginLeft: "auto" }}>{FILES[active].lang.toUpperCase()}</span>
        <span>UTF-8</span>
        <button onClick={() => setTerminalOpen((v) => !v)} style={{ color: "white" }}>
          {terminalOpen ? "▾ terminal" : "▴ terminal"}
        </button>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .ide-sidebar { display: none !important; }
          .ide-terminal { display: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── Sidebar file item ────────────────────────────────── */
function FileItem({ id, active, onClick }: { id: FileId; active: boolean; onClick: () => void }) {
  const f = FILES[id];
  return (
    <div
      onClick={onClick}
      style={{
        padding: "0.35rem 0.5rem",
        cursor: "pointer",
        background: active ? "var(--ide-tab-active)" : "transparent",
        color: active ? "var(--ide-fg)" : "var(--ide-fg-dim)",
        fontFamily: "JetBrains Mono, ui-monospace, monospace",
        fontSize: 12.5,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        borderRadius: 3,
      }}
      onMouseEnter={(e) => {
        if (!active) (e.currentTarget as HTMLDivElement).style.background = "var(--ide-hover)";
      }}
      onMouseLeave={(e) => {
        if (!active) (e.currentTarget as HTMLDivElement).style.background = "transparent";
      }}
    >
      <FileColor lang={f.lang} />
      <span>{f.name}</span>
    </div>
  );
}

function FileColor({ lang }: { lang: string }) {
  const colors: Record<string, string> = {
    md: "var(--ide-accent)",
    json: "var(--ide-yellow)",
    yaml: "var(--ide-tag)",
    ts: "var(--ide-func)",
    ipynb: "var(--ide-keyword)",
  };
  return (
    <span
      style={{
        width: 10,
        height: 10,
        borderRadius: 2,
        background: colors[lang] || "var(--ide-fg-faint)",
        opacity: 0.85,
      }}
    />
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span style={{ width: 12, height: 12, borderRadius: "50%", background: color }} />
  );
}

/* ─── Tab ──────────────────────────────────────────────── */
function Tab({
  tab,
  active,
  onClick,
  onClose,
}: {
  tab: FileId;
  active: boolean;
  onClick: () => void;
  onClose: (e: React.MouseEvent) => void;
}) {
  const f = FILES[tab];
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: "0.55rem 0.85rem",
        background: active ? "var(--ide-bg)" : "var(--ide-panel)",
        borderRight: "1px solid var(--ide-rule)",
        borderTop: active ? "1.5px solid var(--ide-accent)" : "1.5px solid transparent",
        cursor: "pointer",
        fontFamily: "JetBrains Mono, ui-monospace, monospace",
        fontSize: 12,
        color: active ? "var(--ide-fg)" : "var(--ide-fg-dim)",
        flexShrink: 0,
      }}
    >
      <FileColor lang={f.lang} />
      <span>{f.name}</span>
      <button
        onClick={onClose}
        style={{ padding: "0 0.2rem", color: "var(--ide-fg-faint)", lineHeight: 1, fontSize: 14 }}
        aria-label="close"
      >
        ×
      </button>
    </div>
  );
}

function EmptyState({ onOpen }: { onOpen: (id: FileId) => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "var(--ide-fg-faint)",
        gap: "0.5rem",
        fontFamily: "JetBrains Mono, ui-monospace, monospace",
      }}
    >
      <div style={{ fontSize: 14 }}>No file open</div>
      <button onClick={() => onOpen("about")} style={{ color: "var(--ide-accent)", textDecoration: "underline" }}>
        open about.md
      </button>
    </div>
  );
}

/* ─── File renderer ────────────────────────────────────── */
function FileView({ fileId }: { fileId: FileId }) {
  if (fileId === "about") {
    return (
      <div className="md-content" style={{ maxWidth: 720 }}>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "2rem", fontWeight: 600, color: "var(--ide-fg)", marginBottom: "0.4rem" }}>
          {profile.name}
        </h1>
        <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "1.15rem", fontWeight: 500, color: "var(--ide-accent)", marginBottom: "1.5rem" }}>
          {profile.title}
        </h2>
        <p style={{ color: "var(--ide-fg-dim)", marginBottom: "1rem", fontSize: "1rem" }}>{tagline}</p>
        <p style={{ color: "var(--ide-fg-dim)", marginBottom: "1.5rem", fontSize: "1rem" }}>{intro}</p>
        <hr style={{ border: "none", borderTop: "1px solid var(--ide-rule)", margin: "1.5rem 0" }} />
        <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 600, color: "var(--ide-fg)", marginBottom: "0.5rem" }}>
          Contact
        </h3>
        <ul style={{ paddingLeft: "1.4rem", color: "var(--ide-fg-dim)" }}>
          <li>
            Email:{" "}
            <a href={`mailto:${profile.email}`} style={{ color: "var(--ide-accent)" }}>
              {profile.email}
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a href={profile.linkedin} target="_blank" rel="noopener" style={{ color: "var(--ide-accent)" }}>
              {profile.linkedin.replace("https://www.", "")}
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a href={profile.github} target="_blank" rel="noopener" style={{ color: "var(--ide-accent)" }}>
              {profile.github.replace("https://", "")}
            </a>
          </li>
          <li>
            Resume:{" "}
            <a href={profile.resume} download style={{ color: "var(--ide-accent)" }}>
              Download PDF
            </a>
          </li>
        </ul>
      </div>
    );
  }

  if (fileId === "experience") {
    const data = experience.map((e) => ({
      role: e.role,
      company: e.company,
      period: e.period,
      location: e.location,
      highlights: e.highlights.map((h) => h.title),
    }));
    return <CodeView code={JSON.stringify(data, null, 2)} lang="json" />;
  }

  if (fileId === "skills") {
    let yaml = "";
    for (const [cat, list] of Object.entries(skills)) {
      yaml += `${cat}:\n`;
      for (const s of list) yaml += `  - ${s}\n`;
      yaml += "\n";
    }
    return <CodeView code={yaml.trimEnd()} lang="yaml" />;
  }

  if (fileId === "projects") {
    let md = "# Side projects\n\n";
    for (const p of projects) {
      md += `## ${p.name}\n\n`;
      md += `*${p.subtitle}*\n\n`;
      md += `${p.story}\n\n`;
      md += `**Stack:** ${p.stack.join(", ")}  \n`;
      md += `**Source:** ${p.url}\n\n`;
    }
    return <MdView src={md} />;
  }

  if (fileId === "education") {
    let md = "# Education\n\n";
    for (const e of education) {
      md += `## ${e.degree}\n\n`;
      md += `*${e.school}* — ${e.period}\n\n`;
    }
    return <MdView src={md} />;
  }

  if (fileId === "rag") {
    return (
      <div style={{ maxWidth: 720 }}>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "1.8rem", fontWeight: 600, color: "var(--ide-fg)", marginBottom: "0.5rem" }}>
          RAG Playground
        </h1>
        <p style={{ color: "var(--ide-fg-dim)", marginBottom: "1.5rem" }}>
          A live, deterministic simulation of the production RAG pipeline I work with.
        </p>
        {/* Re-map recruiter-mode CSS vars to IDE palette so the RagDemo
            renders correctly in dev mode without a separate prop. */}
        <div
          style={
            {
              "--bg-soft": "var(--ide-panel)",
              "--bg-card": "var(--ide-panel)",
              "--bg-elev": "var(--ide-panel-2)",
              "--bg": "var(--ide-bg)",
              "--rule": "var(--ide-rule)",
              "--rule-soft": "var(--ide-rule-soft)",
              "--rule-strong": "var(--ide-rule)",
              "--ink": "var(--ide-fg)",
              "--ink-soft": "var(--ide-fg-dim)",
              "--ink-mute": "var(--ide-fg-faint)",
              "--ink-faint": "var(--ide-fg-ghost)",
              "--accent": "var(--ide-accent)",
              "--accent-bright": "var(--ide-accent)",
              "--accent-soft": "var(--ide-accent-soft)",
            } as React.CSSProperties
          }
        >
          <RagDemo />
        </div>
      </div>
    );
  }

  if (fileId === "contact") {
    const ts = `// contact.ts
export const contact = {
  name: "${profile.name}",
  role: "${profile.title}",
  email: "${profile.email}",
  linkedin: "${profile.linkedin}",
  github: "${profile.github}",
  resume: "${profile.resume}",
} as const;

// What I'm looking for:
// ${lookingFor}
`;
    return <CodeView code={ts} lang="ts" />;
  }

  return null;
}

/* ─── Code viewer (with light syntax highlighting) ─────── */
function CodeView({ code, lang }: { code: string; lang: "json" | "yaml" | "ts" }) {
  return (
    <pre
      className="mono"
      style={{
        fontSize: 13,
        lineHeight: 1.6,
        background: "var(--ide-bg)",
        padding: "1rem",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        color: "var(--ide-fg-dim)",
        margin: 0,
        maxWidth: 720,
      }}
    >
      {lang === "json" ? <HighlightJSON src={code} /> : lang === "yaml" ? <HighlightYAML src={code} /> : <HighlightTS src={code} />}
    </pre>
  );
}

function HighlightJSON({ src }: { src: string }) {
  const lines = src.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {tokenizeJson(line)}
          {i < lines.length - 1 ? "\n" : ""}
        </Fragment>
      ))}
    </>
  );
}

function tokenizeJson(line: string): React.ReactNode {
  // colorize: "key": value patterns; strings; numbers; bool/null
  const result: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < line.length) {
    const c = line[i];
    if (c === '"') {
      // find closing quote
      let j = i + 1;
      while (j < line.length && line[j] !== '"') {
        if (line[j] === "\\") j += 2;
        else j++;
      }
      const str = line.slice(i, Math.min(j + 1, line.length));
      // if next non-space is ':', it's a key
      let k = j + 1;
      while (k < line.length && /\s/.test(line[k])) k++;
      const isKey = line[k] === ":";
      result.push(
        <span key={key++} style={{ color: isKey ? "var(--ide-accent)" : "var(--ide-string)" }}>
          {str}
        </span>
      );
      i = j + 1;
      continue;
    }
    if (/[-0-9]/.test(c) && (c !== "-" || /[0-9]/.test(line[i + 1] ?? ""))) {
      let j = i;
      while (j < line.length && /[-0-9.]/.test(line[j])) j++;
      result.push(
        <span key={key++} style={{ color: "var(--ide-number)" }}>
          {line.slice(i, j)}
        </span>
      );
      i = j;
      continue;
    }
    if (line.startsWith("true", i) || line.startsWith("false", i) || line.startsWith("null", i)) {
      const word = line.startsWith("true", i) ? "true" : line.startsWith("false", i) ? "false" : "null";
      result.push(
        <span key={key++} style={{ color: "var(--ide-keyword)" }}>
          {word}
        </span>
      );
      i += word.length;
      continue;
    }
    if ("{}[],:".includes(c)) {
      result.push(
        <span key={key++} style={{ color: "var(--ide-fg-dim)" }}>
          {c}
        </span>
      );
      i++;
      continue;
    }
    result.push(<Fragment key={key++}>{c}</Fragment>);
    i++;
  }
  return <>{result}</>;
}

function HighlightYAML({ src }: { src: string }) {
  const lines = src.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        let node: React.ReactNode;
        const bullet = line.match(/^(\s*)(-)(\s+)(.*)$/);
        const kv = line.match(/^(\s*)([A-Za-z0-9_\-& ]+?)(:)(\s*)(.*)$/);
        if (bullet) {
          node = (
            <>
              <span>{bullet[1]}</span>
              <span style={{ color: "var(--ide-keyword)" }}>{bullet[2]}</span>
              <span>{bullet[3]}</span>
              <span style={{ color: "var(--ide-string)" }}>{bullet[4]}</span>
            </>
          );
        } else if (kv) {
          node = (
            <>
              <span>{kv[1]}</span>
              <span style={{ color: "var(--ide-accent)" }}>{kv[2]}</span>
              <span style={{ color: "var(--ide-fg-dim)" }}>{kv[3]}</span>
              <span>{kv[4]}</span>
              <span style={{ color: "var(--ide-string)" }}>{kv[5]}</span>
            </>
          );
        } else {
          node = <span>{line}</span>;
        }
        return (
          <Fragment key={i}>
            {node}
            {i < lines.length - 1 ? "\n" : ""}
          </Fragment>
        );
      })}
    </>
  );
}

function HighlightTS({ src }: { src: string }) {
  const lines = src.split("\n");
  return (
    <>
      {lines.map((line, idx) => {
        if (/^\s*\/\//.test(line)) {
          return (
            <Fragment key={idx}>
              <span style={{ color: "var(--ide-comment)", fontStyle: "italic" }}>{line}</span>
              {idx < lines.length - 1 ? "\n" : ""}
            </Fragment>
          );
        }
        const tokens = line.split(/(\s+)/);
        return (
          <Fragment key={idx}>
            {tokens.map((tok, i) => {
              if (/^(const|let|var|export|async|await|function|return|as|import|from)$/.test(tok)) {
                return (
                  <span key={i} style={{ color: "var(--ide-keyword)" }}>
                    {tok}
                  </span>
                );
              }
              if (/^"[^"]*"$/.test(tok) || /^'[^']*'$/.test(tok)) {
                return (
                  <span key={i} style={{ color: "var(--ide-string)" }}>
                    {tok}
                  </span>
                );
              }
              return <Fragment key={i}>{tok}</Fragment>;
            })}
            {idx < lines.length - 1 ? "\n" : ""}
          </Fragment>
        );
      })}
    </>
  );
}

/* ─── Markdown lite renderer ───────────────────────────── */
function MdView({ src }: { src: string }) {
  const lines = src.split("\n");
  const out: React.ReactNode[] = [];
  let key = 0;
  for (const line of lines) {
    if (/^# /.test(line)) {
      out.push(
        <h1 key={key++} style={{ fontFamily: "Inter, sans-serif", fontSize: "1.8rem", fontWeight: 600, color: "var(--ide-fg)", margin: "1rem 0 0.5rem" }}>
          {line.replace(/^# /, "")}
        </h1>
      );
      continue;
    }
    if (/^## /.test(line)) {
      out.push(
        <h2 key={key++} style={{ fontFamily: "Inter, sans-serif", fontSize: "1.2rem", fontWeight: 600, color: "var(--ide-accent)", margin: "1.4rem 0 0.4rem" }}>
          {line.replace(/^## /, "")}
        </h2>
      );
      continue;
    }
    if (line.trim() === "") {
      out.push(<div key={key++} style={{ height: "0.5rem" }} />);
      continue;
    }
    out.push(
      <p key={key++} style={{ color: "var(--ide-fg-dim)", margin: "0.4rem 0", maxWidth: 720 }}>
        {renderInline(line)}
      </p>
    );
  }
  return <div>{out}</div>;
}

function renderInline(text: string): React.ReactNode {
  // **bold** and *italic* and [text](url)
  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < text.length) {
    const remaining = text.slice(i);
    const bold = remaining.match(/^\*\*([^*]+)\*\*/);
    const italic = remaining.match(/^\*([^*]+)\*/);
    const link = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (bold) {
      parts.push(
        <strong key={key++} style={{ color: "var(--ide-fg)", fontWeight: 600 }}>
          {bold[1]}
        </strong>
      );
      i += bold[0].length;
      continue;
    }
    if (italic) {
      parts.push(
        <em key={key++} style={{ color: "var(--ide-fg)", fontStyle: "italic" }}>
          {italic[1]}
        </em>
      );
      i += italic[0].length;
      continue;
    }
    if (link) {
      parts.push(
        <a key={key++} href={link[2]} target="_blank" rel="noopener" style={{ color: "var(--ide-accent)" }}>
          {link[1]}
        </a>
      );
      i += link[0].length;
      continue;
    }
    parts.push(<Fragment key={key++}>{text[i]}</Fragment>);
    i++;
  }
  return <>{parts}</>;
}

/* ─── Terminal ─────────────────────────────────────────── */
function Terminal({ onOpenFile }: { onOpenFile: (id: FileId) => void }) {
  const [lines, setLines] = useState<{ kind: "input" | "output" | "error"; text: string }[]>([
    { kind: "output", text: "revanth-portfolio · zsh · type `help` for commands" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [lines]);

  const print = (text: string, kind: "input" | "output" | "error" = "output") =>
    setLines((p) => [...p, { kind, text }]);

  const exec = (raw: string) => {
    const cmd = raw.trim();
    print(`$ ${cmd}`, "input");
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);

    const [name, ...args] = cmd.split(/\s+/);
    switch (name) {
      case "help":
        print(
          "Commands:\n  whoami      profile\n  ls          list files\n  cat <file>  show file\n  open <id>   open file in editor (about|experience|skills|projects|education|rag|contact)\n  experience  list roles\n  projects    list projects\n  date        current time\n  clear       clear terminal"
        );
        break;
      case "whoami":
        print(`${profile.name}\n${profile.title}\n\n${tagline}`);
        break;
      case "ls":
        print("about.md  experience.json  skills.yaml  projects.md  education.md  rag_demo.ipynb  contact.ts");
        break;
      case "cat": {
        const file = args[0];
        if (!file) { print("usage: cat <file>", "error"); break; }
        const id = file.replace(/\.(md|json|yaml|ts|ipynb)$/, "") as FileId;
        if (id === "about" || id === "experience" || id === "skills" || id === "projects" || id === "education" || id === "rag" || id === "contact") {
          onOpenFile(id);
          print(`opened ${file} in editor`);
        } else {
          print(`cat: ${file}: No such file`, "error");
        }
        break;
      }
      case "open": {
        const id = args[0] as FileId;
        if (id === "about" || id === "experience" || id === "skills" || id === "projects" || id === "education" || id === "rag" || id === "contact") {
          onOpenFile(id);
          print(`opened ${id}`);
        } else {
          print("usage: open <about|experience|skills|projects|education|rag|contact>", "error");
        }
        break;
      }
      case "experience":
        print(experience.map((e) => `${e.role.padEnd(18)} ${e.company.padEnd(10)} ${e.period}`).join("\n"));
        break;
      case "projects":
        print(projects.map((p) => `${p.name.padEnd(20)} ${p.subtitle}`).join("\n"));
        break;
      case "date":
        print(new Date().toString());
        break;
      case "clear":
        setLines([]);
        break;
      case "sudo":
        print("nope. you're not in the sudoers file.", "error");
        break;
      default:
        print(`zsh: command not found: ${name} — try \`help\``, "error");
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      exec(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      if (history[next] !== undefined) {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--ide-bg)" }}>
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.5rem 0.75rem",
          fontFamily: "JetBrains Mono, ui-monospace, monospace",
          fontSize: 12.5,
          lineHeight: 1.5,
        }}
      >
        {lines.map((l, i) => (
          <pre
            key={i}
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              color:
                l.kind === "error"
                  ? "var(--ide-tag)"
                  : l.kind === "input"
                  ? "var(--ide-accent)"
                  : "var(--ide-fg-dim)",
              margin: 0,
              fontFamily: "inherit",
            }}
          >
            {l.text}
          </pre>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.2rem" }}>
          <span style={{ color: "var(--ide-accent)" }}>$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            autoFocus
            spellCheck={false}
            style={{
              flex: 1,
              fontSize: 12.5,
              fontFamily: "inherit",
              color: "var(--ide-fg)",
              caretColor: "var(--ide-accent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
