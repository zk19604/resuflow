'use client';
import { useState, useRef, useEffect } from 'react';
import { UserProfile } from '@/types/userProfile';

export default function Services({ profile }: { profile: UserProfile }) {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, []);

  const services: { number: string; name: string; description: string; deliverables: string[] }[] = [];
  const seen = new Set<string>();
  profile.workExperience.forEach((exp) => {
    const role = exp.role?.trim();
    if (!role || seen.has(role)) return;
    seen.add(role);
    const achievements = Array.isArray(exp.achievements) ? exp.achievements : [];
    services.push({ number: String(services.length + 1).padStart(2, '0'), name: role, description: exp.description || `Expert ${role.toLowerCase()} services.`, deliverables: achievements.slice(0, 3).map(a => String(a).slice(0, 40)) });
  });
  if (services.length === 0) {
    profile.skills.domain.slice(0, 4).forEach((d, i) => services.push({ number: String(i+1).padStart(2,'0'), name: d, description: `Specialised expertise in ${d.toLowerCase()}.`, deliverables: profile.skills.technical.slice(i*2, i*2+3) }));
  }
  if (services.length === 0) return null;

  return (
    <section id="services" ref={sectionRef} style={{ position: 'relative', padding: '160px 0', background: 'var(--bg-alt)' }}>
      <div style={{ position: 'absolute', top: 80, left: 48, fontSize: 200, fontFamily: 'var(--font-mono)', fontWeight: 300, color: 'var(--gold-primary)', opacity: 0.04, pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>03</div>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ marginBottom: 64, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold-primary)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>Experience</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px,3.5vw,48px)', color: 'var(--text-primary)', margin: 0 }}>What I Offer</h2>
        </div>
        <div>
          {services.map((s, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(201,169,110,0.08)', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.7s ease ${i*0.08}s, transform 0.7s ease ${i*0.08}s` }}>
              <button onClick={() => setExpanded(expanded === i ? null : i)}
                style={{ width: '100%', padding: '32px 0', display: 'flex', alignItems: 'center', gap: 24, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-tertiary)', width: '10%', minWidth: 48 }}>{s.number}</span>
                <span style={{ flex: 1, fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(18px,2.5vw,30px)', color: 'var(--text-primary)', transition: 'color 0.3s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}>
                  {s.name}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--gold-primary)', transform: expanded === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s ease', display: 'inline-block', flexShrink: 0 }}>+</span>
              </button>
              <div style={{ overflow: 'hidden', maxHeight: expanded === i ? 220 : 0, transition: 'max-height 0.5s ease' }}>
                <div style={{ paddingBottom: 32, paddingLeft: 'calc(10% + 24px)', paddingRight: '10%' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '60ch', marginBottom: 16 }}>{s.description}</p>
                  {s.deliverables.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                      {s.deliverables.map((d, j) => <span key={j} style={{ padding: '4px 12px', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 2, fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{d}</span>)}
                    </div>
                  )}
                  <a href="#contact" style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'color 0.3s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                    Get in touch →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
