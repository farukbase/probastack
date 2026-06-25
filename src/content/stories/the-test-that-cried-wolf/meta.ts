import type { StoryMeta } from "@/lib/types";

export const meta: StoryMeta = {
  slug: "the-test-that-cried-wolf",
  title: "The Test That Cried Wolf",
  hook: "A test that's right 99% of the time says you're sick. Most people who hear that are perfectly fine. Here's the trick your gut keeps missing.",
  summary:
    "A near-perfect test can still be wrong about you most of the time — it all depends on how rare the thing is. Play with the numbers and watch a scary positive result turn into a coin flip, or worse, a false alarm.",
  categoryId: "statistics",
  subjectId: "inference",
  concepts: [
    "Base Rates",
    "Conditional Probability",
    "Bayes' Theorem",
    "False Positives",
  ],
  difficulty: "Beginner",
  estimatedMinutes: 9,
  tags: ["statistics", "bayes", "base-rate", "probability", "false-positives"],
  status: "published",
  related: ["when-averages-lie", "real-or-just-luck"],
};
