import type {
  HitlPosture,
  UseCaseDiagram,
  UseCaseFamily,
  UseCaseIndustry,
} from "./use-case-types";

export type {
  HitlPosture,
  UseCaseDiagram,
  UseCaseFamily,
  UseCaseIndustry,
} from "./use-case-types";

export type UseCase = {
  slug: string;
  title: string;
  blurb: string;
  industry: UseCaseIndustry;
  family: UseCaseFamily;
  hitl: HitlPosture;
  systems: string[];
  what: string;
  /** One-line frame for an OP / COO reading this cold. */
  operatorLens: string;
  whyItMatters: string;
  valueMoves: { title: string; where: string; signal: string }[];
  leakageToday: { title: string; body: string }[];
  roles: { role: string; today: string; withAgents: string }[];
  watchMetrics: { metric: string; move: string; note: string }[];
  orgShift: string;
  fitWhen: string[];
  leadershipAsks: string[];
  unitEconomics: {
    unit: string;
    framing: string;
    human: { summary: string; lineItems: { label: string; detail: string }[] };
    agent: { summary: string; lineItems: { label: string; detail: string }[] };
    crossover: string;
    sensitivities: string[];
  };
  baseline: string;
  agentPath: string;
  steps: { title: string; body: string }[];
  tools: string[];
  skills: string[];
  memory: string[];
  qa: string[];
  guardrails: string[];
  hitlNotes: string[];
  agentOwns: string[];
  humanOwns: string[];
  gates: string[];
  staging: string[];
  diagram: UseCaseDiagram;
};

