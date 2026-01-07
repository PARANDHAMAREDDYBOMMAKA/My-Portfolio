"use client";

import React, { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Interactive3DCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = "",
  intensity = 1,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -15 * intensity;
    const rotY = ((x - centerX) / centerX) * 15 * intensity;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-inherit"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 240, 255, 0.2), transparent 50%)`,
          transform: "translateZ(1px)",
        }}
      />

      <div style={{ transform: "translateZ(20px)" }}>{children}</div>

      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-inherit"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(168, 85, 247, 0.4), transparent 70%)`,
          transform: "translateZ(-10px)",
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
};

export default Interactive3DCard;
