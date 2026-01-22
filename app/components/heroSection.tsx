"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDevice } from "../hooks/useDevice";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDevice();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      entranceTl.fromTo(
        bgGlowRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );

      entranceTl.fromTo(
        profileRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.4)" },
        "-=1.5"
      );

      entranceTl.fromTo(
        greetingRef.current,
        { y: 100, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 },
        "-=0.8"
      );

      entranceTl.fromTo(
        nameRef.current,
        { y: 120, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
        "-=0.6"
      );

      entranceTl.fromTo(
        roleRef.current,
        { y: 80, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 },
        "-=0.7"
      );

      entranceTl.fromTo(
        descRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.5"
      );

      entranceTl.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );

      entranceTl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.3"
      );

      if (!isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        scrollTl.fromTo(bgGlowRef.current,
          { scale: 1, opacity: 0.15 },
          { scale: 3, opacity: 0, duration: 1 },
        0);

        scrollTl.fromTo(profileRef.current,
          { y: 0, scale: 1, opacity: 1 },
          { y: -300, scale: 1.3, opacity: 0, duration: 0.6 },
        0);

        scrollTl.fromTo(greetingRef.current,
          { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
          { y: -200, opacity: 0, clipPath: "inset(0% 0% 100% 0%)", duration: 0.5 },
        0.05);

        scrollTl.fromTo(nameRef.current,
          { y: 0, scale: 1, opacity: 1 },
          { y: -400, scale: 0.9, opacity: 0, duration: 0.8 },
        0.1);

        scrollTl.fromTo(roleRef.current,
          { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
          { y: -300, opacity: 0, clipPath: "inset(0% 0% 100% 0%)", duration: 0.6 },
        0.15);

        scrollTl.fromTo(descRef.current,
          { y: 0, opacity: 1 },
          { y: -150, opacity: 0, duration: 0.5 },
        0.2);

        scrollTl.fromTo(ctaRef.current,
          { y: 0, opacity: 1 },
          { y: 150, opacity: 0, duration: 0.4 },
        0.25);

        scrollTl.fromTo(scrollIndicatorRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 0.2 },
        0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/PARANDHAMAREDDYBOMMAKA", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/parandhama-reddy-bommaka/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:rparandhama63@gmail.com", label: "Email" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-(--bg-primary)"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={bgGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 md:w-225 md:h-225 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 60%)",
          opacity: 0.15,
          filter: "blur(80px)",
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={profileRef}
          className="mb-6 inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-(--primary)/40 ring-offset-4 ring-offset-(--bg-primary) shadow-2xl shadow-(--primary)/30">
              <Image
                src="/photo.jpeg"
                alt="Parandhama Reddy"
                width={160}
                height={160}
                priority
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-(--bg-card) border border-(--border-subtle) rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-(--text-secondary)">Available for work</span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={greetingRef}
          className="overflow-hidden mb-2"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="block text-xl md:text-2xl text-(--text-secondary) font-medium">
            Hello, I&apos;m
          </span>
        </div>

        <div
          ref={nameRef}
          className="overflow-hidden mb-3"
          style={{ transformStyle: "preserve-3d" }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-(--text-primary) tracking-tight leading-none">
            Parandhama Reddy
          </h1>
        </div>

        <div
          ref={roleRef}
          className="overflow-hidden mb-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="block text-2xl md:text-4xl font-semibold gradient-text-primary">
            Full Stack Developer
          </span>
        </div>

        <p
          ref={descRef}
          className="text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I craft modern web experiences with clean code and thoughtful design.
          Passionate about building products that make a difference.
        </p>

        <div ref={ctaRef} className="space-y-6" style={{ transformStyle: "preserve-3d" }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#projects">
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-(--primary) hover:bg-(--primary-dark) text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-2xl shadow-(--primary)/40"
              >
                View My Work
              </motion.button>
            </Link>

            <Link href="#contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-(--bg-elevated) border-2 border-(--border-default) hover:border-(--primary) text-(--text-primary) text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                Get in Touch
              </motion.button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                whileHover={{ scale: 1.2, y: -5, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-2xl bg-(--bg-card) border border-(--border-subtle) hover:border-(--primary) text-(--text-secondary) hover:text-(--primary) transition-all duration-300 shadow-lg"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-(--text-muted)"
        >
          <span className="text-sm uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-(--text-muted) flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-3 rounded-full bg-(--text-muted)"
            />
          </div>
        </motion.div>
      </div> */}
    </section>
  );
};

export default HeroSection;
