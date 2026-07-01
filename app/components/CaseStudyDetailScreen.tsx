"use client";

import type { CaseStudy } from "./case-studies-data";
import { CaseStudyDetailView } from "./CaseStudyDetailView";

interface CaseStudyDetailScreenProps {
  study: CaseStudy;
  onBack: () => void;
  phase?: "hidden" | "underlay" | "visible";
  animateFields?: boolean;
}

export function CaseStudyDetailScreen({
  study,
  onBack,
  phase = "visible",
  animateFields = false,
}: CaseStudyDetailScreenProps) {
  return (
    <div
      className={`case-study-detail-screen case-study-detail-screen--${phase}`}
      style={{ ["--case-hue" as string]: study.hue }}
      aria-hidden={phase !== "visible"}
    >
      <CaseStudyDetailView
        study={study}
        onBack={onBack}
        animateFields={animateFields}
      />
    </div>
  );
}
