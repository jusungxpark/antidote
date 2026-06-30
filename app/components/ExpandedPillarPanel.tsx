"use client";

import { useEffect, useCallback, useMemo, useState, type ReactNode } from "react";
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

export function ExpandedPillarPanel({
  side,
  title,
  returningHome = false,
  children,
}: ExpandedPillarPanelProps) {
  const pathname = usePathname();
  const { startReturnTransition, transition } = useScene();
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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

  const seamless =
    transition?.direction === "forward" &&
    transition !== null &&
    pathname === transition.href;

  const handoff =
    returningHome ||
    transition?.direction === "reverse" ||
    (transition?.direction === "forward" && !seamless);

  const useFixedRect = viewport.w > 768;
  const rect = useMemo(() => {
    if (!useFixedRect) return null;
    void viewport;
    return computePillarTargetRect(side === "right");
  }, [side, viewport, useFixedRect]);

  const panelClass = [
    "pillar-panel",
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
        <div className="pillar-panel-body">{children}</div>
      </div>
    </div>
  );
}
