"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useIntersection } from "@/hooks/useIntersection";

// ── 1. Mouse Parallax Controller (SceneController) ──────────────────────────
interface SceneControllerProps {
  maxTilt?: number;
  stiffness?: number;
  damping?: number;
  children: React.ReactNode;
}

function SceneController({
  maxTilt = 0.12,
  stiffness = 60,
  damping = 15,
  children,
}: SceneControllerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  const lerpFactor = Math.min(0.95, (stiffness / damping) * 0.008);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Disable hover-tilt on touch screens
    isTouch.current = window.matchMedia("(hover: none)").matches;
    if (isTouch.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize cursor location to -1 .. 1
      targetRef.current.x = (e.clientY / window.innerHeight) * 2 - 1;
      targetRef.current.y = -(e.clientX / window.innerWidth) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current || isTouch.current) return;

    // Smooth spring physics interpolation
    currentRef.current.x += (targetRef.current.x * maxTilt - currentRef.current.x) * lerpFactor;
    currentRef.current.y += (targetRef.current.y * maxTilt - currentRef.current.y) * lerpFactor;

    groupRef.current.rotation.x = currentRef.current.x;
    groupRef.current.rotation.y = currentRef.current.y;
  });

  return <group ref={groupRef}>{children}</group>;
}

// ── 2. Glass Orb AI Core (GlassOrb) ──────────────────────────────────────────
function GlassOrb() {
  const outerOrbRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // 1. Slow, premium floating drift for the outer glass shell
    if (outerOrbRef.current) {
      outerOrbRef.current.position.y = Math.sin(elapsed * 0.8) * 0.15;
      outerOrbRef.current.rotation.y = elapsed * 0.08;
    }

    // 2. Pulse the inner power core scale dynamically
    if (innerCoreRef.current) {
      const pulse = 0.9 + Math.sin(elapsed * 1.6) * 0.05;
      innerCoreRef.current.scale.setScalar(pulse);
      innerCoreRef.current.rotation.z = -elapsed * 0.15;
    }

    // 3. Orbit and tilt the outer alignment ring
    if (ringRef.current) {
      ringRef.current.rotation.x = elapsed * 0.2;
      ringRef.current.rotation.z = elapsed * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Refractive Glass Shell */}
      <mesh ref={outerOrbRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={8} // Kept low for 60 FPS on laptops
          resolution={512}
          transmission={0.95}
          roughness={0.08}
          thickness={1.5}
          ior={1.2}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.3}
          distortionScale={0.2}
          temporalDistortion={0.1}
          color="#D9E8E2" // Mystic Mint glass tint
        />
      </mesh>

      {/* Inner Energy Core */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#FF9932" // Deep Saffron core
          emissive="#FFC801" // Forsythia glow emission
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Vector Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#FFC801" // Forsythia alignment ring
          emissive="#FFC801"
          emissiveIntensity={1.2}
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  );
}

// ── 3. GPU Particle Field (SparkleField) ──────────────────────────────────────
interface SparkleFieldProps {
  count?: number;
  spread?: number;
}

function SparkleField({ count = 500, spread = 7 }: SparkleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Pre-calculate randomized positions, color interpolation, and drift phase
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Brand color mapping
    const col1 = new THREE.Color("#FFC801"); // Forsythia
    const col2 = new THREE.Color("#FF9932"); // Deep Saffron
    const col3 = new THREE.Color("#D9E8E2"); // Mystic Mint
    const tempCol = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // 1. Distribute particles spherically with normal bias
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = (0.2 + 0.8 * Math.random()) * spread;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // 2. Map colors along brand gradient transitions
      const t = Math.random();
      if (t < 0.5) {
        tempCol.copy(col1).lerp(col2, t * 2.0);
      } else {
        tempCol.copy(col2).lerp(col3, (t - 0.5) * 2.0);
      }

      col[i * 3] = tempCol.r;
      col[i * 3 + 1] = tempCol.g;
      col[i * 3 + 2] = tempCol.b;


    }

    return [pos, col];
  }, [count, spread]);

  // Compute particle twinkle values inside the GPU-rendered render loop
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    
    // Slow planetary cloud rotation
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── 4. Main Export Canvas Component (HeroCanvas) ──────────────────────────────
export function HeroCanvas() {
  const [containerRef, isVisible] = useIntersection<HTMLDivElement>({
    threshold: 0.01,
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[32rem] md:h-full select-none"
    >
      {/* Suspend rendering when Canvas exits the viewport boundary */}
      {isVisible ? (
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 50 }}
          gl={{ powerPreference: "high-performance", antialias: false }}
          dpr={[1, 1.5]} // Capped to maximize render speed
        >
          <color attach="background" args={["#172B36"]} />
          <ambientLight intensity={0.5} />
          
          {/* Custom three-point layout lighting */}
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFC801" />
          <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#114C5A" />
          <spotLight position={[0, -10, 0]} intensity={1.0} color="#FF9932" />

          <SceneController>
            <GlassOrb />
            <SparkleField count={450} />
          </SceneController>

          {/* Adaptive performance utilities */}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>
      ) : (
        // Static frame fallback for indexing & viewport suspension
        <div className="absolute inset-0 bg-oceanic-noir flex items-center justify-center">
          <div className="w-[180px] h-[180px] rounded-full bg-nocturnal-expedition/10 border border-mystic-mint/10 animate-pulse" />
        </div>
      )}
    </div>
  );
}

export default HeroCanvas;
