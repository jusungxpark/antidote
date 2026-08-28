"use client";

import type { CaseStudy } from "../../components/case-studies-data";
import {
  STRATEGY_CASES,
  TRANSFORMATION_CASES,
} from "./cases";
import { FdCaseStoryCards } from "./FdCaseStories";
import {
  StrategyHeroVisual,
  TransformHeroVisual,
} from "./media";

type Site = "strategy" | "transformation";

type Props = {
  site: Site;
  onNavigate: (page: string) => void;
  onEnterSibling: (site: Site) => void;
};

type PainIconKind =
  | "margin"
  | "org"
  | "usecases"
  | "process"
  | "data"
  | "change"
  | "safety";

type PainItem = {
  title: string;
  body: string;
  icon: PainIconKind;
};

function SectionHead({ title, lede }: { title: string; lede: string }) {
  return (
    <div className="fdm-section-head">
      <h2>{title}</h2>
      <p>{lede}</p>
    </div>
  );
}

function CaseStudyList({
  studies,
  onOpenStudy,
}: {
  studies: CaseStudy[];
  onOpenStudy: (slug: string) => void;
}) {
  return <FdCaseStoryCards studies={studies} onOpen={onOpenStudy} />;
}

/** Quiet enterprise line icons for sticky pain rows. */
function PainIcon({ kind }: { kind: PainIconKind }) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  switch (kind) {
    case "margin":
      // Ascending value → P&L is the tallest bar
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M4 19H20" {...stroke} />
          <path d="M7 19V14" {...stroke} />
          <path d="M12 19V10" {...stroke} />
          <path d="M17 19V5" {...stroke} />
        </svg>
      );
    case "org":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <rect x="9" y="3" width="6" height="5" rx="1" {...stroke} />
          <path d="M12 8V11" {...stroke} />
          <path d="M6 11H18" {...stroke} />
          <path d="M6 11V13M12 11V13M18 11V13" {...stroke} />
          <rect x="3" y="13" width="6" height="5" rx="1" {...stroke} />
          <rect x="9" y="13" width="6" height="5" rx="1" {...stroke} />
          <rect x="15" y="13" width="6" height="5" rx="1" {...stroke} />
        </svg>
      );
    case "usecases":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M5 7H19" {...stroke} />
          <path d="M5 12H19" {...stroke} />
          <path d="M5 17H13" {...stroke} />
          <path d="M16.5 15.5L19.5 18.5M19.5 15.5L16.5 18.5" {...stroke} />
        </svg>
      );
    case "process":
      // Two systems with a broken handoff
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <rect x="2.5" y="4" width="8" height="7" rx="1.25" {...stroke} />
          <rect x="13.5" y="13" width="8" height="7" rx="1.25" {...stroke} />
          <path d="M10.5 7.5H13L14.5 10.5" {...stroke} />
          <path d="M13.5 16.5H11L9.5 13.5" {...stroke} />
        </svg>
      );
    case "data":
      // Stacked records with a break
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <ellipse cx="12" cy="5.5" rx="7" ry="2.25" {...stroke} />
          <path d="M5 5.5V10c0 1.25 3.13 2.25 7 2.25S19 11.25 19 10V5.5" {...stroke} />
          <path d="M5 10v4.5c0 1.25 3.13 2.25 7 2.25" {...stroke} />
          <path d="M19 10v2.25" {...stroke} />
          <path d="M14 18.5L18.5 14" {...stroke} />
          <path d="M5 14.5V18c0 1.25 2.2 2.1 5 2.25" {...stroke} />
        </svg>
      );
    case "change":
      // Opposing transfer arrows (boil-the-ocean churn)
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M3.5 8H16" {...stroke} />
          <path d="M13 5L16 8L13 11" {...stroke} />
          <path d="M20.5 16H8" {...stroke} />
          <path d="M11 13L8 16L11 19" {...stroke} />
        </svg>
      );
    case "safety":
      // Shield + gate mark
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M12 3L19 6.25V11.25C19 15.75 15.9 19.35 12 20.75C8.1 19.35 5 15.75 5 11.25V6.25L12 3Z"
            {...stroke}
          />
          <path d="M9.25 12.1L11.1 13.9L15 10" {...stroke} />
        </svg>
      );
  }
}

