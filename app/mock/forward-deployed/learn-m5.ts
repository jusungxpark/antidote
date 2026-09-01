import type { LearnLesson } from "./learn-types";
import { CASE, CASE_QUEUE } from "./learn-case";

export const M5_LESSONS: LearnLesson[] = [
  {
    slug: "same-model-different-outcome",
    order: 31,
    n: "5.1",
    module: "M5",
    kind: "lesson",
    minutes: 22,
    title: "Why does the same model work there and fail here?",
    blurb:
      "Identical weights, different environment, different outcome. Which is why the model choice is usually the least interesting decision in the room.",
    thesis:
      "Two companies renting the same model get very different results because reliability is produced by the environment built around it, and that environment is where nearly all the engineering, cost and defensibility live.",
    lede:
      "Everyone in this market rents the same handful of models. That single fact should reshape how you read every claim of superiority, every pilot result, and every acquisition thesis. If the model is a commodity input available to your competitor at the same price, then whatever separates a working system from a failing one has to be somewhere else, and this module is about where.",
    youWill: [
      "Explain why identical models produce different outcomes across companies.",
      "Triage a failure into environment causes before model causes.",
      "Say what a model upgrade can and cannot fix.",
      "Locate where defensibility actually sits in these systems.",
    ],
    atoms: ["A-HARNESS"],
    prereqs: ["A-JAGGED", "A-LOOP"],
    ceiling:
      "The claim and its evidence. The five parts arrive in the next lesson; here the reader needs only that the environment dominates and why that follows from earlier modules.",
    situation: {
      artifact:
        "Two companies in the same industry run the same model against the same class of exception queue. The first resolves 61% without a human touch, at an error rate of 0.4%. The second resolves 12%, at an error rate of 7%, and has paused the rollout.",
      prompt: "What is the most likely difference?",
      options: [
        "The first is using a better version of the model",
        "The first has cleaner data",
        "The first built more around the model",
        "The first has an easier queue",
      ],
      reveal:
        "The third, and by a distance. Same model, same industry, same class of work. What differs is everything the model sits inside: what gets fetched into the packet, what the instructions say, what gets validated, where the gates are, what happens when the system cannot proceed, and whether anyone measured any of it. Data quality matters and is part of the same story, because someone built the fetch. The model version is the one variable both companies could change tomorrow, and it would move neither number much.",
    },
    sections: [
      {
        title: "The argument, from what you already have",
        paragraphs: [
          "Every earlier module has been laying this out. A model produces a distribution over the next token, so what is in the context decides the answer, and something has to assemble the context. Capability is jagged, so the system needs to know which cases it handles and which it hands over, and something has to make that decision. Error compounds across steps, so the run needs verification points and caps, and something has to enforce them. The output can reach live systems, so something has to decide whether a proposed action happens.",
          "Every one of those somethings is engineering outside the model. Collectively they are the harness, and the claim of this module is straightforward: they dominate. The gap between a system resolving six exceptions in ten and one resolving one is almost entirely harness, and the same holds for the gap between an error rate of half a percent and one of seven.",
          "The most useful consequence is diagnostic. When a pilot fails, the instinct is to reach for a different model, because that is the variable with a knob on it. Working through the environment first is faster, cheaper, and usually finds the cause. Six questions, asked in order, resolve most failures without touching the model. Was the deciding information in the context, which alone explains a large share of wrong answers and is answerable by reading one packet? Were the instructions specific enough that a competent new joiner could have followed them? Did anything check the output before it was used? Was the scope bounded, since many failures are the system doing something adjacent nobody meant to authorise? Was there a stop condition and a cap? And is any of it traced, because if nobody can see what happened, the team is guessing, and guessing usually lands on the model.",
        ],
      },
      {
        title: "Where the defensibility went",
        paragraphs: [
          "This lesson carries a commercial edge worth stating plainly. If the model is rented by everyone at the same price, then a product's durability comes from the harness and from the things the harness plugs into: integrations that took quarters to negotiate, an exception playbook written from two years of real cases, an evaluation set built from your own tail, and permission to write into a system of record.",
          "None of those improve when a model improves, and none of them evaporate when a model improves either. That asymmetry is why harness quality is the right thing to assess in diligence, and why lesson 8.4 turns it into a rebuild question.",
          "It also reframes the most common anxiety in this market. The worry that a model release will erase a company's value is usually misplaced. A model release erases the value of a company whose only contribution was calling the model, and those companies are identifiable in advance by exactly the questions this module supplies.",
        ],
      },
    ],
    misconception: {
      says: "We are waiting for the next model release before we commit.",
      why: "The next release moves per-step capability somewhat and leaves untouched every environmental cause of the current failure: what gets fetched, what gets checked, where the gates are, and whether anyone can see what happened. Teams that wait usually find the new model produces the same outcome, because the constraint was never the model.",
    },
    widget: {
      kind: "trace",
      mode: "harness-vs-harness",
      dataset: "two-harnesses",
      caption:
        "One model, two environments, twenty identical invoices. Compare resolution rate, error rate and cost, then look at which specific difference produced which gap.",
    },
    instrument: {
      name: "The harness-or-model triage",
      body: "Run this before any model change is proposed. It takes an hour and it usually ends the discussion.",
      items: [
        "Read one failing call in full, including everything that was in its context.",
        "Was the deciding information present? If not, stop. This is a grounding problem.",
        "Could a competent new joiner have followed the instruction as written?",
        "What checked the output, and what would it have caught?",
        "What bounded the scope, and what capped the run?",
        "Can you replay the failure from a trace? If not, fix that first, because everything else is guesswork.",
      ],
    },
    soWhat:
      "You can respond to a failing pilot with six diagnostic questions instead of a model comparison, and you can locate a product's defensibility in the parts that survive the next model release.",
    checks: [
      {
        q: "Two companies, same model, same queue, very different results. What is the most likely explanation?",
        options: [
          {
            text: "One has better prompts.",
            feedback:
              "Part of it, and far too narrow. Prompts are one of five subsystems, and rarely the one that matters most.",
            impliesMissing: "A-HARNESS",
          },
          {
            text: "One built more around the model: what gets fetched, what gets checked, where the gates are, what happens on failure, and what is measured.",
            correct: true,
            feedback:
              "Correct, and it is why the next lesson gives those parts names so they can be demanded individually.",
          },
          {
            text: "One has a newer model version.",
            feedback:
              "The one variable both could change tomorrow, and the one that would move the numbers least.",
            impliesMissing: "A-HARNESS",
          },
        ],
      },
      {
        q: "A pilot returns wrong answers on a third of items. What is the first thing to check?",
        options: [
          {
            text: "Whether a stronger model performs better on the same items.",
            feedback:
              "Expensive, slow, and it skips the question that resolves most cases in ten minutes.",
            impliesMissing: "A-HARNESS",
          },
          {
            text: "Whether the deciding information was in the context of the failing calls.",
            correct: true,
            feedback:
              "Correct. Reading one failing packet in full answers a large share of these, and it costs nothing.",
          },
          {
            text: "Whether the team needs more training data.",
            feedback:
              "Presupposes a training solution to what is almost certainly a context or verification problem.",
            impliesMissing: "A-FINETUNE-VS-CTX",
          },
        ],
      },
      {
        q: "Where does a product's durability sit if everyone rents the same model?",
        options: [
          {
            text: "In the prompts, which are hard to reproduce.",
            feedback:
              "Prompts are the most copyable part of the stack, as lesson 3.3 established.",
            impliesMissing: "A-CUSTOMMODEL",
          },
          {
            text: "In integrations, the exception playbook, the evaluation set, and permission to write into a system of record.",
            correct: true,
            feedback:
              "Correct. All four take calendar time that money alone cannot compress, and all four survive a model release.",
          },
          {
            text: "In having early access to new model versions.",
            feedback:
              "A temporary advantage measured in weeks, available to competitors on the same terms.",
            impliesMissing: "A-HARNESS",
          },
        ],
      },
    ],
    next: "five-subsystems",
    relatedUseCases: ["ap-invoice-exceptions", "claim-intake-missing-info"],
  },

  {
    slug: "five-subsystems",
    order: 32,
    n: "5.2",
    module: "M5",
    kind: "lesson",
    minutes: 24,
    title: "What is the harness made of?",
    blurb:
      "Instructions, state, verification, scope, lifecycle. A system missing any one of them is a demo, and which one is missing predicts how it will fail.",
    thesis:
      "The environment around a model decomposes into five subsystems, each with a distinct job and a distinct failure signature, so naming them turns a vague quality judgment into five specific things you can ask for.",
    lede:
      "This is the most useful frame in the course, because it converts an impression into an inventory. Instead of this feels underbuilt, you get: there is no verification subsystem, which is why every error reaches a customer. The remaining five lessons in this module take one subsystem each.",
    youWill: [
      "Name the five subsystems and the job each does.",
      "Predict the failure signature of a system missing each one.",
      "Run a five-part audit on any system, internal or vendor.",
      "Explain why a demo can pass while missing three of the five.",
    ],
    atoms: ["A-FIVESUBSYSTEMS"],
    prereqs: ["A-HARNESS"],
    ceiling:
      "The five names, jobs and failure signatures. Each subsystem gets its own lesson afterwards; this one is the frame.",
    situation: {
      artifact:
        "A demo. An exception gets picked from a queue, the system reads three documents, drafts a chase, and posts a note. It takes forty seconds and the output is good. The person running it says it does this all day.",
      prompt: "Which subsystems has the demo shown you?",
      options: [
        "All five. it completed the whole task",
        "Instructions and state, since it read and used documents",
        "Instructions only, and even that partially",
        "None; a demo shows nothing",
      ],
      reveal:
        "Instructions, partially, and nothing else. You saw one item succeed once. You hold no evidence about what happens across a session, what would have failed a check, what the system may not do, or how a run ends when it cannot proceed. A demo is structurally incapable of showing verification, scope or lifecycle, because all three are only visible when something goes wrong, and demos get selected so that nothing does.",
    },
    sections: [
      {
        title: "The five",
        paragraphs: [
          "Instructions are what the system is meant to do, in what order, with what rules and what worked examples. State is what the system carries between steps and between sessions, and where the durable version lives. Verification is the checks that can fail, run against outputs and intermediate results. Scope is the machine-readable boundary of what the system may attempt and what counts as finished. Lifecycle is how a run starts clean, how it ends, what it leaves behind, and how the next run picks up.",
          "Each has a job, and each has a recognisable failure when it is absent.",
        ],
        table: {
          head: ["Subsystem", "Its job, and what its absence looks like"],
          rows: [
            {
              label: "Instructions",
              body: "Makes the desired behavior the likely one. Absent: reasonable but inconsistent behavior.",
            },
            {
              label: "State",
              body: "Ensures step fifteen knows what step two established. Absent: amnesia, repetition, and drifting identifiers.",
            },
            {
              label: "Verification",
              body: "Converts an error into a caught error. Absent: every error rate becomes an incident rate.",
            },
            {
              label: "Scope",
              body: "Makes overreach and undercompletion impossible instead of discouraged. Absent: helpful, unauthorised, adjacent action.",
            },
            {
              label: "Lifecycle",
              body: "Makes runs repeatable. Absent: behavior that differs on Wednesday for reasons nobody can reconstruct.",
            },
          ],
        },
      },
      {
        title: "Why a demo can pass while missing three",
        paragraphs: [
          "Three of the five are only observable in failure. Verification is invisible when nothing fails a check. Scope is invisible when nothing gets attempted outside it. Lifecycle is invisible in a single run started by hand from a clean state.",
          "A demo is a single run, on a chosen item, started clean, watched by the person who built it. That combination hides exactly the three subsystems whose absence causes production incidents, which is why an excellent demo and a fragile system are entirely compatible, and why lesson 7.1 treats the demo as a designed object instead of as evidence.",
          "The way to see the missing three is to ask for the artifacts instead of the behavior. What does the validator check? What is the tool list? What happens at the cap? Those questions can be answered at a whiteboard in five minutes and cannot be answered by running the demo again.",
        ],
      },
      {
        title: "The audit",
        paragraphs: [
          "The five-subsystem audit is one page and it works on internal builds and vendors alike. For each subsystem: what exists, what artifact proves it, and what its absence would cost here.",
          "Two rules make it useful instead of ceremonial. Demand an artifact for each one, meaning a prompt, a state schema, a validator list, a tool list, a runbook. And score the absence in operational terms instead of engineering terms, because no verification on a queue that touches payments is a different finding from no verification on a queue that drafts internal notes.",
        ],
        example: {
          title: "The queue, audited",
          body: `${CASE_QUEUE} Instructions are a two-hundred-word procedure plus six worked exceptions. State is a pinned field block plus the ERP as the durable record. Verification is a schema check plus an amount comparison against the ERP. Scope is a seven-entry tool list with one external effect. Lifecycle is a clean start per item, a twelve-step cap, and a parked outcome naming what was missing.`,
        },
      },
    ],
    misconception: {
      says: "The harness is basically prompt engineering.",
      why: "Instructions are one of five subsystems, and the one a demo makes visible, which is why it absorbs the attention. The three causing production incidents. verification, scope and lifecycle. are invisible in a demo and are usually the ones missing. A team that has spent six months on prompts with no validator has optimised the part that was already working.",
    },
    widget: {
      kind: "trace",
      mode: "subsystems",
      dataset: "subsystem-ablation",
      caption:
        "The same run with each subsystem removed in turn. Each removal produces a different failure, and the failures are recognisable once you have seen them.",
    },
    instrument: {
      name: "The five-subsystem audit",
      body: "The second most-used instrument in this course. One page, five sections, an artifact demanded for each.",
      items: [
        "Instructions: show me the actual text, including the rules and the worked examples.",
        "State: what carries between steps, and where does the durable version live?",
        "Verification: list the checks that can fail, and show me one that fired this month.",
        "Scope: show me the tool list and the definition of finished.",
        "Lifecycle: how does a run start clean, what ends it, and what does it leave behind?",
        "For each gap, write what its absence would cost on this specific queue.",
      ],
    },
    soWhat:
      "You can turn an impression about a system into five specific artifact requests, and you can predict which failure a missing subsystem will produce before it produces it.",
    checks: [
      {
        q: "A system produces good answers and occasionally posts a duplicate note. Which subsystem is weakest?",
        options: [
          {
            text: "Instructions. it needs a rule about duplicates.",
            feedback:
              "A rule shifts probabilities. Duplicates are a state and verification problem, and both can enforce instead of encourage.",
            impliesMissing: "A-FIVESUBSYSTEMS",
          },
          {
            text: "State and verification. nothing records that the note was posted, and nothing checks before posting again.",
            correct: true,
            feedback:
              "Correct, and the fix is an idempotency key plus a check, which is lesson 4.2's point applied here.",
          },
          {
            text: "Scope. it should not be posting notes.",
            feedback:
              "Posting notes is the job. The problem is doing it twice.",
            impliesMissing: "A-FIVESUBSYSTEMS",
          },
        ],
      },
      {
        q: "Why can a demo not show you verification, scope or lifecycle?",
        options: [
          {
            text: "Because demos are too short.",
            feedback:
              "Length is incidental. A longer demo that also succeeds shows the same three nothing.",
            impliesMissing: "A-FIVESUBSYSTEMS",
          },
          {
            text: "Because all three are only visible in failure, and a demo gets selected and started clean so that nothing fails.",
            correct: true,
            feedback:
              "Correct, and it is why the right move in a demo is to ask for artifacts instead of for another run.",
          },
          {
            text: "Because vendors hide them.",
            feedback:
              "Usually no concealment is involved. The structure of a demo hides them whatever anyone intends.",
            impliesMissing: "A-DEMO",
          },
        ],
      },
      {
        q: "A system behaves differently on Wednesday than on Tuesday, with no code change. Which subsystem should you look at first?",
        options: [
          {
            text: "Instructions.",
            feedback:
              "Unchanged instructions produce different behavior when the starting state differs, which points elsewhere.",
            impliesMissing: "A-FIVESUBSYSTEMS",
          },
          {
            text: "Lifecycle. how a run starts, what it inherits, and what the previous run left behind.",
            correct: true,
            feedback:
              "Correct. Irreproducibility across days is the signature failure of a missing or leaky lifecycle.",
          },
          {
            text: "Verification.",
            feedback:
              "A missing check lets errors through consistently instead of producing day-to-day variation.",
            impliesMissing: "A-FIVESUBSYSTEMS",
          },
        ],
      },
    ],
    next: "instructions",
    relatedUseCases: ["ap-invoice-exceptions", "vendor-onboarding-packs"],
  },

  {
    slug: "instructions",
    order: 33,
    n: "5.3",
    module: "M5",
    kind: "lesson",
    minutes: 22,
    title: "Why does one long prompt stop working?",
    blurb:
      "Instructions compete with data for the same attention, so a monolithic prompt degrades as it grows. What works is a small core plus material disclosed when needed.",
    thesis:
      "Instructions occupy the same window as the material they operate on and compete for the same finite attention, so beyond a certain length adding rules makes behavior worse, and the fix is structural instead of editorial.",
    lede:
      "Almost every team goes through the same arc. The prompt works. An edge case appears, so a rule gets added. Another edge case, another rule. By the fourth month the prompt runs to four thousand words, new rules stop taking effect, and old ones start being ignored. Nothing went wrong; the approach ran out of room, for reasons module two already explained.",
    youWill: [
      "Explain why prompt length has a ceiling, from mechanism.",
      "Restructure a monolith into a core plus disclosures.",
      "Write a task specification a competent new joiner could follow.",
    ],
    atoms: ["A-INSTRUCTIONS", "A-PROGRESSIVE"],
    prereqs: ["A-FIVESUBSYSTEMS", "A-STUFFING"],
    ceiling:
      "The competition argument plus the disclosure pattern. No prompt-technique catalogue; the durable skill is writing a specification and not memorising phrasings.",
    situation: {
      artifact:
        "A system prompt grown to 4,100 words across nine months. It contains the role, the output format, eleven exception types with handling rules, four escalation policies, twelve worked examples, and a section headed important reminders that repeats six earlier rules in capitals.",
      prompt: "What happens when the team adds rule twelve?",
      options: [
        "It works, since the model reads everything in the prompt",
        "It works but costs slightly more",
        "It takes effect inconsistently, and some earlier rules start being followed less",
        "It has no effect at all",
      ],
      reveal:
        "The third, and the second half is what makes it maddening. Adding a rule increases what competes for attention, so the new rule lands unreliably and existing behavior shifts. The capitalised reminders section is the tell: it exists because rules stopped taking effect, and it made the problem worse by adding length. The fix is a restructure instead of better wording, and it is the subject of this lesson.",
    },
    sections: [
      {
        title: "Why length has a ceiling",
        paragraphs: [
          "The instructions sit in the same window as the invoice, the purchase order and the conversation. Lesson 2.5 established that everything in the window competes for a finite budget of attention, and that topically similar material competes hardest. Eleven exception-handling rules are highly similar to each other, so they compete with each other.",
          "That produces the observed behavior precisely. A short prompt has little competition and its rules land reliably. A long prompt has many similar rules, so which ones influence any given call becomes partly a matter of how the item resembles each rule's phrasing. Adding rule twelve makes rules one through eleven slightly less reliable, and nobody notices because nobody re-measures the earlier cases.",
          "The capitalised reminders section deserves its own note, because it appears in almost every mature monolithic prompt. It is an attempt to solve a competition problem with emphasis. It adds length, which adds competition, and the emphasis it applies competes with the emphasis on everything else that was also marked important.",
        ],
      },
      {
        title: "The core plus disclosure pattern",
        paragraphs: [
          "Split the instructions into a small always-present core and a set of pieces arriving only when relevant. The core carries what applies to every item: the role, the output shape, the standing constraints, and the decision about when to stop. A few hundred words at most, stable, which also means it caches well, and lesson 2.6 established that as a real saving.",
          "The disclosures carry what applies to a subset. The missing-receipt procedure appears in the context only when the item is a missing-receipt case. The eleven exception types become eleven short documents, one of which gets included, instead of eleven sections competing on every call. The routing decision, meaning which disclosure to include, belongs in software instead of in the model, because it is a closed decision from a known set, which lesson 1.3 already settled. Classify the item, then assemble the packet for that class.",
          "The result is usually a system with a three-hundred-word core and a two-hundred-word procedure where a four-thousand-word monolith used to be. Rules land reliably again, cost falls, and each procedure can be edited by the person who owns that exception type without touching anything else.",
        ],
        split: [
          {
            title: "Core",
            body: "Role, output shape, standing constraints, stopping rule. A few hundred words. Stable, so it caches. Present on every call.",
          },
          {
            title: "Disclosure",
            body: "The procedure for this class of item, included because software classified the item. Editable by the person who owns that class.",
          },
        ],
      },
      {
        title: "Writing the specification",
        paragraphs: [
          "The durable skill here has nothing to do with model-specific phrasings, which change with every release. It is the ability to write a procedure a competent new joiner could follow, and it is the same skill that produces good runbooks.",
          "Four properties make the difference. Name the decision to be made instead of describing an area of responsibility. Give the inputs by name and say where they come from. State what to do when the input is missing, which is the sentence most procedures omit and the one that prevents invention. And show two worked examples, including one ending in escalation, because a procedure with only successful examples teaches that success is the only outcome.",
          "The test is literal. Hand it to someone who has never done the task and see whether they can. If they ask a question, that question is a missing line, and adding it improves the model's behavior for the same reason it would have improved theirs.",
        ],
      },
    ],
    misconception: {
      says: "The prompt is very thorough. it covers every case we have seen.",
      why: "Thoroughness in one document produces the ceiling. Eleven similar rules compete with each other for the same attention, so coverage on paper stops corresponding to behavior in production, and the more thorough the document becomes the weaker that correspondence gets. Coverage belongs across a set of small disclosures with software deciding which one applies.",
    },
    widget: {
      kind: "context",
      mode: "layers",
      dataset: "monolith-vs-layered",
      caption:
        "The same eleven rules as one monolith and as a core plus disclosures. Compare rule-following, tokens per call and cost across twenty items.",
    },
    instrument: {
      name: "The task-spec template",
      body: "Works for a model and for a new joiner, which is the point. Under two hundred words per procedure.",
      items: [
        "The decision: what single call has to be made here?",
        "The inputs: named, with where each one comes from.",
        "The rule: what to do in the ordinary case.",
        "The absence rule: what to do when an input is missing. Never omit this line.",
        "The stop: what finished looks like, and what escalation looks like.",
        "Two worked examples, one of which ends in escalation.",
      ],
    },
    soWhat:
      "You can diagnose the four-thousand-word prompt as a structural symptom instead of a documentation success, and you can propose the restructure that makes rules land reliably again while cutting cost.",
    checks: [
      {
        q: "A team adds a twelfth rule to a long prompt and two older behaviors regress. Why?",
        options: [
          {
            text: "The model has a rule limit.",
            feedback:
              "No fixed limit exists. The effect is competition for attention, which degrades gradually.",
            impliesMissing: "A-INSTRUCTIONS",
          },
          {
            text: "The rules compete with each other for the same finite attention, so adding one makes the others slightly less reliable.",
            correct: true,
            feedback:
              "Correct, and it is why the regression usually goes unnoticed: nobody re-measures the earlier cases after adding a rule.",
          },
          {
            text: "The new rule contradicts the old ones.",
            feedback:
              "Contradiction is one cause. The effect appears even when the rules are entirely consistent.",
            impliesMissing: "A-STUFFING",
          },
        ],
      },
      {
        q: "Who should decide which procedure gets included in the context?",
        options: [
          {
            text: "The model, by reading all the procedures and picking.",
            feedback:
              "That reintroduces the competition problem in full, since all of them are present in order to be picked from.",
            impliesMissing: "A-PROGRESSIVE",
          },
          {
            text: "Software, by classifying the item first and assembling the packet for that class.",
            correct: true,
            feedback:
              "Correct. Classification is a closed decision from a known set, which lesson 1.3 already assigned to software.",
          },
          {
            text: "Whoever configured the system, statically.",
            feedback:
              "Workable for a single-purpose system and it collapses as soon as one queue holds several exception types.",
            impliesMissing: "A-PROGRESSIVE",
          },
        ],
      },
      {
        q: "Which line do procedures most often omit, and why does it matter here?",
        options: [
          {
            text: "The escalation contact.",
            feedback:
              "Often present. Worth having, and it does nothing about the failure this lesson targets.",
            impliesMissing: "A-INSTRUCTIONS",
          },
          {
            text: "What to do when an input is missing, which is the situation producing invention.",
            correct: true,
            feedback:
              "Correct. The absence rule is the one line connecting this subsystem to the mechanism in lesson 2.1.",
          },
          {
            text: "The output format.",
            feedback:
              "Nearly always present, since its absence is immediately visible.",
            impliesMissing: "A-INSTRUCTIONS",
          },
        ],
      },
    ],
    next: "three-memories",
    relatedUseCases: ["claim-intake-missing-info", "freight-invoice-audit"],
  },
  {
    slug: "three-memories",
    order: 34,
    n: "5.4",
    module: "M5",
    kind: "lesson",
    minutes: 20,
    title: "Where does what it learned actually live?",
    blurb:
      "Three stores with three lifetimes sit behind the word memory. Which one holds a fact decides whether it survives the run, the quarter, or the vendor.",
    thesis:
      "Memory in these systems is three separate stores with three different lifetimes and three different owners, and a fact that never reaches the system of record is a fact the business does not own.",
    lede:
      "Someone in a review will say the system has learned that this vendor sends photographs. It is worth stopping there and asking where that sentence lives, because the word memory covers three stores that behave nothing alike. One dies when the call returns. One survives until the contract does. Only the third is something the business can be said to own, and most systems never write to it.",
    youWill: [
      "Name the three stores behind the word memory and the lifetime of each.",
      "Say which store a given learned fact has landed in.",
      "Test whether a learned fact survives a supplier change.",
    ],
    atoms: ["A-MEMORY3", "A-WRITETHROUGH"],
    prereqs: ["A-FIVESUBSYSTEMS", "A-GROUNDING", "A-SOR"],
    ceiling:
      "Three stores, three lifetimes, and the write-through test. No index internals; the retrieval mechanism was settled in module two and nothing here depends on how the store is built.",
    situation: {
      artifact: `A vendor manager says the system has learned that ${CASE.vendor} sends receiving documents as photographs, so it now handles them correctly. The behavior has held for six weeks.`,
      prompt: "Where is that fact stored?",
      options: [
        "In the model, which was updated by the correction",
        "In a retrieval store the software supplier operates",
        "On the vendor record in the ERP",
        "Cannot be determined from the description",
      ],
      reveal:
        "The fourth, and the question is worth asking out loud because the three possibilities have wildly different consequences. If the correction reached the weights, an upgrade erases it, which lesson 3.4 already covered. If it sits in a retrieval store the supplier operates, it holds until the contract ends and then leaves with them. If it was written to the vendor record, it survives everything and a person who has never opened the tool can find it. Six weeks of correct behavior is compatible with all three.",
    },
    sections: [
      {
        title: "Three stores, three lifetimes",
        paragraphs: [
          "The window is the packet assembled for one call. It holds the invoice, the purchase order, the instructions and the steps taken so far. It lasts until the call returns, and lesson 2.4 established that nothing carries across calls except what software puts back. Treating the window as memory is the most common mistake in the category, because inside a single session it behaves exactly like memory and the distinction only shows up the next morning.",
          "The retrieval layer is a store of text or records that software searches before assembling the packet. Facts land there because something wrote them there, and they come back into the window because a search returned them. Lifetime is months to years, and the owner is whoever operates the store, which is often the software supplier and not the business.",
          "The system of record is the ERP, the case management system, the policy administration system. A fact written there is visible to every person and every system that reads the record, it carries an audit trail, and its lifetime is the lifetime of the business. This is the only one of the three that a finance function would recognize as an asset.",
        ],
        example: {
          body: `The note that ${CASE.vendor} sends photographs can live in all three places at once. In the window it lasts eleven seconds. In a retrieval store it lasts until renewal. On the vendor record it becomes a field a buyer sees in the ordinary course of the work, and the AP clerk who has never opened the agent finds it in the place they were already looking.`,
        },
      },
      {
        title: "The write-through test",
        paragraphs: [
          "One question separates a memory that belongs to the business from one that belongs to a supplier. If the system were switched off this afternoon, would the fact still be findable by someone who never used it? A fact that fails that question lives in a shadow ledger, accumulating value in a store nobody outside the tool can read.",
          "Shadow ledgers form quietly, and for reasons that are defensible at every individual step. Writing to a retrieval store takes a line of code. Writing to the ERP takes a field, a permission, a validation rule and a conversation with whoever owns that record. So the easy path gets taken, six months of learned corrections accumulate, and the switching cost that results is a cost to the buyer rather than an asset on anyone's books.",
          "The design rule follows directly. Anything worth remembering across items belongs in the system of record, with the retrieval layer serving as a cache of what is already there. That ordering has a second benefit worth naming: it makes the retrieval store rebuildable, which turns a migration into a re-index instead of an act of archaeology.",
        ],
      },
      {
        title: "What this changes in a review",
        paragraphs: [
          "The question to ask a target is where learned facts get written, and the answer to listen for is a table name in a system the buyer already owns. An answer that names only the supplier's own store is a description of switching cost, and it is worth pricing as one.",
          "The same question settles what a model upgrade does to accumulated behavior. Facts in the system of record survive any upgrade, because the upgrade cannot reach them. Facts encoded in weights do not, for the reason lesson 3.4 gave. This is the practical case for keeping knowledge in data and out of parameters, and it holds however good the fine-tuning was.",
        ],
      },
    ],
    widget: {
      kind: "context",
      mode: "memories",
      dataset: "three-memories",
      caption:
        "One learned fact placed in each of the three stores. Compare what each holds, how long it survives, and whether anyone outside the tool can find it.",
    },
    instrument: {
      name: "The write-through test",
      body: "Five questions, asked of any fact a system claims to have learned.",
      items: [
        "Where is it written, named as a store?",
        "Who operates that store, and what happens to it at contract end?",
        "Can a person who has never used the tool find it?",
        "Does it survive a model upgrade?",
        "If the retrieval store were deleted tonight, could it be rebuilt from the system of record?",
      ],
    },
    soWhat:
      "You can hear the sentence the system has learned that and immediately ask the question deciding whether the learning is an asset on the buyer's side or a switching cost on the supplier's.",
    checks: [
      {
        q: "A correction has held for six weeks. What does that establish about where it is stored?",
        options: [
          {
            text: "It reached the weights, since the behavior changed.",
            feedback:
              "Behaviour changing establishes only that something changed. All three stores produce the same six weeks.",
            impliesMissing: "A-MEMORY3",
          },
          {
            text: "Nothing. All three stores produce that behavior, and they differ in what happens next.",
            correct: true,
            feedback:
              "Correct, and the differences show up at upgrade, at contract end, and the first time someone needs the fact outside the tool.",
          },
          {
            text: "It is in the retrieval layer, which is where corrections normally go.",
            feedback:
              "Often true in practice, and still an assumption. The description does not say, and the consequences differ.",
            impliesMissing: "A-MEMORY3",
          },
        ],
      },
      {
        q: "Why is a retrieval store that never writes back to the system of record a problem for the buyer?",
        options: [
          {
            text: "It is slower to search.",
            feedback:
              "Speed is unrelated, and a retrieval store is usually faster than the system of record.",
            impliesMissing: "A-WRITETHROUGH",
          },
          {
            text: "Accumulated knowledge sits where only that tool can read it, so the value it built becomes the cost of leaving.",
            correct: true,
            feedback:
              "Correct. Six months of corrections become the reason a switch is expensive, which is a transfer of value from buyer to supplier.",
          },
          {
            text: "It costs more to operate at volume.",
            feedback:
              "Marginal, and operating cost was never the argument. The argument is about who owns what was learned.",
            impliesMissing: "A-WRITETHROUGH",
          },
        ],
      },
      {
        q: "Where should a fact learned about a vendor be written first?",
        options: [
          {
            text: "The system of record, with the retrieval layer as a rebuildable cache of it.",
            correct: true,
            feedback:
              "Correct, and it is what turns a migration into a re-index.",
          },
          {
            text: "The retrieval layer, since that is what the system reads.",
            feedback:
              "It is what the system reads, and writing there first is precisely what creates the shadow ledger.",
            impliesMissing: "A-WRITETHROUGH",
          },
          {
            text: "Both, written independently.",
            feedback:
              "Two independent writes drift apart, and there is then no principled answer to which one is right.",
            impliesMissing: "A-MEMORY3",
          },
        ],
      },
    ],
    next: "verification",
    relatedUseCases: ["vendor-onboarding-packs", "ap-invoice-exceptions"],
  },

  {
    slug: "verification",
    order: 35,
    n: "5.5",
    module: "M5",
    kind: "lesson",
    minutes: 24,
    title: "How do you know it actually did it?",
    blurb:
      "A run that ends on the model's own report of success has verified nothing. Done is a read-back that can come back negative.",
    thesis:
      "Verification is a check with the power to fail, performed by software against the state of the world, and a system whose completion signal is the model's own claim has no verification at all.",
    lede:
      "The most expensive failure in this category is a quiet one. Nothing crashes. No error appears. The run ends, the item leaves the queue, the dashboard shows ninety-four percent resolved, and the note was never written. Lesson 2.2 explained why the report of success reads exactly like a real one. This lesson is about the small piece of software that separates them.",
    youWill: [
      "Distinguish a check that can fail from a step that always passes.",
      "Design a read-back for a given action.",
      "Read a completion rate and ask what was counted to produce it.",
      "Name the four check categories that catch most of what goes wrong.",
    ],
    atoms: ["A-VERIFY", "A-EVIDENCE-OF-DONE"],
    prereqs: ["A-FIVESUBSYSTEMS", "A-CALIBRATION"],
    ceiling:
      "What a check is, what evidence of done looks like, where checks sit in the loop. Measurement across a population is module seven; this is the single-run mechanism it depends on.",
    situation: {
      artifact: `A queue dashboard reports 94% of items resolved without human touch over the last month. A sample of forty resolved items is pulled and checked against the ERP. Six have no note on the record. Three carry a note against the wrong invoice number. One was posted twice.`,
      prompt: "What is the resolution rate?",
      options: [
        "94%, since the discrepancies are a separate data quality issue",
        "Around 75%, and the dashboard was counting something else",
        "Around 85%, counting the duplicate as resolved",
        "Unknown, because forty items is too small a sample",
      ],
      reveal:
        "The second. Thirty of the forty were correctly resolved, and the dashboard was counting runs that ended without raising an error, which is a different quantity from work that was done. The gap between those two numbers is the exact size of the missing verification layer. Worth noticing that no component misbehaved: the model reported what it had produced, the queue recorded what it was told, and the dashboard summed it honestly.",
    },
    sections: [
      {
        title: "A check is something that can come back negative",
        paragraphs: [
          "The definition is unglamorous and it does all the work. A verification step reads the state of the world after an action and compares it against what the action was supposed to produce. It has two possible outcomes and one of them is failure. A step that cannot fail is decoration.",
          "Applied to the missing note, verification is one read. Fetch the invoice record and look for the note. The write had returned a conflict because another session held the record, so the read comes back empty, the check fails, and the item is parked with a reason instead of leaving the queue. Twelve lines of software, and the ninety-four percent becomes true.",
          "The reason this gets skipped is that it looks redundant, since the write already returned a status. What actually reaches the next step is the model's summary of that status, and lesson 2.1 established that a summary of a failed call and a summary of a successful one are produced by the same process. The read-back is the only step in the whole loop that consults the world instead of the transcript.",
        ],
      },
      {
        title: "Done is evidence",
        paragraphs: [
          "Adopting one phrase changes how these systems get specified. Completion is a record identifier, a document in a folder, a row with a timestamp, a message with a delivery receipt. Every one of those is something a person can point at six months later while an auditor watches.",
          "The reframing does its best work before any code exists. Asking what artifact will prove this item was handled forces an answer at design time, and when there is no answer the work was never a candidate for automation in the first place. Module eight turns that observation into a selection rule.",
          "It also repairs the dashboard. Counting artifacts that exist in the system of record produces a number a sample cannot contradict, and the sample stops being a source of unpleasant surprises in front of a board.",
        ],
      },
      {
        title: "Four categories of check",
        paragraphs: [
          "Most of what goes wrong is caught by four categories, listed here in the order they cost least to build. Shape means the output parses and carries the fields it is supposed to carry. Reference means every identifier in the output resolves to a real record. Consistency means the numbers in the output match the numbers in the source material. Effect means a read-back confirms the world changed.",
          "Consistency deserves emphasis, because it catches the failure with the worst consequences at the lowest price. A drafted message containing a numeral that appears nowhere in the fetched records is the signature of invention, and comparing every numeral in the draft against the source data catches it before anything leaves the building. Both sides are already in hand, so the check is close to free.",
          "Effect is the one most often missing, and it is the one that turns a completion rate into a measurement. The first three inspect the output. Only the read-back inspects the world.",
        ],
        example: {
          title: "The four checks on the running case",
          body: `The shape check confirms the draft parses and carries a recipient, a subject and a body. The reference check confirms invoice ${CASE.invoice} and PO ${CASE.po} both resolve to real records. The consistency check confirms every numeral in the draft appears in the fetched invoice or receiving data, which is what makes ${CASE.amount} sourced and an invented figure catchable. The effect check reads the invoice record after the note posts and either finds the note or fails.`,
        },
      },
      {
        title: "Where the checks sit",
        paragraphs: [
          "Position matters as much as existence. Shape, reference and consistency run on a proposed action before it executes, so a bad draft never reaches a recipient. Effect runs after execution, because it reads a world the action has already changed. Getting this backwards produces a system that verifies its external sends after sending them.",
          "A check that fails should end the run in a defined state, and it should not silently retry. The item goes to a named queue carrying the check that failed, the step it failed on, and the material that step was working from. That last part is what makes the failure diagnosable at all, and it is the subject of lesson 5.7.",
        ],
      },
    ],
    misconception: {
      says: "It reported success, and the run completed without errors.",
      why: "Those are the same sentence twice. The report of success is text produced by the same process that produces the work, and lesson 2.2 established that its confidence carries no information about whether the write landed. Completing without errors means no exception was raised inside the run, which a failed write returning a status code the model then summarised will satisfy comfortably. The only statement worth acting on is a read of the record.",
    },
    widget: {
      kind: "trace",
      mode: "steps",
      dataset: "declared-done",
      caption:
        "The same run twice, with and without a read-back after the write. One version ends with the item marked complete and no note on the record.",
    },
    instrument: {
      name: "The done specification",
      body: "Written before any build begins, one entry per action the system can take.",
      items: [
        "The action, named.",
        "The artifact that proves it happened, named as a record or a document.",
        "The read that fetches that artifact.",
        "What happens when the read comes back empty.",
        "Who sees the item when the check fails, and in which queue.",
      ],
    },
    soWhat:
      "You can take any reported completion rate and ask what was counted to produce it, and you can specify the read-back that makes the number mean what the person quoting it believes it means.",
    checks: [
      {
        q: "A run posts a note, the write fails on a lock conflict, and the model reports success. Which subsystem was missing?",
        options: [
          {
            text: "Instructions, which should have told it to check.",
            feedback:
              "An instruction to check is still a claim about a check. The check has to be software with the power to end the run differently.",
            impliesMissing: "A-VERIFY",
          },
          {
            text: "Verification, meaning a read of the record that could have come back empty.",
            correct: true,
            feedback:
              "Correct. The read is the only step that consults the world instead of the transcript.",
          },
          {
            text: "Scope, which should have blocked the write.",
            feedback:
              "The write was in scope and correct to attempt. It simply did not land, and nothing looked.",
            impliesMissing: "A-VERIFY",
          },
        ],
      },
      {
        q: "What makes a completion rate trustworthy?",
        options: [
          {
            text: "It is computed automatically from the system's own logs.",
            feedback:
              "Automatic computation of the wrong quantity produces the wrong quantity faster.",
            impliesMissing: "A-EVIDENCE-OF-DONE",
          },
          {
            text: "It counts artifacts that exist in the system of record, so a sample cannot contradict it.",
            correct: true,
            feedback:
              "Correct, and it is the version that survives an audit rather than triggering one.",
          },
          {
            text: "It is measured over a large enough sample.",
            feedback:
              "Sample size addresses noise. It does nothing about counting the wrong thing precisely.",
            impliesMissing: "A-EVIDENCE-OF-DONE",
          },
        ],
      },
      {
        q: "Which check catches an invented figure in a drafted message?",
        options: [
          {
            text: "The shape check, since the draft would be malformed.",
            feedback:
              "An invented figure parses perfectly and sits in the right field. Shape checks find nothing here.",
            impliesMissing: "A-VERIFY",
          },
          {
            text: "The consistency check, comparing every numeral in the draft against the fetched source data.",
            correct: true,
            feedback:
              "Correct, and it is close to free, since both sides are already in hand.",
          },
          {
            text: "The effect check, once the message has been sent.",
            feedback:
              "Too late by design. An external send is the one action where afterwards is the wrong time to find out.",
            impliesMissing: "A-EVIDENCE-OF-DONE",
          },
        ],
      },
    ],
    next: "scope",
    relatedUseCases: ["ap-invoice-exceptions", "bank-rec-exceptions"],
  },

  {
    slug: "scope",
    order: 36,
    n: "5.6",
    module: "M5",
    kind: "lesson",
    minutes: 22,
    title: "What is it allowed to touch?",
    blurb:
      "Overreach and undercompletion look like opposite failures. They come from the same missing thing, and the fix is a boundary software can read.",
    thesis:
      "Scope is a machine-readable boundary on what a system may act upon, and because the boundary lives in tool arguments instead of in prose, one missing boundary produces both doing too much and doing too little.",
    lede:
      "A run cancels a duplicate payment, tells the vendor, opens a task for the controller, and updates the vendor's payment terms. Three of those were wanted. The fourth was a commercial decision belonging to procurement, and it happened because the tool the system held could write any field on the vendor record. Nothing malfunctioned. The boundary was described in the instructions and enforced nowhere.",
    youWill: [
      "Explain why overreach and undercompletion share a cause.",
      "Narrow a tool's arguments instead of removing the tool.",
      "Read a tool list as a statement of what a system may do to the business.",
    ],
    atoms: ["A-SCOPE", "A-OVERREACH"],
    prereqs: ["A-FIVESUBSYSTEMS", "A-CAPS"],
    ceiling:
      "Scope as an argument-level boundary, and the shared cause of the two failure shapes. Permission architecture, identity and egress are module six; this is the subsystem rather than the security model.",
    situation: {
      artifact:
        "A tool list for an AP agent. It includes update_vendor(vendor, field, value), described in the system prompt as being for correcting contact details only.",
      prompt: "What can this system do to a vendor record?",
      options: [
        "Correct contact details, as described",
        "Whatever the prompt permits, since the model follows its instructions",
        "Write any field, including banking details",
        "Nothing, until a person approves it",
      ],
      reveal:
        "The third. The description is a sentence sitting in the context, and the argument accepts a field name, so the argument is the boundary. Banking details are a field. Payment terms are a field. The distance between what the prompt says and what the tool permits is the whole of the exposure, and it is visible in the tool list without running anything at all.",
    },
    sections: [
      {
        title: "The boundary lives in the argument",
        paragraphs: [
          "A tool has a name, a set of arguments and the code behind it. What a system can do is the union of what those arguments accept, and no sentence anywhere in the context changes that. Lesson 4.2 made the same point about tools in general; it lands hardest here, because the consequence gets measured in what can be written to a live record.",
          "This is why narrowing an argument usually beats removing a tool. Removing update_vendor takes away the legitimate corrections that were working. Replacing it with a version whose field argument accepts only contact, address and notes leaves those intact and makes the payment-terms write impossible to express. The refusal happens in the tool, before the proposal reaches anything, and it holds whether or not the model has attended to the instruction.",
          "The general form is worth stating plainly. Every boundary that matters should be expressible as a check on an argument, and any boundary existing only as a sentence should be assumed absent. A reviewer can apply this to a tool list in ten minutes, and those are among the highest-yield ten minutes available in a technical review.",
        ],
      },
      {
        title: "The other half of the same failure",
        paragraphs: [
          "Undercompletion is the less discussed shape and the more common one. The system does part of the work and stops, or handles the easy variant and escalates everything else, and the queue stays full while the dashboard shows plenty of activity. Teams read this as timidity and respond by loosening the instructions, which produces overreach a month later.",
          "Both shapes come from the absence of a stated boundary. When nothing says where the work ends, the system has to infer the edge from the item in front of it, and inference at an unmarked edge goes both ways. The correction runs in both directions at once. State the boundary as a set of allowed actions with allowed arguments, then state what falls outside it and where those items go.",
          "Written down, the boundary usually turns out to be short. Four actions, an amount ceiling, a list of item types, an escalation route. Teams routinely discover during that exercise that they had never agreed among themselves what the system was supposed to be allowed to do, which is the real reason it had never been written.",
        ],
      },
      {
        title: "Reading a tool list",
        paragraphs: [
          "In a review, the tool list answers a question documentation cannot. Take each tool, read its arguments, and write down the worst thing a correct-looking call could do. The exercise takes minutes and surfaces exposures no policy document mentions, because policy documents describe intent while argument signatures describe capability.",
          "Two patterns account for most of what turns up. A write tool with a free-text field parameter, which permits every field on the record. And a search or fetch tool with no entity constraint, which permits reading records belonging to a different customer, subsidiary or matter. Both look innocuous in a list, and both sit one well-formed call away from an incident.",
        ],
        example: {
          title: "The duplicate-payment run, bounded",
          body: "Swapping the broad write tool for one whose field argument accepts contact, address or notes leaves the cancellation, the vendor notification and the controller task working exactly as before. The payment-terms write is refused at the tool boundary, and the refusal is a logged event with a reason attached, so the queue owner learns that the system tried.",
        },
      },
    ],
    misconception: {
      says: "The prompt tells it not to change payment terms.",
      why: "The prompt is a sentence sitting in the same window as the invoice, the procedure and the conversation, competing for attention with all of it, which lesson 5.3 covered in detail. Even followed on ninety-nine calls in a hundred, the hundredth is a write to a live vendor record. A boundary in the tool signature is followed on every call by construction, and it stays followed after someone edits the prompt for an unrelated reason six months from now.",
    },
    widget: {
      kind: "permissions",
      mode: "scope",
      dataset: "scope",
      caption:
        "The duplicate-payment run with a broad write tool and with a narrowed one. Watch which of the five actions survive the change.",
    },
    instrument: {
      name: "The tool-list review",
      body: "One pass over the tool list, one line written per tool. No access to the source required.",
      items: [
        "The tool name and every argument it accepts.",
        "The worst outcome a well-formed call could produce.",
        "Whether that outcome is refused by the tool or only discouraged by the prompt.",
        "Whether the arguments constrain the entity, customer or matter.",
        "The narrower argument that would leave the legitimate uses intact.",
      ],
    },
    soWhat:
      "You can read a tool list as a statement of what a system is permitted to do to the business, and propose the narrowing that removes an exposure without removing the behavior people rely on.",
    checks: [
      {
        q: "A run makes an unauthorised but entirely coherent write. What is the first correction?",
        options: [
          {
            text: "Add a prohibition to the system prompt.",
            feedback:
              "A prohibition competes for attention with everything else in the window and is followed most of the time. Most of the time is the problem.",
            impliesMissing: "A-SCOPE",
          },
          {
            text: "Narrow the tool's arguments so the write cannot be expressed.",
            correct: true,
            feedback:
              "Correct, and it preserves the legitimate uses the broad tool was also serving.",
          },
          {
            text: "Remove the tool.",
            feedback:
              "Effective and blunt. It also removes the correct actions the tool was performing every day.",
            impliesMissing: "A-OVERREACH",
          },
        ],
      },
      {
        q: "A system handles the simple variant and escalates the rest, and the queue stays full. What is missing?",
        options: [
          {
            text: "Model capability, since the harder variant is beyond it.",
            feedback:
              "Sometimes. Check the boundary first, because the fix is far cheaper and the symptom is identical.",
            impliesMissing: "A-OVERREACH",
          },
          {
            text: "A stated boundary, so the edge of the work gets inferred from each item instead of specified once.",
            correct: true,
            feedback:
              "Correct, and it is the same absence that produces overreach in the other direction.",
          },
          {
            text: "Autonomy, which should be raised.",
            feedback:
              "Raising autonomy over an unstated boundary is exactly how undercompletion becomes overreach.",
            impliesMissing: "A-SCOPE",
          },
        ],
      },
      {
        q: "Which tool signature carries the larger exposure?",
        options: [
          {
            text: "post_note(invoice_id, text)",
            feedback:
              "Bounded to one record type and one field. Recoverable, and visible to anyone who opens the record.",
            impliesMissing: "A-SCOPE",
          },
          {
            text: "search_records(query), with no entity constraint",
            correct: true,
            feedback:
              "Correct. A free query with no entity boundary can return another customer's records, and every downstream step then treats them as the item in hand.",
          },
          {
            text: "cancel_payment(payment_id)",
            feedback:
              "Consequential and narrow. It acts on one identified payment and can act on nothing else.",
            impliesMissing: "A-SCOPE",
          },
        ],
      },
    ],
    next: "traces",
    relatedUseCases: ["ap-invoice-exceptions", "joiner-access-provisioning"],
  },

  {
    slug: "traces",
    order: 37,
    n: "5.7",
    module: "M5",
    kind: "lesson",
    minutes: 24,
    title: "What has to be in the record?",
    blurb:
      "A trace is a log, and it carries a log's duties. The standard is whether a run can be reconstructed months later by someone who was not there.",
    thesis:
      "A trace is an ordinary engineering log with ordinary duties, and the standard it has to meet is replay from stored bytes, meaning enough recorded per step that a person can reconstruct what happened without rerunning anything.",
    lede:
      "Three months after a run, a regulator, an auditor or a customer's counsel asks what happened on one particular item. The team opens the logs and finds a start time, an end time and a status of complete. Everything that would answer the question was in the window at the time and is gone. This is a solved problem in every other part of engineering, and the solution here is the same one.",
    youWill: [
      "State the replay standard and apply it to a sample trace.",
      "Name the six fields a step-level record needs.",
      "Say why traces are the substrate for both evaluation and incident response.",
      "Test a team's audit-trail claim with one question.",
    ],
    atoms: ["A-TRACE", "A-REPLAY"],
    prereqs: ["A-FIVESUBSYSTEMS", "A-VERIFY"],
    ceiling:
      "The standard and the fields. What gets built on top, meaning eval sets and incident reconstruction, arrives in modules seven and six; the point here is that neither is possible without this.",
    situation: {
      artifact:
        "A trace record for a completed run. It holds a run id, a start time, an end time, a status of complete, the model name, and a final summary paragraph written by the model.",
      prompt: "What can be established from this record?",
      options: [
        "What the system did, since the summary describes it",
        "That the run finished, and nothing about what it did",
        "Everything except the cost",
        "Enough to reproduce the run",
      ],
      reveal:
        "The second. The summary is text produced by the model, which lesson 2.1 established comes from the same process that produces every other sentence, so it is a claim about the run instead of a record of one. Status complete records that the loop exited. Neither survives contact with a question about a specific step, and both were written by the component under investigation.",
    },
    sections: [
      {
        title: "Replay from bytes",
        paragraphs: [
          "One sentence sets the bar. A person who was not present should be able to reconstruct the run from what was stored, without rerunning anything and without asking anyone. Rerunning is not reconstruction, because the rerun uses a different model version, different retrieved material and different upstream data, while the question was about what happened on the third of March.",
          "The bar is an ordinary one. Payment systems, trading systems and clinical systems have met it for decades, and a model in the loop makes it no harder to meet. What makes it commonly unmet is that the interesting state, the assembled context, lives in memory for the duration of a call and is discarded unless something writes it down.",
          "Storage is the objection usually raised, and it is worth pricing before accepting. A step record carrying full context runs to a few kilobytes. At the running case's volume that is a few gigabytes a year, which costs less than one reconstructed incident and far less than the eval set nobody can build without it.",
        ],
      },
      {
        title: "Six fields per step",
        paragraphs: [
          "The record belongs at the step, because the thing to be explained is always a step. Six fields cover it, and each answers a question that gets asked out loud during a real investigation.",
          "The last two are the ones most often skipped and the ones an investigation needs most. A tool result stored as the model's paraphrase of it cannot settle whether the tool returned the wrong data or the model misread good data, and those two failures call for entirely different fixes.",
        ],
        table: {
          head: ["Field", "The question it answers"],
          rows: [
            {
              label: "Context in",
              body: "What material was assembled for this step, stored as the text itself instead of a description of it. This is the field that makes reconstruction possible, and the field most often absent.",
            },
            {
              label: "Model and settings",
              body: "Which version, which sampling settings, which version of the system prompt. Behaviour moves with all three, so a comparison across time means nothing without them.",
            },
            {
              label: "Proposed action",
              body: "The tool call the model produced, with its arguments exactly as produced, including calls that were refused before executing.",
            },
            {
              label: "Gate decision",
              body: "Whether the call executed, was refused, or was held for approval, with the reason and, where a person was involved, who and when.",
            },
            {
              label: "Raw result",
              body: "What the tool returned, in the tool's own bytes. Storing a summary here loses the distinction between a bad result and a bad reading of a good one.",
            },
            {
              label: "Check outcomes",
              body: "Which checks ran, what each returned, and whether the step ended on a check or on a claim. Tokens, cost and elapsed time belong here too: free to record now, expensive to reconstruct later.",
            },
          ],
        },
        example: {
          title: "The record for one step",
          body: `Step two of the running case, stored properly, holds the 1,520 tokens of context assembled for it, the pinned model version, the proposed call to the receiving system for PO ${CASE.po}, the gate's decision to execute and why, the raw response of found false, and the checks that ran on it. Six fields, a few kilobytes, and three months later it answers every question anyone asks about that step.`,
        },
      },
      {
        title: "What traces make possible",
        paragraphs: [
          "Two capabilities rest on this, and both tend to be discovered missing at the worst possible moment. Evaluation, which is module seven, needs a set of real runs with known correct outcomes, and the only source of real runs is the trace store. A team without traces cannot build an eval set from its own history and has to start collecting today, which pushes any credible measurement several months into the future.",
          "Incident response is the other. When something goes wrong in a way that reaches a customer, the questions asked are which step, on what material, under which policy, and who approved it. A trace store answers all four in an afternoon. Its absence turns an incident into an open-ended investigation with no closing date, and that is the version that damages a business.",
          "There is a diligence consequence here, and it is among the sharpest available. Ask to see a trace for a specific item from three months ago. The answer arrives in minutes or it does not arrive, and which of those happens says more about operational maturity than any architecture diagram in the data room.",
        ],
      },
    ],
    misconception: {
      says: "We log everything. There is a full audit trail.",
      why: "Almost every team says this, and almost every team means run-level logs, which hold an identifier, a timestamp, a status and a summary. One question separates the two. Pick an item from three months ago and ask what material was in the context at step three. A store that can answer is a trace store; a store that cannot is a status log wearing an audit trail's name.",
    },
    widget: {
      kind: "trace",
      mode: "steps",
      dataset: "full-trace",
      caption:
        "A complete step-level record for the running case. Every field, at every step, with tokens, cost and elapsed time.",
    },
    instrument: {
      name: "The replay request",
      body: "One request, made of any team claiming an audit trail. It takes them minutes or it takes them weeks.",
      items: [
        "Name one item handled three months ago.",
        "Ask what was in the context at step three, in the stored text.",
        "Ask which model version and settings ran that step.",
        "Ask which proposed calls were refused, and on what ground.",
        "Ask what the tool returned, in the tool's own bytes.",
        "Ask which checks ran and what each one returned.",
      ],
    },
    soWhat:
      "You can tell an audit trail from a status log with one question, and say what a team's answer implies about their ability to measure anything or explain anything.",
    checks: [
      {
        q: "Why is rerunning an item a poor substitute for a stored trace?",
        options: [
          {
            text: "Reruns cost money.",
            feedback:
              "A few cents. Cost was never the obstacle to this particular substitute.",
            impliesMissing: "A-REPLAY",
          },
          {
            text: "A rerun uses today's model, today's retrieved material and today's upstream data, so it answers a different question.",
            correct: true,
            feedback:
              "Correct. The question was about a specific run on a specific day, and only the stored bytes answer it.",
          },
          {
            text: "Reruns are not permitted against production systems.",
            feedback:
              "Usually they are, against a copy. Permission is not the reason the substitute fails.",
            impliesMissing: "A-REPLAY",
          },
        ],
      },
      {
        q: "A trace stores the model's paraphrase of each tool result instead of the raw response. What can no longer be established?",
        options: [
          {
            text: "The cost of the run.",
            feedback:
              "Cost is a separate field and is unaffected by how results are stored.",
            impliesMissing: "A-TRACE",
          },
          {
            text: "Whether the tool returned wrong data or the model misread correct data.",
            correct: true,
            feedback:
              "Correct, and those two failures have different fixes, so the distinction decides what the team does next.",
          },
          {
            text: "The order of the steps.",
            feedback:
              "Order survives paraphrase. What is lost is the content of each result.",
            impliesMissing: "A-TRACE",
          },
        ],
      },
      {
        q: "A team says they have a full audit trail. What single question tests the claim?",
        options: [
          {
            text: "How long are the logs retained?",
            feedback:
              "Retention of the wrong fields for seven years is still the wrong fields.",
            impliesMissing: "A-REPLAY",
          },
          {
            text: "For an item from three months ago, what material was in the context at step three?",
            correct: true,
            feedback:
              "Correct. Only a step-level store can answer, and the answer arrives in minutes or it does not arrive.",
          },
          {
            text: "Are the logs immutable?",
            feedback:
              "A good property, and a property of a record that has to exist before immutability means anything.",
            impliesMissing: "A-TRACE",
          },
        ],
      },
    ],
    next: "guardrails",
    relatedUseCases: ["audit-evidence-requests", "ap-invoice-exceptions"],
  },
];
