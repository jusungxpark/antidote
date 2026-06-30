"use client";

import { useRef, useEffect } from "react";
import type { CardDefinition, CardState } from "./config";
import { CARD_ASPECT } from "./config";
import { CardCornerTicks } from "../CardCornerTicks";
import { CARD_FACE } from "./card-face-layout";
import { CardFaceLabels } from "./CardFaceLabels";
import { CardFaceBottom } from "./CardFaceBottom";

interface TraceCardShellProps {
  card: CardDefinition;
  stateRef: React.RefObject<CardState>;
  cardSize: number;
  forceIdle?: boolean;
}

export function TraceCardShell({
  card,
  stateRef,
  cardSize,
  forceIdle = false,
}: TraceCardShellProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const w = cardSize;
  const h = cardSize * CARD_ASPECT;

  const idleBg = { r: 11, g: 10, b: 9 };
  const hoverBg = { r: 34, g: 32, b: 29 };

  useEffect(() => {
    const animate = () => {
      const state = stateRef.current;
      const t = forceIdle ? 0 : state.hover;
      const tiltX = forceIdle ? 0 : state.tiltX;
      const tiltY = forceIdle ? 0 : state.tiltY;

      if (shellRef.current) {
        const r = Math.round(idleBg.r + (hoverBg.r - idleBg.r) * t);
        const g = Math.round(idleBg.g + (hoverBg.g - idleBg.g) * t);
        const b = Math.round(idleBg.b + (hoverBg.b - idleBg.b) * t);
        shellRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        shellRef.current.style.borderColor = `rgba(255,255,255,${0.13 + t * 0.14})`;
        shellRef.current.style.boxShadow = [
          `${-tiltY * 3}px ${10 + tiltX * 2 + t * 8}px ${22 + t * 26}px -12px rgba(0,0,0,${0.5 + t * 0.3})`,
          `${-tiltY * 2}px ${5 + t * 5}px ${10 + t * 10}px -5px rgba(0,0,0,${0.32 + t * 0.2})`,
          `inset 0 1px 0 rgba(255,255,255,${0.08 + t * 0.08})`,
          `inset 0 -2px 4px rgba(0,0,0,${0.42 + t * 0.14})`,
          `inset 2px 0 4px rgba(0,0,0,${0.18 + t * 0.08})`,
          `inset -2px 0 4px rgba(0,0,0,${0.22 + t * 0.1})`,
        ].join(", ");
      }

      if (vignetteRef.current) {
        vignetteRef.current.style.background = [
          `radial-gradient(120% 95% at ${50 - tiltY * 4}% ${46 - tiltX * 3}%, transparent 42%, rgba(0,0,0,${0.18 + t * 0.1}) 100%)`,
          `linear-gradient(${145 + tiltY * 8}deg, rgba(255,255,255,${0.04 + t * 0.05}) 0%, transparent 34%)`,
        ].join(", ");
      }

      if (sheenRef.current) {
        const sheenAngle = 118 + tiltY * 14 - tiltX * 8;
        const sheenA = 0.09 + t * 0.12;
        const sheenB = 0.035 + t * 0.045;
        sheenRef.current.style.background = [
          `linear-gradient(${sheenAngle}deg, rgba(255,255,255,${sheenA}) 0%, rgba(255,255,255,${sheenB}) 24%, transparent 54%)`,
          `linear-gradient(${sheenAngle + 168}deg, rgba(255,255,255,${sheenB * 0.7}) 0%, transparent 42%)`,
        ].join(", ");
        sheenRef.current.style.opacity = String(0.55 + t * 0.45);
      }

      // Subtle scanline glow that shifts with tilt — very faint, terminal-like
      if (scanlineRef.current) {
        const glowY = 50 + tiltX * 1.5;
        const glowOpacity = Math.max(0.02, Math.min(0.08, 0.04 + (tiltX - tiltY) * 0.004));
        scanlineRef.current.style.background =
          `radial-gradient(ellipse 100% 8% at 50% ${glowY}%, rgba(255,255,255,${glowOpacity}) 0%, transparent 100%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [stateRef, forceIdle]);

  return (
    <div
      ref={shellRef}
      className="trace-card-shell"
      style={{
        width: w,
        height: h,
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
        background: "var(--card-bg)",
        border: "1px solid rgba(255,255,255,0.13)",
        fontFamily: "var(--font-sans)",
        color: "rgba(255,255,255,0.85)",
        userSelect: "none",
      }}
    >
      {/* Depth vignette — convex plate read */}
      <div
        ref={vignetteRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {/* Metallic sheen — shifts with tilt for depth */}
      <div
        ref={sheenRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          mixBlendMode: "soft-light",
        }}
      />

      {/* Faint tilt-reactive scanline glow */}
      <div
        ref={scanlineRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      <CardCornerTicks />

      {/* Top section */}
      <div
        style={{
          position: "absolute",
          top: CARD_FACE.topY,
          left: CARD_FACE.insetX,
          right: CARD_FACE.insetX,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <CardFaceLabels
          labels={card.labels}
          className="trace-card-fadeable trace-card-labels"
        />
      </div>

      <CardFaceBottom
        title={card.title}
        subtitle={card.description}
        titleClassName="trace-card-title"
        subtitleClassName="trace-card-fadeable trace-card-subtitle"
      />
    </div>
  );
}
