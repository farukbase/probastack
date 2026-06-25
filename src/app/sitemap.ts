import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { categories } from "@/content/taxonomy";
import { publishedStories } from "@/content/stories/registry";

/**
 * Generated sitemap. Home, every category, and every published story are
 * enumerated from the same data the site renders from, so new stories appear
 * automatically once registered. Served at /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const cats: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE.url}/categories/${c.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const stories: MetadataRoute.Sitemap = publishedStories().map((s) => ({
    url: `${SITE.url}/stories/${s.meta.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...home, ...cats, ...stories];
}
