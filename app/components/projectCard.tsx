"use client";

import { Project } from "../utils/data";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="card group overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden bg-(--bg-elevated)">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-(--bg-card) via-transparent to-transparent opacity-60" />

        <div className="absolute inset-0 bg-(--bg-primary)/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-(--primary) text-white transform scale-0 group-hover:scale-100 transition-transform duration-300"
          >
            <ExternalLink size={24} />
          </a>
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <h3 className="text-lg font-semibold text-(--text-primary) mb-2 group-hover:text-(--primary) transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-(--text-secondary) leading-relaxed mb-6 grow">
          {project.description}
        </p>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-(--primary) hover:text-(--primary-light) transition-colors group/link"
        >
          <span>View Project</span>
          <ArrowUpRight size={16} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
