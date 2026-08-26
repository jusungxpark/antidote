"use client";

import type { CaseStudy } from "../../components/case-studies-data";
import {
  STRATEGY_CASES,
  TRANSFORMATION_CASES,
  caseSummary,
} from "./cases";
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

function SectionHead({ title, lede }: { title: string; lede: string }) {
  return (
    <div className="fdm-section-head">
      <h2>{title}</h2>
      <p>{lede}</p>
    </div>
  );
}

function WorkRow({
  meta,
  title,
  summary,
  onClick,
}: {
  meta?: string;
  title: string;
  summary: string;
  onClick?: () => void;
}) {
  return (
    <button type="button" className="fdm-work-row" onClick={onClick}>
      {meta ? <span className="meta">{meta}</span> : null}
      <span className="body">
        <strong>{title}</strong>
        <em>{summary}</em>
      </span>
      <span className="fdm-ext">↗</span>
    </button>
  );
}

function CaseStudyList({
  studies,
  onNavigate,
}: {
  studies: CaseStudy[];
  onNavigate: (page: string) => void;
}) {
  return (
    <div className="fdm-work-list">
      {studies.map((study) => (
        <WorkRow
          key={study.slug}
          title={study.title}
          summary={caseSummary(study)}
          onClick={() => onNavigate("work")}
        />
      ))}
    </div>
  );
}

