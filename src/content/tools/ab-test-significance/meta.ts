import type { ToolMeta } from "@/lib/types";

export const meta: ToolMeta = {
  slug: "ab-test-significance",
  title: "A/B Test Significance Calculator",
  tagline:
    "Drop in the numbers from two variants and find out whether the difference is real — or just noise.",
  description:
    "Enter the visitors and conversions for your control and variant. The calculator runs a two-proportion z-test and tells you the lift, the p-value, your confidence, and whether the result clears your significance threshold.",
  categoryId: "experimentation",
  icon: "🧪",
  status: "live",
};
