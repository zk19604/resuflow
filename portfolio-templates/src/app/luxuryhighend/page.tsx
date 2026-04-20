import { defaultUserProfile } from '@/types/userProfile';
import Navigation from '../../components/luxuryhighend/Navigation';
import Hero from '../../components/luxuryhighend/Hero';
import About from '../../components/luxuryhighend/About';
import BrandMarquee from '../../components/luxuryhighend/BrandMarquee';
import Work from '../../components/luxuryhighend/Work';
import Skills from '../../components/luxuryhighend/Skills';
import Numbers from '../../components/luxuryhighend/Numbers';
import Services from '../../components/luxuryhighend/Services';
import Process from '../../components/luxuryhighend/Process';
import Recognition from '../../components/luxuryhighend/Recognition';
import Editorial from '../../components/luxuryhighend/Editorial';
import Testimonials from '../../components/luxuryhighend/Testimonials';
import Contact from '../../components/luxuryhighend/Contact';
import Footer from '../../components/luxuryhighend/Footer';
import {
  AvailabilityBadge,
  BackToTop,
  ScrollProgress,
  NoiseTexture,
} from '../../components/luxuryhighend/UIComponents';

export default function LuxuryHighEndPage() {
  const profile = defaultUserProfile;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap');

        .lhe-root {
          --bg-base:        #0C0C0E;
          --bg-alt:         #111114;
          --bg-card:        rgba(20, 20, 24, 0.6);
          --bg-card-hover:  rgba(24, 24, 30, 0.8);
          --text-primary:   #F0EDE8;
          --text-secondary: #8E9AAB;
          --text-tertiary:  #4A5568;
          --gold-primary:   #C9A96E;
          --gold-light:     #DFC08A;
          --gold-muted:     #8B6E3F;
          --font-display:   'Cormorant Garamond', Georgia, serif;
          --font-body:      'DM Sans', sans-serif;
          --font-mono:      'DM Mono', monospace;
        }

        .lhe-root *, .lhe-root *::before, .lhe-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .lhe-root { scroll-behavior: smooth; }

        .lhe-root ::-webkit-scrollbar { width: 4px; }
        .lhe-root ::-webkit-scrollbar-track { background: #0C0C0E; }
        .lhe-root ::-webkit-scrollbar-thumb {
          background: rgba(201, 169, 110, 0.25);
          border-radius: 2px;
        }

        .lhe-root h1,
        .lhe-root h2,
        .lhe-root h3,
        .lhe-root h4 {
          font-size: unset;
          font-weight: unset;
          line-height: unset;
        }
      `}</style>

      <div
        className="lhe-root"
        style={{
          minHeight: '100vh',
          background: 'var(--bg-base)',
          overflowX: 'hidden',
          position: 'relative',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-primary)',
        }}
      >
        <NoiseTexture />
        <ScrollProgress />
        <AvailabilityBadge profile={profile} />
        <BackToTop />

        <Navigation profile={profile} />

        <main>
          <Hero profile={profile} />
          <About profile={profile} />
          <BrandMarquee profile={profile} />
          <Work profile={profile} />
          <Skills profile={profile} />
          <Numbers profile={profile} />
          <Services profile={profile} />
          <Process />
          <Recognition profile={profile} />
          <Editorial profile={profile} />
          <Testimonials profile={profile} />
          <Contact profile={profile} />
        </main>

        <Footer profile={profile} />
      </div>
    </>
  );
}