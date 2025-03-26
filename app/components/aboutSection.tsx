"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

// 3D Floating Icons Component
const FloatingIcons = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
      groupRef.current.rotation.x = Math.cos(time * 0.3) * 0.1;

      // Subtle mouse interaction
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        (mouse.x * viewport.width) / 10,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        (mouse.y * viewport.height) / 10,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Code, Laptop, and Brain icons as 3D shapes */}
      <mesh position={[-2, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 1, 32]} />
        <meshStandardMaterial color="#9b59b6" />
      </mesh>
      <mesh position={[2, 1, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#2ecc71" />
      </mesh>
    </group>
  );
};

const AboutSection: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const skillCategories = [
    {
      name: "Programming",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "TypeScript", level: 75 },
      ],
    },
    {
      name: "Web Technologies",
      skills: [
        { name: "React", level: 90 },
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 75 },
      ],
    },
    {
      name: "Design & Tools",
      skills: [
        { name: "Tailwind CSS", level: 85 },
        { name: "MongoDB", level: 70 },
        { name: "Git", level: 80 },
      ],
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white relative overflow-hidden py-20 px-10"
    >
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5] }}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FloatingIcons />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="container mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="flex justify-center"
        >
          <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl">
            <Image
              src="/photo.jpeg"
              alt="Parandhama Reddy"
              layout="fill"
              objectFit="cover"
              className="transform hover:scale-110 transition-transform duration-300"
            />
          </div>
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="space-y-6"
        >
          <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Parandhama Reddy
          </h2>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
            <p className="mb-4">
              A passionate Full Stack Developer with a keen interest in
              transforming innovative ideas into digital realities. I blend
              technical expertise with creative problem-solving to build
              impactful web solutions.
            </p>
          </div>

          {/* Skill Categories */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Skill Landscape</h3>
            {skillCategories.map((category) => (
              <div key={category.name} className="mb-6">
                <h4 className="text-xl font-medium mb-2">{category.name}</h4>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center space-x-3"
                      onMouseEnter={() => setActiveSkill(skill.name)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <div
                        className={`h-2 bg-purple-500 rounded-full transition-all duration-300 ${
                          activeSkill === skill.name ? "w-full" : "w-1/2"
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                      <span
                        className={`transition-all duration-300 ${
                          activeSkill === skill.name
                            ? "text-white font-bold"
                            : "text-gray-400"
                        }`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
