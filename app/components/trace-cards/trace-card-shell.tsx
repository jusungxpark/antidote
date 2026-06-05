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
  const scanlineRef = useRef<HTMLDivElement>(null);
  const liveDotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const w = cardSize;
  const h = cardSize * CARD_ASPECT;

  useEffect(() => {
    const animate = () => {
      const state = stateRef.current;

      // Subtle scanline glow that shifts with tilt — very faint, terminal-like
      if (scanlineRef.current) {
        const glowY = 50 + state.tiltX * 1.5;
        const glowOpacity = Math.max(0.02, Math.min(0.08, 0.04 + (state.tiltX - state.tiltY) * 0.004));
        scanlineRef.current.style.background =
          `radial-gradient(ellipse 100% 8% at 50% ${glowY}%, rgba(255,255,255,${glowOpacity}) 0%, transparent 100%)`;
      }

      // Live badge pulse
      if (liveDotRef.current) {
        const brightness = state.hover > 0.5 ? 0.9 : 0.35;
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
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
        background: "#000",
        border: "1px solid rgba(255,255,255,0.13)",
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: "rgba(255,255,255,0.85)",
        userSelect: "none",
      }}
    >
      {/* Faint tilt-reactive scanline glow */}
      <div
        ref={scanlineRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {/* Corner tick marks — wireframe/blueprint feel */}
      {/* Top-left */}
      <div style={{ position: "absolute", top: 6, left: 6, width: 12, height: 1, background: "rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", top: 6, left: 6, width: 1, height: 12, background: "rgba(255,255,255,0.2)" }} />
      {/* Top-right */}
      <div style={{ position: "absolute", top: 6, right: 6, width: 12, height: 1, background: "rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", top: 6, right: 6, width: 1, height: 12, background: "rgba(255,255,255,0.2)" }} />
      {/* Bottom-left */}
      <div style={{ position: "absolute", bottom: 6, left: 6, width: 12, height: 1, background: "rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", bottom: 6, left: 6, width: 1, height: 12, background: "rgba(255,255,255,0.2)" }} />
      {/* Bottom-right */}
      <div style={{ position: "absolute", bottom: 6, right: 6, width: 12, height: 1, background: "rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", bottom: 6, right: 6, width: 1, height: 12, background: "rgba(255,255,255,0.2)" }} />

      {/* Top section */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 22,
          right: 22,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Labels */}
        <div style={{ fontSize: 9, letterSpacing: "0.1em", fontFamily: "Georgia, 'Times New Roman', serif" }}>
          <div
            style={{
              opacity: 0.4,
              marginBottom: 5,
              textTransform: "uppercase",
            }}
          >
            Focus:
          </div>
          <div
            style={{
              opacity: 0.3,
              display: "flex",
              gap: 14,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {card.labels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>

        {/* Live badge — hollow outline style */}
        <div
          ref={liveDotRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "3px 8px",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 1,
            fontSize: 9,
            letterSpacing: "0.08em",
            opacity: CARD_UI.liveBadgeIdleOpacity,
            transition: "opacity 200ms",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.6)",
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
          left: 22,
          right: 22,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1,
            marginBottom: 6,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.3,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          {card.description}
        </div>
      </div>
    </div>
  );
}
