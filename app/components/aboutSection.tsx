"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Briefcase, Lightbulb, Target } from "lucide-react";
import { useDevice } from "../hooks/useDevice";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { isMobile } = useDevice();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        scrollTl.fromTo(labelRef.current,
          { y: 50, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.15 },
        0);

        scrollTl.fromTo(titleRef.current,
          { y: 100, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.2 },
        0.05);

        scrollTl.fromTo(subtitleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.15 },
        0.15);


        scrollTl.fromTo(profileRef.current,
          { x: -150, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 0.2 },
        0.25);

        scrollTl.fromTo(bioRef.current,
          { x: 150, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 0.2 },
        0.3);

        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          scrollTl.fromTo(card,
            { y: 80, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.12 },
          0.4 + index * 0.05);
        });

        scrollTl.to(labelRef.current,
          { y: -100, opacity: 0, duration: 0.15 },
        0.65);

        scrollTl.to(titleRef.current,
          { y: -200, opacity: 0, clipPath: "inset(0% 0% 100% 0%)", duration: 0.2 },
        0.68);

        scrollTl.to(subtitleRef.current,
          { y: -150, opacity: 0, duration: 0.15 },
        0.7);

        scrollTl.to(profileRef.current,
          { x: -200, y: -100, opacity: 0, scale: 0.8, duration: 0.2 },
        0.72);

        scrollTl.to(bioRef.current,
          { x: 200, y: -100, opacity: 0, scale: 0.8, duration: 0.2 },
        0.74);

        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          const xDir = index % 2 === 0 ? -150 : 150;
          const yDir = index < 2 ? -100 : 100;
          scrollTl.to(card,
            { x: xDir, y: yDir, opacity: 0, scale: 0.7, duration: 0.15 },
          0.78 + index * 0.03);
        });

        ScrollTrigger.create({
          trigger: statsRef.current[0],
          start: "top 80%",
          onEnter: () => {
            statsRef.current.forEach((stat) => {
              if (!stat) return;
              const countEl = stat.querySelector(".stat-value");
              if (!countEl) return;
              const targetValue = parseInt(countEl.textContent?.replace("+", "") || "0");
              const counter = { value: 0 };
              gsap.to(counter, {
                value: targetValue,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  countEl.textContent = Math.floor(counter.value) + "+";
                },
              });
            });
          },
          once: true,
        });
      } else {
        gsap.fromTo(
          [labelRef.current, titleRef.current, subtitleRef.current],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          [profileRef.current, bioRef.current],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
              trigger: profileRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "10+", label: "Projects Completed" },
    { value: "13+", label: "Technologies" },
  ];

  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable code following best practices and modern standards.",
    },
    {
      icon: Briefcase,
      title: "Full Stack",
      description: "End-to-end development from database design to polished user interfaces.",
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Turning complex challenges into elegant, user-friendly solutions.",
    },
    {
      icon: Target,
      title: "Goal Oriented",
      description: "Focused on delivering results that drive business value and user satisfaction.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-(--bg-primary) overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            ref={labelRef}
            className="section-label mb-4 block"
          >
            About Me
          </span>
          <h2
            ref={titleRef}
            className="section-title mb-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            Crafting Digital Experiences
          </h2>
          <p
            ref={subtitleRef}
            className="section-subtitle mx-auto"
          >
            A passionate developer focused on building products that make a difference
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div
            ref={profileRef}
            className="lg:col-span-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="card-elevated h-full p-8 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-(--primary) to-(--primary-dark) opacity-20 blur-xl animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-(--bg-elevated)">
                  <Image
                    src="/photo.jpeg"
                    alt="Parandhama Reddy"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-(--text-primary) mb-1">
                Parandhama Reddy
              </h3>
              <p className="text-(--text-secondary) mb-4">Full Stack Developer</p>

              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-(--text-muted)">Available for work</span>
              </div>

              <div className="w-full mt-8 pt-6 border-t border-(--border-subtle)">
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      ref={(el) => { statsRef.current[index] = el; }}
                      className="text-center"
                    >
                      <div className="stat-value text-2xl font-bold text-(--text-primary)">
                        {stat.value}
                      </div>
                      <div className="text-xs text-(--text-muted) mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div
              ref={bioRef}
              className="card p-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="text-lg font-semibold text-(--text-primary) mb-4">
                About Me
              </h3>
              <p className="text-(--text-secondary) leading-relaxed mb-4">
                I&apos;m a Full Stack Developer with a passion for creating intuitive and impactful
                digital experiences. With expertise in modern web technologies, I specialize in
                building scalable applications that solve real-world problems.
              </p>
              <p className="text-(--text-secondary) leading-relaxed">
                My journey in software development has been driven by curiosity and a commitment
                to continuous learning. I believe in writing clean, maintainable code and
                creating products that users love.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="card p-6 group hover:border-(--primary)/30 transition-all duration-300 cursor-default"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-(--primary)/10 flex items-center justify-center mb-4 group-hover:bg-(--primary)/20 group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-(--primary)" />
                  </div>
                  <h4 className="font-semibold text-(--text-primary) mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-(--text-secondary) leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
