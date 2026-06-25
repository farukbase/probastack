"use client";

import { useMemo, useState } from "react";
import {
  normalCdf,
  normalInv,
  studentTTwoTail,
  studentTCdf,
  studentTInv,
} from "./stats";
import { CiBars, type BarDatum } from "./CiBars";
import { NullCurve } from "./NullCurve";

/**
 * A/B significance calculator. Two metric types — binary (conversion rate,
 * two-proportion z-test) and continuous (a mean, Welch's two-sample t-test) —
 * with one/two-tailed and a custom confidence level, a CI bar chart, and the
 * null distribution. All client-side; see ./stats for the numerics.
 */

const PRESET_LEVELS = ["90", "95", "99"] as const;
const accentA = "#6b6b76";
const accentB = "#4f46e5";

const num = (s: string) => Number(s);
const pct = (x: number, dp = 2) => `${(x * 100).toFixed(dp)}%`;
const fmtNum = (x: number) =>
  Number.isFinite(x) ? x.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "—";

function Seg<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { v: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-surface p-0.5">
      {options.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
            value === o.v
              ? "bg-accent text-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  step,
  invalid,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  step?: number;
  invalid?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      <input
        type="number"
        step={step}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border bg-background px-3 py-2 text-sm tabular-nums outline-none focus:border-accent ${
          invalid ? "border-danger" : "border-border"
        }`}
      />
    </label>
  );
}

function VariantCard({
  label,
  accent,
  children,
  footer,
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
        <span className="font-semibold text-foreground">{label}</span>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
      {footer && <p className="mt-3 text-sm text-muted">{footer}</p>}
    </div>
  );
}

function ciProp(p: number, n: number, zc: number) {
  const se = Math.sqrt((p * (1 - p)) / n);
  return { lo: Math.max(0, p - zc * se), hi: Math.min(1, p + zc * se) };
}

export function AbTestCalculator() {
  const [metric, setMetric] = useState<"binary" | "continuous">("binary");
  const [tails, setTails] = useState<"two" | "one">("two");
  const [confPct, setConfPct] = useState("95");

  // binary inputs
  const [aV, setAV] = useState("1000");
  const [aC, setAC] = useState("80");
  const [bV, setBV] = useState("1000");
  const [bC, setBC] = useState("120");

  // continuous inputs
  const [aN, setAN] = useState("500");
  const [aMean, setAMean] = useState("50");
  const [aSD, setASD] = useState("20");
  const [bN, setBN] = useState("500");
  const [bMean, setBMean] = useState("54");
  const [bSD, setBSD] = useState("21");

  const confNum = Number(confPct);
  const validConf = confNum > 0 && confNum < 100;
  const alpha = validConf ? 1 - confNum / 100 : 0.05;

  const r = useMemo(() => {
    if (metric === "binary") {
      const nA = num(aV);
      const xA = num(aC);
      const nB = num(bV);
      const xB = num(bC);
      const valid = nA > 0 && nB > 0 && xA >= 0 && xB >= 0 && xA <= nA && xB <= nB;
      if (!valid) return { valid: false as const };
      const pA = xA / nA;
      const pB = xB / nB;
      const pPool = (xA + xB) / (nA + nB);
      const se = Math.sqrt(pPool * (1 - pPool) * (1 / nA + 1 / nB));
      const stat = se > 0 ? (pB - pA) / se : 0;
      const pTwo = 2 * (1 - normalCdf(Math.abs(stat)));
      const pOne = 1 - normalCdf(stat);
      const zc = normalInv(1 - alpha / 2);
      const crit = tails === "two" ? zc : normalInv(1 - alpha);
      return {
        valid: true as const,
        dist: "z" as const,
        df: Infinity,
        stat,
        pTwo,
        pOne,
        estA: pA,
        estB: pB,
        ciA: ciProp(pA, nA, zc),
        ciB: ciProp(pB, nB, zc),
        crit,
        winnerIsB: pB > pA,
        noChange: pB === pA,
        kind: "rate" as const,
      };
    }
    const nA = num(aN);
    const mA = num(aMean);
    const sA = num(aSD);
    const nB = num(bN);
    const mB = num(bMean);
    const sB = num(bSD);
    const valid =
      nA >= 2 && nB >= 2 && sA >= 0 && sB >= 0 && Number.isFinite(mA) && Number.isFinite(mB);
    if (!valid) return { valid: false as const };
    const vA = (sA * sA) / nA;
    const vB = (sB * sB) / nB;
    const seDiff = Math.sqrt(vA + vB);
    const stat = seDiff > 0 ? (mB - mA) / seDiff : 0;
    const df =
      seDiff > 0
        ? Math.pow(vA + vB, 2) / ((vA * vA) / (nA - 1) + (vB * vB) / (nB - 1))
        : nA + nB - 2;
    const pTwo = studentTTwoTail(stat, df);
    const pOne = 1 - studentTCdf(stat, df);
    const tcA = studentTInv(1 - alpha / 2, nA - 1);
    const tcB = studentTInv(1 - alpha / 2, nB - 1);
    const crit = tails === "two" ? studentTInv(1 - alpha / 2, df) : studentTInv(1 - alpha, df);
    return {
      valid: true as const,
      dist: "t" as const,
      df,
      stat,
      pTwo,
      pOne,
      estA: mA,
      estB: mB,
      ciA: { lo: mA - (tcA * sA) / Math.sqrt(nA), hi: mA + (tcA * sA) / Math.sqrt(nA) },
      ciB: { lo: mB - (tcB * sB) / Math.sqrt(nB), hi: mB + (tcB * sB) / Math.sqrt(nB) },
      crit,
      winnerIsB: mB > mA,
      noChange: mB === mA,
      kind: "mean" as const,
    };
  }, [metric, aV, aC, bV, bC, aN, aMean, aSD, bN, bMean, bSD, tails, alpha]);

  const pValue = r.valid ? (tails === "two" ? r.pTwo : r.pOne) : 1;
  const significant = r.valid && pValue < alpha && !r.noChange;

  const metrics: { label: string; value: string }[] = r.valid
    ? r.kind === "rate"
      ? [
          { label: "Rate A", value: pct(r.estA) },
          { label: "Rate B", value: pct(r.estB) },
          { label: "Relative lift", value: liftStr(r.estA, r.estB) },
          { label: "p-value", value: pStr(pValue) },
          { label: "Confidence", value: pct(1 - pValue, 1) },
          { label: "z-score", value: r.stat.toFixed(2) },
        ]
      : [
          { label: "Mean A", value: fmtNum(r.estA) },
          { label: "Mean B", value: fmtNum(r.estB) },
          { label: "Difference", value: fmtNum(r.estB - r.estA) },
          { label: "p-value", value: pStr(pValue) },
          { label: "Confidence", value: pct(1 - pValue, 1) },
          { label: "t-score", value: r.stat.toFixed(2) },
        ]
    : [];

  const barData: BarDatum[] = r.valid
    ? [
        { label: "Control (A)", value: r.estA, lo: r.ciA.lo, hi: r.ciA.hi, color: accentA },
        { label: "Variant (B)", value: r.estB, lo: r.ciB.lo, hi: r.ciB.hi, color: accentB },
      ]
    : [];
  const barFormat = (n: number) => (r.valid && r.kind === "rate" ? pct(n, 1) : fmtNum(n));

  return (
    <div className="rounded-2xl border border-border bg-surface-2/40 p-5">
      {/* Metric type */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted">Metric type:</span>
        <Seg
          value={metric}
          onChange={setMetric}
          options={[
            { v: "binary", label: "Conversion rate" },
            { v: "continuous", label: "Continuous value" },
          ]}
        />
      </div>

      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        {metric === "binary" ? (
          <>
            <VariantCard
              label="Control (A)"
              accent={accentA}
              footer={
                <>
                  Conversion rate:{" "}
                  <span className="font-semibold tabular-nums text-foreground">
                    {num(aV) > 0 ? pct(num(aC) / num(aV)) : "—"}
                  </span>
                </>
              }
            >
              <Field label="Visitors" value={aV} onChange={setAV} />
              <Field label="Conversions" value={aC} onChange={setAC} invalid={num(aC) > num(aV)} />
            </VariantCard>
            <VariantCard
              label="Variant (B)"
              accent={accentB}
              footer={
                <>
                  Conversion rate:{" "}
                  <span className="font-semibold tabular-nums text-foreground">
                    {num(bV) > 0 ? pct(num(bC) / num(bV)) : "—"}
                  </span>
                </>
              }
            >
              <Field label="Visitors" value={bV} onChange={setBV} />
              <Field label="Conversions" value={bC} onChange={setBC} invalid={num(bC) > num(bV)} />
            </VariantCard>
          </>
        ) : (
          <>
            <VariantCard label="Control (A)" accent={accentA}>
              <Field label="Sample size" value={aN} onChange={setAN} invalid={num(aN) < 2} />
              <Field label="Mean" value={aMean} onChange={setAMean} step={0.1} />
              <Field label="Std. deviation" value={aSD} onChange={setASD} step={0.1} invalid={num(aSD) < 0} />
            </VariantCard>
            <VariantCard label="Variant (B)" accent={accentB}>
              <Field label="Sample size" value={bN} onChange={setBN} invalid={num(bN) < 2} />
              <Field label="Mean" value={bMean} onChange={setBMean} step={0.1} />
              <Field label="Std. deviation" value={bSD} onChange={setBSD} step={0.1} invalid={num(bSD) < 0} />
            </VariantCard>
          </>
        )}
      </div>

      {/* Options */}
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">Hypothesis:</span>
          <Seg
            value={tails}
            onChange={setTails}
            options={[
              { v: "two", label: "B differs from A" },
              { v: "one", label: "B is better (one-sided)" },
            ]}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">Confidence level:</span>
          {PRESET_LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setConfPct(l)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                confPct === l
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border text-muted hover:bg-surface-2"
              }`}
            >
              {l}%
            </button>
          ))}
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted">Custom</span>
            <input
              type="number"
              min={1}
              max={99.99}
              step={0.1}
              value={confPct}
              onChange={(e) => setConfPct(e.target.value)}
              aria-label="Custom confidence level (percent)"
              className={`w-16 rounded-lg border bg-background px-2 py-1 text-xs tabular-nums outline-none focus:border-accent ${
                validConf ? "border-border" : "border-danger"
              }`}
            />
            <span className="text-xs text-muted">%</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="mt-5">
        {!r.valid ? (
          <div className="rounded-xl border border-border bg-surface px-5 py-6 text-center text-sm text-muted">
            {metric === "binary"
              ? "Enter visitors and conversions for both variants. Conversions can’t exceed visitors."
              : "Enter sample size (≥ 2), mean, and standard deviation for both variants."}
          </div>
        ) : (
          <div
            className={`rounded-xl border px-5 py-5 ${
              significant ? "border-accent-2 bg-accent-2-soft" : "border-border bg-surface"
            }`}
          >
            <p className={`text-lg font-bold ${significant ? "text-accent-2" : "text-foreground"}`}>
              {r.noChange
                ? "No difference at all"
                : significant
                  ? `${r.winnerIsB ? "Variant (B)" : "Control (A)"} wins 🎉`
                  : "Not significant — keep collecting data"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {r.noChange
                ? "Both variants came out exactly equal."
                : significant
                  ? `At your ${validConf ? confNum : 95}% confidence level this difference is unlikely to be chance.`
                  : `At your ${validConf ? confNum : 95}% confidence level, the difference so far could plausibly be random noise — you’d need more data (or a bigger gap) to call it.`}
            </p>

            {!r.noChange && (
              <div className="mt-3 inline-flex flex-wrap items-center gap-1.5 rounded-lg bg-surface-2/70 px-3 py-1.5 text-xs font-medium tabular-nums">
                <span className="text-muted">p = {pStr(pValue)}</span>
                <span className="text-muted">{significant ? "<" : "≥"}</span>
                <span className="text-muted">α = {alpha.toFixed(4)}</span>
                <span className={significant ? "text-accent-2" : "text-danger"}>
                  {significant ? "✓ clears the bar" : "✗ doesn’t clear the bar"}
                </span>
              </div>
            )}

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-lg bg-surface px-3 py-2.5 ring-1 ring-border">
                  <p className="text-xs text-muted">{m.label}</p>
                  <p className="mt-0.5 font-semibold tabular-nums text-foreground">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Charts */}
      {r.valid && (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <figure className="rounded-xl border border-border bg-surface p-4">
            <figcaption className="mb-1 text-sm font-medium text-foreground">
              {r.kind === "rate" ? "Conversion rates" : "Means"} with confidence intervals
            </figcaption>
            <p className="mb-2 text-xs text-muted">
              When the whiskers overlap a lot, the gap is probably noise.
            </p>
            <CiBars data={barData} format={barFormat} confPct={validConf ? confNum : 95} />
          </figure>
          <figure className="rounded-xl border border-border bg-surface p-4">
            <figcaption className="mb-1 text-sm font-medium text-foreground">
              The null distribution
            </figcaption>
            <p className="mb-2 text-xs text-muted">
              Shaded tail = the p-value. Dashed lines = your threshold; they move
              with the confidence level.
              {r.dist === "t" && ` (Student’s t, df ≈ ${Math.round(r.df)})`}
            </p>
            <NullCurve
              dist={r.dist}
              df={r.df}
              stat={r.stat}
              crit={r.crit}
              tails={tails}
              significant={significant}
            />
          </figure>
        </div>
      )}
    </div>
  );
}

function liftStr(a: number, b: number) {
  if (a === 0) return "—";
  const l = (b - a) / a;
  return `${l >= 0 ? "+" : ""}${pct(l)}`;
}
function pStr(p: number) {
  return p < 0.0001 ? "<0.0001" : p.toFixed(4);
}
