import type { ReactNode } from "react";
import "./mock.css";

export default function ForwardDeployedMockLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div className="fdm-root">{children}</div>;
}
