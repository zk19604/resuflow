"use client";

import { UserProfile } from '@/types/userProfile';

interface ContactSectionProps {
  profile: UserProfile;
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function DribbbleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
    </svg>
  );
}

function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#FFFFFF',
        textDecoration: 'none',
        transition: 'all 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(123,47,255,0.25)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(123,47,255,0.5)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(123,47,255,0.4)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {icon}
    </a>
  );
}

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section id="contact" style={{ padding: '120px 80px', position: 'relative', zIndex: 2 }}>
      {/* Giant rose+violet orb */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,45,120,0.22) 0%, rgba(123,47,255,0.18) 40%, transparent 70%)',
          filter: 'blur(100px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Glass band */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderTop: '1px solid rgba(255,255,255,0.20)',
          borderLeft: '1px solid rgba(255,255,255,0.20)',
          borderRadius: 24,
          padding: '80px 80px',
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
          boxShadow: '0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)' }}>
            Contact
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 56,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          Let&apos;s Build<br />Something
        </h2>

        <a
          href={`mailto:${profile.personalInfo.email}`}
          style={{
            display: 'inline-block',
            fontFamily: 'Inter, sans-serif',
            fontSize: 22,
            fontWeight: 500,
            background: 'linear-gradient(135deg, #7B2FFF, #1A6FFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none',
            marginBottom: 48,
            transition: 'opacity 300ms',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.8'; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
        >
          {profile.personalInfo.email || 'email@example.com'}
        </a>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          {profile.personalInfo.github && <SocialButton icon={<GithubIcon />} href={profile.personalInfo.github} />}
          {profile.personalInfo.linkedin && <SocialButton icon={<LinkedInIcon />} href={profile.personalInfo.linkedin} />}
          {profile.personalInfo.website && <SocialButton icon={<DribbbleIcon />} href={profile.personalInfo.website} />}
        </div>
      </div>
    </section>
  );
}
