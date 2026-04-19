"use client";

import { useState } from 'react';
import { Skills } from '@/types/userProfile';

interface SkillsSectionProps {
  skills: Skills;
}

const defaultSkills: Skills = {
  technical: ['React', 'TypeScript', 'Node.js'],
  tools: ['Figma', 'Framer', 'VS Code'],
  soft: ['Communication', 'Leadership'],
  domain: ['Product Design', 'UX Research'],
  languages: ['English']
};

const skillCards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="3" width="11" height="11" rx="3" stroke="url(#g1)" strokeWidth="1.5"/>
        <rect x="18" y="3" width="11" height="11" rx="3" stroke="url(#g1)" strokeWidth="1.5"/>
        <rect x="3" y="18" width="11" height="11" rx="3" stroke="url(#g1)" strokeWidth="1.5"/>
        <circle cx="23.5" cy="23.5" r="5.5" stroke="url(#g1)" strokeWidth="1.5"/>
        <defs><linearGradient id="g1" x1="3" y1="3" x2="29" y2="29" gradientUnits="userSpaceOnUse"><stop stopColor="#7B2FFF"/><stop offset="1" stopColor="#1A6FFF"/></linearGradient></defs>
      </svg>
    ),
    name: 'Technical Skills' as string,
    desc: '' as string,
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 16 C4 10 10 4 16 4 C22 4 28 10 28 16" stroke="url(#g2)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4 16 C4 22 10 28 16 28 C22 28 28 22 28 16" stroke="url(#g2)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
        <circle cx="16" cy="16" r="3" stroke="url(#g2)" strokeWidth="1.5"/>
        <path d="M16 4 L16 13 M16 19 L16 28" stroke="url(#g2)" strokeWidth="1.5" strokeLinecap="round"/>
        <defs><linearGradient id="g2" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse"><stop stopColor="#7B2FFF"/><stop offset="1" stopColor="#1A6FFF"/></linearGradient></defs>
      </svg>
    ),
    name: 'Tools' as string,
    desc: '' as string,
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <polyline points="4,22 10,14 15,18 21,9 28,14" stroke="url(#g3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="14" r="2" stroke="url(#g3)" strokeWidth="1.5"/>
        <circle cx="15" cy="18" r="2" stroke="url(#g3)" strokeWidth="1.5"/>
        <circle cx="21" cy="9" r="2" stroke="url(#g3)" strokeWidth="1.5"/>
        <defs><linearGradient id="g3" x1="4" y1="9" x2="28" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#7B2FFF"/><stop offset="1" stopColor="#1A6FFF"/></linearGradient></defs>
      </svg>
    ),
    name: 'Domain Expertise' as string,
    desc: '' as string,
  },
];

function SkillCard({ skill }: { skill: { icon: React.ReactNode; name: string; desc: string } }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: hovered ? '1px solid rgba(255,255,255,0.30)' : '1px solid rgba(255,255,255,0.12)',
        borderTop: hovered ? '1px solid rgba(255,255,255,0.38)' : '1px solid rgba(255,255,255,0.22)',
        borderLeft: hovered ? '1px solid rgba(255,255,255,0.38)' : '1px solid rgba(255,255,255,0.22)',
        borderRadius: 20,
        padding: 32,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 16px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18), 0 0 32px rgba(123,47,255,0.15)'
          : '0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
        transition: 'all 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
        cursor: 'default',
      }}
    >
      <div style={{ marginBottom: 16 }}>{skill.icon}</div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, color: '#FFFFFF', marginBottom: 8 }}>
        {skill.name}
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.50)', lineHeight: 1.6 }}>
        {skill.desc}
      </div>
    </div>
  );
}

export function SkillsSection({ skills: userSkills }: SkillsSectionProps) {
  const allSkills = { ...defaultSkills, ...userSkills };
  const skillItems = [
    { icon: skillCards[0].icon, name: 'Technical Skills', desc: allSkills.technical.slice(0, 5).join(', ') || 'Various technical skills' },
    { icon: skillCards[1].icon, name: 'Tools & Software', desc: allSkills.tools.slice(0, 5).join(', ') || 'Various tools' },
    { icon: skillCards[2].icon, name: 'Domain Expertise', desc: allSkills.domain.slice(0, 5).join(', ') || 'Domain knowledge' },
  ];
  
  return (
    <section id="skills" style={{ padding: '120px 80px', position: 'relative', zIndex: 2, width: '100%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)' }}>
            Expertise
          </span>
        </div>

        <h2
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 42, color: '#FFFFFF', marginBottom: 64, textAlign: 'center' }}
        >
          Where I excel
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {skillItems.map((s) => (
            <SkillCard key={s.name} skill={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
