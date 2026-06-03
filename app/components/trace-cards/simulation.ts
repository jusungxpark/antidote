// ── Trace Cards Simulation ──
// Core simulation logic: tilt, structural progress, formation rotation,
// duplicate layer spawning, and dehover rewind.

import type {
  CardDefinition,
  CardState,
  DuplicatePlane,
  Entity,
  Vec3,
} from "./config";
import { DEFAULT_PARAMS, UNIT } from "./config";
import {
  computeEnsemblePositions,
  computeRestPositions,
  getSpawnProgressValues,
} from "./movement-patterns";

const DEG = Math.PI / 180;

// ── Create initial state ──

export function createCardState(card: CardDefinition): CardState {
  const count = card.elementCount;
  const radius = 80; // orbitRadius in card pixels
  const restPositions = computeRestPositions(
    card.movementPattern,
    count,
    radius
  );

  const entities: Entity[] = [];
  for (let i = 0; i < count; i++) {
    const rest = restPositions[i] || { x: 0, y: 0, z: 0 };
    entities.push({
      id: i,
      pos: { ...rest },
      anchorPos: { ...rest },
      seed: Math.random(),
    });
  }

  return {
    hover: 0,
    pointerX: 0,
    pointerY: 0,
    tiltX: 0,
    tiltY: 0,
    tiltZ: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    targetTiltZ: 0,
    entities,
    planes: [],
    structureProgress: 0,
    structureComplete: false,
    formationSpinAngleRad: 0,
    formationSpinBlend: 0,
    formationSpinTime: 0,
    shellOpacity: 1,
    isFullyTilted: false,
    planeIdCounter: 0,
  };
}

// ── Step simulation ──

