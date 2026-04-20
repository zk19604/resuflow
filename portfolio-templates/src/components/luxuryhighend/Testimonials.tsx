'use client';
import { useRef, useEffect, useState } from 'react';
import { UserProfile } from '@/types/userProfile';

export default function Testimonials({ profile }: { profile: UserProfile }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, []);

  const refs = profile.references.map((r) => ({ text: `A trusted colleague and reference.${r.role ? ` ${r.role}.` : ''}`, name: r.name || 'Reference', role: r.role || '', company: r.contact || '' }));
  if (refs.length === 0) return null;

  useEffect(() => {
    if (refs.length <= 1) return;
    const t = setInterval(() => setCurrentIndex((p) => (p + 1) % refs.length), 7000);
    return () => clearInterval(t);
  }, [refs.length]);

  const current = refs[currentIndex];

  return (
    <section ref={sectionRef} style={{ position: 'relative', padding: '160px 0', background: 'var(--bg-alt)' }}>
      <div style={{ position: 'absolute', top: 80, right: 48, fontSize: 200, fontFamily: 'var(--font-mono)', fontWeight: 300, color: 'var(--gold-primary)', opacity: 0.04, pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>06</div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ marginBottom: 80, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold-primary)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>References</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px,3.5vw,48px)', color: 'var(--text-primary)', margin: 0 }}>Professional References</h2>
        </div>
        <div style={{ position: 'relative', minHeight: 300 }}>
          {/* Large quote mark */}
          <div style={{ position: 'absolute', top: -48, left: 0, fontSize: 180, fontFamily: 'var(--font-display)', fontWeight: 200, color: 'var(--gold-primary)', opacity: 0.08, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>"</div>
          <div style={{ position: 'relative', textAlign: 'center', opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(20px,2.5vw,28px)', fontStyle: 'italic', color: 'var(--text-primary)', maxWidth: 700, margin: '0 auto 48px', lineHeight: 1.65 }}>{current.text}</p>
            <div style={{ width: 40, height: 1, background: 'var(--gold-primary)', opacity: 0.4, margin: '0 auto 24px' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(201,169,110,0.3), rgba(142,154,171,0.2))' }} />
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', marginBottom: 4 }}>{current.name}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>{[current.role, current.company].filter(Boolean).join(', ')}</p>
              </div>
            </div>
          </div>
          {refs.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 64 }}>
              {refs.map((_, i) => (
                <button key={i} onClick={() => setCurrentIndex(i)} style={{ height: 2, width: currentIndex === i ? 80 : 40, background: currentIndex === i ? 'var(--gold-primary)' : 'rgba(201,169,110,0.15)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
