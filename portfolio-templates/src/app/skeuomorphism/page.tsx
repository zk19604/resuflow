'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/skeumorphism/Navigation';
import { HeroSection } from '@/components/skeumorphism/HeroSection';
import { AboutSection } from '@/components/skeumorphism/AboutSection';
import { ExperienceSection } from '@/components/skeumorphism/ExperienceSection';
import { AchievementsSection } from '@/components/skeumorphism/AchievementsSection';
import { SkillsSection } from '@/components/skeumorphism/SkillsSection';
import { EducationSection } from '@/components/skeumorphism/EducationSection';
import { ContactSection } from '@/components/skeumorphism/ContactSection';

export default function SkeuomorphismPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get profile data from localStorage
    const stored = localStorage.getItem("resuflow_profile");
    if (stored) {
      try {
        const parsedProfile = JSON.parse(stored);
        setProfile(parsedProfile);
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0E0A04',
        fontFamily: 'DM Sans, sans-serif'
      }}>
        <p style={{ color: '#C9A96E' }}>Loading your portfolio...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0E0A04',
        fontFamily: 'DM Sans, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#F5E6C8', marginBottom: '16px', fontFamily: 'Playfair Display, serif' }}>
            No Profile Data Found
          </h2>
          <p style={{ color: '#A09070' }}>Please upload your CV first.</p>
        </div>
      </div>
    );
  }

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
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <Navigation profile={profile} />
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      
      {workExperience.length > 0 && <ExperienceSection profile={profile} />}
      {hasAchievements && <AchievementsSection profile={profile} />}
      {hasSkills && <SkillsSection profile={profile} />}
      {hasEducation && <EducationSection profile={profile} />}
      {hasContact && <ContactSection profile={profile} />}
      
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
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ 
              fontFamily: 'DM Sans', 
              fontSize: '10px', 
              color: '#5C4030',
              letterSpacing: '0.2em',
              textTransform: 'uppercase'
            }}>
              Skeuomorphic Card UI
            </span>
            <div style={{ width: '1px', height: '16px', background: 'rgba(200, 160, 80, 0.2)' }} />
            <span style={{ 
              fontFamily: 'DM Sans', 
              fontSize: '10px', 
              color: '#5C4030',
              letterSpacing: '0.2em',
              textTransform: 'uppercase'
            }}>
              Powered by ResuFlow
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}