// Project agent-pipeline SVG diagrams, ported as React components.
// Colors driven by CSS custom properties so they match the IDE theme.

const NODE_FILL = { fill: "var(--bg-panel-2)", stroke: "var(--border)", strokeWidth: 1 } as const;
const NODE_OUT = { fill: "transparent", stroke: "var(--accent)", strokeWidth: 1 } as const;
const NODE_FAIL = { fill: "transparent", stroke: "var(--tag)", strokeWidth: 1 } as const;
const NODE_ACCENT = { fill: "transparent", stroke: "var(--accent)", strokeWidth: 1.2 } as const;
const ARROW = { stroke: "var(--fg-faint)", strokeWidth: 1, fill: "none" } as const;

const labelStyle: React.CSSProperties = {
  fontFamily: "ui-monospace, Menlo, Consolas, monospace",
  fontSize: 9,
  fill: "var(--fg)",
  letterSpacing: ".04em",
};
const textStyle: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
  fontSize: 9,
  fill: "var(--fg-dim)",
};
const textBright: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
  fontSize: 11,
  fill: "var(--fg)",
  fontWeight: 600,
};

function Marker({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="var(--fg-faint)" />
      </marker>
    </defs>
  );
}

export function RaocDiagram() {
  return (
    <svg viewBox="0 0 320 420" style={{ width: "100%", height: "auto", display: "block" }}>
      <Marker id="arrA" />
      <rect x="100" y="10" width="120" height="36" rx="2" {...NODE_FILL} />
      <text x="160" y="32" style={textBright} textAnchor="middle">📱 Telegram command</text>
      <line x1="160" y1="46" x2="160" y2="62" {...ARROW} markerEnd="url(#arrA)" />
      <rect x="80" y="62" width="160" height="42" rx="2" {...NODE_FILL} />
      <text x="160" y="78" style={labelStyle} textAnchor="middle">INTAKE AGENT</text>
      <text x="160" y="93" style={textStyle} textAnchor="middle">Understands intent</text>
      <line x1="160" y1="104" x2="160" y2="120" {...ARROW} markerEnd="url(#arrA)" />
      <rect x="80" y="120" width="160" height="42" rx="2" {...NODE_FILL} />
      <text x="160" y="136" style={labelStyle} textAnchor="middle">DISCOVERY AGENT</text>
      <text x="160" y="151" style={textStyle} textAnchor="middle">Finds &amp; reads files</text>
      <line x1="160" y1="162" x2="160" y2="178" {...ARROW} markerEnd="url(#arrA)" />
      <rect x="80" y="178" width="160" height="42" rx="2" {...NODE_FILL} />
      <text x="160" y="194" style={labelStyle} textAnchor="middle">PLANNING AGENT</text>
      <text x="160" y="209" style={textStyle} textAnchor="middle">Generates action plan</text>
      <line x1="160" y1="220" x2="160" y2="234" {...ARROW} markerEnd="url(#arrA)" />
      <rect x="95" y="234" width="130" height="28" rx="14" {...NODE_ACCENT} />
      <text x="160" y="252" style={labelStyle} textAnchor="middle">✓ TAP TO APPROVE</text>
      <line x1="160" y1="262" x2="160" y2="278" {...ARROW} markerEnd="url(#arrA)" />
      <rect x="80" y="278" width="160" height="42" rx="2" {...NODE_FILL} />
      <text x="160" y="294" style={labelStyle} textAnchor="middle">EXECUTION AGENT</text>
      <text x="160" y="309" style={textStyle} textAnchor="middle">Runs the plan safely</text>
      <line x1="160" y1="320" x2="160" y2="336" {...ARROW} markerEnd="url(#arrA)" />
      <rect x="20" y="336" width="130" height="42" rx="2" {...NODE_FILL} />
      <text x="85" y="352" style={labelStyle} textAnchor="middle">VERIFICATION</text>
      <text x="85" y="367" style={textStyle} textAnchor="middle">Checks result</text>
      <rect x="170" y="336" width="130" height="42" rx="2" {...NODE_FILL} />
      <text x="235" y="352" style={labelStyle} textAnchor="middle">REPORTER</text>
      <text x="235" y="367" style={textStyle} textAnchor="middle">Sends proof to phone</text>
      <line x1="160" y1="336" x2="85" y2="336" {...ARROW} />
      <line x1="160" y1="336" x2="235" y2="336" {...ARROW} />
      <line x1="85" y1="378" x2="85" y2="400" {...ARROW} markerEnd="url(#arrA)" />
      <line x1="235" y1="378" x2="235" y2="400" {...ARROW} markerEnd="url(#arrA)" />
      <text x="160" y="415" style={textBright} textAnchor="middle">📱 Result delivered</text>
    </svg>
  );
}

