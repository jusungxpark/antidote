import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { PreviewBanner } from "./PreviewBanner";
import "./mock.css";

export const metadata: Metadata = {
  title: "Antidote, Forward Deployed",
  description:
    "Strategy, Diligence, and Transformation for PE sponsors and operators at the frontier of AI.",
};

function isFdRequest(host: string | null, siteHeader: string | null) {
  if (siteHeader === "fd") return true;
  if (!host) return false;
  const bare = host.split(":")[0]!.toLowerCase();
  return bare === "fd.antidotetransform.com" || bare === "fd.localhost";
}

export default async function ForwardDeployedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const h = await headers();
  const isFd = isFdRequest(h.get("host"), h.get("x-antidote-site"));

  return (
    <div className={`fdm-root${isFd ? " fdm-root--fd" : ""}`}>
      <PreviewBanner />
      {children}
    </div>
  );
}
