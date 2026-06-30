import type { CSSProperties } from "react";

const TICK = "rgba(255,255,255,0.2)";

interface CardCornerTicksProps {
  inset?: number;
  size?: number;
}

export function CardCornerTicks({ inset = 6, size = 12 }: CardCornerTicksProps) {
  const line = (style: CSSProperties): CSSProperties => ({
    position: "absolute",
    pointerEvents: "none",
    background: TICK,
    ...style,
  });

  return (
    <>
      {/* Top-left */}
      <div style={line({ top: inset, left: inset, width: size, height: 1 })} />
      <div style={line({ top: inset, left: inset, width: 1, height: size })} />
      {/* Top-right */}
      <div style={line({ top: inset, right: inset, width: size, height: 1 })} />
      <div style={line({ top: inset, right: inset, width: 1, height: size })} />
      {/* Bottom-left */}
      <div style={line({ bottom: inset, left: inset, width: size, height: 1 })} />
      <div style={line({ bottom: inset, left: inset, width: 1, height: size })} />
      {/* Bottom-right */}
      <div style={line({ bottom: inset, right: inset, width: size, height: 1 })} />
      <div style={line({ bottom: inset, right: inset, width: 1, height: size })} />
    </>
  );
}