export function stepSimulation(
  state: CardState,
  card: CardDefinition,
  dt: number, // seconds
  isHovered: boolean,
  pointerX: number, // -1..1
  pointerY: number // -1..1
): void {
  const p = DEFAULT_PARAMS;
  const effectiveDt = dt * p.motion.overallSpeed;

  // ── Hover lerp ──
  const hoverTarget = isHovered ? 1 : 0;
  state.hover += (hoverTarget - state.hover) * p.visual.hoverLerp;
  if (Math.abs(state.hover - hoverTarget) < 0.001) state.hover = hoverTarget;

  // ── Shell opacity (fade on hover) ──
  const shellTarget = isHovered ? p.visual.hoverShellOpacity : 1;
  state.shellOpacity += (shellTarget - state.shellOpacity) * 0.08;

  // ── Pointer position (direct — tiltLerp handles smoothing) ──
  if (isHovered) {
    state.pointerX = pointerX;
    state.pointerY = pointerY;
  }

  // ── Tilt (pointer-based) ──
  if (isHovered) {
    state.targetTiltX = -state.pointerY * p.tilt.pointerTilt; // inverted Y
    state.targetTiltY = state.pointerX * p.tilt.pointerTilt;
    state.targetTiltZ = 0;
  } else {
    // On dehover: tilt and layers rewind simultaneously
    state.targetTiltX = 0;
    state.targetTiltY = 0;
    state.targetTiltZ = 0;
  }

  state.tiltX += (state.targetTiltX - state.tiltX) * p.tilt.tiltLerp;
  state.tiltY += (state.targetTiltY - state.tiltY) * p.tilt.tiltLerp;
  state.tiltZ += (state.targetTiltZ - state.tiltZ) * p.tilt.tiltLerp;

  // Snap small tilts to zero
  if (Math.abs(state.tiltX) < 0.01) state.tiltX = 0;
  if (Math.abs(state.tiltY) < 0.01) state.tiltY = 0;
  if (Math.abs(state.tiltZ) < 0.01) state.tiltZ = 0;

  // With pointer-based tilt, streaming unlocks as soon as hover engages
  state.isFullyTilted = isHovered;

  // ── Structural progress ──
  const duration = p.motion.structureDuration;
  const progressStep = effectiveDt / duration;

  if (isHovered) {
    if (state.structureProgress < 1) {
      state.structureProgress = Math.min(1, state.structureProgress + progressStep);
    }
    if (state.structureProgress >= 0.999) {
      state.structureProgress = 1;
      state.structureComplete = true;
    }
  } else {
    // Rewind on dehover
    if (state.structureProgress > 0) {
      state.structureProgress = Math.max(0, state.structureProgress - progressStep);
      state.structureComplete = false;
    }
  }

  // ── Entity positions ──
  const radius = 80;
  const positions = computeEnsemblePositions(
    card.movementPattern,
    state.structureProgress,
    card.elementCount,
    radius
  );

  for (let i = 0; i < state.entities.length; i++) {
    const target = positions[i];
    if (target) {
      state.entities[i].pos.x = target.x;
      state.entities[i].pos.y = target.y;
      state.entities[i].pos.z = target.z;
      state.entities[i].anchorPos.x = target.x;
      state.entities[i].anchorPos.y = target.y;
      state.entities[i].anchorPos.z = target.z;
    }
  }

  // ── Duplicate layer spawning ──
  const spawnProgressValues = getSpawnProgressValues(card.movementPattern);
  const maxTravel = p.planes.layerTravel * p.layout.cardSize;

  if (isHovered && state.isFullyTilted) {
    for (const spawnAt of spawnProgressValues) {
      // Check if we've passed this spawn point and haven't spawned for it yet
      if (state.structureProgress >= spawnAt) {
        const alreadySpawned = state.planes.some(
          (pl) => Math.abs(pl.structureProgress - spawnAt) < 0.01
        );
        if (!alreadySpawned) {
          // Compute positions at this milestone
          const milestonePositions = computeEnsemblePositions(
            card.movementPattern,
            spawnAt,
            card.elementCount,
            radius
          );

          const snapshot: Entity[] = milestonePositions.map((pos, idx) => ({
            id: idx,
            pos: { ...pos },
            anchorPos: { ...pos },
            seed: state.entities[idx]?.seed ?? Math.random(),
          }));

          const plane: DuplicatePlane = {
            id: state.planeIdCounter++,
            spawnTime: performance.now(),
            offsetY: 0,
            opacity: 1,
            tiltX: state.tiltX,
            tiltY: state.tiltY,
            tiltZ: state.tiltZ,
            scale: 1,
            snapshot,
            structureProgress: spawnAt,
          };

          state.planes.push(plane);
        }
      }
    }
  }

  // ── Duplicate layer movement ──
  const flowDir = p.planes.flowDirection === "down" ? 1 : -1;

  for (const plane of state.planes) {
    if (isHovered && !state.structureComplete) {
      // During sculpt: stream layers away
      plane.offsetY += p.planes.flowSpeed * effectiveDt * flowDir;
      // Clamp to max travel
      if (Math.abs(plane.offsetY) > maxTravel) {
        plane.offsetY = maxTravel * flowDir;
      }
    } else if (isHovered && state.structureComplete) {
      // Structure complete: freeze layers
      // (no movement)
    } else {
      // Dehover: rewind layers back
      const rewindSpeed = p.planes.flowSpeed * effectiveDt;
      if (plane.offsetY > 0) {
        plane.offsetY = Math.max(0, plane.offsetY - rewindSpeed);
      } else if (plane.offsetY < 0) {
        plane.offsetY = Math.min(0, plane.offsetY + rewindSpeed);
      }
    }

    // Sync tilt to live card (so duplicates untilt with the card on dehover)
    plane.tiltX = state.tiltX;
    plane.tiltY = state.tiltY;
    plane.tiltZ = state.tiltZ;
  }

  // ── Remove fully rewound planes ──
  if (!isHovered) {
    state.planes = state.planes.filter(
      (pl) => Math.abs(pl.offsetY) > 0.5 || state.structureProgress > 0.01
    );
  }

  // ── Formation rotation (only after sculpt completes) ──
  if (state.structureComplete && isHovered) {
    // Ease in spin blend
    state.formationSpinBlend = Math.min(
      1,
      state.formationSpinBlend + dt * 2.5
    );
    state.formationSpinTime += dt;
    state.formationSpinAngleRad =
      state.formationSpinTime * p.motion.formationSpin * DEG;
  } else {
    // Reset blend when not complete
    if (state.formationSpinBlend > 0) {
      state.formationSpinBlend = Math.max(
        0,
        state.formationSpinBlend - dt * 3
      );
    }
    if (state.formationSpinBlend < 0.01) {
      state.formationSpinAngleRad = 0;
      state.formationSpinTime = 0;
    }
  }
}

// ── Helpers ──

/**
 * Get the current formation rotation angle in radians.
 * Includes the easing blend.
 */
export function getFormationRotation(state: CardState): number {
  return state.formationSpinAngleRad * state.formationSpinBlend;
}

/**
 * Convert card pixel position to R3F world coordinates.
 * Applies formation rotation if provided.
 */
export function cardPosToWorld(
  pos: Vec3,
  rotationRad: number = 0
): [number, number, number] {
  let x = pos.x / UNIT;
  let y = -pos.y / UNIT; // Y is flipped in Three.js
  const z = pos.z / UNIT;

  // Apply formation rotation around center
  if (rotationRad !== 0) {
    const cos = Math.cos(rotationRad);
    const sin = Math.sin(rotationRad);
    const rx = x * cos - y * sin;
    const ry = x * sin + y * cos;
    x = rx;
    y = ry;
  }

  return [x, y, z];
}

/**
 * Get stack offset vector in R3F world based on stackAxis.
 */
export function getStackOffset(
  offsetY: number
): [number, number, number] {
  const axis = DEFAULT_PARAMS.planes.stackAxis;
  const val = offsetY / UNIT;
  switch (axis) {
    case "cardX":
      return [val, 0, 0];
    case "cardY":
      return [0, -val, 0]; // Y flipped
    case "cardZ":
      return [0, 0, val]; // positive Z = toward camera (protrude outward)
  }
}
