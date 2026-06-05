"use client";

import type { ReactNode } from "react";
import { useScene } from "./SceneShell";

interface SubpageLayoutProps {
  children?: ReactNode;
  mirror?: boolean;
}

export function SubpageLayout({ children, mirror = false }: SubpageLayoutProps) {
  const { returningHome } = useScene();

  if (!children) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(5vh + clamp(220px, 35vh, 460px) / 2 + clamp(36px, 5vw, 64px) / 2 + 56px)",
        left: mirror
          ? "calc(clamp(40px, 5vw, 80px) + clamp(180px, 28vw, 380px) + clamp(40px, 4vw, 80px))"
          : "clamp(40px, 5vw, 80px)",
        right: mirror ? "clamp(40px, 5vw, 80px)" : undefined,
        maxWidth: mirror
          ? undefined
          : "calc(100vw - clamp(180px, 28vw, 380px) - clamp(40px, 5vw, 80px) - clamp(80px, 8vw, 120px))",
        zIndex: 5,
        opacity: returningHome ? 0 : 1,
        willChange: returningHome ? "opacity" : "auto",
        transition: returningHome ? "opacity 400ms ease" : undefined,
        animation: returningHome ? "none" : "subpage-fade-in 600ms ease 200ms both",
      }}
    >
      {children}
    </div>
  );
}
