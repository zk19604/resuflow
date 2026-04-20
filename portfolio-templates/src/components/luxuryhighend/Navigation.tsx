'use client';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/types/userProfile';

export default function Navigation({ profile }: { profile: UserProfile }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { name } = profile.personalInfo;
  const initials = name ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '??';

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Recognition', href: '#recognition' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMobileOpen(false); }
  };

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 72, background: scrolled ? 'rgba(12,12,14,0.88)' : 'transparent', backdropFilter: scrolled ? 'blur(32px) saturate(180%)' : 'none', borderBottom: scrolled ? '1px solid rgba(201,169,110,0.08)' : '1px solid transparent', transition: 'all 0.7s ease' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 48px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 12, color: 'var(--gold-primary)', letterSpacing: '0.02em' }}>{initials}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{name || 'Portfolio'}</span>
          </div>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}
            style={{ padding: '10px 24px', border: '1px solid rgba(201,169,110,0.35)', borderRadius: 2, fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-primary)', textDecoration: 'none', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,169,110,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.6)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.35)'; }}>
            Let's Talk
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'var(--bg-base)', transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.5s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
            style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 300, color: 'var(--text-primary)', textDecoration: 'none' }}>
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
}
