"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

/**
 * Proby mode — one page-wide mascot that travels down the interactive sections.
 *
 * Every <Stage> renders `data-proby-target`. Proby hops out of the first
 * target's corner, settles holding the border, and — when clicked (or after a
 * few idle minutes) — hops once, then parachutes slowly down to the NEXT target
 * and lands exactly on its border. On the last target he parachutes off the
 * bottom of the page and fades away. A corner 🐾 toggle turns it on/off
 * (persisted). Respects prefers-reduced-motion via the CSS classes.
 */
type Phase = "emerge" | "perch" | "hop" | "transit" | "depart" | "gone";

const KEY = "proby-mode";
const W = 64; // wrapper width (px)
const H = 56; // wrapper height (px) — perched
const INSET = 14; // gap from the component's right edge
const RISE = 4; // how far his feet overlap onto the border
const AUTO_FALL_MS = 120_000; // auto-launch after ~2 min perched without a poke
const TRAVEL_MS = 3200; // parachute trip to the next component
const DEPART_MS = 3400; // parachute off the bottom

const IMAGES = {
  sitting: { src: "/proby/sitting.webp", w: 120, h: 140, cls: "h-14" },
  face: { src: "/proby/face.webp", w: 120, h: 104, cls: "h-14" },
  parachute: { src: "/proby/parachute.webp", w: 120, h: 153, cls: "h-20" },
} as const;

function imageFor(phase: Phase): keyof typeof IMAGES {
  if (phase === "emerge" || phase === "hop") return "sitting";
  if (phase === "perch") return "face";
  return "parachute"; // transit, depart
}

