import { STONES } from "../data";

/**
 * Bespoke to this story: the confounder, made visible. Shows that Treatment A
 * mostly handled hard (large-stone) cases while B mostly handled easy ones —
 * which is what drags A's overall average down. Server component, pure layout.
 */
function Row({
  name,
  small,
  large,
}: {
  name: string;
  small: number;
  large: number;
}) {
  const total = small + large;
  const smallPct = (small / total) * 100;
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-muted">{total} cases</span>
      </div>
      <div className="flex h-7 overflow-hidden rounded-md">
        <div
          className="flex items-center justify-center bg-accent-2/70 text-xs font-medium text-white"
          style={{ width: `${smallPct}%` }}
        >
          {small} small
        </div>
        <div
          className="flex items-center justify-center bg-danger/70 text-xs font-medium text-white"
          style={{ width: `${100 - smallPct}%` }}
        >
          {large} large
        </div>
      </div>
    </div>
  );
}

export function CaseMix() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-col gap-4">
        <Row
          name="Treatment A"
          small={STONES.small.A.total}
          large={STONES.large.A.total}
        />
        <Row
          name="Treatment B"
          small={STONES.small.B.total}
          large={STONES.large.B.total}
        />
      </div>
      <p className="mt-4 text-sm text-muted">
        Treatment A was handed mostly <span className="text-danger">large</span>{" "}
        (hard) stones; Treatment B mostly{" "}
        <span className="text-accent-2">small</span> (easy) ones. That imbalance
        is the whole trick.
      </p>
    </div>
  );
}
