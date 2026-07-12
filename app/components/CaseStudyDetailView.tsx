"use client";

import type { RefObject } from "react";
import type { CaseStudy } from "./case-studies-data";
import { CaseStudyDetailBody } from "./CaseStudyDetailBody";

interface CaseStudyDetailViewProps {
  study: CaseStudy;
  onBack?: () => void;
  animateFields?: boolean;
  titleRef?: RefObject<HTMLHeadingElement | null>;
  titleClassName?: string;
  bannerClassName?: string;
}

export function CaseStudyDetailView({
  study,
  onBack,
  animateFields = false,
  titleRef,
  titleClassName = "",
  bannerClassName = "",
}: CaseStudyDetailViewProps) {
  return (
    <>
      <header
        className={`case-study-detail-banner${bannerClassName ? ` ${bannerClassName}` : ""}`}
      >
        <div
          className="case-study-detail-banner-bg"
          style={{ backgroundImage: `url(${study.image})` }}
          aria-hidden="true"
        />
        <div className="case-study-detail-banner-tint" aria-hidden="true" />
      </header>

      {onBack ? (
        <div
          className={`case-study-detail-nav${animateFields ? " is-animating-in" : ""}`}
        >
          <a
            href="/case-studies"
            className="pillar-case-link pillar-case-link--back case-study-detail-back"
            onClick={(event) => {
              event.preventDefault();
              onBack();
            }}
          >
            <span className="pillar-case-link-mark" aria-hidden="true">
              ↳
            </span>
            Case Studies
          </a>
        </div>
      ) : null}

      <div
        className={`case-study-detail-header${animateFields ? " is-animating-in" : ""}`}
      >
        <h1
          ref={titleRef}
          className={`case-study-detail-title${titleClassName ? ` ${titleClassName}` : ""}`}
        >
          {study.title}
        </h1>
      </div>

      <CaseStudyDetailBody study={study} animateIn={animateFields} />
    </>
  );
}
