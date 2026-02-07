"use client";

import { Project } from "../utils/data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, featured = false }) => {
  const projectNumber = String(index + 1).padStart(2, "0");

  if (featured) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="card group overflow-hidden flex flex-col md:flex-row h-full"
      >
        <div className="relative h-56 md:h-auto md:w-3/5 overflow-hidden bg-(--bg-elevated) flex-shrink-0">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-(--bg-card)/50 via-transparent to-transparent" />
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-center md:w-2/5">
          <span className="text-caption mb-3 block">
            {`// project ${projectNumber}`}
          </span>
          <h3 className="text-xl md:text-2xl font-semibold text-(--text-primary) mb-3 group-hover:text-(--primary) transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-(--text-secondary) leading-relaxed mb-5">
            {project.description}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-(--primary) group-hover:text-(--primary-light) transition-colors">
            <span>View project</span>
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card group overflow-hidden h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden bg-(--bg-elevated)">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-(--bg-card) via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6 flex flex-col grow">
        <span className="text-caption mb-2 block">
          {`// project ${projectNumber}`}
        </span>
        <h3 className="text-lg font-semibold text-(--text-primary) mb-2 group-hover:text-(--primary) transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-(--text-secondary) leading-relaxed mb-5 grow">
          {project.description}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-(--primary) group-hover:text-(--primary-light) transition-colors">
          <span>View project</span>
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
};

export default ProjectCard;
