/**
 * Bespoke to this story: the "why 2/3" reveal. Lays out all three equally
 * likely first picks side by side and shows what *switching* gives you in each.
 * Two of the three win — that's the whole proof, made visible. No interactivity,
 * so it stays a server component.
 */
const SCENARIOS = [
  { behind: "🚗", label: "You first picked the car", win: false },
  { behind: "🐐", label: "You first picked a goat", win: true },
  { behind: "🐐", label: "You first picked the other goat", win: true },
];

export function SwitchOutcomeGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {SCENARIOS.map((s, i) => (
        <div
          key={i}
          className={`flex flex-col items-center rounded-xl border p-4 text-center ${
            s.win
              ? "border-accent-2/40 bg-accent-2-soft"
              : "border-danger/30 bg-danger-soft"
          }`}
        >
          <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">
            Case {i + 1} · 1⁄3
          </div>
          <div className="text-4xl">{s.behind}</div>
          <p className="mt-2 text-sm text-foreground/80">{s.label}</p>
          <div
            className={`mt-3 rounded-full px-3 py-1 text-xs font-semibold ${
              s.win
                ? "bg-accent-2 text-white"
                : "bg-danger text-white"
            }`}
          >
            Switching {s.win ? "WINS" : "loses"}
          </div>
        </div>
      ))}
    </div>
  );
}
