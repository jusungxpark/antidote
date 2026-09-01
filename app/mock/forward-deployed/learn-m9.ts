import type { LearnLesson } from "./learn-types";
import { CASE, CASE_QUEUE } from "./learn-case";

export const M9_LESSONS: LearnLesson[] = [
  {
    slug: "clinic-vendor-call",
    order: 57,
    n: "C1",
    module: "M9",
    kind: "clinic",
    minutes: 45,
    title: "Clinic: the vendor call",
    blurb:
      "A twelve-minute pitch and a deck. Produce the claim classification, the artifacts to demand, and the three questions to ask before the call ends.",
    thesis:
      "Given a pitch, you can classify every claim, name the artifact that would settle each one, and reduce the list to three questions that fit inside the meeting.",
    lede:
      "No new material in this one. A recorded pitch, a deck, and a defined output. Produce your version before revealing the worked answer, because a comparison against something you have already committed to teaches what reading the answer alone cannot.",
    youWill: [
      "Classify twelve claims as measured, modeled, declared or unknown.",
      "Name the artifact that would settle each one.",
      "Reduce the list to three questions that fit inside a meeting.",
      "Compare against a worked answer and the rubric it was scored with.",
    ],
    atoms: [],
    prereqs: ["A-ARTIFACTDEMAND", "A-CLAIMCLASS", "A-FROZENSET", "A-CONTRACT"],
    situation: {
      artifact:
        "A vendor pitch for exception handling. Twelve claims, among them: resolves 60% of exceptions end to end, 94% accuracy, fully auditable, enterprise-grade guardrails, a proprietary model trained on industry data, deployed at four comparable companies, and typically pays back in seven months.",
      prompt: "Before reading further: which three questions would you ask, and why those three?",
      options: [
        "I have written my three down",
        "I want to see the claim list again first",
        "Skip to the worked answer",
        "I would ask for references and a trial",
      ],
      reveal:
        "Write yours down before continuing, because the comparison is the exercise. The worked answer leads with the tool list, since it settles what end to end can mean, what oversight attaches to, and what the blast radius is. Second is a real trace from last week. Third is the evaluation one-pager. Everything else in the deck resolves downstream of those three, which is why three questions are enough.",
    },
    sections: [
      {
        title: "The task",
        paragraphs: [
          "Work through all twelve claims. For each one, decide what class of evidence it is, name the artifact that would settle it, and write down what its absence would tell you. Then reduce the whole list to three questions that fit inside a meeting where the vendor is also trying to talk.",
          "Twenty-five minutes on your own version, then the worked answer and the rubric, and score yourself against it honestly. The gaps are the output of the clinic, and a gap you talked yourself out of is worth two you missed cleanly.",
        ],
        list: [
          "Classify all twelve as measured, modeled, declared or unknown.",
          "Name one artifact per claim, and an artifact instead of an activity.",
          "Reduce to three questions, in the order you would ask them.",
          "For each of your three, write down what a refusal would tell you.",
        ],
      },
      {
        title: "How the worked answer is scored",
        paragraphs: [
          "The rubric rewards four things. Correct classification, and in particular recognising that the payback figure is modeled and that deployed at four companies is declared. Naming an artifact and not an activity, meaning a tool list and not a technical deep dive. Ordering the three questions by how many claims each one settles. And writing down what a refusal implies, which is the part most people leave to instinct in the room.",
          "The common miss is spending a question on the model. It feels like the technical question and it discriminates least, because everyone rents from the same short list and the harness is where the differences live. A second common miss is accepting a dashboard in place of a trace, which concedes the auditability claim while appearing to test it.",
        ],
      },
    ],
    misconception: {
      says: "I would ask for a trial rather than for documents.",
      why: "A trial is a longer demo carrying the same selection problems, and it costs weeks of everyone's time. The three artifacts take an hour of the vendor's and settle more than the trial would. Run the trial afterwards if the artifacts hold up, on your own twenty cases, scored against the frozen set built in module seven.",
    },
    widget: {
      kind: "claims",
      dataset: "deck-claims",
      caption:
        "The twelve claims. Classify each one, name its artifact, then reveal the worked answer and the rubric.",
    },
    instrument: {
      name: "The vendor-call rubric",
      body: "Score your own answer against it. The gaps are the output of the clinic.",
      items: [
        "Did you classify all twelve, including the two that are modeled instead of measured?",
        "Did you name an artifact for each, instead of an activity?",
        "Did your three questions settle more than three claims between them?",
        "Did you write down what a refusal would imply?",
        "Did you avoid spending one of the three on the model?",
      ],
    },
    soWhat:
      "You have run the artifact demand list against a real-shaped pitch under time pressure, which is the only condition it will ever be used in.",
    checks: [
      {
        q: "Which claim in the deck is modeled instead of measured?",
        options: [
          {
            text: "94% accuracy.",
            feedback:
              "Measured, or unknown when no methodology exists. The class depends on the evaluation one-pager and not on the arithmetic.",
            impliesMissing: "A-CLAIMCLASS",
          },
          {
            text: "Typically pays back in seven months.",
            correct: true,
            feedback:
              "Correct. A payback figure is derived from assumptions about volume, rates and adoption, so the ledger is what would make it legitimate.",
          },
          {
            text: "Deployed at four comparable companies.",
            feedback:
              "Declared. It is an assertion about the world, and references are what would evidence it.",
            impliesMissing: "A-CLAIMCLASS",
          },
        ],
      },
      {
        q: "Why does the tool list come first?",
        options: [
          {
            text: "Because it is the easiest thing to produce.",
            feedback:
              "It usually is, and that is a convenience instead of the reason for asking first.",
            impliesMissing: "A-ARTIFACTDEMAND",
          },
          {
            text: "Because it settles what end to end can mean, what oversight attaches to, and what the blast radius is.",
            correct: true,
            feedback:
              "Correct. One page, three claims, and it bounds every risk conversation that follows it.",
          },
          {
            text: "Because security teams require it.",
            feedback:
              "They may, and the analytical reason is what makes it the first request instead of the fourth.",
            impliesMissing: "A-CONTRACT",
          },
        ],
      },
      {
        q: "The vendor declines to share a trace, citing confidentiality. What do you conclude?",
        options: [
          {
            text: "Reasonable, since traces contain customer data.",
            feedback:
              "They do, and a redacted trace or one from their own test data settles the question without disclosing anything.",
            impliesMissing: "A-TRACE",
          },
          {
            text: "The question stands, since a redacted trace would settle it, so a blanket refusal suggests the artifact is thinner than described.",
            correct: true,
            feedback:
              "Correct, and offering the redacted alternative in the room keeps the exchange constructive while preserving the finding.",
          },
          {
            text: "Move on, since the trace is a detail.",
            feedback:
              "It is the artifact behind the auditability claim, so moving on concedes that claim entirely.",
            impliesMissing: "A-ARTIFACTDEMAND",
          },
        ],
      },
    ],
    next: "clinic-invoice-queue",
    relatedUseCases: ["ap-invoice-exceptions"],
  },

  {
    slug: "clinic-invoice-queue",
    order: 58,
    n: "C2",
    module: "M9",
    kind: "clinic",
    minutes: 55,
    title: "Clinic: the invoice queue, end to end",
    blurb:
      "The capstone. Design the harness, the autonomy grid, the frozen set, the staging plan and the unit economics for one real queue.",
    thesis:
      "Six instruments used together on one queue produce a complete and defensible design, and doing it once is what makes the second queue routine.",
    lede:
      "The whole course on one case, in fifty-five minutes. This is where the modules stop being separate and become one object, and it is the closest thing here to the work itself.",
    youWill: [
      "Produce a five-subsystem design for a real queue.",
      "Set a starting autonomy grid with evidence requirements per cell.",
      "Specify the frozen set composition across four strata.",
      "Write a staging plan with exit criteria and a unit-economics model.",
    ],
    atoms: [],
    prereqs: ["A-FIVESUBSYSTEMS", "A-AUTONOMYDIAL", "A-SETDESIGN", "A-STAGING", "A-UNITCOST"],
    situation: {
      artifact: `${CASE_QUEUE} The largest exception type is missing receipts at 31% of volume and the smallest is duplicate-payment suspicion at 3%. ${CASE.vendor} sends photographs. ${CASE.buyer} approves everything above a threshold. Six people handle the queue today.`,
      prompt: "Before reading on: which of the seven exception types would you attempt first?",
      options: [
        "Missing receipts, because it is the largest",
        "Duplicate-payment suspicion, because errors there are expensive",
        "Whichever is most cheaply verifiable, then by volume",
        "All seven at once, since the harness is shared",
      ],
      reveal:
        "The third, and missing receipts probably wins on both criteria, being high volume and checkable against the ERP within minutes. Choosing by volume alone lands in the same place here and skips the dimension deciding whether evidence can be accumulated at all, which will matter on the next queue. Duplicate-payment suspicion is the one to leave for later despite its cost per item, because the consequence raises the evidence bar and the volume is too low to clear it quickly.",
    },
    sections: [
      {
        title: "The task",
        paragraphs: [
          "Produce five artifacts for this queue. Forty minutes on your own version, then the worked answer and the rubric.",
          "The five are a five-subsystem design, an autonomy grid with a starting level per action type and the evidence each would need to move, the frozen set composition across four strata with counts, a staging plan with exit criteria, and a unit-economics model with every input labelled.",
        ],
        list: [
          "Five-subsystem design: instructions, state, verification, scope, lifecycle.",
          "Autonomy grid: five action types, a starting level each, and the evidence required to promote.",
          "Frozen set: volume, tail, near-misses and adversarial, with a count against each.",
          "Staging plan: three stages, exit criteria per stage, and what sends one backwards.",
          "Unit economics: five terms, an honest baseline, every input labelled.",
        ],
      },
      {
        title: "Where answers usually go wrong",
        paragraphs: [
          "Three failures recur across almost every attempt. The autonomy grid gets set at one level for everything, which module six spent a full lesson preventing. The frozen set gets built entirely from volume cases, which produces a number unable to discriminate between two candidate systems. And the unit-economics model omits residual human minutes, which is the single term deciding the answer.",
          "A fourth is subtler and more expensive. The design assumes the receiving record can always be found. The packet stage exists precisely to measure that, and a design skipping it has assumed away the thing most likely to be the finding of the first six weeks.",
        ],
      },
      {
        title: "What good looks like",
        paragraphs: [
          "The test for the whole exercise is whether somebody else could execute your five artifacts without asking you a question. That is a harder standard than it sounds and it catches the vague line in every one of them: a verification subsystem described as validate outputs, an autonomy cell reading gated with no threshold, a staging exit criterion phrased as when we are confident.",
          "A strong answer is specific in the places where specificity costs something. It names the read that verifies each write. It puts a number and an item count in every autonomy cell. It says which six near-miss pairs, in terms someone could go and build. And it labels the two or three economic inputs the case rests on, so the first week of measurement has an agenda.",
        ],
      },
    ],
    widget: {
      kind: "econ",
      mode: "unit",
      dataset: "invoice-queue",
      caption:
        "Build the unit economics for this queue, then compare against the worked model and its assumptions ledger.",
    },
    instrument: {
      name: "The capstone rubric",
      body: "Score your five artifacts. The gaps name which lesson to revisit.",
      items: [
        "Five subsystems: is there a named artifact for each, or a description of an intention?",
        "Autonomy grid: does it differ by action type, and does every cell carry an evidence requirement?",
        "Frozen set: are all four strata present, with the tail over-weighted and the weighting recorded?",
        "Staging: are the exit criteria measured thresholds instead of dates, and is there a rule for going backwards?",
        "Economics: are residual human minutes present, and is every input labelled?",
        "Overall: could somebody else execute this without asking you a question?",
      ],
    },
    soWhat:
      "You have produced the artifacts a first deployment needs, on a realistic queue, under time pressure, which is the rehearsal for doing it on your own.",
    checks: [
      {
        q: "Which exception type is the worst first candidate here?",
        options: [
          {
            text: "Missing receipts, because the volume makes errors costly.",
            feedback:
              "Volume plus cheap verification is what makes it the best candidate, and volume also makes errors visible quickly.",
            impliesMissing: "A-CANDIDATE",
          },
          {
            text: "Duplicate-payment suspicion, being low volume and high consequence, so the evidence bar is high and slow to clear.",
            correct: true,
            feedback:
              "Correct. Consequence raises the bar while volume determines how fast it can be cleared, and this type is unfavourable on both.",
          },
          {
            text: "Whichever involves the most systems.",
            feedback:
              "Integration count affects build cost and says little about whether the type is a good first candidate.",
            impliesMissing: "A-CANDIDATE",
          },
        ],
      },
      {
        q: "What belongs in the near-miss stratum for this queue?",
        options: [
          {
            text: "The most complex exceptions from the last year.",
            feedback:
              "Those are the tail. Near-misses are pairs where one detail changes the correct answer.",
            impliesMissing: "A-NEARMISS",
          },
          {
            text: "Two invoices from the same vendor for the same amount, one with a receipt and one without, requiring different actions.",
            correct: true,
            feedback:
              "Correct. A pattern-matching system handles one and fails the other, and no ordinary case would reveal it.",
          },
          {
            text: "Invoices that arrive as photographs.",
            feedback:
              "A tail case, and a good one. It tests a different property from a near-miss pair.",
            impliesMissing: "A-NEARMISS",
          },
        ],
      },
      {
        q: "Which term, if omitted from the unit economics, most changes the conclusion?",
        options: [
          {
            text: "Model spend.",
            feedback:
              "Usually cents per item, so omitting it barely moves the total in either direction.",
            impliesMissing: "A-UNITCOST",
          },
          {
            text: "Residual human minutes on the escalated share.",
            correct: true,
            feedback:
              "Correct. At any realistic loaded rate it dominates, which is why it is the term most worth measuring first.",
          },
          {
            text: "Amortised build cost.",
            feedback:
              "Significant early and it falls with volume, whereas the residual persists at every volume.",
            impliesMissing: "A-RESIDUAL",
          },
        ],
      },
    ],
    next: "clinic-incident",
    relatedUseCases: ["ap-invoice-exceptions", "bank-rec-exceptions"],
  },

  {
    slug: "clinic-incident",
    order: 59,
    n: "C3",
    module: "M9",
    kind: "clinic",
    minutes: 50,
    title: "Clinic: the incident",
    blurb:
      "A chase went to the wrong vendor with another customer's amount. Every component behaved as designed. Find where the harness failed.",
    thesis:
      "An incident in which every component behaved as designed is a design failure, and locating it means walking the five subsystems instead of looking for a broken part.",
    lede:
      "The most useful analytical exercise in the course, because it inverts the usual direction. Instead of designing forward, you are reading a trace backwards and naming the control that should have existed. Real incidents look exactly like this one: nothing broke.",
    youWill: [
      "Walk a trace and locate the decision that produced the outcome.",
      "Assign the failure to a subsystem instead of to a component.",
      "Name the control that would have prevented it, plus two cheaper ones that would have caught it earlier.",
      "Write the case that goes into the frozen set.",
    ],
    atoms: [],
    prereqs: ["A-TRACE", "A-FIVESUBSYSTEMS", "A-VERIFY", "A-LEASTPRIVILEGE"],
    situation: {
      artifact:
        "An agent sent a chase to a vendor referencing an invoice number and an amount belonging to a different customer. The trace shows a search returning three candidate records, the top-ranked one belonging to a different entity, the draft using its amount, the send tool's allowlist containing the recipient because the vendor is a genuine counterparty, the identity holding the permission, and no check comparing the drafted amount against the record for this entity.",
      prompt: "Before reading on: which single control would have prevented this?",
      options: [
        "A better search",
        "A human reviewing every outbound message",
        "A validator comparing the drafted amount against the fetched record for this entity",
        "A stricter allowlist",
      ],
      reveal:
        "The third, and the first is where the root cause sits. The search should have been a fetch, because the entity and the invoice number were both known, so lesson 2.7's rule applies and a ranked resemblance search was the wrong door. The validator is the control catching it regardless of that error, which makes it the right answer to the question as asked. A human on every message would also have caught it, at a cost removing the economic case. The allowlist could not have helped, because the recipient was legitimate.",
    },
    sections: [
      {
        title: "The task",
        paragraphs: [
          "Produce a failure analysis by subsystem, the control that would have prevented the incident, two cheaper controls that would have caught it earlier or bounded it, and the case to add to the frozen set.",
          "Thirty-five minutes on your own version, then the worked answer and the rubric. Write the frozen-set case last, because writing it forces you to be precise about what the fix actually changes.",
        ],
        list: [
          "Which subsystem failed, and which merely participated?",
          "The one control that would have prevented the outcome.",
          "Two cheaper controls that would have caught it earlier or bounded it.",
          "The frozen-set case, written so it fails today and passes after the fix.",
          "What the trace lacked that made the analysis harder than it needed to be.",
        ],
      },
      {
        title: "The subsystem walk",
        paragraphs: [
          "State is where it starts. The wrong record entered the working set and stayed there for every later step, and the grounding decision was the origin: a search where a fetch was available. Verification is where it became an incident. No check compared the drafted amount against the record for the correct entity, and that absence is what turned a retrieval error into an external disclosure.",
          "Scope is where it could have been bounded independently. The send tool could reach any allowlisted vendor and not only the vendor associated with the fetched record, so narrowing the recipient argument would have stopped the message without anyone detecting the retrieval error at all.",
          "Instructions and lifecycle participated without causing anything, and naming that matters. Incident reviews tend to distribute blame evenly across everything present in the trace, which produces five remediation actions where two would do and leaves the two harder ones competing for attention with three easy ones.",
        ],
      },
      {
        title: "What the trace should have held",
        paragraphs: [
          "The analysis above was possible because the trace stored the ranked candidates and their entities. A trace holding only the model's paraphrase of the search result would have shown a plausible summary and no way to establish that three candidates existed or that the top one belonged elsewhere.",
          "That is the practical argument for the six fields from lesson 5.7, made by an incident instead of by a principle. Half an hour of analysis against a complete trace, or a week of reconstruction against a partial one, and the difference was a design decision taken months earlier by somebody who never expected to need it.",
        ],
      },
    ],
    misconception: {
      says: "The model made a mistake.",
      why: "The model ranked three candidates and used the top one, which is what a ranking returns. The design chose search where a fetch was available, omitted the check that would have caught the consequence, and permitted a send to a recipient unrelated to the fetched record. Three design decisions, each made by a person, and not one of them a model error. This sentence is the most expensive one in the field, because it ends an investigation that had three fixes left in it.",
    },
    widget: {
      kind: "trace",
      mode: "steps",
      dataset: "incident",
      caption:
        "The full trace, expandable at every step. Find the step where the wrong record entered, then check what happened at every step after it.",
    },
    instrument: {
      name: "The incident walk",
      body: "Five subsystems, in order, on any incident. Twenty minutes, and it stops blame landing on whatever is most visible.",
      items: [
        "State: what entered the working set, from where, and through which door?",
        "Verification: which check should have failed here, and did it exist at all?",
        "Scope: could the action have been narrowed without blocking the legitimate case?",
        "Instructions: was the procedure specific enough that a new joiner would have done differently?",
        "Lifecycle: did anything carry over from a previous run that should not have?",
        "Then: one preventive control, two cheaper detective ones, and the frozen-set case.",
      ],
    },
    soWhat:
      "You can run an incident review producing three controls and a test case, instead of one producing a root cause of human error and a reminder to be careful.",
    checks: [
      {
        q: "What was the origin of the failure?",
        options: [
          {
            text: "The model chose the wrong record.",
            feedback:
              "It used the top-ranked result, which is what a ranked search returns. The design put a ranking where an exact lookup was available.",
            impliesMissing: "A-FETCHVSSEARCH",
          },
          {
            text: "A search was used where the entity and invoice number were both known, so a fetch was available.",
            correct: true,
            feedback:
              "Correct. Lesson 2.7's rule, and it is the origin rather than the control that would have caught the consequence.",
          },
          {
            text: "The allowlist was too broad.",
            feedback:
              "It contributed to the reach, and the recipient was a genuine counterparty, so the allowlist behaved exactly as configured.",
            impliesMissing: "A-LEASTPRIVILEGE",
          },
        ],
      },
      {
        q: "Which cheaper control would have caught this earlier?",
        options: [
          {
            text: "Human review of every outbound message.",
            feedback:
              "It would have caught it, at a cost removing the economic case and producing the review fatigue from lesson 6.1.",
            impliesMissing: "A-HITL",
          },
          {
            text: "Restricting the send tool's recipient to the counterparty on the fetched record.",
            correct: true,
            feedback:
              "Correct. Free, mechanical, and it bounds the outcome whether or not the retrieval error occurs.",
          },
          {
            text: "A confidence threshold on the search result.",
            feedback:
              "A ranking score measures resemblance and not correctness, so thresholding it invites the error from lesson 2.2.",
            impliesMissing: "A-CALIBRATION",
          },
        ],
      },
      {
        q: "What should the new frozen-set case look like?",
        options: [
          {
            text: "A case checking that the search returns the right record.",
            feedback:
              "That tests the component which should be replaced, instead of the behavior that matters.",
            impliesMissing: "A-SETDESIGN",
          },
          {
            text: "A near-miss pair: two records with the same amount for different entities, where the correct behavior is to use the one matching the entity in scope.",
            correct: true,
            feedback:
              "Correct. It fails today, passes after the fix, and stays in the set permanently as a regression test.",
          },
          {
            text: "A note in the playbook warning about similar records.",
            feedback:
              "A warning is an instruction. This incident needs a test and a control, and lesson 6.1 explains why.",
            impliesMissing: "A-FROZENSET",
          },
        ],
      },
    ],
    next: "clinic-diligence-memo",
    relatedUseCases: ["ap-invoice-exceptions", "ar-collections-chase"],
  },

  {
    slug: "clinic-diligence-memo",
    order: 60,
    n: "C4",
    module: "M9",
    kind: "clinic",
    minutes: 50,
    title: "Clinic: the diligence memo",
    blurb:
      "A target with three AI claims, a demo, a benchmark table and an architecture diagram. Write what is measured, what is asserted, what is unknown, and what would change the verdict.",
    thesis:
      "A defensible assessment states what is measured, what is modeled, what is declared and what is unknown, and names what would move each label, which is a more useful document than a recommendation.",
    lede:
      "The final clinic, and the one closest to a deliverable somebody pays for. The output is a memo of about a page. What makes it good is that a reader can see exactly which evidence supports which conclusion, and what would change it.",
    youWill: [
      "Classify every claim in a target's materials.",
      "Separate what the evidence supports from what it is being used to support.",
      "Write what you would measure next, in priority order, with costs.",
      "State what would change the verdict, specifically.",
    ],
    atoms: [],
    prereqs: ["A-CLAIMCLASS", "A-CONTAMINATION", "A-MOAT", "A-ARTIFACTDEMAND"],
    situation: {
      artifact:
        "A target's materials: a demo processing three documents flawlessly, a benchmark table showing their extraction ahead of two competitors on a public dataset, an architecture diagram with five agent boxes, and three claims, namely proprietary models fine-tuned on industry data, 40% of customer workflows fully automated, and a defensible data moat.",
      prompt: "Before reading on: which of the four materials supports the least?",
      options: [
        "The demo",
        "The benchmark table",
        "The architecture diagram",
        "The claim about the data moat",
      ],
      reveal:
        "The architecture diagram, by a distance. Five boxes running the same model with the same tools contain no controls, as lesson 4.7 established, and a diagram carries no evidence about anything actually running. The benchmark table supports a narrow claim about a public dataset with contamination unaddressed. The demo supports that success is possible. The data-moat claim is unevidenced and is at least about the right thing, which makes it the one worth investigating first.",
    },
    sections: [
      {
        title: "The task",
        paragraphs: [
          "Write the memo. Four sections covering what is measured, what is modeled, what is declared and what is unknown. Then what you would measure next, in priority order, with what each would cost and how long it would take. Then what would change the verdict.",
          "Thirty-five minutes, then the worked answer and the rubric. Keep it to a page, because the discipline of a page is what forces the classification to do the work instead of the prose.",
        ],
        list: [
          "Classify every claim across all four materials.",
          "For each measured claim, state the conditions bounding it.",
          "For each unknown, name the artifact or test resolving it, and its cost.",
          "Write the verdict as a conditional: this holds if X, and here is how to establish X.",
          "Name the single finding that would most change the assessment.",
        ],
      },
      {
        title: "What the rubric rewards",
        paragraphs: [
          "Refusing to convert declared claims into measured ones, which is the most common failure and the one producing confident wrong assessments. Handling the benchmark correctly, meaning relative progress on a public dataset with contamination unaddressed and no transfer to any specific customer's queue. Recognising that the five-box diagram contains no controls unless the boxes hold different tools or different data.",
          "Locating the moat question in components instead of in the model, and identifying which components would be foreclosed to an entrant. And writing a conditional verdict instead of a recommendation. A memo saying this holds if the evaluation set is real, and here is how to check in two days, is more useful and more defensible than one saying proceed.",
        ],
      },
    ],
    misconception: {
      says: "The memo should end with a recommendation.",
      why: "A recommendation compresses the evidence into a verdict and hides which conclusion rests on which claim, so a reader who disputes one input has no way to see what it changes. A conditional verdict with a named next measurement lets the decision-maker act on the evidence instead of on the analyst's confidence, and it survives being wrong, which a compressed recommendation cannot.",
    },
    widget: {
      kind: "claims",
      dataset: "deck-claims",
      caption:
        "The target's claims across all four materials. Classify each one, then compare against the worked memo and its rubric.",
    },
    instrument: {
      name: "The diligence memo template",
      body: "One page. Four sections, a priority list, and a conditional verdict.",
      items: [
        "Measured: what was measured, on what, how many times, with which version, on which date.",
        "Modelled: what was derived, from which assumptions, and which assumption it is most sensitive to.",
        "Declared: what rests on the target's assertion, and whose credibility that is.",
        "Unknown: what nobody has measured, including them.",
        "Next measurements in priority order, with a cost and a duration against each.",
        "Conditional verdict: this holds if X, here is how to establish X, and here is what would change it.",
      ],
    },
    soWhat:
      "You can write an assessment whose reader can see exactly which evidence supports which conclusion, which is the document this entire course was built to make possible.",
    checks: [
      {
        q: "How should a benchmark table in a target's deck be treated?",
        options: [
          {
            text: "As measured evidence of capability.",
            feedback:
              "Measured on a public dataset with contamination unaddressed, which bounds it severely and stops it transferring.",
            impliesMissing: "A-CONTAMINATION",
          },
          {
            text: "As measured evidence about that dataset on that date, with contamination unaddressed and no transfer to any specific customer's work.",
            correct: true,
            feedback:
              "Correct, and stating the bound instead of dismissing the table is what makes the memo credible to the person who prepared it.",
          },
          {
            text: "As declared, since the target produced it.",
            feedback:
              "That under-classifies it. A reproducible measurement on a public dataset is measured, within its bounds.",
            impliesMissing: "A-CLAIMCLASS",
          },
        ],
      },
      {
        q: "The target claims a data moat. What would establish it?",
        options: [
          {
            text: "The size of their dataset.",
            feedback:
              "Size says nothing about whether an entrant could obtain equivalent data next quarter.",
            impliesMissing: "A-MOAT",
          },
          {
            text: "Which components are foreclosed to an entrant: exclusive access, counterparty-dependent integrations, or a corpus requiring years of operation.",
            correct: true,
            feedback:
              "Correct. The moat is the foreclosed list, and everything else is a head start that depreciates on a schedule.",
          },
          {
            text: "Their customer count.",
            feedback:
              "Evidence of traction, which is a different claim and a useful one to assess separately.",
            impliesMissing: "A-MOAT",
          },
        ],
      },
      {
        q: "Why write a conditional verdict instead of a recommendation?",
        options: [
          {
            text: "To avoid being held responsible for the outcome.",
            feedback:
              "A conditional verdict is more accountable, since it states exactly what it depends on and can be checked.",
            impliesMissing: "A-CLAIMCLASS",
          },
          {
            text: "Because it shows which conclusion rests on which claim, so a reader who disputes one input can see what that changes.",
            correct: true,
            feedback:
              "Correct, and it survives being wrong, which a compressed recommendation cannot.",
          },
          {
            text: "Because decision-makers prefer options.",
            feedback:
              "Sometimes true and beside the point. The reason is analytical transparency.",
            impliesMissing: "A-ARTIFACTDEMAND",
          },
        ],
      },
    ],
    next: null,
    relatedUseCases: ["ap-invoice-exceptions", "rfp-response-assembly"],
  },
];
