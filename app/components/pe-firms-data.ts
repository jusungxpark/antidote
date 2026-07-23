export type PeFirmLogo = {
  id: string;
  name: string;
  src: string;
  /** When false, kept in data for later but omitted from the carousel. */
  carousel?: boolean;
};

export const PE_FIRM_LOGOS: PeFirmLogo[] = [
  { id: "kkr", name: "KKR", src: "/logos/pe-firms/kkr.png" },
  { id: "comvest", name: "Comvest Partners", src: "/logos/pe-firms/comvest.png" },
  { id: "vistria", name: "Vistria Group", src: "/logos/pe-firms/vistria.png" },
  {
    id: "partners-group",
    name: "Partners Group",
    src: "/logos/pe-firms/partners-group.png",
  },
  {
    id: "grain-management",
    name: "Grain Management",
    src: "/logos/pe-firms/grain-management.png",
  },
  { id: "new-atlas", name: "New Atlas Capital", src: "/logos/pe-firms/new-atlas.png" },
  // Kept for later — omit from carousel until ready to show again.
  {
    id: "graham",
    name: "Graham Partners",
    src: "/logos/pe-firms/graham.png",
    carousel: false,
  },
];

export const PE_FIRM_CAROUSEL_LOGOS = PE_FIRM_LOGOS.filter(
  (firm) => firm.carousel !== false
);