function SellPain({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <ul className="fdm-sell-pain">
      {items.map((item) => (
        <li key={item.title}>
          <strong>{item.title}</strong>
          <p>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

function SellWhat({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <div className="fdm-sell-what">
      {items.map((item) => (
        <article key={item.title}>
          <strong>{item.title}</strong>
          <p>{item.body}</p>
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
    <ul className="fdm-sell-how">
      {steps.map((step) => (
        <li key={step.title}>
          <strong>{step.title}</strong>
          <p>{step.body}</p>
        </li>
      ))}
    </ul>
  );
}

function StrategyLanding({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div className="fdm-subland">
      <section className="fdm-subland-hero">
        <div className="fdm-subland-hero-copy">
          <p className="fdm-kicker">Strategy</p>
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

      <section className="fdm-land-section">
        <SectionHead
          title="Why this matters now"
          lede="Sponsors and operators are being asked to bet on AI before the economics are settled, and after a decade of digital programs that never touched the P&L."
        />
        <SellPain
          items={[
            {
              title: "Every vendor can demo the task. Few can name the margin.",
              body: "Models pass benchmarks and fail your workflow. Tool roadmaps pile up features while nobody can say which jobs, which exceptions, and which dollars move when intelligence gets cheap.",
            },
            {
              title: "Your org will push back on the first real change.",
              body: "A thesis that ignores incentives, ownership of exceptions, and who still gets measured on headcount dies in the first operating review, no matter how good the slide deck looked in diligence.",
            },
            {
              title: "“AI strategy” often means a list of use cases.",
              body: "Use-case catalogs feel busy and safe. They do not answer where value accrues, what must stay human, or what you should refuse to fund this year.",
            },
          ]}
        />
      </section>

      <section className="fdm-land-section">
        <div className="fdm-land-split">
          <h2>What you get</h2>
          <div>
            <p>
              A point of view you can underwrite before capital is committed,
              and an operating model that still holds after the org pushes back.
            </p>
            <p>
              Not a catalog of pilots. A decision frame for sponsors and operators
              who have to live with the answer.
            </p>
          </div>
        </div>
        <SellWhat
          items={[
            {
              title: "Where value accrues",
              body: "Which workflows, roles, and commercial surfaces move when the task gets cheap, and which ones are theater.",
            },
            {
              title: "What must be true",
              body: "The assumptions that make the thesis real: data, ownership, exception handling, and what still cannot be automated away.",
            },
            {
              title: "What to fund, and refuse",
              body: "A sequenced roadmap with kill criteria, so capital and attention go to the few bets that change the economics.",
            },
            {
              title: "An operating model that survives contact",
              body: "Who owns outcomes vs. volume, how humans and agents hand off, and how the org measures success after the first wave of resistance.",
            },
          ]}
        />
      </section>

      <section className="fdm-land-section">
        <SectionHead
          title="How we work"
          lede="Written for people who have to decide, not for another workshop that produces sticky notes."
        />
        <SellHow
          steps={[
            {
              title: "Map the economics, not the org chart",
              body: "Start from margin, cycle time, leakage, and who actually does the work today, including the inboxes and workarounds that never show up in the process deck.",
            },
            {
              title: "Separate capability from ownership",
              body: "What a model can do is not the same as what you should let it own. We keep feasibility, risk, and P&L impact on separate planes so the recommendation stays honest.",
            },
            {
              title: "Design the operating model that holds",
              body: "Roles, exceptions, incentives, and sequencing, so the answer survives the first operating review, not just the investment committee.",
            },
            {
              title: "Hand off a decision, not a backlog",
              body: "Clear next moves for diligence questions worth paying for, or for transformation to ship first, with kill criteria for everything else.",
            },
          ]}
        />
      </section>

      <section className="fdm-land-section">
        <SectionHead
          title="Case studies"
          lede="Strategy work with operators, digital strategy, GTM, and operating-model redesign under real constraints."
        />
        <CaseStudyList studies={STRATEGY_CASES} onNavigate={onNavigate} />
      </section>

      <section className="fdm-land-cta">
        <div>
          <h2>Bring the thesis. We’ll pressure-test where AI actually pays.</h2>
          <p>
            Pre-close investment questions or post-close sequencing, same standard:
            economics first, operating model that survives the org.
          </p>
        </div>
        <a
          className="fdm-btn fdm-btn--primary"
          href="mailto:founders@antidotetransform.com"
        >
          founders@antidotetransform.com
        </a>
      </section>
    </div>
  );
}

function TransformationLanding({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div className="fdm-subland">
      <section className="fdm-subland-hero">
        <div className="fdm-subland-hero-copy">
          <p className="fdm-kicker">Transformation</p>
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

      <section className="fdm-land-section">
        <SectionHead
          title="Why this fails without us"
          lede="Most AI programs stall for the same reasons, and none of them are “the model wasn’t smart enough.”"
        />
        <SellPain
          items={[
            {
              title: "You’re bolting chat onto a broken process.",
              body: "People still chase missing fields, reconcile across systems, and copy-paste between tools. A copilot next to that mess does not move margin. It moves screenshots.",
            },
            {
              title: "The demo dies on dirty data and exceptions.",
              body: "Agents fail on fragmented sources of truth, undefined fields, and the 20% of cases that never fit the happy path. Without hygiene and escalation, production becomes a ticket queue.",
            },
            {
              title: "Change management boils the ocean, or never starts.",
              body: "Rip-and-replace stalls for years. Shadow IT pilots never harden. Meanwhile admin hours stay on the P&L and leadership loses patience with “AI transformation.”",
            },
            {
              title: "Nobody owns safety when the agent acts.",
              body: "Permissions, approval gates, sandboxed tools, and evals are afterthoughts, until a customer-facing action goes wrong and the program gets frozen.",
            },
          ]}
        />
      </section>

      <section className="fdm-land-section">
        <div className="fdm-land-split">
          <h2>What you get</h2>
          <div>
            <p>
              Workflows redesigned for the AI era: agents that do the work
              end-to-end inside the stack you already run, with safety-first
              controls so they keep running when a chat demo would have already
              broken.
            </p>
            <p>
              The outcome is not another pilot. It is cycle time, fewer handoff
              errors, and admin hours returned to capacity you can see on the
              P&amp;L.
            </p>
          </div>
        </div>
        <SellWhat
          items={[
            {
              title: "Process truth, not workshop fiction",
              body: "Mining and mapping across CRM, ERP, TMS, finance, and the inboxes people actually live in, bottlenecks, rework, and where margin leaks.",
            },
            {
              title: "A substrate agents can trust",
              body: "Sources of truth, field definitions, and lineage cleaned before automation, so production is not another brittle script on a spreadsheet.",
            },
            {
              title: "Human jobs redesigned around judgment",
              body: "People off data entry and chase-work; onto exceptions, customers, and reviewing AI. Agents own volume; the org owns outcomes.",
            },
            {
              title: "Production agents with guardrails",
              body: "Bolted into Dynamics, Teams, ERP, shared inboxes, permissions, approval gates, evals, and escalation that hold under real load.",
            },
          ]}
        />
      </section>

      <section className="fdm-land-section" id="method">
        <SectionHead
          title="How we deliver"
          lede="From process truth to production agents, without boiling the ocean on change management."
        />
        <SellHow
          steps={[
            {
              title: "See the work as it really runs",
              body: "Process mine and map the real path, time-in-motion by role and handoff, not a whiteboard of how the SOP says it should work.",
            },
            {
              title: "Clean the data path, then redesign the job",
              body: "Hygiene first so agents are trustworthy. Then move humans off manual volume toward judgment and customer work.",
            },
            {
              title: "Bolt agents into the stack you have",
              body: "Autonomous background agents on the systems you already run. Thin change management, instrument and automate where work already happens.",
            },
            {
              title: "Guardrails, harden, measure the P&L",
              body: "Ship one thin autonomous path, prove it holds under load, expand on the same spine. Size EBITDA impact so leadership can fund the next wave.",
            },
          ]}
        />
        <button
          type="button"
          className="fdm-text-link"
          style={{ marginTop: 22 }}
          onClick={() => onNavigate("method")}
        >
          Full method detail →
        </button>
      </section>

      <section className="fdm-land-section">
        <SectionHead
          title="Case studies"
          lede="Delivery inside operators, process mining, automation, and agents that had to survive production."
        />
        <CaseStudyList studies={TRANSFORMATION_CASES} onNavigate={onNavigate} />
      </section>

      <section className="fdm-land-cta">
        <div>
          <h2>Ready for agents that operate, not just chat?</h2>
          <p>
            Bring the workflow that still runs on people. We’ll find the thin path
            that can own volume safely, then harden it until the P&amp;L moves.
          </p>
        </div>
        <a
          className="fdm-btn fdm-btn--primary"
          href="mailto:founders@antidotetransform.com"
        >
          founders@antidotetransform.com
        </a>
      </section>
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
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  return (
    <div className="fdm-subland">
      <section className="fdm-land-section" style={{ borderTop: "none", paddingTop: 8 }}>
        <SectionHead
          title="Case Studies"
          lede="Transformation delivery from the Antidote book, process mining, automation, and production agents."
        />
        <CaseStudyList studies={TRANSFORMATION_CASES} onNavigate={onNavigate} />
      </section>
    </div>
  );
}

export function StrategyCasesView({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  return (
    <div className="fdm-subland">
      <section className="fdm-land-section" style={{ borderTop: "none", paddingTop: 8 }}>
        <SectionHead
          title="Case Studies"
          lede="Strategy engagements from the Antidote book, digital strategy, GTM, and operating-model work."
        />
        <CaseStudyList studies={STRATEGY_CASES} onNavigate={onNavigate} />
      </section>
    </div>
  );
}

export function SubsiteLanding({ site, onNavigate }: Props) {
  if (site === "strategy") return <StrategyLanding onNavigate={onNavigate} />;
  return <TransformationLanding onNavigate={onNavigate} />;
}
