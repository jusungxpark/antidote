import type { ReactNode } from "react";
import { SubpageLayout } from "../components/SubpageLayout";

export default function ForwardDeployedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <SubpageLayout>{children}</SubpageLayout>;
}
