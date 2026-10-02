import DynamicIsland from "./components/DynamicIsland";
import HeroSection from "./components/heroSection";
import AboutSection from "./components/aboutSection";
import ExperienceSection from "./components/ExperienceSection";
import HorizontalProjects from "./components/HorizontalProjects";
import ContactSection from "./components/ContactSection";
import Footer from "./components/footer";
import TechStacksSection from "./components/TechStackSection";
import GitHubStats from "./components/GitHubStats";
import GitHubStreak from "./components/GitHubStreak";
import PrintReveal from "./components/PrintReveal";
import React from "react";

const Home: React.FC = () => (
  <>
    <div className="p-0 m-0">
      <DynamicIsland />
      <PrintReveal anchor="top"><HeroSection /></PrintReveal>
      <PrintReveal anchor="about"><AboutSection /></PrintReveal>
      <PrintReveal anchor="experience"><ExperienceSection /></PrintReveal>
      <HorizontalProjects />
      <PrintReveal anchor="techstacks"><TechStacksSection /></PrintReveal>
      <PrintReveal anchor="github">
        <section id="github" className="bg-(--bg-primary) pb-20">
          <GitHubStats />
          <div className="max-w-6xl mx-auto px-6">
            <GitHubStreak />
          </div>
        </section>
      </PrintReveal>
      <PrintReveal anchor="contact"><ContactSection /></PrintReveal>
      <Footer />
    </div>
  </>
);

export default Home;
