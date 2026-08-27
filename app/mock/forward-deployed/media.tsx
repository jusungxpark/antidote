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



/** Deal-cycle tree, root → phases → offerings. */
export function CycleVisual({
  onEnter,
}: {
  onEnter: (site: "strategy" | "diligence" | "transformation") => void;
}) {
  const label = (site: "strategy" | "diligence" | "transformation") =>
    site === "transformation"
      ? "Transformation"
      : site[0]!.toUpperCase() + site.slice(1);

  const branches = [
    {
      phase: "Before the check",
      leaves: [
        { site: "strategy" as const, text: "Thesis & operating model" },
        { site: "diligence" as const, text: "Evidence on the asset" },
        { site: "transformation" as const, text: "Readiness & pilots" },
      ],
    },
    {
      phase: "Around close",
      leaves: [
        { site: "strategy" as const, text: "100-day plan" },
        { site: "diligence" as const, text: "Open questions carried" },
        { site: "transformation" as const, text: "First agents live" },
      ],
    },
    {
      phase: "Under ownership",
      leaves: [
        { site: "strategy" as const, text: "Roadmap & change" },
        { site: "diligence" as const, text: "Re-underwrite" },
        { site: "transformation" as const, text: "Production agents" },
      ],
    },
  ];

  return (
    <div className="fdm-tree" aria-label="Deal cycle tree">
      <div className="fdm-tree-root">
        <span>Where you are</span>
      </div>

      <div className="fdm-tree-trunk" aria-hidden="true">
        <i className="fdm-tree-stem" />
        <i className="fdm-tree-rail" />
        <i className="fdm-tree-hub" />
      </div>

      <div className="fdm-tree-branches">
        {branches.map((branch, i) => (
          <div key={branch.phase} className="fdm-tree-branch">
            <div className="fdm-tree-join" aria-hidden="true">
              <i />
            </div>
            <div className="fdm-tree-phase">
              <em>{String(i + 1).padStart(2, "0")}</em>
              <span>{branch.phase}</span>
            </div>
            <div className="fdm-tree-twig" aria-hidden="true" />
            <ul className="fdm-tree-leaves">
              {branch.leaves.map((leaf) => (
                <li key={`${branch.phase}-${leaf.site}`}>
                  <button
                    type="button"
                    className="fdm-tree-leaf"
                    data-site={leaf.site}
                    onClick={() => onEnter(leaf.site)}
                  >
                    <span className="fdm-tree-leaf-site">{label(leaf.site)}</span>
                    <strong>{leaf.text}</strong>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Offering doors, large editorial rows, CDD “kinds of work” energy. */
export function OfferingRow({
  index,
  title,
  body,
  stack,
  onClick,
}: {
  index: string;
  title: string;
  body: string;
  stack: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className="fdm-offer-row" onClick={onClick}>
      <span className="fdm-offer-idx">{index}</span>
      <div className="fdm-offer-copy">
        <strong>{title}</strong>
        <p>{body}</p>
        <em>{stack}</em>
      </div>
      <span className="fdm-offer-go">Explore →</span>
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
  const size = 280;

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
    // Density/speed for a large calm hero, radii sized for ~280px canvas
    // (engine radiusScale alone leaves dots too hairline at this size).
    const tuned = {
      ...opts,
      nodeN: 24,
      thr: 0.85,
      signals: 2,
      nodeR: 2.6,
      nodeRDepth: 4.4,
      lineW: 1.05,
      rMin: 0.9,
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
          style={{ width: size, height: size }}
        />
      </div>
    </aside>
  );
}
