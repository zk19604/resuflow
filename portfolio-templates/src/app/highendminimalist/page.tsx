'use client';

import React, { useRef } from 'react';
import { NavBar } from '@/components/highendminimalist/NavBar';
import { ExperienceRow } from '@/components/highendminimalist/ExperienceRow';
import { SkillCard } from '@/components/highendminimalist/SkillCard';
import { AchievementCard } from '@/components/highendminimalist/AchievementCard';

export default function App() {
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const handleNavigate = (section: string) => {
    const ref = sectionRefs[section as keyof typeof sectionRefs];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactClick = () => {
    window.location.href = 'mailto:alexandra@whitmore.com';
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/alexandrawhitmore', '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-['DM_Sans']">
      {/* Navigation */}
      <NavBar onNavigate={handleNavigate} />

      {/* Hero Section - 100vh, minimum 900px */}
      <section ref={sectionRefs.home} className="min-h-[900px] h-screen flex items-center">
        <div className="w-full max-w-[1440px] mx-auto flex">
          {/* Left Column - 55% */}
          <div className="w-[55%] bg-white pl-20 pr-10 flex flex-col justify-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#999999] mb-6 font-['DM_Sans']">
              Portfolio · 2024
            </p>
            <h1 className="font-['Playfair_Display'] font-bold text-[80px] leading-[1.05] text-[#111111] mb-4 max-w-[580px]">
              Alexandra Whitmore
            </h1>
            <p className="font-['Cormorant_Garamond'] italic text-[28px] text-[#444444] mb-1">
              Chief Strategy Officer
            </p>
            <p className="font-['DM_Sans'] text-[14px] text-[#888888] mb-9">
              Whitmore & Associates · London
            </p>
            <p className="text-[16px] text-[#555555] leading-[1.85] max-w-[440px] mb-12">
              Driving measurable impact through disciplined strategy and decisive leadership across global markets.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 mb-16">
              <button 
                onClick={() => handleNavigate('experience')}
                className="w-[140px] h-[52px] bg-[#1A2744] text-white hover:bg-[#0f1929] transition-colors text-[12px] uppercase font-['DM_Sans'] font-bold tracking-wide"
              >
                View Experience
              </button>
              <button 
                onClick={() => handleNavigate('contact')}
                className="w-[140px] h-[52px] bg-white text-[#1A2744] border border-[#1A2744] hover:bg-[#1A2744] hover:text-white transition-colors text-[12px] uppercase font-['DM_Sans'] font-bold tracking-wide"
              >
                Contact Me
              </button>
            </div>

            {/* QR Code Block */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 border border-[#CCCCCC] bg-white flex items-center justify-center flex-shrink-0">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <rect x="4" y="4" width="24" height="24" fill="#111111"/>
                  <rect x="36" y="4" width="24" height="24" fill="#111111"/>
                  <rect x="4" y="36" width="24" height="24" fill="#111111"/>
                  <rect x="36" y="36" width="12" height="12" fill="#111111"/>
                  <rect x="48" y="48" width="12" height="12" fill="#111111"/>
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-[#999999] font-['DM_Sans']">Scan to view live portfolio</p>
                <p className="text-[11px] text-[#AAAAAA] font-['DM_Sans']">resumeflow.io/awhitmore</p>
              </div>
            </div>
          </div>

          {/* Right Column - 45% - Empty warm space with decorative line */}
          <div className="w-[45%] bg-[#F5F4F0] flex items-center justify-center">
            <div className="w-px h-[120px] bg-[#CCCCCC]"></div>
          </div>
        </div>
      </section>

      {/* About Section - 100vh, minimum 800px */}
      <section ref={sectionRefs.about} className="min-h-[800px] h-screen bg-white flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-20 py-[120px]">
          <div className="flex gap-20">
            {/* Left Column - 38% */}
            <div className="w-[38%] relative">
              <p className="font-['Playfair_Display'] text-[120px] text-[#F0EDE8] absolute top-0 left-0 -translate-y-6 leading-none pointer-events-none">
                01
              </p>
              <h2 className="font-['Playfair_Display'] font-bold text-[56px] text-[#111111] relative z-10 mb-12">
                About
              </h2>

              {/* Stats */}
              <div className="space-y-8">
                <div className="border-b border-[#E8E8E8] pb-8">
                  <p className="font-['Playfair_Display'] font-bold text-[48px] text-[#111111] leading-none mb-3">18+</p>
                  <p className="text-[11px] uppercase text-[#888888] font-['DM_Sans'] tracking-[0.15em]">Years of Experience</p>
                </div>
                <div className="border-b border-[#E8E8E8] pb-8">
                  <p className="font-['Playfair_Display'] font-bold text-[48px] text-[#111111] leading-none mb-3">40+</p>
                  <p className="text-[11px] uppercase text-[#888888] font-['DM_Sans'] tracking-[0.15em]">Clients Served</p>
                </div>
                <div className="border-b border-[#E8E8E8] pb-8">
                  <p className="font-['Playfair_Display'] font-bold text-[48px] text-[#111111] leading-none mb-3">$2B+</p>
                  <p className="text-[11px] uppercase text-[#888888] font-['DM_Sans'] tracking-[0.15em]">Assets Managed</p>
                </div>
              </div>
            </div>

            {/* Right Column - 62% */}
            <div className="w-[62%] pt-[60px]">
              <p className="font-['DM_Sans'] text-[16px] text-[#333333] leading-[1.9] max-w-[560px] mb-6">
                With over 18 years of experience in strategic financial advisory, I specialize in guiding Fortune 500 companies through complex transformations, mergers, and market expansions. My approach combines rigorous analytical frameworks with deep industry expertise to deliver sustainable competitive advantages.
              </p>
              <p className="font-['DM_Sans'] text-[16px] text-[#555555] leading-[1.9] max-w-[560px] mb-10">
                I have successfully led initiatives across multiple sectors including healthcare, technology, and financial services, consistently delivering outcomes that exceed stakeholder expectations.
              </p>

              {/* Competency Tags */}
              <div className="flex gap-3 flex-wrap">
                <div className="border border-[#CCCCCC] bg-white px-5 py-2.5">
                  <span className="font-['DM_Sans'] text-[11px] uppercase text-[#444444] tracking-[0.12em]">Strategy</span>
                </div>
                <div className="border border-[#CCCCCC] bg-white px-5 py-2.5">
                  <span className="font-['DM_Sans'] text-[11px] uppercase text-[#444444] tracking-[0.12em]">M&A Advisory</span>
                </div>
                <div className="border border-[#CCCCCC] bg-white px-5 py-2.5">
                  <span className="font-['DM_Sans'] text-[11px] uppercase text-[#444444] tracking-[0.12em]">Risk Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Auto height, minimum 1000px */}
      <section ref={sectionRefs.experience} className="min-h-[1000px] bg-[#FAFAF8]">
        <div className="w-full max-w-[1440px] mx-auto px-20 py-[100px]">
          <div className="relative mb-10">
            <p className="font-['Playfair_Display'] text-[120px] text-[#EEECE8] absolute top-0 left-0 -translate-y-6 leading-none pointer-events-none">
              02
            </p>
            <h2 className="font-['Playfair_Display'] font-bold text-[56px] text-[#111111] relative z-10">
              Experience
            </h2>
          </div>
          <div className="w-full h-px bg-[#DDDDDA] mb-0"></div>

          <div>
            <ExperienceRow
              yearRange="2019 — Present"
              title="Chief Strategy Officer"
              company="Meridian Capital Partners"
              description="Lead strategic initiatives for a global investment firm managing $15B in assets. Oversee M&A advisory, market expansion strategies, and portfolio optimization for institutional clients."
              location="London, UK"
              achievement="$500M Portfolio Managed"
            />
            <ExperienceRow
              yearRange="2014 — 2019"
              title="Senior Vice President"
              company="Goldman Sachs International"
              description="Directed high-stakes advisory engagements for C-suite executives at Fortune 100 companies. Specialized in corporate restructuring, capital allocation, and competitive positioning."
              location="London, UK"
              achievement="42 Deals Closed"
            />
            <ExperienceRow
              yearRange="2008 — 2014"
              title="Strategy Director"
              company="McKinsey & Company"
              description="Led cross-functional teams in delivering transformative strategies for healthcare and technology sector clients. Developed frameworks that informed billion-dollar investment decisions."
              location="New York, USA"
              achievement="$1.2B Revenue Impact"
            />
          </div>
        </div>
      </section>

      {/* Skills Section - 100vh, minimum 800px */}
      <section ref={sectionRefs.skills} className="min-h-[800px] h-screen bg-white flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-20 py-[100px]">
          <div className="relative mb-2">
            <p className="font-['Playfair_Display'] text-[120px] text-[#F0EDE8] absolute top-0 left-0 -translate-y-6 leading-none pointer-events-none">
              03
            </p>
            <h2 className="font-['Playfair_Display'] font-bold text-[56px] text-[#111111] relative z-10">
              Skills
            </h2>
          </div>
          <p className="text-[12px] uppercase text-[#999999] font-['DM_Sans'] tracking-[0.2em] mb-16">
            Core Competencies
          </p>

          <div className="grid grid-cols-4 gap-6">
            <SkillCard skillName="Financial Modeling" proficiency={95} descriptor="Advanced · 15 Years" />
            <SkillCard skillName="Strategic Planning" proficiency={98} descriptor="Expert · 18 Years" />
            <SkillCard skillName="M&A Advisory" proficiency={92} descriptor="Advanced · 14 Years" />
            <SkillCard skillName="Risk Management" proficiency={90} descriptor="Advanced · 12 Years" />
            <SkillCard skillName="Board Governance" proficiency={88} descriptor="Advanced · 10 Years" />
            <SkillCard skillName="Capital Allocation" proficiency={94} descriptor="Expert · 16 Years" />
            <SkillCard skillName="Stakeholder Relations" proficiency={96} descriptor="Expert · 18 Years" />
            <SkillCard skillName="Corporate Restructuring" proficiency={91} descriptor="Advanced · 13 Years" />
          </div>
        </div>
      </section>

      {/* Education Section - 60vh, minimum 480px */}
      <section className="min-h-[480px] h-[60vh] bg-[#F5F4F0] flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-20 py-20">
          <h2 className="font-['Playfair_Display'] font-bold text-[52px] text-[#111111] mb-14">
            Education
          </h2>

          <div className="grid grid-cols-2 gap-20">
            {/* London Business School */}
            <div className="border-l-[2px] border-l-[#1A2744] pl-4">
              <h3 className="font-['Playfair_Display'] font-semibold text-[22px] text-[#111111] mb-2">
                London Business School
              </h3>
              <p className="font-['DM_Sans'] text-[15px] text-[#555555] mb-1">
                MBA, Corporate Finance
              </p>
              <p className="font-['DM_Sans'] text-[13px] text-[#999999]">
                2006 – 2008
              </p>
            </div>

            {/* University of Edinburgh */}
            <div className="border-l-[2px] border-l-[#1A2744] pl-4">
              <h3 className="font-['Playfair_Display'] font-semibold text-[22px] text-[#111111] mb-2">
                University of Edinburgh
              </h3>
              <p className="font-['DM_Sans'] text-[15px] text-[#555555] mb-1">
                BSc Economics (First Class Honours)
              </p>
              <p className="font-['DM_Sans'] text-[13px] text-[#999999]">
                2002 – 2006
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section - 100vh, minimum 700px */}
      <section className="min-h-[700px] h-screen bg-[#1A2744] flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-20 py-[100px]">
          <div className="mb-4">
            <h2 className="font-['Playfair_Display'] font-bold text-[52px] text-white mb-4">
              Notable Achievements
            </h2>
            <div className="w-full h-px bg-white/15"></div>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-20">
            <AchievementCard
              stat="3×"
              label="Consecutive Recognition"
              description="Named Top 40 Under 40 in Global Finance three years running"
            />
            <AchievementCard
              stat="$2B"
              label="Assets Overseen"
              description="Direct oversight of portfolio across 12 international markets"
            />
            <AchievementCard
              stat="#1"
              label="Ranked Advisor"
              description="Ranked top advisory partner across EMEA region by peer review"
            />
          </div>
        </div>
      </section>

      {/* Contact Section - 100vh, minimum 700px */}
      <section ref={sectionRefs.contact} className="min-h-[700px] h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-20 py-[100px]">
            <div className="flex gap-20">
              {/* Left - 55% */}
              <div className="w-[55%]">
                <h2 className="font-['Playfair_Display'] font-bold text-[60px] text-[#111111] leading-[1.1] mb-5">
                  Let's Connect
                </h2>
                <p className="font-['DM_Sans'] text-[16px] text-[#666666] leading-[1.8] mb-12">
                  Open to advisory roles, board positions, and strategic partnerships.
                </p>

                <div className="space-y-5">
                  <button 
                    onClick={handleContactClick}
                    className="font-['DM_Sans'] text-[15px] text-[#333333] hover:underline transition-all block"
                  >
                    alexandra@whitmore.com
                  </button>
                  <button 
                    onClick={handleLinkedInClick}
                    className="font-['DM_Sans'] text-[15px] text-[#333333] hover:underline transition-all block"
                  >
                    linkedin.com/in/alexandrawhitmore
                  </button>
                  <p className="font-['DM_Sans'] text-[15px] text-[#333333]">
                    London, United Kingdom
                  </p>
                </div>
              </div>

              {/* Right - 45% */}
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
                  <p className="text-[10px] uppercase text-[#999999] text-center font-['DM_Sans'] tracking-[0.15em]">
                    Scan to Visit Live Portfolio
                  </p>
                  <p className="text-[10px] text-[#BBBBBB] text-center font-['DM_Sans']">
                    Generated by ResuFlow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#E8E8E8] py-6">
          <div className="w-full max-w-[1440px] mx-auto px-20 flex items-center justify-between">
            <p className="font-['DM_Sans'] text-[11px] text-[#AAAAAA]">
              © 2024 Alexandra Whitmore
            </p>
            <p className="font-['DM_Sans'] text-[11px] text-[#AAAAAA]">
              Executive Sleek Theme · Powered by ResuFlow
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
