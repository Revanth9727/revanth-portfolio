import { profile, experience, skills, education, projects } from "@/data/content";

// about.md
export function aboutMd(): string {
  return `# ${profile.name}

## ${profile.title}

${profile.summary}

---

## Contact

- Email: [${profile.email}](mailto:${profile.email})
- LinkedIn: [${profile.linkedin.replace("https://www.", "")}](${profile.linkedin})
- GitHub: [${profile.github.replace("https://", "")}](${profile.github})
- Resume: [Download PDF](${profile.resume})

---

## What I'm looking for

Senior / Lead roles building production GenAI platforms — RAG systems, LLM evaluation infrastructure, AI agents, and enterprise AI products. Especially interested in teams that care about reliability, cost, observability, governance, and measurable model quality.
`;
}

// experience.json
export function experienceJson(): string {
  return JSON.stringify(experience, null, 2);
}

// skills.yaml
export function skillsYaml(): string {
  let out = "# Skills\n# Tools used in production to solve real reliability,\n# latency, retrieval, or cost problems.\n\n";
  for (const [cat, list] of Object.entries(skills)) {
    out += `${cat}:\n`;
    for (const s of list) out += `  - ${s}\n`;
    out += "\n";
  }
  return out.trimEnd();
}

// education.md
export function educationMd(): string {
  let out = "# Education\n\n";
  for (const e of education) {
    out += `## ${e.degree}\n`;
    out += `*${e.school}* — ${e.period}\n\n`;
  }
  return out;
}

// project markdown
export function projectMd(id: string): string {
  const p = projects.find((x) => x.id === id);
  if (!p) return "# Not found";
  let out = `# ${p.name}\n\n`;
  out += `## ${p.tagline}\n\n`;
  out += `\`${p.badge}\`\n\n`;
  out += `${p.description}\n\n`;
  out += `### Highlights\n\n`;
  for (const b of p.bullets) out += `- ${b}\n`;
  out += `\n### Stack\n\n`;
  out += p.stack.map((s) => `\`${s}\``).join(" · ") + "\n\n";
  out += `### Source\n\n[${p.url.replace("https://", "")}](${p.url})\n`;
  return out;
}

// contact.ts (rendered as TypeScript-ish)
export function contactTs(): string {
  return `// contact.ts
// Senior / Lead GenAI roles welcome.

export const contact = {
  name: "${profile.name}",
  role: "${profile.title}",
  email: "${profile.email}",
  linkedin: "${profile.linkedin}",
  github: "${profile.github}",
  resume: "${profile.resume}",
} as const;

export async function reachOut(message: string) {
  return fetch(\`mailto:\${contact.email}\`, {
    subject: message,
  });
}
`;
}
