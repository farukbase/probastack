"use client";

import { useRef, useState } from "react";
import { POINTS, X_MAX, Y_MAX, bestFit, sse } from "../data";

/**
 * Bespoke to this story: slide the line's steepness and starting point to fit
 * the dots. The total error (sum of squared gaps) updates live; "Let it learn"
 * animates the line to the mathematically best fit — exactly what a model does
 * when it trains.
 */
const BEST = bestFit(POINTS);
const BEST_ERR = sse(POINTS, BEST.m, BEST.b);

export function RegressionLab() {
  const [m, setM] = useState(0);
  const [b, setB] = useState(50);
  const raf = useRef<number | null>(null);

  const err = sse(POINTS, m, b);
  const showErrors = true;
  const solved = err <= BEST_ERR * 1.03;

  function autoFit() {
    if (raf.current) cancelAnimationFrame(raf.current);
    const startM = m;
    const startB = b;
    let t0: number | null = null;
    const dur = 1100;
    const tick = (now: number) => {
      if (t0 === null) t0 = now;
      const t = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - t, 3); // ease-out
      setM(startM + (BEST.m - startM) * e);
      setB(startB + (BEST.b - startB) * e);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }

  // SVG geometry
  const W = 360;
  const H = 260;
  const padL = 34;
  const padR = 12;
  const padT = 12;
  const padB = 28;
  const sx = (x: number) => padL + (x / X_MAX) * (W - padL - padR);
  const sy = (y: number) => padT + (1 - y / Y_MAX) * (H - padT - padB);

  const lineY = (x: number) => m * x + b;

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* axes */}
        <line x1={padL} x2={padL} y1={padT} y2={H - padB} stroke="var(--border)" />
        <line x1={padL} x2={W - padR} y1={H - padB} y2={H - padB} stroke="var(--border)" />
        <text x={(W + padL) / 2} y={H - 2} textAnchor="middle" fontSize="9" fill="var(--muted)">
          hours studied →
        </text>
        <text x={10} y={padT + 6} fontSize="9" fill="var(--muted)">
          score
        </text>

        {/* residuals */}
        {showErrors &&
          POINTS.map((p, i) => (
            <line
              key={"r" + i}
              x1={sx(p.x)}
              x2={sx(p.x)}
              y1={sy(p.y)}
              y2={sy(Math.max(0, Math.min(Y_MAX, lineY(p.x))))}
              stroke="var(--danger)"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
          ))}

        {/* the fitted line */}
        <line
          x1={sx(0)}
          y1={sy(Math.max(0, Math.min(Y_MAX, lineY(0))))}
          x2={sx(X_MAX)}
          y2={sy(Math.max(0, Math.min(Y_MAX, lineY(X_MAX))))}
          stroke="var(--accent)"
          strokeWidth="2.5"
        />

        {/* data points */}
        {POINTS.map((p, i) => (
          <circle key={"p" + i} cx={sx(p.x)} cy={sy(p.y)} r="4.5" fill="var(--foreground)" />
        ))}
      </svg>

      {/* controls */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 flex justify-between text-muted">
            <span>Steepness (slope)</span>
            <span className="font-mono text-foreground">{m.toFixed(1)}</span>
          </span>
          <input
            type="range"
            min={-2}
            max={14}
            step={0.1}
            value={m}
            onChange={(e) => setM(Number(e.target.value))}
            style={{ accentColor: "var(--accent)" }}
            className="w-full"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 flex justify-between text-muted">
            <span>Starting score (intercept)</span>
            <span className="font-mono text-foreground">{b.toFixed(0)}</span>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            style={{ accentColor: "var(--accent)" }}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="text-sm">
          <span className="text-muted">Total error: </span>
          <span className="font-mono font-semibold text-foreground">
            {Math.round(err).toLocaleString()}
          </span>
          {solved && (
            <span className="ml-2 font-medium text-accent-2">
              🎯 best possible fit!
            </span>
          )}
        </div>
        <button
          onClick={autoFit}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 active:scale-95"
        >
          Let it learn →
        </button>
      </div>
      <p className="mt-3 text-xs text-muted">
        The red lines are the gaps between the line&rsquo;s guess and reality.
        &ldquo;Total error&rdquo; adds up their squares — smaller is better.
      </p>
    </div>
  );
}
