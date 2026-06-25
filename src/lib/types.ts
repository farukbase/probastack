/**
 * Core content types for Probastack.
 *
 * The taxonomy (categories → subjects) and the story registry are both pure
 * data, so the whole structure can be reshuffled without touching routing or
 * components. Renaming a category or moving a story = editing data, not code.
 */

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type StoryStatus = "draft" | "published";

/** A subject groups related stories within a category (e.g. "Probability"). */
export interface Subject {
  id: string;
  title: string;
  blurb?: string;
}

/** A top-level area of the site (e.g. "Statistics"). */
export interface Category {
  id: string;
  title: string;
  blurb: string;
  /** Accent hex used to theme the category's cards and headers. */
  accent: string;
  subjects: Subject[];
}

/**
 * Public-facing + internal metadata for a single interactive story.
 * Stories are "what users browse"; `concepts` is the internal index of ideas a
 * story actually teaches (the seed of a future knowledge graph).
 */
export interface StoryMeta {
  slug: string;
  title: string;
  /** Curiosity-driven one-liner shown on cards. */
  hook: string;
  /** Longer description for the story header + listing. */
  summary: string;
  categoryId: string;
  subjectId?: string;
  concepts: string[];
  difficulty: Difficulty;
  estimatedMinutes: number;
  tags: string[];
  status: StoryStatus;
  /** Slugs of related stories shown at the end. */
  related?: string[];
}

export type ToolStatus = "live" | "coming-soon";

/**
 * A small, self-contained interactive utility (calculator, visualizer, …).
 * Tools share the taxonomy's categories for theming, but are otherwise their
 * own data-driven list, mirroring the story registry.
 */
export interface ToolMeta {
  slug: string;
  title: string;
  /** One-liner for cards. */
  tagline: string;
  /** Longer description for the tool page header. */
  description: string;
  /** Reuses a taxonomy category id for the accent + grouping. */
  categoryId: string;
  /** Emoji shown on the card. */
  icon: string;
  status: ToolStatus;
}
