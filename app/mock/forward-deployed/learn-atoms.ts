/**
 * FD Learn. the knowledge graph.
 *
 * R7: the reading order is a topological sort of this graph, not the structure itself.
 * Every edge points from a lower lesson to a higher one; validateLearnGraph() proves it.
 *
 * Twelve atoms are marked `spine`. They are the mechanisms from which everything else
 * in the course is derivable, and they are what the placement diagnostic targets.
 */

import type { AtomId, LearnLesson, LearnPath } from "./learn-types";

export type LearnAtom = {
  id: AtomId;
  name: string;
  prereqs: AtomId[];
  spine?: true;
};

export const LEARN_ATOMS: LearnAtom[] = [
  // ── M1 · The word and the machine ──────────────────────────────────────────
  { id: "A-ERAS", name: "The eras the word AI has named", prereqs: [] },
  { id: "A-OLDSTACK", name: "The pre-2022 models still running the business", prereqs: ["A-ERAS"] },
  { id: "A-FOURJOBS", name: "Predict, classify, generate, act", prereqs: ["A-ERAS"] },
  { id: "A-OPENCLOSED", name: "Closed output versus open output", prereqs: ["A-FOURJOBS"], spine: true },
  { id: "A-NEXTTOKEN", name: "Next-token prediction", prereqs: ["A-OPENCLOSED"], spine: true },
  { id: "A-TOKENS", name: "Tokens are the unit of everything", prereqs: ["A-OPENCLOSED"] },
  { id: "A-ATTENTION", name: "Attention weights every token against every other", prereqs: ["A-NEXTTOKEN"], spine: true },
  { id: "A-LONGCTX", name: "Length costs more than proportionally", prereqs: ["A-ATTENTION"] },
  { id: "A-VARIANCE", name: "Sampling makes identical inputs diverge", prereqs: ["A-NEXTTOKEN"], spine: true },
  { id: "A-TEMPERATURE", name: "Temperature is a spread, not a care setting", prereqs: ["A-VARIANCE"] },

  // ── M2 · Why it is wrong when it is wrong ──────────────────────────────────
  { id: "A-HALLUCINATION", name: "Hallucination is completion with a missing fact", prereqs: ["A-NEXTTOKEN", "A-VARIANCE"] },
  { id: "A-CALIBRATION", name: "Fluency is not a probability", prereqs: ["A-HALLUCINATION"] },
  { id: "A-JAGGED", name: "Capability is jagged, not a level", prereqs: ["A-HALLUCINATION"], spine: true },
  { id: "A-OWNTEST", name: "Test on your own work or you know nothing", prereqs: ["A-JAGGED"] },
  { id: "A-WINDOW", name: "The context window is the whole world of a call", prereqs: ["A-NEXTTOKEN"], spine: true },
  { id: "A-STATELESS", name: "Nothing carries between calls by itself", prereqs: ["A-WINDOW"] },
  { id: "A-STUFFING", name: "Relevance competes; a dump lowers the odds", prereqs: ["A-WINDOW", "A-LONGCTX"] },
  { id: "A-MIDDLE", name: "The middle of a long window is attended worst", prereqs: ["A-STUFFING"] },
  { id: "A-COMPACTION", name: "Summaries drop identifiers, amounts, and dates", prereqs: ["A-WINDOW"] },
  { id: "A-CACHE", name: "Prompt caching is economics, not memory", prereqs: ["A-WINDOW"] },
  { id: "A-GROUNDING", name: "Three doors: fetch, search, dump", prereqs: ["A-WINDOW", "A-STUFFING"], spine: true },
  { id: "A-FETCHVSSEARCH", name: "Known ID means fetch, not search", prereqs: ["A-GROUNDING"] },
  { id: "A-SOR", name: "The system of record is the winner when sources conflict", prereqs: ["A-GROUNDING"] },

  // ── M3 · How capability is made and bought ─────────────────────────────────
  { id: "A-PRETRAIN", name: "Pretraining is the wall you buy", prereqs: ["A-NEXTTOKEN"] },
  { id: "A-TRAINVSINFER", name: "Capability is baked once and spent every call", prereqs: ["A-PRETRAIN"], spine: true },
  { id: "A-POSTTRAIN", name: "Post-training is steering, not new physics", prereqs: ["A-PRETRAIN"] },
  { id: "A-CUSTOMMODEL", name: "Four things are sold as a custom model", prereqs: ["A-POSTTRAIN"] },
  { id: "A-ADAPTER", name: "An adapter is a layer on someone else's weights", prereqs: ["A-CUSTOMMODEL"] },
  { id: "A-FINETUNE-VS-CTX", name: "Facts go in context, form goes in weights", prereqs: ["A-CUSTOMMODEL", "A-GROUNDING"] },
  { id: "A-INFERSPEND", name: "Inference is a bill with several lines", prereqs: ["A-TRAINVSINFER"] },
  { id: "A-THINKING", name: "Reasoning budget is a per-job dial", prereqs: ["A-INFERSPEND"] },
  { id: "A-BATCHVSINTERACTIVE", name: "Batch and interactive are different products", prereqs: ["A-INFERSPEND"] },
  { id: "A-QUANT", name: "Quantization trades precision for size and speed", prereqs: ["A-INFERSPEND"] },
  { id: "A-DISTILL", name: "A student model imitates a teacher on a narrow job", prereqs: ["A-INFERSPEND"] },
  { id: "A-CASCADE", name: "Cheap first, expensive only when earned", prereqs: ["A-INFERSPEND"] },
  { id: "A-WEIGHTS", name: "The weights are the artifact", prereqs: ["A-PRETRAIN"] },
  { id: "A-OPENWEIGHTS", name: "Open weights is a license claim, not a source claim", prereqs: ["A-WEIGHTS"] },
  { id: "A-RESIDENCY", name: "Where it runs decides who is answerable", prereqs: ["A-OPENWEIGHTS"] },

  // ── M4 · From text to action ───────────────────────────────────────────────
  { id: "A-TOOLCALL", name: "Text can name an action", prereqs: ["A-NEXTTOKEN", "A-OPENCLOSED"], spine: true },
  { id: "A-PROPOSE-EXECUTE", name: "The model proposes; software executes", prereqs: ["A-TOOLCALL"] },
  { id: "A-CONTRACT", name: "A tool is a name, typed arguments, a permission, a result", prereqs: ["A-TOOLCALL"] },
  { id: "A-MCP", name: "MCP is a plug, not a permission model", prereqs: ["A-CONTRACT"] },
  { id: "A-IDEMPOTENT", name: "A write that can run twice safely", prereqs: ["A-CONTRACT"] },
  { id: "A-LOOP", name: "An agent is a model, tools, and a stop condition", prereqs: ["A-TOOLCALL", "A-CONTRACT"], spine: true },
  { id: "A-STOP", name: "The stop condition is part of the design", prereqs: ["A-LOOP"] },
  { id: "A-COMPOUNDING", name: "Step accuracy multiplies", prereqs: ["A-LOOP", "A-VARIANCE"] },
  { id: "A-CAPS", name: "Steps, wall-clock, spend, retries are capped", prereqs: ["A-COMPOUNDING"] },
  { id: "A-PARK", name: "Park on unknown instead of guessing", prereqs: ["A-COMPOUNDING"] },
  { id: "A-SIXSHAPES", name: "Six things get called automation", prereqs: ["A-LOOP", "A-FOURJOBS"] },
  { id: "A-QUEUEOWNER", name: "Only some shapes can own volume", prereqs: ["A-SIXSHAPES"] },
  { id: "A-WORKFLOW-VS-AGENT", name: "Known path means a designed path", prereqs: ["A-SIXSHAPES", "A-COMPOUNDING"] },
  { id: "A-MULTIAGENT", name: "A second agent is a permission boundary or nothing", prereqs: ["A-LOOP", "A-PROPOSE-EXECUTE"] },
  { id: "A-CHECKER", name: "The checker must not hold the send", prereqs: ["A-MULTIAGENT"] },
  { id: "A-COMPUTERUSE", name: "Screenshot or DOM in, action out", prereqs: ["A-LOOP", "A-JAGGED"] },
  { id: "A-RESIDUAL-CLICKS", name: "Clicking is residual and carries a retirement date", prereqs: ["A-COMPUTERUSE"] },

  // ── M5 · The harness is the product ────────────────────────────────────────
  { id: "A-HARNESS", name: "Reliability lives in the environment, not the model", prereqs: ["A-JAGGED", "A-LOOP"], spine: true },
  { id: "A-FIVESUBSYSTEMS", name: "Instructions, state, verification, scope, lifecycle", prereqs: ["A-HARNESS"] },
  { id: "A-INSTRUCTIONS", name: "Instructions compete with data for attention", prereqs: ["A-FIVESUBSYSTEMS", "A-STUFFING"] },
  { id: "A-PROGRESSIVE", name: "A small core plus disclosure at the moment of need", prereqs: ["A-INSTRUCTIONS"] },
  { id: "A-MEMORY3", name: "Window, retrieval, system of record", prereqs: ["A-FIVESUBSYSTEMS", "A-GROUNDING", "A-SOR"] },
  { id: "A-WRITETHROUGH", name: "A memory that never writes through is a shadow ledger", prereqs: ["A-MEMORY3"] },
  { id: "A-VERIFY", name: "Verification is a check that can fail", prereqs: ["A-FIVESUBSYSTEMS", "A-CALIBRATION"] },
  { id: "A-EVIDENCE-OF-DONE", name: "Done is evidence, not a claim", prereqs: ["A-VERIFY"] },
  { id: "A-SCOPE", name: "Scope is a machine-readable boundary", prereqs: ["A-FIVESUBSYSTEMS", "A-CAPS"] },
  { id: "A-OVERREACH", name: "Overreach and undercompletion are one missing boundary", prereqs: ["A-SCOPE"] },
  { id: "A-TRACE", name: "A trace is a log, with the same duties as any log", prereqs: ["A-FIVESUBSYSTEMS", "A-VERIFY"] },
  { id: "A-REPLAY", name: "Replay from bytes or it is not a trace", prereqs: ["A-TRACE"] },

  // ── M6 · Control: permission, not trust ────────────────────────────────────
  { id: "A-GUARDRAIL", name: "A guardrail is software that can refuse", prereqs: ["A-VERIFY", "A-CONTRACT"] },
  { id: "A-HITL", name: "A human in the loop is a person on typed actions", prereqs: ["A-GUARDRAIL"] },
  { id: "A-AUTONOMYDIAL", name: "Autonomy is a dial per action type", prereqs: ["A-GUARDRAIL", "A-HITL", "A-JAGGED"] },
  { id: "A-ACTIONTYPES", name: "Read, draft, internal write, external write, irreversible", prereqs: ["A-AUTONOMYDIAL"] },
  { id: "A-INJECTION", name: "Text an agent reads is a candidate instruction", prereqs: ["A-TOOLCALL", "A-WINDOW"] },
  { id: "A-DATA-NOT-INSTRUCTIONS", name: "Inbound content is data, never commands", prereqs: ["A-INJECTION"] },
  { id: "A-IDENTITY", name: "The agent gets its own login", prereqs: ["A-INJECTION", "A-PROPOSE-EXECUTE"] },
  { id: "A-LEASTPRIVILEGE", name: "Least privilege is the mitigation that scales", prereqs: ["A-IDENTITY"], spine: true },
  { id: "A-CONFUSEDDEPUTY", name: "Borrowed authority is the whole attack", prereqs: ["A-LEASTPRIVILEGE"] },
  { id: "A-GATEWAY", name: "One front door: keys, routing, budgets, logs", prereqs: ["A-IDENTITY", "A-LEASTPRIVILEGE"] },
  { id: "A-SANDBOX", name: "A sandbox is a boundary on reach", prereqs: ["A-GATEWAY"] },
  { id: "A-BLASTRADIUS", name: "Everything reachable from one bad input", prereqs: ["A-SANDBOX"] },
  { id: "A-EGRESS", name: "Packets are exports; traces are copies", prereqs: ["A-GATEWAY", "A-SANDBOX"] },
  { id: "A-DATAPATHS", name: "Four contracts for four places the data can go", prereqs: ["A-EGRESS"] },
  { id: "A-LIABILITY", name: "If the harness allowed the write, the company acted", prereqs: ["A-EGRESS"] },

  // ── M7 · Evidence ──────────────────────────────────────────────────────────
  { id: "A-DEMO", name: "A demo is a designed object", prereqs: ["A-VARIANCE", "A-JAGGED"] },
  { id: "A-SELECTION", name: "The case was chosen, and that is the finding", prereqs: ["A-DEMO"] },
  { id: "A-FROZENSET", name: "A frozen set and a scoring rule you rerun", prereqs: ["A-OWNTEST", "A-DEMO"], spine: true },
  { id: "A-SCORING", name: "A scoring rule is a decision, written down", prereqs: ["A-FROZENSET"] },
  { id: "A-RERUN", name: "The number only means something the second time", prereqs: ["A-FROZENSET"] },
  { id: "A-SETDESIGN", name: "The set is a sample of the work, not the easy work", prereqs: ["A-FROZENSET", "A-INJECTION"] },
  { id: "A-TAIL", name: "The ugly tail is over-weighted on purpose", prereqs: ["A-SETDESIGN"] },
  { id: "A-NEARMISS", name: "Near-misses separate good from lucky", prereqs: ["A-SETDESIGN"] },
  { id: "A-SCORINGKINDS", name: "Key, validator, rubric, judge", prereqs: ["A-SCORING"] },
  { id: "A-JUDGE", name: "A model judge is a tool, not a truth", prereqs: ["A-SCORINGKINDS"] },
  { id: "A-AGREEMENT", name: "Check the judge against humans before trusting it", prereqs: ["A-JUDGE"] },
  { id: "A-CONTAMINATION", name: "The test may have been in the training data", prereqs: ["A-FROZENSET", "A-SETDESIGN"] },
  { id: "A-ERRORBARS", name: "The range the number moves in on a rerun", prereqs: ["A-VARIANCE", "A-FROZENSET"] },
  { id: "A-PINNING", name: "Pin the version; a swap is a measured event", prereqs: ["A-CONTAMINATION"] },
  { id: "A-SAMPLING", name: "Sample the auto path forever", prereqs: ["A-RERUN", "A-AUTONOMYDIAL"] },
  { id: "A-DRIFT", name: "Drift is the default, not the incident", prereqs: ["A-SAMPLING"] },
  { id: "A-AUTONOMYGRADE", name: "Promoted and demoted on measured evidence", prereqs: ["A-DRIFT", "A-ACTIONTYPES"] },

  // ── M8 · Money, and the operating decision ─────────────────────────────────
  { id: "A-UNITCOST", name: "Cost per completed unit of work", prereqs: ["A-INFERSPEND", "A-AUTONOMYDIAL", "A-COMPOUNDING"], spine: true },
  { id: "A-RESIDUAL", name: "The human minutes that remain are usually the bill", prereqs: ["A-UNITCOST"] },
  { id: "A-BASELINE", name: "The baseline is loaded cost, and it has to be real", prereqs: ["A-UNITCOST"] },
  { id: "A-CANDIDATE", name: "Volume, language, tail, verifiability", prereqs: ["A-UNITCOST", "A-OPENCLOSED", "A-FOURJOBS"] },
  { id: "A-VERIFYCOST", name: "Cheap-to-check work automates first", prereqs: ["A-CANDIDATE"] },
  { id: "A-MINSTACK", name: "Queue, playbook, record, gate, set, scoreboard", prereqs: ["A-FIVESUBSYSTEMS", "A-FROZENSET", "A-AUTONOMYDIAL"] },
  { id: "A-STAGING", name: "Packet, then draft, then one allowlisted write", prereqs: ["A-MINSTACK"] },
  { id: "A-BUILDBUY", name: "You are buying a harness, not intelligence", prereqs: ["A-HARNESS", "A-CUSTOMMODEL", "A-UNITCOST"] },
  { id: "A-REBUILDCOST", name: "What a competent team would spend to rebuild it", prereqs: ["A-BUILDBUY"] },
  { id: "A-MOAT", name: "The moat is the foreclosed component", prereqs: ["A-REBUILDCOST"] },
  { id: "A-ARTIFACTDEMAND", name: "Every claim resolves to an artifact", prereqs: ["A-TRACE", "A-FROZENSET", "A-FIVESUBSYSTEMS", "A-AUTONOMYDIAL"] },
  { id: "A-CLAIMCLASS", name: "Measured, modeled, declared, unknown", prereqs: ["A-ARTIFACTDEMAND"] },
  { id: "A-ROLESHIFT", name: "Queue owner, harness maintainer, evaluator", prereqs: ["A-AUTONOMYDIAL", "A-RESIDUAL"] },
  { id: "A-REVIEWLOAD", name: "Review grows before it shrinks", prereqs: ["A-ROLESHIFT"] },
  { id: "A-100DAY", name: "One queue, one gate, one set, one owner", prereqs: ["A-MINSTACK", "A-STAGING", "A-ROLESHIFT"] },
  { id: "A-FAILUREPATTERNS", name: "The five ways this reliably fails", prereqs: ["A-100DAY"] },
];

