"use client";

import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-(--bg-dark) border-t border-(--glass-border) py-8 px-4 md:px-8 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-r from-(--neon-purple)/5 via-(--neon-cyan)/5 to-(--neon-pink)/5 animate-pulse" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-(--neon-cyan) animate-pulse" />
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} <span className="text-(--neon-cyan) font-semibold">Parandhama Reddy</span>. All rights reserved.
            </p>
          </motion.div>

          {/* Tech Stack Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-xs text-gray-500"
          >
            <span>Built with</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-(--glass-bg) border border-(--glass-border) text-(--neon-cyan) font-semibold">
                Next.js
              </span>
              <span className="px-2 py-1 rounded bg-(--glass-bg) border border-(--glass-border) text-(--neon-purple) font-semibold">
                Three.js
              </span>
              <span className="px-2 py-1 rounded bg-(--glass-bg) border border-(--glass-border) text-(--neon-pink) font-semibold">
                GSAP
              </span>
            </div>
          </motion.div>

          {/* Scroll to top */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-(--glass-border) hover:border-(--neon-cyan) bg-(--glass-bg) hover:bg-(--glass-bg)/80 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-(--neon-cyan) transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="text-sm text-gray-400 group-hover:text-(--neon-cyan) transition-colors">
              Back to top
            </span>
          </motion.button>
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 h-px bg-linear-to-r from-transparent via-(--neon-purple) to-transparent"
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-(--neon-cyan)/30 rounded-bl-lg" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-(--neon-purple)/30 rounded-br-lg" />
    </footer>
  );
};

export default Footer;
