"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Float, 
  MeshDistortMaterial, 
  Sphere, 
  Stars, 
  Torus, 
  OrbitControls, 
  PerspectiveCamera, 
  MeshWobbleMaterial,
  Environment
} from "@react-three/drei";
import * as THREE from "three";

function MechCore({
  selectedDomain,
  launchStage,
  progress,
}: {
  selectedDomain: string | null;
  launchStage: "idle" | "booting" | "syncing" | "online";
  progress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Group>(null);
  
  // Color logic based on selected domain
  const color = useMemo(() => {
    switch (selectedDomain) {
      case 'web': return '#00f5ff';
      case 'app': return '#6c63ff';
      case 'game': return '#ff0055';
      case 'hack': return '#00ff9c';
      default: return '#00f5ff';
    }
  }, [selectedDomain]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 8;
      meshRef.current.rotation.y = Math.sin(t / 4) / 8;
      meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.01;
      coreRef.current.rotation.z += 0.005;
    }
  });

  const boost = useMemo(() => {
    const p = Math.max(0, Math.min(100, progress)) / 100;
    if (launchStage === "booting") return 0.45 + p * 0.9;
    if (launchStage === "syncing") return 0.65 + p * 0.75;
    if (launchStage === "online") return 1.15;
    return 0.35;
  }, [launchStage, progress]);

  return (
    <group ref={coreRef}>
      {/* Central Power Core */}
      <Float
        speed={2 + boost}
        rotationIntensity={0.45 + boost * 0.25}
        floatIntensity={0.35 + boost * 0.25}
      >
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.45 + boost * 0.25}>
          <MeshDistortMaterial
            color={color}
            speed={3 + boost * 2}
            distort={0.35 + boost * 0.25}
            radius={1}
            emissive={color}
            emissiveIntensity={1.8 + boost * 2.2}
          />
        </Sphere>
      </Float>

      {/* Orbiting Rings (Mechanical Feel) */}
      <Torus args={[2.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={4 + boost * 4}
          transparent
          opacity={0.55 + boost * 0.25}
        />
      </Torus>
      
      <Torus args={[2.8, 0.01, 16, 100]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.22 + boost * 0.18}
        />
      </Torus>

      {/* Domain Indicator Text (floating) */}
      {/* Domain label is rendered as HTML overlay in GameDevExperience to avoid font issues */}
      
      {/* Particles/Stars around core */}
      <Stars
        radius={10}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1 + boost * 0.35}
      />
    </group>
  );
}

function Scene({
  selectedDomain,
  launchStage,
  progress,
}: {
  selectedDomain: string | null;
  launchStage: "idle" | "booting" | "syncing" | "online";
  progress: number;
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f5ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#6c63ff" />
      <spotLight position={[0, 5, 0]} intensity={2} angle={0.5} penumbra={1} castShadow />

      <MechCore
        selectedDomain={selectedDomain}
        launchStage={launchStage}
        progress={progress}
      />
      
      {/* Industrial Grid Floor */}
      <gridHelper args={[20, 20, 0x00f5ff, 0x111111]} position={[0, -4, 0]} />
      
      <Environment preset="city" />
    </>
  );
}

export default function GameLab3D({
  selectedDomain,
  launchStage,
  progress,
}: {
  selectedDomain: string | null;
  launchStage: "idle" | "booting" | "syncing" | "online";
  progress: number;
}) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Scene selectedDomain={selectedDomain} launchStage={launchStage} progress={progress} />
      </Canvas>
    </div>
  );
}
