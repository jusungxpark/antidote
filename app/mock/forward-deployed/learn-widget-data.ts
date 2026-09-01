import type {
  ContextDataset,
  TokenDataset,
  TraceDataset,
} from "./learn-widget-types";
import { CASE } from "./learn-case";

const NOTE = "Recorded outputs, captured for this course. Illustrative figures throughout.";

/* ================================================================== W1 tokens */

export const TOKEN_DATA: Record<string, TokenDataset> = {
  "invoice-amount": {
    question: `What is the amount on invoice ${CASE.invoice}?`,
    grounded: {
      label: "Amount present in the packet",
      steps: [
        { prefix: "The invoice amount is", options: [{ token: " $", p: 0.94 }, { token: " fourteen", p: 0.03 }, { token: " USD", p: 0.02 }] },
        { prefix: "The invoice amount is $", options: [{ token: "14", p: 0.97 }, { token: "1", p: 0.02 }, { token: "4", p: 0.01 }] },
        { prefix: "The invoice amount is $14", options: [{ token: ",200", p: 0.96 }, { token: ",000", p: 0.02 }, { token: ".20", p: 0.01 }] },
        { prefix: "The invoice amount is $14,200", options: [{ token: ".00", p: 0.93 }, { token: " for", p: 0.04 }, { token: ".", p: 0.03 }] },
      ],
    },
    ungrounded: {
      label: "Amount absent from the packet",
      steps: [
        { prefix: "The invoice amount is", options: [{ token: " $", p: 0.91 }, { token: " not", p: 0.05 }, { token: " unclear", p: 0.02 }] },
        { prefix: "The invoice amount is $", options: [{ token: "14", p: 0.19 }, { token: "12", p: 0.16 }, { token: "1", p: 0.14 }, { token: "4", p: 0.12 }, { token: "8", p: 0.11 }, { token: "24", p: 0.09 }] },
        { prefix: "The invoice amount is $14", options: [{ token: ",200", p: 0.21 }, { token: ",500", p: 0.19 }, { token: ",000", p: 0.18 }, { token: ",750", p: 0.11 }, { token: ".00", p: 0.08 }] },
        { prefix: "The invoice amount is $14,200", options: [{ token: ".00", p: 0.92 }, { token: " for", p: 0.05 }, { token: ".", p: 0.03 }] },
      ],
    },
    note: `${NOTE} The sentence is identical in both cases; only the distribution at step two differs.`,
  },
  "missing-fact": {
    question: "When was the goods receipt posted?",
    grounded: {
      label: "Receiving record in the packet",
      steps: [
        { prefix: "The goods receipt was posted on", options: [{ token: " 6", p: 0.95 }, { token: " the", p: 0.03 }, { token: " March", p: 0.02 }] },
        { prefix: "The goods receipt was posted on 6", options: [{ token: " March", p: 0.98 }, { token: "th", p: 0.01 }, { token: "/3", p: 0.01 }] },
      ],
    },
    ungrounded: {
      label: "No receiving record anywhere in the packet",
      steps: [
        { prefix: "The goods receipt was posted on", options: [{ token: " 6", p: 0.14 }, { token: " 5", p: 0.13 }, { token: " 4", p: 0.12 }, { token: " 7", p: 0.11 }, { token: " 10", p: 0.09 }, { token: " the", p: 0.08 }] },
        { prefix: "The goods receipt was posted on 6", options: [{ token: " March", p: 0.88 }, { token: "th", p: 0.07 }, { token: "/3", p: 0.05 }] },
      ],
    },
    note: `${NOTE} The invented date arrives with the same grammar and the same confidence as the true one.`,
  },
  "resample-20": {
    question: `Extract the amount and the purchase order from invoice ${CASE.invoice}, twenty times.`,
    grounded: {
      label: "Twenty runs, same input",
      steps: [
        { prefix: "Amount", options: [{ token: " $14,200.00 ×17", p: 0.85 }, { token: " $14,200 ×2", p: 0.1 }, { token: " $1,420.00 ×1", p: 0.05 }] },
        { prefix: "Purchase order", options: [{ token: " 4501 ×20", p: 1 }] },
      ],
    },
    runs: [
      { answer: "$14,200.00 · PO 4501", ok: true }, { answer: "$14,200.00 · PO 4501", ok: true },
      { answer: "$14,200 · PO 4501", ok: false }, { answer: "$14,200.00 · PO 4501", ok: true },
      { answer: "$14,200.00 · PO 4501", ok: true }, { answer: "$14,200.00 · PO 4501", ok: true },
      { answer: "$1,420.00 · PO 4501", ok: false }, { answer: "$14,200.00 · PO 4501", ok: true },
      { answer: "$14,200.00 · PO 4501", ok: true }, { answer: "$14,200 · PO 4501", ok: false },
      { answer: "$14,200.00 · PO 4501", ok: true }, { answer: "$14,200.00 · PO 4501", ok: true },
      { answer: "$14,200.00 · PO 4501", ok: true }, { answer: "$14,200.00 · PO 4501", ok: true },
      { answer: "$14,200.00 · PO 4501", ok: true }, { answer: "$14,200.00 · PO 4501", ok: true },
      { answer: "$14,200.00 · PO 4501", ok: true }, { answer: "$14,200.00 · PO 4501", ok: true },
      { answer: "$14,200.00 · PO 4501", ok: true }, { answer: "$14,200.00 · PO 4501", ok: true },
    ],
    note: `${NOTE} Seventeen of twenty exact. The purchase order never moved; the amount formatting did. One run would have shown either result.`,
  },
  "confidence-20": {
    question: "Twenty extractions, each with the system's own stated confidence and whether it was actually right.",
    grounded: { label: "Stated confidence against measured correctness", steps: [] },
    runs: [
      { answer: "Amount $14,200.00", ok: true, stated: "high" }, { answer: "Receipt date 6 March", ok: false, stated: "high" },
      { answer: "PO 4501", ok: true, stated: "high" }, { answer: "Buyer D. Okafor", ok: true, stated: "medium" },
      { answer: "Terms Net 45", ok: true, stated: "high" }, { answer: "Receiver J. Lin", ok: false, stated: "high" },
      { answer: "Amount $14,200.00", ok: true, stated: "medium" }, { answer: "Delivery 2 March", ok: false, stated: "high" },
      { answer: "PO 4501", ok: true, stated: "high" }, { answer: "Entity UK-02", ok: false, stated: "medium" },
      { answer: "Amount $14,200.00", ok: true, stated: "high" }, { answer: "Terms Net 45", ok: true, stated: "high" },
      { answer: "Receipt ref GR-8871", ok: false, stated: "high" }, { answer: "PO 4501", ok: true, stated: "medium" },
      { answer: "Buyer D. Okafor", ok: true, stated: "high" }, { answer: "Amount $14,200.00", ok: true, stated: "high" },
      { answer: "Cost centre 4410", ok: false, stated: "high" }, { answer: "PO 4501", ok: true, stated: "high" },
      { answer: "Terms Net 45", ok: true, stated: "medium" }, { answer: "Amount $14,200.00", ok: true, stated: "high" },
    ],
    note: `${NOTE} Sort by stated confidence and look for the relationship. Every field absent from the packet was returned with high confidence.`,
  },
  styles: {
    question: "The same prompt through three training stages.",
    grounded: { label: "Prompt: Draft a note about the missing goods receipt.", steps: [] },
    styles: [
      { label: "Raw continuation model", body: "Draft a note about the missing goods receipt. Draft a note about the missing delivery confirmation. Draft a note about the outstanding invoice. Draft a memo regarding…" },
      { label: "Instruction tuned", body: `Note: Invoice ${CASE.invoice} from ${CASE.vendor} for ${CASE.amount} cannot be matched against PO ${CASE.po} because no goods receipt has been posted. Requesting confirmation of delivery before payment release.` },
      { label: "Preference tuned", body: `I've reviewed invoice ${CASE.invoice} and wanted to flag an issue for you. Unfortunately, the goods receipt appears to be missing, which means we're unable to complete the three-way match at this time. Could you kindly confirm whether delivery took place? Happy to help further if useful.` },
    ],
    note: `${NOTE} The facts are identical across the last two. Length, hedging and register are what post-training installed.`,
  },
};

