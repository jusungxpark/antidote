"use client";

import { useState, useCallback, type ReactNode } from "react";

interface ToggleHeadingProps {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

export function ToggleHeading({
  title,
  children,
  defaultOpen = false,
}: ToggleHeadingProps) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div style={{ marginBottom: 28 }}>
      <button
        onClick={toggle}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          margin: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: open ? 1 : 0.5,
          transition: "opacity 500ms ease",
          willChange: "opacity",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "clamp(14px, 1.8vw, 20px)",
            color: "var(--text-bright)",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 400ms ease",
            willChange: "transform",
            lineHeight: 1,
          }}
        >
          ▶
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(20px, 2.5vw, 28px)",
            fontWeight: 400,
            color: "var(--text-bright)",
            lineHeight: 1,
          }}
        >
          {title}
        </span>
      </button>

      {open && (
        <div
          className="toggle-reveal"
          style={{
            paddingLeft: "clamp(24px, 3vw, 34px)",
            marginTop: 16,
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-body-size)",
            color: "var(--text-muted)",
            lineHeight: "var(--text-body-leading)",
          }}
        >
          {children ?? <>&nbsp;</>}
        </div>
      )}
    </div>
  );
}
