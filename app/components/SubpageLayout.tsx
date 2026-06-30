"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useScene } from "./SceneShell";
import { ExpandedPillarPanel } from "./ExpandedPillarPanel";

interface SubpageLayoutProps {
  children?: ReactNode;
  mirror?: boolean;
}

const PILLAR_TITLES: Record<string, string> = {
  "/transformation": "AI Transformation",
  "/buyouts": "Buyouts",
};

export function SubpageLayout({ children, mirror = false }: SubpageLayoutProps) {
  const pathname = usePathname();
  const { returningHome } = useScene();
  const side = mirror ? "right" : "left";
  const title = PILLAR_TITLES[pathname] ?? "Antidote";

  if (!children) return null;

  return (
    <ExpandedPillarPanel
      side={side}
      title={title}
      returningHome={returningHome}
    >
      {children}
    </ExpandedPillarPanel>
  );
}
