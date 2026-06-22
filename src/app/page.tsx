import Link from "next/link";
import Image from "next/image";
import { categories } from "@/content/taxonomy";
import { publishedStories } from "@/content/stories/registry";
import { StoryCard } from "@/components/site/StoryCard";

export default function Home() {
  const stories = publishedStories();

  return (
    <div>
      {/* Hero */}
      <section className="bg-dotgrid border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:py-28">
          <Image
            src="/proby/sitting.webp"
            alt="Proby, the Probastack mascot"
            width={480}
            height={560}
            priority
            className="mx-auto mb-6 h-32 w-auto drop-shadow-[0_8px_24px_rgba(79,70,229,0.25)] sm:h-40"
          />
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Data · Statistics · AI · Machine Learning
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Learn quantitative thinking through{" "}
            <span className="text-accent">interactive stories</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Probastack teaches by discovery: play with the idea, make a
            prediction, run the simulation, and feel the concept click before
            anyone hands you a formula.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/stories/the-monty-hall-trap"
              className="rounded-lg bg-accent px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              Start with Monty Hall →
            </Link>
            <Link
              href="#categories"
              className="rounded-lg border border-border bg-surface px-6 py-3 font-medium text-foreground transition hover:bg-surface-2"
            >
              Browse categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured stories */}
      <section id="stories" className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="mb-1 text-2xl font-semibold tracking-tight">
          Featured stories
        </h2>
        <p className="mb-8 text-muted">Short, memorable, hands-on experiences.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => (
            <StoryCard key={s.meta.slug} meta={s.meta} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="border-t border-border bg-surface-2/40">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <h2 className="mb-1 text-2xl font-semibold tracking-tight">
            Browse by category
          </h2>
          <p className="mb-8 text-muted">
            A growing map of quantitative ideas. More stories landing in each.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/categories/${c.id}`}
                className="group rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className="mb-3 h-1.5 w-10 rounded-full"
                  style={{ backgroundColor: c.accent }}
                />
                <h3 className="text-lg font-semibold tracking-tight transition group-hover:text-accent">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{c.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
