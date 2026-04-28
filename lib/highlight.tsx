import React from "react";

// ─────────────────────────────────────────────────────────────
// Tiny token highlighter (zero deps).
// Returns React nodes wrapped in spans with className tokens.
// ─────────────────────────────────────────────────────────────

type Token = { type: string; value: string };

const C = {
  key: { color: "var(--accent)" },
  string: { color: "var(--string)" },
  number: { color: "var(--number)" },
  bool: { color: "var(--keyword)" },
  null: { color: "var(--keyword)" },
  punc: { color: "var(--fg-dim)" },
  comment: { color: "var(--comment)", fontStyle: "italic" as const },
  yamlKey: { color: "var(--accent)" },
  yamlBullet: { color: "var(--keyword)" },
  yamlScalar: { color: "var(--string)" },
  mdH: { color: "var(--accent)", fontWeight: 600 as const },
  mdBold: { color: "var(--fg)", fontWeight: 600 as const },
  mdItalic: { color: "var(--fg)", fontStyle: "italic" as const },
  mdLink: { color: "var(--accent)", textDecoration: "underline" as const },
  mdInlineCode: {
    color: "var(--tag)",
    background: "var(--bg-panel-2)",
    padding: "0 4px",
    borderRadius: 3,
  },
  text: {},
};

// JSON tokenizer
function tokenizeJSON(src: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    // whitespace + newlines
    if (/\s/.test(c)) {
      let j = i;
      while (j < n && /\s/.test(src[j])) j++;
      tokens.push({ type: "ws", value: src.slice(i, j) });
      i = j;
      continue;
    }
    // strings
    if (c === '"') {
      let j = i + 1;
      while (j < n && src[j] !== '"') {
        if (src[j] === "\\") j += 2;
        else j++;
      }
      const str = src.slice(i, j + 1);
      // peek for ":" → it's a key
      let k = j + 1;
      while (k < n && /\s/.test(src[k])) k++;
      const isKey = src[k] === ":";
      tokens.push({ type: isKey ? "key" : "string", value: str });
      i = j + 1;
      continue;
    }
    // numbers
    if (/[-0-9]/.test(c) && /[0-9]/.test(src[i + 1] || c)) {
      let j = i;
      while (j < n && /[-0-9.eE+]/.test(src[j])) j++;
      tokens.push({ type: "number", value: src.slice(i, j) });
      i = j;
      continue;
    }
    // bool / null
    if (src.startsWith("true", i)) { tokens.push({ type: "bool", value: "true" }); i += 4; continue; }
    if (src.startsWith("false", i)) { tokens.push({ type: "bool", value: "false" }); i += 5; continue; }
    if (src.startsWith("null", i)) { tokens.push({ type: "null", value: "null" }); i += 4; continue; }
    // punctuation
    if ("{}[],:".includes(c)) {
      tokens.push({ type: "punc", value: c });
      i++;
      continue;
    }
    tokens.push({ type: "text", value: c });
    i++;
  }
  return tokens;
}

export function HighlightJSON({ src }: { src: string }) {
  const toks = tokenizeJSON(src);
  return (
    <>
      {toks.map((t, idx) => {
        const style =
          t.type === "key" ? C.key :
          t.type === "string" ? C.string :
          t.type === "number" ? C.number :
          t.type === "bool" ? C.bool :
          t.type === "null" ? C.null :
          t.type === "punc" ? C.punc :
          C.text;
        return <span key={idx} style={style}>{t.value}</span>;
      })}
    </>
  );
}

// YAML highlighter — line-based, simpler.
export function HighlightYAML({ src }: { src: string }) {
  const lines = src.split("\n");
  return (
    <>
      {lines.map((line, idx) => (
        <React.Fragment key={idx}>
          {renderYAMLLine(line)}
          {idx < lines.length - 1 ? "\n" : ""}
        </React.Fragment>
      ))}
    </>
  );
}

