"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../utils/data";
import ProjectCard from "./projectCard";
import { useDevice } from "../hooks/useDevice";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { isMobile } = useDevice();

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
          y: isMobile ? 50 : 150,
          opacity: 0,
          scale: isMobile ? 1 : 0.8,
          rotationY: isMobile ? 0 : -30,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: isMobile ? 0.6 : 1.2,
          delay: index * (isMobile ? 0.08 : 0.15),
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [isInView, isMobile]);

  return (
    <motion.section
      id="projects"
      ref={sectionRef}
      className="relative bg-(--bg-darkest) text-white overflow-hidden"
      style={{
        minHeight: '100vh',
        padding: 'clamp(3rem, 8vh, 5rem) clamp(1rem, 4vw, 2rem)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto max-w-7xl">
        <div style={{ marginBottom: 'clamp(2rem, 5vh, 4rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
            style={{ marginBottom: 'clamp(0.75rem, 2vh, 1rem)' }}
          >
            <span className="uppercase tracking-widest text-(--neon-cyan) font-semibold" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
              My Work
            </span>
          </motion.div>

          <h2
            ref={titleRef}
            className="font-bold text-center glow-text"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
              marginBottom: 'clamp(1rem, 3vh, 2rem)',
              perspective: "1000px"
            }}
          >
            Projects
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-gray-400 mx-auto"
            style={{
              fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
              maxWidth: 'min(90%, 48rem)',
            }}
          >
            Showcasing innovative solutions and creative implementations
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-(--neon-purple) animate-ping" />
      <div className="absolute bottom-40 left-10 w-2 h-2 rounded-full bg-(--neon-cyan) animate-pulse" />
    </motion.section>
  );
};

export default ProjectsSection;
