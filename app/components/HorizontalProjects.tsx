"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { useDevice } from "../hooks/useDevice";
import { projects, Project } from "../utils/data";
import { useGazetteMotion } from "../utils/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_WIDTH = 1280;

const LiveFrame: React.FC<{ url: string; title: string; proxyId?: number; overlay?: boolean }> = ({
  url,
  title,
  proxyId,
  overlay,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const fit = () => setBox({ width: el.clientWidth, height: el.clientHeight });
    fit();
    const sizeObserver = new ResizeObserver(fit);
    sizeObserver.observe(el);

    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          viewObserver.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    viewObserver.observe(el);

    return () => {
      sizeObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  const scale = box.width / FRAME_WIDTH;

  return (
    <div ref={boxRef} className={`absolute inset-0 overflow-hidden ${loaded || overlay ? "" : "img-loading"}`}>
      {near && scale > 0 && (
        <iframe
          src={proxyId ? `/api/preview?id=${proxyId}` : url}
          title={`Live preview of ${title}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          sandbox={proxyId ? "" : "allow-scripts allow-same-origin"}
          referrerPolicy="no-referrer"
          tabIndex={-1}
          className={`absolute left-0 top-0 origin-top-left border-0 pointer-events-none transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            width: FRAME_WIDTH,
            maxWidth: "none",
            height: Math.ceil(box.height / scale),
            transform: `scale(${scale})`,
          }}
        />
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title} live site`}
        className="group/open absolute inset-0 flex items-end justify-end p-4"
      >
        <span className="byline normal-case tracking-normal flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong text-(--text-primary) opacity-0 translate-y-1 group-hover/open:opacity-100 group-hover/open:translate-y-0 transition-all duration-300 ease-(--ease-soft)">
          Live now &middot; open site <ArrowUpRight size={13} />
        </span>
      </a>
    </div>
  );
};

const Screenshot: React.FC<{ project: Project }> = ({ project }) => {
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!project.link) return;
    let alive = true;
    fetch(`/api/preview?id=${project.id}&check=1`)
      .then((r) => r.json())
      .then((d) => {
        if (alive && d?.live) setLive(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [project.id, project.link]);

  return (
    <>
      <a
        href={project.link ?? project.repo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        className="absolute inset-0 overflow-hidden"
      >
        <Image
          src={project.imageUrl ?? ""}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(max-width: 1024px) 90vw, 45vw"
          className="object-cover object-top"
        />
      </a>
      {live && project.link && <LiveFrame url={project.link} title={project.title} overlay />}
    </>
  );
};

const Placard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="absolute inset-0 halftone bg-(--bg-tertiary) flex flex-col items-center justify-center text-center px-8">
    <span className="text-display italic text-4xl lg:text-5xl text-(--text-primary) ink-misreg">
      {project.title}
    </span>
    <span className="byline normal-case tracking-normal mt-4 max-w-xs">
      No public demo. This one runs on a server, so the source is the exhibit.
    </span>
  </div>
);

const ProjectCard: React.FC<{ project: Project; className?: string }> = ({ project, className = "" }) => (
  <article
    className={`project-card group flex flex-col rounded-2xl overflow-hidden bg-(--bg-card) border border-(--border-default) hover:border-(--border-hover) shadow-(--shadow-md) hover:shadow-(--shadow-lg) transition-all duration-500 ease-(--ease-soft) ${className}`}
  >
    <div className="project-preview relative flex-1 min-h-52 border-b border-(--border-default)">
      {project.imageUrl ? (
        <Screenshot project={project} />
      ) : project.link ? (
        <LiveFrame url={project.link} title={project.title} proxyId={project.proxy ? project.id : undefined} />
      ) : (
        <Placard project={project} />
      )}
    </div>
    <div className="p-6 lg:p-7">
      <span className="byline normal-case tracking-normal">{project.kicker}</span>
      <h3 className="text-display text-2xl lg:text-3xl text-(--text-primary) mt-1.5 mb-2.5">
        {project.title}
      </h3>
      <p className="text-(--text-secondary) text-sm lg:text-[0.95rem] leading-relaxed line-clamp-3 mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="text-caption">{project.tags.join(" / ")}</p>
        <div className="project-links flex items-center gap-4 text-sm font-medium">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline flex items-center gap-1 hover:text-(--primary) transition-colors"
            >
              Visit <ArrowUpRight size={15} />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline flex items-center gap-1.5 hover:text-(--primary) transition-colors"
            >
              <Github size={15} /> Source
            </a>
          )}
        </div>
      </div>
    </div>
  </article>
);

const HorizontalProjects: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDevice();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useGazetteMotion<HTMLElement>(`${isMounted}-${isMobile}`);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isMobile) return;

    const track = trackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            barRef.current?.style.setProperty("transform", `scaleX(${self.progress})`);
            setActiveIndex(
              Math.min(Math.round(self.progress * (projects.length - 1)), projects.length - 1)
            );
          },
        },
      });
    });

    return () => ctx.revert();
  }, [isMobile, isMounted]);

  const heading = (
    <>
      <span data-ink className="byline mb-3 block">The Portfolio &mdash; selected works</span>
      <h2 data-ink className="text-display text-4xl md:text-5xl lg:text-6xl text-(--text-primary)">
        Things I&rsquo;ve Built
      </h2>
    </>
  );

  if (!isMounted) {
    return <section id="projects" ref={sectionRef} className="sheet-edge relative min-h-screen bg-(--bg-secondary)" />;
  }

  if (isMobile) {
    return (
      <section id="projects" ref={sectionRef} className="sheet-edge relative py-24 bg-(--bg-secondary)">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            {heading}
            <div data-rule className="rule-double mt-6" />
          </div>
          <div className="space-y-8">
            {projects.map((project) => (
              <div key={project.id} data-ink>
                <ProjectCard project={project} className="min-h-[26rem]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" ref={sectionRef} className="sheet-edge relative bg-(--bg-secondary)">
      <div ref={triggerRef} className="projects-pin relative overflow-hidden bg-(--bg-secondary)">
        <div className="h-screen flex flex-col">
          <div className="projects-head pt-20 px-12 pb-5">
            <div className="flex items-end justify-between gap-8">
              <div>{heading}</div>
              <div className="hidden lg:flex items-center gap-6 pb-2">
                <div className="flex items-center gap-2">
                  {projects.map((project, i) => (
                    <div
                      key={project.id}
                      className={`h-1.5 rounded-full transition-all duration-500 ease-(--ease-soft) ${
                        i === activeIndex ? "w-8 bg-(--primary)" : "w-1.5 bg-(--border-default)"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-(--text-muted) text-sm font-mono tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          <div ref={trackRef} className="projects-track flex-1 min-h-0 flex items-stretch gap-8 px-12 py-2 will-change-transform">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} className="shrink-0 w-[62vw] lg:w-[44vw]" />
            ))}

            <div className="project-more shrink-0 w-[30vw] flex items-center justify-center">
              <div className="text-center">
                <p className="text-display italic text-2xl text-(--text-primary) mb-5">More in the archive</p>
                <a
                  href="https://github.com/PARANDHAMAREDDYBOMMAKA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-(--border-default) rounded-xl text-(--text-primary) hover:border-(--primary) hover:text-(--primary) transition-colors duration-300"
                >
                  All repositories <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="projects-foot px-12 py-5">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-(--border-default) overflow-hidden">
                <div
                  ref={barRef}
                  className="h-full origin-left bg-(--primary)"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <span className="byline normal-case tracking-normal">Keep scrolling to turn the page</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalProjects;
