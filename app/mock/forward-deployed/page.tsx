"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  CycleVisual,
  OfferingRow,
} from "./media";
import {
  StrategyCasesView,
  SubsiteLanding,
  TransformationCasesView,
  TransformationMethodView,
} from "./SubsiteLanding";
import {
  STRATEGY_CASES,
  TRANSFORMATION_CASES,
  caseMetaLine,
  caseSummary,
} from "./cases";

const HubAsciiDeploy = dynamic(
  () => import("./HubAsciiDeploy").then((m) => m.HubAsciiDeploy),
  { ssr: false },
);

type Site = "hub" | "strategy" | "diligence" | "transformation";

type NavItem = {
  id: string;
  label: string;
};

const SUBSITE_NAV: Record<Exclude<Site, "hub">, NavItem[]> = {
  strategy: [
    { id: "home", label: "Overview" },
    { id: "work", label: "Case Studies" },
  ],
  diligence: [
    { id: "home", label: "Overview" },
    { id: "method", label: "Method" },
    { id: "evals", label: "Evals" },
    { id: "software", label: "Software" },
    { id: "advisory", label: "Advisory" },
    { id: "automation", label: "Automation" },
  ],
  transformation: [
    { id: "home", label: "Overview" },
    { id: "method", label: "Method" },
    { id: "work", label: "Case Studies" },
  ],
};

const SITE_LABEL: Record<Exclude<Site, "hub">, string> = {
  strategy: "Strategy",
  diligence: "Diligence",
  transformation: "Transformation",
};

const SITE_TAGLINE: Record<Exclude<Site, "hub">, string> = {
  strategy: "Know where AI moves margin, and what the operating model becomes.",
  diligence: "Empirical AI diligence, evidence before the check.",
  transformation: "Workflows redesigned for agents that do the work, with guardrails that hold in production.",
};

const PAGE_COPY: Record<
  Exclude<Site, "hub">,
  Record<
    string,
    {
      title: string;
      body: string;
      bullets?: string[];
      pre?: string;
      post?: string;
    }
  >
> = {
  strategy: {
    home: {
      title: "Know where AI actually moves margin.",
      body: "Capability is cheap. What is scarce is where value accrues, who owns the outcome, and an operating model that survives the org.",
      pre: "investment thesis, what must be true, which diligence questions are worth paying for.",
      post: "roadmap, change sequencing, what Transformation should ship first.",
    },
    work: {
      title: "Case Studies",
      body: "Strategy engagements, digital strategy, GTM, and operating-model work.",
    },
  },
  diligence: {
    home: {
      title: "AI diligence, evidenced.",
      body: "We test economically material workflows, measure what models can actually do, and keep capability, cost, defensibility, and unknowns on separate planes.",
      pre: "Software CDD, automation exposure, claim status before capital.",
      post: "re-underwrite, value-creation DD, what stayed open at close.",
    },
    method: {
      title: "Method",
      body: "Freeze → Compare → Separate → Label. Four evidence planes stay unmixed.",
    },
    evals: {
      title: "Evals",
      body: "Frozen case sets, scoring rules, and claim status, as on the live CDD site.",
      pre: "Most eval work is pre-close evidence production.",
    },
    software: {
      title: "Software CDD",
      body: "Investor evaluating a software target: defensibility, replicability, exposure.",
      pre: "Core pre-close diligence product.",
    },
    advisory: {
      title: "Product advisory",
      body: "Which AI features are feasibility-supported today, and what a pilot must still prove.",
    },
    automation: {
      title: "Automation diligence",
      body: "Which workflow components are exposed, at what evidence tier, and what stays human.",
    },
  },
  transformation: {
    home: {
      title: "Your workflows, redesigned for the AI era.",
      body: "Autonomous background agents that do the work, with safety-first guardrails and production controls so they keep running when demos would break.",
      pre: "readiness, pilot design, which jobs agents can own on day one.",
      post: "full agent delivery inside the portfolio company.",
    },
    method: {
      title: "Method",
      body: "Process mining to production agents, find leakage, clean the data, redesign the human job, then bolt agents into the stack you already run.",
      bullets: [
        "Process mine & map workflows, bottlenecks, pain points, margin leakage",
        "Data hygiene, make the substrate agents can trust",
        "Redesign human work, judgment, customers, reviewing AI",
        "Bolt agents into the existing stack, minimize change management",
        "Guardrails & harden, safety first, production that holds",
        "Measure margin uplift through to the P&L",
      ],
    },
    work: {
      title: "Case Studies",
      body: "Transformation delivery, process mining, automation, and production agents inside operators.",
      post: "Weighted to owned outcomes after close.",
    },
  },
};

const WORK_SAMPLES: Record<
  Exclude<Site, "hub">,
  { meta: string; title: string; summary: string }[]
