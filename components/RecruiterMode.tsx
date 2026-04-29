"use client";

import {
  profile,
  tagline,
  intro,
  stats,
  experience,
  projects,
  education,
  lookingFor,
} from "@/data/content";
import RagDemo from "@/components/RagDemo";

export default function RecruiterMode() {
  return (
    <main className="recruiter-page">
      <Hero />

      <Section eyebrow="Headline numbers">
        <StatGrid />
      </Section>

      <Section eyebrow="Experience" title="Where I've been working" id="experience">
        {experience.map((role, i) => (
          <RoleCard key={i} role={role} isLast={i === experience.length - 1} />
        ))}
      </Section>

      <Section
        eyebrow="Live demo"
        title="What I actually do, made visible"
        id="demo"
      >
        <p style={{ marginBottom: "1.25rem", maxWidth: "62ch" }}>
          A lot of my work is invisible — it&apos;s the part of an AI system that happens between
          you typing a question and the answer appearing. Below is a small interactive
          version, using my own work history as the &ldquo;knowledge.&rdquo;
        </p>
        <p style={{ marginBottom: "2rem", maxWidth: "62ch", color: "var(--ink-mute)" }}>
          Type a question (or pick a preset), and you&apos;ll see the steps the system goes
          through: breaking down the question, searching for information, ranking what it
          found, checking the answer is trustworthy, and writing a response.
        </p>
        <RagDemo />
      </Section>

      <Section eyebrow="Side projects" title="Things I built on my own time" id="projects">
        <p style={{ marginBottom: "2.5rem", color: "var(--ink-mute)", maxWidth: "62ch" }}>
          Side projects where I get to try out ideas I&apos;ve been thinking about. All open source.
        </p>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Education" title="Where I studied" id="education">
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {education.map((e, i) => (
            <div
              key={i}
              style={{
                padding: "1.5rem 1.75rem",
                background: "var(--bg-card)",
                border: "1px solid var(--rule)",
                borderRadius: "12px",
              }}
            >
              <h3 style={{ marginBottom: "0.4rem" }}>{e.degree}</h3>
              <div className="mono" style={{ color: "var(--ink-mute)", fontSize: "0.92rem" }}>
                {e.school} · {e.period}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Get in touch" title="Let's build something" id="contact">
        <p style={{ marginBottom: "1.25rem", maxWidth: "62ch", fontSize: "1.05rem" }}>
          {lookingFor}
        </p>
        <p style={{ marginBottom: "2rem", maxWidth: "62ch", color: "var(--ink-mute)" }}>
          The fastest way to reach me is email. I read everything — so if you&apos;re building something
          interesting, send a note.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
          <CTA href={`mailto:${profile.email}`} primary>
            {profile.email}
          </CTA>
          <CTA href={profile.linkedin}>LinkedIn</CTA>
          <CTA href={profile.github}>GitHub</CTA>
          <CTA href={profile.resume} download="Revanth_Gollapudi_Resume.pdf">
            Resume
          </CTA>
        </div>
      </Section>

      <Footer />
    </main>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */
function Hero() {
  return (
    <header style={{ marginBottom: "5rem", paddingTop: "1rem" }}>
      <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>
        {profile.title}
      </div>
      <h1 style={{ marginBottom: "1.5rem" }}>{profile.name}</h1>
      <p
        style={{
          fontSize: "1.6rem",
          lineHeight: 1.35,
          color: "var(--ink)",
          maxWidth: "24ch",
          marginBottom: "1.75rem",
          fontWeight: 500,
          letterSpacing: "-0.015em",
        }}
      >
        {tagline}
      </p>
      <p style={{ maxWidth: "62ch", fontSize: "1.05rem" }}>{intro}</p>
    </header>
  );
}

/* ─── Section wrapper ──────────────────────────────────── */
function Section({
  eyebrow,
  title,
  id,
  children,
}: {
  eyebrow: string;
  title?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-spacer" style={{ scrollMarginTop: "1.5rem" }}>
      <div className="eyebrow" style={{ marginBottom: title ? "1rem" : "1.5rem" }}>
        {eyebrow}
      </div>
      {title && (
        <h2 style={{ marginBottom: "2rem", maxWidth: "22ch" }}>
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

/* ─── Stat grid ────────────────────────────────────────── */
function StatGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "1px",
        background: "var(--rule)",
        border: "1px solid var(--rule)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            padding: "1.5rem 1.75rem",
            background: "var(--bg-card)",
          }}
        >
          <div
            style={{
              fontSize: "1.85rem",
              fontWeight: 600,
              color: "var(--ink)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: "0.4rem",
            }}
          >
            {s.value}
          </div>
          <div
            className="mono"
            style={{
              fontSize: "0.78rem",
              color: "var(--ink-mute)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Role card ────────────────────────────────────────── */
function RoleCard({ role, isLast }: { role: typeof experience[number]; isLast: boolean }) {
  return (
    <article
      style={{
        marginBottom: isLast ? 0 : "2.5rem",
        padding: "2rem 2.25rem",
        background: "var(--bg-card)",
        border: "1px solid var(--rule)",
        borderRadius: "12px",
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "0.75rem" }}>
        <div>
          <h3 style={{ marginBottom: "0.35rem", fontSize: "1.4rem" }}>
            {role.role}{" "}
            <span style={{ color: "var(--ink-mute)", fontWeight: 500 }}>· {role.company}</span>
          </h3>
          <div className="mono" style={{ fontSize: "0.85rem", color: "var(--ink-faint)" }}>
            {role.period} · {role.location}
          </div>
        </div>
      </header>
      <p style={{ marginBottom: "1.75rem", maxWidth: "62ch" }}>{role.story}</p>

      <div style={{ display: "grid", gap: "1.25rem" }}>
        {role.highlights.map((h, i) => (
          <div key={i}>
            <h4 style={{ fontSize: "1rem", color: "var(--ink)", marginBottom: "0.4rem", fontWeight: 600 }}>
              <span style={{ color: "var(--accent)", marginRight: "0.5rem" }}>—</span>
              {h.title}
            </h4>
            <p style={{ fontSize: "0.95rem", paddingLeft: "1.5rem" }}>{h.body}</p>
          </div>
        ))}
      </div>

      {role.stack && role.stack.length > 0 && (
        <div style={{ marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid var(--rule)", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {role.stack.map((s) => (
            <span
              key={s}
              className="mono"
              style={{
                fontSize: "0.75rem",
                color: "var(--ink-mute)",
                padding: "0.2rem 0.6rem",
                background: "var(--bg-elev)",
                borderRadius: "4px",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

/* ─── Project card ─────────────────────────────────────── */
function ProjectCard({ project }: { project: typeof projects[number] }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener"
      style={{
        display: "block",
        padding: "1.75rem 2rem",
        background: "var(--bg-card)",
        border: "1px solid var(--rule)",
        borderRadius: "12px",
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.2s",
      }}
      className="project-card"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", marginBottom: "0.4rem" }}>
        <h3 style={{ fontSize: "1.3rem", color: "var(--ink)" }}>{project.name}</h3>
        <span
          className="mono"
          style={{
            fontSize: "0.85rem",
            color: "var(--accent-bright)",
          }}
        >
          ↗ GitHub
        </span>
      </div>
      <div style={{ color: "var(--ink-mute)", marginBottom: "0.85rem", fontSize: "0.95rem" }}>
        {project.subtitle}
      </div>
      <p style={{ marginBottom: "1.1rem", fontSize: "0.95rem" }}>{project.story}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.stack.map((s) => (
          <span
            key={s}
            className="mono"
            style={{
              fontSize: "0.72rem",
              color: "var(--ink-mute)",
              padding: "0.15rem 0.55rem",
              background: "var(--bg-elev)",
              borderRadius: "4px",
            }}
          >
            {s}
          </span>
        ))}
      </div>
      <style>{`
        .project-card:hover {
          border-color: var(--accent) !important;
          background: var(--bg-elev) !important;
        }
      `}</style>
    </a>
  );
}

/* ─── CTA buttons ──────────────────────────────────────── */
function CTA({
  href,
  children,
  primary,
  download,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  download?: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel="noopener"
      download={download}
      style={{
        padding: "0.75rem 1.4rem",
        borderRadius: "999px",
        background: primary ? "var(--accent)" : "transparent",
        color: primary ? "var(--ink)" : "var(--ink)",
        border: primary ? "1px solid var(--accent)" : "1px solid var(--rule-strong)",
        fontSize: "0.95rem",
        fontWeight: 500,
        textDecoration: "none",
        transition: "all 0.15s",
      }}
    >
      {children}
    </a>
  );
}

/* ─── Footer ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        marginTop: "6rem",
        paddingTop: "2rem",
        borderTop: "1px solid var(--rule)",
        fontSize: "0.85rem",
        color: "var(--ink-faint)",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <span>© {new Date().getFullYear()} Revanth Gollapudi.</span>
      <span className="mono" style={{ fontSize: "0.78rem" }}>
        Tip: try the toggle in the corner ↗
      </span>
    </footer>
  );
}