export function BugfixDiagram() {
  return (
    <svg viewBox="0 0 320 400" style={{ width: "100%", height: "auto", display: "block" }}>
      <Marker id="arrB" />
      <rect x="90" y="10" width="140" height="36" rx="2" {...NODE_FILL} />
      <text x="160" y="32" style={textBright} textAnchor="middle">🎫 JIRA Ticket</text>
      <line x1="160" y1="46" x2="160" y2="62" {...ARROW} markerEnd="url(#arrB)" />
      <rect x="70" y="62" width="180" height="50" rx="2" {...NODE_FILL} />
      <text x="160" y="80" style={labelStyle} textAnchor="middle">PLANNER AGENT</text>
      <text x="160" y="95" style={textStyle} textAnchor="middle">Reads ticket · identifies</text>
      <text x="160" y="106" style={textStyle} textAnchor="middle">affected files &amp; root cause</text>
      <line x1="160" y1="112" x2="160" y2="128" {...ARROW} markerEnd="url(#arrB)" />
      <rect x="70" y="128" width="180" height="50" rx="2" {...NODE_FILL} />
      <text x="160" y="146" style={labelStyle} textAnchor="middle">DEVELOPER AGENT</text>
      <text x="160" y="161" style={textStyle} textAnchor="middle">Generates code fix</text>
      <text x="160" y="172" style={textStyle} textAnchor="middle">with codebase context</text>
      <line x1="160" y1="178" x2="160" y2="194" {...ARROW} markerEnd="url(#arrB)" />
      <rect x="70" y="194" width="180" height="50" rx="2" {...NODE_FILL} />
      <text x="160" y="212" style={labelStyle} textAnchor="middle">QA AGENT</text>
      <text x="160" y="227" style={textStyle} textAnchor="middle">Runs test suite</text>
      <text x="160" y="238" style={textStyle} textAnchor="middle">against the fix</text>
      <path d="M70,219 Q20,219 20,160 Q20,142 70,142" {...ARROW} strokeDasharray="3,3" markerEnd="url(#arrB)" />
      <text x="14" y="185" style={{ ...textStyle, fontSize: 7 }} textAnchor="middle">retry</text>
      <text x="14" y="195" style={{ ...textStyle, fontSize: 7 }} textAnchor="middle">≤3×</text>
      <line x1="160" y1="244" x2="160" y2="260" {...ARROW} markerEnd="url(#arrB)" />
      <rect x="70" y="260" width="180" height="50" rx="2" {...NODE_FILL} />
      <text x="160" y="278" style={labelStyle} textAnchor="middle">COMMUNICATOR AGENT</text>
      <text x="160" y="293" style={textStyle} textAnchor="middle">Updates JIRA · opens</text>
      <text x="160" y="304" style={textStyle} textAnchor="middle">GitHub PR with diff</text>
      <line x1="160" y1="310" x2="160" y2="326" {...ARROW} markerEnd="url(#arrB)" />
      <rect x="30" y="326" width="110" height="36" rx="2" {...NODE_OUT} />
      <text x="85" y="348" style={textBright} textAnchor="middle">🔀 GitHub PR</text>
      <rect x="180" y="326" width="110" height="36" rx="2" {...NODE_OUT} />
      <text x="235" y="348" style={textBright} textAnchor="middle">🎫 JIRA updated</text>
      <line x1="160" y1="326" x2="85" y2="326" {...ARROW} />
      <line x1="160" y1="326" x2="235" y2="326" {...ARROW} />
    </svg>
  );
}

