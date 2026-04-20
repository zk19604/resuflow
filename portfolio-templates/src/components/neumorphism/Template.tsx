'use client';

import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { About, Statistics } from './AboutAndStats';
import { Skills } from './ServicesAndSkills';
import { Portfolio } from './Portfolio';
import { UserProfile, PortfolioConfig } from '@/types/userProfile';

interface NeumorphismTemplateProps {
  profile: UserProfile;
  config: PortfolioConfig;
}

export function NeumorphismTemplate({ profile }: NeumorphismTemplateProps) {
  return (
    <main className="neumorphism-template">
      <Navigation profile={profile} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Statistics profile={profile} />
      <Skills profile={profile} />
      <Portfolio profile={profile} />

      <footer style={{ background: '#DEDAD3', padding: '40px 24px', textAlign: 'center' }}>
        <div className="section-divider max-w-[1400px] mx-auto mb-8" />
        <p style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#A09890' }}>
          © {new Date().getFullYear()} {profile?.personalInfo?.name || 'Your Name'}. Built with ResuFlow
        </p>
      </footer>
    </main>
  );
}
