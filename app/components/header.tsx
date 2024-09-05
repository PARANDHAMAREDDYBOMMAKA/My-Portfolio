import Link from "next/link";

const Header: React.FC = () => (
  <header className="bg-black bg-opacity-60 backdrop-blur-md text-white fixed top-0 left-1/2 transform -translate-x-1/2 w-[50%] py-6 rounded-2xl z-50 shadow-lg mt-4">
    <nav className="flex flex-wrap justify-center items-center px-4">
      <ul className="flex flex-wrap justify-center space-x-4 text-center">
        <li>
          <Link
            href="#about"
            className="hover:text-purple-500 transition-colors duration-300 text-sm sm:text-base md:text-lg"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="#techstacks"
            className="hover:text-purple-500 transition-colors duration-300 text-sm sm:text-base md:text-lg"
          >
            Tech Stacks
          </Link>
        </li>
        <li>
          <Link
            href="#projects"
            className="hover:text-purple-500 transition-colors duration-300 text-sm sm:text-base md:text-lg"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="#contact"
            className="hover:text-purple-500 transition-colors duration-300 text-sm sm:text-base md:text-lg"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
