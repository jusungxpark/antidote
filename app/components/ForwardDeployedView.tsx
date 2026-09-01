"use client";

import { FD_OFFERINGS } from "./fd-offerings";
import { PeFirmLogoCarousel } from "./PeFirmLogoCarousel";

export function ForwardDeployedView() {
  return (
    <>
      <p className="pillar-intro pillar-intro--lead">
        Partner with us. We embed ourselves into the most important problems
        surrounding private equity and AI.
      </p>

      <PeFirmLogoCarousel />

      <p className="pillar-intro">
        We sit at the forefront of AI: what it can do today, where it is going,
        and which claims hold up under scrutiny.
      </p>

      <ul className="pillar-point-list">
        <li>
          <span className="pillar-point-label">Pre-close</span>
          Diligence and strategy that separate real capability from theater, and
          map where value actually accrues.
        </li>
        <li>
          <span className="pillar-point-label">Post-close</span>
          Technical implementation that creates durable advantage: workflows
          rebuilt for agents, production systems that hold, and a clearer moat
          as AI rewrites the competitive field.
        </li>
        <li>
          <span className="pillar-point-label">Across both</span>
          Help you capitalize on the biggest market shift in decades, and give
          your companies defensibility against it.
        </li>
      </ul>

      <div className="fd-offer-stack" aria-label="Offerings">
        {FD_OFFERINGS.map((offering) => (
          <article key={offering.title} className="fd-offer-stack-card">
            <h3 className="fd-offer-stack-title">{offering.title}</h3>
            <ul className="fd-offer-stack-list">
              {offering.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="pillar-engage-block">
        <a
          href="https://fd.antidotetransform.com"
          className="pillar-engage-btn"
        >
          See how we engage
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </>
  );
}
