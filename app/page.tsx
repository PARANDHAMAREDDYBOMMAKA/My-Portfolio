import Header from "./components/header";
import HeroSection from "./components/heroSection";
import AboutSection from "./components/aboutSection";
import ProjectsSection from "./components/projectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/footer";
import TechStacksSection from "./components/TechStackSection";

const Home: React.FC = () => (
  <>
    <Header />
    <HeroSection />
    <AboutSection />
    <TechStacksSection />
    <ProjectsSection />
    <ContactSection />
    <Footer />
  </>
);

export default Home;
