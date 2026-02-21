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
import LiveCodeEditor from "./components/LiveCodeEditor";
import React from "react";

const Home: React.FC = () => (
  <>
    <div className="p-0 m-0">
      <DynamicIsland />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <TechStacksSection />
      <section className="py-24 md:py-32 bg-(--bg-primary)">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-caption uppercase tracking-wider mb-4 block">Showcase</span>
            <h2 className="text-4xl md:text-5xl font-bold text-(--text-primary) mb-6">
              Code in Action
            </h2>
            <p className="text-(--text-muted) max-w-2xl">
              Watch code come to life with real-time syntax highlighting and typing animations
            </p>
          </div>
          <LiveCodeEditor />
        </div>
      </section>
      <GitHubStats />
      <section className="py-16 bg-(--bg-secondary)">
        <div className="max-w-6xl mx-auto px-6">
          <GitHubStreak />
        </div>
      </section>
      <HorizontalProjects />
      <ContactSection />
      <Footer />
    </div>
  </>
);

export default Home;
