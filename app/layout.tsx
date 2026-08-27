import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { IBM_Plex_Sans } from "next/font/google";
import { AppShell } from "./components/SceneShell";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Antidote",
  description: "Transforming service businesses to become AI-native.",
};

function isFdHost(host: string | null, siteHeader: string | null) {
  if (siteHeader === "fd") return true;
  if (!host) return false;
  const bare = host.split(":")[0]!.toLowerCase();
  return bare === "fd.antidotetransform.com" || bare === "fd.localhost";
}

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const h = await headers();
  const fd = isFdHost(h.get("host"), h.get("x-antidote-site"));

  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <body>
        {/* FD subdomain is a separate site — never wrap with main SceneShell */}
        {fd ? children : <AppShell>{children}</AppShell>}
      </body>
    </html>
  );
}
