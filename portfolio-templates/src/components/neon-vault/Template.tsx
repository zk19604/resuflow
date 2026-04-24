// // portfolio-templates/src/components/neon-vault/Template.tsx
// 'use client';
 
// import NeonBackground from './NeonBackground';
// import { NeonNavbar } from './NeonNavbar';
// import NeonHero from './NeonHero';
// import NeonSkills from './NeonSkills';
// import NeonWork from './NeonWork';
// import NeonContact from './NeonContact';
// import type { PortfolioConfig, UserProfile } from '@/types/userProfile';
 
// interface NeonVaultTemplateProps {
//   profile?: Partial<UserProfile>;
//   config?: PortfolioConfig;
// }
 
// export default function NeonVaultTemplate({ profile, config }: NeonVaultTemplateProps) {
//   const visible = config?.sectionsVisible || {};
//   const isVisible = (s: string) => visible[s] !== false;
 
//   const summary = profile?.summary || '';
//   const heroTitle = profile?.personalInfo?.location || (summary ? summary.slice(0, 60) : 'Professional portfolio');
//   const fullName = profile?.personalInfo?.name || 'Anonymous';

//   const flatSkills = Array.from(
//     new Set(
//       [
//         ...(profile?.skills?.technical || []),
//         ...(profile?.skills?.tools || []),
//         ...(profile?.skills?.soft || []),
//         ...(profile?.skills?.domain || []),
//         ...(profile?.skills?.languages || []),
//       ].filter(Boolean)
//     )
//   );

//   const workExperience = (profile?.workExperience || []).map((item) => ({
//     role: item.role || '',
//     company: item.company || '',
//     duration: [item.startDate, item.endDate || 'Present'].filter(Boolean).join(' — '),
//     description: [item.description, ...(item.achievements || [])].filter(Boolean).join(' • '),
//   }));
 
//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         background: '#0f172a',
//         color: '#f1f5f9',
//         overflowX: 'hidden',
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&display=swap');
//         * { box-sizing: border-box; }
//         html { scroll-behavior: smooth; }
//         ::-webkit-scrollbar { width: 6px; }
//         ::-webkit-scrollbar-track { background: #0f172a; }
//         ::-webkit-scrollbar-thumb { background: linear-gradient(#22d3ee, #9333ea); border-radius: 3px; }
//       `}</style>
 
//       {/* Fixed atmospheric background */}
//       <NeonBackground />
 
//       {/* Fixed top navbar */}
//       <NeonNavbar />
 
//       {/* Page sections */}
//       <main>
//         {/* Hero — always visible */}
//         <NeonHero name={fullName} title={heroTitle} />
 
//         {/* Skills */}
//         {isVisible('skills') && (
//           <NeonSkills skills={flatSkills} />
//         )}
 
//         {/* Work / Experience + Projects */}
//         {isVisible('experience') && (
//           <NeonWork
//             experience={workExperience}
//           />
//         )}
 
//         {/* Contact */}
//         {isVisible('contact') && (
//           <NeonContact profile={{ personalInfo: profile?.personalInfo }} />
//         )}
//       </main>
//     </div>
//   );
// }
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

  // Extract data from profile with defaults - matching your exact PersonalInfo structure
  const fullName = profile?.personalInfo?.name || 'Alex Kim';
  
  // Since there's no 'title' in PersonalInfo, we'll create a title from role or summary
  // You can use the first work experience role as title, or a default
  const firstWorkRole = profile?.workExperience?.[0]?.role;
  const title = firstWorkRole || 'Full Stack Developer';
  
  const location = profile?.personalInfo?.location || 'Seoul, Korea';
  
  // Get bio from summary
  const bio = profile?.summary || "I build fast, scalable web products with clean code and bold design. 4+ years shipping full-stack applications from concept to production.";
  
  // Calculate stats from work experience
  const workExp = profile?.workExperience || [];
  const totalYears = workExp.length > 0 
    ? workExp.reduce((total, exp) => {
        const start = exp.startDate ? parseInt(exp.startDate.split('-')[0]) : 2020;
        const end = exp.endDate ? parseInt(exp.endDate.split('-')[0]) : new Date().getFullYear();
        return total + (end - start);
      }, 0)
    : 4;
  
  const stats = {
    years: totalYears || 4,
    projects: profile?.projects?.length || 60,
    users: 12000,
  };

  // Process skills - using your exact Skills structure
  const processedSkills = profile?.skills || {
    technical: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    tools: ['Figma', 'Git', 'Docker', 'Vercel'],
    soft: ['Leadership', 'Communication', 'Problem Solving'],
    domain: ['Full Stack', 'UI/UX Design', 'System Architecture'],
    languages: ['English', 'Korean'],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#22d3ee, #9333ea); border-radius: 3px; }
      `}</style>

      <NeonBackground />
      <NeonNavbar />

      <main className="relative z-10">
        <NeonHero 
          name={fullName} 
          title={title} 
          location={location}
          bio={bio}
          stats={stats}
        />

        {isVisible('skills') && (
          <NeonSkills skills={processedSkills} />
        )}

        {isVisible('experience') && (
          <NeonWork experience={profile?.workExperience} />
        )}

        {isVisible('contact') && (
          <NeonContact profile={{ personalInfo: profile?.personalInfo }} />
        )}
      </main>
    </div>
  );
}