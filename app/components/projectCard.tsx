"use client";

import { Project } from "../utils/data";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.5 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative bg-gray-900 p-6 rounded-xl shadow-lg 
        transition-all duration-300 
        hover:shadow-2xl hover:scale-105 
        hover:bg-gradient-to-br 
        hover:from-purple-800 
        hover:to-indigo-800 
        overflow-hidden"
      >
        {/* Image Container */}
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            src={project.imageUrl}
            alt={project.title}
            className="rounded-lg w-full h-48 object-cover 
              transition-transform duration-300 
              group-hover:scale-110"
          />
          {/* Hover Overlay */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black bg-opacity-50 
              flex items-center justify-center 
              rounded-lg z-10"
            >
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 p-3 rounded-full backdrop-blur-md"
              >
                <ExternalLink className="text-white" size={24} />
              </motion.a>
            </motion.div>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-purple-400 mb-2 group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-gray-400 mb-4 group-hover:text-gray-200 transition-colors">
          {project.description}
        </p>

        {/* Project Link Button */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-500 text-white px-4 py-2 rounded-lg 
          hover:bg-purple-600 transition duration-300 inline-block"
        >
          View Project
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
