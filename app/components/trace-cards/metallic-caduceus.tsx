"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

const DEG = Math.PI / 180;

// Orientation matching /1 page
const INIT_ROT_X = -172 * DEG;
const INIT_ROT_Z = -174 * DEG;
const ROTATION_SPEED = 0.004;

interface MetallicCaduceusProps {
  hovered: boolean;
}

export function MetallicCaduceus({ hovered }: MetallicCaduceusProps) {
  const rawGeo = useLoader(STLLoader, "/caduceo.stl");

  const geo = useMemo(() => {
    const g = rawGeo.clone();
    g.center();
    g.computeVertexNormals();
    g.computeBoundingSphere();
    const r = g.boundingSphere?.radius || 1;
    g.scale(1 / r, 1 / r, 1 / r);
    return g;
  }, [rawGeo]);

  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const intensity = useRef(0);
  const sheenColorObj = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth continuous Y rotation
    groupRef.current.rotation.y += ROTATION_SPEED;

    // Smooth lerp toward hover target
    const target = hovered ? 1 : 0;
    intensity.current += (target - intensity.current) * 0.06;
    if (Math.abs(intensity.current - target) < 0.001)
      intensity.current = target;

    const t = intensity.current;
    const mat = matRef.current;
    if (!mat) return;

    // Iridescence — rainbow shifts with viewing angle as model rotates
    mat.iridescence = t;

    // Enhanced reflections on hover
    mat.envMapIntensity = 1.8 + t * 0.7;
    mat.roughness = 0.06 - t * 0.03;

    // Flowing sheen — smooth hue cycle over time
    const time = state.clock.elapsedTime;
    const hue = (time * 0.08) % 1;
    sheenColorObj.setHSL(hue, 0.5, 0.5);
    mat.sheenColor.copy(sheenColorObj);
    mat.sheen = t * 0.4;
  });

  return (
    <group
      position={[0, 0.5, 0]}
      rotation={[INIT_ROT_X, 0, INIT_ROT_Z]}
      scale={3}
    >
      <group ref={groupRef}>
        <mesh geometry={geo} castShadow>
          <meshPhysicalMaterial
            ref={matRef}
            color="#c8c8c8"
            metalness={1}
            roughness={0.06}
            clearcoat={1}
            clearcoatRoughness={0.08}
            reflectivity={1}
            envMapIntensity={1.8}
            iridescence={0}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[100, 400]}
            sheen={0}
            sheenRoughness={0.25}
            sheenColor="#000000"
          />
        </mesh>
      </group>
    </group>
  );
}
