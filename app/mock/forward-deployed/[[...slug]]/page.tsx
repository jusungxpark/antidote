"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import {
  buildFdHref,
  fdBaseFromPathname,
  parseFdRoute,
  type FdSite,
} from "../fd-routing";
import { FdOfferingSwitch } from "../FdOfferingSwitch";
import { FdLearnPage } from "../FdLearn";

const routeFallback = (
  <div className="fdm-site-inner">
    <p className="fdm-uc-loading">Loading…</p>
  </div>
);

const HubAsciiDeploy = dynamic(
  () => import("../HubAsciiDeploy").then((m) => m.HubAsciiDeploy),
  { ssr: false },
);

const OfferingBlock = dynamic(
  () => import("../media-offerings").then((m) => m.OfferingBlock),
);

const DealCycleSticky = dynamic(
  () => import("../media-offerings").then((m) => m.DealCycleSticky),
);

const SubsiteLanding = dynamic(
  () => import("../SubsiteLanding").then((m) => m.SubsiteLanding),
  { loading: () => routeFallback },
);

const TransformationMethodView = dynamic(
  () => import("../SubsiteLanding").then((m) => m.TransformationMethodView),
  { loading: () => routeFallback },
);

const TransformationCasesView = dynamic(
  () => import("../SubsiteLanding").then((m) => m.TransformationCasesView),
  { loading: () => routeFallback },
);

const StrategyCasesView = dynamic(
  () => import("../SubsiteLanding").then((m) => m.StrategyCasesView),
  { loading: () => routeFallback },
);

const FdUseCasesView = dynamic(
  () => import("../FdUseCases").then((m) => m.FdUseCasesView),
  {
    loading: () => (
      <div className="fdm-uc">
        <p className="fdm-uc-loading">Loading use cases…</p>
      </div>
    ),
  },
);

const FdResourcesHub = dynamic(
  () => import("../FdResourcesHub").then((m) => m.FdResourcesHub),
  {
    loading: () => (
      <div className="fdm-uc">
        <p className="fdm-uc-loading">Loading resources…</p>
      </div>
    ),
  },
);

const FdUseCaseDetailBySlug = dynamic(
  () =>
    import("../FdUseCaseDetailBySlug").then((m) => m.FdUseCaseDetailBySlug),
  {
    loading: () => (
      <article className="fdm-uc-detail fdm-uc-detail--loading" aria-busy="true">
        <p className="fdm-uc-loading">Loading report…</p>
      </article>
    ),
  },
);

const FdCaseStudyDetailBySlug = dynamic(
  () =>
    import("../FdCaseStudyDetailBySlug").then((m) => m.FdCaseStudyDetailBySlug),
  {
    loading: () => (
      <article className="fdm-story-report fdm-uc-detail--loading" aria-busy="true">
        <p className="fdm-uc-loading">Loading case study…</p>
      </article>
    ),
  },
);


