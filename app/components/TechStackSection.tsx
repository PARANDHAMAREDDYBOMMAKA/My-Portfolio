"use client"; // Ensure this component is treated as a client component

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
import Slider from "react-slick";
import "../../app/globals.css";

// Slider settings
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  pauseOnHover: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const TechStacksSection: React.FC = () => (
  <section id="techstacks" className="py-20 px-10 bg-black text-white">
    <h2 className="text-4xl font-bold text-center mb-6">
      Tech Stacks I’m Familiar With
    </h2>
    <div className="relative cursor-pointer">
      <Slider {...sliderSettings}>
        {[
          {
            icon: <FontAwesomeIcon icon={faReact} />,
            color: "text-blue-400",
            label: "React",
          },
          {
            icon: <FontAwesomeIcon icon={faNodeJs} />,
            color: "text-green-400",
            label: "Node.js",
          },
          {
            icon: <FontAwesomeIcon icon={faPython} />,
            color: "text-yellow-400",
            label: "Python",
          },
          {
            icon: <FontAwesomeIcon icon={faJs} />,
            color: "text-yellow-500",
            label: "JavaScript",
          },
          {
            icon: <FontAwesomeIcon icon={faJava} />,
            color: "text-red-500",
            label: "Java",
          },
          {
            icon: <FontAwesomeIcon icon={faHtml5} />,
            color: "text-red-600",
            label: "HTML",
          },
          {
            icon: <FontAwesomeIcon icon={faCss3Alt} />,
            color: "text-blue-600",
            label: "CSS",
          },
          {
            icon: <SiTailwindcss className="text-5xl" />,
            color: "text-blue-500",
            label: "Tailwind CSS",
          },
          {
            icon: <SiChakraui className="text-5xl" />,
            color: "text-teal-500",
            label: "Chakra UI",
          },
          {
            icon: <SiExpress className="text-5xl" />,
            color: "text-gray-600",
            label: "Express",
          },
        ].map(({ icon, color, label }, index) => (
          <div key={index} className="flex justify-center items-center p-4">
            <div className="relative rounded-lg shadow-lg p-4">
              <div
                className={`absolute text-[80px] mb-12 top-0 left-0 right-0 bottom-0 flex justify-center items-center ${color}`}
              >
                {icon}
              </div>
              <br />
              <div className="mt-16 text-center">
                <span className="text-xl">{label}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </section>
);

export default TechStacksSection;