export const ATOM_BY_ID = new Map(LEARN_ATOMS.map((a) => [a.id, a]));

export const SPINE_ATOMS = LEARN_ATOMS.filter((a) => a.spine);

/**
 * Reader-facing paths. Each is prerequisite-closed: every atom required by a lesson
 * in the path is introduced by an earlier lesson in the same path. validateLearnGraph()
 * fails the build if that stops being true.
 */
export const LEARN_PATHS: LearnPath[] = [
  {
    id: "partner",
    label: "Partner path",
    blurb:
      "Fifteen lessons. Enough mechanism to tell what kind of system you are looking at, test capability yourself, know who owns the queue, and know what an eval is. Finish with the vendor-call clinic.",
    lessons: [
      "eras-of-ai",
      "four-jobs",
      "closed-or-open",
      "next-token",
      "why-it-differs",
      "hallucination",
      "jagged-capability",
      "the-window",
      "text-that-acts",
      "what-is-a-tool",
      "the-loop",
      "six-shapes",
      "same-model-different-outcome",
      "what-a-demo-proves",
      "what-is-an-eval",
    ],
  },
  {
    id: "diligence",
    label: "Diligence path",
    blurb:
      "Thirty-two lessons. The partner path plus everything needed to read a published number, price the unit, judge the moat, and demand the artifact. Finish with the vendor-call and diligence-memo clinics.",
    lessons: [
      "eras-of-ai",
      "four-jobs",
      "closed-or-open",
      "next-token",
      "why-it-differs",
      "hallucination",
      "confidence",
      "jagged-capability",
      "the-window",
      "pretraining",
      "post-training",
      "custom-model",
      "inference-bill",
      "text-that-acts",
      "what-is-a-tool",
      "the-loop",
      "long-runs",
      "six-shapes",
      "same-model-different-outcome",
      "five-subsystems",
      "verification",
      "traces",
      "guardrails",
      "autonomy-dial",
      "injection",
      "what-a-demo-proves",
      "what-is-an-eval",
      "the-set",
      "reading-a-number",
      "unit-cost",
      "build-buy-wrap",
      "diligencing-a-claim",
    ],
  },
  {
    id: "operator",
    label: "Operator path",
    blurb:
      "Everything, in order. The only path that reaches the hundred-day plan.",
    lessons: [],
  },
];

