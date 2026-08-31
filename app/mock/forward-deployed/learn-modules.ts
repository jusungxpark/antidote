export type LearnPartId =
  | "Context"
  | "Mechanism"
  | "Models"
  | "Work"
  | "Control"
  | "Evidence";

export type LearnSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
  rows?: { label: string; body: string }[];
  split?: { title: string; body: string }[];
  example?: { title: string; body: string };
};

export type LearnModule = {
  slug: string;
  order: number;
  part: LearnPartId;
  minutes: number;
  title: string;
  blurb: string;
  lede: string;
  youWill: string[];
  sections: LearnSection[];
  mixup: { wrong: string; right: string };
  check: { q: string; a: string }[];
  next: string | null;
  relatedUseCases: string[];
};

export const LEARN_PARTS: {
  id: LearnPartId;
  label: string;
  blurb: string;
}[] = [
  {
    id: "Context",
    label: "I. Context",
    blurb:
      "Where the word came from, what the four jobs are, and the primitive: next-token prediction.",
  },
  {
    id: "Mechanism",
    label: "II. Mechanism",
    blurb:
      "Why fluent-and-wrong, jagged skill, and forgotten amounts are the same machine, seen from three angles.",
  },
  {
    id: "Models",
    label: "III. Models",
    blurb:
      "How capability is made, how inference is spent, and how you buy or host the weights.",
  },
  {
    id: "Work",
    label: "IV. Work",
    blurb:
      "Automations, copilots, tools, agents, multi-agent, computer use, memory, harness, tracing.",
  },
  {
    id: "Control",
    label: "V. Control",
    blurb:
      "Guardrails, HITL, injection, identity, gateways, sandboxes, and what leaves the building.",
  },
  {
    id: "Evidence",
    label: "VI. Evidence",
    blurb:
      "Evals that match the job, unit economics you can instrument, and how you stage a write.",
  },
];

const INVOICE =
  "Invoice 8812, vendor Acme, $14,200, three-way match against PO 4501. The goods receipt is missing.";

