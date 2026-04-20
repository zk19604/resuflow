import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  profile: any;
}

// Simple SVG Icon Components (no external dependencies)
const LinkedinIcon = ({ size = 18, color = '#E8B29B' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 18, color = '#E8B29B' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const GlobeIcon = ({ size = 18, color = '#E8B29B' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const MailIcon = ({ size = 18, color = '#E8B29B' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);

export function Hero({ profile }: HeroProps) {
  const [yearsCount, setYearsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);

  // Get real data from profile
  const personalInfo = profile?.personalInfo || {};
  const name = personalInfo.name || 'Your Name';
  const firstName = name.split(' ')[0];
  const lastName = name.split(' ').slice(1).join(' ');
  
  const workExperience = profile?.workExperience || [];
  const currentRole = workExperience[0] || {};
  const role = currentRole.role || 'Professional';
  const company = currentRole.company || '';
  
  const summary = profile?.summary || personalInfo.summary || '';
  const tagline = summary.slice(0, 80) + (summary.length > 80 ? '...' : '') || 
    `Creating meaningful digital experiences with purpose and precision.`;
  
  const projects = profile?.projects || [];
  const skills = profile?.skills || { technical: [], tools: [], soft: [] };
  const allSkills = [...(skills.technical || []), ...(skills.tools || []), ...(skills.soft || [])];
  
  // Calculate years of experience
  const calculateYears = (): number => {
    if (workExperience.length === 0) return 0;
    
    const years: number[] = workExperience
      .filter((exp: any) => exp.startDate || exp.endDate)
      .map((exp: any) => {
        const start: number | null = exp.startDate ? new Date(exp.startDate).getFullYear() : null;
        const end: number = exp.endDate === 'Present' || !exp.endDate 
          ? new Date().getFullYear() 
          : new Date(exp.endDate).getFullYear();
        return start && end ? Math.max(1, end - start) : 1;
      });
    
    if (years.length === 0) return 0;
    return Math.round(years.reduce((a: number, b: number) => a + b, 0) / years.length) || 1;
  };

  const yearsExp = calculateYears();
  const projectCount = projects.length || workExperience.length || 0;
  const skillCount = allSkills.length || 0;
  
  // Build social links array
  const socialLinks: { Icon: any; href: string; label: string }[] = [];
  if (personalInfo.linkedin) {
    socialLinks.push({ Icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' });
  }
  if (personalInfo.github) {
    socialLinks.push({ Icon: GithubIcon, href: personalInfo.github, label: 'GitHub' });
  }
  if (personalInfo.website || personalInfo.portfolio) {
    socialLinks.push({ Icon: GlobeIcon, href: personalInfo.website || personalInfo.portfolio, label: 'Website' });
  }
  if (personalInfo.email) {
    socialLinks.push({ Icon: MailIcon, href: `mailto:${personalInfo.email}`, label: 'Email' });
  }

  // Check if currently employed
  const currentlyEmployed = workExperience.some((exp: any) => 
    exp.endDate === 'Present' || !exp.endDate
  );
  
  const availabilityText = currentlyEmployed ? 'Currently working' : 'Available for opportunities';

  useEffect(() => {
    if (yearsExp === 0 && projectCount === 0 && skillCount === 0) return;
    
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const yearTimer = setInterval(() => {
      setYearsCount((prev) => {
        if (prev >= yearsExp) {
          clearInterval(yearTimer);
          return yearsExp;
        }
        return prev + Math.ceil(yearsExp / steps);
      });
    }, interval);

    const projectTimer = setInterval(() => {
      setProjectsCount((prev) => {
        if (prev >= projectCount) {
          clearInterval(projectTimer);
          return projectCount;
        }
        return prev + Math.ceil(projectCount / steps);
      });
    }, interval);

    const skillsTimer = setInterval(() => {
      setSkillsCount((prev) => {
        if (prev >= skillCount) {
          clearInterval(skillsTimer);
          return skillCount;
        }
        return prev + Math.ceil(skillCount / steps);
      });
    }, interval);

    return () => {
      clearInterval(yearTimer);
      clearInterval(projectTimer);
      clearInterval(skillsTimer);
    };
  }, [yearsExp, projectCount, skillCount]);

  const scrollToWork = () => {
    const workSection = document.getElementById('work') || document.getElementById('portfolio');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    // Trigger CV download if available, or scroll to contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate initials for avatar fallback
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  
  // Generate a consistent color for avatar background
  const avatarColor = `hsl(${name.length * 10 % 360}, 40%, 70%)`;

  return (
    <section id="home" className="min-h-screen bg-[#E8E3DC] pt-[90px] px-6 lg:px-12 flex items-center relative">
      <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="space-y-8 animate-rise-in">
          {/* Status Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8E3DC] shadow-raised-sm">
            <div className={`w-1.5 h-1.5 rounded-full ${currentlyEmployed ? 'gradient-active animate-pulse-glow' : 'bg-[#8B7355]'}`} />
            <span style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#7A7268' }}>
              {availabilityText}
            </span>
          </div>

          {/* Role Label */}
          <div
            style={{
              fontFamily: 'DM Sans',
              fontSize: '11px',
              color: '#8B7355',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              fontWeight: 600,
            }}
          >
            {role}
            {company ? ` · ${company}` : ''}
          </div>

          {/* Main Headline */}
          <div>
            <h1
              className="font-serif leading-[0.92]"
              style={{
                fontSize: 'clamp(48px, 8vw, 80px)',
                color: '#3D3830',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              {firstName}
              <br />
              {lastName || ''}
            </h1>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontFamily: 'DM Sans',
              fontSize: '17px',
              color: '#7A7268',
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: '400px',
            }}
          >
            {tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToWork}
              className="px-8 py-3.5 rounded-xl gradient-accent text-white shadow-accent transition-shadow hover-lift active-press"
              style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 600 }}
            >
              View My Work
            </button>
            <button
              onClick={handleDownloadCV}
              className="px-8 py-3.5 rounded-xl bg-[#E8E3DC] shadow-raised transition-shadow hover-lift active-press"
              style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 600, color: '#3D3830' }}
            >
              Contact Me
            </button>
          </div>

          {/* Social Icons - Only show if there are links */}
          {socialLinks.length > 0 && (
            <div className="flex gap-4 pt-4">
              {socialLinks.map(({ Icon, href, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-[#E8E3DC] shadow-raised-sm flex items-center justify-center transition-shadow hover-lift active-press"
                >
                  <Icon size={18} color="#E8B29B" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right Visual */}
        <div className="relative flex items-center justify-center">
          {/* Profile Circle */}
          <div
            className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full bg-[#E8E3DC] animate-breathe relative overflow-hidden flex items-center justify-center"
            style={{
              boxShadow:
                '-20px -20px 50px rgba(255,252,247,0.85), 20px 20px 50px rgba(163,156,146,0.60), inset 0 0 0 8px rgba(163,156,146,0.10)',
              background: avatarColor,
            }}
          >
            {/* Avatar Initials Fallback */}
            <span
              className="font-serif"
              style={{
                fontSize: 'clamp(80px, 15vw, 120px)',
                color: '#FFFFFF',
                fontWeight: 300,
                opacity: 0.9,
                textShadow: '2px 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              {initials}
            </span>
          </div>

          {/* Floating Stat Cards - Only show if there's data */}
          {yearsExp > 0 && (
            <div
              className="absolute top-0 left-0 lg:left-[-40px] p-4 rounded-2xl bg-[#E8E3DC] shadow-raised animate-float"
              style={{ animationDelay: '0s' }}
            >
              <div className="font-mono" style={{ fontSize: '32px', color: '#3D3830', fontWeight: 300 }}>
                {yearsCount}{yearsExp > 0 ? '+' : ''}
              </div>
              <div
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '11px',
                  color: '#7A7268',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {yearsExp === 1 ? 'Year' : 'Years'} Experience
              </div>
            </div>
          )}

          {projectCount > 0 && (
            <div
              className="absolute top-0 right-0 lg:right-[-40px] p-4 rounded-2xl bg-[#E8E3DC] shadow-raised animate-float"
              style={{ animationDelay: '1.5s' }}
            >
              <div className="font-mono" style={{ fontSize: '32px', color: '#3D3830', fontWeight: 300 }}>
                {projectsCount}
              </div>
              <div
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '11px',
                  color: '#7A7268',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {projectCount === 1 ? 'Project' : 'Projects'} Done
              </div>
            </div>
          )}

          {skillCount > 0 && (
            <div
              className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 p-4 rounded-2xl bg-[#E8E3DC] shadow-raised animate-float"
              style={{ animationDelay: '3s' }}
            >
              <div className="font-mono" style={{ fontSize: '32px', color: '#3D3830', fontWeight: 300 }}>
                {skillsCount}
              </div>
              <div
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '11px',
                  color: '#7A7268',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                Core Skills
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className="px-3 py-1 rounded-full bg-[#E8E3DC] shadow-raised-sm"
          style={{
            fontFamily: 'DM Sans',
            fontSize: '10px',
            color: '#A09890',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </div>
        <div className="w-6 h-6 rounded-full bg-[#E8E3DC] shadow-raised-sm flex items-center justify-center animate-scroll-bounce">
          <ChevronDown size={14} color="#A09890" />
        </div>
      </div>

      <style>{`
        @keyframes rise-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-rise-in {
          animation: rise-in 0.8s ease forwards;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-breathe {
          animation: breathe 6s ease-in-out infinite;
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        .animate-scroll-bounce {
          animation: scroll-bounce 2s ease infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 5px #8B7355; }
          50% { opacity: 0.6; box-shadow: 0 0 15px #8B7355; }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}