"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const StopThePress: React.FC = () => {
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    let idx = 0;

    const fire = () => {
      const on = document.documentElement.classList.toggle("newsprint");
      setBanner(true);
      window.setTimeout(() => setBanner(false), 2600);

      if (on) {
        // A press-run of confetti in the gazette inks.
        const colors = ["#241c14", "#c05a3d", "#b8862b", "#5f8a5e"];
        confetti({ particleCount: 90, spread: 75, origin: { y: 0.3 }, colors });
        confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 }, colors });
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      idx = key === SEQUENCE[idx] ? idx + 1 : key === SEQUENCE[0] ? 1 : 0;
      if (idx === SEQUENCE.length) {
        idx = 0;
        fire();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!banner) return null;

  return (
    <div className="fixed inset-x-0 top-24 z-[60] flex justify-center pointer-events-none no-print">
      <div className="glass-strong px-6 py-3 rounded-full shadow-lg">
        <span className="text-display text-lg text-(--text-primary)">
          Stop the press! <span className="text-gold">Extra edition.</span>
        </span>
      </div>
    </div>
  );
};

export default StopThePress;
