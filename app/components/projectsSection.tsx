"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
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
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { isMobile, isTouchDevice } = useDevice();

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // ── Title reveal ──
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Accent line draws in ──
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Featured project: dramatic entrance ──
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current,
          {
            y: 80,
            opacity: 0,
            rotate: isMobile ? 0 : -1.5,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Cards: "dealt onto table" with varied rotation ──
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const rotations = [-2.5, 2, -1.5, 3, -2, 1.5];
        const rotateDir = isMobile ? 0 : (rotations[index % rotations.length]);

        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            rotate: rotateDir,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      });

      // ── Desktop: 3D tilt on hover ──
      if (!isTouchDevice) {
        const allCards = [featuredRef.current, ...cardsRef.current].filter(Boolean) as HTMLDivElement[];

        allCards.forEach((card) => {
          const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(card, {
              rotationY: x * 8,
              rotationX: -y * 5,
              scale: 1.02,
              boxShadow: `${x * -15}px ${y * 15}px 30px rgba(0,0,0,0.25)`,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              boxShadow: "0px 0px 0px rgba(0,0,0,0)",
              duration: 0.6,
              ease: "power3.out",
            });
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeave);
        });
      }

      // ── Desktop: subtle parallax depth on scroll ──
      if (!isMobile) {
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          const speed = 10 + (index % 3) * 8;

          gsap.to(card, {
            y: -speed,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, isMobile, isTouchDevice]);

  const [featured, ...rest] = projects;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-(--bg-primary) overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-(--text-primary) mb-3 tracking-tight"
          >
            Things I&apos;ve built
          </h2>
          <p
            ref={subtitleRef}
            className="text-(--text-muted) text-base mb-4"
          >
            A mix of side projects, client work, and things I built to learn something new.
          </p>
          <div
            ref={lineRef}
            className="w-16 h-[2px] bg-(--primary) origin-left"
          />
        </div>

        {/* Featured project (full-width, horizontal) */}
        <div
          ref={featuredRef}
          className="mb-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          <ProjectCard project={featured} index={0} featured />
        </div>

        {/* Remaining in 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <ProjectCard project={project} index={index + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
