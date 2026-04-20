'use client';

import { UserProfile, PortfolioConfig } from '@/types/userProfile';
import { Navigation } from '@/components/neumorphism/Navigation';
import { Hero } from '@/components/neumorphism/Hero';
import { About , Statistics } from '@/components/neumorphism/AboutAndStats';
import { Skills } from '@/components/neumorphism/ServicesAndSkills';
import { Portfolio } from '@/components/neumorphism/Portfolio';
import '@/components/neumorphism/neumorphism.css';

interface NeumorphismTemplateProps {
  profile: UserProfile;
  config: PortfolioConfig;
}

export function NeumorphismTemplate({ profile, config }: NeumorphismTemplateProps) {
  const visible = config?.sectionsVisible || {};
  const isVisible = (section: string) => visible[section.toLowerCase()] !== false;

  return (
    <main className="neumorphism-template">
      <Navigation profile={profile} />
      <Hero profile={profile} />
      
      {isVisible('about') && <About profile={profile} />}
      
      <Statistics profile={profile} />
      
      {isVisible('skills') && <Skills profile={profile} />}
      
      {isVisible('work') && <Portfolio profile={profile} />}
      
      {/* Simple Footer */}
      <footer style={{ 
        background: '#DEDAD3', 
        padding: '40px 24px', 
        textAlign: 'center' 
      }}>
        <div className="section-divider max-w-[1400px] mx-auto mb-8" />
        <p style={{ 
          fontFamily: 'DM Sans', 
          fontSize: '12px', 
          color: '#A09890' 
        }}>
          © {new Date().getFullYear()} {profile?.personalInfo?.name || 'Your Name'}. 
          Built with ResuFlow
        </p>
      </footer>
    </main>
  );
}