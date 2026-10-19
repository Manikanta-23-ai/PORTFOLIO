import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { SceneFallback } from './SceneFallback';

export type NeuralMode = 'lattice' | 'transformer' | 'rag';

export interface AnimatedNeuralSculptureProps {
  activeMode?: NeuralMode;
  explodedFactor?: number;
}

interface FrameState {
  elapsed: number;
  delta: number;
  pointer: { x: number; y: number };
}

/**
 * Custom useFrame-style loop runner that executes a continuous Three.js animation
 * callback without triggering React state re-renders on every frame.
 */
function startAnimationLoop(
  isHeadless: boolean,
  callback: (state: FrameState) => void,
  getPointer: () => { x: number; y: number }
): () => void {
  const startTimeMs = performance.now();
  let prevTimeMs = startTimeMs;
  let lastHeadlessFrameTime = 0;
  let animFrameId = 0;
  let cancelled = false;

  const tick = (nowMs: number) => {
    if (cancelled) return;
    animFrameId = requestAnimationFrame(tick);

    // In headless software WebGL, run at ~20fps so screenshots never time out while motion remains smooth
    if (isHeadless && nowMs - lastHeadlessFrameTime < 50) {
      return;
    }
    lastHeadlessFrameTime = nowMs;

    const delta = Math.min(Math.max((nowMs - prevTimeMs) / 1000, 0.001), 0.1);
    prevTimeMs = nowMs;
    const elapsed = (nowMs - startTimeMs) / 1000;

    callback({
      elapsed,
      delta,
      pointer: getPointer(),
    });
  };

  animFrameId = requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    cancelAnimationFrame(animFrameId);
  };
}

