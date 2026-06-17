import { SubpageLayout } from "../components/SubpageLayout";
import { ToggleHeading } from "../components/ToggleHeading";

export default function ConsultingPage() {
  return (
    <SubpageLayout>
      <ToggleHeading title="Thesis">
        <p style={{ margin: "0 0 16px" }}>
          AI has crossed a capability threshold that most of the market has not
          yet internalized. The technology is no longer augmenting work. It is
          performing it. Research, analysis, coordination, execution. These are
          compressing into systems that operate as genuine substitutes for units
          of labor. That changes the economics of every service business.
          Outcomes, not hours, are becoming the unit of value. And when the work
          itself becomes commoditized, the only durable asset is the customer
          relationship. The firms that understand this will restructure around
          it. The ones that don&apos;t will find themselves selling labor into a
          market that no longer values it the same way.
        </p>
        <p style={{ margin: "0 0 16px" }}>
          But capturing that value requires more than intent. It requires
          infrastructure. Most AI initiatives fail before they start because the
          data underneath is fragmented, inconsistent, and unstructured. This is
          not a tooling problem, but rather a foundation problem. Accelerating
          workflows with AI does not automatically mean faster or better results.
          It also surfaces and exacerbates every underlying broken system that
          has gone unnoticed for years, masked by manual work and reliance on
          tribal knowledge. Without proper process and data visibility, a clear
          understanding of how work actually moves through an organization, and
          clean systems of record, AI is just an amplifier of dysfunction. Data
          hygiene and governance are not afterthoughts. They are prerequisites.
        </p>
        <p style={{ margin: 0 }}>
          Even with the right data foundation in place, execution is an entirely
          separate hurdle. Building on top of nondeterministic systems is
          fundamentally different from building traditional software, and it
          demands a different kind of engineering and architecture: guardrails,
          evaluations, sandboxes, tool calling, orchestration, escalation, and
          token economics. Getting a model to produce a demo is easy. Getting it
          to run reliably in production, at scale, with proper oversight, is the
          actual work. Proper AI transformation requires practitioners who have
          built and shipped these systems before, not advisors who have read
          about them.
        </p>
      </ToggleHeading>
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
        <p
          style={{
            margin: "20px 0 0",
            color: "rgba(255, 248, 240, 0.62)",
          }}
        >
          For inquiries, please reach out to{" "}
          <a
            href="mailto:founders@antidotetransform.com"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            founders@antidotetransform.com
          </a>
        </p>
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
