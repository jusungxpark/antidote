import type { LearnLesson } from "./learn-types";
import { CASE } from "./learn-case";

export const M4_LESSONS: LearnLesson[] = [
  {
    slug: "text-that-acts",
    order: 23,
    n: "4.1",
    module: "M4",
    kind: "lesson",
    minutes: 22,
    title: "How can a thing that only writes text do anything?",
    blurb:
      "The model emits text that names an action. Software decides whether to run it. Nothing about the model changed; the loop around it did.",
    thesis:
      "A tool call is ordinary generated text that software has agreed to interpret as a request to run a function, so the model proposes and software executes, and that single separation is the whole of what changed between 2022 and now.",
    lede:
      "This is the pivot of the course. Everything in the first three modules describes a system that produces text, and text has no effect on the world. What arrived in 2023 and became reliable through 2024 was an agreement: certain outputs will be read as requests, and something else will decide whether to honour them. That agreement is why these systems now reach a queue, and it is also the entire security surface.",
    youWill: [
      "Describe a tool call as text plus an interpreter, with no mystique.",
      "Keep propose and execute in separate places, and say why that matters.",
      "Explain why the current wave reaches operations when the 2022 wave did not.",
      "Spot a design where propose and execute have been collapsed.",
    ],
    atoms: ["A-TOOLCALL", "A-PROPOSE-EXECUTE"],
    prereqs: ["A-NEXTTOKEN", "A-OPENCLOSED"],
    ceiling:
      "Text names an action; software decides. No protocol formats, no function-calling API detail. The conclusion is the propose/execute separation and that it is where every control lives.",
    situation: {
      artifact:
        "Two descriptions of the same system. First: the agent connects to our ERP and posts the resolution. Second: the model emits a structured request naming post_ap_note with three arguments; our service validates the arguments, checks the caller's permission, and calls the ERP.",
      prompt: "How do these differ?",
      options: [
        "The second is the first with implementation detail added",
        "They describe different architectures",
        "The second names a place where something can refuse; the first does not",
        "The first is a summary suitable for executives",
      ],
      reveal:
        "The third, and it matters more than it sounds. Both may describe identical software. The difference is that the second sentence identifies a component sitting between intention and effect that can say no, and every control in module six installs itself at exactly that point. A vendor who describes their system only in the first form may still have that component. They may also not, and the sentence gives you no way to tell.",
    },
    sections: [
      {
        title: "What actually happens",
        paragraphs: [
          "The application tells the model, in its context, that certain functions exist: their names, what arguments they take, and roughly what they do. That description is more tokens in the window, as lesson 2.4 established.",
          "When the model decides a function would help, it produces output in an agreed shape naming that function and supplying arguments. That output gets generated the same way as every other token, by the loop from 1.4. The application then parses it. If it is well-formed, if the function is one this caller may use, and if the arguments pass validation, the application calls the function and puts the result back into the context. The model continues with the result available.",
          "Nothing in this description requires the model to hold any capability it lacked in 2022. What changed is that models became reliable enough at producing the agreed shape, and that the surrounding software got built. Four moves, in order: the application declares what exists, the model proposes a call, software decides whether it happens, and the result returns to the context. The third move is where refusal lives.",
        ],
      },
      {
        title: "Why this changed everything and nothing",
        paragraphs: [
          "Nothing changed, in that the model does exactly what it did before: producing a distribution and sampling. A tool call is a plausible continuation that happens to be in a shape somebody agreed to interpret.",
          "Everything changed, in that the output now reaches systems. Before, a wrong answer was a wrong sentence a person read. Now a wrong answer can be a payment, an email to a customer, a record altered. The failure modes from module two are unchanged; the consequences have moved.",
          "This is also why the 2022 wave stopped at helpfulness and the current wave reaches queues. A model that can only answer needs a person to carry the answer somewhere. A model that can call software completes the loop, which is why the loop needs gates, and why the next three modules exist.",
        ],
      },
      {
        title: "Propose and execute stay in different places",
        paragraphs: [
          "The most important structural property of these systems is that the component producing intentions and the component carrying them out are separate, and only the second one holds authority.",
          "Keeping them separate buys everything. Permission checks happen at the boundary. Validation happens at the boundary. Rate limits, allowlists, human approval, logging and replay all install at the boundary. A design where the model's output flows directly into an execution path with no interposed decision has thrown away the place where all of that would have lived.",
          "This is worth asking about directly, in plain words: when the model asks for something, what code decides whether it happens? A good answer names a service, a validation step and a permission model. A vague answer usually means the boundary exists implicitly, in one function, with no policy, which is a design that works until the first unusual input.",
        ],
        example: {
          body: `For invoice ${CASE.invoice}, the model might propose post_ap_note with the invoice identifier, a note about the missing ${CASE.missing}, and a fee code. The proposal is text. What decides is a service that checks the identifier exists, that this caller may post notes, that the fee code is on the allowed list, and that this note has not already been posted. Four checks, all outside the model, all able to refuse.`,
        },
        list: [
          "The model proposes. It never executes.",
          "Every control you will meet in module six installs at the boundary between the two.",
          "Ask what code decides. A vague answer is itself the finding.",
          "A tool call is text, so everything in modules one and two applies to it unchanged.",
        ],
      },
    ],
    widget: {
      kind: "trace",
      mode: "steps",
      dataset: "invoice-4step",
      caption:
        "One invoice, four steps. The proposed call and the executed call appear as separate objects. Change an argument and watch the boundary refuse.",
    },
    instrument: {
      name: "The propose/execute separation test",
      body: "Three questions establishing whether a system has a boundary or merely a pipeline.",
      items: [
        "When the model asks for something, what code decides whether it happens?",
        "What can that code refuse, and what has it refused this month?",
        "Where are the refusals logged, and who reads them?",
        "Can the same request be issued twice, and what happens if it is?",
        "If the answer to any of these is a shrug, the boundary exists in name only.",
      ],
    },
    soWhat:
      "You can locate the single component that every control in this field attaches to, which means you can ask one question that tells you whether a system was designed to be governed or merely to work.",
    checks: [
      {
        q: "What is a tool call, mechanically?",
        options: [
          {
            text: "A special mode the model enters where it takes direct action.",
            feedback:
              "There is no separate mode and no direct action. The model produces tokens, exactly as always.",
            impliesMissing: "A-TOOLCALL",
          },
          {
            text: "Generated text in an agreed shape, which software then parses and may choose to act on.",
            correct: true,
            feedback:
              "Correct, and because it is generated text, everything from modules one and two applies to it, invention included.",
          },
          {
            text: "A permission the model is granted by an administrator.",
            feedback:
              "Permissions exist and live in the software that decides. The model is granted nothing; it asks.",
            impliesMissing: "A-PROPOSE-EXECUTE",
          },
        ],
      },
      {
        q: "Why does the current wave reach operating queues when the 2022 wave stopped at helpfulness?",
        options: [
          {
            text: "Because the models became much more accurate.",
            feedback:
              "Accuracy improved and would have produced a better assistant instead of a system that completes work.",
            impliesMissing: "A-TOOLCALL",
          },
          {
            text: "Because output can now reach software reliably, so the model can complete a loop instead of handing a person an answer to carry.",
            correct: true,
            feedback:
              "Correct, and it is why the consequences of a wrong answer changed category, which is what modules five and six respond to.",
          },
          {
            text: "Because context windows grew.",
            feedback:
              "A useful enabler for bigger packets, and it changes nothing about whether output reaches a system.",
            impliesMissing: "A-TOOLCALL",
          },
        ],
      },
      {
        q: "A team's design pipes the model's output straight into an execution function. What have they lost?",
        options: [
          {
            text: "Nothing, provided the model is reliable.",
            feedback:
              "Reliability is a rate, and the boundary exists for the residual, plus for every hostile input in module six.",
            impliesMissing: "A-PROPOSE-EXECUTE",
          },
          {
            text: "The place where validation, permission, rate limiting, approval and logging would have lived.",
            correct: true,
            feedback:
              "Correct. Those controls have nowhere to attach, and adding them later means restructuring instead of configuring.",
          },
          {
            text: "Performance, because a boundary adds latency.",
            feedback:
              "The latency is negligible, and it would be worth paying regardless.",
            impliesMissing: "A-PROPOSE-EXECUTE",
          },
        ],
      },
    ],
    next: "what-is-a-tool",
    relatedUseCases: ["ap-invoice-exceptions", "joiner-access-provisioning"],
  },

  {
    slug: "what-is-a-tool",
    order: 24,
    n: "4.2",
    module: "M4",
    kind: "lesson",
    minutes: 24,
    title: "What is a tool, exactly?",
    blurb:
      "A name, typed arguments, a permission and a result. APIs, command-line programs and MCP servers are three ways of shipping the same contract.",
    thesis:
      "A tool is a contract. a name, typed arguments, a permission, and a defined result. and the plumbing delivering it matters far less than the tool list itself, which is the document telling you what a system can actually do.",
    lede:
      "Vendor conversations spend disproportionate time on how tools are connected and almost none on which tools exist. That is backwards. The connection method is an engineering preference. The tool list is the outer boundary of everything the system can do to your business, and it fits on a page.",
    youWill: [
      "State the four parts of a tool contract.",
      "Explain what a plug standard provides and what it deliberately leaves to you.",
      "Say why a write that can safely run twice is worth insisting on.",
      "Ask for the one artifact that bounds a system's blast radius.",
    ],
    atoms: ["A-CONTRACT", "A-MCP", "A-IDEMPOTENT"],
    prereqs: ["A-TOOLCALL"],
    ceiling:
      "The contract's four parts, plugs as a standard, idempotency as run-twice safety. No transport details, no protocol internals, no schema-language specifics.",
    situation: {
      artifact:
        "A vendor security page: we support MCP, so integration is standardised and secure. Our connectors cover the major ERPs.",
      prompt: "What has that told you about what the system can do to your data?",
      options: [
        "That it is secure, since a standard is being followed",
        "That integration will be quick",
        "Almost nothing. the standard describes how tools are offered, and neither which ones nor to whom",
        "That it can read but not write",
      ],
      reveal:
        "Almost nothing. A plug standard specifies how a tool gets described and delivered. It says nothing about which tools this deployment exposes, what arguments they accept, who may call them, or what happens when one gets called twice. Those live in the tool list and the permission model, and neither appears on that page. The question that makes progress is short and never adversarial: can we see the tool list?",
    },
    sections: [
      {
        title: "The four parts",
        paragraphs: [
          "A name is what the tool is called, and what the model will emit when it proposes a call. Typed arguments are what it accepts, and in what shape, which is the first line of defence, because a validator can reject a malformed or out-of-range argument before anything runs. A permission says who may call it, in what circumstances, and the tool existing and this caller being allowed to use it are separate facts whose conflation is a recurring source of incidents. A result is what comes back, including what an error looks like, and a tool returning an ambiguous result on failure will produce a system that treats failures as successes, which is worse than one that crashes.",
          "Everything else is a delivery preference. A web API is a service call over the network with typed arguments and a defined response. A command-line program runs with arguments and returns output on standard out, useful for local work, inheriting whatever the shell can reach unless bounded. A plug standard is a common description format so a tool written once can be offered to many models. Same contract, differently packaged.",
        ],
      },
      {
        title: "What a plug standard does and does not solve",
        paragraphs: [
          "The contribution is real: a shared way to describe tools so that a tool written once can be offered to different models and applications without rewriting. That removes duplicated work, and it is why the standard spread quickly.",
          "What it deliberately leaves open is who may call what, under which identity, with what limits. Those are your decisions, and they have to be made somewhere in your deployment. A conversation treating the standard as a security answer has confused a description format with an authorisation model.",
          "One consequence follows directly and is worth stating. Connecting a server makes its tools available to the model, and available means proposable. Every tool on a connected server is inside the blast radius until something narrows it, which is a configuration decision people frequently make by omission.",
        ],
      },
      {
        title: "Writes that survive being run twice",
        paragraphs: [
          "Systems retry. Networks time out, calls fail midway, an agent loses track of whether a step completed. If a tool posting a note or a payment can run twice and produce two notes or two payments, retries become an incident source instead of a resilience mechanism.",
          "The property fixing this is idempotency: the same request, issued twice, produces the same end state as issuing it once. It is usually achieved by having the caller supply a key that the receiving system uses to recognize a repeat. Unglamorous, standard practice in payments and messaging, and worth asking about explicitly because agent systems retry far more than traditional integrations do.",
          "The related property is live validation. An argument referencing a record should be checked against the live system before the write, instead of trusted because it looks well-formed. Invoice 8813 is a perfectly well-formed identifier and may belong to a different vendor entirely.",
        ],
        example: {
          title: "The tool list for one queue",
          body: `A minimal list for the ${CASE.invoice} queue: get_invoice, get_purchase_order, get_receiving_record, search_correspondence, draft_email, post_ap_note, send_email. Seven tools. Three read, one searches, one drafts, one writes internally, one has an external effect. That last one is the entire external blast radius of the system, and it fits on one line.`,
        },
        list: [
          "Ask for the tool list before asking anything else about integration.",
          "For each tool: read, internal write, or external effect?",
          "For every write: can it run twice safely, and what key makes that true?",
          "For every argument referencing a record: is it validated against the live system?",
        ],
      },
    ],
    misconception: {
      says: "We speak MCP, so integration is handled.",
      why: "A plug standard describes how tools are offered. It leaves which tools, under whose identity, with what limits entirely to the deployment, and those three decide what the system can do to your business. Connecting a server exposes everything on it until something narrows the list.",
    },
    widget: {
      kind: "permissions",
      mode: "tools",
      dataset: "invoice-tools",
      caption:
        "The tool list for the invoice queue. Each row shows its arguments, its permission and its effect class. Toggle one and watch the blast radius change.",
    },
    instrument: {
      name: "The tool-list demand",
      body: "The single most informative artifact you can ask for. One page, and it bounds everything the system can do.",
      items: [
        "Ask for the complete tool list as configured in our deployment, and not the catalogue.",
        "Classify each tool: read, internal write, external effect, irreversible.",
        "For each write, ask what happens when it runs twice.",
        "For each tool, ask which identity it runs as. If the answer is one shared account, note it.",
        "Count the tools with external effects. That number is the honest answer to what could this do.",
      ],
    },
    soWhat:
      "You can ask for one page bounding a system's entire capability, and you can read it, which is a faster and more reliable form of diligence than any amount of discussion about architecture.",
    checks: [
      {
        q: "Which artifact tells you most about what an agent system could do to your business?",
        options: [
          {
            text: "The architecture diagram.",
            feedback:
              "Shows components and their arrangement. It rarely shows which specific actions are available.",
            impliesMissing: "A-CONTRACT",
          },
          {
            text: "The tool list as configured, with arguments, permissions and effect classes.",
            correct: true,
            feedback:
              "Correct. Short, concrete, and the outer boundary of everything the system can do.",
          },
          {
            text: "The security questionnaire response.",
            feedback:
              "Describes policy and practice. The tool list describes capability, which is what bounds an incident.",
            impliesMissing: "A-CONTRACT",
          },
        ],
      },
      {
        q: "Why does idempotency matter more for agent systems than for traditional integrations?",
        options: [
          {
            text: "Because agents are less reliable.",
            feedback:
              "Directionally true and imprecise. The mechanism is retry frequency instead of reliability in general.",
            impliesMissing: "A-IDEMPOTENT",
          },
          {
            text: "Because agents retry far more often, since a step may be reattempted after a timeout, a failure, or simple uncertainty about whether it completed.",
            correct: true,
            feedback:
              "Correct. Without idempotency, the retry mechanism making the system resilient becomes the mechanism that duplicates payments.",
          },
          {
            text: "Because agents run at higher volume.",
            feedback:
              "Volume amplifies the consequence and fails to create it. A low-volume agent with duplicating writes is still an incident waiting.",
            impliesMissing: "A-IDEMPOTENT",
          },
        ],
      },
      {
        q: "A team connects a plug-standard server exposing forty tools, and the agent needs three. What should happen?",
        options: [
          {
            text: "Nothing. the model will only use the three it needs.",
            feedback:
              "The model chooses among what is available, and everything available is proposable. Module six shows what a hostile input does with the other thirty-seven.",
            impliesMissing: "A-MCP",
          },
          {
            text: "Narrow the exposed list to the three, at the deployment, because everything connected is inside the blast radius.",
            correct: true,
            feedback:
              "Correct, and it is a configuration decision people frequently make by omission instead of by choice.",
          },
          {
            text: "Add an instruction telling the model to use only those three.",
            feedback:
              "An instruction shifts probabilities. A narrowed list gets enforced by software that can refuse.",
            impliesMissing: "A-PROPOSE-EXECUTE",
          },
        ],
      },
    ],
    next: "the-loop",
    relatedUseCases: ["vendor-coi-chase", "bank-rec-exceptions"],
  },

  {
    slug: "the-loop",
    order: 25,
    n: "4.3",
    module: "M4",
    kind: "lesson",
    minutes: 22,
    title: "What is an agent?",
    blurb:
      "A model, a set of tools, and a stop condition, in a loop. Nothing about a personality, a role or a headcount.",
    thesis:
      "An agent is the loop from lesson 1.4 wrapped in a second loop: the model proposes a tool call, software executes it, the result returns to the context, and the model runs again until a stop condition is met.",
    lede:
      "The word carries an enormous amount of imported meaning, most of it from science fiction and org charts, and almost none of it useful. The mechanical definition fits in a sentence, takes ten minutes to understand, and immediately explains why agents behave the way they do, including why they run up bills, why they declare success early, and why they need caps instead of encouragement.",
    youWill: [
      "Define an agent in one sentence, mechanically.",
      "Say what the stop condition is, and why it is a design decision.",
      "Distinguish a real loop from a single call in a conversational wrapper.",
      "Explain why the loop is where cost and risk both concentrate.",
    ],
    atoms: ["A-LOOP", "A-STOP"],
    prereqs: ["A-TOOLCALL", "A-CONTRACT"],
    ceiling:
      "The loop and its terminating conditions. No planning-architecture taxonomy, no framework comparison. Compounding gets its own lesson next.",
    situation: {
      artifact:
        "Three products, all described as agents. The first answers questions about your data and can look records up. The second takes an invoice and works through it, calling five or six tools, until it either resolves it or gives up. The third is a chat interface with a very good prompt.",
      prompt: "Which of these is a loop?",
      options: [
        "All three, since all are called agents",
        "The second only",
        "The first and second",
        "The second and third",
      ],
      reveal:
        "The second, clearly. The first may make one tool call per user turn, which is a call with a lookup and not a loop, because the person is the loop. The third makes none. Only the second continues on its own after the first result comes back, and that continuation creates every property discussed in this module: compounding error, unbounded cost, and the need for a stop condition someone designed.",
    },
    sections: [
      {
        title: "The loop",
        paragraphs: [
          "Start with a goal in the context. The model proposes a tool call. Software validates and executes it. The result gets appended to the context. The model runs again, now holding one more piece of information, and proposes the next call. Repeat until something stops it.",
          "That is the entire mechanism. Each iteration is one pass of the lesson 1.4 loop, with a growing context. Everything else, meaning planning, reflection and sub-tasks, is a pattern layered on top and implemented by putting different text into the context between iterations.",
          "Two things follow that people find surprising. Cost grows superlinearly with the number of steps, because each step re-reads a context that keeps growing, so step ten costs considerably more than step one. And the system holds no external sense of progress: whether it is converging or going in circles is visible only in what the context now contains.",
        ],
      },
      {
        title: "The stop condition is a design decision",
        paragraphs: [
          "Three honest ways for a loop to end. It produces the answer and the answer passes a check. It exhausts a budget of steps, wall-clock time, or money. Or it decides it cannot proceed and escalates, which should be a first-class outcome instead of a failure.",
          "That third one deserves emphasis, and lesson 4.4 develops it. A system that stops and says the receiving record could not be located, escalating, is behaving correctly. A system that keeps trying alternative approaches for forty minutes and eventually produces a confident answer assembled from adjacent material has failed, and it has failed in a way that looks like success.",
          "So the questions worth asking about any agent are short: what ends this, what is the cap, and what does it do when it cannot proceed? A system with no answer to the third question will produce its most dangerous output precisely in the cases where it should have stopped. Cost concentrates in this loop, because context grows with every step and every step pays for the whole context. Risk concentrates here too, for a different reason: a single call produces an answer a person reads, while a loop produces a sequence of actions, some with effects, and by the time anyone reads the output the effects have happened.",
        ],
      },
    ],
    misconception: {
      says: "We hired an AI analyst.",
      why: "The framing imports role, judgment and accountability, none of which the mechanism provides. What exists is a loop with a tool list and a stop condition, and treating it as a colleague leads to designs where nobody specified the cap, the escalation path, or who reviews what it did, because none of those questions get asked about a colleague.",
    },
    widget: {
      kind: "trace",
      mode: "single-vs-loop",
      dataset: "single-vs-loop",
      caption:
        "The same invoice as a single call and as a loop, side by side. Watch the context grow, the cost climb, and the two outcomes diverge at step four.",
    },
    instrument: {
      name: "The four-part agent test",
      body: "Applied to anything described as an agent. Four questions, and they separate products that share a word.",
      items: [
        "Is there a loop, or one call per human turn?",
        "What is the tool list, and how many entries have external effects?",
        "What ends the loop: an answer, a budget, or an escalation?",
        "What is the cap on steps, time and spend, and where is it enforced?",
        "What does it do when it cannot proceed, and where does that go?",
      ],
    },
    soWhat:
      "You can tell a real agent from a well-presented single call, and you can ask the three questions about stopping that most agent designs have never been asked.",
    checks: [
      {
        q: "What makes something an agent instead of an assistant with tools?",
        options: [
          {
            text: "It has a persona and a name.",
            feedback:
              "Presentation. Nothing about the mechanism changes when a system is given a name.",
            impliesMissing: "A-LOOP",
          },
          {
            text: "It continues on its own after a tool result returns, iterating until a stop condition, instead of waiting for a person each turn.",
            correct: true,
            feedback:
              "Correct. The person stops being the loop, which creates both the value and every property in this module.",
          },
          {
            text: "It can call more than one tool.",
            feedback:
              "A single call can propose several tools. The distinguishing feature is who drives the next iteration.",
            impliesMissing: "A-LOOP",
          },
        ],
      },
      {
        q: "Why does step ten cost more than step one?",
        options: [
          {
            text: "Because later steps are harder.",
            feedback:
              "Difficulty varies unpredictably. The cost increase is mechanical.",
            impliesMissing: "A-LOOP",
          },
          {
            text: "Because the context has grown with every prior result, and each step re-reads all of it.",
            correct: true,
            feedback:
              "Correct, and it is why compaction exists and why long runs need a budget instead of a step count alone.",
          },
          {
            text: "Because providers charge more for sustained use.",
            feedback:
              "Pricing is generally flat per token. The growth comes from the token count.",
            impliesMissing: "A-INFERSPEND",
          },
        ],
      },
      {
        q: "An agent cannot find a required record. What is the correct behavior?",
        options: [
          {
            text: "Try alternative approaches until it finds something usable.",
            feedback:
              "This is how a run produces a confident answer assembled from adjacent material, which is the most expensive failure available.",
            impliesMissing: "A-STOP",
          },
          {
            text: "Stop, state what was missing, and escalate, treating that as a successful outcome instead of a failure.",
            correct: true,
            feedback:
              "Correct. Escalation as a first-class outcome separates a system you can trust from one that always produces something.",
          },
          {
            text: "Return an empty result and let the caller decide.",
            feedback:
              "Better than inventing, and it loses the diagnosis. What was missing is the useful part of the message.",
            impliesMissing: "A-STOP",
          },
        ],
      },
    ],
    next: "long-runs",
    relatedUseCases: ["ap-invoice-exceptions", "detention-appointment-exceptions"],
  },

  {
    slug: "long-runs",
    order: 26,
    n: "4.4",
    module: "M4",
    kind: "lesson",
    minutes: 20,
    title: "Why do long runs go wrong?",
    blurb:
      "Each step's output is the next step's input, so error compounds. A 95% step is a 60% ten-step run, and no amount of ambition changes the arithmetic.",
    thesis:
      "Step accuracy multiplies across a run, so end-to-end success falls off a cliff as steps accumulate, and the responses that work are structural: fewer steps, caps, verification between steps, and parking on unknown.",
    lede:
      "One table in this lesson does more work than any argument. Ninety-five percent per step sounds excellent. Ten steps at ninety-five percent is a sixty percent run. Twenty steps is thirty-six percent. Print it, put it on a wall, and most of the unrealistic agent proposals in your organisation will stop arriving.",
    youWill: [
      "Compute end-to-end success from per-step accuracy, in your head.",
      "Explain why longer autonomous runs need higher per-step accuracy than intuition suggests.",
      "Name the four structural responses, and why encouragement is absent from the list.",
      "Treat parking on unknown as correct behavior instead of failure.",
    ],
    atoms: ["A-COMPOUNDING", "A-CAPS", "A-PARK"],
    prereqs: ["A-LOOP", "A-VARIANCE"],
    ceiling:
      "Multiplication of per-step success, and the four responses. Independence between steps is assumed and the assumption is named as optimistic. No probability theory.",
    situation: {
      artifact:
        "A proposal: a twelve-step agent that takes an exception from intake to resolution with no human touch. The team has measured each step individually at around 97% accuracy and considers the design ready.",
      prompt: "What is the honest end-to-end completion rate?",
      options: [
        "About 97%, since every step is accurate",
        "About 90%",
        "About 69%",
        "Impossible to estimate",
      ],
      reveal:
        "About 69%, and that is the optimistic figure, because it assumes the steps fail independently. In practice a wrong result early feeds the next step bad input, so failures cluster and the real number is usually worse. Three in ten items ending wrong, in a design everyone considered ready, and the arithmetic was available before anything was built.",
    },
    sections: [
      {
        title: "The arithmetic",
        paragraphs: [
          "If each step succeeds with probability p and the run needs every step to succeed, the run succeeds with probability p to the power of the number of steps. That is all. The consequences are unintuitive because human intuition treats accuracy as a property of a system instead of something that multiplies.",
          "One caveat runs against you. This assumes independence. Real runs correlate: a bad extraction at step two feeds bad input to steps three through twelve, so failures arrive in clusters and the true rate tends to be worse than the multiplication suggests.",
        ],
        table: {
          head: ["Per-step accuracy", "End-to-end completion"],
          rows: [
            {
              label: "99%",
              body: "5 steps: 95%. 10 steps: 90%. 20 steps: 82%. This is the territory where long autonomous runs become plausible.",
            },
            {
              label: "95%",
              body: "5 steps: 77%. 10 steps: 60%. 20 steps: 36%. Excellent in a demo, unusable end to end.",
            },
            {
              label: "90%",
              body: "5 steps: 59%. 10 steps: 35%. 20 steps: 12%. Perfectly good for a draft a person reviews.",
            },
          ],
        },
      },
      {
        title: "Four responses that work",
        paragraphs: [
          "Fewer steps is the most effective and least considered. Every step removed multiplies straight through, and steps existing because the design was drawn as a flowchart, instead of because the work requires them, are the cheapest thing to delete.",
          "Verification between steps comes next. If step three's output gets checked before step four consumes it, the chain breaks into shorter chains and the compounding restarts, which is why lesson 5.5 treats verification as a subsystem instead of a testing activity. Caps on steps, wall-clock time and spend, enforced outside the model, convert an unbounded failure into a bounded one, and a bounded failure can be escalated. A run with no caps can consume a surprising amount of money doing nothing useful.",
          "The fourth response is parking, and it deserves its own section, because it is the response teams most often treat as a defect.",
        ],
      },
      {
        title: "Parking on unknown",
        paragraphs: [
          "A system that cannot find a required record has two options: stop and say so, or continue and produce something. The second option is where the worst outcomes live, because the output arrives with the same confidence as a correct one and has already been acted on by the time anyone reads it.",
          "Designing for parking means three things. The escalation is a defined outcome with its own handling instead of an error. The message says what was missing instead of that something went wrong. And the metrics count parked items separately from failures, because a system that parks appropriately is working correctly, and a scoreboard scoring parking as failure will train the team to remove it.",
          "This connects forward to autonomy grading in module seven, where parked rate becomes one of the numbers deciding whether a step is ready for more independence.",
        ],
        example: {
          body: `The invoice ${CASE.invoice} run has seven steps. Two get validated against the ERP, which breaks the chain into three short segments. There is a cap of twelve iterations and four minutes. If the receiving record cannot be found after two attempts, the run parks with the message: no receiving record for PO ${CASE.po}; searched ERP and portal. That message is more useful than any answer it could have composed.`,
        },
        list: [
          "Count the steps before believing any end-to-end claim, then do the arithmetic.",
          "Delete steps that exist because of how the flowchart was drawn.",
          "Verify between steps; each check restarts the compounding.",
          "Cap steps, time and spend outside the model, and count parked items separately from failures.",
        ],
      },
    ],
    misconception: {
      says: "It just needs to be a bit more accurate and then we can run it end to end.",
      why: "A bit more accurate per step produces a large change end to end, usually in the wrong direction from the one people expect: going from 95% to 97% on twelve steps moves you from 54% to 69%, which is still one item in three landing wrong. The lever that works is fewer steps with checks between them, and not a better model.",
    },
    widget: {
      kind: "trace",
      mode: "compounding",
      dataset: "compounding",
      caption:
        "Set per-step accuracy and step count, and watch end-to-end success collapse. Then add a verification point and watch the chain break into shorter ones.",
    },
    instrument: {
      name: "The compounding table",
      body: "Print it once. It ends more unrealistic proposals than any argument you could make.",
      items: [
        "99% per step: 10 steps = 90%, 20 steps = 82%.",
        "95% per step: 10 steps = 60%, 20 steps = 36%.",
        "90% per step: 10 steps = 35%, 20 steps = 12%.",
        "These assume independent failures, which is optimistic; correlated failures make it worse.",
        "Every verification point restarts the multiplication. Every deleted step multiplies straight through.",
      ],
    },
    soWhat:
      "You can evaluate any end-to-end automation claim in ten seconds by counting steps, and you can propose the two changes that actually help instead of asking for a better model.",
    checks: [
      {
        q: "A team reports 97% per-step accuracy across twelve steps. What is the honest end-to-end number?",
        options: [
          {
            text: "About 97%, since that is the measured accuracy.",
            feedback:
              "Per-step accuracy multiplies. The end-to-end number is much lower and is the one that matters.",
            impliesMissing: "A-COMPOUNDING",
          },
          {
            text: "About 69%, and probably worse, because real failures correlate instead of occurring independently.",
            correct: true,
            feedback:
              "Correct on both counts, and the second clause is what makes the multiplication an optimistic estimate.",
          },
          {
            text: "About 85%, since some steps are more forgiving.",
            feedback:
              "Forgiveness would have to be designed in as verification. Absent that, the multiplication holds.",
            impliesMissing: "A-COMPOUNDING",
          },
        ],
      },
      {
        q: "Which intervention most improves an end-to-end rate?",
        options: [
          {
            text: "Upgrading to a stronger model.",
            feedback:
              "Moves per-step accuracy by a little and multiplies by a little. Useful and rarely decisive.",
            impliesMissing: "A-COMPOUNDING",
          },
          {
            text: "Removing steps, and verifying between the ones that remain so the chain breaks into shorter segments.",
            correct: true,
            feedback:
              "Correct. Both act on the exponent instead of the base, which is where the leverage is.",
          },
          {
            text: "Allowing more retries per step.",
            feedback:
              "Retries help where failures are transient and add cost where they are systematic. Neither shortens the chain.",
            impliesMissing: "A-CAPS",
          },
        ],
      },
      {
        q: "How should a scoreboard treat an item the agent parked?",
        options: [
          {
            text: "As a failure, since the work was not completed.",
            feedback:
              "This trains the team to remove parking, which converts visible incompletions into invisible wrong answers.",
            impliesMissing: "A-PARK",
          },
          {
            text: "As its own category, separate from both completions and errors, and tracked as a rate.",
            correct: true,
            feedback:
              "Correct. A parked item is the system working, and its rate is one of the inputs to autonomy grading later.",
          },
          {
            text: "As a completion, since the agent handed it over correctly.",
            feedback:
              "It cost a human touch, so counting it as a completion hides the real automation rate.",
            impliesMissing: "A-PARK",
          },
        ],
      },
    ],
    next: "six-shapes",
    relatedUseCases: ["claim-intake-missing-info", "prior-auth-packet-chase"],
  },
  {
    slug: "six-shapes",
    order: 27,
    n: "4.5",
    module: "M4",
    kind: "lesson",
    minutes: 22,
    title: "Six things get called automation. Which one owns a queue?",
    blurb:
      "Click automation, copilot, autopilot, workflow, chat and agent. Six products, six owners, and only two of them can be responsible for volume.",
    thesis:
      "Six distinct product shapes share the word automation, they differ in who initiates the work and who is accountable for finishing it, and only the shapes that own a queue can move a backlog.",
    lede:
      "This lesson exists because of a specific and very common failure. A business spends a year on adoption, measures licenses and satisfaction, and discovers the queue is exactly the length it was. Nothing went wrong technically. The wrong shape was bought for the stated goal, and the metric chosen could never have revealed it.",
    youWill: [
      "Tell the six shapes apart from how work starts and who finishes it.",
      "Say which shapes can own volume and which structurally cannot.",
      "Explain why a license count can never be a transformation metric.",
      "Ask the question that resolves any we automated X claim.",
    ],
    atoms: ["A-SIXSHAPES", "A-QUEUEOWNER"],
    prereqs: ["A-LOOP", "A-FOURJOBS"],
    ceiling:
      "Six shapes distinguished by initiation and accountability. No vendor-category mapping, no market taxonomy.",
    situation: {
      artifact:
        "A year-end summary: 68% of staff use the assistant weekly, satisfaction is 4.2 out of 5, and the team reports saving about forty minutes a day each. The shared inbox holds the same 900 items it held last January.",
      prompt: "What happened?",
      options: [
        "The savings are real but went into other work",
        "The tool is being used badly and needs training",
        "A shape that assists people was bought to solve a volume problem",
        "The 900 items are a separate issue",
      ],
      reveal:
        "The third, and the forty minutes are probably real. A copilot makes the people doing the work faster at doing it, and a faster person still has to touch every item. Queue length responds to something taking items off the queue without a person, which is a different shape entirely. Nothing here was executed badly; the wrong instrument was purchased for the stated goal, and license-and-satisfaction metrics could never have surfaced it.",
    },
    sections: [
      {
        title: "The six",
        paragraphs: [
          "The clarifying question for each is the same pair: who starts the work, and who is accountable for it being finished?",
          "Click automation repeats a recorded path through interfaces. It starts on a schedule or a trigger, finishes what it was recorded to do, and breaks when a button moves. A copilot sits beside a person doing the work: the person starts it, the person finishes, the person is accountable, and it makes them faster while never reducing the number of items a person touches. An autopilot takes items off a queue itself, within gates, and hands back the ones it cannot handle. A workflow is a designed path with defined steps and branches, which may call models at some steps. Chat waits for a question, making it a copilot with even less context, superb for exploration and hopeless for volume, because someone has to think of asking. An agent is a loop with tools, as defined in 4.3, and deployed against a queue with gates it becomes an autopilot, while deployed beside a person it becomes a copilot with more machinery.",
        ],
        table: {
          head: ["Shape", "Who starts it, who is accountable, what it can move"],
          rows: [
            {
              label: "Click automation",
              body: "Trigger starts it. Owns volume on stable paths. Breaks on interface change. Owner: whoever maintains the recording.",
            },
            {
              label: "Copilot",
              body: "A person starts and finishes. Makes them faster. Structurally unable to reduce items touched. Owner: the person.",
            },
            {
              label: "Autopilot",
              body: "The item's arrival starts it. Accountable for outcomes in scope, hands back the rest. Moves queue length. Owner: the queue owner.",
            },
            {
              label: "Workflow",
              body: "Trigger starts it, path is designed, ends deterministically. Excellent where the path is known. Owner: process owner.",
            },
            {
              label: "Chat",
              body: "A person's question starts it. Nothing happens unless somebody asks. Exploration, never volume.",
            },
            {
              label: "Agent",
              body: "A loop with tools. Becomes an autopilot or a copilot depending on where it is pointed and what gates it has.",
            },
          ],
        },
      },
      {
        title: "Why license counts fail as a metric",
        paragraphs: [
          "A license measures availability. Weekly active use measures habit. Satisfaction measures experience. All three can be excellent while the operational quantity you care about, meaning items in the queue, days to close, or cost per item, stays exactly where it was, because the shape being measured was never able to move it.",
          "This produces a specific organisational trap. The programme reports success on its own metrics, the operational leaders report no change on theirs, and the disagreement gets read as a communication problem. It is a shape problem, and naming it usually resolves the argument in one meeting.",
          "The metric that discriminates is the one the shape can move. For a copilot: minutes per item, and whether those minutes were redeployed or merely freed. For an autopilot: share of items completed without a human touch, and the error rate on those. If nobody can produce the second number, the deployment is a copilot whatever it is called.",
        ],
      },
      {
        title: "The question that resolves any claim",
        paragraphs: [
          "When someone says we automated accounts payable, one question settles it: after this shipped, how many items does a person still touch?",
          "An answer of all of them, but faster describes a copilot, which may be excellent value and should be measured on minutes. An answer of about a third describes an autopilot, and the follow-up is the error rate on the two thirds. An answer of I would have to check means nobody instrumented it, which is the actual finding of the meeting.",
        ],
      },
    ],
    misconception: {
      says: "We rolled out AI across the business. 68% weekly usage.",
      why: "Usage measures a shape that assists people, and assistance leaves the number of items a person touches unchanged by construction. The queue responds only to shapes that take items off it. The reported number can rise every quarter while the operational metric stays flat, and the two will be read as contradicting each other when they are simply measuring different objects.",
    },
    widget: {
      kind: "sorter",
      dataset: "six-shapes",
      caption:
        "Twelve deployments described as they were pitched. Sort them by shape, then read what each one could and could not have moved. Three are deliberately ambiguous.",
    },
    instrument: {
      name: "The who-owns-the-queue question",
      body: "One question and three follow-ups. It resolves most automation claims inside a single meeting.",
      items: [
        "After this shipped, how many items does a person still touch?",
        "If all of them: what is the minutes-per-item change, and did those minutes get redeployed?",
        "If fewer: what is the error rate on the ones no person touched, and who measured it?",
        "Who is accountable when an untouched item turns out to be wrong?",
        "Which single number on a dashboard would move if this stopped working tomorrow?",
      ],
    },
    soWhat:
      "You can diagnose the most common disappointment in this field, a successful adoption programme with an unchanged queue, before it happens, by checking whether the shape being bought can move the metric being promised.",
    checks: [
      {
        q: "A copilot rollout reports a 20% time saving per item. What can it not do?",
        options: [
          {
            text: "Improve quality.",
            feedback:
              "Copilots often improve quality. That is a real benefit of the shape.",
            impliesMissing: "A-SIXSHAPES",
          },
          {
            text: "Reduce the number of items a person has to touch, which is what changes queue length and headcount.",
            correct: true,
            feedback:
              "Correct. The shape requires a person per item by construction, so a queue-length promise was never available.",
          },
          {
            text: "Be worth the license cost.",
            feedback:
              "Frequently worth it. The problem is a mismatch between the shape and the promise, and not value.",
            impliesMissing: "A-QUEUEOWNER",
          },
        ],
      },
      {
        q: "Which shape is right when the path is fully known and every branch can be enumerated?",
        options: [
          {
            text: "An agent, because it can adapt.",
            feedback:
              "Adaptation is what you pay for with variance and cost. A known path needs neither.",
            impliesMissing: "A-SIXSHAPES",
          },
          {
            text: "A workflow, with models called at the specific steps involving language.",
            correct: true,
            feedback:
              "Correct, and lesson 4.6 makes this the default instead of the exception.",
          },
          {
            text: "A copilot, so a person stays in control.",
            feedback:
              "Control is worth having, and this buys it at the price of a person per item on a path needing no judgment.",
            impliesMissing: "A-QUEUEOWNER",
          },
        ],
      },
      {
        q: "Someone says we automated AP. What single question makes progress?",
        options: [
          {
            text: "Which model are you using?",
            feedback:
              "Irrelevant to the claim, which is about who does the work now.",
            impliesMissing: "A-QUEUEOWNER",
          },
          {
            text: "After this shipped, how many items does a person still touch?",
            correct: true,
            feedback:
              "Correct. Every answer, including I would have to check, tells you something specific and useful.",
          },
          {
            text: "What was the return on investment?",
            feedback:
              "Invites a constructed number. The touch count is observable and hard to dress up.",
            impliesMissing: "A-QUEUEOWNER",
          },
        ],
      },
    ],
    next: "workflow-or-agent",
    relatedUseCases: ["shared-inbox-triage", "ap-invoice-exceptions"],
  },

  {
    slug: "workflow-or-agent",
    order: 28,
    n: "4.6",
    module: "M4",
    kind: "lesson",
    minutes: 20,
    title: "Workflow or agent?",
    blurb:
      "When the path is known, a designed path beats a model choosing one. Agents earn their variance on the tail that cannot be enumerated.",
    thesis:
      "A workflow with models at the language steps outperforms an agent wherever the path can be written down, because letting a model choose the sequence buys flexibility you are not using and pays for it in variance, cost and unauditability.",
    lede:
      "The default has drifted the wrong way. Agents are the interesting object, so designs start there and workflows get treated as the legacy option. Reversing the default improves most systems: enumerate the path, use a workflow, and reserve the agent for the branch where enumeration fails. That branch is usually smaller than it looks and always more expensive than the rest.",
    youWill: [
      "Apply the path-known test to any process.",
      "Split one queue into its workflow portion and its agent portion.",
      "Say what you give up by choosing an agent where a workflow would do.",
    ],
    atoms: ["A-WORKFLOW-VS-AGENT"],
    prereqs: ["A-SIXSHAPES", "A-COMPOUNDING"],
    ceiling:
      "The decision and its consequences. No orchestration-framework comparison, no state-machine formalism.",
    situation: {
      artifact:
        "An AP exception queue with seven exception types. Six of them have a documented resolution path that has changed twice in three years. The seventh is described by the team as everything else, and accounts for about 12% of volume.",
      prompt: "How should this be built?",
      options: [
        "One agent that handles all seven, since it can learn the patterns",
        "Six workflows and one agent for the tail",
        "Seven workflows, with the seventh routing to a human",
        "One workflow with an agent step inside it",
      ],
      reveal:
        "The second, and the fourth is a reasonable variant. Six documented paths are six workflows, each cheap, fast, auditable and identical every time. The 12% tail is where enumeration fails and where an agent's flexibility earns its cost. Building one agent for all seven means paying agent prices and accepting agent variance on 88% of volume that had a written procedure, and losing the ability to explain what happened on those items.",
    },
    sections: [
      {
        title: "The path-known test",
        paragraphs: [
          "Ask whether a competent person could write the steps down in advance, including the branches, without knowing which specific item is coming. If yes, the path is known, and a designed path will beat a model choosing one on every axis that matters: cost, latency, consistency, auditability and testability.",
          "If no, meaning the next step depends on what the previous step turned up in ways that cannot be enumerated, then the flexibility of a loop is worth its price. That is a real category and it is where agents belong.",
          "Most operational work sits closer to the first case than teams expect, partly because writing the path down is unglamorous work nobody has done, and an agent appears to remove the need. It removes the writing and leaves the need: the procedure still exists, now implicitly, inside a system whose behavior you cannot enumerate.",
        ],
      },
      {
        title: "What an agent costs where a workflow would do",
        paragraphs: [
          "Variance, from lesson 1.6: the same item can take different routes on different days, which makes support conversations harder and makes any regression difficult to isolate. Cost, from 4.3: a loop re-reads a growing context, so a six-step agent costs considerably more than a six-step workflow calling a model twice. Compounding, from 4.4: an agent choosing its own steps has more steps and fewer natural verification points than a designed path with checks between stages.",
          "And auditability. A workflow can be described to a regulator or an auditor as a diagram with defined branches. An agent has to be described as a policy plus a trace, which is a harder conversation and a weaker position where a written procedure was available all along.",
        ],
      },
      {
        title: "The hybrid, which is usually the answer",
        paragraphs: [
          "The productive design is rarely one or the other. A workflow owns the spine of fetch, validate, classify and route, and calls a model at the steps involving language: reading an unstructured document, drafting a response, judging whether two descriptions refer to the same thing.",
          "That structure keeps the strengths of both. The path is designed, so it is cheap, consistent and explainable. The language steps use the capability that made this era possible. And the tail resisting enumeration gets routed to an agent or to a person, explicitly, as a named branch instead of a silent fallback.",
          "One practical benefit is worth naming. Because the tail is a named branch, its volume is measurable. A team routing 12% to the agent branch and watching that number rise to 30% has learned something important about their process, and a team running a single agent over everything has no way to notice.",
        ],
        example: {
          body: `Invoice ${CASE.invoice} sits in the missing-receipt type, which has a documented path: fetch the invoice and PO ${CASE.po}, check receiving, check the portal, draft a chase to ${CASE.buyer}, post a note, set a follow-up. That is a workflow with two model calls in it. The truly irregular items, such as a vendor disputing a three-year-old charge or an invoice referencing a purchase order from a merged entity, go to the agent branch, and their share is a number on the scoreboard.`,
        },
      },
    ],
    widget: {
      kind: "trace",
      mode: "steps",
      dataset: "workflow-vs-agent",
      caption:
        "The same exception through a designed path and through a loop. Compare steps, cost, variance across five runs, and what each one leaves behind for an auditor.",
    },
    instrument: {
      name: "The path-known test",
      body: "Twenty minutes with the person who does the work today. It usually reduces the agent scope by more than half.",
      items: [
        "Ask the person who does this to write the steps for the last ten items.",
        "Where the ten agree, you have a workflow. Write the branches down.",
        "Where they diverge unpredictably, you have the tail. Measure its share.",
        "Mark which steps involve reading or writing language. Those are the model calls.",
        "Route the tail explicitly, to an agent or a person, and put its share on the scoreboard.",
      ],
    },
    soWhat:
      "You can split a queue into the part wanting a cheap, auditable designed path and the part needing a loop, which typically moves 80% or more of volume onto the cheaper and more explainable option.",
    checks: [
      {
        q: "When does an agent beat a workflow?",
        options: [
          {
            text: "When the process is complicated.",
            feedback:
              "Complicated and unenumerable differ. A complicated process with documented branches is a workflow with many branches.",
            impliesMissing: "A-WORKFLOW-VS-AGENT",
          },
          {
            text: "When the next step depends on what the previous step found, in ways nobody can write down in advance.",
            correct: true,
            feedback:
              "Correct. That is the property the loop exists for, and it is worth its cost only where it holds.",
          },
          {
            text: "When the volume is high.",
            feedback:
              "High volume argues the other way, since it multiplies the per-item cost and variance penalty.",
            impliesMissing: "A-WORKFLOW-VS-AGENT",
          },
        ],
      },
      {
        q: "A hybrid routes 12% of volume to an agent branch. Six months later it is 30%. What does that mean?",
        options: [
          {
            text: "The agent is getting better, so more work is being sent to it.",
            feedback:
              "Routing is decided by the workflow, so agent capability had no way to influence the share.",
            impliesMissing: "A-WORKFLOW-VS-AGENT",
          },
          {
            text: "Something changed upstream. the input mix, a source system, or a process. and the named branch made it visible.",
            correct: true,
            feedback:
              "Correct, and the visibility is the point. A single agent over everything would have absorbed the change silently.",
          },
          {
            text: "The workflows need retraining.",
            feedback:
              "Workflows are designed and never trained. The finding is a change in the work, which is worth investigating.",
            impliesMissing: "A-SIXSHAPES",
          },
        ],
      },
    ],
    next: "second-agent",
    relatedUseCases: ["bank-rec-exceptions", "asn-invoice-po-recon"],
  },

  {
    slug: "second-agent",
    order: 29,
    n: "4.7",
    module: "M4",
    kind: "lesson",
    minutes: 20,
    title: "Is a second agent a control?",
    blurb:
      "Splitting propose from approve is a permission boundary. Where both hold the same tools, it is a costume with a higher bill.",
    thesis:
      "A checker agent adds control only when it holds different tools or different information from the proposer, because otherwise it is the same system reviewing itself with the same blind spots at twice the cost.",
    lede:
      "Multi-agent diagrams are persuasive. Boxes labelled planner, executor, critic and supervisor look like an organisation, and organisations have checks in them. The test for whether any of it is real takes two questions, and a surprising number of architectures fail both.",
    youWill: [
      "Apply the two-question test to any multi-agent design.",
      "Explain why a checker holding the send permission is no checker.",
      "Say when a real split earns its cost.",
      "Recognise an org chart drawn as an architecture.",
    ],
    atoms: ["A-MULTIAGENT", "A-CHECKER"],
    prereqs: ["A-LOOP", "A-PROPOSE-EXECUTE"],
    ceiling:
      "The two-question test and the permission argument. No coordination-protocol taxonomy, no consensus mechanisms.",
    situation: {
      artifact:
        "An architecture slide: a planner agent, a research agent, a drafting agent and a critic agent, all using the same model, all with access to the same tool list, coordinated by a supervisor agent.",
      prompt: "How many controls does that diagram contain?",
      options: [
        "Four. each agent checks the others",
        "One. the critic",
        "Zero",
        "Two. the critic and the supervisor",
      ],
      reveal:
        "Zero. Every box holds the same model, the same tools and the same information, so the critic shares every blind spot of the drafter and the supervisor can authorise anything any of them proposed. What the diagram contains is five times the cost and a persuasive picture. It becomes one control the moment the critic loses the send permission and gains a data source the drafter lacks.",
    },
    sections: [
      {
        title: "The two questions",
        paragraphs: [
          "Does the checker hold different tools from the proposer? If both can send, the split has produced no boundary, because whatever the second one concludes, the first one can act anyway, and in most implementations does.",
          "Does the checker hold different information? A critic given the same packet and the same model will tend to agree, because the errors arising from a missing fact are invisible to anyone looking at the same absence. A checker with access to the source system can compare a claim against a record, which is a different act.",
          "If both answers are no, the design is one agent with extra steps and extra cost. That is worth saying plainly, and it is usually received well, because the team drew the diagram to be legible instead of to deceive.",
        ],
      },
      {
        title: "What a real split looks like",
        paragraphs: [
          "The proposer can read, draft and propose. It holds no send permission and no write permission. The checker can read the source systems, run validators, and approve or reject, and it too holds no send permission. Execution belongs to a third component acting only on an approved proposal.",
          "Stated that way, the multi-agent framing becomes optional. What the design needs is a permission model, and it can be implemented with one model called twice with different tool lists, or with a deterministic validator in the checking position, which is usually better because it costs nothing and never agrees out of politeness.",
          "That is the reframing to carry out of this lesson. The question is rarely how many agents. It is what permissions exist and where the boundaries fall, and any diagram answering the second question well is fine however many boxes it has.",
        ],
      },
      {
        title: "When more agents help",
        paragraphs: [
          "Three cases justify the complexity. The first is separated tool sets, where one component may read customer data while another may write to the ledger, so a compromise of one gives no access to the other. The second is separated context, where a long task is split so each component holds a smaller and cleaner window, which helps for the reasons given in lesson 2.5. The third is real parallelism, meaning several independent subtasks that can run at once, where the coordination cost is repaid in wall-clock time.",
          "What rarely helps is role-playing. Naming a component the sceptical reviewer changes the prompt and changes nothing about what it can see or do, and the resulting review reads as thorough because reviews written in that register do.",
        ],
      },
    ],
    misconception: {
      says: "We have a critic agent that reviews everything before it goes out.",
      why: "A critic with the same model, the same tools and the same packet shares every blind spot of the thing it reviews, and a critic that can also send has no boundary to enforce. The design becomes a control when the reviewer holds different information and the send permission belongs to neither, and at that point a deterministic validator often does the job better and for nothing.",
    },
    widget: {
      kind: "permissions",
      mode: "checker",
      dataset: "checker",
      caption:
        "A drafter and a checker with configurable tool lists. Give the checker the send permission and watch the control disappear with no other change.",
    },
    instrument: {
      name: "The two-question multi-agent test",
      body: "Ask both of any multi-agent diagram. Two no answers means one agent with a higher bill.",
      items: [
        "Does the checker hold different tools from the proposer?",
        "Does the checker hold different information: a source system, a record, a validator?",
        "Who holds the send or write permission, and is it neither of them?",
        "Could a deterministic validator do the checking job instead, for free?",
        "What does each additional box cost per item, and what does it catch that the others miss?",
      ],
    },
    soWhat:
      "You can read a multi-agent architecture diagram in thirty seconds and say how many actual controls it contains, which is frequently fewer than the number of boxes and occasionally zero.",
    checks: [
      {
        q: "What makes a checker a real control?",
        options: [
          {
            text: "A prompt instructing it to be sceptical and thorough.",
            feedback:
              "Changes the register of the review and nothing about what it can see or refuse.",
            impliesMissing: "A-CHECKER",
          },
          {
            text: "Different information from the proposer, and no authority to execute what it approves.",
            correct: true,
            feedback:
              "Correct on both halves. Different information gives it something to catch; no execution authority gives the boundary force.",
          },
          {
            text: "Using a different model provider for the checker.",
            feedback:
              "Helps a little with correlated blind spots and leaves the same packet and the same permissions.",
            impliesMissing: "A-CHECKER",
          },
        ],
      },
      {
        q: "Which is the better checker for an extracted invoice amount?",
        options: [
          {
            text: "A second model asked to review the extraction.",
            feedback:
              "It sees the same document and shares the same blind spots. It also agrees more often than it should.",
            impliesMissing: "A-CHECKER",
          },
          {
            text: "A validator that fetches the amount from the ERP and compares.",
            correct: true,
            feedback:
              "Correct. Deterministic, free, immune to politeness, and holding information the extractor never saw.",
          },
          {
            text: "A supervisor agent that reviews both.",
            feedback:
              "A third box with the same view. Boxes are cheap; information and permissions are what matter.",
            impliesMissing: "A-MULTIAGENT",
          },
        ],
      },
      {
        q: "When does splitting into multiple components help?",
        options: [
          {
            text: "When the task is complex enough to warrant an organisational structure.",
            feedback:
              "Organisational metaphors are the source of the costume problem instead of a justification for it.",
            impliesMissing: "A-MULTIAGENT",
          },
          {
            text: "When the components need different tool permissions, need smaller separate contexts, or can run in parallel.",
            correct: true,
            feedback:
              "Correct. All three are mechanical reasons with measurable benefits, and none of them require the word agent.",
          },
          {
            text: "When one model keeps making mistakes.",
            feedback:
              "More copies of the same model make correlated mistakes. The fix is different information or a deterministic check.",
            impliesMissing: "A-CHECKER",
          },
        ],
      },
    ],
    next: "computer-use",
    relatedUseCases: ["audit-evidence-requests", "vendor-onboarding-packs"],
  },

  {
    slug: "computer-use",
    order: 30,
    n: "4.8",
    module: "M4",
    kind: "lesson",
    minutes: 20,
    title: "What about the ones that click?",
    blurb:
      "A model driving a screen. Useful where no interface exists, structurally fragile, and correctly treated as residual with a replacement date.",
    thesis:
      "Computer use puts a model in the loop of looking at a screen and acting on it, which unlocks systems offering no other way in, and which should be scheduled for replacement by a proper interface instead of treated as architecture.",
    lede:
      "The demos are the most impressive artifacts in this field, which is a warning instead of a recommendation. Driving a screen inherits every fragility of the interface it drives and adds the variance of a model on top, and the systems it gets pointed at are frequently the ones with the least tolerance for a wrong click.",
    youWill: [
      "Describe the mechanism in one sentence.",
      "Say why public benchmarks for it predict little about your portal.",
      "Name the four constraints that make it survivable.",
      "Treat every deployment as residual with a date attached.",
    ],
    atoms: ["A-COMPUTERUSE", "A-RESIDUAL-CLICKS"],
    prereqs: ["A-LOOP", "A-JAGGED"],
    ceiling:
      "Screenshot or page structure in, action out, repeat. Benchmarks named as weather instead of forecast. No vision-model detail.",
    situation: {
      artifact:
        "A carrier portal with no API. Today a clerk logs in twice a day, searches by reference, reads a status, and copies it into a spreadsheet. Roughly 300 lookups a week. A vendor proposes a screen-driving agent.",
      prompt: "What is the right response?",
      options: [
        "Reject it. screen automation is too fragile for production",
        "Accept it as the permanent solution, since no interface exists",
        "Accept it as residual, with constraints and a replacement date",
        "Ask the carrier for an API and do nothing until they provide one",
      ],
      reveal:
        "The third. The work is real, no interface exists, and 300 manual lookups a week is exactly the kind of grind worth removing. What makes it defensible is the framing: it is a bridge, it runs under constraints, its failures are visible, and there is a named date by which someone will have asked the carrier for a feed. Deployments skipping the last two parts become permanent fixtures that break quietly whenever the portal changes.",
    },
    sections: [
      {
        title: "The mechanism",
        paragraphs: [
          "The model receives a representation of the screen, being a screenshot, the page structure, or both, along with a goal. It emits an action: click at this position, type this text, scroll. Software performs the action, captures the new screen, and the loop repeats. It is lesson 4.3's loop with the tool list reduced to the actions a person could take with a mouse and a keyboard.",
          "Two consequences follow. Every step is a perception problem as well as a decision problem, so the error rate per step is higher than for a tool call against a defined interface, which matters a great deal given the compounding from 4.4. And the action space is enormous and mostly undesirable, since everything on the screen is clickable, including the buttons you would never want touched.",
        ],
      },
      {
        title: "Benchmarks here are weather",
        paragraphs: [
          "Public benchmarks for screen-driving agents measure performance on curated tasks against a set of well-known websites. They are useful for tracking whether the field is improving. They predict very little about your carrier portal, which was built in 2011, uses a session timeout nobody documented, and renders its status field differently for consignments over a certain weight.",
          "This is jaggedness from lesson 2.3 in its most acute form, because the surface is adversarially irregular. Treat a benchmark score as evidence that the general approach is progressing, and treat your own twenty-item test as the only evidence about your portal.",
        ],
      },
      {
        title: "The four constraints",
        paragraphs: [
          "Pin the starting point. The agent begins at a specific URL, in a specific session, instead of navigating from a search engine or a home page, and every step it saves is a step that cannot go wrong. Cap the steps hard, and lower than feels comfortable: a screen agent that has taken twenty actions on a lookup task is lost, and the cheapest outcome from that point is to stop.",
          "Keep payment and credential entry out of the action space entirely. Any flow involving a payment method, a password field or a multi-factor prompt is a flow for a person, and that holds however capable the system becomes, because the consequences are asymmetric. Make the failures visible: screenshots at each step, retained, and an escalation naming what screen it was on when it stopped. Without that, a screen agent's failures are unusually hard to diagnose, because nobody can see what it saw.",
        ],
        list: [
          "Pin the entry point; never navigate in from outside.",
          "Cap steps aggressively, then stop and escalate.",
          "Payments, passwords and multi-factor prompts stay with a person, permanently.",
          "Retain screenshots and the stopping screen, because otherwise nobody can diagnose anything.",
        ],
      },
      {
        title: "Residual, with a date",
        paragraphs: [
          "Every screen-driving deployment should be entered in a register with three columns: what it does, what would replace it, and by when someone will have asked. Usually the replacement is a feed, an export, or an interface the counterparty already has and has never been asked for.",
          "The register matters because these deployments are stable enough to be forgotten and fragile enough to fail at the worst moment. A portal redesign takes them down with no warning, and by then the clerk who used to do the lookups has moved on. Treating them as scheduled residual keeps them in someone's field of view.",
        ],
        example: {
          body: `If the vendor for invoice ${CASE.invoice} only exposes status through a portal, a screen agent can check it: pinned to the status page, capped at eight actions, screenshots retained, never touching the payment section. And the register entry reads: replace with the vendor's CSV export, request raised, review in one quarter.`,
        },
      },
    ],
    misconception: {
      says: "It can use a computer, so it can do anything a person can do at a desk.",
      why: "It can attempt anything a person can attempt, which is a different claim. Per-step error is higher than for a defined interface, the action space includes every wrong button on the screen, and the compounding arithmetic from 4.4 applies with a worse base. It earns its place where no interface exists, under constraints, with a replacement scheduled.",
    },
    widget: {
      kind: "trace",
      mode: "screen",
      dataset: "portal-run",
      caption:
        "A recorded ten-step portal lookup with two failures visible. Step through it, then apply the four constraints and watch where the run stops instead.",
    },
    instrument: {
      name: "The residual register",
      body: "One row per screen-driving deployment. Reviewed quarterly, by a named person.",
      items: [
        "What does this do, and how many times a week?",
        "Which system does it drive, and who owns the relationship with that counterparty?",
        "What would replace it: a feed, an export, an interface?",
        "Has that been asked for? On what date, and by whom?",
        "What are the caps, and where do the screenshots go?",
        "Review date. If it passes twice with no progress, escalate the request instead of the automation.",
      ],
    },
    soWhat:
      "You can approve a screen-driving deployment for the right reasons and with the right conditions, instead of either rejecting a useful bridge or letting a fragile one become permanent infrastructure.",
    checks: [
      {
        q: "Why is per-step error higher for screen driving than for calling a defined interface?",
        options: [
          {
            text: "Because the models are weaker at vision tasks.",
            feedback:
              "Partly, and the structural reason is broader: each step involves perceiving an irregular surface as well as deciding.",
            impliesMissing: "A-COMPUTERUSE",
          },
          {
            text: "Because each step requires perceiving the screen correctly as well as choosing correctly, and the action space includes everything clickable.",
            correct: true,
            feedback:
              "Correct, and with compounding from 4.4 a higher per-step error over ten steps is a very different end-to-end number.",
          },
          {
            text: "Because screens change frequently.",
            feedback:
              "A real fragility affecting reliability over time instead of error within a single run.",
            impliesMissing: "A-COMPUTERUSE",
          },
        ],
      },
      {
        q: "Which flow should stay with a person permanently?",
        options: [
          {
            text: "Looking up a consignment status.",
            feedback:
              "Read-only, repetitive, low consequence. A good candidate under constraints.",
            impliesMissing: "A-COMPUTERUSE",
          },
          {
            text: "Anything involving a payment method, a password field or a multi-factor prompt.",
            correct: true,
            feedback:
              "Correct, and it holds however capable the system becomes, because the consequences are asymmetric and irreversible.",
          },
          {
            text: "Downloading a report.",
            feedback:
              "Usually fine, and better still, a report that can be downloaded can usually be scheduled as an export.",
            impliesMissing: "A-RESIDUAL-CLICKS",
          },
        ],
      },
      {
        q: "What belongs in the register alongside a screen-driving deployment?",
        options: [
          {
            text: "Its accuracy rate.",
            feedback:
              "Worth tracking, and it belongs on the scoreboard. The register exists for a different purpose.",
            impliesMissing: "A-RESIDUAL-CLICKS",
          },
          {
            text: "What would replace it, whether that has been requested, and the date of the next review.",
            correct: true,
            feedback:
              "Correct. Without a replacement path these deployments become permanent by default and fail silently at the worst moment.",
          },
          {
            text: "The name of the vendor who built it.",
            feedback:
              "Useful administratively, and it does nothing to prevent the failure mode this register exists for.",
            impliesMissing: "A-RESIDUAL-CLICKS",
          },
        ],
      },
    ],
    next: "same-model-different-outcome",
    relatedUseCases: ["detention-appointment-exceptions", "customs-entry-document-packs"],
  },
];
