"use client";

import { useState, useMemo } from "react";
import FileView, { FileId, FILES } from "@/components/FileView";
import Terminal from "@/components/Terminal";
import { profile } from "@/data/content";

type FileTreeNode =
  | { type: "file"; id: FileId; label: string }
  | { type: "folder"; label: string; defaultOpen?: boolean; children: FileTreeNode[] };

const TREE: FileTreeNode[] = [
  { type: "file", id: "about", label: "about.md" },
  { type: "file", id: "experience", label: "experience.json" },
  { type: "file", id: "skills", label: "skills.yaml" },
  { type: "file", id: "education", label: "education.md" },
  {
    type: "folder",
    label: "projects",
    defaultOpen: true,
    children: [
      { type: "file", id: "project:raoc", label: "raoc.md" },
      { type: "file", id: "project:bugfix-ai-pilot", label: "bugfix-ai-pilot.md" },
      { type: "file", id: "project:llm-eval-harness", label: "llm-eval-harness.md" },
    ],
  },
  { type: "file", id: "rag", label: "rag_playground.ipynb" },
  { type: "file", id: "contact", label: "contact.ts" },
];

export default function IDE() {
  const [openTabs, setOpenTabs] = useState<FileId[]>(["about", "rag"]);
  const [active, setActive] = useState<FileId>("about");
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }} className="ide-root">
      {/* ── Top title bar ── */}
      <div style={{
        height: 32,
        background: "var(--bg-panel)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        padding: "0 0.75rem",
        fontFamily: "ui-monospace, Menlo, Consolas, monospace",
        fontSize: 11.5,
        color: "var(--fg-faint)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", gap: "0.4rem", marginRight: "0.75rem" }}>
          <Dot color="#ff5f56" />
          <Dot color="#ffbd2e" />
          <Dot color="#27c93f" />
        </div>
        <span style={{ marginLeft: "0.5rem" }}>{profile.name} — portfolio · main</span>
        <span style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
          <a href={profile.linkedin} target="_blank" rel="noopener" style={{ color: "var(--fg-dim)" }}>linkedin</a>
          <a href={profile.github} target="_blank" rel="noopener" style={{ color: "var(--fg-dim)" }}>github</a>
          <a href={profile.resume} download="Revanth_Gollapudi_Resume.pdf" style={{ color: "var(--fg-dim)" }}>resume.pdf</a>
        </span>
      </div>

      {/* ── Main IDE row ── */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Activity bar (skinny left rail) */}
        <div style={{
          width: 44,
          background: "var(--bg-panel)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "0.6rem",
          gap: "0.7rem",
          flexShrink: 0,
        }} className="activity-bar">
          <ActivityIcon active={sidebarOpen} title="Files" onClick={() => setSidebarOpen((v) => !v)} svg={<FilesIcon />} />
          <ActivityIcon active={false} title="LinkedIn" onClick={() => window.open(profile.linkedin, "_blank")} svg={<LinkedInIcon />} />
          <ActivityIcon active={false} title="GitHub" onClick={() => window.open(profile.github, "_blank")} svg={<GitHubIcon />} />
          <ActivityIcon active={false} title="Email" onClick={() => window.location.href = `mailto:${profile.email}`} svg={<MailIcon />} />
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div style={{
            width: 240,
            background: "var(--bg-panel)",
            borderRight: "1px solid var(--border)",
            overflowY: "auto",
            flexShrink: 0,
          }} className="sidebar">
            <div style={{ padding: "0.6rem 0.85rem", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10.5, color: "var(--fg-faint)", textTransform: "uppercase", letterSpacing: ".1em" }}>
              Explorer
            </div>
            <div style={{ padding: "0 0.4rem 1rem" }}>
              <Tree nodes={TREE} active={active} onOpen={open} />
            </div>
          </div>
        )}

        {/* Editor area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Tab bar */}
          <div style={{
            display: "flex",
            background: "var(--bg-panel)",
            borderBottom: "1px solid var(--border)",
            overflowX: "auto",
            flexShrink: 0,
          }}>
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

          {/* Editor + terminal split */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div style={{ flex: terminalOpen ? "1 1 60%" : "1 1 100%", overflow: "hidden", background: "var(--bg)" }}>
              {openTabs.length === 0 ? (
                <EmptyState onOpen={open} />
              ) : (
                <FileView fileId={active} />
              )}
            </div>

            {terminalOpen && (
              <div style={{ flex: "0 0 220px", borderTop: "1px solid var(--border)", background: "var(--bg)", display: "flex", flexDirection: "column" }} className="terminal-wrap">
                <div style={{
                  padding: "0.3rem 0.6rem",
                  background: "var(--bg-panel)",
                  borderBottom: "1px solid var(--border-soft)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "ui-monospace, Menlo, monospace",
                  fontSize: 11,
                  color: "var(--fg-faint)",
                }}>
                  <span style={{ color: "var(--accent)" }}>●</span>
                  <span>TERMINAL</span>
                  <span style={{ marginLeft: "auto" }}>
                    <button onClick={() => setTerminalOpen(false)} style={{ color: "var(--fg-faint)", padding: "0 0.4rem" }}>×</button>
                  </span>
                </div>
                <div style={{ flex: 1, minHeight: 0 }}>
                  <Terminal />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Status bar ── */}
      <StatusBar
        active={active}
        terminalOpen={terminalOpen}
        onToggleTerminal={() => setTerminalOpen((v) => !v)}
      />

      {/* mobile overrides */}
      <style>{`
        @media (max-width: 800px) {
          .ide-root { height: auto !important; }
          .activity-bar { display: none !important; }
          .sidebar { display: none !important; }
          .terminal-wrap { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function Tab({ tab, active, onClick, onClose }: { tab: FileId; active: boolean; onClick: () => void; onClose: (e: React.MouseEvent) => void }) {
  const f = FILES[tab];
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: "0.5rem 0.85rem",
        background: active ? "var(--bg)" : "var(--bg-panel)",
        borderRight: "1px solid var(--border)",
        borderTop: active ? "1.5px solid var(--accent)" : "1.5px solid transparent",
        cursor: "pointer",
        fontFamily: "ui-monospace, Menlo, monospace",
        fontSize: 12,
        color: active ? "var(--fg)" : "var(--fg-dim)",
        flexShrink: 0,
      }}
    >
      <FileColor lang={f.lang} />
      <span>{f.name}</span>
      <button
        onClick={onClose}
        style={{ padding: "0 0.2rem", color: "var(--fg-faint)", lineHeight: 1, fontSize: 14 }}
        aria-label="close"
      >×</button>
    </div>
  );
}

function FileColor({ lang }: { lang: string }) {
  const colors: Record<string, string> = {
    md: "var(--accent)",
    json: "var(--yellow)",
    yaml: "var(--tag)",
    ts: "var(--func)",
    ipynb: "var(--keyword)",
  };
  return (
    <span style={{
      width: 10, height: 10, borderRadius: 2,
      background: colors[lang] || "var(--fg-faint)",
      display: "inline-block",
      opacity: 0.85,
    }} />
  );
}

function Tree({ nodes, active, onOpen, depth = 0 }: { nodes: FileTreeNode[]; active: FileId; onOpen: (id: FileId) => void; depth?: number }) {
  return (
    <>
      {nodes.map((n, i) =>
        n.type === "file" ? (
          <FileItem key={i} id={n.id} label={n.label} active={n.id === active} onOpen={onOpen} depth={depth} />
        ) : (
          <FolderItem key={i} node={n} active={active} onOpen={onOpen} depth={depth} />
        )
      )}
    </>
  );
}

function FileItem({ id, label, active, onOpen, depth }: { id: FileId; label: string; active: boolean; onOpen: (id: FileId) => void; depth: number }) {
  const lang = FILES[id].lang;
  return (
    <div
      onClick={() => onOpen(id)}
      style={{
        padding: `0.3rem 0.5rem 0.3rem ${0.4 + depth * 0.85}rem`,
        cursor: "pointer",
        background: active ? "var(--bg-tab-active)" : "transparent",
        color: active ? "var(--fg)" : "var(--fg-dim)",
        fontFamily: "ui-monospace, Menlo, monospace",
        fontSize: 12.5,
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        borderRadius: 3,
      }}
      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLDivElement).style.background = "var(--bg-hover)"; }}
      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
    >
      <FileColor lang={lang} />
      <span>{label}</span>
    </div>
  );
}

function FolderItem({ node, active, onOpen, depth }: { node: Extract<FileTreeNode, { type: "folder" }>; active: FileId; onOpen: (id: FileId) => void; depth: number }) {
  const [open, setOpen] = useState(node.defaultOpen ?? true);
  return (
    <>
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          padding: `0.3rem 0.5rem 0.3rem ${0.4 + depth * 0.85}rem`,
          cursor: "pointer",
          color: "var(--fg-dim)",
          fontFamily: "ui-monospace, Menlo, monospace",
          fontSize: 12.5,
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
        }}
      >
        <span style={{ width: 12, color: "var(--fg-faint)" }}>{open ? "▾" : "▸"}</span>
        <span style={{ color: "var(--yellow)" }}>📁</span>
        <span>{node.label}</span>
      </div>
      {open && <Tree nodes={node.children} active={active} onOpen={onOpen} depth={depth + 1} />}
    </>
  );
}

function StatusBar({ active, terminalOpen, onToggleTerminal }: { active: FileId; terminalOpen: boolean; onToggleTerminal: () => void }) {
  const f = FILES[active];
  return (
    <div style={{
      height: 24,
      background: "var(--statusbar)",
      color: "var(--statusbar-fg)",
      display: "flex",
      alignItems: "center",
      padding: "0 0.75rem",
      fontFamily: "ui-monospace, Menlo, monospace",
      fontSize: 11,
      gap: "1rem",
      flexShrink: 0,
    }}>
      <span>⎇ main</span>
      <span>● 0 errors</span>
      <span>⚡ 0 warnings</span>
      <span style={{ marginLeft: "auto" }}>{f.lang.toUpperCase()}</span>
      <span>UTF-8</span>
      <button onClick={onToggleTerminal} style={{ color: "white", padding: "0 0.4rem" }}>
        {terminalOpen ? "▾ terminal" : "▴ terminal"}
      </button>
    </div>
  );
}

function EmptyState({ onOpen }: { onOpen: (id: FileId) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--fg-faint)", gap: "0.5rem", fontFamily: "ui-monospace, Menlo, monospace" }}>
      <div style={{ fontSize: 14 }}>No file open</div>
      <button onClick={() => onOpen("about")} style={{ color: "var(--accent)", textDecoration: "underline" }}>open about.md</button>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return <span style={{ width: 12, height: 12, borderRadius: "50%", background: color, display: "inline-block" }} />;
}

function ActivityIcon({ active, onClick, svg, title }: { active: boolean; onClick: () => void; svg: React.ReactNode; title: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 36, height: 36,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
        color: active ? "var(--fg)" : "var(--fg-faint)",
      }}
    >
      {svg}
    </button>
  );
}

function FilesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 6h7l2 2h9v11H3z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.6v1.7h.1c.5-.95 1.85-2 3.8-2 4.05 0 4.8 2.65 4.8 6.1V21h-4v-5.5c0-1.3 0-3-1.85-3s-2.15 1.45-2.15 2.9V21H10z"/>
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.05c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.79.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="M3 7l9 6 9-6"/>
    </svg>
  );
}
