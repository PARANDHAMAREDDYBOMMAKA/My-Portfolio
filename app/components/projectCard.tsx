"use client";

import { Project } from "../utils/data";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useDevice } from "../hooks/useDevice";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { isTouchDevice } = useDevice();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;

    const card = cardRef.current;
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
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice || !cardRef.current) return;

    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative cyber-card rounded-2xl overflow-hidden group h-full"
      style={{ transformStyle: isTouchDevice ? "flat" : "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      whileHover={isTouchDevice ? {} : { scale: 1.02 }}
    >
      {/* Holographic gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-(--neon-cyan)/20 via-(--neon-purple)/20 to-(--neon-pink)/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-(--bg-card) via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* Hover Link Overlay */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10"
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-(--neon-cyan) to-(--ne
                on-purple) rounded-full blur-lg opacity-50 group-hover/link:opacity-100 transition-opacity" />
                <div className="relative bg-(--bg-card) p-4 rounded-full border-2 border-(--neon-cyan)">
                  <ExternalLink className="text-(--neon-cyan)" size={32} />
                </div>
              </div>
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="relative p-6 z-10">
        <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-linear-to-r from-(--neon-cyan) to-(--neon-purple)">
          {project.title}
        </h3>

        <p className="text-gray-400 mb-6 leading-relaxed">
          {project.description}
        </p>

        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-(--neon-cyan) to-(--neon-purple) rounded-full font-semibold text-white transition-all duration-300 group/btn"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>View Project</span>
          <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </motion.a>
      </div>

      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-(--neon-cyan)/50 rounded-tl-lg" />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-(--neon-purple)/50 rounded-br-lg" />
    </motion.div>
  );
};

export default ProjectCard;
