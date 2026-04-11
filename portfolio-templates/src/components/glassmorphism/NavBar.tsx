"use client";

import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/userProfile';

const navLinks = ['Work', 'About', 'Skills', 'Contact'];

interface NavBarProps {
  profile: UserProfile;
}

export function NavBar({ profile }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(12px) saturate(160%)',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(12px) saturate(160%)',
        background: scrolled ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        transition: 'all 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 80px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo / Name */}
        <span
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 16,
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
          }}
        >
          {profile.personalInfo.name || 'Portfolio'}
        </span>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.55)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                transition: 'color 300ms cubic-bezier(0.25,0.46,0.45,0.94), text-shadow 300ms',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#FFFFFF';
                (e.target as HTMLElement).style.textShadow = '0 0 20px rgba(123,47,255,0.8)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)';
                (e.target as HTMLElement).style.textShadow = 'none';
              }}
            >
              {link}
            </button>
          ))}

          {/* Hire Me Button */}
          <button
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 500,
              color: '#FFFFFF',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 100,
              padding: '10px 20px',
              cursor: 'pointer',
              transition: 'all 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(123,47,255,0.35)';
              (e.target as HTMLElement).style.borderColor = 'rgba(123,47,255,0.6)';
              (e.target as HTMLElement).style.boxShadow = '0 0 20px rgba(123,47,255,0.35)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
              (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
}
