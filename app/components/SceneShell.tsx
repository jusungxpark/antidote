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
import { PillarExpandOverlay } from "./PillarExpandOverlay";
import { CaseStudiesScreen } from "./CaseStudiesScreen";
import { CaseStudyDetailScreen } from "./CaseStudyDetailScreen";
import { CaseStudyExpandOverlay } from "./CaseStudyExpandOverlay";
import {
  CASE_STUDIES_PATH,
  getCaseStudyBySlug,
  getCaseStudySlugFromPath,
  type CaseStudy,
} from "./case-studies-data";
import { CARDS } from "./trace-cards/config";
import { computeHomeCardRect, type LayoutRect } from "./trace-cards/card-layout";
import {
  measureCaseStudyCardTarget,
  type TitleRect,
} from "./case-study-layout";

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
const CASE_STUDIES_SLIDE_MS = 900;
const CASE_STUDY_EXPAND_MS = 680;

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

export interface CaseStudyTransitionRequest {
  study: CaseStudy;
  href: string;
  cardRect: { top: number; left: number; width: number; height: number };
  titleRect?: TitleRect;
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
  caseStudiesOpen: boolean;
  openCaseStudies: () => void;
  closeCaseStudies: () => void;
  caseStudyTransition: CaseStudyTransitionRequest | null;
  caseStudyTransitionPhase: number;
  caseStudyTransitionLock: boolean;
  startCaseStudyTransition: (req: CaseStudyTransitionRequest) => void;
  closeCaseStudyDetail: () => void;
  acknowledgeCaseStudyExpandReady: () => void;
  caseStudyHandoff: boolean;
  onCaseStudyMorphEnd: () => void;
  onCaseStudyReverseEnd: () => void;
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
  caseStudiesOpen: false,
  openCaseStudies: () => {},
  closeCaseStudies: () => {},
  caseStudyTransition: null,
  caseStudyTransitionPhase: 0,
  caseStudyTransitionLock: false,
  startCaseStudyTransition: () => {},
  closeCaseStudyDetail: () => {},
  acknowledgeCaseStudyExpandReady: () => {},
  caseStudyHandoff: false,
  onCaseStudyMorphEnd: () => {},
  onCaseStudyReverseEnd: () => {},
});

export function useScene() {
  return useContext(SceneContext);
}

