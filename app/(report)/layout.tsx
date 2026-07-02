// ============================================================
// OUTREACH REPORT LAYOUT — wraps /[company-name] and
// /pe/[company-name]. Loads the report's own fonts and styles;
// the marketing site (SceneShell, dark theme) is bypassed for
// these routes via AppShell in components/SceneShell.tsx.
// ============================================================

import type { ReactNode } from "react";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./report.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-report-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-report-mono",
  display: "swap",
});

export default function ReportLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${inter.variable} ${plexMono.variable} report-body`}>
      {children}
    </div>
  );
}
