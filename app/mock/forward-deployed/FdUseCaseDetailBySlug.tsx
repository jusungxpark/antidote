"use client";

import { useEffect, useState } from "react";
import { FdUseCaseDetail } from "./FdUseCaseReport";
import type { UseCase } from "./use-cases";

/**
 * Lazy-loads the full use-case catalog only when a detail route is opened.
 */
export function FdUseCaseDetailBySlug({
  slug,
  onBack,
}: {
  slug: string;
  onBack: () => void;
}) {
  const [useCase, setUseCase] = useState<UseCase | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    setUseCase(undefined);
    import("./use-cases")
      .then((m) => {
        if (!alive) return;
        setUseCase(m.getUseCaseBySlug(slug) ?? null);
      })
      .catch(() => {
        if (alive) setUseCase(null);
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (useCase === undefined) {
    return (
      <article className="fdm-uc-detail fdm-uc-detail--loading" aria-busy="true">
        <p className="fdm-uc-loading">Loading report…</p>
      </article>
    );
  }

  if (useCase === null) {
    return (
      <article className="fdm-uc-detail">
        <p className="fdm-uc-empty">Use case not found.</p>
        <div className="fdm-story-report-footer">
          <button type="button" className="fdm-btn fdm-btn--ghost" onClick={onBack}>
            ← Back to use cases
          </button>
        </div>
      </article>
    );
  }

  return <FdUseCaseDetail useCase={useCase} onBack={onBack} />;
}
