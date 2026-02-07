"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDevice } from "../hooks/useDevice";
import { Github, Linkedin, Mail } from "lucide-react";

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
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const bgGlow2Ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTouchDevice } = useDevice();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── ENTRANCE TIMELINE ──
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Dual glow blobs expand in
      entranceTl.fromTo(
        [bgGlowRef.current, bgGlow2Ref.current],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out", stagger: 0.3 }
      );

      // Accent line draws in
      entranceTl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power4.inOut" },
        "-=2"
      );

      // Annotation typewriter effect
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

      // Greeting clip-path reveal
      entranceTl.fromTo(
        greetingRef.current,
        { y: 40, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 },
        "-=0.5"
      );

      // Name — split each letter and stagger in
      if (nameRef.current) {
        const nameSpans = nameRef.current.querySelectorAll(".name-char");
        entranceTl.fromTo(
          nameSpans,
          { y: 120, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.2)",
          },
          "-=0.6"
        );
      }

      // Tagline slides up
      entranceTl.fromTo(
        taglineRef.current,
        { y: 60, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 },
        "-=0.5"
      );

      // Description fades in
      entranceTl.fromTo(
        descRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      );

      // CTA buttons
      entranceTl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      );

      // ── SCROLL-OUT: container scale + blur ──
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

        scrollTl.to([bgGlowRef.current, bgGlow2Ref.current], {
          scale: 2,
          opacity: 0,
          duration: 1,
        }, 0);
      }

      // ── MOUSE PARALLAX on glow blobs (desktop only) ──
      if (!isTouchDevice && containerRef.current) {
        const container = containerRef.current;
        const handleMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
          const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(bgGlowRef.current, {
            x: xRatio * 80,
            y: yRatio * 60,
            duration: 1.2,
            ease: "power2.out",
          });
          gsap.to(bgGlow2Ref.current, {
            x: xRatio * -50,
            y: yRatio * -40,
            duration: 1.5,
            ease: "power2.out",
          });
          // Subtle tilt on content
          gsap.to(contentRef.current, {
            rotateY: xRatio * 2,
            rotateX: -yRatio * 1.5,
            duration: 1,
            ease: "power2.out",
          });
        };

        container.addEventListener("mousemove", handleMouseMove);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile, isTouchDevice]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/PARANDHAMAREDDYBOMMAKA", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/parandhama-reddy-bommaka/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:rparandhama63@gmail.com", label: "Email" },
  ];

  // Split name into individual character spans for animation
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
      {/* Dual organic glow blobs */}
      <div
        ref={bgGlowRef}
        className="absolute top-1/4 left-1/5 w-125 h-100 md:w-200 md:h-150 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        ref={bgGlow2Ref}
        className="absolute bottom-1/4 right-1/5 w-100 h-88 md:w-150 md:h-125 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(249,115,22,0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-6 w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Accent line */}
        <div
          ref={lineRef}
          className="w-16 h-0.5 bg-(--primary) mb-8 origin-left"
        />

        {/* Monospace annotation — typewriter */}
        <div className="mb-6">
          <span ref={annotationRef} className="text-caption">
            {"// full-stack developer"}
          </span>
        </div>

        {/* Greeting */}
        <div ref={greetingRef} className="overflow-hidden mb-2">
          <span className="block text-lg md:text-xl text-(--text-secondary)">
            Hey, I&apos;m
          </span>
        </div>

        {/* Name with per-character animation */}
        <div ref={nameRef} className="overflow-hidden mb-4" style={{ perspective: "600px" }}>
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tight leading-none">
            {renderNameChars("Parandhama", "text-(--text-primary)")}
            <span className="name-char inline-block">&nbsp;</span>
            {renderNameChars("Reddy", "text-accent-italic")}
          </h1>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="overflow-hidden mb-8">
          <span className="block text-2xl md:text-3xl text-(--text-secondary) font-light">
            I build things for the web.
          </span>
        </div>

        {/* Bio */}
        <p
          ref={descRef}
          className="text-base md:text-lg text-(--text-muted) max-w-xl mb-10 leading-relaxed"
        >
          Currently obsessed with React ecosystems and figuring out why my
          PostgreSQL queries are slow at 3 AM. Based in India, shipping code worldwide.
        </p>

        {/* CTAs + Socials */}
        <div ref={ctaRef} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link href="#projects">
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-(--primary) hover:bg-(--primary-dark) text-white text-base font-medium rounded-xl transition-all duration-300 shadow-lg shadow-(--primary)/30"
              >
                See what I&apos;ve built
              </motion.button>
            </Link>

            <Link href="#contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-(--bg-elevated) border border-(--border-default) hover:border-(--primary) text-(--text-primary) text-base font-medium rounded-xl transition-all duration-300"
              >
                Say hello
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
    </section>
  );
};

export default HeroSection;
