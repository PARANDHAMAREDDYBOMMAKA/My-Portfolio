import ProjectCard from "./projectCard";
import { projects } from "../utils/data";

const ProjectsSection: React.FC = () => (
  <section
    id="projects"
    className="py-20 px-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white"
  >
    <h2 className="text-4xl font-bold text-center mb-10">My Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </section>
);

export default ProjectsSection;
