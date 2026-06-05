import { SubpageLayout } from "../components/SubpageLayout";
import { ToggleHeading } from "../components/ToggleHeading";

export default function BuyoutsPage() {
  return (
    <SubpageLayout>
      <ToggleHeading title="Thesis" />
      <ToggleHeading title="Acquisitions">
        <p style={{ margin: 0 }}>Coming soon.</p>
      </ToggleHeading>
    </SubpageLayout>
  );
}
