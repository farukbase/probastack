"use client";

import { useState } from "react";

/**
 * Reusable single-question multiple-choice check. Gives immediate feedback and
 * an explanation once answered. Stories drop one (or several) in wherever a
 * "did it land?" checkpoint helps.
 */
export interface QuizProps {
  question: string;
  options: string[];
  /** Index of the correct option. */
  correct: number;
  /** Shown after the user answers, regardless of right/wrong. */
  explanation: string;
}

export function Quiz({ question, options, correct, explanation }: QuizProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="mb-4 font-medium text-foreground">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isCorrect = i === correct;
          const isPicked = i === picked;
          let cls = "border-border hover:bg-surface-2";
          if (answered && isCorrect) cls = "border-accent-2 bg-accent-2-soft";
          else if (answered && isPicked) cls = "border-danger bg-danger-soft";
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setPicked(i)}
              className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition disabled:cursor-default ${cls}`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                  answered && isCorrect
                    ? "border-accent-2 bg-accent-2 text-white"
                    : answered && isPicked
                      ? "border-danger bg-danger text-white"
                      : "border-border text-muted"
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-foreground">{opt}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <p className="mt-4 animate-fadeUp text-sm leading-relaxed text-muted">
          {picked === correct ? "Correct. " : "Not quite. "}
          {explanation}
        </p>
      )}
    </div>
  );
}