function renderYAMLLine(line: string) {
  // comment
  if (/^\s*#/.test(line)) return <span style={C.comment}>{line}</span>;

  // bullet item: "  - value"
  const bullet = line.match(/^(\s*)(-)(\s+)(.*)$/);
  if (bullet) {
    return (
      <>
        <span>{bullet[1]}</span>
        <span style={C.yamlBullet}>{bullet[2]}</span>
        <span>{bullet[3]}</span>
        <span style={C.yamlScalar}>{bullet[4]}</span>
      </>
    );
  }

  // "key: value"
  const kv = line.match(/^(\s*)([A-Za-z0-9_\-& ]+?)(:)(\s*)(.*)$/);
  if (kv) {
    return (
      <>
        <span>{kv[1]}</span>
        <span style={C.yamlKey}>{kv[2]}</span>
        <span style={C.punc}>{kv[3]}</span>
        <span>{kv[4]}</span>
        <span style={C.yamlScalar}>{kv[5]}</span>
      </>
    );
  }

  return <span>{line}</span>;
}

// Lightweight markdown-ish renderer with inline syntax.
// Supports: # heading, ## heading, **bold**, *italic*, `code`, [link](url), --- rule.
export function MarkdownLite({ src }: { src: string }) {
  const lines = src.split("\n");
  const out: React.ReactNode[] = [];
  let listBuffer: React.ReactNode[] = [];

  const flushList = () => {
    if (listBuffer.length) {
      out.push(
        <ul key={"ul-" + out.length} style={{ paddingLeft: "1.4rem", margin: "0.4rem 0", color: "var(--fg-dim)" }}>
          {listBuffer}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((line, idx) => {
    if (/^---$/.test(line.trim())) {
      flushList();
      out.push(<hr key={idx} style={{ border: "none", borderTop: "1px solid var(--border)", margin: "1rem 0" }} />);
      return;
    }
    if (/^# /.test(line)) {
      flushList();
      out.push(
        <h1 key={idx} style={{ fontSize: "1.6rem", fontWeight: 600, margin: "1rem 0 0.4rem", color: "var(--fg)" }}>
          {renderInline(line.replace(/^# /, ""))}
        </h1>
      );
      return;
    }
    if (/^## /.test(line)) {
      flushList();
      out.push(
        <h2 key={idx} style={{ fontSize: "1.15rem", fontWeight: 600, margin: "1.4rem 0 0.4rem", color: "var(--accent)" }}>
          {renderInline(line.replace(/^## /, ""))}
        </h2>
      );
      return;
    }
    if (/^### /.test(line)) {
      flushList();
      out.push(
        <h3 key={idx} style={{ fontSize: "1rem", fontWeight: 600, margin: "1rem 0 0.3rem", color: "var(--fg)" }}>
          {renderInline(line.replace(/^### /, ""))}
        </h3>
      );
      return;
    }
    if (/^- /.test(line)) {
      listBuffer.push(<li key={idx}>{renderInline(line.replace(/^- /, ""))}</li>);
      return;
    }
    flushList();
    if (line.trim() === "") {
      out.push(<div key={idx} style={{ height: "0.5rem" }} />);
      return;
    }
    out.push(<p key={idx} style={{ color: "var(--fg-dim)", margin: "0.4rem 0" }}>{renderInline(line)}</p>);
  });
  flushList();
  return <>{out}</>;
}

function renderInline(text: string): React.ReactNode {
  // Build by regex passes. Order matters: code → bold → italic → link.
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const patterns: Array<{ re: RegExp; render: (m: RegExpMatchArray) => React.ReactNode }> = [
    {
      re: /`([^`]+)`/,
      render: (m) => <code key={key++} style={C.mdInlineCode}>{m[1]}</code>,
    },
    {
      re: /\*\*([^*]+)\*\*/,
      render: (m) => <strong key={key++} style={C.mdBold}>{m[1]}</strong>,
    },
    {
      re: /\*([^*]+)\*/,
      render: (m) => <em key={key++} style={C.mdItalic}>{m[1]}</em>,
    },
    {
      re: /\[([^\]]+)\]\(([^)]+)\)/,
      render: (m) => (
        <a key={key++} href={m[2]} target="_blank" rel="noopener" style={C.mdLink}>
          {m[1]}
        </a>
      ),
    },
  ];

  while (remaining.length > 0) {
    let earliest = -1;
    let earliestPat: typeof patterns[number] | null = null;
    let earliestMatch: RegExpMatchArray | null = null;

    for (const pat of patterns) {
      const m = remaining.match(pat.re);
      if (m && m.index !== undefined && (earliest === -1 || m.index < earliest)) {
        earliest = m.index;
        earliestPat = pat;
        earliestMatch = m;
      }
    }

    if (!earliestPat || !earliestMatch || earliest === -1) {
      nodes.push(<React.Fragment key={key++}>{remaining}</React.Fragment>);
      break;
    }

    if (earliest > 0) nodes.push(<React.Fragment key={key++}>{remaining.slice(0, earliest)}</React.Fragment>);
    nodes.push(earliestPat.render(earliestMatch));
    remaining = remaining.slice(earliest + earliestMatch[0].length);
  }

  return <>{nodes}</>;
}
