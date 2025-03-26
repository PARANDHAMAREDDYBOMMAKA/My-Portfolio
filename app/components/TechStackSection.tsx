"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import {
  faReact,
  faNodeJs,
  faPython,
  faJs,
  faHtml5,
  faCss3Alt,
  faGitAlt,
} from "@fortawesome/free-brands-svg-icons";
import {
  SiTailwindcss,
  SiChakraui,
  SiMongodb,
  SiTypescript,
  SiNextdotjs,
} from "react-icons/si";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// 3D Tech Stack Visualization
const TechStackBackground = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();

      // Dynamic rotation and floating
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      groupRef.current.rotation.y = Math.cos(time * 0.3) * 0.1;

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
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * -10,
          ]}
          rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI,
          ]}
        >
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color={`hsl(${Math.random() * 360}, 50%, 50%)`}
            opacity={0.3}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
};

const TechStacksSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const techStacks = [
    {
      category: "Frontend",
      technologies: [
        {
          name: "React",
          icon: faReact,
          color: "text-blue-400",
          proficiency: 100,
        },
        {
          name: "Next.js",
          icon: faReact as IconDefinition,
          color: "text-white",
          proficiency: 100,
        },
        {
          name: "Tailwind CSS",
          icon: faReact as IconDefinition,
          color: "text-blue-500",
          proficiency: 100,
        },
      ],
    },
    {
      category: "Backend",
      technologies: [
        {
          name: "Node.js",
          icon: faNodeJs,
          color: "text-green-400",
          proficiency: 100,
        },
        {
          name: "Python",
          icon: faPython,
          color: "text-blue-600",
          proficiency: 80,
        },
        {
          name: "MongoDB",
          icon: faReact as IconDefinition,
          color: "text-green-600",
          proficiency: 100,
        },
      ],
    },
    {
      category: "Languages",
      technologies: [
        {
          name: "JavaScript",
          icon: faJs,
          color: "text-yellow-400",
          proficiency: 100,
        },
        {
          name: "TypeScript",
          icon: faReact as IconDefinition,
          color: "text-blue-500",
          proficiency: 90,
        },
      ],
    },
  ];

  const filteredTechs =
    activeCategory === "All"
      ? techStacks.flatMap((category) => category.technologies)
      : techStacks.find((cat) => cat.category === activeCategory)
          ?.technologies || [];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-purple-900 text-white relative overflow-hidden py-20 px-10"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5] }}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <TechStackBackground />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
        </Canvas>
      </div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Technology Landscape
        </h2>

        {/* Category Filters */}
        <div className="flex justify-center mb-12 space-x-4">
          {["All", ...techStacks.map((cat) => cat.category)].map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-6 py-2 rounded-full transition-all duration-300
                ${
                  activeCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {filteredTechs.map((tech) => (
            <motion.div
              key={tech.name}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center relative overflow-hidden"
              onHoverStart={() => setHoveredTech(tech.name)}
              onHoverEnd={() => setHoveredTech(null)}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative z-10">
                <FontAwesomeIcon
                  icon={tech.icon}
                  className={`text-6xl mx-auto mb-4 ${tech.color}`}
                />
                <h3 className="text-xl font-bold mb-2">{tech.name}</h3>

                {hoveredTech === tech.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <div className="w-full bg-purple-200 rounded-full h-2.5 dark:bg-purple-700 mb-2">
                      <div
                        className="bg-purple-600 h-2.5 rounded-full"
                        style={{ width: `${tech.proficiency}%` }}
                      ></div>
                    </div>
                    <p className="text-sm">Proficiency: {tech.proficiency}%</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TechStacksSection;
