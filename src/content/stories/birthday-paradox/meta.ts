import type { StoryMeta } from "@/lib/types";

export const meta: StoryMeta = {
  slug: "the-birthday-paradox",
  title: "The Birthday Paradox",
  hook: "In a room of just 23 people, it's a coin-flip that two share a birthday.",
  summary:
    "Twenty-three feels far too few — but drag the slider, run the rooms, and watch the math win. The trick is counting pairs, not people.",
  categoryId: "statistics",
  subjectId: "probability",
  concepts: [
    "Probability",
    "Complementary Counting",
    "Combinatorics",
    "Intuition vs Probability",
  ],
  difficulty: "Beginner",
  estimatedMinutes: 9,
  tags: ["probability", "combinatorics", "simulation", "beginner"],
  status: "published",
  related: ["the-monty-hall-trap"],
};
