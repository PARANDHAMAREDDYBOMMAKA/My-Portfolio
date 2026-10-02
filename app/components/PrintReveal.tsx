"use client";

import React, { useEffect, useRef, useState } from "react";

interface PrintRevealProps {
  children: React.ReactNode;
  className?: string;
  anchor?: string;
}

const PrintReveal: React.FC<PrintRevealProps> = ({ children, className = "", anchor }) => {
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

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const place = () => {
      el.style.setProperty("--sheet-top", `${Math.min(0, window.innerHeight - el.offsetHeight)}px`);
    };

    const cover = () => {
      frame = 0;
      const next = el.nextElementSibling;
      if (!next) return;
      const edge = Math.min(el.offsetHeight, window.innerHeight);
      const progress = Math.min(1, Math.max(0, (edge - next.getBoundingClientRect().top) / edge));
      el.style.setProperty("--cover", progress.toFixed(3));
      el.classList.toggle("sheet-covered", progress >= 1);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(cover);
    };

    const onResize = () => {
      place();
      onScroll();
    };

    place();
    const sizeObserver = new ResizeObserver(onResize);
    sizeObserver.observe(el);
    window.addEventListener("resize", onResize);
    if (!reduced) {
      cover();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      io.disconnect();
      sizeObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div data-anchor={anchor} aria-hidden />
      <div ref={ref} className={`sheet print-reveal ${printing ? "printing" : ""} ${className}`}>
        <span className="print-head" aria-hidden />
        <div className="sheet-inner">{children}</div>
      </div>
    </>
  );
};

export default PrintReveal;
