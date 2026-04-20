'use client';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/types/userProfile';

export function AvailabilityBadge({ profile }: { profile: UserProfile }) {
  const [expanded, setExpanded] = useState(false);
  const contactHref = profile.personalInfo.email ? `mailto:${profile.personalInfo.email}` : '#contact';
  return (
    <div onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}
      style={{ position: 'fixed', bottom: 32, left: 32, zIndex: 40, background: 'rgba(20,20,24,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 2, padding: '8px 14px', width: expanded ? 160 : 140, transition: 'width 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#6B9E6B' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#6B9E6B', animation: 'ping 2s ease-in-out infinite' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
          {expanded ? <a href={contactHref} style={{ color: 'inherit', textDecoration: 'none' }}>Book a call →</a> : 'Open for work'}
        </span>
      </div>
      <style>{`@keyframes ping { 0% { transform: scale(1); opacity: 1; } 75%, 100% { transform: scale(2); opacity: 0; } }`}</style>
    </div>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{ position: 'fixed', bottom: 32, right: 32, width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.25)', background: 'rgba(20,20,24,0.9)', backdropFilter: 'blur(8px)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.5s ease', pointerEvents: visible ? 'auto' : 'none' }}>
      <span style={{ color: 'var(--gold-primary)', fontSize: 14 }}>↑</span>
    </button>
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const h = () => { const sh = document.documentElement.scrollHeight - window.innerHeight; setProgress((window.scrollY / sh) * 100); };
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <div style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: 1, zIndex: 40, pointerEvents: 'none' }}>
      <div style={{ width: '100%', height: `${progress}%`, background: 'var(--gold-primary)', opacity: 0.6, transition: 'height 0.1s linear' }} />
      <div style={{ position: 'absolute', left: -3, top: `${progress}%`, width: 8, height: 8, borderRadius: '50%', background: 'var(--gold-primary)', boxShadow: '0 0 8px rgba(201,169,110,0.5)', transition: 'top 0.1s linear' }} />
    </div>
  );
}

export function NoiseTexture() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
  );
}

export function CustomCursor() {
  // Custom cursor causes overlay issues on the live portfolio - disabled for cleaner output
  return null;
}
