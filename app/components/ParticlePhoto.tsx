"use client";

import React, { useRef, useEffect, useState } from "react";
import { useDevice } from "../hooks/useDevice";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  r: number;
  g: number;
  b: number;
  size: number;
  vx: number;
  vy: number;
}

interface ParticlePhotoProps {
  imageSrc: string;
  className?: string;
}

const ParticlePhoto: React.FC<ParticlePhotoProps> = ({ imageSrc, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { isMobile, isTouchDevice } = useDevice();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const containerRect = container.getBoundingClientRect();
      const cw = containerRect.width || 500;
      const ch = containerRect.height || 450;

      if (cw < 10 || ch < 10) return;

      canvas.width = cw;
      canvas.height = ch;

      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      const scale = Math.min((cw * 0.85) / img.width, (ch * 0.9) / img.height);
      const dw = Math.max(1, Math.floor(img.width * scale));
      const dh = Math.max(1, Math.floor(img.height * scale));
      const ox = (cw - dw) / 2;
      const oy = (ch - dh) / 2;

      tempCanvas.width = dw;
      tempCanvas.height = dh;
      tempCtx.drawImage(img, 0, 0, dw, dh);

      const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const pixels = imgData.data;

      const gap = isMobile ? 3 : 2;
      const particles: Particle[] = [];

      for (let y = 0; y < tempCanvas.height; y += gap) {
        for (let x = 0; x < tempCanvas.width; x += gap) {
          const idx = (Math.floor(y) * tempCanvas.width + Math.floor(x)) * 4;
          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];
          const a = pixels[idx + 3];

          if (a < 100) continue;

          const brightness = Math.round(r * 0.299 + g * 0.587 + b * 0.114);
          if (brightness < 8) continue;

          const px = ox + x;
          const py = oy + y;

          // Warm sepia tint so the portrait reads as crafted, not clinical grayscale
          particles.push({
            x: px,
            y: py,
            originX: px,
            originY: py,
            r: Math.min(255, Math.round(brightness * 1.06 + 14)),
            g: Math.round(brightness * 0.92 + 6),
            b: Math.round(brightness * 0.74),
            size: isMobile ? 1.2 : 0.9,
            vx: 0,
            vy: 0,
          });
        }
      }

      particlesRef.current = particles;
      setIsReady(true);
    };

    img.src = imageSrc;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [imageSrc, isMobile]);

  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const interactRadius = isMobile ? 35 : 50;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < interactRadius && dist > 0) {
          const force = (interactRadius - dist) / interactRadius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 3;
          p.vy += Math.sin(angle) * force * 3;
        }

        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        const pullX = (p.originX - p.x) * 0.05;
        const pullY = (p.originY - p.y) * 0.05;
        p.x += pullX;
        p.y += pullY;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReady, isMobile]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
      }
    };

    const onTouchEnd = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    if (!isTouchDevice) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", onMouseLeave);
    } else {
      container.addEventListener("touchmove", onTouchMove);
      container.addEventListener("touchend", onTouchEnd);
    }

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [isTouchDevice]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: isMobile ? "300px" : "450px" }}
    >
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-(--primary) border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(224,122,95,0.16) 0%, rgba(224,164,88,0.06) 35%, transparent 62%)",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-(--text-muted) opacity-40">
        {isTouchDevice ? "Touch to interact" : "Hover to interact"}
      </p>
    </div>
  );
};

export default ParticlePhoto;
