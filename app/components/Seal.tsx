import React from "react";

const Seal: React.FC<{ size?: number; className?: string }> = ({ size = 44, className = "" }) => (
  <span
    className={`inline-flex shrink-0 items-center justify-center bg-(--bg-card) ${className}`}
    style={{
      width: size,
      height: size,
      border: "1px solid var(--text-primary)",
      outline: "1px solid var(--text-primary)",
      outlineOffset: 2,
    }}
    aria-hidden
  >
    <span className="text-display leading-none" style={{ fontSize: size * 0.5, letterSpacing: "-0.06em" }}>
      <span className="text-(--text-primary)">P</span>
      <span className="text-(--primary) italic">R</span>
    </span>
  </span>
);

export default Seal;
