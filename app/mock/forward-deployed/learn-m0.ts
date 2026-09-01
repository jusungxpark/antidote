import type { LearnLesson } from "./learn-types";
import { CASE, CASE_LINE } from "./learn-case";

export const M0_LESSONS: LearnLesson[] = [
  {
    slug: "how-this-works",
    order: 1,
    n: "0.1",
    module: "M0",
    kind: "orientation",
    minutes: 10,
    title: "How this works",
    blurb:
      "Mastery over completion, a question before every explanation, one invoice running through everything, and an instrument at the end of each lesson.",
    thesis:
      "This course teaches about a dozen mechanisms and derives everything else from them, so the goal is to leave able to reconstruct a conclusion instead of recalling one.",
    lede:
      "How the course is built and why, because the structure does real work and knowing about it makes it work better. Then the first lesson.",
    youWill: [
      "Know why each lesson starts with a question you cannot yet answer.",
      "Know what mastery means here, and why lessons are passed instead of read.",
      "Recognize the running case when it appears in every module.",
      "Know what to do with the instrument at the end of each lesson.",
    ],
    atoms: [],
    prereqs: [],
    situation: {
      artifact: "Two ways to know something.",
      artifactItems: [
        "AI systems sometimes invent facts, so you should verify outputs.",
        "A model produces a probability distribution over the next token and samples from it, so when the required fact was absent from its input, something plausible gets produced in the same voice as something true.",
      ],
      prompt: "Which one survives contact with a case nobody anticipated?",
      options: [
        "The first. It is a clear, memorable rule.",
        "The second. It lets you work out what happens in a case the rule never mentioned.",
        "Both, equally",
      ],
      reveal:
        "The second, and the difference is the entire design of this course. A rule tells you what to do in the situations somebody anticipated. A mechanism lets you derive the rule, and then derive a different rule for the situation nobody wrote down. About a dozen mechanisms generate almost every practical judgment in this field. This course teaches those and works out the rest in front of you.",
    },
    sections: [
      {
        title: "The shape of a lesson",
        paragraphs: [
          "Every lesson opens with a situation: an artifact and a call you have to make before any explanation arrives. Commit to an answer. Being wrong at that point is useful and costs nothing, and it is what makes the mechanism land when it appears two paragraphs later.",
          "Then the thesis, stated in one sentence, followed by the mechanism that earns it. Then the prose, then something to manipulate, then what you can now decide, then an instrument you keep. The checks at the end are graded, with no partial credit. A wrong answer routes you to the earlier idea it implies is missing, which is more useful than a score.",
          "Sections vary by lesson. Some carry a table, most do not. Some name a sentence people say and take it apart; where the opening situation has already done that work, the lesson moves on. Nothing appears on a page out of habit.",
        ],
      },
      {
        title: "Depth, deliberately bounded",
        paragraphs: [
          "Each mechanism gets explained to exactly the depth at which the practical conclusions still follow, and stops there. Attention gets explained enough to imply why long documents cost more than proportionally and why the middle of a long context is the worst place for a fact. No further, because nothing beyond that changes a decision you will make.",
          "The result sits above a briefing and well below a machine-learning class, aimed at one outcome: you can reconstruct conclusions instead of recalling them.",
        ],
      },
      {
        title: "One case, all the way through",
        paragraphs: [
          `The same invoice runs through every module. ${CASE_LINE} Vendor ${CASE.vendor}, buyer ${CASE.buyer}, terms ${CASE.terms}, in a queue of ${CASE.volume}.`,
          "By the last module you will have watched it travel from a message pasted into a chat window to a gated, traced, evaluated, priced production system. Using one case throughout means each lesson adds a layer to something familiar instead of introducing a new world, and it is what makes the final clinic possible.",
          "Every lesson also ends with a usable object: a question list, a checklist, a decision tree, a worksheet, a scorecard. Most of them fit on one page, and they are the reason to keep this open after finishing. The four-question card, the artifact demand list and the queue scorecard get used far more often than they get read.",
        ],
      },
    ],
    widget: {
      kind: "sorter",
      dataset: "orientation",
      caption:
        "Four claims about AI systems. Sort them into mechanism and rule, and see which ones let you handle a case they never mentioned.",
    },
    instrument: {
      name: "How to read this course",
      body: "Six habits that make the difference between reading it and learning it.",
      items: [
        "Answer the opening situation before reading on. Every time.",
        "If a check goes wrong, follow the link back instead of rereading the lesson.",
        "Keep the instruments somewhere you will find them. They are the working output.",
        "Do the module gates. They re-exercise earlier material, which is the review.",
        "Return after a week away and take the thirty-second warm-up.",
        "Bring one of your own queues to mind in module eight. The clinics assume you have.",
      ],
    },
    soWhat:
      "You know what kind of thing this is: a derivation of about a dozen mechanisms, delivered as a sequence where each lesson earns one sentence, ending in four cases where you use the instruments together.",
    checks: [],
    next: "eras-of-ai",
    relatedUseCases: [],
  },
];
