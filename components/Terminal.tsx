"use client";

import { useState, useRef, useEffect } from "react";
import { profile, projects, experience, skills, education } from "@/data/content";

type Line = { kind: "input" | "output" | "error"; text: string };

const HELP = `Available commands:
  whoami              show profile summary
  ls                  list "files"
  cat <file>          show file contents
  experience          show roles
  skills              show skills
  projects            list projects
  education           show education
  contact             show contact info
  open <url>          open URL in new tab (e.g. open linkedin)
  date                current time
  echo <text>         echo back
  clear               clear terminal
  help                show this message
`;

const LS_FILES = [
  "about.md", "experience.json", "skills.yaml", "education.md",
  "projects/raoc.md", "projects/bugfix-ai-pilot.md", "projects/llm-eval-harness.md",
  "contact.ts", "rag_playground.ipynb",
];

export default function Terminal({ onOpenFile }: { onOpenFile?: (id: string) => void }) {
  const [lines, setLines] = useState<Line[]>([
    { kind: "output", text: "revanth-portfolio · zsh · type `help` for commands" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [lines]);

  const print = (text: string, kind: Line["kind"] = "output") =>
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
        print(HELP);
        break;
      case "whoami":
        print(`${profile.name}\n${profile.title}\n\n${profile.summary}`);
        break;
      case "ls":
        if (args[0] === "projects" || args[0] === "projects/") {
          print(projects.map((p) => `${p.id}.md`).join("  "));
        } else {
          print(LS_FILES.join("  "));
        }
        break;
      case "cat": {
        const file = args[0];
        if (!file) { print("usage: cat <file>", "error"); break; }
        const fileMap: Record<string, () => string> = {
          "about.md": () => `${profile.name}\n${profile.title}\n\n${profile.summary}`,
          "experience.json": () => JSON.stringify(experience.map((e) => ({ company: e.company, role: e.role, period: e.period })), null, 2),
          "skills.yaml": () => Object.entries(skills).map(([k, v]) => `${k}:\n${v.map((s) => "  - " + s).join("\n")}`).join("\n\n"),
          "education.md": () => education.map((e) => `${e.degree}\n${e.school} — ${e.period}`).join("\n\n"),
          "contact.ts": () => `email: ${profile.email}\nlinkedin: ${profile.linkedin}\ngithub: ${profile.github}\nresume: ${profile.resume}`,
        };
        const lookup = fileMap[file] || fileMap[file.replace(/^\.?\/?/, "")];
        if (lookup) print(lookup());
        else if (file.startsWith("projects/")) {
          const id = file.replace("projects/", "").replace(".md", "");
          const p = projects.find((x) => x.id === id);
          if (p) print(`${p.name} — ${p.tagline}\n\n${p.description}\n\nstack: ${p.stack.join(", ")}\nsource: ${p.url}`);
          else print(`cat: ${file}: No such file`, "error");
        } else {
          print(`cat: ${file}: No such file`, "error");
        }
        break;
      }
      case "experience": {
        const out = experience.map((e) =>
          `${e.role} · ${e.company}\n  ${e.period}\n  ${e.items.length} items`
        ).join("\n\n");
        print(out);
        break;
      }
      case "skills": {
        const out = Object.entries(skills).map(([k, v]) => `${k}: ${v.join(", ")}`).join("\n");
        print(out);
        break;
      }
      case "projects": {
        const out = projects.map((p) => `${p.id.padEnd(22)} ${p.tagline}`).join("\n");
        print(out);
        break;
      }
      case "education": {
        const out = education.map((e) => `${e.degree}\n  ${e.school} — ${e.period}`).join("\n\n");
        print(out);
        break;
      }
      case "contact":
        print(`email:    ${profile.email}\nlinkedin: ${profile.linkedin}\ngithub:   ${profile.github}\nresume:   ${profile.resume}`);
        break;
      case "open": {
        const target = args[0]?.toLowerCase();
        const map: Record<string, string> = {
          linkedin: profile.linkedin,
          github: profile.github,
          resume: profile.resume,
          email: `mailto:${profile.email}`,
        };
        const url = map[target ?? ""] || target;
        if (url) {
          window.open(url, "_blank");
          print(`opening ${url}`);
        } else {
          print("usage: open <linkedin|github|resume|email|url>", "error");
        }
        break;
      }
      case "date":
        print(new Date().toString());
        break;
      case "echo":
        print(args.join(" "));
        break;
      case "clear":
        setLines([]);
        break;
      case "sudo":
        print("nope. you're not in the sudoers file. this incident will be reported. (jk)", "error");
        break;
      case "exit":
      case "quit":
        print("can't exit. you're in a portfolio. try `help` instead.");
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--bg)" }}>
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.5rem 0.75rem",
          fontFamily: "ui-monospace, Menlo, Consolas, monospace",
          fontSize: 12.5,
          lineHeight: 1.5,
        }}
      >
        {lines.map((l, i) => (
          <pre key={i} style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            color: l.kind === "error" ? "var(--tag)" : l.kind === "input" ? "var(--accent)" : "var(--fg-dim)",
            margin: 0,
            fontFamily: "inherit",
          }}>{l.text}</pre>
        ))}
        {/* Active prompt */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.2rem" }}>
          <span style={{ color: "var(--accent)" }}>$</span>
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
              color: "var(--fg)",
              caretColor: "var(--accent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
