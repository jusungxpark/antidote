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
    case "/consulting":
      return { title: "Consulting", mirror: false };
    case "/buyouts":
      return { title: "Buyouts", mirror: false };
    default:
      return null;
  }
}

type NavPage = "about" | "blog";

const ABOUT_CONTENT = (
  <div
    style={{
      maxWidth: 780,
      padding: "0 clamp(24px, 4vw, 48px)",
      fontFamily: 'Georgia, "Times New Roman", serif',
      textAlign: "center",
    }}
  >
    <p
      style={{
        fontSize: "clamp(18px, 2.2vw, 28px)",
        lineHeight: 1.5,
        color: "rgba(255, 248, 240, 0.9)",
        margin: "0 0 28px",
      }}
    >
      We are building the next generation of AI-native service businesses.
    </p>
    <p
      style={{
        fontSize: "clamp(14px, 1.4vw, 18px)",
        lineHeight: 1.7,
        color: "rgba(255, 248, 240, 0.62)",
        margin: "0 0 28px",
      }}
    >
      Our team spans private equity, strategy consulting, and software
      engineering.
    </p>
    <p
      style={{
        fontSize: "clamp(13px, 1.2vw, 17px)",
        lineHeight: 1.7,
        color: "rgba(255, 248, 240, 0.62)",
        margin: "0 0 32px",
      }}
    >
      From the world's leading institutions:
    </p>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "clamp(24px, 3.5vw, 48px)",
        flexWrap: "nowrap",
      }}
    >
      {[
        { src: "/logos/cdr.svg", alt: "CD&R", h: "clamp(40px, 5vw, 60px)" },
        { src: "/logos/bcg.svg", alt: "BCG", h: "clamp(40px, 5vw, 60px)" },
        { src: "/logos/mit.svg", alt: "MIT", h: "clamp(40px, 5vw, 60px)" },
        { src: "/logos/dartmouth.svg", alt: "Dartmouth", h: "clamp(22px, 2.8vw, 34px)" },
        { src: "/logos/angellist.svg", alt: "AngelList", h: "clamp(40px, 5vw, 60px)" },
      ].map((logo) => (
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          style={{
            height: logo.h,
            width: "auto",
            opacity: 0.5,
            filter: "brightness(0) invert(1)",
          }}
        />
      ))}
    </div>
  </div>
);

const BLOG_CONTENT = (
  <p
    style={{
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: "clamp(18px, 2.2vw, 28px)",
      lineHeight: 1.5,
      color: "rgba(10, 10, 10, 0.6)",
      margin: 0,
    }}
  >
    Coming soon.
  </p>
);

