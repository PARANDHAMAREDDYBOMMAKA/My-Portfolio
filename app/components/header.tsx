"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useDevice } from "../hooks/useDevice";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Tech Stack", href: "#techstacks" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const { scrollY } = useScroll();
  const { isMobile } = useDevice();

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
    // Only run animations on desktop where nav items exist
    if (isMobile) return;

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

    // Add magnetic effect to nav items (only on desktop)
    if (!isMobile) {
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
    }
  }, [isMobile]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        className={`fixed ${isMobile ? 'top-4 left-4 right-4' : 'top-6 left-1/2 -translate-x-1/2'} z-50 transition-all duration-500 ease-out ${
          isScrolled || isMobile ? "w-auto" : "w-[95%] max-w-4xl"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className={`relative holographic-border ${isMobile ? 'rounded-2xl' : 'rounded-full'} px-6 py-3 md:px-8 md:py-4`}
          style={{
            backgroundColor: `rgba(26, 26, 36, ${isMobile ? 0.95 : headerOpacity})`,
            backdropFilter: `blur(${isMobile ? 20 : headerBlur}px)`,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Animated holographic gradient border */}
          <div className={`absolute inset-0 ${isMobile ? 'rounded-2xl' : 'rounded-full'} opacity-50 blur-sm`}>
            <div className={`absolute inset-0 ${isMobile ? 'rounded-2xl' : 'rounded-full'} bg-linear-to-r from-(--neon-cyan) via-(--neon-purple) to-(--neon-pink) animate-pulse`}></div>
          </div>

          {/* Navigation */}
          <nav className="relative z-10">
            {isMobile ? (
              <div className="flex items-center justify-between">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-(--neon-cyan) shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                  <Image
                    src="/photo.jpeg"
                    alt="PR"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white p-2"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            ) : (
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
                          ? "text-(--neon-cyan)"
                          : "text-gray-300 hover:text-white"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                    >
                      {item.name}

                      {/* Hover underline effect */}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-(--neon-cyan) to-(--neon-purple) transition-all duration-300 ${
                          activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />

                      {/* Active indicator glow */}
                      {activeSection === item.href && (
                        <motion.span
                          layoutId="activeSection"
                          className="absolute inset-0 -z-10 rounded-full bg-(--neon-cyan) opacity-20 blur-xl"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Magnetic hover glow */}
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-(--neon-purple) to-(--neon-pink) opacity-0 blur-lg group-hover:opacity-30 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.5 }}
                    />
                  </motion.li>
                ))}
              </ul>
            )}
          </nav>

          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-(--neon-cyan) rounded-tl-lg" />
          <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-(--neon-purple) rounded-tr-lg" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-(--neon-pink) rounded-bl-lg" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-(--neon-cyan) rounded-br-lg" />
        </motion.div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-40 rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 26, 36, 0.98) 0%, rgba(18, 18, 24, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
          >
            <div className="p-6">
              <ul className="space-y-2">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`block relative overflow-hidden group transition-all duration-300 rounded-2xl ${
                        activeSection === item.href
                          ? "bg-linear-to-r from-(--neon-cyan)/20 to-(--neon-purple)/20"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                    >
                      <div className="relative z-10 py-4 px-5">
                        <span className={`text-lg font-semibold transition-colors ${
                          activeSection === item.href
                            ? "text-(--neon-cyan)"
                            : "text-gray-300 group-hover:text-white"
                        }`}>
                          {item.name}
                        </span>
                      </div>

                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-linear-to-r from-(--neon-cyan)/10 to-(--neon-purple)/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Active indicator */}
                      {activeSection === item.href && (
                        <motion.div
                          layoutId="activeMobileSection"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-(--neon-cyan) to-(--neon-purple) rounded-r-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bottom gradient accent */}
            <div className="h-1 bg-linear-to-r from-(--neon-cyan) via-(--neon-purple) to-(--neon-pink)" />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Header;
