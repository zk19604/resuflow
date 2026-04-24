import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  profile: any;
}

export function Navigation({ profile }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const personalInfo = profile?.personalInfo || {};
  const name = personalInfo.name || 'Your Name';
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  const firstName = name.split(' ')[0];
  
  const workExperience = profile?.workExperience || [];
  const skills = profile?.skills || { technical: [], tools: [], soft: [] };
  const hasSkills = (skills.technical?.length > 0) || (skills.tools?.length > 0) || (skills.soft?.length > 0);
  const projects = profile?.projects || [];
  const hasProjects = projects.length > 0;
  const education = profile?.education || [];
  const hasEducation = education.length > 0 && (education[0]?.degree || education[0]?.institution);
  const achievements = profile?.achievements || [];
  const hasAchievements = achievements.length > 0;
  
  // Check if contact info exists
  const email = personalInfo.email || '';
  const phone = personalInfo.phone || '';
  const location = personalInfo.location || '';
  const linkedin = personalInfo.linkedin || '';
  const github = personalInfo.github || '';
  const hasContact = email || phone || location || linkedin || github;

  const buildNavLinks = () => {
    const links = ['About'];
    if (hasSkills) links.push('Skills');
    if (hasProjects) links.push('Work');
    if (hasContact) links.push('Contact');
    return links;
  };

  const navLinks = buildNavLinks();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      const sections = ['home', ...navLinks.map(link => link.toLowerCase())];
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const handleContactClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 90;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection('contact');
      setMobileMenuOpen(false);
    }
  };

  const handleNavClick = (link: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const sectionId = link.toLowerCase();
    
    if (sectionId === 'contact') {
      handleContactClick(e);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[#E8E3DC]/95 backdrop-blur-sm' : 'bg-[#E8E3DC]'
        }`}
        style={{
          boxShadow: isScrolled
            ? '0 8px 24px rgba(163,156,146,0.30), 0 2px 6px rgba(163,156,146,0.15)'
            : '0 8px 24px rgba(163,156,146,0.40), 0 2px 6px rgba(163,156,146,0.25)',
          borderRadius: isScrolled ? '0 0 20px 20px' : '0 0 20px 20px',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="h-[70px] flex items-center justify-between">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#E8E3DC] shadow-raised-sm flex items-center justify-center transition-shadow group-hover:shadow-raised">
                <span className="font-serif gradient-text" style={{ fontSize: '18px', fontWeight: 400 }}>
                  {initials || name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-serif hidden sm:block" style={{ fontSize: '18px', color: '#3D3830' }}>
                {name}
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className="relative group"
                >
                  <span
                    className="transition-colors"
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '13px',
                      fontWeight: activeSection === link.toLowerCase() ? 600 : 500,
                      color: activeSection === link.toLowerCase() ? '#3D3830' : '#7A7268',
                    }}
                  >
                    {link}
                  </span>
                  <div
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full gradient-accent shadow-raised-sm transition-all duration-300 ${
                      activeSection === link.toLowerCase() ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              ))}
            </div>

            {hasContact && (
              <button
                onClick={handleContactClick}
                className="hidden lg:block px-6 py-3 rounded-xl gradient-accent text-white shadow-accent transition-shadow hover:shadow-accent-lg active:shadow-accent-sm"
                style={{ fontFamily: 'DM Sans', fontSize: '13px', fontWeight: 600 }}
              >
                Contact Me
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg bg-[#E8E3DC] shadow-raised-sm flex items-center justify-center active:shadow-inset transition-all"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} color="#3D3830" /> : <Menu size={20} color="#3D3830" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-[#E8E3DC] pt-[90px] px-6 overflow-y-auto"
          style={{ animation: 'slideDown 0.3s ease' }}
        >
          <div className="flex flex-col gap-4 pb-8">
            <button
              onClick={() => handleNavClick('home')}
              className="p-6 rounded-2xl bg-[#E8E3DC] shadow-raised transition-all hover:shadow-raised-lg active:shadow-inset text-left"
              style={{
                fontFamily: 'DM Sans',
                fontSize: '18px',
                fontWeight: 600,
                color: '#3D3830',
              }}
            >
              Home
            </button>
            {navLinks.map((link, idx) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="p-6 rounded-2xl bg-[#E8E3DC] shadow-raised transition-all hover:shadow-raised-lg active:shadow-inset text-left"
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#3D3830',
                  animation: `slideIn 0.3s ease ${idx * 0.05}s both`,
                }}
              >
                {link}
              </button>
            ))}
            {hasContact && (
              <button
                onClick={handleContactClick}
                className="mt-4 p-6 rounded-2xl gradient-accent text-white shadow-accent active:shadow-accent-sm text-left"
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '18px',
                  fontWeight: 600,
                  animation: 'slideIn 0.3s ease 0.3s both',
                }}
              >
                Contact Me
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .gradient-accent {
          background: linear-gradient(135deg, #8B7355 0%, #D3A29D 100%);
        }
        .gradient-text {
          background: linear-gradient(135deg, #8B7355 0%, #D3A29D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .shadow-raised {
          box-shadow: -6px -6px 12px rgba(255,252,247,0.8), 6px 6px 12px rgba(163,156,146,0.4);
        }
        .shadow-raised-sm {
          box-shadow: -3px -3px 6px rgba(255,252,247,0.6), 3px 3px 6px rgba(163,156,146,0.3);
        }
        .shadow-raised-lg {
          box-shadow: -8px -8px 16px rgba(255,252,247,0.9), 8px 8px 16px rgba(163,156,146,0.5);
        }
        .shadow-inset {
          box-shadow: inset -4px -4px 8px rgba(255,252,247,0.8), inset 4px 4px 8px rgba(163,156,146,0.3);
        }
        .shadow-accent {
          box-shadow: 0 4px 12px rgba(139,115,85,0.3);
        }
        .shadow-accent-sm {
          box-shadow: 0 2px 6px rgba(139,115,85,0.2);
        }
        .shadow-accent-lg {
          box-shadow: 0 6px 18px rgba(139,115,85,0.4);
        }
      `}</style>
    </>
  );
}