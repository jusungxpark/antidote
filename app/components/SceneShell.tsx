"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

const AsciiSTL = dynamic(
  () => import("./AsciiSTL").then((m) => m.AsciiSTL),
  { ssr: false }
);

const TRANSITION_MS = 800;

interface TransitionRequest {
  href: string;
  title: string;
  titleStart: { x: number; y: number };
  mirror: boolean;
}

interface SceneContextValue {
  startTransition: (req: TransitionRequest) => void;
  transitioning: boolean;
  returningHome: boolean;
}

const SceneContext = createContext<SceneContextValue>({
  startTransition: () => {},
  transitioning: false,
  returningHome: false,
});

export function useScene() {
  return useContext(SceneContext);
}

function getPageInfo(pathname: string): { title: string; mirror: boolean } | null {
  switch (pathname) {
    case "/transformations":
      return { title: "Transformations", mirror: false };
    case "/buyouts":
      return { title: "Buyouts", mirror: false };
    default:
      return null;
  }
}

export function SceneShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [transition, setTransition] = useState<TransitionRequest | null>(null);
  const [phase, setPhase] = useState(0);
  const transitionLock = useRef(false);
  const [returningHome, setReturningHome] = useState(false);
  const returnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track viewport size (null until mounted — avoids SSR hydration mismatch)
  const [windowSize, setWindowSize] = useState<{ w: number; h: number } | null>(
    null
  );
  useEffect(() => {
    const update = () =>
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isHome = pathname === "/";
  const pageInfo = getPageInfo(pathname);

  const mirror = transition?.mirror ?? pageInfo?.mirror ?? false;
  const title = transition?.title ?? pageInfo?.title ?? "";

  const startTransition = useCallback((req: TransitionRequest) => {
    if (transitionLock.current) return;
    transitionLock.current = true;
    setTransition(req);
    setPhase(0);
  }, []);

  // Phase 0 → 1
  useEffect(() => {
    if (transition && phase === 0) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase(1));
      });
      return () => cancelAnimationFrame(id);
    }
  }, [transition, phase]);

  // Navigate after animation
  useEffect(() => {
    if (transition && phase === 1) {
      const timer = setTimeout(() => {
        router.push(transition.href);
      }, TRANSITION_MS + 50);
      return () => clearTimeout(timer);
    }
  }, [transition, phase, router]);

  // Clear transition on arrival
  useEffect(() => {
    if (transition && pathname === transition.href) {
      setTransition(null);
      setPhase(0);
      transitionLock.current = false;
    }
  }, [pathname, transition]);

  // Reset lock when back on home
  useEffect(() => {
    if (isHome) {
      transitionLock.current = false;
      setReturningHome(false);
      if (returnTimerRef.current) {
        clearTimeout(returnTimerRef.current);
        returnTimerRef.current = null;
      }
    }
  }, [isHome]);

  // Handle return-to-home navigation
  const handleReturnHome = useCallback(
    (e: React.MouseEvent) => {
      if (isHome || returningHome) return;
      e.preventDefault();
      setReturningHome(true);
      returnTimerRef.current = setTimeout(() => {
        router.push("/");
      }, 450);
    },
    [isHome, returningHome, router]
  );

  // Caduceus: subpage position when animating (phase 1) or on a subpage
  const atSubpage =
    (transition !== null && phase === 1) || (!isHome && transition === null);

  let caduceusClass = "scene-caduceus";
  if (atSubpage) {
    caduceusClass += mirror ? " scene-caduceus--left" : " scene-caduceus--right";
  } else {
    caduceusClass += " scene-caduceus--home";
  }

  // Title
  let titleNode: ReactNode = null;
  const showTitle =
    windowSize !== null && (transition !== null || (!isHome && !!title));

  if (showTitle) {
    const vw = windowSize.w;
    const vh = windowSize.h;
    const padding = Math.max(40, Math.min(vw * 0.05, 80));
    const fontSize = Math.max(36, Math.min(vw * 0.05, 64));

    const cadTop = vh * 0.05;
    const cadHeight = Math.max(220, Math.min(vh * 0.35, 460));
    const targetY = cadTop + cadHeight / 2 - fontSize / 2;

    let targetX: number;
    if (mirror) {
      const titleW = title.length * fontSize * 0.58;
      targetX = vw - padding - titleW;
    } else {
      targetX = padding;
    }

    let transform = "translate(0, 0) scale(1)";
    if (transition && phase === 0) {
      const scaleRatio = 28 / fontSize;
      const offsetX = transition.titleStart.x - targetX;
      const offsetY = transition.titleStart.y - targetY;
      transform = `translate(${offsetX}px, ${offsetY}px) scale(${scaleRatio})`;
    }

    const isAnimating = transition !== null;

    titleNode = (
      <div
        style={{
          position: "fixed",
          left: targetX,
          top: targetY,
          fontSize,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontWeight: 400,
          lineHeight: 1,
          color: "rgba(255, 248, 240, 0.92)",
          pointerEvents: "none",
          zIndex: 100,
          transformOrigin: "left top",
          transform,
          opacity: returningHome ? 0 : 1,
          willChange: isAnimating || returningHome ? "transform, opacity" : "auto",
          transition: isAnimating
            ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : returningHome
              ? "opacity 400ms ease"
              : "none",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </div>
    );
  }

  return (
    <SceneContext.Provider
      value={{ startTransition, transitioning: transition !== null, returningHome }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: "#000",
          overflow: "hidden",
        }}
      >
        {/* Brand logo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            padding: "clamp(18px, 2.5vh, 32px) clamp(24px, 3vw, 48px)",
            textAlign: "center",
          }}
        >
          <Link
            href="/"
            onClick={handleReturnHome}
            style={{
              color: "rgba(255, 248, 240, 0.9)",
              font: '400 clamp(16px, 1.6vw, 22px)/1 Georgia, "Times New Roman", serif',
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            Antid<span style={{ fontStyle: "italic" }}>o</span>te.
          </Link>
        </div>

        {/* Caduceus — persists across routes */}
        <div className={caduceusClass}>
          <AsciiSTL />
        </div>

        {/* Floating title */}
        {titleNode}

        {/* Page content */}
        {children}
      </div>
    </SceneContext.Provider>
  );
}
