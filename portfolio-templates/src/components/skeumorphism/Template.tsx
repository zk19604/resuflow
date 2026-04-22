'use client';

import { UserProfile, PortfolioConfig } from '@/types/userProfile';
import { Navigation } from './Navigation';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ExperienceSection } from './ExperienceSection';
import { AchievementsSection } from './AchievementsSection';
import { SkillsSection } from './SkillsSection';
import { EducationSection } from './EducationSection';
import { ContactSection } from './ContactSection';

interface SkeuomorphismTemplateProps {
  profile: UserProfile;
  config: PortfolioConfig;
}

export function SkeuomorphismTemplate({ profile, config }: SkeuomorphismTemplateProps) {
  const visible = config?.sectionsVisible || {};
  const isVisible = (section: string) => visible[section.toLowerCase()] !== false;

  const personalInfo = profile?.personalInfo || {};
  const workExperience = profile?.workExperience || [];
  const skills = profile?.skills || { technical: [], tools: [], soft: [] };
  const hasSkills = (skills.technical?.length > 0) || (skills.tools?.length > 0) || (skills.soft?.length > 0);
  const education = profile?.education || [];
  const hasEducation = education.length > 0;
  const achievements = profile?.achievements || [];
  const hasAchievements = achievements.length > 0;
  
  const email = personalInfo.email || '';
  const phone = personalInfo.phone || '';
  const location = personalInfo.location || '';
  const linkedin = personalInfo.linkedin || '';
  const hasContact = email || phone || location || linkedin;

  return (
    <main style={{ background: '#0E0A04', minHeight: '100vh' }}>
      <Navigation profile={profile} />
      <HeroSection profile={profile} />
      
      {isVisible('about') && <AboutSection profile={profile} />}
      
      {isVisible('experience') && workExperience.length > 0 && (
        <ExperienceSection profile={profile} />
      )}
      
      {isVisible('achievements') && hasAchievements && (
        <AchievementsSection profile={profile} />
      )}
      
      {isVisible('skills') && hasSkills && (
        <SkillsSection profile={profile} />
      )}
      
      {isVisible('education') && hasEducation && (
        <EducationSection profile={profile} />
      )}
      
      {isVisible('contact') && hasContact && (
        <ContactSection profile={profile} />
      )}
      
      <footer style={{ 
        background: '#0E0A04', 
        padding: '40px 24px', 
        borderTop: '1px solid rgba(200, 160, 80, 0.1)'
      }}>
        <div style={{ 
          maxWidth: '1440px', 
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 24px'
        }}>
          <span style={{ 
            fontFamily: 'DM Sans', 
            fontSize: '12px', 
            color: '#6A5040',
            letterSpacing: '0.05em'
          }}>
            © {new Date().getFullYear()} {personalInfo.name || 'Your Name'}. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}