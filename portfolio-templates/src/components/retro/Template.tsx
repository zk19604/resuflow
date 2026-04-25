"use client";

import { useEffect, useState } from 'react';
import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { About } from './About';
import { Experience } from './Experience';
import { Skills } from './Skills';
import { Education } from './Education';
import { Achievements } from './Achievements';
import { Contact } from './Contact';
import { UserProfile, PortfolioConfig } from '@/types/userProfile';

interface RetroTemplateProps {
  profile: UserProfile;
  config: PortfolioConfig;
}

export function RetroTemplate({ profile, config }: RetroTemplateProps) {
  const [activeSection, setActiveSection] = useState('home');
  const visible = config?.sectionsVisible || {};
  const isVisible = (section: string) => visible[section] !== false;

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EDD8' }}>
      <Navigation activeSection={activeSection} profile={profile} />
      <Hero profile={profile} />
      {isVisible('about') && <About profile={profile} />}
      {isVisible('experience') && <Experience profile={profile} />}
      {isVisible('skills') && <Skills profile={profile} />}
      {isVisible('education') && <Education profile={profile} />}
      {isVisible('achievements') && <Achievements profile={profile} />}
      <Contact profile={profile} />
    </div>
  );
}
