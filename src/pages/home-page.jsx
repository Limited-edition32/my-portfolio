import React from 'react';
import HeroSection from "@/components/ui/aether-flow-hero";
import AboutSection from "@/components/ui/about-section";
import ProjectsSection from "@/components/ui/projects-section";
import ServicesSection from "@/components/ui/services-section";

const HomePage = () => {
  return (
    <main>
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <ProjectsSection />
      <ServicesSection />
    </main>
  );
};

export default HomePage;
