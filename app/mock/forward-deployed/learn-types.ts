/**
 * FD Learn. type system.
 *
 * Design principles this schema enforces (see LEARN-SKELETON.md):
 *  R3  one question per lesson  → `title` is a question, `thesis` is its one-sentence answer
 *  R4  misconception-first      → `misconception` is required, rendered near the top
 *  R5  situation before explanation → `situation` is required and gates the prose
 *  R7  graph, not chain         → `atoms` / `prereqs`, validated in learn-atoms.ts
 *  R8  mastery, not completion  → `checks` are graded with diagnostic distractors
 *  R10 every lesson ships an instrument → `instrument` is required
 *  R2  depth ceiling            → `ceiling` is an authoring note, never rendered
 */

export type LearnModuleId =
  | "M0"
  | "M1"
  | "M2"
  | "M3"
  | "M4"
  | "M5"
  | "M6"
  | "M7"
  | "M8"
  | "M9";

export type AtomId = string;

export type LearnKind = "orientation" | "lesson" | "clinic";

/**
 * Prose block.
 *
 * A section is paragraphs plus at most one supporting device. The devices are
 * deliberately scarce: a table earns its place only where a reader would scan a
 * parallel set across the same two columns, and a split only where the lesson
 * turns on a single binary. Everything else is prose or a plain list, because a
 * page of labelled rows reads as generated rather than written.
 */
export type LearnSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
  /** A real table with column headings. Fourteen lessons in the whole course carry one. */
  table?: { head: [string, string]; rows: { label: string; body: string }[] };
  /** Two columns, for a lesson whose argument is a single contrast. Three lessons carry one. */
  split?: { title: string; body: string }[];
  /** The running case, worked. Title is optional and varies where it is present. */
  example?: { title?: string; body: string };
};

/** R5. The reader commits to a judgment before any mechanism is explained. */
export type LearnSituation = {
  /** The thing in front of them: an artifact, a claim, a screen. */
  artifact: string;
  /** Optional bullets rendered as a real list, not a run-on sentence. */
  artifactItems?: string[];
  /** The call they have to make. */
  prompt: string;
  /** Two to four commitments. No correct answer is marked; this is ungraded. */
  options: string[];
  /** Shown only after they commit. Refers back to what they chose. */
  reveal: string;
};

export type LearnCheckOption = {
  text: string;
  correct?: boolean;
  /** Why this is right or wrong, in one or two sentences. */
  feedback: string;
  /** Selecting this implies the reader is missing this atom. Routes to the lesson that teaches it. */
  impliesMissing?: AtomId;
};

/** R8. Binary, no partial credit. Every wrong option carries a diagnosis. */
export type LearnCheck = {
  q: string;
  options: LearnCheckOption[];
};

/** R10. The object the reader keeps. */
export type LearnInstrument = {
  name: string;
  body: string;
  items: string[];
};

/**
 * R11. Every widget runs client-side on recorded data. No keys, no network, deterministic.
 * `dataset` keys into LEARN_WIDGET_DATA (learn-widget-data.ts).
 */
export type WidgetSpec =
  | {
      kind: "tokens";
      mode: "distribution" | "resample" | "styles";
      dataset: string;
      caption: string;
    }
  | {
      kind: "context";
      mode:
        | "budget"
        | "needle"
        | "doors"
        | "compaction"
        | "memories"
        | "layers";
      dataset: string;
      caption: string;
    }
  | {
      kind: "trace";
      mode:
        | "steps"
        | "subsystems"
        | "compounding"
        | "screen"
        | "single-vs-loop"
        | "harness-vs-harness"
        | "stage";
      dataset: string;
      caption: string;
    }
  | {
      kind: "permissions";
      mode:
        | "tools"
        | "injection"
        | "identity"
        | "scope"
        | "boundary"
        | "autonomy"
        | "checker";
      dataset: string;
      caption: string;
    }
  | {
      kind: "evalbench";
      mode: "run" | "composition" | "scoring" | "timeline" | "cascade";
      dataset: string;
      caption: string;
    }
  | {
      kind: "econ";
      mode: "call" | "unit" | "cascade" | "rebuild" | "staffing";
      dataset: string;
      caption: string;
    }
  | { kind: "claims"; dataset: string; caption: string }
  | { kind: "sorter"; dataset: string; caption: string };

export type LearnLesson = {
  slug: string;
  /** Global reading order, 1..N, across every module. */
  order: number;
  /** Display number, e.g. "1.4". Clinics use "C1". */
  n: string;
  module: LearnModuleId;
  kind: LearnKind;
  minutes: number;
  /** R3. The question, in plain words. */
  title: string;
  /** One line for the syllabus. */
  blurb: string;
  /** R3. The one-sentence answer, stated plainly. */
  thesis: string;
  /** Standfirst under the title. */
  lede: string;
  youWill: string[];
  /** Atoms this lesson introduces. Fan-out budget: at most three. */
  atoms: AtomId[];
  /** Atoms required before starting. Validated to appear strictly earlier. */
  prereqs: AtomId[];
  /** R2. Authoring note: where the depth stops. Never rendered. */
  ceiling?: string;
  situation: LearnSituation;
  sections: LearnSection[];
  /**
   * R4. The sentence a smart person actually says, and why it goes wrong here.
   * Optional: present only where the wrong belief is the reason the lesson exists
   * and the opening situation has not already dealt with it.
   */
  misconception?: { says: string; why: string };
  widget: WidgetSpec;
  instrument: LearnInstrument;
  /** What the reader can now decide that they could not before. */
  soWhat: string;
  checks: LearnCheck[];
  next: string | null;
  relatedUseCases: string[];
};

export type LearnModuleMeta = {
  id: LearnModuleId;
  /** "M1" style label used in the nav. */
  label: string;
  /** Short title. */
  title: string;
  /** What the module is for, one sentence. */
  blurb: string;
  /** Why it sits where it sits in the sequence. */
  purpose: string;
};

/** Reader-facing paths. Every path is prerequisite-closed; see learn-atoms.ts. */
export type LearnPath = {
  id: "partner" | "diligence" | "operator";
  label: string;
  blurb: string;
  /** Lesson slugs, in reading order. Empty means "everything". */
  lessons: string[];
};
