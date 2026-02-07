"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const groupsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { isMobile, isTouchDevice } = useDevice();

  const techStacks: Technology[] = [
    { name: "React", icon: faReact, color: "#61DAFB", category: "Frontend" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", category: "Frontend" },
    { name: "HTML5", icon: faHtml5, color: "#E34F26", category: "Frontend" },
    { name: "CSS3", icon: faCss3Alt, color: "#1572B6", category: "Frontend" },
    { name: "Node.js", icon: faNodeJs, color: "#339933", category: "Backend" },
    { name: "Express.js", icon: SiExpress, color: "#ffffff", category: "Backend" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "Languages" },
    { name: "JavaScript", icon: faJs, color: "#F7DF1E", category: "Languages" },
    { name: "Python", icon: faPython, color: "#3776AB", category: "Languages" },
    { name: "C++", icon: SiCplusplus, color: "#00599C", category: "Languages" },
    { name: "Java", icon: faJava, color: "#ED8B00", category: "Languages" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "Database" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "Database" },
  ];

  const categories = Array.from(new Set(techStacks.map((tech) => tech.category)));

  const groupedTechs = categories.map((category) => ({
    category,
    techs: techStacks.filter((tech) => tech.category === category),
  }));

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // ── Title clip-path reveal ──
      gsap.fromTo(
        titleRef.current,
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

      // ── Group labels: horizontal slide ──
      labelsRef.current.forEach((label, index) => {
        if (!label) return;
        gsap.fromTo(
          label,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: label,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.05,
          }
        );
      });

      // ── Pills: alternating horizontal slide-in per group ──
      let runningPillIndex = 0;
      groupedTechs.forEach((group, groupIndex) => {
        const direction = groupIndex % 2 === 0 ? -60 : 60;

        group.techs.forEach((_, techIndex) => {
          const pill = pillsRef.current[runningPillIndex];
          if (!pill) { runningPillIndex++; return; }

          gsap.fromTo(
            pill,
            {
              x: direction,
              opacity: 0,
              scale: 0.8,
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: pill,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
              delay: techIndex * 0.06,
            }
          );
          runningPillIndex++;
        });
      });

      // ── Desktop: scroll-scrub parallax on rows ──
      if (!isMobile) {
        groupsRef.current.forEach((group, index) => {
          if (!group) return;
          const xDir = index % 2 === 0 ? -20 : 20;

          gsap.to(group, {
            x: xDir,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 3,
            },
          });
        });
      }

      // ── Mouse-follow magnetic + glow effect on pills ──
      if (!isTouchDevice) {
        pillsRef.current.forEach((pill) => {
          if (!pill) return;

          const handleMouseMove = (e: MouseEvent) => {
            const rect = pill.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(pill, {
              x: x * 0.2,
              y: y * 0.2,
              scale: 1.08,
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.15)",
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(pill, {
              x: 0,
              y: 0,
              scale: 1,
              boxShadow: "0 0 0px rgba(99, 102, 241, 0)",
              duration: 0.5,
              ease: "elastic.out(1, 0.4)",
            });
          };

          pill.addEventListener("mousemove", handleMouseMove);
          pill.addEventListener("mouseleave", handleMouseLeave);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, isMobile, isTouchDevice]);

  let pillIndex = 0;

  return (
    <section
      id="techstacks"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-(--bg-secondary) overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-(--text-primary) mb-4 tracking-tight"
          >
            My toolkit
          </h2>
          <div
            ref={lineRef}
            className="w-16 h-[2px] bg-(--primary) origin-left"
          />
        </div>

        <div className="space-y-10">
          {groupedTechs.map((group, groupIndex) => (
            <div
              key={group.category}
              ref={(el) => { groupsRef.current[groupIndex] = el; }}
            >
              <span
                ref={(el) => { labelsRef.current[groupIndex] = el; }}
                className="text-caption uppercase tracking-wider mb-4 block"
              >
                {group.category}
              </span>
              <div className="flex flex-wrap gap-3">
                {group.techs.map((tech) => {
                  const currentPillIndex = pillIndex++;
                  return (
                    <div
                      key={tech.name}
                      ref={(el) => { pillsRef.current[currentPillIndex] = el; }}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-(--bg-card) border border-(--border-subtle) hover:border-(--border-hover) cursor-default transition-colors duration-200"
                    >
                      <span style={{ color: tech.color }} className="flex-shrink-0">
                        {typeof tech.icon === "function" ? (
                          <tech.icon className="w-5 h-5" />
                        ) : (
                          <FontAwesomeIcon icon={tech.icon} className="w-5 h-5" />
                        )}
                      </span>
                      <span className="text-sm font-medium text-(--text-primary) whitespace-nowrap">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStacksSection;
