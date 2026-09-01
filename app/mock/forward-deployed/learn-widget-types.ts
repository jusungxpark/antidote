/**
 * Widget data shapes.
 *
 * R11: every widget runs client-side on recorded data. No keys, no network,
 * deterministic. which is what makes the graded checks possible at all.
 * Each dataset carries a `note` line stating what it is and when it was captured,
 * because a course that teaches provenance has to show its own (R12).
 */

export type TokenStep = {
  prefix: string;
  options: { token: string; p: number }[];
};

export type TokenDataset = {
  question: string;
  grounded: { label: string; steps: TokenStep[] };
  ungrounded?: { label: string; steps: TokenStep[] };
  runs?: { answer: string; ok: boolean; stated?: string }[];
  styles?: { label: string; body: string }[];
  note: string;
};

export type ContextBlock = {
  id: string;
  label: string;
  kind: "system" | "tools" | "packet" | "history" | "doc" | "memory" | "record";
  tokens: number;
  body: string;
  required?: boolean;
  whenMissing?: string;
};

export type ContextDataset = {
  question: string;
  answer: string;
  blocks: ContextBlock[];
  depths?: { label: string; found: boolean; answer: string }[];
  doors?: { label: string; how: string; answer: string; ok: boolean; cost: string }[];
  compaction?: { before: string; after: string; lost: string[]; pinned?: string };
  memories?: { label: string; holds: string; survives: string; audit: boolean }[];
  layers?: { label: string; tokens: number; followed: string; note: string }[];
  note: string;
};

export type TraceStep = {
  actor: "model" | "tool" | "gate" | "human" | "check";
  label: string;
  body: string;
  tokens?: number;
  cost?: number;
  subsystem?: string;
  ok?: boolean;
  flag?: string;
};

export type TraceVariant = {
  label: string;
  blurb?: string;
  outcome: string;
  ok: boolean;
  steps: TraceStep[];
};

export type TraceDataset = {
  goal: string;
  variants: TraceVariant[];
  ablations?: { subsystem: string; removed: string; failure: string }[];
  stages?: { label: string; what: string; auto: number; reviewMin: number; exposure: string; exit: string }[];
  compounding?: { steps: number; label: string };
  note: string;
};

export type PermissionTool = {
  name: string;
  args: string;
  scope: string;
  effect: "read" | "draft" | "internal" | "external" | "irreversible";
  on: boolean;
  risk: string;
};

export type PermissionOutcome = {
  requires: string[];
  forbidden?: string[];
  verdict: "safe" | "blocked" | "damage";
  result: string;
};

export type PermissionDataset = {
  intro: string;
  scenario: string;
  tools: PermissionTool[];
  outcomes: PermissionOutcome[];
  fallback: string;
  grid?: {
    action: string;
    effect: string;
    levels: { label: string; auto: number; reviewMin: number; exposure: string }[];
  }[];
  note: string;
};

export type EvalCase = {
  id: string;
  label: string;
  kind: "volume" | "tail" | "nearmiss" | "injection";
  gold: string;
  results: Record<string, { answer: string; exact: boolean; loose: boolean }>;
};

export type EvalDataset = {
  task: string;
  systems: { id: string; label: string; note: string }[];
  rules: { id: string; label: string; blurb: string; strict: boolean }[];
  cases: EvalCase[];
  timeline?: { month: string; accuracy: number; version: string; event?: string }[];
  note: string;
};

export type EconInput = {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
};

export type EconDataset = {
  mode: "call" | "unit" | "cascade" | "rebuild" | "staffing";
  intro: string;
  inputs: EconInput[];
  components?: {
    name: string;
    months: [number, number];
    cost: [number, number];
    foreclosed?: boolean;
    why: string;
  }[];
  note: string;
};

export type ClaimDataset = {
  intro: string;
  classes: { id: string; label: string; blurb: string }[];
  claims: {
    text: string;
    source: string;
    answer: string;
    artifact: string;
    missing: string[];
  }[];
  note: string;
};

export type SorterDataset = {
  prompt: string;
  categories: { id: string; label: string; blurb: string }[];
  cards: { text: string; answer: string; why: string }[];
  note: string;
};
