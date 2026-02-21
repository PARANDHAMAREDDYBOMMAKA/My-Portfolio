"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDevice } from "../hooks/useDevice";

interface GradientMeshProps {
  className?: string;
}

const GradientMesh: React.FC<GradientMeshProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isMobile } = useDevice();
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const frameCountRef = useRef(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const blobs = [
      { x: 0.3, y: 0.3, vx: 0.001, vy: 0.0015, radius: 0.4, color: "99, 102, 241" },
      { x: 0.7, y: 0.6, vx: -0.0012, vy: 0.001, radius: 0.35, color: "168, 85, 247" },
      { x: 0.5, y: 0.8, vx: 0.0008, vy: -0.001, radius: 0.3, color: "236, 72, 153" },
      { x: 0.2, y: 0.7, vx: 0.001, vy: -0.0008, radius: 0.25, color: "34, 211, 238" },
    ];

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / width,
        y: e.clientY / height,
      };
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      frameCountRef.current++;
      if (frameCountRef.current % 2 !== 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, width, height);

      blobs.forEach((blob) => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        const dx = mouseRef.current.x - blob.x;
        const dy = mouseRef.current.y - blob.y;
        blob.x += dx * 0.01;
        blob.y += dy * 0.01;

        if (blob.x < 0 || blob.x > 1) blob.vx *= -1;
        if (blob.y < 0 || blob.y > 1) blob.vy *= -1;

        const gradient = ctx.createRadialGradient(
          blob.x * width,
          blob.y * height,
          0,
          blob.x * width,
          blob.y * height,
          blob.radius * Math.min(width, height)
        );

        gradient.addColorStop(0, `rgba(${blob.color}, 0.15)`);
        gradient.addColorStop(0.5, `rgba(${blob.color}, 0.05)`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, width, height);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile, isMounted]);

  if (!isMounted) {
    return (
      <div
        className={`fixed inset-0 pointer-events-none ${className}`}
        style={{ zIndex: -1, backgroundColor: "#0a0a0a" }}
      />
    );
  }

  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 pointer-events-none ${className}`}
        style={{
          zIndex: -1,
          background: `
            radial-gradient(ellipse at 30% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(168, 85, 247, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
            #0a0a0a
          `,
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  );
};

export default GradientMesh;
