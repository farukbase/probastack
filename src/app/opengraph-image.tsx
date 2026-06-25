import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

/**
 * Default social-share card for the whole site (home + any page without its own
 * card). Generated at build time by next/og. 1200×630 is the standard OG size.
 */
export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#fbfbf9",
          backgroundImage:
            "radial-gradient(#e6e6e0 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              background: "#4f46e5",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: -0.5,
              color: "#16161d",
              display: "flex",
            }}
          >
            proba<span style={{ color: "#4f46e5" }}>stack</span>
          </div>
        </div>

        <div
          style={{
            marginTop: 38,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#16161d",
            maxWidth: 940,
            display: "flex",
          }}
        >
          Learn quantitative thinking through interactive stories.
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 32,
            color: "#6b6b76",
            display: "flex",
          }}
        >
          Data · Statistics · AI · Machine Learning
        </div>
      </div>
    ),
    size,
  );
}
