import {
  CARD_FACE,
  cardFaceLabelsRowStyle,
  cardFaceLabelsStyle,
} from "./card-face-layout";

interface CardFaceLabelsProps {
  labels: string[];
  className?: string;
}

export function CardFaceLabels({ labels, className }: CardFaceLabelsProps) {
  return (
    <div style={cardFaceLabelsStyle}>
      <div
        style={{
          opacity: 0.4,
          marginBottom: CARD_FACE.focusHiddenMb,
          textTransform: "uppercase",
          visibility: "hidden",
        }}
        aria-hidden="true"
      >
        Focus:
      </div>
      <div style={cardFaceLabelsRowStyle} className={className}>
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
