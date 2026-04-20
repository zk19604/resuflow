'use client';
import { useEffect, useRef, useState } from 'react';
import { UserProfile } from '@/types/userProfile';

export default function Hero({ profile }: { profile: UserProfile }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setIsVisible(true); }, []);

  const yearsOfExperience = (() => {
    const dates = profile.workExperience.map((w) => parseInt(w.startDate?.slice(0, 4))).filter((y) => !isNaN(y));
    if (!dates.length) return null;
    return new Date().getFullYear() - Math.min(...dates);
  })();

  const totalProjects = profile.projects.length || profile.workExperience.length;
  const skillTags = profile.skills.technical.slice(0, 4);
  const currentRole = profile.workExperience[0]?.role || profile.personalInfo.title || 'Professional';
  const initials = profile.personalInfo.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  const fade = { opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.9s ease, transform 0.9s ease' };

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--bg-base)', position: 'relative', paddingTop: 80 }}>
      {/* Ambient orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '20%', top: '50%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 60%)', filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', right: '20%', top: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(142,154,171,0.05) 0%, transparent 60%)', filter: 'blur(100px)' }} />
      </div>

      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '80px 48px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, ...fade }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', border: '1px solid rgba(201,169,110,0.25)', background: 'rgba(201,169,110,0.04)', borderRadius: 2, width: 'fit-content' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6B9E6B', boxShadow: '0 0 0 3px rgba(107,158,107,0.25)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)' }}>Currently accepting projects</span>
            </div>

            {/* Role */}
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--gold-primary)', margin: 0 }}>{currentRole}</p>

            {/* Name */}
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,5.5vw,80px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.95, color: 'var(--text-primary)' }}>
                {profile.personalInfo.name || 'Your Name'}
              </div>
              {(profile.personalInfo.title || profile.skills.domain[0]) && (
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,4.5vw,68px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.95, color: 'transparent', WebkitTextStroke: '1px rgba(201,169,110,0.5)', marginTop: 4 }}>
                  {profile.personalInfo.title || profile.skills.domain[0]}
                </div>
              )}
            </div>

            {/* Skill tags */}
            {skillTags.length > 0 && (
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'var(--text-secondary)', fontSize: 15, margin: 0 }}>
                {skillTags.map((s, i) => <span key={s}><span style={{ color: 'var(--gold-primary)' }}>{s}</span>{i < skillTags.length - 1 && ' · '}</span>)}
              </p>
            )}

            {/* Summary */}
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: 440, margin: 0 }}>
              {profile.summary || 'Crafting exceptional experiences that connect, inspire, and deliver results.'}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#work" style={{ padding: '12px 32px', background: 'var(--gold-primary)', color: 'var(--bg-base)', borderRadius: 2, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>View Work</a>
              <a href="#contact" style={{ padding: '12px 32px', border: '1px solid rgba(201,169,110,0.25)', borderRadius: 2, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', textDecoration: 'none' }}>Get in Touch</a>
            </div>

            {/* Companies */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex' }}>
                {[1,2,3,4,5].map((i) => <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid var(--bg-base)', background: `linear-gradient(135deg,rgba(201,169,110,${0.2+i*0.1}),rgba(142,154,171,${0.15+i*0.1}))`, marginLeft: i===1?0:-8 }} />)}
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-tertiary)' }}>
                {profile.workExperience.length > 0 ? `${profile.workExperience.length}+ companies worked with` : 'Available for opportunities'}
              </span>
            </div>
          </div>

          {/* RIGHT — portrait card */}
          <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1.2s ease 0.3s' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'relative', width: '100%', height: 560, border: '1px solid rgba(201,169,110,0.12)', borderRadius: 4, background: 'rgba(20,20,24,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 180, fontWeight: 300, color: 'var(--gold-primary)', opacity: 0.08, lineHeight: 1, userSelect: 'none' }}>{initials}</div>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '1px solid rgba(201,169,110,0.4)', borderLeft: '1px solid rgba(201,169,110,0.4)' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderTop: '1px solid rgba(201,169,110,0.4)', borderRight: '1px solid rgba(201,169,110,0.4)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: 20, height: 20, borderBottom: '1px solid rgba(201,169,110,0.4)', borderLeft: '1px solid rgba(201,169,110,0.4)' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '1px solid rgba(201,169,110,0.4)', borderRight: '1px solid rgba(201,169,110,0.4)' }} />
              </div>
              {yearsOfExperience !== null && (
                <div style={{ position: 'absolute', top: -16, left: -16, padding: '12px 16px', background: 'rgba(20,20,24,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 4 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 300, color: 'var(--gold-primary)' }}>{String(yearsOfExperience).padStart(2,'0')}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-secondary)' }}>Years of craft</div>
                </div>
              )}
              {totalProjects > 0 && (
                <div style={{ position: 'absolute', bottom: -16, right: -16, padding: '12px 16px', background: 'rgba(20,20,24,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 4 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 300, color: 'var(--gold-primary)' }}>{totalProjects}+</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-secondary)' }}>Projects delivered</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'rgba(201,169,110,0.3)' }} />
      </div>
    </section>
  );
}
