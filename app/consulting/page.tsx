import { SubpageLayout } from "../components/SubpageLayout";
import { ToggleHeading } from "../components/ToggleHeading";

export default function ConsultingPage() {
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
        <p
          style={{
            margin: "20px 0 12px",
            color: "rgba(255, 248, 240, 0.62)",
          }}
        >
          Our team is from
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 2.5vw, 32px)",
            flexWrap: "nowrap",
          }}
        >
          {[
            { src: "/logos/cdr.svg", alt: "CD&R", h: "clamp(32px, 4vw, 48px)" },
            { src: "/logos/bcg.svg", alt: "BCG", h: "clamp(32px, 4vw, 48px)" },
            { src: "/logos/mit.svg", alt: "MIT", h: "clamp(32px, 4vw, 48px)" },
            { src: "/logos/dartmouth.svg", alt: "Dartmouth", h: "clamp(18px, 2.2vw, 27px)" },
            { src: "/logos/angellist.svg", alt: "AngelList", h: "clamp(32px, 4vw, 48px)" },
          ].map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              style={{
                height: logo.h,
                width: "auto",
                opacity: 0.5,
                filter: "brightness(0) invert(1)",
              }}
            />
          ))}
        </div>
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
