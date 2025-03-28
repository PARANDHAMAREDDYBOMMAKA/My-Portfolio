"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faNodeJs,
  faPython,
  faJs,
  faHtml5,
  faCss3Alt,
  faSwift,
  faJava,
} from "@fortawesome/free-brands-svg-icons";
import {
  SiTypescript,
  SiExpress,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiCplusplus,
} from "react-icons/si";
import { IconType } from "react-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// 🌌 3D Star Background
const StarsBackground = () => {
  const starsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  const starsGeometry = new THREE.BufferGeometry();
  const starsArray = new Float32Array(3000);
  for (let i = 0; i < starsArray.length; i++) {
    starsArray[i] = (Math.random() - 0.5) * 20;
  }
  starsGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starsArray, 3)
  );

  return (
    <points
      ref={starsRef}
      geometry={starsGeometry}
      material={new THREE.PointsMaterial({ color: 0xffffff, size: 0.02 })}
    />
  );
};

// 💻 Tech Stack Data Interface
interface Technology {
  name: string;
  icon: IconDefinition | IconType;
  color: string;
  proficiency: number;
  category: string;
}

const TechStacksSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // 📦 Tech Stacks Data
  const techStacks: Technology[] = [
    {
      name: "C++",
      icon: SiCplusplus,
      color: "text-blue-600",
      proficiency: 75,
      category: "Languages",
    },
    {
      name: "CSS3",
      icon: faCss3Alt,
      color: "text-blue-500",
      proficiency: 90,
      category: "Frontend",
    },
    {
      name: "JavaScript",
      icon: faJs,
      color: "text-yellow-400",
      proficiency: 95,
      category: "Languages",
    },
    {
      name: "Java",
      icon: faJava,
      color: "text-red-600",
      proficiency: 80,
      category: "Languages",
    },
    {
      name: "HTML5",
      icon: faHtml5,
      color: "text-orange-500",
      proficiency: 95,
      category: "Frontend",
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      color: "text-blue-600",
      proficiency: 85,
      category: "Languages",
    },
    {
      name: "Python",
      icon: faPython,
      color: "text-blue-600",
      proficiency: 90,
      category: "Languages",
    },
    {
      name: "Swift",
      icon: faSwift,
      color: "text-orange-500",
      proficiency: 70,
      category: "Languages",
    },
    {
      name: "React",
      icon: faReact,
      color: "text-blue-400",
      proficiency: 95,
      category: "Frontend",
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      color: "text-white",
      proficiency: 90,
      category: "Frontend",
    },
    {
      name: "NodeJS",
      icon: faNodeJs,
      color: "text-green-600",
      proficiency: 90,
      category: "Backend",
    },
    {
      name: "Express.js",
      icon: SiExpress,
      color: "text-gray-500",
      proficiency: 85,
      category: "Backend",
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      color: "text-green-600",
      proficiency: 85,
      category: "Databases",
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      color: "text-blue-700",
      proficiency: 80,
      category: "Databases",
    },
  ];

  // 🏷️ Categories Extraction
  const categories = [
    "All",
    ...Array.from(new Set(techStacks.map((tech) => tech.category))),
  ];

  // 🔍 Tech Filtering
  const filteredTechs =
    activeCategory === "All"
      ? techStacks
      : techStacks.filter((tech) => tech.category === activeCategory);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black text-white relative overflow-hidden py-20 px-4 md:px-10"
    >
      {/* 🌌 3D Starfield */}
      <Canvas camera={{ position: [0, 0, 5] }} className="absolute inset-0 z-0">
        <ambientLight intensity={0.5} />
        <StarsBackground />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>

      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          My Tech Stack
        </h2>

        {/* 🌟 Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all text-sm md:text-base ${
                activeCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* 💻 Tech Grid with Floating Effect */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredTechs.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 50,
                  scale: 0.8,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    damping: 10,
                    stiffness: 200,
                  },
                },
              }}
              className="bg-white/10 p-6 rounded-xl text-center backdrop-blur-md relative flex flex-col items-center justify-center"
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: "0 10px 20px rgba(128, 0, 128, 0.4)",
                zIndex: 10,
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* 🖥 Dynamic Icon Rendering */}
              <div className="mb-3">
                {typeof tech.icon === "function" ? (
                  <tech.icon className={`text-5xl ${tech.color}`} />
                ) : (
                  <FontAwesomeIcon
                    icon={tech.icon}
                    className={`text-5xl ${tech.color}`}
                  />
                )}
              </div>

              {/* 📌 Tech Name */}
              <h3 className="mt-2 text-lg font-semibold">{tech.name}</h3>

              {/* 📊 Proficiency Bar with Animation */}
              <div className="w-full mt-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.proficiency}%` }}
                    transition={{
                      duration: 1,
                      delay: index * 0.1,
                      type: "tween",
                    }}
                    className="bg-purple-500 h-2 rounded-full"
                  />
                </div>
                <p className="text-xs mt-1">Proficiency: {tech.proficiency}%</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TechStacksSection;
