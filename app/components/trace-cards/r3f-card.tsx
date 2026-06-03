"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CardDefinition, CardState, DuplicatePlane, Entity } from "./config";
import { DEFAULT_PARAMS, UNIT, CARD_ASPECT } from "./config";
import { cardPosToWorld, getFormationRotation, getStackOffset } from "./simulation";

// ── Buffer helpers — reuse typed arrays to avoid GC stutter ──

function updatePositionAttr(
  geo: THREE.BufferGeometry,
  data: number[],
  computeNormals = false
) {
  const arr = new Float32Array(data);
  const existing = geo.getAttribute("position") as THREE.BufferAttribute | undefined;
  if (existing && existing.count === arr.length / 3) {
    existing.set(arr);
    existing.needsUpdate = true;
  } else {
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  }
  if (computeNormals) geo.computeVertexNormals();
  geo.computeBoundingSphere();
}

// ── Formation Dots + Lines ──

interface FormationLayerProps {
  entities: Entity[];
  rotationRad: number;
  opacity: number;
  color?: string;
  showLines?: boolean;
}

function FormationLayer({
  entities,
  rotationRad,
  opacity,
  color = "#ffffff",
  showLines = true,
}: FormationLayerProps) {
  const dotsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineLoop>(null);
  const dotsGeo = useMemo(() => new THREE.BufferGeometry(), []);
  const linesGeo = useMemo(() => new THREE.BufferGeometry(), []);
  const buf = useRef<Float32Array | null>(null);

  useFrame(() => {
    if (!dotsRef.current || entities.length === 0) return;

    const len = entities.length * 3;
    if (!buf.current || buf.current.length !== len) {
      buf.current = new Float32Array(len);
    }
    const positions = buf.current;
    for (let i = 0; i < entities.length; i++) {
      const [x, y, z] = cardPosToWorld(entities[i].pos, rotationRad);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    const dotsAttr = dotsGeo.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (dotsAttr && dotsAttr.count === entities.length) {
      dotsAttr.set(positions);
      dotsAttr.needsUpdate = true;
    } else {
      dotsGeo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    }
    dotsGeo.computeBoundingSphere();

    if (linesRef.current && showLines) {
      const linesAttr = linesGeo.getAttribute("position") as THREE.BufferAttribute | undefined;
      if (linesAttr && linesAttr.count === entities.length) {
        linesAttr.set(positions);
        linesAttr.needsUpdate = true;
      } else {
        linesGeo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
      }
      linesGeo.computeBoundingSphere();
    }
  });

  return (
    <>
      <points ref={dotsRef} geometry={dotsGeo} renderOrder={10}>
        <pointsMaterial
          color={color}
          size={4}
          sizeAttenuation={false}
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </points>
      {showLines && (
        <lineLoop ref={linesRef} geometry={linesGeo} renderOrder={9}>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={opacity * 0.85}
            depthWrite={false}
          />
        </lineLoop>
      )}
    </>
  );
}

// ── Shape Fill (polygon fill on dots) ──

function ShapeFill({
  entities,
  rotationRad,
  color,
  opacity,
}: {
  entities: Entity[];
  rotationRad: number;
  color: string;
  opacity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    if (!meshRef.current || entities.length < 3) return;

    const verts: number[] = [];
    for (let i = 0; i < entities.length; i++) {
      const [x1, y1, z1] = cardPosToWorld(entities[i].pos, rotationRad);
      const next = (i + 1) % entities.length;
      const [x2, y2, z2] = cardPosToWorld(entities[next].pos, rotationRad);
      verts.push(0, 0, 0);
      verts.push(x1, y1, z1);
      verts.push(x2, y2, z2);
    }

    updatePositionAttr(geo, verts, true);
  });

  return (
    <mesh ref={meshRef} geometry={geo} renderOrder={5} castShadow>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        side={THREE.DoubleSide}
        roughness={0.8}
        metalness={0}
      />
    </mesh>
  );
}

// ── Sculpt Faces (sides connecting layers) ──

