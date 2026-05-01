"use client";

import { UserProfile, PortfolioConfig } from '@/types/userProfile';

interface HeroSectionProps {
  profile: UserProfile;
  palette?: PortfolioConfig['palette'];
}

function FloatingCard({ style, children }: { style: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 16,
        padding: '16px 20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function HeroSection({ profile, palette }: HeroSectionProps) {
  const c1 = palette?.colors?.[1] || '#7B2FFF';
  const c2 = palette?.colors?.[4] || '#1A6FFF';
  const c3 = palette?.colors?.[2] || '#00D4C8';
  return (
    <section
      id="work"
      style={{
        minHeight: '100vh',
        paddingTop: 64,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Floating background cards */}
      <FloatingCard style={{ top: '22%', left: '6%', transform: 'rotate(-8deg)', opacity: 0.7 }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Design Systems</div>
        <div style={{ width: 80, height: 3, borderRadius: 2, background: `linear-gradient(90deg,${c1},${c2})`, marginBottom: 6 }} />
        <div style={{ width: 60, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }} />
      </FloatingCard>

      <FloatingCard style={{ top: '30%', right: '5%', transform: 'rotate(5deg)', opacity: 0.65 }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Vision Pro UI</div>
        <div style={{ width: 64, height: 3, borderRadius: 2, background: `linear-gradient(90deg,${c3},${c1})`, marginBottom: 6 }} />
        <div style={{ width: 48, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }} />
      </FloatingCard>

      <FloatingCard style={{ bottom: '22%', left: '8%', transform: 'rotate(-3deg)', opacity: 0.60 }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Innovation</div>
        <div style={{ width: 56, height: 3, borderRadius: 2, background: `linear-gradient(90deg,${c3},${c2})`, marginBottom: 6 }} />
        <div style={{ width: 40, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }} />
      </FloatingCard>

      {/* Main hero content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 800,
          padding: '0 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Role pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 100,
            padding: '8px 20px',
            marginBottom: 32,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: `linear-gradient(135deg,${c1},${c2})` }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.02em' }}>
            {profile.workExperience[0]?.role || 'Professional'}
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(56px, 8vw, 96px)',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.0,
            marginBottom: 28,
          }}
        >
          {profile.personalInfo.name || 'Your Name'}
        </h1>

        {/* Bio */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 15,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.75,
            maxWidth: 480,
            marginBottom: 44,
          }}
        >
          {profile.summary || 'Professional portfolio'}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              color: '#FFFFFF',
              background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
              border: 'none',
              borderRadius: 100,
              height: 48,
              padding: '0 32px',
              cursor: 'pointer',
              transition: 'all 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
              boxShadow: '0 4px 24px rgba(123,47,255,0.35)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.boxShadow = '0 0 32px rgba(123,47,255,0.6), 0 4px 24px rgba(123,47,255,0.35)';
              (e.target as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.boxShadow = '0 4px 24px rgba(123,47,255,0.35)';
              (e.target as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            View My Work
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              color: '#FFFFFF',
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.20)',
              borderRadius: 100,
              height: 48,
              padding: '0 32px',
              cursor: 'pointer',
              transition: 'all 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
              (e.target as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
              (e.target as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: 0.4,
        }}
      >
        <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.4)' }} />
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)' }}>Scroll</span>
      </div>
    </section>
  );
}

export default HeroSection;
