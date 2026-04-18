import React from 'react';

interface NavBarProps {
  onNavigate: (section: string) => void;
}

export function NavBar({ onNavigate }: NavBarProps) {
  const navLinks = ['HOME', 'ABOUT', 'EXPERIENCE', 'SKILLS', 'CONTACT'];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-[#E8E8E8] z-50 h-20">
      <div className="max-w-[1440px] mx-auto px-20 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="font-['Playfair_Display'] font-bold text-[22px] text-[#111111]">
          ResuFlow
        </div>

        {/* Center Navigation */}
        <div className="flex items-center gap-12">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => onNavigate(link.toLowerCase())}
              className="text-[13px] tracking-[0.15em] uppercase text-[#444444] hover:text-[#111111] transition-colors font-['DM_Sans']"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right side - empty */}
        <div className="w-32"></div>
      </div>
    </nav>
  );
}
