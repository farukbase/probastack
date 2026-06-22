"use client";

/**
 * Reusable horizontal bar chart for showing rates/proportions.
 * Pure SVG-free CSS bars so it animates smoothly and carries zero deps.
 * Used across any story that compares outcomes (A/B tests, simulations, …).
 */
export interface ChartBar {
  label: string;
  /** 0..max */
  value: number;
  color: string;
  /** Optional small text shown under the label, e.g. "337 / 1000". */
  sublabel?: string;
}

export interface WinRateChartProps {
  bars: ChartBar[];
  /** Upper bound of the axis. Default 1 (i.e. value is a proportion). */
  max?: number;
  /** Format a value into the number shown at the bar's end. */
  format?: (value: number) => string;
}

const defaultFormat = (v: number) => `${Math.round(v * 100)}%`;

export function WinRateChart({
  bars,
  max = 1,
  format = defaultFormat,
}: WinRateChartProps) {
  const pct = (v: number) => `${Math.min(100, (v / max) * 100)}%`;

  return (
    <div className="flex flex-col gap-4">
      {bars.map((bar) => (
        <div key={bar.label} className="flex items-center gap-3">
          <div className="w-28 shrink-0 text-right">
            <div className="text-sm font-medium text-foreground">{bar.label}</div>
            {bar.sublabel && (
              <div className="font-mono text-xs text-muted">{bar.sublabel}</div>
            )}
          </div>
          <div className="relative h-9 flex-1 overflow-hidden rounded-md bg-surface-2">
            <div
              className="flex h-full items-center justify-end rounded-md pr-2 transition-[width] duration-500 ease-out"
              style={{ width: pct(bar.value), backgroundColor: bar.color }}
            >
              <span className="text-sm font-semibold tabular-nums text-white drop-shadow-sm">
                {format(bar.value)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
