export type PeFirmLogo = {
  id: string;
  name: string;
  src: string;
  /** When false, kept in data for later but omitted from the carousel. */
  carousel?: boolean;
};

export const PE_FIRM_LOGOS: PeFirmLogo[] = [
  { id: "kkr", name: "KKR", src: "/logos/pe-firms/kkr.svg" },
  { id: "comvest", name: "Comvest Partners", src: "/logos/pe-firms/comvest.svg" },
  { id: "vistria", name: "Vistria Group", src: "/logos/pe-firms/vistria.svg" },
  {
    id: "partners-group",
    name: "Partners Group",
    src: "/logos/pe-firms/partners-group.svg",
  },
  {
    id: "grain-management",
    name: "Grain Management",
    src: "/logos/pe-firms/grain-management.svg",
  },
  { id: "new-atlas", name: "New Atlas Capital", src: "/logos/pe-firms/new-atlas.svg" },
  {
    id: "graham",
    name: "Graham Partners",
    src: "/logos/pe-firms/graham.svg",
  },
];

export const PE_FIRM_CAROUSEL_LOGOS = PE_FIRM_LOGOS.filter(
  (firm) => firm.carousel !== false
);