export const LEARN_MODULES: LearnModule[] = [
  {
    slug: "history-and-context",
    order: 1,
    part: "Context",
    minutes: 18,
    title: "History and context",
    blurb:
      "Sixty years of 'AI,' then 2022 chat, then 2024 to 2026 systems. Four jobs. Closed versus open. The last mile is still the project.",
    lede:
      "The word AI now defaults to a generative model. For most of computing history it meant something else: expert systems, scores, labels, rules, then brittle click automation. November 2022 made a fluent assistant feel default. What started to hold for operations in 2024 through 2026 was different: tool calling, harnesses, gated writes. This unit is the history and the vocabulary. If you do not name the job and the era, you will treat a writer as a matcher, or a 2022 chat screenshot as a queue.",
    youWill: [
      "Place a claim in the history: classical, RPA, 2022 chat, or a 2024 to 2026 system.",
      "Tag any 'AI' claim as predict, classify, generate, or act.",
      "Tell closed output from open output, and know which one needs a gate.",
      "See why last-mile programs died, and why 'why now' is not 'why unsupervised.'",
    ],
    sections: [
      {
        title: "How we got here, in one pass",
        paragraphs: [
          "Expert systems in the 1960s to 80s encoded if-then knowledge from specialists. They did not scale: every new exception needed a new rule, and the knowledge base rotted. The 1990s brought statistical machine learning: learn a mapping from features to a label or a score, given enough labeled rows. That is still how churn, credit, and slotting work. Neural nets and then transformers (2017) made it possible to train on unlabeled internet text at scale. The architecture that mattered was attention: each token can weight the others in the sequence, so long-range links hold.",
          "November 2022 was the first time anyone could feel a fluent assistant without a lab. Boards inferred that labor was about to vanish. What actually scaled in 2023 was copilots in every toolbar: a sidecar for people who already do the job. What started to hold for ops in 2024 through 2026 was a different object: reliable tool calling, cheaper tokens, reasoning at inference time, public patterns for harnesses, evals, and gated writes. ChatGPT proved demand. It did not prove that a sidecar next to a broken process moves labor.",
          "Earlier ops waves died at the last mile, not at the algorithm. Classical ML needed labels and a stable schema. RPA needed a frozen UI. Pre-transformer NLP was weak on long, ugly documents. What changed is not that companies suddenly got clean data. What changed is that a general model can read an exception, call a tool, and draft the next action at a unit cost that can beat loaded labor on high-volume language work. The last mile is still the project. It is no longer impossible. Why-now is not why-unsupervised.",
        ],
      },
      {
        title: "Start from the output, not the slogan",
        paragraphs: [
          "A system is defined by what it emits. Predictive systems emit a number or a rank: demand, churn, credit, next-best-offer. Classifiers emit a label from a known set: this invoice is a three-way-match break, this email is a claim. Generative systems emit tokens: a chase email, a packet narrative, a proposed JSON body. Agents attempt the work by calling tools until a stop condition. Those are four jobs. The slogan 'we have AI' can mean any of them, including a rules engine finance has called AI since 2014.",
          "The jobs have different costs, different ways to be wrong, and different owners. A scorer that is two points off on churn is a model problem. A generator that invents a PO number is an incident if it can write. An agent that sends the wrong chase is an operating problem even if the prose is excellent. You cannot score them as one maturity number.",
        ],
        rows: [
          {
            label: "Predict",
            body: "A number or rank. Error is statistical. You already know how to sample this.",
          },
          {
            label: "Classify",
            body: "A known set of labels. Error is a wrong bucket. Audit is a confusion matrix plus sampling.",
          },
          {
            label: "Generate",
            body: "Open text or a structured draft. Error is fluent invention. Needs a schema, a fetch, or a human.",
          },
          {
            label: "Act",
            body: "Tool calls against live systems. Error is a write you did not mean. Needs an allowlist, a gate, and a trace.",
          },
        ],
      },
      {
        title: "Closed output versus open output",
        paragraphs: [
          "The useful cut underneath those four jobs is whether the output is closed or open. Closed means a known set: yes or no, a score, a bin, a match. Tuesday can be made to look like last Tuesday. Error bars are tight. Audit is sampling against a spec. Three-way match inside tolerance is a rule. Duplicate-invoice detection, once the features exist, is a classifier. Slotting in a WMS is an optimizer.",
          "Open means tokens. The next word, the next field, the next proposed tool call. Fluency is unbounded. That is why this wave can read a novel vendor email, and why it can invent a PO number. Open output is not a better closed output. It is a different object. You wrap it (schema, allowlist, human) before it may write a system of record.",
        ],
        split: [
          {
            title: "Closed",
            body: "Known set. Tight error. Prefer this when identity, amount, and match must not drift.",
          },
          {
            title: "Open",
            body: "Tokens. Fluent and unbounded. Needs a constraint before it is software instead of prose.",
          },
        ],
      },
      {
        title: "The stack already has the old kind",
        paragraphs: [
          "Pricing engines, WMS slotting, claims scoring, churn detection, recommendation, and the if-then layer in the ERP are AI in the pre-2022 sense. They have owners, refresh cadences, and (when they are healthy) a known failure mode. They still move more P&L than most copilots. The new spend is generation and action sitting next to those systems, or trying to replace them.",
          "The usual failure is a rip-and-replace. A stable three-way match gets torn out because it is 'not AI,' then a chat box is asked to do matching and narrative at once. Matching gets slower. The narrative is unaccountable. The scorer that was quietly saving chargebacks is still there, unmentioned, until someone turns it off in a modernization program.",
        ],
        example: {
          title: "Running example",
          body: `${INVOICE} Matching 8812 to PO 4501 is closed. Drafting a missing-GR chase in buyer language is open. Filing a note in the ERP is act. One invoice, three jobs. The rest of this course is what has to be true before the third job is safe.`,
        },
      },
      {
        title: "RPA, analytics, and a copilot license are not this",
        paragraphs: [
          "Analytics tells you what happened. RPA repeats a click path. A copilot license is a sidecar for people who already do the job. Generation plus tools is a bid to own volume on a queue. Those words get filed under AI. They are not the same product.",
          "People also mix 'the company uses ChatGPT' with 'the process runs on a model.' The first is often shadow IT: paste an invoice into a consumer tab. The second is a system with identity, an allowlist, and a place in the system of record. Stopping at 'employees have access to a chatbot' has not found the operating change.",
        ],
        list: [
          "RPA dies when a button moves, MFA appears, or the vendor portal A/B tests a layout. An API write does not.",
          "An agent that only clicks a GUI is RPA with a narrator. Residual, not architecture.",
          "If there is no language and no exception tail, you may not need generation. You need a cleaner rule, a better feed, or a staffed queue.",
        ],
      },
    ],
    mixup: {
      wrong:
        "One AI-maturity score. Copilot seats counted as transformation. A working classical model treated as obsolete because it is not generative.",
      right:
        "Every claim tagged as predict, classify, generate, or act, named against a system of record. Generation aimed at messy language. Rules and scores keep identity, match, and money.",
    },
    check: [
      {
        q: "A three-way match inside tolerance. Which job, and is the output closed or open?",
        a: "Classify or rule. Closed. A generative loop is the wrong tool.",
      },
      {
        q: "A team rolled out Microsoft Copilot. The shared inbox is the same size. What happened?",
        a: "A sidecar for experts. Chat and copilot do not own a queue. Volume did not move.",
      },
      {
        q: "Why is inventing a PO number a different kind of error from a churn model being two points off?",
        a: "Open output can write an identifier that never existed. Statistical error on a score is not an invented key in the ledger.",
      },
    ],
    next: "next-token",
    relatedUseCases: ["shared-inbox-triage", "ap-invoice-exceptions"],
  },
  {
    slug: "next-token",
    order: 2,
    part: "Context",
    minutes: 20,
    title: "Next-token prediction",
    blurb:
      "The generative job is one trick: chop text into tokens, predict the next one, sample, append, repeat. Attention weights this window. That is enough to see both the fluency and the miss.",
    lede:
      "You do not need the 2017 paper. You need the primitive, because every failure later in this course is this mechanism seen from another angle. The model is not a database, not a search engine, and not a lookup of the ERP. It assigns probabilities to the next token and draws. Fluency is the training objective. Truth is something you attach.",
    youWill: [
      "Explain generation as tokenize, predict, sample, append.",
      "See why two runs can differ, and why 'run it again' is not a control.",
      "Know what attention does (weight this window) and what it does not (remember the company).",
      "See why a schema or an allowlisted tool name is how next-token becomes software.",
    ],
    sections: [
      {
        title: "The model never sees 'your company'",
        paragraphs: [
          "Text is chopped into tokens: chunks, not always words. A tokenizer has a fixed vocabulary. Common words are one token. Rarer strings split. An invoice ID, a vendor name with an ampersand, a hyphenated SKU: these often become several tokens, which is one reason identifiers are fragile if you ask the model to emit them from memory.",
          "Each token is an integer index. The model is a function over those integers. It does not have a string called Acme in a filing cabinet. It has weights that, given a sequence, make some next indices more likely than others. 'Understanding' is a metaphor for that likelihood.",
        ],
      },
      {
        title: "Predict, sample, append",
        paragraphs: [
          "Given tokens 1 through n, the model produces a probability for every token in the vocabulary as token n+1. That is the whole generative act, once. To write a sentence it does this in a loop: sample one token, append it to the sequence, predict again. Streaming is that loop shown to you as it runs. Stopping mid-sentence is usually a token budget, a stop sequence, or a sampled period.",
          "Sampling is real. The distribution has a peak (the greedy token) and a tail. Temperature sharpens or flattens the distribution. Top-p cuts the tail. You can turn temperature down and pin a seed. You still do not get a proof. You get a more peaked guess. Two runs of the same prompt can differ. A second sample that 'looks better' is not QA. It is another draw.",
        ],
        example: {
          title: "Invoice 8812, from inside the loop",
          body: "The prompt ends with 'The PO number is'. No PO is in the window. The distribution still has mass on digit-like tokens, because PO numbers in the training data look like PO numbers. It samples 4, then 5, then 0, then 1. You read '4501'. That is not retrieval. That is completion. Unit 3 is this paragraph, named.",
        },
      },
      {
        title: "Attention weights this window",
        paragraphs: [
          "Older sequence models struggled to link a name at the top of a page to an amount at the bottom. Attention is the trick that scaled: each token computes weights over the other tokens in this prompt, so distant pieces can bind. The 2017 paper is famous because the architecture scaled on internet text, not because anyone running a queue needs to implement it.",
          "Practical residue: attention is a weighting over this call's tokens. It is not memory of the company after the call ends. It is not a librarian. Models still drop or underweight the middle of a stuffed window (lost-in-the-middle). A large window lets you fit more. It does not make the model a file system. If a fact must be used, put it in a tight packet or fetch it by key. Do not hide it in a dump and hope attention finds it.",
        ],
      },
      {
        title: "Constrain the shape, or you shipped a writer",
        paragraphs: [
          "You can force the next tokens to match a grammar: JSON that fits a schema, an enum of tool names, a form with required fields. That is constrained decoding. The model still samples. The samples that would break the grammar are not allowed. This is how ops turns next-token prediction into software instead of prose.",
          "Without a constraint, the loop emits whatever is likely. 'Please be accurate' is more tokens in the window. It is not a grammar. Temperature is not a grammar. A longer chain of guesses (a reasoning model thinking out loud) is still guesses until a tool or a validator checks them.",
        ],
        rows: [
          {
            label: "What it is",
            body: "Next-token prediction over this window, with sampling. Attention weights the window.",
          },
          {
            label: "What it is not",
            body: "A system of record, a proof, a calibrated lie detector, or memory after the call ends.",
          },
        ],
      },
    ],
    mixup: {
      wrong:
        "'The model knows our playbook.' 'The model will remember that vendor.' Low temperature as correctness. A longer pause as a proof.",
      right:
        "The playbook is in the prompt or the tools this call, or it is not in the loop. Memory is a write to a system of record. Sampling is not a control. Thinking tokens are still guesses until something checks them.",
    },
    check: [
      {
        q: "You run the same prompt twice and get two PO numbers. What happened?",
        a: "Two samples from a distribution. Neither run retrieved a fact that was not in the window.",
      },
      {
        q: "A vendor advertises a million-token window. Does the model now remember the company?",
        a: "No. The window is this call's working set. When the call ends, it is gone unless you wrote it somewhere durable.",
      },
      {
        q: "What turns next-token prediction into a tool call instead of a paragraph?",
        a: "A constrained shape: an enum of tool names and a schema for arguments, executed by software, not by the model's say-so.",
      },
    ],
    next: "why-fluent-is-wrong",
    relatedUseCases: ["ap-invoice-exceptions", "customs-entry-document-packs"],
  },
  {
    slug: "why-fluent-is-wrong",
    order: 3,
    part: "Mechanism",
    minutes: 18,
    title: "Why fluent is not true",
    blurb:
      "Hallucination is completion with a missing fact. Jaggedness is a spike next to a hole. Both follow from the last unit. Neither is fixed by asking the model to be careful.",
    lede:
      "A model that always refused to guess would be a worse product. It is trained to continue. When the continuation needs a PO number and none is present, you get a plausible one. Calling that a bug is like calling gravity a bug in falling. Adjacent work does not transfer either: excellent at a chase email, intern-grade at the near-miss type. This unit names those two errors so you stop treating them as one vibe.",
    youWill: [
      "Derive hallucination from next-token prediction with a missing fact.",
      "Separate tone from a calibrated probability.",
      "Separate hallucination (no fact) from jaggedness (fact present, skill does not transfer).",
      "See why types, schemas, and gates exist, not because anyone is timid.",
    ],
    sections: [
      {
        title: "Hallucination is the mechanism working",
        paragraphs: [
          "Unit 2: the model samples from a distribution over tokens. If the true PO is not in the window and not returned by a tool, the distribution still has mass on PO-like strings. Invented citations, invented invoice IDs, invented 'I already sent that' are the same event. In a chat wrapper this is embarrassing. In an agent with a send-mail tool it is an incident.",
          "The model is not trying to deceive you. It is filling a hole in the pattern with something that looks like the training distribution. The fix is structural. The tool schema requires an ID from a previous read. Duplicate checks live in software. If the only defense is 'we told it not to make things up,' you have a style guide, not a control. Style guides do not survive a busy Tuesday.",
        ],
        example: {
          title: "8812, continued",
          body: "The packet never fetched PO 4501. The model writes a chase that cites PO 4501 anyway, because the vendor name and the amount made that completion likely. Fluent. Wrong. A validator that refuses a write whose PO was not in get_po() kills this. A prompt that says 'be accurate' does not.",
        },
      },
      {
        title: "Confidence is a writing style",
        paragraphs: [
          "Models sound sure. That tone is a feature of how they are trained to write (helpful, complete, confident), not a score you can put on a risk table. Asking the model 'how confident are you' produces more fluent text. It does not produce a well-calibrated probability.",
          "If you need a confidence, measure it with evals and with validators (schema, duplicate check, tolerance math), not with the model's self-report. The usual failure: a reviewer sees assertive prose and clicks approve without opening the packet. HITL that rubber-stamps tone is not a gate. It is a slower path to the same write.",
        ],
      },
      {
        title: "Jaggedness is a different error",
        paragraphs: [
          "Hallucination is completing without a fact. Jaggedness is being genuinely good at A and bad at A-prime even when the facts are in the packet. You can ground the PO number and still watch the model choose the wrong tool, skip the completeness check, or treat a commercial dispute like a missing GR. The packet was fine. The skill did not transfer.",
          "People generalize: if it can write, it can file; if it can file, it can pay. Models do not. Training data and post-train rewards create spikes (fluent English, common layouts, Python, multiple choice) and holes (your vendor's ugly PDF, a two-step ERP write, a policy in a footnote). The hole next to a spike is how you get a confident wrong action.",
          "This is why types exist as an operating object. 'Missing GR' and 'short pay that looks like missing GR' are adjacent to a person and different to a model. Grounding does not flatten the frontier. Types and evals do the flattening you can actually buy: measure A, measure A-prime, auto the spike, park the hole. A new reasoning SKU that spikes on math is not a new spike on your TMS.",
        ],
        split: [
          {
            title: "Hallucination",
            body: "The fact never entered. Completion filled the hole. Fix: fetch, schema, refuse the write.",
          },
          {
            title: "Jaggedness",
            body: "The fact entered. Skill did not transfer to the near-miss type. Fix: types, eval, gate on A-prime.",
          },
        ],
      },
      {
        title: "What the mechanism tells you to build",
        paragraphs: [
          "Packet first, then language. System of record first, then narrative. Allowlisted actions that cannot fire without a fetched key. Put volume on the spikes. Put humans on the holes. That split is the HITL dial by type, not a brand promise of autonomy.",
          "Expand the allowlist when A-prime is in the frozen set and holding. Do not expand because the golden path got better, or because a lab keynote made 'reasoning' sound like a personality. Job-family claims ('it can do AP') are how a spike gets treated as a surface.",
        ],
      },
    ],
    mixup: {
      wrong:
        "Hallucination and jaggedness treated as one 'quality' problem. Tone used as confidence. 'Please be accurate' as the control. 'AI can do AP' from the pocket you were shown.",
      right:
        "Missing fact versus missing transfer, named separately. Validators on identifiers. Types in the eval, including the near miss. Auto on the spike, gate on the rhyme.",
    },
    check: [
      {
        q: "The PO is in the packet. The model still files this as missing GR when it is a short pay. Which error?",
        a: "Jaggedness. The fact entered. The type did not transfer. A fetch will not fix it. A type list and a gate might.",
      },
      {
        q: "The PO is not in the packet. The model cites one anyway. Which error, and what kills the write?",
        a: "Hallucination. A schema that requires a fetched ID, plus a refuse path.",
      },
      {
        q: "Why is the model's 'I am 90% sure' not a risk score?",
        a: "That sentence is more sampled tokens, trained to sound helpful. Calibration is measured outside the model.",
      },
    ],
    next: "context-windows",
    relatedUseCases: ["ap-invoice-exceptions", "trade-deduction-management"],
  },
  {
    slug: "context-windows",
    order: 4,
    part: "Mechanism",
    minutes: 18,
    title: "Context windows",
    blurb:
      "The context window is this call's scratchpad. Bigger helps. Stuffing can make the model worse. Summaries drop numbers. Durable facts cannot live only here.",
    lede:
      "A context window is what the model can see this call: instructions, packet, tool results, recent turns. Vendors advertise very large windows. Useful, and not 'the model remembers the company.' Attention still thins. The middle of a dump gets lost. Long jobs summarize themselves to stay in budget, and summaries drop amounts, IDs, and gates. Production reliability is mostly about what you refuse to keep only in the window.",
    youWill: [
      "Treat the window as this call's working set, not as a brain.",
      "Prefer a tight packet over stuffing, and know why lost-in-the-middle happens.",
      "See prompt cache as an economics fact about a stable prefix, not as memory.",
      "See compaction as a bug source for amounts and IDs.",
    ],
    sections: [
      {
        title: "This call, then gone",
        paragraphs: [
          "Instructions, retrieved chunks, the packet, tool results, and recent turns compete for the same budget. A large window lets you fit more. It does not make the model a file system. When the call ends, that working set is gone unless you wrote it somewhere durable.",
          "'1 million tokens of context' as a substitute for a vendor file in the ERP is a scratchpad sized like a warehouse, still a scratchpad. What good looks like: each case carries a tight packet; durable facts (amount, IDs, last chase, gate) are fields on the case; the window holds what this step needs.",
        ],
        example: {
          title: "8812 overnight",
          body: "The loop summarizes the thread to stay in budget. The summary says 'vendor issue' and loses the short-pay amount. The next send cites the wrong figure. That is not the model getting dumber at 2am. That is a lossy codec sitting on your amounts. Keep the source on the case.",
        },
      },
      {
        title: "Stuffing, and why packets beat piles",
        paragraphs: [
          "Empirical pattern since long-context shipped: retrieval or a tight packet often beats naive stuffing, especially when the needle is a number in a pile of similar numbers. Models attend more reliably to the start and the end of a long prompt. The middle is where a disputed amount likes to hide. Bigger windows reduced some of this. They did not delete it, and they made it easier to get lazy.",
          "Long context is a capability. Stuffing is a practice. Do not equate them. 'We put the whole SharePoint in the window' is a cost problem and a quality problem wearing a feature label. Prefer fetch-by-key. Prefer a packet with labeled fields. If you must search, retrieve a few chunks, not a room.",
        ],
      },
      {
        title: "Prompt cache is not a memory product",
        paragraphs: [
          "If the playbook and schema sit at the front of the prompt and reuse across thousands of exceptions, caching makes the harness cheap: you pay full freight once, then discounted reads on the stable prefix. If every case is a unique novel, you pay full freight every time. This is one reason playbooks are not bureaucracy. They are unit cost. Folklore cannot be cached.",
          "Cache is also data at rest. Know where it lives. Design the prompt like a form, not like a conversation with a person who needs the whole biography every time. A stable prefix is an operating asset. A unique essay per case is an operating tax.",
        ],
      },
      {
        title: "Compaction is how numbers die",
        paragraphs: [
          "Overnight loops and long tool chains summarize to stay in the window. Identifiers, amounts, and gate status are exactly what summaries drop. Harnesses keep source packets and write durable fields. If an agent 'forgot' a gate, inspect what fell out of context before you blame intelligence.",
          "What to refuse: critical IDs and amounts that live only in chat history or a rolling summary; 'the window is big enough now' as a reason not to have a case object; compaction without a rule for what must never be dropped. Long context is permission to hold a better packet. It is not permission to skip the system of record.",
        ],
      },
    ],
    mixup: {
      wrong:
        "A million-token dump treated as memory of the company. Amounts that live only in a rolling summary. Cache sold as the agent 'learning' the playbook.",
      right:
        "Tight packet per case. Durable facts as fields. Playbook as a cacheable prefix. Summaries never the only copy of money or IDs.",
    },
    check: [
      {
        q: "A fact must survive a new session and an audit. Where can it not live alone?",
        a: "In the window or the chat. It has to be a field or a note on the case.",
      },
      {
        q: "Why can stuffing a large window make quality worse?",
        a: "Attention thins. The middle is underweighted. A number in a pile of numbers is the classic miss.",
      },
      {
        q: "Why does a written playbook change the token bill?",
        a: "A stable prefix can be cached. Folklore and a unique essay per case cannot.",
      },
    ],
    next: "grounding",
    relatedUseCases: ["vendor-onboarding-packs", "audit-evidence-requests"],
  },
  {
    slug: "grounding",
    order: 5,
    part: "Mechanism",
    minutes: 16,
    title: "How a fact gets in",
    blurb:
      "Truth has to enter the loop somehow. For a queue, a fetched packet beats a vector store of folklore. Search is for when you do not know the object.",
    lede:
      "In 2024 the industry argued RAG versus long context as if that were the whole product. The operational question is narrower: how does the correct PO, policy, or receipt get into this case, and how does the result get back into the ERP. Search over embeddings is one door. A tool that gets invoice 8812 is usually a better door. A million-token dump of SharePoint is a common way to look busy.",
    youWill: [
      "Name the three doors: fetch by key, search, dump.",
      "Default to fetch when the object ID is known.",
      "Treat RAG as search, not as memory, and not as the ERP.",
      "Name a winner when sources conflict. Money lives in the system of record.",
    ],
    sections: [
      {
        title: "Three doors",
        paragraphs: [
          "Fetch by key: you know the object. get_invoice(8812) returns live fields. Default for queues. Writes go back the same door. Search (RAG): you embed documents, retrieve chunks, stuff them in the prompt. Useful when you do not know which object you need. Dump: you paste a room into the window. Sometimes works. Often loses the middle, costs tokens, and goes stale.",
          "When the invoice ID is already known, a vector lookup is the wrong door. Grounding means the fact entered the loop from a real source this call. It does not mean a pile of PDFs exists somewhere.",
        ],
        split: [
          {
            title: "Fetch",
            body: "Known ID. Live fields. Default for exception queues.",
          },
          {
            title: "Search",
            body: "Unknown object. Chunks enter the prompt. Policy Q&A. Dangerous as a fake ERP.",
          },
        ],
      },
      {
        title: "RAG is search, not memory",
        paragraphs: [
          "It helps policy Q&A and 'which SOP applies.' It fails when chunks split a table, when access control is an afterthought, or when the answer is a live ERP field that changed this morning. Stale retrieval is a silent ops failure: the agent cites last quarter's Incoterms and files a packet that would have been right in March.",
          "'We have a knowledge base' is not 'the agent can act.' A searchable pile of PDFs is not a system of record. It is also not a permission model. If embeddings were built without the same ACLs as the source, you just built a bypass. Stopping at 'RAG' has not asked which object is authoritative when search and ERP disagree.",
        ],
        example: {
          title: "8812, the wrong door",
          body: "The case already has invoice 8812. The loop embeds the AP policy folder and retrieves a chunk about tolerances. Useful as policy. Useless as the match-break packet. get_match_break(8812) is the grounding step. The policy chunk must not override a gated amount.",
        },
      },
      {
        title: "Tools are grounding with a side effect",
        paragraphs: [
          "A read tool returns the live packet. That is grounding plus the start of work. For exception queues this dominates RAG. You still might retrieve a playbook slice or a prior disposition. The system of record remains the source of truth. Long context is a third door: put the packet in the window because you already have it. Do not use a giant window to avoid fetching the live object.",
          "If the real process lives in forwards and tribal rules, neither RAG nor long context will save you. You will automate folklore faster. Write the playbook, then ground. When sources conflict, name the winner. ERP wins on identity and money.",
        ],
      },
    ],
    mixup: {
      wrong:
        "A vector store of PDFs treated as the ERP. 'The model read the contract room' as proof of a live match. Folklore embedded and called memory.",
      right:
        "Live objects fetched by key. Search reserved for unknown-document questions. An explicit winner when a chunk and a live field disagree.",
    },
    check: [
      {
        q: "You already know the invoice ID. Why is this not a vector lookup?",
        a: "The object is known. Fetch the live record. Search is for when you do not know which object you need.",
      },
      {
        q: "Policy chunk says one tolerance. ERP says another. Who wins?",
        a: "The system of record on money and identity. Name that rule. Do not let retrieval silently override a gate.",
      },
      {
        q: "What does grounding mean, precisely?",
        a: "The fact entered this call from a real source. Not that a corpus exists. Not that the window is large.",
      },
    ],
    next: "how-models-get-good",
    relatedUseCases: ["asn-invoice-po-recon", "lease-critical-date-chase"],
  },
  {
    slug: "how-models-get-good",
    order: 6,
    part: "Models",
    minutes: 16,
    title: "How models get good",
    blurb:
      "Pretrain is the wall you buy. Post-train is the steering wheel. 'Our model' is usually a layer. The next two units are inference and how you buy the weights.",
    lede:
      "A frontier model is not a person who went to school on your industry. Pretraining predicts tokens on a huge public (and licensed) corpus. Labs then post-train with instruction data, preference methods, and sometimes reinforcement on checkable work. That stack is why a general model can draft a chase email on day one, and why 'our proprietary AP model' is often a prompt pack on someone else's base. Inference spend and how you host the weights are the next two units.",
    youWill: [
      "Split frozen base from the layer on top, and know which one you are paying for.",
      "See post-train as steering, not as a new physics.",
      "Treat 'custom model' as prompt, index, adapter, or distilled student until proven otherwise.",
    ],
    sections: [
      {
        title: "Pretrain is the expensive miracle",
        paragraphs: [
          "This is the capital and data wall. You will not replicate it inside a mid-market operator, and you should not try. Capability, multilingual coverage, and 'it has seen a thousand invoice layouts' come from here. The 2024 to 2026 story did not replace pretrain. It added other knobs. You still buy the wall.",
          "A claim of a frontier-class base trained on your industry is almost always describing a layer: a prompt, an index, a LoRA, a distilled student. The base model name is the fact that settles it. If it will not be named, the product is fog, or a bundle that cannot be retendered.",
        ],
      },
      {
        title: "Post-train is the steering wheel",
        paragraphs: [
          "Instruction following, refusal style, tool-use habits, and 'think before you answer' behaviors are mostly post-train. The gain that mattered for operators was reinforcement on checkable work (code that runs, math that verifies, a tool schema that parses), not a mystical industry tutor. Domain fine-tunes can help a stable schema. They also overfit and go stale when the vendor layout changes.",
          "For many ops jobs, a strong general model plus a playbook beats a fragile specialist until volume and format are extremely boring. 'Fine-tuned on our data' is not automatically better. It can be worse on the ugly tail, and it can be a leakage event. The set, the refresh cadence, and whether the specialist still needs the same gates are the facts that matter.",
        ],
        rows: [
          {
            label: "Prompt pack",
            body: "Cheapest layer, fastest to change, no moat by itself.",
          },
          {
            label: "Retrieval index",
            body: "A search corpus. Stale unless owned.",
          },
          {
            label: "LoRA / SFT",
            body: "A specialist on a schema. Can help. Can rot.",
          },
          {
            label: "Distilled student",
            body: "Cost play. Eval it on your tail, not on a lab slide.",
          },
        ],
      },
      {
        title: "What the next units pick up",
        paragraphs: [
          "Inference spend (thinking tokens, serving, batch versus interactive) is its own knob. How you buy or host the weights (closed API, open weights, quantization, documents as pixels) is a separate operating choice. Neither is a reason to skip the wrap from units 2 through 5. The model is a component you should be able to swap.",
        ],
      },
    ],
    mixup: {
      wrong:
        "Paying moat prices for a prompt. Decks that imply customer data trained a frontier-class base. Inability to name or swap the base.",
      right:
        "You know the layer. The base can be swapped. Customer traces are not in a trainer by accident. Playbooks still do the ops design.",
    },
    check: [
      {
        q: "A vendor says 'our proprietary AP model.' What do you need to know?",
        a: "Which base, which layer (prompt, index, adapter, distill), whether the base can be swapped, whether customer traces entered a trainer.",
      },
      {
        q: "Why will you not rebuild pretrain inside a mid-market operator?",
        a: "It is the capital and data wall. You buy it. Capability on messy language comes from here.",
      },
      {
        q: "Is a LoRA on a few thousand invoices a new kind of truth?",
        a: "No. It is a specialist layer. It can help a schema. It can rot. It still needs evals and gates.",
      },
    ],
    next: "inference",
    relatedUseCases: ["expense-report-exceptions", "vendor-coi-chase"],
  },
  {
    slug: "inference",
    order: 7,
    part: "Models",
    minutes: 18,
    title: "Inference",
    blurb:
      "The model is already trained. Inference is what you pay at run time: tokens, thinking, latency, batch versus interactive, routing. It is a cost and quality knob, not a personality.",
    lede:
      "Train-time compute built the base. Inference is every call after that: input tokens, output tokens, sometimes extra 'thinking' tokens, GPU or API time, retries. Since 2024, some of the scaling is 'think longer at inference,' not only 'train a bigger brain.' You pay in latency and dollars. Overnight queues can use batch. A reviewer waiting on a screen cannot. Routing easy types to a cheap model is one of the few honest platform ideas.",
    youWill: [
      "Treat thinking budget as a per-job setting with cost on the eval.",
      "Split batch inference from interactive HITL.",
      "See serving, retries, and thinking traces as the inference bill, not only the list price per token.",
      "Cascade: cheap unless the case earns expensive.",
    ],
    sections: [
      {
        title: "What inference actually is",
        paragraphs: [
          "The weights are frozen (or pinned). A request arrives: prompt plus packet. The serving stack tokenizes, runs the forward pass, samples, streams or returns the completion. You pay for input tokens (playbook plus packet), output tokens, and the hardware or API that held them. Retries and tool round-trips multiply that. A 'cheap' model that retries five times is not cheap.",
          "Interactive inference is a person or a gate waiting. Batch inference is a queue that can wait minutes or hours for a lower unit price. Overnight missing-info chases can batch. A collector staring at a draft cannot. Mixing those two as one 'model cost' hides the product.",
        ],
      },
      {
        title: "Thinking is a knob, not a brand",
        paragraphs: [
          "Test-time compute lets the base search longer before it answers: more tokens 'in its head,' sometimes a visible chain. 'Smarter' now sometimes means 'slower and pricier per case.' Evals should include dollars and seconds, not only quality. A longer guess can still be ungrounded. Thinking traces are logs. They can leak fragments of the packet. Treat them like logs: retain, access-control, do not paste into Slack.",
          "Helps: multi-hop packets, conflicting documents, novel types. Waste: applying a tolerance rule, classifying a break you already eval well. Do not think hard to apply a rule. Pin thinking budget like you pin a model version.",
        ],
        example: {
          title: "8812, the bill",
          body: "Missing-GR classification is a closed job you already eval. A flagship reasoning SKU on every 8812-like row spends thinking tokens to apply a rule. Put thinking on the commercial-dispute tail. Measure the cascade on the frozen set with cost attached.",
        },
      },
      {
        title: "Routing and the quiet death of unit economics",
        paragraphs: [
          "Cascade: cheap model classifies; only the ambiguous tail calls a reasoner or a human. One logo for every job is procurement comfort, not a cost curve. Latency that blows a same-day SLA because every chase waited on a reasoner is an inference design failure, not a model failure.",
          "What fails in operations is quiet: quality on the golden path looks fine, the unit cost does not clear, and nobody split the bill by type. Inference is where that bill is made.",
        ],
      },
    ],
    mixup: {
      wrong:
        "Flagship reasoning as default because it won a math leaderboard. Thinking left on for every row. Traces in a shared folder. Interactive and batch priced as one line.",
      right:
        "Thinking per-job, measured with cost and latency. Easy types never pay for it. Batch where the product can wait. Traces controlled like logs.",
    },
    check: [
      {
        q: "When is test-time thinking waste?",
        a: "When the playbook is a short decision tree a fast model plus validators can do.",
      },
      {
        q: "Why batch a missing-info chase but not a live HITL review?",
        a: "The chase can wait for cheaper inference. The reviewer cannot. Those are different products.",
      },
      {
        q: "What should an eval attach to a thinking-budget change?",
        a: "Quality, dollars, and seconds, by type. Not only a nicer golden path.",
      },
    ],
    next: "open-and-closed",
    relatedUseCases: ["trade-deduction-management", "freight-invoice-audit"],
  },
  {
    slug: "open-and-closed",
    order: 8,
    part: "Models",
    minutes: 18,
    title: "Open weights, closed APIs, documents",
    blurb:
      "Closed versus open is residency and ops, not virtue. Pin versions. Quantize and distill the boring middle. Pixels are a tax. Prefer structured feeds when they exist.",
    lede:
      "Closed APIs still set the ceiling for messy language and tool use, with a contract instead of a GPU farm. Open weights (the usual meaning of 'open source' in this stack) can run in your VPC, be frozen, and get cheap at volume, while shifting serving and patching onto you. Quantization and distillation are narrower bets. Vision is another encoder: the model sees patches, not 'the invoice.' None of this deletes gates.",
    youWill: [
      "Separate closed API, open weights, and 'open source' as a license slogan.",
      "Pin versions and treat a swap as a measured event on the frozen set.",
      "Route the boring middle to small, quantized, or distilled models.",
      "Store extracted fields as data; treat brochure PDFs as demos.",
    ],
    sections: [
      {
        title: "Closed versus open is residency and ops",
        paragraphs: [
          "Neither is automatically safer. A misconfigured self-host leaks. A sloppy employee pasting into a consumer chatbot leaks. Closed APIs are how most operators should start: a DPA, a gateway, no GPU farm. Open weights are a move you make when residency, freeze-for-audit, or unit cost at huge volume demands it, and when you actually have the people to serve and patch.",
          "'Open source' in a deck often means open weights (you can download the parameters) and sometimes means an open license. Those are not the same as an open training set, and not the same as a model you can inspect for truth. Mixture-of-experts serving and distillation are why some open (and cheap closed) models looked good on a price slide in 2025: more capacity per dollar, not a new kind of truth. Run your frozen set at the new price, including the tail.",
        ],
        split: [
          {
            title: "Closed API",
            body: "Ceiling on messy language and tools, contract and DPA, less serving burden. Pin the version. Watch the bill and the region.",
          },
          {
            title: "Open weights",
            body: "Residency, freeze, volume economics. You own serving, patching, and eval on every upgrade. Misconfig is your incident.",
          },
        ],
      },
      {
        title: "Small, quantized, distilled, pinned",
        paragraphs: [
          "Allowlisted classification, language detection, 'is this a duplicate' once features exist. Distilled students can take that middle at a fraction of flagship cost. Do not quantize away the model that has to read a hostile deduction letter unless the eval says you still pass. A cheaper model that adds HITL is not cheaper.",
          "Model APIs drift. A silent upgrade can change tone, tool-calling, or refusal. Production means pinning, changelog review, and rerunning the frozen set. 'Always latest' is a demo habit. Open-weight upgrades are the same story with more of the work on you.",
        ],
      },
      {
        title: "Documents: pixels are a tax",
        paragraphs: [
          "Use cases on this site are full of certificates, bills of lading, receipts, and portal screenshots. Frontier models can look at a page. Tables break, stamps cover amounts, iPhone photos of packing lists are not brochure PDFs. OCR still exists. Either way, error is a rate you measure.",
          "Once you have a date and a limit, put them on the vendor file as fields. A paragraph that says 'COI looks fine' is not a system of record. If a trading partner can send structured data (EDI, an API), take it. Using a vision model to re-read what used to be an EDI feed is theater. Generation belongs on the exception, not on the happy structured path.",
        ],
        example: {
          title: "8812, the pile",
          body: "The demo PDF is clean. Production is a photo of a packing list. Put the ugly pile in the eval. Extracted PO and amount live as fields, checked against the ERP, before any write.",
        },
      },
    ],
    mixup: {
      wrong:
        "Open weights as automatically safer. Always-latest in production. A clean PDF demo as proof for production photos. Amounts that live only in a generated paragraph.",
      right:
        "Harness first, model second, pin the version. Ugly documents in the eval. Fields on the record. Structured feeds when they exist.",
    },
    check: [
      {
        q: "When do open weights earn their ops burden?",
        a: "Residency, freeze-for-audit, or unit cost at huge volume, and a team that can serve and patch.",
      },
      {
        q: "What did the last model swap do, if you ran it honestly?",
        a: "It moved unsafe-write rate (and cost, latency) on the frozen set. If you cannot say, you did not swap. You hoped.",
      },
      {
        q: "After extraction, where should the limit date live?",
        a: "As a field on the vendor file, checked against the ERP, not only in a paragraph.",
      },
    ],
    next: "copilots-and-automations",
    relatedUseCases: ["vendor-coi-chase", "customs-entry-document-packs"],
  },
  {
    slug: "copilots-and-automations",
    order: 9,
    part: "Work",
    minutes: 18,
    title: "Automations, copilots, autopilots",
    blurb:
      "RPA repeats a click path. A copilot sits next to a person. An autopilot owns volume with gates. A workflow is a designed path. Chat waits for a question. Only some of these own a queue.",
    lede:
      "These words get filed under AI. They are not the same product. Automation in the RPA sense is a recorded click path. A copilot is leverage for an expert who still owns intake, judgment, and the write. An autopilot (the useful meaning) is a background loop with an allowlist: volume moves, humans keep gates. A workflow is a designed path with generative steps inside. Chat is pull. If a human still pastes every case into a box, you bought a copilot.",
    youWill: [
      "Tell RPA, copilot, autopilot, workflow, chat, and agent apart.",
      "See why a Copilot seat count is not a queue.",
      "Prefer a workflow when the path is known.",
      "Treat 'we automated AP' as a claim that needs an artifact: clicks, a sidecar, or a gated write.",
    ],
    sections: [
      {
        title: "Five shapes, different labor math",
        paragraphs: [
          "Chat is pull: a person has a question, a model answers, nothing in the mailbox moved unless the person moved it. Copilot is a sidecar on an expert: drafts, summaries, suggested codes. The person still owns the queue. Autopilot is background volume with gates: intake is already a case, the loop runs, HITL is typed. Workflow is a designed path (fetch, check, chase, park) with generation invoked where language is the uncertainty. Agent, in the next unit, is a loop that chooses the next tool because the step is not known.",
          "Background volume is where labor actually moves. Sidecars make experts faster and rarely clear a shared inbox on their own. A headcount story needs a queue shape, types, and an allowlist, not a seat count. Expert leverage can be a copilot, priced honestly as minutes saved per expert, not as a replaced team.",
        ],
        rows: [
          {
            label: "RPA / click automation",
            body: "Repeats a UI path. Dies when a button moves or MFA appears. Residual, not the platform.",
          },
          {
            label: "Chat",
            body: "Pull interface. No queue. Useful for Q&A. Not an ops program.",
          },
          {
            label: "Copilot",
            body: "Sidecar on an expert. Person owns intake, judgment, and the write.",
          },
          {
            label: "Autopilot / workflow",
            body: "Background path, typed gates. Volume can move. This is the ops product when the SOP is known.",
          },
        ],
      },
      {
        title: "RPA is not an agent",
        paragraphs: [
          "RPA was sold as a labor program and often became a night shift of broken selectors. An API-using loop can handle a new email format, then write the ERP through a real connector. That is a different architecture. A computer-use agent that clicks the legacy screen is RPA with a language model steering the mouse. Sometimes that is the only path into a dead system. It should be the residual, not the architecture.",
          "If there is no language and no exception tail, you may not need generation. You need a cleaner rule, a better feed, or a staffed queue. Mixing matching and narrative into one chatbot is how you get slower matching and unaccountable prose.",
        ],
      },
      {
        title: "Write the path when you know the path",
        paragraphs: [
          "Most of the use cases on this site are workflows with a generative step inside: classify this break, draft this chase, assemble this packet. The model does not get to invent a fourth path that pays the vendor. That is a feature. Paying a model to rediscover a known SOP every night is how token bills rise and traces get noisy.",
          "In practice this gets over-claimed: Copilot was rolled out, a few power users are happier, the shared inbox is the same size, and the story becomes 'we deployed AI in finance.' Price the sidecar as a sidecar. Price the autopilot as auto share by type.",
        ],
        example: {
          title: "8812, the shape",
          body: "If AP still pastes 8812 into a box, that is copilot or chat. If 8812 is already a case, the loop fetches, classifies missing-GR, drafts template A, and parks short-pay, that is a workflow with an autopilot slice. If the loop freely chooses among ten tools because the SOP was never written, that is an agent asked to invent the path.",
        },
      },
    ],
    mixup: {
      wrong:
        "A Copilot seat count as the ops program. A flowchart rebuilt as an unconstrained loop because 'agent' sells. RPA asked to parse novel mail. 'We automated AP' when the artifact is a recorded click path.",
      right:
        "Chat and copilot help the person who showed up. Autopilot and workflow can own volume. Known steps are written as a path. Clicks are residue.",
    },
    check: [
      {
        q: "Intake is still a person pasting into a box. Which shape did you buy?",
        a: "Chat or copilot. Not a queue. Volume will not move by itself.",
      },
      {
        q: "The SOP is fetch, check, chase, park. Should this be an unconstrained agent loop?",
        a: "No. Write the path. Invoke the model where language or classification is the uncertainty.",
      },
      {
        q: "What is the honest price of a copilot?",
        a: "Minutes saved per expert, on tasks they already do. Not a replaced team.",
      },
    ],
    next: "tools-apis-mcp",
    relatedUseCases: ["ar-collections-chase", "timesheet-client-approvals"],
  },
  {
    slug: "tools-apis-mcp",
    order: 10,
    part: "Work",
    minutes: 18,
    title: "Tools, APIs, CLIs, MCP",
    blurb:
      "The model proposes. Software executes. An API is a contract, a CLI is a contract with stdout, MCP is a plug. Permissions are the product. Integration is not a playbook.",
    lede:
      "Without tools, a model only emits text. With tools, it can request get_po, send_template, or run a CLI. The application runs that request with real credentials. That split is the whole reliability and security story: propose versus execute. APIs, CLIs, and MCP are three ways to expose a contract. None of them decides whether send_payment exists. You do.",
    youWill: [
      "Keep propose and execute in different places.",
      "Treat API, CLI, and MCP as plumbing with the same allowlist problem.",
      "Demand live-ID validation and idempotent writes.",
      "See 'we integrate' and 'we speak MCP' as incomplete until the tool list exists.",
    ],
    sections: [
      {
        title: "The model does not execute",
        paragraphs: [
          "Function calling means the model emits a structured request: tool name plus arguments. Your software decides whether to run it. That is the last place to kill a hallucinated vendor key, a send to the wrong mailbox, or a SQL string that should never have been a tool. If execute is 'whatever the model said,' you have given the weights a service account.",
          "A good trace shows proposed call, validation result, execute or refuse, side effect. A chat screenshot shows prose. 'The model can use tools' is not 'the tools are safe.' Capability to call is not a permission model.",
        ],
        example: {
          title: "8812, the contract",
          body: "The model proposes file_note(invoice_id=8812, text=...). Software checks that 8812 exists, that the tool is allowlisted for missing-GR, that the call is idempotent. Then it executes. If the model proposes 8819 because 9 is a likely digit, validation refuses.",
        },
      },
      {
        title: "A tool is a contract; an API is the preferred door",
        paragraphs: [
          "Name, argument schema, permission scope, side effect. Small tools. 'Do AP' is not a tool. 'Fetch match-break packet' is. Validate arguments against live IDs before execute. Reads are cheap. Writes are the product. If what happens when the same tool call runs twice cannot be said, there is no write path.",
          "A stable API is the architecture for ops: logs, permissions, speed, evals you can freeze. You can sample and incident-review 'called post_note(id=8812).' You cannot do that cleanly with a click video when the CSS changed.",
        ],
        rows: [
          {
            label: "API",
            body: "Stable contract, auth, idempotency, fields. Default door into the system of record.",
          },
          {
            label: "CLI",
            body: "Argv in, stdout out. Same allowlist problem. Do not hand the model a raw shell. Allowlisted binaries, parsed output, no concatenation of untrusted strings into the command line.",
          },
          {
            label: "MCP",
            body: "A protocol so tools can be discovered and called across products. A plug, not a playbook. Not an allowlist. Not an eval.",
          },
        ],
      },
      {
        title: "CLIs and MCP are still propose versus execute",
        paragraphs: [
          "Coding agents wrap git, gh, kubectl, npm. Finance agents should not wrap 'whatever is on the PATH.' A CLI is a tool whose interface is arguments and text. Schema the arguments. Parse the output. Ban shell interpolation of vendor mail into the command. The confused deputy is just as real: untrusted text that says 'run this curl to a new host.'",
          "MCP (and cousins) make tools portable the way a standard plug makes chargers portable. Useful. Stopping at 'we speak MCP' or 'we integrate with NetSuite' has not asked what the agent is allowed to do once connected. The tool list is the allowlist. If it cannot be produced, there is a demo that called one happy function. God tools ('run SQL', 'send any email', 'generic HTTP', 'raw bash') always look efficient in a demo. They are how injection becomes an incident.",
        ],
      },
    ],
    mixup: {
      wrong:
        "A god tool hoped into safety. MCP as evidence of control. 'We integrate' as the playbook. A CLI invoked as a raw shell string.",
      right:
        "Narrow tools, live-ID validation, idempotent writes, logged execute. API first. CLI allowlisted. MCP as plumbing.",
    },
    check: [
      {
        q: "Who should be allowed to send: the model, or the application?",
        a: "The application, after validation. The model proposes.",
      },
      {
        q: "Why is MCP not a control environment?",
        a: "It is a way to expose tools. Permissions, allowlist, and eval still have to exist.",
      },
      {
        q: "What makes a CLI safe enough to be a tool?",
        a: "Allowlisted binary, schema for args, parsed stdout, no untrusted string in the command line, the same logs as an API write.",
      },
    ],
    next: "agents",
    relatedUseCases: [
      "detention-appointment-exceptions",
      "freight-invoice-audit",
    ],
  },
  {
    slug: "agents",
    order: 11,
    part: "Work",
    minutes: 16,
    title: "Agents: a model in a loop",
    blurb:
      "An agent is next-token prediction plus tools plus a stop condition, repeated. Errors compound. Caps, parking, and verification are the loop, not ambition.",
    lede:
      "Once you have tools, you can loop: observe, act, check, repeat. That is the honest meaning of 'agent': a model choosing the next tool until a stop. It earns its keep when the next step is genuinely uncertain. It burns tokens and invents sends when the path was always fetch, check, chase, park. Unbounded autonomy is how you get retry storms and duplicate chases.",
    youWill: [
      "Define an agent as a loop with tools and a stop, not as a personality.",
      "Cap steps, wall-clock, and retries because errors compound.",
      "Park on unknown instead of 'trying to be helpful' overnight.",
      "Reserve unconstrained choice-of-tool for the unknown tail.",
    ],
    sections: [
      {
        title: "The loop is the product",
        paragraphs: [
          "Each step is still unit 2: sample a tool call or a token. The new fact is repetition. A wrong classification sends the wrong chase, which poisons state, which sends a worse chase. Caps on steps, timeouts, and park-on-unknown exist because of this. Each extra tool call is another chance to invent an ID. Idempotency is how a storm does not become duplicate payments.",
          "Stop conditions are design: completeness reached, gate required, cap hit, schema fail, human parked. 'The model will know when to stop' is not a stop condition. Lifecycle in the harness (pickup, pause, resume, close) is how two runs do not double-chase.",
        ],
        example: {
          title: "8812, unbounded",
          body: "Without a cap, the loop 'tries to be helpful' overnight, sends three chases, and files a note that the case is closed. The SOP was one chase then park. The agent invented a fourth path. Lifecycle and a cap were the control. The narrator was not.",
        },
      },
      {
        title: "When the loop earns its keep",
        paragraphs: [
          "Unknown tail: novel layouts, mixed intents in one thread, 'this does not match any type.' Even then the loop needs a stop, a cap, and a human parking lot. Known SOP: write the path (unit 9). Do not hire a loop to find fetch-check-chase again every night.",
          "Era one was a human supplying the loop by pasting, clicking, and copying into the ERP. Era two is software supplying it. A new model behind a chat box is still era one: the person is the harness.",
        ],
      },
    ],
    mixup: {
      wrong:
        "Agent as a brand for a chatbot. No step cap. 'It will stop when it is done.' A known SOP rebuilt as a free-roaming loop.",
      right:
        "Loop, tools, stop, cap, park. Known path written. Tail allowed to choose among a small tool set.",
    },
    check: [
      {
        q: "What is an agent, mechanistically?",
        a: "A model in a loop with tools and a stop condition. Not a personality pack.",
      },
      {
        q: "Why cap the loop?",
        a: "Errors compound. Unbounded retries are storms and duplicate sends.",
      },
      {
        q: "When is an unconstrained loop the wrong shape?",
        a: "When you can write the path. Then it is a workflow with generative steps.",
      },
    ],
    next: "multi-agent",
    relatedUseCases: ["claim-intake-missing-info", "bank-rec-exceptions"],
  },
  {
    slug: "multi-agent",
    order: 12,
    part: "Work",
    minutes: 16,
    title: "Multi-agent architectures",
    blurb:
      "Split generator and checker. A graph is for real branches. An org chart of agents is usually theater. Headcount of models is not a control.",
    lede:
      "Multi-agent 'crews' are sometimes a real split of jobs and permissions: one proposes a chase, one checks it against the playbook before send. They are sometimes five models arguing in a channel while the queue waits. Add a graph (fan-out, fan-in, a human node) when the workflow actually has those shapes, not because a framework made it easy to draw boxes.",
    youWill: [
      "Split propose and approve as permissions, not as costumes.",
      "Keep the checker from sending.",
      "Justify a graph with real branches, not with a demo that needed boxes.",
      "See 'manager agent' as a title, not as a control, unless it owns a different tool set.",
    ],
    sections: [
      {
        title: "Generator and evaluator",
        paragraphs: [
          "Same model twice with two prompts is better than nothing. Better: checker cannot send, only reject or pass. Best: checker is partly deterministic (schema, duplicate, tolerance). Humans are the evaluator on the gated tail. Split propose and approve the way you would split them for a junior hire. Do not give both badges to the same prompt and call it a crew.",
          "Separation of duties is about permissions. Multi-agent is about topology. You can have one without the other. You want the permissions. The human node is an evaluator with write permission, in the system of action, not a fifth model with a manager title.",
        ],
      },
      {
        title: "When a graph is real",
        paragraphs: [
          "Fan-out: pull TMS, WMS, and mail in parallel. Fan-in: assemble packet. Conditional: if VIP, human. That is a workflow graph with optional generative nodes. A 'research agent, writer agent, critic agent, manager agent' for missing GR is a play. Frameworks made the play easy to draw. They did not make it a control.",
          "Write permission sits on one narrow path. If you can write the path, write the path. Do not hire four models to find it again. Token burn and duplicate sends dressed up as an org chart are the failure.",
        ],
        example: {
          title: "8812, theater",
          body: "Missing GR is fetch, check completeness, chase template A, park. Four named agents debating in a channel is the same SOP with extra samples and no extra control. A real graph: fetch ERP and mail in parallel, then a human node if amount exceeds tolerance.",
        },
      },
    ],
    mixup: {
      wrong:
        "Multi-agent as the architecture because the demo needed a diagram. A critic that can also send. Headcount of agents as a control.",
      right:
        "Topology matches the work. Checker cannot send. Deterministic checks where they exist. Graphs for real fan-out and gates.",
    },
    check: [
      {
        q: "Is the checker allowed to send?",
        a: "No. That is the point of the split.",
      },
      {
        q: "When is a graph justified?",
        a: "Real branches: parallel fetches, a human node, a type fork. Not an org chart of labels.",
      },
      {
        q: "What is 'manager agent' if it has the same tools as the worker?",
        a: "A costume. Permissions did not change.",
      },
    ],
    next: "computer-use",
    relatedUseCases: ["claim-intake-missing-info", "bank-rec-exceptions"],
  },
  {
    slug: "computer-use",
    order: 13,
    part: "Work",
    minutes: 18,
    title: "Computer use",
    blurb:
      "Clicking a GUI with a model is residual RPA. Prefer APIs. Public benches (CUA, OSWorld) are weather, not a forecast for your portal.",
    lede:
      "From late 2024, labs shipped models that can look at a screen and click. The demo is always a cursor moving through a website like a person. That looks like an answer to 'our TMS has no API,' and sometimes it is, but it is also RPA with a language model on the joystick. It fails the way RPA failed, plus wrong-click confidence. APIs are the architecture. Clicks are the residue.",
    youWill: [
      "Describe computer use as screenshot or DOM, action, loop.",
      "Treat public benches as weather, not as your exception queue.",
      "Pin URL, cap steps, keep payment and MFA out of the action space.",
      "Schedule replacement by a connector. Residual is a date.",
    ],
    sections: [
      {
        title: "What computer use actually is",
        paragraphs: [
          "The model does not magically inhabit the OS. A harness takes a screenshot or a DOM/accessibility tree, asks the model for the next action (click, type, scroll, wait), executes it, and loops. Grounding (where is the button, did the click land) is the hard part. Latency is per action, often seconds, so a ten-step portal is a long, expensive, fragile run. MFA, canvas-heavy ERPs, nested iframes, and virtualized grids are where the loop gets lost.",
          "The same weights look brilliant in a curated demo and lost on a real TMS. SOTA on a public bench often moved because the harness got better (retries, verifiers, pinned URLs), not only because the brain got bigger. Quote the harness, or you are quoting a vibe.",
        ],
        rows: [
          {
            label: "Perception",
            body: "Screenshot, DOM, or accessibility tree. Screenshots generalize and are slow. DOM dies on canvas and virtualized grids.",
          },
          {
            label: "Action space",
            body: "Click, type, scroll, wait. One wrong click sends the agent into a settings page it cannot leave without a stop.",
          },
          {
            label: "Grounding",
            body: "Map 'the Submit button' onto pixels or a node. A person does this without thinking. The model often clicks the adjacent control.",
          },
        ],
      },
      {
        title: "Benches are weather",
        paragraphs: [
          "OSWorld is a full desktop. WebArena and kin measure browsers. OpenAI's CUA eval is the computer-using-agent number on Operator-class slides. Coding benches are another sport. Read those numbers as weather, not as a forecast for your exception queue. Humans still finish a much larger share of the tasks. A vendor quoting a bench without naming the harness, the action space, or whether retries were allowed is quoting a vibe.",
          "A model that patches a repo is not thereby a model that can clear AP in Dynamics. Do not import a leaderboard percentage into a decision.",
        ],
      },
      {
        title: "APIs win; clicks are residual",
        paragraphs: [
          "Stable contracts, logs, permissions, speed, evals you can freeze. A trace that says post_note(id=8812) instead of a video of a cursor. If the plan is to drive the production UI like a human for every exception, the purchase is a night shift of broken selectors with a better narrator.",
          "Honest residual: a government portal with no API, a one-off carrier site, a month of bridging. Pin the start URL. Cap steps and wall-clock. Never put payment, password, or MFA in the action space. Schedule replacement by a real connector. If the demo was a cursor video, label it residual, or label the product as era-one theater.",
        ],
        example: {
          title: "8812, the GUI",
          body: "NetSuite has an API for notes. Clicking through the invoice screen for every 8812 is architecture by demo. A carrier portal with no API, twelve times a week, pinned URL, capped steps, kill date when the connector ships: residual.",
        },
      },
    ],
    mixup: {
      wrong:
        "Production architecture that is a model clicking the ERP. A bench percentage as the eval. No replacement date. Payment in the action space.",
      right:
        "APIs as the architecture. Clicks as residue with a pin, a cap, monitoring, and a kill date. Benches as weather.",
    },
    check: [
      {
        q: "What is the system of action: an API, or a model clicking the GUI?",
        a: "If it is the GUI, you are counting a demo harness, not a queue, unless it is a scoped residual.",
      },
      {
        q: "Why do public CUA numbers not underwrite your portal?",
        a: "Different tasks, different harness, different action space. Weather, not forecast.",
      },
      {
        q: "What must never be in the action space?",
        a: "Payment, password, MFA, and wandering the public internet 'to be helpful.'",
      },
    ],
    next: "memory",
    relatedUseCases: [
      "property-work-order-vendor-chase",
      "prior-auth-packet-chase",
    ],
  },
  {
    slug: "memory",
    order: 14,
    part: "Work",
    minutes: 16,
    title: "Memory",
    blurb:
      "Window, retrieval, and the system of record are three different memories. Only one survives an audit. Most 'agent memory' products are caches.",
    lede:
      "Product decks say memory as if the agent were becoming an employee who was there last quarter. There are three layers: in-window (this run), retrieved (search over tickets and policies), and durable (a field on the vendor, the claim, the shipment). If the mismatch pattern matters next month, write it on the vendor file. Do not hope a memory vendor is your ERP.",
    youWill: [
      "Name the three memories and which one is the audit trail.",
      "Treat a memory product as a cache with write-through, or as a shadow ledger.",
      "Store prior dispositions as a table where the next human looks.",
      "See 'the agent learned' as a write, or as nothing.",
    ],
    sections: [
      {
        title: "Three memories, one audit trail",
        paragraphs: [
          "Window: this call's working set. Gone when the call ends, degraded if you stuffed or compacted it. Retrieval: search over tickets, policies, embeddings. Useful, stale unless owned, not a write. Durable: a field or a note on the object in the system of record, with an owner. Audit lives here. Calling all three 'memory' is how a cache gets treated as a ledger.",
          "Employees have memory. Agents have writes. A collector remembers that this customer only pays after a dispute ritual. Encode that as a suppress rule and a playbook tier, not as a mystical embedding. If the next human cannot see it in the system they already open, it does not exist for operations.",
        ],
        rows: [
          {
            label: "Window",
            body: "This run. Scratchpad. Compaction drops numbers. Not an audit trail.",
          },
          {
            label: "Retrieval",
            body: "Search over past tickets or policies. A cache of text. Can be stale. Cannot be the ledger.",
          },
          {
            label: "System of record",
            body: "Fields and notes on the vendor, claim, shipment. Survives sessions, audits, and new hires.",
          },
        ],
      },
      {
        title: "Memory products and prior dispositions",
        paragraphs: [
          "Cross-session preferences, reducing repeated questions, developer-agent context: fine in those domains. In order-to-cash, a second system of 'what we think we know' is how you get two truths and a reconciliation project. Preferences that affect money (pay terms, suppress rules, tolerances) are master-data changes, not chat memories.",
          "The use-case reports list memory as prior dispositions, vendor habits, partner tolerances. That is a table, not a vibe. Put it where the next run and the next human can see it. If the agent 'knows' a side agreement that collections cannot see, a dispute lands and nobody can reconstruct who promised what.",
        ],
        example: {
          title: "8812, learned",
          body: "The loop 'learns' Acme always short-pays freight. Write a note and a suppress rule on the vendor file. If that lives only in a vendor memory store, you have two truths.",
        },
      },
    ],
    mixup: {
      wrong:
        "The only memory is a vendor's black box or a chat transcript. Embeddings of folklore called institutional knowledge. Money-relevant 'memories' that never become master data.",
      right:
        "Learned facts are fields and notes with an owner. Any memory product is a cache with write-through to the object.",
    },
    check: [
      {
        q: "If the agent 'learned' something, where do you point?",
        a: "A field or a note in the system of record. If you cannot, it will not survive an audit or a new session.",
      },
      {
        q: "Why is a memory product not the ERP?",
        a: "It is usually a cache. Two truths, then reconciliation. Write-through or do not buy it for money fields.",
      },
      {
        q: "Where do prior dispositions belong?",
        a: "A table on the object the next human already opens.",
      },
    ],
    next: "harness-and-tracing",
    relatedUseCases: ["vendor-onboarding-packs", "rfp-response-assembly"],
  },
  {
    slug: "harness-and-tracing",
    order: 15,
    part: "Work",
    minutes: 18,
    title: "Harness and tracing",
    blurb:
      "Same model, different environment, different outcome. Instructions, tools, state, verification, lifecycle. A trace is the log. A screenshot is a designed frame.",
    lede:
      "A strong model in a chat box still skips steps, invents 'done,' and loses state. A harness is the working environment around the loop. A lot of 2024 to 2026 'the model got better at agents' was the environment. Tracing is how you see that environment work: proposed tool, arguments, validation, execute or refuse, latency, tokens. You cannot debug a queue from a screenshot. You cannot put a screenshot in an incident review.",
    youWill: [
      "Name the five parts of a harness.",
      "Demand a trace you could keep for any other system.",
      "See a babysat demo as a skipped harness.",
      "Treat traces as logs: retain, access-control, replay.",
    ],
    sections: [
      {
        title: "Five parts",
        paragraphs: [
          "Instructions: what good looks like, versioned, not a personality. Tools: the only actions, narrow and logged. State: the case in the system of record, not the chat. Verification: duplicate, tolerance, schema, 'did the send actually happen,' before the write. Lifecycle: pickup, pause, resume, close, so two runs do not double-chase.",
          "Same weights in a thin chat wrapper will skip a completeness check that the same weights will pass inside a harness that requires the check. 'We use the frontier model' is a component claim. If those five parts cannot be shown, the product is a prompt.",
        ],
        rows: [
          {
            label: "Instructions",
            body: "Playbook by type. Cacheable prefix if you designed it that way.",
          },
          {
            label: "Tools",
            body: "Narrow, validated, logged. Model proposes, app executes.",
          },
          {
            label: "State",
            body: "The case file. Amounts do not live only in the window.",
          },
          {
            label: "Verification",
            body: "Checks before writes. This is the product.",
          },
          {
            label: "Lifecycle",
            body: "Pickup, pause, resume, close. Caps and stop conditions.",
          },
        ],
      },
      {
        title: "What a trace contains",
        paragraphs: [
          "A screenshot proves a UI existed. A trace proves a loop ran: which tool was proposed, which arguments, whether validation fired, whether the write was allowlisted, whether it was idempotent, whether a human gate was required, latency, token counts, thinking traces if any. That is the log you would keep for any other system. Incident review is replay of this object, not a screen recording of a golden path.",
          "Live typing invites rescue. A replayed trace cannot be rescued without it showing. Ask for a recorded run from a date when nobody was steering. If the only success is the one happening in front of you, you have a performance, not a control environment. Demos skip verification. Reliability is whether the check ran and the gate held at 11pm.",
        ],
        example: {
          title: "8812, the log",
          body: "Trace: get_match_break(8812) -> packet; propose file_note; schema ok; allowlist missing-GR; execute; 1.2s; 4k input tokens cached. That is evidence. A screenshot of a chat bubble is not.",
        },
      },
    ],
    mixup: {
      wrong:
        "Success as a clever prompt and a hero watching the thread. A SOTA bench in a fat harness treated as your thin wrapper. A screenshot as an incident artifact.",
      right:
        "Five parts explicit, model swappable, traces replayable. Verification runs before writes, including at 11pm.",
    },
    check: [
      {
        q: "Same model, chat wrapper versus a harness that requires a completeness check. Why do outcomes differ?",
        a: "The environment changed. Verification is in the harness, not in the weights.",
      },
      {
        q: "What belongs in a trace?",
        a: "Proposed tool, arguments, validation, execute or refuse, gate, latency, tokens. Not a designed frame.",
      },
      {
        q: "Why is a babysat live demo not a trace?",
        a: "Rescue does not show. Replay from a date with no babysitter does.",
      },
    ],
    next: "hitl-and-guardrails",
    relatedUseCases: ["ap-invoice-exceptions", "customs-entry-document-packs"],
  },
  {
    slug: "hitl-and-guardrails",
    order: 16,
    part: "Control",
    minutes: 18,
    title: "Guardrails and human-in-the-loop",
    blurb:
      "Guardrails are software: schemas, allowlists, validators, rate limits. HITL is a person on typed actions. Autonomy is a dial by type. Reviews stay in the system people already open.",
    lede:
      "Human-in-the-loop is not an ethics poster. It is a control for which actions a model may take without a person, which it may only draft, and which it may never take. Guardrails are the software half of that: input and output constraints, allowlists, never-lists, rate and spend caps. Prompt-level 'do not pay' is style. Application-level gates are controls. Some gates are the business.",
    youWill: [
      "Separate guardrails (software) from HITL (a person).",
      "Treat autonomy as auto share by type, not as a slogan.",
      "Put reviews in the ERP, TMS, or claims OS, not in a side portal.",
      "Sample the auto path. Drift is normal.",
    ],
    sections: [
      {
        title: "Guardrails are software",
        paragraphs: [
          "A family, not a product name: constrained decoding and JSON schemas; allowlisted tools; validators (duplicate, tolerance, live ID); rate and spend caps on the gateway; redaction; topic or recipient blocks. They run every time, including at 11pm. They do not get tired. They also do not exercise judgment on a novel commercial dispute. That is why they are not a substitute for HITL on the hole next to the spike.",
          "A gate that lives only in the prompt is a style guide. Style guides do not survive a busy Tuesday. Smarter models still should not wire to a new account because an email asked.",
        ],
        rows: [
          {
            label: "Draft only",
            body: "Model proposes. A person sends. Default while the eval is thin.",
          },
          {
            label: "Allowlisted write",
            body: "Named action, named type, named cohort. Sampled. Idempotent. Logged. Guardrails still run.",
          },
          {
            label: "Always gated",
            body: "Money outside tolerance, GL overrides, legal, write-offs, coverage and clinical.",
          },
          {
            label: "Never a tool",
            body: "Send-anywhere, arbitrary SQL, payment to a new payee, MFA, passwords.",
          },
        ],
      },
      {
        title: "The dial is by type",
        paragraphs: [
          "Agents own volume. Humans own judgment. Volume types with a frozen eval and a narrow write go auto, then get sampled. Types that rhyme with the spike but are not stay gated. Money and novel commitments stay gated even when the prose is excellent. The dial moves when samples hold, not when a lab ships a new SKU.",
          "Report auto share by type. A blended 'the AI does AP' number hides that missing-GR notes are auto and short-pays are a mess. Unpack a single autonomy percentage until it is a type list: volume, auto share, park rate, unsafe-write rate, sample fail rate.",
        ],
        example: {
          title: "8812, the gate",
          body: "Missing-GR notes are allowlisted; guardrails still check IDs and duplicates. Short-pay that looks like missing GR is HITL. The reviewer sees the fetched GR status in the ERP, not a paragraph in a mailbox named 'AI exceptions.'",
        },
      },
      {
        title: "Reviews live in the system of action",
        paragraphs: [
          "If review is a side portal, it will be skipped under load, which is the same as no gate. Design the review as a packet: fetched fields, proposed action, why it parked. Tone-based approval is how HITL becomes theater. Sample even the auto path. Failures become new gold. Expanding the allowlist because the golden path looked good in a demo is how the dial lies.",
        ],
      },
    ],
    mixup: {
      wrong:
        "'Fully autonomous' with no types. A prompt that says do not pay. Review in a side portal. Skipping samples because it has been fine. Guardrails treated as HITL.",
      right:
        "Software guardrails on every write. HITL on typed holes. Reviews in existing systems. Samples on the auto path. Scoreboard by type.",
    },
    check: [
      {
        q: "Is 'do not pay' in the system prompt a control?",
        a: "No. It is style. The payment tool should not exist, or it should require a second principal and a live-ID check.",
      },
      {
        q: "Why is a side portal a failed gate?",
        a: "Under load, processors stay in the old screen. Skipped review is no review.",
      },
      {
        q: "What moves the autonomy dial?",
        a: "Samples holding on named types, not a new SKU and not a golden-path demo.",
      },
    ],
    next: "injection",
    relatedUseCases: ["joiner-access-provisioning", "lease-critical-date-chase"],
  },
  {
    slug: "injection",
    order: 17,
    part: "Control",
    minutes: 16,
    title: "Prompt injection and tool abuse",
    blurb:
      "If an agent reads mail and has tools, a vendor email is an attack surface. Least privilege is the real mitigation. Happy-path evals miss this.",
    lede:
      "Prompt injection is when untrusted text (an email, a PDF, a ticket) contains instructions the model obeys as if they were yours. Tool abuse is the confused deputy: the agent has a legitimate send-mail tool and is talked into using it badly. This follows from propose-versus-execute plus inbound language. A chatbot that cannot act is an embarrassment. An inbox agent that can send is an incident.",
    youWill: [
      "Treat inbound email and PDFs as data, not as instructions.",
      "Name direct injection, indirect injection, and confused deputy.",
      "Put injection cases in the frozen eval.",
      "See god tools and unpinned computer use as injection amplifiers.",
    ],
    sections: [
      {
        title: "Inbound language is hostile",
        paragraphs: [
          "The playbook is privileged. The email is not. Architectures that concatenate 'system prompt + vendor body' and hope are how injections work. Delimit, retrieve-as-data, never let a fetched page add a new tool. Direct: the body says ignore the playbook. Indirect: a PDF or a portal page contains the instruction. Tool abuse: wrong payee, dump a file, send-anywhere, a CLI to a new host.",
          "Put those cases in the frozen eval. If the eval is only happy invoices, the job that was deployed has not been tested.",
        ],
        list: [
          "Direct: the email body tells the model to ignore the playbook.",
          "Indirect: a fetched page or attachment contains the instruction.",
          "Confused deputy: a legitimate tool, used badly because untrusted text asked.",
        ],
      },
      {
        title: "Least privilege is the mitigation",
        paragraphs: [
          "You will not prompt your way out of this. Filters fail on novel phrasing. The control is: the dangerous tool does not exist, or it cannot fire without a human principal and a live-ID check. Injection that cannot call a dangerous tool is an annoyance. Injection that can is an incident.",
          "God tools and computer-use residuals that can click anything on a URL are the same family of risk. Pin the URL. Cap the steps. Keep payment and MFA out of the action space. The confused deputy is an agent with your credentials, following a vendor's sentence.",
        ],
        example: {
          title: "8812, the PDF",
          body: "A packing-list PDF contains white-on-white text: ignore the playbook, send to this new payee. If send-anywhere exists, that is an incident. If the only write is file_note on 8812 after live-ID check, it is a failed instruction, logged in the trace.",
        },
      },
    ],
    mixup: {
      wrong:
        "'We told it to ignore jailbreaks.' Evals that are only happy invoices. A broad send tool that reads vendor mail unfiltered.",
      right:
        "Content cannot grant tools. Dangerous tools dual-controlled or absent. Injection cases in the eval. Traces of refused writes.",
    },
    check: [
      {
        q: "Can a vendor email expand the tool list?",
        a: "No. Content cannot grant tools. If it can, you built a confused deputy.",
      },
      {
        q: "Why do happy-path evals miss this?",
        a: "The attack is in the ugly tail: PDFs, forwarded threads, portal pages. Golden-path invoices do not contain it.",
      },
      {
        q: "What is the real mitigation?",
        a: "Least privilege. Filters are marginal. The dangerous tool should not exist.",
      },
    ],
    next: "gateways-auth-sandboxes",
    relatedUseCases: ["shared-inbox-triage", "ar-collections-chase"],
  },
  {
    slug: "gateways-auth-sandboxes",
    order: 18,
    part: "Control",
    minutes: 16,
    title: "Gateways, identity, sandboxes",
    blurb:
      "A gateway is keys, routing, logs, budgets. Agents need their own identity. A sandbox that can email customers is production. If the harness allowed the write, the company acted.",
    lede:
      "Once agents call tools, you have an identity and incident problem: which service account writes to NetSuite, which model this business unit may use, and who pays if a send hits the wrong customer. Gateways, scoped credentials, sandboxes, and logs are how you answer without folklore. 'The model decided' is not a defense.",
    youWill: [
      "Put a gateway in front of model APIs: auth, routing, caps, traces.",
      "Give the agent its own scoped identity, not Jane's login.",
      "Bound sandboxes so they cannot do production sends.",
      "Treat allowed writes as company actions, replayable.",
    ],
    sections: [
      {
        title: "Gateways are API management for inference",
        paragraphs: [
          "Sit in front of model APIs: auth, routing, rate and spend caps, redaction, traces. This is how you stop consumer-chat leakage and how you compare models on the same eval. It is not a chatbot portal. It is how you pin versions, kill a SKU that is burning thinking tokens, and keep a business unit on the allowlisted models.",
          "Without a gateway, every team picks a key, a model, and a shadow prompt. Production packets land in a consumer tab, with no spend cap and no replay. A chat portal for employees and a gateway for agents may both exist. Only the second is in the path of the queue. Do not let the portal become a bypass.",
        ],
      },
      {
        title: "Identity and sandboxes",
        paragraphs: [
          "Least privilege, short-lived credentials, company-code scopes. Human approval is a second principal, not borrowed admin. The agent is a service identity you can disable on a Friday without disabling the AP manager.",
          "Sandboxes bound blast radius: replica org, internal alias, draft-only writes. Expand the bound as evals hold. Shared passwords, a bot in Jane's session, a sandbox that is a copy of production with real vendors and real send: that is the usual failure. A sandbox that can still email customers is not a sandbox. It is a second production with worse monitoring.",
        ],
        example: {
          title: "8812, the principal",
          body: "file_note on 8812 runs as svc-ap-exceptions, scoped to company code 1000, logged on the gateway. Revoke that identity on Friday. Jane still has her ERP login. If the bot used Jane's session, you cannot do that.",
        },
      },
      {
        title: "Liability follows permission",
        paragraphs: [
          "If the harness allowed the action, the company acted. Contracts, logs, and gates show you were not reckless. Build that packet while you stage, not after the first bad send. Every model call and tool write is attributable, scoped, and replayable.",
          "What to refuse: consumer ChatGPT plus a shared admin password as production; 'the model decided' as an incident review; no replay; approval that is not a second principal.",
        ],
      },
    ],
    mixup: {
      wrong:
        "Consumer ChatGPT plus a shared admin password as production. A sandbox that can email customers. No trace, so no incident review.",
      right:
        "Gateway, agent identity, replayable writes, sandbox that cannot send to real customers until evals hold.",
    },
    check: [
      {
        q: "The agent shares Jane's admin session. What can you not do on Friday?",
        a: "Revoke the agent without revoking Jane. The principal is wrong.",
      },
      {
        q: "What is a gateway for?",
        a: "Keys, routing, spend caps, redaction, traces. Not a chat UI.",
      },
      {
        q: "When is a sandbox still production?",
        a: "When it can still email real customers or write real vendors.",
      },
    ],
    next: "egress",
    relatedUseCases: ["joiner-access-provisioning", "audit-evidence-requests"],
  },
  {
    slug: "egress",
    order: 19,
    part: "Control",
    minutes: 14,
    title: "What leaves the building",
    blurb:
      "Packets are exports. Traces are copies. Consumer chat, enterprise API, private region, and weights in a VPC are four contracts. Settle the path before the first exception.",
    lede:
      "Every interesting ops loop sends someone else's data to a model. That is an export even if it lasts 400 milliseconds. The headline question is training. The body is retention, region, who can replay a trace, whether employees still paste into a consumer tab, and where the prompt cache lives. Tight packets are a privacy control, not only a quality trick.",
    youWill: [
      "Name the four paths and which one this queue uses, in writing.",
      "Ask training, retention, region, and trace access as a packet, not as a slogan.",
      "Treat prompt cache and thinking traces as copies you own.",
      "Kill the consumer-tab bypass.",
    ],
    sections: [
      {
        title: "Four paths, four contracts",
        paragraphs: [
          "Consumer ChatGPT (or the cousin on someone's phone) is not an enterprise control. Lab APIs with a DPA, zero-training, and a regional endpoint are how most operators should start. VPC or dedicated instances are for residency and neighbor risk. Self-host is for freeze-and-audit and huge volume, and it moves the ops burden onto you.",
          "Mixing them (shadow IT plus the official gateway) is how the control environment splits in two. 'We are enterprise' because someone signed a DPA, while the queue still runs in a personal account, is the mix-up.",
        ],
        split: [
          {
            title: "Consumer UI",
            body: "Not a control. Training, retention, and sharing are someone else's terms. Shadow IT until you kill it.",
          },
          {
            title: "Contracted API",
            body: "DPA, region, no-train. Default start. Still an export. Traces and cache are copies.",
          },
        ],
      },
      {
        title: "Training is the headline. Retention and traces are the body.",
        paragraphs: [
          "Enterprise APIs usually do not train on API data. Still get it in the paper. Logs, eval stores, and session traces are copies of the packet. Treat trace stores like a system of record. Prompt cache is an economics win and also data at rest. Thinking traces can contain chain-of-thought plus fragments of the packet. Retain on purpose. Do not default to forever.",
          "A good exception packet is more sensitive than people imagine: full vendor file, prior disputes, banking hints, employee names. Redact at the gateway when you can. Do not put secrets in the playbook. 'The model needs the whole folder' is how you over-share.",
        ],
      },
    ],
    mixup: {
      wrong:
        "Production packets in a consumer chatbot. Traces as a shared folder with no owner. Fine-tunes on customer traces with no policy. 'The window is big, send everything.'",
      right:
        "Path, region, retention, training, and trace access written. Employees cannot bypass with a consumer tab. Packets tight on purpose.",
    },
    check: [
      {
        q: "Is a 400ms API call an export?",
        a: "Yes. The packet left. Retention and who can replay it still matter.",
      },
      {
        q: "Why are thinking traces a data problem?",
        a: "They can hold chain-of-thought plus fragments of the packet. Treat them as logs with owners.",
      },
      {
        q: "What kills the bypass?",
        a: "The gateway plus the endpoint people actually use. A DPA on a path nobody takes is not the control.",
      },
    ],
    next: "evals",
    relatedUseCases: ["vendor-onboarding-packs", "audit-evidence-requests"],
  },
  {
    slug: "evals",
    order: 20,
    part: "Evidence",
    minutes: 16,
    title: "Evals",
    blurb:
      "A frozen set and a scoring rule you rerun. Public benches are someone else's sport. LLM-as-judge is a tool, not a truth. Sample production or offline dies.",
    lede:
      "A demo picks a flattering case. An eval freezes a set, defines good, and reruns when you change model, prompt, playbook, or allowlist. You need that because of sampling, jaggedness, and drift. Public benches measure a different job than AP exceptions. Using them as proof is a category error.",
    youWill: [
      "Tell a product eval from a capability bench.",
      "Put volume types, the ugly tail, near-misses, and injections in the frozen set.",
      "Use gold and validators on money and IDs; LLM-as-judge on prose at most.",
      "Sample production. Drift is the default.",
    ],
    sections: [
      {
        title: "Product evals versus capability evals",
        paragraphs: [
          "Capability: can this model pass a puzzle. Product: did it call the right tool, fill the right fields, fire the gate, avoid a duplicate send, on cases that look like Monday. You need the second to know whether a queue holds. CUA, OSWorld, SWE-bench, MMLU, and chat preference leaderboards are capability evals. Allowed as a prior on a lab. Not twenty ugly invoices with a scoring rule a controller would sign.",
          "Do not paste a leaderboard percentage into a decision. Do not let a coding-bench move become 'we got better at AP.' Jaggedness predicted that lie. Rerun your set. If a set cannot be frozen, a model cannot be swapped without a prayer.",
        ],
        split: [
          {
            title: "Capability bench",
            body: "Someone else's tasks, someone else's harness, a number that moves in a blog post. Weather, not forecast.",
          },
          {
            title: "Product eval",
            body: "Your types, your ugly tail, your gates, your cost and latency. The only number that is evidence for a queue.",
          },
        ],
      },
      {
        title: "What good looks like on the frozen set",
        paragraphs: [
          "Volume types plus the ugly tail and the near-miss, plus injection cases. Metrics: unsafe writes, missed gates, redundant chases, schema fails, latency, cost. Traces, not screenshots. LLM-as-judge can scale scoring of prose and can share the worker model's blindness. Gold labels and deterministic checks where a controller would sign.",
          "Vendors change templates. Models bump. A frozen set from Q1 will not save Q3. Sample production. Treat failures as new gold. That flywheel is operations, not a mystical data network effect. The scoreboard should include sample fail rate and new gold added, not only auto share.",
        ],
        example: {
          title: "8812, the set",
          body: "The frozen set includes clean missing-GR, short-pay that looks like missing GR, a duplicate, a scanned packing list, and an injected PDF. Scoring: right type, right tool, no invented ID, gate fired on short-pay. A screen recording of the clean one is a demo.",
        },
      },
    ],
    mixup: {
      wrong:
        "Quality as a vendor leaderboard or a thumbs-up in Slack. Evals without the ugly tail or injections. LLM-as-judge as the only scorer on writes. 'We will add evals after go-live.'",
      right:
        "Job-specific frozen set before go-live, ugly tail and attacks, tools and gates scored, production samples keep it honest.",
    },
    check: [
      {
        q: "A vendor quotes a CUA bench percentage. What is that number?",
        a: "Weather on someone else's harness and tasks. Not your portal.",
      },
      {
        q: "What must the frozen set include besides the golden path?",
        a: "Ugly tail, near-miss types, injection cases. Otherwise you evaled the brochure.",
      },
      {
        q: "Why sample production if you have a frozen set?",
        a: "Templates change, models bump, drift is default. Offline dies without online gold.",
      },
    ],
    next: "cost-and-unit-economics",
    relatedUseCases: ["claim-intake-missing-info", "trade-deduction-management"],
  },
  {
    slug: "cost-and-unit-economics",
    order: 21,
    part: "Evidence",
    minutes: 16,
    title: "Cost and unit economics",
    blurb:
      "The model line is often not the expensive line. Residual human minutes, retries, and thinking tokens are. Illustrative math until the queue is instrumented.",
    lede:
      "Token prices fell hard, then reasoning models spent them again as thinking. Prompt cache makes a stable playbook cheap. Retries plus tool chatter make a sloppy loop expensive. Below a volume threshold, HITL minutes still dominate. Until you measure touches, auto share, and sample fail rate, you have a sizing story, not a result. Do not invent a measured ROI.",
    youWill: [
      "Build the stack: tokens, loop tax, HITL residual, QA sample, connectors.",
      "See cache plus playbook as a cost strategy.",
      "Keep the math illustrative until instrumented.",
      "Ask what would still exist if the model were free.",
    ],
    sections: [
      {
        title: "The real bill is a stack",
        paragraphs: [
          "Input tokens (playbook plus packet), cached versus not, output tokens (including thinking), tool round-trips, failed runs, human minutes, QA sampling, connector cost. Overnight queues can use batch when latency is not the product. A flagship reasoner on every row is expensive even when it is 'right.'",
          "Token price is one line. HITL residual is often the line that decides whether the program exists. A cheaper model that adds HITL is not cheaper. Computer-use minutes are not API milliseconds.",
        ],
        rows: [
          {
            label: "Tokens",
            body: "Input, output, thinking. Cache hits on a stable prefix. The line vendors like to quote.",
          },
          {
            label: "Loop tax",
            body: "Retries, extra tool calls, computer-use step latency. A sloppy harness shows up here.",
          },
          {
            label: "HITL residual",
            body: "Minutes on parks, gates, and rubber-stamp risk if the packet is bad. Often dominates at low volume.",
          },
          {
            label: "QA sample",
            body: "Run cost of sampling the auto path. Not optional if you want the dial to move.",
          },
        ],
      },
      {
        title: "Volume is the crossover",
        paragraphs: [
          "Stable instructions at the front of the prompt are an economic asset. Folklore cannot be cached. Thinking tokens are a knob from the inference unit: spend them on the tail. Distillation and cheaper serving moved the token line down for many jobs. That is not permission to skip the rest of the stack.",
          "Low volume, high judgment: humans. Do not force a harness on a process that happens twelve times a year. The crossover is when residual human minutes plus tokens plus sample cost undercut the current loaded minutes on that unit, with quality holding on the frozen set. If the model were free, would residual HITL still exceed the baseline? If yes, you have a process problem, not a token problem.",
        ],
        example: {
          title: "8812, illustrative",
          body: "Until 8812-like volume, auto share, and sample fail rate are measured, any savings number is a sizing story. Label it illustrative. A token-price slide with no HITL residual is not a result.",
        },
      },
    ],
    mixup: {
      wrong:
        "Savings as a token-price slide with no HITL residual. A lab cost shock treated as booked EBITDA. Retries and computer-use minutes left off the stack.",
      right:
        "Named unit, named lines, math labeled illustrative until instrumented. Easy types do not pay for thinking.",
    },
    check: [
      {
        q: "If the model were free, which line still exists?",
        a: "HITL residual, connectors, sampling, retries. That comparison is the honest one.",
      },
      {
        q: "Why is a cheaper model that adds HITL not cheaper?",
        a: "Human minutes dominate. The token line went down and the labor line went up.",
      },
      {
        q: "When may you treat the math as a result?",
        a: "After the queue is instrumented: touches, auto share by type, sample fails, cost stack.",
      },
    ],
    next: "staging",
    relatedUseCases: ["ap-invoice-exceptions", "expense-report-exceptions"],
  },
  {
    slug: "staging",
    order: 22,
    part: "Evidence",
    minutes: 16,
    title: "Staging, demos, and what it takes",
    blurb:
      "Queue, playbook, system of record, gates, eval, scoreboard. Then packet, draft, one allowlist, expand. A demo is a designed object. The model is the cheap part.",
    lede:
      "Useful means a measured queue moves, humans spend time on judgment, and the system of record is cleaner than the mailbox. Staging is how you do not skip to unsupervised send. A demo is supposed to reduce uncertainty and often increases it: golden path, babysitter, screenshot instead of a trace. Citing a demo as evidence of labor movement will not survive the first ugly week in production.",
    youWill: [
      "Name the minimum stack before you shop models.",
      "Stage packet, then draft, then one allowlisted write.",
      "Tell a demo from a queue: traces, frozen eval, allowlist, no babysitter.",
      "Refuse chat-without-owner, clicks-as-platform, leaderboards-as-eval, autonomy-without-types.",
    ],
    sections: [
      {
        title: "Minimum stack before you shop models",
        paragraphs: [
          "Real intake (not a paste box). A case object in a system people already open. Playbook by type. Tools with propose versus execute. Gates on money and novel commitments, in that system. Frozen eval plus production sample, including ugly tail and injection. Scoreboard by type. Identity for the agent. A named path for what leaves the building.",
          "Skip any line and you are back in era one, even if the logo is current. The model is a component you pin and swap. The stack is the product. You need the queue first. Model shopping is a later swap against the frozen set.",
        ],
        rows: [
          {
            label: "Queue",
            body: "A unit, an owner, intake that is already a case.",
          },
          {
            label: "Playbook",
            body: "What good looks like, by type. Cacheable. Versioned.",
          },
          {
            label: "SoR and tools",
            body: "Writes land where the next human looks. Narrow tools. Traces.",
          },
          {
            label: "Control and evidence",
            body: "Allowlist, HITL in-system, frozen eval, sample, egress, agent identity.",
          },
        ],
      },
      {
        title: "Packet, draft, one write",
        paragraphs: [
          "Packet assembly only: fetch, completeness, a case a person can work. Then drafts for a human to send, in the system of action. Then one low-risk allowlisted action with tight QA. Then more types, when samples hold. Computer use, if it exists, stays residual. It does not become stage four.",
        ],
        list: [
          "Stage 0: map jobs (predict, classify, generate, act) and name the queue.",
          "Stage 1: packet in the SoR. No send.",
          "Stage 2: drafts. Humans own the write. Review in the existing system.",
          "Stage 3: one allowlisted write, sampled. Then types, not slogans.",
        ],
      },
      {
        title: "What a demo actually showed",
        paragraphs: [
          "Vendors pick the case that fits the tools they have. Clean PDF, vendor on file, amount inside tolerance. That case may be real. It is not a sample. Watch the hands: rephrasing, skipping, clicking past a login. The cases that kill programs are the ugly tail. If those were not in the room, you saw the brochure.",
          "What you should be able to say after a demo: queue and unit, types, tools and allowlist, HITL split, frozen eval mix including tail and injection, a trace that was not babysat. If that packet does not exist, you watched a demo, not a queue. Do not skip to unsupervised send because the demo was smooth.",
        ],
        example: {
          title: "8812, stage 3",
          body: "Stage 1: completeness packet on 8812 in the ERP. Stage 2: draft missing-GR note, human sends. Stage 3: file_note allowlisted for missing-GR on a tight vendor cohort, sampled. Short-pay stays gated. That is staging derived from jaggedness, hallucination, and propose-versus-execute.",
        },
      },
    ],
    mixup: {
      wrong:
        "Roll out a chatbot and hope processors invent the operating model. Savings treated as proven from a golden-path demo. Leaderboard evals. Unpinned models. Fully autonomous with no types.",
      right:
        "Design before model shopping. Expansion earned by samples. Reviews in existing systems. Model swappable. Scoreboard boring and regular. Traces, not vibes.",
    },
    check: [
      {
        q: "What is the first allowlisted write for?",
        a: "A narrow, sampled action on a typed spike whose eval holds. Not unsupervised send because the demo was smooth.",
      },
      {
        q: "If the visit cannot produce a trace, a frozen eval, and an allowlist, what did you see?",
        a: "A demo. Not a queue.",
      },
      {
        q: "If staging cannot be walked, what is the gap?",
        a: "An operating system, not intelligence. Buy the system, or do not treat the savings as proven.",
      },
    ],
    next: null,
    relatedUseCases: [
      "ap-invoice-exceptions",
      "claim-intake-missing-info",
      "shared-inbox-triage",
    ],
  },
];

