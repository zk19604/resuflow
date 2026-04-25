import { useEffect, useState } from 'react';
import { UserProfile } from '@/types/userProfile';

interface NavigationProps {
  activeSection: string;
  profile?: UserProfile;
}

export function Navigation({ activeSection, profile }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const name = profile?.personalInfo?.name || 'Morgan Hayes';
  const nameParts = name.split(' ');
  const initials = nameParts.map((p) => p[0]).join('').slice(0, 2).toUpperCase();

  const startYear = (() => {
    const dates = (profile?.workExperience || [])
      .map((w) => parseInt((w.startDate || '').slice(0, 4)))
      .filter((y) => !isNaN(y));
    return dates.length ? Math.min(...dates) : 2008;
  })();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        height: '72px',
        backgroundColor: '#F5EDD8',
        borderTop: '3px solid #1A1208',
        borderBottom: '3px solid #1A1208',
        backgroundImage: 'radial-gradient(circle, rgba(80,40,0,0.07) 1.5px, transparent 1.5px)',
        backgroundSize: '8px 8px',
        boxShadow: isScrolled ? '0 4px 12px rgba(26,18,8,0.15)' : 'none',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-20 h-full flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div
            className="flex items-center justify-center"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#C9340A',
              border: '2px solid #1A1208',
              borderRadius: '4px',
              boxShadow: '2px 2px 0 #1A1208',
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '18px',
              color: '#F5EDD8',
            }}
          >
            {initials}
          </div>
          <div
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: '20px',
              color: '#1A1208',
            }}
          >
            {name}
          </div>
          <div style={{ width: '2px', height: '28px', backgroundColor: '#1A1208' }} />
          <div
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              color: '#8B4513',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            EST. {startYear}
          </div>
        </div>

        <div className="flex items-center gap-11">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '16px',
                color: activeSection === link.id ? '#C9340A' : '#1A1208',
                letterSpacing: '0.2em',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { if (activeSection !== link.id) e.currentTarget.style.color = '#C9340A'; }}
              onMouseLeave={(e) => { if (activeSection !== link.id) e.currentTarget.style.color = '#1A1208'; }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          className="transition-transform duration-100"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '15px',
            fontWeight: 700,
            color: '#F5EDD8',
            backgroundColor: '#C9340A',
            border: '2px solid #1A1208',
            boxShadow: '3px 3px 0 #1A1208',
            padding: '14px 24px',
            borderRadius: '0px',
            cursor: 'pointer',
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(3px, 3px)'; e.currentTarget.style.boxShadow = 'none'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '3px 3px 0 #1A1208'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '3px 3px 0 #1A1208'; }}
          onClick={() => scrollToSection('contact')}
        >
          HIRE ME →
        </button>
      </div>
    </nav>
  );
}
