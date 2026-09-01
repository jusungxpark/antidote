import type { LearnLesson } from "./learn-types";
import { CASE, CASE_LINE } from "./learn-case";

export const M1_LESSONS: LearnLesson[] = [
  {
    slug: "eras-of-ai",
    order: 3,
    n: "1.1",
    module: "M1",
    kind: "lesson",
    minutes: 22,
    title: "Why does AI mean something different than it did in 2021?",
    blurb:
      "Four eras, and what each one asked of the person who owned it. Most of the AI running an operating business belongs to an older one.",
    thesis:
      "The word now defaults to a generative model, while most of the AI actually running an operating business is the older kind: scores, labels and rules, carrying different owners, different failures and different bills.",
    lede:
      "Each era of this technology asked its owner for something specific. Expert systems wanted your rules. Statistical models wanted your labels. The current one asks for neither, which is why it feels like a different category of thing and why the vocabulary collapsed into a single word. Placing a claim in its era takes seconds and tells you immediately what the thing can fail at and who has to own it.",
    youWill: [
      "Place any claim in one of four eras, working from the artifact instead of the vocabulary.",
      "Say what each era asked of its owner: rules, labels, or neither.",
      "Name the models a business already runs that nobody in the room calls AI.",
      "Explain why earlier waves stalled at the last mile, and what that predicts about this one.",
    ],
    atoms: ["A-ERAS", "A-OLDSTACK"],
    prereqs: [],
    ceiling:
      "Four eras told as a story about what each asked of you. No architectures, no parameter counts, no dates beyond four. The conclusion that must follow is that era predicts failure mode and owner.",
    situation: {
      artifact: "A slide from a quarterly operations review, headed AI adoption.",
      artifactItems: [
        "68% of staff hold Copilot licenses.",
        "AI-powered pricing engine, live since 2019.",
        "RPA bots processing 14,000 transactions a month.",
        "New AI assistant pilot in accounts payable.",
      ],
      prompt:
        "One heading, four bullets. Which of them describes work that a model now performs end to end?",
      options: [
        "All four. That is what the heading is claiming",
        "The pricing engine and the RPA bots, because those run without a person",
        "The AP pilot, possibly, and nothing else on the slide yet",
        "None of them",
      ],
      reveal:
        "The defensible answer is the third, and the word possibly carries real weight. The pricing engine is a real model that has been earning money since 2019, and it belongs to an era where a human supplied the labels. The RPA bots repeat a click path someone recorded. The licenses put a helper beside people who already do the job. Only the pilot is even attempting to take work off a queue, and one bullet on a slide tells you nothing about whether it does. Four bullets, four different objects, one heading, and the heading is where the money gets misallocated.",
    },
    sections: [
      {
        title: "Four eras, and what each one asked for",
        paragraphs: [
          "From the 1960s through the 1980s, the dominant approach was to sit with a specialist and write down what they knew as rules. If the applicant has been employed under two years and the loan-to-value exceeds eighty percent, refer to underwriting. These systems worked, in narrow domains, for as long as someone kept feeding them. Every new exception meant a new rule, the rules began to contradict each other, and eventually the specialist who could adjudicate retired. What this era asked of its owner was knowledge, written down and maintained forever.",
          "From the 1990s the demand changed to examples. Give the system ten thousand rows where you already know the answer, and it will learn a mapping from the columns to that answer. Churn scoring, credit decisioning, demand forecasting and warehouse slotting still work this way, and they work well. The cost moved from writing rules to producing labels, which is a real cost that most people underestimate, and to keeping the schema stable enough that last year's model still applies.",
          "From 2017 a third thing became possible. An architecture called the transformer made it practical to train on ordinary text at enormous scale, with no labels at all, because the training signal came from the text itself: cover the next word, predict it, adjust. Scale that far enough and the resulting system can be handed a job in plain language instead of being configured for one. What this era asks of its owner turns out to be neither rules nor labels. It asks for an environment, and the rest of this course is about what that environment contains.",
          "The fourth era is the one you are operating in. No new kind of model, but the same models given the ability to call software, plus the surrounding machinery that lets them survive contact with a real queue. Same primitive, different environment: the distinction the whole course keeps returning to.",
        ],
        table: {
          head: ["Era", "What it asked of you, and how it fails"],
          rows: [
            {
              label: "Rules · 1960s-80s",
              body: "Expert systems. You supply the knowledge. Fails by omission, on the case nobody wrote a rule for. Owned by whoever maintains the rulebook.",
            },
            {
              label: "Labels · 1990s-2010s",
              body: "Statistical models. You supply thousands of worked examples. Fails statistically, and quietly, as the world drifts away from the training data. Owned by a data-science function.",
            },
            {
              label: "Scale · 2017-2022",
              body: "Transformers trained on unlabelled text. You supply a request in plain language. Fails fluently, which is the hardest failure to catch. Owned by nobody yet, which was the problem.",
            },
            {
              label: "Environment · 2023-now",
              body: "The same models, plus tools, gates, traces and measurement. Fails as a wrong action. Owned by whoever owns the queue.",
            },
          ],
        },
      },
      {
        title: "The old stack is still running the P&L",
        paragraphs: [
          "Walk any mid-sized operating business and you will find models from the second era doing quiet, load-bearing work. They rarely appear in the AI strategy because everyone stopped calling them AI around the time the word was reassigned.",
          "This matters for two practical reasons. The first is accounting. A programme that counts only generative spend will report that the business has done almost nothing, when in fact several of its best-performing systems are models with owners and refresh cadences. The second reason is worse. Modernisation programmes have a habit of tearing out a working scorer because it fails to look modern, replacing it with a chat interface, and discovering eighteen months later that the chargebacks it was silently preventing have come back.",
        ],
        list: [
          "Pricing and markdown engines, usually the highest-earning model in the building.",
          "Warehouse slotting and route optimization, which are optimizers instead of predictors and are better for it.",
          "Claims scoring, fraud flags, and the if-then layer that has lived inside the ERP since before anyone asked.",
          "Churn and propensity models behind the CRM, feeding lists that people act on without knowing where they came from.",
          "Document classifiers in the mailroom, often bought as a feature of something else and never described as a model.",
        ],
      },
      {
        title: "What changed in 2022, and what changed later",
        paragraphs: [
          "November 2022 was the first moment an ordinary person could feel a fluent assistant without a research affiliation. Boards drew a straight line from that experience to a labour forecast. What scaled through 2023 was something narrower: a helper in every toolbar, sold per seat, sitting beside people who already knew how to do the work. Useful, and almost impossible to see in a queue length.",
          "What began to hold for operations from 2024 onward was a different object. Models became reliable enough at calling software that you could hand them a tool instead of a question. Token prices fell far enough that high-volume language work stopped being an experiment. Patterns for gating, tracing and measuring these systems became public where they had been folklore. That combination, and no single element of it, is why the current wave reaches a queue when the previous ones stopped at a slide.",
          "The hard part stayed the same. Earlier waves rarely died at the algorithm. They died at the last mile: the integration nobody scoped, the exception tail nobody documented, the approval that has to happen before a write, the person whose job it was to notice. All of that survives intact. The honest framing is that the last mile has become expensive where it used to be impossible.",
        ],
        example: {
          title: "One invoice, three eras",
          body: `${CASE_LINE} Matching ${CASE.invoice} to PO ${CASE.po} within tolerance belongs to the rules era and works fine there. Deciding that this invoice looks like the class of exception a human should see belongs to the labels era. Drafting a chase to ${CASE.buyer} in language a buyer will act on belongs to the scale era. Filing the result back into the ERP belongs to the fourth. One invoice, four eras, and a plan that treats them as one thing will overspend on three of them.`,
        },
      },
      {
        title: "Why the earlier waves stalled",
        paragraphs: [
          "Each era failed at the last mile for a reason specific to what it asked for. Rules-era systems needed a maintained rulebook and got an abandoned one. Labels-era systems needed clean, stable, labelled data, and most operating businesses could produce two of those three. Click automation needed a frozen interface, and vendors keep shipping releases. Pre-transformer language tools were weak on long, ugly, inconsistent documents, which is most of what an operating business actually receives.",
          "The current era removes one item from that list. A general model can read a novel, badly formatted vendor email and produce something sensible without anyone labelling ten thousand of them first. That single removal is why this wave gets further. Everything else on the list is still yours to fund: the integration, the exception tail, the approval, the owner.",
        ],
      },
    ],
    misconception: {
      says: "We are not really an AI company yet. we are just starting to look at it.",
      why: "Usually said inside a business running four models in production, by people who stopped counting them when the word was reassigned in 2022. The sentence swaps one era for the whole word, and it leads to two expensive mistakes at once: a programme that ignores the systems already earning, and a modernisation effort that replaces a healthy scorer with a chat box.",
    },
    widget: {
      kind: "sorter",
      dataset: "eras",
      caption:
        "Twelve systems from an operating business. Place each in the era that describes it, then read what that era predicts about how it fails.",
    },
    instrument: {
      name: "The inventory prompt",
      body: "Six questions that surface the AI a business already runs. Ask them of a functional leader, in this order, before any strategy conversation.",
      items: [
        "What in your area produces a number or a rank that somebody acts on?",
        "What sorts incoming items into buckets without a person reading them?",
        "What repeats a click path that someone recorded, and what breaks it?",
        "Which of those has an owner, and when was it last refreshed?",
        "Where does someone read free text and decide something as a result?",
        "Which of these would you notice within a day if it silently stopped working?",
      ],
    },
    soWhat:
      "You can take an AI-adoption slide apart line by line and say, for each line, which era it belongs to, what it will fail at, and who owns it. That is the difference between a programme that funds four different things deliberately and one that funds a heading.",
    checks: [
      {
        q: "A distribution centre runs a slotting engine that decides where stock is put away. The vendor calls it AI-powered. Which era does it belong to, and what does that predict?",
        options: [
          {
            text: "The scale era. it will fail fluently, so it needs a human reviewing its output.",
            feedback:
              "Fluent failure belongs to systems that emit tokens. A slotting engine emits placements drawn from a known set of locations.",
            impliesMissing: "A-ERAS",
          },
          {
            text: "The labels era, or an optimizer beside it. it will drift as the product mix changes, and it needs an owner and a refresh cadence.",
            correct: true,
            feedback:
              "Correct. Closed output from a known set, degrading quietly as the world moves away from the data it was fitted on. The question to ask is when it was last refreshed.",
          },
          {
            text: "The rules era. someone wrote the placement logic down.",
            feedback:
              "Possible for a very old system, and slotting has been fitted from data for most of two decades. Either way, ask for the artifact instead of guessing.",
            impliesMissing: "A-ERAS",
          },
        ],
      },
      {
        q: "A CFO says the business has done nothing on AI. Finance runs a fraud-scoring model, procurement runs a duplicate-invoice classifier, and pricing has run a markdown engine since 2019. What has gone wrong in that sentence?",
        options: [
          {
            text: "Nothing. those systems are older technology and belong in a different conversation.",
            feedback:
              "They are models with owners, failure modes and refresh needs, and two of them are probably earning more than any pilot. Leaving them out is how they get switched off during a modernisation.",
            impliesMissing: "A-OLDSTACK",
          },
          {
            text: "The word has been narrowed to one era, so several load-bearing systems have become invisible to the programme that will eventually touch them.",
            correct: true,
            feedback:
              "Correct, and the risk runs both ways: unfunded maintenance on the systems that work, and a modernisation that rips out a healthy scorer for looking dated.",
          },
          {
            text: "The CFO is right, because none of those systems use a transformer.",
            feedback:
              "Architecture makes a poor test. What matters is what the system emits, how it fails, and who owns it.",
            impliesMissing: "A-ERAS",
          },
        ],
      },
      {
        q: "Why did earlier operational AI programmes stall, and what does that predict about this one?",
        options: [
          {
            text: "The algorithms were too weak; now that they are strong, the remaining work is small.",
            feedback:
              "The algorithm was rarely the blocker. Integration, the exception tail, the approval before a write, and ownership were, and all four survive.",
            impliesMissing: "A-ERAS",
          },
          {
            text: "They stalled at the last mile. labels, stable schemas, frozen interfaces, ownership. and this wave removes one of those constraints while leaving the rest.",
            correct: true,
            feedback:
              "Correct. A general model handles unseen messy language with no labelling programme in front of it. Everything else on the list is still yours to fund.",
          },
          {
            text: "They stalled because the data was dirty, and the data is still dirty, so this will stall too.",
            feedback:
              "Half right and too fatalistic. Handling dirty, inconsistent language is the one constraint this era relaxes. The costs that remain sit elsewhere.",
            impliesMissing: "A-OLDSTACK",
          },
        ],
      },
    ],
    next: "four-jobs",
    relatedUseCases: ["ap-invoice-exceptions", "shared-inbox-triage"],
  },

  {
    slug: "four-jobs",
    order: 4,
    n: "1.2",
    module: "M1",
    kind: "lesson",
    minutes: 22,
    title: "Predict, classify, generate, act: which one is this?",
    blurb:
      "Four jobs, four failure modes, four owners. A single AI maturity score averages across objects that have nothing in common.",
    thesis:
      "Any system described as AI is doing one of four jobs: producing a number, choosing a label, writing tokens, or taking an action. Each fails differently, costs differently, and belongs to a different owner.",
    lede:
      "The word covers four distinct products. A scorer that is two points off is a modelling problem. A generator that invents an identifier is an incident. An agent that sends the wrong chase is an operating problem even when the prose is excellent. Tagging the job takes four seconds and settles most of the argument that would otherwise follow.",
    youWill: [
      "Tag any claim as predict, classify, generate, or act, working from what it emits.",
      "Name the characteristic failure of each job, and who owns it.",
      "Spot a claim that has quietly stapled two jobs together.",
      "Explain why one AI maturity number averages across incomparable things.",
    ],
    atoms: ["A-FOURJOBS"],
    prereqs: ["A-ERAS"],
    ceiling:
      "Four jobs defined by output type. No taxonomy of model families, no discussion of architecture. The conclusion is that job predicts failure mode and owner.",
    situation: {
      artifact:
        "A vendor one-liner: our AI reviews incoming invoices, flags the ones that need attention, drafts the follow-up email, and posts the resolution back to your ERP.",
      prompt: "How many products has that sentence just described?",
      options: [
        "One. it is an invoice automation product",
        "Two. reading and writing",
        "Three or four distinct jobs, sold as one line",
        "Impossible to say from a sentence",
      ],
      reveal:
        "Three, arguably four, and each one fails in a way the others do not. Flagging is a label drawn from a known set. Drafting is open text. Posting to the ERP is an action against a live system. If a pilot goes wrong, these three fail for unrelated reasons and get fixed by unrelated people, and a single satisfaction score across them will tell you nothing about which part to keep.",
    },
    sections: [
      {
        title: "Start from what it emits",
        paragraphs: [
          "Ignore the description and ask what comes out. A number or a rank means prediction: demand, churn, credit, next-best-offer. A label drawn from a known set means classification, so this invoice belongs to the missing-receipt bucket and this email is a claim. Free text or a filled-in structure means generation: a chase email, a narrative, a proposed JSON body. Tool calls against live systems mean action.",
          "The four differ in the only three ways that matter operationally. They fail differently, they cost differently, and they belong to different people. A prediction that drifts gets caught by watching a distribution. A wrong label gets caught by a confusion matrix and a sample. A generated sentence that invents a purchase-order number gets caught by a validator, or by nobody. An action that goes out gets caught after it has already happened, which is why actions get gates and the other three do not.",
        ],
        table: {
          head: ["Job", "What it emits, how it fails, how you audit it"],
          rows: [
            {
              label: "Predict",
              body: "A number or a rank. Fails statistically and quietly. Audited by sampling and by watching the distribution move. Owned by whoever owns the model.",
            },
            {
              label: "Classify",
              body: "A label from a known set. Fails by putting an item in the wrong bucket. Audited by a confusion matrix on a labelled sample. Owned by the process owner.",
            },
            {
              label: "Generate",
              body: "Open text or a structured draft. Fails by fluent invention. Needs a schema, a fetch, or a person before it can be trusted. Owned by whoever is accountable for what it says.",
            },
            {
              label: "Act",
              body: "Tool calls against live systems. Fails as a write you did not intend. Needs an allowlist, a gate and a trace. Owned by whoever owns the queue and the system of record.",
            },
          ],
        },
      },
      {
        title: "Why one maturity score misleads",
        paragraphs: [
          "Composite scores work when the things being averaged are commensurable. These four are not, in the specific sense that improving one has no bearing on the others. A business can be excellent at prediction and dangerous at action. It can hold a superb classifier and a generative pilot that has never been allowed to write anything, and a single number will place it in a middle that describes neither half.",
          "The damage shows up in resource allocation. An assessment returning 3.2 out of 5 produces a plan to get to 4. A four-job breakdown produces a plan that says the classifier is healthy and needs a refresh cadence, the generative pilot needs a validator before it drafts anything customer-facing, and nothing in this business is currently permitted to act. Two very different conversations, and only one of them can be costed.",
        ],
      },
      {
        title: "Claims that staple two jobs together",
        paragraphs: [
          "The most common shape in a vendor deck combines a closed job and an open job in one sentence, then reports accuracy for the closed one. Our system reads the document and extracts the fields with 96% accuracy, then drafts the response. The 96% almost certainly belongs to extraction. The drafting has no number attached, and the sentence structure invites you to carry the 96% across.",
          "The second common shape hides an action inside a verb. Handles, manages, resolves, processes, closes. Each of those can mean drafts something a person then sends, or can mean sends. The difference decides whether you need an allowlist and a gate, and it is worth interrupting a demo to settle.",
          "Two questions get you there in most cases. What comes out of this: a number, a label, a passage of text, or a change in another system? And if it were wrong, where would that show up first? The second question separates jobs that look alike. A classifier and a generator can both produce the string missing goods receipt. Wrong, the classifier has put an item in the wrong queue, which somebody notices in the queue. The generator has written a sentence that is false, which somebody notices when a vendor replies confused, or never.",
        ],
        example: {
          body: `Invoice ${CASE.invoice} again. Matching it to PO ${CASE.po} within tolerance: classify. Deciding whether this exception is worth a person's time today: predict, if it emits a priority. Writing a chase to ${CASE.buyer} that explains the missing ${CASE.missing}: generate. Posting the note and the fee back into the ERP: act. When someone says the AI handles our invoice exceptions, the useful reply is which of those four, because the answer changes what you have to build around it.`,
        },
      },
    ],
    misconception: {
      says: "We rate our AI maturity at about a three out of five.",
      why: "The score averages four objects that fail for unrelated reasons and belong to different people. A business can be strong at prediction and reckless at action, and a single number places it in a middle that describes neither. Worse, the number produces a plan to raise the number instead of a plan to fix a specific thing.",
    },
    widget: {
      kind: "sorter",
      dataset: "four-jobs",
      caption:
        "Twelve claims, taken from vendor pages and internal decks. Tag each one. Three of them staple two jobs together, and the feedback will say which.",
    },
    instrument: {
      name: "The four-jobs tag",
      body: "A one-line test applied to any claim, in a meeting, with no preparation.",
      items: [
        "What comes out of it: a number, a label, text, or a change in another system?",
        "If it were wrong, where would that show up first, and how long would that take?",
        "Which single person is accountable for that output today?",
        "If two jobs are in the sentence, which one does the quoted accuracy belong to?",
        "Does any verb in the claim conceal an action? Handles, manages, resolves, processes.",
      ],
    },
    soWhat:
      "You can hear a one-sentence product description and immediately say how many products it contains, which one the quoted number belongs to, and which of them will need a gate before it goes anywhere near a system of record.",
    checks: [
      {
        q: "A tool reads a claim form and outputs one of eleven claim types. Which job, and how would you audit it?",
        options: [
          {
            text: "Generate. it read free text, so the output is generative.",
            feedback:
              "The input being free text says nothing about the output. Eleven possible answers is a known set.",
            impliesMissing: "A-FOURJOBS",
          },
          {
            text: "Classify. audit with a confusion matrix on a labelled sample, and watch which types get confused with which.",
            correct: true,
            feedback:
              "Correct. A known set of answers means you can build a labelled sample and see exactly which pairs the system mixes up.",
          },
          {
            text: "Act. it is doing work that a person used to do.",
            feedback:
              "Replacing human effort does not make something an action. Action means something changed in another system.",
            impliesMissing: "A-FOURJOBS",
          },
        ],
      },
      {
        q: "A vendor says: our agent resolves 40% of AP exceptions end to end. What is the most important thing to establish before that number means anything?",
        options: [
          {
            text: "Which model they use and how recent it is.",
            feedback:
              "Interesting later, and irrelevant here. The word doing the work in that sentence is resolves.",
            impliesMissing: "A-FOURJOBS",
          },
          {
            text: "Whether resolves means drafts something a person sends, or means the system itself wrote to a live system.",
            correct: true,
            feedback:
              "Correct. That single distinction decides whether you are buying a drafting tool or something that needs an allowlist, a gate and a trace.",
          },
          {
            text: "Whether 40% was measured on their data or yours.",
            feedback:
              "A good question, and you will ask it in a later module. It still comes second to what the verb means.",
            impliesMissing: "A-FOURJOBS",
          },
        ],
      },
      {
        q: "Why does inventing a purchase-order number belong to a different category of error than a churn model being two points off?",
        options: [
          {
            text: "Because the churn model is older technology.",
            feedback:
              "Age has nothing to do with it. The difference lies in what each system is able to emit.",
            impliesMissing: "A-ERAS",
          },
          {
            text: "Because a generator can produce an identifier that never existed, while a score being off is a quantity moving within a range you already sample.",
            correct: true,
            feedback:
              "Correct. One error lands as a false key in a ledger and can be acted on; the other lands as a number you were already monitoring.",
          },
          {
            text: "Because generative models are less accurate than statistical ones.",
            feedback:
              "Accuracy is the wrong axis. The difference lies in the kind of thing that comes out and what it can do downstream.",
            impliesMissing: "A-FOURJOBS",
          },
        ],
      },
    ],
    next: "closed-or-open",
    relatedUseCases: ["ap-invoice-exceptions", "claim-intake-missing-info"],
  },

  {
    slug: "closed-or-open",
    order: 5,
    n: "1.3",
    module: "M1",
    kind: "lesson",
    minutes: 20,
    title: "Closed or open: what does this thing emit?",
    blurb:
      "Underneath the four jobs sits a deeper cut. Output drawn from a known set behaves like software you can audit. Output made of tokens behaves like prose.",
    thesis:
      "The deepest cut in the subject is whether an output is drawn from a known set or composed as unbounded tokens, because that alone decides what auditing costs and what has to wrap it before it may touch a system of record.",
    lede:
      "Closed output can be sampled against a specification, compared with last Tuesday, and given a tight error bar. Open output can say anything a fluent writer could say, which is what lets it read a vendor email nobody has seen before and what lets it write a purchase-order number that never existed. Open output is a different object from closed output, and treating it as a superior version of the same thing produces most of the expensive mistakes in this field.",
    youWill: [
      "Split any workflow into the steps that should stay closed and the steps that want open output.",
      "Say what auditing costs in each case, and why the two differ.",
      "Explain why a schema, an allowlist, or a person is what turns open output into software.",
      "Refuse the upgrade instinct that replaces a working closed step with a generative one.",
    ],
    atoms: ["A-OPENCLOSED"],
    prereqs: ["A-FOURJOBS"],
    ceiling:
      "The distinction plus its audit consequences. The mechanism behind unbounded output arrives in the next lesson; here the reader needs only that it exists and what it costs.",
    situation: {
      artifact: `The AP queue. Step one: does invoice ${CASE.invoice} match PO ${CASE.po} within tolerance? Step two: is the ${CASE.missing} present? Step three: write ${CASE.buyer} an email that gets the receipt filed today. Step four: record what was done.`,
      prompt:
        "A team proposes handing all four steps to one generative system, because it can do all of them. Where does that go wrong first?",
      options: [
        "Nowhere. one system with full context will do better on all four",
        "Step three, because email is the risky one",
        "Steps one and two, because they already have exact answers",
        "Step four, because writing to systems is always the danger",
      ],
      reveal:
        "Steps one and two. Both have exact answers derivable from data the business already holds: a comparison and a presence check. Handing them to a system that composes an answer replaces arithmetic you can audit with prose you have to check. Step three wants open output, because nobody can enumerate the right email. Step four is dangerous for a different reason, covered in the control module. The instinct that one clever system should own the whole chain is the most reliable way to make a fast, auditable step slow and unauditable.",
    },
    sections: [
      {
        title: "Closed output",
        paragraphs: [
          "Closed means the answer comes from a set you can write down in advance. Yes or no. One of eleven claim types. A score between zero and one. A match or a break. Because the set exists before the system runs, everything downstream gets easier: you can construct a labelled sample, compute how often it is right, compare this month against last month, and put an error bar around that comparison tight enough to act on.",
          "Most of the load-bearing decisions in an operating business are closed, and they should stay that way. Three-way match within tolerance is a comparison. Duplicate detection, once the features exist, is a classifier. Slotting is an optimizer. Eligibility, once the rules are written, is a rulebook. None of these improve when a model composes an answer in sentences, and all of them become harder to defend.",
        ],
      },
      {
        title: "Open output",
        paragraphs: [
          "Open means the output is composed instead of chosen: the next word, then the next, until it stops. There is no set to enumerate, which is why it can handle a vendor email in a format nobody anticipated, an attachment that arrived as a photograph of a screen, or an exception that has never occurred before in this shape. That capability carries one price, and it is the same price every time. The system can compose something false with the same fluency it composes something true.",
          "So open output arrives at your systems of record wrapped or refused. Three wrappers do almost all the work in practice. A schema constrains the shape, so the output has to be a filled-in structure instead of free prose. A fetch replaces invention with retrieval, so an identifier comes from a lookup. A person reviews before anything goes out. Most production designs use all three in different places, and the design question is which one applies where.",
        ],
        split: [
          {
            title: "Closed",
            body: "Known set. Tight error bars. Auditable by sampling against a specification. Keep identity, amounts and matching here, permanently.",
          },
          {
            title: "Open",
            body: "Composed tokens. Unbounded, which is both the capability and the hazard. Wrap with a schema, a fetch, or a person before it may write anything.",
          },
        ],
      },
      {
        title: "The upgrade instinct, and what it costs",
        paragraphs: [
          "There is a strong pull toward replacing closed steps with open ones, and it comes from a reasonable place. The open system is more impressive in a demo, it handles the edge case that broke the rule last quarter, and it feels like progress. The pull is worth resisting on the specific steps where identity, amounts and matching live.",
          "A worked case makes the cost concrete. A three-way match on a fixed tolerance runs in milliseconds, costs nothing per item, produces the same answer every time, and can be explained to an auditor in one sentence. The same comparison performed by a generative system costs a fraction of a cent per item, takes a second, produces a slightly different explanation each run, and now requires a validator to confirm that the arithmetic was arithmetic. You have added latency, cost and a new failure mode in exchange for flexibility on a step that never needed any.",
          "The productive pattern runs the other way. Leave the closed steps closed, aim open output at the part that was always language, and let the closed steps consume what the open step produced after it has been constrained into a shape they can accept.",
        ],
        list: [
          "Identity, amounts, matching and eligibility: closed, and defended as closed.",
          "Reading unstructured input and writing a response: open, and worth paying for.",
          "The boundary between them: a schema, so the open half hands the closed half a structure instead of a paragraph.",
          "Anything that touches a system of record: gated, whichever side it came from.",
        ],
      },
    ],
    widget: {
      kind: "sorter",
      dataset: "closed-open",
      caption:
        "Take one invoice queue apart. Sort each step into closed or open, then see what auditing each pile actually costs.",
    },
    instrument: {
      name: "The closed/open split sheet",
      body: "Run this on any workflow before designing anything. Twenty minutes, and it decides most of the architecture.",
      items: [
        "List the steps as they happen today, in order, one line each.",
        "For each: can you write down the full set of acceptable answers in advance?",
        "If yes, mark it closed. It stays a rule, a lookup, a comparison or a classifier.",
        "If no, mark it open. Note which wrapper applies: schema, fetch, or person.",
        "Mark every step that changes something in another system. Those need a gate whichever pile they are in.",
        "Count the open steps. That count, and not the number of steps, is what the project is actually about.",
      ],
    },
    soWhat:
      "You can look at a proposed design and say which steps have been handed to the wrong kind of system. That is the most common and most expensive design error in this field, and it is visible before anything gets built.",
    checks: [
      {
        q: "Which of these should stay closed, and why?",
        options: [
          {
            text: "Deciding whether a purchase-order line and an invoice line match within a stated tolerance.",
            correct: true,
            feedback:
              "Correct. The set of acceptable answers is writable in advance, the comparison is exact, and it can be explained to an auditor in one sentence.",
          },
          {
            text: "Writing the email that asks a buyer to file a missing receipt today.",
            feedback:
              "Nobody can enumerate the right email. This is the step that wants open output.",
            impliesMissing: "A-OPENCLOSED",
          },
          {
            text: "Reading a vendor's PDF that arrived as a photograph of a screen.",
            feedback:
              "Unbounded input in an unanticipated format is what open output handles well.",
            impliesMissing: "A-OPENCLOSED",
          },
        ],
      },
      {
        q: "A team wants a generative system to perform the three-way match because it handles edge cases better. What is the strongest objection?",
        options: [
          {
            text: "It will be too slow for the volume.",
            feedback:
              "True, and the weakest of the objections. Latency is a number you could in principle buy your way out of.",
            impliesMissing: "A-OPENCLOSED",
          },
          {
            text: "An exact, identical-every-time comparison has been replaced by a composed answer, so a validator is now needed to confirm that arithmetic was arithmetic. and the flexibility gained was never used.",
            correct: true,
            feedback:
              "Correct. Cost, latency and variance all worsen, and a new failure mode appears, in exchange for capability the step had no use for.",
          },
          {
            text: "Generative systems cannot do arithmetic.",
            feedback:
              "Too strong and beside the point. The objection stands even where the arithmetic comes out right, because you can no longer show that it will.",
            impliesMissing: "A-OPENCLOSED",
          },
        ],
      },
      {
        q: "What turns open output into something a system of record can accept?",
        options: [
          {
            text: "A more capable model, since better models invent less.",
            feedback:
              "Capability shifts how often, never whether. The mechanism that makes invention possible survives every upgrade, as the next lesson shows.",
            impliesMissing: "A-OPENCLOSED",
          },
          {
            text: "A constraint: a schema that fixes the shape, a fetch that replaces invention with lookup, or a person who reviews before it lands.",
            correct: true,
            feedback:
              "Correct. Production designs typically use all three, in different places, and choosing which applies where is most of the design.",
          },
          {
            text: "Clear instructions telling the system to be accurate and to avoid making things up.",
            feedback:
              "An instruction changes the odds slightly and guarantees nothing. A constraint gets enforced by software that can refuse.",
            impliesMissing: "A-OPENCLOSED",
          },
        ],
      },
    ],
    next: "next-token",
    relatedUseCases: ["ap-invoice-exceptions", "bank-rec-exceptions"],
  },
  {
    slug: "next-token",
    order: 6,
    n: "1.4",
    module: "M1",
    kind: "lesson",
    minutes: 24,
    title: "What is the model actually doing?",
    blurb:
      "Chop the text into tokens, produce a probability for every possible next one, pick one, append it, repeat. That is the whole generative trick.",
    thesis:
      "A generative model turns a sequence of tokens into a probability distribution over the next token, samples one, appends it, and runs again. Every property people find surprising about these systems falls out of that loop.",
    lede:
      "This lesson is the primitive. Everything after it is derived from what happens here, so a reader who leaves with a fuzzy version will spend the rest of the course memorising rules instead of reconstructing them. It takes twenty minutes and it is worth all of them.",
    youWill: [
      "Describe generation as tokenise, distribute, sample, append, repeat.",
      "Explain why an amount or an identifier is the most fragile thing in a generated sentence.",
      "See why the model has no separate step where it decides whether it knows something.",
      "Say what a token is, and why cost, latency and limits are all measured in them.",
    ],
    atoms: ["A-NEXTTOKEN", "A-TOKENS"],
    prereqs: ["A-OPENCLOSED"],
    ceiling:
      "Tokens, a distribution over the vocabulary, sampling, append, repeat. No embeddings, no layers, no weights, no training. training is 3.1. The conclusions that must follow are fluent invention, variance, and cost measured in tokens.",
    situation: {
      artifact:
        "A model is asked: what is the invoice amount? The context contains everything about the invoice except the amount. It answers, in a clean sentence, that the amount is $14,200.00. which happens to be correct.",
      prompt: "What just happened?",
      options: [
        "It found the amount somewhere in the context and reported it",
        "It reasoned the amount out from the purchase order",
        "It composed a plausible amount and happened to land on a true one",
        "There is no way to tell from the output",
      ],
      reveal:
        "The last two, together, and they are the same answer. It composed a plausible continuation, and the sentence it produced would have looked identical had it landed on $14,000 or $41,200. That is the point of this lesson: the confident shape of the output carries no information about whether the fact was there. By the end you will know why, and why no amount of instruction changes it.",
    },
    sections: [
      {
        title: "Tokens",
        paragraphs: [
          "The model reads neither letters nor words. Text is chopped into tokens: common words become single tokens, rarer words split into fragments, and digits often split in ways that look arbitrary. The word invoice is probably one token. The string 8812 might be two. The amount $14,200.00 could easily be five or six.",
          "Tokens matter for three practical reasons that recur throughout this course. Every price you are quoted is per token. Every context limit you are given is in tokens. And every number, identifier and code in your business gets shredded into fragments that carry no arithmetic meaning, which is the mechanical root of a failure mode you will meet in the next section.",
        ],
      },
      {
        title: "One step of generation",
        paragraphs: [
          "Given the tokens so far, the model produces a score for every token in its vocabulary, tens of thousands of them, and turns those scores into probabilities that sum to one. That distribution is the model's entire output for this step. Everything else is machinery around it.",
          "Then one token gets chosen. Always taking the highest-probability token produces repetitive and, oddly, often worse text, so a token is usually sampled from near the top of the distribution, which introduces the variance you will meet in lesson 1.6. The chosen token joins the sequence, and the whole thing runs again with one more token of input. A four-hundred-word reply is roughly five hundred repetitions of that loop.",
          "Notice what has no place in this loop. There is no step where the model checks whether it knows the answer. No separate retrieval phase, no internal database lookup, no flag that gets raised when the required fact was absent from the input. The only thing available at each step is to produce a distribution and continue. Everything that looks like knowing, checking, or refusing is itself more tokens produced by the same loop.",
        ],
        list: [
          "Tokenise. Text becomes tokens: words, fragments, digits. This is where your identifiers stop being identifiers.",
          "Distribute. A probability for every token in the vocabulary. The model's entire output for one step.",
          "Sample. One token is chosen from near the top, because always taking the top gives worse text.",
          "Append and repeat. The chosen token joins the input and the loop runs again. A long answer is hundreds of these.",
        ],
      },
      {
        title: "Why an amount is the most fragile thing in the sentence",
        paragraphs: [
          "Follow the loop through a specific case. The model has produced: the invoice amount is $14, and now needs the next token. If the amount was present in its input, the continuation is strongly constrained, the tokens that follow are effectively determined, and the distribution puts nearly all its mass in one place. If the amount was absent, the model still has to produce a distribution, because producing a distribution is the only thing it does. That distribution now spreads across every plausible continuation: 200, 500, 000, and dozens of others, none of them unlikely English.",
          "One of them gets sampled. The sentence continues with the same grammar, the same confidence, the same currency formatting. Nothing in the resulting text records which of the two situations produced it. That is the mechanism, and it explains why prose about amounts, dates, identifiers and codes is where these systems are least trustworthy. Those are the positions where a missing fact leaves the widest distribution and the output looks most normal.",
        ],
        example: {
          body: `Ask for a summary of invoice ${CASE.invoice} with the ${CASE.missing} absent from the context. You will very likely receive a fluent paragraph that mentions a goods receipt, possibly with a date. No warning will accompany it. The paragraph is doing what the model always does, which is continuing plausibly. This is why the later modules spend so much effort on fetching identifiers instead of letting them be composed.`,
        },
      },
      {
        title: "What this buys, and what it costs",
        paragraphs: [
          "Stated plainly, the trick sounds too simple to explain the results. Predicting the next token over a large enough corpus turns out to require compressing an enormous amount of structure: grammar, of course, but also the shape of arguments, the conventions of a purchase order, the way a polite chase email is written, and how a paragraph about a missing receipt tends to go. Doing that job well at scale produces something that behaves as though it understands, across an extremely wide range of tasks.",
          "It also produces the ceiling. The system holds no representation of whether a specific fact was present, no way to abstain by default, and no mechanism that distinguishes an amount it read from an amount it composed. Schemas, fetches, gates, validators and evals all exist because of that ceiling, and none of them would be needed without it.",
        ],
        list: [
          "Cost, latency and context limits are all measured in tokens, so all three scale with how much you put in and how much you ask for.",
          "Identifiers and amounts split into fragments that carry no arithmetic meaning, which is why arithmetic gets done by a tool.",
          "There is no built-in abstain. Refusal is itself generated text, and it happens or fails to happen probabilistically.",
          "Anything you want guaranteed has to be guaranteed outside the model.",
        ],
      },
    ],
    misconception: {
      says: "It understands the question and then looks up the answer.",
      why: "There is no lookup step. One operation repeats: produce a distribution over the next token and choose. When the required fact was in the input, the distribution collapses onto it and the answer is right. When it was absent, the distribution stays wide and something plausible gets sampled, in the same voice. The output looks identical either way, which is why constraints have to live outside the model.",
    },
    widget: {
      kind: "tokens",
      mode: "distribution",
      dataset: "invoice-amount",
      caption:
        "Watch the distribution at each step. Then remove the amount from the context and watch the same position go from one candidate to a dozen, with the sentence around it unchanged.",
    },
    instrument: {
      name: "The fragile-position test",
      body: "Read any generated passage and mark the positions where a missing fact would have left a wide distribution. Those are the only positions worth checking, and checking them takes seconds.",
      items: [
        "Underline every number, date, identifier, code and proper noun.",
        "For each, ask whether it was in the input or could have been composed.",
        "Anything that could have been composed needs a fetch or a validator, permanently.",
        "Prose between the underlines is usually safe to read as prose.",
        "If you cannot tell what was in the input, that is the finding. The system needs a trace.",
      ],
    },
    soWhat:
      "You can explain, from mechanism instead of anecdote, why these systems invent identifiers, why the invention looks exactly like the truth, and why every serious design puts a fetch or a validator around the positions where facts belong.",
    checks: [
      {
        q: "Why does a model produce a plausible purchase-order number instead of saying it does not have one?",
        options: [
          {
            text: "Because it was trained to be helpful and dislikes refusing.",
            feedback:
              "Training shapes tendencies, and the mechanism sits underneath them. Even a model heavily steered toward caution has one operation available at each step.",
            impliesMissing: "A-NEXTTOKEN",
          },
          {
            text: "Because producing a distribution over the next token is the only operation it has, and with the fact absent the distribution stays wide, so something gets sampled from it.",
            correct: true,
            feedback:
              "Correct. There is no abstain primitive. Refusal is generated text, subject to the same loop, and therefore probabilistic.",
          },
          {
            text: "Because the number was in its training data somewhere.",
            feedback:
              "Sometimes true and never the explanation. It composes plausible identifiers for businesses that did not exist when it was trained.",
            impliesMissing: "A-NEXTTOKEN",
          },
        ],
      },
      {
        q: "Costs and limits in this field are quoted per token. Why does that follow from the mechanism?",
        options: [
          {
            text: "Because tokens are how the industry chose to price the product.",
            feedback:
              "A pricing convention that reflects a physical fact instead of an arbitrary choice.",
            impliesMissing: "A-TOKENS",
          },
          {
            text: "Because the loop runs once per token produced and reads the whole sequence each time, so tokens are the unit of work.",
            correct: true,
            feedback:
              "Correct. Input tokens are read, output tokens are produced one loop each, and both consume real compute.",
          },
          {
            text: "Because words vary in length between languages.",
            feedback:
              "True and unrelated. The unit exists because it is the unit of the loop.",
            impliesMissing: "A-TOKENS",
          },
        ],
      },
      {
        q: "A team adds the line 'if you are unsure, say you do not know' to their prompt. What should they expect?",
        options: [
          {
            text: "The problem is solved, since the model now has permission to abstain.",
            feedback:
              "Permission was never missing. There is no internal unsure state for the instruction to consult.",
            impliesMissing: "A-NEXTTOKEN",
          },
          {
            text: "It shifts the odds, so abstaining text becomes somewhat more likely, and it guarantees nothing, because the abstention is itself sampled from a distribution.",
            correct: true,
            feedback:
              "Correct. Useful, cheap, worth doing, and never a control. Controls live outside the model and can refuse.",
          },
          {
            text: "The model will now abstain too often and become useless.",
            feedback:
              "Over-refusal happens, and it is a tuning problem sitting on top of the mechanism. The mechanism point is that neither behavior is guaranteed.",
            impliesMissing: "A-NEXTTOKEN",
          },
        ],
      },
    ],
    next: "attention",
    relatedUseCases: ["ap-invoice-exceptions", "freight-invoice-audit"],
  },

  {
    slug: "attention",
    order: 7,
    n: "1.5",
    module: "M1",
    kind: "lesson",
    minutes: 22,
    title: "Why is a long document more than proportionally expensive?",
    blurb:
      "Attention compares every token against every other token in the window. Everything about long-context cost and long-context degradation follows from that one sentence.",
    thesis:
      "At every step the model weighs each token in the window against every other one, so the work grows with the square of the length and a long window forces a fixed budget of attention to spread thinner over more competing material.",
    lede:
      "This is where the depth ceiling matters most. Four conclusions have to follow: cost grows faster than length, the middle of a long window fares worst, a tight retrieved packet beats a document dump, and something real changed in 2017. You need exactly enough mechanism to make those follow, and no more. Anything beyond that is a machine-learning class, and it will improve no decision you make.",
    youWill: [
      "Explain in one sentence what attention does, and what it does not.",
      "Predict the cost shape of doubling a document, with no arithmetic.",
      "Say why the middle of a long context is the worst place for something you need.",
      "Explain what 2017 bought, and why it took five more years to feel it.",
    ],
    atoms: ["A-ATTENTION", "A-LONGCTX"],
    prereqs: ["A-NEXTTOKEN"],
    ceiling:
      "Every token compared against every other; comparisons produce weights; weights decide what informs the next prediction; the count of comparisons grows with the square of the length. Stop there. No softmax, no query/key/value, no positional encodings, no heads, no matrices.",
    situation: {
      artifact:
        "Two ways of asking the same question. Version A: a two-page packet containing the invoice, the purchase order and the receiving record, then the question. Version B: the same question with the vendor's entire 240-page master agreement attached, on the reasoning that more context cannot hurt.",
      prompt: "Which performs better, and by how much?",
      options: [
        "B, clearly. more context means more to work with",
        "About the same, but B costs more",
        "A, and B is also slower and more expensive",
        "Depends entirely on the model",
      ],
      reveal:
        "A, and the gap is larger than most people expect. B costs more than a hundred times as much per call, takes several times longer, and answers worse, because the material that settles the question is now competing with two hundred pages of related, plausible, irrelevant text. The instinct that more context cannot hurt is wrong for a mechanical reason, and this lesson is that reason.",
    },
    sections: [
      {
        title: "What attention does",
        paragraphs: [
          "At each step of the loop from the last lesson, before the model produces its distribution, it has to decide which parts of the sequence matter for this particular prediction. It does that by comparing every token in the window against every other token, producing a weight for each pair. High weight means this token strongly informs that one. The next-token distribution is then shaped by the tokens that earned weight.",
          "That mechanism is why a pronoun three paragraphs down can resolve to a noun at the top of the document, and why a number in a table can be connected to the header that names it. Nothing else in the design carries long-range links; attention is the whole of it.",
          "Two consequences follow immediately, and they are the only two you need. First, the count of comparisons grows with the square of the sequence length, so doubling the input roughly quadruples the pairwise work. Providers optimise heavily around this and prices rarely scale that steeply, and the underlying pressure is why long context gets priced and rate-limited the way it does, and why latency climbs faster than length. Second, weight is finite. Every token in the window competes for it, so material with no bearing on the question dilutes the weight available to the material that has one.",
        ],
      },
      {
        title: "Why the middle fares worst",
        paragraphs: [
          "Across a wide range of systems, a fact placed near the beginning or the end of a long context gets found reliably, while the same fact placed in the middle gets missed far more often. The pattern is consistent enough to design around, it has a name, the lost-in-the-middle effect, and the shape of the curve is a property to assume rather than hope has been fixed by a newer release.",
          "You need none of the full explanation to use it. What you need is the design consequence: when a specific fact has to be found, put it at the top or the bottom of the context, keep the context short, and never rely on something buried at forty percent depth in a long document.",
        ],
      },
      {
        title: "What 2017 actually bought",
        paragraphs: [
          "Attention as an idea predates 2017. What the transformer architecture contributed was a design in which those comparisons happen for the whole sequence at once, instead of walking through the text one position at a time as earlier language models did. That change made training parallel, which made it possible to train on far more text with the hardware available, which eventually produced systems large enough to be useful.",
          "So the honest one-line history is that 2017 removed a training bottleneck, and roughly five years of scaling on the other side of that bottleneck passed before anyone outside a lab felt the difference. Both halves of that sentence matter: the architecture alone was never the product, and neither was the scale without it.",
        ],
        example: {
          title: "Two pages against two hundred",
          body: `To settle whether invoice ${CASE.invoice} may be paid, the material that matters is the invoice, PO ${CASE.po}, and the receiving record: perhaps two pages. Attaching the master services agreement adds two hundred pages of contractual language about receipts, deliveries and payment terms in general. All of it is topically adjacent, and all of it answers a different question. That adjacency is what makes it dangerous instead of merely wasteful.`,
        },
      },
      {
        title: "The design rule that falls out",
        paragraphs: [
          "Everything here converges on one habit: assemble a small packet instead of attaching a corpus. That habit governs cost, latency and accuracy simultaneously, which is rare enough to be worth building a process around.",
          "The rest of the course keeps returning to it. Retrieval exists to build the packet. Prompt structure exists to place the important parts where weight is available. Compaction exists because histories grow, and it damages exactly the material this lesson tells you to protect.",
        ],
        list: [
          "Put what settles the question at the top or the bottom, never at forty percent depth.",
          "Prefer three relevant pages to three hundred related ones, and treat topical adjacency as a hazard.",
          "Expect latency to climb faster than length, and design interactive experiences accordingly.",
          "When someone proposes attaching an entire document set, ask which two pages settle the question.",
        ],
      },
    ],
    misconception: {
      says: "The window is enormous now, so just paste the whole contract in.",
      why: "A large window is a capacity, and using all of it carries three separate costs: a superlinear rise in work, a latency curve that climbs faster than the page count, and dilution of the finite weight available to the passage that settles the question. Large windows are for when you cannot narrow the material, which is rarer than it feels.",
    },
    widget: {
      kind: "context",
      mode: "needle",
      dataset: "packet-vs-dump",
      caption:
        "Same question, same fact, three depths and two context sizes. Predict which placement loses the number before you reveal the answers.",
    },
    instrument: {
      name: "The packet rule",
      body: "One page, pinned above the desk of anyone designing prompts or retrieval.",
      items: [
        "Name the question the call has to settle, in one sentence.",
        "List only the documents that could change that answer. Usually two or three.",
        "Put the decisive material first or last, never in the middle of a long body.",
        "Attach nothing on the grounds that it might be useful.",
        "If the packet exceeds a few pages, the question was probably two questions.",
      ],
    },
    soWhat:
      "You can push back on the most common and most expensive prompt-design instinct there is, with a mechanism instead of an opinion, and you can predict the direction of cost, latency and accuracy before anyone runs a test.",
    checks: [
      {
        q: "A team doubles the context they send. What should they expect?",
        options: [
          {
            text: "Roughly double the cost, roughly double the latency, and better answers.",
            feedback:
              "Linear is the optimistic case for price alone. Latency climbs faster, and answers frequently get worse.",
            impliesMissing: "A-LONGCTX",
          },
          {
            text: "Cost and latency rising faster than the length, and accuracy that may well fall because the decisive passage now competes with more material.",
            correct: true,
            feedback:
              "Correct, and the accuracy half surprises people the most. More context is more competition, not more information.",
          },
          {
            text: "No change, since modern windows are large enough that length stopped mattering.",
            feedback:
              "Capacity and effectiveness differ. A window you can fill is not a window you should fill.",
            impliesMissing: "A-ATTENTION",
          },
        ],
      },
      {
        q: "You have one fact that must be found inside a long context. Where do you put it?",
        options: [
          {
            text: "In the middle, so it sits close to the related material.",
            feedback:
              "The worst available position, consistently, across systems. Proximity to related text fails to help.",
            impliesMissing: "A-LONGCTX",
          },
          {
            text: "At the top or the bottom, and better still, shorten the context so placement stops mattering.",
            correct: true,
            feedback:
              "Correct. Placement is the mitigation; shortening is the fix.",
          },
          {
            text: "Repeat it three times throughout the document.",
            feedback:
              "A crude tactic that sometimes helps and adds tokens and confusion. Shortening the packet does the same job cleanly.",
            impliesMissing: "A-LONGCTX",
          },
        ],
      },
      {
        q: "In one sentence, what did the 2017 architecture change?",
        options: [
          {
            text: "It taught models to understand meaning instead of pattern-matching.",
            feedback:
              "A marketing sentence, not a mechanism. Nothing in the architecture introduces a separate faculty of understanding.",
            impliesMissing: "A-ATTENTION",
          },
          {
            text: "It let every position be compared against every other in parallel instead of by walking the sequence, which made training on far more text practical.",
            correct: true,
            feedback:
              "Correct, and the honest follow-up is that roughly five more years of scaling were required before anyone outside a lab felt the difference.",
          },
          {
            text: "It made context windows large.",
            feedback:
              "Large windows came much later, as a consequence of engineering around the very cost this lesson describes.",
            impliesMissing: "A-LONGCTX",
          },
        ],
      },
    ],
    next: "why-it-differs",
    relatedUseCases: ["customs-entry-document-packs", "lease-critical-date-chase"],
  },

  {
    slug: "why-it-differs",
    order: 8,
    n: "1.6",
    module: "M1",
    kind: "lesson",
    minutes: 18,
    title: "Why did it answer differently the second time?",
    blurb:
      "Sampling means identical inputs produce different outputs by design. Running it again is a coin, and a coin makes a poor control.",
    thesis:
      "Because a token is sampled from a distribution instead of always taken from the top, the same input produces different outputs on different runs, so a single run tells you almost nothing and a second run that looks better tells you nothing at all.",
    lede:
      "The shortest lesson in the module, and it changes how you watch every demo for the rest of your life. Variance is designed in, for good reasons. The consequence is that one observation of a system of this kind carries roughly as much information as one observation of a coin.",
    youWill: [
      "Explain where run-to-run variation comes from, and why it was designed in.",
      "Say what temperature does, and what it leaves untouched.",
      "State what a single successful demo run does and does not establish.",
    ],
    atoms: ["A-VARIANCE", "A-TEMPERATURE"],
    prereqs: ["A-NEXTTOKEN"],
    ceiling:
      "Sampling from the distribution, and temperature as a spread control. No decoding-strategy taxonomy, no seeds beyond a mention. The conclusion is that n=1 is uninformative and that reruns are not a control.",
    situation: {
      artifact:
        "In a vendor demo the system extracts eight fields from an invoice, correctly. Someone asks to see it again on the same document. The second run gets seven of eight; the vendor says that is unusual and runs it a third time, which is clean.",
      prompt: "What have you learned from those three runs?",
      options: [
        "That it works, with an occasional glitch",
        "That it is roughly 87% accurate on this document",
        "That the output varies run to run, and three runs cannot tell you the rate",
        "That the second run was a fluke and should be discounted",
      ],
      reveal:
        "The third. You have learned something real and quite narrow: this system's output varies on identical input, which you should have assumed. You have learned nothing usable about the rate, because three runs on one document cannot produce one. The most revealing moment was the phrase that is unusual, a claim about a rate offered with no measurement behind it.",
    },
    sections: [
      {
        title: "Where the variation comes from",
        paragraphs: [
          "At each step the model produces a distribution and one token gets chosen. Always choosing the highest-probability token sounds sensible and produces noticeably worse text: repetitive, prone to loops, oddly flat. So implementations sample from near the top of the distribution instead, and that choice is where run-to-run variation enters.",
          "Once a different token has been chosen at any position, every subsequent step sees a different sequence, so small early divergences can produce substantially different outputs by the end. Two runs of the same prompt can agree on seven fields and differ on the eighth, or can produce two paragraphs that read as though written by different people.",
          "Even with sampling turned down as far as it goes, exact repeatability is rarely available in practice. Batching, hardware and provider-side changes all introduce small variations. Treat determinism as something you engineer around and never as something you can request.",
        ],
      },
      {
        title: "Temperature, and what it leaves alone",
        paragraphs: [
          "Temperature is the dial controlling how far down the distribution sampling is willing to reach. Low temperature concentrates choices near the top and produces more consistent, more conservative text. High temperature flattens the distribution and produces more varied text. Low is right for extraction and structured output; high is right for drafting where variety helps, and wrong anywhere a number matters.",
          "What the dial leaves alone is worth naming. It has no effect on whether the required fact was in the context. A low temperature makes the model more consistently produce its most likely continuation, and when the fact was absent, the most likely continuation is still composed. Turning temperature down makes a system reliably confident where it used to be visibly unreliable, which is a subtler failure than the one it replaced.",
        ],
      },
      {
        title: "What one run establishes",
        paragraphs: [
          "One successful run establishes that success is possible. That is a real fact and a small one, and it is the entire informational content of most demos.",
          "The habit that follows is the cheapest quality practice in this field. Whenever someone shows you a working output, ask to see the same input run twenty times. It costs a few cents and a couple of minutes. What comes back is a distribution instead of an anecdote, and a distribution is something you can reason about. The reaction to the request is informative too: a team that has never done it is telling you something about how the system was built.",
        ],
        example: {
          body: `Extract the amount from invoice ${CASE.invoice} twenty times. If nineteen runs return ${CASE.amount} and one returns ${CASE.amountShort}.00 with the cents dropped, you have found a real defect that a single run would have hidden, and you have found it before it reached a payment file.`,
        },
      },
    ],
    misconception: {
      says: "It got it wrong that time. let me run it again.",
      why: "Rerunning changes the sample, so a better second result is a second draw and never a repair. Nothing about the system changed between the two runs. Treating the good run as the true behavior and the bad one as noise inverts the correct reading, which is that both are draws from a distribution nobody has measured.",
    },
    widget: {
      kind: "tokens",
      mode: "resample",
      dataset: "resample-20",
      caption:
        "The same extraction, twenty times, at three temperatures. Watch what stays stable and what moves, and note which field moves first.",
    },
    instrument: {
      name: "The n-of-20 habit",
      body: "The cheapest quality practice in this field. Use it in every demo, every pilot review, and every vendor call.",
      items: [
        "Never accept a single run as evidence about behavior.",
        "Ask for the same input, twenty times, and ask to watch.",
        "Record how many differ, and in which field. The field that moves first is where the fact was thin.",
        "Ask what temperature was used, and whether anything else changed between runs.",
        "If nobody has ever run it twenty times, that is the finding of the meeting.",
      ],
    },
    soWhat:
      "You can watch any demo and know exactly what it did and did not establish, and you have a request that takes two minutes and converts an anecdote into a distribution. Every evaluation lesson later in the course builds on this habit.",
    checks: [
      {
        q: "A vendor's demo works on stage. What have you established?",
        options: [
          {
            text: "That the system works on this class of document.",
            feedback:
              "One run on one chosen document supports no claim about a class. Two things were selected here: the document and the run.",
            impliesMissing: "A-VARIANCE",
          },
          {
            text: "That success is possible on this document. Nothing about a rate, on this document or any other.",
            correct: true,
            feedback:
              "Correct, and saying it out loud in the room reframes the entire conversation politely.",
          },
          {
            text: "That the system is deterministic, since it produced a clean result.",
            feedback:
              "A clean result carries no information about variance. That is what makes the single run so misleading.",
            impliesMissing: "A-VARIANCE",
          },
        ],
      },
      {
        q: "A team sets temperature to zero to make their extraction reliable. What have they achieved?",
        options: [
          {
            text: "Reliability. the output is now deterministic and correct.",
            feedback:
              "Two errors. Exact determinism is rarely available in practice, and consistency says nothing about correctness.",
            impliesMissing: "A-TEMPERATURE",
          },
          {
            text: "More consistent output, which is worth having, and no change at all to whether the required fact was in the context.",
            correct: true,
            feedback:
              "Correct. A system that composes the same wrong amount every time has traded a visible failure for a quiet one.",
          },
          {
            text: "Nothing, since temperature only affects creative writing.",
            feedback:
              "Too dismissive. Consistency matters for structured output; it simply solves a different problem from accuracy.",
            impliesMissing: "A-TEMPERATURE",
          },
        ],
      },
      {
        q: "Why is running it again a poor control?",
        options: [
          {
            text: "Because it costs money each time.",
            feedback:
              "True and trivial. The objection would stand if reruns were free.",
            impliesMissing: "A-VARIANCE",
          },
          {
            text: "Because a rerun draws again from the same distribution, so a better result reflects the draw and not any change in the system.",
            correct: true,
            feedback:
              "Correct. A control is something that can refuse. A rerun can only produce another sample.",
          },
          {
            text: "Because the model remembers the first attempt and biases the second.",
            feedback:
              "Nothing carries between calls unless something put it there, which is the subject of lesson 2.4.",
            impliesMissing: "A-VARIANCE",
          },
        ],
      },
    ],
    next: "hallucination",
    relatedUseCases: ["ap-invoice-exceptions", "expense-report-exceptions"],
  },
];
