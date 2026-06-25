import type { Metadata } from "next";
import { tools } from "@/content/tools/registry";
import { ToolCard } from "@/components/site/ToolCard";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Small, free, no-signup tools for data and statistics — A/B test significance, calculators, and visualizers. Everything runs in your browser.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <div>
      <section className="bg-dotgrid border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            Free · No signup · Runs in your browser
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Tools
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Quick, focused utilities for the ideas in our stories — calculate it,
            don&rsquo;t just read about it. More landing regularly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <ToolCard key={t.meta.slug} meta={t.meta} />
          ))}
        </div>
      </section>
    </div>
  );
}
