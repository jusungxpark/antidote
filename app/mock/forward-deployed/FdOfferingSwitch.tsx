"use client";

import { useLayoutEffect, useRef } from "react";

type OfferingId = "strategy" | "diligence" | "transformation";

const OFFERINGS: ReadonlyArray<readonly [OfferingId, string]> = [
  ["strategy", "Strategy"],
  ["diligence", "Diligence"],
  ["transformation", "Transformation"],
];

export function FdOfferingSwitch({
  active,
  onSelect,
}: {
  active: OfferingId | "hub";
  onSelect: (id: OfferingId) => void;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const thumb = thumbRef.current;
    if (!root || !thumb) return;

    const sync = () => {
      const selected = root.querySelector<HTMLButtonElement>("button.is-active");
      if (!selected || active === "hub") {
        thumb.style.opacity = "0";
        return;
      }

      // Size/position the pill to the active button’s box. Equal 1/3 thumbs
      // clip long labels ("Transformation") when columns are content-sized.
      thumb.style.opacity = "1";
      thumb.style.left = "0px";
      thumb.style.width = `${selected.offsetWidth}px`;
      thumb.style.transform = `translateX(${selected.offsetLeft}px)`;
    };

    sync();

    const ro = new ResizeObserver(sync);
    ro.observe(root);
    for (const btn of root.querySelectorAll("button")) {
      ro.observe(btn);
    }
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [active]);

  return (
    <div
      ref={rootRef}
      className="fdm-offering-switch"
      role="tablist"
      aria-label="Offering"
      data-active={active === "hub" ? undefined : active}
    >
      <span
        ref={thumbRef}
        className="fdm-offering-switch-thumb"
        aria-hidden="true"
      />
      {OFFERINGS.map(([id, label]) => (
        <button
          key={id}
          type="button"
          role="tab"
          className={active === id ? "is-active" : undefined}
          aria-selected={active === id}
          onClick={() => onSelect(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
