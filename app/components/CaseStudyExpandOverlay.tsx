"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useScene } from "./SceneShell";
import {
  CASE_STUDY_TRANSITION_MS,
  getCaseStudyBannerRect,
} from "./case-study-layout";

function readViewport() {
  if (typeof window === "undefined") {
    return { w: 0, h: 0 };
  }
  return { w: window.innerWidth, h: window.innerHeight };
}

export function CaseStudyExpandOverlay() {
  const {
    caseStudyTransition,
    caseStudyTransitionPhase,
    caseStudyHandoff,
    acknowledgeCaseStudyExpandReady,
    onCaseStudyMorphEnd,
  } = useScene();
  const bannerRef = useRef<HTMLDivElement>(null);
  const morphEndedRef = useRef(false);
  const [viewport, setViewport] = useState(readViewport);

  useEffect(() => {
    const update = () => setViewport(readViewport());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!caseStudyTransition) {
      morphEndedRef.current = false;
    }
  }, [caseStudyTransition]);

  useLayoutEffect(() => {
    if (
      !caseStudyTransition ||
      caseStudyTransition.direction !== "forward" ||
      caseStudyTransitionPhase !== 0
    ) {
      return;
    }

    bannerRef.current?.getBoundingClientRect();

    let cancelled = false;
    let frame1 = 0;
    let frame2 = 0;

    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        if (!cancelled) {
          acknowledgeCaseStudyExpandReady();
        }
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [
    caseStudyTransition,
    caseStudyTransitionPhase,
    acknowledgeCaseStudyExpandReady,
  ]);

  useEffect(() => {
    if (
      !caseStudyTransition ||
      caseStudyTransition.direction !== "forward" ||
      caseStudyTransitionPhase !== 1 ||
      morphEndedRef.current
    ) {
      return;
    }

    const banner = bannerRef.current;
    if (!banner) return;

    const handleEnd = (event: TransitionEvent) => {
      if (event.target !== banner) return;
      if (!["width", "height", "top", "left"].includes(event.propertyName)) return;
      if (morphEndedRef.current) return;
      morphEndedRef.current = true;
      onCaseStudyMorphEnd();
    };

    const fallback = window.setTimeout(() => {
      if (morphEndedRef.current) return;
      morphEndedRef.current = true;
      onCaseStudyMorphEnd();
    }, CASE_STUDY_TRANSITION_MS + 40);

    banner.addEventListener("transitionend", handleEnd);
    return () => {
      banner.removeEventListener("transitionend", handleEnd);
      window.clearTimeout(fallback);
    };
  }, [caseStudyTransition, caseStudyTransitionPhase, onCaseStudyMorphEnd]);

  if (
    !caseStudyTransition ||
    caseStudyTransition.direction !== "forward" ||
    viewport.w === 0 ||
    typeof document === "undefined"
  ) {
    return null;
  }

  const expanded = caseStudyTransitionPhase === 1;
  const { cardRect, study } = caseStudyTransition;
  const bannerTarget = getCaseStudyBannerRect(viewport.w, viewport.h);
  const rect = expanded ? bannerTarget : cardRect;

  return createPortal(
    <div
      className={`case-study-morph-root${caseStudyHandoff ? " is-handoff" : ""}`}
      aria-hidden="true"
    >
      <div
        ref={bannerRef}
        className={`case-study-morph-banner${expanded ? " is-expanded" : ""}`}
        style={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          ["--case-hue" as string]: study.hue,
        }}
      >
        <div
          className="case-study-detail-banner-bg case-study-morph-banner-bg"
          style={{ backgroundImage: `url(${study.image})` }}
        />
        <div className="case-study-detail-banner-tint" aria-hidden="true" />
      </div>

      <div
        className={`case-study-morph-sheet${expanded ? " is-visible" : ""}`}
        style={{ top: bannerTarget.height }}
      />
    </div>,
    document.body
  );
}
