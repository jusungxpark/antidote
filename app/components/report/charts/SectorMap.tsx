// ============================================================
// GRAPH A — THE SECTOR MAP  [FIXED PER SECTOR]
// x: share of delivery labor AI can absorb (0–100)
// y: revenue defensibility (0–100)
// Built once per sector family; the only per-report change is
// which dot is highlighted (from sector JSON + highlight id).
// ============================================================

import { linearScale } from "../scales";
import { INK, GREY, GREY_SOFT, HAIRLINE, ACCENT, CHART_DOT_STROKE } from "../theme";

type Point = {
  id: string;
  label: string;
  x: number;
  y: number;
  dx?: number;
  dy?: number;
};

export default function SectorMap({
  points,
  highlight,
  width = 860,
  height = 560,
}: {
  points: Point[];
  highlight: string;
  width?: number;
  height?: number;
}) {
  const m = { t: 36, r: 30, b: 58, l: 58 };
  const x = linearScale([0, 100], [m.l, width - m.r]);
  const y = linearScale([0, 100], [height - m.b, m.t]);
  const SPLIT = 55; // quadrant divider

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Sector map">
      {/* frame */}
      <line x1={m.l} y1={height - m.b} x2={width - m.r} y2={height - m.b} stroke={INK} strokeWidth={1} />
      <line x1={m.l} y1={m.t} x2={m.l} y2={height - m.b} stroke={INK} strokeWidth={1} />

      {/* quadrant dividers */}
      <line x1={x(SPLIT)} y1={m.t} x2={x(SPLIT)} y2={height - m.b} stroke={HAIRLINE} strokeWidth={1} />
      <line x1={m.l} y1={y(SPLIT)} x2={width - m.r} y2={y(SPLIT)} stroke={HAIRLINE} strokeWidth={1} />

      {/* quadrant captions */}
      <text x={width - m.r - 6} y={m.t + 16} textAnchor="end" fontSize={12} fontFamily="var(--r-mono)" letterSpacing="0.08em" fill={ACCENT}>
        RE-RATES
      </text>
      <text x={m.l + 8} y={m.t + 16} fontSize={12} fontFamily="var(--r-mono)" letterSpacing="0.08em" fill={GREY}>
        PROTECTED BUT HEAVY
      </text>
      <text x={width - m.r - 6} y={height - m.b - 10} textAnchor="end" fontSize={12} fontFamily="var(--r-mono)" letterSpacing="0.08em" fill={GREY}>
        RACE TO THE BOTTOM
      </text>
      <text x={m.l + 8} y={height - m.b - 10} fontSize={12} fontFamily="var(--r-mono)" letterSpacing="0.08em" fill={GREY}>
        SAFE FOR NOW
      </text>

      {/* axis ticks */}
      {[0, 50, 100].map((v) => (
        <g key={`xt${v}`}>
          <line x1={x(v)} y1={height - m.b} x2={x(v)} y2={height - m.b + 5} stroke={INK} />
          <text x={x(v)} y={height - m.b + 20} textAnchor="middle" fontSize={11} fontFamily="var(--r-mono)" fill={GREY}>
            {v}
          </text>
        </g>
      ))}
      {[0, 50, 100].map((v) => (
        <g key={`yt${v}`}>
          <line x1={m.l - 5} y1={y(v)} x2={m.l} y2={y(v)} stroke={INK} />
          <text x={m.l - 10} y={y(v) + 4} textAnchor="end" fontSize={11} fontFamily="var(--r-mono)" fill={GREY}>
            {v}
          </text>
        </g>
      ))}

      {/* axis titles */}
      <text x={(m.l + width - m.r) / 2} y={height - 12} textAnchor="middle" fontSize={12} fontFamily="var(--r-mono)" letterSpacing="0.06em" fill={INK}>
        SHARE OF DELIVERY LABOR AI CAN ABSORB →
      </text>
      <text transform={`translate(16 ${(m.t + height - m.b) / 2}) rotate(-90)`} textAnchor="middle" fontSize={12} fontFamily="var(--r-mono)" letterSpacing="0.06em" fill={INK}>
        REVENUE DEFENSIBILITY →
      </text>

      {/* dots */}
      {points.map((p) => {
        const hot = p.id === highlight;
        const px = x(p.x);
        const py = y(p.y);
        const lx = px + (p.dx ?? 0);
        const ly = py + (p.dy ?? -12);
        return (
          <g key={p.id}>
            <circle cx={px} cy={py} r={hot ? 9 : 5} fill={hot ? ACCENT : GREY_SOFT} stroke={hot ? CHART_DOT_STROKE : "none"} strokeWidth={hot ? 2 : 0} />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              fontSize={hot ? 13.5 : 11.5}
              fontWeight={hot ? 650 : 450}
              fontFamily="var(--r-sans)"
              fill={hot ? INK : GREY}
            >
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
