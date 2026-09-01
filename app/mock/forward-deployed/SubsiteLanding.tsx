"use client";

import type { CaseStudy } from "../../components/case-studies-data";
import dynamic from "next/dynamic";
import {
  STRATEGY_CASES,
  TRANSFORMATION_CASES,
} from "./cases";
import { FdCaseStoryCards } from "./FdCaseStories";

const StrategyHeroVisual = dynamic(
  () => import("./media-heroes").then((m) => m.StrategyHeroVisual),
  { ssr: false },
);

const TransformHeroVisual = dynamic(
  () => import("./media-heroes").then((m) => m.TransformHeroVisual),
  { ssr: false },
);

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

function SectionHead({
  prefix,
  kicker,
  title,
  lede,
}: {
  prefix?: string;
  kicker?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className={`fdm-section-head${lede ? "" : " fdm-section-head--solo"}`}>
      <div>
        {kicker ? <p className="fdm-kicker">{kicker}</p> : null}
        <h2>
          {prefix ? <span className="fdm-section-prefix">{prefix}</span> : null}
          {title}
        </h2>
      </div>
      {lede ? <p>{lede}</p> : null}
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
  items: { title: string; body: string; mark: FeatureKind }[];
}) {
  return (
    <div className="fdm-feature-grid">
      {items.map((item) => (
        <article
          key={item.title}
          className={`fdm-feature-block fdm-feature-block--${item.mark}`}
        >
          <div className="fdm-feature-block-copy">
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </div>
          <FeatureVisual kind={item.mark} />
        </article>
      ))}
    </div>
  );
}

function LevelSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: { title: string; body: string; mark: FeatureKind }[];
}) {
  return (
    <section
      className="fdm-land-section fdm-land-section--level fdm-level"
      id={id}
    >
      <div className="fdm-level-name">
        <p className="fdm-section-prefix">Strategy for</p>
        <h2>{title}</h2>
        <ol className="fdm-level-index" aria-label={`${title} questions`}>
          {items.map((item, i) => (
            <li key={item.title}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {item.title}
            </li>
          ))}
        </ol>
      </div>
      <SellWhat items={items} />
    </section>
  );
}

