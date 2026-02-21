"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { useDevice } from "../hooks/useDevice";

interface TechItem {
  name: string;
  color: string;
  category: "frontend" | "backend" | "language" | "database" | "tool";
}

const techStack: TechItem[] = [
  { name: "React", color: "#61DAFB", category: "frontend" },
  { name: "Next.js", color: "#ffffff", category: "frontend" },
  { name: "TypeScript", color: "#3178C6", category: "language" },
  { name: "JavaScript", color: "#F7DF1E", category: "language" },
  { name: "Python", color: "#3776AB", category: "language" },
  { name: "Java", color: "#ED8B00", category: "language" },
  { name: "Node.js", color: "#339933", category: "backend" },
  { name: "Express", color: "#ffffff", category: "backend" },
  { name: "MongoDB", color: "#47A248", category: "database" },
  { name: "PostgreSQL", color: "#4169E1", category: "database" },
  { name: "MySQL", color: "#4479A1", category: "database" },
  { name: "Tailwind", color: "#06B6D4", category: "frontend" },
  { name: "Three.js", color: "#ffffff", category: "frontend" },
  { name: "GSAP", color: "#88CE02", category: "frontend" },
  { name: "Git", color: "#F05032", category: "tool" },
  { name: "Docker", color: "#2496ED", category: "tool" },
  { name: "AWS", color: "#FF9900", category: "tool" },
  { name: "Swift", color: "#FA7343", category: "language" },
  { name: "C++", color: "#00599C", category: "language" },
];

interface TechNodeProps {
  tech: TechItem;
  position: [number, number, number];
  index: number;
}

const TechNode: React.FC<TechNodeProps> = ({ tech, position, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Gentle floating animation
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + index * 0.5) * 0.1;
    meshRef.current.position.x = position[0] + Math.cos(time * 0.3 + index * 0.3) * 0.05;

    // Scale on hover
    const targetScale = hovered ? 1.3 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[position[0], position[1] - 0.3, position[2]]}
        fontSize={0.12}
        color={hovered ? tech.color : "#a8a49c"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        {tech.name}
      </Text>
    </Float>
  );
};

interface TechCloudProps {
  isMobile: boolean;
}

const TechCloud: React.FC<TechCloudProps> = ({ isMobile }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate positions in a spiral/orbital pattern
  const positions = useMemo(() => {
    const pos: [number, number, number][] = [];
    const count = techStack.length;
    const radius = isMobile ? 1.5 : 2.2;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      pos.push([
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi) * 0.6,
        radius * Math.cos(phi) * 0.5,
      ]);
    }
    return pos;
  }, [isMobile]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.y = time * 0.05;
  });

  return (
    <group ref={groupRef}>
      {techStack.map((tech, i) => (
        <TechNode key={tech.name} tech={tech} position={positions[i]} index={i} />
      ))}

      {/* Central glow */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.1} />
      </mesh>

      {/* Orbital rings */}
      {[1, 1.5, 2].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.2, 0, i * 0.3]}>
          <torusGeometry args={[r, 0.005, 16, 100]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

interface TechSphere3DProps {
  className?: string;
}

const TechSphere3D: React.FC<TechSphere3DProps> = ({ className = "" }) => {
  const { isMobile, isTablet } = useDevice();
  const cameraZ = isMobile ? 5 : isTablet ? 4.5 : 4;

  return (
    <div className={`relative w-full ${className}`} style={{ height: isMobile ? "350px" : "500px" }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 60%)",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 60 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#f59e0b" />
        <TechCloud isMobile={isMobile} />
      </Canvas>

      {/* Mobile: show hint */}
      {isMobile && (
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span className="text-caption text-xs opacity-50">Drag to rotate</span>
        </div>
      )}
    </div>
  );
};

export default TechSphere3D;
