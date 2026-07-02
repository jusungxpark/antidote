// ============================================================
// PROPOSAL VISUAL — THE MARGIN BRIDGE  [FIXED PER SECTOR]
// Floating waterfall with conservative RANGES, not points.
// Same numbers in both variants; only the framing changes
// ("capacity & margin headroom" vs "EBITDA bridge") — that
// lives in the section title, not here.
// ============================================================

import { linearScale } from "../scales";
import { INK, GREY, GREY_SOFT, HAIRLINE, ACCENT, ACCENT_SOFT } from "../theme";

type Step = {
  label: string;
  lo: number;
  hi: number;
  type: "start" | "delta" | "end";
};

export default function MarginBridge({
  steps,
  width = 860,
  height = 420,
}: {
  steps: Step[];
  width?: number;
  height?: number;
}) {
  const m = { t: 40, r: 24, b: 76, l: 56 };
  const y = linearScale([0, 50], [height - m.b, m.t]);
  const n = steps.length;
  const slot = (width - m.l - m.r) / n;
  const barW = Math.min(86, slot * 0.62);

  // cumulative midpoints for waterfall positioning
  let cum = 0;
  const bars = steps.map((s, i) => {
    const mid = (s.lo + s.hi) / 2;
    let y0: number, y1: number;
    if (s.type === "start") {
      cum = mid;
      y0 = 0;
      y1 = mid;
    } else if (s.type === "delta") {
      y0 = cum;
      cum = cum + mid;
      y1 = cum;
    } else {
      y0 = 0;
      y1 = mid;
    }
    const cx = m.l + slot * i + slot / 2;
    return { ...s, mid, y0, y1, cx };
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Margin bridge">
      {/* baseline + y ticks */}
      <line x1={m.l} y1={height - m.b} x2={width - m.r} y2={height - m.b} stroke={INK} />
      {[0, 10, 20, 30, 40, 50].map((v) => (
        <g key={v}>
          <line x1={m.l - 5} y1={y(v)} x2={m.l} y2={y(v)} stroke={INK} />
          <text x={m.l - 10} y={y(v) + 4} textAnchor="end" fontSize={11} fontFamily="var(--r-mono)" fill={GREY}>
            {v}%
          </text>
        </g>
      ))}

      {bars.map((b, i) => {
        const top = Math.max(b.y0, b.y1);
        const bot = Math.min(b.y0, b.y1);
        const isNeg = b.type === "delta" && b.mid < 0;
        const fill =
          b.type === "start" ? GREY_SOFT : b.type === "end" ? ACCENT : isNeg ? GREY_SOFT : ACCENT_SOFT;
        const stroke = b.type === "end" ? ACCENT : isNeg ? GREY : b.type === "start" ? GREY : ACCENT;

        const rangeText =
          b.type === "delta"
            ? `${b.mid < 0 ? "" : "+"}${b.lo}-${b.hi}pp`
            : `${b.lo}-${b.hi}%`;

        return (
          <g key={b.label}>
            {/* connector to next bar */}
            {i < bars.length - 1 && bars[i + 1].type === "delta" && (
              <line
                x1={b.cx + barW / 2}
                y1={y(b.type === "delta" ? b.y1 : b.mid)}
                x2={bars[i + 1].cx - barW / 2}
                y2={y(b.type === "delta" ? b.y1 : b.mid)}
                stroke={HAIRLINE}
                strokeWidth={1}
              />
            )}
            {i < bars.length - 1 && bars[i + 1].type === "end" && (
              <line x1={b.cx + barW / 2} y1={y(b.y1)} x2={bars[i + 1].cx - barW / 2} y2={y(b.y1)} stroke={HAIRLINE} strokeWidth={1} />
            )}

            <rect
              x={b.cx - barW / 2}
              y={y(top)}
              width={barW}
              height={Math.max(2, y(bot) - y(top))}
              fill={fill}
              stroke={stroke}
              strokeWidth={1}
            />
            <text x={b.cx} y={y(top) - 8} textAnchor="middle" fontSize={12.5} fontWeight={620} fontFamily="var(--r-sans)" fill={isNeg ? GREY : b.type === "end" ? ACCENT : INK}>
              {rangeText}
            </text>
            {/* x label, wrapped manually at ~14 chars */}
            {b.label.split(" ").reduce<string[][]>(
              (lines, word) => {
                const last = lines[lines.length - 1];
                if ((last.join(" ") + " " + word).trim().length > 14) lines.push([word]);
                else last.push(word);
                return lines;
              },
              [[]]
            ).map((line, li) => (
              <text key={li} x={b.cx} y={height - m.b + 20 + li * 15} textAnchor="middle" fontSize={11.5} fontFamily="var(--r-mono)" fill={GREY}>
                {line.join(" ")}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
