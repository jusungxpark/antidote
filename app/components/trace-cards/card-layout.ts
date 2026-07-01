import { CARD_ASPECT } from "./config";

const CARD_PX = 380;
const CONTAINER_SIDE = 60;

export interface LayoutRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function clamp(min: number, preferred: number, max: number): number {
  return Math.min(Math.max(preferred, min), max);
}

/** Matches `.scene-caduceus--left` / `--right` horizontal sizing in globals.css */
export function getCaduceusHorizontalBounds(vw: number, mirror: boolean) {
  const edgePad = clamp(40, vw * 0.05, 80);
  const width = clamp(180, vw * 0.28, 380);
  if (mirror) {
    return { left: edgePad, right: edgePad + width };
  }
  const left = vw - edgePad - width;
  return { left, right: vw - edgePad };
}

export function computePillarTargetRect(mirror: boolean): LayoutRect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const top = clamp(84, vh * 0.11, 108);
  const bottom = clamp(58, vh * 0.065, 68);
  const pad = clamp(24, vw * 0.03, 48);
  const gap = clamp(16, vw * 0.02, 32);
  const height = vh - top - bottom;
  const caduceus = getCaduceusHorizontalBounds(vw, mirror);

  if (mirror) {
    const left = caduceus.right + gap;
    return { top, left, width: vw - pad - left, height };
  }

  return { top, left: pad, width: caduceus.left - gap - pad, height };
}

export function computeHomeCardRect(cardIndex: number): LayoutRect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cardPx = vw <= 768 ? Math.floor(vw - 48) : CARD_PX;
  const height = cardPx * CARD_ASPECT;
  const bottom = Math.min(Math.max(80, vh * 0.1), 100);
  const top = vh - bottom - height;

  if (vw <= 768) {
    const gap = 16;
    const stackTop = top - (cardIndex * (height + gap));
    return {
      top: Math.max(120, stackTop),
      left: (vw - cardPx) / 2,
      width: cardPx,
      height,
    };
  }

  const left =
    cardIndex === 0 ? CONTAINER_SIDE : vw - CONTAINER_SIDE - cardPx;

  return { top, left, width: cardPx, height };
}
