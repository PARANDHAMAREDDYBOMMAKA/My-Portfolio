"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Environment, Sparkles } from "@react-three/drei";

/* Background Animation */
const SceneBackground = () => {
  return (
    <group>
      <Stars
        radius={300}
        depth={100}
        count={5000}
        factor={4}
        fade
        speed={0.5}
      />
      <Sparkles count={100} scale={10} size={5} speed={0.3} color="#ffffff" />
      <Environment preset="night" />
    </group>
  );
};

/* Paragraph Card */
const ParagraphCard: React.FC<{ text: string; isActive: boolean }> = ({
  text,
  isActive,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
    transition={{ duration: 0.5 }}
    className="absolute w-full flex items-center justify-center"
  >
    <div className="w-full max-w-3xl mx-auto p-8 bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
      <p className="text-2xl font-light leading-relaxed text-white">{text}</p>
    </div>
  </motion.div>
);

/* About Section */
const AboutSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const paragraphs = [
    "I have always been fascinated by the intersection of technology and art. From an early age, I was captivated by the endless possibilities that the digital world offers. My journey has been one of continuous learning and exploration, merging creativity with technical expertise to craft unique solutions.",
    "Throughout my career, I've dedicated myself to mastering various programming languages and frameworks. This pursuit has enabled me to build robust, scalable applications that stand the test of time. Every project is an opportunity to innovate and refine my skills.",
    "Design and functionality go hand in hand in my work. I strive to create digital experiences that are not only visually appealing but also intuitive and accessible. Balancing aesthetics with usability is a core principle behind every solution I develop.",
    "Collaboration and mentorship are essential parts of my professional life. I believe that sharing knowledge and working together with talented individuals fosters creativity and drives innovation. I am passionate about contributing to a community where ideas flourish.",
    "Curiosity and a drive for excellence push me to explore new ideas and technologies. I constantly seek inspiration, challenging myself to go beyond conventional boundaries. My ultimate goal is to leverage technology to create meaningful, lasting change.",
  ];

  /* Function to switch paragraphs */
  const navigateToParagraph = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <motion.section
      className="relative min-h-screen bg-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 50], near: 0.1, far: 1000 }}>
          <SceneBackground />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Layout */}
      <div className="container mx-auto relative z-10 grid md:grid-cols-2 gap-8">
        {/* Profile */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-indigo-500 shadow-2xl">
            <Image
              src="/photo.jpeg"
              alt="Parandhama Reddy"
              fill
              priority
              className="object-cover"
            />
          </div>
          <h2 className="mt-6 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600 text-center">
            Parandhama Reddy
          </h2>
          <p className="mt-2 text-xl text-gray-400 text-center">
            Software Engineer & Creative Technologist
          </p>
        </div>

        {/* Paragraph Section */}
        <div
          ref={containerRef}
          className="relative h-screen w-full flex items-center justify-center"
        >
          {paragraphs.map((text, index) => (
            <ParagraphCard
              key={index}
              text={text}
              isActive={index === activeIndex}
            />
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-50">
        {paragraphs.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToParagraph(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-indigo-500 scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default AboutSection;
