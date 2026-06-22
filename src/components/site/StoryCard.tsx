import Link from "next/link";
import type { StoryMeta } from "@/lib/types";
import { categoryById } from "@/content/taxonomy";

export function StoryCard({ meta }: { meta: StoryMeta }) {
  const category = categoryById(meta.categoryId);
  const accent = category?.accent ?? "#4f46e5";

  return (
    <Link
      href={`/stories/${meta.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-2 text-xs font-medium">
        <span
          className="rounded-full px-2 py-0.5 text-white"
          style={{ backgroundColor: accent }}
        >
          {category?.title ?? meta.categoryId}
        </span>
        <span className="text-muted">{meta.difficulty}</span>
        <span className="text-muted">· {meta.estimatedMinutes} min</span>
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground transition group-hover:text-accent">
        {meta.title}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
        {meta.hook}
      </p>
      <span className="mt-4 text-sm font-medium text-accent">
        Explore →
      </span>
    </Link>
  );
}