export function ProbyMode() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [phase, setPhase] = useState<Phase>("gone");
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<HTMLElement[]>([]);
  const indexRef = useRef(0);
  const posRef = useRef<{ left: number; top: number } | null>(null);
  const timers = useRef<number[]>([]);
  const animRef = useRef<Animation | null>(null);

  posRef.current = pos;

  const clearTimers = () => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const cancelAnim = () => {
    animRef.current?.cancel();
    animRef.current = null;
  };

  // Document coordinates (scroll-invariant), so Proby is positioned absolutely
  // and scrolls with the page natively — no per-scroll JS, no lag.
  const cornerOf = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return {
      left: r.right - W - INSET + window.scrollX,
      top: r.top + window.scrollY - H + RISE,
    };
  };

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(KEY);
    setEnabled(saved === null ? true : saved === "on");
  }, []);

  // (Re)initialize whenever the route changes or Proby is toggled on.
  const start = useCallback(() => {
    clearTimers();
    cancelAnim();
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-proby-target]"),
    ).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    targetsRef.current = targets;
    indexRef.current = 0;
    if (targets.length === 0) {
      setPhase("gone");
      return;
    }
    setPos(cornerOf(targets[0]));
    setPhase("emerge"); // always hop out of the corner
    later(() => setPhase("perch"), 760);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!enabled) {
      clearTimers();
      cancelAnim();
      setPhase("gone");
      return;
    }
    later(start, 80); // let the new page's targets land in the DOM first
    return () => {
      clearTimers();
      cancelAnim();
    };
  }, [mounted, enabled, pathname, start]);

  // Absolute + document coords means scrolling needs no JS. We only recompute on
  // layout shifts (a Reveal expanding, an interactive growing, viewport resize),
  // which a ResizeObserver on <body> catches — never on scroll, so no jitter.
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const recompute = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const t = targetsRef.current[indexRef.current];
        if (t && (phase === "perch" || phase === "emerge")) setPos(cornerOf(t));
      });
    };
    const ro = new ResizeObserver(recompute);
    ro.observe(document.body);
    window.addEventListener("resize", recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
      cancelAnimationFrame(raf);
    };
  }, [enabled, phase]);

  // Animate the real left/top so Proby lands exactly on the next border (no
  // transform delta to clear, so no snap-back).
  const launch = useCallback(() => {
    setPhase("hop");
    later(() => {
      const el = wrapRef.current;
      const targets = targetsRef.current;
      const cur = indexRef.current;
      const from = posRef.current;
      if (!el || !from) return;
      const next = cur + 1;

      if (next < targets.length) {
        const to = cornerOf(targets[next]);
        const dx = to.left - from.left;
        const dy = to.top - from.top;
        const px = (n: number) => `${n}px`;
        setPhase("transit");
        const a = el.animate(
          [
            { left: px(from.left), top: px(from.top), transform: "rotate(-6deg)" },
            { left: px(from.left + dx * 0.25 + 26), top: px(from.top + dy * 0.25), transform: "rotate(9deg)", offset: 0.25 },
            { left: px(from.left + dx * 0.5 - 24), top: px(from.top + dy * 0.5), transform: "rotate(-8deg)", offset: 0.5 },
            { left: px(from.left + dx * 0.75 + 18), top: px(from.top + dy * 0.75), transform: "rotate(5deg)", offset: 0.75 },
            { left: px(to.left), top: px(to.top), transform: "rotate(0deg)" },
          ],
          { duration: TRAVEL_MS, easing: "ease-in-out", fill: "both" },
        );
        animRef.current = a;
        a.onfinish = () => {
          indexRef.current = next;
          setPos(to); // matches the animation's final left/top → seamless
          setPhase("perch");
          cancelAnim();
        };
      } else {
        // last component: parachute past the bottom of the viewport and fade
        const endTop = window.scrollY + window.innerHeight + 200; // document coord just below the fold
        const span = endTop - from.top;
        const px = (n: number) => `${n}px`;
        setPhase("depart");
        const a = el.animate(
          [
            { left: px(from.left), top: px(from.top), transform: "rotate(-6deg)", opacity: 1 },
            { left: px(from.left + 28), top: px(from.top + span * 0.35), transform: "rotate(9deg)", opacity: 1, offset: 0.35 },
            { left: px(from.left - 26), top: px(from.top + span * 0.7), transform: "rotate(-7deg)", opacity: 0.5, offset: 0.7 },
            { left: px(from.left + 16), top: px(endTop), transform: "rotate(4deg)", opacity: 0 },
          ],
          { duration: DEPART_MS, easing: "ease-in", fill: "both" },
        );
        animRef.current = a;
        a.onfinish = () => setPhase("gone");
      }
    }, 320);
  }, []);

  // Auto-fall after a few idle minutes on a perch.
  useEffect(() => {
    if (phase !== "perch") return;
    const id = window.setTimeout(() => launch(), AUTO_FALL_MS);
    return () => clearTimeout(id);
  }, [phase, launch]);

  const toggle = () => {
    setEnabled((v) => {
      const nv = !v;
      localStorage.setItem(KEY, nv ? "on" : "off");
      return nv;
    });
  };

  if (!mounted) return null;

  const showProby = enabled && phase !== "gone" && pos !== null;
  const img = IMAGES[imageFor(phase)];
  const animClass =
    phase === "emerge" ? "proby-emerge" : phase === "hop" ? "proby-prehop" : "";

  return (
    <>
      {showProby && (
        <div
          ref={wrapRef}
          role="button"
          tabIndex={phase === "perch" ? 0 : -1}
          aria-label="Poke Proby — he'll parachute to the next section"
          onClick={() => phase === "perch" && launch()}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && phase === "perch") {
              e.preventDefault();
              launch();
            }
          }}
          style={{ left: pos.left, top: pos.top, width: W, height: H }}
          className={`absolute z-40 flex items-end justify-center ${
            phase === "perch" ? "cursor-pointer" : "pointer-events-none"
          }`}
        >
          <Image
            src={img.src}
            alt=""
            width={img.w}
            height={img.h}
            className={`${animClass} ${img.cls} w-auto drop-shadow-[0_5px_10px_rgba(79,70,229,0.30)]`}
          />
        </div>
      )}

      <button
        onClick={toggle}
        title={enabled ? "Turn off Proby" : "Turn on Proby"}
        aria-label={enabled ? "Turn off Proby" : "Turn on Proby"}
        className="fixed bottom-3 right-3 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/85 text-base shadow-sm backdrop-blur transition hover:bg-surface"
      >
        <span className={enabled ? "" : "opacity-40 grayscale"}>🐾</span>
      </button>
    </>
  );
}
