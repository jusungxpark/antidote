/** Shared use-case type unions (no data). */
export type UseCaseIndustry =
 | "Cross-industry"
 | "3PL / logistics"
 | "Packaged goods"
 | "Manufacturing"
 | "Customs brokerage"
 | "TPA / claims"
 | "Property management"
 | "Construction / facilities"
 | "Professional services"
 | "Staffing"
 | "Healthcare RCM"
 | "Commercial real estate";

export type UseCaseFamily =
 | "Inbox & communications"
 | "Scheduling & appointments"
 | "Claims & intake"
 | "Collections & chase"
 | "Document packs & filings"
 | "Order-to-cash"
 | "Onboarding & compliance"
 | "Expense & T&E"
 | "Sales & proposals"
 | "Access & provisioning";

export type HitlPosture =
 | "Mostly agent-run"
 | "Review-gated"
 | "Exception-heavy"
 | "Approval-required";

export type UseCaseDiagram =
 | "inbox"
 | "detention"
 | "claims"
 | "collections"
 | "ap"
 | "customs"
 | "workorder"
 | "recon"
 | "coi"
 | "vendorkyc"
 | "freight"
 | "expense"
 | "rfp"
 | "timesheet"
 | "priorauth"
 | "deduction"
 | "access"
 | "bankrec"
 | "lease"
 | "audit";
