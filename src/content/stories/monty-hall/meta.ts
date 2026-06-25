import type { StoryMeta } from "@/lib/types";

export const meta: StoryMeta = {
  slug: "the-monty-hall-trap",
  title: "The Monty Hall Trap",
  hook: "Three doors, one car. The host opens a goat. Should you switch?",
  summary:
    "Play the game, trust your gut, then run a thousand trials and watch your intuition fall apart. A hands-on tour of why switching wins two-thirds of the time.",
  categoryId: "statistics",
  subjectId: "probability",
  concepts: [
    "Conditional Probability",
    "Bayesian Thinking",
    "Sample Space",
    "Intuition vs Probability",
  ],
  difficulty: "Beginner",
  estimatedMinutes: 11,
  tags: ["probability", "conditional-probability", "bayes", "simulation"],
  status: "published",
  related: ["the-birthday-paradox"],
};
