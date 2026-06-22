import type { StoryMeta } from "@/lib/types";

export const meta: StoryMeta = {
  slug: "teach-a-line-to-predict",
  title: "Teach a Line to Predict",
  hook: "Drag a straight line through the dots to predict exam scores. Congratulations — you just did machine learning.",
  summary:
    "The simplest model in the world is a straight line. Fit one by hand, watch the error shrink, then let the machine find the best line itself. That hill-climbing toward less error is exactly how models learn.",
  categoryId: "machine-learning",
  subjectId: "supervised",
  concepts: [
    "Linear Regression",
    "Loss / Error",
    "Best Fit",
    "Gradient Descent",
  ],
  difficulty: "Beginner",
  estimatedMinutes: 7,
  tags: ["machine-learning", "regression", "prediction"],
  status: "published",
  related: [],
};
