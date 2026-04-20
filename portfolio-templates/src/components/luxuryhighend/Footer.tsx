'use client';
import { UserProfile } from '@/types/userProfile';

export default function Footer({ profile }: { profile: UserProfile }) {
  const { name, email, linkedin, github, website, portfolio } = profile.personalInfo;
  const initials = name ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '??';
  const year = new Date().getFullYear();

  return (
    <footer style={{ position: 'relative', padding: '40px 0', borderTop: '1px solid rgba(201,169,110,0.08)', background: '#080808' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 12, color: 'var(--gold-primary)', letterSpacing: '0.02em' }}>{initials}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>{name || 'Portfolio'}</span>
          </div>

          {/* Copyright */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-tertiary)', margin: 0 }}>
            © {year} {name || 'Portfolio'}. All rights reserved.
          </p>

          {/* Credits */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-tertiary)', margin: 0 }}>
            Crafted with <span style={{ color: 'var(--gold-primary)' }}>ResuFlow</span>
          </p>
        </div>

        {/* Social links */}
        {(email || linkedin || github || website || portfolio) && (
          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
            {email && <a href={`mailto:${email}`} style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}>Email</a>}
            {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}>LinkedIn</a>}
            {github && <a href={github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}>GitHub</a>}
            {(website || portfolio) && <a href={website || portfolio} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}>Website</a>}
          </div>
        )}
      </div>
    </footer>
  );
}
