import { UserProfile } from '@/types/userProfile';

interface FooterProps {
  profile: UserProfile;
}

export default function Footer({ profile }: FooterProps) {
  const { name, email, linkedin, github, website, portfolio } = profile.personalInfo;

  // Generate initials for the logo badge
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '??';

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-10 border-t"
      style={{
        background: '#080808',
        borderColor: 'rgba(201, 169, 110, 0.08)',
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div
              className="w-[34px] h-[34px] rounded-full border flex items-center justify-center flex-shrink-0"
              style={{ borderColor: 'rgba(201, 169, 110, 0.4)' }}
            >
              <span
                className="text-xs"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  color: 'var(--gold-primary)',
                  letterSpacing: '0.02em',
                }}
              >
                {initials}
              </span>
            </div>
            <span
              className="text-xs tracking-[0.12em] uppercase"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-tertiary)',
              }}
            >
              {name || 'Portfolio'}
            </span>
          </div>

          {/* Copyright */}
          <p
            className="text-xs"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-tertiary)',
            }}
          >
            © {currentYear} {name || 'Portfolio'}. All rights reserved.
          </p>

          {/* Credits */}
          <p
            className="text-xs"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-tertiary)',
            }}
          >
            Crafted with{' '}
            <span style={{ color: 'var(--gold-primary)' }}>ResuFlow</span>
          </p>
        </div>

        {/* Optional social links row */}
        {(email || linkedin || github || website || portfolio) && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-[10px] tracking-[0.10em] uppercase transition-colors duration-300 hover:text-[var(--gold-primary)]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-tertiary)' }}
              >
                Email
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.10em] uppercase transition-colors duration-300 hover:text-[var(--gold-primary)]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-tertiary)' }}
              >
                LinkedIn
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.10em] uppercase transition-colors duration-300 hover:text-[var(--gold-primary)]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-tertiary)' }}
              >
                GitHub
              </a>
            )}
            {(website || portfolio) && (
              <a
                href={website || portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.10em] uppercase transition-colors duration-300 hover:text-[var(--gold-primary)]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-tertiary)' }}
              >
                Website
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
