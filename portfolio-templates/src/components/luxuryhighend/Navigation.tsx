import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { UserProfile } from '@/types/userProfile';

interface NavigationProps {
  profile: UserProfile;
}

export default function Navigation({ profile }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { name } = profile.personalInfo;

  // Generate initials (up to 2 chars)
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '??';

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
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          height: typeof window !== 'undefined' && window.innerWidth < 768 ? '60px' : '72px',
          background: scrolled ? 'rgba(12, 12, 14, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(32px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(201, 169, 110, 0.08)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
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
              className="text-xs tracking-[0.12em] uppercase hidden md:block"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
            >
              {name || 'Portfolio'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link relative text-xs tracking-[0.06em] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden md:block px-6 py-2.5 border transition-all duration-300"
            style={{
              borderColor: 'rgba(201, 169, 110, 0.35)',
              background: 'transparent',
              borderRadius: '2px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--gold-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201, 169, 110, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.6)';
              e.currentTarget.style.color = 'var(--gold-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.35)';
              e.currentTarget.style.color = 'var(--gold-primary)';
            }}
          >
            Let's Talk
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
            style={{ color: 'var(--text-primary)' }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-transform duration-500"
        style={{
          background: 'var(--bg-base)',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="transition-all duration-300"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '48px',
                fontWeight: 300,
                color: 'var(--text-primary)',
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 0;
          height: 1px;
          background: var(--gold-primary);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: translateX(-50%);
        }
        .nav-link:hover { color: var(--text-primary); }
        .nav-link:hover::after { width: 100%; }
      `}</style>
    </>
  );
}
