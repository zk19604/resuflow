// import React from 'react';

// export const NeonNavbar = () => (
//   <nav style={{
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: '32px 40px',
//     position: 'relative',
//     zIndex: 10
//   }}>
//     <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>
//       NEON<span style={{ color: '#22d3ee' }}>VAULT</span>
//     </div>
//     <div style={{ display: 'flex', gap: '30px', alignItems: 'center', fontSize: '12px', color: '#94a3b8', fontWeight: 'bold' }}>
//       <span>PROJECTS</span>
//       <span>STACK</span>
//       <button style={{
//         padding: '8px 20px',
//         border: '1px solid #22d3ee',
//         background: 'rgba(34, 211, 238, 0.1)',
//         color: '#22d3ee',
//         borderRadius: '20px',
//         cursor: 'pointer'
//       }}>CONTACT</button>
//     </div>
//   </nav>
// );


'use client';
import { useState, useEffect } from 'react';

interface NeonNavbarProps {
  onNavigate?: (section: string) => void;
}

export const NeonNavbar = ({ onNavigate }: NeonNavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'skills', 'experience', 'contact'];
      const scrollPos = window.scrollY + 150;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', id: 'home' },
    { name: 'SKILLS', id: 'skills' },
    { name: 'EXPERIENCE', id: 'experience' },
    { name: 'CONTACT', id: 'contact' },
  ];

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onNavigate?.(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => handleClick('home')}
            className="group focus:outline-none"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tighter">
              <span className="bg-gradient-to-r from-white via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                AK
              </span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`text-xs font-mono tracking-wider transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-cyan-400 border-b border-cyan-400 pb-1'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => handleClick('contact')}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold tracking-wider hover:scale-105 transition-transform shadow-lg shadow-cyan-500/25"
            >
              HIRE ME
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/20 py-4">
            <div className="flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`text-sm font-mono tracking-wider transition-all duration-300 ${
                    activeSection === item.id ? 'text-cyan-400' : 'text-slate-500'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => handleClick('contact')}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-bold"
              >
                HIRE ME
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};