"use client";

import React from "react";
import { IconType } from "react-icons";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiGo,
  SiOpenjdk,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFastapi,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiPrometheus,
  SiGrafana,
  SiOpenai,
} from "react-icons/si";
import { useGazetteMotion } from "../utils/motion";

interface Technology {
  name: string;
  icon?: IconType;
  color?: string;
}

const groups: { category: string; techs: Technology[] }[] = [
  {
    category: "Languages",
    techs: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#c9a600" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "Java", icon: SiOpenjdk, color: "#ED8B00" },
    ],
  },
  {
    category: "GenAI and voice",
    techs: [
      { name: "LLM APIs", icon: SiOpenai, color: "#241c14" },
      { name: "RAG with Docling and pgvector" },
      { name: "Agentic tool calling" },
      { name: "Pipecat" },
      { name: "STT and TTS pipelines" },
      { name: "DeepEval" },
      { name: "vLLM" },
    ],
  },
  {
    category: "Backend",
    techs: [
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#241c14" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
    ],
  },
  {
    category: "Frontend",
    techs: [
      { name: "React", icon: SiReact, color: "#149eca" },
      { name: "Next.js", icon: SiNextdotjs, color: "#241c14" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    category: "Data",
    techs: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "Prisma", icon: SiPrisma, color: "#241c14" },
    ],
  },
  {
    category: "Infrastructure",
    techs: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
      { name: "Grafana", icon: SiGrafana, color: "#F46800" },
      { name: "KEDA" },
      { name: "Pulumi" },
    ],
  },
];

const TechStacksSection: React.FC = () => {
  const sectionRef = useGazetteMotion<HTMLElement>();

  return (
    <section
      id="techstacks"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-(--bg-secondary) overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <span data-ink className="byline block">The Almanac &mdash; tools of the trade</span>
          <h2 data-ink className="text-display text-4xl md:text-5xl text-(--text-primary) mt-3 tracking-tight">
            My toolkit
          </h2>
          <div data-rule className="rule-double mt-6" />
        </div>

        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.category} data-ink>
              <span className="text-caption uppercase tracking-wider mb-4 block">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2.5">
                {group.techs.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-(--bg-card) border border-(--border-subtle) hover:border-(--border-hover) hover:-translate-y-0.5 cursor-default transition-all duration-300 ease-(--ease-soft)"
                  >
                    {tech.icon && (
                      <span style={{ color: tech.color }} className="shrink-0">
                        <tech.icon className="w-5 h-5" />
                      </span>
                    )}
                    <span className="text-sm font-medium text-(--text-primary) whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStacksSection;
