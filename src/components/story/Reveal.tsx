"use client";

import { useState, type ReactNode } from "react";

/**
 * A "make a prediction first" gate. Hides the payoff behind a click so users
 * commit to a guess before the reveal — the core of the discovery loop.
 */
export function Reveal({
  prompt = "Reveal the answer",
  children,
}: {
  prompt?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-accent/50 bg-accent-soft px-5 py-6 text-accent transition hover:bg-accent/10"
      >
        <span className="font-medium">{prompt}</span>
        <span className="transition group-hover:translate-x-0.5">→</span>
      </button>
    );
  }

  return <div className="animate-fadeUp">{children}</div>;
}
