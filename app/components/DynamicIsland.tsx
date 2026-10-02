"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useDevice } from "../hooks/useDevice";
import { X, User, Briefcase, Code2, FolderGit2, Mail, ChevronRight } from "lucide-react";

const NAV_ITEMS = [
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: FolderGit2 },
  { name: "Skills", href: "#techstacks", icon: Code2 },
  { name: "Contact", href: "#contact", icon: Mail },
];

const DynamicIsland: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const islandRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDevice();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      const sections = NAV_ITEMS.map(item => document.querySelector(item.href));
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(NAV_ITEMS[index].href);
          }
        }
      });

      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    const element =
      document.querySelector(`[data-anchor="${href.slice(1)}"]`) ?? document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
      setIsExpanded(false);
    }
  };

  const getActiveLabel = () => {
    const active = NAV_ITEMS.find(item => item.href === activeSection);
    return active ? active.name : "Home";
  };

  return (
    <div className="no-print fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        ref={islandRef}
        className="relative"
        onHoverStart={() => !isMobile && setIsHovered(true)}
        onHoverEnd={() => !isMobile && setIsHovered(false)}
        initial={false}
      >
        <motion.div
          className="relative overflow-hidden cursor-pointer"
          style={{
            background: "rgba(255, 253, 247, 0.82)",
            backdropFilter: "blur(20px) saturate(1.3)",
            WebkitBackdropFilter: "blur(20px) saturate(1.3)",
            border: "1px solid rgba(192, 90, 61, 0.22)",
            boxShadow: "0 10px 34px rgba(84, 62, 38, 0.14)",
          }}
          animate={{
            width: isExpanded ? (isMobile ? 320 : 500) : isHovered ? 280 : isScrolled ? 200 : 180,
            height: isExpanded ? (isMobile ? 300 : 210) : 44,
            borderRadius: isExpanded ? 28 : 22,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          onClick={() => !isExpanded && setIsExpanded(true)}
        >
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="collapsed"
                className="flex items-center justify-between h-full px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden ring-2 ring-black/10">
                    <Image
                      src="/photo.jpeg"
                      alt="PR"
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                  <motion.span
                    className="text-(--text-primary) text-sm font-medium"
                    animate={{ opacity: isHovered || isScrolled ? 1 : 0.8 }}
                  >
                    {isScrolled ? getActiveLabel() : "Parandhama"}
                  </motion.span>
                </div>

                <motion.div
                  className="flex items-center gap-1"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                >
                  <span className="text-(--text-muted) text-xs">tap to expand</span>
                  <ChevronRight size={14} className="text-(--text-muted)" />
                </motion.div>

                {isScrolled && !isHovered && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                className="h-full p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-black/10">
                      <Image
                        src="/photo.jpeg"
                        alt="Parandhama Reddy"
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-(--text-primary) font-semibold text-sm">Parandhama Reddy</h3>
                      <p className="text-(--text-muted) text-xs">Full Stack Developer</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                    }}
                    className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
                  >
                    <X size={16} className="text-(--text-primary)" />
                  </button>
                </div>

                <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-5"} gap-2`}>
                  {NAV_ITEMS.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href;
                    return (
                      <motion.button
                        key={item.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavClick(item.href);
                        }}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-(--primary) text-white"
                            : "bg-black/5 text-(--text-secondary) hover:bg-black/10 hover:text-(--text-primary)"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon size={20} />
                        <span className="text-xs font-medium">{item.name}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-(--border-subtle) edition-line text-center">
                  Late Edition · Always shipping
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {isScrolled && !isExpanded && (
          <motion.div
            style={{ background: "linear-gradient(to right, var(--primary), var(--accent-warm))" }}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 40, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default DynamicIsland;
