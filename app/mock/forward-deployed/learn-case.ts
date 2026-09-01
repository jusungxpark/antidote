/**
 * R6. one case, all the way through.
 *
 * Invoice 8812 runs the entire course: every worked example, every widget dataset,
 * and most assessments operate on this one queue. By the last module the reader has
 * watched it travel from a pasted chat message to a gated, traced, evaluated,
 * priced production system.
 *
 * Every fact lives here so no lesson can quietly drift from another.
 */
export const CASE = {
  invoice: "8812",
  vendor: "Acme Industrial",
  amount: "$14,200.00",
  amountShort: "$14,200",
  po: "4501",
  buyer: "Dana Okafor",
  terms: "Net 45",
  received: "3 March",
  missing: "goods receipt",
  queue: "AP exceptions",
  volume: "4,200 items a month",
  systems: "the ERP and the vendor portal",
} as const;

/** The one-line statement of the case, used wherever a lesson needs it whole. */
export const CASE_LINE = `Invoice ${CASE.invoice}, vendor ${CASE.vendor}, ${CASE.amount}, three-way match against PO ${CASE.po}. The goods receipt is missing.`;

/** The queue the case sits in, for lessons that need scale rather than the single item. */
export const CASE_QUEUE = `${CASE.volume} of ${CASE.queue}, seven exception types, two systems of record.`;