function SculptFaces({
  liveEntities,
  planes,
  rotationRad,
  color,
  opacity,
  pattern,
}: {
  liveEntities: Entity[];
  planes: DuplicatePlane[];
  rotationRad: number;
  color: string;
  opacity: number;
  pattern: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    if (!meshRef.current || planes.length === 0 || liveEntities.length < 2)
      return;

    const verts: number[] = [];

    if (pattern === "pyramidTrace") {
      const dup = planes[0];
      if (!dup) return;

      const stackOff = getStackOffset(dup.offsetY);
      for (let i = 0; i < liveEntities.length; i++) {
        const [lx, ly, lz] = cardPosToWorld(liveEntities[i].pos, rotationRad);
        const next = (i + 1) % liveEntities.length;
        const [lxn, lyn, lzn] = cardPosToWorld(liveEntities[next].pos, rotationRad);

        const tipSnap = dup.snapshot[0];
        if (!tipSnap) continue;
        const [tx, ty, tz] = cardPosToWorld(tipSnap.pos, rotationRad);
        const tipX = tx + stackOff[0];
        const tipY = ty + stackOff[1];
        const tipZ = tz + stackOff[2];

        verts.push(lx, ly, lz);
        verts.push(lxn, lyn, lzn);
        verts.push(tipX, tipY, tipZ);
      }
    } else if (pattern === "diamondTrace") {
      const sortedPlanes = [...planes].sort(
        (a, b) => Math.abs(a.offsetY) - Math.abs(b.offsetY)
      );

      interface LayerData {
        entities: Entity[];
        stackOff: [number, number, number];
      }
      const layers: LayerData[] = [
        { entities: liveEntities, stackOff: [0, 0, 0] },
      ];
      for (const pl of sortedPlanes) {
        layers.push({
          entities: pl.snapshot,
          stackOff: getStackOffset(pl.offsetY),
        });
      }

      for (let li = 0; li < layers.length - 1; li++) {
        const layerA = layers[li];
        const layerB = layers[li + 1];
        const count = Math.min(layerA.entities.length, layerB.entities.length);

        for (let i = 0; i < count; i++) {
          const next = (i + 1) % count;

          const [ax, ay, az] = cardPosToWorld(layerA.entities[i].pos, rotationRad);
          const [axn, ayn, azn] = cardPosToWorld(layerA.entities[next].pos, rotationRad);
          const [bx, by, bz] = cardPosToWorld(layerB.entities[i].pos, rotationRad);
          const [bxn, byn, bzn] = cardPosToWorld(layerB.entities[next].pos, rotationRad);

          const a = layerA.stackOff;
          const b = layerB.stackOff;

          verts.push(ax + a[0], ay + a[1], az + a[2]);
          verts.push(axn + a[0], ayn + a[1], azn + a[2]);
          verts.push(bx + b[0], by + b[1], bz + b[2]);

          verts.push(axn + a[0], ayn + a[1], azn + a[2]);
          verts.push(bxn + b[0], byn + b[1], bzn + b[2]);
          verts.push(bx + b[0], by + b[1], bz + b[2]);
        }
      }
    }

    if (verts.length === 0) return;
    updatePositionAttr(geo, verts, true);
  });

  return (
    <mesh ref={meshRef} geometry={geo} renderOrder={4} castShadow>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        side={THREE.DoubleSide}
        roughness={0.8}
        metalness={0}
      />
    </mesh>
  );
}

// ── Sculpt Wire Lines (structural edges connecting tiers) ──

function SculptWireLines({
  liveEntities,
  planes,
  rotationRad,
  opacity,
}: {
  liveEntities: Entity[];
  planes: DuplicatePlane[];
  rotationRad: number;
  opacity: number;
}) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const geo = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    if (!linesRef.current || planes.length === 0) return;

    const positions: number[] = [];

    interface LayerData {
      entities: Entity[];
      stackOff: [number, number, number];
    }
    const layers: LayerData[] = [
      { entities: liveEntities, stackOff: [0, 0, 0] },
    ];
    const sortedPlanes = [...planes].sort(
      (a, b) => Math.abs(a.offsetY) - Math.abs(b.offsetY)
    );
    for (const pl of sortedPlanes) {
      layers.push({
        entities: pl.snapshot,
        stackOff: getStackOffset(pl.offsetY),
      });
    }

    for (let li = 0; li < layers.length - 1; li++) {
      const layerA = layers[li];
      const layerB = layers[li + 1];
      const count = Math.min(layerA.entities.length, layerB.entities.length);

      for (let i = 0; i < count; i++) {
        const [ax, ay, az] = cardPosToWorld(layerA.entities[i].pos, rotationRad);
        const [bx, by, bz] = cardPosToWorld(layerB.entities[i].pos, rotationRad);
        const a = layerA.stackOff;
        const b = layerB.stackOff;

        positions.push(ax + a[0], ay + a[1], az + a[2]);
        positions.push(bx + b[0], by + b[1], bz + b[2]);
      }
    }

    if (positions.length === 0) return;
    updatePositionAttr(geo, positions);
  });

  return (
    <lineSegments ref={linesRef} geometry={geo} renderOrder={8}>
      <lineBasicMaterial
        color="#ffffff"
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// ── Duplicate Layer ──

function DuplicateLayer({
  plane,
  rotationRad,
}: {
  plane: DuplicatePlane;
  rotationRad: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const stackOff = getStackOffset(plane.offsetY);
    groupRef.current.position.set(stackOff[0], stackOff[1], stackOff[2]);
  });

  return (
    <group ref={groupRef}>
      <FormationLayer
        entities={plane.snapshot}
        rotationRad={rotationRad}
        opacity={plane.opacity * DEFAULT_PARAMS.visual.lineOpacity}
        showLines={true}
      />
      <ShapeFill
        entities={plane.snapshot}
        rotationRad={rotationRad}
        color="#ffffff"
        opacity={plane.opacity * DEFAULT_PARAMS.faces.shapeOpacity * 0.5}
      />
    </group>
  );
}

