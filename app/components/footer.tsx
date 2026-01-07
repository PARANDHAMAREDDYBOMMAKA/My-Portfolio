"use client";

import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-(--bg-dark) border-t border-(--glass-border) overflow-hidden" style={{ padding: 'clamp(1.5rem, 4vh, 2rem) clamp(1rem, 4vw, 2rem)' }}>
      <div className="absolute inset-0 bg-linear-to-r from-(--neon-purple)/5 via-(--neon-cyan)/5 to-(--neon-pink)/5 animate-pulse" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between" style={{ gap: 'clamp(1rem, 3vh, 1.5rem)' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center"
            style={{ gap: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}
          >
            <div className="rounded-full bg-(--neon-cyan) animate-pulse" style={{ width: 'clamp(6px, 1vw, 8px)', height: 'clamp(6px, 1vw, 8px)' }} />
            <p className="text-gray-400" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
              © {new Date().getFullYear()} <span className="text-(--neon-cyan) font-semibold">Parandhama Reddy</span>. All rights reserved.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center rounded-full border border-(--glass-border) hover:border-(--neon-cyan) bg-(--glass-bg) hover:bg-(--glass-bg)/80 transition-all duration-300"
            style={{
              gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
              padding: 'clamp(0.5rem, 1.5vh, 0.625rem) clamp(0.875rem, 2.5vw, 1rem)',
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="text-gray-400 group-hover:text-(--neon-cyan) transition-colors"
              style={{ width: 'clamp(14px, 2.5vw, 16px)', height: 'clamp(14px, 2.5vw, 16px)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="text-gray-400 group-hover:text-(--neon-cyan) transition-colors" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
              Back to top
            </span>
          </motion.button>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="h-px bg-linear-to-r from-transparent via-(--neon-purple) to-transparent"
          style={{ marginTop: 'clamp(1rem, 3vh, 1.5rem)' }}
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-(--neon-cyan)/30 rounded-bl-lg" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-(--neon-purple)/30 rounded-br-lg" />
    </footer>
  );
};

export default Footer;
