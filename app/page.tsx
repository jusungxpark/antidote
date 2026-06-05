"use client";

import dynamic from "next/dynamic";

const TraceCardsScene = dynamic(
  () =>
    import("./components/trace-cards/r3f-scene").then(
      (m) => m.TraceCardsScene
    ),
  { ssr: false }
);

export default function Home() {
  return <TraceCardsScene />;
}
