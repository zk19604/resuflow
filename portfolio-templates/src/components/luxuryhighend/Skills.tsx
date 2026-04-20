'use client';
import { useState, useRef, useEffect } from 'react';
import { UserProfile } from '@/types/userProfile';

const GLOWS = ['rgba(153,102,255,0.15)','rgba(147,197,253,0.15)','rgba(110,168,254,0.15)','rgba(139,146,164,0.15)','rgba(196,144,90,0.15)','rgba(167,139,250,0.15)'];

export default function Skills({ profile }: { profile: UserProfile }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, []);

  const groups = [
    { label: 'Technical', items: profile.skills.technical.slice(0, 8) },
    { label: 'Domain', items: profile.skills.domain.slice(0, 4) },
    { label: 'Soft Skills', items: profile.skills.soft.slice(0, 4) },
    { label: 'Languages', items: profile.skills.languages.slice(0, 4) },
  ].filter(g => g.items.length > 0);

  const primaryTools = profile.skills.tools.slice(0, 6);
  const secondaryTools = profile.skills.tools.slice(6);

  if (groups.length === 0 && primaryTools.length === 0) return null;

  const fade = (delay = 0) => ({ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s` });

  return (
    <section id="skills" ref={sectionRef} style={{ position: 'relative', padding: '160px 0', background: 'var(--bg-base)' }}>
      <div style={{ position: 'absolute', top: 80, right: 48, fontSize: 200, fontFamily: 'var(--font-mono)', fontWeight: 300, color: 'var(--gold-primary)', opacity: 0.04, pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>04</div>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start' }}>

          {/* LEFT — Skill groups */}
          <div style={fade()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 40, height: 1, background: 'var(--gold-primary)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>Expertise</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(28px,3vw,40px)', color: 'var(--text-primary)', marginBottom: 48 }}>Craft & Expertise</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {groups.map((g, gi) => (
                <div key={gi}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-primary)', marginBottom: 12 }}>{g.label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {g.items.map((s, si) => (
                      <span key={si} style={{ padding: '6px 12px', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 2, fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', background: 'rgba(201,169,110,0.03)', opacity: isVisible ? 1 : 0, transition: `opacity 0.5s ease ${gi*0.1+si*0.05}s` }}>{s}</span>
                    ))}
                  </div>
                  {gi < groups.length - 1 && <div style={{ marginTop: 24, height: 1, background: 'rgba(201,169,110,0.08)' }} />}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Tools */}
          <div style={fade(0.2)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 40, height: 1, background: 'var(--gold-primary)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>Tools</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(28px,3vw,40px)', color: 'var(--text-primary)', marginBottom: 48 }}>My Toolkit</h2>
            {primaryTools.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                {primaryTools.map((tool, i) => <ToolCard key={i} name={tool} glow={GLOWS[i % GLOWS.length]} isVisible={isVisible} delay={0.3 + i*0.08} />)}
              </div>
            )}
            {secondaryTools.length > 0 && (
              <div style={{ textAlign: 'center', paddingTop: 16 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-tertiary)' }}>
                  {secondaryTools.map((t, i) => <span key={i} style={{ display: 'inline-block', margin: '0 8px' }}>{t}{i < secondaryTools.length - 1 && ' ·'}</span>)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ name, glow, isVisible, delay }: { name: string; glow: string; isVisible: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ padding: 20, border: '1px solid rgba(201,169,110,0.10)', borderRadius: 4, background: 'var(--bg-card)', boxShadow: hovered ? `0 0 24px ${glow}` : 'none', transition: 'all 0.5s ease', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)', transitionDelay: `${delay}s` }}>
      <div style={{ width: 32, height: 32, marginBottom: 12, border: '1px solid rgba(201,169,110,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(201,169,110,0.06)' }}>
        <div style={{ width: 12, height: 12, borderRadius: 4, background: 'var(--gold-primary)', opacity: 0.5 }} />
      </div>
      <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', marginBottom: 4 }}>{name}</h3>
    </div>
  );
}
