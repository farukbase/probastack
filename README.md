# Probastack

Interactive stories for data, statistics, AI, and machine learning.
**Explore. Simulate. Understand.**

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (design tokens in `src/app/globals.css`)
- Static-first: stories prerender; interactivity ships as client "islands"

## How it's organized

```
src/
  app/                     # routes
    page.tsx               # home (hero, featured stories, categories)
    stories/[slug]/        # story renderer (driven by the registry)
    categories/[slug]/     # category browse
  content/
    taxonomy.ts            # categories → subjects (pure data; reshuffle freely)
    stories/
      registry.ts          # slug → { meta, Component }; one entry per story
      monty-hall/          # a story = meta + Story.tsx + bespoke components/
  components/
    interactive/           # REUSABLE islands: TrialSimulator, WinRateChart, Quiz…
    story/                 # editorial layout helpers (Section, Prose, Reveal…)
    site/                  # Header, Footer, StoryCard
  lib/types.ts             # StoryMeta, Category, Subject
```

### Adding a story

1. Create `src/content/stories/<slug>/meta.ts` (a `StoryMeta`).
2. Create `Story.tsx` — a server component composing prose + interactive islands.
   Reuse `components/interactive/*`; add bespoke pieces under the story's own
   `components/` folder when a beat needs something custom.
3. Register both in `src/content/stories/registry.ts`.

The shell primitives are **helpers, not a mandatory template** — each story
uses whichever beats it needs, in any order.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build + typecheck
```

## Deploy

Designed to deploy as a single Vercel project. Heavy/stateful backends (AI
generation, queues, databases) can live on Railway later without touching this
app.
