"use client";

import { useRef, useEffect } from "react";
import type { CardDefinition, CardState } from "./config";
import { CARD_ASPECT, CARD_UI } from "./config";

interface TraceCardShellProps {
  card: CardDefinition;
  stateRef: React.RefObject<CardState>;
  cardSize: number;
}

export function TraceCardShell({
  card,
  stateRef,
  cardSize,
}: TraceCardShellProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const liveDotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const w = cardSize;
  const h = cardSize * CARD_ASPECT;

  useEffect(() => {
    const animate = () => {
      const state = stateRef.current;
      if (shellRef.current) {
        shellRef.current.style.opacity = String(state.shellOpacity);
      }

      // Dynamic sheen — specular-like highlight from upper-left light
      if (sheenRef.current) {
        // Sheen position moves opposite to tilt (specular reflection)
        const sheenX = 30 - state.tiltY * 1.2;
        const sheenY = 25 + state.tiltX * 1.2;

        // Brighter when card faces upper-left light (tiltX>0=up, tiltY<0=left)
        const lightFacing = (state.tiltX - state.tiltY) * 0.004;
        const sheenOpacity = Math.max(0.04, Math.min(0.28, 0.1 + lightFacing));

        sheenRef.current.style.background = [
          `radial-gradient(ellipse 120% 100% at ${sheenX}% ${sheenY}%, rgba(255,255,255,${sheenOpacity}) 0%, transparent 65%)`,
          `radial-gradient(ellipse 60% 50% at ${sheenX + 10}% ${sheenY - 5}%, rgba(255,255,255,${sheenOpacity * 0.4}) 0%, transparent 40%)`,
        ].join(", ");
      }

      // Live badge pulse
      if (liveDotRef.current) {
        const brightness = state.hover > 0.5 ? 1 : 0.45;
        liveDotRef.current.style.opacity = String(brightness);
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [stateRef]);

  return (
    <div
      ref={shellRef}
      className="trace-card-shell"
      style={{
        width: w,
        height: h,
        borderRadius: CARD_UI.cornerRadius,
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(ellipse 90% 70% at 25% 5%, rgba(255,255,255,0.06) 0%, transparent 55%),
          radial-gradient(ellipse 60% 50% at 80% 90%, rgba(255,255,255,0.02) 0%, transparent 45%),
          linear-gradient(155deg, #252830 0%, #1a1c22 35%, #111318 70%, #0d0e12 100%)
        `,
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        fontFamily: "'JetBrains Mono', monospace",
        color: "#fff",
        userSelect: "none",
      }}
    >
      {/* Dynamic sheen overlay — moves with tilt, lit from upper-left */}
      <div
        ref={sheenRef}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: CARD_UI.cornerRadius,
          background:
            "radial-gradient(ellipse 120% 100% at 30% 25%, rgba(255,255,255,0.1) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Top section */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 24,
          right: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Labels (replacing coordinates) */}
        <div style={{ fontSize: 10, letterSpacing: "0.05em" }}>
          <div
            style={{
              opacity: CARD_UI.coordsLabelOpacity,
              marginBottom: 4,
              textTransform: "uppercase",
            }}
          >
            Focus:
          </div>
          <div
            style={{
              opacity: CARD_UI.coordsValueOpacity,
              display: "flex",
              gap: 16,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {card.labels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>

        {/* Live badge */}
        <div
          ref={liveDotRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 12,
            fontSize: 10,
            letterSpacing: "0.04em",
            opacity: CARD_UI.liveBadgeIdleOpacity,
            transition: "opacity 200ms",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#ef4444",
              display: "inline-block",
            }}
          />
          Live
        </div>
      </div>

      {/* Bottom section */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 24,
          right: 24,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
            fontWeight: 400,
            lineHeight: 1,
            marginBottom: 6,
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: CARD_UI.descriptionOpacity,
          }}
        >
          {card.description}
        </div>
      </div>
    </div>
  );
}