/**
 * Sticky section title + naturally scrolling rows (Rogo-style).
 * `side` places the sticky head left or right.
 */
function StickyPain({
  title,
  lede,
  side = "left",
  items,
}: {
  title: string;
  lede: string;
  side?: "left" | "right";
  items: PainItem[];
}) {
  return (
    <section
      className={`fdm-sticky-pain fdm-sticky-pain--${side}`}
      aria-label={title}
    >
      <div className="fdm-sticky-pain-head">
        <h2>{title}</h2>
        <p>{lede}</p>
      </div>
      <ul className="fdm-sticky-pain-list">
        {items.map((item) => (
          <li key={item.title} className="fdm-sticky-pain-row">
            <span className="fdm-sticky-pain-icon" aria-hidden="true">
              <PainIcon kind={item.icon} />
            </span>
            <div className="fdm-sticky-pain-copy">
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SellWhat({
  items,
}: {
  items: { title: string; body: string; mark: "value" | "truth" | "fund" | "model" | "process" | "data" | "jobs" | "agents" }[];
}) {
  return (
    <div className="fdm-feature-grid">
      {items.map((item) => (
        <article key={item.title} className="fdm-feature-block">
          <div className="fdm-feature-block-copy">
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </div>
          <span className="fdm-feature-block-visual" aria-hidden="true">
            <span className="fdm-feature-block-glow" />
            <FeatureMark kind={item.mark} />
          </span>
        </article>
      ))}
    </div>
  );
}

function SellHow({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <ol className="fdm-step-rail">
      {steps.map((step, i) => (
        <li key={step.title} className="fdm-step-rail-item">
          <span className="fdm-step-rail-n" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="fdm-step-rail-copy">
            <strong>{step.title}</strong>
            <p>{step.body}</p>
          </div>
          <span className="fdm-step-rail-bar" aria-hidden="true" />
        </li>
      ))}
    </ol>
  );
}

function FeatureMark({
  kind,
}: {
  kind: "value" | "truth" | "fund" | "model" | "process" | "data" | "jobs" | "agents";
}) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  switch (kind) {
    case "value":
      return (
        <svg viewBox="0 0 64 64" className="fdm-feature-mark">
          <path d="M10 48H54" {...stroke} />
          <path d="M18 48V34" {...stroke} />
          <path d="M32 48V22" {...stroke} />
          <path d="M46 48V12" {...stroke} />
        </svg>
      );
    case "truth":
      return (
        <svg viewBox="0 0 64 64" className="fdm-feature-mark">
          <rect x="14" y="12" width="36" height="40" rx="3" {...stroke} />
          <path d="M22 26H42M22 34H38M22 42H34" {...stroke} />
        </svg>
      );
    case "fund":
      return (
        <svg viewBox="0 0 64 64" className="fdm-feature-mark">
          <path d="M18 40L28 22L36 34L46 16" {...stroke} />
          <path d="M40 16H46V22" {...stroke} />
          <path d="M14 48H50" {...stroke} />
        </svg>
      );
    case "model":
      return (
        <svg viewBox="0 0 64 64" className="fdm-feature-mark">
          <rect x="24" y="10" width="16" height="12" rx="2" {...stroke} />
          <path d="M32 22V28M16 28H48" {...stroke} />
          <rect x="10" y="28" width="14" height="12" rx="2" {...stroke} />
          <rect x="25" y="28" width="14" height="12" rx="2" {...stroke} />
          <rect x="40" y="28" width="14" height="12" rx="2" {...stroke} />
          <path d="M17 40V46M32 40V46M47 40V46" {...stroke} />
          <rect x="10" y="46" width="14" height="10" rx="2" {...stroke} />
          <rect x="25" y="46" width="14" height="10" rx="2" {...stroke} />
          <rect x="40" y="46" width="14" height="10" rx="2" {...stroke} />
        </svg>
      );
    case "process":
      return (
        <svg viewBox="0 0 64 64" className="fdm-feature-mark">
          <rect x="8" y="14" width="20" height="14" rx="2" {...stroke} />
          <rect x="36" y="36" width="20" height="14" rx="2" {...stroke} />
          <path d="M28 21H34L38 29" {...stroke} />
          <path d="M36 43H30L26 35" {...stroke} />
        </svg>
      );
    case "data":
      return (
        <svg viewBox="0 0 64 64" className="fdm-feature-mark">
          <ellipse cx="32" cy="16" rx="18" ry="7" {...stroke} />
          <path d="M14 16V28c0 3.9 8.1 7 18 7s18-3.1 18-7V16" {...stroke} />
          <path d="M14 28V40c0 3.9 8.1 7 18 7s18-3.1 18-7V28" {...stroke} />
          <path d="M14 40V48c0 3.9 8.1 7 18 7s18-3.1 18-7V40" {...stroke} />
        </svg>
      );
    case "jobs":
      return (
        <svg viewBox="0 0 64 64" className="fdm-feature-mark">
          <circle cx="22" cy="20" r="7" {...stroke} />
          <circle cx="44" cy="22" r="5" {...stroke} />
          <path d="M10 48c1.5-8 7-12 12-12s10.5 4 12 12" {...stroke} />
          <path d="M36 46c1-5 4.5-8 8-8s7 3 8 8" {...stroke} />
        </svg>
      );
    case "agents":
      return (
        <svg viewBox="0 0 64 64" className="fdm-feature-mark">
          <circle cx="18" cy="20" r="5" {...stroke} />
          <circle cx="46" cy="20" r="5" {...stroke} />
          <circle cx="32" cy="44" r="5" {...stroke} />
          <path d="M22.5 23L28 39M41.5 23L36 39M23 20H41" {...stroke} />
        </svg>
      );
  }
}

function StrategyLanding({
  onNavigate,
}: {
  onNavigate: (p: string) => void;
}) {
  return (
    <div className="fdm-subland">
      <section className="fdm-subland-hero">
        <div className="fdm-subland-hero-copy">
          <h1>
            Know where AI
            <br />
            actually moves margin.
          </h1>
          <p>
            In the AI era, capability is cheap and everywhere. What is scarce is a
            clear answer: where value accrues, who owns the outcome, and what your
            operating model becomes when the work stops needing as many people.
          </p>
          <div className="fdm-land-actions">
            <a
              className="fdm-btn fdm-btn--primary"
              href="mailto:founders@antidotetransform.com"
            >
              Talk strategy →
            </a>
            <button
              type="button"
              className="fdm-btn fdm-btn--ghost"
              onClick={() => onNavigate("work")}
            >
              See proof
            </button>
          </div>
        </div>
        <StrategyHeroVisual />
      </section>

      <StickyPain
        side="left"
        title="Why this matters now"
        lede="Bet on AI before the economics are settled, and you inherit another program that never touches the P&L."
        items={[
          {
            icon: "margin",
            title: "Demos everywhere. Margin nowhere.",
            body: "Benchmarks pass. Workflows fail. Nobody names which jobs, exceptions, and dollars move when intelligence gets cheap.",
          },
          {
            icon: "org",
            title: "The org pushes back first.",
            body: "Ignore incentives, exception ownership, and headcount metrics, and the thesis dies in the first operating review.",
          },
          {
            icon: "usecases",
            title: "Use-case lists are not strategy.",
            body: "Catalogs feel busy and safe. They do not say where value accrues, what stays human, or what to refuse this year.",
          },
        ]}
      />

      <section className="fdm-land-section">
        <div className="fdm-land-split">
          <h2>What you get</h2>
          <p>
            A decision frame you can underwrite, not a catalog of pilots.
          </p>
        </div>
        <SellWhat
          items={[
            {
              mark: "value",
              title: "Where value accrues",
              body: "Which workflows and commercial surfaces move when the task gets cheap, and which ones are theater.",
            },
            {
              mark: "truth",
              title: "What must be true",
              body: "Data, ownership, and exceptions that make the thesis real, and what still cannot be automated away.",
            },
            {
              mark: "fund",
              title: "What to fund, and refuse",
              body: "A sequenced roadmap with kill criteria, so capital goes to the few bets that change the economics.",
            },
            {
              mark: "model",
              title: "An operating model that holds",
              body: "Who owns outcomes vs. volume, how humans and agents hand off, and how success is measured after pushback.",
            },
          ]}
        />
      </section>

      <section className="fdm-land-section">
        <SectionHead
          title="How we work"
          lede="Built for people who have to decide."
        />
        <SellHow
          steps={[
            {
              title: "Map the economics",
              body: "Margin, cycle time, leakage, and who actually does the work, including the workarounds that never make the process deck.",
            },
            {
              title: "Separate capability from ownership",
              body: "What a model can do is not what you should let it own. Feasibility, risk, and P&L stay on separate planes.",
            },
            {
              title: "Design the model that holds",
              body: "Roles, exceptions, incentives, and sequencing that survive the first operating review, not just IC.",
            },
            {
              title: "Hand off a decision",
              body: "Clear next moves for diligence or transformation to ship first, with kill criteria for everything else.",
            },
          ]}
        />
      </section>

      <div className="fdm-land-work-link">
        <button
          type="button"
          className="fdm-btn fdm-btn--ghost"
          onClick={() => onNavigate("work")}
        >
          See our work →
        </button>
      </div>
    </div>
  );
}

function TransformationLanding({
  onNavigate,
}: {
  onNavigate: (p: string) => void;
}) {
  return (
    <div className="fdm-subland">
      <section className="fdm-subland-hero">
        <div className="fdm-subland-hero-copy">
          <h1>
            Your workflows,
            <br />
            redesigned for the AI era.
          </h1>
          <p>
            Autonomous background agents that do the work, with safety-first
            guardrails, evals, and production controls so they keep running when
            the chat demo would have already broken.
          </p>
          <div className="fdm-land-actions">
            <a
              className="fdm-btn fdm-btn--primary"
              href="mailto:founders@antidotetransform.com"
            >
              Talk transformation →
            </a>
            <button
              type="button"
              className="fdm-btn fdm-btn--ghost"
              onClick={() => onNavigate("work")}
            >
              See proof
            </button>
          </div>
        </div>
        <TransformHeroVisual />
      </section>

      <StickyPain
        side="right"
        title="Why this fails without us"
        lede="Programs stall for the same reasons. None of them are “the model wasn’t smart enough.”"
        items={[
          {
            icon: "process",
            title: "Chat on a broken process.",
            body: "Missing fields, reconciliations, copy-paste. A copilot next to that mess moves screenshots, not margin.",
          },
          {
            icon: "data",
            title: "Dirty data kills the demo.",
            body: "Fragmented truth, undefined fields, and the 20% that never fits the happy path. Without hygiene, production is a ticket queue.",
          },
          {
            icon: "change",
            title: "Change either boils the ocean, or never starts.",
            body: "Rip-and-replace stalls. Shadow pilots never harden. Admin hours stay on the P&L.",
          },
          {
            icon: "safety",
            title: "Nobody owns safety when agents act.",
            body: "Permissions, gates, and evals stay afterthoughts until a customer-facing action goes wrong and the program freezes.",
          },
        ]}
      />

      <section className="fdm-land-section">
        <div className="fdm-land-split">
          <h2>What you get</h2>
          <p>
            Agents that do the work in the stack you already run, with controls
            that hold when a chat demo would break.
          </p>
        </div>
        <SellWhat
          items={[
            {
              mark: "process",
              title: "Process truth",
              body: "Mining across CRM, ERP, TMS, finance, and real inboxes: bottlenecks, rework, and where margin leaks.",
            },
            {
              mark: "data",
              title: "A substrate agents can trust",
              body: "Sources of truth and field lineage cleaned before automation, so production is not a brittle spreadsheet script.",
            },
            {
              mark: "jobs",
              title: "Jobs redesigned for judgment",
              body: "People off chase-work and onto exceptions and customers. Agents own volume; the org owns outcomes.",
            },
            {
              mark: "agents",
              title: "Production agents with guardrails",
              body: "Bolted into Dynamics, Teams, ERP. Permissions, approval gates, evals, and escalation under real load.",
            },
          ]}
        />
      </section>

      <section className="fdm-land-section" id="method">
        <SectionHead
          title="How we deliver"
          lede="From process truth to production, without boiling the ocean."
        />
        <SellHow
          steps={[
            {
              title: "See the work as it runs",
              body: "Process mine the real path by role and handoff, not the SOP whiteboard.",
            },
            {
              title: "Clean data, redesign the job",
              body: "Hygiene first so agents are trustworthy. Then move humans toward judgment work.",
            },
            {
              title: "Bolt into the stack you have",
              body: "Agents on systems you already run. Thin change management where work already happens.",
            },
            {
              title: "Guardrails, harden, measure",
              body: "One thin path, prove it holds, expand on the same spine. Size EBITDA for the next wave.",
            },
          ]}
        />
        <button
          type="button"
          className="fdm-text-link"
          style={{ marginTop: 28 }}
          onClick={() => onNavigate("method")}
        >
          Full method detail →
        </button>
      </section>

      <div className="fdm-land-work-link">
        <button
          type="button"
          className="fdm-btn fdm-btn--ghost"
          onClick={() => onNavigate("work")}
        >
          See our work →
        </button>
      </div>
    </div>
  );
}

export function TransformationMethodView() {
  return (
    <div className="fdm-subland">
      <section className="fdm-land-section" style={{ borderTop: "none", paddingTop: 8 }}>
        <SectionHead
          title="Method"
          lede="From process truth to production agents, without boiling the ocean on change management."
        />
        <div className="fdm-method-blocks">
          <article>
            <strong>01 · See the work as it really runs</strong>
            <p>
              Process mining and workflow mapping across CRM, ERP, TMS, finance,
              and the inboxes people actually live in. We surface bottlenecks,
              pain points, rework loops, and where margin leaks, time-in-motion
              by role and handoff, not a workshop whiteboard.
            </p>
          </article>
          <article>
            <strong>02 · Data hygiene before agents</strong>
            <p>
              Agents fail on dirty substrates. We clean and structure the data
              paths they need: sources of truth, field definitions, lineage,
              so automation is trustworthy enough for production, not another
              brittle script on a spreadsheet.
            </p>
          </article>
          <article>
            <strong>03 · Redesign the human job</strong>
            <p>
              Move people off time-consuming manual work, data entry, hounding
              customers for missing info, reconciliation, copy-paste between
              systems, toward high-judgment, customer-facing work and reviewing
              AI output. The org keeps ownership of exceptions; agents own the
              volume.
            </p>
          </article>
          <article>
            <strong>04 · Bolt agents into the stack you have</strong>
            <p>
              Autonomous background agents sit on the existing tech stack
              (Dynamics, Teams, ERP, shared inboxes) so change management stays
              thin. We do not rip out systems to prove a thesis; we instrument
              and automate where the work already happens.
            </p>
          </article>
          <article>
            <strong>05 · Guardrails, then harden</strong>
            <p>
              Safety first: permissions, sandboxed tool calls, human-in-the-loop
              approval on customer-facing actions, evals and escalation when
              confidence drops. Ship one thin autonomous path, prove it does not
              break under load, then expand adjacent workflows on the same spine.
            </p>
          </article>
          <article>
            <strong>06 · Margin uplift through to the P&amp;L</strong>
            <p>
              Admin hours returned to billable or commercial capacity, faster
              cycle times, fewer handoff errors, recoverable leakage on
              transactional volume. We size EBITDA impact and sequence the
              roadmap so leadership can fund the next wave without re-running
              discovery, and so the P&amp;L moves, not just the slide deck.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

export function TransformationCasesView({
  onOpenStudy,
}: {
  onOpenStudy: (slug: string) => void;
}) {
  return (
    <div className="fdm-subland">
      <section className="fdm-land-section fdm-stories-section" style={{ borderTop: "none", paddingTop: 8 }}>
        <h2 className="fdm-stories-heading">Case Studies</h2>
        <CaseStudyList studies={TRANSFORMATION_CASES} onOpenStudy={onOpenStudy} />
      </section>
    </div>
  );
}

export function StrategyCasesView({
  onOpenStudy,
}: {
  onOpenStudy: (slug: string) => void;
}) {
  return (
    <div className="fdm-subland">
      <section className="fdm-land-section fdm-stories-section" style={{ borderTop: "none", paddingTop: 8 }}>
        <h2 className="fdm-stories-heading">Case Studies</h2>
        <CaseStudyList studies={STRATEGY_CASES} onOpenStudy={onOpenStudy} />
      </section>
    </div>
  );
}

export function SubsiteLanding({ site, onNavigate }: Props) {
  if (site === "strategy") {
    return <StrategyLanding onNavigate={onNavigate} />;
  }
  return <TransformationLanding onNavigate={onNavigate} />;
}
