'use client';

import React from 'react';
import { UserProfile, PortfolioConfig } from '@/types/userProfile';
import { NavBar } from './NavBar';
import { ExperienceRow } from './ExperienceRow';
import { SkillCard } from './SkillCard';
import { AchievementCard } from './AchievementCard';

interface TemplateProps {
  profile: UserProfile;
  config: PortfolioConfig;
}

function yearsOfExperience(workExperience: UserProfile['workExperience']): number {
  if (!workExperience.length) return 0;
  const oldest = workExperience.reduce((min, exp) => {
    const year = parseInt(exp.startDate?.slice(0, 4) || '9999');
    return year < min ? year : min;
  }, 9999);
  return oldest < 9999 ? new Date().getFullYear() - oldest : 0;
}

function skillProficiency(index: number, total: number): number {
  return Math.max(65, Math.round(96 - (index / Math.max(total, 1)) * 28));
}

export function HighEndMinimalistTemplate({ profile, config }: TemplateProps) {
  const handleNavigate = (section: string) => {
    const el = document.getElementById(`section-${section}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const visible = config.sectionsVisible || {};
  const isVisible = (section: string) => visible[section] !== false;

  const accent = config.palette?.colors[0] || '#1A2744';
  const accentLight = config.palette?.colors[2] || '#F5F4F0';
  const headingFont = config.font === 'serif' ? "'Playfair Display', serif" : "'DM Sans', sans-serif";

  const { personalInfo, summary, workExperience, education, skills, achievements } = profile;
  const currentRole = workExperience[0]?.role || '';
  const currentCompany = workExperience[0]?.company || '';
  const yoe = yearsOfExperience(workExperience);

  const allSkills = [
    ...(skills.technical || []),
    ...(skills.domain || []),
    ...(skills.tools || []),
  ].slice(0, 8);

  return (
    <div className="min-h-screen bg-white font-['DM_Sans']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@1,400;1,600&display=swap');
        :root {
          --accent: ${accent};
          --accent-light: ${accentLight};
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      <NavBar onNavigate={handleNavigate} />

      {/* Hero */}
      <section id="section-home" className="min-h-[900px] h-screen flex items-center">
        <div className="w-full max-w-[1440px] mx-auto flex">
          <div className="w-[55%] bg-white pl-20 pr-10 flex flex-col justify-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#999999] mb-6">
              Portfolio · {new Date().getFullYear()}
            </p>
            <h1
              className="font-bold text-[80px] leading-[1.05] text-[#111111] mb-4 max-w-[580px]"
              style={{ fontFamily: config.font === 'serif' ? "'Playfair Display', serif" : "'DM Sans', sans-serif" }}
            >
              {personalInfo.name || 'Your Name'}
            </h1>
            {currentRole && (
              <p className="font-['Cormorant_Garamond'] italic text-[28px] text-[#444444] mb-1">
                {currentRole}
              </p>
            )}
            {(currentCompany || personalInfo.location) && (
              <p className="text-[14px] text-[#888888] mb-9">
                {[currentCompany, personalInfo.location].filter(Boolean).join(' · ')}
              </p>
            )}
            {summary && (
              <p className="text-[16px] text-[#555555] leading-[1.85] max-w-[440px] mb-12">
                {summary.slice(0, 200)}{summary.length > 200 ? '…' : ''}
              </p>
            )}
            <div className="flex items-center gap-4 mb-16">
              <button
                onClick={() => handleNavigate('experience')}
                className="w-[140px] h-[52px] text-white hover:opacity-90 transition-opacity text-[12px] uppercase font-bold tracking-wide"
                style={{ backgroundColor: accent }}
              >
                View Experience
              </button>
              <button
                onClick={() => handleNavigate('contact')}
                className="w-[140px] h-[52px] bg-white hover:opacity-90 transition-opacity text-[12px] uppercase font-bold tracking-wide border"
                style={{ color: accent, borderColor: accent }}
              >
                Contact Me
              </button>
            </div>
       
          </div>
          <div className="w-[45%] flex items-center justify-center" style={{ backgroundColor: accentLight }}>
            <div className="w-px h-[120px] bg-[#CCCCCC]" />
          </div>
        </div>
      </section>

      {/* About */}
      {isVisible('about') && (
        <section id="section-about" className="min-h-[800px] h-screen bg-white flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-20 py-[120px]">
            <div className="flex gap-20">
              <div className="w-[38%] relative">
                <p className="font-['Playfair_Display'] text-[120px] text-[#F0EDE8] absolute top-0 left-0 -translate-y-6 leading-none pointer-events-none">01</p>
                <h2 style={{ fontFamily: headingFont }} className="font-bold text-[56px] text-[#111111] relative z-10 mb-12">About</h2>
                <div className="space-y-8">
                  {yoe > 0 && (
                    <div className="border-b border-[#E8E8E8] pb-8">
                      <p className="font-['Playfair_Display'] font-bold text-[48px] text-[#111111] leading-none mb-3">{yoe}+</p>
                      <p className="text-[11px] uppercase text-[#888888] tracking-[0.15em]">Years of Experience</p>
                    </div>
                  )}
                  {workExperience.length > 0 && (
                    <div className="border-b border-[#E8E8E8] pb-8">
                      <p className="font-['Playfair_Display'] font-bold text-[48px] text-[#111111] leading-none mb-3">{workExperience.length}</p>
                      <p className="text-[11px] uppercase text-[#888888] tracking-[0.15em]">Roles Held</p>
                    </div>
                  )}
                  {allSkills.length > 0 && (
                    <div className="border-b border-[#E8E8E8] pb-8">
                      <p className="font-['Playfair_Display'] font-bold text-[48px] text-[#111111] leading-none mb-3">{allSkills.length}+</p>
                      <p className="text-[11px] uppercase text-[#888888] tracking-[0.15em]">Core Skills</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-[62%] pt-[60px]">
                {summary && (
                  <p className="text-[16px] text-[#333333] leading-[1.9] max-w-[560px] mb-10">
                    {summary}
                  </p>
                )}
                {skills.technical.length > 0 && (
                  <div className="flex gap-3 flex-wrap">
                    {[...skills.technical, ...skills.domain].slice(0, 4).map((skill) => (
                      <div key={skill} className="border border-[#CCCCCC] bg-white px-5 py-2.5">
                        <span className="text-[11px] uppercase text-[#444444] tracking-[0.12em]">{skill}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {isVisible('experience') && workExperience.length > 0 && (
        <section id="section-experience" className="min-h-[1000px]" style={{ backgroundColor: '#FAFAF8' }}>
          <div className="w-full max-w-[1440px] mx-auto px-20 py-[100px]">
            <div className="relative mb-10">
              <p className="font-['Playfair_Display'] text-[120px] text-[#EEECE8] absolute top-0 left-0 -translate-y-6 leading-none pointer-events-none">02</p>
              <h2 style={{ fontFamily: headingFont }} className="font-bold text-[56px] text-[#111111] relative z-10">Experience</h2>
            </div>
            <div className="w-full h-px bg-[#DDDDDA] mb-0" />
            <div>
              {workExperience.map((exp, i) => {
                const startYear = exp.startDate?.slice(0, 4) || '';
                const endYear = exp.endDate?.toLowerCase() === 'present' || !exp.endDate ? 'Present' : exp.endDate?.slice(0, 4) || '';
                const yearRange = startYear ? `${startYear} — ${endYear}` : '';
                const achievement = exp.achievements?.[0] || '';
                return (
                  <ExperienceRow
                    key={i}
                    yearRange={yearRange}
                    title={exp.role}
                    company={exp.company}
                    description={exp.description}
                    location={''}
                    achievement={achievement}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {isVisible('skills') && allSkills.length > 0 && (
        <section id="section-skills" className="min-h-[800px] h-screen bg-white flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-20 py-[100px]">
            <div className="relative mb-2">
              <p className="font-['Playfair_Display'] text-[120px] text-[#F0EDE8] absolute top-0 left-0 -translate-y-6 leading-none pointer-events-none">03</p>
              <h2 style={{ fontFamily: headingFont }} className="font-bold text-[56px] text-[#111111] relative z-10">Skills</h2>
            </div>
            <p className="text-[12px] uppercase text-[#999999] tracking-[0.2em] mb-16">Core Competencies</p>
            <div className="grid grid-cols-4 gap-6">
              {allSkills.map((skill, i) => (
                <SkillCard
                  key={skill}
                  skillName={skill}
                  proficiency={skillProficiency(i, allSkills.length)}
                  descriptor={skills.technical.includes(skill) ? 'Technical' : skills.domain.includes(skill) ? 'Domain' : 'Tool'}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {isVisible('education') && education.length > 0 && (
        <section className="min-h-[480px] h-[60vh] flex items-center" style={{ backgroundColor: accentLight }}>
          <div className="w-full max-w-[1440px] mx-auto px-20 py-20">
            <h2 style={{ fontFamily: headingFont }} className="font-bold text-[52px] text-[#111111] mb-14">Education</h2>
            <div className="grid grid-cols-2 gap-20">
              {education.map((edu, i) => (
                <div key={i} className="pl-4" style={{ borderLeft: `2px solid ${accent}` }}>
                  <h3 className="font-['Playfair_Display'] font-semibold text-[22px] text-[#111111] mb-2">{edu.institution}</h3>
                  <p className="text-[15px] text-[#555555] mb-1">{[edu.degree, edu.field].filter(Boolean).join(', ')}</p>
                  <p className="text-[13px] text-[#999999]">
                    {[edu.startDate?.slice(0, 4), edu.endDate?.slice(0, 4) || 'Present'].filter(Boolean).join(' – ')}
                    {edu.grade ? ` · ${edu.grade}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements */}
      {isVisible('achievements') && achievements.length > 0 && (
        <section className="min-h-[700px] h-screen flex items-center" style={{ backgroundColor: accent }}>
          <div className="w-full max-w-[1440px] mx-auto px-20 py-[100px]">
            <div className="mb-4">
              <h2 style={{ fontFamily: headingFont }} className="font-bold text-[52px] text-white mb-4">Notable Achievements</h2>
              <div className="w-full h-px bg-white/15" />
            </div>
            <div className="grid grid-cols-3 gap-8 mt-20">
              {achievements.slice(0, 3).map((ach, i) => (
                <AchievementCard
                  key={i}
                  stat={ach.date?.slice(0, 4) || `#${i + 1}`}
                  label={ach.title}
                  description={ach.description}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="section-contact" className="min-h-[700px] h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-20 py-[100px]">
            <div className="flex gap-20">
              <div className="w-[55%]">
                <h2 style={{ fontFamily: headingFont }} className="font-bold text-[60px] text-[#111111] leading-[1.1] mb-5">
                  Let&apos;s Connect
                </h2>
                <p className="text-[16px] text-[#666666] leading-[1.8] mb-12">
                  {config.tone === 'creative'
                    ? "Let's build something extraordinary together."
                    : config.tone === 'friendly'
                    ? "I'd love to hear from you — let's chat!"
                    : 'Open to new opportunities, collaborations, and conversations.'}
                </p>
                <div className="space-y-5">
                  {personalInfo.email && (
                    <a href={`mailto:${personalInfo.email}`} className="text-[15px] text-[#333333] hover:underline block">
                      {personalInfo.email}
                    </a>
                  )}
                  {personalInfo.linkedin && (
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-[15px] text-[#333333] hover:underline block">
                      {personalInfo.linkedin.replace('https://', '')}
                    </a>
                  )}
                  {personalInfo.location && (
                    <p className="text-[15px] text-[#333333]">{personalInfo.location}</p>
                  )}
                </div>
              </div>
              <div className="w-[45%] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 border border-[#CCCCCC] bg-white flex items-center justify-center">
                    <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                      <rect x="8" y="8" width="36" height="36" fill="#111111"/>
                      <rect x="52" y="8" width="36" height="36" fill="#111111"/>
                      <rect x="8" y="52" width="36" height="36" fill="#111111"/>
                      <rect x="52" y="52" width="16" height="16" fill="#111111"/>
                      <rect x="72" y="72" width="16" height="16" fill="#111111"/>
                      <rect x="52" y="72" width="12" height="12" fill="#111111"/>
                      <rect x="72" y="52" width="12" height="12" fill="#111111"/>
                    </svg>
                  </div>
                  <p className="text-[10px] uppercase text-[#999999] text-center tracking-[0.15em]">Scan to Visit Live Portfolio</p>
                  <p className="text-[10px] text-[#BBBBBB] text-center">Generated by ResuFlow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E8E8E8] py-6">
          <div className="w-full max-w-[1440px] mx-auto px-20 flex items-center justify-between">
            <p className="text-[11px] text-[#AAAAAA]">© {new Date().getFullYear()} {personalInfo.name}</p>
            <p className="text-[11px] text-[#AAAAAA]">High-End Minimalist Theme · Powered by ResuFlow</p>
          </div>
        </div>
      </section>
    </div>
  );
}
