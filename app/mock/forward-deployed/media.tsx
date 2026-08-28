"use client";

import { useEffect, useRef } from "react";
import { resolvePreset } from "thinking-orbs";
import { MODE_FRAMES } from "thinking-orbs/engine";

/** Hub hero: Beautiful UI-style flowchart (trigger → offerings on a dotted canvas). */
export function HubHeroDeploy({
  onEnter,
}: {
  onEnter: (site: "strategy" | "diligence" | "transformation") => void;
}) {
  const steps = [
    {
      site: "strategy" as const,
      n: "01",
      title: "Strategy",
      body: "Where margin moves",
      kind: "Point of view",
    },
    {
      site: "diligence" as const,
      n: "02",
      title: "Diligence",
      body: "Evidence on the asset",
      kind: "Evidence",
    },
    {
      site: "transformation" as const,
      n: "03",
      title: "Transformation",
      body: "Agents in production",
      kind: "Delivery",
    },
  ];

  return (
    <aside className="fdm-hub-flow" aria-label="Forward deployed offerings">
      <div className="fdm-hub-flow-canvas">
        <div className="fdm-hub-flow-dots" aria-hidden="true" />

        <div className="fdm-hub-flow-trigger">
          <span className="fdm-hub-flow-pill">Trigger</span>
          <strong>Forward deploy</strong>
          <em>into the work that still runs on people</em>
        </div>

        <div className="fdm-hub-flow-rail" aria-hidden="true">
          <i />
        </div>

        <ol className="fdm-hub-flow-steps">
          {steps.map((s, i) => (
            <li key={s.site} style={{ animationDelay: `${120 + i * 90}ms` }}>
              <button
                type="button"
                className="fdm-hub-flow-step"
                onClick={() => onEnter(s.site)}
              >
                <span className="fdm-hub-flow-step-n">{s.n}</span>
                <span className="fdm-hub-flow-step-kind">{s.kind}</span>
                <strong>{s.title}</strong>
                <em>{s.body}</em>
                <span className="fdm-hub-flow-step-go" aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}



/** Sticky deal-cycle phases — pre-close → close → ownership (Rogo-style pin). */
export function DealCycleSticky({
  onEnter,
}: {
  onEnter: (site: "strategy" | "diligence" | "transformation") => void;
}) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  const phases = [
    {
      n: "01",
      title: "Before the check",
      body: "You are underwriting a thesis or an AI-exposed asset before capital is committed. The gap is a clear answer, not another demo.",
      icon: (
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" {...stroke} />
          <circle cx="12" cy="12" r="2.25" {...stroke} />
          <path d="M12 2.5V5.5M12 18.5V21.5M2.5 12H5.5M18.5 12H21.5" {...stroke} />
        </svg>
      ),
      bullets: [
        {
          site: "strategy" as const,
          label: "Strategy",
          text: "Where value accrues, what must be true, and what to fund or refuse",
        },
        {
          site: "diligence" as const,
          label: "Diligence",
          text: "Evidence on capability, cost, defensibility, and unknowns — unmixed",
        },
        {
          site: "transformation" as const,
          label: "Transformation",
          text: "Readiness and the first thin path agents can own on day one",
        },
      ],
    },
    {
      n: "02",
      title: "Around close",
      body: "Open questions and the 100-day plan have to survive contact with the asset. What stays unresolved gets carried, not buried.",
      icon: (
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path d="M4 12H10" {...stroke} />
          <path d="M14 12H20" {...stroke} />
          <path d="M10 8V16M14 8V16" {...stroke} />
          <path d="M7 9L4 12L7 15M17 9L20 12L17 15" {...stroke} />
        </svg>
      ),
      bullets: [
        {
          site: "strategy" as const,
          label: "Strategy",
          text: "100-day plan and sequencing once the check clears",
        },
        {
          site: "diligence" as const,
          label: "Diligence",
          text: "Open questions carried with claim status still visible",
        },
        {
          site: "transformation" as const,
          label: "Transformation",
          text: "First agents live on a path that can hold under load",
        },
      ],
    },
    {
      n: "03",
      title: "Under ownership",
      body: "The thesis has to become P&L after the org pushes back. Delivery and re-underwriting stay on the same spine.",
      icon: (
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path d="M4 20H20" {...stroke} />
          <path d="M6 20V10L12 5L18 10V20" {...stroke} />
          <path d="M10 20V14H14V20" {...stroke} />
        </svg>
      ),
      bullets: [
        {
          site: "strategy" as const,
          label: "Strategy",
          text: "Roadmap, change, and an operating model that survives contact",
        },
        {
          site: "diligence" as const,
          label: "Diligence",
          text: "Re-underwrite when the facts move under ownership",
        },
        {
          site: "transformation" as const,
          label: "Transformation",
          text: "Production agents with guardrails that hold in the real stack",
        },
      ],
    },
  ];

  return (
    <section
      className="fdm-sticky-pain fdm-sticky-pain--left fdm-deal-cycle"
      aria-label="Help that matches where you are"
    >
      <div className="fdm-sticky-pain-head">
        <h2>Help that matches where you are.</h2>
        <p>
          The same three offerings before and after close. What changes is the
          question we answer — and how Strategy, Diligence, and Transformation
          bridge the gap from your seat in the cycle.
        </p>
      </div>

      <ul className="fdm-sticky-pain-list">
        {phases.map((phase) => (
          <li key={phase.title} className="fdm-sticky-pain-row fdm-deal-cycle-row">
            <span className="fdm-sticky-pain-icon" aria-hidden="true">
              {phase.icon}
            </span>
            <div className="fdm-sticky-pain-copy">
              <span className="fdm-deal-cycle-n">{phase.n}</span>
              <strong>{phase.title}</strong>
              <p>{phase.body}</p>
              <ul className="fdm-deal-cycle-bullets">
                {phase.bullets.map((b) => (
                  <li key={b.site}>
                    <button
                      type="button"
                      className="fdm-deal-cycle-bullet"
                      data-site={b.site}
                      onClick={() => onEnter(b.site)}
                    >
                      <span>{b.label}</span>
                      <em>{b.text}</em>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Quiet line icons for offering rows. */
function OfferingIcon({
  kind,
}: {
  kind: "strategy" | "diligence" | "transformation";
}) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  switch (kind) {
    case "strategy":
      // Value map: ascending bars to the P&L
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M4 19H20" {...stroke} />
          <path d="M7 19V14" {...stroke} />
          <path d="M12 19V10" {...stroke} />
          <path d="M17 19V5" {...stroke} />
        </svg>
      );
    case "diligence":
      // Evidence: clipboard with a measured check
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M8 4.5H9.2C9.6 3.6 10.5 3 11.5 3H12.5C13.5 3 14.4 3.6 14.8 4.5H16C17.1 4.5 18 5.4 18 6.5V19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19V6.5C6 5.4 6.9 4.5 8 4.5Z"
            {...stroke}
          />
          <path d="M9.5 12.2L11.2 13.9L14.8 10.2" {...stroke} />
        </svg>
      );
    case "transformation":
      // Agents in the stack: linked nodes
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <circle cx="6.5" cy="7" r="2.25" {...stroke} />
          <circle cx="17.5" cy="7" r="2.25" {...stroke} />
          <circle cx="12" cy="17" r="2.25" {...stroke} />
          <path d="M8.5 8.2L10.4 14.6" {...stroke} />
          <path d="M15.5 8.2L13.6 14.6" {...stroke} />
          <path d="M8.75 7H15.25" {...stroke} />
        </svg>
      );
  }
}

/** Offering block for hub grid — title, lede, quiet visual panel. */
export function OfferingBlock({
  kind,
  title,
  body,
  stack,
  onClick,
}: {
  kind: "strategy" | "diligence" | "transformation";
  title: string;
  body: string;
  stack: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className="fdm-offer-block" onClick={onClick}>
      <div className="fdm-offer-block-copy">
        <strong>{title}</strong>
        <p>{body}</p>
        <em>{stack}</em>
      </div>
      <span className="fdm-offer-block-visual" aria-hidden="true">
        <span className="fdm-offer-block-visual-glow" />
        <span className="fdm-offer-block-visual-icon">
          <OfferingIcon kind={kind} />
        </span>
      </span>
    </button>
  );
}

/** Proof samples, quiet list, different from offering rows. */
export function ProofRow({
  series,
  title,
  body,
}: {
  series: string;
  title: string;
  body: string;
}) {
  return (
    <article className="fdm-proof-row">
      <span>{series}</span>
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    </article>
  );
}

/** Strategy hero: cropped report exhibit (fades into the page like a real deliverable). */
export function StrategyHeroVisual() {
  const steps = [
    {
      kind: "Exposed",
      title: "Friction layer",
      body: "Commoditizes when intelligence is cheap",
    },
    {
      kind: "Protected",
      title: "Outcome ownership",
      body: "Structural work that still holds the margin",
    },
    {
      kind: "Compounding",
      title: "Agent delivery",
      body: "Where transformation turns POV into P&L",
    },
  ];

  return (
    <aside className="fdm-strat-report" aria-hidden="true">
      <div className="fdm-strat-report-paper fdm-strat-report-paper--back" />
      <div className="fdm-strat-report-paper fdm-strat-report-paper--mid" />
      <div className="fdm-strat-report-sheet">
        <header className="fdm-strat-report-meta">
          <span>Exhibit A</span>
          <span>Value map</span>
          <span>04 / 18</span>
        </header>

        <p className="fdm-strat-report-eyebrow">Governing question</p>
        <h3 className="fdm-strat-report-title">Where does value accrue?</h3>
        <p className="fdm-strat-report-lede">
          When the model can already do the task, margin moves to ownership of
          outcomes, not to the capability itself.
        </p>

        <div className="fdm-strat-report-rule" />

        <ol className="fdm-strat-report-rows">
          {steps.map((s) => (
            <li key={s.title}>
              <span className="kind">{s.kind}</span>
              <strong>{s.title}</strong>
              <em>{s.body}</em>
            </li>
          ))}
          <li className="is-ghost" aria-hidden="true">
            <span className="kind">Sequenced</span>
            <strong>What to fund next</strong>
            <em>Kill criteria and the first Transformation thin path</em>
          </li>
        </ol>
      </div>
    </aside>
  );
}

/** Connecting orb, calm, sparse, depth via size + opacity (reference-like). */
export function TransformHeroVisual() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const size = 440;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const dpr = Math.min(
      2,
      (typeof devicePixelRatio !== "undefined" && devicePixelRatio) || 1,
    );
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { mode, speed: baseSpeed, opts } = resolvePreset("connecting", 64);
    // Density/speed for a large calm hero; radii sized for ~440px canvas.
    const tuned = {
      ...opts,
      nodeN: 28,
      thr: 0.85,
      signals: 2,
      nodeR: 3.4,
      nodeRDepth: 5.8,
      lineW: 1.25,
      rMin: 1.15,
      rsPow: 0.42,
    };
    const build = MODE_FRAMES[mode];
    const animSpeed = baseSpeed * 0.24;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (tSec: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      const { dots, lines } = build(size, tSec, tuned);

      for (const line of lines) {
        const depth = Math.min(1, Math.max(0, line.white ?? 0.4));
        const alpha = (line.a ?? 1) * (0.18 + 0.42 * (1 - depth));
        const g = Math.round(40 + depth * 110);
        ctx.strokeStyle = `rgba(${g},${g},${g},${alpha})`;
        ctx.lineWidth = Math.max(0.6, (line.w ?? 1) * 0.85);
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      }

      const sorted = [...dots].sort((a, b) => a.z - b.z);
      for (const dot of sorted) {
        const depth = Math.min(1, Math.max(0, dot.white ?? 0.4));
        // Back dots: lighter + softer. Front: darker + fuller.
        const alpha = (dot.a ?? 1) * (0.28 + 0.72 * (1 - depth * 0.85));
        const g = Math.round(28 + depth * 150);
        ctx.fillStyle = `rgba(${g},${g},${g},${alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.max(tuned.rMin, dot.r), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (reduced) {
      paint(0.8);
      return;
    }

    let raf = 0;
    let running = false;
    const loop = () => {
      paint((performance.now() / 1000) * animSpeed);
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    paint((performance.now() / 1000) * animSpeed);

    let visible = true;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && document.visibilityState !== "hidden") start();
            else stop();
          })
        : null;
    io?.observe(canvas);
    const onVis = () => {
      if (document.visibilityState === "hidden") stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVis);
    if (!io) start();

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [size]);

  return (
    <aside className="fdm-tx-visual" aria-hidden="true">
      <div className="fdm-tx-orb-stage">
        <div className="fdm-tx-orb-glow" />
        <canvas
          ref={ref}
          className="fdm-tx-orb-canvas"
          width={size}
          height={size}
        />
      </div>
    </aside>
  );
}
