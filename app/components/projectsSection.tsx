"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../utils/data";
import ProjectCard from "./projectCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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

      gsap.fromTo(
        titleRef.current.children,
        { y: 100, opacity: 0, rotationX: -90 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(1.7)",
        }
      );
    }

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          y: 150,
          opacity: 0,
          scale: 0.8,
          rotationY: -30,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          delay: index * 0.15,
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
  }, [isInView]);

  return (
    <motion.section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 md:px-8 bg-[var(--bg-darkest)] text-white overflow-hidden"
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
            <span className="text-sm uppercase tracking-widest text-[var(--neon-cyan)] font-semibold">
              My Work
            </span>
          </motion.div>

          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-center mb-8 glow-text"
            style={{ perspective: "1000px" }}
          >
            Projects
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-center text-gray-400 max-w-3xl mx-auto"
          >
            Showcasing innovative solutions and creative implementations
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-[var(--neon-purple)] animate-ping" />
      <div className="absolute bottom-40 left-10 w-2 h-2 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
    </motion.section>
  );
};

export default ProjectsSection;
