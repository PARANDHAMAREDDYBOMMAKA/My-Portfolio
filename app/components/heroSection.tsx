/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-indigo-700 text-white text-center"
    >
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-5xl font-extrabold mb-4  animate-pulse">
          {Array.from("Code. Create. Innovate: A Showcase of My Work").map(
            (char, index) => (
              <span
                key={index}
                className="inline-block animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char}
              </span>
            )
          )}
        </h1>
        <p className="text-2xl mb-6 text-gray-400">
          Hi! I'm Parandhama Reddy, a Full Stack Developer based in Andhra
          Pradesh.
        </p>
        <Link href="#projects">
          <p className="bg-purple-500 text-white px-6 py-3 rounded-lg border-2 border-transparent transition duration-300 hover:border-3 hover:border-gradient-to-r hover:from-red-500 hover:via-yellow-500 hover:to-green-500">
            Show My Work 🚀
          </p>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
