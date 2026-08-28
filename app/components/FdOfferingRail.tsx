"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FD_OFFERINGS } from "./fd-offerings";

/** Match CSS exit: 720ms + reverse stagger (2 * 140ms) */
const EXIT_MS = 720 + 2 * 140;

/** Offering cards under the miniaturized caduceus (outside the FD expandable panel). */
export function FdOfferingRail({ visible }: { visible: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(visible);
  const [exiting, setExiting] = useState(false);
  const [fadeTop, setFadeTop] = useState(false);
  const [fadeBottom, setFadeBottom] = useState(false);
  const enterGen = useRef(0);

  useEffect(() => {
    if (visible) {
      enterGen.current += 1;
      setExiting(false);
      setMounted(true);
      return;
    }

    if (!mounted) return;

    setExiting(true);
    const timer = window.setTimeout(() => {
      setMounted(false);
      setExiting(false);
      setFadeTop(false);
      setFadeBottom(false);
    }, EXIT_MS);

    return () => window.clearTimeout(timer);
  }, [visible, mounted]);

  const updateFades = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      setFadeTop(false);
      setFadeBottom(false);
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = el;
    const canScroll = scrollHeight > clientHeight + 2;
    setFadeTop(canScroll && scrollTop > 2);
    setFadeBottom(canScroll && scrollTop + clientHeight < scrollHeight - 2);
  }, []);

  useEffect(() => {
    if (!mounted || exiting) {
      setFadeTop(false);
      setFadeBottom(false);
      return;
    }

    const el = scrollRef.current;
    if (!el) return;

    updateFades();
    // Re-check after enter animation settles (cards finish sliding in)
    const settle = window.setTimeout(updateFades, 1200);

    el.addEventListener("scroll", updateFades, { passive: true });
    window.addEventListener("resize", updateFades);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateFades)
        : null;
    ro?.observe(el);

    return () => {
      window.clearTimeout(settle);
      el.removeEventListener("scroll", updateFades);
      window.removeEventListener("resize", updateFades);
      ro?.disconnect();
    };
  }, [mounted, exiting, updateFades]);

  if (!mounted) return null;

  return (
    <aside
      className={`fd-offer-rail${exiting ? " is-exiting" : ""}`}
      aria-label="Forward Deployed offerings"
      aria-hidden={exiting || !visible}
    >
      <div ref={scrollRef} className="fd-offer-rail-scroll">
        {FD_OFFERINGS.map((offering, index) => (
          <article
            key={`${offering.title}-${enterGen.current}`}
            className={`fd-offer-rail-card${exiting ? " is-exiting" : ""}`}
            style={{ ["--offer-i" as string]: index }}
          >
            <h3 className="fd-offer-rail-title">{offering.title}</h3>
            <ul className="fd-offer-rail-list">
              {offering.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div
        className="fd-offer-rail-fade fd-offer-rail-fade--top"
        data-on={!exiting && fadeTop ? "true" : "false"}
        aria-hidden="true"
      />
      <div
        className="fd-offer-rail-fade fd-offer-rail-fade--bottom"
        data-on={!exiting && fadeBottom ? "true" : "false"}
        aria-hidden="true"
      />
    </aside>
  );
}
