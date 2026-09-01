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
import { AntidoteWordmarkLabel } from "./AntidoteWordmark";
import { PillarExpandOverlay } from "./PillarExpandOverlay";
import { FdOfferingRail } from "./FdOfferingRail";
import { BlogOverlay } from "./BlogOverlay";
import {
  BLOG_PATH,
  getBlogSlugFromPath,
  isBlogPath,
} from "./blog-posts-data";
import { CARDS } from "./trace-cards/config";
import { computeHomeCardRect, type LayoutRect } from "./trace-cards/card-layout";

const AsciiSTL = dynamic(
  () => import("./AsciiSTL").then((m) => m.AsciiSTL),
  { ssr: false }
);

const TraceCardsScene = dynamic(
  () =>
    import("./trace-cards/r3f-scene").then((m) => m.TraceCardsScene),
  { ssr: false }
);

const TRANSITION_MS = 680;

interface TransitionRequest {
  href: string;
  title: string;
  subtitle?: string;
  labels?: string[];
  titleStart: { x: number; y: number };
  cardRect: { top: number; left: number; width: number; height: number };
  cardIndex: number;
  mirror: boolean;
  direction: "forward" | "reverse";
}

interface SceneContextValue {
  startTransition: (req: TransitionRequest) => void;
  startReturnTransition: () => void;
  acknowledgeExpandReady: () => void;
  beginCollapse: (rect: LayoutRect) => void;
  transitioning: boolean;
  returningHome: boolean;
  transition: TransitionRequest | null;
  transitionPhase: number;
  cardsIntroDone: boolean;
}

const SceneContext = createContext<SceneContextValue>({
  startTransition: () => {},
  startReturnTransition: () => {},
  acknowledgeExpandReady: () => {},
  beginCollapse: () => {},
  transitioning: false,
  returningHome: false,
  transition: null,
  transitionPhase: 0,
  cardsIntroDone: false,
});

export function useScene() {
  return useContext(SceneContext);
}

function getPageInfo(pathname: string): { title: string; mirror: boolean } | null {
  if (pathname.startsWith("/forward-deployed")) {
    return { title: "Forward Deployed", mirror: false };
  }
  if (pathname.startsWith("/buyouts")) {
    return { title: "Buyouts", mirror: true };
  }
  return null;
}

type NavPage = "manifesto" | "team" | "blog";

const MANIFESTO_CONTENT = (
  <div
    style={{
      maxWidth: 680,
      maxHeight: "100%",
      overflowY: "auto",
      padding: "clamp(48px, 8vh, 80px) clamp(24px, 4vw, 48px)",
      fontFamily: "var(--font-sans)",
      textAlign: "left",
    }}
  >
    <p
      style={{
        fontSize: "clamp(18px, 2.2vw, 28px)",
        lineHeight: 1.5,
        color: "var(--text-bright)",
        margin: "0 0 28px",
      }}
    >
      We believe AI-native businesses will win.
    </p>
    {[
      "Most people are chasing that future down two dead ends. One camp builds AI-native companies from scratch: brilliant technology with no customers, no context, and no right to exist in a market yet. The other bolts agents onto legacy infrastructure and systems and calls it transformation (spoiler: it isn't).",
      "The real answer is the unglamorous one in between. Take a real business – one with customers, history, with a proven right to exist – and rebuild it AI-native from the ground up. Incumbency on the outside, brand new on the inside. That is the company that wins the next decade.",
      "We spread this conviction two ways. We partner – the philosophy is replicable, so we share it, helping established players become the first AI-native operator in their industry. And we buy – because the hardest part of transformation is not the technology, it's change management and adoption, which is hard to control without ownership. So we acquire incumbents and turn them into the next generation of leaders in their fields, proving the thesis by owning the outcome.",
      "Do it once, you've transformed a company. Do it with a repeatable engine, sector after sector, and you've built something that compounds.",
      "That's Antidote.",
    ].map((paragraph) => (
      <p
        key={paragraph.slice(0, 24)}
        style={{
          fontSize: "var(--text-body-size)",
          lineHeight: "var(--text-body-leading)",
          color: "var(--text-muted)",
          margin: "0 0 20px",
        }}
      >
        {paragraph}
      </p>
    ))}
  </div>
);

