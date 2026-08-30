"use client";

import { useEffect, useState } from "react";
import type { CaseStudy } from "../../components/case-studies-data";
import { FdCaseStudyReport } from "./FdCaseStories";

/** Lazy-loads case-study data only when a report route is opened. */
export function FdCaseStudyDetailBySlug({
  slug,
  crumbLabel,
  onBack,
}: {
  slug: string;
  crumbLabel: string;
  onBack: () => void;
}) {
  const [study, setStudy] = useState<CaseStudy | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    setStudy(undefined);
    import("../../components/case-studies-data")
      .then((m) => {
        if (!alive) return;
        setStudy(m.getCaseStudyBySlug(slug) ?? null);
      })
      .catch(() => {
        if (alive) setStudy(null);
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (study === undefined) {
    return (
      <article className="fdm-story-report fdm-uc-detail--loading" aria-busy="true">
        <p className="fdm-uc-loading">Loading case study…</p>
      </article>
    );
  }

  if (study === null) {
    return (
      <article className="fdm-story-report">
        <p className="fdm-uc-empty">Case study not found.</p>
        <div className="fdm-story-report-footer">
          <button type="button" className="fdm-btn fdm-btn--ghost" onClick={onBack}>
            ← Back
          </button>
        </div>
      </article>
    );
  }

  return (
    <FdCaseStudyReport study={study} crumbLabel={crumbLabel} onBack={onBack} />
  );
}
