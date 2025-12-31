"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDevice } from "../hooks/useDevice";
import {
  faInstagram,
  faGithub,
  faXTwitter,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { Mail } from "lucide-react";

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const socialRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { isMobile } = useDevice();

  const socialLinks = [
    {
      href: "https://github.com/PARANDHAMAREDDYBOMMAKA",
      icon: faGithub,
      color: "#ffffff",
      name: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/parandhama-reddy-bommaka/",
      icon: faLinkedin,
      color: "#0077B5",
      name: "LinkedIn",
    },
    {
      href: "https://x.com/PARANDHAMA123",
      icon: faXTwitter,
      color: "#1DA1F2",
      name: "Twitter",
    },
    {
      href: "https://www.instagram.com/parandhamareddybommaka/",
      icon: faInstagram,
      color: "#E1306C",
      name: "Instagram",
    },
    {
      href: "https://www.facebook.com/parandhamareddy.sunny/",
      icon: faFacebook,
      color: "#1877F2",
      name: "Facebook",
    },
  ];

  useEffect(() => {
    if (!isInView) return;

    if (titleRef.current) {
      const chars = titleRef.current.textContent?.split("") || [];
      titleRef.current.innerHTML = "";

      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        titleRef.current?.appendChild(span);
      });

      // Simpler animation on mobile
      gsap.fromTo(
        titleRef.current.children,
        { y: isMobile ? 50 : 100, opacity: 0, rotationX: isMobile ? 0 : -90 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: isMobile ? 0.5 : 0.8,
          stagger: isMobile ? 0.01 : 0.02,
          ease: isMobile ? "power2.out" : "back.out(1.7)",
        }
      );
    }

    socialRefs.current.forEach((social, index) => {
      if (!social) return;

      // Simpler animation on mobile
      gsap.fromTo(
        social,
        {
          y: isMobile ? 30 : 50,
          opacity: 0,
          scale: isMobile ? 0.8 : 0.5,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.5 : 0.8,
          delay: 0.5 + index * (isMobile ? 0.05 : 0.1),
          ease: isMobile ? "power2.out" : "back.out(1.7)",
        }
      );
    });
  }, [isInView, isMobile]);

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      className="relative py-20 px-4 md:px-8 bg-(--bg-darkest) text-white overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-(--neon-purple)/5 via-transparent to-(--neon-cyan)/5 animate-pulse" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-sm uppercase tracking-widest text-(--neon-cyan) font-semibold">
              Get In Touch
            </span>
          </motion.div>

          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-8 glow-text"
            style={{ perspective: "1000px" }}
          >
            Let's Connect
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Ready to bring your ideas to life? Let's create something extraordinary together.
          </motion.p>

          {/* Email */}
          <motion.a
            href="mailto:rparandhama63@gmail.com"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-(--neon-cyan) to-(--neon-purple) rounded-full font-semibold text-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={24} className="group-hover:rotate-12 transition-transform" />
            <span>rparandhama63@gmail.com</span>
          </motion.a>
        </div>

        {/* Social Links */}
        <div className="mt-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-gray-500 mb-8 uppercase tracking-wider text-sm"
          >
            Or find me on
          </motion.p>

          <div className="flex justify-center items-center gap-6 flex-wrap">
            {socialLinks.map((link, index) => (
              <a
                key={link.name}
                ref={(el) => {
                  socialRefs.current[index] = el;
                }}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <motion.div
                  className="relative flex items-center justify-center w-16 h-16 rounded-full glass-strong border-2 border-(--glass-border) hover:border-(--neon-cyan) transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="text-2xl transition-colors duration-300"
                    style={{ color: link.color }}
                  />

                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                    style={{ backgroundColor: link.color }}
                  />
                </motion.div>

                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-(--neon-cyan) animate-ping" />
      <div className="absolute bottom-40 right-20 w-3 h-3 rounded-full bg-(--neon-pink) animate-pulse" />
      <div className="absolute top-1/2 right-10 w-2 h-2 rounded-full bg-(--neon-purple) animate-ping" />
    </motion.section>
  );
};

export default ContactSection;
