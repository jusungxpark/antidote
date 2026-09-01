import type { LearnModuleMeta } from "./learn-types";

/**
 * The ten modules. Order here is the reading order; every lesson's prerequisites
 * are introduced in an earlier module or earlier in the same one.
 */
export const LEARN_MODULE_META: LearnModuleMeta[] = [
  {
    id: "M0",
    label: "Start here",
    title: "Orientation",
    blurb: "How the course works: a call before each explanation, and an instrument you keep.",
    purpose:
      "Sets the contract: you commit to a judgment before each mechanism is explained, and a lesson is passed rather than read.",
  },
  {
    id: "M1",
    label: "I. The word and the machine",
    title: "The word and the machine",
    blurb:
      "Where the word came from, the four jobs it now covers, the cut between closed and open output, and the one trick underneath the generative kind.",
    purpose:
      "You stop using AI as one word, and you acquire the primitive everything else is derived from.",
  },
  {
    id: "M2",
    label: "II. Why it is wrong when it is wrong",
    title: "Why it is wrong when it is wrong",
    blurb:
      "Hallucination, misplaced confidence, jagged skill, the context window, stuffing, compaction, and how a true fact gets in.",
    purpose:
      "Every famous failure mode derived from the primitive, so they read as properties to engineer around rather than defects to complain about.",
  },
  {
    id: "M3",
    label: "III. How capability is made and bought",
    title: "How capability is made and bought",
    blurb:
      "Pretraining, post-training, what a custom model really is, the inference bill, small and quantized models, and where the weights run.",
    purpose:
      "Separates what is baked from what is spent, so custom model, fine-tuning, open source and cheaper model stop being one fog.",
  },
  {
    id: "M4",
    label: "IV. From text to action",
    title: "From text to action",
    blurb:
      "Tool calls, contracts, the loop, error compounding, the six shapes people call automation, multi-agent, and computer use.",
    purpose:
      "The single change that separates 2022 from now, and the six product shapes that get confused with each other.",
  },
  {
    id: "M5",
    label: "V. The harness is the product",
    title: "The harness is the product",
    blurb:
      "Instructions, state, verification, scope, lifecycle, and the trace. Why the same model succeeds in one company and fails in another.",
    purpose:
      "The heart of the course. Reliability is a property of the environment, and the environment has parts you can name, demand and audit.",
  },
  {
    id: "M6",
    label: "VI. Control: permission, not trust",
    title: "Control: permission, not trust",
    blurb:
      "Guardrails, the autonomy dial, prompt injection, least privilege, gateways, sandboxes, egress, and who is answerable.",
    purpose:
      "Safety as an engineering property with owners and paperwork, derived from the loop rather than bolted on as a mood.",
  },
  {
    id: "M7",
    label: "VII. Evidence",
    title: "Evidence: how you know it works",
    blurb:
      "What a demo proves, what an eval is, what goes in the set, who scores it, how to read someone else's number, and what happens after it ships.",
    purpose:
      "Turns it seems good into a number someone else can produce again. This is where judgment is actually made.",
  },
  {
    id: "M8",
    label: "VIII. Money and the decision",
    title: "Money, and the operating decision",
    blurb:
      "Cost per completed unit, which work is a candidate, the minimum stack, build or buy, diligencing a claim, the people, and the first hundred days.",
    purpose:
      "The payoff. Everything above becomes a decision with a number attached.",
  },
  {
    id: "M9",
    label: "IX. Clinics",
    title: "Clinics",
    blurb:
      "Four cases. No new material. You produce the artifact first, then compare against a worked answer and the rubric it was scored with.",
    purpose:
      "Where the instruments get used together, under time, on material that was not written to make them look good.",
  },
];

export const MODULE_BY_ID = new Map(LEARN_MODULE_META.map((m) => [m.id, m]));