const TEAM_CONTENT = (
  <div
    style={{
      maxWidth: 780,
      padding: "0 clamp(24px, 4vw, 48px)",
      fontFamily: "var(--font-sans)",
      textAlign: "center",
    }}
  >
    <p
      style={{
        fontSize: "clamp(18px, 2.2vw, 28px)",
        lineHeight: 1.5,
        color: "var(--text-bright)",
        margin: "0 0 28px",
      }}
    >
      We are building the next generation of AI-native service businesses.
    </p>
    <p
      style={{
        fontSize: "var(--text-body-size)",
        lineHeight: "var(--text-body-leading)",
        color: "var(--text-muted)",
        margin: "0 0 28px",
      }}
    >
      Our team spans private equity, strategy consulting, and software
      engineering.
    </p>
    <p
      style={{
        fontSize: "var(--text-body-size-secondary)",
        lineHeight: "var(--text-body-leading)",
        color: "var(--text-muted)",
        margin: "0 0 32px",
      }}
    >
      From the world&apos;s leading institutions:
    </p>
    <div className="team-logos-row">
      {[
        { src: "/logos/cdr.png", alt: "CD&R", id: "cdr" },
        { src: "/logos/bcg.svg", alt: "BCG", id: "bcg" },
        { src: "/logos/mit.svg", alt: "MIT", id: "mit" },
        { src: "/logos/dartmouth.svg", alt: "Dartmouth", id: "dartmouth" },
        { src: "/logos/angellist.svg", alt: "AngelList", id: "angellist" },
      ].map((logo) => (
        <img
          key={logo.id}
          data-logo={logo.id}
          src={logo.src}
          alt={logo.alt}
        />
      ))}
    </div>
  </div>
);

const OVERLAY_STYLES: Record<NavPage, React.CSSProperties> = {
  manifesto: {
    background: "rgba(18, 18, 18, 0.70)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  team: {
    background: "rgba(18, 18, 18, 0.70)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  blog: {
    background: "var(--overlay-light)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
};

const NAV_ITEMS: { page: NavPage; label: string }[] = [
  { page: "manifesto", label: "Manifesto" },
  { page: "team", label: "Team" },
  { page: "blog", label: "Blog" },
];

function getOverlayClass(page: NavPage, leaving: boolean): string {
  if (page === "blog") return leaving ? "shimmer-right-out" : "shimmer-right-in";
  return leaving ? "shimmer-up" : "shimmer-down";
}

function getOverlayContent(page: NavPage, blogSlug?: string | null): ReactNode {
  switch (page) {
    case "manifesto":
      return MANIFESTO_CONTENT;
    case "team":
      return TEAM_CONTENT;
    case "blog":
      return <BlogOverlay slug={blogSlug} />;
  }
}

// ------------------------------------------------------------------
// AppShell — routes the marketing site through the 3D SceneShell,
// but lets outreach-report routes (/[company-name], /pe/[company-name])
// and the Forward Deployed mock (/mock/...) render bare.
// fd.antidotetransform.com is excluded in root layout (host-based).
// If you add a new top-level site page, add it to SITE_PATHS.
// ------------------------------------------------------------------
const SITE_PATHS = new Set(["/", "/buyouts", "/forward-deployed", BLOG_PATH]);

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // /mock/* is the FD buyer site preview on the main domain — keep it separate
  const isMockPath = pathname != null && pathname.startsWith("/mock/");
  const isSite =
    !isMockPath &&
    pathname != null &&
    (SITE_PATHS.has(pathname) || pathname.startsWith(`${BLOG_PATH}/`));
  if (!isSite) return <>{children}</>;
  return <SceneShell>{children}</SceneShell>;
}

