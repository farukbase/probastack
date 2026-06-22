/**
 * Reusable histogram for distributions. Bins a list of numbers and draws bars,
 * with optional support for marking an observed value and shading a tail (e.g.
 * to visualize a p-value). Pure SVG from props — no state, usable in server or
 * client trees. Future stats stories (bootstrap, sampling distributions) reuse
 * this directly.
 */
export interface HistogramProps {
  values: number[];
  min: number;
  max: number;
  bins?: number;
  /** Draw a vertical marker at this value. */
  observed?: number;
  observedLabel?: string;
  /** Shade every bin whose center is >= this value. */
  shadeFrom?: number;
  xLabel?: string;
  height?: number;
}

export function Histogram({
  values,
  min,
  max,
  bins = 20,
  observed,
  observedLabel,
  shadeFrom,
  xLabel,
  height = 180,
}: HistogramProps) {
  const W = 360;
  const H = height;
  const padL = 10;
  const padR = 10;
  const padT = 16;
  const padB = 28;

  const binW = (max - min) / bins;
  const counts = new Array(bins).fill(0);
  for (const v of values) {
    let i = Math.floor((v - min) / binW);
    if (i < 0) i = 0;
    if (i >= bins) i = bins - 1;
    counts[i]++;
  }
  const maxCount = Math.max(1, ...counts);

  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const barW = plotW / bins;
  const xOf = (val: number) => padL + ((val - min) / (max - min)) * plotW;

  const ticks = [min, 0, max].filter(
    (t, i, arr) => arr.indexOf(t) === i && t >= min && t <= max,
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {counts.map((c: number, i: number) => {
        const h = (c / maxCount) * plotH;
        const center = min + (i + 0.5) * binW;
        const shaded = shadeFrom !== undefined && center >= shadeFrom;
        return (
          <rect
            key={i}
            x={padL + i * barW + 0.5}
            y={padT + plotH - h}
            width={Math.max(0, barW - 1)}
            height={h}
            fill="var(--accent)"
            fillOpacity={shaded ? 0.95 : 0.18}
          />
        );
      })}

      {/* baseline */}
      <line
        x1={padL}
        x2={W - padR}
        y1={padT + plotH}
        y2={padT + plotH}
        stroke="var(--border)"
      />

      {ticks.map((t) => (
        <text
          key={t}
          x={xOf(t)}
          y={H - 14}
          textAnchor="middle"
          fontSize="9"
          fill="var(--muted)"
        >
          {t > 0 ? `+${t}` : t}
        </text>
      ))}
      {xLabel && (
        <text
          x={padL + plotW / 2}
          y={H - 2}
          textAnchor="middle"
          fontSize="9"
          fill="var(--muted)"
        >
          {xLabel}
        </text>
      )}

      {observed !== undefined && (
        <g>
          <line
            x1={xOf(observed)}
            x2={xOf(observed)}
            y1={padT - 4}
            y2={padT + plotH}
            stroke="var(--accent-2)"
            strokeWidth="2"
          />
          {observedLabel && (
            <text
              x={xOf(observed)}
              y={padT - 6}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="var(--accent-2)"
            >
              {observedLabel}
            </text>
          )}
        </g>
      )}
    </svg>
  );
}
