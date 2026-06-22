import type { StoryMeta } from "@/lib/types";

export const meta: StoryMeta = {
  slug: "real-or-just-luck",
  title: "Is It Real, or Just Luck?",
  hook: "Maria swears her smiley-face receipts earn bigger tips. Sam says it's a fluke. Settle it — by shuffling.",
  summary:
    "A formula-free way to tell a real effect from a lucky streak. Pool the data, shuffle it thousands of times, and see how often plain luck fakes the result. You just ran a permutation test.",
  categoryId: "experimentation",
  subjectId: "ab-testing",
  concepts: [
    "Permutation Test",
    "Statistical Significance",
    "p-value",
    "Sampling Variation",
  ],
  difficulty: "Beginner",
  estimatedMinutes: 8,
  tags: ["permutation-test", "ab-testing", "p-value", "simulation"],
  status: "published",
  related: ["the-birthday-paradox", "the-monty-hall-trap"],
};
