"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Twitter, Hand } from "lucide-react";
import ParticlePhoto from "./ParticlePhoto";
import NewsTicker from "./NewsTicker";
import Seal from "./Seal";

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
        const text = "// full-stack engineer, voice AI";
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

    }, containerRef);

    return () => ctx.revert();
  }, []);

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
      className="relative min-h-screen flex flex-col pt-24 md:pt-20 pb-16 overflow-hidden bg-(--bg-primary) print:pt-0!"
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
        className="relative z-10 flex flex-1 flex-col max-w-7xl mx-auto px-6 w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Masthead — pinned to the top so it always clears the floating nav */}
        <div className="shrink-0">
          <div className="flex items-center justify-between edition-line pb-2.5 gap-3">
            <span>Est. 2023</span>
            <span className="hidden sm:inline-flex items-center gap-3 tracking-[0.28em] text-center">
              <Seal size={22} />
              The Developer&rsquo;s Gazette
            </span>
            <span className="text-right">Hyderabad&nbsp;·&nbsp;IN</span>
          </div>
          <div className="rule-double" />
          <div className="flex items-center justify-between edition-line pt-2 gap-3">
            <span>
              Vol. I<span className="hidden sm:inline"> — Full-Stack Edition</span>
            </span>
            <span className="text-right">No. 001</span>
          </div>
          <div className="mt-3">
            <NewsTicker />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center flex-1 py-8 lg:py-0">
          <div>
            <div
              ref={lineRef}
              className="w-16 h-0.5 bg-(--primary) mb-8 origin-left"
            />

            <div className="mb-6">
              <span ref={annotationRef} className="text-caption">
                {"// full-stack engineer, voice AI"}
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
                className="text-display ink-misreg text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight"
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
                I build <span className="underline-sketch text-(--text-primary)">AI voice agents</span> &amp; the systems behind them
              </span>
            </div>

            <p
              ref={descRef}
              className="text-base md:text-lg text-(--text-muted) max-w-xl mb-8 leading-relaxed"
            >
              Full-stack engineer intern at Product Fusion, working on Tone, an
              open-source AI voice agent platform. I build retrieval pipelines,
              self-host speech and language models on GPU Kubernetes, and ship
              the Next.js front end around them. Based in Hyderabad.
            </p>

            <div ref={ctaRef} className="space-y-6">
              <div className="stamp text-[0.7rem]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-(--primary) opacity-70 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-(--primary)" />
                </span>
                Open for work · 2026
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4 print:hidden">
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

              <p className="hidden print:block text-sm text-(--text-secondary)">
                rparandhama63@gmail.com &nbsp;|&nbsp; github.com/PARANDHAMAREDDYBOMMAKA &nbsp;|&nbsp;
                linkedin.com/in/parandhama-reddy-bommaka
              </p>

              <div className="flex items-center gap-3 print:hidden">
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

          <div className="hidden lg:block relative print:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="relative"
            >
              <ParticlePhoto imageSrc="/photo.jpeg" className="w-full h-125" />
            </motion.div>

            {/* Margin note — drawn by an actual hand */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.7 }}
              className="absolute -bottom-2 -right-2 max-w-[190px] text-right pointer-events-none"
            >
              <span className="handwritten text-2xl leading-tight">
                yep — that&rsquo;s me,<br />drawn in a few thousand ink dots
              </span>
              <span className="handwritten-arrow block text-3xl -mt-1 mr-6">↖</span>
            </motion.div>
          </div>
        </div>

        <div className="lg:hidden mt-12 print:hidden">
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
