"use client";

import { useRef } from "react";
import * as THREE from "three";
import { DEFAULT_PARAMS } from "./config";

export function TraceSceneLighting() {
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const p = DEFAULT_PARAMS.lighting;

  if (!p.enabled) return null;

  return (
    <>
      <ambientLight color={p.ambientColor} intensity={p.ambientIntensity} />

      {/* Key directional — casts shadows */}
      <directionalLight
        ref={keyRef}
        color={p.keyColor}
        intensity={p.keyIntensity}
        position={p.keyPosition}
        castShadow={p.shadowsEnabled}
        shadow-mapSize-width={p.shadowMapSize}
        shadow-mapSize-height={p.shadowMapSize}
        shadow-bias={p.shadowBias}
        shadow-normalBias={p.shadowNormalBias}
        shadow-radius={18}
        shadow-blurSamples={32}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
      />

      {/* Fill directional — no shadows */}
      <directionalLight
        color={p.fillColor}
        intensity={p.fillIntensity}
        position={p.fillPosition}
      />
    </>
  );
}
