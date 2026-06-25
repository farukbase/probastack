import type { ToolMeta } from "@/lib/types";

export const meta: ToolMeta = {
  slug: "ab-test-significance",
  title: "A/B Test Significance Calculator",
  tagline:
    "Drop in the numbers from two variants and find out whether the difference is real — or just noise.",
  description:
    "Compare a conversion rate (two-proportion z-test) or a continuous metric like revenue or time-on-page (Welch's t-test). Get the lift, p-value, confidence, a CI chart, and the null distribution — one- or two-tailed, at any confidence level.",
  categoryId: "experimentation",
  icon: "🧪",
  status: "live",
};
