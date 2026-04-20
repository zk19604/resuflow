// portfolio-templates/src/components/neon-vault/Template.tsx
'use client';
 
import NeonBackground from './NeonBackground';
import NeonNavbar from './NeonNavbar';
import NeonHero from './NeonHero';
import NeonSkills from './NeonSkills';
import NeonWork from './NeonWork';
import NeonContact from './NeonContact';
 
export interface PortfolioConfig {
  sectionsVisible?: Record<string, boolean>;
  colorScheme?: string;
}
 
interface NeonVaultTemplateProps {
  profile: any;
  config?: PortfolioConfig;
}
 
export default function NeonVaultTemplate({ profile, config }: NeonVaultTemplateProps) {
  const visible = config?.sectionsVisible || {};
  const isVisible = (s: string) => visible[s] !== false;
 
  // Normalise profile so every sub-component gets consistent shape
  const summary =
    profile?.personalInfo?.summary ||
    profile?.summary ||
    '';
 
  const normProfile = {
    ...profile,
    personalInfo: {
      ...(profile?.personalInfo || {}),
      summary,
    },
    // hero also needs top-level counts
    experienceYears: profile?.workExperience?.length || profile?.experienceYears || 4,
    projectsCount:   profile?.projects?.length       || profile?.projectsCount   || 0,
  };
 
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
      <NeonNavbar profile={{ personalInfo: profile?.personalInfo }} />
 
      {/* Page sections */}
      <main>
        {/* Hero — always visible */}
        <NeonHero profile={normProfile} />
 
        {/* Skills */}
        {isVisible('skills') && (
          <NeonSkills skills={profile?.skills} />
        )}
 
        {/* Work / Experience + Projects */}
        {isVisible('experience') && (
          <NeonWork
            experience={profile?.workExperience}
            projects={profile?.projects}
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