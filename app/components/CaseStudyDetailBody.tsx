"use client";

import { DETAIL_FIELDS } from "./case-studies-data";

interface CaseStudyDetailBodyProps {
  animateIn?: boolean;
  className?: string;
}

export function CaseStudyDetailBody({
  animateIn = false,
  className = "",
}: CaseStudyDetailBodyProps) {
  return (
    <div
      className={`case-study-detail-body${animateIn ? " is-animating-in" : ""}${className ? ` ${className}` : ""}`}
    >
      <dl className="case-study-detail-list case-study-detail-list--page">
        {DETAIL_FIELDS.map((field) => (
          <div key={field} className="case-study-detail-row">
            <dt>{field}</dt>
            <dd aria-hidden="true" />
          </div>
        ))}
      </dl>
    </div>
  );
}
