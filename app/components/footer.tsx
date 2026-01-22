"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-8 bg-(--bg-primary) border-t border-(--border-subtle)">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-(--text-muted)">
            © {new Date().getFullYear()}{" "}
            <span className="text-(--text-secondary)">Parandhama Reddy</span>.
            All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
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
