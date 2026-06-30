import { SubpageLayout } from "../components/SubpageLayout";
import { ToggleHeading } from "../components/ToggleHeading";

const introStyle = {
  margin: "0 0 28px",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-body-size)",
  color: "var(--text-muted)",
  lineHeight: "var(--text-body-leading)",
} as const;

export default function BuyoutsPage() {
  return (
    <SubpageLayout mirror>
      <p style={introStyle}>
        The hardest part of transformation isn&apos;t technology. It&apos;s change
        and adoption, which doesn&apos;t happen from the outside, so it&apos;s
        precisely out of the transformation partner&apos;s control. So we acquire
        incumbents outright and rebuild them into the AI-native category leaders
        of the next decade. The transformation is the thesis. Ownership is how we
        prove it and own the outcome.
      </p>
      <ToggleHeading title="Acquisitions">
        <p style={{ margin: 0 }}>Coming soon.</p>
      </ToggleHeading>
    </SubpageLayout>
  );
}
