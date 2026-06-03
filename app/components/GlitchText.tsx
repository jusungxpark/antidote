"use client";

import { useCallback, useRef, useState } from "react";

const SCRAMBLE_CHARS = " .:-=+*#%@";

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

export function GlitchText({
  text,
  delay = 0,
  duration = 300,
}: {
  text: string;
  delay?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(() =>
    Array.from(text, () => randomChar()).join(""),
  );
  const rafRef = useRef(0);

  const spanRef = useCallback(
    (node: HTMLSpanElement | null) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      if (!node) return;

      let startTime: number | null = null;
      let started = false;

      const timer = setTimeout(() => {
        started = true;
        startTime = performance.now();

        function loop() {
          if (!startTime) return;
          const elapsed = performance.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const revealIndex = Math.floor(progress * text.length);

          const chars: string[] = [];
          for (let i = 0; i < text.length; i++) {
            chars.push(i < revealIndex ? text[i] : randomChar());
          }
          setDisplay(chars.join(""));

          if (progress < 1) {
            rafRef.current = requestAnimationFrame(loop);
          } else {
            setDisplay(text);
          }
        }

        rafRef.current = requestAnimationFrame(loop);
      }, delay);

      // Scramble while waiting for delay
      if (delay > 0) {
        function scrambleWhileWaiting() {
          if (started) return;
          setDisplay(Array.from(text, () => randomChar()).join(""));
          rafRef.current = requestAnimationFrame(scrambleWhileWaiting);
        }
        rafRef.current = requestAnimationFrame(scrambleWhileWaiting);
      }

      return () => {
        clearTimeout(timer);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    },
    [text, delay, duration],
  );

  return (
    <span
      ref={spanRef}
      style={{
        opacity: 0,
        animation: `glitch-fade-in 400ms ease ${delay}ms forwards`,
      }}
    >
      {display}
    </span>
  );
}
