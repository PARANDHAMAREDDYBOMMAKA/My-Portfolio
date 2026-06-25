"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDevice } from "../hooks/useDevice";
import { Building2, Calendar, MapPin, ExternalLink, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Experience {
  id: number;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "Product Fusion",
    companyUrl: "https://productfusion.co",
    location: "Remote",
    period: "2024 - Present",
    current: true,
    description: [
      "Building Agentic AI systems that automate complex workflows and decision-making processes",
      "Developing full-stack applications with React, Next.js, Node.js, and integrating AI/ML models",
      "Collaborating with cross-functional teams to ship production-ready features",
      "Implementing scalable backend architectures with real-time data processing capabilities",
    ],
    technologies: ["React", "Next.js", "Node.js", "Python", "AI/ML", "TypeScript", "PostgreSQL"],
  },
  {
    id: 2,
    role: "Student Developer",
    company: "Kalvium",
    companyUrl: "https://kalvium.com",
    location: "Hyderabad, India",
    period: "2022 - Present",
    current: true,
    description: [
      "Completed intensive full-stack development curriculum with hands-on project-based learning",
      "Built 6+ production-ready web applications solving real-world problems",
      "Mastered modern web technologies including React ecosystem, databases, and deployment",
      "Participated in hackathons and coding challenges, consistently ranking in top performers",
    ],
    technologies: ["JavaScript", "React", "MongoDB", "Express.js", "Git", "Agile"],
  },
];

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTouchDevice } = useDevice();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleCharsRef.current.length > 0) {
        gsap.fromTo(
          titleCharsRef.current,
          { y: 80, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (timelineRef.current && !isMobile) {
        gsap.fromTo(
          timelineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const xDir = index % 2 === 0 ? -50 : 50;

        gsap.fromTo(
          card,
          { x: isMobile ? 0 : xDir, opacity: 0, y: 30 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      if (!isTouchDevice) {
        cardsRef.current.forEach((card) => {
          if (!card) return;
          const handleEnter = () => {
            gsap.to(card, {
              y: -8,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            });
          };
          const handleLeave = () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "elastic.out(1, 0.5)",
            });
          };
          card.addEventListener("mouseenter", handleEnter);
          card.addEventListener("mouseleave", handleLeave);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isTouchDevice]);

  const titleText = "Where I've Worked";
  const titleChars = titleText.split("");

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-(--bg-primary) overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-(--text-primary) mb-16 tracking-tight overflow-hidden"
          style={{ perspective: "400px" }}
        >
          {titleChars.map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) titleCharsRef.current[i] = el;
              }}
              className="inline-block"
              style={{ transformStyle: "preserve-3d" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        <div className="relative">
          <div
            ref={timelineRef}
            className="hidden lg:block absolute left-1/2 top-0 w-0.5 h-full bg-linear-to-b from-(--primary) via-(--primary)/50 to-transparent origin-top"
            style={{ transform: "translateX(-50%)" }}
          />

          <div className="space-y-12 lg:space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`relative lg:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"
                }`}
              >
                <div
                  className="hidden lg:block absolute top-8 w-4 h-4 rounded-full bg-(--primary) border-4 border-(--bg-primary)"
                  style={{
                    [index % 2 === 0 ? "right" : "left"]: "-2.5rem",
                  }}
                />

                <div className="group relative p-6 md:p-8 rounded-2xl bg-(--bg-card) border border-(--border-subtle) hover:border-(--primary)/30 transition-all duration-300">
                  {exp.current && (
                    <div className="absolute -top-3 right-6">
                      <span className="px-3 py-1 text-xs font-medium bg-(--primary) text-white rounded-full">
                        Current
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-(--text-primary) mb-1">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-(--primary)">
                        <Building2 size={16} />
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                          >
                            {exp.company}
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span>{exp.company}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-(--text-muted)">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm md:text-base text-(--text-secondary) leading-relaxed pl-6 relative"
                      >
                        <ArrowUpRight
                          size={16}
                          className="absolute left-0 top-1 text-(--primary)"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-(--bg-elevated) text-(--text-muted) rounded-full border border-(--border-subtle) hover:border-(--primary)/50 hover:text-(--primary) transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
