"use client";

import React, { useEffect, useRef, useState } from "react";

interface PrintRevealProps {
  children: React.ReactNode;
  className?: string;
}

// Wraps a section so a "print head" light sweeps down it the first time it
// enters the viewport — selling the sense that the section just printed out.
const PrintReveal: React.FC<PrintRevealProps> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPrinting(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`print-reveal ${printing ? "printing" : ""} ${className}`}>
      <span className="print-head" aria-hidden />
      {children}
    </div>
  );
};

export default PrintReveal;
