# Revanth Gollapudi — Portfolio

Next.js 14 (App Router) + TypeScript. A dual-mode portfolio:

- **Recruiter mode** (default) — clean, modern dark layout inspired by Linear.
- **Dev mode** — full IDE shell with sidebar, tabs, syntax-highlighted files, and an integrated terminal with working commands.

A toggle in the top-right flips between modes. The selection persists in `localStorage`, so engineers who switch into dev mode stay there on the next visit.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Editing content

All copy lives in **`data/content.ts`**. Both modes read from this single file, so edit once and both views update.

- `profile` — name, title, summary, contact links
- `tagline` — one-liner under your name
- `intro` — short intro paragraph
- `stats` — headline metric strip in recruiter mode
- `experience` — roles, newest first
- `skills` — skill categories rendered as `skills.yaml` in dev mode
- `projects` — side projects
- `education` — degrees
- `lookingFor` — the contact-section paragraph
- `ragCorpus` — knowledge base for the live RAG demo

## Resume

Drop `Revanth_Gollapudi_Resume.pdf` into the `public/` folder. It will be served at `/Revanth_Gollapudi_Resume.pdf`, and the download buttons will work.

## Vercel Deployment

If your Vercel project still has Framework Preset set to "Other" from the original static-HTML setup, change it before pushing this:

1. Vercel project → **Settings** → **Build & Development Settings**
2. **Framework Preset** → **Next.js**
3. Make sure **Root Directory**, **Build Command**, **Output Directory**, and **Install Command** are blank so Vercel uses defaults.
4. Trigger a redeploy: Deployments → latest → menu → Redeploy → uncheck "Use existing Build Cache" → Redeploy.

## Project Structure

```text
.
├── app/
│   ├── globals.css          # Two themes share this stylesheet
│   ├── layout.tsx           # Loads fonts, applies body class
│   └── page.tsx             # Mode switch + toggle
├── components/
│   ├── ModeToggle.tsx       # Top-right pill, owns mode state
│   ├── RecruiterMode.tsx    # Linear-style default view
│   ├── DevMode.tsx          # IDE shell: sidebar, tabs, terminal, syntax highlighter
│   ├── FileView.tsx         # Renders the active dev-mode file view
│   ├── Terminal.tsx         # Alternate terminal component
│   ├── RagDemo.tsx          # Live AI pipeline demo
│   └── ProjectDiagrams.tsx  # SVG project architecture diagrams
├── data/
│   └── content.ts           # Single source of truth for all copy
├── lib/
│   ├── files.ts             # Turns data into source-like virtual files
│   └── highlight.tsx        # Tiny syntax highlighter
├── public/
│   └── Revanth_Gollapudi_Resume.pdf # Resume download
└── package.json
```

## How The Mode Toggle Works

- `localStorage["mode"]` stores `"recruiter"` or `"dev"`.
- An inline script in `app/layout.tsx` reads the value before paint and sets `document.documentElement.dataset.mode`.
- The body class `recruiter` or `dev` swaps which CSS variables apply to the page.

## Customization Tips

- **Recruiter mode accent color** is `--accent: #6366f1` in `app/globals.css`.
- **Dev mode IDE colors** are the `--ide-*` variables in the same file.
- **The RAG demo corpus** is in `data/content.ts` under `ragCorpus`.
- **Terminal commands** live in `components/DevMode.tsx` in the `exec()` function.
