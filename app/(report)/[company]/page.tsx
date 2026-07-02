// antidotetransform.com/[company-name] — portco-direct variant.
// One route per file in data/companies/. retirementtpa.json is the
// reference send; duplicate it for each new firm (same sector scaffold).
// Fill name, plans, fte, and peState.sponsorName if needed. No code changes.

import { notFound } from "next/navigation";
import Report from "../../components/report/Report";
import { listCompanySlugs, loadCompany, loadSector } from "../loadData";

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
    title: c ? `${c.name} | Antidote` : "Antidote",
    robots: { index: false, follow: false },
  };
}

export default async function CompanyReport({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company: slug } = await params;
  const company = loadCompany(slug);
  if (!company) notFound();
  const sector = loadSector(company.sector);
  return <Report sector={sector} company={company} variant="portco" />;
}