/* ================================================================= W2 context */

export const CONTEXT_DATA: Record<string, ContextDataset> = {
  "call-window": {
    question: `Should invoice ${CASE.invoice} be released for payment?`,
    answer: "No. hold. No goods receipt exists against PO 4501; chase the buyer.",
    blocks: [
      { id: "sys", label: "System prompt", kind: "system", tokens: 310, body: "Role, output format, standing AP rules, escalation policy.", required: true, whenMissing: "Output shape collapses; the model answers in prose instead of the required structure." },
      { id: "tools", label: "Tool list", kind: "tools", tokens: 240, body: "Seven tools with argument shapes and permissions.", required: true, whenMissing: "The model can no longer propose any action; it describes what someone should do instead." },
      { id: "inv", label: `Invoice ${CASE.invoice}`, kind: "packet", tokens: 180, body: `${CASE.vendor}, ${CASE.amount}, terms ${CASE.terms}, received ${CASE.received}.`, required: true, whenMissing: "The amount and vendor get composed. The answer still reads as confident." },
      { id: "po", label: `PO ${CASE.po}`, kind: "packet", tokens: 150, body: "Two lines, quantities and unit prices, buyer D. Okafor.", required: true, whenMissing: "No basis for a match; the model asserts one anyway." },
      { id: "gr", label: "Receiving query result", kind: "packet", tokens: 40, body: "No goods receipt found for PO 4501.", required: true, whenMissing: "A receipt and a posting date get invented. the failure from lesson 2.1." },
      { id: "hist", label: "Prior handling for this vendor", kind: "history", tokens: 420, body: "Two earlier exceptions and how they were resolved.", whenMissing: "The answer is still correct; it stops citing precedent." },
    ],
    note: `${NOTE} Total 1,340 tokens. Remove any block to see what the call loses.`,
  },
  "packet-vs-dump": {
    question: `Should invoice ${CASE.invoice} be released for payment?`,
    answer: "No. hold. No goods receipt exists against PO 4501.",
    blocks: [],
    depths: [
      { label: "2-page packet · fact at the top", found: true, answer: "Hold. No goods receipt against PO 4501." },
      { label: "2-page packet · fact at the bottom", found: true, answer: "Hold. No goods receipt against PO 4501." },
      { label: "240-page dump · fact at 15%", found: true, answer: "Hold. No goods receipt against PO 4501." },
      { label: "240-page dump · fact at 50%", found: false, answer: "Release. Delivery terms in section 14.2 permit payment on shipment." },
      { label: "240-page dump · fact at 85%", found: true, answer: "Hold, pending receipt confirmation." },
    ],
    note: `${NOTE} The dump costs roughly 120× the packet per call and answers worse at mid-depth. The wrong answer came from a contract clause about a different situation.`,
  },
  "needle-depth": {
    question: "What is the agreed detention-free window for this carrier?",
    answer: "Four hours from arrival.",
    blocks: [],
    depths: [
      { label: "Short context · any depth", found: true, answer: "Four hours from arrival." },
      { label: "Long context · 10% depth", found: true, answer: "Four hours from arrival." },
      { label: "Long context · 45% depth", found: false, answer: "Two hours from arrival." },
      { label: "Long context · 55% depth", found: false, answer: "Standard industry practice is two hours." },
      { label: "Long context · 90% depth", found: true, answer: "Four hours from arrival." },
      { label: "Long context · 45% depth, plus nine similar clauses", found: false, answer: "Two hours, per the master agreement." },
    ],
    note: `${NOTE} The wrong answers came from clauses about other carriers. Topically adjacent material is what competes.`,
  },
  "three-doors": {
    question: `What is the current status of invoice ${CASE.invoice}?`,
    answer: "Held. No goods receipt against PO 4501.",
    blocks: [],
    doors: [
      { label: "Fetch by identifier", how: `get_invoice("${CASE.invoice}") against the ERP`, answer: "Held. No goods receipt against PO 4501.", ok: true, cost: "1 call · exact · current · auditable" },
      { label: "Search the index", how: "Similarity search over the indexed document store", answer: `Paid on 2 March. (Returned ${CASE.vendor}'s other open invoice for the same amount.)`, ok: false, cost: "1 call · ranked candidates · confident near-miss" },
      { label: "Dump everything", how: "Attach all vendor documents and let attention sort it", answer: "Appears to be outstanding; a receipt may exist.", ok: false, cost: "~90× the tokens · vague · unauditable" },
    ],
    note: `${NOTE} The search failure is the interesting one: right vendor, right amount, wrong invoice, stated confidently.`,
  },
  "history-compaction": {
    question: "What the run holds at step twelve, before and after compaction.",
    answer: "",
    blocks: [],
    compaction: {
      before: `Step 1 fetched invoice ${CASE.invoice} (${CASE.vendor}, ${CASE.amount}, terms ${CASE.terms}). Step 3 fetched PO ${CASE.po} (buyer ${CASE.buyer}, two lines). Step 5 queried receiving: no record. Step 7 searched correspondence: two prior exceptions, both resolved by chasing the buyer. Step 9 drafted a chase referencing ${CASE.invoice} and PO ${CASE.po}.`,
      after: "The agent reviewed the invoice and the purchase order, confirmed the vendor and terms, identified a missing receipt, found prior precedent for chasing the buyer, and drafted a follow-up.",
      lost: [`invoice ${CASE.invoice}`, CASE.amount, `PO ${CASE.po}`, CASE.buyer, CASE.terms, CASE.vendor],
      pinned: `PINNED · invoice ${CASE.invoice} · ${CASE.vendor} · ${CASE.amount} · PO ${CASE.po} · buyer ${CASE.buyer} · decision: chase`,
    },
    note: `${NOTE} Six identifiers lost, narrative intact. The pinned block is forty tokens and survives every compaction.`,
  },
  "monolith-vs-layered": {
    question: "Eleven exception rules, two ways.",
    answer: "",
    blocks: [],
    layers: [
      { label: "Monolith · 4,100 words", tokens: 5400, followed: "7 of 11 rules applied correctly", note: "Rules 3 and 9 ignored on items where rule 6 also applied. Capitalised reminders section made no difference." },
      { label: "Core 300 words + routed disclosure", tokens: 690, followed: "11 of 11 rules applied correctly", note: "Software classifies the item first, then includes only that exception type's procedure." },
    ],
    note: `${NOTE} Same eleven rules, same twenty items. The difference is structure rather than wording.`,
  },
  "three-memories": {
    question: "Where does a learned disposition live, and what survives?",
    answer: "",
    blocks: [],
    memories: [
      { label: "The window", holds: `Current run state for invoice ${CASE.invoice}`, survives: "Seconds. Gone when the call returns.", audit: false },
      { label: "Retrieval layer", holds: `Note that ${CASE.vendor} sends photographs`, survives: "Weeks or months, in whoever's store it is. Gone at contract end.", audit: false },
      { label: "System of record", holds: "Vendor record flag: documents arrive as images", survives: "Years. Visible to anyone who opens the vendor record.", audit: true },
    ],
    note: `${NOTE} The test that matters: can a person who has never used the tool find the fact?`,
  },
};

