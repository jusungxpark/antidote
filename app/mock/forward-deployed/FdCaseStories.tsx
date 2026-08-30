"use client";

import type { CaseStudy } from "../../components/case-studies-data";

function prefetchCaseStudyReport() {
  void import("./FdCaseStudyDetailBySlug");
  void import("../../components/case-studies-data");
}

/** Rogo-style listing: gray media tile + title row. */
export function FdCaseStoryCards({
  studies,
  onOpen,
}: {
  studies: CaseStudy[];
  onOpen: (slug: string) => void;
}) {
  return (
    <div className="fdm-stories">
      {studies.map((study) => (
        <button
          key={study.slug}
          type="button"
          className="fdm-story-card"
          onClick={() => onOpen(study.slug)}
          onMouseEnter={prefetchCaseStudyReport}
          onFocus={prefetchCaseStudyReport}
        >
          <span className="fdm-story-card-title">{study.title}</span>
          <span className="fdm-story-card-media" aria-hidden="true">
            <img src={study.image} alt="" loading="lazy" decoding="async" />
          </span>
        </button>
      ))}
    </div>
  );
}

/** Rogo-style report: hero, meta rail + narrative. */
export function FdCaseStudyReport({
  study,
  crumbLabel,
  onBack,
}: {
  study: CaseStudy;
  crumbLabel: string;
  onBack: () => void;
}) {
  return (
    <article className="fdm-story-report">
      <nav className="fdm-story-crumbs" aria-label="Breadcrumb">
        <button type="button" onClick={onBack}>
          {crumbLabel}
        </button>
        <span aria-hidden="true">/</span>
        <span>{study.meta.industry}</span>
      </nav>

      <header className="fdm-story-report-hero">
        <h1>{study.title}</h1>
        <div className="fdm-story-report-banner">
          <img src={study.image} alt="" decoding="async" />
        </div>
      </header>

      <div className="fdm-story-report-body">
        <dl className="fdm-story-meta">
          <div>
            <dt>Timeline</dt>
            <dd>{study.meta.timeline}</dd>
          </div>
          <div>
            <dt>Scale</dt>
            <dd>{study.meta.scale}</dd>
          </div>
          <div>
            <dt>Project type</dt>
            <dd>{study.meta.projectType}</dd>
          </div>
          <div>
            <dt>Industry</dt>
            <dd>{study.meta.industry}</dd>
          </div>
          <div>
            <dt>Business unit</dt>
            <dd>{study.meta.businessUnit}</dd>
          </div>
        </dl>

        <div className="fdm-story-narrative">
          <section>
            <h2>The problem</h2>
            <p>{study.problem}</p>
          </section>
          <section>
            <h2>What we did</h2>
            <p>{study.action}</p>
          </section>
          <section>
            <h2>The outcome</h2>
            <p>{study.result}</p>
          </section>
        </div>
      </div>

      <div className="fdm-story-report-footer">
        <button type="button" className="fdm-btn fdm-btn--ghost" onClick={onBack}>
          ← Back to {crumbLabel.toLowerCase()}
        </button>
      </div>
    </article>
  );
}
