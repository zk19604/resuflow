import { Background } from '../../components/glassmorphism/Background';
import { NavBar } from '../../components/glassmorphism/NavBar';
import { HeroSection } from '../../components/glassmorphism/HeroSection';
import { AboutSection } from '../../components/glassmorphism/AboutSection';
import { SkillsSection } from '../../components/glassmorphism/SkillsSection';
import { WorkSection } from '../../components/glassmorphism/WorkSection';
import { TestimonialsSection } from '../../components/glassmorphism/TestimonialsSection';
import { ContactSection } from '../../components/glassmorphism/ContactSection';
import { Footer } from '../../components/glassmorphism/Footer';
import { defaultUserProfile } from '@/types/userProfile';

export default function App() {
  const profile = defaultUserProfile;
  
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
        ::-webkit-scrollbar-thumb { background: rgba(123,47,255,0.4); border-radius: 3px; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes orbDrift1 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(28px, -18px); }
          66% { transform: translate(-22px, 14px); }
        }
        @keyframes orbDrift2 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-30px, 20px); }
          66% { transform: translate(24px, -16px); }
        }
        @keyframes orbDrift3 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -22px); }
          75% { transform: translate(-26px, 18px); }
        }
        @keyframes orbDrift4 {
          0%, 100% { transform: translate(0, 0); }
          40% { transform: translate(-20px, 16px); }
          80% { transform: translate(28px, -14px); }
        }
        @keyframes orbDrift5 {
          0%, 100% { transform: translate(0, 0); }
          30% { transform: translate(22px, 18px); }
          70% { transform: translate(-18px, -20px); }
        }
        @keyframes orbDrift6 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(26px, -12px); }
        }

        .orb-drift-1 { animation: orbDrift1 16s ease-in-out infinite; }
        .orb-drift-2 { animation: orbDrift2 18s ease-in-out infinite; }
        .orb-drift-3 { animation: orbDrift3 14s ease-in-out infinite; }
        .orb-drift-4 { animation: orbDrift4 17s ease-in-out infinite; }
        .orb-drift-5 { animation: orbDrift5 15s ease-in-out infinite; }
        .orb-drift-6 { animation: orbDrift6 13s ease-in-out infinite; }

        h1, h2, h3, h4 {
          font-size: unset;
          font-weight: unset;
          line-height: unset;
        }
      `}</style>

      {/* Layer 1 + 2: Background + Orbs */}
      <Background />

      {/* Layer 5: Nav */}
      <NavBar profile={profile} />

      {/* Main content layers */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        {/* Layer 3-4: Sections */}
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection skills={profile.skills} />
        <WorkSection experience={profile.workExperience} />
        <TestimonialsSection />
        <ContactSection profile={profile} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}