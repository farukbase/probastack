import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { toolBySlug, liveTools } from "@/content/tools/registry";
import { categoryById } from "@/content/taxonomy";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return liveTools().map((t) => ({ slug: t.meta.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = toolBySlug(slug);
  if (!entry) return {};
  const { meta } = entry;
  return {
    title: meta.title,
    description: meta.description || meta.tagline,
    alternates: { canonical: `/tools/${meta.slug}` },
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description || meta.tagline,
      url: `${SITE.url}/tools/${meta.slug}`,
      siteName: SITE.name,
    },
  };
}

export default async function ToolPage({ params }: Params) {
  const { slug } = await params;
  const entry = toolBySlug(slug);
  if (!entry || !entry.Component) notFound();

  const { meta, Component } = entry;
  const category = categoryById(meta.categoryId);
  const accent = category?.accent ?? "#4f46e5";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: meta.title,
    description: meta.description || meta.tagline,
    url: `${SITE.url}/tools/${meta.slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-10">
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted">
            <Link href="/tools" className="transition hover:text-foreground">
              Tools
            </Link>
            {category && <span aria-hidden>›</span>}
            {category && <span>{category.title}</span>}
          </nav>
          <div className="flex items-start gap-3">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
              style={{ backgroundColor: `${accent}1a` }}
            >
              {meta.icon}
            </span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                {meta.title}
              </h1>
              <p className="mt-2 text-muted">{meta.description || meta.tagline}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-10">
        <Component />
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-16">
        <Link href="/tools" className="text-sm font-medium text-accent">
          ← All tools
        </Link>
      </div>
    </div>
  );
}
