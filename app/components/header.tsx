"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Tech Stack", href: "#techstacks" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const { scrollY } = useScroll();

  const headerOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = NAV_ITEMS.map(item =>
        document.querySelector(item.href)
      );

      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(NAV_ITEMS[index].href);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // GSAP animation for nav items on mount
    gsap.fromTo(
      navItemsRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.2,
      }
    );

    // Add magnetic effect to nav items
    navItemsRef.current.forEach((item) => {
      if (!item) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(item, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      item.addEventListener("mousemove", handleMouseMove);
      item.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        item.removeEventListener("mousemove", handleMouseMove);
        item.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        isScrolled ? "w-auto" : "w-[95%] max-w-4xl"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="relative holographic-border rounded-full px-8 py-4"
        style={{
          backgroundColor: `rgba(26, 26, 36, ${headerOpacity})`,
          backdropFilter: `blur(${headerBlur}px)`,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Animated holographic gradient border */}
        <div className="absolute inset-0 rounded-full opacity-50 blur-sm">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] animate-pulse"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10">
          <ul className="flex items-center justify-center gap-8">
            {NAV_ITEMS.map((item, index) => (
              <motion.li
                key={item.name}
                ref={(el) => {
                  navItemsRef.current[index] = el;
                }}
                className="relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`relative text-base font-semibold tracking-wide transition-all duration-300 ${
                    activeSection === item.href
                      ? "text-[var(--neon-cyan)]"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {item.name}

                  {/* Hover underline effect */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] transition-all duration-300 ${
                      activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />

                  {/* Active indicator glow */}
                  {activeSection === item.href && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--neon-cyan)] opacity-20 blur-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Magnetic hover glow */}
                <motion.div
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] opacity-0 blur-lg group-hover:opacity-30 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                />
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-[var(--neon-cyan)] rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-[var(--neon-purple)] rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-[var(--neon-pink)] rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-[var(--neon-cyan)] rounded-br-lg" />
      </motion.div>
    </motion.header>
  );
};

export default Header;