export const USE_CASES: UseCase[] = [
 {
 slug: "shared-inbox-triage",
 title: "Shared inbox triage and exception routing",
 blurb:
 "Inbound mail and Teams treated as a work queue: classify, file, act on allowlists, escalate judgment.",
 industry: "Cross-industry",
 family: "Inbox & communications",
 hitl: "Review-gated",
 systems: ["Email", "Teams", "CRM", "ERP", "TMS"],
 what: "A shared operational inbox (orders, status, claims, AP, please-advise) becomes a continuous work queue. Agents classify, extract, open or update the right system record, take standard actions, and only surface items that need judgment. People stop living in the inbox and spend time on exceptions and customers.",
 operatorLens:
 "Turn the shared inbox from a hidden labor pool into a measured work queue, with agents on volume and humans on judgment.",
 whyItMatters:
 "Most mid-market operators still run order changes, status chases, AP noise, and please-advise traffic through shared mailboxes. That labor does not show up cleanly in the org chart, but it shows up as overtime, SLA misses, duplicate CRM updates, and managers who cannot say how many touches a 'simple' status request actually costs. For an operating partner or COO, this is usually a high-frequency, low-glory workflow that sits under several P&Ls at once (CS, ops, finance), so fixing it compounds across the company without a rip-and-replace system project.",
 valueMoves: [
 {
 title: "Labor off triage",
 where: "CS · ops · AP shared boxes",
 signal:
 "Hours leave open-and-refile work; capacity returns to exceptions and customers without adding headcount.",
 },
 {
 title: "Faster first response",
 where: "Customer / carrier / vendor SLAs",
 signal:
 "Time-to-first-meaningful-action drops because classification and filing are continuous, not batch-opened at 9am.",
 },
 {
 title: "Cleaner system of record",
 where: "CRM · ERP · TMS",
 signal:
 "Fewer ghost threads and duplicate records; leadership can trust queue metrics instead of mailbox folklore.",
 },
 {
 title: "Spike resilience",
 where: "Peak seasons · promotions · outages",
 signal:
 "Volume spikes no longer imply proportional overtime or silent SLA breach.",
 },
 ],
 leakageToday: [
 {
 title: "Triple-read and reforward",
 body: "The same thread is opened by three people before anyone owns it. Each open is unpaid search time.",
 },
 {
 title: "Copy-paste into the 'real' system",
 body: "Fields live in mail until someone re-keys them. Errors and lag land downstream as wrong promises and missed updates.",
 },
 {
 title: "Priority by volume of shouting",
 body: "Without a queue, urgent-but-quiet work loses to whoever escalates hardest. Margin and retention both feel that.",
 },
 {
 title: "Unmeasured admin load",
 body: "Managers staff to 'keep the box green' with no unit economics on touches per intent.",
 },
 ],
 roles: [
 {
 role: "CS / ops coordinator",
 today: "Lives in the mailbox; re-keys; writes the same reply all day.",
 withAgents:
 "Works a short exception and relationship queue; reviews gated drafts.",
 },
 {
 role: "Team lead / supervisor",
 today: "Firefights SLA misses; cannot see true WIP or intent mix.",
 withAgents:
 "Watches intent mix, auto-rate, and exception aging in the systems already used.",
 },
 {
 role: "COO / OP",
 today: "Sees overtime and complaints; no clean lever on inbound labor.",
 withAgents:
 "Gets a measurable wedge: auto-handled share, exception rate, SLA by intent.",
 },
 ],
 watchMetrics: [
 {
 metric: "Auto-handled share by intent",
 move: "Up, with QA holding",
 note: "Primary productivity lever. Only expand allowlists when sample audits stay clean.",
 },
 {
 metric: "Time to first disposition",
 move: "Down",
 note: "From message arrival to filed/acted/escalated, not just 'opened.'",
 },
 {
 metric: "Touches per closed thread",
 move: "Down",
 note: "Collapses reforward and rework; good proxy for hidden labor.",
 },
 {
 metric: "Exception queue age",
 move: "Stable or down",
 note: "If this rises while auto-share rises, you automated the wrong slice.",
 },
 {
 metric: "Wrong-entity / wrong-update rate",
 move: "Down (sampled)",
 note: "Safety metric. Gate expansion on this, not on speed alone.",
 },
 ],
 orgShift:
 "The inbox stops being a place people 'live.' It becomes an intake rail into CRM/ERP/TMS. Supervisors manage exception aging and allowlist health the way they would manage a ticket queue, not by scrolling mail. Change management stays thin because review and send still happen in mail, Teams, or Dynamics.",
 fitWhen: [
 "Shared boxes with recurring intents (status, POD, order change, AP questions).",
 "Fields already exist in a system of record, but mail is the unofficial front door.",
 "Leadership can name 2-3 intents that are high-volume and low-judgment.",
 "Willingness to keep money-moving and novel language human-gated.",
 ],
 leadershipAsks: [
 "What share of inbound is truly novel versus five repeating intents?",
 "Where does the system of truth live today, and what still only exists in mail?",
 "Which actions are allowlisted on day one versus permanently gated?",
 "Who owns QA sampling when auto-actions start: ops, QA, or risk?",
 "What does good look like in 90 days: auto-share, SLA, or FTE hours returned?",
 ],
 baseline:
 "Mailboxes and Teams channels are the real system of record. Staff open threads, copy fields into CRM/ERP/TMS, chase missing information, and re-forward to whoever owns the queue. Priority is whoever shouts loudest. The same thread is read by three people. Standard replies are typed from memory. When volume spikes, SLAs slip through late responses, wrong updates, and duplicate work.",
 agentPath:
 "Inbound messages are ingested continuously. An agent classifies intent and entity, extracts structured fields, matches or creates the record in the system of truth, executes allowlisted actions for known intents, and writes a short disposition back into the thread or ticket. Ambiguous, high-value, or externally binding actions wait for a human in Dynamics, Teams, or the shared mailbox: the surfaces the team already uses.",
 steps: [
 {
 title: "Ingest",
 body: "Mail or Teams connector pulls new messages and thread context into the harness.",
 },
 {
 title: "Classify",
 body: "Intent, urgency, and schema (order change, POD request, invoice dispute, and so on).",
 },
 {
 title: "Resolve entity",
 body: "Match customer, shipment, PO, or claim against CRM/ERP/TMS. Weak matches open a needs-identity exception.",
 },
 {
 title: "Extract",
 body: "Dates, quantities, references, and attachments become a structured payload.",
 },
 {
 title: "Route",
 body: "Allowlisted auto-path, review-gated path, or escalate to a human queue.",
 },
 {
 title: "Act",
 body: "Update the record, create a task, send a templated reply, attach documents, only with scoped permissions.",
 },
 {
 title: "Close the loop",
 body: "Disposition on the thread or ticket. Memory keeps how this counterparty usually arrives.",
 },
 {
 title: "QA sample",
 body: "Random and risk-weighted samples of auto-actions land in the existing audit queue.",
 },
 ],
 tools: [
 "Mail / Teams APIs",
 "CRM · ERP · TMS connectors",
 "Ticket write",
 "Template send",
 ],
 skills: [
 "Intent schemas",
 "Extraction schemas",
 "Entity resolution",
 "Reply packs per intent",
 ],
 memory: [
 "Thread continuity",
 "Entity graph",
 "Prior dispositions",
 "House style for known counterparties",
 ],
 qa: [
 "Schema validation on extracted IDs",
 "Sampled audit of auto-actions",
 "Groundedness checks on entity matches",
 ],
 guardrails: [
 "No free-form external commitments",
 "No payment or credit without a gate",
 "Permission scopes per mailbox",
 ],
 hitlNotes: [
 "Weak entity match",
 "Novel intent",
 "High dollar or SLA risk",
 "Anything that changes money or contractual terms",
 ],
 agentOwns: [
 "Triage and extraction",
 "Record match and update for known intents",
 "Standard replies",
 "Chase for missing fields on a schedule",
 ],
 humanOwns: [
 "Novel disputes",
 "Relationship-sensitive tone",
 "Credit, refund, and price exceptions",
 "Legally binding language beyond templates",
 ],
 gates: [
 "External money-moving or contractual language",
 "First-time counterparties",
 "Confidence below threshold",
 ],
 staging: [
 "Read, classify, and draft in the existing mailbox. Humans still send.",
 "Auto-file into the system of record with review on mismatches.",
 "Allowlist one or two intents for auto-reply and status update.",
 "Expand allowlists as QA holds. Reviews stay in Dynamics, Teams, or the shared box.",
 ],
 unitEconomics: {
 unit: "per inbound thread that needs disposition",
 framing:
 "Illustrative sizing math for an OP or COO, not a measured engagement result. Build your own with loaded labor rates, observed minutes, and your provider bills. The point is the shape: human cost is mostly minutes; agent cost is tokens plus thin infra plus residual HITL minutes.",
 human: {
 summary:
 "Cost is almost entirely loaded labor and rework. A coordinator who spends 4-8 minutes opening, classifying, re-keying, and replying at a fully loaded $45-70/hr is already $3-9 per routine thread before duplicates and SLA fire drills.",
 lineItems: [
 {
 label: "Direct touch time",
 detail:
 "3-10 minutes for status, POD, and order-change intents once someone owns the thread.",
 },
 {
 label: "Hidden rework",
 detail:
 "Reforwards and triple-reads add 1-3 minutes that never appear on a timesheet line.",
 },
 {
 label: "Loaded rate",
 detail:
 "Use fully loaded CS/ops cost, not wage alone. Overtime and agency fill during spikes raise effective cost per thread.",
 },
 {
 label: "Error tax",
 detail:
 "Wrong updates and missed SLAs show up as credits, expedites, and manager time, not in the mailbox metric.",
 },
 ],
 },
 agent: {
 summary:
 "Steady-state cost is model tokens for classify/extract/act, connector and workflow infra, plus HITL minutes on the gated slice. Auto-handled intents should land well below human cost per thread; the gated tail still carries human minutes and must not be ignored in the average.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "One classify and extract pass is usually a small prompt; tool-calling and long threads cost more. Track cost per auto-disposition and per gated draft separately.",
 },
 {
 label: "Infra",
 detail:
 "Mail/Teams connectors, queueing, logging, and eval harness. Mostly fixed or step-fixed per mailbox cohort; allocate per thread at expected volume.",
 },
 {
 label: "HITL residual",
 detail:
 "Review-gated and escalated intents still burn human minutes. If 70% auto and 30% gated at 3 minutes, blended human minutes fall sharply but do not go to zero.",
 },
 {
 label: "QA sampling",
 detail:
 "Budget a fixed audit load (for example 2-5% of auto-actions). Cheap insurance that belongs in operating cost.",
 },
 ],
 },
 crossover:
 "Agent path usually wins when recurring intents are a large share of volume, loaded minutes per thread are material, and allowlists are wide enough that HITL is the exception. It loses if almost everything is novel, or if wrong-entity risk forces near-100% review.",
 sensitivities: [
 "Auto-handled share (the main lever on blended cost per thread).",
 "Loaded dollars per hour for the roles who live in the box today.",
 "Average tokens per disposition as tool-calling and context grow.",
 "HITL minutes on the gated tail and first-time counterparties.",
 "Spike weeks: human overtime versus near-flat marginal token cost.",
 ],
 },
 diagram: "inbox",
 },
 {
 slug: "detention-appointment-exceptions",
 title: "Detention and appointment exception handling",
 blurb:
 "TMS, gate times, and carrier mail reconciled into a continuous exception lane for detention and reslots.",
 industry: "3PL / logistics",
 family: "Scheduling & appointments",
 hitl: "Exception-heavy",
 systems: ["TMS", "WMS", "Email", "Carrier portals", "Dynamics"],
 what: "Detention, layover, missed appointments, and reschedule noise run as an agent-operated exception lane. The agent watches TMS/WMS and carrier or customer mail, assembles the factual packet, applies the playbook, and keeps humans on disputes and relationship-sensitive calls.",
 operatorLens:
 "Stop paying for detention you should have billed, and stop burning planners rebuilding timelines from mail.",
 whyItMatters:
 "In 3PL and distribution, appointment exceptions and detention are where operating discipline becomes P&L. The work is fragmented across TMS screens, gate events, and carrier mail, so the same site can overpay detention, underbill it, and still run planners into overtime. An OP or COO cares because this is recoverable margin and controllable labor in the same workflow, and because disputes get uglier the longer the factual packet is incomplete.",
 valueMoves: [
 {
 title: "Detention leakage closed",
 where: "Paid vs billed · waivers",
 signal:
 "Clock packets are complete and timely; fewer 'we'll eat it' decisions from missing timestamps.",
 },
 {
 title: "Planner capacity",
 where: "Yard · CS · planning desks",
 signal:
 "Humans stop assembling timelines; they decide disputes and VIP exceptions.",
 },
 {
 title: "Dock utilization",
 where: "Appointment adherence",
 signal:
 "Faster reslot proposals reduce idle doors and cascading late freight.",
 },
 {
 title: "Customer / carrier trust",
 where: "Notifications · dispute posture",
 signal:
 "Status goes out with facts attached; fewer he-said threads after the fact.",
 },
 ],
 leakageToday: [
 {
 title: "Detention paid, not billed",
 body: "Clocks start in someone's head. By the time finance asks, the packet is incomplete and the site waives.",
 },
 {
 title: "Planner overtime on reconstruction",
 body: "Every exception means rebuilding planned vs actual from TMS, WMS, and three email chains.",
 },
 {
 title: "Silent missed notifications",
 body: "TMS updated, customer never told, or the reverse. Relationship cost shows up later as chargebacks and lost lanes.",
 },
 {
 title: "Inconsistent site playbooks",
 body: "Friday Dock 3 quirks live in one planner's head. Coverage disappears on their day off.",
 },
 ],
 roles: [
 {
 role: "Planner / CSR",
 today: "Rebuilds timelines; argues timestamps; clicks reslots under pressure.",
 withAgents:
 "Works a short exception queue; approves or overrides playbook proposals.",
 },
 {
 role: "Site / ops manager",
 today: "Discovers detention surprises in weekly reviews.",
 withAgents:
 "Sees exception volume, clock exposure, and waiver rates as operating metrics.",
 },
 {
 role: "Finance / billing",
 today: "Chases packets after the fact; writes off for missing evidence.",
 withAgents:
 "Receives complete packets on the shipment file when the event happens.",
 },
 ],
 watchMetrics: [
 {
 metric: "Detention paid vs billed gap",
 move: "Gap closes",
 note: "The margin metric that justifies the wedge. Pair with waiver rate so you do not 'win' by overbilling.",
 },
 {
 metric: "Time to complete exception packet",
 move: "Down",
 note: "From detect to factual packet on the shipment record.",
 },
 {
 metric: "Planner minutes per exception",
 move: "Down",
 note: "Sampled time-in-motion; should fall as assembly automates.",
 },
 {
 metric: "Reslot lead time",
 move: "Down",
 note: "Faster offers when capacity rules allow. Watch VIP override rate separately.",
 },
 {
 metric: "Dispute overturn rate",
 move: "Stable or down",
 note: "If auto-packets drive more overturns, clock rules or evidence quality need work.",
 },
 ],
 orgShift:
 "Exceptions become a first-class queue inside TMS/Teams, not a side hustle in mail. Site playbooks get written down because the agent cannot run on folklore. Billing and planning share one packet instead of reconciling two weeks later. Humans stay on money and relationship decisions; the agent owns detection and assembly.",
 fitWhen: [
 "Detention or appointment noise is a known margin conversation already.",
 "TMS + some gate/WMS signal exists (even if messy).",
 "Carrier/customer mail is a parallel channel planners already watch.",
 "Leadership will gate bill/waive, with no appetite for fully autonomous money moves.",
 ],
 leadershipAsks: [
 "What is our detention paid-vs-billed gap by site today?",
 "Which sites have playbooks vs tribal knowledge?",
 "Where do gate/WMS timestamps actually live, and how trustworthy are they?",
 "Who is allowed to waive, and is that enforced anywhere but email?",
 "What is the first auto-cohort: one site, one customer, or one exception type?",
 ],
 baseline:
 "Planners and CSRs live in TMS appointment screens and a flood of truck-is-here / dock-closed / reschedule email. Someone rebuilds the timeline from notes, mail, and gate times; argues with the carrier; updates TMS; sometimes forgets the customer notification. Detention claim packets are assembled late, with missing timestamps. Margin leaks as detention paid, detention not billed, and planner overtime.",
 agentPath:
 "Agents continuously reconcile appointment state in TMS with gate and WMS events and inbound messages. When an exception pattern fires, the agent builds a timestamped packet, applies the playbook (reschedule offer, detention clock rules, notification set), updates TMS, and escalates only when the playbook ends or exposure crosses a gate. Humans work a short exception queue inside TMS or Teams, not a parallel spreadsheet.",
 steps: [
 {
 title: "Watch",
 body: "TMS appointments, WMS or gate scans, and the mailbox for that lane or customer.",
 },
 {
 title: "Detect",
 body: "Late arrival, window breach, dwell past threshold, cancel or reschedule language in mail.",
 },
 {
 title: "Assemble packet",
 body: "Planned window, actuals, prior messages, and contract detention terms from the customer playbook.",
 },
 {
 title: "Propose resolution",
 body: "Reslot options from capacity rules; detention start and stop per tariff playbook; who to notify.",
 },
 {
 title: "Execute allowlisted updates",
 body: "TMS reschedule, outbound status templates, packet attached to the shipment record.",
 },
 {
 title: "Escalate",
 body: "Disputed timestamps, preferred-customer handling, waivers or invoices outside rules.",
 },
 {
 title: "Site memory",
 body: "Confirmed quirks (for example Friday Dock 3 cutoff) become playbook notes after a human confirms.",
 },
 ],
 tools: [
 "TMS API",
 "WMS / gate feed",
 "Mail",
 "Notification templates",
 "Shipment file attach",
 ],
 skills: [
 "Detention clocks",
 "Appointment reslot rules",
 "Customer-specific SOPs",
 ],
 memory: [
 "Site quirks",
 "Counterparty behavior",
 "Prior dispute outcomes (retrieval only)",
 ],
 qa: [
 "Packet completeness",
 "Clock math validation",
 "Sample of auto-reschedules",
 ],
 guardrails: [
 "No waiver or invoice of detention without a gate",
 "No customer-specific favors outside the playbook",
 ],
 hitlNotes: [
 "Disputes",
 "VIP accounts",
 "Clock conflicts",
 "Capacity overrides",
 ],
 agentOwns: [
 "Detection and packet assembly",
 "Standard reschedule and notifications",
 "Clock calculation per playbook",
 "Filing into TMS",
 ],
 humanOwns: [
 "Disputed facts",
 "Relationship exceptions",
 "Waivers and billing fights",
 "Capacity calls that break the plan",
 ],
 gates: [
 "Bill or waive detention",
 "Break appointment SLAs for preferred freight",
 "External promises beyond templates",
 ],
 staging: [
 "Packet assembly only. The planner still clicks in TMS.",
 "Draft reschedule and notify with one-click approve in Teams or TMS.",
 "Auto-run for a single site or customer cohort with tight QA.",
 "Keep TMS as the home screen; approvals appear on the shipment planners already open.",
 ],
 unitEconomics: {
 unit: "per appointment or detention exception",
 framing:
 "Illustrative sizing for site and network ops, not a billed case study. Detention leakage is often larger than the labor line, so unit economics here is labor plus the paid-versus-billed gap. Agent cost is packet assembly tokens, TMS/WMS integration, and planner minutes on disputes and waivers only.",
 human: {
 summary:
 "A planner rebuilding a timeline from TMS, gate events, and mail can burn 15-40 minutes per messy exception. At loaded $50-80/hr that is $12-50 of labor before the detention dollar itself is wrong.",
 lineItems: [
 {
 label: "Assembly labor",
 detail:
 "Fact packet build and reslot clicking dominate. Disputes multiply minutes.",
 },
 {
 label: "Detention cash",
 detail:
 "Paid-not-billed and casual waivers dwarf labor when clocks are incomplete. Size this in dollars per exception, not only hours.",
 },
 {
 label: "Notification misses",
 detail:
 "Downstream chargebacks and lost lanes are episodic but belong in the downside case.",
 },
 {
 label: "Overtime and coverage",
 detail:
 "Peak dock days raise effective loaded rate even if the hourly number on paper does not change.",
 },
 ],
 },
 agent: {
 summary:
 "Detection and packet assembly are the cheap, high-frequency slice. Tokens per exception stay modest if playbooks and schemas are tight. Infra is TMS/WMS connectors and eventing. Human cost remains on bill/waive and VIP overrides.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Event reconcile, playbook apply, and short notifications. Long mail threads and ambiguous disputes cost more; keep those gated.",
 },
 {
 label: "Infra",
 detail:
 "TMS/WMS feeds, shipment file writes, notification send. Mostly step-fixed per site or lane cohort.",
 },
 {
 label: "HITL residual",
 detail:
 "Disputes, waivers, and capacity breaks still need planners. Blended economics improve when assembly is automated even if money moves stay gated.",
 },
 {
 label: "Margin recover",
 detail:
 "Complete packets that raise billed detention or cut mistaken paybacks often repay infra faster than labor savings alone.",
 },
 ],
 },
 crossover:
 "Wins when exception volume is steady, timestamps exist (even noisy), and detention gap or planner minutes are already a leadership topic. Loses when gate data is fiction and every clock becomes a dispute.",
 sensitivities: [
 "Exceptions per site-day and share that need a full packet.",
 "Detention paid-versus-billed gap and waiver rate.",
 "Planner loaded rate and minutes per exception today.",
 "Share of exceptions that stay allowlisted versus escalated.",
 "Quality of gate/WMS timestamps (drives HITL rate).",
 ],
 },
 diagram: "detention",
 },
 {
 slug: "claim-intake-missing-info",
 title: "Claim intake, missing-info chase, and status sync",
 blurb:
 "Intake channels filed cleanly into the claims platform with completeness checks and scheduled chase.",
 industry: "TPA / claims",
 family: "Claims & intake",
 hitl: "Review-gated",
 systems: ["Claims platform", "Document store", "Email", "Employer portals"],
 what: "New claims and supplement packets move from mail and portals into the claims system with completeness checking and relentless chase for missing items. Examiners spend time on coverage and adjudication. Agents own intake hygiene and status labor.",
 operatorLens:
 "Pull examiners out of chase-and-rekey so cycle time is about decisions, not incomplete packets.",
 whyItMatters:
 "In TPA and claims ops, intake hygiene dominates cycle time long before adjudication quality does. Incomplete files, duplicate creates, and status pings burn examiner capacity and push indemnity and expense in the wrong direction. For a COO or OP, this is a classic 'agent owns volume, human owns judgment' wedge: the agent never pays or denies; it makes the examiner queue honest (ready vs blocked) and keeps chase on a metronome.",
 valueMoves: [
 {
 title: "Examiner capacity",
 where: "Adjudication desks",
 signal:
 "Time returns to coverage and settlement instead of missing-doc detective work.",
 },
 {
 title: "Cycle time to decision-ready",
 where: "FNOL → complete file",
 signal:
 "Blocked files are visible and chased on schedule; fewer silent stalls.",
 },
 {
 title: "Intake quality",
 where: "Duplicates · misfiles",
 signal:
 "Fewer double creates and wrong claim-type packets entering the queue.",
 },
 {
 title: "Employer / provider experience",
 where: "Status · chase clarity",
 signal:
 "Predictable asks for missing items; fewer 'what's going on?' piles on examiners.",
 },
 ],
 leakageToday: [
 {
 title: "Silent incomplete files",
 body: "Missing docs sit until someone remembers. Cycle time looks like 'examiner delay' when it is intake stall.",
 },
 {
 title: "Examiner as status desk",
 body: "High-cost humans answer 'did you get it?' instead of adjudicating.",
 },
 {
 title: "Re-key and rename theater",
 body: "Attachments bounce through shared drives before the claims platform, errors included.",
 },
 {
 title: "Inconsistent chase discipline",
 body: "One intake lead chases daily; another weekly. Employers learn which desks to ignore.",
 },
 ],
 roles: [
 {
 role: "Intake specialist",
 today: "Downloads, renames, keys, chases ad hoc.",
 withAgents:
 "Supervises completeness exceptions and edge claim types; tunes schemas.",
 },
 {
 role: "Examiner",
 today: "Interrupts adjudication for status and missing pieces.",
 withAgents:
 "Pulls ready-for-review with an intake brief; stays off routine chase.",
 },
 {
 role: "Claims ops leader",
 today: "Sees cycle time but not blocked vs ready mix.",
 withAgents:
 "Manages ready rate, chase effectiveness, and examiner touch time.",
 },
 ],
 watchMetrics: [
 {
 metric: "Share of files decision-ready on first examiner touch",
 move: "Up",
 note: "Core quality metric: complete packets, not just fast creates.",
 },
 {
 metric: "Days blocked on missing info",
 move: "Down",
 note: "Ages the incomplete queue; chase cadence should move this.",
 },
 {
 metric: "Examiner minutes on status / chase",
 move: "Down",
 note: "Sampled; should transfer to intake agent + templates.",
 },
 {
 metric: "Duplicate create rate",
 move: "Down",
 note: "Protects trust in the platform and avoids double work.",
 },
 {
 metric: "Chase response yield",
 move: "Up",
 note: "Percent of chases that clear a missing item. Tune templates and cadence.",
 },
 ],
 orgShift:
 "Intake becomes a production line with schemas and SLAs; examiners become a decision queue fed by ready work. Status labor leaves the examiner desk. The claims platform remains the system of action, with no parallel tracker. Payment, denial, and coverage language stay gated so risk and compliance stay comfortable expanding automation.",
 fitWhen: [
 "High volume of mail/portal intake with known required-doc packets by claim type.",
 "Examiners visibly interrupted by status and missing-info work.",
 "Leadership refuses agent authority on pay/deny, and wants automation anyway.",
 "A claims platform API or structured timeline write exists (or can).",
 ],
 leadershipAsks: [
 "What percent of examiner touches are on incomplete files today?",
 "Which claim types have a stable required-doc schema already?",
 "Who owns chase policy, and can templates be approved once?",
 "Where must SIU / fraud patterns short-circuit into a human immediately?",
 "What is the 90-day definition of done: ready-rate, cycle time, or examiner capacity?",
 ],
 baseline:
 "Intake teams download attachments, rename files, key fields into the claims platform, and email employers or providers for what is missing. Status questions burn examiner time. Incomplete filings sit silently until someone remembers. Cycle time is dominated by chase and re-key, not by decision quality.",
 agentPath:
 "Agents ingest intake channels, create or match the claim file, validate required documents against a schema for claim type, chase missing artifacts on a cadence through approved templates, and keep status current. Examiners pull a clean queue: ready-for-review versus blocked-on-missing-info. Binding coverage decisions and payments stay human-gated.",
 steps: [
 {
 title: "Ingest",
 body: "Portal drop, mail intake box, and document pipeline as needed.",
 },
 {
 title: "Identify claim type",
 body: "Select the completeness schema for the claim typology in use.",
 },
 {
 title: "Create or match file",
 body: "Claims platform API with duplicate detection.",
 },
 {
 title: "Completeness check",
 body: "Required documents and fields; produce a missing list tied to the file.",
 },
 {
 title: "Chase",
 body: "Scheduled outreach with templates; every touch logged on the claim timeline.",
 },
 {
 title: "Update status",
 body: "Received, incomplete, or ready for examiner, visible in the platform examiners already use.",
 },
 {
 title: "Hand off",
 body: "When complete, place in the examiner queue with an intake brief.",
 },
 {
 title: "Stop lines",
 body: "Suspicious patterns, coverage gray zones, or high-dollar first notices escalate immediately.",
 },
 ],
 tools: [
 "Claims platform",
 "Document store",
 "Mail / portal send",
 "Timeline write",
 ],
 skills: [
 "Claim-type packets",
 "Completeness schemas",
 "Chase cadences",
 "Intake brief writer",
 ],
 memory: [
 "Per-employer missing-doc patterns",
 "No invented policy language",
 ],
 qa: [
 "Required-doc checklist enforcement",
 "Duplicate-claim checks",
 "Sample of auto-chases",
 ],
 guardrails: [
 "No denial, payment, or coverage position from the agent",
 "No legal-advice language",
 ],
 hitlNotes: [
 "Ready-for-adjudication review",
 "Anything that states coverage",
 "SIU or fraud flags",
 "Sensitive claimant tone exceptions",
 ],
 agentOwns: [
 "Intake filing",
 "Completeness and chase",
 "Status and packet hygiene",
 "Examiner brief",
 ],
 humanOwns: [
 "Adjudication",
 "Coverage interpretation",
 "Settlement",
 "Sensitive claimant communication",
 ],
 gates: [
 "Any determination, payment, or denial",
 "SIU referral",
 "Deviation from approved templates",
 ],
 staging: [
 "Completeness and missing list written onto existing claim notes.",
 "Draft chases for intake lead or examiner to send.",
 "Auto-chase on low-risk employer cohorts with frequency caps.",
 "Examiner UX stays blocked versus ready in the claims platform queue.",
 ],
 unitEconomics: {
 unit: "per new claim or supplement packet through intake",
 framing:
 "Illustrative TPA/ops sizing. Examiner time is expensive; intake and chase are high volume. Agent cost is document and classify tokens, claims-platform writes, chase sends, plus examiner minutes only when the file is ready or flagged.",
 human: {
 summary:
 "Intake re-key and chase often consume 20-60 minutes across the life of an incomplete file, much of it fragmented. Examiner interruptions for status add high-cost minutes on top. Fully loaded examiner time is usually several times intake clerk cost per hour.",
 lineItems: [
 {
 label: "Intake labor",
 detail:
 "Create/match, rename, checklist, and ad hoc chase across days.",
 },
 {
 label: "Examiner interrupt tax",
 detail:
 "Status and missing-doc questions pull high loaded dollars per hour off adjudication.",
 },
 {
 label: "Cycle-time capital",
 detail:
 "Days blocked on missing info delay disposition; expense and indemnity timing both move.",
 },
 {
 label: "Duplicate and misfile rework",
 detail:
 "Bad creates force cleanup that never shows in first-pass intake metrics.",
 },
 ],
 },
 agent: {
 summary:
 "Filing, completeness, and metronome chase are token- and connector-heavy but low compared with examiner hours returned. Infra is claims API, doc store, and mail/portal send. HITL remains on pay/deny and SIU, which is correct and should stay in the model as near-fixed human judgment cost.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Claim-type classify, doc checklist, intake brief. OCR and doc extraction dominate when packets are image-heavy; budget that line explicitly.",
 },
 {
 label: "Infra",
 detail:
 "Platform writes, timeline events, chase scheduler. Largely step-fixed per book of business.",
 },
 {
 label: "HITL residual",
 detail:
 "Examiners still adjudicate. The saving is minutes on incomplete and status work, not replacing indemnity decisions.",
 },
 {
 label: "Chase yield",
 detail:
 "Cost per cleared missing item matters. Low-yield chase wastes tokens and goodwill; tune cadence.",
 },
 ],
 },
 crossover:
 "Wins when incomplete rate and examiner interrupt time are visible, required-doc schemas exist, and leadership will not let an agent pay or deny. Loses when every file is bespoke and completeness rules cannot be written down.",
 sensitivities: [
 "Share of files incomplete at first examiner touch.",
 "Examiner versus intake loaded rates.",
 "Doc-extraction token cost for image-heavy packets.",
 "Chase rounds to clear a missing item.",
 "SIU/fraud short-circuit rate (human path).",
 ],
 },
 diagram: "claims",
 },
 {
 slug: "ar-collections-chase",
 title: "AR collections chase on the aging bucket",
 blurb:
 "Aging worked with playbooks: reminders, escalation, ERP notes. Humans stay on high-balance and sensitive accounts.",
 industry: "Cross-industry",
 family: "Collections & chase",
 hitl: "Mostly agent-run",
 systems: ["Dynamics", "NetSuite", "SAP", "Email"],
 what: "Collectors stop manually rebuilding chase lists from aging reports. An agent works standard reminder tiers, posts notes into ERP, and prepares call lists for humans where balance, dispute, or relationship risk warrants a person.",
 operatorLens:
 "Put collector time on conversations that move cash, not on rebuilding chase lists from aging exports.",
 whyItMatters:
 "AR chase is one of the cleanest agent wedges in the back office: high volume, rule-friendly tiers, and a system of record that already exists. Cash does not improve because someone sent more mail; it improves when the right accounts get the right touch at the right time, with notes that the next person can trust. COOs and OPs care about DSO, collector productivity, and dispute hygiene, and about not letting an agent invent payment plans or legal threats.",
 valueMoves: [
 {
 title: "Collector productivity",
 where: "Cash applications · collections desk",
 signal:
 "Hours leave list-building and tier-1 mail; humans take prepared call lists.",
 },
 {
 title: "DSO / aging shape",
 where: "Finance scorecard",
 signal:
 "Earlier, consistent touches on mid-buckets; fewer accounts rotting untouched.",
 },
 {
 title: "Note quality",
 where: "ERP customer timeline",
 signal:
 "Every touch is structured and findable. No more 'called, no answer' folklore.",
 },
 {
 title: "Dispute separation",
 where: "AR vs CS · sales",
 signal:
 "Disputed accounts suppress from blind chase; humans get a clean escalate path.",
 },
 ],
 leakageToday: [
 {
 title: "List hygiene as the job",
 body: "Collectors rebuild who-to-call from spreadsheets every morning. Cash conversations shrink.",
 },
 {
 title: "Skipped and double-touched accounts",
 body: "Without a metronome, some invoices get two reminders; others get none until 90+.",
 },
 {
 title: "Inconsistent ERP notes",
 body: "The next collector cannot see promise-to-pay history. Trust and tone degrade.",
 },
 {
 title: "Chase into disputes",
 body: "Accounts in formal dispute still get dunning, poisoning relationships and creating noise.",
 },
 ],
 roles: [
 {
 role: "Collector",
 today: "Exports aging; mails; notes sporadically; calls when time remains.",
 withAgents:
 "Works high-balance and sensitive calls from a prepared brief; owns plans and write-offs.",
 },
 {
 role: "AR manager",
 today: "Manages activity theater more than cash outcomes.",
 withAgents:
 "Tunes tiers, suppress rules, and escalation thresholds against aging movement.",
 },
 {
 role: "CFO / COO",
 today: "Sees DSO but not touch discipline underneath.",
 withAgents:
 "Gets a controllable operating system on mid-bucket chase without adding headcount.",
 },
 ],
 watchMetrics: [
 {
 metric: "DSO / % past-due by bucket",
 move: "Improve shape",
 note: "Judge mid-buckets first; 120+ often needs human or legal path.",
 },
 {
 metric: "Touches per collector hour (human)",
 move: "Up on high-value work",
 note: "Not raw email count: quality conversations and resolutions.",
 },
 {
 metric: "Promise-to-pay kept rate",
 move: "Up",
 note: "Requires structured notes and follow-through tasks.",
 },
 {
 metric: "Chase into dispute rate",
 move: "Down",
 note: "Suppress-list health; should trend toward zero blind dunning.",
 },
 {
 metric: "Auto-send QA fail rate",
 move: "Down / capped",
 note: "Gate tier expansion on template and suppress audits.",
 },
 ],
 orgShift:
 "Collections becomes playbook-driven: agents run tiers, humans run conversations and money decisions. ERP remains the spine: notes, tasks, and aging all in one place. Sales/CS disputes get a clean handoff instead of colliding with dunning. Leadership manages thresholds and cohort expansion like a credit policy, not a mail merge.",
 fitWhen: [
 "Clear aging report and customer master in ERP/Dynamics.",
 "Repeatable reminder language legal/finance will approve.",
 "Collector time visibly spent on list prep more than calls.",
 "Appetite to gate payment plans, write-offs, and legal demands.",
 ],
 leadershipAsks: [
 "What share of collector time is list prep vs live conversations?",
 "Which buckets and segments are safe for auto-reminder on day one?",
 "How are disputes flagged today, and can chase suppress on that flag?",
 "Who approves template language and escalation thresholds?",
 "What cash metric do we hold this wedge to in 90 days?",
 ],
 baseline:
 "Collectors pull aging, mail or call from static lists, and update ERP notes inconsistently. Follow-ups slip. The same account is touched twice or not at all. Time goes to list hygiene rather than conversations that move cash.",
 agentPath:
 "The agent works the aging bucket with playbooks (reminder, firm notice, escalate), posts structured notes into ERP or Dynamics, and builds daily call lists for humans on high-balance or sensitive accounts. Payment plans, write-offs, and legal language stay gated.",
 steps: [
 {
 title: "Pull aging",
 body: "ERP aging view scoped to the agent's cohort and currency rules.",
 },
 {
 title: "Score path",
 body: "Bucket by days past due, balance, dispute flag, and customer playbook.",
 },
 {
 title: "Execute tier",
 body: "Send approved template or open a human call task; write the touch to the customer timeline.",
 },
 {
 title: "Escalate",
 body: "Cross thresholds into collector queue with a brief of prior touches.",
 },
 {
 title: "QA",
 body: "Sample outbound language and suppress lists for accounts in formal dispute.",
 },
 ],
 tools: ["ERP aging API", "Email send", "Customer timeline write", "Task create"],
 skills: ["Reminder tiers", "Escalation thresholds", "Suppress rules"],
 memory: ["Prior touch sequence", "Promise-to-pay dates"],
 qa: ["Template-only outbound", "Suppress on dispute flags", "Sampled audits"],
 guardrails: ["No payment plans or write-offs", "No legal demand language"],
 hitlNotes: ["High balance", "Sensitive accounts", "Active disputes"],
 agentOwns: [
 "Tier-1 and tier-2 reminders",
 "ERP note hygiene",
 "Call-list prep for humans",
 ],
 humanOwns: ["Calls", "Payment plans", "Write-offs", "Legal handoff"],
 gates: ["Payment plans", "Write-offs", "Legal language"],
 staging: [
 "Draft sequences as ERP tasks. The collector still sends.",
 "Auto-send tier-1 reminders for a clean cohort.",
 "Expand tiers as QA holds; keep ERP as the system of action.",
 ],
 unitEconomics: {
 unit: "per invoice touch in the working aging buckets",
 framing:
 "Illustrative AR sizing. Human cost is collector minutes on list prep and low-tier mail; cash benefit shows up in DSO and kept promises. Agent cost is aging pulls, reminder tokens, ERP note writes, plus collector minutes on prepared high-balance calls.",
 human: {
 summary:
 "Collectors often spend a large share of the morning on list hygiene and tier-1 mail at loaded $40-65/hr. If half a day is prep for a desk, that cost dwarfs postage and sits before any conversation that moves cash.",
 lineItems: [
 {
 label: "List prep",
 detail:
 "Export, filter, skip-trace notes, and rebuild who to touch.",
 },
 {
 label: "Tier-1 and tier-2 mail",
 detail:
 "Low judgment, high volume. Easy to under-count because it feels like admin.",
 },
 {
 label: "Inconsistent notes",
 detail:
 "Rework when the next collector cannot trust the timeline.",
 },
 {
 label: "Cash opportunity",
 detail:
 "Minutes not spent on high-balance calls are the shadow cost of prep-heavy desks.",
 },
 ],
 },
 agent: {
 summary:
 "Playbook sends and ERP notes are cheap per touch at volume. Infra is ERP aging API and mail. HITL is concentrated on calls, plans, and write-offs. Blended cost per touch should fall; cash metrics depend on getting humans onto the right accounts faster, not on sending more mail alone.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Short template fills and escalation briefs. Keep context tight; do not stuff full ledger history into every send.",
 },
 {
 label: "Infra",
 detail:
 "Aging pull, suppress flags, timeline write, task create. Mostly shared AR platform cost allocated per touch.",
 },
 {
 label: "HITL residual",
 detail:
 "Collector calls and money decisions remain. Measure collector hours on conversations, not total outbound count.",
 },
 {
 label: "Dispute suppress",
 detail:
 "Blind chase into disputes wastes tokens and damages relationships; suppress quality is part of unit cost.",
 },
 ],
 },
 crossover:
 "Wins when mid-bucket volume is high, reminder language is approvable, and collectors are visibly stuck in prep. Loses when most dollars sit in complex disputes that need humans from the first touch.",
 sensitivities: [
 "Share of collector time on prep versus live conversations.",
 "Volume in auto-safe buckets versus dispute-heavy tails.",
 "Loaded collector rate.",
 "Tokens per send as templates and personalization grow.",
 "DSO movement in the targeted buckets (the outcome check).",
 ],
 },
 diagram: "collections",
 },

 {
 slug: "ap-invoice-exceptions",
 title: "AP invoice exception handling",
 blurb:
 "PO, receipt, and invoice mismatches worked as an exception queue: match, chase, code, escalate judgment.",
 industry: "Cross-industry",
 family: "Order-to-cash",
 hitl: "Review-gated",
 systems: ["ERP", "AP automation", "Email", "Procurement"],
 what: "Accounts payable exceptions stop living in shared inboxes and spreadsheet parks. An agent matches invoice to PO and receipt, codes what the playbook allows, chases missing goods receipts or credit memos, and parks only true judgment for AP and procurement.",
 operatorLens:
 "Turn AP exceptions from a mailbox backlog into a measured queue where agents clear matches and humans own coding fights and vendor politics.",
 whyItMatters:
 "Most mid-market AP teams still clear three-way match breaks by hand. The work looks clerical until you count cycle time to pay, early-pay discounts missed, duplicate payments, and procurement hours burned on receipt chases. For a COO or OP, this is a high-volume finance workflow with clean systems of record and a sharp split between allowlisted clears and gated judgment.",
 valueMoves: [
 {
 title: "Days to clear exception",
 where: "AP · procurement",
 signal:
 "Match breaks leave the queue faster when chase and coding follow a playbook instead of whoever opens mail first.",
 },
 {
 title: "AP and buyer capacity",
 where: "Finance ops · category managers",
 signal:
 "Hours return to true disputes and vendor negotiations instead of GR chase and re-key.",
 },
 {
 title: "Discount and duplicate leakage",
 where: "Cash · controls",
 signal:
 "Fewer invoices aging past discount windows; duplicate and already-paid checks catch earlier.",
 },
 {
 title: "Audit-ready trail",
 where: "ERP invoice timeline",
 signal:
 "Every chase and code decision lands on the invoice, not in a side spreadsheet.",
 },
 ],
 leakageToday: [
 {
 title: "Mailbox as the exception system",
 body: "Invoices bounce between AP and buyers with no aging owner and no standard disposition.",
 },
 {
 title: "GR chase by heroics",
 body: "Buyers get pinged ad hoc. Receipts land late; discounts die quietly.",
 },
 {
 title: "Inconsistent coding",
 body: "The same mismatch type gets different GL treatment depending on who worked it.",
 },
 {
 title: "Duplicate and short-pay noise",
 body: "Without a clean packet, teams either overpay or stall everything.",
 },
 ],
 roles: [
 {
 role: "AP processor",
 today: "Opens exceptions, emails buyers, re-keys when someone replies.",
 withAgents:
 "Works gated coding and vendor disputes; monitors auto-clear quality.",
 },
 {
 role: "Buyer / procurement",
 today: "Interrupted for receipt status and one-off explanations.",
 withAgents:
 "Sees structured chase only when the playbook needs a human confirmation.",
 },
 {
 role: "Controller / OP",
 today: "Sees AP aging but not exception unit economics.",
 withAgents:
 "Gets clear rate, aging, discount capture, and HITL share as operating metrics.",
 },
 ],
 watchMetrics: [
 {
 metric: "Exception clear rate within SLA",
 move: "Up",
 note: "Primary throughput metric by mismatch type.",
 },
 {
 metric: "Share auto-cleared vs HITL",
 move: "Auto up with QA holding",
 note: "Expand allowlists only when sample audits stay clean.",
 },
 {
 metric: "Buyer touches per exception",
 move: "Down",
 note: "Should fall as GR chase becomes metronomic.",
 },
 {
 metric: "Discounts captured vs missed",
 move: "Improve",
 note: "Outcome check that labor metrics alone miss.",
 },
 {
 metric: "Duplicate / already-paid catch rate",
 move: "Up (sampled)",
 note: "Control metric. Do not trade speed for silent overpays.",
 },
 ],
 orgShift:
 "AP exceptions become a queue inside ERP or the AP tool, not a shared inbox. Playbooks by mismatch type get written down. Procurement still owns receipt truth and relationship calls; the agent owns detection, chase, and allowlisted clears.",
 fitWhen: [
 "Three-way match exists even if noisy.",
 "A repeating set of mismatch types (price, qty, missing GR, tax) dominates volume.",
 "AP leadership will gate GL overrides and vendor debits.",
 "Email is currently the unofficial exception workflow.",
 ],
 leadershipAsks: [
 "What share of invoices hit exception, and which three types dominate?",
 "Where does exception aging live today: ERP, AP tool, or mail?",
 "Which mismatch types are safe to auto-clear on day one?",
 "Who owns GR truth, and can chase templates be approved once?",
 "What is the 90-day scoreboard: clear SLA, discount capture, or AP FTE hours?",
 ],
 unitEconomics: {
 unit: "per AP invoice exception",
 framing:
 "Illustrative finance-ops sizing, not a measured engagement result. Human cost is AP and buyer minutes plus discount leakage. Agent cost is match/chase tokens, ERP connectors, and HITL on coding and disputes.",
 human: {
 summary:
 "A routine missing-GR or price break can burn 10-25 minutes across AP and procurement before it clears. At loaded $40-75/hr that is already several dollars per exception before missed discounts.",
 lineItems: [
 {
 label: "AP touch time",
 detail:
 "Open, diagnose, email, re-check, code, release.",
 },
 {
 label: "Buyer interrupt tax",
 detail:
 "High loaded cost when category managers become receipt help desks.",
 },
 {
 label: "Discount leakage",
 detail:
 "Days stuck in exception quietly forfeit early-pay economics.",
 },
 {
 label: "Control failures",
 detail:
 "Duplicates and wrong codes create downstream cleanup and audit cost.",
 },
 ],
 },
 agent: {
 summary:
 "Matching, standard chase, and allowlisted clears are cheap per exception at volume. Infra is ERP and AP connectors. HITL remains for GL judgment and vendor fights, which keeps risk comfortable while auto-share rises.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Match explain, chase draft, coding suggestion. Keep invoice OCR cost explicit when images dominate.",
 },
 {
 label: "Infra",
 detail:
 "ERP invoice API, PO/receipt reads, mail send. Mostly step-fixed per entity.",
 },
 {
 label: "HITL residual",
 detail:
 "Coding disputes and vendor negotiations stay human. Blended minutes fall when chase is automated.",
 },
 {
 label: "QA sampling",
 detail:
 "Sample auto-clears and coding suggestions. Budget it into run cost.",
 },
 ],
 },
 crossover:
 "Wins when mismatch types repeat and GR/price plays are documentable. Loses when almost every invoice is a bespoke commercial fight.",
 sensitivities: [
 "Exception rate and type mix.",
 "AP and buyer loaded rates.",
 "Auto-clear share by type.",
 "OCR/token cost on image-heavy invoices.",
 "Discount dollars tied to clear speed.",
 ],
 },
 baseline:
 "Invoices that fail three-way match land in an AP queue or, more often, a shared mailbox. Processors email buyers for goods receipts, re-check the match, argue price or tax, and re-key when someone replies. The same exception type is handled differently by different people. Aging is opaque. Early-pay discounts slip. Duplicate invoices sometimes pay because the trail is fragmented.",
 agentPath:
 "Invoices and match results ingest continuously. An agent classifies the break, assembles the PO/receipt/invoice packet, runs allowlisted clears, and chases missing receipts or credits on a cadence through approved templates. Coding suggestions and vendor debit proposals stay review-gated. Humans work a short judgment queue inside ERP or the AP tool they already use.",
 steps: [
 {
 title: "Ingest",
 body: "ERP AP exceptions and invoice images or EDI as needed.",
 },
 {
 title: "Classify break",
 body: "Price, quantity, missing GR, tax, duplicate, or other.",
 },
 {
 title: "Assemble packet",
 body: "PO, receipts, prior invoices, vendor notes.",
 },
 {
 title: "Allowlisted clear",
 body: "Within tolerance rules: match and release with audit note.",
 },
 {
 title: "Chase",
 body: "Missing GR or credit memo templates to the buyer or vendor on a schedule.",
 },
 {
 title: "Suggest coding",
 body: "GL or tolerance override draft for AP review when required.",
 },
 {
 title: "Escalate",
 body: "Commercial disputes, new vendors, or policy breaks to humans.",
 },
 {
 title: "QA sample",
 body: "Sampled auto-clears and coding suggestions into the audit queue.",
 },
 ],
 tools: [
 "ERP AP / PO / receipt APIs",
 "AP inbox or ticket write",
 "Mail / vendor portal send",
 "Duplicate detection",
 ],
 skills: [
 "Match-break schemas",
 "Tolerance playbooks",
 "Chase packs by break type",
 "Coding suggestion rules",
 ],
 memory: [
 "Vendor mismatch patterns",
 "Buyer response habits",
 "Prior dispositions on similar breaks",
 ],
 qa: [
 "Tolerance math validation",
 "Duplicate checks before release",
 "Sampled auto-clear audits",
 ],
 guardrails: [
 "No GL override without a gate",
 "No vendor debit or short-pay without a gate",
 "Permission scopes per company code",
 ],
 hitlNotes: [
 "Out-of-tolerance price or qty",
 "New vendor or unusual tax",
 "Commercial disputes",
 "Anything that changes payment amount beyond playbook",
 ],
 agentOwns: [
 "Break classification and packet assembly",
 "Allowlisted clears",
 "GR and credit chase",
 "Audit notes on the invoice",
 ],
 humanOwns: [
 "GL and policy overrides",
 "Vendor negotiations",
 "Fraud or duplicate judgment calls",
 "Relationship-sensitive tone",
 ],
 gates: [
 "Payment amount changes outside tolerance",
 "GL coding overrides",
 "Vendor debit memos",
 ],
 staging: [
 "Packet assembly and missing-GR lists on existing invoice notes.",
 "Draft chases for AP to send.",
 "Auto-clear one low-risk break type with tight QA.",
 "Expand types as audits hold; keep ERP as the system of action.",
 ],
 diagram: "ap",
 },
 {
 slug: "customs-entry-document-packs",
 title: "Customs entry document pack completion",
 blurb:
 "Commercial invoice, packing list, and cert chase so entries file complete the first time.",
 industry: "Customs brokerage",
 family: "Document packs & filings",
 hitl: "Review-gated",
 systems: ["Brokerage platform", "Email", "Carrier portals", "Document store"],
 what: "Import entries stop stalling on missing commercial invoices, packing lists, ISF pieces, or certificates. An agent builds the entry packet, checks completeness by entry type, chases shippers and carriers on a cadence, and hands brokers a ready file. Classification and binding advice stay human.",
 operatorLens:
 "Pull brokers off document chase so cycle time is about classification and exception judgment, not hunting PDFs.",
 whyItMatters:
 "In brokerage, incomplete packets dominate delays and overtime long before hard classification questions do. Missing docs trigger storage, demurrage exposure, and after-hours fire drills. For an OP sitting on a brokerage or a shipper with embedded broker ops, this is a classic volume wedge: agents own pack hygiene; licensed humans own classification and filings that bind.",
 valueMoves: [
 {
 title: "Broker capacity",
 where: "Entry desks",
 signal:
 "Licensed time returns to classification and true exceptions.",
 },
 {
 title: "Time to entry-ready",
 where: "Doc pack → fileable entry",
 signal:
 "Blocked packs are visible and chased on schedule.",
 },
 {
 title: "Storage and demurrage exposure",
 where: "Port / CFS dwell",
 signal:
 "Fewer entries idle waiting on a packing list nobody chased.",
 },
 {
 title: "Shipper experience",
 where: "Importers and forwarders",
 signal:
 "Predictable asks for missing docs instead of last-minute scrambles.",
 },
 ],
 leakageToday: [
 {
 title: "Silent incomplete packs",
 body: "Entries sit until someone notices a missing commercial invoice.",
 },
 {
 title: "Broker as document desk",
 body: "High-cost license holders chase PDFs instead of classifying.",
 },
 {
 title: "Inconsistent checklists",
 body: "Required docs vary by who worked the file that day.",
 },
 {
 title: "After-hours spikes",
 body: "Late vessels create overtime because chase never ran during the day.",
 },
 ],
 roles: [
 {
 role: "Documentation specialist",
 today: "Downloads, renames, chases ad hoc across mail and portals.",
 withAgents:
 "Tunes schemas and handles edge doc types; supervises auto-chase.",
 },
 {
 role: "Licensed broker",
 today: "Interrupted for missing-doc status.",
 withAgents:
 "Pulls ready packs; stays on classification and binding decisions.",
 },
 {
 role: "Ops leader",
 today: "Sees overtime and demurrage surprises.",
 withAgents:
 "Manages ready rate, chase yield, and broker touch time.",
 },
 ],
 watchMetrics: [
 {
 metric: "Share of entries doc-ready before broker touch",
 move: "Up",
 note: "Core quality metric.",
 },
 {
 metric: "Hours blocked on missing docs",
 move: "Down",
 note: "Ages the incomplete queue.",
 },
 {
 metric: "Broker minutes on doc chase",
 move: "Down",
 note: "Should transfer to the agent and templates.",
 },
 {
 metric: "Chase response yield",
 move: "Up",
 note: "Percent of chases that clear a missing artifact.",
 },
 {
 metric: "Demurrage / storage tied to doc delay",
 move: "Down",
 note: "Outcome check with finance.",
 },
 ],
 orgShift:
 "Document completion becomes a production line with schemas by entry type. Brokers become a decision queue fed by ready packs. The brokerage platform stays the system of action. Classification and filings that create legal exposure stay gated.",
 fitWhen: [
 "High volume of repeating entry types with known required-doc lists.",
 "Brokers visibly interrupted by missing-doc work.",
 "Leadership refuses agent authority on classification advice.",
 "Mail and carrier portals are already where docs arrive.",
 ],
 leadershipAsks: [
 "What percent of broker touches are on incomplete packs today?",
 "Which entry types have a stable required-doc schema?",
 "Who owns chase policy toward shippers and carriers?",
 "Where must licensed review short-circuit immediately?",
 "What is the 90-day definition of done: ready-rate, dwell, or overtime?",
 ],
 unitEconomics: {
 unit: "per import entry document pack",
 framing:
 "Illustrative brokerage sizing. Human cost is doc specialist and broker minutes plus dwell risk. Agent cost is classify/checklist tokens, platform writes, chase sends, and HITL on classification.",
 human: {
 summary:
 "Incomplete packs often absorb 15-45 minutes of fragmented chase before a broker can work the entry. Broker interrupt time is the expensive line.",
 lineItems: [
 {
 label: "Doc labor",
 detail: "Collect, rename, checklist, chase across parties.",
 },
 {
 label: "Broker interrupt tax",
 detail: "Licensed hours on status instead of classification.",
 },
 {
 label: "Dwell exposure",
 detail: "Storage and demurrage when packs stall.",
 },
 {
 label: "Rework",
 detail: "Wrong or partial packs force re-entry work.",
 },
 ],
 },
 agent: {
 summary:
 "Completeness and metronome chase are cheap relative to broker hours returned. Infra is brokerage platform and mail/portals. HITL stays on classification and filing authority.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Doc-type identify and checklist. Image-heavy packets need an explicit OCR line.",
 },
 {
 label: "Infra",
 detail:
 "Platform file writes, timeline, chase scheduler.",
 },
 {
 label: "HITL residual",
 detail:
 "Brokers still classify and file. Savings are chase and pack hygiene.",
 },
 {
 label: "Chase yield",
 detail:
 "Cost per cleared missing doc; tune cadence and templates.",
 },
 ],
 },
 crossover:
 "Wins when required-doc lists are writable and volume is steady. Loses when every shipment is a one-off regulatory puzzle with no schema.",
 sensitivities: [
 "Incomplete rate at first broker touch.",
 "Broker versus doc specialist loaded rates.",
 "OCR cost on scans.",
 "Chase rounds to clear a pack.",
 "Dwell dollars linked to doc delay.",
 ],
 },
 baseline:
 "Docs arrive by mail and portals. Staff download attachments, rename files, and build entry packets by hand. Missing commercial invoices or certificates trigger ad hoc emails. Brokers discover gaps late and chase under time pressure. Checklists live in people's heads. Overtime clusters around vessel bunches.",
 agentPath:
 "Agents ingest inbound docs and shipment references, create or match the entry file, validate required documents against the schema for that entry type, chase missing pieces on a cadence, and mark packs ready for the broker. Classification, binding rulings, and final filing stay human-gated in the brokerage platform.",
 steps: [
 {
 title: "Ingest",
 body: "Mail, portal drops, and carrier document feeds.",
 },
 {
 title: "Identify entry type",
 body: "Select the required-doc schema for the move.",
 },
 {
 title: "Match file",
 body: "Brokerage platform create or match with duplicate checks.",
 },
 {
 title: "Completeness check",
 body: "Required docs and key fields; produce a missing list.",
 },
 {
 title: "Chase",
 body: "Scheduled outreach to shipper, forwarder, or carrier with templates.",
 },
 {
 title: "Ready handoff",
 body: "Mark pack ready and attach an intake brief for the broker.",
 },
 {
 title: "Stop lines",
 body: "Restricted parties, odd valuation patterns, or novel entry types escalate immediately.",
 },
 ],
 tools: [
 "Brokerage platform",
 "Document store",
 "Mail / portal send",
 "Carrier doc APIs where available",
 ],
 skills: [
 "Entry-type packets",
 "Completeness schemas",
 "Chase cadences",
 "Intake brief writer",
 ],
 memory: [
 "Shipper missing-doc patterns",
 "Lane-specific cert requirements",
 ],
 qa: [
 "Required-doc checklist enforcement",
 "Duplicate entry checks",
 "Sample of auto-chases",
 ],
 guardrails: [
 "No classification or landed-cost advice from the agent",
 "No final customs filing without a licensed human",
 ],
 hitlNotes: [
 "Ready-for-classify review",
 "Any classification or valuation judgment",
 "Restricted party or exam flags",
 "Sensitive customer tone exceptions",
 ],
 agentOwns: [
 "Pack filing and completeness",
 "Missing-doc chase",
 "Status hygiene",
 "Broker brief",
 ],
 humanOwns: [
 "Classification",
 "Valuation judgment",
 "Filing authority",
 "Client advisory",
 ],
 gates: [
 "Any filing that binds the importer",
 "Classification or valuation statements",
 "Deviation from approved templates",
 ],
 staging: [
 "Completeness and missing lists written onto existing entry notes.",
 "Draft chases for docs leads to send.",
 "Auto-chase on clean shipper cohorts with frequency caps.",
 "Broker UX stays blocked versus ready in the platform queue.",
 ],
 diagram: "customs",
 },
 {
 slug: "property-work-order-vendor-chase",
 title: "Work order intake and vendor chase",
 blurb:
 "Resident requests become work orders; vendors are chased to accept, schedule, and close with proof.",
 industry: "Property management",
 family: "Inbox & communications",
 hitl: "Exception-heavy",
 systems: ["Property PMS", "Maintenance app", "Email", "SMS", "Vendor portals"],
 what: "Maintenance demand stops dying in resident email and WhatsApp threads. An agent turns requests into work orders, dispatches by playbook, chases vendors for accept/schedule/complete, and escalates only habitability, access, or spend judgments to managers.",
 operatorLens:
 "Make maintenance a closed-loop queue: agents on intake and vendor chase, humans on safety, spend, and resident-sensitive calls.",
 whyItMatters:
 "Property operators leak NOI through slow work orders, missed SLAs, and coordinators who live in inboxes. Residents churn on response time; vendors no-show; invoices arrive without completion proof. For an OP across a portfolio, this is a multi-site labor and resident-experience wedge that sits in systems they already run.",
 valueMoves: [
 {
 title: "Time to first dispatch",
 where: "Resident experience",
 signal:
 "Requests leave the inbox and become owned work orders quickly.",
 },
 {
 title: "Coordinator capacity",
 where: "Site and central maintenance desks",
 signal:
 "Hours leave status ping-pong; people handle access, scope, and upset residents.",
 },
 {
 title: "Vendor SLA adherence",
 where: "Accept · schedule · complete",
 signal:
 "Chase is metronomic; no-shows surface early.",
 },
 {
 title: "Close quality",
 where: "Completion proof · invoice match",
 signal:
 "Fewer pays without photos or sign-off.",
 },
 ],
 leakageToday: [
 {
 title: "Resident thread as the system",
 body: "Requests never become work orders, or become duplicates.",
 },
 {
 title: "Vendor chase by memory",
 body: "Coordinators remember who was texted. SLAs slip silently.",
 },
 {
 title: "Weak closeout",
 body: "Jobs mark done without proof; invoices fight later.",
 },
 {
 title: "After-hours panic",
 body: "Habitability issues compete with routine requests in the same undifferentiated inbox.",
 },
 ],
 roles: [
 {
 role: "Maintenance coordinator",
 today: "Triages mail/SMS, texts vendors, updates PMS late.",
 withAgents:
 "Handles exceptions, access, and scope changes; watches SLA aging.",
 },
 {
 role: "Site manager",
 today: "Discovers overdue work when residents escalate.",
 withAgents:
 "Sees aging and spend gates in the tools already used.",
 },
 {
 role: "Regional OP",
 today: "Compares properties on anecdotes.",
 withAgents:
 "Gets dispatch speed, vendor SLA, and HITL share by site.",
 },
 ],
 watchMetrics: [
 {
 metric: "Time request → work order → vendor accept",
 move: "Down",
 note: "Primary resident-facing throughput.",
 },
 {
 metric: "Vendor chase touches to accept",
 move: "Down",
 note: "Should fall with cadence and playbooks.",
 },
 {
 metric: "Overdue open work orders",
 move: "Down",
 note: "Portfolio operating metric.",
 },
 {
 metric: "Closeouts with required proof",
 move: "Up",
 note: "Quality before invoice.",
 },
 {
 metric: "Emergency misroute rate",
 move: "Down",
 note: "Safety metric. Habitability must not wait in the routine queue.",
 },
 ],
 orgShift:
 "Resident intake and vendor chase become agent-operated rails into the PMS. Coordinators manage exceptions and relationships. Spend and emergency definitions stay gated. Residents still hear from humans when tone and judgment matter.",
 fitWhen: [
 "PMS or maintenance system is the intended system of record.",
 "Vendor lists and SLA playbooks can be written down.",
 "Coordinators currently live in email/SMS.",
 "Leadership will gate spend thresholds and emergency definitions.",
 ],
 leadershipAsks: [
 "What share of requests never become work orders today?",
 "Which vendors and trades are safe for auto-dispatch?",
 "What is the emergency definition, and who is on-call?",
 "Where do completion photos and sign-off have to live?",
 "What is the 90-day scoreboard: dispatch speed, overdue count, or coordinator hours?",
 ],
 unitEconomics: {
 unit: "per maintenance request through close",
 framing:
 "Illustrative property-ops sizing. Human cost is coordinator minutes plus resident churn risk. Agent cost is intake/dispatch tokens, PMS connectors, SMS/email, and HITL on emergencies and spend.",
 human: {
 summary:
 "Coordinators often spend 8-20 minutes across intake, vendor pinging, and PMS updates per routine job, more when vendors no-show. Loaded site labor plus turnover risk dominates.",
 lineItems: [
 {
 label: "Coordinator touch time",
 detail: "Intake, dispatch, chase, closeout updates.",
 },
 {
 label: "Vendor no-show rework",
 detail: "Re-dispatch multiplies minutes and resident frustration.",
 },
 {
 label: "Resident churn risk",
 detail: "Slow response shows up in renewals, not the work-order report.",
 },
 {
 label: "Invoice fights",
 detail: "Missing proof creates AP and vendor noise later.",
 },
 ],
 },
 agent: {
 summary:
 "Intake, dispatch, and chase are cheap at portfolio volume. Infra is PMS and messaging. HITL on emergencies and spend caps keeps risk bounded while auto-share rises.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Request classify, work-order draft, chase briefs. Keep media/photo handling costed if heavy.",
 },
 {
 label: "Infra",
 detail:
 "PMS API, SMS/email, vendor portal hooks. Step-fixed per portfolio.",
 },
 {
 label: "HITL residual",
 detail:
 "Emergencies, access conflicts, and spend approvals stay human.",
 },
 {
 label: "QA sampling",
 detail:
 "Sample dispatches and closeout completeness.",
 },
 ],
 },
 crossover:
 "Wins when trades and SLAs are standard and volume is steady across sites. Loses when every job is a custom CapEx project with no playbook.",
 sensitivities: [
 "Request volume per site.",
 "Coordinator loaded rate.",
 "Auto-dispatch share by trade.",
 "Emergency rate (human path).",
 "Vendor accept latency.",
 ],
 },
 baseline:
 "Residents email, text, or portal-submit issues. Coordinators retype into the PMS, guess the trade, text a vendor, and wait. Follow-ups are manual. Emergencies compete with clogged drains in the same thread pile. Jobs close without photos. Invoices arrive unmatched.",
 agentPath:
 "Requests ingest from mail, SMS, and portals. An agent classifies urgency and trade, creates the work order in the PMS, dispatches per vendor playbook, chases accept/schedule/complete, and requires completion proof before close. Emergencies, spend over threshold, and access disputes escalate to humans in the PMS or Teams.",
 steps: [
 {
 title: "Ingest",
 body: "Resident channels and portal tickets.",
 },
 {
 title: "Classify",
 body: "Trade, urgency, unit, and habitability flags.",
 },
 {
 title: "Create work order",
 body: "PMS write with duplicate detection.",
 },
 {
 title: "Dispatch",
 body: "Vendor playbook: preferred list, SLA, message templates.",
 },
 {
 title: "Chase",
 body: "Accept, schedule, and completion nudges on a cadence.",
 },
 {
 title: "Closeout check",
 body: "Required photos or sign-off before done.",
 },
 {
 title: "Escalate",
 body: "Emergencies, no-shows, scope changes, spend gates.",
 },
 ],
 tools: [
 "PMS / maintenance API",
 "SMS and email",
 "Vendor portal messaging",
 "Photo attach",
 ],
 skills: [
 "Urgency and trade schemas",
 "Vendor dispatch playbooks",
 "Chase cadences",
 "Closeout checklists",
 ],
 memory: [
 "Unit history",
 "Vendor reliability patterns",
 "Access notes after human confirm",
 ],
 qa: [
 "Emergency classification sample",
 "Dispatch correctness sample",
 "Closeout proof enforcement",
 ],
 guardrails: [
 "No spend over threshold without approval",
 "No downgrade of habitability emergencies",
 "Resident legal/notice language stays templated or human",
 ],
 hitlNotes: [
 "Habitability and life safety",
 "Spend over threshold",
 "Access or resident conflict",
 "Vendor replacement after repeated no-shows",
 ],
 agentOwns: [
 "Intake to work order",
 "Routine dispatch and chase",
 "Closeout proof checks",
 "SLA aging visibility",
 ],
 humanOwns: [
 "Emergency response",
 "Spend approvals",
 "Resident-sensitive conversations",
 "Vendor relationship resets",
 ],
 gates: [
 "Emergency definition",
 "Spend threshold",
 "Non-template resident commitments",
 ],
 staging: [
 "Draft work orders from intake for coordinator publish.",
 "Auto-chase vendors on accept/schedule for one trade.",
 "Auto-dispatch a clean preferred-vendor cohort with QA.",
 "Keep PMS as the home screen for approvals and exceptions.",
 ],
 diagram: "workorder",
 },
 {
 slug: "asn-invoice-po-recon",
 title: "ASN, invoice, and PO mismatch reconciliation",
 blurb:
 "Inbound ASNs and supplier invoices reconciled to PO and receipt truth before planning and AP noise spreads.",
 industry: "Packaged goods",
 family: "Order-to-cash",
 hitl: "Exception-heavy",
 systems: ["ERP", "WMS", "EDI", "Supplier portals", "Email"],
 what: "Supply-chain mismatches between PO, ASN, receipt, and invoice become an agent-operated reconciliation lane. The agent builds the variance packet, applies trading-partner playbooks, updates systems where allowlisted, and escalates commercial or quality judgment.",
 operatorLens:
 "Stop planners and AP from rebuilding the same variance packet from EDI, WMS, and email every day.",
 whyItMatters:
 "In CPG and manufacturing networks, ASN and invoice variance creates phantom inventory, receiving delays, and AP exceptions downstream. The labor is fragmented across planning, warehouse, and finance. An OP cares because one reconciliation spine protects service level and cash, and because trading-partner playbooks are writable even when the data is messy.",
 valueMoves: [
 {
 title: "Time to resolved variance",
 where: "Planning · receiving · AP",
 signal:
 "Packets form once and route; fewer multi-team rebuilds.",
 },
 {
 title: "Planner and receiver capacity",
 where: "Supply and DC desks",
 signal:
 "Humans decide true shortages and quality holds, not copy EDI fields.",
 },
 {
 title: "Inventory truth",
 where: "ATP / WMS",
 signal:
 "Fewer phantom receipts and silent short ships.",
 },
 {
 title: "Downstream AP cleanliness",
 where: "Invoice match",
 signal:
 "Variances settled earlier reduce AP exception volume later.",
 },
 ],
 leakageToday: [
 {
 title: "Triple rebuild",
 body: "Planning, warehouse, and AP each reconstruct the same PO/ASN/invoice story.",
 },
 {
 title: "Email as EDI repair",
 body: "Supplier corrections live in threads that never update the system of record.",
 },
 {
 title: "Silent short ships",
 body: "ASN says full; receipt says short; nobody owns the clock.",
 },
 {
 title: "Partner inconsistency",
 body: "Each trading partner gets a different chase style and tolerance.",
 },
 ],
 roles: [
 {
 role: "Supply planner",
 today: "Reconciles ASN surprises against ATP by hand.",
 withAgents:
 "Works commercial and allocation exceptions from a prepared packet.",
 },
 {
 role: "Receiving lead",
 today: "Chases paperwork when dock and ASN disagree.",
 withAgents:
 "Confirms physical exceptions; system variance assembly is done.",
 },
 {
 role: "OP / COO",
 today: "Sees service misses and AP noise as separate problems.",
 withAgents:
 "Sees one variance queue with clear HITL and auto shares.",
 },
 ],
 watchMetrics: [
 {
 metric: "Variance cycle time to disposition",
 move: "Down",
 note: "By variance type and trading partner.",
 },
 {
 metric: "Share auto-resolved within tolerance",
 move: "Up with QA holding",
 note: "Main productivity lever.",
 },
 {
 metric: "Cross-team touches per variance",
 move: "Down",
 note: "Proxy for rebuild waste.",
 },
 {
 metric: "ATP error attributed to ASN mismatch",
 move: "Down",
 note: "Service-level outcome.",
 },
 {
 metric: "AP exceptions stemming from upstream variance",
 move: "Down",
 note: "Downstream cleanliness check.",
 },
 ],
 orgShift:
 "Variance becomes a first-class queue across ERP/WMS, not a side email culture. Trading-partner playbooks get explicit. Planners and AP share one packet. Humans stay on commercial and quality calls; the agent owns detection, assembly, and allowlisted updates.",
 fitWhen: [
 "EDI ASN and invoice flows exist, even if dirty.",
 "PO and receipt truth lives in ERP/WMS.",
 "A handful of variance types dominate.",
 "Leadership will gate chargebacks and commercial concessions.",
 ],
 leadershipAsks: [
 "Which variance types drive the most planner and AP hours?",
 "Which trading partners are safe for auto-tolerance clears?",
 "Where is the system of truth for receipt quantity?",
 "Who can issue chargebacks or accept short ships?",
 "What is the 90-day scoreboard: cycle time, auto-share, or ATP error?",
 ],
 unitEconomics: {
 unit: "per ASN/invoice/PO variance",
 framing:
 "Illustrative supply-chain sizing. Human cost is planner, receiver, and AP minutes plus service risk. Agent cost is reconcile tokens, EDI/ERP/WMS connectors, and HITL on commercial moves.",
 human: {
 summary:
 "A mid-complexity variance often burns 20-40 minutes across functions when each team rebuilds the packet. Loaded blended cost is high before chargebacks or lost turns.",
 lineItems: [
 {
 label: "Packet rebuild labor",
 detail: "EDI, WMS, ERP, and email stitched by hand.",
 },
 {
 label: "Multi-desk interrupts",
 detail: "Planning, dock, and AP each touch the same issue.",
 },
 {
 label: "Service risk",
 detail: "Wrong ATP creates expedites and lost orders.",
 },
 {
 label: "Downstream AP cost",
 detail: "Unresolved variance returns as invoice exceptions.",
 },
 ],
 },
 agent: {
 summary:
 "Detection and packet assembly are the high-frequency cheap slice. Infra is EDI and ERP/WMS. HITL on chargebacks and quality keeps money and brand risk gated.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Variance explain and partner-playbook apply. Keep long EDI context trimmed.",
 },
 {
 label: "Infra",
 detail:
 "EDI translate, ERP/WMS reads/writes, supplier messaging.",
 },
 {
 label: "HITL residual",
 detail:
 "Commercial concessions and quality holds stay human.",
 },
 {
 label: "QA sampling",
 detail:
 "Sample auto-tolerance clears and system writes.",
 },
 ],
 },
 crossover:
 "Wins when tolerances and partner playbooks exist and volume is steady. Loses when most variances are unique commercial renegotiations.",
 sensitivities: [
 "Variance volume by type.",
 "Blended loaded rate across desks.",
 "Auto-tolerance share.",
 "EDI error rate (drives HITL).",
 "ATP and AP downstream defect rates.",
 ],
 },
 baseline:
 "ASNs arrive by EDI. Someone notices a quantity or SKU break against PO or receipt only when planning or the dock feels pain. Email threads with suppliers start. AP sees the same break again at invoice time. Each desk rebuilds evidence. Tolerances live in folklore. Chargebacks are late and inconsistent.",
 agentPath:
 "Agents watch PO, ASN, receipt, and invoice events, detect variance types, assemble a timestamped packet, apply trading-partner playbooks for allowlisted clears and supplier chase, and update ERP/WMS notes. Chargebacks, quality holds, and out-of-tolerance commercial calls escalate to humans.",
 steps: [
 {
 title: "Watch",
 body: "PO, ASN, receipt, and invoice events.",
 },
 {
 title: "Detect",
 body: "Qty, SKU, price, timing, or missing ASN patterns.",
 },
 {
 title: "Assemble packet",
 body: "System facts plus prior supplier messages.",
 },
 {
 title: "Apply playbook",
 body: "Tolerance clear, supplier chase, or escalate.",
 },
 {
 title: "Update systems",
 body: "Allowlisted notes and status in ERP/WMS.",
 },
 {
 title: "Escalate",
 body: "Chargeback, quality, or commercial judgment.",
 },
 {
 title: "QA sample",
 body: "Sample auto-clears and partner messaging.",
 },
 ],
 tools: [
 "EDI / ASN feeds",
 "ERP PO and invoice APIs",
 "WMS receipt API",
 "Supplier portal or mail",
 ],
 skills: [
 "Variance type schemas",
 "Trading-partner tolerances",
 "Chase and chargeback playbooks",
 ],
 memory: [
 "Partner behavior",
 "Lane-specific quirks after human confirm",
 "Prior dispute outcomes (retrieval only)",
 ],
 qa: [
 "Tolerance math checks",
 "Packet completeness",
 "Sample of auto-clears",
 ],
 guardrails: [
 "No chargeback issuance without a gate",
 "No inventory adjustment beyond playbook",
 "No quality disposition from the agent",
 ],
 hitlNotes: [
 "Out-of-tolerance variance",
 "Quality or damage claims",
 "Chargeback issuance",
 "Strategic customer exceptions",
 ],
 agentOwns: [
 "Detection and packet assembly",
 "Allowlisted tolerance clears",
 "Supplier chase for standard breaks",
 "System notes",
 ],
 humanOwns: [
 "Commercial concessions",
 "Chargebacks",
 "Quality holds",
 "Partner relationship resets",
 ],
 gates: [
 "Chargebacks",
 "Inventory adjustments outside playbook",
 "Quality disposition",
 ],
 staging: [
 "Packet assembly only; humans still click dispositions.",
 "Draft supplier chase with one-click send.",
 "Auto-clear one tolerance type for one partner cohort.",
 "Keep ERP/WMS as the system of action for approvals.",
 ],
 diagram: "recon",
 },
{
 slug: "vendor-coi-chase",
 title: "Vendor certificate of insurance chase",
 blurb:
 "Expiring COIs chased, validated for limits and endorsements, and escalated when coverage gaps appear.",
 industry: "Construction / facilities",
 family: "Document packs & filings",
 hitl: "Mostly agent-run",
 systems: ["Procurement", "Risk / GRC", "Email", "Vendor portal"],
 what: "Vendor certificates of insurance stop aging out in shared inboxes and spreadsheets. An agent watches expiration calendars, requests renewals, checks limits and required endorsements against the playbook, and parks only true coverage gaps for risk and procurement.",
 operatorLens:
 "Turn COI chase from a calendar fire drill into a measured queue where agents own volume and humans own coverage judgment.",
 whyItMatters:
 "Most construction and facilities operators still chase certificates by hand. The work looks clerical until a vendor shows up without coverage, a claim lands without an additional-insured endorsement, or risk spends a week reconstructing who was current. For a COO or OP, this is a high-frequency compliance workflow with a sharp split: agents own request, file, and checklist validation; humans own gaps that change who can work on site.",
 valueMoves: [
 {
 title: "Days past COI expiration",
 where: "Risk · procurement · site ops",
 signal:
 "Fewer vendors work or wait while renewal packets sit unread in mail.",
 },
 {
 title: "Risk and buyer capacity",
 where: "GRC · category managers",
 signal:
 "Hours return to true coverage gaps instead of metronomic renewal asks.",
 },
 {
 title: "Site access continuity",
 where: "Jobsites · facilities desks",
 signal:
 "Fewer last-minute turnaways when a certificate quietly lapsed.",
 },
 {
 title: "Audit-ready trail",
 where: "Risk / GRC vendor file",
 signal:
 "Every request, receipt, and gap note lands on the vendor record, not a side spreadsheet.",
 },
 ],
 leakageToday: [
 {
 title: "Calendar as the system",
 body: "Expirations live in one analyst's reminders. Coverage gaps surface when someone remembers.",
 },
 {
 title: "Renewal chase by heroics",
 body: "Vendors get pinged ad hoc. Renewals land late; sites discover gaps at the gate.",
 },
 {
 title: "Checklist folklore",
 body: "Required limits and endorsements vary by who opened the PDF that day.",
 },
 {
 title: "Silent incomplete packs",
 body: "A renewed certificate arrives without additional insured or waiver language and still gets filed as done.",
 },
 ],
 roles: [
 {
 role: "Risk / compliance coordinator",
 today: "Watches calendars, emails vendors, re-reads PDFs for limits.",
 withAgents:
 "Works gated coverage gaps and unusual endorsements; monitors auto-validation quality.",
 },
 {
 role: "Buyer / procurement",
 today: "Interrupted when a vendor cannot mobilize for missing insurance.",
 withAgents:
 "Sees structured escalations only when the playbook needs a commercial or relationship call.",
 },
 {
 role: "COO / OP",
 today: "Sees insurance surprises and audit findings, not COI unit economics.",
 withAgents:
 "Gets on-time renewal rate, gap aging, and HITL share as operating metrics.",
 },
 ],
 watchMetrics: [
 {
 metric: "Share of COIs current before expiration",
 move: "Up",
 note: "Primary throughput and control metric by vendor tier.",
 },
 {
 metric: "Days past expiration still open",
 move: "Down",
 note: "Ages the incomplete and gap queues.",
 },
 {
 metric: "Auto-validated vs HITL share",
 move: "Auto up with QA holding",
 note: "Expand allowlists only when sample audits stay clean.",
 },
 {
 metric: "Coverage-gap reopen rate",
 move: "Down",
 note: "If auto-files keep failing site checks, endorsement rules need work.",
 },
 {
 metric: "Buyer / risk touches per renewal",
 move: "Down",
 note: "Should fall as request and checklist become metronomic.",
 },
 ],
 orgShift:
 "COI chase becomes a queue inside procurement and risk systems, not a shared inbox. Limit and endorsement playbooks get written down. Risk still owns coverage judgment and site-access calls; the agent owns detection, request, and allowlisted validation.",
 fitWhen: [
 "A repeating set of required limits and endorsements dominates vendor volume.",
 "Expiration calendars or vendor insurance fields exist even if messy.",
 "Risk will gate coverage exceptions and site-access overrides.",
 "Email or a vendor portal is currently the unofficial COI workflow.",
 ],
 leadershipAsks: [
 "What share of active vendors have a COI past due or missing today?",
 "Which three endorsement or limit gaps dominate escalations?",
 "Where does expiration truth live: GRC, procurement, or a spreadsheet?",
 "Who can waive a gap, and is that enforced anywhere but email?",
 "What is the 90-day scoreboard: on-time renewals, gap aging, or risk FTE hours?",
 ],
 unitEconomics: {
 unit: "per vendor COI renewal or expiration event",
 framing:
 "Illustrative risk-ops sizing, not a measured engagement result. Human cost is risk and procurement minutes plus site-access disruption. Agent cost is chase and validation tokens, connector writes, and HITL on coverage gaps.",
 human: {
 summary:
 "A routine renewal request and PDF checklist can burn 10-20 minutes across risk and procurement before it clears. At loaded $45-80/hr that is already several dollars per event before a site delay or claim exposure.",
 lineItems: [
 {
 label: "Risk touch time",
 detail:
 "Find expiration, request renewal, read limits, file, re-check.",
 },
 {
 label: "Buyer interrupt tax",
 detail:
 "High loaded cost when category managers become insurance help desks.",
 },
 {
 label: "Site-access disruption",
 detail:
 "Late or incomplete certificates stall mobilization and create overtime elsewhere.",
 },
 {
 label: "Audit and claim cleanup",
 detail:
 "Missing endorsements create reconstruction cost when something goes wrong.",
 },
 ],
 },
 agent: {
 summary:
 "Expiration watch, standard chase, and allowlisted checklist passes are cheap per event at volume. Infra is procurement, GRC, and mail or portal connectors. HITL remains for coverage gaps, which keeps risk comfortable while auto-share rises.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Expiration detect, chase draft, limit and endorsement extract. Keep PDF extraction cost explicit when scans dominate.",
 },
 {
 label: "Infra",
 detail:
 "Vendor master reads, GRC file writes, mail or portal send. Mostly step-fixed per entity.",
 },
 {
 label: "HITL residual",
 detail:
 "Coverage gaps and site-access waivers stay human. Blended minutes fall when chase is automated.",
 },
 {
 label: "QA sampling",
 detail:
 "Sample auto-validated certificates against the endorsement checklist. Budget it into run cost.",
 },
 ],
 },
 crossover:
 "Wins when required limits repeat and endorsement playbooks are documentable. Loses when almost every vendor is a bespoke coverage negotiation.",
 sensitivities: [
 "Renewal volume and share that fail the checklist.",
 "Risk and buyer loaded rates.",
 "Auto-validate share by vendor tier.",
 "PDF extraction token cost on image-heavy certificates.",
 "Site-access delays tied to expired or incomplete COIs.",
 ],
 },
 baseline:
 "COI expirations live in calendars, shared mailboxes, or a risk spreadsheet. Coordinators email vendors for renewals, re-read PDFs for limits and endorsements, and file what arrives. The same gap type is handled differently by different people. Aging is opaque. Sites discover lapses at the gate. Incomplete packs sometimes get marked current because the trail is fragmented.",
 agentPath:
 "Expiration and certificate feeds ingest continuously. An agent requests renewals on a cadence, validates limits and required endorsements against the playbook, files clean packs into risk or procurement, and escalates only true coverage gaps. Humans work a short judgment queue inside the systems they already use.",
 steps: [
 {
 title: "Watch",
 body: "Vendor insurance expirations in procurement or risk calendars and inbound certificate mail.",
 },
 {
 title: "Request renewal",
 body: "Approved chase templates to the vendor or broker on a schedule before expiration.",
 },
 {
 title: "Ingest certificate",
 body: "Portal upload, mail attachment, or risk document drop as needed.",
 },
 {
 title: "Validate checklist",
 body: "Limits, named insured, additional insured, waiver, and other required endorsements.",
 },
 {
 title: "Allowlisted file",
 body: "Within playbook rules: mark current with an audit note on the vendor record.",
 },
 {
 title: "Chase gaps",
 body: "Missing endorsement or limit shortfalls back to the vendor on a metronome.",
 },
 {
 title: "Escalate",
 body: "Coverage gaps, unusual forms, or site-access risk to risk and procurement.",
 },
 {
 title: "QA sample",
 body: "Sampled auto-validated certificates into the audit queue.",
 },
 ],
 tools: [
 "Procurement / vendor master APIs",
 "Risk / GRC document file",
 "Mail / vendor portal send",
 "Expiration calendar read",
 ],
 skills: [
 "COI checklist schemas",
 "Limit and endorsement playbooks",
 "Renewal chase packs",
 "Gap classification rules",
 ],
 memory: [
 "Vendor insurance patterns",
 "Broker response habits",
 "Prior dispositions on similar gaps",
 ],
 qa: [
 "Checklist field validation",
 "Expiration date consistency",
 "Sampled auto-file audits",
 ],
 guardrails: [
 "No coverage waiver without a gate",
 "No site-access clearance outside playbook",
 "Permission scopes per legal entity or site",
 ],
 hitlNotes: [
 "Limit or endorsement shortfalls",
 "Unusual policy forms",
 "Site-access overrides",
 "Anything that changes who may work without full coverage",
 ],
 agentOwns: [
 "Expiration detection and renewal chase",
 "Allowlisted checklist validation",
 "Filing into risk or procurement",
 "Audit notes on the vendor record",
 ],
 humanOwns: [
 "Coverage gap judgment",
 "Site-access waivers",
 "Relationship-sensitive vendor tone",
 "Policy exceptions across entities",
 ],
 gates: [
 "Coverage waivers",
 "Site-access despite incomplete COI",
 "Exceptions to required endorsements",
 ],
 staging: [
 "Expiration lists and missing-COI packets on existing vendor notes.",
 "Draft renewals for risk to send.",
 "Auto-validate one low-risk vendor tier with tight QA.",
 "Expand tiers as audits hold; keep GRC or procurement as the system of action.",
 ],
 diagram: "coi",
 },
{
 slug: "vendor-onboarding-packs",
 title: "Vendor onboarding and compliance packs",
 blurb:
 "W-9, banking, COI, and MSA exhibits chased to complete so ERP vendor create stays gated and clean.",
 industry: "Cross-industry",
 family: "Onboarding & compliance",
 hitl: "Review-gated",
 systems: ["Procurement", "ERP vendor master", "Email", "Risk / GRC"],
 what: "New vendor packets stop stalling across mail, shared drives, and half-created ERP records. An agent chases W-9, banking, COI, and MSA exhibits to completeness, validates against the onboarding schema, and parks ERP vendor create behind a human gate when the pack is ready.",
 operatorLens:
 "Pull buyers and AP off incomplete-pack detective work so vendor create is a decision on a ready file, not a scavenger hunt.",
 whyItMatters:
 "Incomplete vendor packs dominate cycle time to first PO long before commercial judgment does. Missing W-9s, banking details, certificates, and exhibits burn procurement and AP capacity and push spend into one-off workarounds. For a COO or OP, this is a classic agent-owns-volume wedge: the agent never creates the vendor master alone; it makes the ready-versus-blocked queue honest and keeps chase on a metronome.",
 valueMoves: [
 {
 title: "Time to vendor-ready",
 where: "Procurement · AP · risk",
 signal:
 "Blocked packs are visible and chased on schedule; fewer silent stalls before ERP create.",
 },
 {
 title: "Buyer and AP capacity",
 where: "Category managers · vendor master desk",
 signal:
 "Hours return to commercial and control decisions instead of document chase.",
 },
 {
 title: "Clean first create",
 where: "ERP vendor master",
 signal:
 "Fewer half-built vendors, duplicates, and post-create cleanup.",
 },
 {
 title: "Compliance trail",
 where: "Risk / GRC · procurement file",
 signal:
 "Every artifact and chase lands on the pack, not in a side folder.",
 },
 ],
 leakageToday: [
 {
 title: "Silent incomplete packs",
 body: "W-9s and banking sit until someone remembers. Cycle time looks like ERP delay when it is intake stall.",
 },
 {
 title: "Buyer as document desk",
 body: "High-cost humans chase exhibits instead of negotiating or releasing work.",
 },
 {
 title: "Premature ERP creates",
 body: "Partial vendors get keyed to unblock a PO, then cleanup and duplicate risk follow.",
 },
 {
 title: "Inconsistent checklists",
 body: "Required artifacts vary by who onboarded the last similar vendor.",
 },
 ],
 roles: [
 {
 role: "Vendor master / AP specialist",
 today: "Downloads, renames, chases ad hoc, keys when something arrives.",
 withAgents:
 "Reviews ready packs for ERP create; tunes schemas and edge vendor types.",
 },
 {
 role: "Buyer / procurement",
 today: "Interrupted for missing W-9, banking, or MSA pieces.",
 withAgents:
 "Sees structured escalations only when commercial or relationship judgment is needed.",
 },
 {
 role: "Controller / OP",
 today: "Sees slow time-to-PO and messy vendor master, not pack unit economics.",
 withAgents:
 "Manages ready rate, chase yield, and gated create quality as operating metrics.",
 },
 ],
 watchMetrics: [
 {
 metric: "Share of packs ready before ERP create review",
 move: "Up",
 note: "Core quality metric: complete packs, not just fast creates.",
 },
 {
 metric: "Days blocked on missing artifacts",
 move: "Down",
 note: "Ages the incomplete queue; chase cadence should move this.",
 },
 {
 metric: "Buyer / AP minutes on chase",
 move: "Down",
 note: "Sampled; should transfer to agent templates and metronome.",
 },
 {
 metric: "Duplicate or premature create rate",
 move: "Down",
 note: "Protects vendor master trust and avoids double work.",
 },
 {
 metric: "Chase response yield",
 move: "Up",
 note: "Percent of chases that clear a missing item. Tune templates and cadence.",
 },
 ],
 orgShift:
 "Vendor onboarding becomes a production line with schemas and SLAs; ERP create becomes a gated decision on ready packs. Chase labor leaves the buyer desk. Procurement and ERP remain the systems of action, with no parallel tracker. Vendor master create, banking changes, and policy exceptions stay gated so controls stay comfortable expanding automation.",
 fitWhen: [
 "High volume of new vendors with a stable required-artifact schema by type.",
 "Buyers and AP visibly interrupted by missing W-9, banking, COI, or exhibit chase.",
 "Leadership refuses agent authority on ERP vendor create, and wants automation anyway.",
 "Procurement or ERP APIs (or structured ticket writes) exist or can.",
 ],
 leadershipAsks: [
 "What percent of vendor creates start with an incomplete pack today?",
 "Which vendor types have a stable required-artifact schema already?",
 "Who owns chase policy, and can templates be approved once?",
 "Where must banking or sanctions patterns short-circuit into a human immediately?",
 "What is the 90-day definition of done: ready-rate, time-to-PO, or AP FTE hours?",
 ],
 unitEconomics: {
 unit: "per vendor onboarding pack",
 framing:
 "Illustrative procurement and AP sizing, not a measured engagement result. Human cost is buyer and vendor-master minutes plus delay to first PO. Agent cost is completeness and chase tokens, connectors, and HITL on gated creates.",
 human: {
 summary:
 "A routine incomplete pack can burn 20-45 minutes across procurement and AP before ERP create is honest. At loaded $40-75/hr that is already meaningful per vendor before spend sits blocked or goes off-process.",
 lineItems: [
 {
 label: "Chase and re-key time",
 detail:
 "Request artifacts, rename, file, re-check checklist, key fields.",
 },
 {
 label: "Buyer interrupt tax",
 detail:
 "Category managers become document help desks while commercial work waits.",
 },
 {
 label: "Time-to-PO delay",
 detail:
 "Blocked creates push urgent spend into workarounds and one-off vendors.",
 },
 {
 label: "Master data cleanup",
 detail:
 "Premature and duplicate creates create downstream control and payment cost.",
 },
 ],
 },
 agent: {
 summary:
 "Completeness checks and metronome chase are token- and connector-heavy but low compared with buyer and AP hours returned. Infra is procurement, ERP, mail, and GRC writes. HITL remains on create and banking judgment, which is correct and should stay in the model as near-fixed human control cost.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Vendor-type classify, checklist, chase draft, intake brief. OCR dominates when packs are image-heavy; budget that line explicitly.",
 },
 {
 label: "Infra",
 detail:
 "Procurement file, ERP staging or ticket, mail send. Largely step-fixed per entity.",
 },
 {
 label: "HITL residual",
 detail:
 "Humans still approve vendor create and banking. The saving is minutes on incomplete and chase work.",
 },
 {
 label: "Chase yield",
 detail:
 "Cost per cleared missing item matters. Low-yield chase wastes tokens and goodwill; tune cadence.",
 },
 ],
 },
 crossover:
 "Wins when incomplete rate and interrupt time are visible, required-artifact schemas exist, and leadership will not let an agent create vendors alone. Loses when every onboarding is bespoke and completeness rules cannot be written down.",
 sensitivities: [
 "Share of packs incomplete at first create attempt.",
 "Buyer versus vendor-master loaded rates.",
 "Doc-extraction token cost for image-heavy packs.",
 "Chase rounds to clear a missing artifact.",
 "Banking or sanctions short-circuit rate (human path).",
 ],
 },
 baseline:
 "Procurement and AP download attachments, rename files, chase W-9s, banking details, COIs, and MSA exhibits by email, and key fields when something finally arrives. Incomplete packs sit silently. Partial ERP vendors get created to unblock a PO. Cycle time is dominated by chase and re-key, not by the create decision.",
 agentPath:
 "Agents ingest onboarding channels, build or match the vendor pack, validate required artifacts against a schema by vendor type, chase missing pieces on a cadence through approved templates, and present a ready pack for gated ERP vendor create. Humans pull a clean queue: ready-for-create versus blocked-on-missing. Banking changes, sanctions hits, and master create stay human-gated.",
 steps: [
 {
 title: "Ingest",
 body: "Procurement intake, mail, portal, and document pipeline as needed.",
 },
 {
 title: "Identify vendor type",
 body: "Select the completeness schema for the onboarding typology in use.",
 },
 {
 title: "Assemble pack",
 body: "W-9, banking, COI, MSA exhibits, and other required artifacts.",
 },
 {
 title: "Completeness check",
 body: "Required documents and fields; produce a missing list tied to the pack.",
 },
 {
 title: "Chase",
 body: "Approved templates to the vendor contact on a schedule until clear or escalate.",
 },
 {
 title: "Stage for create",
 body: "Ready pack brief and proposed vendor fields for human review.",
 },
 {
 title: "Escalate",
 body: "Sanctions, banking anomalies, or commercial exceptions to humans.",
 },
 {
 title: "QA sample",
 body: "Sampled ready packs and chase outcomes into the audit queue.",
 },
 ],
 tools: [
 "Procurement intake / file APIs",
 "ERP vendor staging or ticket write",
 "Mail / vendor portal send",
 "Risk / GRC checklist write",
 ],
 skills: [
 "Onboarding schemas by vendor type",
 "Artifact completeness rules",
 "Chase packs by missing item",
 "Duplicate vendor detection heuristics",
 ],
 memory: [
 "Vendor-type pack patterns",
 "Contact response habits",
 "Prior dispositions on similar gaps",
 ],
 qa: [
 "Checklist completeness validation",
 "Duplicate vendor checks before create",
 "Sampled ready-pack audits",
 ],
 guardrails: [
 "No ERP vendor create without a gate",
 "No banking change without a gate",
 "Permission scopes per company code",
 ],
 hitlNotes: [
 "ERP vendor create",
 "Banking and remittance changes",
 "Sanctions or adverse-media hits",
 "Policy exceptions to the required pack",
 ],
 agentOwns: [
 "Pack assembly and completeness checks",
 "Metronome chase for missing artifacts",
 "Ready-versus-blocked queue hygiene",
 "Audit notes on the onboarding file",
 ],
 humanOwns: [
 "Vendor master create",
 "Banking and payment controls",
 "Commercial and relationship exceptions",
 "Sanctions and risk judgment",
 ],
 gates: [
 "ERP vendor create",
 "Banking detail acceptance",
 "Waivers of required compliance artifacts",
 ],
 staging: [
 "Missing-item lists on existing procurement tickets.",
 "Draft chases for AP or buyers to send.",
 "Auto-chase one low-risk vendor type with tight QA; create stays gated.",
 "Expand types as audits hold; keep ERP as the system of create.",
 ],
 diagram: "vendorkyc",
 },
{
 slug: "freight-invoice-audit",
 title: "Freight invoice audit exceptions",
 blurb:
 "Carrier invoices matched to contracted rates and accessorials: auto-clear within tolerance, dispute packets gated.",
 industry: "3PL / logistics",
 family: "Order-to-cash",
 hitl: "Exception-heavy",
 systems: ["TMS", "Freight audit", "ERP AP", "Carrier EDI/mail"],
 what: "Freight invoice exceptions stop living in auditor inboxes and spreadsheet parks. An agent matches carrier invoices to contracted rates and accessorials, auto-clears within tolerance, assembles dispute packets, and parks only true commercial fights for freight audit and AP.",
 operatorLens:
 "Turn freight audit from a backlog of invoice PDFs into a measured exception queue where agents clear tolerance matches and humans own disputes.",
 whyItMatters:
 "Most mid-market 3PL and shipper ops still clear rate and accessorial breaks by hand. The work looks clerical until you count overpay leakage, auditor overtime, and AP cycle time stuck behind incomplete dispute packets. For a COO or OP, this is a high-volume finance and ops workflow with clean systems of record and a sharp split between allowlisted clears and gated disputes.",
 valueMoves: [
 {
 title: "Days to clear freight exception",
 where: "Freight audit · AP",
 signal:
 "Rate and accessorial breaks leave the queue faster when match and packet follow a playbook.",
 },
 {
 title: "Auditor and AP capacity",
 where: "Freight desk · finance ops",
 signal:
 "Hours return to true disputes instead of tolerance math and re-key.",
 },
 {
 title: "Overpay and under-dispute leakage",
 where: "Cash · carrier scorecards",
 signal:
 "Fewer invoices pay outside contract; dispute packets go out complete and on time.",
 },
 {
 title: "Audit-ready trail",
 where: "TMS / freight audit invoice timeline",
 signal:
 "Every clear and dispute note lands on the shipment and invoice, not a side sheet.",
 },
 ],
 leakageToday: [
 {
 title: "Mailbox as the audit system",
 body: "Carrier invoices bounce between audit and AP with no aging owner and no standard disposition.",
 },
 {
 title: "Tolerance math by heroics",
 body: "Auditors re-check rates ad hoc. Small breaks absorb the same time as real disputes.",
 },
 {
 title: "Incomplete dispute packets",
 body: "Carriers reject or ignore short-pays when contract cites and shipment facts are missing.",
 },
 {
 title: "Pay-to-clear pressure",
 body: "Without a clean packet, teams either overpay or stall everything.",
 },
 ],
 roles: [
 {
 role: "Freight auditor",
 today: "Opens exceptions, re-keys rates, emails carriers, rebuilds dispute packs.",
 withAgents:
 "Works gated disputes and unusual accessorials; monitors auto-clear quality.",
 },
 {
 role: "AP processor",
 today: "Holds invoices waiting on audit folklore.",
 withAgents:
 "Sees structured releases and dispute holds inside ERP already in use.",
 },
 {
 role: "COO / OP",
 today: "Sees freight spend and AP aging, not exception unit economics.",
 withAgents:
 "Gets clear rate, auto-share, dispute yield, and leakage as operating metrics.",
 },
 ],
 watchMetrics: [
 {
 metric: "Exception clear rate within SLA",
 move: "Up",
 note: "Primary throughput metric by break type.",
 },
 {
 metric: "Share auto-cleared vs HITL",
 move: "Auto up with QA holding",
 note: "Expand tolerance allowlists only when sample audits stay clean.",
 },
 {
 metric: "Overpay dollars caught before release",
 move: "Up (sampled)",
 note: "Outcome check that speed metrics alone miss.",
 },
 {
 metric: "Dispute packet completeness on first send",
 move: "Up",
 note: "Should rise as assembly automates; watch carrier overturns.",
 },
 {
 metric: "Auditor minutes per exception",
 move: "Down",
 note: "Sampled time-in-motion; should fall as match and packet automate.",
 },
 ],
 orgShift:
 "Freight exceptions become a queue inside TMS, freight audit, or ERP AP, not a shared inbox. Rate and accessorial playbooks get written down. Audit still owns commercial disputes; the agent owns detection, tolerance clears, and packet assembly.",
 fitWhen: [
 "Contracted rates and accessorial rules exist even if noisy.",
 "A repeating set of break types (rate, fuel, accessorial, duplicate) dominates volume.",
 "Leadership will gate short-pays and dispute language.",
 "EDI or mail is currently the unofficial exception workflow alongside the audit tool.",
 ],
 leadershipAsks: [
 "What share of carrier invoices hit exception, and which three types dominate?",
 "Where does exception aging live today: freight audit, TMS, ERP, or mail?",
 "Which break types are safe to auto-clear within tolerance on day one?",
 "Who owns dispute tone, and can packet templates be approved once?",
 "What is the 90-day scoreboard: clear SLA, overpay caught, or auditor FTE hours?",
 ],
 unitEconomics: {
 unit: "per freight invoice exception",
 framing:
 "Illustrative logistics finance sizing, not a measured engagement result. Human cost is auditor and AP minutes plus overpay leakage. Agent cost is match and packet tokens, connectors, and HITL on disputes.",
 human: {
 summary:
 "A routine rate or accessorial break can burn 15-30 minutes across freight audit and AP before it clears. At loaded $40-75/hr that is already several dollars per exception before overpay dollars.",
 lineItems: [
 {
 label: "Auditor touch time",
 detail:
 "Open, rate-check, email carrier, rebuild packet, release or dispute.",
 },
 {
 label: "AP hold tax",
 detail:
 "Invoices age while audit folklore catches up; discounts and close calendars suffer.",
 },
 {
 label: "Overpay leakage",
 detail:
 "Tolerance and accessorial misses quietly forfeit contracted economics.",
 },
 {
 label: "Weak dispute yield",
 detail:
 "Incomplete packets create rework and carrier pushback.",
 },
 ],
 },
 agent: {
 summary:
 "Matching, tolerance clears, and dispute packet assembly are cheap per exception at volume. Infra is TMS, freight audit, ERP, and carrier EDI or mail. HITL remains for short-pays and commercial fights, which keeps risk comfortable while auto-share rises.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Rate match explain, accessorial classify, dispute brief. Keep invoice OCR cost explicit when images dominate.",
 },
 {
 label: "Infra",
 detail:
 "TMS shipment reads, audit tool writes, ERP AP holds, carrier send. Mostly step-fixed per entity or lane cohort.",
 },
 {
 label: "HITL residual",
 detail:
 "Disputes and payment amount changes stay human. Blended minutes fall when match and packet are automated.",
 },
 {
 label: "QA sampling",
 detail:
 "Sample auto-clears and dispute packets. Budget it into run cost.",
 },
 ],
 },
 crossover:
 "Wins when break types repeat and rate cards are documentable. Loses when almost every invoice is a bespoke lane negotiation.",
 sensitivities: [
 "Exception rate and type mix.",
 "Auditor and AP loaded rates.",
 "Auto-clear share within tolerance.",
 "OCR/token cost on image-heavy carrier invoices.",
 "Overpay dollars tied to clear quality.",
 ],
 },
 baseline:
 "Carrier invoices that fail rate or accessorial checks land in a freight audit queue or, more often, a shared mailbox. Auditors re-check contracts, email carriers, rebuild dispute packets late, and re-key when someone replies. The same exception type is handled differently by different people. Aging is opaque. Overpays slip. Disputes sometimes fail because the trail is fragmented.",
 agentPath:
 "Invoices and tender or shipment facts ingest continuously. An agent classifies the break, matches to contracted rates and accessorials, auto-clears within tolerance with an audit note, and assembles dispute packets for gated short-pay or carrier challenge. Humans work a short judgment queue inside TMS, freight audit, or ERP AP they already use.",
 steps: [
 {
 title: "Ingest",
 body: "Carrier EDI or mail invoices plus TMS shipment and contract rate context.",
 },
 {
 title: "Classify break",
 body: "Linehaul rate, fuel, accessorial, duplicate, or other.",
 },
 {
 title: "Match to contract",
 body: "Rate card, lane rules, and allowed accessorials for the shipment.",
 },
 {
 title: "Allowlisted clear",
 body: "Within tolerance rules: match and release with audit note.",
 },
 {
 title: "Assemble dispute packet",
 body: "Shipment facts, contract cites, prior invoices, and carrier message history.",
 },
 {
 title: "Stage short-pay or dispute",
 body: "Draft for freight audit or AP review when outside tolerance.",
 },
 {
 title: "Escalate",
 body: "Commercial fights, new accessorial types, or relationship-sensitive carriers to humans.",
 },
 {
 title: "QA sample",
 body: "Sampled auto-clears and dispute packets into the audit queue.",
 },
 ],
 tools: [
 "TMS shipment / rate APIs",
 "Freight audit exception write",
 "ERP AP hold / release",
 "Carrier EDI or mail send",
 ],
 skills: [
 "Rate and accessorial match schemas",
 "Tolerance playbooks",
 "Dispute packet packs by break type",
 "Duplicate invoice detection",
 ],
 memory: [
 "Carrier break patterns",
 "Lane and accessorial quirks",
 "Prior dispute outcomes (retrieval only)",
 ],
 qa: [
 "Tolerance math validation",
 "Duplicate checks before release",
 "Sampled auto-clear and packet audits",
 ],
 guardrails: [
 "No short-pay without a gate",
 "No dispute language outside approved templates",
 "Permission scopes per legal entity or bill-to",
 ],
 hitlNotes: [
 "Out-of-tolerance rate or accessorial",
 "New or ambiguous accessorial codes",
 "Relationship-sensitive carriers",
 "Anything that changes payment amount beyond playbook",
 ],
 agentOwns: [
 "Break classification and contract match",
 "Allowlisted tolerance clears",
 "Dispute packet assembly",
 "Audit notes on the invoice and shipment",
 ],
 humanOwns: [
 "Short-pay and dispute send",
 "Commercial negotiations",
 "Fraud or duplicate judgment calls",
 "Relationship-sensitive tone",
 ],
 gates: [
 "Payment amount changes outside tolerance",
 "Carrier dispute send",
 "New accessorial acceptance into playbook",
 ],
 staging: [
 "Packet assembly and mismatch lists on existing audit notes.",
 "Draft disputes for auditors to send.",
 "Auto-clear one low-risk break type within tight tolerance and QA.",
 "Expand types as audits hold; keep freight audit or ERP as the system of action.",
 ],
 diagram: "freight",
 },
{
 slug: "expense-report-exceptions",
 title: "Expense report exception clearing",
 blurb:
 "Policy breaks, missing receipts, and duplicates chased and allowlisted; manager and finance gates for overrides.",
 industry: "Cross-industry",
 family: "Expense & T&E",
 hitl: "Review-gated",
 systems: ["T&E tool", "Email", "ERP", "Card feed"],
 what: "Expense exceptions stop living in manager inboxes and finance side queues. An agent chases missing receipts, flags duplicates and policy breaks, auto-clears allowlisted fixes, and parks only true policy overrides for manager and finance gates.",
 operatorLens:
 "Turn T&E exceptions from a nagging backlog into a measured queue where agents clear hygiene and humans own policy judgment.",
 whyItMatters:
 "Most mid-market finance teams still clear expense exceptions by hand. The work looks small until you count reimbursement cycle time, duplicate payments, manager interrupt tax, and audit findings on missing receipts. For a COO or OP, this is a high-volume employee workflow with a sharp split: agents own chase and allowlisted clears; humans own overrides that change policy posture.",
 valueMoves: [
 {
 title: "Days to clear expense exception",
 where: "Employees · managers · finance",
 signal:
 "Missing receipts and simple policy breaks leave the queue faster with metronomic chase.",
 },
 {
 title: "Manager and finance capacity",
 where: "People leaders · T&E desk",
 signal:
 "Hours return to true policy calls instead of receipt nagging and re-checks.",
 },
 {
 title: "Duplicate and policy leakage",
 where: "Cash · controls",
 signal:
 "Fewer double submits and silent policy drifts before reimbursement.",
 },
 {
 title: "Audit-ready trail",
 where: "T&E report timeline",
 signal:
 "Every chase and clear lands on the report, not in a side email thread.",
 },
 ],
 leakageToday: [
 {
 title: "Inbox as the exception system",
 body: "Reports bounce between employee, manager, and finance with no aging owner.",
 },
 {
 title: "Receipt chase by heroics",
 body: "Employees get pinged ad hoc. Reimbursements stall; audits find gaps later.",
 },
 {
 title: "Inconsistent policy application",
 body: "The same break type gets different treatment depending on who reviewed it.",
 },
 {
 title: "Duplicate and card-feed noise",
 body: "Without a clean packet, teams either overpay or stall everything.",
 },
 ],
 roles: [
 {
 role: "T&E / finance processor",
 today: "Opens exceptions, emails employees, re-checks when receipts arrive.",
 withAgents:
 "Works gated policy overrides; monitors auto-clear quality.",
 },
 {
 role: "Manager",
 today: "Interrupted for missing receipts and one-off explanations.",
 withAgents:
 "Sees structured approvals only when the playbook needs a policy override.",
 },
 {
 role: "Controller / OP",
 today: "Sees reimbursement aging and audit notes, not exception unit economics.",
 withAgents:
 "Gets clear rate, auto-share, duplicate catch, and HITL share as operating metrics.",
 },
 ],
 watchMetrics: [
 {
 metric: "Exception clear rate within SLA",
 move: "Up",
 note: "Primary throughput metric by exception type.",
 },
 {
 metric: "Share auto-cleared vs HITL",
 move: "Auto up with QA holding",
 note: "Expand allowlists only when sample audits stay clean.",
 },
 {
 metric: "Manager touches per exception",
 move: "Down",
 note: "Should fall as receipt chase becomes metronomic.",
 },
 {
 metric: "Duplicate catch before pay",
 move: "Up (sampled)",
 note: "Control metric. Do not trade speed for silent overpays.",
 },
 {
 metric: "Missing-receipt aging",
 move: "Down",
 note: "Ages the incomplete queue; chase cadence should move this.",
 },
 ],
 orgShift:
 "Expense exceptions become a queue inside the T&E tool, not a manager mailbox. Policy playbooks by break type get written down. Managers and finance still own overrides; the agent owns detection, chase, and allowlisted clears.",
 fitWhen: [
 "A repeating set of exception types (missing receipt, duplicate, soft policy break) dominates volume.",
 "Card feed and T&E tool data exist even if noisy.",
 "Finance will gate policy overrides and out-of-policy pays.",
 "Email is currently the unofficial exception workflow.",
 ],
 leadershipAsks: [
 "What share of expense reports hit exception, and which three types dominate?",
 "Where does exception aging live today: T&E tool, ERP, or mail?",
 "Which exception types are safe to auto-clear on day one?",
 "Who owns policy override authority, and can templates be approved once?",
 "What is the 90-day scoreboard: clear SLA, duplicate catch, or finance FTE hours?",
 ],
 unitEconomics: {
 unit: "per expense report exception",
 framing:
 "Illustrative finance-ops sizing, not a measured engagement result. Human cost is finance and manager minutes plus duplicate or policy leakage. Agent cost is chase and match tokens, connectors, and HITL on overrides.",
 human: {
 summary:
 "A routine missing-receipt or soft policy break can burn 8-20 minutes across employee, manager, and finance before it clears. At loaded $40-90/hr blended that is already several dollars per exception before duplicate risk.",
 lineItems: [
 {
 label: "Finance touch time",
 detail:
 "Open, diagnose, email, re-check, release.",
 },
 {
 label: "Manager interrupt tax",
 detail:
 "High loaded cost when people leaders become receipt help desks.",
 },
 {
 label: "Reimbursement delay",
 detail:
 "Days stuck in exception quietly damage employee trust and close calendars.",
 },
 {
 label: "Control failures",
 detail:
 "Duplicates and weak policy application create cleanup and audit cost.",
 },
 ],
 },
 agent: {
 summary:
 "Receipt chase, duplicate checks, and allowlisted clears are cheap per exception at volume. Infra is T&E, card feed, mail, and ERP connectors. HITL remains for policy overrides, which keeps finance comfortable while auto-share rises.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Exception classify, chase draft, duplicate and policy explain. Keep receipt OCR cost explicit when images dominate.",
 },
 {
 label: "Infra",
 detail:
 "T&E exception APIs, card feed reads, mail send, ERP post hooks. Mostly step-fixed per entity.",
 },
 {
 label: "HITL residual",
 detail:
 "Policy overrides and sensitive spends stay human. Blended minutes fall when chase is automated.",
 },
 {
 label: "QA sampling",
 detail:
 "Sample auto-clears and duplicate flags. Budget it into run cost.",
 },
 ],
 },
 crossover:
 "Wins when exception types repeat and policy playbooks are documentable. Loses when almost every report is a bespoke executive exception.",
 sensitivities: [
 "Exception rate and type mix.",
 "Finance and manager loaded rates.",
 "Auto-clear share by type.",
 "OCR/token cost on image-heavy receipts.",
 "Duplicate dollars tied to catch quality.",
 ],
 },
 baseline:
 "Expense reports that fail policy or receipt checks land in a T&E queue or, more often, manager and finance inboxes. Processors email employees for receipts, re-check duplicates against the card feed, argue soft policy breaks, and release when someone replies. The same exception type is handled differently by different people. Aging is opaque. Duplicates sometimes pay because the trail is fragmented.",
 agentPath:
 "Reports, card feed, and policy results ingest continuously. An agent classifies the break, chases missing receipts on a cadence, auto-clears allowlisted fixes with an audit note, and stages policy overrides for manager or finance gates. Humans work a short judgment queue inside the T&E tool they already use.",
 steps: [
 {
 title: "Ingest",
 body: "T&E exceptions, receipt images, and card feed matches as needed.",
 },
 {
 title: "Classify break",
 body: "Missing receipt, duplicate, soft policy, hard policy, or other.",
 },
 {
 title: "Assemble packet",
 body: "Report lines, card events, prior receipts, policy cites.",
 },
 {
 title: "Chase",
 body: "Missing receipt or clarification templates to the employee on a schedule.",
 },
 {
 title: "Allowlisted clear",
 body: "Within playbook rules: clear and release with audit note.",
 },
 {
 title: "Stage override",
 body: "Policy override draft for manager or finance review when required.",
 },
 {
 title: "Escalate",
 body: "Hard policy breaks, sensitive spends, or fraud signals to humans.",
 },
 {
 title: "QA sample",
 body: "Sampled auto-clears and duplicate catches into the audit queue.",
 },
 ],
 tools: [
 "T&E exception APIs",
 "Card feed match read",
 "Mail / employee notify send",
 "ERP reimbursement post hooks",
 ],
 skills: [
 "Exception-type schemas",
 "Receipt chase packs",
 "Duplicate detection rules",
 "Policy allowlist playbooks",
 ],
 memory: [
 "Employee exception patterns",
 "Merchant and category quirks",
 "Prior dispositions on similar breaks",
 ],
 qa: [
 "Duplicate checks before release",
 "Receipt presence validation",
 "Sampled auto-clear audits",
 ],
 guardrails: [
 "No policy override without a gate",
 "No reimbursement amount change outside playbook",
 "Permission scopes per legal entity",
 ],
 hitlNotes: [
 "Hard policy breaks",
 "Manager or finance overrides",
 "Sensitive or high-dollar spends",
 "Anything that changes reimbursable amount beyond playbook",
 ],
 agentOwns: [
 "Break classification and packet assembly",
 "Missing-receipt chase",
 "Allowlisted clears",
 "Audit notes on the expense report",
 ],
 humanOwns: [
 "Policy overrides",
 "Fraud or abuse judgment",
 "Relationship-sensitive employee tone",
 "Exceptions that set precedent",
 ],
 gates: [
 "Out-of-policy reimbursement approval",
 "Amount changes outside allowlist",
 "Fraud or duplicate judgment releases",
 ],
 staging: [
 "Missing-receipt lists and duplicate flags on existing T&E notes.",
 "Draft chases for finance to send.",
 "Auto-clear one low-risk exception type with tight QA.",
 "Expand types as audits hold; keep the T&E tool as the system of action.",
 ],
 diagram: "expense",
 },
{
 slug: "rfp-response-assembly",
 title: "RFP response pack assembly",
 blurb:
 "Proposal answers assembled from the content library, SME inputs chased, completeness checked before partner review.",
 industry: "Professional services",
 family: "Sales & proposals",
 hitl: "Review-gated",
 systems: ["Proposal tool / SharePoint", "CRM", "Email", "Content library"],
 what: "RFP and RFI responses stop living as a partner-led scavenger hunt across SharePoint, prior decks, and SME inboxes. An agent pulls approved language from the content library, maps requirements to draft answers, chases missing SME inputs on a schedule, and only surfaces a completeness-ready pack for partner review. Volume work leaves the proposal desk; judgment on win themes and commitments stays human.",
 operatorLens:
 "Turn RFP assembly from a late-night heroics cycle into a measured pack queue where agents own volume and partners own judgment.",
 whyItMatters:
 "Professional services firms still burn senior and mid-level hours rebuilding the same security, commercial, and methodology answers for every bid. The labor hides in utilization and weekend work rather than a clean org-chart line. For a COO or OP, this is recoverable delivery capacity and bid-cycle discipline: faster packs, fewer incomplete submissions, and a sharper split between library assembly and partner-owned commitments.",
 valueMoves: [
 {
 title: "Partner and SME hours returned",
 where: "Pursuit · practice leads",
 signal:
 "Hours leave content hunting and nag loops; humans review a complete draft instead of assembling one.",
 },
 {
 title: "Time to first complete draft",
 where: "Bid desk · proposal ops",
 signal:
 "Requirement mapping and library pulls run continuously, not as a Friday scramble.",
 },
 {
 title: "Completeness before review",
 where: "Partner gate",
 signal:
 "Fewer partner cycles spent discovering missing sections; review time goes to win strategy.",
 },
 {
 title: "Reusable answer hygiene",
 where: "Content library · SharePoint",
 signal:
 "Approved language gets reused with provenance; stale boilerplate surfaces before it ships.",
 },
 ],
 leakageToday: [
 {
 title: "Copy from the last winning deck",
 body: "Teams paste prior answers without checking currency. Wrong dates, old logos, and expired certifications slip through.",
 },
 {
 title: "SME chase as the job",
 body: "Coordinators live in email asking for the same security and staffing paragraphs. The pack stalls on silent inboxes.",
 },
 {
 title: "Partner review of a skeleton",
 body: "Senior time burns on finding what is missing instead of sharpening the win narrative.",
 },
 {
 title: "Unmeasured pursuit labor",
 body: "Utilization eats proposal hours with no unit view of minutes per requirement or per pack.",
 },
 ],
 roles: [
 {
 role: "Proposal coordinator",
 today: "Hunts files, nags SMEs, stitches sections by hand.",
 withAgents:
 "Works gated gaps and library mismatches; monitors pack completeness.",
 },
 {
 role: "SME / practice lead",
 today: "Rewrites the same answers under deadline pressure.",
 withAgents:
 "Reviews only novel or outdated sections; confirms technical claims.",
 },
 {
 role: "Partner / COO",
 today: "Sees win rate, not assembly unit economics.",
 withAgents:
 "Gets time-to-complete-draft, HITL share, and chase aging as operating metrics.",
 },
 ],
 watchMetrics: [
 {
 metric: "Hours to first complete draft",
 move: "Down",
 note: "Primary throughput lever from RFP receipt to partner-ready pack.",
 },
 {
 metric: "SME chase age / open asks",
 move: "Down",
 note: "If aging rises while draft speed rises, chase playbooks are weak.",
 },
 {
 metric: "Share of sections auto-filled vs HITL",
 move: "Auto up with QA holding",
 note: "Expand library allowlists only when sampled accuracy holds.",
 },
 {
 metric: "Partner rework cycles per pack",
 move: "Down",
 note: "Should fall as completeness gates tighten before review.",
 },
 {
 metric: "Stale or unapproved language rate",
 move: "Down (sampled)",
 note: "Safety metric on library provenance; gate expansion on this.",
 },
 ],
 orgShift:
 "Proposal ops becomes a pack queue on the opportunity record, not a mailbox project. The content library is the system of truth for standard answers. Partners still own win themes, pricing, and contractual language; the agent owns mapping, assembly, and SME chase. Leadership manages library freshness and review gates the way they would manage a delivery playbook.",
 fitWhen: [
 "Repeat RFPs with recurring requirement schemas (security, commercial, methodology).",
 "A content library or SharePoint corpus already exists, even if messy.",
 "SME inputs are the bottleneck more than blank-page writing.",
 "Willingness to keep partner sign-off on commitments and novel claims.",
 ],
 leadershipAsks: [
 "What share of a typical RFP is boilerplate versus net-new narrative?",
 "Where does approved language live today, and who owns freshness?",
 "Which sections are safe to auto-assemble on day one versus permanently gated?",
 "Who owns the partner review gate and the definition of pack-complete?",
 "What does good look like in 90 days: hours returned, cycle time, or win-process discipline?",
 ],
 unitEconomics: {
 unit: "per RFP response pack (or per scored requirement section)",
 framing:
 "Illustrative sizing math for an OP or COO, not a measured engagement result. Build your own with loaded pursuit rates, observed hours per pack, and library coverage. The point is the shape: human cost is coordinator and SME minutes; agent cost is retrieval and draft tokens plus residual HITL review minutes.",
 human: {
 summary:
 "Cost is mostly loaded proposal and SME labor. A coordinator who spends 8-20 hours hunting, chasing, and stitching at fully loaded $60-120/hr, plus SME rewrite time, already puts routine packs in the high hundreds to low thousands of dollars before partner review.",
 lineItems: [
 {
 label: "Assembly and file hunt",
 detail:
 "Hours pulling prior answers from SharePoint, decks, and email attachments.",
 },
 {
 label: "SME chase loops",
 detail:
 "Nag cycles and context-setting that never appear cleanly on a timesheet line.",
 },
 {
 label: "Loaded pursuit rate",
 detail:
 "Use fully loaded coordinator and SME cost, not wage alone. Weekend bid pushes raise effective cost per pack.",
 },
 {
 label: "Partner rework tax",
 detail:
 "Incomplete packs burn senior hours on discovery, not strategy.",
 },
 ],
 },
 agent: {
 summary:
 "Steady-state cost is retrieval and draft tokens, proposal-tool connectors, plus partner and SME minutes on the gated slice. Auto-filled library sections should land well below human assembly cost; novel win narrative still carries human minutes and must sit in the blended average.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Requirement mapping, library retrieval, and draft assembly. Long RFPs and multi-document packs cost more; track per section and per pack.",
 },
 {
 label: "Infra",
 detail:
 "Proposal tool / SharePoint connectors, CRM opportunity link, chase scheduler. Mostly step-fixed per practice cohort; allocate per pack at expected volume.",
 },
 {
 label: "HITL residual",
 detail:
 "Partner review and SME confirmation remain. If 60% of sections auto-fill and 40% gate, blended human hours fall but do not go to zero.",
 },
 {
 label: "QA sampling",
 detail:
 "Budget audits of provenance and stale-language checks. Cheap insurance inside operating cost.",
 },
 ],
 },
 crossover:
 "Agent path usually wins when library coverage is material, packs recur, and SME chase dominates calendar time. It loses if every bid is bespoke narrative with little reusable corpus, or if partners insist on line-by-line rewrite of every section.",
 sensitivities: [
 "Share of requirements covered by an approved library.",
 "Loaded dollars per hour for coordinators and SMEs.",
 "Average tokens per pack as RFP length and attachment count grow.",
 "HITL minutes on partner review and novel claims.",
 "Bid-season spikes: human overtime versus near-flat marginal token cost.",
 ],
 },
 baseline:
 "Coordinators rebuild each response from prior decks, SharePoint folders, and email threads. SMEs are chased ad hoc. Partners review incomplete packs and discover gaps late. Standard answers are rewritten from memory. When bid volume spikes, weekends absorb the labor and quality slips through stale language and missed requirements.",
 agentPath:
 "The agent ingests the RFP, maps requirements to library entries and CRM opportunity context, assembles draft sections with provenance, chases open SME asks on a schedule, and marks the pack complete only when required sections and citations clear the playbook. Partner review, pricing, and contractual commitments stay gated in the surfaces the pursuit team already uses.",
 steps: [
 {
 title: "Ingest RFP",
 body: "Pull the solicitation and attachments into the harness; link the CRM opportunity.",
 },
 {
 title: "Map requirements",
 body: "Score each ask against library schemas: security, commercial, methodology, staffing, case studies.",
 },
 {
 title: "Retrieve answers",
 body: "Pull approved language and artifacts from the content library with provenance tags.",
 },
 {
 title: "Draft assemble",
 body: "Stitch a sectioned pack in the proposal tool or SharePoint working folder.",
 },
 {
 title: "Chase SMEs",
 body: "Open scheduled asks for missing or stale sections; escalate silent owners.",
 },
 {
 title: "Completeness gate",
 body: "Block partner review until required sections, owners, and citations clear the checklist.",
 },
 {
 title: "Partner review",
 body: "Surface the pack for win-theme and commitment judgment; capture edits back to memory where allowed.",
 },
 {
 title: "QA sample",
 body: "Sample auto-filled sections for stale language, wrong entity, and unapproved claims.",
 },
 ],
 tools: [
 "Proposal tool / SharePoint APIs",
 "CRM opportunity connector",
 "Content library retrieval",
 "SME chase / email send",
 ],
 skills: [
 "Requirement mapping schemas",
 "Library retrieval packs",
 "SME chase cadences",
 "Completeness checklists",
 ],
 memory: [
 "Prior pack dispositions by client and pursuit type",
 "Library provenance and freshness stamps",
 "SME response patterns and lag",
 ],
 qa: [
 "Provenance required on auto-filled sections",
 "Sampled stale-language audits",
 "Completeness checklist before partner gate",
 ],
 guardrails: [
 "No unverified pricing or contractual commitments",
 "No shipping a pack past partner review",
 "Library write-back only with approval",
 ],
 hitlNotes: [
 "Novel technical or legal claims",
 "Pricing and commercial exceptions",
 "Weak library match or conflicting sources",
 "Client-sensitive win narrative",
 ],
 agentOwns: [
 "Requirement mapping and library retrieval",
 "Draft assembly with citations",
 "SME chase on a schedule",
 "Completeness checklist hygiene",
 ],
 humanOwns: [
 "Partner win themes and positioning",
 "Pricing and contractual language",
 "Final submit authority",
 "Library approval for new boilerplate",
 ],
 gates: [
 "Partner review before external send",
 "Pricing and commitment language",
 "First-time or low-confidence library matches",
 ],
 staging: [
 "Map and draft in SharePoint. Humans still chase and send.",
 "Auto-assemble high-coverage sections with review on mismatches.",
 "Allowlist SME chase for recurring asks; keep partner gate hard.",
 "Expand library allowlists as QA holds. Reviews stay in the proposal tool.",
 ],
 diagram: "rfp",
 },
 {
 slug: "timesheet-client-approvals",
 title: "Client timesheet approval chase",
 blurb:
 "Submitted hours chased to client approval before billing: reminder cadence, stale escalation, finance gate intact.",
 industry: "Staffing",
 family: "Collections & chase",
 hitl: "Mostly agent-run",
 systems: ["PSA / time tool", "Email", "Client portal", "ERP billing"],
 what: "Client timesheet approvals stop living as coordinator nag loops between the PSA, email, and portal. An agent works submitted hours that need client sign-off, runs reminder cadences, escalates stale approvals, and only surfaces exceptions for account managers and finance. Billing release stays human-gated. Agents own volume chase; humans own relationship and invoice judgment.",
 operatorLens:
 "Put staffing ops time on exceptions and clients who will not approve, not on rebuilding weekly reminder lists from the PSA.",
 whyItMatters:
 "Staffing and professional services cash is trapped behind unapproved time. The work looks clerical until you count DSO, write-offs from aged hours, and coordinator overtime every Friday. For a COO or OP, this is a clean wedge: high-volume, rule-friendly chase with a hard billing gate, and a sharp split between metronome reminders and human judgment on disputed hours.",
 valueMoves: [
 {
 title: "Coordinator capacity",
 where: "Staffing ops · billing desk",
 signal:
 "Hours leave list rebuild and tier-1 nags; humans take prepared stale and dispute queues.",
 },
 {
 title: "Days to client approval",
 where: "Time-to-bill path",
 signal:
 "Earlier, consistent touches on submitted hours; fewer timesheets rotting past the billing cut.",
 },
 {
 title: "Billing readiness hygiene",
 where: "ERP · PSA",
 signal:
 "Approved packets arrive complete; finance stops hunting missing sign-offs at invoice time.",
 },
 {
 title: "Stale escalation discipline",
 where: "Account management",
 signal:
 "Relationship owners get a briefed escalate list, not a raw aging dump.",
 },
 ],
 leakageToday: [
 {
 title: "Manual reminder theater",
 body: "Ops rebuilds who to nag from PSA exports every week. Conversations that unblock approvals shrink.",
 },
 {
 title: "Silent stale timesheets",
 body: "Submitted hours age without an owner. By the time finance asks, the client has moved on.",
 },
 {
 title: "Billing held for paperwork",
 body: "Invoices wait on missing portal clicks. Cash delay looks like collections when it is really approval chase.",
 },
 {
 title: "Double-touch and skip",
 body: "Without a metronome, some managers get three reminders; others get none until month close.",
 },
 ],
 roles: [
 {
 role: "Staffing / billing coordinator",
 today: "Exports submitted hours; mails clients; updates PSA sporadically.",
 withAgents:
 "Works dispute and stale escalations from a prepared brief; owns exception notes.",
 },
 {
 role: "Account manager",
 today: "Gets surprise calls when invoices are late because time was never approved.",
 withAgents:
 "Takes relationship-sensitive escalations with prior touch history attached.",
 },
 {
 role: "COO / OP",
 today: "Sees DSO and write-offs; cannot see approval chase discipline underneath.",
 withAgents:
 "Gets approval cycle time, stale age, and auto-chase share as operating metrics.",
 },
 ],
 watchMetrics: [
 {
 metric: "Median days submit to client approval",
 move: "Down",
 note: "Primary throughput metric by client cohort.",
 },
 {
 metric: "Stale submitted hours (past SLA)",
 move: "Down",
 note: "Aging visibility the mailbox never gave.",
 },
 {
 metric: "Auto-reminder share vs HITL escalate",
 move: "Auto up with QA holding",
 note: "Expand cadences only when suppress and tone audits hold.",
 },
 {
 metric: "Billing holds for missing approval",
 move: "Down",
 note: "Outcome check at the finance gate.",
 },
 {
 metric: "Chase into disputed timesheet rate",
 move: "Down",
 note: "Suppress-list health; should trend toward zero blind nags on open disputes.",
 },
 ],
 orgShift:
 "Timesheet approval becomes playbook-driven chase on the PSA record, not a Friday email project. Agents run reminder tiers; humans run relationship escalations and disputed hours. Finance keeps the billing release gate. Leadership tunes cadences and suppress rules like a credit policy, not a mail merge.",
 fitWhen: [
 "Material volume of client-approved time before invoice.",
 "PSA or time tool is the system of record for submit status.",
 "Repeatable reminder language clients and legal will accept.",
 "Appetite to keep invoice release and write-offs human-gated.",
 ],
 leadershipAsks: [
 "What share of coordinator time is reminder prep versus true disputes?",
 "Which client cohorts are safe for auto-reminder on day one?",
 "How are disputed hours flagged today, and can chase suppress on that flag?",
 "Who owns the billing release gate when approvals finally clear?",
 "What cash or cycle metric do we hold this wedge to in 90 days?",
 ],
 unitEconomics: {
 unit: "per submitted timesheet (or per approval chase touch) awaiting client sign-off",
 framing:
 "Illustrative sizing math for an OP or COO, not a measured engagement result. Build your own with loaded ops rates, observed days-to-approve, and reminder volume. The point is the shape: human cost is coordinator minutes on list prep and nags; agent cost is PSA pulls, reminder tokens, plus residual HITL escalate minutes.",
 human: {
 summary:
 "Coordinators often spend large weekly blocks rebuilding chase lists and sending tier-1 reminders at loaded $35-60/hr. That cost sits before any account-manager conversation that actually unblocks a stubborn approver, and before cash moves.",
 lineItems: [
 {
 label: "List prep",
 detail:
 "PSA export, filter submitted-not-approved, rebuild who to touch.",
 },
 {
 label: "Tier-1 reminder mail",
 detail:
 "Low judgment, high volume. Easy to under-count because it feels like admin.",
 },
 {
 label: "Stale fire drills",
 detail:
 "Month-end scrambles when finance discovers unapproved hours at invoice cut.",
 },
 {
 label: "Cash delay shadow cost",
 detail:
 "Days stuck in approval are DSO and occasional write-off risk, not just ops minutes.",
 },
 ],
 },
 agent: {
 summary:
 "Playbook reminders and PSA status notes are cheap per touch at volume. Infra is PSA, portal, and mail. HITL concentrates on stale escalations and disputes. Blended cost per timesheet should fall; cash metrics depend on getting humans onto the right blockers faster, not on sending more mail alone.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Short template fills and escalate briefs. Keep client and period context tight.",
 },
 {
 label: "Infra",
 detail:
 "PSA aging pull, portal status read, email send, ERP billing handoff flags. Allocate per timesheet at expected volume.",
 },
 {
 label: "HITL residual",
 detail:
 "Account-manager escalations and disputed hours remain. Measure human hours on unblocks, not total outbound count.",
 },
 {
 label: "Suppress quality",
 detail:
 "Blind chase into disputes wastes tokens and damages client trust; suppress health is part of unit cost.",
 },
 ],
 },
 crossover:
 "Wins when mid-volume clients approve routinely, reminder language is approvable, and ops is visibly stuck in prep. Loses when most dollars sit in chronic disputers who need humans from the first touch, or when the PSA cannot reliably show submit versus approve state.",
 sensitivities: [
 "Share of coordinator time on prep versus live escalations.",
 "Volume in auto-safe client cohorts versus dispute-heavy tails.",
 "Loaded ops and account-manager rates.",
 "Tokens per send as personalization and portal deep-links grow.",
 "Days-to-approve movement in the targeted cohorts (the outcome check).",
 ],
 },
 baseline:
 "Coordinators pull submitted-not-approved reports from the PSA, mail or portal-ping clients from static lists, and update statuses inconsistently. Follow-ups slip. The same manager is touched twice or not at all. Billing discovers missing approvals at invoice time. Time goes to list hygiene rather than conversations that unblock cash.",
 agentPath:
 "The agent works submitted timesheets with playbooks (reminder, firm notice, escalate), posts structured notes into the PSA, reads portal status where available, and builds escalate lists for account managers on stale or sensitive clients. Invoice release, write-offs, and disputed-hour concessions stay gated with finance.",
 steps: [
 {
 title: "Pull submitted queue",
 body: "PSA view of hours submitted and awaiting client approval, scoped by cohort.",
 },
 {
 title: "Score path",
 body: "Bucket by age, client playbook, dispute flag, and balance at risk.",
 },
 {
 title: "Execute reminder tier",
 body: "Send approved template or portal nudge; write the touch to the timesheet timeline.",
 },
 {
 title: "Watch portal status",
 body: "Reconcile client portal approvals back to the PSA; clear when signed.",
 },
 {
 title: "Escalate stale",
 body: "Cross SLA into account-manager queue with prior touch brief attached.",
 },
 {
 title: "Suppress disputes",
 body: "Halt blind chase when hours are in formal dispute; route to human path.",
 },
 {
 title: "Billing-ready handoff",
 body: "Mark approved packets for finance; do not release invoices without the gate.",
 },
 {
 title: "QA sample",
 body: "Audit outbound language, suppress lists, and wrong-client touches.",
 },
 ],
 tools: [
 "PSA / time tool API",
 "Email send",
 "Client portal status read",
 "ERP billing handoff flag",
 ],
 skills: [
 "Reminder tiers by client cohort",
 "Stale escalation thresholds",
 "Dispute suppress rules",
 "Billing-ready checklists",
 ],
 memory: [
 "Prior touch sequence per timesheet and approver",
 "Client approval lag patterns",
 "Dispute and suppress history",
 ],
 qa: [
 "Template-only outbound on auto path",
 "Suppress on dispute flags",
 "Sampled wrong-client and tone audits",
 ],
 guardrails: [
 "No invoice release without finance gate",
 "No write-off or hour concession language",
 "No chase into flagged disputes",
 ],
 hitlNotes: [
 "Stale beyond escalate threshold",
 "Disputed or corrected hours",
 "Sensitive or strategic clients",
 "Missing worker or project identity",
 ],
 agentOwns: [
 "Tier-1 and tier-2 approval reminders",
 "PSA note hygiene",
 "Portal status reconcile",
 "Escalate-list prep for humans",
 ],
 humanOwns: [
 "Relationship escalations",
 "Disputed hour resolution",
 "Invoice release",
 "Write-offs and concessions",
 ],
 gates: [
 "ERP billing release",
 "Write-offs and hour concessions",
 "First-time or high-sensitivity clients",
 ],
 staging: [
 "Draft reminder tasks in the PSA. Coordinators still send.",
 "Auto-send tier-1 reminders for a clean client cohort.",
 "Add portal reconcile and stale escalate briefs.",
 "Expand tiers as QA holds; keep finance on the billing gate.",
 ],
 diagram: "timesheet",
 },
 {
 slug: "prior-auth-packet-chase",
 title: "Prior authorization packet chase",
 blurb:
 "Clinical docs assembled for prior auth, missing records chased, ready handoff prepared. Clinical decision stays human.",
 industry: "Healthcare RCM",
 family: "Claims & intake",
 hitl: "Review-gated",
 systems: ["EHR", "Clearinghouse / payer portal", "Fax/mail", "RCM workqueue"],
 what: "Prior authorization packets stop living as a scavenger hunt across the EHR, fax queues, and payer portals. An agent assembles required clinical documents, chases missing records on a schedule, checks packet completeness against payer playbooks, and only surfaces a ready handoff for clinical and RCM review. Clinical necessity decisions and final submit authority stay human.",
 operatorLens:
 "Turn prior-auth assembly from a chart-hunt backlog into a measured packet queue where agents own volume chase and clinicians own judgment.",
 whyItMatters:
 "Healthcare RCM teams lose days to incomplete prior-auth packs: missing notes, unsigned orders, wrong CPT or ICD pairings, and silent fax loops. Denial and delay show up as cash and patient access problems, not as a clean staffing line. For a COO or OP, this is high-volume intake work with a sharp split between document assembly and clinical judgment, and it compounds across every payer with a different checklist.",
 valueMoves: [
 {
 title: "Days to packet-ready",
 where: "RCM · referral desks",
 signal:
 "Required docs assemble faster when chase follows a payer playbook instead of whoever opens the workqueue first.",
 },
 {
 title: "Coordinator and MA capacity",
 where: "Auth team · clinic ops",
 signal:
 "Hours leave chart hunting and re-fax loops; humans review ready packs and true clinical gaps.",
 },
 {
 title: "Avoidable delay and denial leakage",
 where: "Payer turnaround · resubmits",
 signal:
 "Fewer submits bounce for missing attachments; fewer patients wait on paperwork.",
 },
 {
 title: "Audit-ready trail",
 where: "RCM workqueue · EHR",
 signal:
 "Every chase and document land on the auth record, not in a personal fax folder.",
 },
 ],
 leakageToday: [
 {
 title: "Chart hunt as the job",
 body: "Staff click through the EHR rebuilding the same clinical packet under deadline pressure.",
 },
 {
 title: "Silent missing records",
 body: "Outside notes and imaging sit in fax or mail with no aging owner.",
 },
 {
 title: "Payer checklist folklore",
 body: "Requirements live in one coordinator's head. Coverage disappears on their day off.",
 },
 {
 title: "Submit then discover gaps",
 body: "Packets go out incomplete. Payer pends create rework and patient delay.",
 },
 ],
 roles: [
 {
 role: "Prior-auth coordinator",
 today: "Hunts charts, faxes, and portal uploads; nags clinics for missing notes.",
 withAgents:
 "Works gated clinical gaps and payer exceptions; monitors packet completeness.",
 },
 {
 role: "Clinician / nurse reviewer",
 today: "Pulled into paperwork to find what is missing as much as to judge necessity.",
 withAgents:
 "Reviews ready packets for clinical judgment; confirms medical necessity language.",
 },
 {
 role: "RCM leader / COO",
 today: "Sees auth turnaround and denials; cannot see packet unit economics underneath.",
 withAgents:
 "Gets time-to-ready, chase aging, and HITL share as operating metrics.",
 },
 ],
 watchMetrics: [
 {
 metric: "Median days request to packet-ready",
 move: "Down",
 note: "Primary throughput metric by payer and service line.",
 },
 {
 metric: "Share packs auto-complete vs HITL",
 move: "Auto up with QA holding",
 note: "Completeness can rise; clinical submit stays gated.",
 },
 {
 metric: "Missing-doc chase age",
 move: "Down",
 note: "If aging rises while ready-speed rises, outside-record chase is weak.",
 },
 {
 metric: "Payer pend rate for missing attachments",
 move: "Down",
 note: "Outcome check on completeness playbooks.",
 },
 {
 metric: "Wrong-document or wrong-patient rate",
 move: "Down (sampled)",
 note: "Safety metric. Gate expansion on this, not on speed alone.",
 },
 ],
 orgShift:
 "Prior auth becomes a packet queue on the RCM work item, not a personal EHR scavenger hunt. Payer checklists get written down. Clinicians still own medical necessity and submit authority; the agent owns assembly, chase, and ready handoff. Leadership manages playbook coverage and QA sampling like a denial-prevention program.",
 fitWhen: [
 "Material prior-auth volume with recurring payer document checklists.",
 "EHR and RCM workqueue can remain systems of action.",
 "Missing outside records and fax loops are a visible bottleneck.",
 "Willingness to keep clinical decision and final submit human-gated.",
 ],
 leadershipAsks: [
 "Which payers and service lines dominate auth volume?",
 "Where does packet status live today: workqueue, spreadsheet, or someone's head?",
 "Which documents are safe to mark complete without a clinician?",
 "Who signs clinical necessity and final portal submit?",
 "What is the 90-day scoreboard: time-to-ready, pend rate, or FTE hours?",
 ],
 unitEconomics: {
 unit: "per prior-auth packet (or per required document chase)",
 framing:
 "Illustrative sizing math for an OP or COO, not a measured engagement result. Build your own with loaded RCM rates, observed hours per auth, and payer mix. The point is the shape: human cost is coordinator and clinician minutes; agent cost is EHR retrieval and chase tokens plus residual HITL review minutes.",
 human: {
 summary:
 "Cost is mostly loaded auth-coordinator labor and stolen clinician time. A coordinator who spends 30-90 minutes assembling and chasing at fully loaded $30-55/hr, plus nurse review minutes, already puts routine packets in a meaningful unit cost before pends and resubmits.",
 lineItems: [
 {
 label: "EHR chart assembly",
 detail:
 "Minutes pulling notes, orders, imaging, and codes into the packet.",
 },
 {
 label: "Outside-record chase",
 detail:
 "Fax, mail, and clinic nag loops that rarely appear cleanly on a productivity report.",
 },
 {
 label: "Loaded RCM rate",
 detail:
 "Use fully loaded coordinator cost, plus clinician minutes pulled into paperwork.",
 },
 {
 label: "Pend and resubmit tax",
 detail:
 "Incomplete first submits create rework and delay that dwarfs the first-pass minutes.",
 },
 ],
 },
 agent: {
 summary:
 "Steady-state cost is retrieval tokens, EHR and clearinghouse connectors, fax/mail chase, plus clinician minutes on the gated slice. Auto-assembled checklist items should land below human hunt cost; medical necessity review still carries human minutes and must sit in the blended average.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Checklist mapping, document classification, and chase briefs. Long charts cost more; track per packet and per missing-doc chase.",
 },
 {
 label: "Infra",
 detail:
 "EHR read, payer portal or clearinghouse status, fax/mail connectors, workqueue write. Allocate per packet at expected volume.",
 },
 {
 label: "HITL residual",
 detail:
 "Clinical review and final submit remain. If assembly auto-completes and judgment gates, blended human minutes fall but do not go to zero.",
 },
 {
 label: "QA sampling",
 detail:
 "Budget wrong-patient and wrong-document audits. Non-negotiable insurance in operating cost.",
 },
 ],
 },
 crossover:
 "Agent path usually wins when payer checklists recur, EHR document retrieval is feasible, and chase volume dominates calendar time. It loses if every auth is a novel clinical edge case, or if identity and chart-access constraints force near-100% human assembly.",
 sensitivities: [
 "Share of packet items covered by a written payer checklist.",
 "Loaded dollars per hour for coordinators and nurse reviewers.",
 "Average tokens per packet as chart length and attachment count grow.",
 "HITL minutes on clinical review and portal submit.",
 "Pend rate movement for missing attachments (the outcome check).",
 ],
 },
 baseline:
 "Coordinators rebuild each prior-auth packet from the EHR, chase outside records by fax and phone, and upload to payer portals under deadline pressure. Checklist knowledge is tribal. Clinicians are pulled in to find gaps as often as to judge necessity. Incomplete submits create pends, resubmits, and patient delay.",
 agentPath:
 "The agent opens the auth work item, maps required documents to the payer playbook, pulls available EHR artifacts, classifies inbound fax/mail into the packet, chases missing records on a schedule, and marks the pack ready only when the checklist clears. Clinical necessity review and final submit stay gated for humans in the RCM workqueue and payer portal.",
 steps: [
 {
 title: "Open auth work item",
 body: "Pull the prior-auth request from the RCM workqueue; bind patient and payer context.",
 },
 {
 title: "Map payer checklist",
 body: "Score required documents and data elements against the service-line playbook.",
 },
 {
 title: "Assemble from EHR",
 body: "Retrieve notes, orders, imaging, and coded elements with provenance.",
 },
 {
 title: "Ingest outside records",
 body: "Classify fax/mail attachments into the packet; flag weak identity matches.",
 },
 {
 title: "Chase missing docs",
 body: "Schedule clinic and facility asks; escalate silent sources.",
 },
 {
 title: "Completeness gate",
 body: "Block clinical review until required artifacts clear the checklist.",
 },
 {
 title: "Clinical / RCM review",
 body: "Surface the ready packet for medical necessity judgment and submit authority.",
 },
 {
 title: "QA sample",
 body: "Audit wrong-patient, wrong-document, and checklist miss rates on auto-assembled packs.",
 },
 ],
 tools: [
 "EHR document retrieval",
 "Clearinghouse / payer portal status",
 "Fax/mail ingest",
 "RCM workqueue write",
 ],
 skills: [
 "Payer checklist schemas",
 "Clinical document classification",
 "Missing-record chase cadences",
 "Packet completeness gates",
 ],
 memory: [
 "Payer checklist versions by service line",
 "Prior chase outcomes for outside facilities",
 "Packet dispositions and pend reasons",
 ],
 qa: [
 "Patient and document identity checks",
 "Checklist completeness before review gate",
 "Sampled wrong-attachment audits",
 ],
 guardrails: [
 "No clinical necessity determination by the agent",
 "No final payer submit without human gate",
 "No chart access beyond scoped encounter permissions",
 ],
 hitlNotes: [
 "Weak patient or document identity match",
 "Novel or uncovered payer requirements",
 "Clinical necessity and peer-to-peer prep",
 "Final portal submit",
 ],
 agentOwns: [
 "Checklist mapping and EHR assembly",
 "Fax/mail classification into the packet",
 "Missing-record chase on a schedule",
 "Ready handoff hygiene",
 ],
 humanOwns: [
 "Medical necessity judgment",
 "Peer-to-peer clinical conversation",
 "Final submit authority",
 "Appeals strategy on denial",
 ],
 gates: [
 "Clinical review before submit",
 "Final payer portal submit",
 "Identity confidence below threshold",
 ],
 staging: [
 "Assemble and draft chase tasks in the workqueue. Humans still send and submit.",
 "Auto-pull EHR checklist items with review on mismatches.",
 "Allowlist chase for recurring outside-record asks; keep clinical gate hard.",
 "Expand payer playbooks as QA holds. Submit stays human.",
 ],
 diagram: "priorauth",
 },
 {
 slug: "trade-deduction-management",
 title: "Trade promotion deduction management",
 blurb:
 "Retailer deductions matched to promo deals, dispute packets built, auto-clear within playbook. Write-offs stay gated.",
 industry: "Packaged goods",
 family: "Collections & chase",
 hitl: "Exception-heavy",
 systems: ["ERP AR", "Deduction tool", "Retailer EDI/portal", "Trade promo system"],
 what: "Trade promotion deductions stop living as a spreadsheet park between AR, sales, and broker teams. An agent matches retailer deductions to promo deals and deal sheets, assembles dispute packets with EDI and portal evidence, auto-clears within playbook tolerances, and only surfaces true commercial exceptions. Write-offs and settlement posture stay human-gated.",
 operatorLens:
 "Put commercial and AR time on disputed economics, not on rebuilding deduction match packets from EDI and email.",
 whyItMatters:
 "CPG and packaged-goods operators routinely leak margin into unmatched deductions and slow disputes. The work fragments across ERP AR, deduction tools, retailer portals, and trade promo systems, so the same banner can over-clear, under-dispute, and still burn analysts into overtime. For a COO or OP, this is recoverable trade spend discipline and controllable back-office labor in one workflow.",
 valueMoves: [
 {
 title: "Days to disposition",
 where: "AR · trade finance",
 signal:
 "Matches and dispute packets leave the queue faster when playbooks run continuously.",
 },
 {
 title: "Analyst and broker capacity",
 where: "Deduction desk · sales ops",
 signal:
 "Hours leave evidence hunting; humans decide invalid claims and settlement posture.",
 },
 {
 title: "Invalid deduction recovery",
 where: "Dispute win rate · cash",
 signal:
 "Complete packets go out on time; fewer valid windows expire while evidence is still missing.",
 },
 {
 title: "Trade spend hygiene",
 where: "Promo system · deal sheets",
 signal:
 "Deductions tie back to deals with an audit trail leadership can trust.",
 },
 ],
 leakageToday: [
 {
 title: "Mailbox and spreadsheet as the system",
 body: "Deductions bounce between AR and sales with no aging owner and no standard disposition.",
 },
 {
 title: "Evidence chase by heroics",
 body: "Analysts rebuild backup from EDI, portals, and email. Dispute clocks run out.",
 },
 {
 title: "Over-clear to quiet the queue",
 body: "Pressure to clean aging produces write-offs that should have been disputed.",
 },
 {
 title: "Deal sheet folklore",
 body: "Promo terms live in one broker's inbox. Match quality collapses on coverage gaps.",
 },
 ],
 roles: [
 {
 role: "Deduction analyst",
 today: "Matches by hand; hunts backup; posts ERP notes inconsistently.",
 withAgents:
 "Works exception and settlement queues from prepared packets; owns write-off requests.",
 },
 {
 role: "Trade / sales ops",
 today: "Firefights retailer claims without a clean evidence pack.",
 withAgents:
 "Confirms deal intent and commercial posture on gated exceptions.",
 },
 {
 role: "Controller / COO",
 today: "Sees deduction aging and trade spend variance late.",
 withAgents:
 "Gets match rate, dispute cycle time, and auto-clear share as operating metrics.",
 },
 ],
 watchMetrics: [
 {
 metric: "Median days deduction to disposition",
 move: "Down",
 note: "Primary throughput metric by retailer and reason code.",
 },
 {
 metric: "Auto-clear share within playbook",
 move: "Up with QA holding",
 note: "Expand tolerances only when sample audits stay clean.",
 },
 {
 metric: "Dispute packet completeness at send",
 move: "Up",
 note: "Should rise as EDI/portal evidence assembly tightens.",
 },
 {
 metric: "Invalid deduction recovery / uphold rate",
 move: "Improve",
 note: "Outcome check; incomplete packets suppress recovery.",
 },
 {
 metric: "Write-off rate on matched-valid vs exception",
 move: "Watch mix",
 note: "If write-offs rise while auto-clear rises, tolerances may be too loose.",
 },
 ],
 orgShift:
 "Deduction management becomes a playbook queue on the AR and trade systems, not a cross-functional scavenger hunt. Agents match, assemble, and auto-clear within tolerances; humans own commercial disputes and write-offs. Retailer portals and EDI remain evidence rails. Leadership tunes match rules and settlement gates like a credit policy.",
 fitWhen: [
 "Material deduction volume tied to trade promotions and retailer reason codes.",
 "ERP AR plus a deduction or trade system can remain systems of action.",
 "Repeatable match and auto-clear rules finance will approve.",
 "Appetite to gate write-offs and settlement concessions.",
 ],
 leadershipAsks: [
 "What share of deductions is matchable to a deal sheet versus true commercial dispute?",
 "Where does deduction status live today, and who owns aging?",
 "Which reason codes are safe to auto-clear on day one?",
 "Who approves write-offs and retailer settlement posture?",
 "What is the 90-day scoreboard: days-to-disposition, recovery, or FTE hours?",
 ],
 unitEconomics: {
 unit: "per retailer deduction line (or per dispute packet)",
 framing:
 "Illustrative sizing math for an OP or COO, not a measured engagement result. Build your own with loaded analyst rates, observed minutes per deduction, and retailer mix. The point is the shape: human cost is match and evidence minutes; agent cost is match tokens and portal pulls plus residual HITL exception minutes. Do not treat recovery as a promised ROI percentage.",
 human: {
 summary:
 "Cost is mostly loaded deduction-analyst and sales-ops labor. An analyst who spends 15-45 minutes matching and assembling backup at fully loaded $40-75/hr already puts routine lines at a material unit cost before dispute cycles and write-off leakage.",
 lineItems: [
 {
 label: "Match and research time",
 detail:
 "Minutes tying deduction reason codes to promo deals and invoices.",
 },
 {
 label: "Evidence assembly",
 detail:
 "EDI, portal screenshots, deal sheets, and email backup rebuilt by hand.",
 },
 {
 label: "Loaded analyst rate",
 detail:
 "Use fully loaded AR and trade-ops cost, including broker time pulled into packet prep.",
 },
 {
 label: "Late-dispute leakage",
 detail:
 "Valid windows expire while evidence is incomplete; write-offs absorb what should have been recovered.",
 },
 ],
 },
 agent: {
 summary:
 "Steady-state cost is match and classification tokens, ERP and portal connectors, plus human minutes on commercial exceptions. Auto-clears within tolerance should land below human research cost; settlement and write-offs still carry human minutes and must sit in the blended average.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Reason-code classification, deal match, and dispute-brief generation. Track per line and per packet.",
 },
 {
 label: "Infra",
 detail:
 "ERP AR, deduction tool, retailer EDI/portal pulls, trade promo reads. Allocate per deduction at expected volume.",
 },
 {
 label: "HITL residual",
 detail:
 "Commercial disputes, settlement posture, and write-offs remain. Measure human hours on exceptions, not total lines touched.",
 },
 {
 label: "QA sampling",
 detail:
 "Budget audits of auto-clears and dispute packet groundedness. Cheap insurance against silent over-clear.",
 },
 ],
 },
 crossover:
 "Agent path usually wins when a large share of deductions matches cleanly to deals, evidence is system-retrievable, and analysts are stuck in packet prep. It loses if most dollars sit in novel commercial fights that need humans from the first touch, or if promo master data is too broken to trust matches.",
 sensitivities: [
 "Share of deductions auto-clearable within approved tolerances.",
 "Loaded dollars per hour for analysts and trade ops.",
 "Average tokens per deduction as portal evidence and deal context grow.",
 "HITL minutes on disputes and write-off approvals.",
 "Recovery and write-off mix as tolerances widen (the control check).",
 ],
 },
 baseline:
 "Analysts pull deduction aging from ERP or a deduction tool, match to trade deals by hand, and rebuild backup from retailer portals, EDI, and email. Disputes go out late or incomplete. Valid claims are over-cleared to quiet the queue. Sales and brokers are pulled into evidence hunts. Write-offs absorb what process failure created.",
 agentPath:
 "The agent ingests deduction lines, matches to trade promo deals and invoices, pulls retailer EDI and portal evidence, auto-clears within playbook tolerances, and assembles dispute packets for exceptions. Commercial settlement posture and write-offs stay gated for finance and trade leadership.",
 steps: [
 {
 title: "Ingest deductions",
 body: "Pull open deduction lines from ERP AR or the deduction tool with retailer and reason codes.",
 },
 {
 title: "Match to deals",
 body: "Resolve against trade promo system deal sheets, invoices, and tolerances.",
 },
 {
 title: "Pull evidence",
 body: "Collect EDI, portal, and backup artifacts required by reason-code playbook.",
 },
 {
 title: "Auto-clear or route",
 body: "Clear within allowlisted tolerances; otherwise open an exception with a brief.",
 },
 {
 title: "Build dispute packet",
 body: "Assemble a grounded packet for invalid or unmatched claims; queue for human send.",
 },
 {
 title: "Escalate commercial",
 body: "Surface settlement and write-off candidates with exposure and history attached.",
 },
 {
 title: "Post disposition",
 body: "Write match, dispute, or clear notes back to ERP and the deduction tool.",
 },
 {
 title: "QA sample",
 body: "Audit auto-clears, wrong-deal matches, and dispute groundedness.",
 },
 ],
 tools: [
 "ERP AR connector",
 "Deduction tool API",
 "Retailer EDI / portal pull",
 "Trade promo system read",
 ],
 skills: [
 "Reason-code match playbooks",
 "Auto-clear tolerances",
 "Dispute packet packs",
 "Write-off escalate briefs",
 ],
 memory: [
 "Retailer reason-code patterns",
 "Prior dispute outcomes by banner",
 "Deal-sheet match history",
 ],
 qa: [
 "Tolerance and match validation on auto-clears",
 "Groundedness checks on dispute packets",
 "Sampled wrong-deal audits",
 ],
 guardrails: [
 "No write-off without finance gate",
 "No settlement concession language beyond templates",
 "No auto-clear outside approved tolerances",
 ],
 hitlNotes: [
 "Above-tolerance or unmatched deductions",
 "Strategic retailer relationship cases",
 "Write-off and settlement posture",
 "Conflicting deal sheets or missing promo master data",
 ],
 agentOwns: [
 "Match and classification",
 "Evidence assembly from systems",
 "Auto-clear within playbook",
 "Dispute packet prep",
 ],
 humanOwns: [
 "Commercial dispute strategy",
 "Settlement posture with retailers",
 "Write-off approval",
 "Promo master-data corrections",
 ],
 gates: [
 "Write-offs and credits",
 "Settlement concessions",
 "Auto-clear outside tolerance or low match confidence",
 ],
 staging: [
 "Match and draft dispute packets as tasks. Analysts still clear and send.",
 "Auto-clear one or two clean reason codes within tight tolerances.",
 "Add portal/EDI evidence assembly for dispute packs.",
 "Expand tolerances as QA holds; keep write-offs human-gated.",
 ],
 diagram: "deduction",
 },
{
 slug: "joiner-access-provisioning",
 title: "Joiner access provisioning chase",
 blurb:
 "New-hire and role-change access requests assembled, approvers chased, and allowlisted apps provisioned only after approval.",
 industry: "Cross-industry",
 family: "Access & provisioning",
 hitl: "Approval-required",
 systems: ["HRIS", "ITSM", "IdP / directory", "Email"],
 what: "Joiner, mover, and role-change access work becomes an agent-operated chase lane. The agent reads the HRIS event, opens or updates the ITSM ticket, assembles the entitlement packet, nudges approvers on a schedule, and provisions only allowlisted apps after the required approvals land. Privileged and high-risk access always waits for a human gate.",
 operatorLens:
 "Stop IT and managers from chasing joiner access in email while day-one productivity and audit posture both slip.",
 whyItMatters:
 "Most mid-market companies still treat access as a ticket plus a string of reminder emails. HRIS says someone started; IdP and SaaS apps say otherwise for days. That lag shows up as idle payroll, shadow workarounds, and messy joiner evidence at audit time. For an OP or COO, this is controllable labor and controllable risk in one workflow: agents can own volume chase and packet assembly, while humans keep judgment on who should hold privileged keys.",
 valueMoves: [
 {
 title: "Time to productive access",
 where: "ITSM · IdP · manager desks",
 signal:
 "Standard roles reach day-one apps without a human sitting in the reminder loop.",
 },
 {
 title: "Approver chase off the critical path",
 where: "Managers · app owners",
 signal:
 "Nudges run on a schedule; humans only decide, they do not re-find the ticket.",
 },
 {
 title: "Cleaner joiner evidence",
 where: "IT · security · audit",
 signal:
 "Who requested, who approved, and what was granted live in one trail.",
 },
 {
 title: "Privileged risk contained",
 where: "Admin and break-glass paths",
 signal:
 "High-risk entitlements stay gated even as routine volume clears faster.",
 },
 ],
 leakageToday: [
 {
 title: "Day-one access theater",
 body: "The hire is on payroll while waiting on three approvals and a forgotten SaaS seat.",
 },
 {
 title: "Reminder ping-pong",
 body: "IT re-opens the same ticket to ask managers the same question every two days.",
 },
 {
 title: "Shadow workarounds",
 body: "Teams share logins or temporary accounts when provisioning lags, then forget to clean up.",
 },
 {
 title: "Audit scramble",
 body: "Evidence of who approved what is reconstructed from email threads after the fact.",
 },
 ],
 roles: [
 {
 role: "IT / IAM coordinator",
 today: "Builds tickets by hand, chases approvers, clicks provision in each app.",
 withAgents:
 "Works privileged and oddball requests; routine allowlisted grants run after approval.",
 },
 {
 role: "Hiring manager / app owner",
 today: "Loses approval requests in mail and gets blamed for day-one delays.",
 withAgents:
 "Sees a clean packet and decides; chase is already done.",
 },
 {
 role: "COO / OP",
 today: "Sees onboarding complaints and audit findings as separate fires.",
 withAgents:
 "Gets time-to-access, approval age, and privileged gate rate as one wedge.",
 },
 ],
 watchMetrics: [
 {
 metric: "Median time HRIS event to standard access live",
 move: "Down",
 note: "Primary service lever for joiner and role-change cohorts.",
 },
 {
 metric: "Approver cycle time on open packets",
 move: "Down",
 note: "Shows whether chase cadence is working or just creating noise.",
 },
 {
 metric: "Allowlisted auto-provision share",
 move: "Up, with QA holding",
 note: "Expand only when entitlement mapping and sample audits stay clean.",
 },
 {
 metric: "Privileged requests still human-gated",
 move: "Hold at 100%",
 note: "Safety invariant. Never trade this for speed.",
 },
 {
 metric: "Orphan / over-provision findings in QA sample",
 move: "Down",
 note: "Catches wrong role maps and leftover temporary access.",
 },
 ],
 orgShift:
 "Access stops being a mailbox sport between HR, IT, and managers. HRIS events become intake; ITSM is the work queue; IdP is the execution surface. Coordinators manage exceptions and privileged gates the way they would manage any approval queue, not by re-reading email.",
 fitWhen: [
 "Joiner and mover volume is recurring and role catalogs are at least partly standardized.",
 "HRIS, ITSM, and IdP already exist, even if handoffs are manual today.",
 "Leadership can name allowlisted apps versus permanently gated privileged paths.",
 "Willingness to keep admin, finance, and production break-glass access human-approved.",
 ],
 leadershipAsks: [
 "Which roles have a written entitlement map versus tribal knowledge?",
 "What is allowlisted for auto-provision after approval on day one?",
 "Who owns the privileged gate: IT, security, or the app owner?",
 "Where does the system of truth for approvals live: ITSM, IdP, or email?",
 "What does good look like in 90 days: time-to-access, approval age, or audit finding rate?",
 ],
 unitEconomics: {
 unit: "per joiner or role-change access packet",
 framing:
 "Illustrative sizing math for an OP or COO, not a measured engagement result. Build your own with loaded IT and manager rates, observed minutes per chase, and your IdP or ITSM costs. The shape matters: human cost is minutes across IT and approvers; agent cost is tokens plus connectors plus residual approval and privileged HITL.",
 human: {
 summary:
 "Cost is mostly coordinator touch time plus manager interrupt time. A packet that burns 20-40 IT minutes and 10-20 manager minutes at loaded rates is already material before rework, temporary access cleanup, and audit prep.",
 lineItems: [
 {
 label: "IT ticket assembly",
 detail:
 "15-30 minutes to read HRIS, open ITSM, map apps, and start the chase on a routine joiner.",
 },
 {
 label: "Approver interrupt tax",
 detail:
 "Managers spend repeated short sessions re-finding context; total often exceeds the formal approve click.",
 },
 {
 label: "Provision clicks",
 detail:
 "Per-app manual grants add minutes and error risk when catalogs are long.",
 },
 {
 label: "Rework and audit prep",
 detail:
 "Wrong entitlements, leftover temps, and missing approval trails show up later as cleanup and evidence hunts.",
 },
 ],
 },
 agent: {
 summary:
 "Steady-state cost is tokens to assemble and chase, HRIS/ITSM/IdP connectors, plus human minutes on approvals and every privileged path. Routine allowlisted volume should land below human packet cost; the gated privileged tail must stay in the blended average.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Packet assemble, reminder drafts, and status writes are usually thin prompts; long approval threads and ambiguous role maps cost more.",
 },
 {
 label: "Infra",
 detail:
 "HRIS, ITSM, IdP, and mail connectors plus logging. Mostly step-fixed per employee cohort; allocate per packet at expected joiner volume.",
 },
 {
 label: "HITL residual",
 detail:
 "Approvals still need humans, and privileged access always does. Blended minutes fall when chase and allowlisted provision stop living with IT.",
 },
 {
 label: "QA sampling",
 detail:
 "Budget sampled checks on auto-provisions and role-map matches. Cheap insurance against silent over-entitlement.",
 },
 ],
 },
 crossover:
 "Agent path usually wins when role catalogs cover most joiners, approver chase is a large share of IT minutes, and allowlisted apps are clear. It loses if almost every request is bespoke, or if IdP mappings are so wrong that near-100% human review is mandatory.",
 sensitivities: [
 "Share of joiners that map to standard roles (main lever on auto-provision).",
 "Loaded IT and manager dollars per hour.",
 "Approver latency and reminder cadence effectiveness.",
 "Privileged mix that must remain fully gated.",
 "Hire-spike weeks: human overtime versus near-flat marginal token cost.",
 ],
 },
 baseline:
 "HRIS marks a start or role change. Someone in IT opens a ticket, guesses the app list, and emails managers for approval. Reminders are manual. Provisioning is clicked app by app after approvals dribble in. Privileged requests sit in the same pile as email and Slack. Temporary workarounds appear when day one arrives without access. Audit later asks for the trail and the trail is the mailbox.",
 agentPath:
 "HRIS events and ITSM requests are ingested continuously. An agent builds the entitlement packet from role maps, opens or updates the ticket, chases approvers on a schedule, and writes status back to ITSM and mail. After required approvals, it provisions allowlisted apps in IdP or connected SaaS. Privileged, novel, or weak-match requests wait for a human gate in the tools IT already uses.",
 steps: [
 {
 title: "Ingest",
 body: "HRIS joiner/mover events and ITSM access requests enter the harness with employee and role context.",
 },
 {
 title: "Map entitlements",
 body: "Role and department resolve to an allowlisted app set; weak maps open a needs-design exception.",
 },
 {
 title: "Assemble packet",
 body: "Ticket fields, justification, approver list, and risk flags become one structured packet.",
 },
 {
 title: "Chase approvals",
 body: "Scheduled nudges to managers and app owners with deep links back to the packet.",
 },
 {
 title: "Gate",
 body: "Privileged and novel paths stop for human decision; routine paths proceed only after required approvals.",
 },
 {
 title: "Provision",
 body: "Allowlisted grants execute in IdP or app connectors with scoped permissions.",
 },
 {
 title: "Close the loop",
 body: "ITSM and requester updates record what was granted, by whom, and when.",
 },
 {
 title: "QA sample",
 body: "Risk-weighted samples of auto-provisions land in the existing IAM or security audit queue.",
 },
 ],
 tools: [
 "HRIS connector",
 "ITSM ticket write",
 "IdP / directory APIs",
 "Mail chase",
 ],
 skills: [
 "Role-to-entitlement maps",
 "Approver routing packs",
 "Reminder cadences",
 "Privileged risk flags",
 ],
 memory: [
 "Role catalog versions",
 "Prior packets per department",
 "Approver response patterns",
 ],
 qa: [
 "Entitlement map match checks",
 "Sampled audit of auto-provisions",
 "Orphan and over-provision scans",
 ],
 guardrails: [
 "No privileged grant without a human gate",
 "No provision before required approvals",
 "Scoped app connectors per allowlist",
 ],
 hitlNotes: [
 "Privileged or break-glass access",
 "Weak or missing role map",
 "Novel app outside the allowlist",
 "Conflicting HRIS versus manager requests",
 ],
 agentOwns: [
 "Packet assembly from HRIS and role maps",
 "Approver chase on a schedule",
 "Allowlisted provision after approval",
 "Status writes back to ITSM and mail",
 ],
 humanOwns: [
 "Privileged access decisions",
 "Role catalog design and exceptions",
 "Novel SaaS or vendor access",
 "Revocation judgment on disputed cases",
 ],
 gates: [
 "Every privileged or admin entitlement",
 "Apps outside the published allowlist",
 "Confidence below role-map threshold",
 ],
 staging: [
 "Read HRIS and draft ITSM packets; humans still chase and provision.",
 "Auto-chase approvers with humans still clicking grants.",
 "Allowlist standard roles for post-approval IdP provision.",
 "Expand allowlists as QA holds; privileged paths stay gated.",
 ],
 diagram: "access",
 },
 {
 slug: "bank-rec-exceptions",
 title: "Bank reconciliation exception clearing",
 blurb:
 "Unmatched bank lines cleared against GL and remittance patterns, with true unknowns parked for accounting judgment.",
 industry: "Cross-industry",
 family: "Order-to-cash",
 hitl: "Exception-heavy",
 systems: ["ERP GL", "Bank feed", "Lockbox / remittance", "Email"],
 what: "Bank-to-GL breaks become an agent-operated exception lane. The agent matches known patterns, pulls lockbox and remittance context, chases missing advice, posts or clears only where allowlisted, and parks true unknowns for accounting. Cash application judgment and material write-off decisions stay human.",
 operatorLens:
 "Stop controllers from rebuilding the same unmatched bank pile every close while cash application waits on remittance chase.",
 whyItMatters:
 "Unmatched deposits and withdrawals are where cash truth and close discipline meet. The work is fragmented across bank feeds, lockbox files, customer email, and ERP clearing accounts, so the same team can clear late, misapply cash, and still burn senior time on items a playbook already knows. An OP or COO cares because this is close risk, customer credit noise, and controllable finance labor in one queue.",
 valueMoves: [
 {
 title: "Faster clear of known breaks",
 where: "Treasury · cash app · GL",
 signal:
 "Pattern-matched items leave the pile without a senior rebuild each morning.",
 },
 {
 title: "Remittance chase continuity",
 where: "Customers · lockbox · AR",
 signal:
 "Missing advice is chased on a schedule; humans see a packet, not a blank unmatched line.",
 },
 {
 title: "Cleaner close WIP",
 where: "Controller desk",
 signal:
 "True unknowns are parked with context instead of living as an undifferentiated suspense balance.",
 },
 {
 title: "Fewer misapplications",
 where: "AR and customer statements",
 signal:
 "Weak matches escalate instead of silently posting to the wrong customer.",
 },
 ],
 leakageToday: [
 {
 title: "Daily pile rebuild",
 body: "Analysts re-open the same unmatched lines and re-search remittance from scratch.",
 },
 {
 title: "Email as the remittance system",
 body: "Advice lives in inboxes and never joins the bank line in ERP.",
 },
 {
 title: "Suspense as a parking lot",
 body: "Items age without an owner, a next chase date, or a materiality flag.",
 },
 {
 title: "Senior time on pattern work",
 body: "Controllers burn close week on breaks a written playbook already covers.",
 },
 ],
 roles: [
 {
 role: "Cash app / bank rec analyst",
 today: "Matches lines by hand and chases remittance across mail and portals.",
 withAgents:
 "Works true unknowns and weak matches from a prepared packet.",
 },
 {
 role: "Assistant controller",
 today: "Firefights aged suspense and late clear during close.",
 withAgents:
 "Watches exception age, auto-clear rate, and material items only.",
 },
 {
 role: "COO / OP",
 today: "Sees cash and close pain without a unit view of unmatched labor.",
 withAgents:
 "Gets unmatched age, auto-match share, and HITL rate as a finance wedge.",
 },
 ],
 watchMetrics: [
 {
 metric: "Unmatched bank lines aged over N days",
 move: "Down",
 note: "Primary WIP and close-risk lever.",
 },
 {
 metric: "Auto-match / auto-clear share by pattern",
 move: "Up, with QA holding",
 note: "Expand playbooks only when misapplication samples stay clean.",
 },
 {
 metric: "Remittance chase cycle time",
 move: "Down",
 note: "From unmatched detect to advice attached or escalated.",
 },
 {
 metric: "Misapplication rate in QA sample",
 move: "Down",
 note: "Safety metric. Gate wider auto-clear on this.",
 },
 {
 metric: "Senior minutes per material unknown",
 move: "Down",
 note: "Shows whether humans are spending time on judgment, not packet assembly.",
 },
 ],
 orgShift:
 "Bank rec stops being a heroic spreadsheet sport at close. Bank feeds and remittance become intake; ERP clearing is the system of record; email is a chase rail. Analysts manage a ranked exception queue. Controllers see aged unknowns and materiality, not a flat suspense dump.",
 fitWhen: [
 "Material recurring unmatched volume with recognizable patterns (lockbox, ACH, fees, chargebacks).",
 "Bank feed and ERP GL already exist; remittance is partially structured or chaseable.",
 "Leadership can name allowlisted clear patterns versus permanently gated postings.",
 "Willingness to keep write-offs, customer disputes, and weak matches human-gated.",
 ],
 leadershipAsks: [
 "What share of unmatched lines repeats a known pattern each month?",
 "Where does remittance truth live today: lockbox, portal, or customer mail?",
 "Which clears are allowlisted on day one versus permanently gated?",
 "Who owns QA on auto-matches: cash app, controller, or internal audit?",
 "What does good look like in 90 days: aged unmatched, auto-share, or close overtime?",
 ],
 unitEconomics: {
 unit: "per unmatched bank line (or break) to disposition",
 framing:
 "Illustrative sizing math for an OP or COO, not a measured engagement result. Build your own with loaded finance rates, minutes per break, bank and ERP costs, and observed remittance chase effort. Human cost is mostly analyst and controller minutes; agent cost is tokens plus feed connectors plus residual HITL on true unknowns.",
 human: {
 summary:
 "Cost is almost entirely loaded finance labor and close overtime. A break that takes 8-20 minutes to diagnose and chase, plus occasional senior review, adds up quickly across a month-end pile before misapplication cleanup.",
 lineItems: [
 {
 label: "Direct match time",
 detail:
 "5-15 minutes to compare bank line, GL, and remittance when documents are nearby.",
 },
 {
 label: "Chase and rework",
 detail:
 "Missing advice and weak customer IDs add repeated touches that never show as a clean unit cost.",
 },
 {
 label: "Loaded rate",
 detail:
 "Use fully loaded cash app and controller cost, including close overtime and temp help.",
 },
 {
 label: "Error tax",
 detail:
 "Wrong applications create customer noise, reclass entries, and statement disputes later.",
 },
 ],
 },
 agent: {
 summary:
 "Steady-state cost is model tokens for match and chase, bank/lockbox/ERP connectors, plus HITL minutes on unknowns and gated clears. Pattern-matched volume should land below human cost per break; the exception tail still carries senior judgment minutes.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Pattern match and packet assemble are usually moderate; long remittance threads and multi-invoice splits cost more.",
 },
 {
 label: "Infra",
 detail:
 "Bank feed, lockbox, ERP, and mail connectors plus audit logging. Allocate per break at expected unmatched volume.",
 },
 {
 label: "HITL residual",
 detail:
 "True unknowns, weak matches, and write-offs still burn human minutes. Blended cost falls when known patterns stop occupying the whole day.",
 },
 {
 label: "QA sampling",
 detail:
 "Budget sampled review of auto-clears. Cheap insurance against silent misapplication.",
 },
 ],
 },
 crossover:
 "Agent path usually wins when a large share of breaks follow playbooks, remittance can be attached or chased systematically, and allowlisted clears are trusted. It loses if almost every line is novel, or if ERP posting risk forces near-full human review.",
 sensitivities: [
 "Auto-match share by pattern library coverage.",
 "Loaded dollars per hour for cash app and controllers.",
 "Remittance availability and customer response lag.",
 "HITL minutes on weak matches and write-offs.",
 "Close-week spikes: overtime versus near-flat marginal token cost.",
 ],
 },
 baseline:
 "Each day or each close, analysts export unmatched bank lines and work them in spreadsheets. Remittance is hunted in lockbox portals and email. Known fee and transfer patterns are re-discovered manually. Weak matches sometimes get posted to clear the pile. True unknowns age in suspense until someone senior forces a decision. The factual packet is rebuilt every time the item is touched.",
 agentPath:
 "Bank feeds and ERP open items are watched continuously. An agent attempts pattern match, attaches lockbox or remittance context, chases missing advice on a schedule, and clears or proposes clears only for allowlisted patterns. Ambiguous, material, or customer-sensitive items are parked with a full packet for accounting in ERP and the review surface the team already uses.",
 steps: [
 {
 title: "Ingest",
 body: "Bank lines and ERP clearing or unmatched open items enter the harness.",
 },
 {
 title: "Pattern match",
 body: "Known fees, transfers, lockbox batches, and recurring counterparties attempt auto-link.",
 },
 {
 title: "Attach remittance",
 body: "Lockbox files, portals, and mail advice join the bank line as structured context.",
 },
 {
 title: "Chase gaps",
 body: "Missing remittance or invoice references trigger scheduled customer or internal nudges.",
 },
 {
 title: "Propose clear",
 body: "Allowlisted patterns get a clear or post proposal with full lineage.",
 },
 {
 title: "Park unknowns",
 body: "True exceptions go to an accounting queue with materiality and age flags.",
 },
 {
 title: "Post or escalate",
 body: "Scoped ERP writes for allowlisted clears; gated items wait for human disposition.",
 },
 {
 title: "QA sample",
 body: "Risk-weighted auto-clears land in the controller or cash app audit sample.",
 },
 ],
 tools: [
 "Bank feed connector",
 "ERP GL / cash app APIs",
 "Lockbox / remittance ingest",
 "Mail chase",
 ],
 skills: [
 "Match pattern libraries",
 "Remittance extraction",
 "Chase cadences",
 "Materiality flags",
 ],
 memory: [
 "Counterparty match habits",
 "Prior clear dispositions",
 "Fee and transfer pattern catalog",
 ],
 qa: [
 "Auto-clear sample audits",
 "Customer and invoice groundedness checks",
 "Aged suspense policy checks",
 ],
 guardrails: [
 "No write-off or goodwill clear without a gate",
 "No weak-match auto-post to customer AR",
 "Scoped ERP posting permissions",
 ],
 hitlNotes: [
 "Weak or multi-customer matches",
 "Material dollar thresholds",
 "Write-off or suspense relief",
 "Novel bank line types outside the playbook",
 ],
 agentOwns: [
 "Pattern matching and packet assembly",
 "Remittance attach and chase",
 "Allowlisted clears",
 "Aging and status on the exception queue",
 ],
 humanOwns: [
 "True unknown disposition",
 "Write-offs and goodwill decisions",
 "Customer dispute judgment",
 "Policy changes to match tolerances",
 ],
 gates: [
 "Clear or post below confidence threshold",
 "Write-off, reclass, or suspense relief",
 "Material amounts per policy",
 ],
 staging: [
 "Read feeds and draft match packets; humans still clear in ERP.",
 "Auto-attach remittance and chase missing advice.",
 "Allowlist a few high-confidence patterns for auto-clear.",
 "Expand pattern libraries as QA holds; unknowns stay human.",
 ],
 diagram: "bankrec",
 },
 {
 slug: "lease-critical-date-chase",
 title: "Lease critical date and option notice chase",
 blurb:
 "Renewal, expansion, and termination option deadlines chased with assembled abstracts, drafted notices, and gated legal send.",
 industry: "Commercial real estate",
 family: "Scheduling & appointments",
 hitl: "Review-gated",
 systems: ["Lease admin / MRI-Yardi-like", "Document store", "Email", "Calendar"],
 what: "Critical lease dates and option notice windows become an agent-operated chase lane. The agent watches the lease admin system, assembles abstract facts from the document store, drafts notices, chases internal owners on a calendar cadence, and holds external send for legal or asset-manager review. Missed-option risk is treated as an operating failure, not a surprise.",
 operatorLens:
 "Stop asset teams from discovering option deadlines in email forwards when the lease abstract already knew the date.",
 whyItMatters:
 "In commercial real estate, option and notice dates are margin and flexibility encoded as calendar risk. The facts live in lease admin systems and PDFs; the work lives in inboxes and shared drives. Teams miss windows, scramble counsel, or give away leverage because chase was tribal. An OP or COO cares because one missed termination or renewal notice is a discrete economic event, and because the labor to prevent it is repetitive packet and reminder work agents can own.",
 valueMoves: [
 {
 title: "Fewer missed notice windows",
 where: "Asset management · legal · lease admin",
 signal:
 "Critical dates surface with owners and drafts before the drop-dead moment.",
 },
 {
 title: "Abstract assembly off senior desks",
 where: "Lease admin · analysts",
 signal:
 "Humans review a prepared fact pack instead of re-reading the PDF every time.",
 },
 {
 title: "Owner chase continuity",
 where: "Internal stakeholders",
 signal:
 "Nudges run to calendar; silence escalates with a packet, not a blank reminder.",
 },
 {
 title: "Gated external posture",
 where: "Legal / counsel send",
 signal:
 "Outbound notices stay review-gated while volume chase no longer depends on heroics.",
 },
 ],
 leakageToday: [
 {
 title: "Spreadsheet calendar risk",
 body: "Critical dates live in personal trackers that drift from the lease admin system of record.",
 },
 {
 title: "PDF archaeology",
 body: "Each deadline triggers a fresh hunt through the document store for notice clauses and addresses.",
 },
 {
 title: "Silent owners",
 body: "The wrong person is on the reminder, or the right person ignores it without escalation.",
 },
 {
 title: "Last-week legal panic",
 body: "Counsel sees the notice draft days before expiry instead of weeks.",
 },
 ],
 roles: [
 {
 role: "Lease admin / analyst",
 today: "Rebuilds abstracts and chases owners from mail and calendars.",
 withAgents:
 "Works exceptions and data fixes; routine chase and draft are prepared.",
 },
 {
 role: "Asset manager",
 today: "Discovers deadlines late and burns political capital for rush decisions.",
 withAgents:
 "Gets timed packets with options framed; still owns the commercial call.",
 },
 {
 role: "COO / OP (or Head of AM)",
 today: "Sees missed-option risk as anecdote, not a queue metric.",
 withAgents:
 "Watches upcoming windows, owner response age, and gated-send cycle time.",
 },
 ],
 watchMetrics: [
 {
 metric: "Critical dates with owner assigned before notice window",
 move: "Up",
 note: "Coverage lever. Empty ownership is a process failure.",
 },
 {
 metric: "Days from draft ready to human disposition",
 move: "Down",
 note: "Shows whether review is the bottleneck or assembly still is.",
 },
 {
 metric: "Missed or late external notices",
 move: "Down toward zero",
 note: "Outcome metric. Investigate every miss.",
 },
 {
 metric: "Abstract field defect rate in QA",
 move: "Down",
 note: "Wrong notice address or date is worse than a slow reminder.",
 },
 {
 metric: "Owner chase age inside open windows",
 move: "Down",
 note: "Escalation health for silent stakeholders.",
 },
 ],
 orgShift:
 "Critical dates stop living in side spreadsheets. Lease admin is the clock; the document store is evidence; calendar and mail are chase rails. Analysts and asset managers work a dated queue of packets. Legal reviews outbound language on a gate, not as the team that discovers the deadline.",
 fitWhen: [
 "Portfolio has recurring renewal, expansion, termination, or ROFR-style notice obligations.",
 "Lease admin and document store exist even if abstracts are incomplete today.",
 "Internal owners can be named per asset or lease.",
 "Willingness to keep external notice send human- or counsel-gated.",
 ],
 leadershipAsks: [
 "Which critical date types are in the system of record versus only in PDFs?",
 "Who is the default owner when asset manager coverage is unclear?",
 "What may be auto-drafted versus what counsel must rewrite every time?",
 "How early should packets appear relative to each notice window?",
 "What does good look like in 90 days: zero late notices, owner response time, or abstract defect rate?",
 ],
 unitEconomics: {
 unit: "per critical-date event (notice window) to disposition",
 framing:
 "Illustrative sizing math for an OP or COO, not a measured engagement result. Build your own with loaded analyst, asset manager, and counsel rates, minutes per abstract rebuild, and lease-system costs. Human cost is hunt plus chase plus rush legal; agent cost is tokens plus connectors plus residual review on every external send.",
 human: {
 summary:
 "Cost is analyst assembly time, manager interrupt time, and occasional expensive rush counsel. A single notice window can burn 30-90 minutes of internal labor before legal touch, and a miss dwarfs that in economic impact.",
 lineItems: [
 {
 label: "Abstract rebuild",
 detail:
 "20-45 minutes to pull clause dates, notice parties, and delivery method from lease files.",
 },
 {
 label: "Owner chase",
 detail:
 "Repeated pings across mail and meetings when stakeholders stay silent.",
 },
 {
 label: "Draft and revise",
 detail:
 "Internal drafts bounce without a single packet of facts attached.",
 },
 {
 label: "Rush legal / miss tax",
 detail:
 "Late counsel review and missed-option outcomes dominate true cost when process fails.",
 },
 ],
 },
 agent: {
 summary:
 "Steady-state cost is tokens to abstract and draft, lease/document/calendar connectors, plus HITL minutes on commercial judgment and every external send. Volume chase and packet prep should fall below human assembly cost; gated legal send remains in the blend by design.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Clause extract and notice draft dominate; long leases and amendments cost more than short abstracts.",
 },
 {
 label: "Infra",
 detail:
 "Lease admin, document store, mail, and calendar connectors plus audit logging. Allocate per critical-date event at portfolio volume.",
 },
 {
 label: "HITL residual",
 detail:
 "Asset decisions and external sends stay human. Savings come from not paying seniors to rebuild the clock and the PDF hunt.",
 },
 {
 label: "QA sampling",
 detail:
 "Budget sampled checks on extracted dates and notice parties. Wrong facts are high-severity.",
 },
 ],
 },
 crossover:
 "Agent path usually wins when portfolios are large enough that critical dates recur weekly or monthly, abstracts can be templated, and owners are identifiable. It loses if lease data is so unreliable that every draft needs full counsel rewrite, or if volume is too small to justify connectors.",
 sensitivities: [
 "Portfolio critical-date volume per month.",
 "Abstract completeness in lease admin versus PDF-only truth.",
 "Loaded analyst and counsel dollars per hour.",
 "Owner response lag inside notice windows.",
 "Severity of a single missed option relative to operating cost.",
 ],
 },
 baseline:
 "Critical dates sit in a lease admin export or a shared spreadsheet. Someone notices a window is close, hunts the PDF for notice language and addresses, drafts an email, and chases the asset manager. If silence wins, legal is pulled in late. Some notices go out wrong. Some windows are missed and explained after the economics are locked.",
 agentPath:
 "Lease admin critical dates feed a dated queue. An agent assembles abstract facts from the system and document store, drafts the notice pack, schedules owner chase on calendar and mail, and escalates silence. External send always waits for asset-manager or legal review in the surfaces the team already uses.",
 steps: [
 {
 title: "Watch dates",
 body: "Lease admin critical dates and option windows enter a timed queue with lead-time rules.",
 },
 {
 title: "Assemble abstract",
 body: "Parties, notice clauses, addresses, delivery method, and related amendments are pulled into one packet.",
 },
 {
 title: "Draft notice",
 body: "Templated internal and external notice language is prepared with citations to the abstract.",
 },
 {
 title: "Assign owner",
 body: "Asset manager or delegate is attached; gaps open an ownership exception.",
 },
 {
 title: "Chase",
 body: "Calendar holds and mail nudges run until disposition or escalation.",
 },
 {
 title: "Human review",
 body: "Commercial decision and outbound language gate with legal as required.",
 },
 {
 title: "Send and file",
 body: "After approval, send executes and evidence lands back in the document store and lease admin.",
 },
 {
 title: "QA sample",
 body: "Extracted dates, parties, and send evidence are sampled for defect.",
 },
 ],
 tools: [
 "Lease admin connector",
 "Document store retrieval",
 "Mail / calendar chase",
 "Notice draft templates",
 ],
 skills: [
 "Critical-date playbooks",
 "Clause and abstract extract",
 "Owner routing packs",
 "Notice templates by option type",
 ],
 memory: [
 "Lease abstract versions",
 "Owner response patterns",
 "Prior notice dispositions",
 ],
 qa: [
 "Date and party extract checks",
 "Sampled draft-to-lease groundedness",
 "Proof-of-send evidence checks",
 ],
 guardrails: [
 "No external notice send without review gate",
 "No date changes in system of record without human confirm",
 "Scoped document and mail permissions",
 ],
 hitlNotes: [
 "External landlord or tenant send",
 "Ambiguous clause or conflicting amendments",
 "Missing owner or conflicting commercial intent",
 "High-value options above policy threshold",
 ],
 agentOwns: [
 "Date watching and queueing",
 "Abstract and draft assembly",
 "Internal owner chase",
 "Filing of approved send evidence",
 ],
 humanOwns: [
 "Exercise / waive / renegotiate decisions",
 "Final notice language",
 "Legal interpretation of ambiguous clauses",
 "Exception handling on bad abstracts",
 ],
 gates: [
 "Any external notice or exercise letter",
 "Abstract confidence below threshold",
 "Commercial disposition on high-value options",
 ],
 staging: [
 "Surface upcoming dates and draft abstracts; humans still chase and send.",
 "Auto-chase internal owners with packet attached.",
 "Auto-draft notices for standard option types into the review queue.",
 "Expand templates as QA holds; external send stays gated.",
 ],
 diagram: "lease",
 },
 {
 slug: "audit-evidence-requests",
 title: "Audit and SOC evidence request response",
 blurb:
 "PBC and evidence requests mapped to control owners, chased to completion, and assembled into packets with gated attestation.",
 industry: "Cross-industry",
 family: "Onboarding & compliance",
 hitl: "Review-gated",
 systems: ["GRC / audit tool", "Ticketing", "Document store", "Email"],
 what: "External and internal auditor PBC lists become an agent-operated response lane. The agent maps each request to control owners, opens tickets, chases evidence, assembles packets in the document store, and holds attestation or sign-off for a human gate. Auditors still get human-owned representations; the firm stops paying seniors to be reminder services.",
 operatorLens:
 "Stop control owners and compliance from treating every audit season like a new scavenger hunt across tickets, drives, and email.",
 whyItMatters:
 "Evidence request season concentrates hidden labor across finance, IT, security, and ops. Requests are knowable, owners are often repeatable, and the pain is chase plus packet assembly, not only expert judgment. Yet companies still rediscover who owns each control in email threads while auditors wait and executives get surprised by aging PBC lists. An OP or COO cares because this is predictable seasonal labor, audit cycle time, and control hygiene that compounds when the mapping is durable.",
 valueMoves: [
 {
 title: "Faster PBC cycle time",
 where: "Compliance · control owners · auditors",
 signal:
 "Requests move from list to packet without repeated manual reforwarding.",
 },
 {
 title: "Owner chase off compliance calendars",
 where: "Control owner desks",
 signal:
 "Nudges and ticket updates run continuously; humans upload or attest, they do not rebuild the request context.",
 },
 {
 title: "Reusable control mapping",
 where: "GRC library",
 signal:
 "Next period starts from last period's owner and artifact patterns, not a blank slate.",
 },
 {
 title: "Attestation kept human",
 where: "Control owner / compliance sign-off",
 signal:
 "Volume work clears faster while representations stay review-gated.",
 },
 ],
 leakageToday: [
 {
 title: "Seasonal scavenger hunt",
 body: "Every audit restarts the search for who owns the artifact and where it lives.",
 },
 {
 title: "Email as GRC",
 body: "Evidence and clarifications sit in threads that never update the audit tool.",
 },
 {
 title: "Senior reminder labor",
 body: "Compliance spends days pinging owners instead of reviewing packet quality.",
 },
 {
 title: "Last-minute attestation",
 body: "Sign-off happens under time pressure with incomplete context attached.",
 },
 ],
 roles: [
 {
 role: "Compliance / GRC coordinator",
 today: "Splits PBC lists, chases owners, and assembles folders by hand.",
 withAgents:
 "Works mapping exceptions and packet QA; routine chase is agent-run.",
 },
 {
 role: "Control owner",
 today: "Receives vague asks in mail and digs for screenshots without a clear ticket.",
 withAgents:
 "Gets a precise request, due date, and upload target; still owns attestation.",
 },
 {
 role: "COO / OP (or CFO / CISO sponsor)",
 today: "Sees audit fatigue and surprise aging lists each cycle.",
 withAgents:
 "Watches request age, first-pass acceptance, and gated attestation as operating metrics.",
 },
 ],
 watchMetrics: [
 {
 metric: "Median time request to complete packet",
 move: "Down",
 note: "Primary cycle-time lever for PBC response.",
 },
 {
 metric: "Owner response age on open requests",
 move: "Down",
 note: "Chase health. Rising age with rising auto-share means wrong automation.",
 },
 {
 metric: "First-pass auditor acceptance rate",
 move: "Up",
 note: "Quality lever. Speed without acceptance just creates rework.",
 },
 {
 metric: "Mapping reuse rate period over period",
 move: "Up",
 note: "Shows whether the control library is becoming an asset.",
 },
 {
 metric: "Attestation still human-gated",
 move: "Hold at 100%",
 note: "Safety invariant for representations and sign-off.",
 },
 ],
 orgShift:
 "Audit response stops being a heroic email program. GRC is the system of record; ticketing is the chase rail; the document store holds packets. Compliance manages mapping quality and exception aging. Control owners receive precise work, not scavenger hunts. Attestation remains a human gate.",
 fitWhen: [
 "Recurring internal, external, or SOC evidence request volume each period.",
 "GRC or audit tool plus a document store exist even if underused.",
 "Control owners can be named for a large share of requests.",
 "Willingness to keep attestation and auditor-facing representations human-gated.",
 ],
 leadershipAsks: [
 "What share of PBC items repeats each period with a stable owner?",
 "Where does evidence truth live: GRC, ticket, drive, or mail?",
 "Which packet assembly steps are allowlisted versus permanently reviewed?",
 "Who owns mapping quality when an owner changes roles?",
 "What does good look like in 90 days: cycle time, first-pass acceptance, or coordinator hours returned?",
 ],
 unitEconomics: {
 unit: "per evidence request (PBC item) to packet ready / attested",
 framing:
 "Illustrative sizing math for an OP or COO, not a measured engagement result. Build your own with loaded compliance and control-owner rates, minutes per chase, and GRC tooling cost. Human cost is coordinator chase plus owner search time; agent cost is tokens plus connectors plus residual review on attestation and novel requests.",
 human: {
 summary:
 "Cost is mostly coordinator chase minutes and control-owner interrupt time. A routine request that looks like five minutes of upload often burns 20-40 minutes end to end once context rebuild and rework are counted, before senior review on sensitive items.",
 lineItems: [
 {
 label: "Request triage and routing",
 detail:
 "10-20 minutes to interpret the ask, find the owner, and open or update tracking.",
 },
 {
 label: "Owner search time",
 detail:
 "Control owners hunt drives and screenshots because the request arrived without a template.",
 },
 {
 label: "Packet assembly",
 detail:
 "Compliance renames, files, and reconciles artifacts into auditor-ready folders.",
 },
 {
 label: "Rework after auditor pushback",
 detail:
 "Incomplete or wrong-period evidence creates a second full chase cycle.",
 },
 ],
 },
 agent: {
 summary:
 "Steady-state cost is tokens to map and chase, GRC/ticket/document connectors, plus HITL minutes on attestation and novel or sensitive requests. Repeatable volume should land below human cost per item; gated sign-off remains intentional residual cost.",
 lineItems: [
 {
 label: "Tokens",
 detail:
 "Mapping, reminder drafts, and packet indexes are usually thin; ambiguous multi-control requests cost more.",
 },
 {
 label: "Infra",
 detail:
 "GRC, ticketing, document store, and mail connectors plus audit logs. Allocate per request at seasonal volume.",
 },
 {
 label: "HITL residual",
 detail:
 "Attestation and sensitive evidence interpretation stay human. Savings come from chase and assembly, not from removing accountability.",
 },
 {
 label: "QA sampling",
 detail:
 "Budget sampled packet checks before auditor delivery. Cheap insurance against wrong-period or incomplete artifacts.",
 },
 ],
 },
 crossover:
 "Agent path usually wins when a large share of PBC items repeats, owners are stable, and artifact locations are learnable. It loses if every request is novel, systems are inaccessible, or policy demands near-total manual handling of every artifact.",
 sensitivities: [
 "Repeat-request share and mapping reuse.",
 "Loaded compliance and control-owner dollars per hour.",
 "Owner response lag during audit windows.",
 "Auditor first-pass rejection rate (drives rework).",
 "Seasonal spikes: overtime versus near-flat marginal token cost.",
 ],
 },
 baseline:
 "A PBC list arrives in a portal or spreadsheet. Compliance copies items into tickets or email. Owners ask what is needed. Evidence returns as random screenshots and decks. Someone rebuilds a folder structure. Auditors reject incomplete items. The same mapping is rediscovered next period. Attestation is a late signature on a packet nobody is proud of.",
 agentPath:
 "Requests ingest from the GRC or audit tool. An agent maps each item to a control owner and prior artifact pattern, opens or updates tickets, chases on a schedule, assembles a packet in the document store, and queues attestation. Novel, sensitive, or weak-mapping items escalate. Humans own sign-off and auditor-facing judgment in the tools already in use.",
 steps: [
 {
 title: "Ingest requests",
 body: "PBC and evidence items enter from GRC, auditor portals, or structured lists.",
 },
 {
 title: "Map owners",
 body: "Control library and prior periods resolve owners and likely artifact types; weak maps escalate.",
 },
 {
 title: "Open work",
 body: "Tickets carry precise ask, period, sample scope, and upload target.",
 },
 {
 title: "Chase evidence",
 body: "Scheduled nudges to owners with deep links; silence escalates to delegates.",
 },
 {
 title: "Assemble packet",
 body: "Artifacts are indexed into a document-store packet with lineage back to the request.",
 },
 {
 title: "QA check",
 body: "Completeness, period match, and naming conventions are validated before review.",
 },
 {
 title: "Attestation gate",
 body: "Control owner or compliance signs off; agent never self-attests.",
 },
 {
 title: "Deliver and learn",
 body: "Packet status returns to GRC; mapping memory updates for the next period.",
 },
 ],
 tools: [
 "GRC / audit tool connector",
 "Ticketing write",
 "Document store assemble",
 "Mail chase",
 ],
 skills: [
 "Control-to-owner maps",
 "Evidence request schemas",
 "Chase cadences",
 "Packet index templates",
 ],
 memory: [
 "Prior period mappings",
 "Artifact location patterns",
 "Auditor feedback on rejects",
 ],
 qa: [
 "Period and sample-scope checks",
 "Packet completeness rules",
 "Sampled pre-delivery review",
 ],
 guardrails: [
 "No attestation or representation without a human gate",
 "No silent overwrite of auditor-facing packets",
 "Scoped access to sensitive evidence stores",
 ],
 hitlNotes: [
 "Attestation and sign-off",
 "Novel requests outside the control library",
 "Sensitive HR, legal, or security artifacts",
 "Auditor clarifications that change scope",
 ],
 agentOwns: [
 "Request mapping and ticket creation",
 "Owner chase on a schedule",
 "Packet assembly and indexing",
 "Status writes back to GRC",
 ],
 humanOwns: [
 "Attestation and auditor representations",
 "Control design and mapping exceptions",
 "Sensitive evidence judgment",
 "Scope changes negotiated with auditors",
 ],
 gates: [
 "Every attestation or sign-off",
 "Sensitive artifact classes by policy",
 "Weak owner or artifact mapping confidence",
 ],
 staging: [
 "Ingest PBC lists and draft owner maps; humans still chase and file.",
 "Auto-chase owners with precise tickets and upload targets.",
 "Auto-assemble packets into review queues for standard request types.",
 "Expand mapping reuse as QA and first-pass acceptance hold; attestation stays gated.",
 ],
 diagram: "audit",
 }
];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
 return USE_CASES.find((u) => u.slug === slug);
}