function SellHow({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <ol className="fdm-step-rail">
      {steps.map((step) => (
        <li key={step.title} className="fdm-step-rail-item">
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

type FeatureKind =
  | "value"
  | "truth"
  | "fund"
  | "model"
  | "process"
  | "data"
  | "jobs"
  | "agents"
  | "allocation"
  | "moat"
  | "exposure"
  | "replicate"
  | "rebuild"
  | "sector"
  | "threat"
  | "ic"
  | "mix"
  | "handoff"
  | "thinpath";

/** Enterprise mini-panels for What you get — not icon placeholders. */
function FeatureVisual({ kind }: { kind: FeatureKind }) {
  switch (kind) {
    case "value":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--value" aria-hidden="true">
          <header>
            <span>Value barbell</span>
            <span>Exhibit</span>
          </header>
          <div className="fdm-feat-barbell">
            <div>
              <strong>Infra</strong>
              <em>Compute</em>
            </div>
            <div className="is-squeeze">
              <strong>Tools</strong>
              <em>Squeezed</em>
            </div>
            <div className="is-hold">
              <strong>Outcomes</strong>
              <em>The client</em>
            </div>
          </div>
        </div>
      );
    case "truth":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--truth" aria-hidden="true">
          <header>
            <span>Must be true</span>
            <span>IC</span>
          </header>
          <ul className="fdm-feat-checks">
            <li data-state="ok">Data owned</li>
            <li data-state="ok">Exceptions named</li>
            <li data-state="open">Still human</li>
            <li data-state="flag">Unproven</li>
          </ul>
        </div>
      );
    case "fund":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--fund" aria-hidden="true">
          <header>
            <span>Roadmap</span>
            <span>Sequenced</span>
          </header>
          <ul className="fdm-feat-fund">
            <li data-tone="fund">
              <strong>Fund</strong>
              <em>First thin path</em>
            </li>
            <li data-tone="hold">
              <strong>Hold</strong>
              <em>Needs evidence</em>
            </li>
            <li data-tone="kill">
              <strong>Refuse</strong>
              <em>Kill criteria</em>
            </li>
          </ul>
        </div>
      );
    case "model":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--model" aria-hidden="true">
          <header>
            <span>Operating model</span>
            <span>Holds</span>
          </header>
          <div className="fdm-feat-model">
            <div>
              <strong>Agents</strong>
              <em>Volume</em>
            </div>
            <span aria-hidden="true" />
            <div>
              <strong>Humans</strong>
              <em>Outcomes</em>
            </div>
            <div className="fdm-feat-model-foot">Incentives · exceptions · review</div>
          </div>
        </div>
      );
    case "process":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--process" aria-hidden="true">
          <header>
            <span>Process mine</span>
            <span>Live path</span>
          </header>
          <div className="fdm-feat-flow">
            <div>
              <strong>CRM</strong>
              <em>12m</em>
            </div>
            <i />
            <div>
              <strong>Inbox</strong>
              <em>41m</em>
            </div>
            <i />
            <div className="is-leak">
              <strong>ERP</strong>
              <em>Leak</em>
            </div>
            <span className="fdm-feat-cursor" />
          </div>
          <p className="fdm-feat-note">Bottleneck · rework · handoff</p>
        </div>
      );
    case "data":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--data" aria-hidden="true">
          <header>
            <span>Substrate</span>
            <span>Clean</span>
          </header>
          <ul className="fdm-feat-fields">
            <li>
              <strong>customer_id</strong>
              <span data-tone="ok">Canonical</span>
            </li>
            <li>
              <strong>invoice_status</strong>
              <span data-tone="ok">Mapped</span>
            </li>
            <li>
              <strong>owner_queue</strong>
              <span data-tone="open">Lineage</span>
            </li>
            <li>
              <strong>exception_code</strong>
              <span data-tone="flag">Defined</span>
            </li>
          </ul>
        </div>
      );
    case "jobs":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--jobs" aria-hidden="true">
          <header>
            <span>Job redesign</span>
            <span>Shift</span>
          </header>
          <div className="fdm-feat-jobs">
            <div>
              <span>Before</span>
              <strong>Chase work</strong>
              <em>Copy · reconcile · chase</em>
            </div>
            <div className="is-after">
              <span>After</span>
              <strong>Judgment</strong>
              <em>Exceptions · customers</em>
            </div>
          </div>
        </div>
      );
    case "agents":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--agents" aria-hidden="true">
          <header>
            <span>Production agent</span>
            <span className="fdm-feat-live">Live</span>
          </header>
          <ul className="fdm-feat-agent">
            <li>
              <strong>Stack</strong>
              <em>Dynamics · Teams · ERP</em>
            </li>
            <li>
              <strong>Gates</strong>
              <em>Permission · approval</em>
            </li>
            <li>
              <strong>Evals</strong>
              <em>Hold under load</em>
            </li>
            <li>
              <strong>Escalation</strong>
              <em>Human on exception</em>
            </li>
          </ul>
        </div>
      );
    case "allocation":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--allocation" aria-hidden="true">
          <header>
            <span>Check allocation</span>
            <span>Fund</span>
          </header>
          <div className="fdm-feat-capstack">
            <div className="is-enter" style={{ ["--h" as string]: "92%" }}>
              <i />
              <strong>Enter</strong>
              <em>Incumbent</em>
            </div>
            <div style={{ ["--h" as string]: "54%" }}>
              <i />
              <strong>Watch</strong>
              <em>Named buyer</em>
            </div>
            <div className="is-pass" style={{ ["--h" as string]: "28%" }}>
              <i />
              <strong>Pass</strong>
              <em>Labor only</em>
            </div>
          </div>
        </div>
      );
    case "moat":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--moat" aria-hidden="true">
          <header>
            <span>Defensibility</span>
            <span>Asset</span>
          </header>
          <div className="fdm-feat-rings">
            <svg viewBox="0 0 220 118" aria-hidden="true">
              <ellipse className="is-out" cx="110" cy="60" rx="96" ry="46" />
              <ellipse className="is-mid" cx="110" cy="60" rx="62" ry="30" />
              <ellipse className="is-in" cx="110" cy="60" rx="30" ry="15" />
            </svg>
            <ul>
              <li data-ring="out">Replicable workflow</li>
              <li data-ring="mid">System of record</li>
              <li data-ring="in">Relationships · license</li>
            </ul>
          </div>
        </div>
      );
    case "exposure":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--exposure" aria-hidden="true">
          <header>
            <span>Friction screen</span>
            <span>Sector</span>
          </header>
          <div className="fdm-feat-spectrum">
            <div className="fdm-feat-spectrum-labels">
              <span>Doing</span>
              <span>Owning</span>
            </div>
            <div className="fdm-feat-spectrum-track">
              <b />
            </div>
            <p>Load-bearing: owning-friction</p>
          </div>
        </div>
      );
    case "replicate":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--replicate" aria-hidden="true">
          <header>
            <span>Who can capture it</span>
            <span>M&A</span>
          </header>
          <table className="fdm-feat-matrix">
            <thead>
              <tr>
                <th />
                <th>Startup</th>
                <th>Incumbent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Client</th>
                <td data-cell="no" />
                <td data-cell="yes" />
              </tr>
              <tr>
                <th>Humans</th>
                <td data-cell="no" />
                <td data-cell="yes" />
              </tr>
              <tr>
                <th>Workflow</th>
                <td data-cell="yes" />
                <td data-cell="yes" />
              </tr>
            </tbody>
          </table>
        </div>
      );
    case "rebuild":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--rebuild" aria-hidden="true">
          <header>
            <span>Rebuild path</span>
            <span>Gen 2</span>
          </header>
          <div className="fdm-feat-layers">
            <div>
              <span>Bolt on</span>
              <b>Agent overlay</b>
              <b className="is-mess">Legacy ERP</b>
              <b className="is-mess">Workarounds</b>
            </div>
            <div className="is-native">
              <span>Rebuild</span>
              <b>Agents</b>
              <b>Owned system of record</b>
              <b>Clean data</b>
            </div>
          </div>
        </div>
      );
    case "sector":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--sector" aria-hidden="true">
          <header>
            <span>Sector test</span>
            <span>Must hold</span>
          </header>
          <ul className="fdm-feat-stamps">
            <li data-stamp="hold">
              <span>Hold</span>
              <strong>License</strong>
            </li>
            <li data-stamp="hold">
              <span>Hold</span>
              <strong>Liability</strong>
            </li>
            <li data-stamp="shut">
              <span>Shut</span>
              <strong>Labor only</strong>
            </li>
          </ul>
        </div>
      );
    case "threat":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--threat" aria-hidden="true">
          <header>
            <span>P&L split</span>
            <span>Exposure</span>
          </header>
          <div className="fdm-feat-pnl">
            <div>
              <span>Doing</span>
              <div className="fdm-feat-pnl-col">
                <i className="is-fade" />
              </div>
              <em>Threatened</em>
            </div>
            <div>
              <span>Owning</span>
              <div className="fdm-feat-pnl-col">
                <i className="is-hold" />
              </div>
              <em>Holds</em>
            </div>
          </div>
        </div>
      );
    case "ic":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--ic" aria-hidden="true">
          <header>
            <span>Open questions</span>
            <span>IC</span>
          </header>
          <ul className="fdm-feat-claims">
            <li>
              <strong>Data owned</strong>
              <span data-tone="ok">Proven</span>
            </li>
            <li>
              <strong>Exceptions named</strong>
              <span data-tone="ok">Named</span>
            </li>
            <li>
              <strong>Still human</strong>
              <span data-tone="open">Open</span>
            </li>
            <li>
              <strong>Moat</strong>
              <span data-tone="flag">Unproven</span>
            </li>
          </ul>
        </div>
      );
    case "mix":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--mix" aria-hidden="true">
          <header>
            <span>Work mix</span>
            <span>Job</span>
          </header>
          <div className="fdm-feat-mix">
            <div className="fdm-feat-mix-bar">
              <i className="is-chase">Chase</i>
              <i className="is-judge">Judgment</i>
            </div>
            <div className="fdm-feat-mix-key">
              <span>Leaves the job</span>
              <span>Stays human</span>
            </div>
          </div>
        </div>
      );
    case "handoff":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--handoff" aria-hidden="true">
          <header>
            <span>Operating model</span>
            <span>Holds</span>
          </header>
          <ol className="fdm-feat-handoff">
            <li>
              <strong>Agents</strong>
              <em>Volume</em>
            </li>
            <li className="is-gate">
              <strong>Gate</strong>
              <em>Permission</em>
            </li>
            <li>
              <strong>Humans</strong>
              <em>Outcomes</em>
            </li>
          </ol>
        </div>
      );
    case "thinpath":
      return (
        <div className="fdm-feat-panel fdm-feat-panel--thinpath" aria-hidden="true">
          <header>
            <span>Sequence</span>
            <span>Thin path</span>
          </header>
          <ol className="fdm-feat-path">
            <li className="is-now">
              <b />
              <strong>Ship</strong>
              <em>First path</em>
            </li>
            <li>
              <b />
              <strong>Prove</strong>
              <em>Holds under load</em>
            </li>
            <li className="is-off">
              <b />
              <strong>Refuse</strong>
              <em>Until economics</em>
            </li>
          </ol>
        </div>
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
      <section className="fdm-subland-hero fdm-subland-hero--strat">
        <div className="fdm-subland-hero-copy">
          <h1>
            Strategy for the fund,
            <br />
            the asset, and the company.
          </h1>
          <p>
            Capability is cheap. What is scarce is matching the artifact to the
            decision: where a PE firm puts capital in the AI era, whether a
            named asset holds, and how an owned company rebuilds AI-native.
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
              See our work
            </button>
          </div>
        </div>
        <StrategyHeroVisual />
      </section>

      <StickyPain
        side="left"
        title="Why this matters now"
        lede="Three different decisions get flattened into one AI memo. The fund, the named asset, and the company already owned need different artifacts."
        items={[
          {
            icon: "margin",
            title: "The fund is treated like a sector tag.",
            body: "A list of verticals is not an allocation. It does not say where value accrues when intelligence is cheap, what to enter, or what to pass.",
          },
          {
            icon: "safety",
            title: "A demo is treated as defensibility.",
            body: "Capability is not a moat. On a named asset the question is whether relationships, license, and liability still hold when the workflow is replicable.",
          },
          {
            icon: "change",
            title: "Copilot seats are treated as a rebuild.",
            body: "A use-case catalog is not a plan for an owned company. It does not say what is automatable, what stays human, or how to rebuild AI-native.",
          },
        ]}
      />

      <LevelSection
        id="investment"
        title="Investment"
        items={[
          {
            mark: "value",
            title: "Where value accrues",
            body: "When the task gets cheap, margin moves to whoever owns the outcome, not to the model. Which commercial surfaces hold, and which ones are theater.",
          },
          {
            mark: "exposure",
            title: "Doing-friction vs owning-friction",
            body: "Labor, expertise, and tooling get abolished. Trust, license, liability, and blame-offload do not. The screen is which reason is load-bearing in the sector.",
          },
          {
            mark: "allocation",
            title: "Where the check goes",
            body: "Enter where incumbency is the moat. Pass labor-only businesses. Watch anything that still needs a named buyer before it is a fund bet.",
          },
          {
            mark: "sector",
            title: "What must be true of the sector",
            body: "Owning-friction has to be load-bearing. License, liability, and a buyer who still pays for outcome ownership after the task is cheap.",
          },
        ]}
      />

      <LevelSection
        id="asset"
        title="Asset"
        items={[
          {
            mark: "moat",
            title: "What still defends it",
            body: "Customer relationships, license, liability, and the system of record. Separate those from workflows that a well-run newcomer can replicate.",
          },
          {
            mark: "threat",
            title: "What AI actually threatens",
            body: "Split the P&L into work that was hard to do and work that was hard to own. Only the second still prices like a durable service.",
          },
          {
            mark: "replicate",
            title: "Who can capture it",
            body: "Startups stall without the client and the licensed humans. Incumbents already have both. The strategic question is whether this asset is the one to buy.",
          },
          {
            mark: "ic",
            title: "What IC still needs answered",
            body: "Open questions stay on their own plane: data owned, exceptions named, what must stay human, and what is still unproven. Not buried in a capability slide.",
          },
        ]}
      />

      <LevelSection
        id="portco"
        title="Portfolio"
        items={[
          {
            mark: "mix",
            title: "What is automatable",
            body: "Chase work, reconciliation, and copy-paste leave the human job. Exceptions, customers, and outcome ownership stay. Name the split before a single seat is bought.",
          },
          {
            mark: "rebuild",
            title: "How to rebuild AI-native",
            body: "Overlaying models on a broken system of record plateaus. The strategy is a clean rebuild on owned infrastructure, not a copilot next to the mess.",
          },
          {
            mark: "handoff",
            title: "An operating model that holds",
            body: "Who owns outcomes versus volume, how humans and agents hand off, and how success is measured after the first operating review.",
          },
          {
            mark: "thinpath",
            title: "What to sequence first",
            body: "A thin path with kill criteria. Transformation inherits the sequence. Everything else stays refused until the economics of the first path are real.",
          },
        ]}
      />

      <section className="fdm-land-section">
        <SectionHead
          title="How we work"
          lede="The artifact matches the altitude. Diligence and Transformation pick up from a decision, not from a use-case list."
        />
        <SellHow
          steps={[
            {
              title: "Set the fund altitude",
              body: "Where value accrues in the sector, what to enter or pass, and where a check should actually go.",
            },
            {
              title: "Underwrite the named asset",
              body: "Defensibility, AI exposure, and who can capture it. Open IC questions stay visible, not folded into a demo.",
            },
            {
              title: "Design the rebuild",
              body: "For the company under ownership: what is automatable, the operating model that holds, and the first thin path to rebuild AI-native.",
            },
          ]}
        />
      </section>

      <div className="fdm-land-work-link">
        <button
          type="button"
          className="fdm-work-banner"
          onClick={() => onNavigate("work")}
        >
          <span>See our work</span>
          <span aria-hidden="true">→</span>
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
              See our work
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
            title: "Fragmented data is not a substrate.",
            body: "Without shared definitions, field lineage, and hygiene, agents have nothing trustworthy to act on. Production becomes a ticket queue before the model ever fails.",
          },
          {
            icon: "change",
            title: "Change either boils the ocean, or never starts.",
            body: "Rip-and-replace stalls. Shadow pilots never harden. Admin hours stay on the P&L.",
          },
          {
            icon: "safety",
            title: "Nobody owns safety when agents act.",
            body: "Liability lands on the operator when an agent acts without clear ownership. Permissions, gates, and evals stay afterthoughts until a customer-facing action goes wrong and the program freezes.",
          },
        ]}
      />

      <section className="fdm-land-section fdm-land-section--connect">
        <div className="fdm-section-connector">
          <span className="fdm-section-connector-rule" aria-hidden="true" />
          <p>
            From those failure modes into production: process truth, a clean
            substrate, jobs rebuilt for judgment, and agents with guardrails that
            hold in the stack you already run.
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
        <SectionHead title="How we deliver" />
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
          className="fdm-work-banner"
          onClick={() => onNavigate("work")}
        >
          <span>See our work</span>
          <span aria-hidden="true">→</span>
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
