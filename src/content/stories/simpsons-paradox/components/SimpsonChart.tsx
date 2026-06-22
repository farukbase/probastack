"use client";

import { useState } from "react";
import { WinRateChart, type ChartBar } from "@/components/interactive/WinRateChart";
import { STONES, combined, rate, type Record } from "../data";

/**
 * Bespoke to this story: toggle between seeing the two case-types split apart
 * vs. lumped together — and watch the winner flip. Reuses the shared
 * WinRateChart for the rate bars.
 */
const A_COLOR = "var(--accent)";
const B_COLOR = "var(--accent-2)";

function bars(a: Record, b: Record): ChartBar[] {
  return [
    {
      label: "Treatment A",
      value: rate(a),
      color: A_COLOR,
      sublabel: `${a.cured}/${a.total}`,
    },
    {
      label: "Treatment B",
      value: rate(b),
      color: B_COLOR,
      sublabel: `${b.cured}/${b.total}`,
    },
  ];
}

export function SimpsonChart() {
  const [view, setView] = useState<"split" | "combined">("split");

  const aTot = combined("A");
  const bTot = combined("B");

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="mb-5 inline-flex rounded-lg border border-border p-0.5 text-sm">
        {(["split", "combined"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`rounded-md px-3 py-1.5 font-medium transition ${
              view === v
                ? "bg-accent text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            {v === "split" ? "Split by stone size" : "Combined"}
          </button>
        ))}
      </div>

      {view === "split" ? (
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">
              Small stones{" "}
              <span className="font-normal text-accent">→ A wins</span>
            </p>
            <WinRateChart bars={bars(STONES.small.A, STONES.small.B)} />
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">
              Large stones{" "}
              <span className="font-normal text-accent">→ A wins</span>
            </p>
            <WinRateChart bars={bars(STONES.large.A, STONES.large.B)} />
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">
            Everyone, lumped together{" "}
            <span className="font-normal text-accent-2">→ B wins?!</span>
          </p>
          <WinRateChart bars={bars(aTot, bTot)} />
        </div>
      )}

      <p className="mt-5 text-sm text-muted">
        {view === "split"
          ? "Treatment A cures a higher share in both groups. Now flip to Combined…"
          : "…and Treatment B suddenly looks better overall. Same numbers. How?"}
      </p>
    </div>
  );
}
