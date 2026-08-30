"use client";

import { useMemo, useState } from "react";
import { UseCaseArt } from "./FdUseCaseArt";
import {
  USE_CASE_FAMILIES,
  USE_CASE_HITL,
  USE_CASE_INDUSTRIES,
  USE_CASE_SUMMARIES,
} from "./use-case-summaries";
import type { UseCaseDiagram } from "./use-case-types";

function UseCaseThumb({ kind }: { kind: UseCaseDiagram }) {
  return <UseCaseArt kind={kind} size="thumb" />;
}

function prefetchUseCaseReport() {
  void import("./FdUseCaseDetailBySlug");
  void import("./FdUseCaseReport");
  void import("./use-cases");
}

export function FdUseCasesView({
  onOpen,
}: {
  onOpen: (slug: string) => void;
}) {
  const [industry, setIndustry] = useState<string>("All");
  const [family, setFamily] = useState<string>("All");
  const [hitl, setHitl] = useState<string>("All");

  const filtered = useMemo(() => {
    return USE_CASE_SUMMARIES.filter((u) => {
      if (industry !== "All" && u.industry !== industry) return false;
      if (family !== "All" && u.family !== family) return false;
      if (hitl !== "All" && u.hitl !== hitl) return false;
      return true;
    });
  }, [industry, family, hitl]);

  return (
    <div className="fdm-uc">
      <header className="fdm-uc-hero">
        <p className="fdm-kicker">Transformation · Resources</p>
        <h1>Use cases</h1>
        <p>
          Workflows where autonomous agents own volume work inside the systems
          teams already run. An open library of enterprise and midmarket applied
          AI patterns we have seen land in production: high-volume ops that clear
          when agents take the grind and humans keep the gates.
        </p>
      </header>

      <div className="fdm-uc-filters" role="group" aria-label="Filter use cases">
        <label>
          <span>Industry</span>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            {USE_CASE_INDUSTRIES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Work family</span>
          <select value={family} onChange={(e) => setFamily(e.target.value)}>
            {USE_CASE_FAMILIES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>HITL posture</span>
          <select value={hitl} onChange={(e) => setHitl(e.target.value)}>
            {USE_CASE_HITL.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <p className="fdm-uc-count">
          {filtered.length} of {USE_CASE_SUMMARIES.length}
        </p>
      </div>

      <div className="fdm-uc-list">
        {filtered.map((u) => (
          <button
            key={u.slug}
            type="button"
            className="fdm-uc-row"
            onClick={() => onOpen(u.slug)}
            onMouseEnter={prefetchUseCaseReport}
            onFocus={prefetchUseCaseReport}
          >
            <UseCaseThumb kind={u.diagram} />
            <div className="fdm-uc-row-body">
              <div className="fdm-uc-row-tags">
                <span>{u.industry}</span>
                <span>{u.family}</span>
                <span>{u.hitl}</span>
              </div>
              <strong>{u.title}</strong>
              <p>{u.blurb}</p>
            </div>
          </button>
        ))}
        {filtered.length === 0 ? (
          <p className="fdm-uc-empty">No use cases match these filters.</p>
        ) : null}
      </div>
    </div>
  );
}
