/** Shared case study detail + morph transition layout. */
export const CASE_STUDY_TRANSITION_MS = 680;
export const CASE_STUDY_MORPH_EASE = "cubic-bezier(0.6, 0, 0.2, 1)";

export type LayoutRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type TitleRect = LayoutRect & { fontSize?: number };

export function measureCaseStudyCardTarget(slug: string): {
  cardRect: LayoutRect;
  titleRect?: TitleRect;
} | null {
  if (typeof document === "undefined") return null;

  const cardEl = document.getElementById(`case-study-card-${slug}`);
  const measuredRect = cardEl?.getBoundingClientRect();
  if (!measuredRect || measuredRect.width <= 0) return null;

  const cardRect = {
    top: measuredRect.top,
    left: measuredRect.left,
    width: measuredRect.width,
    height: measuredRect.height,
  };

  const titleEl = cardEl?.querySelector("h3");
  const measuredTitle = titleEl?.getBoundingClientRect();
  if (!titleEl || !measuredTitle || measuredTitle.width <= 0) {
    return { cardRect };
  }

  const fontSize = parseFloat(window.getComputedStyle(titleEl).fontSize);

  return {
    cardRect,
    titleRect: {
      top: measuredTitle.top,
      left: measuredTitle.left,
      width: measuredTitle.width,
      height: measuredTitle.height,
      fontSize: Number.isFinite(fontSize) ? fontSize : undefined,
    },
  };
}

export function easeInOutCubic(t: number): number {
  return t * t * (3 - 2 * t);
}

export function getCaseStudyBannerHeight(viewportHeight: number): number {
  return Math.min(Math.max(200, viewportHeight * 0.32), 340);
}

export function getCaseStudyBannerRect(viewportWidth: number, viewportHeight: number): LayoutRect {
  return {
    top: 0,
    left: 0,
    width: viewportWidth,
    height: getCaseStudyBannerHeight(viewportHeight),
  };
}

export function getCaseStudyBodyPadding(viewportWidth: number): number {
  return Math.min(Math.max(32, viewportWidth * 0.05), 72);
}

export function getCollapsedTitleFontSize(cardWidth: number): number {
  return Math.min(Math.max(17, cardWidth * 0.075), 22);
}

export function getExpandedTitleFontSize(viewportWidth: number): number {
  return Math.min(Math.max(28, viewportWidth * 0.032), 42);
}

export function getCardContentPadding(cardWidth: number): number {
  return Math.min(Math.max(18, cardWidth * 0.055), 28);
}

export function getCollapsedTitlePosition(
  cardRect: LayoutRect,
  titleRect: TitleRect | undefined
): { top: number; left: number; fontSize: number } {
  const fontSize =
    titleRect?.fontSize ?? getCollapsedTitleFontSize(cardRect.width);
  const pad = getCardContentPadding(cardRect.width);

  if (titleRect) {
    return { top: titleRect.top, left: titleRect.left, fontSize };
  }

  return {
    top: cardRect.top + cardRect.height - pad - fontSize * 1.2,
    left: cardRect.left + pad,
    fontSize,
  };
}

export function getExpandedTitlePosition(
  viewportWidth: number,
  viewportHeight: number,
  titleWidth: number
): { top: number; left: number; fontSize: number } {
  const bannerHeight = getCaseStudyBannerHeight(viewportHeight);
  const padX = getCaseStudyBodyPadding(viewportWidth);
  const fontSize = getExpandedTitleFontSize(viewportWidth);
  const lineHeight = 1.08;
  const insetBottom = 28;

  return {
    top: bannerHeight - insetBottom - fontSize * lineHeight,
    left: viewportWidth - padX - titleWidth,
    fontSize,
  };
}

export function lerpTitleStyle(
  from: { top: number; left: number; fontSize: number },
  to: { top: number; left: number; fontSize: number },
  t: number
): { top: number; left: number; fontSize: number } {
  const clamped = Math.min(1, Math.max(0, t));
  return {
    top: from.top + (to.top - from.top) * clamped,
    left: from.left + (to.left - from.left) * clamped,
    fontSize: from.fontSize + (to.fontSize - from.fontSize) * clamped,
  };
}