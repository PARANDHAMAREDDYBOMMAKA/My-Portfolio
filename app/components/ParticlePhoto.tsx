"use client";

import React, { useRef, useEffect, useState } from "react";
import { useDevice } from "../hooks/useDevice";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  spawnX: number;
  spawnY: number;
  r: number;
  g: number;
  b: number;
  baseSize: number;
  alpha: number;
  depth: number;
  phase: number;
  vx: number;
  vy: number;
}

interface ParticlePhotoProps {
  imageSrc: string;
  className?: string;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const ParticlePhoto: React.FC<ParticlePhotoProps> = ({ imageSrc, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { isMobile, isTouchDevice } = useDevice();

  // Build the stipple portrait: each surviving pixel becomes a warm ink dot,
  // darker where the photo is darker — an engraving that reads on the ivory canvas.
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const rect = container.getBoundingClientRect();
      const cw = rect.width || 500;
      const ch = rect.height || 450;
      if (cw < 10 || ch < 10) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const temp = document.createElement("canvas");
      const tctx = temp.getContext("2d");
      if (!tctx) return;

      const scale = Math.min((cw * 0.88) / img.width, (ch * 0.92) / img.height);
      const dw = Math.max(1, Math.floor(img.width * scale));
      const dh = Math.max(1, Math.floor(img.height * scale));
      const ox = (cw - dw) / 2;
      const oy = (ch - dh) / 2;

      temp.width = dw;
      temp.height = dh;
      tctx.drawImage(img, 0, 0, dw, dh);

      const pixels = tctx.getImageData(0, 0, dw, dh).data;
      const gap = isMobile ? 3 : 2;
      const particles: Particle[] = [];
      const cx = cw / 2;
      const cy = ch / 2;

      for (let y = 0; y < dh; y += gap) {
        for (let x = 0; x < dw; x += gap) {
          const idx = (y * dw + x) * 4;
          const a = pixels[idx + 3];
          if (a < 100) continue;

          const r0 = pixels[idx];
          const g0 = pixels[idx + 1];
          const b0 = pixels[idx + 2];
          const brightness = r0 * 0.299 + g0 * 0.587 + b0 * 0.114;

          // Drop near-white pixels so the portrait floats on the paper, not a block.
          if (brightness > 234) continue;

          const darkness = 1 - brightness / 255; // 0 = light, 1 = ink
          const px = ox + x;
          const py = oy + y;

          // Warm espresso ink — always darker than the ivory bg, so every dot reads.
          const r = Math.round(30 + brightness * 0.6);
          const g = Math.round(22 + brightness * 0.5);
          const b = Math.round(15 + brightness * 0.38);

          // Spawn scattered around the centre for the assemble-on-load reveal.
          const ang = Math.random() * Math.PI * 2;
          const spread = Math.max(cw, ch) * (0.5 + Math.random() * 0.6);

          particles.push({
            x: cx + Math.cos(ang) * spread,
            y: cy + Math.sin(ang) * spread,
            originX: px,
            originY: py,
            spawnX: cx + Math.cos(ang) * spread,
            spawnY: cy + Math.sin(ang) * spread,
            r,
            g,
            b,
            baseSize: (isMobile ? 0.95 : 0.75) + darkness * (isMobile ? 1.0 : 0.95),
            alpha: 0.4 + darkness * 0.55,
            depth: 0.3 + Math.random() * 0.7,
            phase: Math.random() * Math.PI * 2,
            vx: 0,
            vy: 0,
          });
        }
      }

      particlesRef.current = particles;
      startRef.current = null;
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

    const cssW = () => canvas.clientWidth || 500;
    const cssH = () => canvas.clientHeight || 450;

    const render = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const intro = Math.min(1, elapsed / 1600);
      const introEase = 1 - Math.pow(1 - intro, 3); // easeOutCubic assemble
      const t = now * 0.001;

      const w = cssW();
      const h = cssH();
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const R = isMobile ? 60 : 90;

      // Whole-cloud parallax toward the cursor for a shallow-depth feel.
      const paraX = mouse.active ? (mouse.x - w / 2) * 0.03 : 0;
      const paraY = mouse.active ? (mouse.y - h / 2) * 0.03 : 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Living idle drift + parallax define where the particle "wants" to be.
        const driftX = Math.sin(t * 0.55 + p.phase) * p.depth * 3;
        const driftY = Math.cos(t * 0.48 + p.phase * 1.3) * p.depth * 3;
        let tx = p.originX + driftX + paraX * p.depth;
        let ty = p.originY + driftY + paraY * p.depth;

        // Assemble from the scattered spawn on first load.
        if (intro < 1) {
          tx = lerp(p.spawnX, tx, introEase);
          ty = lerp(p.spawnY, ty, introEase);
        }

        // Cursor = candlelight: repel + orbital swirl + illumination.
        let illum = 0;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (mouse.active && dist < R && dist > 0) {
          const force = (R - dist) / R;
          const ang = Math.atan2(dy, dx);
          p.vx += Math.cos(ang) * force * 2.2 - Math.sin(ang) * force * 1.5;
          p.vy += Math.sin(ang) * force * 2.2 + Math.cos(ang) * force * 1.5;
          illum = force;
        }

        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;
        p.x += (tx - p.x) * 0.08;
        p.y += (ty - p.y) * 0.08;

        // Ink dot, warming toward candle-gold under the cursor.
        const size = p.baseSize * (1 + illum * 1.6) * (0.6 + 0.4 * introEase);
        const r = Math.round(lerp(p.r, 208, illum));
        const g = Math.round(lerp(p.g, 168, illum * 0.9));
        const b = Math.round(lerp(p.b, 66, illum));

        if (illum > 0.45) {
          ctx.shadowColor = "rgba(208,168,66,0.8)";
          ctx.shadowBlur = 8 * illum;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = p.alpha * (0.35 + 0.65 * introEase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReady, isMobile]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const setFromClient = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = clientX - rect.left;
      mouseRef.current.y = clientY - rect.top;
      mouseRef.current.active = true;
    };
    const clear = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const onMouseMove = (e: MouseEvent) => setFromClient(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) setFromClient(e.touches[0].clientX, e.touches[0].clientY);
    };

    if (!isTouchDevice) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", clear);
    } else {
      container.addEventListener("touchmove", onTouchMove, { passive: true });
      container.addEventListener("touchend", clear);
    }

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", clear);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", clear);
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

      {/* Warm halo so the ink portrait sits in a pool of light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(184,134,43,0.16) 0%, rgba(192,90,61,0.06) 38%, transparent 66%)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-(--text-muted) opacity-50 select-none">
        {isTouchDevice ? "touch it — it stirs" : "hold your cursor to it"}
      </p>
    </div>
  );
};

export default ParticlePhoto;
