"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useScene } from "./SceneShell";
import { ExpandedPillarPanel } from "./ExpandedPillarPanel";

interface SubpageLayoutProps {
  children?: ReactNode;
  mirror?: boolean;
}

function getPillarMeta(pathname: string) {
  if (pathname.startsWith("/forward-deployed")) {
    return { title: "Forward Deployed", mirror: false as const };
  }
  if (pathname.startsWith("/buyouts")) {
    return { title: "Buyouts", mirror: true as const };
  }
  return null;
}

export function SubpageLayout({ children, mirror = false }: SubpageLayoutProps) {
  const pathname = usePathname();
  const { returningHome } = useScene();
  const meta = getPillarMeta(pathname);

  if (!children) return null;

  const side = (meta?.mirror ?? mirror) ? "right" : "left";
  const title = meta?.title ?? "Antidote";

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
