"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { useScene } from "./SceneShell";
import { CardCornerTicks } from "./CardCornerTicks";
import { computePillarTargetRect } from "./trace-cards/card-layout";

interface ExpandedPillarPanelProps {
  side: "left" | "right";
  title: string;
  returningHome?: boolean;
  children: ReactNode;
}

function readViewport() {
  const w = window.innerWidth;
  const h = window.visualViewport?.height ?? window.innerHeight;
  return { w, h };
}

export function ExpandedPillarPanel({
  side,
  title,
  returningHome = false,
  children,
}: ExpandedPillarPanelProps) {
  const pathname = usePathname();
  const { startReturnTransition, transition } = useScene();
  // null until measured — avoids CSS→JS layout jump on hard refresh
  const [viewport, setViewport] = useState<{ w: number; h: number } | null>(
    null
  );
  const bodyRef = useRef<HTMLDivElement>(null);
  const [fadeTop, setFadeTop] = useState(false);
  const [fadeBottom, setFadeBottom] = useState(false);

  useLayoutEffect(() => {
    const update = () => setViewport(readViewport());
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  const close = useCallback(() => {
    if (returningHome || transition?.direction === "reverse") return;
    startReturnTransition();
  }, [returningHome, transition, startReturnTransition]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const updateFades = useCallback(() => {
    const el = bodyRef.current;
    if (!el) {
      setFadeTop(false);
      setFadeBottom(false);
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = el;
    const canScroll = scrollHeight > clientHeight + 2;
    setFadeTop(canScroll && scrollTop > 2);
    setFadeBottom(canScroll && scrollTop + clientHeight < scrollHeight - 2);
  }, []);

  const seamless =
    transition?.direction === "forward" &&
    transition !== null &&
    pathname === transition.href;

  const handoff =
    returningHome ||
    transition?.direction === "reverse" ||
    (transition?.direction === "forward" && !seamless);

  useEffect(() => {
    if (handoff) {
      setFadeTop(false);
      setFadeBottom(false);
      return;
    }

    const el = bodyRef.current;
    if (!el) return;

    updateFades();
    // Re-check after open animation / fonts settle
    const settle = window.setTimeout(updateFades, 700);

    el.addEventListener("scroll", updateFades, { passive: true });
    window.addEventListener("resize", updateFades);
    window.visualViewport?.addEventListener("resize", updateFades);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateFades)
        : null;
    ro?.observe(el);
    if (el.firstElementChild) ro?.observe(el.firstElementChild);

    return () => {
      window.clearTimeout(settle);
      el.removeEventListener("scroll", updateFades);
      window.removeEventListener("resize", updateFades);
      window.visualViewport?.removeEventListener("resize", updateFades);
      ro?.disconnect();
    };
  }, [handoff, children, updateFades]);

  const measured = viewport !== null;
  const useFixedRect = measured && viewport.w > 768;
  const rect = useMemo(() => {
    if (!useFixedRect || !viewport) return null;
    return computePillarTargetRect(side === "right", viewport.w, viewport.h);
  }, [side, viewport, useFixedRect]);

  const panelClass = [
    "pillar-panel",
    !measured ? "is-measuring" : null,
    useFixedRect ? null : `pillar-panel--${side}`,
    handoff ? "is-handoff" : "is-open",
    seamless ? "is-seamless" : null,
  ]
    .filter(Boolean)
    .join(" ");

  const panelStyle =
    useFixedRect && rect
      ? {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          bottom: "auto" as const,
          right: "auto" as const,
        }
      : undefined;

  return (
    <div className={panelClass} style={panelStyle}>
      <div className="pillar-panel-card">
        <button
          type="button"
          className="pillar-panel-close"
          onClick={close}
          aria-label="Close"
        >
          ×
        </button>

        <CardCornerTicks />

        <h1 className="pillar-panel-title">{title}</h1>
        <div className="pillar-panel-body-wrap">
          <div ref={bodyRef} className="pillar-panel-body">
            {children}
          </div>
          <div
            className="pillar-panel-fade pillar-panel-fade--top"
            data-on={fadeTop ? "true" : "false"}
            aria-hidden="true"
          />
          <div
            className="pillar-panel-fade pillar-panel-fade--bottom"
            data-on={fadeBottom ? "true" : "false"}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
