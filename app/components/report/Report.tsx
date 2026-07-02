// ============================================================
// THE OUTREACH REPORT — one component, two variants.
//   variant="portco" → antidotetransform.com/[company-name]
//   variant="pe"     → antidotetransform.com/pe/[company-name]
//
// Everything FIXED lives here + in data/sectors/[sector].json.
// Everything PER-FIRM comes from data/companies/[slug].json.
// Amber tags render wherever templateMode=true in company JSON
// — they mark exactly what changes per send. Set false to ship.
// ============================================================

import type { ReactNode } from "react";
import SectorMap from "./charts/SectorMap";
import OperatorBenchmark from "./charts/OperatorBenchmark";
import WorkflowMap from "./charts/WorkflowMap";
import MarginBridge from "./charts/MarginBridge";
import { AntidoteWordmarkLabel } from "../AntidoteWordmark";
import {
  ChartSourceBlock,
  SourceCitation,
  type SourceBlock,
} from "./ReportSources";

function Hint({ show, children }: { show: boolean; children: ReactNode }) {
  if (!show) return null;
  return <span className="hint">⟵ {children}</span>;
}

export default function Report({
  sector,
  company,
  variant,
}: {
  sector: any;
  company: any;
  variant: "portco" | "pe";
}) {
  const isPE = variant === "pe";
  const hints = !!company.templateMode;
  const name = company.name;
  const sourceBlocks = (sector.sourceBlocks ?? {}) as Record<string, SourceBlock>;
  const plansPerFte =
    company.fte > 0 ? Math.round(company.plans / company.fte) : null;

  return (
    <main className="page">
      {/* ---------- masthead ---------- */}
      <header className="masthead">
        <div className="masthead-brand">
          <a className="wordmark" href="https://antidotetransform.com">
            <AntidoteWordmarkLabel />
          </a>
          <span className="masthead-sep" aria-hidden="true">
            ×
          </span>
          <span className="masthead-client">{name}</span>
          <Hint show={hints}>company JSON: name</Hint>
        </div>
      </header>

      {/* ================= 01 — THE HOOK [CUSTOM] ================= */}
      <section className="section">
        <h1>
          {isPE ? (
            <>The margin opportunity inside {name}.</>
          ) : (
            <>How {name} compares to other retirement TPAs.</>
          )}
          <Hint show={hints}>headline: firm name + variant framing</Hint>
        </h1>
        <p className="lede">
          {isPE ? (
            <>
              Most TPAs run 40-60 plans per administrator at 15-20% EBITDA.
              Firms on integrated platforms often reach 100-140 plans per
              administrator at margins above 30%. Form 5500 preparer counts and
              public headcount data place {name} below the modern-stack band.
              Closing that gap raises revenue per employee as plan volume grows
              without adding staff in proportion.
            </>
          ) : (
            <>
              Most TPAs run 40-60 plans per administrator. Firms on integrated
              platforms report 100-140; top quartile exceeds 200. The gap is
              mainly process and systems, not team quality. The opportunity is
              higher revenue per employee, not headcount cuts.
            </>
          )}
        </p>

        <div className="chart-block">
          <div className="chart-title">
            {isPE
              ? `${name} vs. sector productivity benchmarks (EBITDA implications)`
              : `${name} vs. sector productivity benchmarks`}
          </div>
          <div className="chart-sub">
            each dot = one TPA firm · plans administered vs. plans per FTE
            <Hint show={hints}>their dot: plans + fte from 5500 pull × LinkedIn</Hint>
          </div>
          <div className="chart-frame">
            <OperatorBenchmark
              peers={sector.benchmark.peers}
              bands={sector.benchmark.bands}
              ebitdaStrip={sector.benchmark.ebitdaStrip}
              company={{ label: name, plans: company.plans, fte: company.fte }}
              variant={variant}
            />
          </div>
          <ChartSourceBlock
            links={sourceBlocks.benchmark?.links ?? []}
            suffix={sourceBlocks.benchmark?.suffix}
            prefix="Sources"
          />
        </div>
      </section>

      {/* ================= 02 — THE SECTOR [FIXED] ================= */}
      <section className="section">
        <h2>
          Work that used to require large back-office teams can now be handled
          by software.
        </h2>
        <h3 className="report-subhead">
          For retirement TPAs, the main effect is margin, not lost clients.
        </h3>
        <div className="measure">
          <p>
            Outsourced work falls into two categories. In cost-driven
            outsourcing, vendors compete on labor; when automation lowers cost,
            fees get pressured. In structural outsourcing, clients cannot or
            will not bring the work in-house and retain liability; fees hold up
            better as delivery gets cheaper.
          </p>
          <p>
            Retirement plan administration is mostly structural. ERISA exposure
            stays with the sponsor; advisors control distribution; fees are
            per-plan, not hourly; and new entrants rarely win on price without
            a compliance record. When delivery cost drops and revenue per plan
            holds, margins widen faster than in most B2B services. Operators
            should target higher revenue per employee: grow the book and meet
            new regulatory work without hiring at the same pace.
          </p>
        </div>
        <blockquote>
          Clients pay for fiduciary and administrative capacity, not manual
          hours. Firms that automate delivery while keeping the same service
          scope run more plans per person and keep most of the savings.
        </blockquote>

        <div className="chart-block">
          <div className="chart-title">
            Retirement TPA: automatable delivery, protected fees
          </div>
          <div className="chart-sub">
            B2B services sectors · share of work automatable vs. fee
            defensibility
          </div>
          <div className="chart-frame">
            <SectorMap
              points={sector.sectorMap.points}
              highlight={sector.id}
            />
          </div>
          <ChartSourceBlock
            links={sourceBlocks.sectorMap?.links ?? []}
            suffix={sourceBlocks.sectorMap?.suffix}
            prefix="Source"
          />
        </div>
      </section>

      {/* ================= 03 — THE EVIDENCE [FIXED] ================= */}
      <section className="section">
        <h3 className="report-subhead">Sector data points</h3>
        <ul className="evidence-compact">
          {sector.evidence.map((e: any, i: number) => (
            <li key={i}>
              <p className="claim">{e.claim}</p>
              <SourceCitation
                links={
                  e.sources ??
                  (e.source && e.sourceUrl
                    ? [{ label: e.source, url: e.sourceUrl }]
                    : [])
                }
              />
            </li>
          ))}
        </ul>
      </section>

      {/* ================= 04 — SECTOR OPERATING MODEL [FIXED + PUBLIC SIZING] ================= */}
      <section className="section">
        <h2>
          Sector operating model and public sizing for {name}
        </h2>
        <div className="measure">
          {(sector.operatingContext?.paragraphs ?? []).map(
            (paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            )
          )}
          <p>
            Form 5500 preparer counts and public headcount data suggest{" "}
            {name} administers roughly {company.plans.toLocaleString()} plans
            with {company.fte} staff reported
            {plansPerFte != null ? (
              <>
                {" "}
                (about {plansPerFte} plans per administrator, against a 40-60
                industry baseline and 100-140 modern-stack range in the chart
                above)
              </>
            ) : null}
            . This positions the firm on the productivity benchmark only. It
            does not reflect verified knowledge of internal systems, hiring
            plans, or operating maturity.
            <Hint show={hints}>company JSON: plans + fte from 5500 pull × LinkedIn</Hint>
          </p>
        </div>

        <div className="chart-block">
          <div className="chart-title">
            Typical TPA cost base by workflow
          </div>
          <div className="chart-sub">
            bar length = share of staff time · color = automation ceiling ·
            sector-typical LMM TPA
          </div>
          <div className="chart-frame" style={{ padding: "22px 26px 18px" }}>
            <WorkflowMap
              rows={sector.workflows.rows}
              scaleMax={sector.workflows.scaleMax}
            />
          </div>
          <ChartSourceBlock
            links={sourceBlocks.workflows?.links ?? []}
            suffix={sourceBlocks.workflows?.suffix}
          />
        </div>
      </section>

      {/* ================= 05 — THE MOVE [SEMI-FIXED] ================= */}
      <section className="section">
        <h2>
          {isPE
            ? "Value-creation sequence we use in TPA"
            : "Operating sequence we use in TPA"}
        </h2>
        {sector.operatingSequence?.intro ? (
          <p className="measure">{sector.operatingSequence.intro}</p>
        ) : null}
        <div className="sequence-list">
          {(sector.operatingSequence?.steps ?? []).map(
            (step: { title: string; body: string }, i: number) => (
              <div className="sequence-item" key={i}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            )
          )}
        </div>
        {sector.operatingSequence?.caveat ? (
          <p className="measure sequence-caveat">
            {sector.operatingSequence.caveat}
          </p>
        ) : null}

        <div className="chart-block">
          <div className="chart-title">
            {isPE
              ? "EBITDA bridge (conservative ranges)"
              : "Margin and capacity headroom (conservative ranges)"}
          </div>
          <div className="chart-sub">
            typical LMM TPA · EBITDA margin, today to transformed
          </div>
          <div className="chart-frame">
            <MarginBridge steps={sector.bridge.steps} />
          </div>
          <ChartSourceBlock
            links={sourceBlocks.bridge?.links ?? []}
            suffix={sourceBlocks.bridge?.suffix}
            prefix="Sources"
          />
        </div>
      </section>

      {/* ================= 06 — WHY ANTIDOTE [FIXED] ================= */}
      {/* The thesis close: approach + thesis + experience = the reason to
          pick us over the thousands of firms selling "AI transformation."
          Fixed copy — do not customize per firm beyond the {name} token. */}
      <section className="section">
        <h2>
          Thousands of firms sell AI transformation. Why Antidote?
        </h2>

        <div className="obs">
          <h3>Sector selection before client selection.</h3>
          <p>
            We scored more than 300 B2B services sectors on one question: can
            automation cut delivery cost without cutting fees? Retirement plan
            administration clears that bar. The workflow map, benchmarks, and
            sector economics in this report were built before we identified{" "}
            {name}. Where work should stay human, we say so.
          </p>
        </div>

        <div className="obs">
          <h3>Operating-model rebuild, not another point tool.</h3>
          <p>
            Point tools on fragmented systems usually stall after a pilot,
            because census and plan data still get re-keyed. We start with intake
            automation and one plan record. Approval gates, audit trails, and
            production controls come from a platform we have run on prior
            engagements, not a fresh build each time.
          </p>
        </div>

        <div className="obs">
          <h3>Revenue per employee, not headcount reduction.</h3>
          <p>
            We raise revenue per employee: more plans and complexity with a lean
            team. Our programs do not rely on layoffs. Repetitive work gets
            automated so existing staff handle more plans and spend more time on
            judgment, clients, and advisory work.
          </p>
        </div>

        <div className="obs">
          <h3>Operator experience, with adoption as the constraint.</h3>
          <p>
            {isPE ? (
              <>
                The team has led more than ten AI transformations in PE-backed
                services businesses. Background includes acquisition (Clayton,
                Dubilier &amp; Rice), operating and value creation (BCG and
                portfolio company work), and production engineering. Margin
                bridges use conservative ranges and sourced assumptions for
                investment committee review. Value creation is modeled as
                revenue and EBITDA per employee through lean scaling, not
                workforce reduction.
              </>
            ) : (
              <>
                The team has led more than ten AI transformations in PE-backed
                services businesses. Background includes acquisition (Clayton,
                Dubilier &amp; Rice), operating and value creation (BCG and
                portfolio company work), and production engineering. Judgment
                work stays with staff; programs target higher revenue per
                employee through growth, not cuts. The main risk is adoption,
                not model choice.
              </>
            )}
          </p>
        </div>

        <div className="measure" style={{ marginTop: 26 }}>
          <p>
            Generalist consultancies usually learn the sector on your clock. We
            publish sector research first and size individual firms from public
            data only.
          </p>
          <p>
            <a href="https://antidotetransform.com">Antidote</a> ·{" "}
            <a href="https://antidotetransform.com/transformation">
              Case studies
            </a>{" "}
            · <a href="mailto:founders@antidotetransform.com">founders@antidotetransform.com</a>
          </p>
        </div>
      </section>

      <footer className="report-footer">
        <span>Antidote · New York / San Francisco · 2026</span>
      </footer>
    </main>
  );
}
