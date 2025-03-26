"use client";

import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, Text } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import Link from "next/link";

// Enhanced Floating Sphere with more complex shader and movement
const FloatingGlowSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame(({ clock, mouse }) => {
    if (sphereRef.current) {
      // Complex floating and rotation
      const time = clock.getElapsedTime();
      sphereRef.current.position.y = Math.sin(time) * 0.8;
      sphereRef.current.rotation.x += 0.003;
      sphereRef.current.rotation.y += 0.005;

      // Subtle mouse interaction
      sphereRef.current.position.x = THREE.MathUtils.lerp(
        sphereRef.current.position.x,
        (mouse.x * viewport.width) / 20,
        0.05
      );
      sphereRef.current.position.z = THREE.MathUtils.lerp(
        sphereRef.current.position.z,
        (mouse.y * viewport.height) / 20,
        0.05
      );
    }
  });

  return (
    <mesh ref={sphereRef} position={[0, 0, -2]}>
      <sphereGeometry args={[1.2, 128, 128]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          color: { value: new THREE.Color("#915EFF") },
        }}
        vertexShader={`
          uniform float time;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 transformed = position + normal * sin(time + length(position)) * 0.1;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform float time;
          varying vec2 vUv;
          void main() {
            vec3 finalColor = color * (1.0 + 0.5 * sin(time * 2.0 + vUv.x * 10.0));
            gl_FragColor = vec4(finalColor, 0.8);
          }
        `}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

const HeroBackground: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
        />
        <FloatingGlowSphere />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </Suspense>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen bg-black text-white text-center overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Code. Create. Innovate.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, type: "tween" }}
          className="text-2xl mb-6 text-gray-300 max-w-2xl mx-auto"
        >
          Hi! I&apos;m Parandhama Reddy, a Full Stack Developer passionate about
          transforming ideas into digital realities.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          <Link href="#projects">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(145, 94, 255, 0.5)",
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-600 text-white px-8 py-4 rounded-full border-2 border-transparent transition duration-300 hover:border-purple-300 text-lg font-semibold tracking-wider"
            >
              Explore My Universe 🚀
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
