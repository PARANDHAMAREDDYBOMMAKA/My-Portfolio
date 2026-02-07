"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDevice } from "../hooks/useDevice";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const availableRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTouchDevice } = useDevice();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Title: per-character stagger reveal ──
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

      // ── Paragraphs: staggered line-by-line reveal with x-shift ──
      paragraphsRef.current.forEach((para, index) => {
        if (!para) return;
        const xDir = index % 2 === 0 ? -30 : 30;

        gsap.fromTo(
          para,
          { y: 40, x: isMobile ? 0 : xDir, opacity: 0 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: para,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ── Sidebar border draws in ──
      if (dividerRef.current && !isMobile) {
        gsap.fromTo(
          dividerRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sidebarRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Sidebar items: staggered fade + slide from right ──
      sidebarItemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      });

      // ── "Available" badge pulse scale ──
      if (availableRef.current) {
        gsap.fromTo(
          availableRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: availableRef.current,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Desktop parallax: sidebar moves slightly slower ──
      if (!isMobile && sidebarRef.current) {
        gsap.to(sidebarRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      // ── Hover interactions on sidebar items ──
      if (!isTouchDevice) {
        sidebarItemsRef.current.forEach((item) => {
          if (!item) return;
          const handleEnter = () => {
            gsap.to(item, {
              x: 6,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            });
          };
          const handleLeave = () => {
            gsap.to(item, {
              x: 0,
              scale: 1,
              duration: 0.4,
              ease: "elastic.out(1, 0.5)",
            });
          };
          item.addEventListener("mouseenter", handleEnter);
          item.addEventListener("mouseleave", handleLeave);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isTouchDevice]);

  const currentlyItems = [
    { label: "Building", value: "Full-stack apps with Next.js & Node" },
    { label: "Learning", value: "System design & cloud architecture" },
    { label: "Reading", value: "Clean Code by Robert C. Martin" },
    { label: "Exploring", value: "PostgreSQL performance tuning" },
  ];

  const titleText = "A bit about me";
  const titleChars = titleText.split("");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-(--bg-primary) overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-(--text-primary) mb-12 tracking-tight overflow-hidden"
          style={{ perspective: "400px" }}
        >
          {titleChars.map((char, i) => (
            <span
              key={i}
              ref={(el) => { if (el) titleCharsRef.current[i] = el; }}
              className="inline-block"
              style={{ transformStyle: "preserve-3d" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        {/* Asymmetric 3:2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Bio column (3/5) */}
          <div className="lg:col-span-3">
            <div className="space-y-5">
              {[
                <>I got into programming the way most people do &mdash; I wanted to build something and Googled my way through it. That first project was terrible, but the feeling of making something work on screen was enough to keep me going.</>,
                <>Since then, I&apos;ve been building full-stack web applications with React, Next.js, Node.js, and PostgreSQL. I care about writing code that other people (including future me) can actually read, and building interfaces that feel right to use.</>,
                <>When I&apos;m not coding, I&apos;m probably debugging why something broke in production, reading about system design patterns, or trying to convince myself that this time the side project will actually ship.</>,
                <>Based in India. Open to remote work and interesting conversations about tech.</>,
              ].map((content, i) => (
                <p
                  key={i}
                  ref={(el) => { paragraphsRef.current[i] = el; }}
                  className={`text-base md:text-lg leading-relaxed ${i === 3 ? "text-(--text-muted)" : "text-(--text-secondary)"}`}
                >
                  {content}
                </p>
              ))}
            </div>
          </div>

          {/* "Currently" sidebar (2/5) */}
          <div ref={sidebarRef} className="lg:col-span-2 relative">
            {/* Animated vertical divider */}
            <div
              ref={dividerRef}
              className="hidden lg:block absolute left-0 top-0 w-[1px] h-full bg-(--border-subtle) origin-top"
            />
            <div className="lg:pl-8">
              <h3 className="text-caption uppercase tracking-wider mb-6">
                Currently
              </h3>
              <div className="space-y-5">
                {currentlyItems.map((item, index) => (
                  <div
                    key={item.label}
                    ref={(el) => { sidebarItemsRef.current[index] = el; }}
                    className="cursor-default py-2 px-3 -mx-3 rounded-lg hover:bg-(--bg-card)/50 transition-colors duration-200"
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

              <div
                ref={availableRef}
                className="mt-8 pt-6 border-t border-(--border-subtle)"
              >
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
