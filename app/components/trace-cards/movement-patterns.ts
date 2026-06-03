// ── Movement Patterns ──
// Computes ensemble dot positions for pyramid and diamond formations

import type { MovementPattern, Vec3 } from "./config";

/**
 * Compute square formation corners.
 * Returns positions equidistant from center at the given radius.
 */
function squareCorners(count: number, radius: number): Vec3[] {
  const corners: Vec3[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 4; // start at -45deg for upright square
    corners.push({
      x: Math.cos(angle) * radius * Math.SQRT1_2 * 2,
      y: Math.sin(angle) * radius * Math.SQRT1_2 * 2,
      z: 0,
    });
  }
  return corners;
}

/**
 * Pyramid trace pattern.
 *
 * progress 0 → all dots centered at tip (single point)
 * progress 1 → dots spread to square base corners
 *
 * The duplicate layer captures the tip state and streams away.
 * Sculpt connects base corners to the duplicate's tip.
 */
export function computePyramidPositions(
  progress: number,
  count: number,
  radius: number
): Vec3[] {
  const base = squareCorners(count, radius);
  return base.map((corner) => ({
    x: corner.x * progress,
    y: corner.y * progress,
    z: 0,
  }));
}

/**
 * Diamond trace pattern.
 *
 * Three tiers: table (inner ring) → girdle (outer ring) → tip (center)
 *
 * progress 0.0 → dots form inner ring (table) — this is the starting state
 * progress 0.5 → dots expand to outer ring (girdle)
 * progress 1.0 → dots collapse to center (tip/culet)
 *
 * At progress ~0: spawn dup with inner ring (table)
 * At progress ~0.5: spawn dup with outer ring (girdle)
 * Live card ends at center (tip)
 */
export function computeDiamondPositions(
  progress: number,
  count: number,
  radius: number
): Vec3[] {
  const innerRadius = radius * 0.28;
  const outerRadius = radius;

  if (progress <= 0.5) {
    // Phase 1: inner ring → outer ring
    const t = progress / 0.5;
    const r = innerRadius + (outerRadius - innerRadius) * t;
    return squareCorners(count, r);
  } else {
    // Phase 2: outer ring → center
    const t = (progress - 0.5) / 0.5;
    const r = outerRadius * (1 - t);
    return squareCorners(count, r);
  }
}

/**
 * Get positions for a pattern at a given progress.
 */
export function computeEnsemblePositions(
  pattern: MovementPattern,
  progress: number,
  count: number,
  radius: number
): Vec3[] {
  switch (pattern) {
    case "pyramidTrace":
      return computePyramidPositions(progress, count, radius);
    case "diamondTrace":
      return computeDiamondPositions(progress, count, radius);
  }
}

/**
 * Get the rest-state positions (what's visible before hover).
 */
export function computeRestPositions(
  pattern: MovementPattern,
  count: number,
  radius: number
): Vec3[] {
  switch (pattern) {
    case "pyramidTrace":
      // At rest: all dots at center (tip)
      return computePyramidPositions(0, count, radius);
    case "diamondTrace":
      // At rest: dots form inner ring (table)
      return computeDiamondPositions(0, count, radius);
  }
}

/**
 * How many duplicate layers does this pattern need?
 */
export function getStructureLayers(pattern: MovementPattern): number {
  switch (pattern) {
    case "pyramidTrace":
      return 1; // one dup for the tip
    case "diamondTrace":
      return 2; // table dup + girdle dup
  }
}

/**
 * At what progress values should duplicate layers spawn?
 */
export function getSpawnProgressValues(pattern: MovementPattern): number[] {
  switch (pattern) {
    case "pyramidTrace":
      return [0]; // spawn at start (tip state)
    case "diamondTrace":
      return [0, 0.5]; // spawn at inner ring, then at outer ring
  }
}
