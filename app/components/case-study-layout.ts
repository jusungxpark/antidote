/** Shared case study detail + morph transition layout. */
export const CASE_STUDY_TRANSITION_MS = 680;
export const CASE_STUDY_MORPH_EASE = "cubic-bezier(0.6, 0, 0.2, 1)";

export type LayoutRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export function measureCaseStudyCardTarget(slug: string): {
  cardRect: LayoutRect;
} | null {
  if (typeof document === "undefined") return null;

  const cardEl = document.getElementById(`case-study-card-${slug}`);
  const measuredRect = cardEl?.getBoundingClientRect();
  if (!measuredRect || measuredRect.width <= 0) return null;

  return {
    cardRect: {
      top: measuredRect.top,
      left: measuredRect.left,
      width: measuredRect.width,
      height: measuredRect.height,
    },
  };
}

export function getCaseStudyBannerHeight(viewportHeight: number): number {
  return Math.min(Math.max(200, viewportHeight * 0.32), 340);
}

export function getCaseStudyBannerRect(
  viewportWidth: number,
  viewportHeight: number
): LayoutRect {
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
