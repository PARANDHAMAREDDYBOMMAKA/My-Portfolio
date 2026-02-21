"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useDevice } from "../hooks/useDevice";
import { projects } from "../utils/data";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalProjects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDevice();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isMobile) return;

    const scrollContainer = scrollContainerRef.current;
    const trigger = triggerRef.current;
    if (!scrollContainer || !trigger) return;

    const totalWidth = scrollContainer.scrollWidth - window.innerWidth + 200;

    const ctx = gsap.context(() => {
      gsap.to(scrollContainer, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIndex = Math.min(
              Math.floor(progress * projects.length),
              projects.length - 1
            );
            setActiveIndex(newIndex);
          },
        },
      });
    });

    return () => ctx.revert();
  }, [isMobile, isMounted]);

  if (!isMounted) {
    return (
      <section id="projects" className="py-24 bg-(--bg-secondary)">
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-96 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (isMobile) {
    return (
      <section id="projects" className="py-24 bg-(--bg-secondary)">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-caption uppercase tracking-wider mb-4 block">Portfolio</span>
            <h2 className="text-4xl font-bold text-(--text-primary)">
              Featured Projects
            </h2>
          </div>
          <div className="space-y-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-(--bg-card) rounded-2xl overflow-hidden border border-(--border-subtle)"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-medium flex items-center gap-1">
                      <Sparkles size={12} />
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-(--text-primary)">{project.title}</h3>
                    <span className="text-xs font-mono text-(--text-muted) bg-(--bg-elevated) px-2 py-1 rounded">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-(--text-muted) text-sm mb-5 line-clamp-2">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--primary) text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
                  >
                    View Project <ArrowUpRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" ref={sectionRef} className="relative bg-(--bg-secondary)">
      <div ref={triggerRef} className="relative overflow-hidden">
        <div className="h-screen flex flex-col">
          <div className="pt-20 px-12 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-caption uppercase tracking-wider mb-3 block">Portfolio</span>
              <div className="flex items-end justify-between">
                <h2 className="text-5xl lg:text-6xl font-bold text-(--text-primary)">
                  Featured Projects
                </h2>
                <div className="hidden lg:flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    {projects.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === activeIndex ? "w-8 bg-(--primary)" : "bg-(--border-subtle)"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-(--text-muted) text-sm font-mono">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex-1 flex items-center gap-8 px-12 will-change-transform"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="shrink-0 w-[65vw] lg:w-[45vw] h-[65vh]"
                data-cursor="project"
                data-cursor-text="View"
              >
                <div className="group relative h-full rounded-3xl overflow-hidden bg-(--bg-card) border border-(--border-subtle) hover:border-(--primary)/40 transition-all duration-500 shadow-2xl shadow-black/20">
                  <div className="absolute inset-0">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 65vw, 45vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/20" />
                  </div>

                  <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-medium flex items-center gap-2">
                      <Sparkles size={12} />
                      Featured Project
                    </span>
                    <span className="text-5xl font-bold text-white/10 font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col">
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm lg:text-base max-w-lg mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative px-6 py-3 bg-white text-black font-medium rounded-xl flex items-center gap-2 overflow-hidden transition-transform hover:scale-105"
                        data-magnetic
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Live Demo <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </span>
                      </a>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        data-magnetic
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-linear-to-tr from-(--primary)/10 to-transparent" />
                  </div>
                </div>
              </div>
            ))}

            <div className="shrink-0 w-[30vw] h-[65vh] flex items-center justify-center">
              <div className="text-center">
                <p className="text-(--text-muted) text-lg mb-4">Want to see more?</p>
                <a
                  href="https://github.com/PARANDHAMAREDDYBOMMAKA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-(--border-subtle) rounded-xl text-(--text-primary) hover:bg-(--bg-card) transition-colors"
                  data-magnetic
                >
                  View All Projects <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="px-12 py-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-1 bg-(--border-subtle) rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-(--primary) to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                />
              </div>
              <span className="text-(--text-muted) text-sm">
                Scroll to explore
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalProjects;
