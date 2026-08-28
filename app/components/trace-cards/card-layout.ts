import { CARD_ASPECT } from "./config";

const CARD_PX = 380;
const CONTAINER_SIDE = 60;
/** Keep expanded Forward Deployed / Buyouts panels from stretching on ultrawide. */
const PILLAR_PANEL_MAX_WIDTH = 1032;

export interface LayoutRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function clamp(min: number, preferred: number, max: number): number {
  return Math.min(Math.max(preferred, min), max);
}

/**
 * Matches `.scene-caduceus--left` / `--right` horizontal sizing in globals.css.
 * On wide screens the caduceus sits in its half, pulled toward the centerline
 * instead of hugging the outer window edge.
 */
export function getCaduceusHorizontalBounds(vw: number, mirror: boolean) {
  const edgePad = clamp(40, vw * 0.05, 80);
  const width = clamp(180, vw * 0.28, 380);
  const gap = clamp(16, vw * 0.02, 32);
  const mid = vw / 2;

  if (mirror) {
    // Caduceus on the left half, toward center.
    const left = Math.max(edgePad, mid - width - gap);
    return { left, right: left + width };
  }

  // Caduceus on the right half, toward center.
  const left = Math.min(vw - edgePad - width, mid + gap);
  return { left, right: left + width };
}

export function computePillarTargetRect(
  mirror: boolean,
  vw = typeof window !== "undefined" ? window.innerWidth : 0,
  vh = typeof window !== "undefined"
    ? (window.visualViewport?.height ?? window.innerHeight)
    : 0
): LayoutRect {
  const top = clamp(84, vh * 0.11, 108);
  const bottom = clamp(58, vh * 0.065, 68);
  const pad = clamp(24, vw * 0.03, 48);
  const gap = clamp(16, vw * 0.02, 32);
  const height = Math.max(0, vh - top - bottom);
  const mid = vw / 2;
  const caduceus = getCaduceusHorizontalBounds(vw, mirror);

  if (mirror) {
    // Right-side panel (Buyouts): leftmost edge at least at center.
    const left = Math.max(mid, caduceus.right + gap);
    const available = Math.max(0, vw - pad - left);
    const width = Math.min(available, PILLAR_PANEL_MAX_WIDTH);
    return { top, left, width, height };
  }

  // Left-side panel (Forward Deployed): rightmost edge at least at center.
  const right = Math.min(mid, caduceus.left - gap);
  const available = Math.max(0, right - pad);
  const width = Math.min(available, PILLAR_PANEL_MAX_WIDTH);
  return { top, left: right - width, width, height };
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
