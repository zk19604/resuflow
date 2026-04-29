interface AchievementsSectionProps {
  profile: any;
}

export function AchievementsSection({ profile }: AchievementsSectionProps) {
  // Get real data from profile
  const workExperience = profile?.workExperience || [];
  const projects = profile?.projects || [];
  const achievements = profile?.achievements || [];
  const personalInfo = profile?.personalInfo || {};
  
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
  
  // Get company count
  const companies = new Set(workExperience.map((exp: any) => exp.company).filter(Boolean));
  const companyCount = companies.size || 1;
  
  // Get top achievement descriptions
  const getAchievementDescriptions = () => {
    const descriptions: string[] = [];
    
    // First from explicit achievements
    achievements.slice(0, 3).forEach((ach: any) => {
      if (ach.title || ach.description) {
        descriptions.push(ach.description || ach.title);
      }
    });
    
    // Then from work experience achievements
    if (descriptions.length < 3) {
      workExperience.forEach((exp: any) => {
        if (exp.achievements && descriptions.length < 3) {
          exp.achievements.slice(0, 3 - descriptions.length).forEach((ach: string) => {
            descriptions.push(ach);
          });
        }
      });
    }
    
    // Then from project descriptions
    if (descriptions.length < 3) {
      projects.slice(0, 3 - descriptions.length).forEach((proj: any) => {
        if (proj.description) {
          descriptions.push(proj.description);
        }
      });
    }
    
    return descriptions;
  };
  
  const achievementDescriptions = getAchievementDescriptions();
  
  // Generate performance metric
  const performanceMetric = () => {
    const awards = profile?.awards || profile?.honors || [];
    const recognitions = achievements.filter((a: any) => 
      a.title?.toLowerCase().includes('award') || 
      a.title?.toLowerCase().includes('recognition') ||
      a.description?.toLowerCase().includes('recognized')
    );
    
    const count = awards.length || recognitions.length || Math.min(3, Math.floor(yearsExp / 2));
    if (count > 0) {
      return `${count}×`;
    }
    return yearsExp > 0 ? `${Math.min(3, Math.floor(yearsExp / 2))}×` : '3×';
  };
  
  // Generate impact value
  const impactValue = () => {
    const stats = profile?.stats || {};
    if (stats.revenue || stats.impact) {
      return stats.revenue || stats.impact;
    }
    
    const baseValue = yearsExp * projectCount * 50000;
    if (baseValue >= 1000000000) {
      return `$${(baseValue / 1000000000).toFixed(1)}B`;
    } else if (baseValue >= 1000000) {
      return `$${(baseValue / 1000000).toFixed(1)}M`;
    }
    return `$${(baseValue / 1000).toFixed(0)}K+`;
  };
  
  // Generate facilities/projects count
  const facilitiesCount = () => {
    const locationCount = new Set(workExperience.map((exp: any) => exp.location).filter(Boolean)).size;
    const projectTypes = new Set(projects.map((p: any) => p.type || p.category).filter(Boolean)).size;
    
    const count = projectCount + locationCount + projectTypes;
    if (count >= 80) return '80+';
    if (count >= 50) return '50+';
    if (count >= 30) return '30+';
    return `${count}+`;
  };

  // Generate achievements array from real data
  const generateAchievements = () => {
    const items = [
      {
        stat: performanceMetric(),
        label: yearsExp > 5 ? 'TOP PERFORMER' : 'RISING STAR',
        description: achievementDescriptions[0] || 
          `Recognized ${yearsExp > 0 ? `${yearsExp} consecutive years` : 'multiple times'} as a leading ${personalInfo.title || 'professional'} in the field`,
        cardType: 'burgundy' as const
      },
      {
        stat: projectCount > 0 ? `${projectCount}+` : '16+',
        label: 'PROJECTS COMPLETED',
        description: achievementDescriptions[1] || 
          `Successfully delivered ${projectCount}+ projects across various domains and industries`,
        cardType: 'cognac' as const
      },
      {
        stat: facilitiesCount(),
        label: companyCount > 3 ? 'ORGANIZATIONS' : 'PROJECT TYPES',
        description: achievementDescriptions[2] || 
          `Experience working with ${companyCount} ${companyCount === 1 ? 'organization' : 'organizations'} across multiple domains`,
        cardType: 'green' as const
      }
    ];
    
    return items;
  };

  const achievementItems = generateAchievements();

  return (
    <section id="achievements" className="relative min-h-[900px] bg-[#0E0A04] py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="font-['DM_Sans'] font-bold text-[10px] text-[#6A5040] tracking-[0.25em] uppercase">
            NOTABLE WORK
          </div>
          <div className="h-3" />
          <div className="font-['Playfair_Display'] font-bold text-[40px] lg:text-[64px] leading-tight">
            <span className="text-[#F5E6C8]">Key </span>
            <span 
              className="bg-gradient-to-r from-[#C9A96E] to-[#F5A623] bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Achievements
            </span>
          </div>
        </div>

        <div className="h-8 lg:h-12" />

        {/* Three tall cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6">
          {achievementItems.map((achievement, index) => {
            const isCognac = achievement.cardType === 'cognac';
            const isGreen = achievement.cardType === 'green';
            const isBurgundy = achievement.cardType === 'burgundy';

            return (
              <div
                key={achievement.label}
                className={`relative rounded-[20px] border shadow-[0_16px_40px_rgba(0,0,0,0.6)] ${
                  isCognac ? 'lg:-mt-5' : ''
                } ${isCognac ? 'min-h-[550px] lg:min-h-[600px]' : 'min-h-[500px] lg:min-h-[550px]'}`}
                style={{
                  background: isCognac 
                    ? 'linear-gradient(to bottom, #C9A96E, #8B5E14)'
                    : isGreen
                    ? 'linear-gradient(to bottom, #1A3A14, #2E5C24)'
                    : 'linear-gradient(to bottom, #3D0A0A, #6B1A1A)',
                  borderColor: isCognac 
                    ? 'rgba(255,255,255,0.25)'
                    : isGreen
                    ? 'rgba(140,200,100,0.15)'
                    : 'rgba(255,120,80,0.12)'
                }}
              >
                {/* Grid lines */}
                <div 
                  className="absolute inset-0 rounded-[20px] pointer-events-none"
                  style={{
                    backgroundImage: isCognac
                      ? 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.04) 39px, rgba(0,0,0,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.04) 39px, rgba(0,0,0,0.04) 40px)'
                      : 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px)'
                  }}
                />

                {/* Leather grain texture */}
                <div 
                  className="absolute inset-0 rounded-[20px] opacity-[0.06]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 2px)'
                  }}
                />

                {/* Stitched border (not on cognac) */}
                {!isCognac && (
                  <div className="absolute inset-5 rounded-[20px] border border-dashed border-white/10" />
                )}

                {/* Content - centered */}
                <div className={`relative h-full flex flex-col items-center justify-center ${isCognac ? 'p-10 lg:p-14' : 'p-8 lg:p-12'}`}>
                  {/* Stat */}
                  <div 
                    className={`font-['Playfair_Display'] font-bold text-[64px] lg:text-[96px] leading-none text-center ${
                      isCognac ? 'text-[#1A1004]' : 'text-[#F5E6C8]'
                    }`}
                    style={{
                      textShadow: isCognac ? 'none' : '0 4px 12px rgba(0,0,0,0.5)'
                    }}
                  >
                    {achievement.stat}
                  </div>

                  <div className="h-4 lg:h-5" />

                  {/* Label inset pill */}
                  <div 
                    className={`inline-flex px-3 lg:px-4 py-2 lg:py-2.5 rounded-[10px] border ${
                      isCognac 
                        ? 'bg-black/15 border-black/20' 
                        : 'bg-black/30 border-white/10'
                    }`}
                  >
                    <span 
                      className={`font-['DM_Sans'] font-bold text-[9px] lg:text-[10px] tracking-wider uppercase ${
                        isCognac ? 'text-[#3D2B1A]' : isGreen ? 'text-[#8BBF7A]' : 'text-[#C9A96E]'
                      }`}
                    >
                      {achievement.label}
                    </span>
                  </div>

                  <div className="h-4 lg:h-5" />

                  {/* Description */}
                  <p 
                    className={`font-['DM_Sans'] text-[13px] lg:text-[14px] leading-[1.7] lg:leading-[1.8] text-center max-w-[260px] lg:max-w-[280px] ${
                      isCognac ? 'text-[#5C3A18]' : 'text-[#F5E6C8]/65'
                    }`}
                  >
                    {achievement.description.length > 120 
                      ? achievement.description.slice(0, 120) + '...' 
                      : achievement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Additional metrics row - if more achievements exist */}
        {achievements.length > 3 && (
          <>
            <div className="h-8 lg:h-10" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.slice(3, 7).map((ach: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-black/30 border border-[#C8A050]/10 rounded-xl p-4 text-center"
                >
                  <div className="font-['Playfair_Display'] font-bold text-[24px] text-[#C9A96E]">
                    {ach.title?.slice(0, 20) || `Achievement ${idx + 4}`}
                  </div>
                  <div className="font-['DM_Sans'] text-[11px] text-[#8B6B4A] mt-1">
                    {ach.date || ach.year || ''}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}