import { CARD_ASPECT } from "./config";

const CARD_PX = 380;
const CONTAINER_SIDE = 60;

export interface LayoutRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function computePillarTargetRect(mirror: boolean): LayoutRect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const top = Math.min(Math.max(84, vh * 0.11), 108);
  const bottom = Math.min(Math.max(58, vh * 0.065), 68);
  const pad = Math.min(Math.max(24, vw * 0.03), 48);
  const width = Math.min(vw * 0.62, 820);
  const height = vh - top - bottom;
  const left = mirror ? vw - width - pad : pad;
  return { top, left, width, height };
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
