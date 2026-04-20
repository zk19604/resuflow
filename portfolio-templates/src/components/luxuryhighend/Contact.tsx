'use client';
import { useRef, useEffect, useState } from 'react';
import { UserProfile } from '@/types/userProfile';

export default function Contact({ profile }: { profile: UserProfile }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const { email, phone, location, linkedin, github, website, portfolio } = profile.personalInfo;
  const socials = [
    linkedin && { label: 'LinkedIn', href: linkedin },
    github && { label: 'GitHub', href: github },
    website && { label: 'Website', href: website },
    portfolio && { label: 'Portfolio', href: portfolio },
  ].filter(Boolean) as { label: string; href: string }[];

  const inputStyle: React.CSSProperties = { width: '100%', padding: '16px 20px', border: '1px solid rgba(201,169,110,0.10)', borderRadius: 2, background: 'rgba(20,20,24,0.8)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none', transition: 'all 0.3s ease' };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.40)'; e.currentTarget.style.background = 'rgba(20,20,24,1)'; };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.10)'; e.currentTarget.style.background = 'rgba(20,20,24,0.8)'; };

  const fade = (delay = 0) => ({ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s` });

  return (
    <section id="contact" ref={sectionRef} style={{ position: 'relative', padding: '160px 0', overflow: 'hidden', background: 'var(--bg-alt)' }}>
      {/* Orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '20%', top: '50%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 60%)', filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', right: '20%', top: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(142,154,171,0.05) 0%, transparent 60%)', filter: 'blur(100px)' }} />
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64, ...fade() }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,5vw,68px)', color: 'var(--text-primary)', marginBottom: 8 }}>Start a Conversation</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(30px,4vw,56px)', fontStyle: 'italic', color: 'transparent', WebkitTextStroke: '1px rgba(201,169,110,0.4)', marginBottom: 24 }}>Let's build something lasting.</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto' }}>
            {profile.summary ? `${profile.summary.slice(0, 120)}${profile.summary.length > 120 ? '…' : ''}` : "Whether you're launching a new project or looking for the right talent, I'm ready to help."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48, ...fade(0.2) }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <input type="text" placeholder="Your Name" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            <input type="email" placeholder="Your Email" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>
          <input type="text" placeholder="Subject" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          <textarea placeholder="Tell me about your project or opportunity..." required rows={4} style={{ ...inputStyle, resize: 'none' }} onFocus={onFocus} onBlur={onBlur} />
          <button type="submit" disabled={isSubmitting}
            style={{ width: '100%', height: 52, background: isSubmitting ? 'rgba(201,169,110,0.6)' : 'var(--gold-primary)', color: 'var(--bg-base)', borderRadius: 2, border: 'none', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.background = 'var(--gold-light)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold-primary)'; }}>
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </button>
        </form>

        {/* Contact info */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, marginBottom: 32, ...fade(0.4) }}>
          {email && <a href={`mailto:${email}`} style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>✉ {email}</a>}
          {phone && <a href={`tel:${phone}`} style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>✆ {phone}</a>}
          {location && <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>⌖ {location}</span>}
        </div>

        {/* Social links */}
        {socials.length > 0 && (
          <div style={{ textAlign: 'center', ...fade(0.5) }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--text-tertiary)' }}>
              {socials.map((s, i) => <span key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}>{s.label}</a>{i < socials.length - 1 && ' · '}</span>)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