export function EvalHarnessDiagram() {
  return (
    <svg viewBox="0 0 300 360" style={{ width: "100%", height: "auto", display: "block" }}>
      <Marker id="arrC" />
      <rect x="75" y="10" width="150" height="36" rx="2" {...NODE_FILL} />
      <text x="150" y="32" style={textBright} textAnchor="middle">Test dataset (JSONL)</text>
      <line x1="150" y1="46" x2="150" y2="62" {...ARROW} markerEnd="url(#arrC)" />
      <rect x="55" y="62" width="190" height="50" rx="2" {...NODE_FILL} />
      <text x="150" y="80" style={labelStyle} textAnchor="middle">HARD CHECKS</text>
      <text x="150" y="95" style={textStyle} textAnchor="middle">Schema · citations · format · length</text>
      <text x="150" y="106" style={textStyle} textAnchor="middle">Deterministic · zero LLM cost</text>
      <line x1="150" y1="112" x2="150" y2="128" {...ARROW} markerEnd="url(#arrC)" />
      <path d="M55,88 Q10,88 10,140 Q10,150 55,150" {...ARROW} strokeDasharray="3,3" markerEnd="url(#arrC)" />
      <text x="6" y="120" style={{ ...textStyle, fontSize: 7 }} textAnchor="middle">fail →</text>
      <text x="6" y="130" style={{ ...textStyle, fontSize: 7 }} textAnchor="middle">skip</text>
      <rect x="55" y="128" width="190" height="50" rx="2" {...NODE_FILL} />
      <text x="150" y="146" style={labelStyle} textAnchor="middle">LLM-AS-JUDGE</text>
      <text x="150" y="161" style={textStyle} textAnchor="middle">Rubric-based A vs B scoring</text>
      <text x="150" y="172" style={textStyle} textAnchor="middle">Calibration: flip rate · order bias</text>
      <line x1="150" y1="178" x2="150" y2="194" {...ARROW} markerEnd="url(#arrC)" />
      <rect x="55" y="194" width="190" height="50" rx="2" {...NODE_FILL} />
      <text x="150" y="212" style={labelStyle} textAnchor="middle">METRICS</text>
      <text x="150" y="227" style={textStyle} textAnchor="middle">Win rate + 95% CI · refusal rate</text>
      <text x="150" y="238" style={textStyle} textAnchor="middle">Format pass · per-tag breakdown</text>
      <line x1="150" y1="244" x2="150" y2="260" {...ARROW} markerEnd="url(#arrC)" />
      <rect x="55" y="260" width="190" height="42" rx="2" {...NODE_FILL} />
      <text x="150" y="278" style={labelStyle} textAnchor="middle">QUALITY GATE</text>
      <text x="150" y="293" style={textStyle} textAnchor="middle">Thresholds · regression vs baseline</text>
      <line x1="150" y1="302" x2="150" y2="318" {...ARROW} markerEnd="url(#arrC)" />
      <rect x="20" y="318" width="100" height="32" rx="2" {...NODE_OUT} />
      <text x="70" y="338" style={textBright} textAnchor="middle">✓ PASS · exit 0</text>
      <rect x="180" y="318" width="100" height="32" rx="2" {...NODE_FAIL} />
      <text x="230" y="338" style={textBright} textAnchor="middle">✗ FAIL · exit 2</text>
      <line x1="150" y1="318" x2="70" y2="318" {...ARROW} />
      <line x1="150" y1="318" x2="230" y2="318" {...ARROW} />
    </svg>
  );
}

export function getDiagram(id: string) {
  switch (id) {
    case "raoc": return <RaocDiagram />;
    case "bugfix-ai-pilot": return <BugfixDiagram />;
    case "llm-eval-harness": return <EvalHarnessDiagram />;
    default: return null;
  }
}
