export type FdSite = "hub" | "strategy" | "diligence" | "transformation";

export type FdRoute = {
  site: FdSite;
  page: string;
  studySlug: string | null;
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
  ]),
  transformation: new Set(["home", "method", "work"]),
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

export function parseFdRoute(pathname: string): FdRoute {
  const parts = normalizeFdPathname(pathname).split("/").filter(Boolean);

  if (parts.length === 0) {
    return { site: "hub", page: "home", studySlug: null };
  }

  const siteCandidate = parts[0];
  if (!OFFERINGS.has(siteCandidate)) {
    return { site: "hub", page: "home", studySlug: null };
  }

  const site = siteCandidate as Exclude<FdSite, "hub">;
  const allowed = PAGES[site];
  const second = parts[1];

  if (!second) {
    return { site, page: "home", studySlug: null };
  }

  if (allowed.has(second)) {
    const studySlug =
      second === "work" && parts[2] ? parts[2] : null;
    return { site, page: second, studySlug };
  }

  return { site, page: "home", studySlug: null };
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
    if (page === "home") segments.push("work");
    segments.push(studySlug);
  }

  return `${base}/${segments.join("/")}`;
}
