import Image from "next/image";
import { SITE } from "@/lib/site";

/**
 * Buy Me a Coffee touchpoints. `SupportCard` sits at the end of every story —
 * the moment a reader just got value — and `CoffeeLink` is the quiet footer
 * version. Brand yellow (#FFDD00) on black per Buy Me a Coffee's palette.
 */
export function SupportCard() {
  return (
    <aside className="mx-auto my-12 max-w-2xl px-5">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-accent-soft/40 px-6 py-7 text-center sm:flex-row sm:text-left">
        <Image
          src="/proby/face.webp"
          alt=""
          width={68}
          height={59}
          className="h-12 w-auto"
        />
        <div className="flex-1">
          <p className="font-semibold text-foreground">Enjoyed this story?</p>
          <p className="mt-0.5 text-sm text-muted">
            Probastack is free and ad-free. A coffee helps keep the next story
            coming.
          </p>
        </div>
        <a
          href={SITE.buyMeACoffee}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#FFDD00] px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:brightness-95"
        >
          <span aria-hidden>☕</span> Buy me a coffee
        </a>
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
