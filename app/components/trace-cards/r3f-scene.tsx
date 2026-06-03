"use client";

import { useRef, useEffect, useCallback, useState, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { CARDS, DEFAULT_PARAMS, CARD_ASPECT, UNIT } from "./config";
import { TraceCardShell } from "./trace-card-shell";
import { TraceSceneLighting } from "./trace-scene-lighting";
import { useTraceSimulation, type SimHandle } from "./use-trace-simulation";
import { R3fFormation } from "./r3f-card";
import { MetallicCaduceus } from "./metallic-caduceus";
import type { CardDefinition } from "./config";

// ── Card size ──
const CARD_PX = 380;

// ── DOM Card Wrapper ──

function DomCard({
  card,
  simHandle,
}: {
  card: CardDefinition;
  simHandle: SimHandle;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shellWrapRef = useRef<HTMLDivElement>(null);
  const { stateRef, setHover, setPointer } = simHandle;
  const rafRef = useRef(0);

  const w = CARD_PX;
  const h = CARD_PX * CARD_ASPECT;

  const handlePointerEnter = useCallback(() => setHover(true), [setHover]);
  const handlePointerLeave = useCallback(() => setHover(false), [setHover]);
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setPointer(
        Math.max(-1, Math.min(1, nx)),
        Math.max(-1, Math.min(1, ny))
      );
    },
    [setPointer]
  );

  // Animate shell opacity + CSS tilt (synced with R3F formation tilt)
  useEffect(() => {
    const animate = () => {
      const state = stateRef.current;
      if (shellWrapRef.current) {
        shellWrapRef.current.style.opacity = String(state.shellOpacity);
        shellWrapRef.current.style.transform =
          `perspective(1200px) rotateX(${-state.tiltX}deg) rotateY(${state.tiltY}deg)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [stateRef]);

  return (
    <div
      ref={cardRef}
      style={{
        width: w,
        height: h,
        cursor: "pointer",
      }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <div ref={shellWrapRef} style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", willChange: "transform, opacity" }}>
        <TraceCardShell card={card} stateRef={stateRef} cardSize={w} />
      </div>
    </div>
  );
}

// ── R3F Scene ──

function SceneCamera() {
  const { camera } = useThree();
  const p = DEFAULT_PARAMS.camera;

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = p.fov;
      camera.position.set(0, 0, p.distance);
      camera.near = 0.1;
      camera.far = 100;
      camera.updateProjectionMatrix();
    }
  }, [camera, p.fov, p.distance]);

  return null;
}

function FormationScene({
  sims,
  cardRects,
  caduceusHovered,
}: {
  sims: SimHandle[];
  cardRects: DOMRect[];
  caduceusHovered: boolean;
}) {
  const { camera, size } = useThree();

  return (
    <>
      <SceneCamera />
      <TraceSceneLighting />

      <Suspense fallback={null}>
        <MetallicCaduceus hovered={caduceusHovered} />
        <Environment preset="studio" />
      </Suspense>

      {CARDS.map((card, idx) => {
        const sim = sims[idx];
        const rect = cardRects[idx];
        if (!sim || !rect) return null;

        const cx = ((rect.left + rect.width / 2) / size.width) * 2 - 1;
        const cy = -((rect.top + rect.height / 2) / size.height) * 2 + 1;

        const vec = new THREE.Vector3(cx, cy, 0.5);
        vec.unproject(camera as THREE.PerspectiveCamera);
        const dir = vec.sub(camera.position).normalize();
        const dist = -camera.position.z / dir.z;
        const worldPos = camera.position.clone().add(dir.multiplyScalar(dist));

        const cam = camera as THREE.PerspectiveCamera;
        const vFov = (cam.fov * Math.PI) / 180;
        const worldHeight = 2 * Math.tan(vFov / 2) * cam.position.z;
        const worldPerPx = worldHeight / size.height;
        const cardWorldW = rect.width * worldPerPx;
        const cardWorldH = rect.height * worldPerPx;

        return (
          <R3fFormation
            key={idx}
            card={card}
            simHandle={sim}
            worldX={worldPos.x}
            worldY={worldPos.y}
            worldScale={cardWorldW / (DEFAULT_PARAMS.layout.cardSize / UNIT)}
            cardWorldW={cardWorldW}
            cardWorldH={cardWorldH}
          />
        );
      })}
    </>
  );
}

// ── Main Scene Export ──

export function TraceCardsScene() {
  const p = DEFAULT_PARAMS;
  const shadowsOn = p.lighting.enabled && p.lighting.shadowsEnabled;

  const sim0 = useTraceSimulation(CARDS[0]);
  const sim1 = useTraceSimulation(CARDS[1]);
  const sims = [sim0, sim1];

  const [caduceusHovered, setCaduceusHovered] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [cardRects, setCardRects] = useState<DOMRect[]>([]);

  // Load fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Measure card DOM positions
  useEffect(() => {
    const measure = () => {
      if (!cardContainerRef.current) return;
      const cards =
        cardContainerRef.current.querySelectorAll("[data-trace-card]");
      const rects: DOMRect[] = [];
      cards.forEach((el) => rects.push(el.getBoundingClientRect()));
      setCardRects(rects);
    };

    measure();
    window.addEventListener("resize", measure);
    const interval = setInterval(measure, 500);
    return () => {
      window.removeEventListener("resize", measure);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Brand text — top left */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          padding: "clamp(18px, 2.5vh, 32px) clamp(24px, 3vw, 48px)",
        }}
      >
        <span
          style={{
            color: "rgba(255, 248, 240, 0.9)",
            font: '400 clamp(16px, 1.6vw, 22px)/1 Georgia, "Times New Roman", serif',
            whiteSpace: "nowrap",
          }}
        >
          Antid<span style={{ fontStyle: "italic" }}>o</span>te.
        </span>
      </div>

      {/* Caduceus hover zone — center of viewport */}
      <div
        onPointerEnter={() => setCaduceusHovered(true)}
        onPointerLeave={() => setCaduceusHovered(false)}
        style={{
          position: "absolute",
          top: 0,
          left: "25%",
          width: "50%",
          height: "70%",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      {/* DOM cards — bottom, one on each side */}
      <div
        ref={cardContainerRef}
        style={{
          position: "absolute",
          bottom: 40,
          left: 60,
          right: 60,
          zIndex: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {CARDS.map((card, idx) => (
          <div key={idx} data-trace-card>
            <DomCard card={card} simHandle={sims[idx]} />
          </div>
        ))}
      </div>

      {/* R3F canvas — fills entire viewport */}
      <Canvas
        shadows={shadowsOn}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          if (shadowsOn) {
            gl.shadowMap.type = THREE.VSMShadowMap;
            gl.shadowMap.autoUpdate = true;
          }
        }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <FormationScene
          sims={sims}
          cardRects={cardRects}
          caduceusHovered={caduceusHovered}
        />
      </Canvas>
    </div>
  );
}
