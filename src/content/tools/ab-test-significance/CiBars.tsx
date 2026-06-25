/**
 * Two bars with confidence-interval whiskers on a shared scale. When the
 * whiskers clearly overlap, the difference probably isn't significant — that's
 * the whole point of showing it.
 */
export interface BarDatum {
  label: string;
  value: number;
  lo: number;
  hi: number;
  color: string;
}

export function CiBars({
  data,
  format,
  confPct,
}: {
  data: BarDatum[];
  format: (n: number) => string;
  confPct: number;
}) {
  const W = 360;
  const H = 200;
  const padX = 28;
  const padTop = 24;
  const padBottom = 34;

  const lo = Math.min(0, ...data.map((d) => d.lo));
  const hi = Math.max(...data.map((d) => d.hi));
  const span = hi - lo || 1;
  const yMax = hi + span * 0.12;
  const yMin = lo;

  const plotH = H - padTop - padBottom;
  const y = (v: number) => padTop + plotH * (1 - (v - yMin) / (yMax - yMin || 1));
  const baseY = y(yMin);

  const slot = (W - padX * 2) / data.length;
  const barW = Math.min(70, slot * 0.5);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Conversion rates with confidence intervals"
    >
      {/* baseline */}
      <line
        x1={padX}
        x2={W - padX}
        y1={baseY}
        y2={baseY}
        stroke="var(--border)"
        strokeWidth={1}
      />
      {data.map((d, i) => {
        const cx = padX + slot * (i + 0.5);
        const top = y(Math.max(d.value, yMin));
        return (
          <g key={d.label}>
            {/* bar */}
            <rect
              x={cx - barW / 2}
              y={top}
              width={barW}
              height={Math.max(0, baseY - top)}
              rx={4}
              fill={d.color}
              opacity={0.85}
            />
            {/* CI whisker */}
            <line
              x1={cx}
              x2={cx}
              y1={y(d.lo)}
              y2={y(d.hi)}
              stroke="var(--foreground)"
              strokeWidth={1.5}
            />
            <line
              x1={cx - 7}
              x2={cx + 7}
              y1={y(d.hi)}
              y2={y(d.hi)}
              stroke="var(--foreground)"
              strokeWidth={1.5}
            />
            <line
              x1={cx - 7}
              x2={cx + 7}
              y1={y(d.lo)}
              y2={y(d.lo)}
              stroke="var(--foreground)"
              strokeWidth={1.5}
            />
            {/* value label */}
            <text
              x={cx}
              y={y(d.hi) - 7}
              textAnchor="middle"
              className="fill-foreground"
              style={{ fontSize: 12, fontWeight: 600 }}
            >
              {format(d.value)}
            </text>
            {/* variant label */}
            <text
              x={cx}
              y={H - 12}
              textAnchor="middle"
              className="fill-muted"
              style={{ fontSize: 12 }}
            >
              {d.label}
            </text>
          </g>
        );
      })}
      <text
        x={padX}
        y={14}
        className="fill-muted"
        style={{ fontSize: 11 }}
      >
        Estimate ± {confPct}% CI
      </text>
    </svg>
  );
}
