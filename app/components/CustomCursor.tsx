"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDevice } from '../hooks/useDevice';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { isTouchDevice } = useDevice();

  useEffect(() => {
    if (isTouchDevice) return;
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"]');
      setIsPointer(!!isInteractive);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    const animate = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.1;
      cursorY += dy * 0.1;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

      const dotDx = mouseX - dotX;
      const dotDy = mouseY - dotY;
      dotX += dotDx * 0.15;
      dotY += dotDy * 0.15;
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <motion.div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-9999 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: 'translate(-50%, -50%)' }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 rounded-full border-2 border-(--neon-cyan)"
            style={{
              boxShadow: '0 0 10px var(--neon-cyan), inset 0 0 10px rgba(0, 240, 255, 0.2)',
            }}
          />
          <div
            className="absolute inset-0 rounded-full border border-(--neon-purple) opacity-50 animate-ping"
          />
        </div>
      </motion.div>

      <motion.div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 pointer-events-none z-9999 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: 'translate(-50%, -50%)' }}
        animate={{
          scale: isPointer ? 0 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className="w-full h-full rounded-full bg-(--neon-cyan)"
          style={{
            boxShadow: '0 0 10px var(--neon-cyan)',
          }}
        />
      </motion.div>
    </>
  );
}
