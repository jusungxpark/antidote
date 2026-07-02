// antidotetransform.com/pe/[company-name] — PE-sponsor variant.
// Same company JSON as the portco route. variant="pe" switches headline,
// lede, benchmark EBITDA strip, sequence title, margin bridge label, and
// Why Antidote copy. retirementtpa is the reference; duplicate the JSON
// per firm.

import { notFound } from "next/navigation";
import Report from "../../../components/report/Report";
import { listCompanySlugs, loadCompany, loadSector } from "../../loadData";

export const dynamicParams = false;

export function generateStaticParams() {
  return listCompanySlugs().map((company) => ({ company }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const c = loadCompany(company);
  return {
    title: c ? `${c.name} | Antidote (Sponsor Briefing)` : "Antidote",
    robots: { index: false, follow: false },
  };
}

export default async function SponsorReport({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company: slug } = await params;
  const company = loadCompany(slug);
  if (!company) notFound();
  const sector = loadSector(company.sector);
  return <Report sector={sector} company={company} variant="pe" />;
}