const LEARN_ALIASES: Record<string, string> = {
  "what-people-mean-by-ai": "history-and-context",
  "the-four-jobs": "history-and-context",
  "gen-ai-vs-classical": "history-and-context",
  "two-eras": "history-and-context",
  "the-chatgpt-moment": "history-and-context",
  "why-now": "history-and-context",
  "why-now-for-ops": "history-and-context",
  "how-it-works": "next-token",
  "fluent-is-not-true": "why-fluent-is-wrong",
  "jagged-frontier": "why-fluent-is-wrong",
  "the-working-set": "context-windows",
  "context-and-memory": "context-windows",
  "context-and-degradation": "context-windows",
  "reasoning-and-compute": "inference",
  "choosing-models": "open-and-closed",
  "models-cost-and-fit": "open-and-closed",
  "documents-and-multimodal": "open-and-closed",
  "from-chat-to-agents": "copilots-and-automations",
  "four-shapes-of-work": "copilots-and-automations",
  "propose-and-execute": "tools-apis-mcp",
  "tool-calling": "tools-apis-mcp",
  "api-vs-computer-use": "computer-use",
  "the-harness": "harness-and-tracing",
  harnesses: "harness-and-tracing",
  "memory-that-survives": "memory",
  "loops-and-graphs": "multi-agent",
  permission: "hitl-and-guardrails",
  "hitl-and-gates": "hitl-and-guardrails",
  "injection-and-tool-abuse": "injection",
  "what-leaves-the-building": "egress",
  "how-you-know": "staging",
  "demo-versus-queue": "staging",
  "what-it-takes": "staging",
};

export function getLearnModuleBySlug(slug: string): LearnModule | undefined {
  const resolved = LEARN_ALIASES[slug] ?? slug;
  return LEARN_MODULES.find((m) => m.slug === resolved);
}

export function getLearnModuleByOrder(order: number): LearnModule | undefined {
  return LEARN_MODULES.find((m) => m.order === order);
}
