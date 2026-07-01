import type { ReactNode } from "react";
import { SubpageLayout } from "../components/SubpageLayout";

export default function TransformationLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <SubpageLayout>{children}</SubpageLayout>;
}
