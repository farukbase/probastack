"use client";

import { useEffect, useState } from "react";
import {
  sharedBirthdayProbability,
  sampleRoom,
  dayToDate,
} from "../math";

/**
 * Bespoke to this story: drag the slider to set how many people are in the
 * room. See the theoretical probability update live, plus one randomly sampled
 * room with any shared birthdays highlighted. "Reshuffle" redraws the sample.
 */
export function BirthdayRoom() {
  const [n, setN] = useState(23);
  const [room, setRoom] = useState<number[]>([]);
  const [gen, setGen] = useState(0);

  // Fill the sampled room on mount and whenever n or the reshuffle counter
  // changes. Runs client-side only, so no hydration mismatch.
  useEffect(() => {
    setRoom(sampleRoom(n));
  }, [n, gen]);

  const p = sharedBirthdayProbability(n);

  const counts = new Map<number, number>();
  room.forEach((d) => counts.set(d, (counts.get(d) ?? 0) + 1));
  const dupDays = new Set(
    [...counts.entries()].filter(([, c]) => c > 1).map(([d]) => d),
  );
  const hasMatch = dupDays.size > 0;

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-foreground">
          People in the room:{" "}
          <span className="font-mono text-accent">{n}</span>
        </label>
        <button
          onClick={() => setGen((g) => g + 1)}
          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition hover:bg-surface-2"
        >
          Reshuffle
        </button>
      </div>

      <input
        type="range"
        min={2}
        max={75}
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        style={{ accentColor: "var(--accent)" }}
        className="mt-3 w-full"
      />

      <div className="mt-4 flex items-baseline gap-2">
        <span
          className="text-4xl font-semibold tabular-nums"
          style={{ color: p >= 0.5 ? "var(--accent-2)" : "var(--foreground)" }}
        >
          {Math.round(p * 100)}%
        </span>
        <span className="text-sm text-muted">
          chance at least two share a birthday
        </span>
      </div>
      {n === 23 && (
        <p className="mt-1 text-xs font-medium text-accent-2">
          ← 23 people: the famous coin-flip tipping point
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {room.map((d, i) => (
          <span
            key={i}
            className={`rounded px-1.5 py-0.5 font-mono text-[11px] transition ${
              dupDays.has(d)
                ? "bg-accent-2 font-semibold text-white"
                : "bg-surface-2 text-muted"
            }`}
          >
            {dayToDate(d)}
          </span>
        ))}
      </div>

      <p className="mt-3 text-sm">
        This random room:{" "}
        {hasMatch ? (
          <span className="font-semibold text-accent-2">
            a shared birthday! 🎉
          </span>
        ) : (
          <span className="text-muted">no match this time — reshuffle.</span>
        )}
      </p>
    </div>
  );
}
