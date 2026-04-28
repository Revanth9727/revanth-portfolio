# Revanth Gollapudi — Portfolio

Next.js 14 (App Router) + TypeScript + zero external CSS frameworks. Dark IDE/notebook aesthetic with a live RAG playground signature element.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Editing content

All content lives in **`data/content.ts`**. Edit that single file to update:

- Profile, summary, contact links
- Experience entries
- Skills
- Education
- Projects
- The RAG playground's knowledge corpus

## Resume

Drop your `resume.pdf` into the `public/` folder. It will be served at `/resume.pdf` and the download buttons will work.

## Deployment to Vercel

You currently have Vercel hooked up to your GitHub repo serving the static `index.html`. To switch to this Next.js project:

### Option A — Replace the contents of your existing repo (recommended)

1. **Back up your old `index.html`** somewhere (just in case).
2. **Delete the old files** from your repo (the `index.html`, any old assets).
3. **Copy the contents of this folder** (`portfolio/`) into the root of your repo.
4. Commit and push:
   ```bash
   git add .
   git commit -m "Migrate portfolio to Next.js"
   git push
   ```
5. Vercel will **automatically detect Next.js** and rebuild. No manual config change needed — Vercel reads `package.json` and figures it out.
6. The first build will take ~30–60 seconds. You'll see "Building" in your Vercel dashboard.

### Option B — Create a fresh Vercel project

1. Push this folder as a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the new repo.
3. Vercel auto-detects Next.js. Click **Deploy**.
4. Once deployed, in the **old** Vercel project, swap the production domain over (Project → Settings → Domains).

### Common questions

- **"Will my custom domain still work?"** Yes — domains are attached to projects, not codebases. If you replace the repo contents (Option A), the domain stays. If you create a new project (Option B), move the domain to the new project from the Vercel dashboard.
- **"Do I need any environment variables?"** No. This site is fully static.
- **"Will my old `index.html` conflict?"** Vercel only deploys what's in the latest commit. If you delete `index.html` from the repo, it disappears.
- **"What if the build fails?"** Check the Vercel build logs. Most likely: `npm install` failed because `node_modules` was committed. Make sure `.gitignore` excludes it.

## Project structure

```
.
├── app/                 # Next.js App Router
│   ├── globals.css      # Dark IDE theme tokens
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Loads <IDE />
├── components/
│   ├── IDE.tsx          # Main shell: sidebar, tabs, status bar
│   ├── FileView.tsx     # Renders the active "file"
│   ├── Terminal.tsx     # Bottom terminal panel
│   ├── RagPlayground.tsx # Signature interactive element
│   └── ProjectDiagrams.tsx # SVG agent-pipeline diagrams
├── data/
│   └── content.ts       # All portfolio content (edit me)
├── lib/
│   ├── files.ts         # Generators that turn data into "source"
│   └── highlight.tsx    # Tiny syntax highlighter (no deps)
├── public/
│   └── resume.pdf       # (drop your resume here)
└── package.json
```

## Customization tips

- **Theme colors** are defined as CSS variables in `app/globals.css`. Change `--accent`, `--bg`, etc. to retheme the whole site.
- **The RAG playground corpus** is in `data/content.ts` under `ragCorpus`. Add entries to make the playground respond to more queries.
- **Terminal commands** live in `components/Terminal.tsx` in the `exec()` function. Add new cases to add commands.
