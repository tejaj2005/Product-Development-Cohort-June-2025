```markdown
# 🌟 Product Development Cohort — June 2025

Welcome to the lab, the stage, the sketchbook.  
This repository is the tiny rocket ship we build demos in — fast to start, easy to iterate, polished enough to present. Think of it as: "code you can dress up and show to people."

--------------------------------------------------------------------------------
Table of contents
- About this repo
- The story (why it exists)
- Quick start (do this now)
- Demo script—3 minutes to wow
- Curious devs: playbook & tech
- Magic commands (copy/paste)
- The treasure chest (archives & API)
- Micro-challenges to level up
- Credits, license & contact
--------------------------------------------------------------------------------

About this repo
---------------
A frontend scaffold (Vite + TypeScript) styled with Tailwind and shipped with example backend artifacts. Minimal, opinionated, and intentionally flexible so teams can focus on product rather than setup.

The story (one-liner)
---------------------
We had an idea, two coffees, and a 48-hour sprint. This repo captures that energy — built to prototype, rehearse, and present a product story that fits in a pitch deck.

Quick start — get to the demo in 5 minutes
-----------------------------------------
Prereqs: Node 16+, npm or pnpm.

1. Clone
   git clone https://github.com/tejaj2005/Product-Development-Cohort-June-2025.git
   cd Product-Development-Cohort-June-2025

2. Install
   npm install
   # or
   pnpm install

3. Dev server
   npm run dev
   # open http://localhost:5173

4. Build (for a polished deploy)
   npm run build
   npm run preview

Demo script — how to show this in 3 minutes
-------------------------------------------
1. 30s — Problem: "Who is affected and why it hurts."
2. 90s — Live demo: Open the app, run one hero flow (3 clicks max).
3. 30s — Evidence: metrics, constraints, or a small validation you ran.
4. 30s — Next steps & ask (what you want: users, feedback, runway).

Tip: Keep a GIF of the demo in /public/demo.gif — if the live demo flops, play the GIF and keep going.

Curious devs — playbook & tech
------------------------------
- Bundler: Vite — instant reload, tiny config
- Language: TypeScript — clearer intent, fewer surprises
- Styling: Tailwind CSS + PostCSS — build UI fast
- Structure: src/, components/, models/, hooks/, public/, styles/
- Lockfiles: both npm and pnpm are present — use whichever you prefer

Magic commands (fast copy/paste)
--------------------------------
```bash
# install
npm install

# dev
npm run dev

# build and preview
npm run build
npm run preview

# extract API examples (if needed)
unzip api.zip -d ./api
unzip mlrit-court-booking.zip -d ./mlrit-court-booking
```

The treasure chest — archives & API
-----------------------------------
There are two zipped artifacts at the repo root:
- api.zip — likely contains a demo backend (inspect README or package.json inside)
- mlrit-court-booking.zip — a demo project archive

How to peek:
unzip api.zip -d api && cd api && cat README.md || cat package.json

If you start a backend, set a frontend environment variable (Vite):
- .env
  VITE_API_URL=http://localhost:3000

Design & UX notes (read before you change the UI)
-------------------------------------------------
- Keep every screen focused on one objective. If users have to decide more than once, simplify.
- Use clear, readable sample data. Demo data is the MVP's sales pitch.
- Prioritize empty states & success messaging — judges notice polish.

Micro-challenges (pick one and run)
-----------------------------------
- Add a "Pitch Mode" button that opens a 60-second timer modal and disables non-essential UI.
- Add a /demo route that rotates 5 product ideas or feature snapshots.
- Hook up a small mocked analytics event on the hero action and show a fake metric in the header.

Presentation-ready checklist
----------------------------
- Landing copy: "What this product does" (one sentence)
- Hero flow: 3-click maximum
- Sample data: realistic, human-readable
- Fallback UI: no "undefined" or "null" shown
- One-sentence README for the api/ folder (if you run the backend)

Contributing — how we keep things tidy
--------------------------------------
- Fork → branch → PR to main
- Small PRs, clear titles: feat/…, fix/…, docs/…
- Tests for logic changes, screenshots for UI changes

Credits, license & contact
--------------------------
Maintainer: @tejaj2005 — say hi on GitHub.  
This repo currently has no license file — if you want others to use it freely, add MIT or Apache-2.0.

Final note (a tiny pep talk)
----------------------------
This repo is more than code — it's a rehearsal space. Ship the idea that proves value, then iterate. If you want a polished README with live badges, one-click deploy buttons, or a CI workflow added, tell me which and I’ll craft it next.
```