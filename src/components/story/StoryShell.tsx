import type { ReactNode } from "react";

/**
 * Editorial layout primitives for stories. These are *helpers, not a template*
 * — a story uses whichever it wants, in any order. They exist so prose and
 * interactives sit in a consistent, readable column without every story
 * re-inventing spacing. All server-rendered (no client cost).
 */

/** Constrains content to a comfortable reading measure. */
export function StoryColumn({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-2xl px-5">{children}</div>;
}

/** A vertical rhythm wrapper with an optional small eyebrow label. */
export function Section({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-8">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      {children}
    </section>
  );
}

/** Large lead-in line that sets up a beat. */
export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="prose-story text-2xl font-medium leading-snug text-foreground">
      {children}
    </p>
  );
}

/** Serif body prose. */
export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose-story">{children}</div>;
}

/** A wide, full-bleed-ish slot for an interactive island to breathe. */
export function Stage({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      {children}
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** A soft sidebar note for definitions / asides. */
export function Callout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-6 rounded-xl border-l-4 border-accent bg-accent-soft/50 px-5 py-4">
      {title && (
        <p className="mb-1 text-sm font-semibold text-accent">{title}</p>
      )}
      <div className="text-[0.95rem] leading-relaxed text-foreground/80">
        {children}
      </div>
    </aside>
  );
}
