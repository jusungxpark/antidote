// ============================================================
// GRAPH B — THE OPERATOR BENCHMARK  [CUSTOM DOT, FIXED FIELD]
// The hook chart. Grey peer field (5500-preparer × headcount
// pipeline), shaded productivity bands, and THE RECIPIENT as
// the single accent dot with a capacity arrow.
// variant="pe" adds the EBITDA strip on the right axis.
// ============================================================

import { linearScale, logScale, fmt } from "../scales";
import { INK, GREY, GREY_SOFT, ACCENT, ACCENT_SOFT, CHART_DOT_STROKE } from "../theme";

type Band = { lo: number; hi: number; label: string };
type Peer = { plans: number; fte: number };
type StripItem = { atY: number; label: string };

export default function OperatorBenchmark({
  peers,
  bands,
  company,
  ebitdaStrip,
  variant = "portco",
  width = 860,
  height = 540,
}: {
  peers: Peer[];
  bands: Band[];
  company: { label: string; plans: number; fte: number };
  ebitdaStrip?: StripItem[];
  variant?: "portco" | "pe";
  width?: number;
  height?: number;
}) {
  const isPE = variant === "pe";
  const m = { t: 34, r: isPE ? 150 : 36, b: 62, l: 60 };
  const x = logScale([50, 30000], [m.l, width - m.r]);
  const yMax = 260;
  const y = linearScale([0, yMax], [height - m.b, m.t]);

  const cPPF = company.plans / company.fte;
  const target = 120; // modern-stack band midpoint
  // Capacity framing, not headcount: hours the frontier hands back on the same book.
  const hoursBack = Math.max(
    0,
    Math.round((((target - cPPF) / target) * company.fte * 1800) / 500) * 500
  );

  const cx = x(company.plans);
  const cy = y(cPPF);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Operator benchmark">
      {/* bands first, behind everything */}
      {bands.map((b, i) => (
        <g key={b.label}>
          <rect
            x={m.l}
            y={y(b.hi)}
            width={width - m.l - m.r}
            height={y(b.lo) - y(b.hi)}
            fill={i === 0 ? "rgba(0,0,0,0.045)" : ACCENT_SOFT}
          />
          <text
            x={width - m.r - 8}
            y={y((b.lo + b.hi) / 2) + 4}
            textAnchor="end"
            fontSize={11}
            fontFamily="var(--r-mono)"
            letterSpacing="0.06em"
            fill={i === 0 ? GREY : ACCENT}
          >
            {b.label.toUpperCase()}
          </text>
        </g>
      ))}

      {/* frame */}
      <line x1={m.l} y1={height - m.b} x2={width - m.r} y2={height - m.b} stroke={INK} strokeWidth={1} />
      <line x1={m.l} y1={m.t} x2={m.l} y2={height - m.b} stroke={INK} strokeWidth={1} />

      {/* x ticks (log) */}
      {[100, 500, 2000, 10000, 30000].map((v) => (
        <g key={`xt${v}`}>
          <line x1={x(v)} y1={height - m.b} x2={x(v)} y2={height - m.b + 5} stroke={INK} />
          <text x={x(v)} y={height - m.b + 20} textAnchor="middle" fontSize={11} fontFamily="var(--r-mono)" fill={GREY}>
            {fmt(v)}
          </text>
        </g>
      ))}
      {/* y ticks */}
      {[0, 50, 100, 150, 200, 250].map((v) => (
        <g key={`yt${v}`}>
          <line x1={m.l - 5} y1={y(v)} x2={m.l} y2={y(v)} stroke={INK} />
          <text x={m.l - 10} y={y(v) + 4} textAnchor="end" fontSize={11} fontFamily="var(--r-mono)" fill={GREY}>
            {v}
          </text>
        </g>
      ))}

      {/* axis titles */}
      <text x={(m.l + width - m.r) / 2} y={height - 14} textAnchor="middle" fontSize={12} fontFamily="var(--r-mono)" letterSpacing="0.06em" fill={INK}>
        PLANS ADMINISTERED (LOG SCALE) →
      </text>
      <text transform={`translate(18 ${(m.t + height - m.b) / 2}) rotate(-90)`} textAnchor="middle" fontSize={12} fontFamily="var(--r-mono)" letterSpacing="0.06em" fill={INK}>
        PLANS PER FTE →
      </text>

      {/* PE variant: EBITDA strip on the right */}
      {isPE &&
        ebitdaStrip?.map((s) => (
          <text
            key={s.label}
            x={width - m.r + 14}
            y={y(s.atY) + 4}
            fontSize={11.5}
            fontFamily="var(--r-mono)"
            fill={INK}
          >
            {s.label}
          </text>
        ))}

      {/* peer field */}
      {peers.map((p, i) => {
        const ppf = Math.min(p.plans / p.fte, yMax - 4);
        return (
          <circle key={i} cx={x(p.plans)} cy={y(ppf)} r={4} fill={GREY_SOFT} opacity={0.6}>
            <title>{`TPA: ~${fmt(p.plans)} plans, ${p.fte} FTE (${Math.round(p.plans / p.fte)} plans/FTE)`}</title>
          </circle>
        );
      })}

      {/* capacity arrow: company → modern-stack band */}
      <defs>
        <marker id="arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill={ACCENT} />
        </marker>
      </defs>
      {cPPF < target && (
        <line x1={cx} y1={cy - 12} x2={cx} y2={y(target) + 8} stroke={ACCENT} strokeWidth={1.5} strokeDasharray="4 4" markerEnd="url(#arrow)" />
      )}

      {/* company dot */}
      <circle cx={cx} cy={cy} r={9} fill={ACCENT} stroke={CHART_DOT_STROKE} strokeWidth={2.5} />
      <text x={cx + 16} y={cy + 5} fontSize={13.5} fontWeight={650} fontFamily="var(--r-sans)" fill={INK}>
        {company.label}
      </text>
      <text x={cx + 16} y={cy + 22} fontSize={11.5} fontFamily="var(--r-mono)" fill={GREY}>
        ~{fmt(company.plans)} plans · {company.fte} staff · {Math.round(cPPF)}/FTE
      </text>

      {/* arrow annotation */}
      {cPPF < target && (
        <text x={cx + 14} y={y(target) + 26} fontSize={12} fontFamily="var(--r-sans)" fontWeight={560} fill={ACCENT}>
          {isPE
            ? "same book: approx. +15-20pp EBITDA headroom"
            : `same book: approx. ${fmt(hoursBack)} fewer manual hours / yr`}
        </text>
      )}
    </svg>
  );
}
