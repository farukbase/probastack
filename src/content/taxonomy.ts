import type { Category } from "@/lib/types";

/**
 * Probastack taxonomy. This is a working draft seeded from the proposal — it is
 * meant to change. Categories and subjects can be added, renamed, merged, or
 * reordered here freely; everything downstream (routes, browse pages, cards)
 * reads from this list.
 */
export const categories: Category[] = [
  {
    id: "statistics",
    title: "Statistics",
    blurb: "Probability, inference, and the intuitions behind the math.",
    accent: "#4f46e5",
    subjects: [
      { id: "probability", title: "Probability" },
      { id: "inference", title: "Inference" },
      { id: "data-mining", title: "Data Mining" },
    ],
  },
  {
    id: "experimentation",
    title: "Experimentation",
    blurb: "A/B testing, causal inference, and trustworthy experiments.",
    accent: "#0d9488",
    subjects: [
      { id: "ab-testing", title: "A/B Testing" },
      { id: "causal", title: "Causal Inference" },
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    blurb: "From linear regression to gradient boosting, built up by intuition.",
    accent: "#c2410c",
    subjects: [
      { id: "supervised", title: "Supervised Learning" },
      { id: "evaluation", title: "Model Evaluation" },
    ],
  },
  {
    id: "ai-llms",
    title: "AI & LLMs",
    blurb: "Tokens, embeddings, attention, and how modern AI actually works.",
    accent: "#7c3aed",
    subjects: [
      { id: "foundations", title: "Foundations" },
      { id: "systems", title: "AI Systems" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    blurb: "Funnels, retention, cohorts, and the metrics that matter.",
    accent: "#0369a1",
    subjects: [
      { id: "product", title: "Product Analytics" },
      { id: "gaming", title: "Mobile Gaming Analytics" },
    ],
  },
];

export const categoryById = (id: string): Category | undefined =>
  categories.find((c) => c.id === id);

export const subjectById = (categoryId: string, subjectId?: string) =>
  subjectId
    ? categoryById(categoryId)?.subjects.find((s) => s.id === subjectId)
    : undefined;
