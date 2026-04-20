'use client';
import { useEffect, useRef, useState } from 'react';
import { UserProfile } from '@/types/userProfile';

export default function About({ profile }: { profile: UserProfile }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const timeline = profile.workExperience.slice(0, 4).map((exp) => ({
    year: exp.startDate?.slice(0, 4) || '',
    role: exp.role || '',
    company: exp.company || '',
    achievement: Array.isArray(exp.achievements) && exp.achievements.length > 0 ? exp.achievements[0] : exp.description?.split('.')[0] || '',
  }));

  const valueEntries: { title: string; desc: string }[] = [];
  if (profile.skills.technical.length > 0) valueEntries.push({ title: 'Technical depth', desc: profile.skills.technical.slice(0, 3).join(', ') });
  if (profile.skills.tools.length > 0) valueEntries.push({ title: 'Tools & craft', desc: profile.skills.tools.slice(0, 3).join(', ') });
  if (profile.skills.soft.length > 0) valueEntries.push({ title: 'Soft skills', desc: profile.skills.soft.slice(0, 3).join(', ') });
  if (profile.skills.domain.length > 0) valueEntries.push({ title: 'Domain expertise', desc: profile.skills.domain.slice(0, 3).join(', ') });
  const values = valueEntries.length >= 2 ? valueEntries.slice(0, 4) : [{ title: 'Results-driven', desc: 'Impact measured, not just aesthetics' }, { title: 'Collaborative', desc: 'Working closely with stakeholders' }];

  const fade = (delay = 0) => ({ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s` });

  return (
    <section id="about" ref={sectionRef} style={{ position: 'relative', padding: '160px 0', background: 'var(--bg-base)' }}>
      {/* Watermark */}
      <div style={{ position: 'absolute', top: 80, left: 48, fontSize: 200, fontFamily: 'var(--font-mono)', fontWeight: 300, color: 'var(--gold-primary)', opacity: 0.04, pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>01</div>

      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 128, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, ...fade() }}>
            {/* Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 1, background: 'var(--gold-primary)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>About</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px,3.5vw,48px)', color: 'var(--text-primary)', maxWidth: 380, margin: 0 }}>The Mind Behind the Work</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
                {profile.summary || 'A professional dedicated to delivering exceptional results through expertise, creativity, and strategic thinking.'}
              </p>
              {(profile.personalInfo.location || profile.personalInfo.email) && (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-tertiary)', margin: 0 }}>
                  {[profile.personalInfo.location, profile.personalInfo.email].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>

            <div style={{ width: 60, height: 1, background: 'var(--gold-primary)', opacity: 0.4 }} />

            {/* Values grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {values.map((v, i) => (
                <div key={i} style={{ paddingLeft: 16, borderLeft: '2px solid rgba(201,169,110,0.3)', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)', transition: `opacity 0.7s ease ${0.3+i*0.1}s, transform 0.7s ease ${0.3+i*0.1}s` }}>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', marginBottom: 4 }}>{v.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Timeline */}
          <div style={{ position: 'relative', ...fade(0.2) }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'var(--gold-primary)', opacity: 0.15 }} />

            <div style={{ paddingLeft: 48, display: 'flex', flexDirection: 'column', gap: 48 }}>
              {timeline.length > 0 ? timeline.map((item, i) => (
                <div key={i} style={{ position: 'relative', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.7s ease ${0.4+i*0.2}s, transform 0.7s ease ${0.4+i*0.2}s` }}>
                  {/* Node */}
                  <div style={{ position: 'absolute', left: -52, top: 4, width: 8, height: 8, borderRadius: '50%', background: 'var(--gold-primary)', boxShadow: '0 0 0 4px rgba(201,169,110,0.12)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold-primary)', margin: 0 }}>{item.year}</p>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 17, color: 'var(--text-primary)', margin: 0 }}>{item.role}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>{item.company}</p>
                    {item.achievement && <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-tertiary)', margin: 0 }}>{item.achievement}</p>}
                  </div>
                </div>
              )) : <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-tertiary)' }}>No work experience provided.</p>}
              {/* End diamond */}
              <div style={{ position: 'absolute', left: -7, bottom: 0, width: 8, height: 8, transform: 'rotate(45deg)', background: 'var(--gold-primary)', opacity: 0.4 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
