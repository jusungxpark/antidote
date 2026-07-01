"use client";

import { useCallback, useRef } from "react";
import type { CaseStudy } from "./case-studies-data";
import { getCaseStudyPath } from "./case-studies-data";
import { measureCaseStudyCardTarget } from "./case-study-layout";
import { useScene } from "./SceneShell";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { startCaseStudyTransition, caseStudyTransition } = useScene();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (caseStudyTransition !== null) return;

      const measured = measureCaseStudyCardTarget(study.slug);
      if (!measured) return;

      startCaseStudyTransition({
        study,
        href: getCaseStudyPath(study.slug),
        cardRect: measured.cardRect,
        titleRect: measured.titleRect,
        direction: "forward",
      });
    },
    [caseStudyTransition, startCaseStudyTransition, study]
  );

  return (
    <a
      ref={cardRef}
      id={`case-study-card-${study.slug}`}
      href={getCaseStudyPath(study.slug)}
      className={`case-study-card-link${caseStudyTransition?.study.slug === study.slug ? " is-morphing" : ""}`}
      onClick={handleClick}
      aria-label={`${study.label}. View case study.`}
      style={{ ["--case-hue" as string]: study.hue }}
    >
      <article className="case-study-card case-study-card--full">
        <div
          className="case-study-card-bg"
          style={{ backgroundImage: `url(${study.image})` }}
          aria-hidden="true"
        />
        <div className="case-study-card-tint" aria-hidden="true" />
        <div className="case-study-card-content">
          <h3>{study.label}</h3>
        </div>
      </article>
    </a>
  );
}
