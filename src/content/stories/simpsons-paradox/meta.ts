import type { StoryMeta } from "@/lib/types";

export const meta: StoryMeta = {
  slug: "when-averages-lie",
  title: "When Averages Lie",
  hook: "One treatment beats the other for small stones AND for large stones — yet loses overall. Same numbers. Watch it flip.",
  summary:
    "A real medical study where the better treatment looks worse the moment you combine the groups. The culprit is a hidden variable — and once you see it, you'll never trust a lone average again.",
  categoryId: "statistics",
  subjectId: "inference",
  concepts: [
    "Simpson's Paradox",
    "Confounding",
    "Weighted Averages",
    "Lurking Variables",
  ],
  difficulty: "Beginner",
  estimatedMinutes: 9,
  tags: ["statistics", "simpsons-paradox", "confounding"],
  status: "published",
  related: ["real-or-just-luck"],
};
