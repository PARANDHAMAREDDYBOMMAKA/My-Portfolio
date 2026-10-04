"use client";

import React from "react";
import { useGazetteMotion } from "../utils/motion";

const paragraphs = [
  <>I got into programming the way most people do &mdash; I wanted to build something and Googled my way through it. That first project was terrible, but the feeling of making something work on screen was enough to keep going.</>,
  <>Today I&apos;m a Full Stack Engineer intern at Product Fusion, working on Tone, an open-source platform for building AI voice agents. I built its retrieval pipeline on Docling and pgvector, selected embeddings with practical relevance, and kept the product focused on real agent workflows instead of demo-only UX.</>,
  <>I like the unglamorous middle of AI products: clean ingestion, honest latency numbers, autoscaling that lets a call survive a pod restart. On my own time I build things end to end to learn them properly, especially when they touch backend systems, infrastructure, or developer experience.</>,
  <>Studying Software Engineering at Kalvium, graduating 2027 with a CGPA of 9.4. Based in Hyderabad, India, and open to GenAI and full-stack roles.</>,
];

const currentlyItems = [
  { label: "Building", value: "Tone, an open-source AI voice agent platform, at Product Fusion" },
  { label: "Studying", value: "B.Tech Software Engineering, Kalvium (2023 to 2027) · CGPA: 9.4" },
  { label: "Stack", value: "Python, FastAPI, TypeScript, Next.js, Go, Kubernetes" },
  { label: "Location", value: "Hyderabad, India (UTC +05:30)" },
];

const AboutSection: React.FC = () => {
  const sectionRef = useGazetteMotion<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-(--bg-primary) overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <span data-ink className="byline block">The Profile &mdash; filed from Hyderabad</span>
          <h2 data-ink className="text-display text-4xl md:text-5xl text-(--text-primary) mt-3 tracking-tight">
            A bit about me
          </h2>
          <div data-rule className="rule-double mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="print-columns space-y-5">
              {paragraphs.map((content, i) => (
                <p
                  key={i}
                  data-ink
                  className={`text-base md:text-lg leading-relaxed ${i === 0 ? "dropcap" : ""} ${
                    i === 3 ? "text-(--text-muted)" : "text-(--text-secondary)"
                  }`}
                >
                  {content}
                </p>
              ))}
            </div>

            <blockquote data-ink className="pull-quote mt-10">
              &ldquo;I like turning fuzzy ideas into things that actually ship.&rdquo;
            </blockquote>
          </div>

          <div className="lg:col-span-2 relative">
            <div
              data-rule="y"
              className="hidden lg:block absolute left-0 top-0 w-px h-full bg-(--border-default)"
            />
            <div className="lg:pl-8">
              <h3 data-ink className="text-caption uppercase tracking-wider mb-6">
                Currently
              </h3>
              <div className="space-y-5">
                {currentlyItems.map((item) => (
                  <div
                    key={item.label}
                    data-ink
                    className="py-2 px-3 -mx-3 rounded-lg hover:bg-(--bg-card) transition-colors duration-300"
                  >
                    <span className="text-xs font-medium text-(--primary) uppercase tracking-wider">
                      {item.label}
                    </span>
                    <p className="text-sm text-(--text-secondary) mt-1 leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div data-ink className="mt-8 pt-6 border-t border-(--border-subtle)">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-(--text-muted)">Available for work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
