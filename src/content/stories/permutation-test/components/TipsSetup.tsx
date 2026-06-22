import { CONTROL, SMILEY, mean } from "../data";

/**
 * Bespoke to this story: shows both people's nightly tips as dots on a shared
 * scale, with each person's average marked. Makes the "$4.25 gap" tangible
 * before we test it. Pure SVG, server component.
 */
export function TipsSetup() {
  const W = 360;
  const H = 170;
  const padL = 14;
  const padR = 12;
  const min = 14;
  const max = 35;

  const x = (v: number) => padL + ((v - min) / (max - min)) * (W - padL - padR);
  const yS = 44;
  const yC = H - 52;

  const sMean = mean(SMILEY);
  const cMean = mean(CONTROL);

  const Dot = ({ v, y, color }: { v: number; y: number; color: string }) => (
    <circle cx={x(v)} cy={y} r="5" fill={color} fillOpacity="0.8" />
  );

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* smiley row */}
        <text x={padL} y={yS - 14} fontSize="10" fontWeight="600" fill="var(--accent-2)">
          Maria — smiley 🙂 (avg ${sMean.toFixed(2)})
        </text>
        {SMILEY.map((v, i) => (
          <Dot key={"s" + i} v={v} y={yS} color="var(--accent-2)" />
        ))}
        <line x1={x(sMean)} x2={x(sMean)} y1={yS - 10} y2={yS + 10} stroke="var(--accent-2)" strokeWidth="2" />

        {/* control row */}
        <text x={padL} y={yC - 14} fontSize="10" fontWeight="600" fill="var(--muted)">
          Sam — no smiley (avg ${cMean.toFixed(2)})
        </text>
        {CONTROL.map((v, i) => (
          <Dot key={"c" + i} v={v} y={yC} color="var(--muted)" />
        ))}
        <line x1={x(cMean)} x2={x(cMean)} y1={yC - 10} y2={yC + 10} stroke="var(--foreground)" strokeWidth="2" />

        {/* axis */}
        {[15, 20, 25, 30, 35].map((t) => (
          <text key={t} x={x(t)} y={H - 6} textAnchor="middle" fontSize="9" fill="var(--muted)">
            ${t}
          </text>
        ))}
      </svg>
      <p className="mt-1 text-center text-xs text-muted">
        Each dot is one night&rsquo;s tips. The vertical ticks are each
        person&rsquo;s average — a gap of ${(sMean - cMean).toFixed(2)}.
      </p>
    </div>
  );
}
