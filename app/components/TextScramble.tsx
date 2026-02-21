"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  scrambleOnHover?: boolean;
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = "",
  delay = 0,
  speed = 30,
  scrambleOnHover = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef(0);
  const resolveRef = useRef<(() => void) | null>(null);

  const scramble = (newText: string): Promise<void> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      const length = newText.length;
      const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];

      for (let i = 0; i < length; i++) {
        const from = displayText[i] || "";
        const to = newText[i];
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(frameRef.current);
      let frame = 0;

      const update = () => {
        let output = "";
        let complete = 0;

        for (let i = 0; i < queue.length; i++) {
          const { from, to, start, end } = queue[i];
          let { char } = queue[i];

          if (frame >= end) {
            complete++;
            output += to;
          } else if (frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = chars[Math.floor(Math.random() * chars.length)];
              queue[i].char = char;
            }
            output += `<span class="text-indigo-400">${char}</span>`;
          } else {
            output += from;
          }
        }

        if (ref.current) {
          ref.current.innerHTML = output;
        }

        if (complete === queue.length) {
          setDisplayText(newText);
          resolve();
        } else {
          frameRef.current = requestAnimationFrame(update);
          frame++;
        }
      };

      update();
    });
  };

  useEffect(() => {
    if (isInView && !isScrambling && !scrambleOnHover) {
      const timer = setTimeout(() => {
        setIsScrambling(true);
        scramble(text).then(() => setIsScrambling(false));
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, text, delay, scrambleOnHover]);

  const handleMouseEnter = () => {
    if (scrambleOnHover && !isScrambling) {
      setIsScrambling(true);
      scramble(text).then(() => setIsScrambling(false));
    }
  };

  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ fontFamily: "monospace" }}
    >
      {scrambleOnHover ? text : ""}
    </span>
  );
};

export default TextScramble;
