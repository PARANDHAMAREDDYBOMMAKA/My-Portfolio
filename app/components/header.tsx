"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useDevice } from "../hooks/useDevice";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#techstacks" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const { isMobile } = useDevice();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

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
    if (isMobile) return;

    gsap.fromTo(
      navItemsRef.current,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.3,
      }
    );
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
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            isScrolled
              ? "py-3 bg-(--bg-primary)/80 backdrop-blur-lg border-b border-(--border-subtle)"
              : "py-5 bg-transparent"
          }`}
        >
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="relative z-10">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-(--border-default) ring-offset-2 ring-offset-(--bg-primary)">
                  <Image
                    src="/photo.jpeg"
                    alt="PR"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <span className="hidden sm:block font-semibold text-(--text-primary)">
                  Parandhama
                </span>
              </motion.div>
            </Link>

            <nav className="hidden md:block">
              <ul className="flex items-center gap-1">
                {NAV_ITEMS.map((item, index) => (
                  <li
                    key={item.name}
                    ref={(el) => {
                      navItemsRef.current[index] = el;
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === item.href
                          ? "text-(--text-primary)"
                          : "text-(--text-secondary) hover:text-(--text-primary)"
                      }`}
                    >
                      {item.name}
                      {activeSection === item.href && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-(--bg-elevated) rounded-lg -z-10"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.a
              href="mailto:rparandhama63@gmail.com"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-(--primary) hover:bg-(--primary-dark) text-white text-sm font-medium rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Email me
            </motion.a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-(--text-secondary) hover:text-(--text-primary) transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 left-4 right-4 z-50 md:hidden"
            >
              <div className="bg-(--bg-card) border border-(--border-default) rounded-2xl overflow-hidden shadow-2xl">
                <nav className="p-2">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          activeSection === item.href
                            ? "bg-(--bg-elevated) text-(--text-primary)"
                            : "text-(--text-secondary) hover:bg-(--bg-elevated) hover:text-(--text-primary)"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="p-4 border-t border-(--border-subtle)">
                  <a
                    href="mailto:rparandhama63@gmail.com"
                    className="block w-full py-3 bg-(--primary) hover:bg-(--primary-dark) text-white text-center font-medium rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Email me
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
