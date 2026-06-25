import { normalPdf, studentTPdf } from "./stats";

/**
 * The null distribution (what the test statistic would look like if the two
 * variants were identical). The observed statistic is marked; the tail area
 * beyond it — the p-value — is shaded; dashed critical lines mark the
 * significance threshold and slide as the confidence level changes.
 */
export function NullCurve({
  dist,
  df,
  stat,
  crit,
  tails,
  significant,
}: {
  dist: "z" | "t";
  df: number;
  stat: number;
  crit: number;
  tails: "two" | "one";
  significant: boolean;
}) {
  const W = 480;
  const H = 200;
  const padX = 16;
  const padTop = 16;
  const padBottom = 28;
  const plotH = H - padTop - padBottom;

  const density = (x: number) =>
    dist === "z" ? normalPdf(x) : studentTPdf(x, df);

  const R = Math.max(3.6, Math.abs(stat) + 0.8, crit + 0.8);
  const peak = density(0);

  const xToPx = (x: number) => padX + ((x + R) / (2 * R)) * (W - padX * 2);
  const yToPx = (d: number) => padTop + plotH * (1 - d / (peak || 1));
  const baseY = padTop + plotH;

  const N = 160;
  const xs = Array.from({ length: N + 1 }, (_, i) => -R + (2 * R * i) / N);

  const curve = xs
    .map((x, i) => `${i === 0 ? "M" : "L"} ${xToPx(x).toFixed(1)} ${yToPx(density(x)).toFixed(1)}`)
    .join(" ");

  // Shaded tail area = the p-value.
  function area(from: number, to: number) {
    const pts = xs.filter((x) => x >= from && x <= to);
    if (pts.length === 0) return "";
    const seg = [from, ...pts, to];
    const top = seg
      .map((x, i) => `${i === 0 ? "M" : "L"} ${xToPx(x).toFixed(1)} ${yToPx(density(x)).toFixed(1)}`)
      .join(" ");
    return `${top} L ${xToPx(to).toFixed(1)} ${baseY} L ${xToPx(from).toFixed(1)} ${baseY} Z`;
  }

  const a = Math.abs(stat);
  const shaded =
    tails === "two"
      ? [area(a, R), area(-R, -a)]
      : [area(stat, R)];

  const critLines = tails === "two" ? [crit, -crit] : [crit];
  const shadeColor = significant ? "var(--accent-2)" : "var(--danger)";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Null distribution with observed statistic and p-value area"
    >
      {/* baseline */}
      <line x1={padX} x2={W - padX} y1={baseY} y2={baseY} stroke="var(--border)" />

      {/* p-value shading */}
      {shaded.map((d, i) => (
        <path key={i} d={d} fill={shadeColor} opacity={0.22} />
      ))}

      {/* curve */}
      <path d={curve} fill="none" stroke="var(--muted)" strokeWidth={2} />

      {/* critical lines (move with the confidence level) */}
      {critLines.map((c, i) => (
        <line
          key={i}
          x1={xToPx(c)}
          x2={xToPx(c)}
          y1={padTop + 4}
          y2={baseY}
          stroke="var(--muted)"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
      ))}

      {/* observed statistic */}
      <line
        x1={xToPx(stat)}
        x2={xToPx(stat)}
        y1={padTop}
        y2={baseY}
        stroke="var(--accent)"
        strokeWidth={2}
      />
      <text
        x={Math.min(W - padX - 2, Math.max(padX + 2, xToPx(stat)))}
        y={padTop - 2 + 10}
        textAnchor="middle"
        className="fill-accent"
        style={{ fontSize: 11, fontWeight: 700 }}
      >
        {dist === "z" ? "z" : "t"} = {stat.toFixed(2)}
      </text>

      {/* axis ticks */}
      {[-Math.round(R) + 1, 0, Math.round(R) - 1].map((t) => (
        <text
          key={t}
          x={xToPx(t)}
          y={H - 10}
          textAnchor="middle"
          className="fill-muted"
          style={{ fontSize: 10 }}
        >
          {t}
        </text>
      ))}
    </svg>
  );
}
