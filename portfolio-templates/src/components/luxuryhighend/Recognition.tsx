'use client';
import { useRef, useEffect, useState } from 'react';
import { UserProfile } from '@/types/userProfile';

export default function Recognition({ profile }: { profile: UserProfile }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, []);

  const awards: { name: string; body: string; year: string }[] = [];
  profile.certifications.forEach(c => awards.push({ name: c.name || 'Certification', body: c.issuer || '', year: c.date?.slice(0, 4) || '' }));
  const achievementItems = Array.isArray(profile.achievements) ? profile.achievements : [];
  achievementItems.forEach(a => { if (typeof a === 'object' && a.title) awards.push({ name: a.title, body: a.description || '', year: a.date?.slice(0, 4) || '' }); });
  const display = awards.slice(0, 4);
  if (display.length === 0) return null;

  return (
    <section id="recognition" ref={sectionRef} style={{ position: 'relative', padding: '112px 0', background: 'var(--bg-base)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 80, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px,3.5vw,48px)', color: 'var(--text-primary)', margin: 0 }}>
            {profile.certifications.length > 0 ? 'Certifications & Recognition' : 'Recognition'}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px 64px', maxWidth: 800, margin: '0 auto' }}>
          {display.map((award, i) => (
            <div key={i} style={{ textAlign: 'center', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.9s ease ${i*0.1}s, transform 0.9s ease ${i*0.1}s` }}>
              <div style={{ marginBottom: 16 }}><span style={{ fontSize: 10, color: 'var(--gold-primary)', opacity: 0.3 }}>★</span></div>
              <div style={{ width: 40, height: 1, background: 'var(--gold-primary)', margin: '0 auto 24px' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 22, color: 'var(--text-primary)', marginBottom: 12 }}>{award.name}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>{[award.body, award.year].filter(Boolean).join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
