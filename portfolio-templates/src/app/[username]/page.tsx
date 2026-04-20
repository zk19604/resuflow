// import { UserProfile, PortfolioConfig } from '@/types/userProfile';
// import { Background } from '@/components/glassmorphism/Background';
// import { NavBar } from '@/components/glassmorphism/NavBar';
// import { HeroSection } from '@/components/glassmorphism/HeroSection';
// import { AboutSection } from '@/components/glassmorphism/AboutSection';
// import { SkillsSection } from '@/components/glassmorphism/SkillsSection';
// import { WorkSection } from '@/components/glassmorphism/WorkSection';
// import { TestimonialsSection } from '@/components/glassmorphism/TestimonialsSection';
// import { ContactSection } from '@/components/glassmorphism/ContactSection';
// import { Footer } from '@/components/glassmorphism/Footer';
// import { HighEndMinimalistTemplate } from '@/components/highendminimalist/Template';

// interface PageProps {
//   params: Promise<{ username: string }>;
// }

// interface ProfileResponse {
//   profile: UserProfile;
//   config: PortfolioConfig;
// }

// async function getPortfolioData(username: string): Promise<ProfileResponse | null> {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
//     const res = await fetch(`${baseUrl}/api/profile/${username}`, {
//       next: { revalidate: 60 }
//     });
//     if (!res.ok) {
//       if (res.status === 404) return null;
//       throw new Error('Failed to fetch profile');
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     return null;
//   }
// }

// export default async function PortfolioPage({ params }: PageProps) {
//   const { username } = await params;
//   const data = await getPortfolioData(username);

//   if (!data) {
//     return (
//       <div
//         style={{
//           minHeight: '100vh',
//           background: '#080810',
//           fontFamily: 'Inter, sans-serif',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: 'white',
//         }}
//       >
//         <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Profile Not Found</h1>
//         <p style={{ color: 'rgba(255,255,255,0.6)' }}>
//           The portfolio for &quot;{username}&quot; does not exist.
//         </p>
//       </div>
//     );
//   }

//   const { profile, config } = data;

//   if (config?.template === 'highendminimalist') {
//     return <HighEndMinimalistTemplate profile={profile} config={config} />;
//   }

//   const visible = config?.sectionsVisible || {};
//   const isVisible = (section: string) => visible[section] !== false;

//   const accentColor = config?.palette?.colors[1] || 'rgba(123,47,255,0.4)';

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         background: '#080810',
//         fontFamily: 'Inter, sans-serif',
//         overflowX: 'hidden',
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         html { scroll-behavior: smooth; }

//         ::-webkit-scrollbar { width: 6px; }
//         ::-webkit-scrollbar-track { background: #080810; }
//         ::-webkit-scrollbar-thumb { background: ${accentColor}; border-radius: 3px; }

//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

//         @keyframes orbDrift1 {
//           0%, 100% { transform: translate(0, 0); }
//           33% { transform: translate(28px, -18px); }
//           66% { transform: translate(-22px, 14px); }
//         }
//         @keyframes orbDrift2 {
//           0%, 100% { transform: translate(0, 0); }
//           33% { transform: translate(-30px, 20px); }
//           66% { transform: translate(24px, -16px); }
//         }
//         @keyframes orbDrift3 {
//           0%, 100% { transform: translate(0, 0); }
//           25% { transform: translate(20px, -22px); }
//           75% { transform: translate(-26px, 18px); }
//         }
//         @keyframes orbDrift4 {
//           0%, 100% { transform: translate(0, 0); }
//           40% { transform: translate(-20px, 16px); }
//           80% { transform: translate(28px, -14px); }
//         }
//         @keyframes orbDrift5 {
//           0%, 100% { transform: translate(0, 0); }
//           30% { transform: translate(22px, 18px); }
//           70% { transform: translate(-18px, -20px); }
//         }
//         @keyframes orbDrift6 {
//           0%, 100% { transform: translate(0, 0); }
//           50% { transform: translate(26px, -12px); }
//         }

//         .orb-drift-1 { animation: orbDrift1 16s ease-in-out infinite; }
//         .orb-drift-2 { animation: orbDrift2 18s ease-in-out infinite; }
//         .orb-drift-3 { animation: orbDrift3 14s ease-in-out infinite; }
//         .orb-drift-4 { animation: orbDrift4 17s ease-in-out infinite; }
//         .orb-drift-5 { animation: orbDrift5 15s ease-in-out infinite; }
//         .orb-drift-6 { animation: orbDrift6 13s ease-in-out infinite; }

//         h1, h2, h3, h4 {
//           font-size: unset;
//           font-weight: unset;
//           line-height: unset;
//         }
//       `}</style>

//       <Background />

