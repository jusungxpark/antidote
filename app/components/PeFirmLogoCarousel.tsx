"use client";

import { PE_FIRM_CAROUSEL_LOGOS } from "./pe-firms-data";

export function PeFirmLogoCarousel() {
  const track = [...PE_FIRM_CAROUSEL_LOGOS, ...PE_FIRM_CAROUSEL_LOGOS];

  return (
    <div
      className="pe-firm-carousel"
      aria-label="Private equity firms we have worked with"
    >
      <div className="pe-firm-carousel-track">
        {track.map((firm, index) => (
          <div className="pe-firm-carousel-item" key={`${firm.id}-${index}`}>
            <img
              src={firm.src}
              alt={firm.name}
              className="pe-firm-carousel-logo"
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
