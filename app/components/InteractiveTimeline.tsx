"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useDevice } from "../hooks/useDevice";
import { Building2, Calendar, MapPin, ChevronRight, Sparkles } from "lucide-react";

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
  color: string;
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
      "Building Agentic AI systems that automate complex workflows",
      "Developing full-stack applications with React, Next.js, Node.js",
      "Integrating AI/ML models into production systems",
    ],
    technologies: ["React", "Next.js", "Node.js", "Python", "AI/ML"],
    color: "#6366f1",
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
      "Completed intensive full-stack development curriculum",
      "Built 6+ production-ready web applications",
      "Mastered modern web technologies through project-based learning",
    ],
    technologies: ["JavaScript", "React", "MongoDB", "Express.js"],
    color: "#22c55e",
  },
];

const InteractiveTimeline: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<number>(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  useDevice();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 md:py-32 bg-(--bg-primary) overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          className="absolute top-1/3 left-0 w-96 h-96 rounded-full opacity-10 blur-[100px]"
          style={{ background: `radial-gradient(circle, ${experiences[0].color} 0%, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-caption uppercase tracking-wider mb-4 block">Career</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--text-primary)">
            Experience
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-4">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveId(exp.id)}
                  onMouseEnter={() => setHoveredId(exp.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeId === exp.id
                      ? "bg-(--bg-card) border-2"
                      : "bg-transparent border-2 border-transparent hover:bg-(--bg-card)/50"
                  }`}
                  style={{
                    borderColor: activeId === exp.id ? exp.color : "transparent",
                  }}
                  data-magnetic
                >
                  {exp.current && (
                    <div
                      className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                      style={{ backgroundColor: exp.color, color: "white" }}
                    >
                      <Sparkles size={10} />
                      Current
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${exp.color}20` }}
                    >
                      <Building2 size={24} style={{ color: exp.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-(--text-primary) mb-1">{exp.company}</h3>
                      <p className="text-sm text-(--text-muted)">{exp.role}</p>
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      width: activeId === exp.id || hoveredId === exp.id ? "100%" : "0%",
                    }}
                    className="absolute bottom-0 left-0 h-0.5 rounded-full"
                    style={{ backgroundColor: exp.color }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 hidden lg:flex justify-center">
            <div className="relative w-0.5 h-full bg-(--border-subtle)">
              <motion.div
                className="absolute top-0 left-0 w-full bg-(--primary)"
                style={{ height: lineHeight }}
              />
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-(--bg-primary)"
                  style={{
                    top: `${(index / (experiences.length - 1)) * 100}%`,
                    backgroundColor: activeId === exp.id ? exp.color : "var(--border-subtle)",
                  }}
                  animate={{
                    scale: activeId === exp.id ? 1.5 : 1,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {experiences.map(
                (exp) =>
                  activeId === exp.id && (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-(--bg-card) rounded-3xl p-8 md:p-10 border border-(--border-subtle)"
                    >
                      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-(--text-muted)">
                        <span className="flex items-center gap-2">
                          <Calendar size={16} />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin size={16} />
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-(--text-primary) mb-2">
                        {exp.role}
                      </h3>
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-lg mb-6 hover:underline"
                        style={{ color: exp.color }}
                      >
                        {exp.company}
                        <ChevronRight size={18} />
                      </a>

                      <ul className="space-y-4 mb-8">
                        {exp.description.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 text-(--text-secondary)"
                          >
                            <span
                              className="w-2 h-2 rounded-full mt-2 shrink-0"
                              style={{ backgroundColor: exp.color }}
                            />
                            {item}
                          </motion.li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 rounded-full text-sm font-medium border"
                            style={{
                              borderColor: `${exp.color}40`,
                              color: exp.color,
                              backgroundColor: `${exp.color}10`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;