const OVERLAY_STYLES: Record<NavPage, React.CSSProperties> = {
  about: {
    background: "rgba(18, 18, 18, 0.70)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  blog: {
    background: "rgba(255, 248, 240, 0.97)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
};

function getOverlayClass(page: NavPage, leaving: boolean): string {
  if (page === "about") return leaving ? "shimmer-up" : "shimmer-down";
  return leaving ? "shimmer-right-out" : "shimmer-right-in";
}

export function SceneShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [transition, setTransition] = useState<TransitionRequest | null>(null);
  const [phase, setPhase] = useState(0);
  const transitionLock = useRef(false);
  const [returningHome, setReturningHome] = useState(false);
  const returnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Nav overlay state
  const [navOverlay, setNavOverlay] = useState<NavPage | null>(null);
  const [navOverlayLeaving, setNavOverlayLeaving] = useState(false);
  const navReturnHomeRef = useRef(false);

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

  // Nav overlay handlers
  const handleNavPage = useCallback(
    (page: NavPage) => {
      if (navOverlayLeaving) return;
      if (navOverlay === page) {
        // Toggle same page off
        setNavOverlayLeaving(true);
      } else {
        // Open new page directly (swaps if another is open)
        setNavOverlayLeaving(false);
        setNavOverlay(page);
      }
    },
    [navOverlay, navOverlayLeaving]
  );

  const handleNavAnimEnd = useCallback(() => {
    if (navOverlayLeaving) {
      setNavOverlayLeaving(false);
      setNavOverlay(null);
      if (navReturnHomeRef.current) {
        navReturnHomeRef.current = false;
        if (pathname !== "/") {
          router.push("/");
        }
      }
    }
  }, [navOverlayLeaving, pathname, router]);

  // Handle return-to-home navigation
  const handleReturnHome = useCallback(
    (e: React.MouseEvent) => {
      if (navOverlay) {
        e.preventDefault();
        navReturnHomeRef.current = !isHome;
        setNavOverlayLeaving(true);
        return;
      }
      if (isHome || returningHome) return;
      e.preventDefault();
      setReturningHome(true);
      returnTimerRef.current = setTimeout(() => {
        router.push("/");
      }, 450);
    },
    [isHome, returningHome, router, navOverlay]
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
    const isMobile = vw <= 768;

    const fontSize = isMobile
      ? Math.max(24, Math.min(vw * 0.065, 32))
      : Math.max(36, Math.min(vw * 0.05, 64));

    let targetX: number | undefined;
    let targetY: number | undefined;
    let transform = "translate(0, 0) scale(1)";
    let isAnimating = false;

    if (!isMobile) {
      const padding = Math.max(40, Math.min(vw * 0.05, 80));
      const cadTop = vh * 0.05;
      const cadHeight = Math.max(220, Math.min(vh * 0.35, 460));
      targetY = cadTop + cadHeight / 2 - fontSize / 2;

      if (mirror) {
        const titleW = title.length * fontSize * 0.58;
        targetX = vw - padding - titleW;
      } else {
        targetX = padding;
      }

      if (transition && phase === 0) {
        const scaleRatio = 28 / fontSize;
        const offsetX = transition.titleStart.x - targetX;
        const offsetY = transition.titleStart.y - targetY;
        transform = `translate(${offsetX}px, ${offsetY}px) scale(${scaleRatio})`;
      }

      isAnimating = transition !== null;
    }

    titleNode = (
      <div
        className="scene-title"
        style={{
          position: isMobile ? "relative" : isAnimating ? "fixed" : "absolute",
          left: targetX,
          top: targetY,
          padding: isMobile ? "16px 24px" : undefined,
          fontSize,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontWeight: 400,
          lineHeight: 1,
          color: "rgba(255, 248, 240, 0.92)",
          pointerEvents: "none",
          zIndex: 7,
          transformOrigin: "left top",
          transform: isMobile ? undefined : transform,
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

  const navLinkStyle = (page: NavPage): React.CSSProperties => ({
    background: "none",
    border: "none",
    padding: "12px 8px",
    margin: "-12px -8px",
    cursor: "pointer",
    color:
      navOverlay === page && !navOverlayLeaving
        ? "rgba(255, 248, 240, 0.92)"
        : "rgba(255, 248, 240, 0.68)",
    font: '400 clamp(11px, 1.1vw, 14px)/1 Georgia, "Times New Roman", serif',
    textTransform: "lowercase",
    transition: "color 200ms ease",
  });

  return (
    <SceneContext.Provider
      value={{ startTransition, transitioning: transition !== null, returningHome }}
    >
      <div
        className="scene-shell"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: "#000",
          overflowX: "hidden",
          overflowY: isHome ? "hidden" : "auto",
        }}
      >
        {/* Top bar */}
        <div
          className="scene-topbar"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: "clamp(28px, 4vw, 56px)",
            padding: "clamp(18px, 2.5vh, 32px) clamp(24px, 3vw, 48px)",
            background: "#000",
          }}
        >
          <button
            onClick={() => handleNavPage("about")}
            style={navLinkStyle("about")}
          >
            about us
          </button>

          <Link
            href="/"
            onClick={handleReturnHome}
            style={{
              color: "rgba(255, 248, 240, 0.9)",
              font: '400 clamp(20px, 2vw, 28px)/1 Georgia, "Times New Roman", serif',
              whiteSpace: "nowrap",
              textDecoration: "none",
              padding: "8px 4px",
              margin: "-8px -4px",
            }}
          >
            Antid<span style={{ fontStyle: "italic" }}>o</span>te.
          </Link>

          <button
            onClick={() => handleNavPage("blog")}
            style={navLinkStyle("blog")}
          >
            blog
          </button>
        </div>

        {/* Caduceus — persists across routes */}
        <div
          className={caduceusClass}
          style={{ userSelect: "none", WebkitUserSelect: "none", pointerEvents: "none" }}
        >
          <AsciiSTL />
        </div>

        {/* Floating title */}
        {titleNode}

        {/* Page content */}
        {children}

        {/* Nav page overlay */}
        {navOverlay && (
          <div
            key={navOverlay}
            className={getOverlayClass(navOverlay, navOverlayLeaving)}
            onAnimationEnd={handleNavAnimEnd}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...OVERLAY_STYLES[navOverlay],
            }}
          >
            {navOverlay === "about" ? ABOUT_CONTENT : BLOG_CONTENT}
          </div>
        )}
      </div>
    </SceneContext.Provider>
  );
}
