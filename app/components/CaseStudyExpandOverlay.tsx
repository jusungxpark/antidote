"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useScene } from "./SceneShell";
import {
  CASE_STUDY_TRANSITION_MS,
  easeInOutCubic,
  getCaseStudyBannerRect,
  getCollapsedTitlePosition,
  getExpandedTitlePosition,
  lerpTitleStyle,
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
    onCaseStudyReverseEnd,
  } = useScene();
  const bannerRef = useRef<HTMLDivElement>(null);
  const floatTitleRef = useRef<HTMLHeadingElement>(null);
  const morphEndedRef = useRef(false);
  const reverseEndedRef = useRef(false);
  const collapseStartRef = useRef<number | null>(null);
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
      reverseEndedRef.current = false;
      collapseStartRef.current = null;
    }
  }, [caseStudyTransition]);

  useEffect(() => {
    if (caseStudyTransition?.direction === "reverse" && caseStudyTransitionPhase === 0) {
      if (collapseStartRef.current === null) {
        collapseStartRef.current = performance.now();
      }
    } else {
      collapseStartRef.current = null;
    }
  }, [caseStudyTransition?.direction, caseStudyTransitionPhase]);

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

  useLayoutEffect(() => {
    if (
      !caseStudyTransition ||
      caseStudyTransition.direction !== "reverse" ||
      !floatTitleRef.current ||
      viewport.w === 0
    ) {
      return;
    }

    const title = floatTitleRef.current;
    const { cardRect, titleRect } = caseStudyTransition;
    const toCollapsed = getCollapsedTitlePosition(cardRect, titleRect);

    let raf = 0;

    const applyTitleLayout = () => {
      const titleWidth = title.offsetWidth || title.scrollWidth;
      const expanded = getExpandedTitlePosition(viewport.w, viewport.h, titleWidth);

      if (caseStudyTransitionPhase === 1) {
        title.style.top = `${expanded.top}px`;
        title.style.left = `${expanded.left}px`;
        title.style.fontSize = `${expanded.fontSize}px`;
        return;
      }

      const start = collapseStartRef.current ?? performance.now();
      const raw = Math.min(1, (performance.now() - start) / CASE_STUDY_TRANSITION_MS);
      const t = easeInOutCubic(raw);
      const style = lerpTitleStyle(expanded, toCollapsed, t);
      title.style.top = `${style.top}px`;
      title.style.left = `${style.left}px`;
      title.style.fontSize = `${style.fontSize}px`;
      title.style.lineHeight = t > 0.92 ? "1.2" : "1.08";
    };

    applyTitleLayout();
    raf = requestAnimationFrame(function tick() {
      applyTitleLayout();
      raf = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(raf);
  }, [caseStudyTransition, caseStudyTransitionPhase, viewport]);

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

  useEffect(() => {
    if (
      !caseStudyTransition ||
      caseStudyTransition.direction !== "reverse" ||
      caseStudyTransitionPhase !== 0 ||
      reverseEndedRef.current
    ) {
      return;
    }

    const banner = bannerRef.current;
    if (!banner) return;

    const handleEnd = (event: TransitionEvent) => {
      if (event.target !== banner) return;
      if (!["width", "height", "top", "left"].includes(event.propertyName)) return;
      if (reverseEndedRef.current) return;
      reverseEndedRef.current = true;
      onCaseStudyReverseEnd();
    };

    const fallback = window.setTimeout(() => {
      if (reverseEndedRef.current) return;
      reverseEndedRef.current = true;
      onCaseStudyReverseEnd();
    }, CASE_STUDY_TRANSITION_MS + 40);

    banner.addEventListener("transitionend", handleEnd);
    return () => {
      banner.removeEventListener("transitionend", handleEnd);
      window.clearTimeout(fallback);
    };
  }, [caseStudyTransition, caseStudyTransitionPhase, onCaseStudyReverseEnd]);

  if (!caseStudyTransition || viewport.w === 0 || typeof document === "undefined") {
    return null;
  }

  const expanded = caseStudyTransitionPhase === 1;
  const { cardRect, study, direction } = caseStudyTransition;
  const bannerTarget = getCaseStudyBannerRect(viewport.w, viewport.h);
  const rect = expanded ? bannerTarget : cardRect;
  const isReverse = direction === "reverse";
  const isReverseCollapsing = isReverse && !expanded;

  return createPortal(
    <div
      className={`case-study-morph-root${caseStudyHandoff ? " is-handoff" : ""}`}
      aria-hidden="true"
    >
      <div
        ref={bannerRef}
        className={`case-study-morph-banner${expanded ? " is-expanded" : ""}${isReverse ? " is-reverse" : ""}`}
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
        {!isReverse ? (
          <h1
            className={`case-study-detail-banner-title case-study-morph-banner-title${expanded ? " is-expanded" : ""}`}
          >
            {study.firm}
          </h1>
        ) : null}
      </div>

      {!isReverse ? (
        <div
          className={`case-study-morph-sheet${expanded ? " is-visible" : ""}${isReverseCollapsing ? " is-hiding" : ""}`}
          style={{ top: bannerTarget.height }}
        />
      ) : null}

      {isReverse ? (
        <h1 ref={floatTitleRef} className="case-study-morph-float-title">
          {study.firm}
        </h1>
      ) : null}
    </div>,
    document.body
  );
}
