"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";

const randomFacts = [
  "I debug with console.log and I'm not ashamed.",
  "My first website used <marquee> tags. Unironically.",
  "I once spent 4 hours on a bug that was a missing semicolon.",
  "This portfolio was not built by AI. I promise.",
  "I have strong opinions about tabs vs spaces. (Tabs.)",
  "My git commit messages get worse after midnight.",
  "I still Google 'how to center a div' sometimes.",
  "Coffee count today: probably too many.",
];

const Footer: React.FC = () => {
  const [factIndex, setFactIndex] = useState(0);
  const factRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cycleFact = useCallback(() => {
    if (!factRef.current) {
      setFactIndex((prev) => (prev + 1) % randomFacts.length);
      return;
    }

    // GSAP flip animation: current text flips out, new text flips in
    const tl = gsap.timeline();
    tl.to(factRef.current, {
      rotateX: -90,
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setFactIndex((prev) => (prev + 1) % randomFacts.length);
      },
    });
    tl.fromTo(
      factRef.current,
      { rotateX: 90, opacity: 0, y: 10 },
      {
        rotateX: 0,
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "back.out(1.5)",
      }
    );
  }, []);

  return (
    <footer className="relative py-8 bg-(--bg-primary) border-t border-(--border-subtle)">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-(--text-muted)">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-(--text-secondary)">Parandhama Reddy</span>
            </p>
            <button
              ref={buttonRef}
              onClick={cycleFact}
              className="text-xs text-(--text-muted) hover:text-(--text-secondary) transition-colors cursor-pointer text-left"
              aria-label="Show random fact"
              style={{ perspective: "300px" }}
            >
              <span
                ref={factRef}
                className="block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {randomFacts[factIndex]}
              </span>
            </button>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-(--text-muted) hover:text-(--text-primary) bg-(--bg-elevated) hover:bg-(--bg-card) border border-(--border-subtle) hover:border-(--border-default) rounded-lg transition-all"
          >
            <ArrowUp size={14} />
            <span>Back to top</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
