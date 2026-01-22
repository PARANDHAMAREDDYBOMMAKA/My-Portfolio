"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  category: string;
}

const TechStacksSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { isMobile, isTouchDevice } = useDevice();

  const techStacks: Technology[] = [
    { name: "React", icon: faReact, color: "#61DAFB", category: "Frontend" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", category: "Frontend" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "Languages" },
    { name: "JavaScript", icon: faJs, color: "#F7DF1E", category: "Languages" },
    { name: "Node.js", icon: faNodeJs, color: "#339933", category: "Backend" },
    { name: "Express.js", icon: SiExpress, color: "#ffffff", category: "Backend" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "Database" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "Database" },
    { name: "Python", icon: faPython, color: "#3776AB", category: "Languages" },
    { name: "C++", icon: SiCplusplus, color: "#00599C", category: "Languages" },
    { name: "Java", icon: faJava, color: "#ED8B00", category: "Languages" },
    { name: "HTML5", icon: faHtml5, color: "#E34F26", category: "Frontend" },
    { name: "CSS3", icon: faCss3Alt, color: "#1572B6", category: "Frontend" },
  ];

  const categories = ["All", ...Array.from(new Set(techStacks.map((tech) => tech.category)))];

  const filteredTechs =
    activeCategory === "All"
      ? techStacks
      : techStacks.filter((tech) => tech.category === activeCategory);

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        scrollTl.fromTo(labelRef.current,
          { y: 40, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.1 },
        0);

        scrollTl.fromTo(titleRef.current,
          { y: 80, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.15 },
        0.03);

        scrollTl.fromTo(subtitleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.1 },
        0.1);

        scrollTl.fromTo(filterRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.1 },
        0.18);

        const cols = 5;
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          const row = Math.floor(index / cols);
          const col = index % cols;
          const waveOffset = (row + col) * 0.015;

          scrollTl.fromTo(card,
            { y: 60, opacity: 0, scale: 0.85, rotateY: -15 },
            { y: 0, opacity: 1, scale: 1, rotateY: 0, duration: 0.08 },
          0.25 + waveOffset);
        });

        scrollTl.to(labelRef.current,
          { y: -80, opacity: 0, duration: 0.1 },
        0.7);

        scrollTl.to(titleRef.current,
          { y: -150, opacity: 0, clipPath: "inset(0% 0% 100% 0%)", duration: 0.12 },
        0.72);

        scrollTl.to(subtitleRef.current,
          { y: -100, opacity: 0, duration: 0.1 },
        0.74);

        scrollTl.to(filterRef.current,
          { y: -60, opacity: 0, duration: 0.08 },
        0.75);

        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          const row = Math.floor(index / cols);
          const col = index % cols;
          const xDir = (col - 2) * 80;
          const yDir = (row - 1) * 60;
          const waveOffset = (row + col) * 0.01;

          scrollTl.to(card,
            { x: xDir, y: yDir - 50, opacity: 0, scale: 0.7, rotateY: (col - 2) * 10, duration: 0.1 },
          0.78 + waveOffset);
        });

      } else {
        gsap.fromTo(
          [labelRef.current, titleRef.current, subtitleRef.current],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
              delay: (index % 3) * 0.05,
            }
          );
        });
      }

      if (!isTouchDevice) {
        cardsRef.current.forEach((card) => {
          if (!card) return;

          const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(card, {
              x: x * 0.15,
              y: y * 0.15,
              scale: 1.08,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "elastic.out(1, 0.5)",
            });
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeave);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, activeCategory, isMobile, isTouchDevice]);

  return (
    <section
      id="techstacks"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 bg-(--bg-secondary) overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <span
            ref={labelRef}
            className="section-label mb-4 block"
          >
            Skills
          </span>
          <h2
            ref={titleRef}
            className="section-title mb-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            Technologies I Work With
          </h2>
          <p
            ref={subtitleRef}
            className="section-subtitle mx-auto"
          >
            A curated set of modern tools and technologies I use to build great products
          </p>
        </div>

        <div
          ref={filterRef}
          className="flex justify-center flex-wrap gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                activeCategory === category
                  ? "bg-(--primary) text-white shadow-lg shadow-(--primary)/25"
                  : "bg-(--bg-elevated) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-card)"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTechs.map((tech, index) => (
              <motion.div
                key={tech.name}
                ref={(el) => { cardsRef.current[index] = el; }}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="card p-6 flex flex-col items-center text-center group hover:border-(--border-hover) cursor-default"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="mb-4"
                  style={{ color: tech.color }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {typeof tech.icon === "function" ? (
                    <tech.icon className="w-10 h-10" />
                  ) : (
                    <FontAwesomeIcon icon={tech.icon} className="w-10 h-10" />
                  )}
                </motion.div>
                <span className="text-sm font-medium text-(--text-primary)">
                  {tech.name}
                </span>
                <span className="text-xs text-(--text-muted) mt-1">
                  {tech.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TechStacksSection;