function getPageInfo(pathname: string): { title: string; mirror: boolean } | null {
  if (pathname.startsWith("/transformation")) {
    return { title: "AI Transformation", mirror: false };
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

const BLOG_CONTENT = (
  <p
    style={{
      fontFamily: "var(--font-sans)",
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

function getOverlayContent(page: NavPage): ReactNode {
  switch (page) {
    case "manifesto":
      return MANIFESTO_CONTENT;
    case "team":
      return TEAM_CONTENT;
    case "blog":
      return BLOG_CONTENT;
  }
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
  const [navOverlay, setNavOverlay] = useState<NavPage | null>(null);
  const [navOverlayLeaving, setNavOverlayLeaving] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(
    () =>
      pathname === CASE_STUDIES_PATH ||
      getCaseStudySlugFromPath(pathname) !== null
  );
  const caseStudiesClosingRef = useRef(false);
  const navReturnHomeRef = useRef(false);
  const [caseStudyTransition, setCaseStudyTransition] =
    useState<CaseStudyTransitionRequest | null>(null);
  const [caseStudyTransitionPhase, setCaseStudyTransitionPhase] = useState(0);
  const [caseStudyHandoff, setCaseStudyHandoff] = useState(false);
  const caseStudyTransitionLock = useRef(false);
  const caseStudyOriginRectRef = useRef<LayoutRect | null>(null);
  const caseStudyOriginTitleRectRef = useRef<TitleRect | null>(null);
  const caseStudyExpandReadyRef = useRef(false);
  const reverseAwaitingRouteRef = useRef(false);

  const caseStudySlug = getCaseStudySlugFromPath(pathname);
  const activeCaseStudy = caseStudySlug
    ? getCaseStudyBySlug(caseStudySlug)
    : undefined;
  const isCaseStudiesListRoute = pathname === CASE_STUDIES_PATH;
  const isCaseStudiesRoute =
    isCaseStudiesListRoute || activeCaseStudy !== undefined;

  useEffect(() => {
    if (caseStudiesClosingRef.current) return;
    setCaseStudiesOpen(isCaseStudiesRoute);
  }, [isCaseStudiesRoute]);

  const openCaseStudies = useCallback(() => {
    router.push(CASE_STUDIES_PATH);
  }, [router]);

  const closeCaseStudies = useCallback(() => {
    if (caseStudiesClosingRef.current) return;
    caseStudiesClosingRef.current = true;
    setCaseStudiesOpen(false);
    setCaseStudyTransition(null);
    setCaseStudyTransitionPhase(0);
    setCaseStudyHandoff(false);
    caseStudyTransitionLock.current = false;
    caseStudyExpandReadyRef.current = false;
    window.setTimeout(() => {
      if (pathname.startsWith(CASE_STUDIES_PATH)) {
        router.push("/transformation");
      }
      caseStudiesClosingRef.current = false;
    }, CASE_STUDIES_SLIDE_MS);
  }, [pathname, router]);

  const startCaseStudyTransition = useCallback(
    (req: CaseStudyTransitionRequest) => {
      if (caseStudyTransitionLock.current) return;
      caseStudyTransitionLock.current = true;
      caseStudyExpandReadyRef.current = false;
      caseStudyOriginRectRef.current = req.cardRect;
      caseStudyOriginTitleRectRef.current = req.titleRect ?? null;
      setCaseStudyHandoff(false);
      setCaseStudyTransition(req);
      setCaseStudyTransitionPhase(0);
    },
    []
  );

  const acknowledgeCaseStudyExpandReady = useCallback(() => {
    if (caseStudyExpandReadyRef.current) return;
    caseStudyExpandReadyRef.current = true;
    setCaseStudyTransitionPhase(1);
  }, []);

  const onCaseStudyMorphEnd = useCallback(() => {
    if (!caseStudyTransition || caseStudyTransition.direction !== "forward") return;
    router.push(caseStudyTransition.href);
  }, [caseStudyTransition, router]);

  const onCaseStudyReverseEnd = useCallback(() => {
    if (!caseStudyTransition || caseStudyTransition.direction !== "reverse") return;
    if (reverseAwaitingRouteRef.current) return;
    reverseAwaitingRouteRef.current = true;
    router.push(CASE_STUDIES_PATH);
  }, [caseStudyTransition, router]);

  const finishReverseTransition = useCallback((slug: string) => {
    const measured = measureCaseStudyCardTarget(slug);
    const cardRect =
      measured?.cardRect ?? caseStudyOriginRectRef.current ?? null;
    const titleRect =
      measured?.titleRect ?? caseStudyOriginTitleRectRef.current ?? undefined;

    if (cardRect) {
      setCaseStudyTransition((prev) =>
        prev && prev.direction === "reverse"
          ? { ...prev, cardRect, titleRect }
          : prev
      );
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          reverseAwaitingRouteRef.current = false;
          setCaseStudyTransition(null);
          setCaseStudyTransitionPhase(0);
          setCaseStudyHandoff(false);
          caseStudyTransitionLock.current = false;
          caseStudyExpandReadyRef.current = false;
        });
      });
    });
  }, []);

  useEffect(() => {
    if (
      !reverseAwaitingRouteRef.current ||
      pathname !== CASE_STUDIES_PATH ||
      caseStudyTransition?.direction !== "reverse"
    ) {
      return;
    }

    finishReverseTransition(caseStudyTransition.study.slug);
  }, [pathname, caseStudyTransition, finishReverseTransition]);

  useEffect(() => {
    if (
      !reverseAwaitingRouteRef.current ||
      caseStudyTransition?.direction !== "reverse"
    ) {
      return;
    }

    const fallback = window.setTimeout(() => {
      if (!reverseAwaitingRouteRef.current) return;
      if (pathname === CASE_STUDIES_PATH) return;
      reverseAwaitingRouteRef.current = false;
      setCaseStudyTransition(null);
      setCaseStudyTransitionPhase(0);
      setCaseStudyHandoff(false);
      caseStudyTransitionLock.current = false;
      caseStudyExpandReadyRef.current = false;
    }, CASE_STUDY_EXPAND_MS + 200);

    return () => window.clearTimeout(fallback);
  }, [caseStudyTransition, pathname]);

  useEffect(() => {
    if (
      caseStudyTransition?.direction !== "forward" ||
      caseStudyTransitionPhase !== 0
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      acknowledgeCaseStudyExpandReady();
    }, 64);

    return () => window.clearTimeout(timer);
  }, [caseStudyTransition, caseStudyTransitionPhase, acknowledgeCaseStudyExpandReady]);

  const closeCaseStudyDetail = useCallback(() => {
    if (caseStudyTransitionLock.current || !activeCaseStudy) return;

    const measured = measureCaseStudyCardTarget(activeCaseStudy.slug);
    const cardRect =
      measured?.cardRect ?? caseStudyOriginRectRef.current;
    const titleRect =
      measured?.titleRect ?? caseStudyOriginTitleRectRef.current ?? undefined;

    if (!cardRect) return;

    reverseAwaitingRouteRef.current = false;
    setCaseStudyHandoff(false);
    caseStudyTransitionLock.current = true;
    caseStudyExpandReadyRef.current = false;
    setCaseStudyTransition({
      study: activeCaseStudy,
      href: `${CASE_STUDIES_PATH}/${activeCaseStudy.slug}`,
      cardRect,
      titleRect,
      direction: "reverse",
    });
    setCaseStudyTransitionPhase(1);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setCaseStudyTransitionPhase(0));
    });
  }, [activeCaseStudy]);

  useEffect(() => {
    if (
      caseStudyTransition?.direction === "forward" &&
      pathname === caseStudyTransition.href
    ) {
      setCaseStudyHandoff(true);

      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCaseStudyTransition(null);
          setCaseStudyTransitionPhase(0);
          setCaseStudyHandoff(false);
          caseStudyTransitionLock.current = false;
          caseStudyExpandReadyRef.current = false;
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [pathname, caseStudyTransition]);

  const isHome = pathname === "/";
  const isTransformation = pathname.startsWith("/transformation");
  const pageInfo = getPageInfo(pathname);

  useEffect(() => {
    if (!isTransformation && !isCaseStudiesRoute && !caseStudiesClosingRef.current) {
      setCaseStudiesOpen(false);
    }
  }, [isTransformation, isCaseStudiesRoute]);

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
    const cardIndex = pathname.startsWith("/transformation")
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
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransition(null);
            setPhase(0);
            transitionLock.current = false;
            expandReadyRef.current = false;
          });
        });
      });
      return () => cancelAnimationFrame(id);
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
      if (caseStudiesOpen || isCaseStudiesRoute) {
        e.preventDefault();
        closeCaseStudies();
        return;
      }
      if (navOverlay) {
        e.preventDefault();
        navReturnHomeRef.current = !isHome;
        setNavOverlayLeaving(true);
        return;
      }
      if (isHome || returningHome) return;
      e.preventDefault();
      startReturnTransition();
    },
    [isHome, returningHome, navOverlay, caseStudiesOpen, isCaseStudiesRoute, closeCaseStudies, startReturnTransition]
  );

  // Caduceus: subpage layout during forward expand or while on subpage (before reverse)
  const atSubpage =
    (transition?.direction === "forward" && transition !== null && phase === 1) ||
    (transition?.direction === "reverse" && transition !== null && phase === 1) ||
    (!isHome && transition === null && !returningHome);

  let caduceusClass = "scene-caduceus";
  if (atSubpage) {
    caduceusClass += mirror ? " scene-caduceus--left" : " scene-caduceus--right";
  } else {
    caduceusClass += " scene-caduceus--home";
  }

  const navLinkClass = (page: NavPage) =>
    navOverlay === page && !navOverlayLeaving ? "scene-nav-link is-active" : "scene-nav-link";

  const detailStudy = activeCaseStudy ?? caseStudyTransition?.study;

  let detailPhase: "hidden" | "underlay" | "visible" = "hidden";
  if (detailStudy) {
    if (caseStudyTransition?.direction === "reverse") {
      detailPhase = "underlay";
    } else if (caseStudyHandoff || (activeCaseStudy && !caseStudyTransition)) {
      detailPhase = "visible";
    } else if (caseStudyTransition?.direction === "forward") {
      detailPhase = "underlay";
    } else if (activeCaseStudy) {
      detailPhase = "visible";
    }
  }

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
        caseStudiesOpen,
        openCaseStudies,
        closeCaseStudies,
        caseStudyTransition,
        caseStudyTransitionPhase,
        caseStudyTransitionLock: caseStudyTransition !== null,
        startCaseStudyTransition,
        closeCaseStudyDetail,
        acknowledgeCaseStudyExpandReady,
        caseStudyHandoff,
        onCaseStudyMorphEnd,
        onCaseStudyReverseEnd,
      }}
    >
      <div
        className={`scene-shell${!isHome && !isCaseStudiesRoute && transition === null ? " scene-shell--subpage" : ""}${navOverlay === "blog" ? " scene-shell--blog-open" : ""}${caseStudiesOpen ? " scene-shell--case-studies-open" : ""}`}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: "var(--page-bg)",
          overflow: "hidden",
        }}
      >
        <div className="scene-viewport-stage">
          <div
            className={`scene-viewport-track${caseStudiesOpen ? " is-advanced" : ""}`}
          >
            <div className="scene-viewport-pane">
        <a
          href="mailto:founders@antidotetransform.com"
          className="scene-frame scene-frame-tl scene-email"
        >
          founders@antidotetransform.com
        </a>

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

        <Link href="/" onClick={handleReturnHome} className="scene-logo">
          Antid<span style={{ fontStyle: "italic" }}>o</span>te.
        </Link>

        <p className="scene-frame scene-frame-bl scene-tagline">
          Transforming service businesses to become AI-native.
        </p>

        <div className="scene-frame scene-frame-br scene-location">New York — 2026</div>

        {/* Caduceus — persists across routes */}
        <div
          className={caduceusClass}
          style={{ userSelect: "none", WebkitUserSelect: "none", pointerEvents: "none" }}
        >
          <AsciiSTL />
        </div>

        {children}

        <TraceCardsScene />

        {transition && <PillarExpandOverlay />}

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
            {getOverlayContent(navOverlay)}
          </div>
        )}
            </div>

            <div className="scene-viewport-pane scene-case-studies-pane">
              <CaseStudiesScreen
                onBack={closeCaseStudies}
                hidden={detailStudy !== undefined}
              />
              {detailStudy ? (
                <CaseStudyDetailScreen
                  study={detailStudy}
                  onBack={closeCaseStudyDetail}
                  phase={detailPhase}
                  animateFields={
                    caseStudyTransition?.direction === "forward" &&
                    caseStudyTransitionPhase === 1 &&
                    !caseStudyHandoff
                  }
                />
              ) : null}
            </div>
          </div>
        </div>
        {caseStudyTransition ? <CaseStudyExpandOverlay /> : null}
      </div>
    </SceneContext.Provider>
  );
}
