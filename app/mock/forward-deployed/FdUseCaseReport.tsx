"use client";

import { UseCaseArt } from "./FdUseCaseArt";
import type { UseCaseDiagram } from "./use-case-types";
import type { UseCase } from "./use-cases";

type HarnessSpec = {
  title: string;
  readHint: string;
  sources: { title: string; role: string }[];
  agent: { title: string; role: string };
  controls: { title: string; role: string; tone: "default" | "gate" }[];
  outcomes: {
    title: string;
    role: string;
    tone: "agent" | "system" | "human";
    edge: string;
  }[];
};

function HarnessDiagram({ spec }: { spec: HarnessSpec }) {
  return (
    <figure className="fdm-uc-diagram">
      <figcaption>{spec.title}</figcaption>
      <p className="fdm-uc-diagram-hint">{spec.readHint}</p>

      <div className="fdm-uc-flow" role="img" aria-label={spec.title}>
        <div className="fdm-uc-flow-col">
          <p className="fdm-uc-flow-stage">1. Sources</p>
          <ul className="fdm-uc-flow-stack">
            {spec.sources.map((s) => (
              <li key={s.title} className="fdm-uc-flow-card fdm-uc-flow-card--system">
                <strong>{s.title}</strong>
                <span>{s.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fdm-uc-flow-join" aria-hidden="true">
          <span>ingest</span>
        </div>

        <div className="fdm-uc-flow-col fdm-uc-flow-col--agent">
          <p className="fdm-uc-flow-stage">2. Agent</p>
          <div className="fdm-uc-flow-card fdm-uc-flow-card--agent fdm-uc-flow-card--hero">
            <strong>{spec.agent.title}</strong>
            <span>{spec.agent.role}</span>
          </div>

          <p className="fdm-uc-flow-stage fdm-uc-flow-stage--sub">
            Consults on every action
          </p>
          <ul className="fdm-uc-flow-stack">
            {spec.controls.map((c) => (
              <li
                key={c.title}
                className={`fdm-uc-flow-card fdm-uc-flow-card--${c.tone === "gate" ? "gate" : "control"}`}
              >
                <strong>{c.title}</strong>
                <span>{c.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fdm-uc-flow-join" aria-hidden="true">
          <span>route</span>
        </div>

        <div className="fdm-uc-flow-col">
          <p className="fdm-uc-flow-stage">3. Outcomes</p>
          <ul className="fdm-uc-flow-stack">
            {spec.outcomes.map((o) => (
              <li
                key={o.title}
                className={`fdm-uc-flow-card fdm-uc-flow-card--${o.tone}${
                  o.tone === "human" ? " is-hitl" : ""
                }`}
              >
                <em>{o.edge}</em>
                <strong>{o.title}</strong>
                <span>{o.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="fdm-uc-flow-legend">
        <li>
          <i className="fdm-uc-flow-swatch fdm-uc-flow-swatch--system" />
          System
        </li>
        <li>
          <i className="fdm-uc-flow-swatch fdm-uc-flow-swatch--agent" />
          Agent
        </li>
        <li>
          <i className="fdm-uc-flow-swatch fdm-uc-flow-swatch--control" />
          Control
        </li>
        <li>
          <i className="fdm-uc-flow-swatch fdm-uc-flow-swatch--gate" />
          Gate
        </li>
        <li>
          <i className="fdm-uc-flow-swatch fdm-uc-flow-swatch--human" />
          Human / HITL
        </li>
      </ul>
    </figure>
  );
}

const INBOX_HARNESS: HarnessSpec = {
  title: "Harness · Shared inbox triage",
  readHint:
    "Sources feed the agent. The agent consults skills, tools, and guardrails on every action, then routes to auto-act, a system write, or human review.",
  sources: [
    { title: "Email", role: "Shared ops mailboxes" },
    { title: "Teams", role: "Channel and chat intake" },
    { title: "Portals", role: "Vendor or customer forms" },
  ],
  agent: {
    title: "Triage agent",
    role: "Classify, extract, match entity, choose path",
  },
  controls: [
    { title: "Skills + memory", role: "Intent schemas and prior dispositions", tone: "default" },
    { title: "Tools + QA", role: "CRM/ERP writes and sampled audits", tone: "default" },
    { title: "Guardrails", role: "Blocks money and novel commitments", tone: "gate" },
  ],
  outcomes: [
    { title: "Auto-act", role: "Allowlisted reply or update", tone: "agent", edge: "allowlist" },
    { title: "CRM / ERP", role: "File the system of record", tone: "system", edge: "write" },
    { title: "Human review", role: "Judgment, tone, exceptions", tone: "human", edge: "HITL" },
  ],
};

const DETENTION_HARNESS: HarnessSpec = {
  title: "Harness · Detention and appointment exceptions",
  readHint:
    "TMS, gate, and carrier mail feed the exception agent. Playbooks and clock rules shape the packet. Bill/waive stays gated; reslots and TMS updates can auto-run.",
  sources: [
    { title: "TMS", role: "Appointments and shipment state" },
    { title: "WMS / gate", role: "Actual arrival and dwell times" },
    { title: "Carrier mail", role: "Reschedule and dispute noise" },
  ],
  agent: {
    title: "Exception agent",
    role: "Detect breach, build packet, propose playbook",
  },
  controls: [
    { title: "Site playbooks", role: "Reslot rules and customer SOPs", tone: "default" },
    { title: "Clock + QA", role: "Detention math and packet checks", tone: "default" },
    { title: "Bill / waive gate", role: "No money move without a human", tone: "gate" },
  ],
  outcomes: [
    { title: "Reslot", role: "Allowlisted appointment change", tone: "agent", edge: "allowlist" },
    { title: "TMS update", role: "Packet on the shipment file", tone: "system", edge: "write" },
    { title: "Planner", role: "Disputes, VIP, capacity breaks", tone: "human", edge: "HITL" },
  ],
};

const CLAIMS_HARNESS: HarnessSpec = {
  title: "Harness · Claim intake and missing-info chase",
  readHint:
    "Intake channels feed the intake agent. Completeness and chase cadence run on every file. Pay/deny stays gated; ready work lands with examiners.",
  sources: [
    { title: "Intake mail", role: "FNOL and supplements" },
    { title: "Portals", role: "Employer or provider drops" },
    { title: "Docs", role: "Attachments and images" },
  ],
  agent: {
    title: "Intake agent",
    role: "File, check completeness, chase, brief",
  },
  controls: [
    { title: "Completeness", role: "Required docs by claim type", tone: "default" },
    { title: "Chase cadence", role: "Scheduled asks with caps", tone: "default" },
    { title: "No pay / deny", role: "Coverage decisions stay human", tone: "gate" },
  ],
  outcomes: [
    { title: "Ready queue", role: "Decision-ready for examiner", tone: "agent", edge: "ready" },
    { title: "Claims OS", role: "File, timeline, status sync", tone: "system", edge: "write" },
    { title: "Examiner", role: "Adjudication and settlement", tone: "human", edge: "HITL" },
  ],
};

const COLLECTIONS_HARNESS: HarnessSpec = {
  title: "Harness · AR collections chase",
  readHint:
    "Aging and customer files feed the chase agent. Tiers and suppress rules shape each touch. Write-offs stay gated; reminders and notes can auto-run.",
  sources: [
    { title: "ERP aging", role: "Buckets, balances, due dates" },
    { title: "Customer file", role: "Contacts, disputes, history" },
  ],
  agent: {
    title: "Chase agent",
    role: "Score tier, send or escalate, note ERP",
  },
  controls: [
    { title: "Playbook tiers", role: "Reminder and escalate ladders", tone: "default" },
    { title: "Suppress + QA", role: "Dispute flags and sample audits", tone: "default" },
    { title: "Write-off gate", role: "Plans and write-offs stay human", tone: "gate" },
  ],
  outcomes: [
    { title: "Reminders", role: "Allowlisted outbound tiers", tone: "agent", edge: "allowlist" },
    { title: "ERP notes", role: "Structured touch history", tone: "system", edge: "write" },
    { title: "Collector", role: "Calls, plans, legal handoff", tone: "human", edge: "HITL" },
  ],
};

const AP_HARNESS: HarnessSpec = {
  title: "Harness · AP invoice exceptions",
  readHint:
    "ERP and AP channels feed the exception agent. Tolerances and chase packs shape every clear. Payment and GL overrides stay gated.",
  sources: [
    { title: "ERP AP", role: "Match breaks and invoices" },
    { title: "PO / receipts", role: "Procurement and GR truth" },
    { title: "Vendor mail", role: "Credits and disputes" },
  ],
  agent: {
    title: "AP exception agent",
    role: "Classify break, assemble packet, clear or chase",
  },
  controls: [
    { title: "Tolerance playbooks", role: "Allowlisted match clears", tone: "default" },
    { title: "Chase packs + QA", role: "GR and credit cadences", tone: "default" },
    { title: "Pay / GL gate", role: "Amount and coding stay human", tone: "gate" },
  ],
  outcomes: [
    { title: "Auto-clear", role: "Within-tolerance release", tone: "agent", edge: "allowlist" },
    { title: "ERP invoice", role: "Notes, status, audit trail", tone: "system", edge: "write" },
    { title: "AP / buyer", role: "Coding and commercial fights", tone: "human", edge: "HITL" },
  ],
};

const CUSTOMS_HARNESS: HarnessSpec = {
  title: "Harness · Customs document packs",
  readHint:
    "Mail and portals feed the pack agent. Completeness schemas and chase cadence run continuously. Classification and filing stay gated for licensed brokers.",
  sources: [
    { title: "Doc mail", role: "Invoices and certificates" },
    { title: "Portals", role: "Shipper and carrier drops" },
    { title: "Carrier feeds", role: "Where APIs exist" },
  ],
  agent: {
    title: "Pack agent",
    role: "File, checklist, chase, ready handoff",
  },
  controls: [
    { title: "Entry schemas", role: "Required docs by entry type", tone: "default" },
    { title: "Chase cadence", role: "Scheduled asks with caps", tone: "default" },
    { title: "File / classify gate", role: "Licensed acts stay human", tone: "gate" },
  ],
  outcomes: [
    { title: "Ready pack", role: "Broker can classify", tone: "agent", edge: "ready" },
    { title: "Brokerage OS", role: "File, timeline, status", tone: "system", edge: "write" },
    { title: "Licensed broker", role: "Classify and file", tone: "human", edge: "HITL" },
  ],
};

const WORKORDER_HARNESS: HarnessSpec = {
  title: "Harness · Work order and vendor chase",
  readHint:
    "Resident channels feed the maintenance agent. Dispatch playbooks and closeout checks shape the loop. Emergencies and spend stay gated.",
  sources: [
    { title: "Resident mail/SMS", role: "Requests and photos" },
    { title: "Portals", role: "Ticket intake" },
    { title: "PMS", role: "Units and history" },
  ],
  agent: {
    title: "Maintenance agent",
    role: "Classify, create WO, dispatch, chase close",
  },
  controls: [
    { title: "Dispatch playbooks", role: "Trade, vendor, SLA templates", tone: "default" },
    { title: "Closeout + QA", role: "Proof checks and samples", tone: "default" },
    { title: "Emergency / spend", role: "Safety and dollars stay human", tone: "gate" },
  ],
  outcomes: [
    { title: "Vendor chase", role: "Accept, schedule, complete", tone: "agent", edge: "allowlist" },
    { title: "PMS work order", role: "System of record updates", tone: "system", edge: "write" },
    { title: "Coordinator", role: "Access, tone, exceptions", tone: "human", edge: "HITL" },
  ],
};

const RECON_HARNESS: HarnessSpec = {
  title: "Harness · ASN / invoice / PO reconciliation",
  readHint:
    "EDI and ERP/WMS events feed the recon agent. Partner tolerances shape auto-clears. Chargebacks and quality holds stay gated.",
  sources: [
    { title: "EDI ASN", role: "Supplier advance notices" },
    { title: "ERP PO", role: "Ordered truth" },
    { title: "WMS receipt", role: "Physical truth" },
  ],
  agent: {
    title: "Recon agent",
    role: "Detect variance, build packet, apply playbook",
  },
  controls: [
    { title: "Partner playbooks", role: "Tolerances by trading partner", tone: "default" },
    { title: "Packet + QA", role: "Evidence and sample audits", tone: "default" },
    { title: "Chargeback gate", role: "Money and quality stay human", tone: "gate" },
  ],
  outcomes: [
    { title: "Auto-clear", role: "Within-tolerance resolve", tone: "agent", edge: "allowlist" },
    { title: "ERP / WMS", role: "Notes and status sync", tone: "system", edge: "write" },
    { title: "Planner / AP", role: "Commercial and quality calls", tone: "human", edge: "HITL" },
  ],
};

const COI_HARNESS: HarnessSpec = {
  title: "Harness · Vendor COI chase",
  readHint:
    "Procurement, risk, and vendor mail feed the COI agent. Cert rules and chase cadence shape every file. Waivers stay gated; valid certs can auto-validate.",
  sources: [
    { title: "Procurement", role: "Vendor roster and requirements" },
    { title: "Risk", role: "Coverage matrices and limits" },
    { title: "Vendor mail", role: "Certificates and renewals" },
  ],
  agent: {
    title: "COI agent",
    role: "Validate certs, chase gaps, propose waiver",
  },
  controls: [
    { title: "Cert schemas", role: "Required coverages by vendor class", tone: "default" },
    { title: "Chase + QA", role: "Expiry watches and sample audits", tone: "default" },
    { title: "Waiver gate", role: "Exceptions stay human", tone: "gate" },
  ],
  outcomes: [
    { title: "Auto-validate", role: "In-policy certificate accepted", tone: "agent", edge: "allowlist" },
    { title: "Vendor file", role: "COI status on the record", tone: "system", edge: "write" },
    { title: "Risk", role: "Waivers and novel coverage", tone: "human", edge: "HITL" },
  ],
};

const VENDORKYC_HARNESS: HarnessSpec = {
  title: "Harness · Vendor onboarding packs",
  readHint:
    "Procurement, email, and portals feed the pack agent. Completeness schemas and chase cadence run continuously. ERP create and banking stay gated.",
  sources: [
    { title: "Procurement", role: "Onboarding requests and tiers" },
    { title: "Email", role: "Forms and attachments" },
    { title: "Portals", role: "Vendor self-serve drops" },
  ],
  agent: {
    title: "Onboarding agent",
    role: "Check pack completeness, chase, ready handoff",
  },
  controls: [
    { title: "Pack schemas", role: "Required docs by vendor type", tone: "default" },
    { title: "Chase cadence", role: "Scheduled asks with caps", tone: "default" },
    { title: "ERP / banking gate", role: "Create and pay details stay human", tone: "gate" },
  ],
  outcomes: [
    { title: "Ready pack", role: "Procurement can create vendor", tone: "agent", edge: "ready" },
    { title: "Vendor file", role: "Docs, timeline, status", tone: "system", edge: "write" },
    { title: "Procurement", role: "ERP create and banking", tone: "human", edge: "HITL" },
  ],
};

const FREIGHT_HARNESS: HarnessSpec = {
  title: "Harness · Freight invoice audit",
  readHint:
    "TMS, carrier EDI, and ERP feed the audit agent. Rate cards and tolerances shape auto-clears. Dispute and pay stay gated.",
  sources: [
    { title: "TMS", role: "Shipments and contracted rates" },
    { title: "Carrier EDI", role: "Invoices and accessorials" },
    { title: "ERP", role: "AP and accrual truth" },
  ],
  agent: {
    title: "Freight audit agent",
    role: "Match rates, flag variance, clear or dispute",
  },
  controls: [
    { title: "Rate playbooks", role: "Contract and lane tolerances", tone: "default" },
    { title: "Packet + QA", role: "Evidence packs and samples", tone: "default" },
    { title: "Dispute / pay gate", role: "Money moves stay human", tone: "gate" },
  ],
  outcomes: [
    { title: "Auto-clear", role: "Within-tolerance release", tone: "agent", edge: "allowlist" },
    { title: "AP write", role: "Invoice status and notes", tone: "system", edge: "write" },
    { title: "Auditor", role: "Disputes and novel charges", tone: "human", edge: "HITL" },
  ],
};

const EXPENSE_HARNESS: HarnessSpec = {
  title: "Harness · Expense exceptions",
  readHint:
    "T&E, card feeds, and email feed the exception agent. Policy checks and receipt chase run on every line. Policy overrides stay gated.",
  sources: [
    { title: "T&E", role: "Reports and line items" },
    { title: "Card", role: "Transactions and merchants" },
    { title: "Email", role: "Receipts and justifications" },
  ],
  agent: {
    title: "Expense agent",
    role: "Policy check, chase receipt, clear or escalate",
  },
  controls: [
    { title: "Policy playbooks", role: "Allowlisted clear rules", tone: "default" },
    { title: "Receipt chase + QA", role: "Cadence and sample audits", tone: "default" },
    { title: "Policy override", role: "Exceptions stay human", tone: "gate" },
  ],
  outcomes: [
    { title: "Auto-clear", role: "In-policy line release", tone: "agent", edge: "allowlist" },
    { title: "T&E write", role: "Status, notes, audit trail", tone: "system", edge: "write" },
    { title: "Manager", role: "Overrides and gray areas", tone: "human", edge: "HITL" },
  ],
};

const RFP_HARNESS: HarnessSpec = {
  title: "Harness · RFP packs",
  readHint:
    "CRM, content library, and email feed the pack agent. Assembly schemas and SME chase shape every response. Partner submit stays gated.",
  sources: [
    { title: "CRM", role: "Opportunity and buyer asks" },
    { title: "Content lib", role: "Approved answers and assets" },
    { title: "Email", role: "SME replies and attachments" },
  ],
  agent: {
    title: "RFP agent",
    role: "Assemble draft, chase SME gaps, ready handoff",
  },
  controls: [
    { title: "Pack schemas", role: "Required sections by RFP type", tone: "default" },
    { title: "SME chase + QA", role: "Cadence and sample checks", tone: "default" },
    { title: "Partner submit gate", role: "External send stays human", tone: "gate" },
  ],
  outcomes: [
    { title: "Draft pack", role: "Partner-ready response", tone: "agent", edge: "ready" },
    { title: "Proposal tool", role: "File, version, status", tone: "system", edge: "write" },
    { title: "Partner", role: "Edit and submit", tone: "human", edge: "HITL" },
  ],
};

const TIMESHEET_HARNESS: HarnessSpec = {
  title: "Harness · Timesheet approvals",
  readHint:
    "PSA, portals, and email feed the chase agent. Reminder ladders and completeness rules shape each cycle. Bill stays gated.",
  sources: [
    { title: "PSA", role: "Projects, rates, and entries" },
    { title: "Portal", role: "Contractor and staff time" },
    { title: "Email", role: "Reminders and exceptions" },
  ],
  agent: {
    title: "Timesheet agent",
    role: "Chase missing, flag anomalies, ready for bill",
  },
  controls: [
    { title: "Reminder ladders", role: "Allowlisted chase tiers", tone: "default" },
    { title: "Completeness + QA", role: "Entry checks and samples", tone: "default" },
    { title: "Bill gate", role: "Invoice release stays human", tone: "gate" },
  ],
  outcomes: [
    { title: "Reminders", role: "Allowlisted outbound chase", tone: "agent", edge: "allowlist" },
    { title: "Time tool write", role: "Status and note sync", tone: "system", edge: "write" },
    { title: "PM / finance", role: "Approvals and bill release", tone: "human", edge: "HITL" },
  ],
};

const PRIORAUTH_HARNESS: HarnessSpec = {
  title: "Harness · Prior auth",
  readHint:
    "EHR, payer portals, and fax feed the auth agent. Packet schemas and chase cadence run continuously. Clinical submit and payer decision stay gated.",
  sources: [
    { title: "EHR", role: "Orders and clinical notes" },
    { title: "Payer portal", role: "Auth forms and status" },
    { title: "Fax", role: "Packets and determinations" },
  ],
  agent: {
    title: "Prior auth agent",
    role: "Build packet, chase gaps, ready for submit",
  },
  controls: [
    { title: "Packet schemas", role: "Required docs by payer and CPT", tone: "default" },
    { title: "Chase cadence", role: "Scheduled asks with caps", tone: "default" },
    { title: "Clinical submit gate", role: "Submit and decision stay human", tone: "gate" },
  ],
  outcomes: [
    { title: "Ready packet", role: "Clinician can submit", tone: "agent", edge: "ready" },
    { title: "RCM write", role: "File, timeline, status", tone: "system", edge: "write" },
    { title: "Clinician", role: "Submit and appeal judgment", tone: "human", edge: "HITL" },
  ],
};

const DEDUCTION_HARNESS: HarnessSpec = {
  title: "Harness · Trade deductions",
  readHint:
    "ERP AR, retailer EDI, and promo systems feed the match agent. Playbooks shape auto-clears. Write-offs stay gated.",
  sources: [
    { title: "ERP AR", role: "Invoices and open deductions" },
    { title: "Retailer EDI", role: "Chargebacks and claims" },
    { title: "Promo", role: "Deal and accrual truth" },
  ],
  agent: {
    title: "Deduction agent",
    role: "Match playbook, clear or escalate packet",
  },
  controls: [
    { title: "Match playbooks", role: "Allowlisted clear patterns", tone: "default" },
    { title: "Packet + QA", role: "Evidence and sample audits", tone: "default" },
    { title: "Write-off gate", role: "Money forgiveness stays human", tone: "gate" },
  ],
  outcomes: [
    { title: "Auto-clear", role: "Matched deduction resolve", tone: "agent", edge: "allowlist" },
    { title: "AR write", role: "Status, notes, audit trail", tone: "system", edge: "write" },
    { title: "Trade finance", role: "Disputes and write-offs", tone: "human", edge: "HITL" },
  ],
};

const ACCESS_HARNESS: HarnessSpec = {
  title: "Harness · Joiner access",
  readHint:
    "HRIS, ITSM, and email feed the access agent. Approver chase and allowlists shape provisioning. Privileged provision stays gated.",
  sources: [
    { title: "HRIS", role: "Joiners, roles, and managers" },
    { title: "ITSM", role: "Tickets and entitlements" },
    { title: "Email", role: "Approvals and exceptions" },
  ],
  agent: {
    title: "Access agent",
    role: "Chase approvers, provision allowlisted access",
  },
  controls: [
    { title: "Role allowlists", role: "Standard joiner bundles", tone: "default" },
    { title: "Approver chase + QA", role: "Cadence and sample audits", tone: "default" },
    { title: "Privileged gate", role: "Elevated access stays human", tone: "gate" },
  ],
  outcomes: [
    { title: "Allowlisted provision", role: "Standard access granted", tone: "agent", edge: "allowlist" },
    { title: "ITSM write", role: "Ticket and entitlement sync", tone: "system", edge: "write" },
    { title: "Manager / security", role: "Privileged and exceptions", tone: "human", edge: "HITL" },
  ],
};

const BANKREC_HARNESS: HarnessSpec = {
  title: "Harness · Bank rec",
  readHint:
    "Bank feeds, ERP GL, and remittance feed the match agent. Pattern rules shape auto-matches. Journals stay gated.",
  sources: [
    { title: "Bank feed", role: "Cleared transactions" },
    { title: "ERP GL", role: "Open items and books" },
    { title: "Remittance", role: "Payment advice and memos" },
  ],
  agent: {
    title: "Bank rec agent",
    role: "Match patterns, clear or escalate exceptions",
  },
  controls: [
    { title: "Match patterns", role: "Allowlisted clear rules", tone: "default" },
    { title: "Packet + QA", role: "Evidence and sample audits", tone: "default" },
    { title: "Journal gate", role: "Bookings stay human", tone: "gate" },
  ],
  outcomes: [
    { title: "Auto-match", role: "Pattern-cleared items", tone: "agent", edge: "allowlist" },
    { title: "GL write", role: "Match status and notes", tone: "system", edge: "write" },
    { title: "Accountant", role: "Journals and odd items", tone: "human", edge: "HITL" },
  ],
};

const LEASE_HARNESS: HarnessSpec = {
  title: "Harness · Lease critical dates",
  readHint:
    "Lease admin, docs, and calendar feed the watch agent. Deadline rules and notice drafts run continuously. Legal send stays gated.",
  sources: [
    { title: "Lease admin", role: "Abstracts and critical dates" },
    { title: "Docs", role: "Agreements and amendments" },
    { title: "Calendar", role: "Notice and option windows" },
  ],
  agent: {
    title: "Lease agent",
    role: "Watch deadlines, draft notice, ready handoff",
  },
  controls: [
    { title: "Deadline watches", role: "Option and notice calendars", tone: "default" },
    { title: "Draft + QA", role: "Notice templates and samples", tone: "default" },
    { title: "Legal send gate", role: "Outbound notice stays human", tone: "gate" },
  ],
  outcomes: [
    { title: "Draft notice", role: "Ready for legal review", tone: "agent", edge: "ready" },
    { title: "Lease file write", role: "Dates, drafts, status", tone: "system", edge: "write" },
    { title: "Asset mgr", role: "Send and commercial calls", tone: "human", edge: "HITL" },
  ],
};

const AUDIT_HARNESS: HarnessSpec = {
  title: "Harness · Audit evidence",
  readHint:
    "GRC, tickets, and doc store feed the evidence agent. Control maps and chase cadence shape every request. Attestation stays gated.",
  sources: [
    { title: "GRC", role: "Controls and test plans" },
    { title: "Tickets", role: "Evidence requests and owners" },
    { title: "Doc store", role: "Artifacts and prior packets" },
  ],
  agent: {
    title: "Evidence agent",
    role: "Map controls, chase evidence, ready packet",
  },
  controls: [
    { title: "Control maps", role: "Required evidence by control", tone: "default" },
    { title: "Chase cadence", role: "Scheduled asks with caps", tone: "default" },
    { title: "Attestation gate", role: "Sign-off stays human", tone: "gate" },
  ],
  outcomes: [
    { title: "Ready packet", role: "Owner can attest", tone: "agent", edge: "ready" },
    { title: "GRC write", role: "Evidence links and status", tone: "system", edge: "write" },
    { title: "Control owner", role: "Attestation and gaps", tone: "human", edge: "HITL" },
  ],
};


export function UseCaseDiagram({ kind }: { kind: UseCaseDiagram }) {
  switch (kind) {
    case "inbox":
      return <HarnessDiagram spec={INBOX_HARNESS} />;
    case "detention":
      return <HarnessDiagram spec={DETENTION_HARNESS} />;
    case "claims":
      return <HarnessDiagram spec={CLAIMS_HARNESS} />;
    case "collections":
      return <HarnessDiagram spec={COLLECTIONS_HARNESS} />;
    case "ap":
      return <HarnessDiagram spec={AP_HARNESS} />;
    case "customs":
      return <HarnessDiagram spec={CUSTOMS_HARNESS} />;
    case "workorder":
      return <HarnessDiagram spec={WORKORDER_HARNESS} />;
    case "recon":
      return <HarnessDiagram spec={RECON_HARNESS} />;
    case "coi":
      return <HarnessDiagram spec={COI_HARNESS} />;
    case "vendorkyc":
      return <HarnessDiagram spec={VENDORKYC_HARNESS} />;
    case "freight":
      return <HarnessDiagram spec={FREIGHT_HARNESS} />;
    case "expense":
      return <HarnessDiagram spec={EXPENSE_HARNESS} />;
    case "rfp":
      return <HarnessDiagram spec={RFP_HARNESS} />;
    case "timesheet":
      return <HarnessDiagram spec={TIMESHEET_HARNESS} />;
    case "priorauth":
      return <HarnessDiagram spec={PRIORAUTH_HARNESS} />;
    case "deduction":
      return <HarnessDiagram spec={DEDUCTION_HARNESS} />;
    case "access":
      return <HarnessDiagram spec={ACCESS_HARNESS} />;
    case "bankrec":
      return <HarnessDiagram spec={BANKREC_HARNESS} />;
    case "lease":
      return <HarnessDiagram spec={LEASE_HARNESS} />;
    case "audit":
      return <HarnessDiagram spec={AUDIT_HARNESS} />;
  }
}

function PlainList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function FdUseCaseDetail({
  useCase,
  onBack,
}: {
  useCase: UseCase;
  onBack: () => void;
}) {
  return (
    <article className="fdm-uc-detail">
      <nav className="fdm-story-crumbs" aria-label="Breadcrumb">
        <button type="button" onClick={onBack}>
          Use cases
        </button>
        <span aria-hidden="true">/</span>
        <span>{useCase.industry}</span>
      </nav>

      <header className="fdm-uc-detail-hero">
        <div className="fdm-uc-detail-tags">
          <span>{useCase.industry}</span>
          <span>{useCase.family}</span>
          <span>{useCase.hitl}</span>
        </div>
        <h1>{useCase.title}</h1>
        <p className="fdm-uc-detail-lede">{useCase.what}</p>
      </header>

      <UseCaseArt kind={useCase.diagram} size="hero" />

      <div className="fdm-uc-prose">
        <section className="fdm-uc-opener">
          <p className="fdm-uc-lens">{useCase.operatorLens}</p>
          <h2>Why this matters</h2>
          <p>{useCase.whyItMatters}</p>
        </section>

        <section>
          <h2>Where it improves</h2>
          <dl className="fdm-uc-deflist">
            {useCase.valueMoves.map((v) => (
              <div key={v.title}>
                <dt>
                  {v.title}
                  <span>{v.where}</span>
                </dt>
                <dd>{v.signal}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>What leaks today</h2>
          <dl className="fdm-uc-deflist">
            {useCase.leakageToday.map((item) => (
              <div key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>Who feels it</h2>
          <dl className="fdm-uc-deflist fdm-uc-deflist--roles">
            {useCase.roles.map((r) => (
              <div key={r.role}>
                <dt>{r.role}</dt>
                <dd>
                  <p>
                    <span>Today.</span> {r.today}
                  </p>
                  <p>
                    <span>With agents.</span> {r.withAgents}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>What to watch</h2>
          <dl className="fdm-uc-deflist">
            {useCase.watchMetrics.map((m) => (
              <div key={m.metric}>
                <dt>
                  {m.metric}
                  <span>{m.move}</span>
                </dt>
                <dd>{m.note}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>Unit economics</h2>
          <p>
            <strong>Unit.</strong> {useCase.unitEconomics.unit}
          </p>
          <p>{useCase.unitEconomics.framing}</p>

          <p className="fdm-uc-inline-label">Human baseline</p>
          <p>{useCase.unitEconomics.human.summary}</p>
          <dl className="fdm-uc-deflist">
            {useCase.unitEconomics.human.lineItems.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>

          <p className="fdm-uc-inline-label">Agent path (infra + tokens + HITL)</p>
          <p>{useCase.unitEconomics.agent.summary}</p>
          <dl className="fdm-uc-deflist">
            {useCase.unitEconomics.agent.lineItems.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>

          <p className="fdm-uc-inline-label">When the agent path wins</p>
          <p>{useCase.unitEconomics.crossover}</p>

          <p className="fdm-uc-inline-label">What moves the math</p>
          <PlainList items={useCase.unitEconomics.sensitivities} />
        </section>

        <section>
          <h2>Baseline</h2>
          <p>{useCase.baseline}</p>
        </section>

        <section>
          <h2>Agent-operated path</h2>
          <p>{useCase.agentPath}</p>
          <p>{useCase.orgShift}</p>
        </section>

        <UseCaseDiagram kind={useCase.diagram} />

        <section>
          <h2>Workflow</h2>
          <ol className="fdm-uc-steps">
            {useCase.steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}.</strong> {step.body}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2>Who owns what</h2>
          <p className="fdm-uc-inline-label">Agent owns</p>
          <PlainList items={useCase.agentOwns} />
          <p className="fdm-uc-inline-label">Human owns</p>
          <PlainList items={useCase.humanOwns} />
        </section>

        <section>
          <h2>Approval gates and HITL</h2>
          <p className="fdm-uc-inline-label">Surfaces for review</p>
          <PlainList items={useCase.hitlNotes} />
          <p className="fdm-uc-inline-label">Hard gates</p>
          <PlainList items={useCase.gates} />
        </section>

        <section>
          <h2>Tools, skills, and memory</h2>
          <p className="fdm-uc-inline-label">Tools</p>
          <PlainList items={useCase.tools} />
          <p className="fdm-uc-inline-label">Skills</p>
          <PlainList items={useCase.skills} />
          <p className="fdm-uc-inline-label">Memory</p>
          <PlainList items={useCase.memory} />
        </section>

        <section>
          <h2>QA and guardrails</h2>
          <p className="fdm-uc-inline-label">QA</p>
          <PlainList items={useCase.qa} />
          <p className="fdm-uc-inline-label">Guardrails</p>
          <PlainList items={useCase.guardrails} />
        </section>

        <section>
          <h2>Path from baseline</h2>
          <ol className="fdm-uc-steps">
            {useCase.staging.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2>When this is a strong wedge</h2>
          <PlainList items={useCase.fitWhen} />
        </section>

        <section>
          <h2>Questions leadership should ask</h2>
          <PlainList items={useCase.leadershipAsks} />
        </section>
      </div>

      <div className="fdm-story-report-footer">
        <button type="button" className="fdm-btn fdm-btn--ghost" onClick={onBack}>
          ← Back to use cases
        </button>
      </div>
    </article>
  );
}
