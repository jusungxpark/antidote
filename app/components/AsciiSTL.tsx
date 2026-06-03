"use client";

import { useCallback, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";

const CHARSET = " .:-=+*#%@";

const ROT_X = -172;
const ROT_Y = -30;
const ROT_Z = -174;
const SCALE = 0.6;
const LIGHT_X = -0.6;
const LIGHT_Y = -0.6;
const LIGHT_Z = 0.5;
const LIGHT_INTENSITY = 2.5;
const ANIMATE_Y = true;

export function AsciiSTL({ src = "/caduceo.stl" }: { src?: string }) {
  const cleanupRef = useRef<(() => void) | null>(null);

  const containerRef = useCallback(
    (container: HTMLDivElement | null) => {
      cleanupRef.current?.();
      cleanupRef.current = null;
      if (!container) return;

      let destroyed = false;
      cleanupRef.current = () => {
        destroyed = true;
      };

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        2000,
      );

      const renderer = new THREE.WebGLRenderer({ antialias: false });
      renderer.setSize(container.clientWidth, container.clientHeight);

      const effect = new AsciiEffect(renderer, CHARSET, {
        invert: true,
        resolution: 0.15,
      });
      effect.setSize(container.clientWidth, container.clientHeight);
      effect.domElement.style.color = "#fff";
      effect.domElement.style.backgroundColor = "#000";
      effect.domElement.style.overflow = "hidden";
      effect.domElement.style.whiteSpace = "pre";
      container.appendChild(effect.domElement);

      const ambient = new THREE.AmbientLight(0xffffff, 0.1);
      scene.add(ambient);

      const dirLight = new THREE.DirectionalLight(0xffffff, LIGHT_INTENSITY);
      dirLight.position.set(LIGHT_X, LIGHT_Y, LIGHT_Z);
      scene.add(dirLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
      fillLight.position.set(-1, -0.5, -1);
      scene.add(fillLight);

      const loader = new STLLoader();
      let mesh: THREE.Mesh | null = null;

      loader.load(src, (geometry) => {
        if (destroyed) return;
        geometry.computeBoundingBox();
        geometry.center();

        const material = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          flatShading: true,
          side: THREE.DoubleSide,
          shininess: 60,
        });
        mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.x = (ROT_X * Math.PI) / 180;
        mesh.rotation.z = (ROT_Z * Math.PI) / 180;
        mesh.scale.setScalar(SCALE);

        const box = new THREE.Box3().setFromObject(mesh);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const dist = maxDim / (2 * Math.tan((camera.fov * Math.PI) / 360));
        camera.position.set(0, 0, dist * 1.4);
        camera.lookAt(0, 0, 0);

        scene.add(mesh);
      });

      const ROTATION_SPEED = 0.004;
      let frameId = 0;

      function animate() {
        if (destroyed) return;
        frameId = requestAnimationFrame(animate);

        if (mesh) {
          mesh.rotation.x = (ROT_X * Math.PI) / 180;
          mesh.rotation.z = (ROT_Z * Math.PI) / 180;
          mesh.scale.setScalar(SCALE);
          if (ANIMATE_Y) {
            mesh.rotation.y += ROTATION_SPEED;
          } else {
            mesh.rotation.y = (ROT_Y * Math.PI) / 180;
          }
        }

        effect.render(scene, camera);
      }
      animate();

      function onResize() {
        if (destroyed || !container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        effect.setSize(w, h);
      }
      const ro = new ResizeObserver(onResize);
      ro.observe(container);

      cleanupRef.current = () => {
        destroyed = true;
        cancelAnimationFrame(frameId);
        ro.disconnect();
        renderer.dispose();
        if (effect.domElement.parentNode) {
          effect.domElement.parentNode.removeChild(effect.domElement);
        }
      };
    },
    [src],
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
      />
    </div>
  );
}
