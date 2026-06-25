"use client";

import { useMemo, useState } from "react";

/**
 * A/B test significance via a two-proportion z-test (two-tailed). Pure client
 * math — no backend. The reader enters visitors + conversions for a control and
 * a variant; we report the lift, p-value, confidence, and whether it clears the
 * chosen significance threshold.
 */

// Standard normal CDF via the Abramowitz & Stegun erf approximation (7.1.26).
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}
const normalCdf = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));

const LEVELS = [
  { label: "90%", alpha: 0.1 },
  { label: "95%", alpha: 0.05 },
  { label: "99%", alpha: 0.01 },
] as const;

const pct = (x: number, dp = 2) => `${(x * 100).toFixed(dp)}%`;

function VariantInputs({
  label,
  accent,
  visitors,
  conversions,
  onVisitors,
  onConversions,
}: {
  label: string;
  accent: string;
  visitors: string;
  conversions: string;
  onVisitors: (v: string) => void;
  onConversions: (v: string) => void;
}) {
  const v = Number(visitors);
  const c = Number(conversions);
  const rate = v > 0 ? c / v : 0;
  const invalid = c > v;
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <span className="font-semibold text-foreground">{label}</span>
      </div>
      <label className="mb-3 block">
        <span className="mb-1 block text-xs font-medium text-muted">Visitors</span>
        <input
          type="number"
          min={0}
          inputMode="numeric"
          value={visitors}
          onChange={(e) => onVisitors(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm tabular-nums outline-none focus:border-accent"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted">
          Conversions
        </span>
        <input
          type="number"
          min={0}
          inputMode="numeric"
          value={conversions}
          onChange={(e) => onConversions(e.target.value)}
          className={`w-full rounded-lg border bg-background px-3 py-2 text-sm tabular-nums outline-none focus:border-accent ${
            invalid ? "border-danger" : "border-border"
          }`}
        />
      </label>
      <p className="mt-3 text-sm text-muted">
        Conversion rate:{" "}
        <span className="font-semibold text-foreground tabular-nums">
          {v > 0 ? pct(rate) : "—"}
        </span>
      </p>
    </div>
  );
}

export function AbTestCalculator() {
  const [aV, setAV] = useState("1000");
  const [aC, setAC] = useState("80");
  const [bV, setBV] = useState("1000");
  const [bC, setBC] = useState("120");
  const [alpha, setAlpha] = useState(0.05);

  const r = useMemo(() => {
    const nA = Number(aV);
    const xA = Number(aC);
    const nB = Number(bV);
    const xB = Number(bC);
    const valid =
      nA > 0 && nB > 0 && xA >= 0 && xB >= 0 && xA <= nA && xB <= nB;
    if (!valid) return { valid: false as const };

    const pA = xA / nA;
    const pB = xB / nB;
    const pPool = (xA + xB) / (nA + nB);
    const se = Math.sqrt(pPool * (1 - pPool) * (1 / nA + 1 / nB));
    const z = se > 0 ? (pB - pA) / se : 0;
    const pValue = 2 * (1 - normalCdf(Math.abs(z)));
    const confidence = 1 - pValue;
    const lift = pA > 0 ? (pB - pA) / pA : 0;
    return {
      valid: true as const,
      pA,
      pB,
      z,
      pValue,
      confidence,
      lift,
      winnerIsB: pB > pA,
      noChange: pB === pA,
    };
  }, [aV, aC, bV, bC]);

  const accentA = "#6b6b76";
  const accentB = "#4f46e5";

  const significant = r.valid && r.pValue < alpha && !r.noChange;

  return (
    <div className="rounded-2xl border border-border bg-surface-2/40 p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <VariantInputs
          label="Control (A)"
          accent={accentA}
          visitors={aV}
          conversions={aC}
          onVisitors={setAV}
          onConversions={setAC}
        />
        <VariantInputs
          label="Variant (B)"
          accent={accentB}
          visitors={bV}
          conversions={bC}
          onVisitors={setBV}
          onConversions={setBC}
        />
      </div>

      {/* Significance level */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted">Significance level:</span>
        {LEVELS.map((l) => (
          <button
            key={l.label}
            onClick={() => setAlpha(l.alpha)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              alpha === l.alpha
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-muted hover:bg-surface-2"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="mt-5">
        {!r.valid ? (
          <div className="rounded-xl border border-border bg-surface px-5 py-6 text-center text-sm text-muted">
            Enter visitors and conversions for both variants. Conversions
            can&rsquo;t exceed visitors.
          </div>
        ) : (
          <div
            className={`rounded-xl border px-5 py-5 ${
              significant
                ? "border-accent-2 bg-accent-2-soft"
                : "border-border bg-surface"
            }`}
          >
            <p
              className={`text-lg font-bold ${
                significant ? "text-accent-2" : "text-foreground"
              }`}
            >
              {r.noChange
                ? "No difference at all"
                : significant
                  ? `${r.winnerIsB ? "Variant (B)" : "Control (A)"} wins 🎉`
                  : "Not significant — keep collecting data"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {r.noChange ? (
                "Both variants converted at exactly the same rate."
              ) : significant ? (
                <>
                  The {r.winnerIsB ? "variant" : "control"} is the better
                  performer, and at your {pct(1 - alpha, 0)} threshold this
                  difference is unlikely to be chance.
                </>
              ) : (
                <>
                  The difference so far could plausibly be random noise. You&rsquo;d
                  need more data (or a bigger gap) to call it.
                </>
              )}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Metric label="Relative lift" value={`${r.lift >= 0 ? "+" : ""}${pct(r.lift)}`} />
              <Metric label="p-value" value={r.pValue < 0.0001 ? "<0.0001" : r.pValue.toFixed(4)} />
              <Metric label="Confidence" value={pct(r.confidence, 1)} />
              <Metric label="z-score" value={r.z.toFixed(2)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface px-3 py-2.5 ring-1 ring-border">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-0.5 font-semibold tabular-nums text-foreground">{value}</p>
    </div>
  );
}
