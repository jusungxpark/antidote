import type { LearnLesson } from "./learn-types";
import { CASE } from "./learn-case";

export const M3_LESSONS: LearnLesson[] = [
  {
    slug: "pretraining",
    order: 16,
    n: "3.1",
    module: "M3",
    kind: "lesson",
    minutes: 22,
    title: "Where does the capability come from?",
    blurb:
      "Pretraining is a very large, very expensive, one-time compression of a corpus into weights. It is the wall you buy, and you will not be building one.",
    thesis:
      "Almost all of what a model can do was fixed during pretraining, an enormous one-off run producing a frozen artifact, and everything a company does afterwards is a thin layer on top of a wall somebody else paid for.",
    lede:
      "Separating what was baked from what gets spent is the move that makes the rest of this module possible. Once the split is clear, custom model, fine-tuning, cheaper model and open source stop being one undifferentiated fog and become four distinct questions with four different answers.",
    youWill: [
      "Describe pretraining in one paragraph without reaching for architecture.",
      "Split the frozen artifact from every layer built on top of it.",
      "Say why training your own from scratch is off the table for almost everyone.",
      "Recognise a claim about a proprietary model, and know what would prove it.",
    ],
    atoms: ["A-PRETRAIN", "A-TRAINVSINFER"],
    prereqs: ["A-NEXTTOKEN"],
    ceiling:
      "Predict-the-next-token at scale over a broad corpus, producing a frozen artifact, at a cost measured in tens or hundreds of millions. No loss curves, no optimizers, no parameter counts used as a quality proxy, no scaling-law discussion.",
    situation: {
      artifact:
        "A pitch: we have built a proprietary AI model trained on twenty years of industry data, which is why it understands this sector in a way general models cannot.",
      prompt: "What is the cheapest thing that sentence could describe?",
      options: [
        "A model trained from scratch on their data",
        "An existing model with their documents indexed and retrieved at question time",
        "An existing model with a small adapter trained on their examples",
        "A carefully written prompt with sector vocabulary in it",
      ],
      reveal:
        "The last, and it takes an afternoon. The sentence is compatible with all four, which is what makes it useful to the person saying it. The four differ by roughly four orders of magnitude in cost and by everything in defensibility. This lesson and the next two give you the questions that separate them, and lesson 3.3 turns those questions into an instrument.",
    },
    sections: [
      {
        title: "What pretraining actually is",
        paragraphs: [
          "Take an enormous quantity of text. Repeatedly hide the next token and adjust the model's parameters so that its prediction gets closer to the token that was actually there. Do that across a corpus large enough that the process has to encode grammar, facts, argument structure, the conventions of dozens of professions, and the shape of ordinary reasoning in order to keep improving. Stop when the budget runs out.",
          "What comes out is a fixed set of numbers: the weights. From that moment the artifact is frozen. It performs no further learning, retains nothing from conversations, and behaves identically in January and July unless somebody replaces it.",
          "The scale is the part worth internalising, because it settles a strategic question quickly. Frontier pretraining runs cost in the tens to hundreds of millions of dollars, require specialised hardware in quantities contracted years ahead, and demand a research team that a handful of organisations employ. This is a wall that gets bought instead of built, and treating it that way is the correct starting position for essentially every operating business.",
          "Two separate acts are now in view. Training is where capability gets created, once, at enormous cost, by someone else. Inference is where capability gets spent, per call, by you, at a price measured in tokens. Almost every confusion in this area comes from collapsing them. Making the model cheaper usually means spending less at inference and changing nothing about the training. Making it better at your task usually means changing what you send at inference and leaving the weights alone. Our model is faster now is an inference claim. Our model understands pharmaceutical contracts could belong to either act, and asking which is the first question that produces information.",
        ],
      },
      {
        title: "What a proprietary model claim would have to show",
        paragraphs: [
          "A company that pretrained a model can demonstrate it easily, because the evidence is unmistakable: a compute contract, a training-run duration, a dataset description, a research team, a model card with parameter counts and evaluation results. Those artifacts exist as a matter of course for anyone who has done it.",
          "A company that did something cheaper will describe capability instead of provenance, and will move quickly to results. That is a reasonable thing to do, since the cheaper options are often the right engineering choice, and it becomes a problem only when the pricing and the defensibility story assume the expensive one.",
          "So the diligence question is short and unaggressive: which part is yours? Nearly every good answer is some version of we use a frontier model and our value is in the harness, the data access and the workflow. That answer is usually true, frequently defensible, and much more useful than a proprietary-model claim that will collapse under one follow-up.",
        ],
        example: {
          body: `Nothing about invoice ${CASE.invoice} requires a pretrained model of your own. The general model already reads invoices, understands purchase orders, and writes a competent chase. What it lacks is your ${CASE.terms} rule, your list of which vendors send photographs, and permission to write to your ERP, and none of those live in weights.`,
        },
      },
    ],
    widget: {
      kind: "sorter",
      dataset: "model-claims",
      caption:
        "Eight statements about built a model. Sort each into pretrain, post-train, index or prompt, then read what evidence would settle it.",
    },
    instrument: {
      name: "The four-layer decoder",
      body: "Apply to any our model claim. Four questions, asked in order, and the conversation resolves in under two minutes.",
      items: [
        "Whose weights are these, and can you name the base?",
        "What did you change: nothing, a prompt, an index, an adapter, or the weights themselves?",
        "If the weights: what did the training run cost, how long did it take, and what is in the dataset?",
        "What breaks for you if the base model is replaced next quarter?",
        "Which part would a competitor find hardest to reproduce, and why that part?",
      ],
    },
    soWhat:
      "You can separate the frozen artifact from the layer on top of it, which is the distinction the next four lessons depend on and the one that decides whether a proprietary-model claim survives its first follow-up question.",
    checks: [
      {
        q: "A vendor says their model was trained on ten years of claims data. What is the first question?",
        options: [
          {
            text: "How many parameters does it have?",
            feedback:
              "A number correlating loosely with capability, and it settles nothing about what they actually did.",
            impliesMissing: "A-PRETRAIN",
          },
          {
            text: "Trained how: from scratch, an adapter on someone else's weights, or indexed and retrieved at question time?",
            correct: true,
            feedback:
              "Correct. Those three differ by orders of magnitude in cost and by everything in defensibility, and the answer usually arrives immediately.",
          },
          {
            text: "Which benchmarks does it lead?",
            feedback:
              "Useful later, and it accepts the premise. Establish what was built before discussing how it scores.",
            impliesMissing: "A-PRETRAIN",
          },
        ],
      },
      {
        q: "Why is training a frontier model from scratch off the table for an operating business?",
        options: [
          {
            text: "Because the algorithms are secret.",
            feedback:
              "The main ideas are published. The barrier is capital, hardware access and a research team.",
            impliesMissing: "A-PRETRAIN",
          },
          {
            text: "Because it needs capital in the tens to hundreds of millions, contracted hardware, and a research team. and the result would still be a general model somebody rents for cents.",
            correct: true,
            feedback:
              "Correct, and the last clause matters most. The outcome you would buy at enormous cost is already available per token.",
          },
          {
            text: "Because there is not enough data outside the big labs.",
            feedback:
              "The training corpora are largely public text. Data is rarely the binding constraint here.",
            impliesMissing: "A-PRETRAIN",
          },
        ],
      },
      {
        q: "Our model got 40% cheaper this quarter. Which act does that claim belong to?",
        options: [
          {
            text: "Training, since a better-trained model costs less to run.",
            feedback:
              "Training cost was paid once, by someone else. It rarely moves your per-call price.",
            impliesMissing: "A-TRAINVSINFER",
          },
          {
            text: "Inference. they changed what they spend per call, by routing, by shortening context, or by moving to a smaller model.",
            correct: true,
            feedback:
              "Correct, and each of those has a different effect on quality, which is why the follow-up is which one.",
          },
          {
            text: "Neither; it is a commercial discount.",
            feedback:
              "Possible, and worth asking. The mechanisms above are the more common explanation.",
            impliesMissing: "A-TRAINVSINFER",
          },
        ],
      },
    ],
    next: "post-training",
    relatedUseCases: ["claim-intake-missing-info", "trade-deduction-management"],
  },

  {
    slug: "post-training",
    order: 17,
    n: "3.2",
    module: "M3",
    kind: "lesson",
    minutes: 22,
    title: "What does post-training actually change?",
    blurb:
      "Steering, not new physics. It teaches a frozen base to follow instructions, hold a format and prefer certain answers. It adds very few facts.",
    thesis:
      "Post-training shapes how a pretrained model behaves. following instructions, adopting a format, preferring one kind of answer over another. while adding almost nothing to what it knows.",
    lede:
      "This is the layer that turned a text-continuation engine into something you can address. It is also the layer most often invoked to explain capabilities it has nothing to do with, and the confusion is expensive. Teams reach for fine-tuning to fix problems that live in the context, spend months, and get a system producing the same wrong answers in a more consistent house style.",
    youWill: [
      "Say what instruction tuning and preference optimization each aim at.",
      "Separate behavior problems from knowledge problems before choosing a fix.",
      "Explain why post-training rarely teaches facts.",
      "Recognise the house style post-training produces, and why it varies by provider.",
    ],
    atoms: ["A-POSTTRAIN"],
    prereqs: ["A-PRETRAIN"],
    ceiling:
      "Two intentions: do what is asked, and prefer this kind of answer. Name the families once. No reward models, no policy gradients, no preference-optimization mathematics.",
    situation: {
      artifact:
        "A team reports two problems. First, the model writes chase emails that are too long and too apologetic for their house tone. Second, it keeps citing a payment-terms rule the company changed eight months ago.",
      prompt: "Which of these could post-training plausibly fix?",
      options: [
        "Both. they are both about behavior",
        "The tone, and only the tone",
        "The stale rule, since that is a knowledge problem and training adds knowledge",
      ],
      reveal:
        "The tone. Length and register are what steering is for, and a few hundred good examples move them reliably. The stale rule is a context problem wearing a knowledge costume: the current rule has to reach the call, which means fetching it. A team that tries to train the new rule in will spend months and produce a system that recites the new rule confidently while remaining unable to notice when it changes again.",
    },
    sections: [
      {
        title: "Two intentions",
        paragraphs: [
          "The first intention is to make the model do what is asked. A raw pretrained model continues text, so given a question it may continue with more questions, because that is a plausible continuation. Instruction tuning trains on examples of requests paired with good responses until responding to the request becomes the likely continuation. This single step is what made these systems usable by people instead of by researchers.",
          "The second intention is to make the model prefer certain answers. Given two responses, humans or a stand-in for humans indicate which is better, and the model gets adjusted toward the preferred one. Repeat across an enormous number of comparisons and you get a system that is more helpful, safer, better formatted, and recognisably in a house style. Several method families do this, and the ones you will hear named are reinforcement learning from human feedback and direct preference optimization. The differences between them matter to practitioners and rarely to you.",
          "Both intentions operate on behavior. Neither is an efficient way to install facts, and understanding why is the practical payoff of this lesson.",
        ],
      },
      {
        title: "Why facts sit awkwardly here",
        paragraphs: [
          "Pretraining saw a fact thousands of times across many phrasings and contexts, which is what makes it robustly available. A post-training set contains a few hundred or a few thousand examples. A fact appearing a handful of times in that set becomes weakly available at best: it surfaces sometimes, in phrasings resembling the training examples, and fails to surface when the question gets asked differently.",
          "That yields a specific and frustrating failure. The model recites the new rule when asked directly and reverts to the old behavior when the rule matters inside a longer task. Teams describe this as the fine-tune not sticking, and it is behaving exactly as the method implies.",
          "The rule that follows is simple enough to remember under pressure. Behaviour goes in the weights. Facts go in the context. A fact that changes, being a rate, a threshold, a policy or a price, belongs in the context permanently, because a fact in weights has no update path short of another training run.",
        ],
        list: [
          "Good candidates for steering: tone and register, output format and structure, consistent refusal behavior, domain vocabulary, how to lay out an answer.",
          "Poor candidates: current policies, rates and thresholds, customer-specific facts, anything that changes quarterly, anything you would want to update without a training run.",
        ],
      },
      {
        title: "House style, and why models differ",
        paragraphs: [
          "Because post-training is where preferences get installed, it is also where the recognisable personality of each provider's models comes from: the hedging habits, the enthusiasm for bulleted lists, the way refusals get phrased, the default length. Two models built on similar foundations can feel quite different for this reason alone.",
          "This carries a practical edge. Switching providers changes the house style even where capability is comparable, so prompts tuned against one model's habits often need adjusting. Budget for that when a swap is proposed, and treat the swap as an event to be measured, a theme lesson 7.5 turns into a standing rule.",
        ],
      },
    ],
    misconception: {
      says: "We will fine-tune it on our documents so it knows our business.",
      why: "Fine-tuning installs behavior reliably and facts poorly, because a few thousand examples cannot compete with the exposure a pretraining corpus provides. The result recites the fact when asked directly and reverts under load. Facts belong in the context, where they can also be updated on the day they change.",
    },
    widget: {
      kind: "tokens",
      mode: "styles",
      dataset: "styles",
      caption:
        "The same prompt through a raw continuation model, an instruction-tuned one, and a preference-tuned one. Watch what changes and what stays identical.",
    },
    instrument: {
      name: "The what-would-this-fix question",
      body: "Ask before any fine-tuning project is funded. It resolves most of them in one meeting.",
      items: [
        "Write down the failure in one sentence, as observed and not as diagnosed.",
        "Is the model doing the wrong kind of thing, or saying something factually wrong?",
        "Wrong kind of thing points at steering. Factually wrong means getting the fact into the context.",
        "Would you want to change this without a training run? If yes, it belongs in the context.",
        "How many good examples exist today? Under a few hundred, steering is unlikely to hold.",
      ],
    },
    soWhat:
      "You can sort a list of complaints into the ones steering will fix and the ones it will waste months on, which is the difference between a three-week improvement and a two-quarter detour.",
    checks: [
      {
        q: "Which of these is a real post-training candidate?",
        options: [
          {
            text: "The model quotes last year's fee schedule.",
            feedback:
              "A fact, and one that changes. It belongs in the context, fetched at call time.",
            impliesMissing: "A-POSTTRAIN",
          },
          {
            text: "The model writes in a register that clashes with the firm's client correspondence.",
            correct: true,
            feedback:
              "Correct. Tone and register are what preference tuning installs, and a few hundred examples move them.",
          },
          {
            text: "The model cannot see which invoices are outstanding.",
            feedback:
              "Missing data, not misaligned behavior. No training run puts a live balance into weights.",
            impliesMissing: "A-POSTTRAIN",
          },
        ],
      },
      {
        q: "Why does a fine-tune often fail to stick for facts?",
        options: [
          {
            text: "Because the training set was too small to matter at all.",
            feedback:
              "Close, and imprecise. The same set size moves behavior reliably; the asymmetry is what the lesson explains.",
            impliesMissing: "A-POSTTRAIN",
          },
          {
            text: "Because a fact seen a handful of times in post-training competes with everything absorbed at pretraining scale, so it surfaces in familiar phrasings and vanishes elsewhere.",
            correct: true,
            feedback:
              "Correct, and it produces the signature failure: correct when asked directly, reverted when the fact matters inside a longer task.",
          },
          {
            text: "Because fine-tuning only changes the output layer.",
            feedback:
              "An implementation detail varying by method, and it fails to explain the behavior asymmetry.",
            impliesMissing: "A-POSTTRAIN",
          },
        ],
      },
      {
        q: "A team switches provider and their carefully tuned prompts perform worse. Why?",
        options: [
          {
            text: "The new model is less capable.",
            feedback:
              "Possible, and the more common cause is that the prompts were fitted to a different set of installed preferences.",
            impliesMissing: "A-POSTTRAIN",
          },
          {
            text: "The prompts were tuned against one model's post-training habits. its default length, format and hedging. and those differ by provider.",
            correct: true,
            feedback:
              "Correct. Budget prompt work into any swap, and measure the swap on a frozen set instead of by impression.",
          },
          {
            text: "The context window is smaller.",
            feedback:
              "Checkable in a minute, and rarely the cause when capability is comparable.",
            impliesMissing: "A-WINDOW",
          },
        ],
      },
    ],
    next: "custom-model",
    relatedUseCases: ["ar-collections-chase", "rfp-response-assembly"],
  },

  {
    slug: "custom-model",
    order: 18,
    n: "3.3",
    module: "M3",
    kind: "lesson",
    minutes: 22,
    title: "Is our custom model a model?",
    blurb:
      "Four very different things get sold under one phrase, and they differ by orders of magnitude in cost, defensibility and switching risk.",
    thesis:
      "Our custom model almost always means a prompt, an index, an adapter on someone else's weights, or a distilled student. Which of the four it is decides the price, the moat, and what happens when the underlying model changes.",
    lede:
      "This is the highest-yield lesson in the module for anyone who sits across a table from a vendor or a management team. The phrase does enormous work in most decks, and it takes about ninety seconds to find out which of the four it names. Nothing about that conversation needs to be adversarial; it usually improves the pitch.",
    youWill: [
      "Decompose any custom model claim into one of four layers.",
      "Name the artifact that would settle it, per layer.",
      "Say what each layer costs to build and what it costs to leave.",
      "Explain why the cheapest layer is often the right engineering choice, and price it accordingly.",
    ],
    atoms: ["A-CUSTOMMODEL", "A-ADAPTER"],
    prereqs: ["A-POSTTRAIN"],
    ceiling:
      "Four layers, their evidence and their switching costs. Adapters described as a small set of extra weights trained on your examples and applied on top of a frozen base. No adapter mathematics.",
    situation: {
      artifact:
        "Two vendors. The first says: our proprietary model is fine-tuned on two million construction contracts. The second says: we use frontier models, and our value is a contract schema, twelve integrations and an eval suite covering four hundred real clauses.",
      prompt: "Which claim is stronger?",
      options: [
        "The first. proprietary training is a real moat",
        "The second. it names artifacts that can be inspected",
        "Equal; they are describing the same thing differently",
        "Impossible to say without seeing accuracy numbers",
      ],
      reveal:
        "The second, comfortably, and the reason is that every noun in it can be inspected. A schema exists or it does not. Twelve integrations can be listed. Four hundred clauses can be counted, and their eval can be rerun. The first claim has one inspectable noun, two million contracts, and the follow-up usually resolves it in a sentence: did you train on them, index them, or read them while designing prompts? A vendor confident in the second answer is describing a moat you can verify; a vendor reaching for the first is often describing one they cannot.",
    },
    sections: [
      {
        title: "The four layers",
        paragraphs: [
          "Every custom model claim resolves to one of four things, and they are worth holding as a ladder from cheapest to most expensive.",
          "A prompt is an unusually good system prompt carrying domain vocabulary, worked examples, and rules for edge cases. Days of work, no training, and often responsible for most of the observed quality. Anyone who sees the output closely enough can copy it in an afternoon. An index is your documents chunked, embedded and retrieved at question time. Weeks of work, and the defensible part is access to the documents, since the retrieval itself is standard. An adapter is a small set of additional weights trained on your examples and applied on top of a frozen base, changing behavior while leaving the base untouched. Weeks to months, requiring a curated example set, producing real and mostly stylistic differences, and usually tied to one base version. A distilled student is a smaller model trained to imitate a larger one on a narrow task. Months of work, where the payoff is cost and latency instead of capability, and rare outside teams with serious volume.",
        ],
        table: {
          head: ["Layer", "Time, evidence, and what it costs to leave"],
          rows: [
            {
              label: "Prompt",
              body: "Days. No training. Evidence: show it. Switching cost: hours. Frequently the source of most of the quality, and the least defensible.",
            },
            {
              label: "Index",
              body: "Weeks. Evidence: the corpus and the retrieval config. Switching cost: weeks. Defensibility sits in the data access and never in the technique.",
            },
            {
              label: "Adapter",
              body: "Weeks to months. Evidence: the example set, the base version, a before-and-after eval. Switching cost: retrain against the new base.",
            },
            {
              label: "Distilled student",
              body: "Months. Evidence: the teacher, the task scope, cost and latency numbers. Buys cheapness, seldom capability.",
            },
          ],
        },
      },
      {
        title: "The questions that separate them",
        paragraphs: [
          "Five questions, asked plainly, will resolve almost any version of this claim. What base model does it start from, and which version? What exactly did you change: a prompt, an index, weights, or a smaller model trained to imitate a larger one? If weights, how many examples and who curated them? What happens when the base is deprecated? And which part would be hardest for a competitor to reproduce?",
          "The last question matters most in a diligence context, because it invites the answer that is usually true and usually defensible: the hard part is the data access, the integrations, the workflow ownership, and the accumulated evaluation set. Those are real moats and they survive a model swap. A moat living in weights on top of a base model somebody else controls is a moat with a deprecation schedule.",
        ],
      },
      {
        title: "Why the cheap layer is often correct",
        paragraphs: [
          "None of this argues that the cheap layers are inferior engineering. A superb prompt plus solid retrieval plus a real eval suite beats a mediocre adapter almost every time, ships in weeks, and survives base-model upgrades that would force a retrain.",
          "The problem is never the choice. It is the mismatch between what got built and what is being priced. A prompt-and-index product priced as proprietary intelligence carries a valuation the artifact cannot support, and it will get found out, sometimes by a customer and sometimes by a competitor who reproduces the surface in a quarter.",
          "So the useful framing is neither credulous nor dismissive. Ask which layer, then ask whether the price and the defensibility story match that layer. Where they do, the cheap layer is a strength.",
        ],
        example: {
          body: `A vendor handling invoice ${CASE.invoice} well is probably running a frontier model with a good prompt, a fetch against your ERP, a schema for the extracted fields, and a validator. That stack is excellent engineering and it is reproducible. What would take a competitor real time is the twelve integrations, the exception playbook written from two years of edge cases, and the eval set built from four hundred of your ugly items.`,
        },
      },
    ],
    misconception: {
      says: "It is proprietary. we cannot share the details.",
      why: "The four layers can each be described without disclosing anything sensitive: which base, what was changed, how many examples, what happens at deprecation. Declining the whole class of question usually indicates a thinner layer than the pricing implies, and a vendor with a real adapter or student model can answer all four while keeping their example set confidential.",
    },
    widget: {
      kind: "claims",
      dataset: "custom-model-claims",
      caption:
        "Nine real-shaped claims. Classify each into one of the four layers, then see which artifact would settle it and what the answer implies about switching cost.",
    },
    instrument: {
      name: "The custom-model question set",
      body: "Five questions, one page, asked in this order. Works in a vendor meeting, a management presentation or a diligence call.",
      items: [
        "Which base model, and which version, does this start from?",
        "What did you change: a prompt, an index, weights, or a smaller model trained to imitate a larger one?",
        "If weights: how many examples, who curated them, and what did the before-and-after evaluation show?",
        "What happens to your system when that base version is deprecated?",
        "Which part of this would be hardest for a well-funded competitor to reproduce, and why that part?",
      ],
    },
    soWhat:
      "You can take the most common claim in this market apart in about ninety seconds, and you can tell the difference between a moat that survives a model swap and one with a deprecation date attached.",
    checks: [
      {
        q: "A vendor: our model is trained on your industry's data. Which follow-up separates the four layers fastest?",
        options: [
          {
            text: "How much data did you train on?",
            feedback:
              "Accepts the premise and invites a large number that would be equally true of an index.",
            impliesMissing: "A-CUSTOMMODEL",
          },
          {
            text: "Trained, or indexed and retrieved at question time? And if trained, on top of which base version?",
            correct: true,
            feedback:
              "Correct. Two clauses, and the answer places them on the ladder immediately.",
          },
          {
            text: "Can we see your accuracy numbers?",
            feedback:
              "Worth asking later. It tells you about performance instead of about what was built.",
            impliesMissing: "A-CUSTOMMODEL",
          },
        ],
      },
      {
        q: "A team has an adapter trained on eight hundred curated examples. The base model version is deprecated. What happens?",
        options: [
          {
            text: "Nothing. adapters are portable across versions.",
            feedback:
              "Adapters are tied to the base they were trained against. A new base generally means a retrain.",
            impliesMissing: "A-ADAPTER",
          },
          {
            text: "They retrain against the new base and re-measure, because behavior installed on one base fails to transfer unchanged.",
            correct: true,
            feedback:
              "Correct, and this recurring cost belongs in any assessment of an adapter-based moat.",
          },
          {
            text: "They are stuck on the old version permanently.",
            feedback:
              "Overstated. Retraining is normal work; the point is that it recurs.",
            impliesMissing: "A-ADAPTER",
          },
        ],
      },
      {
        q: "Which of these is hard for a competitor to reproduce?",
        options: [
          {
            text: "A very good system prompt.",
            feedback:
              "Often the source of most of the quality, and reproducible in an afternoon by anyone who studies the outputs.",
            impliesMissing: "A-CUSTOMMODEL",
          },
          {
            text: "Signed integrations into eleven customer systems, plus an evaluation set built from two years of real exceptions.",
            correct: true,
            feedback:
              "Correct. Both take calendar time that money alone cannot compress, and both survive a model swap.",
          },
          {
            text: "A fine-tune on public industry documents.",
            feedback:
              "Public inputs mean a competitor can run the same process. The moat would have to be in the curation and not the corpus.",
            impliesMissing: "A-ADAPTER",
          },
        ],
      },
    ],
    next: "finetune-or-context",
    relatedUseCases: ["rfp-response-assembly", "vendor-onboarding-packs"],
  },
  {
    slug: "finetune-or-context",
    order: 19,
    n: "3.4",
    module: "M3",
    kind: "lesson",
    minutes: 22,
    title: "Fine-tune, or put it in the context?",
    blurb:
      "Context changes what the model knows right now. Fine-tuning changes how it behaves in general. Most teams reach for the expensive one first.",
    thesis:
      "Facts belong in the context, where they can be fetched and updated on the day they change, and form belongs in the weights, where a few hundred examples can install a house style. Choosing the wrong side of that line is the most common expensive mistake in this field.",
    lede:
      "Everything needed to settle this arrived in the last three lessons. This one turns it into a routing decision you can make in a meeting, including the option most people forget: some problems want neither a fine-tune nor a longer prompt, but a rule, a cleaner feed, or a decision that no model should be making.",
    youWill: [
      "Route any problem to prompt, retrieve, fine-tune, or no model at all.",
      "Say what each option costs to build, to run and to change.",
      "Recognise the three cases where fine-tuning earns its cost.",
    ],
    atoms: ["A-FINETUNE-VS-CTX"],
    prereqs: ["A-CUSTOMMODEL", "A-GROUNDING"],
    ceiling:
      "A routing decision with costs attached. No training-pipeline mechanics, no dataset-construction methodology beyond example counts.",
    situation: {
      artifact:
        "Four complaints from one AP team. One: the drafts are too long. Two: it uses a payment-terms rule we retired in March. Three: it cannot see which invoices are on hold. Four: it sometimes approves items above the delegation limit.",
      prompt: "Route each one.",
      options: [
        "All four are fine-tuning problems",
        "One is steering, two are context, one should never reach a model at all",
        "All four are prompt problems",
        "Three are context and one is a model-capability problem",
      ],
      reveal:
        "The second. Length is steering, and a few hundred examples fix it. The retired rule and the hold status are both context, so fetch them. The delegation limit belongs in neither pile: a limit is a rule, enforced in software that can refuse, and asking a model to respect a threshold is a category error that lesson 6.1 makes permanent. Three of the four complaints arrived describing the model, and only one of them was about the model.",
    },
    sections: [
      {
        title: "The four destinations",
        paragraphs: [
          "Put the problem in one of four places. The cost profile of each differs enough that the choice usually settles itself once named.",
          "A prompt takes hours to days, changes in minutes, and costs tokens on every call. Right for format, tone, standing rules that rarely change, and worked examples. Retrieval takes days to weeks to build, changes the moment the source changes, and costs tokens plus a lookup. Right for every fact that lives in a system and can move: balances, statuses, policies, rates, prior decisions. A fine-tune takes weeks to months, changes only by another training run, costs nothing extra at inference, and may cost less if it lets you use a smaller model. Right for behavior you want by default across thousands of calls, where a prompt would be long and repetitive. And the fourth destination is no model: a rule, a lookup table, a validator, a threshold check. Right whenever the answer is exact and enumerable, which lesson 1.3 established and which people keep forgetting under enthusiasm.",
        ],
      },
      {
        title: "The update test",
        paragraphs: [
          "One question decides most cases. If this changed tomorrow, how would you want to change it? An answer of somebody edits a record means the fact belongs in the context, permanently, because that is the only place a record edit can reach. An answer of we would want the system to behave differently from now on points at steering.",
          "The test is worth applying literally because it catches the seductive case. A payment-terms rule feels like knowledge, and knowledge feels like something a model should hold. But terms change, and a fact in weights has no update path short of another training run. Putting it there converts a five-minute record edit into a multi-week project, and the system will keep confidently applying the old rule in the interim.",
        ],
      },
      {
        title: "When fine-tuning earns its cost",
        paragraphs: [
          "Three cases, and they are narrower than the enthusiasm suggests. First, when the desired behavior is elaborate enough that describing it consumes a large prompt on every call, and the volume is high enough that the token saving pays for the training. Format, structure and register are the usual content. Second, when a smaller model plus an adapter can match a larger model on one narrow task, which cuts cost and latency substantially at volume. That is a real and underused play, and it depends on having a measured set to prove the match. Third, when the behavior is hard to express in words and easy to demonstrate: a house style, a particular way of laying out an assessment, a specific approach to hedging. Some things are far easier to show a few hundred times than to specify.",
          "In all three the prerequisite is the same: a curated example set and an evaluation that can show a before and an after. A fine-tuning project with no measured set has no way to know whether it worked, which means it will be judged on impression, which means it will be declared a success.",
        ],
        example: {
          body: `For the AP queue: the invoice, PO ${CASE.po} and the receiving record are fetched. The ${CASE.terms} rule is fetched, because it changes. The delegation limit is a validator that can refuse. The house style for a chase to ${CASE.buyer} is the one candidate for steering, and only once a few hundred good chases exist to train on.`,
        },
      },
    ],
    widget: {
      kind: "sorter",
      dataset: "route-the-problem",
      caption:
        "Twelve real complaints from operating teams. Route each to prompt, retrieve, fine-tune, or no model. Four of them are traps.",
    },
    instrument: {
      name: "The routing decision tree",
      body: "Run before any model-improvement project is funded. Five questions, in order, and stop at the first yes.",
      items: [
        "Is the answer exact and enumerable? Then a rule or a validator, with no model.",
        "Is it a fact that lives in a system and can change? Then retrieve it.",
        "Is it a standing instruction that rarely changes? Then put it in the prompt.",
        "Is it default behavior across high volume, with a few hundred examples available? Then consider steering.",
        "Do you have a measured set to show a before and an after? If not, fix that before anything else.",
      ],
    },
    soWhat:
      "You can route a list of complaints in a meeting, and you can decline a fine-tuning proposal on the grounds that most of its stated goals live in the context. That is the most expensive avoidable detour in this field.",
    checks: [
      {
        q: "A firm wants the system to know its current fee schedule. Where does that go?",
        options: [
          {
            text: "Fine-tune on the schedule so the model holds it.",
            feedback:
              "Fees change. A fact in weights has no update path short of another training run, and it will surface inconsistently in the meantime.",
            impliesMissing: "A-FINETUNE-VS-CTX",
          },
          {
            text: "Fetch it at call time from wherever it is maintained.",
            correct: true,
            feedback:
              "Correct. The update test settles it: when fees change, somebody edits a record, and only the context can reach a record.",
          },
          {
            text: "Put the whole schedule in the system prompt.",
            feedback:
              "Workable for a small stable schedule, and it means every change is a code change and every call pays for the whole table.",
            impliesMissing: "A-FINETUNE-VS-CTX",
          },
        ],
      },
      {
        q: "Which of these is the strongest case for fine-tuning?",
        options: [
          {
            text: "The model does not know our product catalogue.",
            feedback:
              "A catalogue is data that changes. Retrieve it.",
            impliesMissing: "A-FINETUNE-VS-CTX",
          },
          {
            text: "Every call carries a nine-hundred-word style guide, volume is forty thousand calls a month, and six hundred approved examples already exist.",
            correct: true,
            feedback:
              "Correct. Elaborate behavior, high volume, a real example set, and a token saving that can pay for the run.",
          },
          {
            text: "The model occasionally makes arithmetic errors.",
            feedback:
              "Arithmetic goes to a tool, which returns an exact answer every time and costs nothing to maintain.",
            impliesMissing: "A-OPENCLOSED",
          },
        ],
      },
    ],
    next: "inference-bill",
    relatedUseCases: ["expense-report-exceptions", "timesheet-client-approvals"],
  },

  {
    slug: "inference-bill",
    order: 20,
    n: "3.5",
    module: "M3",
    kind: "lesson",
    minutes: 22,
    title: "What are you actually paying for at run time?",
    blurb:
      "Input tokens, output tokens, reasoning tokens, retries, and latency you pay for in human waiting. The list price per token is rarely the deciding line.",
    thesis:
      "Inference is a bill with several lines, and comparing systems on price per million tokens ignores the lines that usually dominate: how much context each call carries, how much reasoning it spends, how often it retries, and who waits.",
    lede:
      "Every discussion about cost in this field starts at the wrong number. The per-token price is published, comparable and prominent, which makes it the natural anchor, and it is frequently the smallest term in the expression. This lesson builds the actual expression; lesson 8.1 puts human minutes into it and produces the number that decides projects.",
    youWill: [
      "List the lines that make up an inference bill.",
      "Explain what a reasoning budget buys and what it costs.",
      "Separate batch work from interactive work, and price them differently.",
      "Say why a cheaper per-token model can produce a more expensive system.",
    ],
    atoms: ["A-INFERSPEND", "A-THINKING", "A-BATCHVSINTERACTIVE"],
    prereqs: ["A-TRAINVSINFER"],
    ceiling:
      "The bill as a set of lines, and reasoning as a per-job budget dial with a measurable effect. No chain-of-thought theory, no decoding internals.",
    situation: {
      artifact:
        "Two proposals for the same AP queue. Proposal A uses a model at $3 per million input tokens and sends a 400-token packet per item. Proposal B uses a model at $0.50 per million and sends a 40,000-token document dump per item, with reasoning enabled and an average of two retries.",
      prompt: "Which is cheaper per item?",
      options: [
        "B, by roughly six times",
        "A, by a wide margin",
        "About the same",
        "Cannot be determined without volume",
      ],
      reveal:
        "A, by a wide margin. The six-times-cheaper model is sending a hundred times more context, spending reasoning tokens on top, and paying for all of it again on every retry. This is the shape of most real comparisons: the per-token price moves the answer by a factor of a few, while context size, reasoning and retries move it by one or two orders of magnitude. The published number is the one people compare and the one that matters least.",
    },
    sections: [
      {
        title: "The lines",
        paragraphs: [
          "Input tokens cover everything you send, on every call, including the system prompt and tool list you re-send every time. For a long-running agent this is usually the largest line, and it grows as history accumulates. Output tokens are what comes back, typically priced several times higher than input, which is why asking for a structured field list instead of a discursive explanation is a cost decision as well as a quality one.",
          "Reasoning tokens appear on systems supporting extended reasoning: tokens the model spends working before it answers. Billed, often invisible, and capable of dominating a bill when left at a high setting for a job that never needed it. Retries cover every failed call attempted again, so a ten percent retry rate is a ten percent surcharge on everything above, and retry rates are rarely measured until someone goes looking.",
          "The last line never appears on a provider invoice. Waiting is the human minutes spent on a slow call, and it frequently exceeds all the others, which lesson 8.1 makes concrete.",
        ],
      },
      {
        title: "The reasoning dial",
        paragraphs: [
          "Extended reasoning lets the model spend tokens deliberating before producing an answer, and on hard problems it improves results substantially. Treat it as a per-job setting with a measurable effect instead of a quality level to leave switched on.",
          "The discipline is straightforward and rarely applied. Measure the job at each setting on the same frozen cases, look at where accuracy stops improving, and set the budget just past that point. For most extraction and classification work, which is the bulk of a real queue, the curve flattens almost immediately and a high setting is pure cost.",
          "The pattern that follows is a cascade, which lesson 3.6 develops: run the cheap configuration by default, and escalate to an expensive one only for the cases that earn it. The escalation rule is itself something you measure instead of guess.",
        ],
        split: [
          {
            title: "Batch",
            body: "Overnight, minutes of latency acceptable, often heavily discounted. Right for reprocessing, backfills and anything with nobody waiting.",
          },
          {
            title: "Interactive",
            body: "A person is waiting. Latency is a cost in human minutes and in whether the tool gets used at all. Right for review queues and assistance.",
          },
        ],
      },
      {
        title: "Why the cheap model can cost more",
        paragraphs: [
          "Three mechanisms turn a lower per-token price into a higher system cost, and all three are common. A weaker model needs more context to reach the same answer, so the hundred-times-cheaper token gets multiplied by a much larger count. A weaker model fails more often, and each failure costs a retry plus, eventually, a human. And a weaker model produces more output that has to be reviewed, which moves cost out of the invoice and into a payroll line where nobody will attribute it.",
          "So the comparison worth making is cost per correctly completed item, measured on the same frozen cases, with review time included. That number occasionally favours the cheap model and often does not, and it is the only comparison surviving contact with a finance review.",
        ],
        example: {
          body: `Processing invoice ${CASE.invoice} with a tight packet is a few hundred input tokens and a short structured output: a fraction of a cent. The same item with the vendor's full correspondence attached, reasoning at maximum and two retries, is comfortably a hundred times that. Same model, same queue, same answer, and the difference sits entirely in choices nobody thinks of as cost decisions.`,
        },
        list: [
          "Compare cost per correctly completed item, never price per token.",
          "Measure the retry rate before believing any cost projection.",
          "Set the reasoning budget from a measured curve, per job.",
          "Route anything with nobody waiting to batch, and take the discount.",
        ],
      },
    ],
    misconception: {
      says: "We moved to the cheaper model and cut our AI spend by 80%.",
      why: "The claim describes one line of the bill. If the cheaper model needs a longer context, retries more often, or produces output that takes a person longer to check, total cost per completed item can rise while the provider invoice falls, and the increase lands in a payroll line where nobody attributes it to the switch.",
    },
    widget: {
      kind: "econ",
      mode: "call",
      dataset: "per-call",
      caption:
        "Build a single call's bill line by line. Adjust context size, reasoning budget and retry rate, and watch which line dominates. It is almost never the per-token price.",
    },
    instrument: {
      name: "The inference bill template",
      body: "Fill this in for any workload before comparing options. Ten minutes, and it usually reverses the ranking.",
      items: [
        "Input tokens per call, including the system prompt and tool list you re-send every time.",
        "Output tokens per call, at the output price and not the input price.",
        "Reasoning tokens per call, at the setting you actually run.",
        "Retry rate, measured and not assumed.",
        "Latency, and who is waiting for it.",
        "Multiply by real monthly volume, then compare per correctly completed item.",
      ],
    },
    soWhat:
      "You can take apart a cost comparison built on per-token pricing and rebuild it on the lines that decide the answer, which routinely changes which option wins.",
    checks: [
      {
        q: "Which line most often dominates a long-running agent's bill?",
        options: [
          {
            text: "Output tokens, since they cost more per token.",
            feedback:
              "Higher unit price and much lower volume. Outputs are usually short.",
            impliesMissing: "A-INFERSPEND",
          },
          {
            text: "Input tokens, because the whole context including a growing history gets re-read on every step.",
            correct: true,
            feedback:
              "Correct, and it is why compaction, caching and packet discipline are cost decisions as much as quality ones.",
          },
          {
            text: "The subscription fee.",
            feedback:
              "Usually a rounding error against per-call spend at any real volume.",
            impliesMissing: "A-INFERSPEND",
          },
        ],
      },
      {
        q: "When should a reasoning budget be turned up?",
        options: [
          {
            text: "Always. better answers are worth paying for.",
            feedback:
              "On most extraction and classification work the curve flattens almost immediately, so the extra spend buys nothing measurable.",
            impliesMissing: "A-THINKING",
          },
          {
            text: "Per job, set just past the point where measured accuracy stops improving on your frozen cases.",
            correct: true,
            feedback:
              "Correct. It is a dial with a measurable curve, and most jobs sit near the flat part of it.",
          },
          {
            text: "Only for creative writing.",
            feedback:
              "Backwards. Extended reasoning helps most on hard analytical problems and least on stylistic ones.",
            impliesMissing: "A-THINKING",
          },
        ],
      },
      {
        q: "A nightly reprocessing job runs at interactive prices. What is the missed opportunity?",
        options: [
          {
            text: "Nothing, since the work has to happen either way.",
            feedback:
              "The work is identical; the price need not be. Nobody is waiting.",
            impliesMissing: "A-BATCHVSINTERACTIVE",
          },
          {
            text: "Batch pricing, which is substantially discounted precisely because latency stopped mattering.",
            correct: true,
            feedback:
              "Correct. Splitting a workload into interactive and batch is one of the cheapest cost interventions available.",
          },
          {
            text: "A smaller model would have been better.",
            feedback:
              "Possibly, and that is a separate decision requiring evidence. The batch discount requires none.",
            impliesMissing: "A-BATCHVSINTERACTIVE",
          },
        ],
      },
    ],
    next: "smaller-models",
    relatedUseCases: ["freight-invoice-audit", "asn-invoice-po-recon"],
  },

  {
    slug: "smaller-models",
    order: 21,
    n: "3.6",
    module: "M3",
    kind: "lesson",
    minutes: 22,
    title: "When is a smaller model the right answer?",
    blurb:
      "Most volume in a real queue is boring. Boring work routes to small, quantized or distilled models, and the frontier gets reserved for the tail that earns it.",
    thesis:
      "A real queue is mostly easy items and a small expensive tail, so the economical design runs a cheap configuration by default and escalates only on a measured trigger, which is usually where the cost of these systems is actually won.",
    lede:
      "Two techniques make small models much better than their size suggests, and both get routinely misread as compromises. Quantization stores each number with less precision. Distillation trains a small model to imitate a large one on a narrow job. Neither is a downgrade in the abstract; both are trades with a measurable cost, and measuring it is the whole discipline.",
    youWill: [
      "Explain quantization and distillation in one sentence each, at the depth that supports a decision.",
      "Design a cascade with a measured escalation trigger.",
      "Say what evidence you need before routing a step to a smaller model.",
      "Recognise the shape of a queue where a cascade will pay.",
    ],
    atoms: ["A-QUANT", "A-DISTILL", "A-CASCADE"],
    prereqs: ["A-INFERSPEND"],
    ceiling:
      "Quantization as reduced numeric precision, distillation as imitation on a narrow job. No bit-width taxonomy, no distillation-loss detail. The decision that must follow is where each is safe.",
    situation: {
      artifact:
        "An AP queue of 4,200 items a month. Roughly 3,400 are clean two-way matches. About 600 need a field extracted from a scanned document. About 200 are real exceptions requiring judgment across several documents.",
      prompt: "How many of those items need a frontier model?",
      options: [
        "All of them. consistency matters more than cost",
        "The 800 that need extraction or judgment",
        "The 200 exceptions, and possibly fewer",
        "None; this queue is a rules problem",
      ],
      reveal:
        "The 200, and after measurement possibly fewer. The 3,400 clean matches mostly want a rule and no model at all. The 600 extractions are a well-defined narrow task, which is where a small or distilled model performs close to the frontier at a fraction of the cost. Running the whole queue on a frontier model is roughly twenty times the necessary spend, and the part people miss is that it will not be twenty times better on the 3,400, because those were never hard.",
    },
    sections: [
      {
        title: "Two ways to get smaller",
        paragraphs: [
          "Quantization stores each of the model's numbers with less precision, so the model occupies less memory and runs faster. Quality degrades gradually as precision drops, and for many tasks the degradation stays below what you can detect on a real evaluation. It is the standard way to run open-weight models economically on your own hardware.",
          "Distillation trains a small model to imitate a large one on a specific job. The student sees the teacher's outputs across many examples and learns to reproduce them within that scope. Inside the scope, the student can come remarkably close at a fraction of the cost. Outside it, the student is simply a small model, which is why scope discipline matters.",
          "Both are trades with a measurable price, and both require the same thing before deployment: your frozen cases, run against the small configuration and the large one, compared. Without that comparison you are choosing on faith, and the failure will be quiet.",
        ],
      },
      {
        title: "Cascades",
        paragraphs: [
          "The pattern capturing most of the available saving is straightforward. Run the cheapest configuration that could plausibly handle an item. Detect the cases where it should not be trusted. Escalate only those.",
          "The design question is the trigger, and there are three honest ones. A structural test: the item has more than four documents, or the amount exceeds a threshold, or the document failed to parse. A validation failure: the cheap model produced output that failed a schema or a cross-check. A disagreement: two cheap runs of the same item differ, which is a good signal and costs two cheap calls instead of one expensive one.",
          "What makes a cascade work in practice is that the escalation rate gets measured and monitored instead of assumed. A cascade designed for a ten percent escalation rate that quietly runs at sixty percent has become an expensive system with extra steps, and nobody will notice without a scoreboard.",
        ],
      },
      {
        title: "What to have before you route anything down",
        paragraphs: [
          "The prerequisite is the frozen set from lesson 2.3. Run it against both configurations, compare per field instead of in aggregate, and look specifically at the tail cases. Aggregate accuracy hides exactly the failure that matters, because the tail is small in count and large in consequence.",
          "One thing worth watching is that small models often fail differently instead of merely more often. They tend to be adequate on the common shape and to collapse on the unusual one, which is the shape a cascade is built to exploit, provided the trigger catches the unusual shape reliably. Test the trigger, and not only the model.",
        ],
        example: {
          title: "The queue as a cascade",
          body: `A rule handles clean matches on the invoice ${CASE.invoice} queue with no model at all. A small model extracts fields from scanned documents and its output is validated against the ERP record. Anything failing validation, exceeding the amount threshold, or involving more than two documents escalates to a frontier model with the full packet. Measured escalation rate becomes a line on the weekly scoreboard.`,
        },
        list: [
          "Never route to a smaller model without a measured comparison on your own cases.",
          "Compare per field and per case type, because aggregates conceal tail failures.",
          "Design the escalation trigger explicitly, and test the trigger separately from the model.",
          "Monitor the escalation rate weekly. A drifting rate silently erases the saving.",
        ],
      },
    ],
    misconception: {
      says: "We use the best model for everything, because quality matters more than cost.",
      why: "On the easy majority of a real queue the frontier model produces the same answer as a small one, so the extra spend buys nothing while consuming the budget that would have funded evaluation, gating and integration. Quality gets won by routing the hard cases correctly, which requires knowing which cases are hard.",
    },
    widget: {
      kind: "evalbench",
      mode: "cascade",
      dataset: "cascade",
      caption:
        "Route twenty cases by difficulty across three configurations. Watch accuracy and cost move together, then change the escalation trigger and watch both move again.",
    },
    instrument: {
      name: "The cascade design worksheet",
      body: "One page per queue. Fill it in before any model-selection conversation.",
      items: [
        "Split the queue by volume: how many items are easy, medium and hard?",
        "For the easy tier, ask whether a rule would do it with no model at all.",
        "Choose the cheapest configuration for each tier, and record the evidence for that choice.",
        "Write the escalation trigger: structural test, validation failure, or disagreement between two cheap runs.",
        "Estimate the escalation rate, then measure it in the first week and every week after.",
        "Put cost per completed item, by tier, on the scoreboard.",
      ],
    },
    soWhat:
      "You can design the cost structure of a queue instead of choosing a model for it, and you can tell whether a proposed saving rests on measurement or on hope.",
    checks: [
      {
        q: "What is the honest description of quantization?",
        options: [
          {
            text: "A compressed model that loses some of its knowledge.",
            feedback:
              "Loose in a way that misleads. Nothing is removed; each number gets stored with less precision.",
            impliesMissing: "A-QUANT",
          },
          {
            text: "Storing each of the model's numbers with less precision, so it is smaller and faster and slightly less exact.",
            correct: true,
            feedback:
              "Correct, and the degradation is gradual, which is why it has to be measured on your cases instead of assumed.",
          },
          {
            text: "Training a smaller model on the larger model's outputs.",
            feedback:
              "That is distillation, a different technique with a different trade.",
            impliesMissing: "A-DISTILL",
          },
        ],
      },
      {
        q: "Which escalation trigger is strongest for a queue where correctness matters?",
        options: [
          {
            text: "Escalate when the cheap model reports low confidence.",
            feedback:
              "Self-reported confidence carries no measurement, as lesson 2.2 established.",
            impliesMissing: "A-CALIBRATION",
          },
          {
            text: "Escalate when the output fails a schema or a cross-check against the record, or when two cheap runs of the same item disagree.",
            correct: true,
            feedback:
              "Correct. Both are mechanical, both are cheap, and disagreement between two cheap runs is a strong difficulty signal.",
          },
          {
            text: "Escalate a random ten percent for quality assurance.",
            feedback:
              "A good sampling practice for a different purpose. It catches drift and does no routing.",
            impliesMissing: "A-CASCADE",
          },
        ],
      },
      {
        q: "A team reports that a distilled model matches the frontier model on their task. What do you ask?",
        options: [
          {
            text: "Which benchmarks did you compare on?",
            feedback:
              "Benchmarks describe someone else's task. The claim is about theirs.",
            impliesMissing: "A-OWNTEST",
          },
          {
            text: "On which cases, how many, and how did it perform on the tail instead of in aggregate?",
            correct: true,
            feedback:
              "Correct. Small models typically match on the common shape and collapse on the unusual one, so the aggregate is where that gets hidden.",
          },
          {
            text: "How much smaller is it?",
            feedback:
              "Size predicts cost instead of adequacy, and adequacy is what the claim asserts.",
            impliesMissing: "A-DISTILL",
          },
        ],
      },
    ],
    next: "where-weights-run",
    relatedUseCases: ["asn-invoice-po-recon", "joiner-access-provisioning"],
  },

  {
    slug: "where-weights-run",
    order: 22,
    n: "3.7",
    module: "M3",
    kind: "lesson",
    minutes: 24,
    title: "Closed API, open weights, or open source?",
    blurb:
      "The real cut is where the weights run and who is answerable: residency and operations, with virtue playing no part. Open here is usually a license claim.",
    thesis:
      "Choosing between a hosted API and weights you run is a decision about data residency, operational burden and accountability, and the word open in this market describes a license on the weights instead of access to how they were made.",
    lede:
      "This choice attracts more ideology than any other in the field, which is unfortunate, because it is one of the more tractable decisions once the axes are named. Four deployment shapes, six requirements, and a matrix. The answer is usually obvious once written down, and it is usually different for different workloads inside the same company.",
    youWill: [
      "Name the four deployment shapes and what each demands operationally.",
      "Say what open means when applied to weights, and what it leaves undisclosed.",
      "Score a workload against six requirements and pick a shape.",
      "Explain why the answer often differs between two workloads at the same company.",
    ],
    atoms: ["A-WEIGHTS", "A-OPENWEIGHTS", "A-RESIDENCY"],
    prereqs: ["A-PRETRAIN", "A-INFERSPEND"],
    ceiling:
      "Four shapes against six requirements. License families named without legal analysis. No serving-stack detail beyond the fact that someone has to run it.",
    situation: {
      artifact:
        "A board paper argues for open-source models on three grounds: lower cost, better data control, and no vendor lock-in.",
      prompt: "How many of those three survive scrutiny?",
      options: [
        "All three. that is the standard case",
        "Data control, and the others depend on volume and design",
        "None of them",
        "Cost and lock-in, but not data control",
      ],
      reveal:
        "Data control survives cleanly. Weights running in your environment mean your data stays there, which is a real and sometimes decisive property. Cost depends entirely on volume, because self-hosting substitutes a large fixed cost for a variable one and only wins above a break-even that has to be calculated. Lock-in is the weakest of the three: you avoid a vendor and acquire a serving stack, a hardware commitment and a team, and switching away from those is rarely easier. One of three is a perfectly good reason. Three of three is a paper that has skipped the arithmetic.",
    },
    sections: [
      {
        title: "Four shapes",
        paragraphs: [
          "A hosted API means you send tokens to a provider and receive tokens back. Lowest operational burden, fastest access to new capability, and your data crosses a boundary under whatever contract you signed. Hosting in your own cloud region or tenancy runs the same models within a boundary you control contractually and sometimes physically: more paperwork, somewhat less flexibility, and a materially different answer to where does the data go.",
          "Open-weight models you run means downloading weights and serving them on your own hardware or in your own cloud. Data stays put, cost becomes fixed instead of variable, and you have acquired a serving stack that needs people. On-device or edge deployment runs small models close to the user, which is right for latency, offline work and strict privacy constraints, at the price of narrow capability and a fleet to manage.",
        ],
      },
      {
        title: "What open means here",
        paragraphs: [
          "In most cases it means the weights are downloadable under a license, and the license often carries conditions: commercial-use thresholds, field-of-use restrictions, naming requirements. It generally does not mean the training data is disclosed, the training code is available, or the process is reproducible. So the term names something quite different from what open source means in software, and reading the actual license is a twenty-minute job that occasionally changes the decision.",
          "None of that makes open weights less valuable. Downloadable weights give you residency, the ability to pin a version indefinitely, and freedom from a provider's deprecation schedule, which is a real and underrated benefit for a system evaluated against a specific version. It simply means the word does less work than it appears to.",
        ],
      },
      {
        title: "The six requirements",
        paragraphs: [
          "Score any workload on six axes and the shape usually chooses itself. Where must the data stay, contractually and physically? What is the volume, and where does self-hosting break even against per-token pricing? How much latency can the workload tolerate? Who operates it, and do they exist today? How much does the workload depend on newest-generation capability? And who is answerable when the output is wrong?",
          "The last axis is the one most often skipped and the one lesson 6.6 will make permanent. Running weights yourself removes a provider from the conversation and puts your own organisation in the position of having produced the output. Sometimes that is exactly what you want, and it should be a choice instead of a discovery.",
          "The reason the answer differs across workloads at one company is that these axes move independently. A high-volume, latency-tolerant classification job over sensitive records is a strong candidate for self-hosted open weights. A low-volume, judgment-heavy exception queue benefiting from the newest capability is a strong candidate for a hosted API. Both can be correct in the same building, and a policy forcing one shape everywhere will be wrong for half the estate.",
        ],
        example: {
          body: `The invoice ${CASE.invoice} queue splits cleanly. Extracting fields from 600 scanned documents a month is narrow, repetitive and volume-heavy, so a self-hosted quantized open-weight model is worth pricing. The 200 real exceptions want the strongest available reasoning and arrive infrequently, so a hosted API is the obvious answer. One queue, two shapes, and forcing either shape across both would be a mistake.`,
        },
      },
    ],
    misconception: {
      says: "We will go open source so we own our AI.",
      why: "Downloadable weights give you residency and version control, both valuable. They also hand you a serving stack, a hardware commitment, an on-call rotation and a team, and switching away from those is generally harder than switching providers. Ownership moved instead of appearing, and the calculation is a break-even instead of a principle.",
    },
    widget: {
      kind: "sorter",
      dataset: "deployment-shapes",
      caption:
        "Six workloads from one company scored against six requirements. Place each in a deployment shape, then see where the break-even actually falls.",
    },
    instrument: {
      name: "The deployment-shape matrix",
      body: "One row per workload instead of one per company. Filling it in takes an afternoon and prevents a policy that is wrong for half your estate.",
      items: [
        "Where must the data stay, contractually and physically? Write the clause, not the impression.",
        "Monthly volume, and the calculated break-even against per-token pricing.",
        "Latency tolerance, and who is waiting.",
        "Who operates the serving stack, and whether that team exists today.",
        "How much does this workload depend on newest-generation capability?",
        "Who is answerable when the output is wrong, under each shape?",
      ],
    },
    soWhat:
      "You can assess a deployment decision on six axes instead of on ideology, and you can explain why the right answer differs between two workloads inside the same company, which is usually the finding that unblocks the discussion.",
    checks: [
      {
        q: "Which claim about open-weight models is most reliably true?",
        options: [
          {
            text: "They cost less.",
            feedback:
              "Only above a break-even. Self-hosting substitutes a large fixed cost for a variable one, and low volume favours the variable cost.",
            impliesMissing: "A-RESIDENCY",
          },
          {
            text: "Your data stays inside your boundary, and you can pin a version for as long as you like.",
            correct: true,
            feedback:
              "Correct, and version pinning is underrated: a system evaluated against a specific version keeps that version indefinitely.",
          },
          {
            text: "You avoid lock-in.",
            feedback:
              "You trade a provider for a serving stack, hardware and a team. A different lock-in, and not none.",
            impliesMissing: "A-OPENWEIGHTS",
          },
        ],
      },
      {
        q: "In this market, what does open usually describe?",
        options: [
          {
            text: "Published training data and reproducible training code.",
            feedback:
              "Rare. Most releases disclose neither, which is what separates the term here from open source in software.",
            impliesMissing: "A-OPENWEIGHTS",
          },
          {
            text: "Downloadable weights under a license that often carries conditions, with the training process undisclosed.",
            correct: true,
            feedback:
              "Correct, and reading the actual license is a twenty-minute job that occasionally changes the decision.",
          },
          {
            text: "A model anyone may use commercially without restriction.",
            feedback:
              "Several widely used licenses carry commercial thresholds or field-of-use conditions.",
            impliesMissing: "A-OPENWEIGHTS",
          },
        ],
      },
      {
        q: "A company mandates one deployment shape across every workload. What goes wrong?",
        options: [
          {
            text: "Nothing. consistency reduces operational cost.",
            feedback:
              "Consistency is real value, bought here by being wrong on workloads whose requirements point elsewhere.",
            impliesMissing: "A-RESIDENCY",
          },
          {
            text: "The six requirements move independently, so a shape fitting a high-volume classification job over sensitive data will misfit a low-volume judgment queue wanting the newest capability.",
            correct: true,
            feedback:
              "Correct. The policy should set the axes and the thresholds instead of the answer.",
          },
          {
            text: "Nothing, provided the chosen shape is the most secure one.",
            feedback:
              "Security is one axis of six, and the most restrictive shape can be wrong for a workload with no sensitive data and a latency requirement.",
            impliesMissing: "A-RESIDENCY",
          },
        ],
      },
    ],
    next: "text-that-acts",
    relatedUseCases: ["prior-auth-packet-chase", "joiner-access-provisioning"],
  },
];