//       <NavBar profile={profile} />

//       <main style={{ position: 'relative', zIndex: 2 }}>
//         <HeroSection profile={profile} />
//         {isVisible('about') && <AboutSection profile={profile} />}
//         {isVisible('skills') && profile?.skills && <SkillsSection skills={profile.skills} />}
//         {isVisible('experience') && profile?.workExperience && <WorkSection experience={profile.workExperience} />}
//         <TestimonialsSection />
//         <ContactSection profile={profile} />
//       </main>

//       <Footer profile={profile} />
//     </div>
//   );
  
// }
import { UserProfile, PortfolioConfig } from '@/types/userProfile';
import { Background } from '@/components/glassmorphism/Background';
import { NavBar } from '@/components/glassmorphism/NavBar';
import { HeroSection } from '@/components/glassmorphism/HeroSection';
import { AboutSection } from '@/components/glassmorphism/AboutSection';
import { SkillsSection } from '@/components/glassmorphism/SkillsSection';
import { WorkSection } from '@/components/glassmorphism/WorkSection';
import { TestimonialsSection } from '@/components/glassmorphism/TestimonialsSection';
import { ContactSection } from '@/components/glassmorphism/ContactSection';
import { Footer } from '@/components/glassmorphism/Footer';
import { HighEndMinimalistTemplate } from '@/components/highendminimalist/Template';

// 1. Neon Vault Import
import NeonVault from "@/app/neon-vault/page"; 

interface PageProps {
  params: Promise<{ username: string }>;
}

interface ProfileResponse {
  profile: UserProfile;
  config: PortfolioConfig;
}

async function getPortfolioData(username: string): Promise<ProfileResponse | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/profile/${username}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch profile');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export default async function PortfolioPage({ params }: PageProps) {
  const { username } = await params;
  const data = await getPortfolioData(username);

  // Profile Not Found State
  if (!data) {
    return (
      <div style={{ minHeight: '100vh', background: '#080810', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Profile Not Found</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>The portfolio for "{username}" does not exist.</p>
      </div>
    );
  }

  const { profile, config } = data;

  // 2. CHECK FOR HIGH-END MINIMALIST
  if (config?.template === 'highendminimalist') {
    return <HighEndMinimalistTemplate profile={profile} config={config} />;
  }

  // 3. CHECK FOR NEON VAULT (The Purple/Slate Template)
  if (config?.template === 'neon-vault') {
    return <NeonVault userData={profile} />;
  }

  // 4. DEFAULT TO GLASSMORPHISM
  const visible = config?.sectionsVisible || {};
  const isVisible = (section: string) => visible[section] !== false;
  const accentColor = config?.palette?.colors[1] || 'rgba(123,47,255,0.4)';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#080810',
        fontFamily: 'Inter, sans-serif',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #080810; }
        ::-webkit-scrollbar-thumb { background: ${accentColor}; border-radius: 3px; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes orbDrift1 { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(28px, -18px); } 66% { transform: translate(-22px, 14px); } }
        @keyframes orbDrift2 { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(-30px, 20px); } 66% { transform: translate(24px, -16px); } }
        @keyframes orbDrift3 { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(20px, -22px); } 75% { transform: translate(-26px, 18px); } }
        @keyframes orbDrift4 { 0%, 100% { transform: translate(0, 0); } 40% { transform: translate(-20px, 16px); } 80% { transform: translate(28px, -14px); } }
        @keyframes orbDrift5 { 0%, 100% { transform: translate(0, 0); } 30% { transform: translate(22px, 18px); } 70% { transform: translate(-18px, -20px); } }
        @keyframes orbDrift6 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(26px, -12px); } }

        .orb-drift-1 { animation: orbDrift1 16s ease-in-out infinite; }
        .orb-drift-2 { animation: orbDrift2 18s ease-in-out infinite; }
        .orb-drift-3 { animation: orbDrift3 14s ease-in-out infinite; }
        .orb-drift-4 { animation: orbDrift4 17s ease-in-out infinite; }
        .orb-drift-5 { animation: orbDrift5 15s ease-in-out infinite; }
        .orb-drift-6 { animation: orbDrift6 13s ease-in-out infinite; }

        h1, h2, h3, h4 { font-size: unset; font-weight: unset; line-height: unset; }
      `}</style>

      <Background />
      <NavBar profile={profile} />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <HeroSection profile={profile} />
        {isVisible('about') && <AboutSection profile={profile} />}
        {isVisible('skills') && profile?.skills && <SkillsSection skills={profile.skills} />}
        {isVisible('experience') && profile?.workExperience && <WorkSection experience={profile.workExperience} />}
        <TestimonialsSection />
        <ContactSection profile={profile} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}