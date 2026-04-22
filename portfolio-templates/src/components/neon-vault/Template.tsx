// portfolio-templates/src/components/neon-vault/Template.tsx
'use client';
 
import NeonBackground from './NeonBackground';
import { NeonNavbar } from './NeonNavbar';
import NeonHero from './NeonHero';
import NeonSkills from './NeonSkills';
import NeonWork from './NeonWork';
import NeonContact from './NeonContact';
import type { PortfolioConfig, UserProfile } from '@/types/userProfile';
 
interface NeonVaultTemplateProps {
  profile?: Partial<UserProfile>;
  config?: PortfolioConfig;
}
 
export default function NeonVaultTemplate({ profile, config }: NeonVaultTemplateProps) {
  const visible = config?.sectionsVisible || {};
  const isVisible = (s: string) => visible[s] !== false;
 
  const summary = profile?.summary || '';
  const heroTitle = profile?.personalInfo?.location || (summary ? summary.slice(0, 60) : 'Professional portfolio');
  const fullName = profile?.personalInfo?.name || 'Anonymous';

  const flatSkills = Array.from(
    new Set(
      [
        ...(profile?.skills?.technical || []),
        ...(profile?.skills?.tools || []),
        ...(profile?.skills?.soft || []),
        ...(profile?.skills?.domain || []),
        ...(profile?.skills?.languages || []),
      ].filter(Boolean)
    )
  );

  const workExperience = (profile?.workExperience || []).map((item) => ({
    role: item.role || '',
    company: item.company || '',
    duration: [item.startDate, item.endDate || 'Present'].filter(Boolean).join(' — '),
    description: [item.description, ...(item.achievements || [])].filter(Boolean).join(' • '),
  }));
 
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        color: '#f1f5f9',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#22d3ee, #9333ea); border-radius: 3px; }
      `}</style>
 
      {/* Fixed atmospheric background */}
      <NeonBackground />
 
      {/* Fixed top navbar */}
      <NeonNavbar />
 
      {/* Page sections */}
      <main>
        {/* Hero — always visible */}
        <NeonHero name={fullName} title={heroTitle} />
 
        {/* Skills */}
        {isVisible('skills') && (
          <NeonSkills skills={flatSkills} />
        )}
 
        {/* Work / Experience + Projects */}
        {isVisible('experience') && (
          <NeonWork
            experience={workExperience}
          />
        )}
 
        {/* Contact */}
        {isVisible('contact') && (
          <NeonContact profile={{ personalInfo: profile?.personalInfo }} />
        )}
      </main>
    </div>
  );
}