export const AnimatedNeuralSculpture: React.FC<AnimatedNeuralSculptureProps> = ({
  activeMode = 'lattice',
  explodedFactor = 0,
}) => {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);

  const modeRef = useRef<NeuralMode>(activeMode);
  const explodedRef = useRef<number>(explodedFactor);

  useEffect(() => {
    modeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    explodedRef.current = explodedFactor;
  }, [explodedFactor]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const isHeadless =
      navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);

    let renderer: THREE.WebGLRenderer | null = null;
    let envTexture: THREE.Texture | null = null;
    let shadowTex: THREE.CanvasTexture | null = null;
    let stopLoop: (() => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const disposables: Array<{ dispose: () => void }> = [];
    const track = <T extends { dispose: () => void }>(resource: T): T => {
      disposables.push(resource);
      return resource;
    };

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isHeadless,
        alpha: true,
        powerPreference: 'high-performance',
      });

      const gl = renderer.getContext();
      if (!gl) {
        renderer.dispose();
        setWebglSupported(false);
        setIsInitializing(false);
        return;
      }

      const width = Math.max(container.clientWidth || 560, 280);
      const height = Math.max(container.clientHeight || 460, 280);

      renderer.setSize(width, height);
      renderer.setPixelRatio(
        isHeadless ? 1 : Math.min(window.devicePixelRatio || 1, 2)
      );
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.28;

      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      const handleContextLost = (event: Event) => {
        event.preventDefault();
        stopLoop?.();
      };
      renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

      const scene = new THREE.Scene();

      // Studio PBR reflection environment
      try {
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const roomEnv = new RoomEnvironment();
        envTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;
        scene.environment = envTexture;
        roomEnv.dispose();
        pmremGenerator.dispose();
      } catch {
        // Fallback if PMREM fails on restricted WebGL drivers
      }

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 0.08, 7.65);

      // Multi-Point Studio & Dynamic Orbiting Rim Lights
      const hemiLight = new THREE.HemisphereLight(0xe2ecf5, 0x12031c, 1.0);
      scene.add(hemiLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
      keyLight.position.set(5.5, 6.5, 6.0);
      scene.add(keyLight);

      const rimBackLight = new THREE.DirectionalLight(0x93c5fd, 1.8);
      rimBackLight.position.set(-5.0, -3.0, -4.5);
      scene.add(rimBackLight);

      const orbitingVioletLight = new THREE.PointLight(0xb600a8, 7.5, 16, 1.6);
      orbitingVioletLight.position.set(-3.8, 2.2, 2.8);
      scene.add(orbitingVioletLight);

      const orbitingIceBlueLight = new THREE.PointLight(0x38bdf8, 6.5, 16, 1.6);
      orbitingIceBlueLight.position.set(3.8, -2.0, 3.0);
      scene.add(orbitingIceBlueLight);

      // Calibrated PBR Materials
      const mirrorChromeMat = track(
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0xeef4f8),
          metalness: 0.96,
          roughness: 0.08,
          clearcoat: 1.0,
          clearcoatRoughness: 0.06,
          reflectivity: 1.0,
        })
      );

      const brushedTitaniumMat = track(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x7c8798),
          metalness: 0.88,
          roughness: 0.34,
        })
      );

      const facetedCoreMat = track(
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0x231934),
          metalness: 0.82,
          roughness: 0.16,
          clearcoat: 1.0,
          clearcoatRoughness: 0.08,
          emissive: new THREE.Color(0x3b0764),
          emissiveIntensity: 0.7,
          flatShading: true,
        })
      );

      const violetLuminanceMat = track(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xf0abfc),
          metalness: 0.45,
          roughness: 0.18,
          emissive: new THREE.Color(0xb600a8),
          emissiveIntensity: 1.15,
        })
      );

      const iceBlueLuminanceMat = track(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xbae6fd),
          metalness: 0.5,
          roughness: 0.18,
          emissive: new THREE.Color(0x0284c7),
          emissiveIntensity: 1.05,
        })
      );

      // Root Sculpture Group (floats & responds to pointer parallax)
      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      // Continuous Turntable Group (rotates around Y axis unconditionally)
      const turntableGroup = new THREE.Group();
      rootGroup.add(turntableGroup);

      // 1. Central Faceted Crystalline Core (Octahedron + Inner Dodecahedron so rotation facets catch light)
      const coreGroup = new THREE.Group();
      turntableGroup.add(coreGroup);

      const innerCrystalGeo = track(new THREE.OctahedronGeometry(0.82, 0));
      const innerCrystalMesh = new THREE.Mesh(innerCrystalGeo, facetedCoreMat);
      coreGroup.add(innerCrystalMesh);

      const innerBevelGeo = track(new THREE.DodecahedronGeometry(0.68, 0));
      const innerBevelMesh = new THREE.Mesh(innerBevelGeo, mirrorChromeMat);
      innerBevelMesh.rotation.set(0.4, 0.6, 0.2);
      coreGroup.add(innerBevelMesh);

      // 2. 3D Tubular Geodesic Exoshell (Built from real 3D cylindrical struts + vertex spheres)
      const exoshellGroup = new THREE.Group();
      turntableGroup.add(exoshellGroup);

      const phiGolden = (1 + Math.sqrt(5)) / 2;
      const rawVertices = [
        [-1, phiGolden, 0],
        [1, phiGolden, 0],
        [-1, -phiGolden, 0],
        [1, -phiGolden, 0],
        [0, -1, phiGolden],
        [0, 1, phiGolden],
        [0, -1, -phiGolden],
        [0, 1, -phiGolden],
        [phiGolden, 0, -1],
        [phiGolden, 0, 1],
        [-phiGolden, 0, -1],
        [-phiGolden, 0, 1],
      ];
      const cageRadius = 1.24;
      const cageVertices = rawVertices.map(([x, y, z]) =>
        new THREE.Vector3(x, y, z).normalize().multiplyScalar(cageRadius)
      );

      const vertexHubGeo = track(new THREE.SphereGeometry(0.068, 14, 14));
      const strutGeo = track(new THREE.CylinderGeometry(0.024, 0.024, 1, 8));
      const upVector = new THREE.Vector3(0, 1, 0);

      cageVertices.forEach((v, idx) => {
        const hub = new THREE.Mesh(
          vertexHubGeo,
          idx % 3 === 0 ? violetLuminanceMat : mirrorChromeMat
        );
        hub.position.copy(v);
        exoshellGroup.add(hub);
      });

      for (let i = 0; i < cageVertices.length; i++) {
        for (let j = i + 1; j < cageVertices.length; j++) {
          const d = cageVertices[i].distanceTo(cageVertices[j]);
          // Adjacent vertices on an icosahedron of radius 1.24 have edge length ~1.30
          if (d < 1.38) {
            const strut = new THREE.Mesh(strutGeo, brushedTitaniumMat);
            const mid = cageVertices[i]
              .clone()
              .add(cageVertices[j])
              .multiplyScalar(0.5);
            const dir = cageVertices[j]
              .clone()
              .sub(cageVertices[i])
              .normalize();
            strut.position.copy(mid);
            strut.scale.set(1, d, 1);
            strut.quaternion.setFromUnitVectors(upVector, dir);
            exoshellGroup.add(strut);
          }
        }
      }

      // 3. Three Interlocking 3D Gyroscopic Orbital Rings + Orbiting Satellites
      const ringOneGroup = new THREE.Group();
      ringOneGroup.rotation.set(Math.PI * 0.28, Math.PI * 0.1, 0);
      turntableGroup.add(ringOneGroup);

      const ringOneGeo = track(new THREE.TorusGeometry(2.02, 0.046, 20, 96));
      const ringOneMesh = new THREE.Mesh(ringOneGeo, mirrorChromeMat);
      ringOneGroup.add(ringOneMesh);

      const satSphereGeo = track(new THREE.SphereGeometry(0.085, 16, 16));
      for (let s = 0; s < 3; s++) {
        const angle = (s * Math.PI * 2) / 3;
        const sat = new THREE.Mesh(
          satSphereGeo,
          s === 0 ? violetLuminanceMat : iceBlueLuminanceMat
        );
        sat.position.set(Math.cos(angle) * 2.02, Math.sin(angle) * 2.02, 0);
        ringOneGroup.add(sat);
      }

      const ringTwoGroup = new THREE.Group();
      ringTwoGroup.rotation.set(-Math.PI * 0.32, -Math.PI * 0.18, Math.PI * 0.15);
      turntableGroup.add(ringTwoGroup);

      const ringTwoGeo = track(new THREE.TorusGeometry(1.68, 0.036, 18, 90));
      const ringTwoMesh = new THREE.Mesh(ringTwoGeo, brushedTitaniumMat);
      ringTwoGroup.add(ringTwoMesh);

      for (let s = 0; s < 2; s++) {
        const angle = s * Math.PI;
        const sat = new THREE.Mesh(satSphereGeo, mirrorChromeMat);
        sat.position.set(Math.cos(angle) * 1.68, Math.sin(angle) * 1.68, 0);
        ringTwoGroup.add(sat);
      }

      const ringThreeGroup = new THREE.Group();
      ringThreeGroup.rotation.set(Math.PI * 0.44, -Math.PI * 0.28, 0);
      turntableGroup.add(ringThreeGroup);

      const ringThreeGeo = track(new THREE.TorusGeometry(2.32, 0.024, 14, 96));
      const ringThreeMesh = new THREE.Mesh(ringThreeGeo, violetLuminanceMat);
      ringThreeGroup.add(ringThreeMesh);

      // 4. 16 Articulated Outer Neural Nodes + Axon Conduits + Traveling Data Pulses
      const nodeCount = 16;
      const nodeOctaGeo = track(new THREE.OctahedronGeometry(0.165, 0));
      const nodeCollarGeo = track(new THREE.TorusGeometry(0.24, 0.02, 12, 32));
      const conduitCylGeo = track(new THREE.CylinderGeometry(0.018, 0.018, 1, 8));
      const pulseSphereGeo = track(new THREE.SphereGeometry(0.048, 12, 12));

      interface NeuralNodeRecord {
        group: THREE.Group;
        octaMesh: THREE.Mesh;
        collarMesh: THREE.Mesh;
        conduitMesh: THREE.Mesh;
        pulseMesh: THREE.Mesh;
        baseDir: THREE.Vector3;
        baseRadius: number;
        phase: number;
      }

      const nodes: NeuralNodeRecord[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const theta = (2 * Math.PI * i) / phiGolden;
        const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
        const dir = new THREE.Vector3(
          Math.cos(theta) * Math.sin(phi),
          Math.cos(phi),
          Math.sin(theta) * Math.sin(phi)
        ).normalize();

        const baseRadius = i % 2 === 0 ? 2.15 : 1.78;

        const nodeItemGroup = new THREE.Group();
        const octaMesh = new THREE.Mesh(
          nodeOctaGeo,
          i % 3 === 0
            ? violetLuminanceMat
            : i % 4 === 1
              ? iceBlueLuminanceMat
              : mirrorChromeMat
        );
        const collarMesh = new THREE.Mesh(nodeCollarGeo, brushedTitaniumMat);
        nodeItemGroup.add(octaMesh);
        nodeItemGroup.add(collarMesh);

        nodeItemGroup.position.copy(dir).multiplyScalar(baseRadius);
        nodeItemGroup.lookAt(0, 0, 0);
        turntableGroup.add(nodeItemGroup);

        const conduitMesh = new THREE.Mesh(conduitCylGeo, brushedTitaniumMat);
        const midPoint = dir.clone().multiplyScalar(baseRadius * 0.5);
        conduitMesh.position.copy(midPoint);
        conduitMesh.scale.set(1, baseRadius, 1);
        conduitMesh.quaternion.setFromUnitVectors(upVector, dir);
        turntableGroup.add(conduitMesh);

        // Synaptic pulse packet traveling along the conduit
        const pulseMesh = new THREE.Mesh(
          pulseSphereGeo,
          i % 2 === 0 ? violetLuminanceMat : iceBlueLuminanceMat
        );
        pulseMesh.position.copy(midPoint);
        turntableGroup.add(pulseMesh);

        nodes.push({
          group: nodeItemGroup,
          octaMesh,
          collarMesh,
          conduitMesh,
          pulseMesh,
          baseDir: dir,
          baseRadius,
          phase: i * 0.62,
        });
      }

      // 5. Soft Grounding Contact Shadow Plane
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = 128;
      shadowCanvas.height = 128;
      const sCtx = shadowCanvas.getContext('2d');
      if (sCtx) {
        const grad = sCtx.createRadialGradient(64, 64, 6, 64, 64, 60);
        grad.addColorStop(0, 'rgba(182, 0, 168, 0.34)');
        grad.addColorStop(0.45, 'rgba(12, 12, 12, 0.6)');
        grad.addColorStop(1, 'rgba(12, 12, 12, 0)');
        sCtx.fillStyle = grad;
        sCtx.fillRect(0, 0, 128, 128);
      }
      shadowTex = track(new THREE.CanvasTexture(shadowCanvas));
      const shadowPlaneGeo = track(new THREE.PlaneGeometry(5.2, 5.2));
      const shadowPlaneMat = track(
        new THREE.MeshBasicMaterial({
          map: shadowTex,
          transparent: true,
          depthWrite: false,
          opacity: 0.8,
        })
      );
      const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = -2.6;
      scene.add(shadowPlane);

      // Pointer parallax state
      const pointerTarget = { x: 0, y: 0 };
      let dampedPointerX = 0;
      let dampedPointerY = 0;
      let currentExploded = explodedRef.current;
      let frameCounter = 0;

      const handlePointerMove = (e: PointerEvent) => {
        const nx = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
        const ny = -(e.clientY / Math.max(window.innerHeight, 1)) * 2 + 1;
        pointerTarget.x = nx;
        pointerTarget.y = ny;
      };

      window.addEventListener('pointermove', handlePointerMove, { passive: true });

      const activeRenderer = renderer;
      const handleResize = () => {
        if (!container || !activeRenderer) return;
        const maxAvailableW = Math.min(
          container.parentElement?.clientWidth || window.innerWidth - 32,
          620
        );
        const w = Math.max(maxAvailableW, 260);
        const h = Math.max(container.clientHeight || 320, 260);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        activeRenderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(container.parentElement || container);
      }

      const scratchPos = new THREE.Vector3();
      const scratchMid = new THREE.Vector3();

      // Initial synchronous render
      activeRenderer.render(scene, camera);
      setIsInitializing(false);

      // Start continuous useFrame-style loop
      stopLoop = startAnimationLoop(
        isHeadless,
        ({ elapsed, delta, pointer }) => {
          frameCounter += 1;

          // Smooth mouse-following parallax
          dampedPointerX = THREE.MathUtils.damp(
            dampedPointerX,
            pointer.x * 0.52,
            4.5,
            delta
          );
          dampedPointerY = THREE.MathUtils.damp(
            dampedPointerY,
            pointer.y * 0.38,
            4.5,
            delta
          );
          currentExploded = THREE.MathUtils.damp(
            currentExploded,
            explodedRef.current,
            5.0,
            delta
          );

          const mode = modeRef.current;

          // 1. Unmistakable continuous vertical-axis rotation + gentle floating
          turntableGroup.rotation.y = elapsed * 0.52;
          turntableGroup.rotation.x = Math.sin(elapsed * 0.7) * 0.16;

          rootGroup.position.y = Math.sin(elapsed * 1.45) * 0.16;
          rootGroup.rotation.y = dampedPointerX;
          rootGroup.rotation.x = -dampedPointerY * 0.65;

          // 2. Counter-rotating inner crystal core & 3D geodesic exoshell
          coreGroup.rotation.y = -elapsed * 0.85;
          coreGroup.rotation.z = elapsed * 0.45;
          exoshellGroup.rotation.y = elapsed * 0.32;
          exoshellGroup.rotation.x = -elapsed * 0.24;

          // 3. Independent gyroscopic orbital ring rotations
          ringOneGroup.rotation.z = elapsed * 0.78;
          ringOneGroup.rotation.x = Math.PI * 0.28 + Math.sin(elapsed * 0.9) * 0.18;

          ringTwoGroup.rotation.z = -elapsed * 0.92;
          ringTwoGroup.rotation.y = -Math.PI * 0.18 + Math.cos(elapsed * 0.8) * 0.22;

          ringThreeGroup.rotation.z = elapsed * 0.55;
          ringThreeGroup.rotation.x = Math.PI * 0.44 + Math.cos(elapsed * 0.65) * 0.15;

          // 4. Orbiting rim lights so specular reflections visibly sweep across facets
          orbitingVioletLight.position.x = Math.cos(elapsed * 1.1) * 4.2;
          orbitingVioletLight.position.z = Math.sin(elapsed * 1.1) * 4.2;
          orbitingIceBlueLight.position.x = Math.cos(-elapsed * 0.9) * 4.2;
          orbitingIceBlueLight.position.y = Math.sin(-elapsed * 0.9) * 3.2;

          // 5. Mode & Exploded Layer Spread + Node Oscillation & Traveling Pulses
          const modeMultiplier =
            mode === 'transformer' ? 1.16 : mode === 'rag' ? 0.92 : 1.0;
          const ringScale = (1 + currentExploded * 0.28) * modeMultiplier;
          ringOneGroup.scale.setScalar(ringScale);
          ringTwoGroup.scale.setScalar(
            (1 + currentExploded * 0.18) * (mode === 'rag' ? 1.2 : 1.0)
          );
          ringThreeGroup.scale.setScalar(1 + currentExploded * 0.34);

          for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const radialOscillation = Math.sin(elapsed * 2.2 + n.phase) * 0.11;
            const targetRadius =
              (n.baseRadius + currentExploded * 0.72) * modeMultiplier +
              radialOscillation;

            scratchPos.copy(n.baseDir).multiplyScalar(targetRadius);
            if (mode === 'transformer') {
              scratchPos.y *= 0.58;
            } else if (mode === 'rag') {
              scratchPos.x *= 1.14;
            }

            n.group.position.copy(scratchPos);
            n.octaMesh.rotation.y = elapsed * 1.6 + n.phase;
            n.collarMesh.rotation.x = elapsed * 1.2 + n.phase;

            scratchMid.copy(scratchPos).multiplyScalar(0.5);
            n.conduitMesh.position.copy(scratchMid);
            n.conduitMesh.scale.set(1, scratchPos.length(), 1);

            // Synaptic data pulse traveling along conduit between core (0.3) and node (0.95)
            const pulseT = 0.3 + ((Math.sin(elapsed * 2.6 + n.phase) + 1) * 0.5) * 0.65;
            n.pulseMesh.position.copy(scratchPos).multiplyScalar(pulseT);
          }

          activeRenderer.render(scene, camera);

          // Update verifiable telemetry attributes every 10 frames for automated verification
          if (frameCounter % 10 === 0 && container) {
            container.setAttribute(
              'data-rotation-y',
              turntableGroup.rotation.y.toFixed(3)
            );
            container.setAttribute(
              'data-pointer-x',
              dampedPointerX.toFixed(3)
            );
            container.setAttribute('data-frame-count', String(frameCounter));
          }
        },
        () => pointerTarget
      );

      return () => {
        stopLoop?.();
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('resize', handleResize);
        resizeObserver?.disconnect();
        activeRenderer.domElement.removeEventListener(
          'webglcontextlost',
          handleContextLost
        );
        envTexture?.dispose();
        disposables.forEach((d) => d.dispose());
        activeRenderer.dispose();
      };
    } catch {
      stopLoop?.();
      resizeObserver?.disconnect();
      renderer?.dispose();
      setWebglSupported(false);
      setIsInitializing(false);
      return;
    }
  }, []);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center select-none"
      data-testid="three-d-hero-container"
    >
      {/* Multi-layered Ambient Studio Glow Behind 3D Sculpture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full opacity-45 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(182,0,168,0.45) 0%, rgba(56,189,248,0.22) 45%, rgba(12,12,12,0) 75%)',
        }}
      />

      {webglSupported ? (
        <div className="relative w-full flex items-center justify-center">
          {isInitializing && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <SceneFallback mode="loading" />
            </div>
          )}
          <div
            ref={canvasMountRef}
            aria-label="Interactive 3D metallic neural network sculpture"
            role="img"
            data-testid="neural-sculpture-canvas"
            data-rotation-y="0.000"
            data-pointer-x="0.000"
            data-frame-count="0"
            className="w-full h-[290px] sm:h-[350px] lg:h-[395px] max-w-[620px] relative z-10 overflow-hidden flex items-center justify-center"
          />
        </div>
      ) : (
        <SceneFallback mode="fallback" />
      )}
    </div>
  );
};
