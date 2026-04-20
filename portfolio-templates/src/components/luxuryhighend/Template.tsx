'use client';

import { UserProfile, PortfolioConfig } from '@/types/userProfile';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import BrandMarquee from './BrandMarquee';
import Work from './Work';
import Services from './Services';
import Skills from './Skills';
import Numbers from './Numbers';
import Process from './Process';
import Recognition from './Recognition';
import Editorial from './Editorial';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import BackToTop from './BackToTop';
import AvailabilityBadge from './AvailabilityBadge';
import ScrollProgress from './ScrollProgress';
import NoiseTexture from './NoiseTexture';

interface LuxuryHighEndTemplateProps {
  profile: UserProfile;
  config: PortfolioConfig;
}

export function LuxuryHighEndTemplate({ profile, config }: LuxuryHighEndTemplateProps) {
  const visible = config?.sectionsVisible || {};
  const isVisible = (section: string) => visible[section.toLowerCase()] !== false;

  return (
    <>
      {/* ── Global styles for the luxury high-end template ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap');

        /* CSS custom properties used throughout the template */
        .luxuryhighend-root {
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

        .luxuryhighend-root * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .luxuryhighend-root html,
        .luxuryhighend-root {
          scroll-behavior: smooth;
        }

        /* Scrollbar */
        .luxuryhighend-root ::-webkit-scrollbar { width: 4px; }
        .luxuryhighend-root ::-webkit-scrollbar-track { background: var(--bg-base); }
        .luxuryhighend-root ::-webkit-scrollbar-thumb {
          background: rgba(201, 169, 110, 0.25);
          border-radius: 2px;
        }

        /* Tailwind-like utilities used inside template components */
        .luxuryhighend-root h1,
        .luxuryhighend-root h2,
        .luxuryhighend-root h3,
        .luxuryhighend-root h4 {
          font-size: unset;
          font-weight: unset;
          line-height: unset;
        }
      `}</style>

      <div
        className="luxuryhighend-root"
        style={{
          minHeight: '100vh',
          background: 'var(--bg-base)',
          overflowX: 'hidden',
          position: 'relative',
        }}
      >
        {/* ── UI chrome (no profile data needed) ── */}
        <NoiseTexture />
        <ScrollProgress />
        <CustomCursor />
        <AvailabilityBadge profile={profile} />
        <BackToTop />

        {/* ── Navigation ── */}
        <Navigation profile={profile} />

        {/* ── Main sections ── */}
        <main>
          <Hero profile={profile} />

          {isVisible('about') && <About profile={profile} />}

          <BrandMarquee profile={profile} />

          {isVisible('work') && <Work profile={profile} />}

          {isVisible('skills') && <Skills profile={profile} />}

          <Numbers profile={profile} />

          {isVisible('services') && <Services profile={profile} />}

          <Process />

          {isVisible('recognition') && <Recognition profile={profile} />}

          {isVisible('achievements') && <Editorial profile={profile} />}

          {isVisible('experience') && <Testimonials profile={profile} />}

          <Contact profile={profile} />
        </main>

        {/* ── Footer ── */}
        <Footer profile={profile} />
      </div>
    </>
  );
}