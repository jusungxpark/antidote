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

      // Dynamic sheen — metallic specular highlight from upper-left light
      if (sheenRef.current) {
        // Sheen position moves opposite to tilt (specular reflection)
        const sheenX = 30 - state.tiltY * 2.0;
        const sheenY = 20 + state.tiltX * 2.0;

        // Brighter when card faces upper-left light (tiltX>0=up, tiltY<0=left)
        const lightFacing = (state.tiltX - state.tiltY) * 0.02;
        const sheenOpacity = Math.max(0.12, Math.min(0.85, 0.35 + lightFacing));

        sheenRef.current.style.background = [
          // Hot specular core — near-white silver
          `radial-gradient(ellipse 60% 40% at ${sheenX}% ${sheenY}%, rgba(250,252,255,${sheenOpacity}) 0%, transparent 40%)`,
          // Mid-range silver wash
          `radial-gradient(ellipse 130% 100% at ${sheenX}% ${sheenY}%, rgba(215,220,235,${sheenOpacity * 0.45}) 0%, transparent 55%)`,
          // Full-surface silver ambient
          `radial-gradient(ellipse 200% 200% at 50% 50%, rgba(195,205,220,${sheenOpacity * 0.2}) 0%, transparent 75%)`,
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
          radial-gradient(ellipse 90% 70% at 25% 5%, rgba(225,230,245,0.14) 0%, transparent 50%),
          radial-gradient(ellipse 70% 55% at 75% 85%, rgba(195,205,225,0.08) 0%, transparent 45%),
          linear-gradient(155deg, #2e3140 0%, #232630 28%, #181a22 60%, #101218 100%)
        `,
        border: "1px solid rgba(215,225,245,0.22)",
        backdropFilter: "blur(12px)",
        fontFamily: "'JetBrains Mono', monospace",
        color: "#fff",
        userSelect: "none",
      }}
    >
      {/* Dynamic sheen overlay — metallic specular, moves with tilt */}
      <div
        ref={sheenRef}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: CARD_UI.cornerRadius,
          background:
            "radial-gradient(ellipse 90% 70% at 30% 20%, rgba(230,235,250,0.22) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      {/* Metallic edge highlight — subtle rim light along top/left edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: CARD_UI.cornerRadius,
          background:
            "linear-gradient(165deg, rgba(235,240,255,0.18) 0%, transparent 35%, transparent 75%, rgba(180,190,215,0.1) 100%)",
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
