"use client";

import { useEffect, useRef } from "react";

const SCROLL_TOP_TOLERANCE = 8;
const DISMISS_THRESHOLD = 120;
const ACCUMULATOR_DECAY_MS = 220;

export function useScrollUpDismiss(onDismiss: () => void, enabled = true) {
  const containerRef = useRef<HTMLDivElement>(null);
  const accumulatedRef = useRef(0);
  const dismissingRef = useRef(false);
  const decayTimerRef = useRef<number | null>(null);
  const touchStartYRef = useRef(0);
  const touchTrackingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const el = containerRef.current;
    if (!el) return;

    const resetAccumulator = () => {
      accumulatedRef.current = 0;
    };

    const scheduleDecay = () => {
      if (decayTimerRef.current !== null) {
        window.clearTimeout(decayTimerRef.current);
      }
      decayTimerRef.current = window.setTimeout(resetAccumulator, ACCUMULATOR_DECAY_MS);
    };

    const atTop = () => el.scrollTop <= SCROLL_TOP_TOLERANCE;

    const tryDismiss = () => {
      if (dismissingRef.current) return;
      if (accumulatedRef.current < DISMISS_THRESHOLD) return;

      dismissingRef.current = true;
      resetAccumulator();
      onDismiss();

      window.setTimeout(() => {
        dismissingRef.current = false;
      }, 1000);
    };

    const onWheel = (event: WheelEvent) => {
      if (!atTop()) {
        resetAccumulator();
        return;
      }

      if (event.deltaY >= 0) {
        resetAccumulator();
        return;
      }

      accumulatedRef.current += Math.abs(event.deltaY);
      scheduleDecay();
      tryDismiss();

      if (accumulatedRef.current > 0) {
        event.preventDefault();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!atTop()) {
        touchTrackingRef.current = false;
        return;
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
      touchTrackingRef.current = true;
      accumulatedRef.current = 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!touchTrackingRef.current || !atTop()) return;

      const currentY = event.touches[0]?.clientY ?? touchStartYRef.current;
      const pullDistance = currentY - touchStartYRef.current;

      if (pullDistance <= 0) {
        resetAccumulator();
        return;
      }

      accumulatedRef.current = pullDistance;
      scheduleDecay();
      tryDismiss();

      if (pullDistance > 12) {
        event.preventDefault();
      }
    };

    const onTouchEnd = () => {
      touchTrackingRef.current = false;
      scheduleDecay();
    };

    const onScroll = () => {
      if (!atTop()) {
        resetAccumulator();
        touchTrackingRef.current = false;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("scroll", onScroll);

      if (decayTimerRef.current !== null) {
        window.clearTimeout(decayTimerRef.current);
      }
    };
  }, [enabled, onDismiss]);

  return containerRef;
}
