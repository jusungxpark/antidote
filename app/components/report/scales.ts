// Hand-rolled scales — zero chart dependencies, SSR-safe.
// (Can be swapped for @visx/scale 1:1 if interactivity is ever
// needed; for static editorial charts this is all that's required.)

export function linearScale(
  domain: [number, number],
  range: [number, number]
) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  return (v: number) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
}

export function logScale(domain: [number, number], range: [number, number]) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const l0 = Math.log10(d0);
  const l1 = Math.log10(d1);
  return (v: number) => r0 + ((Math.log10(v) - l0) / (l1 - l0)) * (r1 - r0);
}

export function fmt(n: number): string {
  return n.toLocaleString("en-US");
}
