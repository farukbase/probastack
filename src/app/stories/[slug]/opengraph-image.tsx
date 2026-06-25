import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { storyBySlug, publishedStories } from "@/content/stories/registry";
import { categoryById } from "@/content/taxonomy";

/**
 * Per-story social card — each story gets its own title and category accent on
 * the share image. Pre-rendered for every published slug at build time.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Probastack interactive story";

export function generateStaticParams() {
  return publishedStories().map((s) => ({ slug: s.meta.slug }));
}

export default async function StoryOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = storyBySlug(slug);
  const meta = entry?.meta;
  const category = meta ? categoryById(meta.categoryId) : undefined;
  const accent = category?.accent ?? "#4f46e5";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px 90px",
          background: "#fbfbf9",
          backgroundImage: "radial-gradient(#e6e6e0 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 999,
              background: accent,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: -0.5,
              color: "#16161d",
              display: "flex",
            }}
          >
            proba<span style={{ color: accent }}>stack</span>
          </div>
          {category && (
            <div
              style={{
                marginLeft: 8,
                fontSize: 22,
                fontWeight: 600,
                color: "#6b6b76",
                textTransform: "uppercase",
                letterSpacing: 2,
                display: "flex",
              }}
            >
              {category.title}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: "auto",
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: -2,
            color: "#16161d",
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {meta?.title ?? SITE.name}
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 30,
            color: "#6b6b76",
            maxWidth: 960,
            display: "flex",
          }}
        >
          {meta?.hook ?? SITE.tagline}
        </div>
      </div>
    ),
    size,
  );
}
