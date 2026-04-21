'use client';

import { UserProfile, PortfolioConfig } from '@/types/userProfile';
import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { FeaturedRelease } from './FeaturedRelease';
import { TourDates } from './TourDates';
import { Gallery } from './Gallery';
import { Newsletter } from './Newsletter';
import { Footer } from './Footer';

interface MusicianTemplateProps {
  profile: UserProfile;
  config: PortfolioConfig;
}

export function MusicianTemplate({ profile, config }: MusicianTemplateProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Raleway:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        .musician-root *, .musician-root *::before, .musician-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .musician-root { scroll-behavior: smooth; }

        .musician-root ::-webkit-scrollbar { width: 6px; }
        .musician-root ::-webkit-scrollbar-track { background: #080B14; }
        .musician-root ::-webkit-scrollbar-thumb { background: rgba(194,24,91,0.4); border-radius: 3px; }

        .musician-root h1,
        .musician-root h2,
        .musician-root h3,
        .musician-root h4 {
          font-size: unset;
          font-weight: unset;
          line-height: unset;
        }
      `}</style>

      <div
        className="musician-root"
        style={{
          minHeight: "100vh",
          background: "#080B14",
          color: "#F0EEF5",
          overflowX: "hidden",
          position: "relative",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <Navigation />
        <main>
          <Hero />
          <FeaturedRelease />
          <TourDates />
          <Gallery />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
}