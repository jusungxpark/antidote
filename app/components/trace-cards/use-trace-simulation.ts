// ── React hook for trace simulation ──
// Manages per-card simulation state with a ref-based animation loop

import { useCallback, useEffect, useRef } from "react";
import type { CardDefinition, CardState } from "./config";
import { createCardState, stepSimulation } from "./simulation";

export interface SimHandle {
  stateRef: React.RefObject<CardState>;
  setHover: (hovered: boolean) => void;
  setPointer: (x: number, y: number) => void;
}

export function useTraceSimulation(card: CardDefinition): SimHandle {
  const stateRef = useRef<CardState>(createCardState(card));
  const hoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const cardRef = useRef(card);
  cardRef.current = card;

  useEffect(() => {
    const tick = () => {
      const now = performance.now();
      const dt = lastTimeRef.current
        ? Math.min((now - lastTimeRef.current) / 1000, 0.05)
        : 0.016;
      lastTimeRef.current = now;

      stepSimulation(
        stateRef.current,
        cardRef.current,
        dt,
        hoveredRef.current,
        pointerRef.current.x,
        pointerRef.current.y
      );

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const setHover = useCallback((hovered: boolean) => {
    hoveredRef.current = hovered;
  }, []);

  const setPointer = useCallback((x: number, y: number) => {
    pointerRef.current.x = x;
    pointerRef.current.y = y;
  }, []);

  return { stateRef, setHover, setPointer };
}
