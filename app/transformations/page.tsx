import { SubpageLayout } from "../components/SubpageLayout";
import { ToggleHeading } from "../components/ToggleHeading";

export default function TransformationsPage() {
  return (
    <SubpageLayout>
      <ToggleHeading title="Thesis" />
      <ToggleHeading title="Services">
        <p style={{ margin: "0 0 8px" }}>
          We partner with private equity firms to provide value in the following
          opportunities:
        </p>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {["Diligence", "Strategy", "AI Implementation/Automation"].map(
            (item) => (
              <li key={item} style={{ padding: "2px 0" }}>
                • {item}
              </li>
            )
          )}
        </ul>
      </ToggleHeading>
      <ToggleHeading title="Work">
        <p style={{ margin: "0 0 8px" }}>
          Have worked with and provided value for:
        </p>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {[
            "KKR",
            "Comvest Partners",
            "Vistria Group",
            "Partners Group",
            "Grain Management",
            "New Atlas Capital",
            "Graham Partners",
            "Connection Capital",
          ].map((firm) => (
            <li key={firm} style={{ padding: "2px 0" }}>
              • {firm}
            </li>
          ))}
        </ul>
      </ToggleHeading>
    </SubpageLayout>
  );
}
