"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    // Animate title with GSAP
    if (titleRef.current) {
      const chars = titleRef.current.textContent?.split("") || [];
      titleRef.current.innerHTML = "";

      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        titleRef.current?.appendChild(span);
      });

      gsap.fromTo(
        titleRef.current.children,
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(1.7)",
        }
      );
    }

    // Animate cards with GSAP ScrollTrigger
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationY: -15,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Animate stats counters
    statsRef.current.forEach((stat, index) => {
      if (!stat) return;

      const countElement = stat.querySelector(".stat-count");
      if (!countElement) return;

      const targetValue = parseInt(countElement.textContent || "0");
      const counter = { value: 0 };

      gsap.to(counter, {
        value: targetValue,
        duration: 2,
        delay: 0.5 + index * 0.2,
        ease: "power2.out",
        onUpdate: function () {
          countElement.textContent = Math.floor(counter.value).toString();
        },
        scrollTrigger: {
          trigger: stat,
          start: "top 80%",
        },
      });
    });
  }, [isInView]);

  // 3D tilt effect on mouse move
  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = -(x - centerX) / 15;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const stats = [
    { id: 1, value: 2, label: "Years Experience", suffix: "+" },
    { id: 2, value: 10, label: "Projects Completed", suffix: "+" },
    { id: 3, value: 13, label: "Technologies", suffix: "+" },
  ];

  const bentoCards = [
    {
      id: 1,
      title: "Who I Am",
      content:
        "A Full Stack Developer passionate about creating immersive digital experiences that blend cutting-edge technology with innovative design.",
      className: "md:col-span-2 md:row-span-2",
      gradient: "from-[var(--neon-cyan)] to-[var(--neon-purple)]",
      accentColor: "var(--neon-cyan)",
    },
    {
      id: 2,
      title: "Experience",
      content:
        "5+ years building scalable web applications with modern technologies and frameworks. From startups to enterprise solutions.",
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-[var(--neon-purple)] to-[var(--neon-pink)]",
      accentColor: "var(--neon-purple)",
    },
    {
      id: 3,
      title: "Skills",
      content:
        "Expert in React, Next.js, Node.js, Three.js, GSAP, and modern web technologies. Always learning and adapting.",
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-[var(--neon-pink)] to-[var(--neon-orange)]",
      accentColor: "var(--neon-pink)",
    },
    {
      id: 4,
      title: "Philosophy",
      content:
        "Code is poetry. Design is art. Together, they create experiences that inspire and transform.",
      className: "md:col-span-2 md:row-span-1",
      gradient: "from-[var(--neon-blue)] to-[var(--neon-cyan)]",
      accentColor: "var(--neon-blue)",
    },
    {
      id: 5,
      title: "Passion",
      content:
        "Driven by curiosity and a desire to push boundaries. Every project is an opportunity to innovate.",
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-[var(--neon-orange)] to-[var(--neon-yellow)]",
      accentColor: "var(--neon-orange)",
    },
  ];

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 md:px-8 bg-[var(--bg-darkest)] text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--neon-purple)]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--neon-cyan)]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Section Title */}
      <div className="container mx-auto max-w-7xl mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="text-sm uppercase tracking-widest text-[var(--neon-cyan)] font-semibold">
            Get to know me
          </span>
        </motion.div>

        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-center mb-8 glow-text"
          style={{ perspective: "1000px" }}
        >
          About Me
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl text-center text-gray-400 max-w-3xl mx-auto"
        >
          Crafting digital experiences that push the boundaries of what's possible
        </motion.p>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto max-w-7xl mb-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              ref={(el) => {
                statsRef.current[index] = el;
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="relative group"
            >
              <div className="cyber-card rounded-2xl p-6 text-center relative overflow-hidden">
                {/* Animated border */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] opacity-20 blur-xl" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-2">
                    <span className="stat-count text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)]">
                      {stat.value}
                    </span>
                    <span className="text-3xl md:text-4xl font-bold text-[var(--neon-cyan)]">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[var(--neon-cyan)]/30 rounded-tr-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px]">
          {/* Profile Card - Special */}
          <motion.div
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            onMouseMove={(e) => handleCardMouseMove(e, 0)}
            onMouseLeave={() => handleCardMouseLeave(0)}
            onMouseEnter={() => setHoveredCard(0)}
            className="cyber-card rounded-3xl p-8 md:col-span-1 md:row-span-2 flex flex-col items-center justify-center relative overflow-hidden group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/10 via-[var(--neon-purple)]/10 to-[var(--neon-pink)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Scan line effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent animate-scan" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                className="relative w-40 h-40 rounded-full overflow-hidden mb-6 group/image"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Rotating border */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 animate-spin-slow" style={{ padding: "4px" }} />

                <div className="absolute inset-1 rounded-full border-4 border-[var(--neon-cyan)] shadow-[0_0_30px_rgba(0,240,255,0.5)] z-10" />

                <Image
                  src="/photo.jpeg"
                  alt="Parandhama Reddy"
                  fill
                  priority
                  className="object-cover rounded-full relative z-0"
                />
              </motion.div>

              <h3 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] mb-2">
                Parandhama Reddy
              </h3>

              <p className="text-sm text-gray-400 text-center mb-4">
                Full Stack Developer
              </p>

              <div className="flex gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse" />
                <span className="text-xs text-gray-500">Available for work</span>
              </div>

              {/* Holographic code lines */}
              <div className="mt-6 w-full space-y-2 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <div className="h-1 bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/50 to-transparent rounded" />
                <div className="h-1 bg-gradient-to-r from-transparent via-[var(--neon-purple)]/50 to-transparent rounded w-3/4 mx-auto" />
                <div className="h-1 bg-gradient-to-r from-transparent via-[var(--neon-pink)]/50 to-transparent rounded w-1/2 mx-auto" />
              </div>
            </div>
          </motion.div>

          {/* Bento Cards */}
          {bentoCards.map((card, index) => (
            <motion.div
              key={card.id}
              ref={(el) => {
                cardsRef.current[index + 1] = el;
              }}
              onMouseMove={(e) => handleCardMouseMove(e, index + 1)}
              onMouseLeave={() => handleCardMouseLeave(index + 1)}
              onMouseEnter={() => setHoveredCard(card.id)}
              className={`cyber-card rounded-3xl p-6 md:p-8 ${card.className} relative overflow-hidden group`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Scan line effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent animate-scan" />
              </div>

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 opacity-30 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: card.accentColor }} />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 opacity-30 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: card.accentColor }} />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  {/* Fixed gradient on title */}
                  <h3
                    className={`text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${card.gradient}`}
                  >
                    {card.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{card.content}</p>
                </div>

                {/* Animated accent line */}
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: card.accentColor }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating particles decoration */}
      <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-[var(--neon-cyan)] animate-ping" />
      <div className="absolute bottom-40 right-20 w-3 h-3 rounded-full bg-[var(--neon-pink)] animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[var(--neon-purple)] animate-ping" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
    </motion.section>
  );
};

export default AboutSection;