/* =================================================================== W3 trace */

const T = (
  actor: TraceDataset["variants"][number]["steps"][number]["actor"],
  label: string,
  body: string,
  extra: Partial<TraceDataset["variants"][number]["steps"][number]> = {},
) => ({ actor, label, body, ...extra });

export const TRACE_DATA: Record<string, TraceDataset> = {
  "invoice-4step": {
    goal: `Resolve invoice ${CASE.invoice}: three-way match, then act.`,
    variants: [
      {
        label: "One run",
        outcome: "Chase drafted, note posted, follow-up set.",
        ok: true,
        steps: [
          T("model", "Proposes get_invoice", `get_invoice(id: "${CASE.invoice}")`, { tokens: 640, cost: 0.002 }),
          T("gate", "Boundary check", "Tool on allowlist · read scope · identifier well-formed → execute", { ok: true }),
          T("tool", "ERP returns", `${CASE.vendor} · ${CASE.amount} · terms ${CASE.terms} · PO ${CASE.po}`, { tokens: 180 }),
          T("model", "Proposes get_receiving", `get_receiving(po: "${CASE.po}")`, { tokens: 830, cost: 0.003 }),
          T("gate", "Boundary check", "Read scope · executes", { ok: true }),
          T("tool", "ERP returns", "No goods receipt found.", { tokens: 20 }),
          T("model", "Proposes draft_email", `draft_email(to: "${CASE.buyer}", subject: "Invoice ${CASE.invoice}. goods receipt")`, { tokens: 1010, cost: 0.005 }),
          T("check", "Validator", `Draft contains ${CASE.invoice} and PO ${CASE.po} · recipient on allowlist · no unsourced numbers`, { ok: true }),
          T("model", "Proposes post_ap_note", `post_ap_note(invoice: "${CASE.invoice}", note: "Chased buyer, no GR")`, { tokens: 1180, cost: 0.006 }),
          T("gate", "Boundary check", "Internal write · under threshold · idempotency key present → execute", { ok: true }),
          T("check", "Read-back", "Note AP-99214 confirmed present on the invoice record.", { ok: true }),
        ],
      },
      {
        label: "Same run, argument tampered",
        blurb: "The proposed call is changed to reference a different entity.",
        outcome: "Refused at the boundary. Nothing written.",
        ok: false,
        steps: [
          T("model", "Proposes get_invoice", `get_invoice(id: "${CASE.invoice}")`, { tokens: 640 }),
          T("gate", "Boundary check", "Executes", { ok: true }),
          T("tool", "ERP returns", `${CASE.vendor} · ${CASE.amount}`, { tokens: 180 }),
          T("model", "Proposes post_ap_note", 'post_ap_note(invoice: "9107", note: "Cleared")', { tokens: 900, flag: "identifier differs from the fetched record" }),
          T("gate", "Boundary check", "Refused: invoice identifier outside the entity scope for this run.", { ok: false }),
          T("human", "Escalation", "Run parked. Message: proposed write referenced an out-of-scope record.", {}),
        ],
      },
    ],
    note: `${NOTE} The proposed call and the executed call are separate objects in every step.`,
  },
  "single-vs-loop": {
    goal: `Resolve invoice ${CASE.invoice}.`,
    variants: [
      {
        label: "Single call",
        blurb: "Everything in one prompt, one answer.",
        outcome: "A plausible summary that invents a receipt date. No action taken.",
        ok: false,
        steps: [
          T("model", "One call", "Reads the pasted email thread and answers.", { tokens: 2100, cost: 0.009, flag: "no receiving record in context" }),
          T("model", "Output", "Receipt posted 6 March; recommend release.", { flag: "invented" }),
        ],
      },
      {
        label: "Loop with tools",
        blurb: "Same model, same task, seven iterations.",
        outcome: "Correct hold, chase drafted, note posted.",
        ok: true,
        steps: [
          T("model", "Step 1", "Proposes get_invoice", { tokens: 640, cost: 0.002 }),
          T("tool", "Step 1 result", `${CASE.amount} · PO ${CASE.po}`, { tokens: 180 }),
          T("model", "Step 2", "Proposes get_purchase_order", { tokens: 830, cost: 0.003 }),
          T("tool", "Step 2 result", "Two lines, buyer D. Okafor", { tokens: 210 }),
          T("model", "Step 3", "Proposes get_receiving", { tokens: 1080, cost: 0.004 }),
          T("tool", "Step 3 result", "No goods receipt found.", { tokens: 20 }),
          T("model", "Step 4", "Proposes draft_email", { tokens: 1240, cost: 0.006 }),
          T("check", "Validator", "Identifiers present, recipient allowlisted", { ok: true }),
          T("model", "Step 5", "Proposes post_ap_note", { tokens: 1420, cost: 0.007 }),
          T("check", "Read-back", "Note confirmed", { ok: true }),
        ],
      },
    ],
    note: `${NOTE} The loop costs about three times the single call and answers correctly, because it fetched the fact instead of composing it.`,
  },
  compounding: {
    goal: "End-to-end completion across a chain of steps.",
    variants: [
      {
        label: "Twelve-step run",
        outcome: "Set per-step accuracy and step count below.",
        ok: true,
        steps: [
          T("model", "Classify exception type", ""), T("tool", "Fetch invoice", ""),
          T("tool", "Fetch purchase order", ""), T("tool", "Fetch receiving", ""),
          T("model", "Extract fields", ""), T("model", "Decide match", ""),
          T("tool", "Search correspondence", ""), T("model", "Select precedent", ""),
          T("model", "Draft chase", ""), T("gate", "Approve send", ""),
          T("tool", "Send", ""), T("tool", "Post note", ""),
        ],
      },
    ],
    compounding: { steps: 12, label: "AP exception, intake to resolution" },
    note: `${NOTE} Multiplication assumes independent failures, which is the optimistic case.`,
  },
  "workflow-vs-agent": {
    goal: "Handle a missing-receipt exception.",
    variants: [
      {
        label: "Designed workflow",
        blurb: "Path written in advance; models called at the two language steps.",
        outcome: "Resolved. Same route every time.",
        ok: true,
        steps: [
          T("tool", "Fetch", "Invoice, purchase order, receiving. by identifier", { cost: 0 }),
          T("model", "Classify", "One of seven exception types", { tokens: 420, cost: 0.001 }),
          T("check", "Validate", "Amount matches ERP", { ok: true }),
          T("model", "Draft", "Chase, from the missing-receipt template", { tokens: 610, cost: 0.003 }),
          T("gate", "Gate", "External send: approved", { ok: true }),
          T("tool", "Post", "Note and follow-up", {}),
        ],
      },
      {
        label: "Agent loop",
        blurb: "Same task, model chooses the sequence.",
        outcome: "Resolved, at four times the cost, by a different route on each of five runs.",
        ok: true,
        steps: [
          T("model", "Step 1", "Proposes search_correspondence first", { tokens: 640, cost: 0.002, flag: "route varies run to run" }),
          T("tool", "Result", "Two prior exceptions", { tokens: 380 }),
          T("model", "Step 2", "Proposes get_invoice", { tokens: 1120, cost: 0.005 }),
          T("tool", "Result", `${CASE.amount}`, { tokens: 180 }),
          T("model", "Step 3", "Proposes get_receiving", { tokens: 1380, cost: 0.006 }),
          T("tool", "Result", "None found", { tokens: 20 }),
          T("model", "Step 4", "Proposes draft_email", { tokens: 1560, cost: 0.007 }),
          T("model", "Step 5", "Proposes post_ap_note", { tokens: 1740, cost: 0.008 }),
        ],
      },
    ],
    note: `${NOTE} Five runs of the agent produced three different step orders. The workflow produced one.`,
  },
  "portal-run": {
    goal: "Look up a consignment status on a carrier portal with no interface.",
    variants: [
      {
        label: "Ten-step screen run",
        outcome: "Status retrieved on the second attempt, after two failures.",
        ok: true,
        steps: [
          T("model", "Sees login page", "Proposes click on Sign in", { ok: true }),
          T("model", "Sees dashboard", "Proposes click on Track shipment", { ok: true }),
          T("model", "Sees search field", "Proposes type consignment reference", { ok: true }),
          T("model", "Sees results", "Proposes click on first row", { ok: false, flag: "clicked an advertisement banner rendered above the results" }),
          T("model", "Sees promo page", "Proposes browser back", { ok: true }),
          T("model", "Sees results", "Proposes click on row two", { ok: true }),
          T("model", "Sees detail page", "Proposes read status field", { ok: false, flag: "session timed out; page redirected to login" }),
          T("model", "Sees login page", "Proposes click on Sign in", { ok: true }),
          T("model", "Sees detail page", "Proposes read status field", { ok: true }),
          T("tool", "Returns", "Status: at destination hub, held for customs.", {}),
        ],
      },
    ],
    note: `${NOTE} Two of ten steps failed, both from the interface rather than the model. Pinning the entry point removes steps one to three entirely.`,
  },
  "two-harnesses": {
    goal: "Twenty identical invoices, one model, two environments.",
    variants: [
      {
        label: "Thin environment",
        blurb: "Email thread pasted into a prompt. No fetch, no validator, no gate.",
        outcome: "12% resolved without a human. 7% error rate on those.",
        ok: false,
        steps: [
          T("model", "Reads the thread", "Whatever the forwarded email contained", { flag: "no receiving record available" }),
          T("model", "Answers", "Composes a status and a recommendation", { flag: "receipt dates invented on 6 of 20" }),
          T("human", "Reviews", "Reads the output and redoes most of the work", {}),
        ],
      },
      {
        label: "Built environment",
        blurb: "Fetch by identifier, schema validation, ERP cross-check, gated send, full trace.",
        outcome: "61% resolved without a human. 0.4% error rate on those.",
        ok: true,
        steps: [
          T("tool", "Fetch", "Invoice, purchase order, receiving by identifier", { ok: true }),
          T("model", "Classify and draft", "One of seven types, with the matching procedure disclosed", {}),
          T("check", "Validate", "Amount against ERP · identifiers resolve · recipient allowlisted", { ok: true }),
          T("gate", "Gate", "External send held for approval; internal note automatic", { ok: true }),
          T("check", "Read-back", "Note confirmed present", { ok: true }),
        ],
      },
    ],
    note: `${NOTE} Same model version in both. The gap is entirely environment.`,
  },
  "subsystem-ablation": {
    goal: "One run, with each subsystem removed in turn.",
    variants: [
      {
        label: "Complete harness",
        outcome: "Resolved correctly, traced, gated.",
        ok: true,
        steps: [
          T("model", "Instructions", "Core plus the missing-receipt procedure", { subsystem: "Instructions" }),
          T("tool", "State", "Pinned field block plus ERP as the record", { subsystem: "State" }),
          T("check", "Verification", "Amount cross-check and read-back", { subsystem: "Verification", ok: true }),
          T("gate", "Scope", "Seven tools, one external effect, argument-scoped", { subsystem: "Scope", ok: true }),
          T("human", "Lifecycle", "Clean start per item, twelve-step cap, parked outcome defined", { subsystem: "Lifecycle" }),
        ],
      },
    ],
    ablations: [
      { subsystem: "Instructions", removed: "The routed procedure", failure: "Behaviour is reasonable and inconsistent: three of twenty items chased the vendor instead of the buyer." },
      { subsystem: "State", removed: "The pinned field block", failure: "By step twelve the run refers to the invoice rather than to 8812, and composes an amount when asked." },
      { subsystem: "Verification", removed: "Amount cross-check and read-back", failure: "Error rate becomes incident rate: a wrong amount reaches a vendor email. Nothing in the run reports a problem." },
      { subsystem: "Scope", removed: "Argument scoping on the write tool", failure: "A duplicate-payment run updates vendor payment terms. helpful, coherent, unauthorised." },
      { subsystem: "Lifecycle", removed: "Clean start and step cap", failure: "A run inherits a previous item's context and produces a confident answer about the wrong invoice." },
    ],
    note: `${NOTE} Each removal produces a different, recognisable failure.`,
  },
  "declared-done": {
    goal: "The agent reports completion.",
    variants: [
      {
        label: "Declared complete",
        blurb: "The run ends on the model's own statement.",
        outcome: "Item leaves the queue. Nothing was written.",
        ok: false,
        steps: [
          T("model", "Proposes post_ap_note", "post_ap_note(...)", { tokens: 1180 }),
          T("tool", "ERP responds", "409 conflict. record locked by another session", { ok: false }),
          T("model", "Reports", "I have posted the note and set a follow-up for 14 March.", { flag: "generated claim; the write failed" }),
          T("human", "Queue", "Item marked complete and removed.", { flag: "no note exists" }),
        ],
      },
      {
        label: "Verified complete",
        blurb: "The same run with a read-back.",
        outcome: "Failure caught in-run, item parked with a reason.",
        ok: true,
        steps: [
          T("model", "Proposes post_ap_note", "post_ap_note(...)", { tokens: 1180 }),
          T("tool", "ERP responds", "409 conflict. record locked by another session", { ok: false }),
          T("check", "Read-back", "No note found on invoice record → check fails", { ok: false }),
          T("human", "Escalation", "Parked: write failed, record locked. Retry scheduled.", {}),
        ],
      },
    ],
    note: `${NOTE} The only difference is one check that could come back negative.`,
  },
  "full-trace": {
    goal: `Complete trace for invoice ${CASE.invoice}, with every field.`,
    variants: [
      {
        label: "Full record",
        outcome: "Replayable from bytes. Total 4,281 tokens, $0.023, 11.4 s.",
        ok: true,
        steps: [
          T("model", "Step 1 · propose", `context 1,340 tk · model pinned · proposes get_invoice("${CASE.invoice}")`, { tokens: 1340, cost: 0.005 }),
          T("gate", "Step 1 · decide", "allowlist ✓ · scope ✓ · argument validated ✓ → execute", { ok: true }),
          T("tool", "Step 1 · result", `raw: {vendor, amount, terms, po} · 180 tk`, { tokens: 180 }),
          T("model", "Step 2 · propose", "context 1,520 tk · proposes get_receiving(po)", { tokens: 1520, cost: 0.006 }),
          T("gate", "Step 2 · decide", "allowlist ✓ · scope ✓ → execute", { ok: true }),
          T("tool", "Step 2 · result", "raw: {found: false} · 20 tk", { tokens: 20 }),
          T("model", "Step 3 · propose", "context 1,540 tk · proposes draft_email", { tokens: 1540, cost: 0.007 }),
          T("check", "Step 3 · checks", "schema ✓ · identifiers resolve ✓ · recipient allowlisted ✓ · no unsourced numerals ✓", { ok: true }),
          T("gate", "Step 4 · decide", "external send → held for approval", { ok: true }),
          T("human", "Step 4 · approval", "Approved by queue owner, 09:41", {}),
          T("check", "Step 5 · read-back", "note AP-99214 present on record ✓", { ok: true }),
        ],
      },
    ],
    note: `${NOTE} Six fields per step: context in, model and settings, proposed, executed, raw result, check outcomes. Plus cost and latency.`,
  },
  staging: {
    goal: "Stage the invoice queue through three levels.",
    variants: [
      {
        label: "Stage progression",
        outcome: "Each stage earns the next.",
        ok: true,
        steps: [],
      },
    ],
    stages: [
      { label: "Stage 1 · Packet", what: "Assemble what a person needs and present it. No action.", auto: 0, reviewMin: 2.1, exposure: "None. Read-only.", exit: "Material assembled correctly on ≥ 90% of items across 200 items." },
      { label: "Stage 2 · Draft", what: "Propose the action; a person executes.", auto: 0, reviewMin: 1.4, exposure: "None. Nothing is written by the system.", exit: "Draft accepted without material edit on ≥ 85% across 300 items." },
      { label: "Stage 3 · One write", what: "Internal note posts automatically under a threshold. Everything else drafts.", auto: 0.42, reviewMin: 0.9, exposure: "Internal records only. Reversible. 20% sampled.", exit: "Sampled accuracy ≥ 97% across 400 items before the next action type." },
    ],
    note: `${NOTE} Review minutes per item fall across the stages while exposure rises one class at a time.`,
  },
  incident: {
    goal: "A chase went to the wrong vendor with another customer's amount.",
    variants: [
      {
        label: "The incident trace",
        outcome: "External send completed. Wrong amount disclosed to a genuine counterparty.",
        ok: false,
        steps: [
          T("model", "Step 1 · propose", 'search_records(query: "Acme invoice outstanding")', { tokens: 720, flag: "entity and invoice number were both known. a fetch was available" }),
          T("gate", "Step 1 · decide", "search tool on allowlist · read scope → execute", { ok: true }),
          T("tool", "Step 1 · result", "3 candidates ranked: [0] Acme Industrial (entity UK-02) $14,200 · [1] Acme Industrial (entity US-01) $14,200 · [2] Acme Ltd $1,420", { tokens: 260, flag: "top-ranked record belongs to a different entity" }),
          T("model", "Step 2 · propose", "Uses candidate [0] amount and invoice number in the draft", { tokens: 980 }),
          T("check", "Step 2 · checks", "schema ✓ · recipient allowlisted ✓ · numerals sourced ✓ (they were. from the wrong record)", { ok: true, flag: "no check compared the drafted amount against the record for THIS entity" }),
          T("gate", "Step 3 · decide", "send_email · recipient is a genuine counterparty on the allowlist → execute", { ok: true, flag: "recipient was not constrained to the counterparty on the fetched record" }),
          T("tool", "Step 3 · result", "Sent 11:04.", {}),
        ],
      },
    ],
    note: `${NOTE} Every component behaved as designed. Three design decisions produced the outcome.`,
  },
};
