// components/TechStacksSection.tsx
"use client"; // This line ensures this component is treated as a client component

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faNodeJs,
  faPython,
  faJs,
  faJava,
} from "@fortawesome/free-brands-svg-icons";
import { faHtml5, faCss3Alt } from "@fortawesome/free-brands-svg-icons";
import { SiTailwindcss, SiChakraui, SiExpress } from "react-icons/si";

const TechStacksSection: React.FC = () => (
  <section id="techstacks" className="py-20 px-10 bg-black text-white">
    <h2 className="text-4xl font-bold text-center mb-6">
      Tech Stacks I’m Familiar With
    </h2>
    <div className="flex flex-wrap justify-center space-x-10 space-y-6">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faReact}
          className="text-5xl text-blue-400 mb-2"
          title="React"
        />
        <span className="text-lg">React</span>
      </div>
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faNodeJs}
          className="text-5xl text-green-400 mb-2"
          title="Node.js"
        />
        <span className="text-lg">Node.js</span>
      </div>
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faPython}
          className="text-5xl text-yellow-400 mb-2"
          title="Python"
        />
        <span className="text-lg">Python</span>
      </div>
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faJs}
          className="text-5xl text-yellow-500 mb-2"
          title="JavaScript"
        />
        <span className="text-lg">JavaScript</span>
      </div>
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faJava}
          className="text-5xl text-red-500 mb-2"
          title="Java"
        />
        <span className="text-lg">Java</span>
      </div>
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faHtml5}
          className="text-5xl text-red-600 mb-2"
          title="HTML"
        />
        <span className="text-lg">HTML</span>
      </div>
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faCss3Alt}
          className="text-5xl text-blue-600 mb-2"
          title="CSS"
        />
        <span className="text-lg">CSS</span>
      </div>
      <div className="flex flex-col items-center">
        <SiTailwindcss
          className="text-5xl text-blue-500 mb-2"
          title="Tailwind CSS"
        />
        <span className="text-lg">Tailwind CSS</span>
      </div>
      <div className="flex flex-col items-center">
        <SiChakraui className="text-5xl text-teal-500 mb-2" title="Chakra UI" />
        <span className="text-lg">Chakra UI</span>
      </div>

      <div className="flex flex-col items-center">
        <SiExpress className="text-5xl text-gray-600 mb-2" title="Express" />
        <span className="text-lg">Express</span>
      </div>
    </div>
  </section>
);

export default TechStacksSection;
