"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDevice } from "../hooks/useDevice";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Technology {
  name: string;
  icon: IconDefinition | IconType;
  color: string;
  proficiency: number;
  category: string;
  description: string;
}

const TechStacksSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { isMobile, isTouchDevice } = useDevice();

  const techStacks: Technology[] = [
    {
      name: "React",
      icon: faReact,
      color: "#61DAFB",
      proficiency: 95,
      category: "Frontend",
      description: "UI Library",
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      color: "#ffffff",
      proficiency: 90,
      category: "Frontend",
      description: "React Framework",
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      color: "#3178C6",
      proficiency: 85,
      category: "Languages",
      description: "Type-Safe JS",
    },
    {
      name: "JavaScript",
      icon: faJs,
      color: "#F7DF1E",
      proficiency: 95,
      category: "Languages",
      description: "Core Language",
    },
    {
      name: "Node.js",
      icon: faNodeJs,
      color: "#339933",
      proficiency: 90,
      category: "Backend",
      description: "Runtime Environment",
    },
    {
      name: "Express.js",
      icon: SiExpress,
      color: "#ffffff",
      proficiency: 85,
      category: "Backend",
      description: "Web Framework",
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      color: "#47A248",
      proficiency: 85,
      category: "Databases",
      description: "NoSQL Database",
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      color: "#4169E1",
      proficiency: 80,
      category: "Databases",
      description: "SQL Database",
    },
    {
      name: "Python",
      icon: faPython,
      color: "#3776AB",
      proficiency: 90,
      category: "Languages",
      description: "Versatile Language",
    },
    {
      name: "C++",
      icon: SiCplusplus,
      color: "#00599C",
      proficiency: 75,
      category: "Languages",
      description: "Systems Programming",
    },
    {
      name: "Java",
      icon: faJava,
      color: "#ED8B00",
      proficiency: 80,
      category: "Languages",
      description: "Enterprise Language",
    },
    {
      name: "HTML5",
      icon: faHtml5,
      color: "#E34F26",
      proficiency: 95,
      category: "Frontend",
      description: "Markup Language",
    },
    {
      name: "CSS3",
      icon: faCss3Alt,
      color: "#1572B6",
      proficiency: 90,
      category: "Frontend",
      description: "Styling Language",
    },
  ];

  const categories = [
    "All",
    ...Array.from(new Set(techStacks.map((tech) => tech.category))),
  ];

  const filteredTechs =
    activeCategory === "All"
      ? techStacks
      : techStacks.filter((tech) => tech.category === activeCategory);

  useEffect(() => {
    if (!isInView) return;

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
          duration: isMobile ? 0.5 : 0.8,
          stagger: isMobile ? 0.01 : 0.02,
          ease: isMobile ? "power2.out" : "back.out(1.7)",
        }
      );
    }

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      // Simpler animation on mobile
      gsap.fromTo(
        card,
        {
          y: isMobile ? 50 : 100,
          opacity: 0,
          rotationY: isMobile ? 0 : -90,
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: isMobile ? 0.6 : 1,
          delay: index * (isMobile ? 0.03 : 0.05),
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3D tilt effect on mousemove (disabled on mobile/touch devices)
      if (!isTouchDevice) {
        const handleMouseMove = (e: MouseEvent) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 10;
          const rotateY = -(x - centerX) / 10;

          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    });
  }, [isInView, filteredTechs, isMobile, isTouchDevice]);

  return (
    <motion.section
      id="techstacks"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 md:px-8 bg-(--bg-darkest) text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <span className="text-sm uppercase tracking-widest text-(--neon-cyan) font-semibold">
              Technologies & Tools
            </span>
          </motion.div>

          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-center mb-8 glow-text"
            style={{ perspective: "1000px" }}
          >
            Tech Stack
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-center text-gray-400 max-w-3xl mx-auto"
          >
            A comprehensive arsenal of modern technologies
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-3 rounded-full font-semibold transition-all ${
                activeCategory === category
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-linear-to-r from-(--neon-cyan) to-(--neon-purple) rounded-full"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 perspective-1000">
          {filteredTechs.map((tech, index) => (
            <div
              key={tech.name}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="perspective-card cyber-card rounded-2xl p-4 md:p-6 relative overflow-hidden group"
              style={{ transformStyle: isTouchDevice ? "flat" : "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-(--neon-cyan)/10 to-(--neon-purple)/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
                {/* Icon */}
                <div
                  className="mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                  style={{ filter: `drop-shadow(0 0 10px ${tech.color})` }}
                >
                  {typeof tech.icon === "function" ? (
                    <tech.icon className="text-6xl" style={{ color: tech.color }} />
                  ) : (
                    <FontAwesomeIcon
                      icon={tech.icon}
                      className="text-6xl"
                      style={{ color: tech.color }}
                    />
                  )}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold mb-1">{tech.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{tech.description}</p>

                {/* Proficiency Bar */}
                <div className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Proficiency</span>
                    <span className="text-(--neon-cyan) font-semibold">
                      {tech.proficiency}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-(--bg-elevated) rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${tech.proficiency}%` } : { width: 0 }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.05,
                        ease: "easeOut",
                      }}
                      className="h-full bg-linear-to-r from-(--neon-cyan) to-(--neon-purple)"
                      style={{
                        boxShadow: `0 0 10px ${tech.color}`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur-xl"
                style={{
                  background: `radial-gradient(circle at center, ${tech.color}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-3 h-3 rounded-full bg-(--neon-cyan) animate-ping" />
      <div className="absolute bottom-1/3 left-20 w-2 h-2 rounded-full bg-(--neon-pink) animate-pulse" />
    </motion.section>
  );
};

export default TechStacksSection;
