import { M0_LESSONS } from "./learn-m0";
import { M1_LESSONS } from "./learn-m1";
import { M2_LESSONS } from "./learn-m2";
import { M3_LESSONS } from "./learn-m3";
import { M4_LESSONS } from "./learn-m4";
import { M5_LESSONS } from "./learn-m5";
import { M6_LESSONS } from "./learn-m6";
import { M7_LESSONS } from "./learn-m7";
import { M8_LESSONS } from "./learn-m8";
import { M9_LESSONS } from "./learn-m9";
import { LEARN_MODULE_META } from "./learn-structure";
import type { LearnLesson, LearnModuleId } from "./learn-types";

const RAW: LearnLesson[] = [
  ...M0_LESSONS.filter((l) => l.slug !== "placement"),
  ...M1_LESSONS,
  ...M2_LESSONS,
  ...M3_LESSONS,
  ...M4_LESSONS,
  ...M5_LESSONS,
  ...M6_LESSONS,
  ...M7_LESSONS,
  ...M8_LESSONS,
  ...M9_LESSONS,
];

export const LEARN_LESSONS: LearnLesson[] = RAW.map((lesson, i, all) => ({
  ...lesson,
  order: i + 1,
  next: all[i + 1]?.slug ?? null,
}));

export const LEARN_MODULES_NAV = LEARN_MODULE_META.filter((mod) =>
  LEARN_LESSONS.some((l) => l.module === mod.id),
);

export const FIRST_LEARN_SLUG = LEARN_LESSONS[0]?.slug ?? "eras-of-ai";

const LEARN_ALIASES: Record<string, string> = {
  placement: "eras-of-ai",
  "history-and-context": "eras-of-ai",
  "the-four-jobs": "four-jobs",
  "what-people-mean-by-ai": "four-jobs",
  "gen-ai-vs-classical": "closed-or-open",
  "why-fluent-is-wrong": "hallucination",
  "fluent-is-not-true": "hallucination",
  "jagged-frontier": "jagged-capability",
  "the-working-set": "the-window",
  "context-windows": "the-window",
  "context-and-memory": "the-window",
  grounding: "grounding",
  "how-models-get-good": "pretraining",
  inference: "inference-bill",
  "open-and-closed": "where-weights-run",
  "propose-and-execute": "text-that-acts",
  "tool-calling": "what-is-a-tool",
  "tools-apis-mcp": "what-is-a-tool",
  agents: "the-loop",
  "the-harness": "five-subsystems",
  permission: "guardrails",
  "hitl-and-guardrails": "autonomy-dial",
  "how-you-know": "what-is-an-eval",
  evals: "what-is-an-eval",
  "cost-and-unit-economics": "unit-cost",
  staging: "minimum-stack",
};

export function getLearnLessonBySlug(slug: string): LearnLesson | undefined {
  const resolved = LEARN_ALIASES[slug] ?? slug;
  return LEARN_LESSONS.find((l) => l.slug === resolved);
}

export function lessonsInModule(id: LearnModuleId): LearnLesson[] {
  return LEARN_LESSONS.filter((l) => l.module === id);
}
