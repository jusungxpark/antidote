"use client";

/** Sticky deal-cycle phases — pre-close → close → ownership (Rogo-style pin). */
export function DealCycleSticky() {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  const phases = [
    {
      title: "Before the check",
      body: "You are underwriting a thesis or an AI-exposed asset before capital is committed. The gap is a clear answer, not another demo.",
      icon: (
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" {...stroke} />
          <circle cx="12" cy="12" r="2.25" {...stroke} />
          <path d="M12 2.5V5.5M12 18.5V21.5M2.5 12H5.5M18.5 12H21.5" {...stroke} />
        </svg>
      ),
      bullets: [
        "Where a PE firm should invest, and how defensible a named asset is",
        "Evidence on capability, cost, defensibility, and unknowns, unmixed",
        "Readiness and the first thin path agents can own on day one",
      ],
    },
    {
      title: "Around close",
      body: "Open questions and the 100-day plan have to survive contact with the asset. What stays unresolved gets carried, not buried.",
      icon: (
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path d="M4 12H10" {...stroke} />
          <path d="M14 12H20" {...stroke} />
          <path d="M10 8V16M14 8V16" {...stroke} />
          <path d="M7 9L4 12L7 15M17 9L20 12L17 15" {...stroke} />
        </svg>
      ),
      bullets: [
        "100-day plan and sequencing once the check clears",
        "Open questions carried with claim status still visible",
        "First agents live on a path that can hold under load",
      ],
    },
    {
      title: "Under ownership",
      body: "The thesis has to become P&L after the org pushes back. Delivery and re-underwriting stay on the same spine.",
      icon: (
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path d="M4 20H20" {...stroke} />
          <path d="M6 20V10L12 5L18 10V20" {...stroke} />
          <path d="M10 20V14H14V20" {...stroke} />
        </svg>
      ),
      bullets: [
        "What is automatable, how to rebuild AI-native, and an operating model that holds",
        "Re-underwrite when the facts move under ownership",
        "Production agents with guardrails that hold in the real stack",
      ],
    },
  ];

  return (
    <section
      className="fdm-sticky-pain fdm-sticky-pain--left fdm-deal-cycle"
      aria-label="Help that matches where you are"
    >
      <div className="fdm-sticky-pain-head">
        <h2>Help that matches where you are.</h2>
        <p>
          The same three offerings before and after close. What changes is the
          question we answer, and how Strategy, Diligence, and Transformation
          bridge the gap from your seat in the cycle.
        </p>
      </div>

      <ul className="fdm-sticky-pain-list">
        {phases.map((phase) => (
          <li key={phase.title} className="fdm-sticky-pain-row fdm-deal-cycle-row">
            <span className="fdm-sticky-pain-icon" aria-hidden="true">
              {phase.icon}
            </span>
            <div className="fdm-sticky-pain-copy">
              <strong>{phase.title}</strong>
              <p>{phase.body}</p>
              <ul className="fdm-deal-cycle-bullets">
                {phase.bullets.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Compact Strategy exhibit — paper stack, same language as the Strategy hero. */
function OfferStrategyVisual() {
  return (
    <div className="fdm-offer-media fdm-offer-media--strategy">
      <div className="fdm-offer-strat-paper fdm-offer-strat-paper--back" />
      <div className="fdm-offer-strat-paper fdm-offer-strat-paper--mid" />
      <div className="fdm-offer-strat-sheet">
        <header>
          <span>Exhibit A</span>
          <span>03 / 18</span>
        </header>
        <p className="fdm-offer-strat-eyebrow">Governing question</p>
        <strong>What decision is this?</strong>
        <ul>
          <li>
            <span>Investment</span>
            <em>Where the fund puts capital</em>
          </li>
          <li>
            <span>Asset</span>
            <em>How defensible it is</em>
          </li>
          <li className="is-accent">
            <span>Portco</span>
            <em>How to rebuild AI-native</em>
          </li>
        </ul>
      </div>
    </div>
  );
}

/** Diligence evidence board — claim status rows, CDD-adjacent. */
function OfferDiligenceVisual() {
  const rows = [
    { claim: "Capability", status: "Proven", tone: "ok" as const },
    { claim: "Unit economics", status: "Open", tone: "open" as const },
    { claim: "Defensibility", status: "Mixed", tone: "mixed" as const },
    { claim: "Unknowns", status: "Flagged", tone: "flag" as const },
  ];

  return (
    <div className="fdm-offer-media fdm-offer-media--diligence">
      <div className="fdm-offer-dil-card">
        <header>
          <span>Software CDD</span>
          <span className="fdm-offer-dil-live">Live</span>
        </header>
        <p>Claim status before capital</p>
        <ul>
          {rows.map((r) => (
            <li key={r.claim}>
              <strong>{r.claim}</strong>
              <span data-tone={r.tone}>{r.status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="fdm-offer-dil-planes" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

/** Transformation system design — agents, stack, guardrails as enterprise UI. */
function OfferTransformVisual() {
  return (
    <div className="fdm-offer-media fdm-offer-media--transform">
      <div className="fdm-offer-tx-card">
        <header>
          <span>Production system</span>
          <span className="fdm-offer-tx-live">Live</span>
        </header>
        <p>Components that hold under load</p>

        <div className="fdm-offer-tx-diagram">
          <div className="fdm-offer-tx-col">
            <div className="fdm-offer-tx-node" data-tone="data">
              <strong>Data path</strong>
              <em>Sources · lineage</em>
            </div>
            <div className="fdm-offer-tx-node" data-tone="agent">
              <strong>Agents</strong>
              <em>Volume work</em>
            </div>
            <div className="fdm-offer-tx-node" data-tone="guard">
              <strong>Guardrails</strong>
              <em>Gates · evals</em>
            </div>
          </div>

          <div className="fdm-offer-tx-spine" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>

          <div className="fdm-offer-tx-col fdm-offer-tx-col--stack">
            <div className="fdm-offer-tx-node fdm-offer-tx-node--stack">
              <strong>Your stack</strong>
              <em>Dynamics · ERP · Teams</em>
            </div>
            <div className="fdm-offer-tx-node fdm-offer-tx-node--human">
              <strong>Human judgment</strong>
              <em>Exceptions · customers</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OfferVisual({
  kind,
}: {
  kind: "strategy" | "diligence" | "transformation";
}) {
  switch (kind) {
    case "strategy":
      return <OfferStrategyVisual />;
    case "diligence":
      return <OfferDiligenceVisual />;
    case "transformation":
      return <OfferTransformVisual />;
  }
}

/** Offering block for hub grid — title, lede, real media panel. */
export function OfferingBlock({
  kind,
  title,
  body,
  stack,
  onClick,
}: {
  kind: "strategy" | "diligence" | "transformation";
  title: string;
  body: string;
  stack: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className="fdm-offer-block" onClick={onClick}>
      <div className="fdm-offer-block-copy">
        <strong>{title}</strong>
        <p>{body}</p>
        <em>{stack}</em>
      </div>
      <span
        className={`fdm-offer-block-visual fdm-offer-block-visual--${kind}`}
        aria-hidden="true"
      >
        <OfferVisual kind={kind} />
      </span>
    </button>
  );
}

/** Proof samples, quiet list, different from offering rows. */
export function ProofRow({
  series,
  title,
  body,
}: {
  series: string;
  title: string;
  body: string;
}) {
  return (
    <article className="fdm-proof-row">
      <span>{series}</span>
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    </article>
  );
}

/** Strategy hero: cropped report exhibit (fades into the page like a real deliverable). */
