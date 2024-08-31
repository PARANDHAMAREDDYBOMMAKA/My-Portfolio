import Link from "next/link";

const Header: React.FC = () => (
  <header className="bg-black bg-opacity-60 backdrop-blur-md text-white fixed w-[40%] top-0 mx-[30%] py-2 my-4 rounded-2xl z-50 shadow-lg">
    <nav className="flex justify-center items-center py-4">
      <ul className="flex space-x-8">
        <li>
          <Link
            href="#about"
            className="hover:text-purple-500 transition-colors duration-300"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="#techstacks"
            className="hover:text-purple-500 transition-colors duration-300"
          >
            Tech Stacks
          </Link>
        </li>
        <li>
          <Link
            href="#projects"
            className="hover:text-purple-500 transition-colors duration-300"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="#contact"
            className="hover:text-purple-500 transition-colors duration-300"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
