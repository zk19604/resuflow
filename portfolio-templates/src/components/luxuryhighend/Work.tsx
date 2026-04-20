'use client';
import { useState, useRef, useEffect } from 'react';
import { UserProfile } from '@/types/userProfile';

const IMAGES = [
  'https://images.unsplash.com/photo-1638961837480-5aee8a8f90cd?auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1759308553474-ce2c768a6b7c?auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1593527658229-95d536591c83?auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1651629679477-82cab6ec3443?auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1763121379638-8839d20e7551?auto=format&fit=crop&w=1080&q=80',
];

export default function Work({ profile }: { profile: UserProfile }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, []);

  const projects = profile.projects.length > 0
    ? profile.projects.map((p, i) => ({ title: p.name || 'Project', type: p.type || 'Project', client: '', metric: p.tools.slice(0, 3).join(' · '), image: IMAGES[i % IMAGES.length], link: p.link || '#' }))
    : profile.workExperience.slice(0, 5).map((e, i) => ({ title: e.role || 'Role', type: e.company || 'Work', client: e.company || '', metric: Array.isArray(e.achievements) && e.achievements.length > 0 ? String(e.achievements[0]).slice(0, 60) : '', image: IMAGES[i % IMAGES.length], link: '#' }));

  if (projects.length === 0) return null;

  return (
    <section id="work" ref={sectionRef} style={{ position: 'relative', padding: '160px 0', background: 'var(--bg-base)' }}>
      <div style={{ position: 'absolute', top: 80, right: 48, fontSize: 200, fontFamily: 'var(--font-mono)', fontWeight: 300, color: 'var(--gold-primary)', opacity: 0.04, pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>02</div>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 48px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 64, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
          <div style={{ width: 40, height: 1, background: 'var(--gold-primary)' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px,3.5vw,48px)', color: 'var(--text-primary)', margin: 0 }}>Selected Work</h2>
        </div>

        {/* Featured */}
        {projects[0] && <ProjectCard project={projects[0]} index={0} isVisible={isVisible} featured />}

        {/* 2-col grid */}
        {projects.length > 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 32 }}>
            {projects.slice(1, 3).map((p, i) => <ProjectCard key={i} project={p} index={i+1} isVisible={isVisible} />)}
          </div>
        )}

        {/* 3-col grid */}
        {projects.length > 3 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, marginTop: 32 }}>
            {projects.slice(3).map((p, i) => <ProjectCard key={i} project={p} index={i+3} isVisible={isVisible} compact />)}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isVisible, featured = false, compact = false }: any) {
  const [hovered, setHovered] = useState(false);
  const height = featured ? 520 : compact ? 300 : 380;
  const imgHeight = featured ? '100%' : compact ? '60%' : '65%';
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', border: `1px solid ${hovered ? 'rgba(201,169,110,0.20)' : 'rgba(201,169,110,0.08)'}`, borderRadius: 4, height, background: 'var(--bg-card)', transition: 'all 0.5s ease, transform 0.5s ease', transform: hovered ? 'translateY(-4px)' : 'translateY(0)', opacity: isVisible ? 1 : 0, transitionDelay: `${index * 0.1}s` }}>
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: imgHeight }}>
        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.7s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,12,14,0.5)', opacity: hovered ? 1 : 0, transition: 'opacity 0.5s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: hovered ? 'scale(1)' : 'scale(0)', transition: 'transform 0.4s ease' }}>
            <span style={{ color: 'var(--text-primary)', fontSize: 12 }}>▶</span>
          </div>
        </div>
        {featured && (
          <div style={{ position: 'absolute', top: 24, left: 24, padding: '6px 12px', border: '1px solid rgba(201,169,110,0.25)', background: 'rgba(12,12,14,0.8)', backdropFilter: 'blur(8px)', borderRadius: 2 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>{project.type}</span>
          </div>
        )}
      </div>
      {/* Content */}
      <div style={{ ...(featured ? { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32 } : { padding: 24 }) }}>
        {featured && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,12,14,0.95) 0%, transparent 100%)' }} />}
        <div style={{ position: 'relative' }}>
          {!featured && (
            <div style={{ display: 'inline-block', padding: '4px 8px', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 2, marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>{project.type}</span>
            </div>
          )}
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: featured ? 36 : compact ? 22 : 28, color: 'var(--text-primary)', marginBottom: 8 }}>{project.title}</h3>
          {project.client && <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 8 }}>{project.client}</p>}
          {project.metric && <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--gold-primary)', marginBottom: 16 }}>{project.metric}</p>}
          <a href={project.link} target={project.link !== '#' ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            View Project <span style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s ease', display: 'inline-block' }}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
