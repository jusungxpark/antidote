// ============================================================
// GRAPH C — THE WORKFLOW MAP  [SECTOR-FIXED ROWS + PER-FIRM CHIPS]
// Plain HTML/CSS — no chart library needed for horizontal bars.
// The boxed grey rows (human-led work) are the persuasive move:
// showing what we WON'T automate separates us from AI vendors.
// ============================================================

type Row = {
  id: string;
  label: string;
  pct: number;
  ceiling: string;
  cls: "green" | "amber" | "moat";
};

type StackNote = { rowId: string; note: string };

export default function WorkflowMap({
  rows,
  scaleMax,
  stackNotes = [],
}: {
  rows: Row[];
  scaleMax: number;
  stackNotes?: StackNote[];
}) {
  return (
    <div className="wf">
      {rows.map((r) => {
        const chip = stackNotes.find((n) => n.rowId === r.id);
        return (
          <div key={r.id}>
            <div className={`wf-row ${r.cls === "moat" ? "wf-row--human" : ""}`}>
              <div className={`wf-label ${r.cls === "moat" ? "moat" : ""}`}>
                {r.label}
              </div>
              <div className="wf-track">
                <div
                  className={`wf-bar ${r.cls}`}
                  style={{ width: `${(r.pct / scaleMax) * 100}%` }}
                  title={`~${r.pct}% of staff time`}
                />
              </div>
              <div className={`wf-ceiling ${r.cls === "moat" ? "moat" : ""}`}>
                {r.ceiling}
              </div>
            </div>
            {chip && (
              <div className="wf-row" style={{ borderTop: "none", padding: 0 }}>
                <div />
                <div className="wf-chip">{chip.note}</div>
              </div>
            )}
          </div>
        );
      })}
      <div className="wf-legend">
        <span>
          <span className="sw" style={{ background: "var(--accent)" }} />
          AUTOMATABLE NOW
        </span>
        <span>
          <span className="sw" style={{ background: "var(--accent)", opacity: 0.35 }} />
          PARTIAL / CONDITIONAL
        </span>
        <span>
          <span className="sw" style={{ background: "var(--moat)" }} />
          HUMAN-LED (RETAINED)
        </span>
      </div>
    </div>
  );
}
