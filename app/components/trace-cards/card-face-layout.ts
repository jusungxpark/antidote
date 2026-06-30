/** Shared front-page card chrome layout — keep overlay and trace-card-shell in sync. */
export const CARD_FACE = {
  insetX: 22,
  topY: 20,
  bottomY: 20,
  labelsFontSize: 9,
  labelsLetterSpacing: "0.1em",
  labelsRowLetterSpacing: "0.08em",
  labelsGap: 14,
  labelsOpacity: 0.3,
  focusHiddenMb: 5,
  titleFontSize: 28,
  titleLineHeight: 1,
  titleMb: 6,
  titleColor: "rgba(255, 255, 255, 0.9)",
  subtitleFontSize: 9,
  subtitleLineHeight: 1,
  subtitleLetterSpacing: "0.12em",
  subtitleOpacity: 0.3,
} as const;

/**
 * Distance from card top to title top edge when collapsed (mirrors CardFaceBottom flow).
 */
export const CARD_FACE_TITLE_TOP_OFFSET =
  CARD_FACE.bottomY +
  CARD_FACE.subtitleFontSize * CARD_FACE.subtitleLineHeight +
  CARD_FACE.titleMb +
  CARD_FACE.titleFontSize * CARD_FACE.titleLineHeight;

export function getExpandedTitleTop(vw: number): number {
  return Math.min(Math.max(28, vw * 0.035), 44);
}

export function getExpandedTitleFontSize(vw: number): number {
  return Math.min(Math.max(24, vw * 0.028), 32);
}

/** Horizontally center the expanded title within the card. */
export function getExpandedTitleCenterLeft(
  cardWidth: number,
  titleWidth: number
): number {
  return (cardWidth - titleWidth) / 2;
}

export function getCollapsedTitleTop(cardHeight: number): number {
  return cardHeight - CARD_FACE_TITLE_TOP_OFFSET;
}

/** Matches .pillar-expand-overlay and SceneShell TRANSITION_MS */
export const CARD_TRANSITION_MS = 680;

/** Smoothstep easing */
export function easeInOutCubic(t: number): number {
  return t * t * (3 - 2 * t);
}

export const cardFaceLabelsStyle = {
  fontSize: CARD_FACE.labelsFontSize,
  letterSpacing: CARD_FACE.labelsLetterSpacing,
  fontFamily: "var(--font-sans)",
} as const;

export const cardFaceLabelsRowStyle = {
  opacity: CARD_FACE.labelsOpacity,
  display: "flex" as const,
  gap: CARD_FACE.labelsGap,
  textTransform: "uppercase" as const,
  letterSpacing: CARD_FACE.labelsRowLetterSpacing,
};

export const cardFaceTitleStyle = {
  fontSize: CARD_FACE.titleFontSize,
  fontFamily: "var(--font-sans)",
  fontWeight: 400,
  fontStyle: "normal" as const,
  lineHeight: CARD_FACE.titleLineHeight,
  marginBottom: CARD_FACE.titleMb,
  color: CARD_FACE.titleColor,
};

export const cardFaceSubtitleStyle = {
  fontSize: CARD_FACE.subtitleFontSize,
  lineHeight: CARD_FACE.subtitleLineHeight,
  letterSpacing: CARD_FACE.subtitleLetterSpacing,
  textTransform: "uppercase" as const,
  opacity: CARD_FACE.subtitleOpacity,
  fontFamily: "var(--font-sans)",
};
