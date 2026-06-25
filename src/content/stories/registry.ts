import type { ComponentType } from "react";
import type { StoryMeta } from "@/lib/types";

import { meta as montyHall } from "./monty-hall/meta";
import MontyHallStory from "./monty-hall/Story";
import { meta as birthdayParadox } from "./birthday-paradox/meta";
import BirthdayParadoxStory from "./birthday-paradox/Story";
import { meta as permutationTest } from "./permutation-test/meta";
import PermutationTestStory from "./permutation-test/Story";
import { meta as tokenization } from "./tokenization/meta";
import TokenizationStory from "./tokenization/Story";
import { meta as linearRegression } from "./linear-regression/meta";
import LinearRegressionStory from "./linear-regression/Story";
import { meta as simpsonsParadox } from "./simpsons-paradox/meta";
import SimpsonsParadoxStory from "./simpsons-paradox/Story";
import { meta as testThatCriedWolf } from "./the-test-that-cried-wolf/meta";
import TestThatCriedWolfStory from "./the-test-that-cried-wolf/Story";

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
  { meta: birthdayParadox, Component: BirthdayParadoxStory },
  { meta: permutationTest, Component: PermutationTestStory },
  { meta: tokenization, Component: TokenizationStory },
  { meta: linearRegression, Component: LinearRegressionStory },
  { meta: simpsonsParadox, Component: SimpsonsParadoxStory },
  { meta: testThatCriedWolf, Component: TestThatCriedWolfStory },
];

export const publishedStories = (): StoryEntry[] =>
  stories.filter((s) => s.meta.status === "published");

export const storyBySlug = (slug: string): StoryEntry | undefined =>
  stories.find((s) => s.meta.slug === slug);

export const storiesByCategory = (categoryId: string): StoryEntry[] =>
  stories.filter((s) => s.meta.categoryId === categoryId);
