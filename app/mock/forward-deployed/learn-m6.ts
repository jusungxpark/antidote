import type { LearnLesson } from "./learn-types";
import { CASE } from "./learn-case";

export const M6_LESSONS: LearnLesson[] = [
  {
    slug: "guardrails",
    order: 38,
    n: "6.1",
    module: "M6",
    kind: "lesson",
    minutes: 22,
    title: "What is a guardrail, physically?",
    blurb:
      "A guardrail is software that can refuse. A human in the loop is a person a defined class of action waits for. Conflating them produces a system with neither.",
    thesis:
      "A guardrail is code that inspects a proposed action and can block it, a human in the loop is a person whose approval a defined class of action waits for, and a sentence in a prompt is neither of those things.",
    lede:
      "Ask a room what guardrails they have and most of the answers describe intentions. We told it to be careful. There is a review process. The team keeps an eye on it. None of those can refuse anything, and refusal is the property separating a control from a hope. This module is built on that single distinction.",
    youWill: [
      "Apply the refusal test to anything described as a control.",
      "Separate software controls from human controls, and see why both are needed.",
      "Name the four kinds of guardrail and what each catches.",
      "Spot a prompt doing an impression of a control.",
    ],
    atoms: ["A-GUARDRAIL", "A-HITL"],
    prereqs: ["A-VERIFY", "A-CONTRACT"],
    ceiling:
      "The refusal test, the four guardrail kinds, and human review as a control on typed actions. Autonomy levels arrive in the next lesson and depend on this one.",
    situation: {
      artifact:
        "A vendor's control list, quoted in full: a strict system prompt forbidding unauthorised actions, human review of all outputs before release, comprehensive audit logging, and staff training on responsible use.",
      prompt: "How many of those four can refuse an action?",
      options: [
        "All four",
        "Three, everything except the training",
        "One, and only if the review is enforced instead of encouraged",
        "None",
      ],
      reveal:
        "One, conditionally. A prompt shifts probabilities. Logging records what happened after it happened. Training acts on people instead of on what the system may do. Human review can refuse, provided a release is blocked until someone approves and not merely that a person is expected to look. The distance between a blocking gate and an expectation is the whole of whether that fourth control exists.",
    },
    sections: [
      {
        title: "The refusal test",
        paragraphs: [
          "Ask of anything called a control whether it can stop the action from happening, and whether it ever has. Two clauses, and both do work. A control that could refuse in principle and has refused nothing across six months of operation is either perfectly configured or inert, and the logs settle which in about a minute.",
          "The test disqualifies a familiar list. Instructions, however emphatic. Model self-assessment, for the reason lesson 2.2 gave. Logging, which is essential and retrospective. Training, which acts on people. Dashboards, which display. Every one of those is worth having and none of them is a guardrail.",
          "It qualifies a shorter list, and everything on it is code sitting at the propose-execute boundary from lesson 4.1, able to come back negative. Schema and argument validation catches malformed output and out-of-range values before anything consumes them, at almost no cost. Permission checks ask whether this caller may use this tool on this record right now, which catches the action that should never have been available. Rate and spend caps bound volume, frequency and cost, which bounds the damage when every other control has failed. Content cross-checks ask whether the amount matches the record, whether the identifier resolves, and whether the recipient sits on the approved list, and they are what catches invention.",
        ],
      },
      {
        title: "People as controls",
        paragraphs: [
          "A human in the loop becomes a control when a defined class of action cannot proceed without a specific person approving it. That definition carries three requirements, and all three go missing regularly.",
          "The class has to be defined, so approval attaches to external sends or to writes above a threshold and not to everything, because review of everything is review of nothing once volume turns it into clicking. The gate has to block, meaning the action waits; a person expected to check afterwards is a monitor, which is a legitimate role under a different name. And the reviewer needs enough material to refuse with, meaning the proposed action, the evidence behind it, and whatever confidence signals carry information. A reviewer handed a finished draft with no supporting material approves nearly all of them, and the queue teaches them to approve faster.",
          "The failure worth naming in advance is review fatigue. A gate on ninety-five percent of items produces a reviewer who approves in two seconds, and the control decays into a delay while still appearing on the control list. That is the reason the next lesson sets autonomy per action type instead of once for the system.",
        ],
      },
      {
        title: "Both, in different places",
        paragraphs: [
          "Software controls are cheap, fast, tireless and literal. They catch exactly what they were written to catch and nothing else. Human controls are expensive and slow, and they can notice that something is wrong in a way nobody anticipated. Neither substitutes for the other, so the design question is where each one belongs.",
          "The pattern that works puts software controls on everything mechanical, meaning shape, permission, limits and cross-checks, and reserves human review for the small set of actions where judgment is required and the consequence justifies the cost. Getting that split right separates a control system that scales from one that becomes the bottleneck it was built to prevent.",
        ],
        list: [
          "Software controls are mechanical, cheap and literal, so put them everywhere they apply.",
          "Human gates are expensive and capable of judgment, so reserve them for defined and consequential classes.",
          "A gate on everything is a gate on nothing, because volume turns review into clicking.",
          "Every control should have fired at least once. One that never has is worth an hour of investigation.",
        ],
        example: {
          title: "The controls on the running case",
          body: `The ${CASE.queue} queue carries four software controls and one human gate. Schema validation runs on every extraction. An amount cross-check compares anything drafted against the ERP record. An allowlist restricts sends to approved buyer addresses. A spend cap bounds each run. The human gate blocks external sends above a threshold and holds them until the queue owner approves. Four controls covering volume, one covering consequence.`,
        },
      },
    ],
    widget: {
      kind: "permissions",
      mode: "tools",
      dataset: "guardrails",
      caption:
        "Add a schema validator, an allowlist and a spend cap to a running trace, one at a time, and watch which incident each one stops.",
    },
    instrument: {
      name: "The guardrail inventory",
      body: "Two columns and a gap list. Half an hour, and the gap list is usually the useful part.",
      items: [
        "List the software controls that can refuse, and what each one refused this month.",
        "List the human gates, naming the action class, the approver, and whether the action waits.",
        "List the actions covered by neither column. That is the gap list.",
        "For every item on the gap list, write down what a wrong action would cost.",
        "Measure the review load, meaning what share of items reach a person and how long a typical approval takes.",
      ],
    },
    soWhat:
      "You can audit a control list in a meeting by asking one question of every line, and tell the difference between a system that is governed and one that has merely been instructed.",
    checks: [
      {
        q: "Which of these is a guardrail?",
        options: [
          {
            text: "A system prompt forbidding unauthorised actions.",
            feedback:
              "It shifts probabilities and cannot stop anything. Worth writing, and it belongs in a different column.",
            impliesMissing: "A-GUARDRAIL",
          },
          {
            text: "An allowlist in the send tool that rejects any recipient outside it.",
            correct: true,
            feedback:
              "Correct. It is code, it sits at the propose-execute boundary, and it can come back negative.",
          },
          {
            text: "Comprehensive audit logging of every action taken.",
            feedback:
              "Essential and retrospective. A log records the action it could not prevent.",
            impliesMissing: "A-GUARDRAIL",
          },
        ],
      },
      {
        q: "A team routes 95% of items to human review. What is the likely outcome?",
        options: [
          {
            text: "High accuracy, since almost everything is checked.",
            feedback:
              "That holds for the first week. Volume then converts review into clicking, and measured accuracy falls back toward the unreviewed rate.",
            impliesMissing: "A-HITL",
          },
          {
            text: "Approvals collapse to a few seconds each, and the gate becomes a delay instead of a control.",
            correct: true,
            feedback:
              "Correct, and the control list still shows the gate, which is what makes this failure hard to see from outside.",
          },
          {
            text: "The business case improves, because the review cost is fixed.",
            feedback:
              "Review cost scales with volume, and it is the largest line in most of these deployments.",
            impliesMissing: "A-QUEUEOWNER",
          },
        ],
      },
      {
        q: "What does a reviewer need in order to be a control instead of a rubber stamp?",
        options: [
          {
            text: "Training on how the system works.",
            feedback:
              "Useful, and it does nothing about a queue of finished drafts arriving faster than they can be examined.",
            impliesMissing: "A-HITL",
          },
          {
            text: "The proposed action, the evidence behind it, and a volume low enough to examine each one.",
            correct: true,
            feedback:
              "Correct. All three, and the third is the one that gets designed away first.",
          },
          {
            text: "The ability to edit the output before it goes.",
            feedback:
              "Helpful once they have decided something is wrong. It does not help them decide.",
            impliesMissing: "A-HITL",
          },
        ],
      },
    ],
    next: "autonomy-dial",
    relatedUseCases: ["ap-invoice-exceptions", "prior-auth-packet-chase"],
  },

  {
    slug: "autonomy-dial",
    order: 39,
    n: "6.2",
    module: "M6",
    kind: "lesson",
    minutes: 22,
    title: "How much autonomy, for which action?",
    blurb:
      "Autonomy is a dial set per action type, from read through to irreversible, earned with evidence and sampled forever after.",
    thesis:
      "Asking whether a system is autonomous is the wrong question, because autonomy is set independently for each class of action according to consequence and measured performance, and a well-run system holds several different settings at once.",
    lede:
      "The yes-or-no framing produces two bad outcomes and no good one. Answer yes and every action inherits the loosest setting the riskiest one can tolerate. Answer no and every action inherits the tightest, which removes the economic case that justified the project. The dial framing dissolves the question and produces a single page that can be put in front of a risk committee.",
    youWill: [
      "Classify any action into five consequence types.",
      "Set a starting autonomy level per type, defensibly.",
      "Say what evidence promotes an action type, and what demotes it.",
      "Explain why one system holds several settings at once.",
    ],
    atoms: ["A-AUTONOMYDIAL", "A-ACTIONTYPES"],
    prereqs: ["A-GUARDRAIL", "A-HITL", "A-JAGGED"],
    ceiling:
      "Five action types, four autonomy levels, and the promotion rule. The measurement that drives promotion belongs to module seven; the structure is what the reader needs here.",
    situation: {
      artifact:
        "A risk committee asks whether the AP agent is autonomous. The team answers no, everything is reviewed. Six months later the review queue holds 3,000 items, average review time is four seconds, and the business case has not materialised.",
      prompt: "What went wrong at the committee meeting?",
      options: [
        "The team should have answered yes",
        "The question had no good answer, and answering it produced a policy that could only fail",
        "The committee should have approved more autonomy",
        "The team should have hired more reviewers",
      ],
      reveal:
        "The second. Both available answers were wrong, because the question treats autonomy as a property of a system when it is a property of an action. Reading a purchase order and wiring a payment have nothing in common except the software they run inside. The answer that works is a grid: reads automatic, drafts automatic, internal notes automatic above a measured threshold, external sends gated, payments never touched. That answer is specific, it is defensible in front of the same committee, and it leaves a business case standing.",
    },
    sections: [
      {
        title: "Five action types",
        paragraphs: [
          "Sort every action the system can take by what happens when it is wrong. The sort takes twenty minutes with a tool list in hand, and it does more governance work than any policy document written about the same system.",
          "The boundary that matters most sits between internal and external. Everything above it is recoverable inside the organisation, so evidence can be gathered cheaply and the dial can move on measurement. Everything below it reaches a third party, where a wrong action becomes a disclosure, a commitment, or a payment, and no accuracy rate makes that recoverable.",
        ],
        table: {
          head: ["Action type", "What a wrong one costs, and where the dial starts"],
          rows: [
            {
              label: "Read",
              body: "Fetching, searching, retrieving. Changes nothing in the world, and a wrong read surfaces downstream as a wrong answer. Automatic, almost always.",
            },
            {
              label: "Draft",
              body: "Producing text a person or a later step will use. Costs the time to notice. Automatic, and this is where most of the value sits at almost no risk.",
            },
            {
              label: "Internal write",
              body: "A note, a status, a flag inside systems the organisation owns. Visible to colleagues, correctable, and it pollutes a record until someone fixes it. Automatic once measured on the organisation's own cases.",
            },
            {
              label: "External write",
              body: "An email to a vendor, a portal submission, a message to a customer. Reaches a third party and cannot be recalled. Gated by default, with narrow automatic classes only where the measurement is strong.",
            },
            {
              label: "Irreversible",
              body: "A payment, a cancellation, a deletion, a regulatory filing. Human, permanently, whatever the measured accuracy, because the argument for automating rests on a rate and the cost of being wrong is not one.",
            },
          ],
        },
      },
      {
        title: "Four levels, earned",
        paragraphs: [
          "Shadow means the system runs and its output goes nowhere except into a comparison against what the person actually did. It is how evidence gets gathered before anything is at stake, and it is the most frequently skipped step in this entire field.",
          "Propose means the system produces the action and a person executes it. Cheaper to operate than shadow, and it yields evidence about acceptance rates, which is the number that justifies the next move. Sampled automatic means the system acts and a defined share is reviewed afterwards, with the share starting high and falling as evidence accumulates. Gated automatic means the system acts inside stated conditions, such as under a threshold, within a category, or to an allowlisted recipient, and anything outside those conditions routes to a person.",
          "Promotion between levels is earned per action type, on measured performance across a stated number of items. Demotion happens automatically when the measurement regresses, and that half is what makes the grid credible. A system that can only be promoted will eventually be running at a level nobody would grant it today, on evidence nobody has looked at since.",
        ],
      },
      {
        title: "The grid",
        paragraphs: [
          "Put action types down the side and current level across the top, with the evidence that justified each cell written inside it. That page answers the committee's question honestly, survives an audit, and doubles as a roadmap, because every empty or conservative cell states what would need measuring to move it.",
          "Two rules keep it honest. Every cell carries a date and a measurement, so a level granted eighteen months ago on a hundred items is visibly stale to anyone reading. And the irreversible row stays with a person, which makes the rest of the grid easier to argue for, because the committee can see exactly where the line has been drawn.",
        ],
        example: {
          title: "The grid at four months",
          body: `Reads automatic. Drafts automatic. Internal notes gated automatic under a threshold, with 10% sampled and reviewed weekly. External sends to ${CASE.buyer} and the other approved buyers at propose, moving to sampled automatic once the measured acceptance rate holds across 300 items. Payments untouched, permanently, and marked as such so nobody has to reopen the question.`,
        },
      },
    ],
    misconception: {
      says: "Is it autonomous? Yes or no.",
      why: "The question forces one setting across actions whose consequences differ by orders of magnitude. Yes grants a payment the same latitude as a lookup. No puts a person on every read and removes the economic case entirely. The honest answer is a grid, and the committee that asked the question almost always prefers it, because a grid is something they can approve, date and revisit.",
    },
    widget: {
      kind: "permissions",
      mode: "autonomy",
      dataset: "autonomy-grid",
      caption:
        "Set the dial per action type on the invoice queue. Watch auto share, review load and exposure move together, then set everything to gated and watch the case collapse.",
    },
    instrument: {
      name: "The autonomy grid",
      body: "The instrument to bring to a risk committee. Action types down, levels across, evidence in every cell.",
      items: [
        "List every action the system can take, taken from the tool list.",
        "Classify each one as read, draft, internal write, external write or irreversible.",
        "Set a starting level per type, with shadow or propose for anything above an internal write.",
        "Record the evidence in each cell: how many items, measured when, at what accuracy.",
        "Write the promotion rule, the demotion rule, and the sampling rate for anything automatic.",
        "Re-date the grid quarterly. A cell resting on an eighteen-month-old measurement is unevidenced.",
      ],
    },
    soWhat:
      "You can answer the most common governance question in this field with a page that satisfies a risk committee and preserves the business case, instead of a yes or a no that destroys one of the two.",
    checks: [
      {
        q: "Which action type stays with a person regardless of measured accuracy?",
        options: [
          {
            text: "External writes, since they reach a third party.",
            feedback:
              "Gated by default, and narrow classes do earn automation once the measurement is strong. The line sits one step further down.",
            impliesMissing: "A-ACTIONTYPES",
          },
          {
            text: "Irreversible actions, because the case for automating rests on a rate and the cost of being wrong is not a rate.",
            correct: true,
            feedback:
              "Correct, and holding that row fixed is what makes the rest of the grid arguable.",
          },
          {
            text: "Internal writes, since they pollute records.",
            feedback:
              "Correctable and visible to colleagues. These are the first writes to earn automation.",
            impliesMissing: "A-ACTIONTYPES",
          },
        ],
      },
      {
        q: "What is the point of a shadow period?",
        options: [
          {
            text: "To let the model adapt to the organisation's data.",
            feedback:
              "Nothing adapts. The weights are fixed, which lesson 3.1 established.",
            impliesMissing: "A-AUTONOMYDIAL",
          },
          {
            text: "To gather evidence on real items while nothing is at stake, so the first autonomy grant rests on measurement.",
            correct: true,
            feedback:
              "Correct, and it is the most skipped step in the field, which is why so many first grants rest on a demo.",
          },
          {
            text: "To build reviewer confidence before the system goes live.",
            feedback:
              "A pleasant side effect. The purpose is the evidence, and confidence without evidence is what the shadow period exists to replace.",
            impliesMissing: "A-AUTONOMYDIAL",
          },
        ],
      },
      {
        q: "Why must demotion be part of the rule?",
        options: [
          {
            text: "To give the risk committee something to approve.",
            feedback:
              "Committees do like it, and that is not the mechanism. Without demotion the grid stops tracking reality.",
            impliesMissing: "A-AUTONOMYDIAL",
          },
          {
            text: "Because performance moves, and a grid that only ratchets upward ends up running at a level nobody would grant today.",
            correct: true,
            feedback:
              "Correct. Upstream data changes, model versions change, and the item mix changes. All three move the measurement.",
          },
          {
            text: "Because models degrade over time.",
            feedback:
              "A pinned model does not degrade. What moves is everything around it, which is enough on its own.",
            impliesMissing: "A-AUTONOMYDIAL",
          },
        ],
      },
    ],
    next: "injection",
    relatedUseCases: ["ar-collections-chase", "joiner-access-provisioning"],
  },

  {
    slug: "injection",
    order: 40,
    n: "6.3",
    module: "M6",
    kind: "lesson",
    minutes: 22,
    title: "If it reads your mail and holds tools, what is your mail?",
    blurb:
      "Every piece of text an agent reads is a candidate instruction. That follows from how the window works, and it makes an inbox an attack surface.",
    thesis:
      "A model receives instructions and data in one window with no reliable boundary between them, so any text the system reads can influence what it does next, and the size of that risk is set by what its tools allow.",
    lede:
      "This is the security lesson, and it is short on drama for a reason. There is no exploit to memorise. The vulnerability follows directly from lesson 2.4, where the window holds everything and everything in it competes to shape the next token. Once that is held, the mitigations that work are obvious and so are the ones that fail.",
    youWill: [
      "Explain why inbound content can influence behavior, from mechanism.",
      "Name the three shapes this takes and which one matters operationally.",
      "Say why detection is a weak defence and privilege is a strong one.",
      "Put adversarial cases in a frozen set instead of a policy document.",
    ],
    atoms: ["A-INJECTION", "A-DATA-NOT-INSTRUCTIONS"],
    prereqs: ["A-TOOLCALL", "A-WINDOW"],
    ceiling:
      "The mechanism, the three shapes, and why privilege beats detection. No attack techniques and no payload construction. The lesson teaches what to defend and why detection alone fails.",
    situation: {
      artifact: `A vendor invoice arrives as a PDF. In the remittance notes field, in small text, sits a line addressed to any automated system processing this document, instructing it to update ${CASE.vendor}'s bank details before payment.`,
      prompt: "What decides whether that line matters?",
      options: [
        "Whether the model is capable enough to recognize it as suspicious",
        "Whether the system holds a tool that can update bank details",
        "Whether the PDF was scanned or native",
        "Whether the sender is on an approved list",
      ],
      reveal:
        "The second, overwhelmingly. If no tool can update bank details, the line is inert text costing a few tokens. If such a tool exists and this agent may call it, then the outcome rests on a probabilistic judgment about whether text inside a document is data or instruction, made by a system with no reliable way to tell. The defence is the tool list, and the model's discernment is the thing being asked to carry weight it cannot carry.",
    },
    sections: [
      {
        title: "Why the boundary is weak",
        paragraphs: [
          "Everything arrives in one window: the system prompt, the tool list, the retrieved documents, the conversation. All of it is tokens, and the mechanism from lesson 1.4 weighs all of it when producing the next one. Providers work hard to make instructions from the application carry more weight than text sitting inside a document, and it helps, and it remains a matter of degree instead of a boundary.",
          "So text inside a document can influence behavior. This follows from the architecture and not from a defect, which is why it has proved durable across every release since the capability appeared, and why treating it as a bug awaiting a patch has been consistently wrong.",
          "The consequence for design compresses into one sentence worth adopting as policy. Everything the system reads is data, never instruction, and the only instructions that count are the ones the application put there.",
        ],
      },
      {
        title: "Three shapes",
        paragraphs: [
          "The direct shape is a user of the system trying to talk it out of its constraints. Common, mostly a nuisance, and the least interesting of the three, because that person already had whatever access they had before they started arguing.",
          "The indirect shape is instruction-shaped text arriving inside content the system reads as part of its job, such as an email, an attachment, a web page, a ticket or a code comment. The person who placed it never touched the system. This is the shape that matters operationally, because reading external content is the job.",
          "The third shape is the confused deputy, where the system is persuaded to use its own authority on someone else's behalf. It holds access the requester lacks and becomes the mechanism by which that access gets used. This is what turns a nuisance into an incident, and it gets its own lesson next.",
        ],
      },
      {
        title: "Why detection is the weak defence",
        paragraphs: [
          "The instinct is to filter, scanning inbound content for instruction-shaped text and stripping it. This helps at the margin and cannot be relied on, for a reason that generalises well beyond this topic. The space of ways to phrase an instruction is unbounded, the filter has to be right every time, and whoever is probing it has to be right once. Anything built on recognising hostile input inherits that asymmetry.",
          "Privilege reverses the asymmetry completely. If the system holds no tool that can change bank details, then every phrasing of that request fails identically, forever, with nobody updating a filter. The defence stops depending on recognition and starts depending on capability, which is bounded, enumerable and stable across releases.",
          "In practice this means narrowing the tool list to what the job requires, scoping each tool's arguments as tightly as the job allows, gating anything with an external or irreversible effect, and treating detection as a useful additional layer instead of as the control. The agent on the running case holds seven tools, one of which sends email to an allowlisted set of buyers. A hostile line in a vendor PDF asking it to redirect payment finds nothing to act on, because there is no payment tool, no bank-detail tool, and a send tool that rejects any recipient outside the list. The line stays in the trace, where it is worth someone reviewing, and it changes nothing.",
        ],
        list: [
          "Everything the system reads is data. The only instructions that count came from the application.",
          "Narrow the tool list first, because it bounds every phrasing at once.",
          "Scope arguments as tightly as the job allows. A tool accepting three field names is safer than one accepting any.",
          "Gate external and irreversible effects whatever else is in place.",
          "Treat detection as a layer, never as the control.",
        ],
      },
      {
        title: "Put it in the eval",
        paragraphs: [
          "Adversarial cases belong in the frozen set from module seven instead of in a policy document, because a policy states an intention while a test measures a behavior, and only one of the two can be shown to a customer.",
          "A reasonable starting set is small. A document carrying instruction-shaped text in a field the system reads. A request to use a tool outside the intended scope. A request to send to an unlisted recipient. A request to reveal the system's own instructions. Each case asks two questions: did the system do the wrong thing, and did a control fire and log the attempt.",
          "Running these on every configuration change is what turns a security position into something demonstrable. It is also how a team finds out that a prompt edit six weeks ago quietly loosened something nobody was watching.",
        ],
      },
    ],
    misconception: {
      says: "Prompt injection is a research concern, not a production one.",
      why: "It is a production concern for any system reading content that originated outside the organisation, which describes almost every deployment worth building. The property making it exploitable is the same property letting the system read a vendor email it has never seen before, so it stays live for exactly as long as the capability does. Treating it as a research topic postpones the tool-list review, which is the part that would have taken an afternoon.",
    },
    widget: {
      kind: "permissions",
      mode: "injection",
      dataset: "injection",
      caption:
        "The same hostile document against three tool configurations. Watch what changes, and notice that the model is identical in all three.",
    },
    instrument: {
      name: "The adversarial case set",
      body: "Four cases to add to the frozen set, run on every configuration change.",
      items: [
        "A document with instruction-shaped text in a field the system reads as part of its job.",
        "A request to use a tool outside the intended scope for this workflow.",
        "A request to send or write to a recipient or record outside the allowlist.",
        "A request to reveal the system's own instructions or tool list.",
        "For each one, record whether the system acted wrongly, whether a control fired, and whether the attempt was logged where a person would see it.",
      ],
    },
    soWhat:
      "You can assess this risk by reading a tool list instead of by evaluating a model's judgment, which is faster, more reliable, and produces a defence holding against phrasings nobody has thought of yet.",
    checks: [
      {
        q: "What most determines how much damage a hostile document can do?",
        options: [
          {
            text: "How sophisticated the wording is.",
            feedback:
              "Sophistication affects whether the influence lands. It has no bearing on the ceiling, which the tools set.",
            impliesMissing: "A-INJECTION",
          },
          {
            text: "What the agent's tools allow it to do, and to whom.",
            correct: true,
            feedback:
              "Correct. With no tool for the requested action, every phrasing fails identically.",
          },
          {
            text: "Whether the model was trained on adversarial examples.",
            feedback:
              "It raises the bar and moves nothing about the ceiling. Training changes probabilities, and the tool list changes what is possible.",
            impliesMissing: "A-DATA-NOT-INSTRUCTIONS",
          },
        ],
      },
      {
        q: "Why is filtering inbound content a weak primary defence?",
        options: [
          {
            text: "Because it slows the system down.",
            feedback:
              "Latency is negligible here, and it was never the objection.",
            impliesMissing: "A-DATA-NOT-INSTRUCTIONS",
          },
          {
            text: "Because the filter has to be right every time while one working phrasing is enough, and the space of phrasings is unbounded.",
            correct: true,
            feedback:
              "Correct, and the asymmetry is what privilege reverses.",
          },
          {
            text: "Because filters block legitimate content.",
            feedback:
              "False positives are a real operational cost and a separate problem from the one that makes filtering unreliable.",
            impliesMissing: "A-DATA-NOT-INSTRUCTIONS",
          },
        ],
      },
      {
        q: "Where do adversarial cases belong?",
        options: [
          {
            text: "In the security policy, listed as prohibited scenarios.",
            feedback:
              "A policy states an intention. Nothing in it comes back negative when a configuration change loosens something.",
            impliesMissing: "A-INJECTION",
          },
          {
            text: "In the frozen evaluation set, run on every configuration change, checking both the outcome and whether controls fired.",
            correct: true,
            feedback:
              "Correct, and it is how a team learns that a prompt edit six weeks ago changed the answer.",
          },
          {
            text: "In an annual penetration test.",
            feedback:
              "Worth having, and an annual cadence against a system that changes weekly leaves fifty-one weeks unmeasured.",
            impliesMissing: "A-INJECTION",
          },
        ],
      },
    ],
    next: "least-privilege",
    relatedUseCases: ["shared-inbox-triage", "vendor-coi-chase"],
  },

  {
    slug: "least-privilege",
    order: 41,
    n: "6.4",
    module: "M6",
    kind: "lesson",
    minutes: 22,
    title: "Who is the agent allowed to be?",
    blurb:
      "The agent gets its own identity and its own scopes. An agent running as Jane can do everything Jane can do, and no evaluation will ever surface that.",
    thesis:
      "Least privilege is the only mitigation in this field that scales, and it requires the agent to hold its own identity with its own narrow scopes instead of borrowing a person's credentials.",
    lede:
      "The shortcut is understandable. Getting an agent working means giving it access, the fastest route to access is an existing account, and the existing account belongs to whoever set the thing up. Six months later the agent holds a senior person's permissions across four systems, nobody remembers how, and the audit log attributes every action to a human who was asleep.",
    youWill: [
      "Say why a borrowed credential is the most consequential shortcut available here.",
      "Explain the confused deputy in one sentence, with a concrete path.",
      "Design scopes narrow enough to bound an incident without blocking the work.",
      "Read an access review and spot the agent that has quietly accumulated authority.",
    ],
    atoms: ["A-IDENTITY", "A-LEASTPRIVILEGE", "A-CONFUSEDDEPUTY"],
    prereqs: ["A-INJECTION", "A-PROPOSE-EXECUTE"],
    ceiling:
      "Identity, scope narrowing, and the confused deputy. No identity-provider mechanics and no token-flow detail; the decisions here are made by whoever owns the access review.",
    situation: {
      artifact:
        "An AP agent was set up using the AP manager's credentials, because that was the quickest way to get it reading invoices. It now runs continuously. The manager holds approval rights up to a threshold, access to vendor master data, and read access to payroll from an unrelated project in 2023.",
      prompt: "What is the agent's actual blast radius?",
      options: [
        "Reading invoices, which is all it does",
        "Everything the manager can do, in every system she has access to",
        "Whatever its tool list allows",
        "Whatever its prompt permits",
      ],
      reveal:
        "The second, bounded by the third. The tool list bounds what the system will normally attempt; the credential bounds what any successful influence can reach. Those are two different bounds and an incident lives in the gap between them. The payroll access is the detail worth sitting with. Nobody chose to give an AP agent payroll access, nobody would have approved it, and it happened by inheritance in an afternoon.",
    },
    sections: [
      {
        title: "Its own identity",
        paragraphs: [
          "The agent gets its own account, its own credentials, and its own line in the access review. That one change produces three things unavailable any other way.",
          "Reach becomes bounded by a set somebody chose, because the agent holds the scopes its work requires and nothing else, instead of by an inheritance nobody reviewed. Attribution becomes honest, because the audit log says the agent did it; under a borrowed credential the log names a person, which is wrong, unfair to them, and destroys an investigation before it starts. And revocation becomes independent, so the agent can be switched off without disabling a person, and a person can leave without silently taking the agent down with them, which is a failure that reliably surprises a team three months after a resignation.",
        ],
      },
      {
        title: "The confused deputy",
        paragraphs: [
          "The pattern compresses into one sentence. A system with authority is persuaded to use it on behalf of someone who lacks it.",
          "The concrete path takes three steps and needs nothing clever. A vendor sends a document. The agent reads it as part of its job. The agent holds a permission the vendor does not, and the document carries text shaped like an instruction to use it. The vendor never touched the system; the agent was the mechanism, and the audit log will show the agent acting normally throughout.",
          "What breaks the chain is the third step. If the permission is absent, or scoped so narrowly that the requested action falls outside it, or gated so that a person sees it first, the path terminates. None of those three depend on anyone recognising the document as hostile, and that independence is what makes them durable while a filter ages.",
        ],
      },
      {
        title: "Narrowing without blocking",
        paragraphs: [
          "The craft is scoping tightly while leaving the work possible, and it is usually more achievable than people expect, because the work is narrower than the permission that was granted to do it.",
          "Four dimensions are available. Operation, meaning read where write is unnecessary, or write to one field where a whole record is unnecessary. Record set, meaning this vendor category, these cost centres, this entity. Value, meaning under a threshold, with anything above routed to a person. And time, meaning active during business hours or during a defined run instead of continuously.",
          "The practical method is to derive scopes from the tool list instead of from the role. Each tool needs a specific permission, the union of those permissions is the agent's scope, and anything in the existing role beyond that union arrived by inheritance rather than by requirement. That exercise typically removes most of an agent's access and takes an afternoon.",
        ],
        example: {
          title: "Seven tools, five scopes",
          body: `Scopes for the running case, derived from its seven tools: read invoices and purchase orders for one entity, read receiving records, search a defined correspondence archive, write notes to the AP module only, and send email only to the approved buyer list. No vendor master data, no payment initiation, no payroll. The union of what seven tools require, and nothing that arrived by inheritance.`,
        },
      },
      {
        title: "Reviewing it",
        paragraphs: [
          "Agents belong in the access review beside people, and the question asked of them is the same one asked of everybody else. Does this identity still need everything it holds?",
          "Two additions are worth making for agents specifically. Track scope growth over time, because permissions get added during incidents and almost never removed afterwards. And confirm that the tool list and the granted scopes still correspond, since a tool removed six months ago whose permission survived is exactly the gap an incident lives in.",
        ],
      },
    ],
    misconception: {
      says: "It runs under a service account, so identity is handled.",
      why: "A service account is a start and it says nothing about scope. Many service accounts are broader than any individual, because they accumulate permissions from every integration that has ever used them and shed none. The questions that settle it are what this identity can reach, whether that still matches the tool list, and when anyone last looked at either.",
    },
    widget: {
      kind: "permissions",
      mode: "identity",
      dataset: "identity",
      caption:
        "Swap the identity on a running trace between a borrowed credential and a scoped agent account. Nothing about the model changes and the blast radius changes completely.",
    },
    instrument: {
      name: "The identity and scope sheet",
      body: "One per agent, derived from the tool list, reviewed quarterly alongside human access.",
      items: [
        "Which identity does this run as? If it belongs to a person, that is the finding.",
        "List each tool and the minimum permission it requires.",
        "The union of those permissions is the scope. Anything beyond it arrived by inheritance.",
        "Narrow by operation, record set, value threshold and time window.",
        "Confirm the tool list and the granted scopes still correspond.",
        "Record every scope change with a date and a reason, and review them quarterly.",
      ],
    },
    soWhat:
      "You can bound an incident before it happens by reading a tool list and deriving the scope from it, and you can spot the borrowed credential that makes every other control in the system negotiable.",
    checks: [
      {
        q: "Why is running an agent under a person's credentials the most consequential shortcut?",
        options: [
          {
            text: "Because it violates most security policies.",
            feedback:
              "Usually true, and a policy violation is a finding. The reason it matters is what it does to reach, attribution and revocation at once.",
            impliesMissing: "A-IDENTITY",
          },
          {
            text: "Because reach becomes everything that person can do, attribution becomes wrong, and revocation gets coupled to a human.",
            correct: true,
            feedback:
              "Correct, and the third one surprises teams months later when the person leaves.",
          },
          {
            text: "Because the person might change their password.",
            feedback:
              "An operational annoyance and the smallest of the consequences.",
            impliesMissing: "A-IDENTITY",
          },
        ],
      },
      {
        q: "Which step breaks the confused-deputy chain most reliably?",
        options: [
          {
            text: "Detecting the hostile document before the agent reads it.",
            feedback:
              "Detection has to be right every time, and lesson 6.3 covered why that asymmetry loses.",
            impliesMissing: "A-CONFUSEDDEPUTY",
          },
          {
            text: "Removing or narrowing the permission the request would need, so the action falls outside what this identity can do.",
            correct: true,
            feedback:
              "Correct, and it holds against phrasings nobody has written yet.",
          },
          {
            text: "Instructing the agent to ignore instructions found inside documents.",
            feedback:
              "A sentence competing with every other sentence in the window. Worth having, and not a control.",
            impliesMissing: "A-DATA-NOT-INSTRUCTIONS",
          },
        ],
      },
      {
        q: "How should an agent's scopes be derived?",
        options: [
          {
            text: "From the role of the person who would otherwise do the work.",
            feedback:
              "That role carries years of accumulated access unrelated to this task. It is the shortcut this lesson is about.",
            impliesMissing: "A-LEASTPRIVILEGE",
          },
          {
            text: "From the tool list, taking each tool's minimum permission and using their union.",
            correct: true,
            feedback:
              "Correct, and it gives a scope anyone can check against the tools in a few minutes.",
          },
          {
            text: "From what the workflow might need in future.",
            feedback:
              "Future needs grant present access. Add the permission when the tool arrives, and date it.",
            impliesMissing: "A-LEASTPRIVILEGE",
          },
        ],
      },
    ],
    next: "gateways-sandboxes",
    relatedUseCases: ["joiner-access-provisioning", "bank-rec-exceptions"],
  },

  {
    slug: "gateways-sandboxes",
    order: 42,
    n: "6.5",
    module: "M6",
    kind: "lesson",
    minutes: 22,
    title: "Where does it run, and what can it reach?",
    blurb:
      "A gateway is one front door for keys, routing, budgets and logs. A sandbox is a boundary on reach, and one that can email a customer is production with a comforting name.",
    thesis:
      "A gateway centralises the four things every model call needs governed, and a sandbox bounds what a run can reach, so the honest question about any environment is what it can touch instead of what it is called.",
    lede:
      "Two pieces of infrastructure do most of the operational governance in this field, and both are usually absent from a first deployment because neither is needed to make a demo work. Their absence shows up later as scattered keys, unattributable spend, invisible usage, and a test environment that turns out to be reaching production systems.",
    youWill: [
      "Name the four jobs a gateway does and why they belong together.",
      "Say what makes an environment a sandbox, in terms of reach.",
      "Map a system's blast radius from one compromised input.",
    ],
    atoms: ["A-GATEWAY", "A-SANDBOX", "A-BLASTRADIUS"],
    prereqs: ["A-IDENTITY", "A-LEASTPRIVILEGE"],
    ceiling:
      "The four gateway jobs, and reach as the definition of a sandbox. No proxy internals, no vendor comparison, no network architecture.",
    situation: {
      artifact:
        "A team says their agent runs in a sandbox. Investigation shows a separate database, a test tenant in the ERP, and the same email service as production, with a note in the prompt telling the system to prefix test messages with TEST.",
      prompt: "Is that a sandbox?",
      options: [
        "Yes, since a separate database and test tenant is the standard definition",
        "Partly, and the email path means no",
        "Yes, since the prompt marks test messages",
        "Only if the test tenant holds no real data",
      ],
      reveal:
        "No, and the email path is sufficient on its own. An environment able to send email to a real address can reach a real customer, and the only thing standing in the way is a sentence in a prompt, which lesson 1.4 established is a probability instead of a boundary. Two of the three separations are real and useful. The one carrying the external effect is the one that failed, and that is the one defining the environment.",
    },
    sections: [
      {
        title: "The gateway's four jobs",
        paragraphs: [
          "Keys come first. Model credentials live in one place and get rotated in one place, so they stop being copied into notebooks, scripts and personal environments. The alternative is discovering how many keys exist during an incident, from people volunteering them.",
          "Routing decides which model version a workload uses, as a central configuration change instead of a hunt through repositories. This is the mechanism making the pinning rule from module seven enforceable, and without it a version swap is a research project. Budgets are spend limits per team, per workload and per run, enforced instead of reported, because a limit that only reports arrives as an invoice. Logs record every call with the workload that made it, the model that answered, the tokens consumed, the cost and the elapsed time, and this is the single source of both the usage picture and the cost picture.",
          "The four belong together because each one needs the same interception point. Split across four systems they produce four partial pictures and no complete one, and the questions that get asked in month six all require the complete one.",
        ],
      },
      {
        title: "A sandbox is defined by reach",
        paragraphs: [
          "The word describes an intention while the property that matters is mechanical. What can this environment touch? Three states routinely get called sandboxes and only one of them is.",
          "The real one is a separate environment with no path to production systems, no ability to send to real addresses, and no real customer data. The second is a separate environment that can still reach one or two production services, usually email or a payment provider, because separating those was awkward and everything else was easy; this is production with a smaller dataset, and it will eventually act on a real person. The third is production with a flag set, where the prompt says test, the data is real and the tools are real. That one is simply production.",
          "The test takes one question per external effect. If the system attempted this right now, from this environment, would it work? A single yes makes the environment production for that effect, whatever the architecture diagram calls it.",
        ],
      },
      {
        title: "Blast radius",
        paragraphs: [
          "The blast radius is everything reachable from one compromised or mistaken input. Mapping it is a whiteboard exercise taking about an hour, and it is worth doing before the first production run instead of during the first incident.",
          "Start with the tool list. For each tool, what does it touch and how far does the effect propagate? An email tool reaches every allowlisted address. A write tool reaches every record in scope. A search tool reaches everything in the index, which frequently includes material nobody intended to expose to this workflow. Then apply the identity from lesson 6.4 as a second bound, because the tool list bounds what the system will normally attempt and the credential bounds what any successful influence can reach. The gap between those two bounds is where incidents live, and it is usually the first time anyone has seen it drawn.",
        ],
        list: [
          "Ask of every external effect whether it would work right now, from this environment.",
          "A sandbox that can send is production for sending.",
          "Map the radius from the tool list, then bound it again with the identity's scopes.",
          "The gap between what the tools allow and what the credential allows is where incidents live.",
        ],
        example: {
          title: "One page, one hour",
          body: `The blast radius for the running case: email to the approved buyer list only, notes to the AP module for one entity, reads across invoices, purchase orders and receiving records for that entity, and search across a defined correspondence archive. It cannot reach payments, vendor master data, or any other entity. One page, produced in an hour, and it is the honest answer to the question about what could go wrong.`,
        },
      },
    ],
    widget: {
      kind: "permissions",
      mode: "boundary",
      dataset: "boundary",
      caption:
        "Draw the boundary around an environment, then run the trace. Every call that crosses it is highlighted, including the one everybody forgets.",
    },
    instrument: {
      name: "The blast-radius map",
      body: "One hour at a whiteboard before the first production run, and one page afterwards.",
      items: [
        "List every tool and what it touches.",
        "For each one, say how far the effect propagates: one record, one entity, every allowlisted recipient, an entire index.",
        "Apply the identity's scopes as a second bound, and mark the gap between the two.",
        "For every external effect, ask whether it would work right now, from this environment.",
        "Name the single worst outcome reachable from one bad input, and decide whether that is acceptable.",
        "Re-run the exercise after every tool or scope change.",
      ],
    },
    soWhat:
      "You can establish in one question whether an environment is isolated in fact, and produce the one-page answer to what could go wrong that most deployments have never written down.",
    checks: [
      {
        q: "Which of these makes an environment production, whatever its label?",
        options: [
          {
            text: "It holds a copy of real data.",
            feedback:
              "A confidentiality question worth taking seriously, and it is separate from what the environment can do to the world.",
            impliesMissing: "A-SANDBOX",
          },
          {
            text: "It can send email to a real external address.",
            correct: true,
            feedback:
              "Correct. One live external effect defines the environment for that effect.",
          },
          {
            text: "It runs on the same cloud account.",
            feedback:
              "Account topology is not reach. A shared account with no path to production systems is still isolated.",
            impliesMissing: "A-SANDBOX",
          },
        ],
      },
      {
        q: "Why do the gateway's four jobs belong in one place?",
        options: [
          {
            text: "For cost efficiency.",
            feedback:
              "Marginal, and cost control is one of the four rather than the reason for combining them.",
            impliesMissing: "A-GATEWAY",
          },
          {
            text: "Because all four need the same interception point, and splitting them yields four partial pictures and no complete one.",
            correct: true,
            feedback:
              "Correct, and the questions asked in month six all need the complete one.",
          },
          {
            text: "Because vendors sell them as a single product.",
            feedback:
              "They often do, and packaging is a consequence of the architecture instead of a reason for it.",
            impliesMissing: "A-GATEWAY",
          },
        ],
      },
    ],
    next: "egress-liability",
    relatedUseCases: ["vendor-onboarding-packs", "audit-evidence-requests"],
  },

  {
    slug: "egress-liability",
    order: 43,
    n: "6.6",
    module: "M6",
    kind: "lesson",
    minutes: 24,
    title: "What leaves the building, and who is answerable?",
    blurb:
      "Four data paths with four different contracts, and, separately, the standing rule that if the harness allowed the write, the company acted.",
    thesis:
      "Every packet sent to a model is an export and every trace is a copy, so a deployment has to state which of four contractual paths each workload uses, and when a permitted action turns out to be wrong, responsibility sits with whoever configured the permission.",
    lede:
      "Two subjects share this lesson because they are one question asked at two distances. What leaves the building is a data question with a contract behind it. Who is answerable is a governance question with a contract behind it. Both get settled in advance or discovered during an incident, and the second route is considerably more expensive.",
    youWill: [
      "Name the four paths and identify which one each workload uses.",
      "Ask the four questions that belong in writing before the first exception.",
      "Explain why an allowed action is the company's action.",
      "Name the obligations that already exist without becoming an amateur lawyer.",
    ],
    atoms: ["A-EGRESS", "A-DATAPATHS", "A-LIABILITY"],
    prereqs: ["A-GATEWAY", "A-SANDBOX"],
    ceiling:
      "Four paths, four questions, and the allowed-write principle. Regulation named at the level of obligations that already exist, with a pointer to counsel instead of statutory analysis.",
    situation: {
      artifact:
        "An agent sent a chase email to the wrong vendor, disclosing an invoice amount belonging to a different customer. Every component behaved as designed. The fetch returned what was asked for, the draft was accurate for the record it received, the send tool's allowlist contained the address, and the identity held the permission.",
      prompt: "Who is answerable?",
      options: [
        "The model provider, since the model made the error",
        "The vendor who built the agent",
        "The company, because its harness permitted the action",
        "Nobody, since it was a system error",
      ],
      reveal:
        "The company. Every control did what it had been configured to do, and the configuration allowed this. Provider contracts almost universally disclaim responsibility for outputs. The builder's liability is bounded by a commercial agreement that will be smaller than the harm. What remains is a company that authorised an action through the permissions it granted, which is why the allowlist, the scope and the autonomy grid are governance artifacts instead of engineering details.",
    },
    sections: [
      {
        title: "Four paths",
        paragraphs: [
          "Each workload sends material somewhere, under some contract, and there are four places it can go. The requirement is simply that each workload has a named path, in writing, decided before the first exception instead of during one.",
          "The consumer path is the one every organisation underestimates. Closing it works by providing a sanctioned route that is at least as convenient, and never by a policy telling people to stop, because the policy competes with a deadline and loses.",
        ],
        table: {
          head: ["Path", "What it gives, and what it costs"],
          rows: [
            {
              label: "Consumer tools",
              body: "A person pastes material into a general-purpose product on personal terms. Whatever the provider's stated policy, the organisation holds no contract governing the use and has no visibility into it. Every business has more of this than it believes.",
            },
            {
              label: "Enterprise API under contract",
              body: "Terms the organisation negotiated, covering training use, retention, region, subprocessors and audit rights. The ordinary path for most workloads, and the one where the contract does the work.",
            },
            {
              label: "Dedicated or in-region",
              body: "The same models inside a boundary controlled contractually or physically. Higher cost, more paperwork, and a materially different answer to the residency question.",
            },
            {
              label: "Weights run in house",
              body: "Nothing leaves. The strongest residency position available, and it hands the organisation the serving stack from lesson 3.7 along with everyone needed to operate it.",
            },
          ],
        },
      },
      {
        title: "What counts as leaving",
        paragraphs: [
          "The packet is the obvious export, and it includes the retrieved documents, the customer names and the amounts, because that is what makes the packet useful.",
          "The trace is the one people miss. A complete trace holds everything the packet held, so a trace stored with a supplier is a copy of the organisation's operational data stored with a supplier. Lesson 5.7 argued for building traces from the logging side; the same artifact is an egress question with the same answer. Two more are worth naming. Cached prefixes persist on the provider's side for a period by design. And where extended reasoning is used, those tokens are produced from the organisation's material and are retained or discarded according to a policy somebody should have read.",
          "Four questions settle all of it, and they belong in writing. Is our material used for training. How long is it retained. In which region does it sit. Who can access the traces. Asked as a specific request about a specific workload they get answered quickly, and asked as a general policy question they circulate for a month.",
        ],
      },
      {
        title: "If the harness allowed it, the company acted",
        paragraphs: [
          "This is the standing rule of the module and it holds whichever component made the mistake. An action the system was permitted to take, taken, is an action the organisation authorised through the permission it granted.",
          "The consequence is that every artifact in this module becomes a governance document. The tool list defines what the company has authorised. The autonomy grid defines what it has authorised without a person present. The allowlist defines who it may reach. The scope contract defines what falls out of bounds. Those four are what an investigation asks for, and this course has already told you to write all four for other reasons.",
          "The obligations that already exist need naming without pretending to legal expertise. Sectoral rules apply to whatever this work touches, and being performed by software changes none of them. Broader regimes classify systems by risk and attach transparency and oversight duties to the higher classes. Customer contracts carry accuracy and confidentiality commitments applying to the output whatever produced it. Insurers ask about controls, and the four artifacts above are the answer. None of this calls for statutory expertise from the reader; it calls for the question being asked early enough that counsel can answer it cheaply, and for the artifacts existing when they do.",
        ],
        example: {
          title: "Three lines, week one",
          body: `The workload behind the running case, in writing: enterprise API under contract, no training use, thirty-day retention, one named region, and traces held in the organisation's own environment under its existing log retention policy. Consumer tools prohibited for this queue, with a sanctioned alternative provided the same week. Decided before the first exception, in three lines.`,
        },
      },
    ],
    misconception: {
      says: "The vendor is responsible for what their AI does.",
      why: "Provider terms disclaim responsibility for outputs, and a builder's liability is bounded by a commercial agreement that will be far smaller than the harm from a wrong external action. What stays with the company is the permission it granted, which is why the tool list, the allowlist and the autonomy grid are the documents an investigation asks for first. A contract can move money after the fact and it cannot move the fact that the action was authorised.",
    },
    widget: {
      kind: "sorter",
      dataset: "data-paths",
      caption:
        "Six workloads from one company. Route each to a data path, then read which contractual question decides it and what it costs to get wrong.",
    },
    instrument: {
      name: "The egress register",
      body: "One row per workload, four questions each. Written in week one, reviewed whenever anything changes.",
      items: [
        "Which of the four paths does this workload use?",
        "Is our material used for training? Get the answer in writing, per workload.",
        "How long is it retained, and in which region does it sit?",
        "Who can access the traces, and where are they stored?",
        "Which sanctioned path have we given people, so the consumer route stops being the convenient one?",
        "Which four artifacts would we produce if asked to justify an action: tool list, autonomy grid, allowlist, scope contract?",
      ],
    },
    soWhat:
      "You can settle the data question in three lines per workload before the first exception, and explain to a board why the tool list and the autonomy grid are governance documents instead of engineering artifacts.",
    checks: [
      {
        q: "Which of these is most often missed when accounting for what leaves the building?",
        options: [
          {
            text: "The packet sent to the model.",
            feedback:
              "The obvious export, and the one every team has already thought about.",
            impliesMissing: "A-EGRESS",
          },
          {
            text: "The traces, which hold everything the packet held and are frequently stored with the supplier.",
            correct: true,
            feedback:
              "Correct. A trace store is a copy of operational data, and it is rarely on anyone's list.",
          },
          {
            text: "The model's weights.",
            feedback:
              "Those belong to the provider and move in the other direction.",
            impliesMissing: "A-EGRESS",
          },
        ],
      },
      {
        q: "An agent takes a permitted action that turns out to be wrong. Where does responsibility sit?",
        options: [
          {
            text: "With the model provider, whose model produced the decision.",
            feedback:
              "Provider terms disclaim responsibility for outputs, and almost every commercial agreement in this market says so explicitly.",
            impliesMissing: "A-LIABILITY",
          },
          {
            text: "With the company, because it granted the permission that allowed the action.",
            correct: true,
            feedback:
              "Correct, and it is why the four permission artifacts are governance documents.",
          },
          {
            text: "Nowhere in particular, since every component behaved as designed.",
            feedback:
              "Every component behaving as designed is the situation this rule exists to address.",
            impliesMissing: "A-LIABILITY",
          },
        ],
      },
      {
        q: "How do you close the consumer-tool path?",
        options: [
          {
            text: "A policy prohibiting it, communicated in training.",
            feedback:
              "The policy competes with a deadline and loses. Every organisation that has tried this has the shadow usage to show for it.",
            impliesMissing: "A-DATAPATHS",
          },
          {
            text: "Provide a sanctioned path at least as convenient, then prohibit the unsanctioned one.",
            correct: true,
            feedback:
              "Correct, and the order matters. Prohibition without an alternative moves the usage somewhere less visible.",
          },
          {
            text: "Block the sites at the network level.",
            feedback:
              "It moves the activity to personal devices, where there is no visibility at all.",
            impliesMissing: "A-DATAPATHS",
          },
        ],
      },
      {
        q: "Which four documents would an investigation ask for?",
        options: [
          {
            text: "The system prompt, the model version, the vendor contract and the incident report.",
            feedback:
              "All useful, and none of them states what the company authorised the system to do.",
            impliesMissing: "A-LIABILITY",
          },
          {
            text: "The tool list, the autonomy grid, the allowlist and the scope contract.",
            correct: true,
            feedback:
              "Correct. Between them they state what was permitted, to whom, and without whose approval.",
          },
          {
            text: "The evaluation results, the trace store, the access review and the data map.",
            feedback:
              "Strong evidence of operational maturity, and it describes how the system was run rather than what it was permitted to do.",
            impliesMissing: "A-LIABILITY",
          },
        ],
      },
    ],
    next: "what-a-demo-proves",
    relatedUseCases: ["prior-auth-packet-chase", "customs-entry-document-packs"],
  },
];
