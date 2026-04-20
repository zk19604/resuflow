'use client';
import { useRef, useEffect, useState } from 'react';
import { UserProfile } from '@/types/userProfile';

const IMAGES = [
  'https://images.unsplash.com/photo-1593527658229-95d536591c83?auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1651629679477-82cab6ec3443?auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1763121379638-8839d20e7551?auto=format&fit=crop&w=1080&q=80',
];

export default function Editorial({ profile }: { profile: UserProfile }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, []);

  const articles: { title: string; category: string; excerpt: string; image: string; href: string }[] = [];
  profile.publications.forEach((p, i) => articles.push({ title: p.title || 'Publication', category: p.publisher || 'Publication', excerpt: `Published ${p.date ? `on ${p.date}` : ''}${p.publisher ? ` by ${p.publisher}` : ''}`.trim(), image: IMAGES[i % IMAGES.length], href: p.link || '#' }));
  profile.projects.slice(0, Math.max(0, 3 - articles.length)).forEach((p, i) => articles.push({ title: p.name || 'Project', category: p.type || 'Project', excerpt: p.description || '', image: IMAGES[(articles.length + i) % IMAGES.length], href: p.link || '#' }));

  const achievementItems = Array.isArray(profile.achievements) ? profile.achievements : [];
  achievementItems.slice(0, 3 - articles.length).forEach((a, i) => {
    const title = typeof a === 'string' ? a : a.title;
    const desc = typeof a === 'string' ? '' : a.description;
    articles.push({ title: title || 'Achievement', category: 'Achievement', excerpt: desc || '', image: IMAGES[(articles.length + i) % IMAGES.length], href: '#' });
  });

  const hasContent = profile.publications.length > 0 || profile.projects.length > 0 || achievementItems.length > 0;
  if (!hasContent || articles.length === 0) return null;

  const display = articles.slice(0, 3);
  const featured = display[0];
  const secondary = display.slice(1);

  return (
    <section ref={sectionRef} style={{ position: 'relative', padding: '160px 0', background: 'var(--bg-base)' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 48px' }}>
        {/* Header */}
        <div style={{ marginBottom: 64, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold-primary)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>
              {profile.publications.length > 0 ? 'Publications' : 'Projects & Work'}
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px,3.5vw,48px)', color: 'var(--text-primary)', margin: 0 }}>
            {profile.publications.length > 0 ? 'Perspectives' : 'Selected Work'}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
          {/* Featured */}
          <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s', cursor: 'pointer' }}>
            <div style={{ height: 400, overflow: 'hidden', border: '1px solid rgba(201,169,110,0.10)', borderRadius: 4, marginBottom: 24, position: 'relative' }}>
              <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-primary)', display: 'block', marginBottom: 12 }}>{featured.category}</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 28, color: 'var(--text-primary)', marginBottom: 16 }}>{featured.title}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: 16 }}>{featured.excerpt}</p>
            <a href={featured.href} target={featured.href !== '#' ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', textDecoration: 'none' }}>Read →</a>
          </div>

          {/* Secondary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {secondary.map((article, i) => (
              <div key={i} style={{ paddingBottom: 32, borderBottom: i < secondary.length - 1 ? '1px solid rgba(201,169,110,0.08)' : 'none', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.9s ease ${0.2+i*0.1}s, transform 0.9s ease ${0.2+i*0.1}s`, cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 96, height: 96, flexShrink: 0, overflow: 'hidden', border: '1px solid rgba(201,169,110,0.10)', borderRadius: 4 }}>
                    <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-primary)', display: 'block', marginBottom: 8 }}>{article.category}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 18, lineHeight: 1.3, color: 'var(--text-primary)', marginBottom: 8 }}>{article.title}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.excerpt}</p>
                    <a href={article.href} target={article.href !== '#' ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-secondary)', textDecoration: 'none' }}>Read →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
