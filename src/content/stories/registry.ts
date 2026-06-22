import type { ComponentType } from "react";
import type { StoryMeta } from "@/lib/types";

import { meta as montyHall } from "./monty-hall/meta";
import MontyHallStory from "./monty-hall/Story";

/**
 * The story registry. Add one entry per story: its metadata plus the component
 * that renders it. Story components are server components that render
 * client-side interactive "islands" where needed.
 *
 * This is deliberately a hand-maintained list rather than filesystem magic —
 * it keeps imports explicit and type-checked, and it's trivial to reorder.
 */
export interface StoryEntry {
  meta: StoryMeta;
  Component: ComponentType;
}

export const stories: StoryEntry[] = [
  { meta: montyHall, Component: MontyHallStory },
];

export const publishedStories = (): StoryEntry[] =>
  stories.filter((s) => s.meta.status === "published");

export const storyBySlug = (slug: string): StoryEntry | undefined =>
  stories.find((s) => s.meta.slug === slug);

export const storiesByCategory = (categoryId: string): StoryEntry[] =>
  stories.filter((s) => s.meta.categoryId === categoryId);
