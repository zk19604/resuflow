import { useState, useEffect } from 'react';

interface HeroSectionProps {
  profile: any;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const [yearsCount, setYearsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [operationsCount, setOperationsCount] = useState(0);

  // Get real data from profile
  const personalInfo = profile?.personalInfo || {};
  const name = personalInfo.name || 'Your Name';
  const firstName = name.split(' ')[0];
  const lastName = name.split(' ').slice(1).join(' ');
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  
  const workExperience = profile?.workExperience || [];
  const currentRole = workExperience[0] || {};
  const role = currentRole.role || 'Professional';
  const company = currentRole.company || '';
  
  const summary = profile?.summary || personalInfo.summary || '';
  // NO TRUNCATION - show full summary
  const tagline = summary || `${role} based in ${personalInfo.location || 'the area'}. I turn complex challenges into elegant, scalable solutions.`;
  
  const projects = profile?.projects || [];
  const skills = profile?.skills || { technical: [], tools: [], soft: [] };
  
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
    return years.reduce((a: number, b: number) => a + b, 0);
  };

  const yearsExp = calculateYears();
  const projectCount = projects.length || workExperience.length || 0;
  
  // Calculate operations/projects optimized
  const operationsOptimized = () => {
    const totalAchievements = workExperience.reduce((acc: number, exp: any) => {
      return acc + (exp.achievements?.length || 0);
    }, 0);
    
    const skillsCount = (skills.technical?.length || 0) + (skills.tools?.length || 0);
    
    return Math.max(projectCount * 2, totalAchievements * 3, skillsCount * 2, 1);
  };
  
  const opsCount = operationsOptimized();
  
  // Check if currently employed/available
  const currentlyEmployed = workExperience.some((exp: any) => 
    exp.endDate === 'Present' || !exp.endDate
  );
  
  const availabilityText = currentlyEmployed ? 'Currently Working' : 'Available for Work';
  const availabilityColor = currentlyEmployed ? '#4ADE80' : '#F5A623';
  
  // Stats for display - using real data
  const stats = [
    { label: 'PROJECTS COMPLETED', value: projectCount > 0 ? projectCount : 16 },
    { label: 'OPERATIONS OPTIMIZED', value: opsCount > 0 ? opsCount : 80 },
    { label: 'YEARS EXPERIENCE', value: yearsExp > 0 ? yearsExp : 12 }
  ];

  // Animation for counting numbers
  useEffect(() => {
    if (yearsExp === 0 && projectCount === 0 && opsCount === 0) return;
    
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const yearTimer = setInterval(() => {
      setYearsCount((prev) => prev >= yearsExp ? yearsExp : prev + Math.ceil(yearsExp / steps));
    }, interval);

    const projectTimer = setInterval(() => {
      setProjectsCount((prev) => prev >= projectCount ? projectCount : prev + Math.ceil(projectCount / steps));
    }, interval);

    const opsTimer = setInterval(() => {
      setOperationsCount((prev) => prev >= opsCount ? opsCount : prev + Math.ceil(opsCount / steps));
    }, interval);

    return () => {
      clearInterval(yearTimer);
      clearInterval(projectTimer);
      clearInterval(opsTimer);
    };
  }, [yearsExp, projectCount, opsCount]);

