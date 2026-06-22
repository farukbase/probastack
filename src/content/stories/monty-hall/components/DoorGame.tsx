"use client";

import { useState } from "react";

/**
 * Bespoke to the Monty Hall story: a fully playable round of the game.
 * Pick a door, watch the host open a goat, then stay or switch — with a running
 * tally of how each strategy is treating *you*.
 */
type Phase = "pick" | "decide" | "result";

const DOORS = [0, 1, 2];
const rnd = (n: number) => Math.floor(Math.random() * n);

interface Stats {
  switchWins: number;
  switchGames: number;
  stayWins: number;
  stayGames: number;
}

export function DoorGame() {
  const [carDoor, setCarDoor] = useState(() => rnd(3));
  const [picked, setPicked] = useState<number | null>(null);
  const [opened, setOpened] = useState<number | null>(null);
  const [finalPick, setFinalPick] = useState<number | null>(null);
  const [switched, setSwitched] = useState(false);
  const [phase, setPhase] = useState<Phase>("pick");
  const [stats, setStats] = useState<Stats>({
    switchWins: 0,
    switchGames: 0,
    stayWins: 0,
    stayGames: 0,
  });

  function pick(door: number) {
    if (phase !== "pick") return;
    const goats = DOORS.filter((d) => d !== door && d !== carDoor);
    setPicked(door);
    setOpened(goats[rnd(goats.length)]);
    setPhase("decide");
  }

  function decide(switchIt: boolean) {
    const final = switchIt
      ? DOORS.find((d) => d !== picked && d !== opened)!
      : picked!;
    const won = final === carDoor;
    setFinalPick(final);
    setSwitched(switchIt);
    setStats((s) => ({
      switchWins: s.switchWins + (switchIt && won ? 1 : 0),
      switchGames: s.switchGames + (switchIt ? 1 : 0),
      stayWins: s.stayWins + (!switchIt && won ? 1 : 0),
      stayGames: s.stayGames + (!switchIt ? 1 : 0),
    }));
    setPhase("result");
  }

  function playAgain() {
    setCarDoor(rnd(3));
    setPicked(null);
    setOpened(null);
    setFinalPick(null);
    setPhase("pick");
  }

  const won = finalPick === carDoor;
  const rate = (w: number, g: number) =>
    g ? `${Math.round((w / g) * 100)}%` : "—";

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <p className="mb-4 text-center text-sm font-medium text-muted">
        {phase === "pick" && "Pick a door."}
        {phase === "decide" &&
          "The host opened a goat. Do you stay or switch?"}
        {phase === "result" &&
          (won ? "🎉 You won the car!" : "🐐 A goat. Tough luck.")}
      </p>

      <div className="grid grid-cols-3 gap-3">
        {DOORS.map((d) => {
          const isOpenGoat = d === opened;
          const reveal = phase === "result";
          const isPicked = d === picked;
          const isFinal = d === finalPick;

          const showContent = isOpenGoat || reveal;
          const content = showContent ? (d === carDoor ? "🚗" : "🐐") : "?";

          let ring = "border-border";
          if (phase === "decide" && isPicked) ring = "border-accent";
          if (reveal && isFinal)
            ring = won ? "border-accent-2" : "border-danger";

          const dim = isOpenGoat && phase !== "result";

          return (
            <button
              key={d}
              onClick={() => pick(d)}
              disabled={phase !== "pick"}
              className={`relative flex aspect-[3/4] items-center justify-center rounded-lg border-2 text-5xl transition ${ring} ${
                dim ? "bg-surface-2 opacity-60" : "bg-accent-soft/40"
              } ${phase === "pick" ? "cursor-pointer hover:-translate-y-0.5 hover:border-accent" : "cursor-default"}`}
            >
              <span className="select-none">{content}</span>
              {isPicked && phase !== "pick" && (
                <span className="absolute bottom-1.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                  your pick
                </span>
              )}
              {!showContent && (
                <span className="absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-foreground/30" />
              )}
            </button>
          );
        })}
      </div>

      {phase === "decide" && (
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => decide(false)}
            className="rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground transition hover:bg-surface-2"
          >
            Stay
          </button>
          <button
            onClick={() => decide(true)}
            className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Switch
          </button>
        </div>
      )}

      {phase === "result" && (
        <div className="mt-4 text-center">
          <p className="mb-3 text-sm text-muted">
            You {switched ? "switched" : "stayed"} and {won ? "won" : "lost"}.
          </p>
          <button
            onClick={playAgain}
            className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Play again
          </button>
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-center">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">
            When you stayed
          </div>
          <div className="font-mono text-lg font-semibold text-foreground">
            {rate(stats.stayWins, stats.stayGames)}
          </div>
          <div className="font-mono text-xs text-muted">
            {stats.stayWins}/{stats.stayGames} won
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">
            When you switched
          </div>
          <div className="font-mono text-lg font-semibold text-accent-2">
            {rate(stats.switchWins, stats.switchGames)}
          </div>
          <div className="font-mono text-xs text-muted">
            {stats.switchWins}/{stats.switchGames} won
          </div>
        </div>
      </div>
    </div>
  );
}
