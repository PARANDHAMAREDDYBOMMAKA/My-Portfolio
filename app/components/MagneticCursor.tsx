"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useDevice } from "../hooks/useDevice";

type CursorState = "default" | "hover" | "click" | "text" | "link" | "project" | "hidden";

const MagneticCursor: React.FC = () => {
  const { isTouchDevice } = useDevice();
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);
  const trailXSpring = useSpring(trailX, { damping: 35, stiffness: 200 });
  const trailYSpring = useSpring(trailY, { damping: 35, stiffness: 200 });

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setCursorState("click");
    const handleMouseUp = () => setCursorState("default");

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const magneticElements = document.querySelectorAll("[data-magnetic]");
    magneticElements.forEach((el) => {
      el.addEventListener("mousemove", (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (el as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;

        (el as HTMLElement).style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      el.addEventListener("mouseleave", () => {
        (el as HTMLElement).style.transform = "translate(0, 0)";
      });
    });

    const interactiveElements = document.querySelectorAll("a, button, [data-cursor]");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const cursorType = (el as HTMLElement).dataset.cursor as CursorState;
        const cursorLabel = (el as HTMLElement).dataset.cursorText;
        setCursorState(cursorType || "hover");
        if (cursorLabel) setCursorText(cursorLabel);
      });
      el.addEventListener("mouseleave", () => {
        setCursorState("default");
        setCursorText("");
      });
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isTouchDevice, cursorX, cursorY, trailX, trailY]);

  const getCursorSize = () => {
    switch (cursorState) {
      case "hover":
      case "link":
        return 60;
      case "click":
        return 30;
      case "project":
        return 100;
      case "text":
        return 4;
      case "hidden":
        return 0;
      default:
        return 16;
    }
  };

  const getCursorStyle = () => {
    switch (cursorState) {
      case "hover":
      case "link":
        return {
          backgroundColor: "rgba(224, 122, 95, 0.12)",
          border: "1px solid rgba(224, 122, 95, 0.55)",
          mixBlendMode: "normal" as const,
        };
      case "project":
        return {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          mixBlendMode: "difference" as const,
        };
      case "click":
        return {
          backgroundColor: "rgba(224, 122, 95, 0.85)",
          mixBlendMode: "normal" as const,
        };
      default:
        return {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          mixBlendMode: "difference" as const,
        };
    }
  };

  if (!isMounted || isTouchDevice) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 rounded-full"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          width: 40,
          height: 40,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(224, 122, 95, 0.35)",
          opacity: isVisible ? 0.5 : 0,
        }}
        animate={{
          scale: cursorState === "click" ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 rounded-full flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          ...getCursorStyle(),
        }}
        animate={{
          width: getCursorSize(),
          height: getCursorSize(),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {cursorText && cursorState === "project" && (
          <span className="text-xs font-medium text-black">{cursorText}</span>
        )}
      </motion.div>
    </>
  );
};

export default MagneticCursor;
