import { sharedBirthdayProbability } from "../math";

/**
 * Bespoke to this story: the probability curve P(shared birthday) vs. number of
 * people, with the 23 and 50 landmarks called out. Pure SVG, no state, so it
 * renders on the server.
 */
export function BirthdayCurve() {
  const W = 360;
  const H = 220;
  const padL = 34;
  const padR = 12;
  const padT = 12;
  const padB = 26;
  const maxN = 75;

  const x = (n: number) => padL + (n / maxN) * (W - padL - padR);
  const y = (p: number) => padT + (1 - p) * (H - padT - padB);

  const path =
    "M" +
    Array.from({ length: maxN }, (_, i) => {
      const n = i + 1;
      return `${x(n).toFixed(1)},${y(sharedBirthdayProbability(n)).toFixed(1)}`;
    }).join(" L");

  const p23 = sharedBirthdayProbability(23);
  const p50 = sharedBirthdayProbability(50);

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* horizontal gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <g key={g}>
            <line
              x1={padL}
              x2={W - padR}
              y1={y(g)}
              y2={y(g)}
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x={padL - 6}
              y={y(g) + 3}
              textAnchor="end"
              fontSize="9"
              fill="var(--muted)"
            >
              {g * 100}%
            </text>
          </g>
        ))}

        {/* x-axis ticks */}
        {[10, 23, 50, 75].map((t) => (
          <text
            key={t}
            x={x(t)}
            y={H - 10}
            textAnchor="middle"
            fontSize="9"
            fill="var(--muted)"
          >
            {t}
          </text>
        ))}
        <text
          x={(W + padL) / 2}
          y={H - 1}
          textAnchor="middle"
          fontSize="9"
          fill="var(--muted)"
        >
          people in the room
        </text>

        {/* the curve */}
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" />

        {/* 23-people landmark */}
        <line
          x1={x(23)}
          x2={x(23)}
          y1={y(p23)}
          y2={H - padB}
          stroke="var(--accent-2)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <circle cx={x(23)} cy={y(p23)} r="3.5" fill="var(--accent-2)" />
        <text x={x(23) + 5} y={y(p23) - 6} fontSize="9" fill="var(--accent-2)">
          23 → 50.7%
        </text>

        {/* 50-people landmark */}
        <circle cx={x(50)} cy={y(p50)} r="3" fill="var(--accent)" />
        <text x={x(50) + 5} y={y(p50) - 4} fontSize="9" fill="var(--muted)">
          50 → 97%
        </text>
      </svg>
    </div>
  );
}
