/** Slim list index for Resources. Full reports live in use-cases.ts. */
import type {
  HitlPosture,
  UseCaseDiagram,
  UseCaseFamily,
  UseCaseIndustry,
} from "./use-case-types";

export type UseCaseSummary = {
  slug: string;
  title: string;
  blurb: string;
  industry: UseCaseIndustry;
  family: UseCaseFamily;
  hitl: HitlPosture;
  diagram: UseCaseDiagram;
};

export const USE_CASE_SUMMARIES: UseCaseSummary[] = [
  {
    slug: "shared-inbox-triage",
    title: "Shared inbox triage and exception routing",
    blurb:
      "Inbound mail and Teams treated as a work queue: classify, file, act on allowlists, escalate judgment.",
    industry: "Cross-industry",
    family: "Inbox & communications",
    hitl: "Review-gated",
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
    diagram: "audit",
  },
];

export const USE_CASE_INDUSTRIES = [
  "All",
  ...Array.from(new Set(USE_CASE_SUMMARIES.map((u) => u.industry))),
] as const;

export const USE_CASE_FAMILIES = [
  "All",
  ...Array.from(new Set(USE_CASE_SUMMARIES.map((u) => u.family))),
] as const;

export const USE_CASE_HITL = [
  "All",
  ...Array.from(new Set(USE_CASE_SUMMARIES.map((u) => u.hitl))),
] as const;
