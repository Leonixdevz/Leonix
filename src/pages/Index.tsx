import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GuestbookSection from "@/components/GuestbookSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Loading screen duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setShowContent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LoadingScreen isLoading={isLoading} onComplete={handleLoadingComplete} />
      
      {showContent && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <PhilosophySection />
            <section id="work">
              <ProjectsSection />
            </section>
            <SkillsSection />
            <section id="about">
              <AboutSection />
            </section>
            <TestimonialsSection />
            <GuestbookSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
