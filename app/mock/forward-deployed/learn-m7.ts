import type { LearnLesson } from "./learn-types";
import { CASE } from "./learn-case";

export const M7_LESSONS: LearnLesson[] = [
  {
    slug: "what-a-demo-proves",
    order: 44,
    n: "7.1",
    module: "M7",
    kind: "lesson",
    minutes: 22,
    title: "What does a demo prove?",
    blurb:
      "A demo is a designed object: a chosen case, chosen data, a person in the room. It proves that success is possible, which is real and small.",
    thesis:
      "A demonstration establishes that the system can succeed on a selected item under favourable conditions, and selection is doing most of the work, so the interesting question is what was selected and how.",
    lede:
      "Demos are the primary evidence behind most buying decisions in this field, and they are structurally incapable of supporting the conclusions drawn from them. None of that is an argument for cynicism. It is an argument for asking three specific questions during the demo itself, all of them reasonable, none of them hostile, each of them turning a performance into information.",
    youWill: [
      "Say precisely what one successful run establishes.",
      "Identify the two selections behind every demo.",
      "Ask three questions that convert a demo into evidence.",
      "Explain why a pilot that worked can still support no conclusion.",
    ],
    atoms: ["A-DEMO", "A-SELECTION"],
    prereqs: ["A-VARIANCE", "A-JAGGED"],
    ceiling:
      "Selection effects and the limits of a single run. Evaluation methodology arrives in the next lesson and depends on this one landing first.",
    situation: {
      artifact:
        "A pilot report. Over eight weeks the system processed 340 exceptions at 91% accuracy, and the team recommends expansion to the full queue.",
      prompt: "What is the first question?",
      options: [
        "How was accuracy measured?",
        "Which 340, and how were they chosen?",
        "What did it cost?",
        "Which model version was used?",
      ],
      reveal:
        "Which 340, and how were they chosen. Every other question is downstream of that one. If the 340 were the exception types the team already knew the system handled, 91% describes those types and nothing else. If they were a random sample of eight weeks of arrivals, the number carries information. If a person filtered out the awkward ones before they reached the system, which is common, informal and rarely recorded, the number describes a queue that does not exist. All three produce the same sentence in a report.",
    },
    sections: [
      {
        title: "Two selections",
        paragraphs: [
          "Every demo contains two selections and the second one is invisible. The first is the case, chosen because it works, usually after trying several. That much is normal and everyone in the room assumes it.",
          "The second is the run. Lesson 1.6 established that identical input produces different output, so the run being watched is one draw from a distribution. If the presenter ran it three times beforehand and showed the best, nothing about the presentation would look any different, and no dishonesty would be required, because the third run is simply the one they had ready.",
          "Together these mean a demo supports exactly one claim. This system produced a good result on this item at least once. Everything beyond that comes from somewhere else, and knowing where is the entire content of this module.",
        ],
      },
      {
        title: "Three questions",
        paragraphs: [
          "The first request defeats case selection. Can we run it on an item I choose, right now? Bring three items on a memory stick, including one awkward one. The reaction is as informative as the result, because a team with a stable system says yes immediately and a team without one explains why today is unrepresentative.",
          "The second defeats run selection. Can we run the same item ten times? It costs a few cents, takes two minutes, and what comes back is a distribution instead of an anecdote. The field that moves first across those ten runs is the one where the underlying evidence was thin, which is a diagnostic worth more than the average.",
          "The third is the most informative and the least often asked. Show me a failure. Every real system fails, so a team that can produce one immediately and explain what happened has traces, a diagnosis and a fix loop. A team that cannot produce one has never looked, and their 91% came from somewhere.",
        ],
      },
      {
        title: "Pilots have the same shape at larger scale",
        paragraphs: [
          "A pilot is a longer demo with more selection opportunities, and its selections are usually informal and undocumented instead of deliberate. Someone routed the clean cases first because that was sensible for a trial. A person quietly fixed inputs before they reached the system. The hardest exception type was excluded because the integration was pending. A pilot on the running case that quietly excluded photograph-format invoices from three vendors reports a good number for a queue in which those arrive every week. Each decision was reasonable on its own, and together they produce a number about work nobody actually receives.",
          "Two things make a pilot informative. Define the population before it starts, naming the queue, the exception types, and everything arriving inside the window. Then measure the same way production will measure, against answers established from records instead of from the reviewer's impression at the time.",
          "The exclusion log is the underrated artifact. A pilot reporting 91% on 340 items with a documented list of 60 exclusions and their reasons is far more useful than one reporting 94% on 400 with nothing written down, because the first one supports an estimate of what happens when those 60 arrive anyway. They will.",
        ],
      },
    ],
    misconception: {
      says: "The pilot worked, so we should scale it.",
      why: "A pilot result describes the population it ran on, and that population was shaped by decisions nobody recorded: which cases got routed in, which were quietly fixed first, which types were postponed until an integration landed. Scaling exposes the system to the population that actually arrives, which is why pilot numbers so often fail to survive the expansion, and why the exclusion log matters more than the headline.",
    },
    widget: {
      kind: "evalbench",
      mode: "run",
      dataset: "demo-vs-set",
      caption:
        "The recorded demo case, then the same system on nineteen unseen items from the same queue. Watch the number move, and see which case types account for the gap.",
    },
    instrument: {
      name: "The six demo questions",
      body: "Asked in this order, during the demo. None is hostile, and each one converts performance into information.",
      items: [
        "Can we run it on an item I brought, right now?",
        "Can we run the same item ten times and look at all ten?",
        "Can you show me a failure from last week and explain what happened?",
        "Which items, if any, were excluded from your reported numbers, and why?",
        "How was correctness established, from records or from a reviewer's impression?",
        "Which model version, and what has changed since the number was measured?",
      ],
    },
    soWhat:
      "You can sit through a demo and leave with evidence instead of an impression, using three requests a well-run team will welcome and a poorly-run one will deflect, where the deflection is itself the finding.",
    checks: [
      {
        q: "A demo succeeds on a chosen invoice. What does that establish?",
        options: [
          {
            text: "That the system handles invoices of that type.",
            feedback:
              "One item, one run. Neither a type nor a rate can be inferred from it.",
            impliesMissing: "A-DEMO",
          },
          {
            text: "That success on this item is possible, with nothing implied about frequency.",
            correct: true,
            feedback:
              "Correct, and saying it out loud in the room reframes the meeting without any hostility at all.",
          },
          {
            text: "Nothing at all.",
            feedback:
              "Too strong. Possibility is real information, and plenty of systems fail to demonstrate even that.",
            impliesMissing: "A-DEMO",
          },
        ],
      },
      {
        q: "Why is the exclusion log the most useful artifact from a pilot?",
        options: [
          {
            text: "Because it shows the team was rigorous.",
            feedback:
              "A signal about the team instead of about the result. Useful, and secondary.",
            impliesMissing: "A-SELECTION",
          },
          {
            text: "Because it supports an estimate of what happens when the excluded items arrive anyway.",
            correct: true,
            feedback:
              "Correct. A slightly lower number with a documented exclusion list is worth far more than a higher one with nothing written down.",
          },
          {
            text: "Because regulators require it.",
            feedback:
              "They might. The analytical value stands whether or not anyone asks for it.",
            impliesMissing: "A-SELECTION",
          },
        ],
      },
      {
        q: "Which request most reliably separates a mature system from a demo?",
        options: [
          {
            text: "Ask for the accuracy number.",
            feedback:
              "Every team has one. The question is what it was measured on, which is a different request.",
            impliesMissing: "A-DEMO",
          },
          {
            text: "Ask to see a failure from last week, with the trace and the diagnosis.",
            correct: true,
            feedback:
              "Correct. It requires traces, a habit of looking, and a fix loop, and a demo can be built without any of the three.",
          },
          {
            text: "Ask which model they use.",
            feedback:
              "Everyone rents from the same short list, so the answer rarely discriminates between two vendors.",
            impliesMissing: "A-HARNESS",
          },
        ],
      },
    ],
    next: "what-is-an-eval",
    relatedUseCases: ["ap-invoice-exceptions", "rfp-response-assembly"],
  },

  {
    slug: "what-is-an-eval",
    order: 45,
    n: "7.2",
    module: "M7",
    kind: "lesson",
    minutes: 24,
    title: "What is an eval?",
    blurb:
      "A frozen set of cases, a scoring rule, and a number that can be produced again next month on the same set. The power is entirely in the freezing.",
    thesis:
      "An evaluation is a fixed set of cases with known answers plus a written scoring rule, run repeatedly, and its value comes from the set staying fixed so that a change in the number means a change in the system.",
    lede:
      "The idea is almost embarrassingly simple, which is why it gets skipped. Twenty items, the right answers, a rule for scoring, and the discipline to leave the twenty alone. That discipline is the whole thing. The moment the set moves, every comparison across time becomes meaningless, and comparison across time is the only reason to have built it.",
    youWill: [
      "State the three parts of an evaluation.",
      "Explain why freezing the set is what creates the value.",
      "Build one for a workflow you know, in an afternoon.",
    ],
    atoms: ["A-FROZENSET", "A-SCORING", "A-RERUN"],
    prereqs: ["A-OWNTEST", "A-DEMO"],
    ceiling:
      "The three parts and the freezing discipline. Set composition is the next lesson and scoring methods the one after; both depend on this shape existing first.",
    situation: {
      artifact:
        "A team says they test every release. The process: the lead runs about a dozen recent cases through the new version, reads the outputs, and signs off if they look right.",
      prompt: "What can that process detect?",
      options: [
        "Any significant regression",
        "Obvious catastrophic failure, and almost nothing else",
        "Regressions in the cases they happened to pick",
        "Nothing at all",
      ],
      reveal:
        "Obvious catastrophic failure. Because the cases change every time, a worse result on this release cannot be told apart from a harder set of cases. Because correctness is judged by reading, a subtle error inside plausible output survives untouched. And because the reviewer knows which version is new, expectation shapes the reading. Three separate problems, all repaired by the same three decisions: fix the set, write the answers down first, and score mechanically.",
    },
    sections: [
      {
        title: "Three parts",
        paragraphs: [
          "The set is a fixed collection of real cases with their correct answers, established from records instead of from anyone's recollection. Twenty is enough to start and vastly better than nothing, a hundred is comfortable, and composition matters more than count, which is the next lesson's subject.",
          "The rule is a written statement of what counts as correct, decided before anyone looks at any output. Exact match on the amount. The classification is one of eleven permitted labels and matches the record. The draft carries the invoice number, the purchase-order number and one clear request. Writing it down beforehand is what stops correctness from being negotiated afterwards, which is what happens whenever a borderline output is examined first and judged second.",
          "The rerun is the same set under the same rule, run again whenever anything changes: a prompt edit, a model version, a retrieval change, a new tool. What comes out is a number comparable against the last number, and that comparison is the one thing no other practice in this course provides.",
        ],
      },
      {
        title: "Why freezing is the whole idea",
        paragraphs: [
          "With a fixed set, a change in the number means a change in the system. That single property is what makes every downstream decision possible: whether a prompt edit helped, whether a model upgrade regressed something narrow, whether last month's improvement survived this month's change.",
          "With a moving set, the number measures the set and the system together and the two cannot be separated afterwards. This is the failure in the process above, and it explains why teams who test every release are so often surprised in production. Their process could never have detected the thing that surprised them.",
          "Freezing carries one cost worth naming honestly. A frozen set gradually stops representing the work as the work changes, so it needs periodic extension: adding new cases while keeping the old ones, and reporting both the full-set number and the original-set number so the comparison across time survives the extension. Replacing a set resets its history, which is occasionally the right call and should always be a deliberate act with a date attached.",
        ],
      },
      {
        title: "What it enables",
        paragraphs: [
          "Five things become possible, and each one is otherwise a matter of opinion. Any modification can be measured before it ships, which turns prompt engineering from an art into an experiment. A model swap becomes an event with a decision behind it: run the set against the new version, compare, decide, and lesson 7.5 makes that a standing rule.",
          "Autonomy decisions acquire evidence, because module six's grid needs a measured number per action type and this is where that number comes from. External claims become defensible, since a figure attached to a named set, a date, a version and a run count survives scrutiny in a way a percentage on a slide never does. And vendor comparison becomes possible on the work that matters, because the same set run against two systems is the only comparison describing your queue instead of somebody else's benchmark.",
        ],
      },
      {
        title: "Building one this week",
        paragraphs: [
          "Pick the queue that matters. Take twenty real items from the last month, including the awkward ones. Write down the correct answer for each from the records, before running anything, because doing it afterwards lets the output influence the answer without anybody noticing.",
          "Write the scoring rule in one paragraph. Run the set three times against the current system. Record the fraction, the date, the model version and the run count. The evaluation for the running case looks like this: twenty items with answers taken from the ERP, rules stating exact match on amount and purchase-order number, correct classification from seven permitted labels, and a draft carrying both identifiers plus one clear request, rerun on every prompt or model change with the result recorded as a fraction, a date and a pinned version.",
          "The most common reason this never happens is that it feels too small to count. Twenty items and a paragraph produce more usable information than a six-week pilot with no fixed set, for one reason: it can be run again.",
        ],
      },
    ],
    widget: {
      kind: "evalbench",
      mode: "run",
      dataset: "eval20",
      caption:
        "Twenty invoices, gold answers, three recorded systems. Pick a scoring rule, run it, and click any failure to read its trace.",
    },
    instrument: {
      name: "The eval one-pager",
      body: "What a defensible result looks like written down. Anything missing a line here is an impression.",
      items: [
        "How many cases, drawn from where, over what period.",
        "How the answers were established, by whom, and when.",
        "What counts as correct, per field, written before any output was seen.",
        "The model version pinned, the settings recorded, and the number of runs per case.",
        "The result as a fraction instead of a percentage, with the date.",
        "The failures, listed, with what each one actually was.",
      ],
    },
    soWhat:
      "You can build in one afternoon the artifact that makes every subsequent decision measurable, and you can tell the difference between a team that tests and a team that has an evaluation.",
    checks: [
      {
        q: "Why must the set stay fixed?",
        options: [
          {
            text: "To save the effort of finding new cases.",
            feedback:
              "Convenient, and unrelated. Fresh cases would be easy enough to obtain.",
            impliesMissing: "A-FROZENSET",
          },
          {
            text: "So that a change in the number means a change in the system instead of a change in the sample.",
            correct: true,
            feedback:
              "Correct. Comparison across time is the entire product, and a moving set destroys it.",
          },
          {
            text: "So the number stays high.",
            feedback:
              "That optimises the instrument instead of using it, which is a recognisable failure once a number becomes a target.",
            impliesMissing: "A-FROZENSET",
          },
        ],
      },
      {
        q: "When should the correct answers be written down?",
        options: [
          {
            text: "After running the system, so you can see what a reasonable answer looks like.",
            feedback:
              "That lets the output shape the standard, which is how a set quietly becomes easy over a few months.",
            impliesMissing: "A-SCORING",
          },
          {
            text: "Before any output is seen, established from records instead of from recollection.",
            correct: true,
            feedback:
              "Correct on both halves. Records instead of memory, and before instead of after.",
          },
          {
            text: "Whenever convenient, provided the same person does it every time.",
            feedback:
              "Consistency of author does nothing to stop the output from anchoring the answer.",
            impliesMissing: "A-SCORING",
          },
        ],
      },
      {
        q: "The set has aged and no longer represents the queue. What is the right move?",
        options: [
          {
            text: "Replace it with twenty fresh cases.",
            feedback:
              "That resets the history, so every comparison against previous results is lost. Occasionally right, and it should be deliberate and dated.",
            impliesMissing: "A-RERUN",
          },
          {
            text: "Add new cases while keeping the old ones, and report both the full-set number and the original-set number.",
            correct: true,
            feedback:
              "Correct. Coverage improves and the comparison across time survives the change.",
          },
          {
            text: "Keep using it unchanged, since freezing is the point.",
            feedback:
              "Freezing serves comparison, and a set that stops representing the work stops informing decisions.",
            impliesMissing: "A-RERUN",
          },
        ],
      },
      {
        q: "A team runs their twenty cases once against a new model version and the score is unchanged. What have they established?",
        options: [
          {
            text: "That the new version is safe to ship.",
            feedback:
              "One run per case on twenty items leaves a spread wide enough to hide a real regression. The comparison needs several runs.",
            impliesMissing: "A-RERUN",
          },
          {
            text: "A weak signal, because a single run per case carries a spread that a small difference would disappear inside.",
            correct: true,
            feedback:
              "Correct, and the fix is cheap: three runs per case, and report the spread alongside the fraction.",
          },
          {
            text: "Nothing, since twenty cases is too few for any conclusion.",
            feedback:
              "Twenty cases carry real information. It is the single run per case that weakens this particular comparison.",
            impliesMissing: "A-FROZENSET",
          },
        ],
      },
    ],
    next: "the-set",
    relatedUseCases: ["ap-invoice-exceptions", "freight-invoice-audit"],
  },

  {
    slug: "the-set",
    order: 46,
    n: "7.3",
    module: "M7",
    kind: "lesson",
    minutes: 24,
    title: "What goes in the set?",
    blurb:
      "A sample of the work, and not a sample of the easy work. Volume types in proportion, the tail over-weighted, near-misses, and the adversarial cases.",
    thesis:
      "The composition of an evaluation set determines the number it produces, so a set can be made to say almost anything without touching the system, and honest construction over-weights the cases where systems actually differ.",
    lede:
      "This is the lesson with the most leverage in the module, because composition is the least visible property of any reported number and the easiest to get wrong without intending to. Two teams can measure the same system in the same week and report 94% and 71%, and both of them can be telling the truth.",
    youWill: [
      "Build a set with four deliberate strata.",
      "Explain why the tail is over-weighted on purpose.",
      "Say what near-misses catch that ordinary cases miss.",
      "Recognise a reported number whose composition is doing the work.",
    ],
    atoms: ["A-SETDESIGN", "A-TAIL", "A-NEARMISS"],
    prereqs: ["A-FROZENSET", "A-INJECTION"],
    ceiling:
      "Four strata and the reason for each. No sampling theory and no power calculations; the decisions here are made with a queue report and an afternoon.",
    situation: {
      artifact:
        "Two evaluations of the same system on the same queue, run in the same week. The first reports 94% on 100 cases sampled at random from arrivals. The second reports 71% on 100 cases, of which 40 are exception types making up 6% of volume.",
      prompt: "Which number should you use?",
      options: [
        "The first, since it reflects the real distribution",
        "The second, since it stresses the system",
        "Both, for different decisions",
        "Neither, since they contradict each other",
      ],
      reveal:
        "Both, and knowing which decision each one serves is the skill. The first answers what share of arriving work this handles today, which is the operational number and the one that goes in a business case. The second answers where it breaks and how badly, which is the improvement number and the risk number. They agree completely and they answer different questions. The failure is reporting either one alone as the system's accuracy.",
    },
    sections: [
      {
        title: "Four strata",
        paragraphs: [
          "Volume types come first, at roughly their real share. This stratum answers the operational question and it is the least useful for telling systems apart, because everything competent handles it.",
          "The ugly tail comes next, deliberately over-weighted. The photograph instead of a PDF, the vendor who writes the reference in the subject line, the three-way split across purchase orders. Small in volume, large in cost per item, and the place where systems diverge. The over-weighting gets recorded so the operational number stays reconstructible.",
          "Near-misses are the third stratum: pairs of cases that look almost identical and require different answers. The same vendor with two open invoices. An amount matching a different purchase order. A duplicate that is legitimately a second delivery. These separate a system that reads from one that pattern-matches, and nothing else in the set does that job. Adversarial cases from lesson 6.3 are the fourth, scored on whether the system behaved correctly and whether the controls fired.",
        ],
      },
      {
        title: "Why the tail is over-weighted",
        paragraphs: [
          "A set matching the real distribution spends most of its cases on work any competent system handles, so most of the measurement budget buys almost no information. Three systems all score in the low nineties and the set fails to say which one to buy.",
          "The tail carries the information because that is where behavior diverges, and it carries the cost because a tail case going wrong is usually the expensive kind. Over-weighting concentrates measurement where the decision actually is.",
          "The discipline keeping this honest is recording the weighting. If the set is 40% tail against a real 6%, both numbers get reported: the raw set score, and the operational estimate obtained by reweighting to the real distribution. Reporting only the stressed number understates the system, and reporting only the operational number hides where it breaks.",
        ],
      },
      {
        title: "Near-misses",
        paragraphs: [
          "Near-misses are the stratum teams almost never build, and they catch one specific failure nothing else catches: a system producing the right answer for the wrong reason.",
          "Construct them by taking a case the system handles and changing one thing that changes the answer. The same vendor with a second open invoice, so the correct match is a different purchase order. A duplicate-looking pair that is a legitimate second delivery against a split order. An amount that happens to match a different line on the same purchase order.",
          "A system that reads carefully gets both members of the pair right. A system that pattern-matches gets the original right and the variant wrong, and it does so with no hesitation at all. Building six such pairs takes an afternoon, and they will discriminate between vendors more sharply than a hundred ordinary cases.",
        ],
        list: [
          "Volume in proportion, tail over-weighted, near-misses built by hand, adversarial cases included.",
          "Record the weighting, and report both the raw score and the reweighted operational estimate.",
          "Six near-miss pairs discriminate better than a hundred ordinary cases.",
          "Every production failure becomes a new case, which is how a set stays honest without anyone maintaining it.",
        ],
        example: {
          title: "One near-miss pair",
          body: `Invoice ${CASE.invoice} against PO ${CASE.po} with the goods receipt missing, paired with a second ${CASE.vendor} invoice for the same amount against a different purchase order where the receipt exists. One should chase and one should pass. A pattern-matching system treats them the same way and no ordinary case would ever have revealed it.`,
        },
      },
      {
        title: "The set grows from failures",
        paragraphs: [
          "The healthiest way for a set to develop is that every production failure becomes a case in it. Something went wrong, it was diagnosed, and from then on it is measured on every subsequent change. That one habit converts incidents into permanent coverage and gives the set a shape reflecting real risk instead of anticipated risk.",
          "It also produces the artifact that carries most weight in diligence. A team with a hundred and forty cases, sixty of them drawn from real failures with dates attached, has a history a reader can follow. A team with a clean set of a hundred synthetic cases has an intention.",
        ],
      },
    ],
    widget: {
      kind: "evalbench",
      mode: "composition",
      dataset: "eval20",
      caption:
        "Reshape the set and watch the reported accuracy move with the system unchanged. This is the whole argument, in about ten seconds.",
    },
    instrument: {
      name: "The set-composition worksheet",
      body: "Filled in before building a set, and attached to every number the set produces.",
      items: [
        "Volume types and their real shares, taken from the queue instead of from memory.",
        "Tail types, their real share, and their share in the set. Record both figures.",
        "Near-miss pairs, at least six, built by changing one thing that changes the answer.",
        "Adversarial cases, at least four, from the module six list.",
        "Cases derived from production failures, each with a date.",
        "Two reported numbers: the raw set score, and the operational estimate reweighted to the real distribution.",
      ],
    },
    soWhat:
      "You can ask the one question that determines what any reported number means, and build a set that discriminates between systems instead of one that flatters all of them equally.",
    checks: [
      {
        q: "Two honest teams report 94% and 71% on the same system in the same week. What is the most likely explanation?",
        options: [
          {
            text: "One of them measured incorrectly.",
            feedback:
              "Both can be correct. Composition alone produces gaps of this size without anyone making a mistake.",
            impliesMissing: "A-SETDESIGN",
          },
          {
            text: "Different set composition, where one sampled arrivals and the other over-weighted the tail.",
            correct: true,
            feedback:
              "Correct, and both numbers become useful once you know which question each one answers.",
          },
          {
            text: "They used different model versions.",
            feedback:
              "That would explain a few points instead of twenty-three, and the point here is that composition alone suffices.",
            impliesMissing: "A-SETDESIGN",
          },
        ],
      },
      {
        q: "What do near-miss pairs catch that ordinary cases miss?",
        options: [
          {
            text: "Rare failure modes.",
            feedback:
              "The tail stratum covers rarity. Near-misses target something else entirely.",
            impliesMissing: "A-NEARMISS",
          },
          {
            text: "A system producing the right answer for the wrong reason, which surfaces only when one detail changes the correct answer.",
            correct: true,
            feedback:
              "Correct, and it is the hardest failure to detect any other way, because the ordinary case looks fine.",
          },
          {
            text: "Prompt injection attempts.",
            feedback:
              "That is the adversarial stratum, which is separate and also required.",
            impliesMissing: "A-INJECTION",
          },
        ],
      },
      {
        q: "Why report two numbers from an over-weighted set?",
        options: [
          {
            text: "To give a range.",
            feedback:
              "They are two answers to two questions, and not two ends of one range.",
            impliesMissing: "A-TAIL",
          },
          {
            text: "Because the raw score shows where the system breaks and the reweighted estimate shows what happens to arriving work.",
            correct: true,
            feedback:
              "Correct. Reporting only one of them hides either the risk or the operational reality.",
          },
          {
            text: "Because auditors expect two figures.",
            feedback:
              "The reason is analytical instead of procedural, and it holds whether or not anyone audits.",
            impliesMissing: "A-TAIL",
          },
        ],
      },
    ],
    next: "scoring",
    relatedUseCases: ["claim-intake-missing-info", "trade-deduction-management"],
  },

  {
    slug: "scoring",
    order: 47,
    n: "7.4",
    module: "M7",
    kind: "lesson",
    minutes: 22,
    title: "Who decides if the answer was right?",
    blurb:
      "Four ways to score, in descending order of trust and ascending order of convenience. Money and identifiers never go below the first two.",
    thesis:
      "Correctness is established by a deterministic key, a validator, a human rubric or another model, and that choice determines how much the resulting number is worth, with a hard floor for anything involving money or identity.",
    lede:
      "The scoring method is where evaluations quietly stop meaning anything. A number produced by a model judging another model, with no check on the judge, looks exactly like a number produced by comparison against records. Distinguishing them takes one question, and the answer decides whether the whole exercise was measurement or theatre.",
    youWill: [
      "Rank the four scoring methods by trust and by cost.",
      "Assign a method per field, with a floor for money and identifiers.",
      "Say what has to happen before a model judge can be trusted at all.",
    ],
    atoms: ["A-SCORINGKINDS", "A-JUDGE", "A-AGREEMENT"],
    prereqs: ["A-SCORING"],
    ceiling:
      "Four methods, their trust ordering, and judge calibration understood as checking the judge against people on a sample and reporting how often they agree. The idea of an agreement statistic gets named and none is taught.",
    situation: {
      artifact:
        "A vendor reports 92% quality on drafted chase emails, measured by a language model scoring each draft against a rubric.",
      prompt: "What would you need before that number means anything?",
      options: [
        "The rubric",
        "The rubric, plus evidence that the judge agrees with people on a sample",
        "A larger sample",
        "The identity of the judging model",
      ],
      reveal:
        "The second, and the rubric alone is insufficient. A model judge is a system with the same properties as every other system in this course: jagged, variable, and capable of confident wrongness. Before its scores mean anything, somebody has to take a sample, have people score it independently, and report how often the judge and the people reached the same verdict. Without that step, 92% describes the judge's disposition toward this kind of text.",
    },
    sections: [
      {
        title: "Four methods",
        paragraphs: [
          "The four sit in a fixed order of trust, and the order runs opposite to convenience, which is why so many evaluations drift toward the bottom of it over time.",
          `Most of a real queue qualifies for the top of the table, which is the fact that surprises people. Extraction, classification and reconciliation all have exact right answers sitting in a system of record, so the amount is ${CASE.amount} or it is something else, and no judgment is required to say which.`,
        ],
        table: {
          head: ["Method", "What it establishes, and what it costs"],
          rows: [
            {
              label: "Deterministic key",
              body: "The correct answer is known exactly and comparison is mechanical. Highest trust, lowest cost, available wherever the field has one right answer. This covers more of a real queue than people expect.",
            },
            {
              label: "Validator",
              body: "The answer satisfies a checkable property where no single right answer exists: both identifiers present, recipient allowlisted, under a length, every number sourced. High trust for structure, and silent on quality.",
            },
            {
              label: "Human rubric",
              body: "People score against written criteria. Necessary where judgment is required, expensive and slow, and it needs its own discipline: more than one scorer on a sample, and a check that they agree with each other.",
            },
            {
              label: "Model judge",
              body: "Another model scores the output. Cheapest at volume, most convenient, and worth nothing until calibrated against people. Legitimate for prose quality on large samples once that calibration exists.",
            },
          ],
        },
      },
      {
        title: "The floor",
        paragraphs: [
          "Anything involving money, identity or a legal effect gets a deterministic key or a validator, permanently, whatever the convenience argument. Amounts, account numbers, invoice and purchase-order references, party names, and dates carrying legal significance.",
          "The reason is that these fields have exact right answers, so the expensive methods buy nothing, and their failure mode is severe. A model judge asked whether an extracted amount looks correct will confirm a plausible wrong amount, because plausibility is precisely the thing it can assess.",
          "The floor also simplifies the work considerably. Most of a real extraction task falls under it and becomes cheap to score exactly, which leaves human effort available for the small share where judgment is the actual difficulty.",
        ],
      },
      {
        title: "Calibrating a judge",
        paragraphs: [
          "Before a model judge's scores are used for anything, run this once. Take a sample of at least thirty items, have two people score them independently against the same rubric, have the judge score them, and report how often the judge agreed with the human consensus, split into how often it wrongly passed something and how often it wrongly failed something.",
          "Report how much the two people agreed with each other as well, because that bounds everything downstream. If two experienced reviewers agree only 70% of the time, no judge can meaningfully exceed that, and the finding is that the rubric needs work instead of that the judge is poor. There is an established family of agreement statistics for this, and they matter to whoever runs the study more than to whoever reads the result. A reader needs three things: the sample size, the agreement rate, and the two error directions. A vendor who has done the work can produce all three in a sentence.",
          `Until a judge is calibrated, keep model-judged metrics out of anything client-facing or decision-bearing. Scoring the evaluation for the running case looks like this: amount and purchase-order number by deterministic key against the ERP, classification by key against seven permitted labels, the draft by validator requiring both identifiers and an allowlisted recipient and one clear request, and tone by human rubric on a sample of twenty, with a model judge introduced only after it has been checked against those same twenty.`,
        ],
      },
    ],
    misconception: {
      says: "We use a model to grade the outputs, which lets us evaluate at scale.",
      why: "The scale is real and the number means nothing until the judge has been checked against people on a sample, because a judge shares the properties of every other system in this course and will confirm plausible wrong answers with no hesitation. On the fields that matter most, meaning amounts, identifiers and parties, an exact comparison is available and costs less than the judge does.",
    },
    widget: {
      kind: "evalbench",
      mode: "scoring",
      dataset: "eval20",
      caption:
        "The same twenty outputs under four scoring rules. Watch the reported number move, and see which failures each rule cannot see.",
    },
    instrument: {
      name: "The scoring-choice rule",
      body: "Assign a method per field before running anything. Fifteen minutes, and it decides whether the number is worth having.",
      items: [
        "Money, identifiers, parties and legally significant dates get a deterministic key or a validator, with no exceptions.",
        "Structure gets a validator: required fields present, recipient allowlisted, length respected, no unsourced numbers.",
        "Judgement and tone get a human rubric, with at least two scorers on a sample and an agreement check.",
        "Prose at volume gets a model judge, only after calibration against those human scores.",
        "Report per field instead of as one figure, since the methods establish different things.",
        "Any single quality percentage covering all of this is hiding which method produced it.",
      ],
    },
    soWhat:
      "You can ask one question of any reported quality figure, namely how correctness was established per field, and know from the answer whether you are looking at a measurement or at a model's opinion of a model.",
    checks: [
      {
        q: "How should an extracted invoice amount be scored?",
        options: [
          {
            text: "By a model judge, for scale.",
            feedback:
              "It will confirm plausible wrong amounts, because plausibility is exactly what it evaluates.",
            impliesMissing: "A-SCORINGKINDS",
          },
          {
            text: "By exact comparison against the amount in the system of record.",
            correct: true,
            feedback:
              "Correct. A right answer exists, the comparison is free, and everything else is a downgrade.",
          },
          {
            text: "By a person reviewing a sample.",
            feedback:
              "Expensive, slower, and less reliable than a mechanical comparison against a known value.",
            impliesMissing: "A-SCORINGKINDS",
          },
        ],
      },
      {
        q: "What must exist before a model judge's scores are usable?",
        options: [
          {
            text: "A well-written rubric.",
            feedback:
              "Necessary and insufficient. The rubric says what to score; the calibration says whether the judge applies it the way people do.",
            impliesMissing: "A-AGREEMENT",
          },
          {
            text: "A calibration study on at least thirty items scored by two people and by the judge, reporting agreement and both error directions.",
            correct: true,
            feedback:
              "Correct, and reporting how much the two people agreed is part of it, because that bounds what any judge could achieve.",
          },
          {
            text: "A frontier-class model doing the judging.",
            feedback:
              "Capability helps and stays unmeasured until somebody measures it on this rubric, on this kind of text.",
            impliesMissing: "A-JUDGE",
          },
        ],
      },
      {
        q: "Two experienced reviewers agree on only 70% of items. What does that tell you?",
        options: [
          {
            text: "One reviewer is wrong.",
            feedback:
              "Possible, and the more useful reading concerns the instrument they are both applying.",
            impliesMissing: "A-AGREEMENT",
          },
          {
            text: "The rubric is underspecified, and 70% is a ceiling on what any judge could meaningfully achieve here.",
            correct: true,
            feedback:
              "Correct. Fix the rubric first, because a judge calibrated against an ambiguous standard inherits the ambiguity.",
          },
          {
            text: "The task is too hard to evaluate.",
            feedback:
              "Premature. Most low-agreement rubrics improve substantially once the disagreement cases are examined together.",
            impliesMissing: "A-AGREEMENT",
          },
        ],
      },
    ],
    next: "reading-a-number",
    relatedUseCases: ["rfp-response-assembly", "audit-evidence-requests"],
  },

  {
    slug: "reading-a-number",
    order: 48,
    n: "7.5",
    module: "M7",
    kind: "lesson",
    minutes: 24,
    title: "How do you read someone else's number?",
    blurb:
      "Four questions: what was measured, on what, how many times, and whether the answers were sitting in the training data.",
    thesis:
      "A published performance figure describes a specific task on a specific distribution under specific conditions, so four questions establish what it supports, and a figure that cannot answer them supports nothing.",
    lede:
      "This lesson produces the most portable object in the course: four questions on a card, working equally on a vendor deck, a research claim, a management presentation and a leaderboard. It also settles version pinning, because the fourth question carries an implication most teams discover the hard way.",
    youWill: [
      "Apply four questions to any published figure.",
      "Say what contamination is and why it inflates results specifically.",
      "Read an error bar as the range a rerun would move within.",
      "Explain why an unpinned version leaves every number undated.",
    ],
    atoms: ["A-CONTAMINATION", "A-ERRORBARS", "A-PINNING"],
    prereqs: ["A-FROZENSET", "A-SETDESIGN"],
    ceiling:
      "Four questions, contamination understood as the test may have been in the training data, and an error bar understood as the range a rerun would move within. No statistics past that point.",
    situation: {
      artifact:
        "A chart in a vendor deck. Three bars: their system at 94%, competitor A at 81%, competitor B at 76%. The footnote reads internal testing, 2026.",
      prompt: "What does the chart establish?",
      options: [
        "That their system is meaningfully better",
        "That their system scored higher on whatever they measured",
        "Nothing at all",
        "That competitor A is the closest alternative",
      ],
      reveal:
        "The second, and the gap between it and the first is where the deck is doing its work. Nothing in the footnote says what task, on which cases, how many, how many runs, which versions of the competitors, or who configured them. A vendor testing competitors configures them, and configuration is most of the outcome, which module five established at length. The chart is a claim about an unspecified measurement, and four questions would turn it into a claim about something.",
    },
    sections: [
      {
        title: "The four questions",
        paragraphs: [
          "They take about a minute to ask and they work on anything. What was measured, meaning the specific task and the definition of correct, because accuracy on extracting eight fields against records carries meaning while quality carries none until defined. On what, meaning the cases, their number, their source and their composition, since lesson 7.3 established that composition alone moves a number by twenty points, which makes a figure without composition uninterpretable instead of merely imprecise.",
          "How many times, meaning runs per case and the spread across them, because lesson 1.6 established that one run is a draw and a single-run number carries an unstated error bar frequently larger than the differences being compared. And was it in the training data, where for any public benchmark the answer is probably yes to some degree, which inflates the result in a way that transfers to nothing.",
        ],
        table: {
          head: ["Question", "Why a figure without it is unreadable"],
          rows: [
            {
              label: "What was measured",
              body: "The task and the definition of correct. Accuracy on eight extracted fields against records means something. Quality with no definition means whatever the reader supplies.",
            },
            {
              label: "On what",
              body: "Number, source and composition of the cases. Composition alone moves a number by twenty points, so this is the question doing the most work.",
            },
            {
              label: "How many times",
              body: "Runs per case, and the spread across them. A single-run figure carries an unstated error bar, often wider than the gap it is being used to argue for.",
            },
            {
              label: "In the training data",
              body: "For public benchmarks, probably. The inflation is uneven across models and transfers to no private queue, which corrupts the comparison as well as the level.",
            },
          ],
        },
      },
      {
        title: "Contamination",
        paragraphs: [
          "Models are trained on very large samples of public text, and public benchmarks are public. So the questions and often the answers have plausibly been seen during training, which means part of the measured performance reflects recall instead of capability.",
          "This matters in a specific way, and not as a general caveat. It inflates public benchmark scores relative to private ones, it inflates them unevenly across models depending on what each one absorbed, and none of that inflation transfers to a queue that has never been on the internet. A benchmark comparison between two models is therefore partly a comparison of their training data, which is exactly the wrong thing to be comparing when choosing between them for a workflow.",
          "The practical response is short. Treat public benchmark scores as calibration references instead of capability claims, prefer figures measured on private material, and treat your own twenty cases as the only real evidence about your own work. Where a team has probed contamination directly, by mutating cases while preserving their structure, that is a sign of unusual seriousness and worth noting in a review.",
        ],
      },
      {
        title: "Error bars, plainly",
        paragraphs: [
          "An error bar is the range the number would move within if the whole thing were run again. That is the only intuition required and it does a great deal of work.",
          "It works because differences smaller than the bars are indistinguishable from noise. Two systems at 94% and 91% on twenty cases with three runs each are, in all likelihood, the same system for practical purposes, and choosing between them on that evidence is choosing on nothing at all.",
          "The rule follows. Any comparison should state how many cases and how many runs, and a difference of a few points on a small set means nothing. When someone shows a bar chart with no bars, the honest reading is that the differences are unquantified, and asking how many cases and how many runs tends to end the comparison politely.",
        ],
      },
      {
        title: "Pinning, and why a swap is an event",
        paragraphs: [
          "A figure measured against an unpinned model version has no shelf life, because the version can change beneath it and frequently does. Lesson 2.3 established that capability is jagged and that the gaps move between releases, so an upgrade improving every headline can regress the narrow behavior one workflow depends on.",
          "So the rule is to pin the exact version in production, record it alongside every measured number, and treat a version change as an event measured before it ships. Run the frozen set against the new version, compare, decide. The gateway from lesson 6.5 is what makes that operationally possible, and the trace from lesson 5.7 is what makes it replayable afterwards.",
          "The same discipline applies to somebody else's claim. A number quoted without a version is a number about a moving target, and the follow-up is one line: which version, and measured when.",
        ],
        example: {
          title: "A defensible sentence",
          body: `Seventeen of twenty cases correct on amount and purchase-order number, three runs each, measured on 4 March against a pinned model version, with the composition stated and the three failures listed. Every clause in that sentence exists because one of the four questions demanded it, which is why it survives being read closely.`,
        },
      },
    ],
    misconception: {
      says: "It scores in the top three on the leaderboard.",
      why: "A leaderboard compares systems on a public task whose contents have plausibly been seen during training, using a composition somebody else chose, usually at one run per case. It is informative about relative progress on that task and close to silent about a queue that has never been on the internet. The figure that would settle the question is one measured on twenty of your own cases, and it takes an afternoon to produce.",
    },
    widget: {
      kind: "claims",
      dataset: "benchmark-claims",
      caption:
        "Nine published figures from real-shaped sources. Apply the four questions to each and see what survives, which is usually less than expected.",
    },
    instrument: {
      name: "The four-question card",
      body: "The most portable object in this course. It fits on a phone screen and works on any number anyone puts in front of you.",
      items: [
        "What was measured? The task, and the definition of correct.",
        "On what? How many cases, from where, composed how.",
        "How many times? Runs per case, and the spread.",
        "Was it in the training data? A public benchmark means probably.",
        "Which version, and measured on which date.",
        "A figure answering none of these supports nothing. Say so plainly and move on.",
      ],
    },
    soWhat:
      "You can read any performance claim in under a minute and state exactly what it supports, and explain why an unpinned version leaves every number about that system undated.",
    checks: [
      {
        q: "A vendor chart shows their system beating two competitors, footnoted as internal testing. What is the strongest objection?",
        options: [
          {
            text: "Internal testing is inherently biased.",
            feedback:
              "True and unhelpfully general. It names nothing that would make the chart interpretable.",
            impliesMissing: "A-ERRORBARS",
          },
          {
            text: "The vendor configured the competitors, and configuration is most of the outcome, with no task, composition, run count or version stated.",
            correct: true,
            feedback:
              "Correct, and the configuration point is the sharpest, because module five established that the harness dominates.",
          },
          {
            text: "The percentages are suspiciously round.",
            feedback:
              "Cosmetic. The substantive problems are all in what the footnote leaves out.",
            impliesMissing: "A-ERRORBARS",
          },
        ],
      },
      {
        q: "Why does contamination inflate public benchmark scores in a way that transfers to nothing?",
        options: [
          {
            text: "Because benchmarks are easier than real work.",
            feedback:
              "Often true and a separate issue. Contamination is specifically about prior exposure during training.",
            impliesMissing: "A-CONTAMINATION",
          },
          {
            text: "Because the questions and answers have plausibly been seen in training, so part of the score is recall, and a private queue has never been public.",
            correct: true,
            feedback:
              "Correct, and the inflation is uneven across models, which corrupts the comparison as well as the level.",
          },
          {
            text: "Because benchmarks use synthetic data.",
            feedback:
              "Most are built from real material. The issue is publication instead of synthesis.",
            impliesMissing: "A-CONTAMINATION",
          },
        ],
      },
      {
        q: "A team runs an unpinned model version in production. What follows?",
        options: [
          {
            text: "They automatically get improvements as those ship.",
            feedback:
              "They also get regressions on the narrow behavior their workflow depends on, with no notice and no measurement.",
            impliesMissing: "A-PINNING",
          },
          {
            text: "Every measured number about their system has an unknown shelf life, because the thing measured can change without notice.",
            correct: true,
            feedback:
              "Correct, and the fix is to pin, record the version with every number, and measure each swap on the frozen set before it ships.",
          },
          {
            text: "Nothing, since providers maintain backwards compatibility.",
            feedback:
              "Behavioural compatibility is not offered by anyone, and jaggedness means small changes land unevenly across tasks.",
            impliesMissing: "A-PINNING",
          },
        ],
      },
    ],
    next: "after-it-ships",
    relatedUseCases: ["ap-invoice-exceptions", "asn-invoice-po-recon"],
  },

  {
    slug: "after-it-ships",
    order: 49,
    n: "7.6",
    module: "M7",
    kind: "lesson",
    minutes: 22,
    title: "What happens after it ships?",
    blurb:
      "Models change, vendors update, inputs drift, and new cases arrive. The auto path gets sampled forever, and autonomy moves in both directions.",
    thesis:
      "An evaluation at launch measures one moment while the system, the models and the work all move afterwards, so a defined share of automated items is sampled continuously and autonomy is promoted or demoted on what that sampling shows.",
    lede:
      "Everything so far has been about reaching a launch decision. This lesson is about the fact that a launch decision expires. Three separate things drift, namely the model, the inputs, and the process around both, and none of them announce themselves. A standing scoreboard is what turns that from a discovery into a measurement.",
    youWill: [
      "Name the three things that drift and how each announces itself.",
      "Set a sampling rate that is affordable and sufficient.",
      "Build a scoreboard with promotion and demotion rules.",
      "Read a drift chart and say what happened.",
    ],
    atoms: ["A-SAMPLING", "A-DRIFT", "A-AUTONOMYGRADE"],
    prereqs: ["A-RERUN", "A-AUTONOMYDIAL"],
    ceiling:
      "Three drift sources, a sampling rate, and the promotion and demotion rule. No control-chart methodology; a weekly page and two thresholds do the work.",
    situation: {
      artifact:
        "A drift chart. Accuracy on the sampled auto path holds between 94% and 96% for six months, drops to 88% in month seven, and stays there. No code changed in month seven.",
      prompt: "What are the candidate explanations?",
      options: [
        "The model degraded",
        "A provider-side version change, a shift in the input mix, or an upstream process change",
        "The sampling became less rigorous",
        "Random variation",
      ],
      reveal:
        "The second, and all three are worth checking in that order, because they have different fixes. A provider-side change is caught by pinning and by the version recorded with each result. An input shift shows up in the composition of the sampled items. An upstream process change usually correlates with a date somebody in another team can name. What makes any of this findable is that the sampling never stopped. A team measuring only at launch would have discovered this from a customer.",
    },
    sections: [
      {
        title: "Three things drift",
        paragraphs: [
          "The model drifts because providers update, deprecate and adjust. Pinning reduces this and rarely eliminates it, since serving infrastructure changes beneath a pinned name. It announces itself as a step change on a date, which is why recording the version alongside every measurement matters more than it looks.",
          "The inputs drift because new vendors arrive, formats change, a policy shifts upstream, and the seasonal mix moves. This is the most common source and the slowest, and it announces itself as a gradual decline nobody attributes to anything, because nothing happened.",
          "The process drifts because someone edited a prompt, added a rule, connected another document source, or changed a threshold. Every one of those is a change to the system and most are made without measurement. It announces itself as a step change correlating with something nobody logged. The three signatures differ enough that a scoreboard recording the version, the composition and the change log alongside the number separates them in minutes instead of weeks.",
        ],
      },
      {
        title: "Sampling the auto path",
        paragraphs: [
          "Everything the system handled without a person is unverified by construction, so a defined share gets checked afterwards. That share is a real cost, and the point is to choose it deliberately instead of arriving at zero by default, which is where most deployments end up within a quarter.",
          "A workable pattern starts high, at a quarter or a fifth of automated items while confidence is low, and reduces as evidence accumulates, with a floor that never reaches zero. Sample randomly instead of by exception, because sampling the items that look odd measures the odd ones and the failures that matter look fine. And sample separately by action type, since the consequential classes deserve a higher rate than the harmless ones.",
          "Each sampled item gets scored the way the evaluation scores, which means the answer comes from records instead of from a reviewer's impression. Otherwise the sampling drifts along with everything else it was built to detect.",
        ],
      },
      {
        title: "The scoreboard, and moving in both directions",
        paragraphs: [
          "One page, reviewed weekly, holding volume by type, auto share, sampled accuracy by action type, parked rate, escalation rate, cost per completed item, and the model version currently in production. Seven lines, and every one of them has appeared earlier in this course as something worth knowing on its own.",
          "Two rules attach to it. An action type moves up a level when sampled accuracy holds above a stated threshold across a stated number of items. It moves down when accuracy falls below a second and lower threshold, automatically, meaning without a meeting, because a demotion requiring a discussion will be discussed instead of made.",
          "The parked rate deserves its own watch. A rising parked rate is usually the earliest available signal that the input mix has shifted, and it moves before accuracy does, because the system is declining to guess. Teams treating parking as failure will suppress the one indicator that would have warned them.",
        ],
        example: {
          title: "Week thirty",
          body: `The scoreboard for the running case: 4,180 items, 63% auto, sampled accuracy 95.2% on internal writes and 97.1% on drafts, parked 4.1%, escalated 6.0%, cost per completed item recorded and trending down, and the model version pinned and named. One page, seven lines, reviewed on a Monday by a person whose name is on it.`,
        },
      },
    ],
    misconception: {
      says: "We validated it before launch, and it has been running fine since.",
      why: "Running fine describes an absence of complaints, and the failures that matter here are quiet ones: a wrong internal note, a chase to the wrong contact, a slow decline as the input mix shifts. Without sampling, the first signal is a customer, and by the time it arrives the rate has been wrong for months and every item processed in between is unverified.",
    },
    widget: {
      kind: "evalbench",
      mode: "timeline",
      dataset: "twelve-months",
      caption:
        "Twelve months of sampled accuracy with a silent model swap in month seven. Find it, then check the version column and the composition column to confirm which drift it was.",
    },
    instrument: {
      name: "The standing scoreboard",
      body: "One page, seven lines, reviewed weekly by a named owner. Every line has appeared earlier in this course.",
      items: [
        "Volume by type, and auto share.",
        "Sampled accuracy by action type, with the sampling rate stated beside it.",
        "Parked rate and escalation rate, tracked separately from failures.",
        "Cost per completed item.",
        "Model version in production, and the date it last changed.",
        "The promotion rule and the demotion rule, with thresholds, and demotion automatic.",
      ],
    },
    soWhat:
      "You can design the instrument that keeps a launched system honest, and read a drift chart well enough to say within minutes which of the three causes produced it.",
    checks: [
      {
        q: "Accuracy declines gradually over four months with no changes made. What is the most likely cause?",
        options: [
          {
            text: "Model degradation.",
            feedback:
              "Provider changes land as step changes on a date, and not as a slow slope over a quarter.",
            impliesMissing: "A-DRIFT",
          },
          {
            text: "Input drift, meaning the mix of arriving work has shifted, which is the slow signature.",
            correct: true,
            feedback:
              "Correct, and tracking the composition of sampled items is what makes it visible instead of mysterious.",
          },
          {
            text: "Reviewer fatigue in the sampling process.",
            feedback:
              "Worth checking, and it would show as a change in sampling behavior instead of in accuracy scored from records.",
            impliesMissing: "A-SAMPLING",
          },
        ],
      },
      {
        q: "Why sample randomly instead of sampling the items that look unusual?",
        options: [
          {
            text: "Because random sampling is cheaper.",
            feedback:
              "Cost is similar either way. The reason concerns what each approach is able to measure.",
            impliesMissing: "A-SAMPLING",
          },
          {
            text: "Because sampling by appearance measures the unusual items, and the failures that matter are the ones that look fine.",
            correct: true,
            feedback:
              "Correct. A confidently wrong item looks exactly like a correct one, which is the whole difficulty of this field in one sentence.",
          },
          {
            text: "Because random sampling satisfies auditors.",
            feedback:
              "It may. The analytical reason stands on its own and would hold with no auditor in sight.",
            impliesMissing: "A-SAMPLING",
          },
        ],
      },
      {
        q: "Why must demotion be automatic instead of discussed?",
        options: [
          {
            text: "To reduce meeting load.",
            feedback:
              "A benefit. The reason is behavioral and concerns what happens while the discussion is pending.",
            impliesMissing: "A-AUTONOMYGRADE",
          },
          {
            text: "Because a demotion requiring a decision gets argued about while the system keeps running at a level the evidence no longer supports.",
            correct: true,
            feedback:
              "Correct. Automatic demotion with a later review inverts the default in the direction that costs less when you turn out to be wrong.",
          },
          {
            text: "Because thresholds are objective and judgment is not.",
            feedback:
              "Thresholds embed judgment too. The question is when that judgment gets exercised, and the answer is in advance.",
            impliesMissing: "A-AUTONOMYGRADE",
          },
        ],
      },
    ],
    next: "unit-cost",
    relatedUseCases: ["ap-invoice-exceptions", "bank-rec-exceptions"],
  },
];
