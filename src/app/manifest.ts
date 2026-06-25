import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Web app manifest — lets the site be installed / pinned and gives Android
 * Chrome a themed icon. Served at /manifest.webmanifest.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbf9",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
