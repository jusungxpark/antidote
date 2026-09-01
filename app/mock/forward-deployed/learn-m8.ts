import type { LearnLesson } from "./learn-types";
import { CASE, CASE_QUEUE } from "./learn-case";

export const M8_LESSONS: LearnLesson[] = [
  {
    slug: "unit-cost",
    order: 50,
    n: "8.1",
    module: "M8",
    kind: "lesson",
    minutes: 24,
    title: "What does a completed unit of work cost?",
    blurb:
      "Cost per completed item against the loaded cost of the person doing it today. The model line is rarely the line that decides it.",
    thesis:
      "The number deciding whether this work is worth doing is the fully loaded cost of one completed item, including the human minutes that remain, compared against an honest baseline for how that item is handled now.",
    lede:
      "Everything in the course converges here. Autonomy share, retry rate, review minutes, context size and escalation rate all appear in one expression, and that expression produces the only figure a finance function will accept. It also produces a surprise that recurs in almost every case: the model is a small term.",
    youWill: [
      "Build a cost per completed item from its components.",
      "Say which line dominates, and why it is almost never tokens.",
      "Construct an honest baseline instead of a flattering one.",
      "Explain why a saved hour becomes a saved cost only when somebody decides it is.",
    ],
    atoms: ["A-UNITCOST", "A-RESIDUAL", "A-BASELINE"],
    prereqs: ["A-INFERSPEND", "A-AUTONOMYDIAL", "A-COMPOUNDING"],
    ceiling:
      "The expression, its terms, and an assumptions ledger. No discounting, no net present value, no financial modelling past the per-item comparison.",
    situation: {
      artifact:
        "Two proposals for the same queue, both illustrative. Proposal A: model spend of $0.04 per item, 70% automated, three minutes of review on the 30% that escalate. Proposal B: model spend of $0.21 per item, 88% automated, three minutes of review on the 12% that escalate.",
      prompt: "Which is cheaper per completed item, at a loaded rate of $60 an hour?",
      options: [
        "A, since its model spend is five times lower",
        "B, because the review minutes dominate",
        "About the same",
        "Cannot be determined",
      ],
      reveal:
        "B, by a wide margin. Proposal A carries 0.30 times three minutes, which is 0.9 minutes of review, and at $60 an hour that is $0.90 an item. Proposal B carries 0.12 times three, or 0.36 minutes, which is $0.36. Totals of roughly $0.94 against roughly $0.57. The model line differs by $0.17 and the human line differs by $0.54, so the more expensive model produces the cheaper system. This shape recurs constantly, and it is why the published per-token price is the wrong anchor for the decision.",
    },
    sections: [
      {
        title: "The expression",
        paragraphs: [
          "Cost per completed item is the sum of five terms, and writing all five down is most of the work. Four of them are routinely omitted, and the omissions all point the same way, which is why so many business cases in this field are optimistic by a factor rather than by a margin.",
          "The one to look at first is the residual, because it is the term that decides the answer and the term that lands in a different budget from the one being defended.",
        ],
        table: {
          head: ["Term", "What goes in it"],
          rows: [
            {
              label: "Model spend",
              body: "Input, output and reasoning tokens at the settings actually being run, times the average number of calls per item. For an agent that means the whole loop and not one call. Usually a fraction of a cent to a few cents.",
            },
            {
              label: "Retry and loop tax",
              body: "Failed calls, reattempts, and items that go round again. Measured instead of assumed, because assumed rates in this field are always lower than measured ones, and this term multiplies everything above it.",
            },
            {
              label: "Residual human minutes",
              body: "The share of items escalated or reviewed, times the minutes each takes, times a loaded hourly rate. Usually the dominant term, and the one most often left out because it sits in a payroll line.",
            },
            {
              label: "Amortised build",
              body: "What it cost to build, spread over the volume it will handle in a sensible period. Connectors, evaluation work, and the ongoing maintenance of both. Large early, and it falls away with volume.",
            },
            {
              label: "Failure cost",
              body: "The error rate times the cost of an error. Small when errors are caught internally, and occasionally the largest term of all when one reaches a customer.",
            },
          ],
        },
      },
      {
        title: "The residual dominates",
        paragraphs: [
          "At any realistic loaded rate, a few minutes of human attention costs more than several dollars of model spend, so the arithmetic settles before anyone argues about providers. Three minutes at $60 an hour is $3.00, and the same item's model spend is measured in cents.",
          "That produces a rule reversing the usual instinct. The lever that matters is the escalation rate and not the token price, because moving escalation from 30% to 12% saves more than eliminating model spend entirely would. Escalation rate is a harness property, produced by better grounding, better verification and a better cascade, which is why module five is where the money turns out to be.",
          "It also explains why a cheaper model can produce a more expensive system, exactly as in the situation above. A weaker model escalates more often, and every escalation costs minutes at a rate that dwarfs the saving.",
        ],
      },
      {
        title: "An honest baseline",
        paragraphs: [
          "The comparison runs against what the item costs today, and there are three ways to get that wrong in the flattering direction. The first is an unloaded rate. A salary divided by hours understates the real figure substantially once benefits, systems, management, space and the cost of replacing someone are included, and the finance function already has a multiplier it uses for exactly this.",
          "The second is measuring the happy path. If the current process takes four minutes when everything is present and eleven when it is not, and a third of items are the second kind, the average is six. Ask for the distribution instead of the typical case, because the typical case is what people remember and the distribution is what the queue does.",
          "The third is counting only touch time. The item also waits, gets handed over, gets asked about, and occasionally gets redone. Cycle time and rework belong in the baseline wherever the case rests on them. And one sentence belongs in every one of these conversations: a saved hour becomes a cost saving only when somebody decides what happens to it. Redeployment is a decision made by a manager and not an outcome produced by a system, and a business case booking savings without naming that decision has booked an intention, which lesson 8.6 takes up in full.",
        ],
        example: {
          title: "Illustrative, and worth redoing on real numbers",
          body: `For ${CASE_QUEUE} at 63% automation: model spend around $0.06 an item, a retry tax around 8%, residual review of 0.37 times four minutes at a loaded $65 an hour giving about $1.60, amortised build around $0.30, and a small failure cost because errors are caught internally. Roughly $2.00 an item against a baseline near $5.20. Every figure here is illustrative and needs measuring on the actual queue before anyone commits to it.`,
        },
      },
      {
        title: "The assumptions ledger",
        paragraphs: [
          "Every input carries a label. Measured means it came from an instrument. Modelled means it was derived from measured things through stated steps. Assumed means somebody chose it.",
          "Labelling takes ten minutes and it changes the conversation, because it makes visible that the case usually rests on two or three assumed numbers: the escalation rate, the review minutes, and the volume. Those three get measured first and everything else can wait.",
          "It also protects the case. A model with a labelled ledger survives a challenge to one input, because a reader can see which conclusions depend on it and which do not. A model with unlabelled numbers loses the whole argument the moment one figure is questioned, which is a bad trade for ten minutes of work.",
        ],
      },
    ],
    misconception: {
      says: "We cut our AI spend by 80% by switching to a cheaper model.",
      why: "That describes one term of five. A weaker model escalates more often, and escalation costs human minutes at a loaded rate where model spend costs cents, so the total per completed item can rise while the provider invoice falls. The saving moves into a payroll line where nobody attributes it to the switch, which is what makes this particular claim so durable.",
    },
    widget: {
      kind: "econ",
      mode: "unit",
      dataset: "invoice-queue",
      caption:
        "Build the full cost per completed item. Adjust automation share, review minutes and token price, and watch which line dominates. It is almost never the tokens.",
    },
    instrument: {
      name: "The unit-economics model",
      body: "One sheet per queue, with every input labelled measured, modeled or assumed.",
      items: [
        "Model spend per item: tokens at your settings, times calls per item.",
        "Retry and loop tax, measured and never assumed.",
        "Residual human minutes: escalation share times minutes times a loaded rate from finance.",
        "Amortised build and maintenance over a realistic volume.",
        "Failure cost: error rate times cost per error, split into internal and external.",
        "Baseline: loaded, taken from the distribution instead of the happy path, with rework and cycle time where they matter.",
        "Label every input, then measure the two or three the case actually rests on.",
      ],
    },
    soWhat:
      "You can produce the figure a finance function will accept, and explain why the lever that moves it is the escalation rate instead of the model price, which redirects the whole improvement effort toward the harness.",
    checks: [
      {
        q: "Which term usually dominates cost per completed item?",
        options: [
          {
            text: "Model spend, since it scales with volume.",
            feedback:
              "It scales, and it is measured in cents against human minutes measured in dollars.",
            impliesMissing: "A-UNITCOST",
          },
          {
            text: "Residual human minutes on the escalated share, at a loaded rate.",
            correct: true,
            feedback:
              "Correct, which makes escalation rate the lever, and escalation rate is a harness property.",
          },
          {
            text: "Amortised build cost.",
            feedback:
              "Large early and it falls away with volume, whereas the residual persists at every volume.",
            impliesMissing: "A-RESIDUAL",
          },
        ],
      },
      {
        q: "What makes a baseline dishonest in the flattering direction?",
        options: [
          {
            text: "Using last year's volumes.",
            feedback:
              "A real error, and it moves the total instead of the per-item comparison this rests on.",
            impliesMissing: "A-BASELINE",
          },
          {
            text: "An unloaded hourly rate, and timing the happy path instead of the distribution.",
            correct: true,
            feedback:
              "Correct, and both are common because both are the easier number to obtain.",
          },
          {
            text: "Including rework in the current process.",
            feedback:
              "Rework belongs in the baseline. Leaving it out is what flatters the comparison.",
            impliesMissing: "A-BASELINE",
          },
        ],
      },
      {
        q: "A case books savings from 4,000 hours of freed time. What is missing?",
        options: [
          {
            text: "The hourly rate used.",
            feedback:
              "Usually present. Something more fundamental is absent from the case.",
            impliesMissing: "A-BASELINE",
          },
          {
            text: "The decision about what happens to the time, since freed hours become a saving only when somebody redeploys or removes them.",
            correct: true,
            feedback:
              "Correct, and naming the person who makes that decision converts an intention into a plan.",
          },
          {
            text: "The confidence interval on the estimate.",
            feedback:
              "Worth having, and secondary to whether the saving is a saving at all.",
            impliesMissing: "A-RESIDUAL",
          },
        ],
      },
    ],
    next: "which-work",
    relatedUseCases: ["ap-invoice-exceptions", "shared-inbox-triage"],
  },

  {
    slug: "which-work",
    order: 51,
    n: "8.2",
    module: "M8",
    kind: "lesson",
    minutes: 22,
    title: "Which work is even a candidate?",
    blurb:
      "High volume, language-heavy, exception-tailed, verifiable. The strongest single predictor is whether correctness is cheap to check.",
    thesis:
      "Candidate work scores well on five dimensions, and the one predicting success best is verification cost, because work whose output can be checked cheaply can be automated safely long before the system is uniformly accurate.",
    lede:
      "Programmes usually start with the most strategic process, which is almost always the wrong choice. Strategic work is low volume, judgment-heavy and hard to check, so it is the last thing that should be attempted and the first thing that gets proposed. Scoring candidates on five dimensions takes an afternoon and reliably produces a different ranking from the one the room started with.",
    youWill: [
      "Score any queue on five dimensions.",
      "Explain why verification cost dominates the ranking.",
      "Produce a ranked shortlist that survives a steering committee.",
    ],
    atoms: ["A-CANDIDATE", "A-VERIFYCOST"],
    prereqs: ["A-UNITCOST", "A-OPENCLOSED", "A-FOURJOBS"],
    ceiling:
      "Five dimensions and the reasoning behind their weighting. No scoring formula presented as authoritative; the ranking is a conversation aid and the conversation is the point.",
    situation: {
      artifact:
        "Four candidates. A: pricing strategy, 30 decisions a year, high value, correctness debatable for months. B: vendor invoice exceptions, 4,200 a month, correctness checkable against records within minutes. C: contract review for a quarterly negotiation, 12 a year, high value, expert judgment. D: employee IT access requests, 900 a month, correctness checkable against a policy table.",
      prompt: "Rank them.",
      options: [
        "A, C, B, D, by strategic value",
        "B, D, C, A, by volume and checkability",
        "B, D, A, C",
        "D, B, A, C",
      ],
      reveal:
        "B then D, comfortably, and the ordering of A against C matters little because neither should be attempted early. High volume plus cheap verification is the combination letting a system earn autonomy through evidence, and both B and D have it. A and C carry the value making them attractive in a steering committee and the properties making them last. Ranking by strategic value inverts the correct order almost exactly.",
    },
    sections: [
      {
        title: "Five dimensions",
        paragraphs: [
          "Volume comes first, meaning how many items a month. Volume creates the evidence autonomy requires, spreads the build cost, and turns a small per-item saving into a real number. Under a few hundred items a month the build cost rarely amortises at all.",
          "Language content is second: how much of the work is reading or writing unstructured material. Where the answer is none, the era from lesson 1.1 is the wrong one and the right tool is a rule or a feed. The exception tail is third, meaning whether the work has irregular cases resisting enumeration. A queue with no tail wants a workflow and possibly no model at all, while a queue that is entirely tail is judgment work belonging to a person. The productive shape has both.",
          "Verification cost is fourth and it dominates the other four, which the next section takes up. Consequence and reversibility come fifth: what a wrong item costs and whether it can be undone. High consequence pushes an item toward gates instead of away from automation, and it raises the evidence bar considerably before anything is granted.",
        ],
      },
      {
        title: "Why verification cost dominates",
        paragraphs: [
          "If correctness can be established cheaply and immediately, three things follow at once. Errors get caught before they propagate, which converts an error rate into a cost of rework instead of an incident rate. Evidence accumulates quickly, so autonomy can be earned through measurement instead of argued for in a meeting. And the residual human effort falls, because checking is faster than doing.",
          "If correctness can only be established slowly, expensively, or by argument, none of the three hold. The system may well be right and nobody can demonstrate it, so autonomy stays low, review stays expensive, and the economics from lesson 8.1 never arrive.",
          "This is why invoice matching automates before pricing strategy, and why access provisioning automates before contract negotiation. The determinant is checkability and not difficulty, and the two are frequently uncorrelated, which is what makes the ranking counterintuitive to a room that has been discussing value.",
        ],
      },
      {
        title: "Scoring a shortlist",
        paragraphs: [
          "Take six to ten candidate queues, score each dimension from one to five, and rank them. The absolute numbers matter far less than the conversation, which surfaces two things reliably.",
          "The first is that the queue everyone assumed was obvious frequently scores poorly on verification, and somebody in the room already knew why and had never been asked. The second is that a queue nobody proposed scores well on everything and has been invisible because it is unglamorous. Access provisioning, timesheet approvals, certificate chasing and document collection all share that property: high volume, checkable, tedious, and absent from every strategy deck. The queue in the running case scores well across the board, with real volume, heavy language content, a genuine tail of seven exception types, and correctness checkable against the ERP within minutes; its consequence is moderate and reversible for internal notes and higher for external sends, which sets where the gates go instead of whether to proceed.",
          "The output is a ranked shortlist with a written reason against each rank, and the reasons are what survive a steering committee. A ranking without reasons gets relitigated at the next meeting. A ranking with reasons gets refined.",
        ],
      },
    ],
    widget: {
      kind: "sorter",
      dataset: "queue-scorecard",
      caption:
        "Ten queues from one company, scored on five dimensions. Rank them, then compare against the ranking the executive team produced.",
    },
    instrument: {
      name: "The queue scorecard",
      body: "One row per candidate, five dimensions, a written reason per rank. An afternoon, and it usually reorders the programme.",
      items: [
        "Volume per month. Under a few hundred, the build cost rarely amortises.",
        "Language content: what share of the work is reading or writing unstructured material?",
        "Exception tail: what share is irregular, and can the regular part be enumerated?",
        "Verification cost: how, how fast, and how cheaply can correctness be established?",
        "Consequence and reversibility of a wrong item.",
        "Rank, with one written sentence per rank. The sentences are what survive the committee.",
      ],
    },
    soWhat:
      "You can produce a defensible shortlist in an afternoon, and explain why the obvious strategic candidate belongs at the bottom of it without appearing to lack ambition.",
    checks: [
      {
        q: "Why does verification cost dominate the ranking?",
        options: [
          {
            text: "Because it determines how accurate the system needs to be.",
            feedback:
              "Related, and backwards. Cheap checking means the system can fall short of uniform accuracy and still be safe.",
            impliesMissing: "A-VERIFYCOST",
          },
          {
            text: "Because cheap checking catches errors before they propagate, produces evidence quickly, and lowers the residual human cost.",
            correct: true,
            feedback:
              "Correct. All three of the things that make the economics work depend on it.",
          },
          {
            text: "Because auditors require verifiable processes.",
            feedback:
              "They may, and the operational argument holds with no auditor involved.",
            impliesMissing: "A-VERIFYCOST",
          },
        ],
      },
      {
        q: "A queue has 80 items a month, all irregular, each taking two hours of expert judgment. What is the right response?",
        options: [
          {
            text: "A strong candidate, since the time saving per item is large.",
            feedback:
              "Low volume means no evidence and no amortisation, and an all-tail queue means the judgment is the work.",
            impliesMissing: "A-CANDIDATE",
          },
          {
            text: "A poor automation candidate, and possibly a good candidate for assistance that leaves the expert doing the judging.",
            correct: true,
            feedback:
              "Correct, and naming it as assistance sets the right expectation about what will move.",
          },
          {
            text: "Automate it with a high review rate.",
            feedback:
              "High review on low volume means an expert checking an assistant on work they could have done directly.",
            impliesMissing: "A-CANDIDATE",
          },
        ],
      },
      {
        q: "Which of these is most likely to be missing from a strategy deck and to score well?",
        options: [
          {
            text: "Pricing optimization.",
            feedback:
              "Present in every deck, and it usually scores poorly on volume and on verification at once.",
            impliesMissing: "A-CANDIDATE",
          },
          {
            text: "Certificate chasing, access provisioning, timesheet approvals.",
            correct: true,
            feedback:
              "Correct. High volume, checkable, tedious, unglamorous, and invisible to strategy exercises for exactly that reason.",
          },
          {
            text: "Strategic planning support.",
            feedback:
              "Low volume, judgment-heavy, and unverifiable for months. The archetype of the wrong first choice.",
            impliesMissing: "A-VERIFYCOST",
          },
        ],
      },
    ],
    next: "minimum-stack",
    relatedUseCases: ["joiner-access-provisioning", "timesheet-client-approvals"],
  },

  {
    slug: "minimum-stack",
    order: 52,
    n: "8.3",
    module: "M8",
    kind: "lesson",
    minutes: 24,
    title: "What has to exist before you shop for a model?",
    blurb:
      "A named queue, a written playbook, a system of record, a gate, a frozen set, and a scoreboard. Then stage it: packet, draft, one allowlisted write.",
    thesis:
      "Six things have to exist before a model choice can matter, and the deployment then proceeds in three stages that each earn the next, which is why programmes beginning with a model bake-off spend months without producing evidence.",
    lede:
      "This is the practical assembly of the whole course. Every item on the list has appeared already with the reasoning behind it, so the list reads as obvious, which is exactly the point. It is obvious afterwards and it is almost never the order things happen in, because a model comparison is easy to start and a playbook is not.",
    youWill: [
      "List the six prerequisites and say why each blocks the others.",
      "Stage a deployment through packet, draft and one write.",
      "Write exit criteria per stage instead of a go-live date.",
      "Explain why a model bake-off first wastes a quarter.",
    ],
    atoms: ["A-MINSTACK", "A-STAGING"],
    prereqs: ["A-FIVESUBSYSTEMS", "A-FROZENSET", "A-AUTONOMYDIAL"],
    ceiling:
      "Six prerequisites and three stages with exit criteria. Programme management past one queue belongs to lesson 8.7.",
    situation: {
      artifact:
        "A programme plan. Month one, evaluate four vendors and three models. Month two, select. Month three, integrate. Month four, pilot. Month six, scale.",
      prompt: "What is wrong with the sequence?",
      options: [
        "Nothing, since it is a standard procurement plan",
        "It is too slow",
        "Months one and two produce no comparable evidence, because nothing exists yet to compare against",
        "Integration should come before selection",
      ],
      reveal:
        "The third. In month one there is no named queue, no frozen set and no definition of correct, so the evaluation compares vendor demos on vendor cases. Two months later a selection has been made on the strength of presentation quality. Reversing the first two months costs the same calendar time and produces a selection resting on twenty of your own cases, which is a different decision entirely and a defensible one.",
    },
    sections: [
      {
        title: "The six",
        paragraphs: [
          "A named queue with an owner comes first: one queue, one accountable person, and a number describing it today. Without an owner every subsequent decision has no venue and no one to make it. A written playbook is second, covering how the work is done now including the exception types and what happens to each. This is lesson 5.3's task specification, and writing it is where most of the learning happens, because the procedure has usually never been written down and three people usually turn out to do it differently.",
          "A system of record is third, meaning where the truth lives and where results get written back. Without it, lesson 5.4's memory problem has no solution and the work accumulates in a shadow ledger. A gate is fourth: the point where a person approves the class of action needing approval, from module six, defined before anything runs instead of added after an incident.",
          "A frozen set is fifth, meaning twenty items and a scoring rule from lesson 7.2, which is the artifact making every subsequent choice measurable and which costs an afternoon. A scoreboard is sixth: the seven lines from lesson 7.6, with a named owner and a weekly review. It starts empty, and its structure decides what gets watched for the life of the system.",
        ],
      },
      {
        title: "Three stages",
        paragraphs: [
          "The packet stage has the system assemble the material a person would need and present it, doing nothing else. Low risk, immediately useful, and it tests the hardest engineering, meaning the fetches and the integrations, before anything depends on the model's judgment. It also produces the first honest measurement of how often the required material can be found at all, which is frequently the finding of the entire stage.",
          "The draft stage has the system propose an action and a person execute it. This is where the frozen set earns its keep, because acceptance rate becomes measurable and failures are visible without being consequential. Most of the eventual value is visible here, and a surprising number of deployments could stop at this stage and still pay for themselves.",
          "The third stage adds one allowlisted write: a single action type, a single narrow scope, sampled heavily. From module six, internal before external and reversible before irreversible, with a sampling rate starting high and falling as evidence accumulates. Each stage exits on criteria instead of a date. Packet exits when the material is assembled correctly on a stated share of items. Draft exits when acceptance holds above a threshold across a stated number of items. The write stage expands one action type at a time, each earning its own evidence before the next.",
        ],
        example: {
          title: "Before choosing anything",
          body: `For the running case, all six exist before a single candidate is evaluated: the queue is named with an owner, the playbook covers seven exception types, the ERP is the system of record, external sends are gated, twenty cases with answers from records and a written scoring rule are in a file, and a scoreboard with seven empty lines is on a wall. Then the candidates get run.`,
        },
      },
      {
        title: "Why a bake-off first wastes a quarter",
        paragraphs: [
          "Without a frozen set, the comparison runs on vendor material with vendor configuration, which lesson 7.5 established measures configuration and not capability. Without a playbook, nobody can say what correct means, so the assessment falls back on how the output reads. Without a named queue, the comparison covers a general capability instead of the work.",
          "The result is a selection made on presentation quality and defended with a scorecard assigning weights to criteria nobody measured. Three months later the chosen system underperforms and no diagnosis is available, because no baseline exists to diagnose against.",
          "The alternative costs the same calendar time. Build the six prerequisites in month one, which is mostly writing and needs no vendor, then run every candidate against your twenty cases in month two. The selection now rests on a number about your own work, and the artifacts built to produce it are the artifacts the system was going to need regardless of who won.",
        ],
      },
    ],
    widget: {
      kind: "trace",
      mode: "stage",
      dataset: "staging",
      caption:
        "Stage the invoice queue through packet, draft and one write. Watch review load, cost and exposure at each stage, and read the exit criteria that gate the next.",
    },
    instrument: {
      name: "The staging plan",
      body: "Three stages, exit criteria per stage, no dates. One page, agreed with the queue owner before anything is built.",
      items: [
        "Packet: assemble and present. Exits when the material is found and correct on a stated share of items.",
        "Draft: propose, and a person executes. Exits when acceptance holds above a threshold over a stated number of items.",
        "One write: a single action type, narrow scope, heavy sampling. Expands one action type at a time.",
        "For each stage, what is measured, by whom, and where it appears on the scoreboard.",
        "For each stage, what would send it back a stage, decided in advance.",
        "Confirmation that all six prerequisites exist before the packet stage begins.",
      ],
    },
    soWhat:
      "You can sequence a deployment so every stage produces the evidence for the next, and explain why the month spent writing before any model is chosen is the month making that choice meaningful.",
    checks: [
      {
        q: "Which prerequisite most often turns out to be missing?",
        options: [
          {
            text: "The system of record.",
            feedback:
              "Almost always present, since the business already runs on it every day.",
            impliesMissing: "A-MINSTACK",
          },
          {
            text: "The written playbook, since the procedure has usually never been written down anywhere.",
            correct: true,
            feedback:
              "Correct, and writing it is where most of the learning happens, including the discovery that three people do the job differently.",
          },
          {
            text: "The model.",
            feedback:
              "Available to anyone within minutes, which is precisely why starting there feels productive.",
            impliesMissing: "A-MINSTACK",
          },
        ],
      },
      {
        q: "Why does the packet stage come first?",
        options: [
          {
            text: "Because it is the easiest to build.",
            feedback:
              "Often the hardest, since it requires the integrations, and that is part of why it comes first.",
            impliesMissing: "A-STAGING",
          },
          {
            text: "Because it tests the fetches and integrations while nothing depends on judgment, and it measures how often the required material can be found at all.",
            correct: true,
            feedback:
              "Correct, and that second measurement is frequently the finding of the whole stage.",
          },
          {
            text: "Because users need to build trust gradually.",
            feedback:
              "A real benefit and a secondary one. The primary reason concerns what gets tested and measured.",
            impliesMissing: "A-STAGING",
          },
        ],
      },
      {
        q: "What should gate the move from one stage to the next?",
        options: [
          {
            text: "A date agreed in the programme plan.",
            feedback:
              "Dates arrive whether or not the evidence does, which is how stages get skipped without anyone deciding to skip them.",
            impliesMissing: "A-STAGING",
          },
          {
            text: "Exit criteria, meaning a measured threshold held across a stated number of items.",
            correct: true,
            feedback:
              "Correct, and the criteria for going back a stage should be written at the same moment.",
          },
          {
            text: "Stakeholder confidence.",
            feedback:
              "Confidence follows evidence when the evidence exists, and substitutes for it when it does not.",
            impliesMissing: "A-STAGING",
          },
        ],
      },
    ],
    next: "build-buy-wrap",
    relatedUseCases: ["ap-invoice-exceptions", "vendor-onboarding-packs"],
  },

  {
    slug: "build-buy-wrap",
    order: 53,
    n: "8.4",
    module: "M8",
    kind: "lesson",
    minutes: 22,
    title: "Build, buy, or wrap?",
    blurb:
      "You are buying a harness, not intelligence. The durable parts are data access, integrations, workflow ownership and accumulated evals.",
    thesis:
      "Since the model is rented by everyone at the same price, the build-or-buy question becomes which parts of the harness are being bought and how long a competent team would need to rebuild them, and the components nobody can obtain are the actual moat.",
    lede:
      "Two lazy sentences dominate this conversation. It is just a wrapper, used to dismiss, and it is proprietary AI, used to justify. Both skip the analysis, which takes an afternoon and produces a component list with a time and a cost against each line. The output is useful whether you are buying, building, or assessing somebody else's business.",
    youWill: [
      "Decompose a product into components and classify each as rentable, buildable or foreclosed.",
      "Estimate what a competent team would need to rebuild the buildable parts.",
      "Say what makes a component foreclosed, which is the only durable position.",
      "Apply the same analysis in the mirror, to your own build.",
    ],
    atoms: ["A-BUILDBUY", "A-REBUILDCOST", "A-MOAT"],
    prereqs: ["A-HARNESS", "A-CUSTOMMODEL", "A-UNITCOST"],
    ceiling:
      "Component decomposition with ranges and a foreclosed category. Ranges are modeled estimates carrying an assumptions ledger and never presented as measurements. This is analysis of an operating decision and not investment advice.",
    situation: {
      artifact:
        "A vendor selling exception handling for accounts payable. Components: a frontier model called through an API, a document extraction schema, connectors to four ERP systems, an exception playbook covering nine types, an evaluation set of 1,400 cases built from four years of customer failures, and a permission model with per-customer autonomy grids.",
      prompt: "Which components are hard to reproduce?",
      options: [
        "The model, since it is the core capability",
        "The extraction schema and the playbook",
        "The connectors and the evaluation set",
        "All of them equally",
      ],
      reveal:
        "The connectors and the evaluation set, and they are hard for different reasons. Connectors take calendar time and counterparty cooperation that money alone cannot compress. The evaluation set encodes four years of real failures across many customers, which is unavailable at any price to a new entrant because it requires having operated. The model is rentable in an afternoon. The schema and the playbook are weeks of work for a competent team who has seen the outputs. The honest moat is two components out of six, which is a perfectly good moat and considerably better than a proprietary-model claim would have been.",
    },
    sections: [
      {
        title: "Three classes of component",
        paragraphs: [
          "Rentable components are available to anyone at a published price: the model, the vector store, the orchestration framework, the observability tool. Nothing in this class is a moat for anybody, the incumbent included, and a pitch resting on one is describing a purchase order.",
          "Buildable components are reproducible by a competent team with time and money: schemas, prompts, playbooks, most integrations, the interface. The question here is how long, and the honest answers are usually shorter than incumbents claim and longer than challengers assume. A head start is worth something and it depreciates on a schedule you can estimate.",
          "Foreclosed components are unobtainable to a new entrant at any reasonable cost. Signed data access nobody else can get. Integrations requiring a counterparty's cooperation that takes quarters to secure. Regulatory approvals with waiting periods. An evaluation corpus derived from years of real operation. Switching costs embedded in a customer's own process. The moat is the foreclosed list, and everything else is a head start.",
        ],
      },
      {
        title: "Estimating the rebuild",
        paragraphs: [
          "For the buildable components, estimate ranges instead of points and label every input as modeled or assumed. Engineering months per component, taken from comparable work. Integration cost per system, which varies enormously by counterparty and is dominated by their willingness more than by the technical work. Compliance and certification durations, which are calendar time and not effort. And customer-side migration friction, which is frequently the largest number and the one most often omitted, because it sits on the other side of the boundary from whoever is doing the estimating.",
          "The output is a range in months and a range in money with a stated set of assumptions. It is a modeled estimate and it should be labelled as one everywhere it appears, because presenting a modeled range as a measurement is precisely the failure module seven spent six lessons preventing.",
          "The verdict follows a fixed sentence shape, which is what keeps it honest. At the stated assumptions, a funded team reaches parity on the following subset in X to Y months for A to B, and the components remaining out of reach are these.",
        ],
      },
      {
        title: "The same analysis, in the mirror",
        paragraphs: [
          "The decomposition works just as well on a proposed build. List what you would build, classify each component, and check what the build is actually buying you. If every component is rentable or cheaply buildable, buying is usually correct, because a vendor amortises the same work across many customers and will out-invest a single internal team on the parts that are common to all of them.",
          "If the value depends on foreclosed components you already hold, meaning your data, your integrations, your ownership of the process, then building can be right, because the vendor's advantage on the common parts is smaller than your advantage on the specific ones.",
          "The hybrid that most often wins is to buy the common harness and keep the foreclosed components in your own systems, so that switching later costs weeks instead of quarters. That means owning the traces, owning the evaluation set, and writing outcomes into your own systems of record, three things this course recommended for entirely separate reasons and which turn out to be a negotiating position as well.",
        ],
        example: {
          title: "Six components, two that matter",
          body: `For the running case: the model and the orchestration are rentable; the extraction schema and the seven-type playbook are buildable in weeks; the ERP connector is buildable and calendar-bound by the ERP vendor's own timetable; and four years of accumulated exception cases would be foreclosed to a new entrant. If the decision is to buy, the evaluation set and the traces stay in your own environment.`,
        },
      },
    ],
    misconception: {
      says: "It is just a wrapper around a frontier model.",
      why: "True of the model layer and silent about everything else. The dismissal and its mirror, proprietary AI, both skip the component decomposition, which takes an afternoon and produces a list where two or three items usually carry the entire defensibility while the rest are a depreciating head start. Both sentences are ways of avoiding an analysis that would settle the question either way.",
    },
    widget: {
      kind: "econ",
      mode: "rebuild",
      dataset: "rebuild",
      caption:
        "Decompose a product into components with effort ranges. Mark the foreclosed ones and watch the time-to-parity estimate change. The ranges are modeled, and labelled as such.",
    },
    instrument: {
      name: "The rebuild worksheet",
      body: "One row per component, ranges instead of points, every input labelled, and the verdict in the fixed sentence shape.",
      items: [
        "List every component of the product or the proposed build.",
        "Classify each one: rentable, buildable, foreclosed.",
        "For buildable components, engineering months and cost as a range, with the comparable it rests on.",
        "For integrations, calendar time driven by the counterparty, stated separately from engineering effort.",
        "Customer-side migration friction, which is frequently the largest number.",
        "The verdict: at these assumptions, parity on this subset in X to Y months for A to B, with these components out of reach.",
        "A label on every figure, modeled or assumed. None of them are measurements.",
      ],
    },
    soWhat:
      "You can replace the two lazy sentences with a component list saying exactly where the defensibility sits, which works equally for a buying decision, a build decision, and an assessment of somebody else's business.",
    checks: [
      {
        q: "Which component is most likely to be foreclosed in fact?",
        options: [
          {
            text: "The prompt library, refined over two years.",
            feedback:
              "Reproducible in weeks by a competent team who has studied the outputs, as lesson 3.3 established.",
            impliesMissing: "A-MOAT",
          },
          {
            text: "An evaluation corpus built from four years of real customer failures.",
            correct: true,
            feedback:
              "Correct. It requires having operated, which is unavailable at any price to a new entrant.",
          },
          {
            text: "The choice of model provider.",
            feedback:
              "Rentable this afternoon by anyone, at the same published price.",
            impliesMissing: "A-BUILDBUY",
          },
        ],
      },
      {
        q: "Which cost is most often omitted from a rebuild estimate?",
        options: [
          {
            text: "Model inference cost.",
            feedback:
              "Always included, because it is the visible line on somebody's invoice.",
            impliesMissing: "A-REBUILDCOST",
          },
          {
            text: "Customer-side migration friction, meaning history, retraining and parallel running.",
            correct: true,
            feedback:
              "Correct. It sits on the other side of the boundary, so it gets omitted, and it is frequently the largest number.",
          },
          {
            text: "Engineering salaries.",
            feedback:
              "The first thing anyone estimates, and usually the only thing.",
            impliesMissing: "A-REBUILDCOST",
          },
        ],
      },
      {
        q: "You buy instead of building. What should you insist on keeping?",
        options: [
          {
            text: "Source code access.",
            feedback:
              "Rarely available and rarely useful, since the components that would matter are the operational ones.",
            impliesMissing: "A-BUILDBUY",
          },
          {
            text: "The evaluation set, the traces, and outcomes written into your own systems of record.",
            correct: true,
            feedback:
              "Correct. All three were recommended earlier for other reasons and they double as a position that makes switching cost weeks instead of quarters.",
          },
          {
            text: "A price cap for five years.",
            feedback:
              "Worth having commercially, and it does nothing about the dependency itself.",
            impliesMissing: "A-MOAT",
          },
        ],
      },
    ],
    next: "diligencing-a-claim",
    relatedUseCases: ["rfp-response-assembly", "vendor-onboarding-packs"],
  },

  {
    slug: "diligencing-a-claim",
    order: 54,
    n: "8.5",
    module: "M8",
    kind: "lesson",
    minutes: 24,
    title: "How do you diligence an AI claim?",
    blurb:
      "Every claim resolves to an artifact: a tool list, a trace, a frozen set, a scoreboard, an autonomy grid, an egress register. A claim with no artifact is a sentence.",
    thesis:
      "Assessing any claim about an AI system reduces to naming the artifact that would settle it and asking for that artifact, and the absence of an artifact is itself a finding instead of an inconvenience.",
    lede:
      "This is the lesson the whole course was built to reach. Every module has produced an artifact, and this one puts them in a single list mapped to the claims they settle. It fits on a page and it works in a vendor meeting, a management review or a diligence process, which is the point of building it in that order.",
    youWill: [
      "Map any claim to the artifact that would settle it.",
      "Classify what you are told as measured, modeled, declared or unknown.",
      "Produce a prioritised request list from a presentation.",
      "Read an absent artifact as information instead of as an obstacle.",
    ],
    atoms: ["A-ARTIFACTDEMAND", "A-CLAIMCLASS"],
    prereqs: ["A-TRACE", "A-FROZENSET", "A-FIVESUBSYSTEMS", "A-AUTONOMYDIAL"],
    ceiling:
      "The claim-to-artifact map and the four evidence classes. Assembling them into a written assessment is Clinic 4.",
    situation: {
      artifact:
        "A management presentation with five claims. Our AI resolves 60% of exceptions end to end. Accuracy is 94%. It is fully auditable. We have guardrails and human oversight. Our proprietary model is trained on our data.",
      prompt: "Which single request would tell you the most?",
      options: [
        "The 94% accuracy methodology",
        "The tool list as configured in production",
        "The model architecture",
        "Customer references",
      ],
      reveal:
        "The tool list, and it settles three of the five claims at once. It shows what actions exist and which of them have external effects, which is what fixes the meaning of resolves end to end. It shows whether human oversight has anything to attach to. And it bounds every risk conversation that follows. One page, usually available within minutes, and the reaction to the request carries information of its own.",
    },
    sections: [
      {
        title: "The claim-to-artifact map",
        paragraphs: [
          "Every claim in this field maps to something inspectable, and once the map is in your head the assessment becomes fast enough to run inside a meeting. The discipline is to name the artifact before hearing the answer, so the conversation moves to a document instead of to a longer version of the claim.",
          "Two more sit outside the table and belong on the list. A claim that the system learns and improves maps to the memory placement from lesson 5.4, meaning what writes through, to where, and what survives the contract. A claim that it is cheaper maps to the unit-economics model with its assumptions ledger, and a claim that data stays safe maps to the egress register with the four questions answered in writing.",
        ],
        table: {
          head: ["The claim", "The artifact that settles it"],
          rows: [
            {
              label: "Resolves items end to end",
              body: "The tool list plus the autonomy grid: which actions exist, which have external effects, and which of them run without a person.",
            },
            {
              label: "It is X% accurate",
              body: "The evaluation one-pager: which set, which scoring rule, how many runs, which pinned version, which date, and the failures listed.",
            },
            {
              label: "It is fully auditable",
              body: "A real trace from last week carrying all six fields from lesson 5.7. A timeline of statuses is a status log wearing the name.",
            },
            {
              label: "We have guardrails and oversight",
              body: "The guardrail inventory: which controls can refuse, and what each of them refused this month. A control that has never fired is either perfect or inert.",
            },
            {
              label: "Our proprietary model",
              body: "The four-layer decoder from lesson 3.3: which base, what was changed, how many examples, and what the deprecation plan is.",
            },
            {
              label: "It is secure",
              body: "The identity and scope sheet plus the blast-radius map. What the agent runs as, what it can reach, and what one bad input touches.",
            },
          ],
        },
      },
      {
        title: "Four evidence classes",
        paragraphs: [
          "Label everything you are told, because the label decides how much weight it carries and makes a written assessment possible afterwards. Measured means produced by an instrument on a stated set, with a date and a version attached. It is the strongest class and the rarest. Modelled means derived from measured inputs through stated assumptions, which is legitimate when the assumptions are visible, and most economics belongs here.",
          "Declared means asserted by a party with an interest. That is not worthless, since many declared statements are perfectly true, and it means the claim rests on the speaker's credibility instead of on evidence. Unknown means nobody has measured this, including them, and it is the honest label for a great deal of what gets presented as measured.",
          "An assessment labelling every claim is far more useful than one ranking them, because the labels tell a reader what would change the verdict. A claim marked unknown with a named artifact beside it is a piece of work somebody can go and do.",
        ],
      },
      {
        title: "Reading an absence",
        paragraphs: [
          "When an artifact does not exist, that fact is information about how the system was built and not an obstacle to assessing it. Each absence has a specific consequence worth naming out loud.",
          "No trace means the team cannot debug their own failures, so they cannot diagnose the incident that will eventually happen. No frozen set means every improvement claim is an impression and every model upgrade is a leap. No tool list means nobody has bounded what the system can do, so nobody has assessed the blast radius. No autonomy grid means autonomy was granted instead of earned. No egress register means the data question gets settled during an incident.",
          "None of those is disqualifying on its own, and each is a specific, costed piece of work that can become a condition. That framing is usually welcomed on both sides, because it converts a vague concern into a plan with a price on it.",
        ],
        example: {
          title: "Two conversations",
          body: `A vendor for the running case produces a tool list in ten minutes, a trace from last week within the hour, an evaluation one-pager with 140 cases and dates, and an autonomy grid with evidence recorded per cell. A second vendor offers a dashboard and three references. Same model underneath, same claims in the deck, and the second conversation has already told you what it needed to.`,
        },
      },
    ],
    misconception: {
      says: "We cannot share that, it is commercially sensitive.",
      why: "Every artifact on the list can be shared in a form that settles the question without disclosing anything valuable: a tool list with names and effect classes, a trace with the payload redacted, an evaluation one-pager without the cases, an autonomy grid without the customer named. A refusal covering the whole class of artifacts usually means the artifacts do not exist, which is why the reaction to the request is worth as much as the answer.",
    },
    widget: {
      kind: "claims",
      dataset: "deck-claims",
      caption:
        "Twelve claims from a real-shaped deck. Classify each one, name the artifact that would settle it, and build the prioritised request list.",
    },
    instrument: {
      name: "The artifact demand list",
      body: "The instrument this course exists to hand over. Asked in this order, because the first request settles three claims at once.",
      items: [
        "The tool list as configured in production, with effect classes.",
        "A real trace from last week, carrying all six fields.",
        "The evaluation one-pager: set, rule, runs, version, date, failures.",
        "The autonomy grid, with the evidence and the date in every cell.",
        "The guardrail inventory, the identity and scope sheet, and the blast-radius map.",
        "The egress register and the unit-economics model with its ledger.",
        "A label on every answer, measured, modeled, declared or unknown, and a note on what would change it.",
      ],
    },
    soWhat:
      "You can walk into any conversation about an AI system with a one-page list converting every claim into a request, and read the response, including a refusal, as evidence about how the system was built.",
    checks: [
      {
        q: "Which single artifact settles the most claims at once?",
        options: [
          {
            text: "The accuracy methodology.",
            feedback:
              "Settles one claim well. Valuable, and narrower than the alternative.",
            impliesMissing: "A-ARTIFACTDEMAND",
          },
          {
            text: "The tool list as configured, with effect classes.",
            correct: true,
            feedback:
              "Correct. It settles what end to end can mean, what oversight attaches to, and what the blast radius is.",
          },
          {
            text: "The security questionnaire.",
            feedback:
              "It describes policy. The tool list describes capability, and capability is what bounds an incident.",
            impliesMissing: "A-CONTRACT",
          },
        ],
      },
      {
        q: "A vendor's cost saving figure comes from a spreadsheet with stated assumptions. How is it classified?",
        options: [
          {
            text: "Measured, since it is calculated.",
            feedback:
              "Calculation is not measurement. The inputs decide the class, and here the inputs were chosen.",
            impliesMissing: "A-CLAIMCLASS",
          },
          {
            text: "Modelled, meaning derived through stated assumptions, which is legitimate when those assumptions are visible.",
            correct: true,
            feedback:
              "Correct, and the useful follow-up is which two or three assumptions the conclusion is most sensitive to.",
          },
          {
            text: "Declared, since the vendor produced it.",
            feedback:
              "Declared covers assertions with no derivation. A visible assumption set earns the better label.",
            impliesMissing: "A-CLAIMCLASS",
          },
        ],
      },
      {
        q: "A team has no frozen evaluation set. What does that tell you?",
        options: [
          {
            text: "That they are early, which is normal.",
            feedback:
              "Often true, and it carries consequences that need naming instead of excusing.",
            impliesMissing: "A-ARTIFACTDEMAND",
          },
          {
            text: "That every improvement claim is an impression, every model change is unmeasured, and nothing supports a grant of autonomy.",
            correct: true,
            feedback:
              "Correct, and it is a specific piece of work costing an afternoon, which makes it a good condition instead of a rejection.",
          },
          {
            text: "That the product is unsafe.",
            feedback:
              "Overstated. It means unmeasured, which is a different and more precise claim to make.",
            impliesMissing: "A-FROZENSET",
          },
        ],
      },
    ],
    next: "the-people",
    relatedUseCases: ["ap-invoice-exceptions", "audit-evidence-requests"],
  },

  {
    slug: "the-people",
    order: 55,
    n: "8.6",
    module: "M8",
    kind: "lesson",
    minutes: 22,
    title: "What happens to the people?",
    blurb:
      "Some work disappears, more work changes shape, review grows before it shrinks, and three roles have to be given to somebody by name.",
    thesis:
      "Automating a queue redistributes work before it removes any, because the routine share falls while the review and exception share rises first, and three new roles appear that somebody has to be assigned to or the system decays.",
    lede:
      "Two stories dominate this subject and both are wrong in useful ways. The headcount story assumes work disappears at the automation rate. The reassurance story assumes nothing changes. What actually happens is specific, predictable from the earlier modules, and worth planning for instead of discovering in month five.",
    youWill: [
      "Predict the shape of the change from the automation rate.",
      "Explain why review load rises before it falls.",
      "Name the three roles that appear and what happens without them.",
      "Say what has to be decided before a saving is a saving.",
    ],
    atoms: ["A-ROLESHIFT", "A-REVIEWLOAD"],
    prereqs: ["A-AUTONOMYDIAL", "A-RESIDUAL"],
    ceiling:
      "The mechanics of redistribution and the three roles. No workforce-planning methodology, and no view on what any particular organisation should decide.",
    situation: {
      artifact:
        "A queue of 4,000 items a month handled by six people. After nine months, 65% is automated. Illustratively: the team is still six people, morale is higher, and the backlog has gone from 900 items to 40.",
      prompt: "Was this a failure?",
      options: [
        "Yes, since the headcount saving never materialised",
        "No, if the backlog and cycle time were the objective",
        "Partly, since the saving is a year away",
        "Impossible to say without the cost figures",
      ],
      reveal:
        "It depends entirely on what was promised, which is why the promise is the thing to get right at the start. A backlog falling from 900 to 40 is a large operational result: faster closes, fewer escalations, less overtime, and a team doing exception work instead of keying. If the business case promised two heads, it has failed against its own terms while succeeding at the work. Decide before starting which of the two outcomes is being bought.",
    },
    sections: [
      {
        title: "Review rises before it falls",
        paragraphs: [
          "This is the counterintuitive part of the first year. At the start, autonomy is low and sampling is high, so a large share of items get looked at by a person, sometimes more than were being checked before, because nobody was checking the routine ones at all.",
          "As evidence accumulates the sampling rate falls and the autonomy grid moves up, so the review load declines. The shape is a hump and not a slope, and a team that budgeted for a straight-line decline will be under water at precisely the moment the system is working as designed.",
          "The composition of the remaining work also changes, and this is the part people notice first. The routine items go first, so what remains for a person is the tail: harder, more varied, more judgment-heavy, and more tiring per item. Four hours of exceptions is a different day from four hours of mixed work, and a plan counting only minutes will get the staffing right and the experience wrong.",
        ],
      },
      {
        title: "Three roles",
        paragraphs: [
          "The queue owner is accountable for the queue's numbers, decides what gets automated and at what level, and owns the scoreboard. Usually an existing manager, and the role still has to be named explicitly, because a system without an owner has no venue for its decisions and they stop being made.",
          "The harness maintainer owns the playbook, the instructions, the tool list and the scope, and keeps all four current as the work changes. This is frequently the strongest operator on the team and not an engineer, and it is the role most often left unassigned, which is why systems that worked at launch decay quietly by month six.",
          "The evaluator owns the frozen set, adds cases from production failures, runs the set on every change, and maintains the scoreboard. Perhaps a day a week at steady state. Without it the system becomes unmeasured within a quarter and every subsequent claim about it is an impression. None of the three need to be full-time and all of them need names, because a launch plan with no name against these three is describing a system that will work for a while.",
        ],
      },
      {
        title: "What makes a saving a saving",
        paragraphs: [
          "Freed hours become a cost saving only when somebody decides what happens to them, and that decision has a short list of options. Reduce headcount. Stop backfilling as people leave. Redeploy to work that is currently undone. Absorb growth without hiring.",
          "The last two are the most common in practice and the least visible in a business case, because they show up as work getting done instead of as a line falling. A case booking a saving without naming which of the four applies has booked an intention, and the finance function will notice at the first review.",
          "It is worth being direct about the honest version. In many deployments the answer is absorbing growth without hiring, which is a real economic benefit that a headcount-reduction case will misrepresent. Saying so at the start protects the programme, because the alternative is a system that worked being judged against a promise nobody could have kept.",
        ],
      },
    ],
    misconception: {
      says: "This will take three heads out of the team.",
      why: "Automation redistributes before it reduces. Review load rises during the evidence-gathering period, the remaining work becomes harder per item, and three roles have to be staffed from the same team. A reduction is available later, and only if somebody makes the decision, which is a management act instead of a system outcome. Promising it at the start converts a likely operational success into a documented failure.",
    },
    widget: {
      kind: "econ",
      mode: "staffing",
      dataset: "staffing",
      caption:
        "Move the automation share and the sampling rate across twelve months. Watch review load rise and then fall, and watch what remains for the team.",
    },
    instrument: {
      name: "The role map",
      body: "Before and after, with names on it. Half a page, agreed before launch.",
      items: [
        "Today: who does what, how many minutes per item, at what mix of routine and exception.",
        "Month six: expected automation share, expected sampling rate, expected review load.",
        "Steady state: what remains for people, and how the day differs from today.",
        "The queue owner, by name.",
        "The harness maintainer, by name, and how much of their week.",
        "The evaluator, by name, and how much of their week.",
        "The saving: which of the four options applies, and who makes that decision.",
      ],
    },
    soWhat:
      "You can describe honestly what a deployment does to a team, set a promise the programme can actually meet, and name the three roles whose absence is the most common cause of quiet decay.",
    checks: [
      {
        q: "Why does review load rise before it falls?",
        options: [
          {
            text: "Because early systems make more mistakes.",
            feedback:
              "A contributing factor. The structural cause is the sampling rate and not the error rate.",
            impliesMissing: "A-REVIEWLOAD",
          },
          {
            text: "Because autonomy starts low and sampling starts high, so more items get looked at than before, including routine ones nobody was checking.",
            correct: true,
            feedback:
              "Correct, and a plan assuming a straight-line decline will be under water exactly when the system is working as designed.",
          },
          {
            text: "Because staff need time to build trust in the system.",
            feedback:
              "A real dynamic and a softer one. The measurable cause is the sampling rate.",
            impliesMissing: "A-REVIEWLOAD",
          },
        ],
      },
      {
        q: "Which role is most often left unassigned?",
        options: [
          {
            text: "The queue owner.",
            feedback:
              "Usually an existing manager, so it gets assigned more or less by default.",
            impliesMissing: "A-ROLESHIFT",
          },
          {
            text: "The harness maintainer, who keeps the playbook, instructions and scope current as the work changes.",
            correct: true,
            feedback:
              "Correct, and its absence is the most common cause of a system that worked at launch and decays quietly by month six.",
          },
          {
            text: "The evaluator.",
            feedback:
              "Also frequently unassigned, and it tends to get noticed sooner, because the numbers visibly stop being produced.",
            impliesMissing: "A-ROLESHIFT",
          },
        ],
      },
    ],
    next: "first-hundred-days",
    relatedUseCases: ["shared-inbox-triage", "timesheet-client-approvals"],
  },

  {
    slug: "first-hundred-days",
    order: 56,
    n: "8.7",
    module: "M8",
    kind: "lesson",
    minutes: 24,
    title: "What does the first hundred days look like, and how does it fail?",
    blurb:
      "One queue, one playbook, one frozen set, one gated write, one scoreboard, one owner. Plus the five patterns accounting for most of what goes wrong.",
    thesis:
      "A first deployment reaching a measured, gated write on one queue within a hundred days beats any broader programme, and five recognisable patterns account for most of the failures that do occur.",
    lede:
      "The final lesson assembles everything into a plan and a warning list. The plan is deliberately narrow, because narrow is what produces evidence and evidence is what earns the second queue. The warning list is five patterns, each of them visible from outside a programme within about two weeks of it starting.",
    youWill: [
      "Lay out a hundred days with weekly checkpoints and exit criteria.",
      "Name the five failure patterns and their early symptoms.",
      "Say what the second queue inherits from the first.",
      "Refuse the four proposals that reliably produce nothing.",
    ],
    atoms: ["A-100DAY", "A-FAILUREPATTERNS"],
    prereqs: ["A-MINSTACK", "A-STAGING", "A-ROLESHIFT"],
    ceiling:
      "A concrete plan and five patterns. Programme governance beyond one queue is out of scope here by design, because scope is the failure this lesson exists to prevent.",
    situation: {
      artifact:
        "Two programmes at similar companies. The first has a centre of excellence, a platform selection, a governance framework, and eleven use cases in discovery. The second has one AP queue, twenty cases with answers, a packet stage live in week five, and a gated write in week fourteen.",
      prompt: "Which one is further ahead at day one hundred?",
      options: [
        "The first, since it has built foundations that will scale",
        "The second, since it has evidence and the first one has none",
        "Equal, being different strategies",
        "The first, if the platform choice was good",
      ],
      reveal:
        "The second, and the gap widens instead of closing. At day one hundred the second programme knows its accuracy, its escalation rate, its cost per item and its failure modes, and it holds three artifacts transferring directly to the next queue. The first holds a platform, a framework and eleven use cases in discovery, none of which has produced a number. The foundations argument sounds prudent and it defers the only activity generating the information those foundations were supposed to be built on.",
    },
    sections: [
      {
        title: "The hundred days",
        paragraphs: [
          "Weeks one to three are for writing. Name the queue and its owner. Write the playbook with the people who do the work. Build the frozen set, meaning twenty cases with answers from records plus the scoring rule. Name the harness maintainer and the evaluator. Draw the autonomy grid at its starting position and settle the egress question in three lines. All of this is writing, none of it needs a vendor, and skipping it is the most common cause of everything in the next section.",
          "Weeks four to six are the packet stage. Build the fetches and assemble the material, then measure how often the required material can be found at all. That number is often the finding of the whole period and it is frequently lower than anyone expected. Weeks seven to eleven are the draft stage: the system proposes, a person executes, the frozen set runs on every change, and acceptance, escalation and time per item all become measurable. The scoreboard starts here, with real numbers in it.",
          "Weeks twelve to sixteen add one write. A single action type, internal, reversible, narrowly scoped and heavily sampled, with the adversarial cases added to the set and the trace confirmed complete enough to replay. By day one hundred there is a measured system doing real work on one queue, with an owner, a scoreboard, a frozen set and a trace, plus a costed answer for the second queue.",
        ],
      },
      {
        title: "Five failure patterns",
        paragraphs: [
          "Chat without an owner is the first. A general assistant gets deployed, usage is measured, and no queue has an accountable owner. The symptom is visible by week two, when the success metric turns out to be licenses or satisfaction scores. Lesson 4.5 explained why this shape cannot move a queue. Platform first is the second: months spent on selection, governance and architecture before any queue has produced a number, with a steering committee holding a roadmap of eleven items in discovery.",
          "Leaderboard as evidence is the third, where model selection runs on public benchmarks with no frozen set on the actual work. The symptom is a comparison table of models and no table of your own cases, and lesson 7.5 covered why that comparison measures something else. Autonomy without types is the fourth: a single autonomous-or-not decision applied across every action, producing either universal review with no economics or a payment path holding the same latitude as a lookup.",
          "Pilot purgatory is the fifth. A pilot runs indefinitely because no exit criteria were written, so it neither scales nor stops, and the report in month seven of a six-week pilot says promising. All five are visible from outside, early, and each one has a specific artifact whose absence produces it.",
        ],
        list: [
          "One queue, one owner, one playbook, one frozen set, one gated write, one scoreboard.",
          "Weeks one to three are writing, and skipping them causes most of what follows.",
          "Exit criteria per stage, written in advance, including what sends a stage backwards.",
          "Refuse chat without an owner, platform first, leaderboard as evidence, and autonomy without types.",
        ],
      },
      {
        title: "What the second queue inherits",
        paragraphs: [
          "This is the argument for narrowness, and it is worth making explicitly to whoever wanted eleven use cases at once.",
          "The second queue inherits the gateway, the identity model and the scoping approach, which were the slow parts. It inherits the trace format and the scoreboard structure. It inherits the evaluation discipline, meaning how to build a set, how to score it and how to run it on every change, which is a skill instead of an artifact and takes one full cycle to acquire. It inherits the autonomy grid as a template and the argument that earned its levels. And it inherits the credibility of a measured result, which is what unlocks the second queue politically as much as technically.",
          "What it does not inherit is the playbook and the frozen set, because both are specific to the work. So queue two takes perhaps half the calendar time of queue one, queue three rather less, and the compounding is real, though only from a first queue that finished.",
        ],
        example: {
          title: "Day one hundred",
          body: `On the running case: 4,180 items a month, packet assembly succeeding on 94%, draft acceptance measured and recorded, one internal note type writing automatically under a threshold with 20% sampled, a frozen set of 34 cases including 6 drawn from production failures, a scoreboard reviewed on Mondays, and a costed proposal for the collections queue.`,
        },
      },
    ],
    misconception: {
      says: "We need to build the foundations before we start on use cases.",
      why: "The foundations worth building, meaning the gateway, the identity model, tracing and evaluation discipline, are learned by building them for one real queue, and their right shape is unknowable in advance. A foundations-first programme defers the only activity generating the information those foundations depend on, and it arrives at day one hundred holding a framework and no number.",
    },
    widget: {
      kind: "sorter",
      dataset: "failure-patterns",
      caption:
        "Six programmes described as they were presented internally. Diagnose each against the five patterns, then read the symptom that was visible in week two.",
    },
    instrument: {
      name: "The hundred-day plan",
      body: "One page. Weekly checkpoints, exit criteria per stage, and the five refusals written where the steering committee can see them.",
      items: [
        "Weeks 1 to 3: queue named, owner named, playbook written, frozen set built, three roles assigned, autonomy grid drawn, egress settled.",
        "Weeks 4 to 6: packet stage. Exit criterion is material assembled correctly on a stated share.",
        "Weeks 7 to 11: draft stage. Exit criterion is acceptance above a threshold across a stated number of items.",
        "Weeks 12 to 16: one internal write, narrow scope, sampled, with adversarial cases added.",
        "Scoreboard live from week seven, reviewed weekly by the queue owner.",
        "Written refusals: chat without an owner, platform first, leaderboard as evidence, autonomy without types, and a pilot with no exit criteria.",
        "Day 100 deliverable: a measured result, four artifacts, and a costed proposal for queue two.",
      ],
    },
    soWhat:
      "You can write a hundred-day plan producing evidence instead of a framework, and recognize all five failure patterns from outside a programme within about two weeks of it starting.",
    checks: [
      {
        q: "Which activity fills weeks one to three?",
        options: [
          {
            text: "Vendor selection and technical integration.",
            feedback:
              "Both premature. Neither can be done well before the queue, the playbook and the frozen set exist.",
            impliesMissing: "A-100DAY",
          },
          {
            text: "Writing: the playbook, the frozen set, the roles, the autonomy grid, the egress decision.",
            correct: true,
            feedback:
              "Correct, and it needs no vendor. Skipping it is the most common cause of everything on the failure list.",
          },
          {
            text: "Building the packet assembly.",
            feedback:
              "That is weeks four to six, and it depends on the playbook to know what belongs in a packet.",
            impliesMissing: "A-MINSTACK",
          },
        ],
      },
      {
        q: "A programme has a platform, a governance framework and eleven use cases in discovery at day one hundred. Which pattern is this?",
        options: [
          {
            text: "Pilot purgatory.",
            feedback:
              "That requires a pilot, and nothing here has reached one yet.",
            impliesMissing: "A-FAILUREPATTERNS",
          },
          {
            text: "Platform first, where foundations were built before any queue produced a number.",
            correct: true,
            feedback:
              "Correct, and the symptom was visible in week two: a roadmap with no queue and no owner named anywhere on it.",
          },
          {
            text: "Autonomy without types.",
            feedback:
              "That pattern needs a running system, and this programme has yet to produce one.",
            impliesMissing: "A-FAILUREPATTERNS",
          },
        ],
      },
      {
        q: "What does the second queue inherit from the first?",
        options: [
          {
            text: "The playbook and the frozen set.",
            feedback:
              "Both are specific to the work and have to be rebuilt for each queue.",
            impliesMissing: "A-100DAY",
          },
          {
            text: "The gateway, identity model, trace format, scoreboard structure, evaluation discipline, and the credibility of a measured result.",
            correct: true,
            feedback:
              "Correct, and the last of those is what unlocks the second queue politically as well as technically.",
          },
          {
            text: "Nothing, since each queue starts from zero.",
            feedback:
              "Too pessimistic. The slow infrastructure and the skill both transfer, which is why queue two takes about half the time.",
            impliesMissing: "A-100DAY",
          },
        ],
      },
    ],
    next: "clinic-vendor-call",
    relatedUseCases: ["ap-invoice-exceptions", "ar-collections-chase"],
  },
];
