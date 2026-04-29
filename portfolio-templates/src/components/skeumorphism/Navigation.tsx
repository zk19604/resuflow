import { useState, useEffect } from 'react';

interface NavigationProps {
  profile: any;
}

export function Navigation({ profile }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const personalInfo = profile?.personalInfo || {};
  const name = personalInfo.name || 'Your Name';
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  const firstName = name.split(' ')[0];
  
  const workExperience = profile?.workExperience || [];
  const skills = profile?.skills || { technical: [], tools: [], soft: [] };
  const hasSkills = (skills.technical?.length > 0) || (skills.tools?.length > 0) || (skills.soft?.length > 0);
  const hasExperience = workExperience.length > 0;
  
  const email = personalInfo.email || '';
  const phone = personalInfo.phone || '';
  const location = personalInfo.location || '';
  const linkedin = personalInfo.linkedin || '';
  const hasContact = email || phone || location || linkedin;

  const buildNavLinks = () => {
    const links = ['HOME'];
    
    const summary = profile?.summary || personalInfo.summary || '';
    const education = profile?.education || [];
    const hasAbout = summary || education.length > 0 || hasExperience;
    if (hasAbout) links.push('ABOUT');
    
    if (hasExperience) links.push('EXPERIENCE');
    
    const achievements = profile?.achievements || [];
    if (achievements.length > 0) links.push('ACHIEVEMENTS');
    
    if (hasSkills) links.push('SKILLS');
    
    const educationData = profile?.education || [];
    if (educationData.length > 0) links.push('EDUCATION');
    
    if (hasContact) links.push('CONTACT');
    
    return links;
  };

  const navLinks = buildNavLinks();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['home', ...navLinks.map(link => link.toLowerCase())];
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section);
            return;
          }
        }
      }
      
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const scrollToSection = (id: string) => {
    const sectionId = id.toLowerCase();
    console.log('Scrolling to:', sectionId); // Debug log
    
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      setMobileMenuOpen(false);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    } else {
      console.warn('Element not found:', sectionId); // Debug log
    }
  };

  const handleContactClick = () => {
    if (email) {
      window.location.href = `mailto:${email}?subject=Opportunity for ${firstName}`;
    } else {
      scrollToSection('contact');
    }
  };

  const getButtonText = () => {
    if (email) return 'EMAIL ME →';
    if (linkedin) return 'CONNECT →';
    if (phone) return 'CALL ME →';
    return 'CONTACT →';
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] w-full bg-[#1C1008] border-b border-[#C8A050]/10 transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.5)]' : ''
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-[#FFDC96]/[0.08]" />
        
        <div className="relative max-w-[1440px] mx-auto h-full px-6 lg:px-20 flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 lg:gap-3.5 group"
          >
            <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-[10px] bg-gradient-to-b from-[#C9A96E] to-[#8B6914] border border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.5)] flex items-center justify-center relative group-hover:from-[#D4B47E] group-hover:to-[#9B7924] transition-all">
              <div className="absolute inset-x-0 top-0 h-px bg-white/30" />
              <span className="font-['Playfair_Display'] font-bold text-[14px] lg:text-[16px] text-[#1A1004]">
                {initials}
              </span>
            </div>
            
            <span className="font-['Playfair_Display'] font-semibold text-[14px] lg:text-[17px] text-[#E8D5A3] group-hover:text-[#F5E6C8] transition-colors hidden sm:block">
              {name}
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-8 xl:gap-11">
            {navLinks.map((link) => {
              const sectionId = link.toLowerCase();
              const isActive = activeSection === sectionId;
              
              return (
                <button
                  key={link}
                  onClick={() => scrollToSection(sectionId)}
                  className={`relative font-['DM_Sans'] text-[11px] xl:text-[12px] tracking-[0.15em] uppercase transition-colors ${
                    isActive ? 'text-[#C9A96E]' : 'text-[#9A8060] hover:text-[#C9A96E]'
                  }`}
                >
                  {link}
                  {isActive && (
                    <div className="absolute -bottom-[22px] left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />
                  )}
                </button>
              );
            })}
          </div>

          <button 
            onClick={handleContactClick}
            className="relative px-5 lg:px-7 py-2.5 lg:py-3.5 bg-gradient-to-b from-[#8B1A0A] to-[#5C0E06] rounded-3xl shadow-[0_4px_16px_rgba(139,26,10,0.5)] hover:from-[#9B2A1A] hover:to-[#6C1E16] hover:shadow-[0_6px_20px_rgba(139,26,10,0.6)] transition-all group"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-[#FFB478]/25 rounded-t-3xl" />
            <span className="font-['DM_Sans'] font-bold text-[11px] lg:text-[13px] text-[#F5D0B0]">
              {getButtonText()}
            </span>
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-lg bg-[#C8A050]/10 border border-[#C8A050]/20 flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#1C1008] pt-[72px]">
          <div className="px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const sectionId = link.toLowerCase();
              const isActive = activeSection === sectionId;
              
              return (
                <button
                  key={link}
                  onClick={() => scrollToSection(sectionId)}
                  className={`py-4 font-['DM_Sans'] text-[14px] tracking-[0.15em] uppercase text-left transition-colors border-b border-[#C8A050]/10 ${
                    isActive ? 'text-[#C9A96E]' : 'text-[#9A8060]'
                  }`}
                >
                  {link}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}