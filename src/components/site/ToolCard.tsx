import Link from "next/link";
import type { ToolMeta } from "@/lib/types";
import { categoryById } from "@/content/taxonomy";

/**
 * A tool card. Live tools link to their page; "coming soon" tools render as a
 * muted, non-interactive card with a badge.
 */
export function ToolCard({ meta }: { meta: ToolMeta }) {
  const category = categoryById(meta.categoryId);
  const accent = category?.accent ?? "#4f46e5";
  const live = meta.status === "live";

  const inner = (
    <>
      <div className="mb-3 flex items-center justify-between">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
          style={{ backgroundColor: `${accent}1a` }}
        >
          {meta.icon}
        </span>
        {!live && (
          <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-muted">
            Coming soon
          </span>
        )}
      </div>
      <h3
        className={`text-lg font-semibold tracking-tight ${
          live ? "transition group-hover:text-accent" : "text-foreground"
        }`}
      >
        {meta.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{meta.tagline}</p>
      {category && (
        <p className="mt-3 text-xs font-medium" style={{ color: accent }}>
          {category.title}
        </p>
      )}
    </>
  );

  if (!live) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-5 opacity-70">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/tools/${meta.slug}`}
      className="group rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {inner}
    </Link>
  );
}
