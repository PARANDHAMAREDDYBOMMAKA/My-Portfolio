"use client";

import { Project } from "../utils/data";
import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to extract technologies from project description
  const extractTechnologies = (description: string) => {
    const techKeywords = [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Tailwind",
      "Next.js",
      "TypeScript",
      "GraphQL",
    ];
    return techKeywords.filter((tech) =>
      description.toLowerCase().includes(tech.toLowerCase())
    );
  };

  const technologies = extractTechnologies(project.description);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.5 }}
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-lg 
        transition-all duration-300 
        group-hover:shadow-2xl 
        group-hover:scale-[1.03]
        group-hover:bg-gradient-to-br 
        group-hover:from-purple-900 
        group-hover:to-indigo-900 
        relative overflow-hidden"
      >
        {/* Project Image */}
        <div className="relative mb-4">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            src={project.imageUrl}
            alt={project.title}
            className="rounded-lg w-full h-48 object-cover 
              transition-transform duration-300 
              group-hover:scale-110 
              group-hover:brightness-50"
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
              <div className="flex">
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
              </div>
            </motion.div>
          )}
        </div>

        {/* Project Details */}
        <h3
          className="text-2xl font-bold text-purple-400 mb-2 
          transition-colors duration-300 
          group-hover:text-white"
        >
          {project.title}
        </h3>
        <p
          className="text-gray-400 mb-4 
          transition-colors duration-300 
          group-hover:text-gray-200 
          line-clamp-3"
        >
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-purple-500/20 text-purple-300 
                px-2 py-1 rounded-full text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Link */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-500 text-white px-4 py-2 rounded-lg 
            hover:bg-purple-600 transition duration-300 
            inline-block relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center">
            View Project
            <ExternalLink className="ml-2" size={16} />
          </span>
          <span
            className="absolute inset-0 bg-purple-700 opacity-0 
              group-hover:opacity-20 transition-opacity duration-300"
          />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
