import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, categoryById } from "@/content/taxonomy";
import { storiesByCategory } from "@/content/stories/registry";
import { StoryCard } from "@/components/site/StoryCard";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryById(slug);
  if (!category) return {};
  return { title: category.title, description: category.blurb };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = categoryById(slug);
  if (!category) notFound();

  const stories = storiesByCategory(category.id).filter(
    (s) => s.meta.status === "published",
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <div
        className="mb-3 h-1.5 w-12 rounded-full"
        style={{ backgroundColor: category.accent }}
      />
      <h1 className="text-3xl font-semibold tracking-tight">{category.title}</h1>
      <p className="mt-2 max-w-2xl text-muted">{category.blurb}</p>

      {/* Subjects */}
      <div className="mt-6 flex flex-wrap gap-2">
        {category.subjects.map((s) => (
          <span
            key={s.id}
            className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted"
          >
            {s.title}
          </span>
        ))}
      </div>

      {/* Stories */}
      <div className="mt-10">
        {stories.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((s) => (
              <StoryCard key={s.meta.slug} meta={s.meta} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border p-10 text-center text-muted">
            <Image
              src="/proby/sitting.webp"
              alt="Proby"
              width={480}
              height={560}
              className="mb-3 h-24 w-auto opacity-90"
            />
            <p className="font-medium text-foreground">Proby&rsquo;s still writing these</p>
            <p className="mt-1 text-sm">
              This category is on the way. Check back shortly.
            </p>
          </div>
        )}
      </div>

      <div className="mt-12">
        <Link href="/#categories" className="text-sm font-medium text-accent">
          ← All categories
        </Link>
      </div>
    </div>
  );
}
