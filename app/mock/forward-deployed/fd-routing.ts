export type FdSite = "hub" | "strategy" | "diligence" | "transformation";

export type FdRoute = {
  site: FdSite;
  page: string;
  /** Case-study slug (strategy/transformation) or diligence nested slug. */
  studySlug: string | null;
  /** Full CDD iframe path when site is diligence (e.g. /evals/finqa). */
  cddPath: string | null;
};

const MOCK_BASE = "/mock/forward-deployed";

const OFFERINGS = new Set(["strategy", "diligence", "transformation"]);

const PAGES: Record<Exclude<FdSite, "hub">, Set<string>> = {
  strategy: new Set(["home", "work"]),
  diligence: new Set([
    "home",
    "method",
    "evals",
    "software",
    "advisory",
    "automation",
    "reports",
  ]),
  transformation: new Set(["home", "method", "work", "resources"]),
};

/** Strip mock prefix so FD host (`/strategy`) and mock (`/mock/forward-deployed/strategy`) share one parser. */
export function normalizeFdPathname(pathname: string): string {
  if (pathname === MOCK_BASE || pathname === `${MOCK_BASE}/`) return "/";
  if (pathname.startsWith(`${MOCK_BASE}/`)) {
    return pathname.slice(MOCK_BASE.length) || "/";
  }
  return pathname || "/";
}

export function fdBaseFromPathname(pathname: string): string {
  return pathname.startsWith(MOCK_BASE) ? MOCK_BASE : "";
}

function diligenceCddPath(page: string, rest: string[]): string {
  if (page === "home" && rest.length === 0) return "/";
  const segments = page === "home" ? rest : [page, ...rest];
  return `/${segments.join("/")}`;
}

export function parseFdRoute(pathname: string): FdRoute {
  const parts = normalizeFdPathname(pathname).split("/").filter(Boolean);

  if (parts.length === 0) {
    return { site: "hub", page: "home", studySlug: null, cddPath: null };
  }

  const siteCandidate = parts[0];
  if (!OFFERINGS.has(siteCandidate)) {
    return { site: "hub", page: "home", studySlug: null, cddPath: null };
  }

  const site = siteCandidate as Exclude<FdSite, "hub">;
  const allowed = PAGES[site];
  const second = parts[1];

  if (!second) {
    return {
      site,
      page: "home",
      studySlug: null,
      cddPath: site === "diligence" ? "/" : null,
    };
  }

  if (site === "diligence") {
    // Allow known sections, plus nested report/eval slugs: /diligence/evals/finqa
    const page = allowed.has(second) ? second : "home";
    const rest = allowed.has(second) ? parts.slice(2) : parts.slice(1);
    return {
      site,
      page,
      studySlug: rest[0] ?? null,
      cddPath: diligenceCddPath(page, rest),
    };
  }

  if (allowed.has(second)) {
    const studySlug =
      (second === "work" || second === "resources") && parts[2]
        ? parts[2]
        : null;
    return { site, page: second, studySlug, cddPath: null };
  }

  return {
    site,
    page: "home",
    studySlug: null,
    cddPath: null,
  };
}

export function buildFdHref(
  base: string,
  site: FdSite,
  page = "home",
  studySlug?: string | null,
): string {
  if (site === "hub") return base || "/";

  const segments: string[] = [site];
  if (page !== "home") segments.push(page);
  if (studySlug) {
    if (page === "home") {
      segments.push(site === "diligence" ? "evals" : "work");
    }
    segments.push(studySlug);
  }

  return `${base}/${segments.join("/")}`;
}

/** Build a diligence deep link from a CDD-relative path like /evals/finqa. */
export function buildDiligenceHrefFromCdd(
  base: string,
  cddPath: string,
): string {
  const clean = cddPath.startsWith("/") ? cddPath.slice(1) : cddPath;
  if (!clean) return buildFdHref(base, "diligence", "home");
  return `${base}/diligence/${clean}`;
}