export function SceneShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [transition, setTransition] = useState<TransitionRequest | null>(null);
  const [phase, setPhase] = useState(0);
  const transitionLock = useRef(false);
  const expandReadyRef = useRef(false);
  const collapseStartedRef = useRef(false);
  const [returningHome, setReturningHome] = useState(false);
  const [cardsIntroDone, setCardsIntroDone] = useState(false);

  useEffect(() => {
    if (cardsIntroDone) return;
    const timer = setTimeout(() => setCardsIntroDone(true), 900);
    return () => clearTimeout(timer);
  }, [cardsIntroDone]);

  // Nav overlay state
  const [navOverlay, setNavOverlay] = useState<NavPage | null>(() =>
    isBlogPath(pathname) ? "blog" : null
  );
  const [navOverlayLeaving, setNavOverlayLeaving] = useState(false);
  const navReturnHomeRef = useRef(false);

  const isBlogRoute = isBlogPath(pathname);
  const blogSlug = getBlogSlugFromPath(pathname);

  useEffect(() => {
    if (isBlogRoute) {
      setNavOverlayLeaving(false);
      setNavOverlay("blog");
      return;
    }
    if (navOverlay === "blog" && !navOverlayLeaving) {
      setNavOverlay(null);
    }
  }, [isBlogRoute]); // eslint-disable-line react-hooks/exhaustive-deps -- only follow route

  const isHome = pathname === "/";
  const isForwardDeployed = pathname.startsWith("/forward-deployed");
  const pageInfo = getPageInfo(pathname);

  const mirror = transition?.mirror ?? pageInfo?.mirror ?? false;

  const startTransition = useCallback((req: TransitionRequest) => {
    if (transitionLock.current) return;
    transitionLock.current = true;
    expandReadyRef.current = false;
    collapseStartedRef.current = false;
    setTransition({ ...req, direction: req.direction ?? "forward" });
    setPhase(0);
  }, []);

  const acknowledgeExpandReady = useCallback(() => {
    if (expandReadyRef.current) return;
    expandReadyRef.current = true;
    setPhase(1);
  }, []);

  // Safety: if expand never leaves phase 0 (e.g. overlay effect aborted), force it.
  useEffect(() => {
    if (transition?.direction !== "forward" || phase !== 0) return;
    const timer = window.setTimeout(() => {
      acknowledgeExpandReady();
    }, 120);
    return () => window.clearTimeout(timer);
  }, [transition, phase, acknowledgeExpandReady]);

  const beginCollapse = useCallback((rect: LayoutRect) => {
    if (collapseStartedRef.current) return;
    collapseStartedRef.current = true;
    setTransition((prev) =>
      prev && prev.direction === "reverse" ? { ...prev, cardRect: rect } : prev
    );
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase(0));
    });
  }, []);

  const startReturnTransition = useCallback(() => {
    if (transitionLock.current || returningHome || isHome) return;
    const cardIndex = pathname.startsWith("/forward-deployed")
      ? 0
      : pathname.startsWith("/buyouts")
        ? 1
        : -1;
    if (cardIndex < 0) return;

    const card = CARDS[cardIndex];
    expandReadyRef.current = false;
    collapseStartedRef.current = false;
    transitionLock.current = true;
    setReturningHome(true);
    setTransition({
      href: pathname,
      title: card.title,
      subtitle: card.description,
      labels: card.labels,
      cardIndex,
      mirror: cardIndex === 1,
      cardRect: computeHomeCardRect(cardIndex),
      titleStart: { x: 0, y: 0 },
      direction: "reverse",
    });
    setPhase(1);
    window.setTimeout(() => router.push("/"), 80);
  }, [pathname, returningHome, isHome, router]);

  // Forward: navigate to subpage after expand completes
  useEffect(() => {
    if (transition?.direction === "forward" && transition && phase === 1) {
      const timer = setTimeout(() => {
        router.push(transition.href);
      }, TRANSITION_MS + 50);
      return () => clearTimeout(timer);
    }
  }, [transition, phase, router]);

  // Forward: clear overlay after subpage panel has painted underneath
  useEffect(() => {
    if (
      transition?.direction === "forward" &&
      transition &&
      pathname === transition.href
    ) {
      let cancelled = false;
      const id = window.setTimeout(() => {
        if (cancelled) return;
        requestAnimationFrame(() => {
          if (cancelled) return;
          setTransition(null);
          setPhase(0);
          transitionLock.current = false;
          expandReadyRef.current = false;
        });
      }, 48);
      return () => {
        cancelled = true;
        window.clearTimeout(id);
      };
    }
  }, [pathname, transition]);

  // Reverse: clear transition after collapse completes on home
  useEffect(() => {
    if (
      transition?.direction === "reverse" &&
      transition &&
      phase === 0 &&
      isHome
    ) {
      const timer = setTimeout(() => {
        setTransition(null);
        setPhase(0);
        transitionLock.current = false;
        collapseStartedRef.current = false;
        setReturningHome(false);
      }, TRANSITION_MS + 80);
      return () => clearTimeout(timer);
    }
  }, [transition, phase, isHome]);

  // Reset lock when idle on a subpage or after returning home
  useEffect(() => {
    if (!transition) {
      transitionLock.current = false;
      expandReadyRef.current = false;
      collapseStartedRef.current = false;
      if (isHome) setReturningHome(false);
    }
  }, [isHome, transition]);

  // Nav overlay handlers
  const handleNavPage = useCallback(
    (page: NavPage) => {
      if (navOverlayLeaving) return;

      if (page === "blog") {
        if (navOverlay === "blog") {
          setNavOverlayLeaving(true);
          return;
        }
        setNavOverlayLeaving(false);
        setNavOverlay("blog");
        if (!isBlogRoute) router.push(BLOG_PATH);
        return;
      }

      if (navOverlay === page) {
        setNavOverlayLeaving(true);
        return;
      }

      if (isBlogRoute) router.push("/");
      setNavOverlayLeaving(false);
      setNavOverlay(page);
    },
    [navOverlay, navOverlayLeaving, isBlogRoute, router]
  );

  const handleNavAnimEnd = useCallback(() => {
    if (navOverlayLeaving) {
      const closingBlog = navOverlay === "blog";
      setNavOverlayLeaving(false);
      setNavOverlay(null);
      if (navReturnHomeRef.current) {
        navReturnHomeRef.current = false;
        if (pathname !== "/") {
          router.push("/");
        }
      } else if (closingBlog && isBlogPath(pathname)) {
        router.push("/");
      }
    }
  }, [navOverlayLeaving, navOverlay, pathname, router]);

  // Handle return-to-home navigation
  const handleReturnHome = useCallback(
    (e: React.MouseEvent) => {
      if (navOverlay) {
        e.preventDefault();
        navReturnHomeRef.current = pathname !== "/";
        setNavOverlayLeaving(true);
        return;
      }
      if (isHome || returningHome) return;
      e.preventDefault();
      startReturnTransition();
    },
    [isHome, returningHome, navOverlay, pathname, startReturnTransition]
  );

  // Caduceus: subpage layout during forward expand or while on subpage (before reverse)
  const atSubpage =
    (transition?.direction === "forward" && transition !== null && phase === 1) ||
    (transition?.direction === "reverse" && transition !== null && phase === 1) ||
    (!isHome && !isBlogRoute && transition === null && !returningHome);

  let caduceusClass = "scene-caduceus";
  if (atSubpage) {
    caduceusClass += mirror ? " scene-caduceus--left" : " scene-caduceus--right";
  } else {
    caduceusClass += " scene-caduceus--home";
  }

  const blogOpen = navOverlay === "blog";
  const navLinkClass = (page: NavPage) =>
    navOverlay === page && !navOverlayLeaving
      ? "scene-nav-link is-active"
      : "scene-nav-link";

  const siteNav = (
    <nav className="scene-frame scene-frame-tr scene-nav" aria-label="Site">
      {NAV_ITEMS.map(({ page, label }) => (
        <button
          key={page}
          type="button"
          className={navLinkClass(page)}
          onClick={() => handleNavPage(page)}
        >
          {label}
        </button>
      ))}
    </nav>
  );

  const siteLogo = (
    <Link href="/" onClick={handleReturnHome} className="scene-logo">
      <AntidoteWordmarkLabel />
    </Link>
  );

  const siteTopNav = (
    <header className="scene-top-nav">
      {!blogOpen ? (
        <a
          href="mailto:founders@antidotetransform.com"
          className="scene-frame scene-frame-tl scene-email"
        >
          founders@antidotetransform.com
        </a>
      ) : (
        <span className="scene-top-nav-spacer" aria-hidden="true" />
      )}
      {siteLogo}
      {siteNav}
    </header>
  );

  return (
    <SceneContext.Provider
      value={{
        startTransition,
        startReturnTransition,
        acknowledgeExpandReady,
        beginCollapse,
        transitioning: transition !== null,
        returningHome,
        transition,
        transitionPhase: phase,
        cardsIntroDone,
      }}
    >
      <div
        className={`scene-shell${!isHome && !isBlogRoute && transition === null ? " scene-shell--subpage" : ""}${navOverlay === "blog" ? " scene-shell--blog-open" : ""}`}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: "var(--page-bg)",
          overflow: "hidden",
        }}
      >
        <div className="scene-viewport-stage">
          <div className="scene-viewport-track">
            <div className="scene-viewport-pane">
        {siteTopNav}

        {!blogOpen ? (
          <>
            <p className="scene-frame scene-frame-bl scene-tagline">
              Transforming service businesses to become AI-native.
            </p>

            <div className="scene-frame scene-frame-br scene-location">
              New York / San Francisco — 2026
            </div>
          </>
        ) : null}

        {/* Caduceus — persists across routes */}
        <div
          className={caduceusClass}
          style={{ userSelect: "none", WebkitUserSelect: "none", pointerEvents: "none" }}
        >
          <AsciiSTL />
        </div>

        <FdOfferingRail
          visible={
            isForwardDeployed &&
            atSubpage &&
            !returningHome &&
            transition === null
          }
        />

        {children}

        <TraceCardsScene />

        {transition && <PillarExpandOverlay />}

        {/* Nav page overlay */}
        {navOverlay && (
          <div
            key={navOverlay}
            className={`${getOverlayClass(navOverlay, navOverlayLeaving)}${
              blogOpen ? " scene-nav-overlay--blog" : ""
            }`}
            onAnimationEnd={handleNavAnimEnd}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 8,
              display: "flex",
              alignItems: blogOpen ? "stretch" : "center",
              justifyContent: blogOpen ? "stretch" : "center",
              ...OVERLAY_STYLES[navOverlay],
            }}
          >
            {blogOpen ? (
              <div className="blog-shell">
                <div className="blog-overlay-scroll">
                  {getOverlayContent("blog", blogSlug)}
                </div>
              </div>
            ) : (
              getOverlayContent(navOverlay)
            )}
          </div>
        )}
            </div>
          </div>
        </div>
      </div>
    </SceneContext.Provider>
  );
}
