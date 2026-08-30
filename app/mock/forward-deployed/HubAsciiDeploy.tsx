"use client";

/**
 * Hub hero: Lottie via lottie-react.
 * Source: https://lottie.host/8f02b262-bf44-48fa-bd22-2943833e7b42/7bf0I6rTGJ.lottie
 * Defers lottie-react until mount so the hub shell paints first.
 */

import { useEffect, useState, type ComponentType } from "react";

const LOTTIE_SRC = "/mock/hub-hero-lottie.json?v=nobg4";

type LottieProps = {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
};

export function HubAsciiDeploy() {
  const [reduced, setReduced] = useState(false);
  const [Lottie, setLottie] = useState<ComponentType<LottieProps> | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let alive = true;
    import("lottie-react").then((m) => {
      if (alive) setLottie(() => m.Lottie as ComponentType<LottieProps>);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <aside className="fdm-hub-line" aria-label="Forward deployed field">
      <div className="fdm-hub-line-stage fdm-hub-lottie">
        {Lottie ? (
          <Lottie
            src={LOTTIE_SRC}
            loop
            autoplay={!reduced}
            className="fdm-hub-lottie-player"
          />
        ) : (
          <div className="fdm-hub-lottie-placeholder" aria-hidden="true" />
        )}
      </div>
    </aside>
  );
}
