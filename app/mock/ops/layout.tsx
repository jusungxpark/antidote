import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import "./ops.css";

const opsMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ops-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cycle · Antidote",
  description:
    "TPA operating system mock. Replaces PensionPro work management and the FT William surfaces a shop like Cerberus actually lives in.",
};

export default function OpsLayout({ children }: { children: ReactNode }) {
  return <div className={`ops-root ${opsMono.variable}`}>{children}</div>;
}
