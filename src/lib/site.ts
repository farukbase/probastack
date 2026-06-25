/**
 * Single source of truth for site-wide identity: URL, naming, and external
 * links. Imported by metadata, sitemap/robots/manifest, OG images, and the
 * support components so none of them hard-code the domain.
 */
export const SITE = {
  name: "Probastack",
  url: "https://probastack.com",
  tagline: "Explore. Simulate. Understand.",
  description:
    "Interactive stories for data, statistics, AI, and machine learning. Play with the idea, make a prediction, run the simulation — feel the concept click before anyone hands you a formula.",
  /** Buy Me a Coffee support page. */
  buyMeACoffee: "https://buymeacoffee.com/probastack",
  keywords: [
    "interactive statistics",
    "learn statistics",
    "data science explained",
    "machine learning intuition",
    "probability visualized",
    "Monty Hall",
    "Bayes theorem",
    "Simpson's paradox",
    "AI explained",
    "interactive learning",
  ],
} as const;
