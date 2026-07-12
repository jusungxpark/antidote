"use client";

import type { CaseStudy } from "./case-studies-data";
import { DETAIL_FIELDS } from "./case-studies-data";

interface CaseStudyDetailBodyProps {
  study: CaseStudy;
  animateIn?: boolean;
  className?: string;
}

const FIELD_VALUES: Record<(typeof DETAIL_FIELDS)[number], keyof CaseStudy> = {
  Problem: "problem",
  Action: "action",
  Result: "result",
};

export function CaseStudyDetailBody({
  study,
  animateIn = false,
  className = "",
}: CaseStudyDetailBodyProps) {
  const { meta } = study;

  return (
    <div
      className={`case-study-detail-body${animateIn ? " is-animating-in" : ""}${className ? ` ${className}` : ""}`}
    >
      <dl className="case-study-detail-meta">
        <div className="case-study-detail-meta-row">
          <dt>Timeline</dt>
          <dd>{meta.timeline}</dd>
        </div>
        <div className="case-study-detail-meta-row">
          <dt>Scale</dt>
          <dd>{meta.scale}</dd>
        </div>
        <div className="case-study-detail-meta-row">
          <dt>Project type</dt>
          <dd>{meta.projectType}</dd>
        </div>
        <div className="case-study-detail-meta-row">
          <dt>Industry</dt>
          <dd>{meta.industry}</dd>
        </div>
        <div className="case-study-detail-meta-row">
          <dt>Business unit</dt>
          <dd>{meta.businessUnit}</dd>
        </div>
      </dl>

      <div className="case-study-detail-divider" aria-hidden="true" />

      <dl className="case-study-detail-list case-study-detail-list--page">
        {DETAIL_FIELDS.map((field) => (
          <div key={field} className="case-study-detail-row">
            <dt>{field}</dt>
            <dd>{study[FIELD_VALUES[field]] as string}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
