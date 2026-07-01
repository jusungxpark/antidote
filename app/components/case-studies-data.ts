export type CaseStudy = {
  id: number;
  slug: string;
  label: string;
  firm: string;
  image: string;
  hue: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    slug: "kkr",
    label: "Case Study #1",
    firm: "KKR",
    image: "/case-studies/kkr.jpg",
    hue: "rgba(168, 196, 232, 0.28)",
  },
  {
    id: 2,
    slug: "comvest-partners",
    label: "Case Study #2",
    firm: "Comvest Partners",
    image: "/case-studies/comvest.jpg",
    hue: "rgba(176, 210, 198, 0.28)",
  },
  {
    id: 3,
    slug: "vistria-group",
    label: "Case Study #3",
    firm: "Vistria Group",
    image: "/case-studies/vistria.jpg",
    hue: "rgba(164, 214, 186, 0.28)",
  },
  {
    id: 4,
    slug: "partners-group",
    label: "Case Study #4",
    firm: "Partners Group",
    image: "/case-studies/partners.jpg",
    hue: "rgba(196, 178, 228, 0.28)",
  },
  {
    id: 5,
    slug: "grain-management",
    label: "Case Study #5",
    firm: "Grain Management",
    image: "/case-studies/grain-management.jpg",
    hue: "rgba(214, 196, 168, 0.28)",
  },
  {
    id: 6,
    slug: "new-atlas-capital",
    label: "Case Study #6",
    firm: "New Atlas Capital",
    image: "/case-studies/new-atlas-capital.jpg",
    hue: "rgba(188, 196, 224, 0.28)",
  },
  {
    id: 7,
    slug: "graham-partners",
    label: "Case Study #7",
    firm: "Graham Partners",
    image: "/case-studies/graham.jpg",
    hue: "rgba(228, 196, 158, 0.28)",
  },
  {
    id: 8,
    slug: "connection-capital",
    label: "Case Study #8",
    firm: "Connection Capital",
    image: "/case-studies/connection-capital.jpg",
    hue: "rgba(200, 184, 210, 0.28)",
  },
];

export const CASE_STUDIES_PATH = "/case-studies";

export const DETAIL_FIELDS = [
  "Business",
  "Description",
  "Mandate",
  "Outcome",
] as const;

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export function getCaseStudySlugFromPath(pathname: string): string | null {
  if (!pathname.startsWith(`${CASE_STUDIES_PATH}/`)) return null;
  const slug = pathname.slice(CASE_STUDIES_PATH.length + 1).split("/")[0];
  if (!slug) return null;
  return getCaseStudyBySlug(slug) ? slug : null;
}

export function getCaseStudyPath(slug: string): string {
  return `${CASE_STUDIES_PATH}/${slug}`;
}
