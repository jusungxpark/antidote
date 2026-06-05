import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SceneShell } from "./components/SceneShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Antidote",
  description: "Transforming service businesses to become AI-native.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SceneShell>{children}</SceneShell>
      </body>
    </html>
  );
}
