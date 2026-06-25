import type { ComponentType } from "react";
import type { ToolMeta } from "@/lib/types";

import { meta as abTestMeta } from "./ab-test-significance/meta";
import AbTestSignificanceTool from "./ab-test-significance/Tool";

/**
 * The tools registry — a hand-maintained list mirroring the story registry.
 * Live tools carry a `Component`; "coming-soon" entries are roadmap cards with
 * metadata only. Everything downstream (the /tools index, routing) reads here.
 */
export interface ToolEntry {
  meta: ToolMeta;
  Component?: ComponentType;
}

/** Roadmap entries — listed on /tools as "coming soon", no page yet. */
const comingSoon: ToolMeta[] = [
  {
    slug: "bayes-base-rate",
    title: "Bayes / Base-Rate Calculator",
    tagline:
      "How rare it is + how accurate the test is → your real odds after a positive.",
    description: "",
    categoryId: "statistics",
    icon: "🧮",
    status: "coming-soon",
  },
  {
    slug: "token-counter",
    title: "Token Counter & Cost Estimator",
    tagline: "Paste text → token estimate and what it costs across models.",
    description: "",
    categoryId: "ai-llms",
    icon: "🔤",
    status: "coming-soon",
  },
  {
    slug: "descriptive-stats",
    title: "Descriptive Statistics",
    tagline: "Paste numbers → mean, median, spread, and a quick histogram.",
    description: "",
    categoryId: "statistics",
    icon: "📊",
    status: "coming-soon",
  },
  {
    slug: "sample-size",
    title: "Sample Size Calculator",
    tagline: "Baseline, effect, and power → how many users your test needs.",
    description: "",
    categoryId: "experimentation",
    icon: "👥",
    status: "coming-soon",
  },
  {
    slug: "normal-z-score",
    title: "Normal Distribution & Z-Score",
    tagline: "Mean, SD, and a value → the shaded area and probability.",
    description: "",
    categoryId: "statistics",
    icon: "🔔",
    status: "coming-soon",
  },
];

export const tools: ToolEntry[] = [
  { meta: abTestMeta, Component: AbTestSignificanceTool },
  ...comingSoon.map((meta) => ({ meta })),
];

export const liveTools = (): ToolEntry[] =>
  tools.filter((t) => t.meta.status === "live");

export const toolBySlug = (slug: string): ToolEntry | undefined =>
  tools.find((t) => t.meta.slug === slug);