export type GraphProblem = { rule: string; detail: string };

/**
 * Build-time validation. Nine rules from the skeleton, §13.
 * Called by the dev-only self-check in learn-modules.ts and by scripts/check-learn.mjs.
 */
export function validateLearnGraph(lessons: LearnLesson[]): GraphProblem[] {
  const problems: GraphProblem[] = [];
  const introducedAt = new Map<AtomId, number>();

  // 1. every declared atom exists, and is introduced exactly once
  for (const lesson of lessons) {
    for (const atom of lesson.atoms) {
      if (!ATOM_BY_ID.has(atom)) {
        problems.push({ rule: "atom-exists", detail: `${lesson.slug} introduces unknown atom ${atom}` });
        continue;
      }
      if (introducedAt.has(atom)) {
        problems.push({ rule: "introduced-once", detail: `${atom} introduced twice (${lesson.slug})` });
        continue;
      }
      introducedAt.set(atom, lesson.order);
    }
  }

  // 2. no orphan atoms
  for (const atom of LEARN_ATOMS) {
    if (!introducedAt.has(atom.id)) {
      problems.push({ rule: "no-orphans", detail: `${atom.id} is never introduced by a lesson` });
    }
  }

  // 3. the atom graph is acyclic
  const state = new Map<AtomId, 0 | 1 | 2>();
  const walk = (id: AtomId, trail: AtomId[]): void => {
    if (state.get(id) === 2) return;
    if (state.get(id) === 1) {
      problems.push({ rule: "acyclic", detail: `cycle: ${[...trail, id].join(" → ")}` });
      return;
    }
    state.set(id, 1);
    for (const p of ATOM_BY_ID.get(id)?.prereqs ?? []) walk(p, [...trail, id]);
    state.set(id, 2);
  };
  for (const atom of LEARN_ATOMS) walk(atom.id, []);

  // 4. an atom's prerequisites are introduced no later than the atom itself
  //    (same-lesson chains are legitimate: order inside a lesson is authorial)
  for (const atom of LEARN_ATOMS) {
    const here = introducedAt.get(atom.id);
    if (here === undefined) continue;
    for (const p of atom.prereqs) {
      const there = introducedAt.get(p);
      if (there === undefined) continue;
      if (there > here) {
        problems.push({
          rule: "prereq-precedes",
          detail: `${atom.id} (lesson ${here}) needs ${p} (lesson ${there})`,
        });
      }
    }
  }

  // 5. a lesson's declared prereqs are introduced strictly earlier
  for (const lesson of lessons) {
    for (const p of lesson.prereqs) {
      const there = introducedAt.get(p);
      if (there === undefined) {
        problems.push({ rule: "lesson-prereq-exists", detail: `${lesson.slug} needs unknown atom ${p}` });
      } else if (there >= lesson.order) {
        problems.push({ rule: "lesson-prereq-precedes", detail: `${lesson.slug} needs ${p}, introduced at ${there}` });
      }
    }
  }

  // 6. fan-out budget
  for (const lesson of lessons) {
    if (lesson.atoms.length > 3) {
      problems.push({ rule: "fan-out", detail: `${lesson.slug} introduces ${lesson.atoms.length} atoms` });
    }
  }

  // 7. every check has exactly one correct option and at least one diagnostic distractor
  for (const lesson of lessons) {
    for (const check of lesson.checks) {
      const correct = check.options.filter((o) => o.correct).length;
      if (correct !== 1) {
        problems.push({ rule: "one-correct", detail: `${lesson.slug}: "${check.q.slice(0, 40)}" has ${correct} correct` });
      }
      if (!check.options.some((o) => !o.correct && o.impliesMissing)) {
        problems.push({ rule: "diagnostic-distractor", detail: `${lesson.slug}: "${check.q.slice(0, 40)}" has no impliesMissing` });
      }
      for (const o of check.options) {
        if (o.impliesMissing && !ATOM_BY_ID.has(o.impliesMissing)) {
          problems.push({ rule: "distractor-atom", detail: `${lesson.slug}: unknown atom ${o.impliesMissing}` });
        }
      }
    }
  }

  // 8. every derived path is prerequisite-closed
  const bySlug = new Map(lessons.map((l) => [l.slug, l]));
  for (const path of LEARN_PATHS) {
    if (path.lessons.length === 0) continue;
    const held = new Set<AtomId>();
    for (const slug of path.lessons) {
      const lesson = bySlug.get(slug);
      if (!lesson) {
        problems.push({ rule: "path-slug", detail: `${path.id} names unknown lesson ${slug}` });
        continue;
      }
      for (const p of lesson.prereqs) {
        if (!held.has(p)) {
          problems.push({ rule: "path-closed", detail: `${path.id}: ${slug} needs ${p}, not held` });
        }
      }
      for (const a of lesson.atoms) held.add(a);
    }
  }

  // 9. Prose lints. The negation budget and the model-name rule are R12/R13; the rest
  //    are tics this course has been caught using, kept here so they stay dead.
  const MODEL_NAMES = /\b(GPT-\d|Claude [A-Z]|Gemini|Llama|Mistral|Qwen|DeepSeek|o[34]-(mini|preview))\b/;
  const BANNED = /\bgenuinely\b/i;
  for (const lesson of lessons) {
    // Two corpora. `prose` is everything a reader sees, used for word-level budgets.
    // `flowing` is continuous prose only, used for the rhythm budgets. a colon inside
    // a checklist item is a checklist, while a colon opening a paragraph is a label
    // masquerading as a sentence, which is the habit these lints exist to kill.
    const flowingParts = [
      lesson.lede,
      lesson.thesis,
      lesson.soWhat,
      lesson.misconception?.why ?? "",
      lesson.situation.reveal,
      ...lesson.sections.flatMap((s) => [...s.paragraphs, s.example?.body ?? ""]),
    ];
    const prose = [
      ...flowingParts,
      lesson.blurb,
      lesson.misconception?.says ?? "",
      lesson.situation.artifact,
      lesson.situation.prompt,
      lesson.instrument.body,
      ...lesson.instrument.items,
      ...lesson.sections.flatMap((s) => [
        ...(s.list ?? []),
        ...(s.table?.rows ?? []).map((r) => r.body),
        ...(s.split ?? []).map((c) => c.body),
      ]),
    ].join(" ");
    const flowing = flowingParts.join(" ");

    const negations = prose.match(/\b(is not|are not|not a|not the)\b/g)?.length ?? 0;
    if (negations > 5) {
      problems.push({ rule: "negation-budget", detail: `${lesson.slug}: ${negations} negation-definitions (cap 5)` });
    }
    const model = prose.match(MODEL_NAMES);
    if (model) {
      problems.push({ rule: "no-model-names", detail: `${lesson.slug}: names "${model[0]}" in prose` });
    }
    const banned = prose.match(BANNED);
    if (banned) {
      problems.push({ rule: "banned-word", detail: `${lesson.slug}: uses "${banned[0]}"` });
    }
    const ratherThan = prose.match(/\brather than\b/g)?.length ?? 0;
    if (ratherThan > 1) {
      problems.push({ rule: "rather-than-budget", detail: `${lesson.slug}: "rather than" ×${ratherThan} (cap 1)` });
    }
    const dashes = flowing.match(/, /g)?.length ?? 0;
    if (dashes > 3) {
      problems.push({ rule: "em-dash-budget", detail: `${lesson.slug}: ${dashes} em-dashes (cap 3)` });
    }
    const colonStems = flowing.match(/(?:^|[.!?] )[A-Z][a-z]+(?: \w+){0,3}: [a-z]/g)?.length ?? 0;
    if (colonStems > 2) {
      problems.push({ rule: "colon-stem-budget", detail: `${lesson.slug}: ${colonStems} label-colon stems (cap 2)` });
    }
  }

  return problems;
}

/** Lessons whose prerequisites are all held. The ALEKS outer fringe. */
export function readyToLearn(lessons: LearnLesson[], mastered: Set<string>): LearnLesson[] {
  const held = new Set<AtomId>();
  for (const lesson of lessons) {
    if (mastered.has(lesson.slug)) for (const a of lesson.atoms) held.add(a);
  }
  return lessons.filter(
    (l) => !mastered.has(l.slug) && l.prereqs.every((p) => held.has(p)),
  );
}
