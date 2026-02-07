"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDevice } from "../hooks/useDevice";
import {
  faInstagram,
  faGithub,
  faXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const replyRef = useRef<HTMLParagraphElement>(null);
  const emailCharsRef = useRef<HTMLSpanElement[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { isTouchDevice } = useDevice();

  const socialLinks = [
    {
      href: "https://github.com/PARANDHAMAREDDYBOMMAKA",
      icon: faGithub,
      name: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/parandhama-reddy-bommaka/",
      icon: faLinkedin,
      name: "LinkedIn",
    },
    {
      href: "https://x.com/PARANDHAMA123",
      icon: faXTwitter,
      name: "Twitter",
    },
    {
      href: "https://www.instagram.com/parandhamareddybommaka/",
      icon: faInstagram,
      name: "Instagram",
    },
  ];

  const emailAddress = "rparandhama63@gmail.com";

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // ── Overall scale-up reveal ──
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Title clip reveal ──
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Subtitle + reply text ──
      gsap.fromTo(
        [subtitleRef.current, replyRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Email: per-character stagger reveal ──
      if (emailCharsRef.current.length > 0) {
        gsap.fromTo(
          emailCharsRef.current,
          {
            y: 50,
            opacity: 0,
            rotateY: -60,
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Sketch underline draws in ──
      if (underlineRef.current) {
        gsap.fromTo(
          underlineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.7,
            duration: 0.8,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 62%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Social icons: staggered bounce in ──
      socialIconsRef.current.forEach((icon, index) => {
        if (!icon) return;
        gsap.fromTo(
          icon,
          { y: 30, opacity: 0, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.08,
          }
        );
      });

      // ── Magnetic social icons (desktop) ──
      if (!isTouchDevice) {
        socialIconsRef.current.forEach((icon) => {
          if (!icon) return;

          const handleMouseMove = (e: MouseEvent) => {
            const rect = icon.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(icon, {
              x: x * 0.3,
              y: y * 0.3,
              scale: 1.2,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(icon, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "elastic.out(1, 0.4)",
            });
          };

          icon.addEventListener("mousemove", handleMouseMove);
          icon.addEventListener("mouseleave", handleMouseLeave);
        });

        // ── Email hover wave effect ──
        const emailContainer = emailCharsRef.current[0]?.parentElement;
        if (emailContainer) {
          emailContainer.addEventListener("mouseenter", () => {
            emailCharsRef.current.forEach((charEl, i) => {
              if (!charEl) return;
              gsap.to(charEl, {
                y: -4,
                color: "var(--primary)",
                duration: 0.3,
                ease: "power2.out",
                delay: i * 0.015,
              });
            });
          });

          emailContainer.addEventListener("mouseleave", () => {
            emailCharsRef.current.forEach((charEl, i) => {
              if (!charEl) return;
              gsap.to(charEl, {
                y: 0,
                color: "var(--text-primary)",
                duration: 0.4,
                ease: "elastic.out(1, 0.5)",
                delay: i * 0.01,
              });
            });
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, isTouchDevice]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-(--bg-secondary) overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div ref={contentRef} className="text-center">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-(--text-primary) mb-4 tracking-tight"
          >
            Get in touch
          </h2>
          <p
            ref={subtitleRef}
            className="text-(--text-secondary) text-base md:text-lg mb-3 leading-relaxed"
          >
            I&apos;m always open to interesting conversations, new projects,
            or just a friendly hello.
          </p>
          <p
            ref={replyRef}
            className="text-(--text-muted) text-sm mb-12"
          >
            I usually reply within a day.
          </p>

          {/* Email as hero element with per-character animation */}
          <div className="mb-12 relative inline-block" style={{ perspective: "600px" }}>
            <a
              href={`mailto:${emailAddress}`}
              className="inline-block text-2xl md:text-4xl font-semibold transition-colors duration-300"
            >
              {emailAddress.split("").map((char, i) => (
                <span
                  key={i}
                  ref={(el) => { if (el) emailCharsRef.current[i] = el; }}
                  className="inline-block text-(--text-primary)"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char}
                </span>
              ))}
            </a>
            {/* Animated sketch underline */}
            <div
              ref={underlineRef}
              className="absolute -bottom-2 left-0 w-full h-2 origin-left"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 8'%3E%3Cpath d='M1 5.5 C 30 2, 50 7, 100 4 S 170 2, 199 5.5' stroke='%236366f1' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            />
          </div>

          {/* Social icons with magnetic effect */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={link.name}
                ref={(el) => { socialIconsRef.current[index] = el; }}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-elevated) transition-colors duration-200"
                aria-label={link.name}
              >
                <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
