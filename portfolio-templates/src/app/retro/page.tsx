"use client";

import { useEffect, useState } from 'react';
import { Navigation } from '../../components/retro/Navigation';
import { Hero } from '../../components/retro/Hero';
import { About } from '../../components/retro/About';
import { Experience } from '../../components/retro/Experience';
import { Skills } from '../../components/retro/Skills';
import { Education } from '../../components/retro/Education';
import { Achievements } from '../../components/retro/Achievements';
import { Contact } from '../../components/retro/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Intersection Observer for active nav highlighting
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EDD8' }}>
      <Navigation activeSection={activeSection} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Achievements />
      <Contact />
    </div>
  );
}