type Site = FdSite;


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
    { id: "reports", label: "Reports" },
  ],
  transformation: [
    { id: "home", label: "Overview" },
    { id: "method", label: "Method" },
    { id: "work", label: "Case Studies" },
    { id: "resources", label: "Resources" },
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
    reports: {
      title: "Reports",
      body: "Published diligence reports and exhibit write-ups.",
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
    resources: {
      title: "Resources",
      body: "Use cases, Learn, and room to add more libraries. Separate pages, not a toggle.",
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


const CDD_ORIGIN = "https://cdd.antidotetransform.com";

function DiligenceCddFrame({ cddPath }: { cddPath: string }) {
  const path = cddPath.startsWith("/") ? cddPath : `/${cddPath}`;

  return (
    <div className="fdm-cdd-embed">
      {/* Masks CDD wordmark + Work with us / Login; layer2 is the shared nav */}
      <div className="fdm-cdd-chrome-mask" aria-hidden="true" />
      <iframe
        key={path}
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
  // Instant jump on route change; smooth scroll is reserved for in-page anchors
  if (Math.abs(root.scrollTop - top) < 2) return;
  root.scrollTo({ top, behavior: "auto" });
}

export default function ForwardDeployedMockPage() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const base = fdBaseFromPathname(pathname);
  const { site, page, studySlug, nestedSlug, cddPath } = parseFdRoute(pathname);

  const go = (
    next: Site,
    nextPage = "home",
    nextStudy: string | null = null,
    nextNested: string | null = null,
  ) => {
    router.push(buildFdHref(base, next, nextPage, nextStudy, nextNested), {
      scroll: false,
    });
  };

  const enter = (next: Exclude<Site, "hub">, nextPage = "home") => {
    go(next, nextPage, null);
  };

  const goHub = () => {
    go("hub");
  };

  const openStudy = (slug: string) => {
    if (site === "hub") return;
    go(site, "work", slug);
  };

  const closeStudy = () => {
    if (site === "hub") return;
    go(site, "work", null);
  };

  const openUseCase = (slug: string) => {
    go("transformation", "resources", slug);
  };

  const closeUseCase = () => {
    go("transformation", "resources", "use-cases");
  };

  const openResourcesHub = () => {
    go("transformation", "resources", null);
  };

  const onLearn =
    site === "transformation" && page === "resources" && studySlug === "learn";
  const [learnSlug, setLearnSlug] = useState<string | null>(() =>
    onLearn ? nestedSlug : null,
  );

  useEffect(() => {
    if (!onLearn) return;
    const parsed = parseFdRoute(window.location.pathname);
    if (parsed.studySlug === "learn") setLearnSlug(parsed.nestedSlug);
  }, [onLearn, nestedSlug]);

  const openLearnModule = (slug: string) => {
    const href = buildFdHref(
      base,
      "transformation",
      "resources",
      "learn",
      slug,
    );
    if (onLearn) {
      window.history.pushState({ fdLearn: slug }, "", href);
      setLearnSlug(slug);
      return;
    }
    go("transformation", "resources", "learn", slug);
  };

  const closeLearn = () => {
    const href = buildFdHref(base, "transformation", "resources", "learn");
    if (onLearn) {
      window.history.pushState({ fdLearn: null }, "", href);
      setLearnSlug(null);
      return;
    }
    go("transformation", "resources", "learn");
  };

  const openResourceLibrary = (slug: "use-cases" | "learn") => {
    go("transformation", "resources", slug);
  };

  useEffect(() => {
    scrollShell(0);
  }, [pathname]);

  useEffect(() => {
    const onPop = () => {
      const parsed = parseFdRoute(window.location.pathname);
      if (
        parsed.site === "transformation" &&
        parsed.page === "resources" &&
        parsed.studySlug === "learn"
      ) {
        setLearnSlug(parsed.nestedSlug);
        return;
      }
      router.replace(window.location.pathname);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [router]);

  const nav = site === "hub" ? [] : SUBSITE_NAV[site];
  const copy = useMemo(() => {
    if (site === "hub") return null;
    return PAGE_COPY[site][page] ?? PAGE_COPY[site].home;
  }, [site, page]);

  const samples = site === "hub" ? [] : WORK_SAMPLES[site];

  return (
    <>
      <header className="fdm-layer1">
        <div className="fdm-layer1-inner">
          <button type="button" className="fdm-brand" onClick={goHub}>
            Antidote, Forward Deployed<em>.</em>
          </button>

          <FdOfferingSwitch
            active={site}
            onSelect={(id) => enter(id)}
          />

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
                className={
                  page === item.id ||
                  (item.id === "work" && page === "work" && studySlug) ||
                  (item.id === "resources" &&
                    page === "resources" &&
                    Boolean(studySlug)) ||
                  (site === "diligence" &&
                    item.id === page &&
                    Boolean(studySlug))
                    ? "is-active"
                    : undefined
                }
                onClick={() => {
                  if (site === "hub") return;
                  go(site, item.id, null);
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {site === "diligence" ? (
        <DiligenceCddFrame cddPath={cddPath || "/"} />
      ) : (
      <div className="fdm-shell">
        {site === "hub" ? (
          <>
            {/* 1. Hero, deployment visual (not CDD planes) */}
            <section className="fdm-land-hero">
              <div className="fdm-land-hero-copy">
                <h1>We forward deploy at the frontier of AI.</h1>
                <p>
                  Into strategy meetings, diligence rooms, portfolio companies,
                  and the workflows that still run on people, so sponsors and
                  operators get strategy, evidence, and shipped deliverables.
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

            {/* 2. Offerings — three shared-border blocks */}
            <section className="fdm-land-section" id="offerings">
              <div className="fdm-section-head fdm-section-head--offer">
                <h2>See how we engage across the full deal lifecycle.</h2>
                <p>
                  Strategy, Diligence, and Transformation, matched to where you
                  are before the check, around close, and under ownership.
                </p>
              </div>
              <div className="fdm-offer-grid">
                <OfferingBlock
                  kind="strategy"
                  title="Strategy"
                  body={SITE_TAGLINE.strategy}
                  stack="Case studies"
                  onClick={() => enter("strategy")}
                />
                <OfferingBlock
                  kind="diligence"
                  title="Diligence"
                  body={SITE_TAGLINE.diligence}
                  stack="Live CDD · method · evals · software"
                  onClick={() => enter("diligence")}
                />
                <OfferingBlock
                  kind="transformation"
                  title="Transformation"
                  body={SITE_TAGLINE.transformation}
                  stack="Method · Case studies"
                  onClick={() => enter("transformation")}
                />
              </div>
            </section>

            {/* 3. Deal cycle — sticky phases */}
            <div id="cycle">
              <DealCycleSticky />
            </div>

            {/* 4. CTA */}
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
                Work with us
              </a>
            </section>
          </>
        ) : (
          <div className="fdm-site">
            {site === "transformation" &&
            page === "resources" &&
            studySlug === "learn" ? (
              <FdLearnPage
                slug={learnSlug}
                onHub={openResourcesHub}
                onHome={closeLearn}
                onOpen={openLearnModule}
                onUseCase={openUseCase}
              />
            ) : site === "transformation" &&
              page === "resources" &&
              studySlug === "use-cases" ? (
              <FdUseCasesView onOpen={openUseCase} onHub={openResourcesHub} />
            ) : site === "transformation" &&
              page === "resources" &&
              studySlug ? (
              <FdUseCaseDetailBySlug
                slug={studySlug}
                onBack={closeUseCase}
              />
            ) : site === "transformation" && page === "resources" ? (
              <FdResourcesHub onOpen={openResourceLibrary} />
            ) : studySlug && page === "work" ? (
              <FdCaseStudyDetailBySlug
                slug={studySlug}
                crumbLabel="Case Studies"
                onBack={closeStudy}
              />
            ) : page === "home" &&
              (site === "strategy" || site === "transformation") ? (
              <SubsiteLanding
                site={site}
                onNavigate={(next) => {
                  if (next === "learn") {
                    go(site, "resources", "learn");
                    return;
                  }
                  if (next === "use-cases") {
                    go(site, "resources", "use-cases");
                    return;
                  }
                  go(site, next, null);
                }}
                onEnterSibling={(next) => enter(next)}
              />
            ) : site === "transformation" && page === "method" ? (
              <TransformationMethodView />
            ) : site === "transformation" && page === "work" ? (
              <TransformationCasesView onOpenStudy={openStudy} />
            ) : site === "strategy" && page === "work" ? (
              <StrategyCasesView onOpenStudy={openStudy} />
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
          <nav className="fdm-footer-entities" aria-label="Antidote entities">
            <a href="https://antidotetransform.com">Antidote</a>
            <a href="https://fd.antidotetransform.com">Antidote Forward Deployed</a>
          </nav>
        </footer>
      </div>
      )}
    </>
  );
}
