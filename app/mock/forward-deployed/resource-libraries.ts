export type ResourceLibrary = {
  slug: "use-cases" | "learn";
  kicker: string;
  title: string;
  blurb: string;
  enter: string;
};

/** Catalog on /transformation/resources. Add a row when a new library ships. */
export const RESOURCE_LIBRARIES: ResourceLibrary[] = [
  {
    slug: "use-cases",
    kicker: "Operating wedges",
    title: "Use cases",
    blurb:
      "High-volume work where agents own the grind inside systems teams already run, and humans keep the gates. Full reports: playbook, tools, HITL, staging.",
    enter: "Open use cases",
  },
  {
    slug: "learn",
    kicker: "How the stack works",
    title: "Learn",
    blurb:
      "Twenty-two units from first principles: history, tokens, windows, tools, agents, tracing, guardrails, evals, cost. Not a lab.",
    enter: "Open Learn",
  },
];

export const RESOURCE_LIBRARY_SLUGS = new Set(
  RESOURCE_LIBRARIES.map((lib) => lib.slug),
);
