"use client";

import { useState } from "react";
import { Histogram } from "@/components/interactive/Histogram";
import { CONTROL, SMILEY, mean, OBSERVED_DIFF } from "../data";

/**
 * Bespoke to this story: the permutation engine. Pools all 16 nights, randomly
 * re-deals them into two groups, and records the resulting gap. Repeat to build
 * the "if it were just luck" distribution, then read the p-value off the tail.
 */
const POOL = [...SMILEY, ...CONTROL];

function shuffledGap(): number {
  const a = POOL.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return mean(a.slice(0, SMILEY.length)) - mean(a.slice(SMILEY.length));
}

export function ShuffleTest() {
  const [gaps, setGaps] = useState<number[]>([]);
  const [last, setLast] = useState<number | null>(null);

  const run = (n: number) => {
    const added: number[] = [];
    for (let i = 0; i < n; i++) added.push(shuffledGap());
    setGaps((prev) => [...prev, ...added]);
    setLast(added[added.length - 1]);
  };

  const reset = () => {
    setGaps([]);
    setLast(null);
  };

  const total = gaps.length;
  const extreme = gaps.filter((d) => d >= OBSERVED_DIFF).length;
  const p = total ? extreme / total : null;

  const verdict =
    p === null
      ? null
      : p < 0.05
        ? "Luck almost never fakes a gap this big — the smiley effect looks real. ✅"
        : p < 0.1
          ? "Borderline — luck could still explain it, but it's getting unlikely."
          : "Luck explains a gap this size easily — not convincing yet.";

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {[1, 100, 1000].map((n) => (
          <button
            key={n}
            onClick={() => run(n)}
            className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white transition hover:opacity-90 active:scale-95"
          >
            Shuffle {n.toLocaleString()}
          </button>
        ))}
        <button
          onClick={reset}
          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition hover:bg-surface-2"
        >
          Reset
        </button>
        {last !== null && (
          <span className="ml-auto font-mono text-sm text-muted">
            last gap: {last >= 0 ? "+" : ""}${last.toFixed(2)}
          </span>
        )}
      </div>

      <Histogram
        values={gaps}
        min={-10}
        max={10}
        bins={20}
        observed={OBSERVED_DIFF}
        observedLabel={`Maria: +$${OBSERVED_DIFF.toFixed(2)}`}
        shadeFrom={OBSERVED_DIFF}
        xLabel="gap a shuffle produced (smiley − no smiley), in $"
      />

      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-t border-border pt-3">
        <span className="text-sm text-muted">
          {total.toLocaleString()} shuffles ·{" "}
          <span className="text-foreground">
            {extreme.toLocaleString()} reached Maria&rsquo;s gap
          </span>
        </span>
        {p !== null && (
          <span className="font-mono text-sm">
            p ≈{" "}
            <span className="font-semibold text-accent">
              {(p * 100).toFixed(1)}%
            </span>
          </span>
        )}
      </div>

      {verdict && (
        <p className="mt-3 animate-fadeUp text-sm leading-relaxed text-foreground">
          {verdict}
        </p>
      )}
      {total === 0 && (
        <p className="mt-3 text-sm text-muted">
          The teal line is Maria&rsquo;s real gap. Start shuffling to see how
          often blind luck reaches it.
        </p>
      )}
    </div>
  );
}