// ── Formation Content (dots, lines, fills, sculpt) ──

function TraceCardFormation({
  card,
  stateRef,
}: {
  card: CardDefinition;
  stateRef: React.RefObject<CardState>;
}) {
  const formationRef = useRef<THREE.Group>(null);
  const [, setPlaneCount] = useState(0);
  const lastPlaneCountRef = useRef(0);

  useFrame(() => {
    const state = stateRef.current;
    if (formationRef.current) {
      formationRef.current.rotation.z = getFormationRotation(state);
    }
    if (state.planes.length !== lastPlaneCountRef.current) {
      lastPlaneCountRef.current = state.planes.length;
      setPlaneCount(state.planes.length);
    }
  });

  const state = stateRef.current;
  const lineOpacity = DEFAULT_PARAMS.visual.lineOpacity;

  return (
    <group ref={formationRef}>
      <FormationLayer
        entities={state.entities}
        rotationRad={0}
        opacity={lineOpacity}
      />

      <ShapeFill
        entities={state.entities}
        rotationRad={0}
        color={card.shapeColor}
        opacity={DEFAULT_PARAMS.faces.shapeOpacity}
      />

      {state.planes.map((plane) => (
        <DuplicateLayer
          key={plane.id}
          plane={plane}
          rotationRad={0}
        />
      ))}

      {state.planes.length > 0 && (
        <SculptFaces
          liveEntities={state.entities}
          planes={state.planes}
          rotationRad={0}
          color={card.sculptColor}
          opacity={DEFAULT_PARAMS.faces.sculptOpacity}
          pattern={card.movementPattern}
        />
      )}

      {state.planes.length > 0 && (
        <SculptWireLines
          liveEntities={state.entities}
          planes={state.planes}
          rotationRad={0}
          opacity={lineOpacity * 0.6}
        />
      )}
    </group>
  );
}

// ── Shadow Receiver (transparent except where shadows land) ──

function CardShadowReceiver() {
  const w = DEFAULT_PARAMS.layout.cardSize / UNIT;
  const h = (DEFAULT_PARAMS.layout.cardSize * CARD_ASPECT) / UNIT;
  return (
    <mesh receiveShadow renderOrder={0} position={[0, 0, -0.02]}>
      <planeGeometry args={[w, h]} />
      <shadowMaterial transparent opacity={0.55} />
    </mesh>
  );
}

// ── Per-Card Canvas Scene ──

function PerCardScene({
  card,
  stateRef,
}: {
  card: CardDefinition;
  stateRef: React.RefObject<CardState>;
}) {
  const p = DEFAULT_PARAMS.lighting;
  return (
    <>
      <ambientLight color={p.ambientColor} intensity={p.ambientIntensity} />
      <directionalLight
        color={p.keyColor}
        intensity={p.keyIntensity}
        position={[3, 8, 15]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.003}
        shadow-normalBias={0.03}
        shadow-radius={18}
        shadow-blurSamples={24}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-near={1}
        shadow-camera-far={30}
      />
      <directionalLight
        color={p.fillColor}
        intensity={p.fillIntensity * 0.5}
        position={[-3, 3, 4]}
      />
      <CardShadowReceiver />
      <TraceCardFormation card={card} stateRef={stateRef} />
    </>
  );
}

// ── Per-Card Canvas (renders formation attached to card via CSS 3D transform) ──
// The Canvas lives inside the card's CSS-transformed wrapper, so CSS perspective
// and rotateX/Y automatically apply to it. No R3F rotation needed — shapes
// naturally tilt with the card and protrude toward the viewer in +Z.

export function PerCardCanvas({
  card,
  stateRef,
}: {
  card: CardDefinition;
  stateRef: React.RefObject<CardState>;
}) {
  return (
    <Canvas
      shadows
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
      camera={{ position: [0, 0, 12], fov: 20, near: 0.1, far: 30 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.shadowMap.type = THREE.VSMShadowMap;
        gl.shadowMap.autoUpdate = true;
      }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <PerCardScene card={card} stateRef={stateRef} />
    </Canvas>
  );
}
