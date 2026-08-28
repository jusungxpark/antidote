"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useScene } from "./SceneShell";
import { computePillarTargetRect } from "./trace-cards/card-layout";
import { CardCornerTicks } from "./CardCornerTicks";
import {
  CARD_FACE,
  CARD_FACE_TITLE_TOP_OFFSET,
  CARD_TRANSITION_MS,
  easeInOutCubic,
  getExpandedTitleCenterLeft,
  getExpandedTitleFontSize,
  getExpandedTitleTop,
} from "./trace-cards/card-face-layout";
import { CardFaceLabels } from "./trace-cards/CardFaceLabels";
import { CardFaceBottom } from "./trace-cards/CardFaceBottom";

function applyTitleStyle(
  title: HTMLHeadingElement,
  top: number,
  left: number,
  fontSize: number
) {
  title.style.fontSize = `${fontSize}px`;
  title.style.top = `${top}px`;
  title.style.left = `${left}px`;
  title.style.transform = "none";
}

function measureTitleCenterLeft(
  title: HTMLHeadingElement,
  cardWidth: number,
  fontSize: number
): number {
  title.style.fontSize = `${fontSize}px`;
  return getExpandedTitleCenterLeft(cardWidth, title.offsetWidth);
}

export function PillarExpandOverlay() {
  const { transition, transitionPhase, acknowledgeExpandReady } = useScene();
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const expandPaintedRef = useRef(false);
  const collapseStartRef = useRef<number | null>(null);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const update = () =>
      setViewport({
        w: window.innerWidth,
        h: window.visualViewport?.height ?? window.innerHeight,
      });
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  const target = useMemo(() => {
    if (!transition) return null;
    if (!viewport.w) return computePillarTargetRect(transition.mirror);
    return computePillarTargetRect(transition.mirror, viewport.w, viewport.h);
  }, [transition, viewport]);

  useEffect(() => {
    if (!transition) {
      expandPaintedRef.current = false;
      collapseStartRef.current = null;
    }
  }, [transition]);

  useEffect(() => {
    if (transition?.direction === "reverse" && transitionPhase === 0) {
      if (collapseStartRef.current === null) {
        collapseStartRef.current = performance.now();
      }
    } else {
      collapseStartRef.current = null;
    }
  }, [transition?.direction, transitionPhase]);

  // Advance expand phase after the collapsed overlay has painted.
  // Important: do not latch a ref before rAFs complete — React Strict Mode
  // (dev) cleans up and re-runs effects; a premature latch freezes phase at 0.
  useLayoutEffect(() => {
    if (
      !transition ||
      transition.direction !== "forward" ||
      transitionPhase !== 0
    ) {
      return;
    }

    let cancelled = false;
    let outer = 0;
    let inner = 0;

    outer = requestAnimationFrame(() => {
      overlayRef.current?.getBoundingClientRect();
      inner = requestAnimationFrame(() => {
        if (cancelled || expandPaintedRef.current) return;
        expandPaintedRef.current = true;
        acknowledgeExpandReady();
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [transition, transitionPhase, acknowledgeExpandReady]);

  // Drive title position from live card height (expand) or timed lerp (collapse).
  useLayoutEffect(() => {
    if (!transition || !cardRef.current || !titleRef.current || !target) return;

    const title = titleRef.current;
    const fromH = transition.cardRect.height;
    const fromW = transition.cardRect.width;
    const toH = target.height;
    const toW = target.width;
    const heightSpan = toH - fromH || 1;

    const applyTitleLayout = () => {
      const card = cardRef.current;
      if (!card) return;

      const cardRect = card.getBoundingClientRect();
      const h = cardRect.height;
      const w = cardRect.width;
      const vw = window.innerWidth;
      const expandedTop = getExpandedTitleTop(vw);
      const expandedSize = getExpandedTitleFontSize(vw);

      if (transition.direction === "forward" && transitionPhase === 1) {
        const t = easeInOutCubic(
          Math.min(1, Math.max(0, (h - fromH) / heightSpan))
        );
        const startTop = fromH - CARD_FACE_TITLE_TOP_OFFSET;
        const currentSize =
          CARD_FACE.titleFontSize + (expandedSize - CARD_FACE.titleFontSize) * t;
        const centerLeft = measureTitleCenterLeft(title, w, currentSize);
        applyTitleStyle(
          title,
          startTop + (expandedTop - startTop) * t,
          CARD_FACE.insetX + (centerLeft - CARD_FACE.insetX) * t,
          currentSize
        );
      } else if (transition.direction === "reverse" && transitionPhase === 1) {
        applyTitleStyle(
          title,
          expandedTop,
          measureTitleCenterLeft(title, w, expandedSize),
          expandedSize
        );
      } else if (transition.direction === "reverse" && transitionPhase === 0) {
        const start = collapseStartRef.current ?? performance.now();
        const raw = Math.min(1, (performance.now() - start) / CARD_TRANSITION_MS);
        const t = easeInOutCubic(raw);
        const estimatedH = toH + (fromH - toH) * t;
        const estimatedW = toW + (fromW - toW) * t;
        const endTop = estimatedH - CARD_FACE_TITLE_TOP_OFFSET;
        const currentSize =
          expandedSize + (CARD_FACE.titleFontSize - expandedSize) * t;
        const centerLeft = measureTitleCenterLeft(title, estimatedW, currentSize);
        applyTitleStyle(
          title,
          expandedTop + (endTop - expandedTop) * t,
          centerLeft + (CARD_FACE.insetX - centerLeft) * t,
          currentSize
        );
      } else {
        applyTitleStyle(
          title,
          fromH - CARD_FACE_TITLE_TOP_OFFSET,
          CARD_FACE.insetX,
          CARD_FACE.titleFontSize
        );
      }
    };

    applyTitleLayout();

    // Only pump frames while a morph is in progress — never an infinite idle loop.
    const needsContinuous =
      (transition.direction === "forward" && transitionPhase === 1) ||
      (transition.direction === "reverse" && transitionPhase === 0);

    if (!needsContinuous) return;

    let raf = 0;
    const started = performance.now();
    const tick = () => {
      applyTitleLayout();
      // Safety stop in case a transition stalls
      if (performance.now() - started < CARD_TRANSITION_MS + 200) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [transition, transitionPhase, target]);

  if (!transition || !target) return null;

  const expanded = transitionPhase === 1;
  const from = transition.cardRect;
  const rect = expanded ? target : from;

  return (
    <div
      ref={overlayRef}
      className={`pillar-expand-overlay${expanded ? " is-expanded" : " is-collapsed"}`}
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }}
      aria-hidden="true"
    >
      <div ref={cardRef} className="pillar-expand-card">
        <CardCornerTicks />

        <div
          className="pillar-expand-fadeables"
          style={{
            position: "absolute",
            top: CARD_FACE.topY,
            left: CARD_FACE.insetX,
            right: CARD_FACE.insetX,
          }}
        >
          {transition.labels?.length ? (
            <CardFaceLabels labels={transition.labels} />
          ) : null}
        </div>

        <CardFaceBottom
          subtitle={transition.subtitle}
          hideTitle
          wrapperClassName="pillar-expand-bottom"
          subtitleClassName="pillar-expand-subtitle"
        />

        <h2 ref={titleRef} className="pillar-expand-title">
          {transition.title}
        </h2>
      </div>
    </div>
  );
}
