import { CARD_FACE, cardFaceSubtitleStyle, cardFaceTitleStyle } from "./card-face-layout";

interface CardFaceBottomProps {
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  wrapperClassName?: string;
  hideTitle?: boolean;
}

export function CardFaceBottom({
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  wrapperClassName,
  hideTitle = false,
}: CardFaceBottomProps) {
  return (
    <div
      className={wrapperClassName}
      style={{
        position: "absolute",
        bottom: CARD_FACE.bottomY,
        left: CARD_FACE.insetX,
        right: CARD_FACE.insetX,
      }}
    >
      {!hideTitle && title ? (
        <div style={cardFaceTitleStyle} className={titleClassName}>
          {title}
        </div>
      ) : null}
      {subtitle ? (
        <div style={cardFaceSubtitleStyle} className={subtitleClassName}>
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
