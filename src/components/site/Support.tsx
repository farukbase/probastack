import Image from "next/image";
import { SITE } from "@/lib/site";

/**
 * Buy Me a Coffee touchpoints. `SupportCard` sits at the end of every story —
 * the moment a reader just got value — and `CoffeeLink` is the quiet footer
 * version. Brand yellow (#FFDD00) on black per Buy Me a Coffee's palette.
 */
/**
 * Treats that drift down around the dashed border — placed in the yellow band
 * around the white speech bubble, each on its own gentle, staggered loop.
 */
const SNACKS = [
  { emoji: "🍎", pos: "top-2 left-[22%]", size: "text-lg", delay: "0s", dur: "6s" },
  { emoji: "🍩", pos: "top-1 left-1/2", size: "text-base", delay: "1.6s", dur: "7s" },
  { emoji: "🦴", pos: "top-3 right-12", size: "text-sm", delay: "0.8s", dur: "6.5s" },
  { emoji: "🍌", pos: "top-1/2 right-2", size: "text-base", delay: "2.4s", dur: "7.5s" },
  { emoji: "🍓", pos: "bottom-2 left-[34%]", size: "text-base", delay: "3.1s", dur: "6.2s" },
  { emoji: "🍪", pos: "bottom-3 right-[26%]", size: "text-sm", delay: "1.1s", dur: "6.8s" },
] as const;

export function SupportCard() {
  return (
    <aside className="mx-auto my-14 max-w-2xl px-5">
      <div className="group relative -rotate-1 rounded-3xl border-2 border-dashed border-amber-400/70 bg-gradient-to-br from-amber-50 to-yellow-100/70 px-5 py-6 transition-transform duration-300 hover:rotate-0">
        {/* Snacks drifting around the border (decorative). */}
        {SNACKS.map((s, i) => (
          <span
            key={i}
            aria-hidden
            className={`snack pointer-events-none absolute z-0 ${s.pos} ${s.size}`}
            style={{ animationDelay: s.delay, animationDuration: s.dur }}
          >
            {s.emoji}
          </span>
        ))}

        <div className="relative z-10 flex flex-col items-center gap-5 sm:flex-row">
          {/* Proby, sitting, with a bobbing snack + heart puffs */}
          <div className="relative shrink-0">
            <Image
              src="/proby/sitting.webp"
              alt="Proby"
              width={120}
              height={140}
              className="h-24 w-auto transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
            />
            <span
              className="bmc-cup absolute bottom-1 -right-1 text-2xl"
              aria-hidden
            >
              🍪
            </span>
            <span
              className="heart absolute -top-1 right-1 text-sm"
              style={{ animationDelay: "0s" }}
              aria-hidden
            >
              💗
            </span>
            <span
              className="heart absolute top-2 -left-1 text-xs"
              style={{ animationDelay: "1.4s" }}
              aria-hidden
            >
              💕
            </span>
          </div>

          {/* Proby's speech bubble */}
          <div className="relative flex-1 rounded-2xl border border-amber-300/80 bg-surface px-4 py-3 text-center sm:text-left">
            <span
              aria-hidden
              className="absolute left-1/2 top-[-7px] hidden h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-amber-300/80 bg-surface sm:left-[-7px] sm:top-1/2 sm:block sm:-translate-x-0 sm:-translate-y-1/2 sm:border-l sm:border-t-0 sm:border-b sm:border-r-0"
            />
            <p className="font-bold text-foreground">
              Pssst — it&rsquo;s me, Proby. 🐾
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              I just parachuted through this entire story to keep you company.
              All that flying works up quite an{" "}
              <span className="font-medium text-foreground">appetite</span>. Toss
              me a snack?
            </p>
            <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <a
                href={SITE.buyMeACoffee}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#FFDD00] px-5 py-2.5 text-sm font-bold text-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span aria-hidden className="text-xl leading-none">
                  🍪
                </span>{" "}
                Feed Proby
              </a>
              <span className="whitespace-nowrap text-xs text-muted">
                Free &amp; ad-free, always.
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function CoffeeLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE.buyMeACoffee}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 transition hover:text-foreground ${className}`}
    >
      <span aria-hidden>☕</span> Buy me a coffee
    </a>
  );
}
