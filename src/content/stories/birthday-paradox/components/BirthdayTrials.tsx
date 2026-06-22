"use client";

import { TrialSimulator } from "@/components/interactive/TrialSimulator";
import { sampleHasMatch } from "../math";

/**
 * Bespoke wiring that reuses the shared TrialSimulator engine — exactly as the
 * Monty Hall story does, but with a single strategy. Each trial fills a fresh
 * room of 23 and checks for a collision; the rate converges on ~50.7%.
 */
export function BirthdayTrials() {
  const N = 23;
  const runTrial = () => ({ match: sampleHasMatch(N) });

  return (
    <TrialSimulator
      strategies={[
        { key: "match", label: "Room of 23 has a match", color: "var(--accent)" },
      ]}
      runTrial={runTrial}
      caption="Each trial is a brand-new room of 23 random people. Run a thousand and watch the share of rooms-with-a-match settle right around 50.7%."
    />
  );
}
