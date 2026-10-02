"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const INK_EASE = "power3.out";
export const RULE_EASE = "power3.inOut";

export function useGazetteMotion<T extends HTMLElement>(key: string = "") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const scope = ref.current;
    if (!scope) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const inks = gsap.utils.toArray<HTMLElement>("[data-ink]");
      if (inks.length) {
        gsap.set(inks, { opacity: 0, y: 26, clipPath: "inset(0% 0% 100% 0%)" });
        ScrollTrigger.batch(inks, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.9,
              ease: INK_EASE,
              stagger: 0.09,
              overwrite: true,
              clearProps: "clipPath,transform",
            }),
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
        const vertical = rule.dataset.rule === "y";
        gsap.fromTo(
          rule,
          vertical
            ? { scaleY: 0, transformOrigin: "center top" }
            : { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            scaleY: 1,
            duration: 1.1,
            ease: RULE_EASE,
            scrollTrigger: { trigger: rule, start: "top 88%", once: true },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, [key]);

  return ref;
}