> = {
  strategy: [
    {
      meta: "Pre-close",
      title: "Value map for a services roll-up thesis",
      summary: "Where AI shifts margins before the first LOI.",
    },
    {
      meta: "Post-close",
      title: "Order-to-cash operating model",
      summary: "Sequencing after close for an industrial distributor.",
    },
  ],
  diligence: [
    {
      meta: "Pre-close",
      title: "Software CDD memo shape",
      summary: "Public analyses on the CDD site set the standard.",
    },
    {
      meta: "Post-close",
      title: "Value-creation re-underwrite",
      summary: "What remained open at close, revisited under ownership.",
    },
  ],
  transformation: [],
};

function casesForSite(site: Exclude<Site, "hub">) {
  if (site === "strategy") {
    return STRATEGY_CASES.map((s) => ({
      meta: caseMetaLine(s),
      title: s.title,
      summary: caseSummary(s),
    }));
  }
  if (site === "transformation") {
    return TRANSFORMATION_CASES.map((s) => ({
      meta: caseMetaLine(s),
      title: s.title,
      summary: caseSummary(s),
    }));
  }
  return WORK_SAMPLES.diligence;
}


const CDD_ORIGIN = "https://cdd.antidotetransform.com";

const CDD_PATH: Record<string, string> = {
  home: "/",
  method: "/method",
  evals: "/evals",
  software: "/software",
  advisory: "/advisory",
  automation: "/automation",
};

