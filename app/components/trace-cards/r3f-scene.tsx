"use client";

import { useRef, useEffect, useCallback } from "react";
import { CARDS, CARD_ASPECT } from "./config";
import { TraceCardShell } from "./trace-card-shell";
import { useTraceSimulation, type SimHandle } from "./use-trace-simulation";
import { PerCardCanvas } from "./r3f-card";
import { AsciiSTL } from "../AsciiSTL";
import type { CardDefinition } from "./config";

// ── Card size ──
const CARD_PX = 380;

// ── DOM Card Wrapper ──

function DomCard({
  card,
  simHandle,
}: {
  card: CardDefinition;
  simHandle: SimHandle;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shellWrapRef = useRef<HTMLDivElement>(null);
  const { stateRef, setHover, setPointer } = simHandle;
  const rafRef = useRef(0);

  const w = CARD_PX;
  const h = CARD_PX * CARD_ASPECT;

  const handlePointerEnter = useCallback(() => setHover(true), [setHover]);
  const handlePointerLeave = useCallback(() => setHover(false), [setHover]);
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setPointer(
        Math.max(-1, Math.min(1, nx)),
        Math.max(-1, Math.min(1, ny))
      );
    },
    [setPointer]
  );

  // Animate CSS tilt
  useEffect(() => {
    const animate = () => {
      const state = stateRef.current;
      if (shellWrapRef.current) {
        shellWrapRef.current.style.transform =
          `perspective(1200px) rotateX(${state.tiltX}deg) rotateY(${state.tiltY}deg)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [stateRef]);

  return (
    <div
      ref={cardRef}
      style={{
        width: w,
        height: h,
        cursor: "pointer",
      }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <div
        ref={shellWrapRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <TraceCardShell card={card} stateRef={stateRef} cardSize={w} />
        <PerCardCanvas card={card} stateRef={stateRef} />
      </div>
    </div>
  );
}

// ── Main Scene Export ──

export function TraceCardsScene() {
  const sim0 = useTraceSimulation(CARDS[0]);
  const sim1 = useTraceSimulation(CARDS[1]);
  const sims = [sim0, sim1];

  // Load fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Brand text — centered above caduceus */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: "clamp(18px, 2.5vh, 32px) clamp(24px, 3vw, 48px)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            color: "rgba(255, 248, 240, 0.9)",
            font: '400 clamp(16px, 1.6vw, 22px)/1 Georgia, "Times New Roman", serif',
            whiteSpace: "nowrap",
          }}
        >
          Antid<span style={{ fontStyle: "italic" }}>o</span>te.
        </span>
      </div>

      {/* ASCII caduceus — center of viewport */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "17.5%",
          width: "65%",
          height: "91%",
          zIndex: 2,
        }}
      >
        <AsciiSTL />
      </div>

      {/* DOM cards with per-card R3F canvases — bottom, one on each side */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 60,
          right: 60,
          zIndex: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {CARDS.map((card, idx) => (
          <div key={idx}>
            <DomCard card={card} simHandle={sims[idx]} />
          </div>
        ))}
      </div>
    </div>
  );
}
