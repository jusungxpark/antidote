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
            color: "rgba(255, 248, 240, 0.92)",
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
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: "clamp(20px, 2.5vw, 28px)",
            fontWeight: 400,
            color: "rgba(255, 248, 240, 0.92)",
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
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: "clamp(14px, 1.4vw, 18px)",
            color: "rgba(255, 248, 240, 0.7)",
            lineHeight: 1.6,
          }}
        >
          {children ?? <>&nbsp;</>}
        </div>
      )}
    </div>
  );
}