function DiligenceCddFrame({ page }: { page: string }) {
  const path = CDD_PATH[page] ?? "/";

  return (
    <div className="fdm-cdd-embed">
      {/* Masks CDD wordmark + Work with us / Login; layer2 is the shared nav */}
      <div className="fdm-cdd-chrome-mask" aria-hidden="true" />
      <iframe
        className="fdm-cdd-frame"
        title="Antidote Diligence"
        src={`${CDD_ORIGIN}${path}`}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

function scrollShell(top = 0) {
  const root = document.querySelector(".fdm-root");
  if (!root) return;
  // Avoid a smooth-scroll jolt when already at the top (felt like the nav shifting)
  if (Math.abs(root.scrollTop - top) < 2) return;
  root.scrollTo({ top, behavior: "smooth" });
}

export default function ForwardDeployedMockPage() {
  const [site, setSite] = useState<Site>("hub");
  const [page, setPage] = useState("home");

  const enter = (next: Exclude<Site, "hub">, nextPage = "home") => {
    setSite(next);
    setPage(nextPage);
    scrollShell(0);
  };

  const goHub = () => {
    setSite("hub");
    setPage("home");
    scrollShell(0);
  };

  const nav = site === "hub" ? [] : SUBSITE_NAV[site];
  const copy = useMemo(() => {
    if (site === "hub") return null;
    return PAGE_COPY[site][page] ?? PAGE_COPY[site].home;
  }, [site, page]);

  const samples =
    site === "hub"
      ? []
      : page === "work" && (site === "strategy" || site === "transformation")
        ? casesForSite(site)
        : WORK_SAMPLES[site];

  return (
    <>
      <header className="fdm-layer1">
        <div className="fdm-layer1-inner">
          <button type="button" className="fdm-brand" onClick={goHub}>
            Antidote, Forward Deployed<em>.</em>
          </button>

          <div
            className="fdm-offering-switch"
            role="tablist"
            aria-label="Offering"
            data-active={site === "hub" ? undefined : site}
          >
            <span className="fdm-offering-switch-thumb" aria-hidden="true" />
            {(
              [
                ["strategy", "Strategy"],
                ["diligence", "Diligence"],
                ["transformation", "Transformation"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                className={site === id ? "is-active" : undefined}
                aria-selected={site === id}
                onClick={() => enter(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <a className="fdm-layer1-cta" href="mailto:founders@antidotetransform.com">
            Work with us
          </a>
        </div>
      </header>

      <div
        className={`fdm-layer2${site === "hub" ? " is-hub" : ""}`}
        data-site={site === "hub" ? undefined : site}
      >
        <div className="fdm-layer2-inner">
          <nav className="fdm-layer2-links" aria-label="Subsite">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                className={page === item.id ? "is-active" : undefined}
                onClick={() => {
                  setPage(item.id);
                  scrollShell(0);
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {site === "diligence" ? (
        <DiligenceCddFrame page={page} />
      ) : (
      <div className="fdm-shell">
        {site === "hub" ? (
          <>
            {/* 1. Hero, deployment visual (not CDD planes) */}
            <section className="fdm-land-hero">
              <div className="fdm-land-hero-copy">
                <h1>We forward deploy at the frontier of AI.</h1>
                <p>
                  Into diligence rooms, portfolio companies, and the workflows
                  that still run on people, so sponsors and operators get
                  strategy, evidence, and shipped deliverables, not another deck.
                </p>
                <div className="fdm-land-actions">
                  <button
                    type="button"
                    className="fdm-btn fdm-btn--primary"
                    onClick={() =>
                      document
                        .getElementById("offerings")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore offerings
                  </button>
                  <button
                    type="button"
                    className="fdm-btn fdm-btn--ghost"
                    onClick={() =>
                      document
                        .getElementById("cycle")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Where we help
                  </button>
                </div>
              </div>
              <HubAsciiDeploy />
            </section>

            {/* 2. Problem, typography only */}
            <section className="fdm-land-section">
              <div className="fdm-land-split">
                <h2>PE buyers don’t need another AI brochure.</h2>
                <div>
                  <p>
                    They need a point of view before the check, evidence when the
                    asset is AI-exposed, and a partner who can deliver after
                    ownership.
                  </p>
                  <p>
                    That is the work: Strategy, Diligence, and Transformation,
                    matched to where you are in the deal cycle.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Deal cycle, quiet map */}
            <section className="fdm-land-section" id="cycle">
              <div className="fdm-section-head">
                <h2>Help that matches where you are.</h2>
                <p>
                  The same three offerings before and after close. What changes is
                  the question we answer.
                </p>
              </div>
              <CycleVisual onEnter={enter} />
            </section>

            {/* 4. Offerings, editorial rows */}
            <section className="fdm-land-section" id="offerings">
              <div className="fdm-section-head">
                <h2>Three offerings.</h2>
                <p>
                  Strategy for where AI moves the economics. Diligence that
                  produces evidence. Transformation that puts agents on the work,
                  with guardrails that hold in production.
                </p>
              </div>
              <div className="fdm-offer-list">
                <OfferingRow
                  index="01"
                  title="Strategy"
                  body={SITE_TAGLINE.strategy}
                  stack="Case studies"
                  onClick={() => enter("strategy")}
                />
                <OfferingRow
                  index="02"
                  title="Diligence"
                  body={SITE_TAGLINE.diligence}
                  stack="Live CDD · method · evals · software"
                  onClick={() => enter("diligence")}
                />
                <OfferingRow
                  index="03"
                  title="Transformation"
                  body={SITE_TAGLINE.transformation}
                  stack="Method · Case studies"
                  onClick={() => enter("transformation")}
                />
              </div>
            </section>

            {/* 5. CTA */}
            <section className="fdm-land-cta">
              <div>
                <h2>Tell us where you are in the cycle.</h2>
                <p>
                  Thesis work, diligence on an AI-exposed asset, or delivery under
                  ownership. We’ll meet you there.
                </p>
              </div>
              <a
                className="fdm-btn fdm-btn--primary"
                href="mailto:founders@antidotetransform.com"
              >
                founders@antidotetransform.com
              </a>
            </section>
          </>
        ) : (
          <div className="fdm-site">
            {page === "home" ? (
              <SubsiteLanding
                site={site}
                onNavigate={(next) => {
                  setPage(next);
                  scrollShell(0);
                }}
                onEnterSibling={enter}
              />
            ) : site === "transformation" && page === "method" ? (
              <TransformationMethodView />
            ) : site === "transformation" && page === "work" ? (
              <TransformationCasesView
                onNavigate={(next) => {
                  setPage(next);
                  scrollShell(0);
                }}
              />
            ) : site === "strategy" && page === "work" ? (
              <StrategyCasesView
                onNavigate={(next) => {
                  setPage(next);
                  scrollShell(0);
                }}
              />
            ) : (
              <div className="fdm-site-inner">
                <div className="fdm-site-hero" data-site={site}>
                  <p className="fdm-kicker">
                    {SITE_LABEL[site]} ·{" "}
                    {nav.find((n) => n.id === page)?.label ?? "Overview"}
                  </p>
                  <h1>{copy?.title}</h1>
                  <p>{copy?.body}</p>
                </div>

                <div className="fdm-card">
                  <h2>{copy?.title}</h2>
                  <p>{copy?.body}</p>
                  {copy?.bullets ? (
                    <ul>
                      {copy.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ marginTop: 12 }}>
                      Placeholder for the real {SITE_LABEL[site]} ·{" "}
                      {nav.find((n) => n.id === page)?.label} page.
                    </p>
                  )}
                  {copy?.bullets && page === "method" ? (
                    <div className="fdm-steps">
                      {copy.bullets.map((b, i) => (
                        <div key={b}>
                          <strong>{i + 1}.</strong>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {(page === "work" ||
                    page === "resources" ||
                    page === "software" ||
                    page === "engagements" ||
                    page === "delivery") && (
                    <div className="fdm-work-list" style={{ marginTop: 16 }}>
                      {samples.map((item) => (
                        <div key={item.title} className="fdm-list-row">
                          <div className="meta">{item.meta}</div>
                          <div>
                            <h3>{item.title}</h3>
                            <p>{item.summary}</p>
                          </div>
                          <div className="meta" style={{ textAlign: "right" }}>
                            →
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <footer className="fdm-footer">
          <span>Antidote · Forward Deployed</span>
          <button type="button" className="fdm-text-link" onClick={goHub}>
            Back to landing
          </button>
        </footer>
      </div>
      )}
    </>
  );
}
