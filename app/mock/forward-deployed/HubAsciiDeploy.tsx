"use client";

/**
 * Hub hero: Lottie via lottie-react.
 * Source: https://lottie.host/8f02b262-bf44-48fa-bd22-2943833e7b42/7bf0I6rTGJ.lottie
 * (extracted JSON — lottie-react loads JSON; raw .lottie is a zip for DotLottie)
 */

import { useEffect, useState } from "react";
import { Lottie } from "lottie-react";

const LOTTIE_SRC = "/mock/hub-hero-lottie.json?v=nobg4";

export function HubAsciiDeploy() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  return (
    <aside className="fdm-hub-line" aria-label="Forward deployed field">
      <div className="fdm-hub-line-stage fdm-hub-lottie">
        <Lottie
          src={LOTTIE_SRC}
          loop
          autoplay={!reduced}
          className="fdm-hub-lottie-player"
        />
      </div>
    </aside>
  );
}
