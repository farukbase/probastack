"use client";

import { TrialSimulator } from "@/components/interactive/TrialSimulator";

/**
 * Bespoke wiring: defines the Monty Hall trial, then hands the heavy lifting to
 * the reusable TrialSimulator engine. One trial = random car, random first
 * pick; "stay" wins only if the first pick was already the car.
 */
export function MontyHallSim() {
  const runTrial = () => {
    const car = Math.floor(Math.random() * 3);
    const firstPick = Math.floor(Math.random() * 3);
    const stayWins = firstPick === car;
    return { stay: stayWins, switch: !stayWins };
  };

  return (
    <TrialSimulator
      strategies={[
        { key: "stay", label: "Always stay", color: "var(--danger)" },
        { key: "switch", label: "Always switch", color: "var(--accent-2)" },
      ]}
      runTrial={runTrial}
      caption="Each trial draws a random car and a random first pick, then scores both strategies. Run a thousand and watch the rates settle near 1⁄3 and 2⁄3."
    />
  );
}
