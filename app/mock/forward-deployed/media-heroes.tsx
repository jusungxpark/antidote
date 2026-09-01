"use client";

import { useEffect, useRef } from "react";

type Vec3 = [number, number, number];

function fibSphere(count: number): Vec3[] {
  const pts: Vec3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (2 * (i + 0.5)) / count;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * golden;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return pts;
}

function dist3(a: Vec3, b: Vec3) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function lerp3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function normalize3(v: Vec3): Vec3 {
  const m = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / m, v[1] / m, v[2] / m];
}

/** k-nearest neighbor graph on the sphere — denser whole ball than a hard threshold. */
function buildEdges(nodes: Vec3[], k = 5): [number, number][] {
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const ranked = nodes
      .map((n, j) => (j === i ? null : { j, d: dist3(nodes[i], n) }))
      .filter((x): x is { j: number; d: number } => x !== null)
      .sort((a, b) => a.d - b.d)
      .slice(0, k);
    for (const { j } of ranked) {
      const a = Math.min(i, j);
      const b = Math.max(i, j);
      const key = `${a}:${b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([a, b]);
    }
  }
  return edges;
}

function project(
  p: Vec3,
  yaw: number,
  pitch: number,
  cx: number,
  cy: number,
  radius: number,
): { x: number; y: number; z: number } {
  const sy = Math.sin(yaw);
  const cyaw = Math.cos(yaw);
  const sp = Math.sin(pitch);
  const cp = Math.cos(pitch);
  const x1 = p[0] * cyaw + p[2] * sy;
  const z1 = -p[0] * sy + p[2] * cyaw;
  const y2 = p[1] * cp - z1 * sp;
  const z2 = p[1] * sp + z1 * cp;
  return {
    x: cx + x1 * radius,
    y: cy - y2 * radius,
    z: z2,
  };
}

type Traveler = {
  path: number[];
  startedAt: number;
  hopMs: number;
};

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function spawnPath(
  start: number,
  adj: number[][],
  hops: number,
  salt: number,
): number[] {
  const path = [start];
  let cur = start;
  const used = new Set<string>();
  for (let h = 0; h < hops; h++) {
    const nbrs = adj[cur];
    if (!nbrs.length) break;
    let best = -1;
    let bestScore = -Infinity;
    for (let i = 0; i < nbrs.length; i++) {
      const n = nbrs[i];
      const a = Math.min(cur, n);
      const b = Math.max(cur, n);
      const key = `${a}:${b}`;
      if (path.includes(n) && h < hops - 1) continue;
      const score =
        Math.sin(salt * 12.9898 + n * 78.233 + h * 4.1) * 0.5 +
        0.5 -
        (used.has(key) ? 0.35 : 0);
      if (score > bestScore) {
        bestScore = score;
        best = n;
      }
    }
    if (best < 0) break;
    const a = Math.min(cur, best);
    const b = Math.max(cur, best);
    used.add(`${a}:${b}`);
    path.push(best);
    cur = best;
  }
  return path;
}

/** Hub hero: Beautiful UI-style flowchart (trigger → offerings on a dotted canvas). */
export function HubHeroDeploy({
  onEnter,
}: {
  onEnter: (site: "strategy" | "diligence" | "transformation") => void;
}) {
  const steps = [
    {
      site: "strategy" as const,
      title: "Strategy",
      body: "Fund, asset, company",
      kind: "Point of view",
    },
    {
      site: "diligence" as const,
      title: "Diligence",
      body: "Evidence on the asset",
      kind: "Evidence",
    },
    {
      site: "transformation" as const,
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



export function StrategyHeroVisual() {
  const steps = [
    {
      kind: "01 Fund",
      title: "Investment",
      body: "Where a PE firm puts capital in the AI era",
    },
    {
      kind: "02 Deal",
      title: "Asset",
      body: "How defensible a named company still is",
    },
    {
      kind: "03 Own",
      title: "Portco",
      body: "What to rebuild AI-native under ownership",
    },
  ];

  return (
    <aside className="fdm-strat-report" aria-hidden="true">
      <div className="fdm-strat-report-paper fdm-strat-report-paper--back" />
      <div className="fdm-strat-report-paper fdm-strat-report-paper--mid" />
      <div className="fdm-strat-report-sheet">
        <header className="fdm-strat-report-meta">
          <span>Exhibit A</span>
          <span>Altitude map</span>
          <span>03 / 18</span>
        </header>

        <p className="fdm-strat-report-eyebrow">Governing question</p>
        <h3 className="fdm-strat-report-title">What decision is this?</h3>
        <p className="fdm-strat-report-lede">
          Strategy is not one memo. It is the altitude of the capital, the
          named asset, or the company already owned.
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
            <span className="kind">Hand-off</span>
            <strong>Diligence or rebuild</strong>
            <em>The next offering inherits a decision, not a catalog</em>
          </li>
        </ol>
      </div>
    </aside>
  );
}

/** Connecting orb — scales with stage; travelers hop edges then fade out. */
export function TransformHeroVisual() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const NODE_N = 72;
    const K_NEIGHBORS = 7;
    const nodes = fibSphere(NODE_N);
    const edges = buildEdges(nodes, K_NEIGHBORS);
    const adj: number[][] = Array.from({ length: NODE_N }, () => []);
    for (const [a, b] of edges) {
      adj[a].push(b);
      adj[b].push(a);
    }

    const travelers: Traveler[] = [];
    let nextWaveAt = 0;
    let waveSalt = 1;
    let size = 440;
    let dpr = 1;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const syncSize = () => {
      const css = Math.max(
        220,
        Math.round(canvas.clientWidth || canvas.parentElement?.clientWidth || 440),
      );
      dpr = Math.min(
        2,
        (typeof devicePixelRatio !== "undefined" && devicePixelRatio) || 1,
      );
      size = css;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    };

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const paint = (nowMs: number) => {
      const tSec = nowMs / 1000;
      const yaw = tSec * 0.18;
      const pitch = 0.32 + Math.sin(tSec * 0.11) * 0.04;
      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.42;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      const projected = nodes.map((n) => project(n, yaw, pitch, cx, cy, radius));

      const edgeOrder = edges
        .map(([a, b], i) => ({
          a,
          b,
          z: (projected[a].z + projected[b].z) / 2,
          i,
        }))
        .sort((x, y) => x.z - y.z);
      for (const { a, b, z } of edgeOrder) {
        const pa = projected[a];
        const pb = projected[b];
        const depth = (z + 1) / 2;
        const alpha = 0.16 + 0.5 * depth;
        ctx.strokeStyle = `rgba(23,18,18,${alpha})`;
        ctx.lineWidth = Math.max(0.55, (0.7 + depth * 0.75) * (size / 440));
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      const order = projected
        .map((p, i) => ({ p, i }))
        .sort((a, b) => a.p.z - b.p.z);
      const scale = size / 440;
      for (const { p, i } of order) {
        const depth = (p.z + 1) / 2;
        const pulse = 1 + 0.05 * Math.sin(tSec * 1.55 + i * 1.7);
        const r = (1.7 + 2.9 * depth) * pulse * scale;
        const alpha = 0.22 + 0.7 * depth;
        ctx.fillStyle = `rgba(23,18,18,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (reduced) return;

      if (nowMs >= nextWaveAt) {
        const burst = 5;
        const seed = Math.floor(waveSalt * 17) % NODE_N;
        for (let b = 0; b < burst; b++) {
          const start = (seed + b * 13) % NODE_N;
          const hops = 3 + ((seed + b) % 3);
          const path = spawnPath(start, adj, hops, waveSalt + b * 1.7);
          if (path.length < 2) continue;
          travelers.push({
            path,
            startedAt: nowMs + b * 120,
            hopMs: 480 + (b % 3) * 50,
          });
        }
        waveSalt += 1.37;
        nextWaveAt = nowMs + 1750;
      }

      for (let ti = travelers.length - 1; ti >= 0; ti--) {
        const tr = travelers[ti];
        const local = nowMs - tr.startedAt;
        if (local < 0) continue;

        const hops = tr.path.length - 1;
        const total = hops * tr.hopMs;
        if (local >= total) {
          travelers.splice(ti, 1);
          continue;
        }

        const hop = Math.min(hops - 1, Math.floor(local / tr.hopMs));
        const u = (local - hop * tr.hopMs) / tr.hopMs;
        const from = nodes[tr.path[hop]];
        const to = nodes[tr.path[hop + 1]];
        const mid = normalize3(lerp3(from, to, easeInOut(u)));
        const p = project(mid, yaw, pitch, cx, cy, radius);
        const depth = (p.z + 1) / 2;

        let fade = 1;
        if (hop === 0 && u < 0.22) fade = u / 0.22;
        if (hop === hops - 1 && u > 0.72) fade = (1 - u) / 0.28;
        fade = Math.max(0, Math.min(1, fade));

        const r = (2.8 + 2.6 * depth) * (0.85 + 0.15 * fade) * scale;
        const alpha = (0.45 + 0.5 * depth) * fade;

        if (u > 0.08) {
          const trail = normalize3(
            lerp3(from, to, easeInOut(Math.max(0, u - 0.18))),
          );
          const tp = project(trail, yaw, pitch, cx, cy, radius);
          ctx.strokeStyle = `rgba(23,18,18,${0.28 * fade * (0.35 + 0.65 * depth)})`;
          ctx.lineWidth = 1.7 * scale;
          ctx.beginPath();
          ctx.moveTo(tp.x, tp.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(23,18,18,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    syncSize();

    if (reduced) {
      paint(800);
      return;
    }

    let raf = 0;
    let running = false;
    const loop = () => {
      paint(performance.now());
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      nextWaveAt = performance.now() + 200;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    paint(performance.now());

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            syncSize();
            if (!running) paint(performance.now());
          })
        : null;
    ro?.observe(canvas);

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
      ro?.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <aside className="fdm-tx-visual" aria-hidden="true">
      <div className="fdm-tx-orb-stage">
        <div className="fdm-tx-orb-glow" />
        <canvas ref={ref} className="fdm-tx-orb-canvas" />
      </div>
    </aside>
  );
}
