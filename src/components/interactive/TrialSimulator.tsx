"use client";

import { useCallback, useRef, useState } from "react";
import { WinRateChart, type ChartBar } from "./WinRateChart";

/**
 * Reusable Monte-Carlo style trial engine.
 *
 * A story supplies `runTrial`, which simulates ONE trial and reports, for each
 * named strategy, whether it won. The engine owns everything else: batch
 * controls, running tallies, win-rate chart, and reset. Reused by any story
 * that says "run it a thousand times and see" (Monty Hall, Birthday Paradox,
 * A/B simulations, …).
 */
export interface Strategy {
  key: string;
  label: string;
  color: string;
}

export interface TrialSimulatorProps {
  strategies: Strategy[];
  /** Simulate one trial → which strategies won this round. */
  runTrial: () => Record<string, boolean>;
  /** Batch buttons offered to the user. */
  batchSizes?: number[];
  caption?: string;
}

interface Tally {
  wins: number;
  total: number;
}

export function TrialSimulator({
  strategies,
  runTrial,
  batchSizes = [1, 10, 100, 1000],
  caption,
}: TrialSimulatorProps) {
  const emptyTallies = () =>
    Object.fromEntries(
      strategies.map((s) => [s.key, { wins: 0, total: 0 } as Tally]),
    );

  const [tallies, setTallies] = useState<Record<string, Tally>>(emptyTallies);
  const [total, setTotal] = useState(0);
  const runningRef = useRef(false);

  const run = useCallback(
    (n: number) => {
      if (runningRef.current) return;
      runningRef.current = true;
      setTallies((prev) => {
        const next: Record<string, Tally> = {};
        for (const s of strategies) {
          next[s.key] = { ...prev[s.key] };
        }
        for (let i = 0; i < n; i++) {
          const outcome = runTrial();
          for (const s of strategies) {
            next[s.key].total += 1;
            if (outcome[s.key]) next[s.key].wins += 1;
          }
        }
        return next;
      });
      setTotal((t) => t + n);
      runningRef.current = false;
    },
    [runTrial, strategies],
  );

  const reset = () => {
    setTallies(emptyTallies());
    setTotal(0);
  };

  const bars: ChartBar[] = strategies.map((s) => {
    const t = tallies[s.key];
    const rate = t.total ? t.wins / t.total : 0;
    return {
      label: s.label,
      value: rate,
      color: s.color,
      sublabel: `${t.wins.toLocaleString()} / ${t.total.toLocaleString()}`,
    };
  });

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {batchSizes.map((n) => (
          <button
            key={n}
            onClick={() => run(n)}
            className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white transition hover:opacity-90 active:scale-95"
          >
            Run {n.toLocaleString()}
          </button>
        ))}
        <button
          onClick={reset}
          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition hover:bg-surface-2"
        >
          Reset
        </button>
        <span className="ml-auto font-mono text-sm text-muted">
          {total.toLocaleString()} trials
        </span>
      </div>

      <WinRateChart bars={bars} />

      {caption && <p className="mt-4 text-sm text-muted">{caption}</p>}
    </div>
  );
}
