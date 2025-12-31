"use client";

import React, { Suspense, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { useDevice } from "../hooks/useDevice";

// Advanced Cyberpunk Sphere with complex shader
const CyberpunkSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      color1: { value: new THREE.Color("#00f0ff") },
      color2: { value: new THREE.Color("#a855f7") },
      color3: { value: new THREE.Color("#ff006e") },
      mousePos: { value: new THREE.Vector2(0, 0) },
      intensity: { value: 0.8 },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (sphereRef.current && materialRef.current) {
      const time = clock.getElapsedTime();
      mousePos.current = { x: pointer.x, y: pointer.y };

      // Complex organic movement
      const baseY = Math.sin(time * 0.5) * 0.5 + Math.cos(time * 0.3) * 0.3;
      const baseX = Math.cos(time * 0.4) * 0.3;

      // Multi-axis rotation
      sphereRef.current.rotation.x = time * 0.1;
      sphereRef.current.rotation.y = time * 0.15;
      sphereRef.current.rotation.z = Math.sin(time * 0.05) * 0.2;

      // Mouse interaction with smoother following
      const targetX = baseX + (pointer.x * viewport.width) / 15;
      const targetY = (pointer.y * viewport.height) / 15;
      sphereRef.current.position.x = THREE.MathUtils.lerp(sphereRef.current.position.x, targetX, 0.03);
      sphereRef.current.position.y = baseY;
      sphereRef.current.position.z = THREE.MathUtils.lerp(sphereRef.current.position.z, targetY, 0.03);

      // Update shader uniforms
      materialRef.current.uniforms.time.value = time;
      materialRef.current.uniforms.mousePos.value.set(pointer.x, pointer.y);
    }
  });

  return (
    <mesh ref={sphereRef} position={[0, 0, -2]}>
      <icosahedronGeometry args={[1.5, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          uniform float time;
          uniform vec2 mousePos;
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec2 vUv;

          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;

            // Organic displacement
            vec3 pos = position;
            float displacement = sin(pos.x * 3.0 + time) *
                                 cos(pos.y * 3.0 + time) *
                                 sin(pos.z * 3.0 + time) * 0.15;
            pos += normal * displacement;

            // Pulsing effect
            pos *= 1.0 + sin(time * 2.0) * 0.05;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          uniform vec2 mousePos;
          uniform float intensity;

          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec2 vUv;

          void main() {
            // Fresnel effect for glow
            vec3 viewDirection = normalize(cameraPosition - vPosition);
            float fresnel = pow(1.0 - dot(vNormal, viewDirection), 3.0);

            // Animated color mixing
            float colorMix1 = sin(time + vPosition.x * 2.0) * 0.5 + 0.5;
            float colorMix2 = cos(time * 1.5 + vPosition.y * 2.0) * 0.5 + 0.5;

            vec3 color = mix(color1, color2, colorMix1);
            color = mix(color, color3, colorMix2);

            // Add pulsing rings
            float rings = sin(length(vPosition.xy) * 10.0 - time * 3.0) * 0.5 + 0.5;
            color += vec3(rings * 0.3);

            // Enhanced glow with fresnel
            color *= (1.0 + fresnel * intensity);

            // Holographic effect
            color += vec3(
              sin(vUv.y * 100.0 + time * 5.0) * 0.1,
              cos(vUv.x * 100.0 - time * 3.0) * 0.1,
              sin((vUv.x + vUv.y) * 50.0 + time * 4.0) * 0.1
            );

            // Opacity with fresnel for ethereal look
            float alpha = 0.5 + fresnel * 0.2;

            gl_FragColor = vec4(color, alpha);
          }
        `}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

// Particle field with custom behavior
const ParticleField = ({ isMobile }: { isMobile: boolean }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    // Reduce particle count significantly on mobile
    const count = isMobile ? 500 : 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color("#00f0ff");
    const color2 = new THREE.Color("#a855f7");
    const color3 = new THREE.Color("#ff006e");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spherical distribution
      const radius = 15 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random color from palette
      const colorChoice = Math.random();
      const color = colorChoice < 0.33 ? color1 : colorChoice < 0.66 ? color2 : color3;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, colors];
  }, [isMobile]);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const HeroBackground: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <Suspense fallback={null}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: !isMobile, powerPreference: isMobile ? "low-power" : "high-performance" }}
      >
        <color attach="background" args={["#0a0a0f"]} />
        <fog attach="fog" args={["#0a0a0f", 5, 30]} />

        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff006e" />
        {!isMobile && (
          <spotLight
            position={[0, 5, 5]}
            angle={0.5}
            penumbra={1}
            intensity={0.8}
            color="#a855f7"
          />
        )}

        <CyberpunkSphere />
        <ParticleField isMobile={isMobile} />
        {!isMobile && (
          <Sparkles
            count={80}
            scale={15}
            size={1.5}
            speed={0.3}
            opacity={0.3}
            color="#00f0ff"
          />
        )}

        <Environment preset="night" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={isMobile ? 0.15 : 0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {!isMobile && (
          <EffectComposer>
            <Bloom
              intensity={0.6}
              luminanceThreshold={0.4}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.SCREEN}
            />
          </EffectComposer>
        )}
      </Canvas>
    </Suspense>
  );
};

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const { isMobile } = useDevice();

  useEffect(() => {
    if (titleRef.current) {
      const chars = titleRef.current.textContent?.split("") || [];
      titleRef.current.innerHTML = "";

      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        titleRef.current?.appendChild(span);
      });

      // Simpler animation on mobile
      gsap.fromTo(
        titleRef.current.children,
        { y: isMobile ? 50 : 100, opacity: 0, rotationX: isMobile ? 0 : -90 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: isMobile ? 0.6 : 1,
          stagger: isMobile ? 0.015 : 0.03,
          ease: isMobile ? "power2.out" : "back.out(1.7)",
        }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { y: isMobile ? 30 : 50, opacity: 0 },
        { y: 0, opacity: 1, duration: isMobile ? 0.6 : 1, delay: isMobile ? 0.3 : 0.5, ease: "power3.out" }
      );
    }
  }, [isMobile]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen h-screen text-white text-center overflow-hidden">
      <HeroBackground isMobile={isMobile} />

      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-(--bg-darkest)/40 to-(--bg-darkest)/60 z-5" />

      <div className="relative z-10 px-4 max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 glow-text leading-tight px-2"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.02em",
          }}
        >
          CODE CREATE INNOVATE
        </h1>

        <p
          ref={subtitleRef}
          className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
        >
          Hi! I&apos;m <span className="glow-cyan font-semibold">Parandhama Reddy</span>,
          a Full Stack Developer crafting immersive digital experiences at the intersection of
          <span className="glow-pink font-semibold"> technology</span> and
          <span className="text-(--neon-purple) font-semibold"> creativity</span>.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 w-full max-w-md sm:max-w-none"
        >
          <Link href="#projects" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-(--neon-cyan) to-(--neon-purple) rounded-full text-sm sm:text-base md:text-lg font-bold overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10">Explore My Universe</span>
              <div className="absolute inset-0 bg-linear-to-r from-(--neon-purple) to-(--neon-pink) opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </Link>

          <Link href="#contact" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 border-2 border-(--neon-cyan) rounded-full text-sm sm:text-base md:text-lg font-bold neon-border bg-transparent transition-all duration-300"
            >
              Get In Touch
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 2 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-(--neon-cyan) rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-(--neon-cyan) rounded-full"
              style={{ boxShadow: "0 0 10px var(--neon-cyan)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
