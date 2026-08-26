import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./mock.css";

export const metadata: Metadata = {
  title: "Antidote, Forward Deployed",
  description:
    "Strategy, Diligence, and Transformation for PE sponsors and operators at the frontier of AI.",
};

export default function ForwardDeployedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div className="fdm-root">{children}</div>;
}
