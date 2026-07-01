"use client";

import { useCallback } from "react";
import { CASE_STUDIES } from "./case-studies-data";
import { CaseStudyCard } from "./CaseStudyCard";
import { useScrollUpDismiss } from "./useScrollUpDismiss";
import { useScene } from "./SceneShell";

interface CaseStudiesScreenProps {
  onBack: () => void;
  hidden?: boolean;
}

export function CaseStudiesScreen({ onBack, hidden = false }: CaseStudiesScreenProps) {
  const { caseStudyTransition } = useScene();
  const handleScrollUpDismiss = useCallback(() => {
    onBack();
  }, [onBack]);

  const scrollRef = useScrollUpDismiss(
    handleScrollUpDismiss,
    !hidden && caseStudyTransition === null
  );

  return (
    <div
      ref={scrollRef}
      className={`case-studies-screen${hidden ? " case-studies-screen--hidden" : ""}`}
      aria-hidden={hidden}
    >
      <a
        href="/transformation"
        className="pillar-case-link pillar-case-link--back"
        onClick={(event) => {
          event.preventDefault();
          onBack();
        }}
      >
        <span className="pillar-case-link-mark" aria-hidden="true">
          ↳
        </span>
        Back
      </a>
      <h2 className="case-studies-screen-title">Case Studies</h2>
      <div className="case-study-grid case-study-grid--full">
        {CASE_STUDIES.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </div>
  );
}
