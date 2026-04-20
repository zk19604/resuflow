'use client';
import { useEffect, useRef, useState } from 'react';
import { UserProfile } from '@/types/userProfile';

export default function Numbers({ profile }: { profile: UserProfile }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, []);

  const yearsOfExperience = (() => {
    const dates = profile.workExperience.map((w) => parseInt(w.startDate?.slice(0, 4))).filter((y) => !isNaN(y));
    if (!dates.length) return null;
    return new Date().getFullYear() - Math.min(...dates);
  })();
  const totalSkills = profile.skills.technical.length + profile.skills.tools.length + profile.skills.soft.length + profile.skills.domain.length;

  const stats = [
    profile.projects.length > 0 && { label: 'Projects Delivered', number: profile.projects.length, suffix: '+', eyebrow: 'Portfolio' },
    yearsOfExperience !== null && { label: 'Years Experience', number: yearsOfExperience, suffix: '+', eyebrow: 'Career' },
    profile.workExperience.length > 0 && { label: 'Companies Worked', number: profile.workExperience.length, suffix: '', eyebrow: 'Clients' },
    totalSkills > 0 && { label: 'Skills & Tools', number: totalSkills, suffix: '+', eyebrow: 'Expertise' },
  ].filter(Boolean).slice(0, 4) as { label: string; number: number; suffix: string; eyebrow: string }[];

  if (stats.length === 0) return null;

  const cols = stats.length === 4 ? '1fr 1fr 1fr 1fr' : stats.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr';

  return (
    <section ref={sectionRef} style={{ position: 'relative', padding: '96px 0', background: 'var(--bg-alt)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 48 }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.9s ease ${i*0.1}s, transform 0.9s ease ${i*0.1}s` }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 12 }}>{stat.eyebrow}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: 8 }}>
                <CountUp end={stat.number} inView={inView} delay={i * 0.1} />
                {stat.suffix && <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontSize: 'clamp(32px,4vw,48px)', color: 'var(--gold-muted)', marginLeft: 4 }}>{stat.suffix}</span>}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ end, inView, delay }: { end: number; inView: boolean; delay: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const steps = 60; let current = 0;
      const timer = setInterval(() => {
        current += end / steps;
        if (current >= end) { setCount(end); clearInterval(timer); }
        else setCount(Math.floor(current));
      }, 2000 / steps);
      return () => clearInterval(timer);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView, end, delay]);
  return <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontSize: 'clamp(40px,5vw,72px)', color: 'var(--gold-primary)' }}>{count}</span>;
}
