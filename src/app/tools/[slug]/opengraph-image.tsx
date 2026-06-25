import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { toolBySlug, liveTools } from "@/content/tools/registry";
import { categoryById } from "@/content/taxonomy";

/** Per-tool social card — tool title + icon on the brand background. */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Probastack tool";

export function generateStaticParams() {
  return liveTools().map((t) => ({ slug: t.meta.slug }));
}

export default async function ToolOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = toolBySlug(slug);
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
            Tool
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ fontSize: 110, display: "flex" }}>{meta?.icon ?? "🧰"}</div>
          <div
            style={{
              fontSize: 70,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#16161d",
              maxWidth: 840,
              display: "flex",
            }}
          >
            {meta?.title ?? SITE.name}
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#6b6b76",
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {meta?.tagline ?? SITE.tagline}
        </div>
      </div>
    ),
    size,
  );
}
