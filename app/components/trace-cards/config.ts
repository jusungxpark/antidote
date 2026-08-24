// ── Trace Cards Configuration ──
// All types, card definitions, and default parameters

export const UNIT = 100; // 1 scene unit = 100 card pixels

// ── Types ──

export interface Vec2 {
  x: number;
  y: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Entity {
  id: number;
  pos: Vec3; // offset from formation center in card pixels
  anchorPos: Vec3; // structural target position
  seed: number;
}

export interface DuplicatePlane {
  id: number;
  spawnTime: number;
  offsetY: number; // distance from live card along stack axis
  opacity: number;
  tiltX: number;
  tiltY: number;
  tiltZ: number;
  scale: number;
  snapshot: Entity[]; // frozen entity positions at spawn
  structureProgress: number; // what progress was when this spawned
}

export interface CardState {
  hover: number; // 0..1 lerped
  pointerX: number; // -1..1 normalized
  pointerY: number; // -1..1 normalized
  tiltX: number;
  tiltY: number;
  tiltZ: number;
  targetTiltX: number;
  targetTiltY: number;
  targetTiltZ: number;
  entities: Entity[];
  planes: DuplicatePlane[];
  structureProgress: number; // 0..1 finite sculpt progress
  structureComplete: boolean;
  formationSpinAngleRad: number;
  formationSpinBlend: number; // 0..1 eases in after sculpt complete
  formationSpinTime: number;
  shellOpacity: number; // card chrome fade on hover
  isFullyTilted: boolean;
  planeIdCounter: number;
}

export type MovementPattern = "pyramidTrace" | "diamondTrace";

export interface CardDefinition {
  title: string;
  description: string;
  labels: string[]; // top-section text labels (replaces numeric coordinates)
  movementPattern: MovementPattern;
  elementCount: number;
  structureLayers: number; // how many duplicate layers for this shape
  shapeColor: string;
  sculptColor: string;
  href: string;
}

// ── Card Definitions ──

export const CARDS: CardDefinition[] = [
  {
    title: "Forward Deployed",
    description: "PROJECT BASED",
    labels: ["Diligence", "Strategy", "Implementation"],
    movementPattern: "pyramidTrace",
    elementCount: 4,
    structureLayers: 1,
    shapeColor: "#ffffff",
    sculptColor: "#ffffff",
    href: "/forward-deployed",
  },
  {
    title: "Buyouts",
    description: "STRATEGIC ACQUISITION",
    labels: ["Sector", "Valuation", "Integration"],
    movementPattern: "diamondTrace",
    elementCount: 4,
    structureLayers: 2,
    shapeColor: "#ffffff",
    sculptColor: "#ffffff",
    href: "/buyouts",
  },
];

// ── Default Parameters (final tuned values from the conversation) ──

export const DEFAULT_PARAMS = {
  camera: {
    fov: 49,
    distance: 9.4,
  },
  layout: {
    cardSize: 480,
    gap: 16,
  },
  motion: {
    elementCount: 6,
    structureDuration: 1.2, // seconds for shape sculpt at overallSpeed=1
    overallSpeed: 2.7,
    formationSpin: 60, // deg/s after sculpt completes
  },
  tilt: {
    tiltLerp: 0.22,
    pointerTilt: 30, // max degrees from pointer
    hitPadRatio: 0.88, // extra hit area padding ratio
  },
  planes: {
    stackAxis: "cardZ" as "cardX" | "cardY" | "cardZ",
    flowDirection: "down" as "up" | "down",
    flowSpeed: 122, // px/s for layer streaming
    layerTravel: 1.82, // max distance as cardSize multiplier
  },
  faces: {
    shapeOpacity: 0.06,
    sculptOpacity: 0.04,
  },
  lighting: {
    enabled: true,
    shadowsEnabled: true,
    ambientIntensity: 0.31,
    keyIntensity: 3,
    keyPosition: [2.5, 7.5, 6] as [number, number, number],
    fillIntensity: 2.4,
    fillPosition: [-3.5, 3.4, 3.6] as [number, number, number],
    shadowMapSize: 2048,
    shadowBias: -0.002,
    shadowNormalBias: 0.02,
    cardSurfaceColor: "#101010",
    cardRoughness: 0.66,
    cardClearcoat: 1,
    cardClearcoatRoughness: 0.45,
    ambientColor: "#ffffff",
    keyColor: "#ffffff",
    fillColor: "#ffffff",
  },
  visual: {
    hoverLerp: 0.12,
    lineOpacity: 0.92,
    hoverShellOpacity: 1,
  },
} as const;

// Card aspect ratio from Figma (564x501)
export const CARD_ASPECT = 501 / 564;

// Formation center in normalized card coords
export const FORMATION_X = 0.5;
export const FORMATION_Y = 0.5;

// Card UI layout (normalized)
export const CARD_UI = {
  cornerRadius: 2, // px — sharp wireframe aesthetic
  coordsLabelOpacity: 1.0,
  coordsValueOpacity: 0.6,
  descriptionOpacity: 0.6,
  liveBadgeIdleOpacity: 0.45,
  liveBadgeHoverOpacity: 1.0,
} as const;
