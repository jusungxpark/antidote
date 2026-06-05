"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { CARDS, CARD_ASPECT } from "./config";
import { TraceCardShell } from "./trace-card-shell";
import { useTraceSimulation, type SimHandle } from "./use-trace-simulation";
import { PerCardCanvas } from "./r3f-card";
import type { CardDefinition } from "./config";
import { useScene } from "../SceneShell";

// ── Card size ──
const CARD_PX = 380;

// ── DOM Card Wrapper ──

function DomCard({
  card,
  simHandle,
  onClick,
  cardSize,
}: {
  card: CardDefinition;
  simHandle: SimHandle;
  onClick?: () => void;
  cardSize: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shellWrapRef = useRef<HTMLDivElement>(null);
  const { stateRef, setHover, setPointer } = simHandle;
  const rafRef = useRef(0);

  const w = cardSize;
  const h = cardSize * CARD_ASPECT;

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
      onClick={onClick}
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
  const { startTransition, transitioning } = useScene();
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleCardClick = useCallback(
    (cardIdx: number) => {
      const el = cardWrapperRefs.current[cardIdx];
      if (!el) return;
      const rect = el.getBoundingClientRect();

      startTransition({
        href: CARDS[cardIdx].href,
        title: CARDS[cardIdx].title,
        titleStart: { x: rect.left + 22, y: rect.bottom - 20 - 28 },
        mirror: false,
      });
    },
    [startTransition]
  );

  const [cardPx, setCardPx] = useState(CARD_PX);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      setCardPx(vw <= 768 ? Math.floor(vw - 48) : CARD_PX);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
      className="trace-cards-container"
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
        <div
          key={idx}
          ref={(el) => {
            cardWrapperRefs.current[idx] = el;
          }}
          className={transitioning ? "card-exit" : "card-enter"}
        >
          <DomCard
            card={card}
            simHandle={sims[idx]}
            onClick={() => handleCardClick(idx)}
            cardSize={cardPx}
          />
        </div>
      ))}
    </div>
  );
}
