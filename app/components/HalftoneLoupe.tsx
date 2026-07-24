"use client";

import React, { useRef, useState } from "react";
import { useDevice } from "../hooks/useDevice";

interface HalftoneLoupeProps {
  src: string;
}

const SIZE = 150; // magnifier diameter
const ZOOM = 2.1;

// A printer's loupe: hover over the image and a round magnifier reveals the
// picture enlarged with a halftone dot screen laid over it, like inspecting print.
const HalftoneLoupe: React.FC<HalftoneLoupeProps> = ({ src }) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const { isTouchDevice } = useDevice();

  if (isTouchDevice) return null;

  const onMove = (e: React.MouseEvent) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDims({ w: rect.width, h: rect.height });
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={areaRef}
      className="absolute inset-0 z-10 cursor-none"
      onMouseMove={onMove}
      onMouseLeave={() => setPos(null)}
    >
      {pos && (
        <div
          className="absolute rounded-full pointer-events-none overflow-hidden"
          style={{
            width: SIZE,
            height: SIZE,
            left: pos.x - SIZE / 2,
            top: pos.y - SIZE / 2,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${dims.w * ZOOM}px ${dims.h * ZOOM}px`,
            backgroundPosition: `${-(pos.x * ZOOM - SIZE / 2)}px ${-(pos.y * ZOOM - SIZE / 2)}px`,
            border: "2px solid rgba(255,253,247,0.85)",
            boxShadow: "0 8px 30px rgba(36,28,20,0.45), inset 0 0 0 1px rgba(36,28,20,0.25)",
          }}
        >
          {/* Halftone dot screen */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(36,28,20,0.55) 0 1.4px, transparent 1.8px)",
              backgroundSize: "5px 5px",
              mixBlendMode: "multiply",
              opacity: 0.6,
            }}
          />
          {/* Loupe glass sheen */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.35) 0%, transparent 45%)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HalftoneLoupe;
