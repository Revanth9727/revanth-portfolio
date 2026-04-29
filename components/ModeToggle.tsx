"use client";

import { useEffect, useState } from "react";

export type Mode = "recruiter" | "dev";

export function useMode(): [Mode, (m: Mode) => void] {
  const [mode, setModeState] = useState<Mode>("recruiter");

  // Read from localStorage / data-mode on the html element on mount.
  useEffect(() => {
    const fromHtml = document.documentElement.dataset.mode;
    if (fromHtml === "dev" || fromHtml === "recruiter") {
      setModeState(fromHtml);
      document.body.className = fromHtml;
      return;
    }
    try {
      const stored = localStorage.getItem("mode");
      if (stored === "dev" || stored === "recruiter") {
        setModeState(stored);
        document.body.className = stored;
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setMode = (m: Mode) => {
    setModeState(m);
    document.body.className = m;
    document.documentElement.dataset.mode = m;
    try {
      localStorage.setItem("mode", m);
    } catch {
      /* ignore */
    }
  };

  return [mode, setMode];
}

export default function ModeToggle({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const isDev = mode === "dev";
  return (
    <button
      onClick={() => setMode(isDev ? "recruiter" : "dev")}
      aria-label={isDev ? "Switch to recruiter view" : "Switch to developer view"}
      title={isDev ? "Switch to recruiter view" : "View source — IDE mode"}
      style={{
        position: "fixed",
        top: "1.25rem",
        right: "1.25rem",
        zIndex: 200,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 0.85rem",
        borderRadius: "999px",
        border: `1px solid ${isDev ? "#30363d" : "var(--rule-strong)"}`,
        background: isDev ? "rgba(13, 17, 23, 0.85)" : "rgba(8, 8, 11, 0.6)",
        backdropFilter: "blur(8px)",
        color: isDev ? "#9ba3ac" : "var(--ink-soft)",
        fontFamily: "JetBrains Mono, ui-monospace, monospace",
        fontSize: "0.78rem",
        fontWeight: 500,
        transition: "all 0.18s",
      }}
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: isDev ? "#79b8ff" : "var(--accent)",
          boxShadow: isDev
            ? "0 0 8px rgba(121, 184, 255, 0.5)"
            : "0 0 8px rgba(99, 102, 241, 0.5)",
          transition: "all 0.18s",
        }}
      />
      <span>{isDev ? "DEV MODE" : "RECRUITER MODE"}</span>
      <span style={{ opacity: 0.5, marginLeft: "0.15rem" }}>↔</span>
    </button>
  );
}