  const scrollToWork = () => {
    const workSection = document.getElementById('experience') || document.getElementById('work');
    if (workSection) {
      const offset = 90;
      const elementPosition = workSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 90;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };
  
  // Get display value with animation
  const getAnimatedValue = (index: number): string => {
    if (index === 0) return `${projectsCount}`;
    if (index === 1) return `${operationsCount}`;
    return `${yearsCount}`;
  };
  
  // Get suffix for stats
  const getSuffix = (index: number): string => {
    if (index === 0) return projectCount > 0 && projectsCount >= projectCount ? '+' : '';
    if (index === 1) return opsCount > 0 && operationsCount >= opsCount ? '+' : '';
    return yearsExp > 0 && yearsCount >= yearsExp ? '+' : '';
  };
  
  // Get the headline word based on role
  const getHeadlineWord = (): string => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('full stack') || roleLower.includes('full-stack')) {
      return 'full-stack';
    }
    if (roleLower.includes('frontend') || roleLower.includes('front-end')) {
      return 'frontend';
    }
    if (roleLower.includes('backend') || roleLower.includes('back-end')) {
      return 'backend';
    }
    if (roleLower.includes('developer') || roleLower.includes('engineer')) {
      return 'digital';
    }
    if (roleLower.includes('designer')) {
      return 'beautiful';
    }
    return role.split(' ')[0].toLowerCase();
  };
  
  // Get the headline ending
  const getHeadlineEnding = (): string => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('full stack') || roleLower.includes('developer') || roleLower.includes('engineer')) {
      return 'applications';
    }
    if (roleLower.includes('designer')) {
      return 'experiences';
    }
    if (roleLower.includes('manager') || roleLower.includes('lead')) {
      return 'teams';
    }
    return 'that deliver.';
  };

  const headlineWord = getHeadlineWord();
  const headlineEnding = getHeadlineEnding();
  const showSecondLine = headlineEnding !== 'that deliver.';

  return (
    <section id="home" className="relative min-h-screen pt-[72px] bg-[#0E0A04] flex items-center" style={{ minHeight: '920px' }}>
      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-20 py-10 flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Card - Deep Burgundy Leather UI Card (58%) */}
        <div 
          className="lg:w-[58%] relative rounded-[20px] border border-[#FF7850]/15 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
          style={{
            background: 'radial-gradient(circle at center, #6B1A1A, #2A0808)'
          }}
        >
          {/* Inner top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-[#FFB478]/15 rounded-t-[20px]" />
          
          {/* Grid lines - artboard style */}
          <div 
            className="absolute inset-0 rounded-[20px] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px)'
            }}
          />
          
          {/* Leather grain texture */}
          <div 
            className="absolute inset-0 rounded-[20px] opacity-[0.08]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 2px)'
            }}
          />
          
          {/* Stitched border inset */}
          <div className="absolute inset-4 rounded-[20px] border border-dashed border-white/[0.08]" style={{ borderSpacing: '8px 6px' }} />
          
          {/* Content */}
          <div className="relative p-8 lg:p-14 flex flex-col h-full min-h-[600px] lg:min-h-0">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2.5 self-start px-4 py-2.5 bg-black/30 border border-white/10 rounded-[20px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: availabilityColor }} />
              <span className="font-['DM_Sans'] text-[11px] lg:text-[12px] text-[#CCBBAA]">
                {availabilityText}
              </span>
            </div>

            <div className="h-6 lg:h-10" />

            {/* Headline - Dynamic based on real role */}
            <div className="font-['Playfair_Display'] font-bold text-[48px] lg:text-[64px] xl:text-[72px] leading-[1.1]">
              <div className="text-[#F5E6C8]">Hi, I'm</div>
              <div className="text-[#F5E6C8]">{firstName} —</div>
              <div className="text-[#F5E6C8]">I build</div>
              <div 
                className="bg-gradient-to-r from-[#C9A96E] to-[#F5A623] bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {headlineWord}
              </div>
              {showSecondLine ? (
                <div className="text-[#F5E6C8]">{headlineEnding}</div>
              ) : (
                <div className="text-[#F5E6C8]">that deliver.</div>
              )}
            </div>

            <div className="h-6 lg:h-8" />

            {/* Sub-text - FULL SUMMARY, NO TRUNCATION */}
            <p className="font-['DM_Sans'] text-[14px] lg:text-[16px] text-[#A09070] leading-[1.85] max-w-[480px]">
              {tagline}
            </p>

            <div className="h-8 lg:h-12" />

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={scrollToWork}
                className="relative px-6 lg:px-7 py-3 lg:py-3.5 bg-gradient-to-b from-[#C9A96E] to-[#8B6914] rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:from-[#D4B47E] hover:to-[#9B7924] transition-all"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-white/35 rounded-t-3xl" />
                <span className="font-['DM_Sans'] font-bold text-[13px] lg:text-[14px] text-[#1A1004]">
                  View My Work
                </span>
              </button>
              <button 
                onClick={handleContactClick}
                className="relative px-6 lg:px-7 py-3 lg:py-3.5 bg-white/[0.06] border border-white/15 rounded-3xl shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] hover:bg-white/[0.1] transition-all"
              >
                <span className="font-['DM_Sans'] font-bold text-[13px] lg:text-[14px] text-[#E8D5A3]">
                  Contact Me
                </span>
              </button>
            </div>

            {/* Footer strip */}
            <div className="mt-auto pt-4 -mx-8 lg:-mx-14 -mb-8 lg:-mb-14 px-8 lg:px-14 py-3 lg:py-4 bg-black/25 border-t border-white/[0.06] rounded-b-[20px] flex flex-col items-center">
              <span className="font-['DM_Sans'] text-[9px] lg:text-[10px] text-[#6A5040] tracking-[0.3em] uppercase">
                SCROLL DOWN
              </span>
              <div className="text-[#6A5040] text-xs mt-1">↓</div>
            </div>
          </div>
        </div>

        {/* Right Card - Cognac Gold Stats UI Card (42%) */}
        <div 
          className="lg:w-[42%] relative rounded-[20px] border border-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          style={{
            background: 'linear-gradient(to bottom, #C9A96E, #7A4E1E, #C9A96E)'
          }}
        >
          {/* Inner top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-white/40 rounded-t-[20px]" />
          
          {/* Grid lines */}
          <div 
            className="absolute inset-0 rounded-[20px] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px)'
            }}
          />
          
          {/* Leather grain overlay */}
          <div 
            className="absolute inset-0 rounded-[20px] opacity-[0.05]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 2px)'
            }}
          />
          
          {/* Content */}
          <div className="relative p-8 lg:p-12 flex flex-col justify-center h-full min-h-[500px] lg:min-h-0">
            {/* Top label */}
            <div className="font-['DM_Sans'] font-bold text-[9px] lg:text-[10px] text-[#1A1004]/50 tracking-[0.25em] uppercase">
              PROFILE OVERVIEW
            </div>

            <div className="h-6 lg:h-8" />

            {/* Profile identity block */}
            <div className="bg-black/15 border border-black/20 rounded-xl shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)] p-6 lg:p-7 flex flex-col items-center">
              {/* Monogram circle */}
              <div className="w-[60px] h-[60px] lg:w-[72px] lg:h-[72px] rounded-full bg-[#1A1004] border-2 border-[#C8A050]/40 shadow-[0_4px_12px_rgba(0,0,0,0.4)] flex items-center justify-center">
                <span className="font-['Playfair_Display'] font-bold text-[20px] lg:text-[24px] text-[#C9A96E]">
                  {initials}
                </span>
              </div>

              <div className="h-3 lg:h-4" />

              <div className="font-['Playfair_Display'] font-bold text-[18px] lg:text-[22px] text-[#1A1004] text-center">
                {name}
              </div>
              <div className="font-['DM_Sans'] text-[12px] lg:text-[14px] text-[#1A1004]/65 text-center">
                {role}
              </div>
              {company && (
                <div className="font-['DM_Sans'] text-[11px] lg:text-[12px] text-[#1A1004]/40 text-center mt-1">
                  {company}
                </div>
              )}
            </div>

            <div className="h-6 lg:h-8" />
            <div className="h-px bg-black/15" />
            <div className="h-5 lg:h-7" />

            {/* Stat rows */}
            <div className="space-y-0">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="flex justify-between items-center py-6 lg:py-10 border-b border-black/10 last:border-b-0"
                >
                  <span className="font-['DM_Sans'] text-[10px] lg:text-[11px] text-[#1A1004]/50 tracking-[0.15em] uppercase">
                    {stat.label}
                  </span>
                  <span className="font-['Playfair_Display'] font-bold text-[36px] lg:text-[48px] text-[#1A1004] leading-none">
                    {getAnimatedValue(index)}{getSuffix(index)}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Location if available */}
            {personalInfo.location && (
              <>
                <div className="h-5 lg:h-7" />
                <div className="h-px bg-black/15" />
                <div className="h-4 lg:h-5" />
                <div className="flex items-center gap-2">
                  <span className="font-['DM_Sans'] text-[10px] lg:text-[11px] text-[#1A1004]/40 tracking-wider uppercase">
                    📍 LOCATION
                  </span>
                  <span className="font-['DM_Sans'] text-[12px] lg:text-[13px] text-[#1A1004]/60">
                    {personalInfo.location}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}