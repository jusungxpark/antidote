"use client";

import { useRef, useEffect, useCallback, useState, useLayoutEffect, type CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CARDS, CARD_ASPECT } from "./config";
import { TraceCardShell } from "./trace-card-shell";
import { useTraceSimulation, type SimHandle } from "./use-trace-simulation";
import { PerCardCanvas } from "./r3f-card";
import type { CardDefinition, CardState } from "./config";
import { useScene } from "../SceneShell";

// ── Card size ──
const CARD_PX = 380;

function resetCardNeutral(state: CardState) {
  state.hover = 0;
  state.pointerX = 0;
  state.pointerY = 0;
  state.tiltX = 0;
  state.tiltY = 0;
  state.tiltZ = 0;
  state.targetTiltX = 0;
  state.targetTiltY = 0;
  state.targetTiltZ = 0;
}

const CARD_THICKNESS = 16;

function CardExtrusion({
  stateRef,
  forceIdle = false,
}: {
  stateRef: React.RefObject<CardState>;
  forceIdle?: boolean;
}) {
  const backRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      const t = forceIdle ? 0 : stateRef.current.hover;

      if (backRef.current) {
        backRef.current.style.transform = `translateZ(-${CARD_THICKNESS}px)`;
        backRef.current.style.opacity = String(0.88 + t * 0.12);
      }
      if (bottomRef.current) {
        const r = Math.round(24 + t * 10);
        const g = Math.round(22 + t * 10);
        const b = Math.round(19 + t * 8);
        bottomRef.current.style.background = `linear-gradient(to bottom, rgb(${r},${g},${b}), rgb(7,6,5))`;
      }
      if (rightRef.current) {
        rightRef.current.style.background = `linear-gradient(to left, rgb(${18 + t * 6},${16 + t * 6},${14 + t * 5}), rgb(8,7,6))`;
      }
      if (leftRef.current) {
        leftRef.current.style.background = `linear-gradient(to right, rgb(${34 + t * 10},${32 + t * 10},${28 + t * 8}), rgb(12,11,10))`;
      }
      if (groundRef.current) {
        groundRef.current.style.transform = `translateZ(-${CARD_THICKNESS + 10}px) translateY(${8 + t * 6}px)`;
        groundRef.current.style.opacity = String(0.42 + t * 0.28);
      }

      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [stateRef, forceIdle]);

  const edgeBase: CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    backfaceVisibility: "hidden",
  };

  return (
    <>
      <div
        ref={groundRef}
        style={{
          ...edgeBase,
          inset: "-24%",
          background:
            "radial-gradient(ellipse 72% 46% at 50% 52%, rgba(0,0,0,0.72), transparent 72%)",
        }}
      />
      <div
        ref={backRef}
        style={{
          ...edgeBase,
          inset: 0,
          borderRadius: 2,
          background: "#060605",
          border: "1px solid rgba(255,255,255,0.035)",
          boxShadow: "inset 0 0 24px rgba(0,0,0,0.45)",
        }}
      />
      <div
        ref={bottomRef}
        style={{
          ...edgeBase,
          left: 0,
          right: 0,
          bottom: 0,
          height: CARD_THICKNESS,
          transformOrigin: "center bottom",
          transform: "rotateX(-90deg)",
          background: "linear-gradient(to bottom, #1c1a18, #070605)",
        }}
      />
      <div
        ref={rightRef}
        style={{
          ...edgeBase,
          top: 0,
          bottom: 0,
          right: 0,
          width: CARD_THICKNESS,
          transformOrigin: "right center",
          transform: "rotateY(-90deg)",
          background: "linear-gradient(to left, #141210, #090807)",
        }}
      />
      <div
        ref={leftRef}
        style={{
          ...edgeBase,
          top: 0,
          bottom: 0,
          left: 0,
          width: CARD_THICKNESS,
          transformOrigin: "left center",
          transform: "rotateY(90deg)",
          background: "linear-gradient(to right, #242220, #0e0d0c)",
        }}
      />
    </>
  );
}

// ── DOM Card Wrapper ──

