import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faXTwitter,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const ContactSection: React.FC = () => (
  <section id="contact" className="py-16 text-center text-gray-200 bg-gray-900">
    <h2 className="text-4xl font-bold mb-8 glow-text">Contact Me</h2>
    <p className="text-lg leading-8 mb-8">
      Reach out to me at{" "}
      <a
        href="mailto:rparandhama63@gmail.com"
        className="text-yellow-500 hover:underline"
      >
        rparandhama63@gmail.com
      </a>{" "}
    </p>

    <div className="flex justify-center space-x-6">
      <a
        href="https://www.instagram.com/parandhamareddybommaka/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faInstagram}
          className="text-3xl text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
        />
      </a>
      <a
        href="https://github.com/PARANDHAMAREDDYBOMMAKA"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faGithub}
          className="text-3xl text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
        />
      </a>
      <a
        href="https://x.com/PARANDHAMA123"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faXTwitter}
          className="text-3xl text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
        />
      </a>
      <a
        href="https://www.linkedin.com/in/parandhama-reddy-bommaka/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faLinkedin}
          className="text-3xl text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
        />
      </a>
      <a
        href="https://www.facebook.com/parandhamareddy.sunny/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faFacebook}
          className="text-3xl text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
        />
      </a>
    </div>
  </section>
);

export default ContactSection;
