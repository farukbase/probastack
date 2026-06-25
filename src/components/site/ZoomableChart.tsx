"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Wraps a (responsive, viewBox-based) chart in a titled card with an "Expand"
 * button. Expanding pops the same chart into a large centered overlay until the
 * user closes it (✕, Esc, or backdrop click). The chart is plain SVG, so it
 * scales to whatever size its container gives it.
 */
export function ZoomableChart({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <figure className="rounded-xl border border-border bg-surface p-4">
      <figcaption className="mb-1 flex items-start justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Expand chart"
          className="shrink-0 rounded-md border border-border px-2 py-0.5 text-xs text-muted transition hover:bg-surface-2 hover:text-foreground"
        >
          ⤢ Expand
        </button>
      </figcaption>
      {hint && <p className="mb-2 text-xs text-muted">{hint}</p>}
      {children}

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-2xl border border-border bg-surface p-6 shadow-xl"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{label}</p>
                  {hint && <p className="mt-0.5 text-sm text-muted">{hint}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="shrink-0 rounded-lg border border-border px-2.5 py-1 text-sm text-muted transition hover:bg-surface-2 hover:text-foreground"
                >
                  ✕ Close
                </button>
              </div>
              <div className="[&_svg]:max-h-[72vh] [&_svg]:w-full">{children}</div>
            </div>
          </div>,
          document.body,
        )}
    </figure>
  );
}
