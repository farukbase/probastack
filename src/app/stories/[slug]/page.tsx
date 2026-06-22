import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { storyBySlug, publishedStories } from "@/content/stories/registry";
import { categoryById, subjectById } from "@/content/taxonomy";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedStories().map((s) => ({ slug: s.meta.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = storyBySlug(slug);
  if (!entry) return {};
  return { title: entry.meta.title, description: entry.meta.summary };
}

export default async function StoryPage({ params }: Params) {
  const { slug } = await params;
  const entry = storyBySlug(slug);
  if (!entry) notFound();

  const { meta, Component } = entry;
  const category = categoryById(meta.categoryId);
  const subject = subjectById(meta.categoryId, meta.subjectId);
  const accent = category?.accent ?? "#4f46e5";

  return (
    <div>
      {/* Story header */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-12">
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted">
            {category && (
              <Link
                href={`/categories/${category.id}`}
                className="transition hover:text-foreground"
              >
                {category.title}
              </Link>
            )}
            {subject && <span aria-hidden>›</span>}
            {subject && <span>{subject.title}</span>}
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            {meta.title}
          </h1>
          <p className="mt-3 text-lg text-muted">{meta.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
              style={{ backgroundColor: accent }}
            >
              {meta.difficulty}
            </span>
            <span className="text-muted">{meta.estimatedMinutes} min read</span>
            <span className="text-muted">·</span>
            <span className="text-muted">
              {meta.concepts.slice(0, 3).join(" · ")}
            </span>
          </div>
        </div>
      </header>

      {/* The story itself */}
      <Component />

      {/* Footer nav */}
      <div className="mx-auto max-w-2xl px-5 pb-16">
        <Link href="/#stories" className="text-sm font-medium text-accent">
          ← All stories
        </Link>
      </div>
    </div>
  );
}
