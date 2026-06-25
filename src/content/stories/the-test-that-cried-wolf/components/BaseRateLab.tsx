"use client";

import { useMemo, useState } from "react";

/**
 * Bespoke to this story. The reader sets how rare the condition is and how
 * accurate the test is; the lab works out, for a population of 10,000, how many
 * positive results are real versus false alarms — and the headline number, the
 * chance you're actually sick given a positive test (the posterior).
 *
 * "Accuracy" here drives both directions equally (catches the sick, clears the
 * healthy) to keep one honest dial instead of two jargon ones.
 */
const POP = 10_000;
const MAX_PER_10K = 2000; // 20% — the common end of the slider

// Log-scaled prevalence so the interesting rare region gets most of the track.
const tToPer10k = (t: number) =>
  Math.max(1, Math.round(Math.pow(10, (t / 100) * Math.log10(MAX_PER_10K))));
const per10kToT = (p: number) =>
  (Math.log10(p) / Math.log10(MAX_PER_10K)) * 100;

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

function oneIn(per10k: number) {
  const denom = Math.round(POP / per10k);
  return `1 in ${denom.toLocaleString("en-US")}`;
}

const PRESETS = [
  { label: "Rare disease", per10k: 10, acc: 99 }, // 1 in 1,000
  { label: "Uncommon (1%)", per10k: 100, acc: 99 },
  { label: "Common (10%)", per10k: 1000, acc: 99 },
];

export function BaseRateLab() {
  const [t, setT] = useState(per10kToT(10)); // default: 1 in 1,000
  const [acc, setAcc] = useState(99);

  const per10k = tToPer10k(t);

  const m = useMemo(() => {
    const sick = per10k;
    const healthy = POP - sick;
    const rate = acc / 100;
    const truePos = sick * rate;
    const falsePos = healthy * (1 - rate);
    const positives = truePos + falsePos;
    const posterior = positives > 0 ? truePos / positives : 0;
    return { sick, healthy, truePos, falsePos, positives, posterior };
  }, [per10k, acc]);

  const posteriorPct = m.posterior * 100;
  const realWidth = m.positives > 0 ? (m.truePos / m.positives) * 100 : 0;
  const posteriorLabel =
    posteriorPct < 10 ? posteriorPct.toFixed(1) : Math.round(posteriorPct).toString();
  const posteriorColor =
    posteriorPct < 50 ? "text-danger" : posteriorPct < 80 ? "text-accent" : "text-accent-2";

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      {/* Presets */}
      <div className="mb-5 flex flex-wrap gap-2">
        {PRESETS.map((p) => {
          const active = per10k === p.per10k && acc === p.acc;
          return (
            <button
              key={p.label}
              onClick={() => {
                setT(per10kToT(p.per10k));
                setAcc(p.acc);
              }}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                active
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border text-muted hover:bg-surface-2"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-5">
        <label className="block">
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-sm font-medium text-foreground">
              How common is it?
            </span>
            <span className="text-sm text-muted">
              <span className="font-semibold text-foreground">{oneIn(per10k)}</span>{" "}
              ({(per10k / 100).toLocaleString("en-US")}%)
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            aria-label="How common the condition is"
            className="w-full"
            style={{ accentColor: "var(--accent)" }}
          />
        </label>

        <label className="block">
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-sm font-medium text-foreground">
              How accurate is the test?
            </span>
            <span className="text-sm font-semibold text-foreground">
              {acc.toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            min={80}
            max={99.9}
            step={0.1}
            value={acc}
            onChange={(e) => setAcc(Number(e.target.value))}
            aria-label="How accurate the test is"
            className="w-full"
            style={{ accentColor: "var(--accent)" }}
          />
        </label>
      </div>

      {/* Headline */}
      <div className="mt-6 rounded-lg bg-surface-2/60 px-5 py-4 text-center">
        <p className="text-sm text-muted">
          Your test comes back <strong className="text-foreground">positive</strong>.
          The chance you actually have it:
        </p>
        <p className={`mt-1 text-5xl font-bold tracking-tight ${posteriorColor}`}>
          {posteriorLabel}%
        </p>
      </div>

      {/* Breakdown of everyone who tests positive */}
      <div className="mt-5">
        <p className="mb-2 text-sm text-muted">
          Out of <strong className="text-foreground">10,000</strong> people, about{" "}
          <strong className="text-foreground">{fmt(m.positives)}</strong>{" "}
          get a positive result. Here&rsquo;s who they really are:
        </p>
        <div className="flex h-9 overflow-hidden rounded-md">
          <div
            className="flex items-center justify-center bg-accent-2/80 text-xs font-medium text-white"
            style={{ width: `${realWidth}%` }}
            title="Actually sick"
          >
            {realWidth > 14 ? `${fmt(m.truePos)} real` : ""}
          </div>
          <div
            className="flex items-center justify-center bg-danger/75 text-xs font-medium text-white"
            style={{ width: `${100 - realWidth}%` }}
            title="False alarms"
          >
            {100 - realWidth > 14 ? `${fmt(m.falsePos)} false alarms` : ""}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent-2/80" />
            {fmt(m.truePos)} actually sick
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-danger/75" />
            {fmt(m.falsePos)} healthy, but flagged
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        {posteriorPct < 50 ? (
          <>
            Even with a <strong className="text-foreground">{acc.toFixed(1)}%</strong>{" "}
            test, a positive result is <strong className="text-danger">more likely a false alarm</strong>{" "}
            than the real thing — because the healthy crowd is so much bigger that
            its few mistakes outnumber the genuine cases.
          </>
        ) : (
          <>
            Now a positive result is worth taking seriously — the condition is
            common enough that real cases outweigh the false alarms.
          </>
        )}
      </p>
    </div>
  );
}
