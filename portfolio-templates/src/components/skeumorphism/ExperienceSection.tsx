import { useState } from 'react';

interface ExperienceSectionProps {
  profile: any;
}

export function ExperienceSection({ profile }: ExperienceSectionProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Get real data from profile
  const workExperience = profile?.workExperience || [];
  const personalInfo = profile?.personalInfo || {};

  // Process work experience data
  const processExperiences = () => {
    const processed: any[] = [];
    
    workExperience.slice(0, 6).forEach((exp: any, index: number) => {
      if (exp.role || exp.company) {
        // Format date range
        let date = '';
        if (exp.startDate && exp.endDate) {
          const startYear = exp.startDate.split('-')[0];
          const endYear = exp.endDate === 'Present' ? 'PRESENT' : exp.endDate.split('-')[0];
          date = `${startYear} — ${endYear}`;
        } else if (exp.startDate) {
          const startYear = exp.startDate.split('-')[0];
          date = `${startYear} — PRESENT`;
        } else if (exp.endDate) {
          date = exp.endDate.split('-')[0];
        }
        
        // Get achievement text
        const achievements = exp.achievements || [];
        let achievement = '';
        if (achievements.length > 0) {
          const firstAch = achievements[0];
          const metricMatch = firstAch.match(/(\d+%?|\$\d+[BMK]?|\d+\+?)/);
          if (metricMatch) {
            const words = firstAch.split(' ');
            const keyWord = words.find((w: string) => 
              w.toUpperCase().includes('OPTIMIZED') || 
              w.toUpperCase().includes('SAVED') || 
              w.toUpperCase().includes('MANAGED') ||
              w.toUpperCase().includes('INCREASED') ||
              w.toUpperCase().includes('REDUCED') ||
              w.toUpperCase().includes('DELIVERED') ||
              w.toUpperCase().includes('LED')
            );
            achievement = `${metricMatch[0]} ${keyWord?.toUpperCase() || 'ACHIEVED'}`;
          } else {
            achievement = firstAch.slice(0, 30).toUpperCase();
          }
        } else if (exp.description) {
          const desc = exp.description;
          const metricMatch = desc.match(/(\d+%?|\$\d+[BMK]?|\d+\+?)/);
          if (metricMatch) {
            achievement = `${metricMatch[0]} IMPACT`;
          } else {
            achievement = 'KEY CONTRIBUTOR';
          }
        } else {
          achievement = `${exp.company?.split(' ')[0] || 'TEAM'} LEAD`;
        }
        
        // Determine card type based on index and role
        const cardTypes = ['burgundy', 'cognac', 'green'] as const;
        let cardType = cardTypes[index % 3];
        
        // Override based on role seniority
        const roleLower = (exp.role || '').toLowerCase();
        if (roleLower.includes('chief') || roleLower.includes('ceo') || roleLower.includes('president')) {
          cardType = 'cognac';
        } else if (roleLower.includes('senior') || roleLower.includes('lead') || roleLower.includes('head')) {
          cardType = 'burgundy';
        } else if (roleLower.includes('director') || roleLower.includes('vp')) {
          cardType = 'green';
        }
        
        processed.push({
          number: `${(index + 1).toString().padStart(2, '0')}`,
          date,
          title: exp.role || 'Professional',
          company: exp.company || '',
          description: exp.description || achievements[0] || `Contributed to ${exp.company || 'organization'} success through strategic initiatives and operational excellence.`,
          achievement,
          cardType,
          location: exp.location || '',
          highlights: achievements.slice(0, 3)
        });
      }
    });
    
    return processed;
  };
  
  const experiences = processExperiences();
  
  // Generate placeholder if no experiences
  const getDisplayExperiences = () => {
    if (experiences.length > 0) {
      return experiences.slice(0, 3);
    }
    
    // Create placeholder from profile data
    const summary = profile?.summary || personalInfo.summary || '';
    const skills = profile?.skills || {};
    const technicalSkills = skills.technical || [];
    
    return [
      {
        number: '01',
        date: `${new Date().getFullYear() - 2} — PRESENT`,
        title: technicalSkills[0] ? `${technicalSkills[0]} Developer` : 'Professional',
        company: 'Current Organization',
        description: summary.slice(0, 150) || 'Leading strategic initiatives and delivering measurable results through innovative solutions and collaborative leadership.',
        achievement: technicalSkills.length > 0 ? `${technicalSkills.length}+ SKILLS` : 'KEY CONTRIBUTOR',
        cardType: 'burgundy' as const,
        location: personalInfo.location || '',
        highlights: []
      },
      {
        number: '02',
        date: `${new Date().getFullYear() - 4} — ${new Date().getFullYear() - 2}`,
        title: technicalSkills[1] ? `${technicalSkills[1]} Specialist` : 'Senior Professional',
        company: 'Previous Organization',
        description: 'Drove operational improvements and team development while managing complex projects and stakeholder relationships.',
        achievement: 'TEAM LEAD',
        cardType: 'cognac' as const,
        location: '',
        highlights: []
      },
      {
        number: '03',
        date: `${new Date().getFullYear() - 6} — ${new Date().getFullYear() - 4}`,
        title: 'Professional',
        company: 'Early Career',
        description: 'Built foundational expertise and delivered consistent value through dedicated execution and continuous learning.',
        achievement: 'TOP PERFORMER',
        cardType: 'green' as const,
        location: '',
        highlights: []
      }
    ];
  };
  
  const displayExperiences = getDisplayExperiences();
  
  // Generate filter categories from experience roles
  const generateFilters = () => {
    const filters = new Set(['All']);
    
    displayExperiences.forEach(exp => {
      const title = exp.title.toLowerCase();
      if (title.includes('operation') || title.includes('director')) {
        filters.add('Operations');
      }
      if (title.includes('strategy') || title.includes('consultant')) {
        filters.add('Strategy');
      }
      if (title.includes('lead') || title.includes('chief') || title.includes('head') || title.includes('manager')) {
        filters.add('Leadership');
      }
      if (title.includes('develop') || title.includes('engineer') || title.includes('technical')) {
        filters.add('Technical');
      }
      if (title.includes('design') || title.includes('creative')) {
        filters.add('Creative');
      }
    });
    
    if (filters.size <= 1) {
      filters.add('Operations');
      filters.add('Strategy');
      filters.add('Leadership');
    }
    
    return Array.from(filters).slice(0, 4);
  };
  
  const filters = generateFilters();
  
  const filteredExperiences = activeFilter === 'All' 
    ? displayExperiences 
    : displayExperiences.filter(exp => {
        const title = exp.title.toLowerCase();
        const filter = activeFilter.toLowerCase();
        if (filter === 'operations') return title.includes('operation') || title.includes('director');
        if (filter === 'strategy') return title.includes('strategy') || title.includes('consultant');
        if (filter === 'leadership') return title.includes('lead') || title.includes('chief') || title.includes('head') || title.includes('manager');
        if (filter === 'technical') return title.includes('develop') || title.includes('engineer') || title.includes('technical');
        if (filter === 'creative') return title.includes('design') || title.includes('creative');
        return true;
      });
  
  if (displayExperiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="relative min-h-[1100px] bg-[#0E0A04] py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="font-['Playfair_Display'] font-bold text-[12px] lg:text-[14px] text-[#6A5040] tracking-[0.2em] uppercase">
            SELECTED
          </div>
          <div className="h-2" />
          <div className="font-['Playfair_Display'] font-bold text-[40px] lg:text-[64px] leading-tight">
            <span className="text-[#F5E6C8]">Professional </span>
            <span 
              className="bg-gradient-to-r from-[#C9A96E] to-[#F5A623] bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Experience
            </span>
          </div>
        </div>

        <div className="h-8 lg:h-12" />

        {/* Filter pill bar */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-[28px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)] p-2 flex gap-2 flex-wrap justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 lg:px-6 py-2.5 lg:py-3 rounded-[20px] font-['DM_Sans'] text-[11px] lg:text-[13px] transition-all ${
                  activeFilter === filter
                    ? 'bg-gradient-to-b from-[#8B1A0A] to-[#5C0E06] font-bold text-[#F5D0B0] shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
                    : 'text-[#8B6B4A] hover:text-[#C9A96E]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="h-8 lg:h-12" />

        {/* Experience cards grid */}
        {filteredExperiences.length > 0 ? (
          <div className={`grid ${filteredExperiences.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : filteredExperiences.length === 2 ? 'grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {filteredExperiences.map((exp, index) => {
              const isCognac = exp.cardType === 'cognac';
              const isGreen = exp.cardType === 'green';
              const isBurgundy = exp.cardType === 'burgundy';

              return (
                <div
                  key={exp.number}
                  className={`relative rounded-[20px] border shadow-[0_16px_40px_rgba(0,0,0,0.6)] ${
                    isCognac ? 'lg:-mt-5 shadow-[0_24px_56px_rgba(0,0,0,0.7)]' : ''
                  }`}
                  style={{
                    background: isCognac 
                      ? 'linear-gradient(to bottom, #C9A96E, #7A4E1E)'
                      : isGreen
                      ? 'linear-gradient(to bottom, #2E5C24, #1A3A14)'
                      : 'linear-gradient(to bottom, #6B1A1A, #2A0808)',
                    borderColor: isCognac 
                      ? 'rgba(255,255,255,0.3)'
                      : isGreen
                      ? 'rgba(140,200,100,0.15)'
                      : 'rgba(255,120,80,0.12)'
                  }}
                >
                  <div 
                    className="h-1.5 rounded-t-[20px]"
                    style={{
                      background: isCognac ? '#1A1004' : isGreen ? '#8BBF7A' : '#C9A96E'
                    }}
                  />

                  <div 
                    className="absolute inset-0 rounded-[20px] pointer-events-none"
                    style={{
                      backgroundImage: isCognac
                        ? 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.05) 39px, rgba(0,0,0,0.05) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.05) 39px, rgba(0,0,0,0.05) 40px)'
                        : 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px)'
                    }}
                  />

                  <div 
                    className="absolute inset-0 rounded-[20px] opacity-[0.08]"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 2px)'
                    }}
                  />

                  <div className="relative p-8 lg:p-12">
                    <div 
                      className={`font-['Playfair_Display'] font-bold text-[24px] lg:text-[28px] leading-none ${
                        isCognac ? 'text-[#1A1004]/20' : 'text-[#C8A050]/20'
                      }`}
                    >
                      № {exp.number}
                    </div>

                    <div className="h-2" />

                    <div className="inline-flex px-3.5 py-2 bg-black/30 border border-white/10 rounded-xl">
                      <span 
                        className={`font-['DM_Sans'] text-[10px] lg:text-[11px] tracking-wider uppercase ${
                          isCognac ? 'text-[#1A1004]/60' : 'text-[#A09070]'
                        }`}
                      >
                        {exp.date}
                      </span>
                    </div>

                    <div className="h-4 lg:h-5" />

                    <div 
                      className={`font-['Playfair_Display'] font-bold text-[22px] lg:text-[28px] leading-tight ${
                        isCognac ? 'text-[#1A1004]' : 'text-[#F5E6C8]'
                      }`}
                    >
                      {exp.title}
                    </div>

                    <div className="h-1" />

                    <div 
                      className={`font-['DM_Sans'] italic text-[12px] lg:text-[14px] ${
                        isCognac ? 'text-[#5C3A18]' : 'text-[#8B6B4A]'
                      }`}
                    >
                      {exp.company}
                      {exp.location && <span className="ml-2">· {exp.location}</span>}
                    </div>

                    <div className="h-4" />

                    <div className={`h-px ${isCognac ? 'bg-black/10' : 'bg-white/[0.06]'}`} />

                    <div className="h-4" />

                    <p 
                      className={`font-['DM_Sans'] text-[13px] lg:text-[14px] leading-[1.8] ${
                        isCognac ? 'text-[#5C3A18]' : 'text-[#A09070]'
                      }`}
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {exp.description.length > 150 ? exp.description.slice(0, 150) + '...' : exp.description}
                    </p>
                    
                    {exp.highlights.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {exp.highlights.slice(0, 2).map((highlight: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${isCognac ? 'bg-[#1A1004]' : 'bg-[#C9A96E]'}`} />
                            <span className={`font-['DM_Sans'] text-[10px] lg:text-[11px] ${isCognac ? 'text-[#3D2B1A]' : 'text-[#8B6B4A]'}`}>
                              {highlight.length > 40 ? highlight.slice(0, 40) + '...' : highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div 
                    className={`absolute bottom-0 left-0 right-0 rounded-b-[20px] border-t py-3 lg:py-4 text-center ${
                      isCognac 
                        ? 'bg-black/15 border-black/10' 
                        : 'bg-black/30 border-white/[0.06]'
                    }`}
                  >
                    <span 
                      className={`font-['DM_Sans'] font-bold text-[11px] lg:text-[12px] tracking-wider ${
                        isCognac ? 'text-[#1A1004]' : isGreen ? 'text-[#8BBF7A]' : 'text-[#C9A96E]'
                      }`}
                    >
                      {exp.achievement}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-['DM_Sans'] text-[14px] text-[#8B6B4A]">
              No experiences match this filter.
            </p>
          </div>
        )}
        
        {workExperience.length > 3 && activeFilter === 'All' && (
          <div className="mt-8 text-center">
            <div className="inline-flex px-4 py-2 bg-[#C8A050]/10 border border-[#C8A050]/20 rounded-full">
              <span className="font-['DM_Sans'] text-[12px] text-[#C9A96E]">
                +{workExperience.length - 3} more {workExperience.length - 3 === 1 ? 'position' : 'positions'}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}