function DomCard({
  card,
  simHandle,
  onClick,
  cardSize,
  forceIdle = false,
}: {
  card: CardDefinition;
  simHandle: SimHandle;
  onClick?: () => void;
  cardSize: number;
  forceIdle?: boolean;
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

  // Animate CSS tilt, lift, and ambient shadow
  useEffect(() => {
    const animate = () => {
      const state = stateRef.current;
      const t = forceIdle ? 0 : state.hover;
      const tiltX = forceIdle ? 0 : state.tiltX;
      const tiltY = forceIdle ? 0 : state.tiltY;

      if (shellWrapRef.current) {
        const lift = t * -10;
        const popZ = t * 12;
        const scale = 1 + t * 0.014;
        shellWrapRef.current.style.transform = [
          `rotateX(${tiltX}deg)`,
          `rotateY(${tiltY}deg)`,
          `translateY(${lift}px)`,
          `translateZ(${popZ}px)`,
          `scale(${scale})`,
        ].join(" ");
        const shadowY = 14 + t * 20;
        const shadowBlur = 28 + t * 34;
        const shadowAlpha = 0.48 + t * 0.32;
        shellWrapRef.current.style.filter = [
          `drop-shadow(${-tiltY * 6}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha}))`,
          `drop-shadow(${-tiltY * 3}px ${8 + t * 10}px ${14 + t * 16}px rgba(0,0,0,${0.28 + t * 0.18}))`,
        ].join(" ");
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [stateRef, forceIdle]);

  return (
    <div
      ref={cardRef}
      style={{
        width: w,
        height: h,
        cursor: "pointer",
        perspective: "820px",
        perspectiveOrigin: "50% 42%",
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
          willChange: "transform, filter",
        }}
      >
        <CardExtrusion stateRef={stateRef} forceIdle={forceIdle} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "translateZ(0)",
            transformStyle: "preserve-3d",
          }}
        >
          <TraceCardShell
            card={card}
            stateRef={stateRef}
            cardSize={w}
            forceIdle={forceIdle}
          />
        <div className="trace-card-hologram trace-card-fadeable">
          <PerCardCanvas card={card} stateRef={stateRef} />
        </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Scene Export ──

export function TraceCardsScene() {
  const pathname = usePathname();
  const router = useRouter();
  const { startTransition, transition, transitionPhase, beginCollapse, cardsIntroDone } =
    useScene();
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isHome = pathname === "/";
  // Only mount home cards on `/`. Visibility during reverse is gated by pending classes
  // so destination cards don't sit in the end spot while the overlay is still collapsing.
  const showCards = isHome;

  const [cardPx, setCardPx] = useState(() => {
    if (typeof window === "undefined") return CARD_PX;
    const vw = window.innerWidth;
    // Match mobile --mobile-edge inset (~22–28px each side)
    return vw <= 768 ? Math.max(240, Math.floor(vw - 56)) : CARD_PX;
  });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      setCardPx(vw <= 768 ? Math.max(240, Math.floor(vw - 56)) : CARD_PX);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const sim0 = useTraceSimulation(CARDS[0]);
  const sim1 = useTraceSimulation(CARDS[1]);
  const sims = [sim0, sim1];
  const simsRef = useRef(sims);
  simsRef.current = sims;

  const forceIdle = transition?.direction === "reverse";

  useEffect(() => {
    CARDS.forEach((card) => router.prefetch(card.href));
  }, [router]);

  useEffect(() => {
    if (transition?.direction !== "reverse") return;
    simsRef.current.forEach((sim) => {
      sim.setHover(false);
      sim.setPointer(0, 0);
      resetCardNeutral(sim.stateRef.current);
    });
  }, [transition?.direction, transition?.cardIndex]);

  const handleCardClick = useCallback(
    (cardIdx: number) => {
      const el = cardWrapperRefs.current[cardIdx];
      if (!el) return;

      const sim = simsRef.current[cardIdx];
      if (sim) {
        sim.setHover(false);
        sim.setPointer(0, 0);
        resetCardNeutral(sim.stateRef.current);
      }

      const measureAndStart = () => {
        const rect = el.getBoundingClientRect();
        const card = CARDS[cardIdx];

        startTransition({
          href: card.href,
          title: card.title,
          subtitle: card.description,
          labels: card.labels,
          cardIndex: cardIdx,
          cardRect: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          },
          titleStart: { x: rect.left + 22, y: rect.bottom - 35 - 28 },
          mirror: cardIdx === 1,
          direction: "forward",
        });
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(measureAndStart);
      });
    },
    [startTransition]
  );

  useLayoutEffect(() => {
    if (
      !isHome ||
      transition?.direction !== "reverse" ||
      transitionPhase !== 1
    ) {
      return;
    }

    const idx = transition.cardIndex;
    let cancelled = false;
    let attempts = 0;

    const measure = () => {
      if (cancelled) return;
      const el = cardWrapperRefs.current[idx];
      if (!el) {
        attempts += 1;
        if (attempts < 60) requestAnimationFrame(measure);
        return;
      }

      const sim = simsRef.current[idx];
      if (sim) {
        sim.setHover(false);
        sim.setPointer(0, 0);
        resetCardNeutral(sim.stateRef.current);
      }

      const rect = el.getBoundingClientRect();
      beginCollapse({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };

    measure();

    return () => {
      cancelled = true;
    };
  }, [isHome, transition, transitionPhase, beginCollapse]);

  // Load fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      className={`trace-cards-container${showCards ? "" : " trace-cards-container--hidden"}`}
      style={{
        position: "absolute",
        bottom: "clamp(80px, 10vh, 100px)",
        left: 60,
        right: 60,
        zIndex: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      {CARDS.map((card, idx) => {
        const isForward = transition?.direction === "forward";
        const isReverse = transition?.direction === "reverse";
        const activeIdx = transition?.cardIndex ?? null;

        let cardClass = cardsIntroDone ? "card-idle" : "card-enter";
        if (isForward && activeIdx === idx) {
          // Keep source visible until overlay has covered it (phase 1) to avoid a hole/flicker
          cardClass =
            transitionPhase === 0
              ? "card-expand-source-pending"
              : "card-expand-source";
        } else if (isForward && activeIdx !== null && activeIdx !== idx) {
          cardClass = "card-sibling-fade";
        } else if (isReverse && activeIdx !== null) {
          // Stay invisible for the whole reverse morph; overlay is the only visible card.
          // Revealed as card-idle when transition clears.
          cardClass =
            activeIdx === idx
              ? "card-collapse-pending"
              : "card-sibling-pending";
        }

        return (
          <div
            key={idx}
            ref={(el) => {
              cardWrapperRefs.current[idx] = el;
            }}
            className={cardClass}
          >
            <DomCard
              card={card}
              simHandle={sims[idx]}
              onClick={() => handleCardClick(idx)}
              cardSize={cardPx}
              forceIdle={forceIdle}
            />
          </div>
        );
      })}
    </div>
  );
}
