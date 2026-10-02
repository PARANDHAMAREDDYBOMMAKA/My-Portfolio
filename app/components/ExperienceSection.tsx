"use client";

import React from "react";
import { Building2, Calendar, MapPin, ExternalLink, ArrowUpRight } from "lucide-react";
import { useGazetteMotion } from "../utils/motion";

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
    role: "Full Stack Engineer (Intern)",
    company: "Product Fusion",
    companyUrl: "https://productfusion.co",
    location: "Hyderabad, Telangana",
    period: "May 2025 - Present",
    current: true,
    description: [
      "Working on Tone, an open-source AI voice agent platform built on FastAPI, Next.js, Pipecat and Kubernetes",
      "Built the RAG pipeline: Docling parsing, OpenAI and Gemini embeddings, and pgvector retrieval, run as a background worker",
      "Self-hosted STT, TTS and LLM models on GPU Kubernetes with vLLM and NVIDIA Riva, with KEDA autoscaling and drain-safe shutdown so live calls survive pod termination",
      "Built the eval and benchmark layer: a DeepEval tool-call harness, latency benchmarks with percentiles, and per-call cost tracking",
      "Added web calling over WebRTC and phone calling through Twilio and Telnyx, plus Salesforce and HubSpot as agent tools",
      "Led a production hotfix in 2026, from root cause through deployment",
    ],
    technologies: ["Python", "FastAPI", "Next.js", "Pipecat", "pgvector", "vLLM", "Kubernetes", "KEDA"],
  },
  {
    id: 2,
    role: "B.Tech, Software Engineering",
    company: "The Apollo University",
    location: "Chittoor, Andhra Pradesh",
    period: "2023 - 2027",
    current: true,
    description: [
      "CGPA 8.6 out of 10",
      "Solo-built full-stack projects alongside coursework, including FarmCon, ClaimGuard and a Kubernetes-as-a-service API in Go",
      "Trained and shipped SpamGuard, a spam classifier served through a Flask API",
    ],
    technologies: ["Java", "Python", "Go", "TypeScript", "PostgreSQL"],
  },
];

const ExperienceSection: React.FC = () => {
  const sectionRef = useGazetteMotion<HTMLElement>();

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-(--bg-primary) overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <span data-ink className="byline block">The Record &mdash; career to date</span>
          <h2 data-ink className="text-display text-4xl md:text-5xl text-(--text-primary) mt-3 tracking-tight">
            Work and study
          </h2>
          <div data-rule className="rule-double mt-6" />
        </div>

        <div className="relative">
          <div
            data-rule="y"
            className="hidden lg:block absolute left-1/2 top-0 -ml-px w-0.5 h-full bg-linear-to-b from-(--primary) via-(--primary)/50 to-transparent"
          />

          <div className="space-y-12 lg:space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                data-ink
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

                <div className="print-card group relative p-6 md:p-8 rounded-2xl bg-(--bg-card) border border-(--border-subtle) hover:border-(--primary)/30 hover:-translate-y-1 hover:shadow-(--shadow-md) transition-all duration-500 ease-(--ease-soft)">
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

                    <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-(--text-muted) shrink-0">
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
