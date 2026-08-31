"use client";

import { RESOURCE_LIBRARIES } from "./resource-libraries";

export function FdResourcesHub({
  onOpen,
}: {
  onOpen: (slug: "use-cases" | "learn") => void;
}) {
  return (
    <div className="fdm-uc fdm-res">
      <header className="fdm-uc-hero">
        <p className="fdm-kicker">Transformation · Resources</p>
        <h1>Resources</h1>
      </header>

      <div className="fdm-res-grid">
        {RESOURCE_LIBRARIES.map((lib) => (
          <button
            key={lib.slug}
            type="button"
            className="fdm-res-tile"
            onClick={() => onOpen(lib.slug)}
          >
            <p className="fdm-res-tile-kicker">{lib.kicker}</p>
            <h2>{lib.title}</h2>
            <p className="fdm-res-tile-blurb">{lib.blurb}</p>
            <span className="fdm-res-tile-go">
              {lib.enter}
              <span aria-hidden="true"> →</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
