/* eslint-disable @next/next/no-img-element */
import { Project } from "../utils/data";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
    <img
      src={project.imageUrl}
      alt={project.title}
      className="rounded-lg mb-4 w-full h-48 object-cover"
    />
    <h3 className="text-2xl font-bold text-purple-400 mb-2">{project.title}</h3>
    <p className="text-gray-400 mb-4">{project.description}</p>
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
    >
      Show Project
    </a>
  </div>
);

export default ProjectCard;
