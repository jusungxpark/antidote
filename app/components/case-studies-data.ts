export type CaseStudyMeta = {
  timeline: string;
  scale: string;
  projectType: string;
  industry: string;
  businessUnit: string;
};

export type CaseStudy = {
  id: number;
  slug: string;
  image: string;
  hue: string;
  title: string;
  meta: CaseStudyMeta;
  problem: string;
  action: string;
  result: string;
};

export const DETAIL_FIELDS = ["Problem", "Action", "Result"] as const;

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    slug: "sales-copilot-cpg",
    title: "Self-serve order answers for field sales, without the IT queue",
    image: "/case-studies/kkr.jpg",
    hue: "rgba(168, 196, 232, 0.28)",
    meta: {
      timeline: "0–6 months",
      scale: "Medium enterprise",
      projectType: "Digital strategy & project management",
      industry: "Consumer goods",
      businessUnit: "Supply chain & logistics",
    },
    problem:
      "A large PE-backed CPG company faced growing frustration from its field sales teams, who struggled to access up-to-date order and fulfillment information while engaging with customers. The supply chain IT team wanted to reduce the burden of manually fielding these requests and envisioned a conversational agent that could act as a self-serve interface for order-related data—similar to ChatGPT but tailored to their systems.",
    action:
      "Engaged with internal stakeholders and conducted market benchmarking to define the strategic vision for a sales-facing AI copilot that would streamline access to order data without requiring manual intervention. Managed end-to-end development and deployment (oversaw technical team), leveraging GPT-3.5/4, LangChain, and text-to-SQL to enable natural language queries against live sales databases.",
    result:
      "Successfully implemented the AI copilot, delivering measurable improvements in sales productivity and operational efficiency. The tool reduced time and cost for sales teams accessing order status updates, improved operational efficiency through real-time data access, and enabled faster, data-driven decision-making through actionable insights.",
  },
  {
    id: 2,
    slug: "airline-crew-recovery",
    title: "Crew recovery that holds when day-of operations break",
    image: "/case-studies/comvest.jpg",
    hue: "rgba(176, 210, 198, 0.28)",
    meta: {
      timeline: "0–6 months",
      scale: "Large enterprise",
      projectType: "Digital strategy & project management",
      industry: "Transportation & logistics",
      businessUnit: "Product management",
    },
    problem:
      "A major U.S. airline experienced a catastrophic disruption that resulted in over $500M in operational losses, driven largely by the inability to efficiently recover crew schedules during irregular operations. We were brought in to define a technology strategy and develop an AI-based optimization tool to future-proof the airline's day-of-operations response.",
    action:
      "Conducted a detailed analysis of the airline's crew recovery pain points and defined a roadmap for an AI-powered solution that would optimize reserve usage, reroutes, and deadheads within labor and operational constraints. Led cross-functional execution across engineering, data science, and flight ops teams to translate this strategy into a production-ready tool, ensuring real-time performance, alignment with labor rules, and seamless integration into day-of-operations control centers.",
    result:
      "Successfully deployed the platform into day-of-operations control centers, reducing manual triage, accelerating recovery timelines, and materially improving operational resilience—setting a new standard for how the airline manages crew disruptions under stress.",
  },
  {
    id: 3,
    slug: "logistics-digital-launch",
    title: "Standing up a digital product line from a logistics core",
    image: "/case-studies/vistria.jpg",
    hue: "rgba(164, 214, 186, 0.28)",
    meta: {
      timeline: "0–6 months",
      scale: "Large enterprise",
      projectType: "Go-to-market strategy",
      industry: "Transportation & logistics",
      businessUnit: "Supply chain & logistics",
    },
    problem:
      "A major logistics player was exploring a new digital product line and business unit to capitalize on emerging market opportunities—additional products and revenue streams plus monetizing data collected from core operations. Leadership brought us in to develop a business case, cohesive internal narrative, and launch strategy for the new unit.",
    action:
      "Split the engagement into four workstreams: (1) benchmarking competitor offerings through reports and interviews to identify relevant features, revenue models, and customer selling points; (2) building a detailed business case with revenue and investment projections and ROI for the business unit; (3) defining the target operating model, including org structure and governance framework; (4) developing a company-wide narrative to align executive stakeholders and secure buy-in for launch.",
    result:
      "Secured executive buy-in and funding for the new business unit, enabling a successful launch. One year in, the business unit is 100+ FTE with several active products and revenue streams, plus multiple partnerships with other functions across the broader organization.",
  },
  {
    id: 4,
    slug: "freight-process-mining",
    title: "Finding where freight labor accumulates before automating it",
    image: "/case-studies/new-atlas-capital.jpg",
    hue: "rgba(188, 196, 224, 0.28)",
    meta: {
      timeline: "0–6 months",
      scale: "Medium enterprise",
      projectType: "AI transformation & automation",
      industry: "Transportation & logistics",
      businessUnit: "Operations & commercial",
    },
    problem:
      "A global freight forwarder (~$60M EBITDA) ran core operations across fragmented tooling between CRM, TMS, and finance. Leadership lacked a consolidated view of where labor accumulated across customer segments (FCL, LCL, project cargo) and internal teams including marketing. Manual bridges between systems limited visibility into where automation would stick and where judgment work had to stay with staff.",
    action:
      "Conducted process mining and structured stakeholder interviews across commercial, operations, finance, and marketing to reconstruct end-to-end workflows across FCL, LCL, and project cargo segments. Established time-in-motion baselines by role and system handoff, then mapped where labor accumulated across CRM, TMS, and finance tooling with no single source of truth. Sized automation and AI augmentation opportunities by segment with ROI ranges, implementation effort estimates, and change-management risk flags. Built and deployed production tooling for marketing workflow augmentation and selected operational automations on durable agent runtimes with guardrails, VM sandboxing around tool calls, and human-in-the-loop approval via Microsoft Teams bots. Scoped remaining operations work into a phased roadmap that separated high-volume transactional moves from complex cargo requiring experienced staff judgment.",
    result:
      "Identified seven figures in combined annual cost reduction and revenue uplift opportunities across customer segments and internal teams. Marketing and operations automations running in production reduced manual handoffs on targeted workflows, with escalation handling routing exceptions back to staff when automation confidence thresholds were not met. Delivered a segment-level automation register, executive readout, and implementation roadmap sequenced by ROI and operational risk so leadership could fund the next wave without re-running discovery.",
  },
  {
    id: 5,
    slug: "3pl-quoting-automation",
    title: "Transactional quote drafts in minutes, not multi-hour builds",
    image: "/case-studies/connection-capital.jpg",
    hue: "rgba(200, 184, 210, 0.28)",
    meta: {
      timeline: "0–6 months",
      scale: "Small enterprise",
      projectType: "AI transformation & automation",
      industry: "Transportation & logistics",
      businessUnit: "Commercial",
    },
    problem:
      "A ~$5M EBITDA 3PL processed ~50 quotes per day across five BD managers. Inquiries arrived via LeadFairy, shared inboxes at offshore@ and sales@, and direct email. Every request followed the same manual path: triage, chase missing information, Excel rate lookup, Dynamics quote build—with no structured routing or outcome tracking. Turnaround often exceeded 24 hours; experienced staff spent disproportionate time on transactional quotes while high-value accounts competed for the same attention.",
    action:
      "Designed and built an intelligent quoting pipeline from inbound capture through draft generation, preserving BD manager approval on every customer-facing quote. Consolidated LeadFairy leads, shared inboxes, and direct email into a single intake layer; classified inbound requests and routed named accounts to assigned managers in Microsoft Teams while transactional volume entered an automated workflow. Deployed LangChain agents on a Temporal-hosted runtime for durable, resumable orchestration across data enrichment, Excel rate lookup, and Dynamics quote draft assembly, with full audit trails on each step. Integrated with Dynamics 365 for quote creation, pricing lineage, and send logging. Wrapped agent tool calls in VM sandboxing with guardrails and human-in-the-loop approval gates in Teams before any outbound delivery; built escalation paths when enrichment or pricing fell outside defined confidence thresholds.",
    result:
      "Delivered signed-off system design, baseline time-to-quote and win-rate metrics, pipeline intelligence report, and a live system running in parallel with existing BD workflow ahead of production cutover. Cut transactional quote preparation from multi-hour manual builds to drafts ready for BD review in minutes, freeing managers to focus on named accounts and complex lanes. Created the company's first structured commercial dataset linking inquiry source, pricing lineage, manager edits, and outcomes, enabling win-rate analysis that had previously been impossible across fragmented inboxes. Established the production foundation for subsequent margin optimization and forecasting phases without disrupting day-to-day sales operations.",
  },
  {
    id: 6,
    slug: "industrial-distributor-assessment",
    title: "Sizing order-to-cash automation before rebuilding the operating model",
    image: "/case-studies/graham.jpg",
    hue: "rgba(228, 196, 158, 0.28)",
    meta: {
      timeline: "0–3 months",
      scale: "Medium enterprise",
      projectType: "AI transformation assessment",
      industry: "Industrial distribution",
      businessUnit: "Commercial & customer service",
    },
    problem:
      "A regional industrial components and MRO distributor (~$28M EBITDA, ~180 employees) ran order-to-cash through a central ERP. Inside sales and customer service spent a large share of capacity on repeat orders, manual price lookup, and order entry while complex quotes sat in the same queue. Leadership wanted a fact-based view of automatable volume vs. judgment work before committing capital to an operating-model rebuild.",
    action:
      "Ran proprietary process mining software alongside structured interviews with inside sales, customer service, and finance leadership to reconstruct full order-to-cash workflows with time allocation by function and order type. Established time-in-motion baselines and mapped where labor, rework, and margin leakage accumulated across the ERP and adjacent tooling. Identified inefficiencies and quantified loss drivers on repeat orders, manual price lookup, and order entry relative to complex quote and key-account work. Segmented volume into automation tiers and sized EBITDA impact from intake and lookup automation on transactional volume. Produced a 90-day implementation sequence aligned to inside-sales cadence, explicitly reserving key-account and complex quoting for existing staff while defining how automated intake, guardrails, and Teams-based approval would handle the long tail.",
    result:
      "Delivered process-mining-backed workflow maps with automation tiers, repeat-transaction volume quantification, and documented inefficiency and loss drivers across order-to-cash. Produced a phased business case sized to admin-hour savings and recoverable margin that did not depend on headcount reduction to pencil. Recommended a pilot architecture built on durable agent orchestration with guardrails, human-in-the-loop checkpoints via Microsoft Teams bots, and escalation handling for key-account and complex quote paths. Gave management a prioritized repeat-order intake pilot and a broader ERP-adjacent rollout sequence, providing enough specificity to commit budget without commissioning a second discovery pass.",
  },
];

export const CASE_STUDIES_PATH = "/case-studies";
export const CASE_STUDIES_SLIDE_MS = 900;

export function formatCaseStudyMeta(meta: CaseStudyMeta): string {
  return [
    meta.timeline,
    meta.scale,
    meta.industry,
  ].join(" · ");
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export function getCaseStudySlugFromPath(pathname: string): string | null {
  if (!pathname.startsWith(`${CASE_STUDIES_PATH}/`)) return null;
  const slug = pathname.slice(CASE_STUDIES_PATH.length + 1).split("/")[0];
  if (!slug) return null;
  return getCaseStudyBySlug(slug) ? slug : null;
}

export function getCaseStudyPath(slug: string): string {
  return `${CASE_STUDIES_PATH}/${slug}`;
}
