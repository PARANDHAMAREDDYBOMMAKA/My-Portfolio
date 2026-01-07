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
  const { viewport, camera } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      color1: { value: new THREE.Color("#00f0ff") },
      color2: { value: new THREE.Color("#a855f7") },
      color3: { value: new THREE.Color("#ff006e") },
      mousePos: { value: new THREE.Vector2(0, 0) },
      intensity: { value: 1.2 },
      distortion: { value: 0.3 },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (sphereRef.current && materialRef.current) {
      const time = clock.getElapsedTime();

      const baseY = Math.sin(time * 0.5) * 0.4 + Math.cos(time * 0.3) * 0.2;
      const baseX = Math.cos(time * 0.4) * 0.25;
      const baseZ = Math.sin(time * 0.2) * 0.3;

      targetRotation.current.x = pointer.y * 0.5;
      targetRotation.current.y = pointer.x * 0.5;

      sphereRef.current.rotation.x = THREE.MathUtils.lerp(sphereRef.current.rotation.x, targetRotation.current.x + time * 0.1, 0.05);
      sphereRef.current.rotation.y = THREE.MathUtils.lerp(sphereRef.current.rotation.y, targetRotation.current.y + time * 0.15, 0.05);
      sphereRef.current.rotation.z = Math.sin(time * 0.05) * 0.1;

      const targetX = baseX + (pointer.x * viewport.width) / 12;
      const targetY = baseY + (pointer.y * viewport.height) / 12;
      const targetZPos = baseZ + (pointer.x * 0.5);

      sphereRef.current.position.x = THREE.MathUtils.lerp(sphereRef.current.position.x, targetX, 0.05);
      sphereRef.current.position.y = THREE.MathUtils.lerp(sphereRef.current.position.y, targetY, 0.05);
      sphereRef.current.position.z = THREE.MathUtils.lerp(sphereRef.current.position.z, targetZPos - 2, 0.05);

      const scale = 1 + Math.sin(time * 0.5) * 0.05;
      sphereRef.current.scale.setScalar(scale);

      materialRef.current.uniforms.time.value = time;
      materialRef.current.uniforms.mousePos.value.set(pointer.x, pointer.y);
      materialRef.current.uniforms.distortion.value = 0.3 + Math.sin(time * 0.3) * 0.1;
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
    <section className="relative flex flex-col items-center justify-center text-white text-center overflow-hidden" style={{ minHeight: '100vh', height: '100dvh' }}>
      <HeroBackground isMobile={isMobile} />

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-(--bg-darkest)/40 to-(--bg-darkest)/60 z-5" />

      <div className="relative z-10 w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-6xl mx-auto" style={{ padding: 'clamp(1rem, 4vw, 2rem)' }}>
        <h1
          ref={titleRef}
          className="font-bold glow-text leading-tight"
          style={{
            fontSize: 'clamp(1.75rem, 7vw, 6rem)',
            marginBottom: 'clamp(1rem, 3vh, 2rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.02em",
          }}
        >
          CODE CREATE INNOVATE
        </h1>

        <p
          ref={subtitleRef}
          className="text-gray-300 mx-auto leading-relaxed"
          style={{
            fontSize: 'clamp(0.875rem, 2.5vw, 1.5rem)',
            marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)',
            maxWidth: '90%',
            padding: '0 clamp(0.5rem, 2vw, 1rem)',
          }}
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
          className="flex flex-col sm:flex-row justify-center items-center w-full"
          style={{
            gap: 'clamp(0.75rem, 2vw, 1rem)',
            padding: '0 clamp(0.5rem, 2vw, 1rem)',
          }}
        >
          <Link href="#projects" className="w-full sm:w-auto max-w-xs sm:max-w-none">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full bg-linear-to-r from-(--neon-cyan) to-(--neon-purple) rounded-full font-bold overflow-hidden transition-all duration-300"
              style={{
                padding: 'clamp(0.75rem, 2vh, 1rem) clamp(1.5rem, 4vw, 2rem)',
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
              }}
            >
              <span className="relative z-10">Explore My Universe</span>
              <div className="absolute inset-0 bg-linear-to-r from-(--neon-purple) to-(--neon-pink) opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </Link>

          <Link href="#contact" className="w-full sm:w-auto max-w-xs sm:max-w-none">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full border-2 border-(--neon-cyan) rounded-full font-bold neon-border bg-transparent transition-all duration-300"
              style={{
                padding: 'clamp(0.75rem, 2vh, 1rem) clamp(1.5rem, 4vw, 2rem)',
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
              }}
            >
              Get In Touch
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 2 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          }}
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ bottom: 'clamp(2rem, 5vh, 3rem)' }}
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
