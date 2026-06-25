"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDevice } from "../hooks/useDevice";
import { Github, Linkedin, Mail, Twitter, Hand } from "lucide-react";
import ParticlePhoto from "./ParticlePhoto";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const annotationRef = useRef<HTMLSpanElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDevice();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      entranceTl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power4.inOut" },
        0
      );

      if (annotationRef.current) {
        const text = "// full-stack developer";
        annotationRef.current.textContent = "";
        text.split("").forEach((char, i) => {
          entranceTl.to(annotationRef.current, {
            duration: 0.03,
            onComplete: () => {
              if (annotationRef.current) {
                annotationRef.current.textContent = text.slice(0, i + 1);
              }
            },
          }, `-=${i === 0 ? 1.6 : 0.015}`);
        });
      }

      entranceTl.fromTo(
        greetingRef.current,
        { y: 40, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 },
        "-=0.5"
      );

      if (nameRef.current) {
        const nameSpans = nameRef.current.querySelectorAll(".name-char");
        entranceTl.fromTo(
          nameSpans,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.045,
            ease: "power4.out",
          },
          "-=0.6"
        );
      }

      entranceTl.fromTo(
        taglineRef.current,
        { y: 60, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 },
        "-=0.5"
      );

      entranceTl.fromTo(
        descRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      );

      entranceTl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      );

      if (!isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=80%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        scrollTl.to(contentRef.current, {
          scale: 0.92,
          opacity: 0,
          filter: "blur(12px)",
          y: -60,
          duration: 1,
        }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/PARANDHAMAREDDYBOMMAKA", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/parandhama-reddy-bommaka/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/PARANDHAMA123", label: "Twitter" },
    { icon: Mail, href: "mailto:rparandhama63@gmail.com", label: "Email" },
  ];

  const renderNameChars = (text: string, className: string) =>
    text.split("").map((char, i) => (
      <span
        key={`${text}-${i}`}
        className={`name-char inline-block ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-(--bg-primary)"
      style={{ perspective: "1200px" }}
    >
      {/* Soft warm glows */}
      <div
        className="absolute top-1/4 left-1/5 w-125 h-100 md:w-200 md:h-150 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(224,122,95,0.16) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-100 h-88 md:w-150 md:h-125 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(224,164,88,0.09) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div
              ref={lineRef}
              className="w-16 h-0.5 bg-(--primary) mb-8 origin-left"
            />

            <div className="mb-6">
              <span ref={annotationRef} className="text-caption">
                {"// full-stack developer"}
              </span>
            </div>

            <div ref={greetingRef} className="overflow-hidden mb-2">
              <span className="block text-lg md:text-xl text-(--text-secondary)">
                hey, i&apos;m
                <Hand
                  size={20}
                  className="inline-block ml-1.5 -mt-1 text-(--accent) origin-bottom-right animate-[wave_2.4s_ease-in-out_1.5s_2]"
                />
              </span>
            </div>

            <div ref={nameRef} className="mb-4">
              <h1
                className="text-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight"
                style={{ lineHeight: 1.04 }}
              >
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="inline-block whitespace-nowrap">
                    {renderNameChars("Parandhama", "text-(--text-primary)")}
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="inline-block whitespace-nowrap">
                    {renderNameChars("Reddy", "text-accent-italic")}
                  </span>
                </span>
              </h1>
            </div>

            <div ref={taglineRef} className="overflow-hidden mb-6">
              <span className="block text-xl sm:text-2xl md:text-3xl text-(--text-secondary) font-light">
                I build <span className="underline-sketch text-(--text-primary)">agentic AI</span> &amp; the web apps around it
              </span>
            </div>

            <p
              ref={descRef}
              className="text-base md:text-lg text-(--text-muted) max-w-xl mb-8 leading-relaxed"
            >
              Full-stack developer at Product Fusion. I like turning fuzzy ideas into
              things that actually ship — lately, intelligent systems built with React,
              Next.js and a fair bit of AI/ML. Based in Hyderabad, writing code for
              the world.
            </p>

            <div ref={ctaRef} className="space-y-6">
              <div className="inline-flex items-center gap-2 text-sm text-(--text-secondary)">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-(--accent-cool) opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-(--accent-cool)" />
                </span>
                available for new work
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="#projects">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3.5 bg-(--primary) hover:bg-(--primary-dark) text-white text-base font-medium rounded-xl transition-all duration-300 shadow-lg shadow-(--primary)/30"
                  >
                    See my work
                  </motion.button>
                </Link>

                <Link href="#experience">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3.5 bg-(--bg-elevated) border border-(--border-default) hover:border-(--primary) text-(--text-primary) text-base font-medium rounded-xl transition-all duration-300"
                  >
                    My experience
                  </motion.button>
                </Link>
              </div>

              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 + index * 0.1 }}
                    whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-(--bg-card) border border-(--border-subtle) hover:border-(--primary)/50 text-(--text-muted) hover:text-(--primary) transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="relative"
            >
              <ParticlePhoto imageSrc="/photo.jpeg" className="w-full h-125" />
            </motion.div>
          </div>
        </div>

        <div className="lg:hidden mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="relative"
          >
            <ParticlePhoto imageSrc="/photo.jpeg" className="w-full h-87.5" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
