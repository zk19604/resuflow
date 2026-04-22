interface EducationSectionProps {
  profile: any;
}

export function EducationSection({ profile }: EducationSectionProps) {
  // Get real data from profile
  const education = profile?.education || [];
  const personalInfo = profile?.personalInfo || {};
  const name = personalInfo.name || '';
  
  // Process education data
  const processEducation = () => {
    const processed: any[] = [];
    
    education.forEach((edu: any) => {
      if (edu.degree || edu.institution) {
        // Determine education type based on degree
        let type = 'Degree';
        const degreeLower = (edu.degree || '').toLowerCase();
        if (degreeLower.includes('mba') || degreeLower.includes('master')) {
          type = 'MBA';
        } else if (degreeLower.includes('phd') || degreeLower.includes('doctor')) {
          type = 'PhD';
        } else if (degreeLower.includes('bsc') || degreeLower.includes('bs') || degreeLower.includes('bachelor')) {
          type = 'BSc';
        } else if (degreeLower.includes('ba')) {
          type = 'BA';
        } else if (degreeLower.includes('associate')) {
          type = 'Assoc';
        } else if (degreeLower.includes('certificate')) {
          type = 'Cert';
        }
        
        // Format year
        let year = '';
        if (edu.startDate && edu.endDate) {
          const startYear = edu.startDate.split('-')[0];
          const endYear = edu.endDate === 'Present' ? 'Present' : edu.endDate.split('-')[0];
          year = `${startYear}–${endYear}`;
        } else if (edu.endDate) {
          year = edu.endDate.split('-')[0];
        } else if (edu.year) {
          year = edu.year;
        }
        
        // Generate quote based on field of study
        const field = edu.field || '';
        const quotes = [
          `"Engineering taught me precision. Business taught me purpose."`,
          `"The foundation of systems thinking and continuous improvement."`,
          `"Where theory meets practice, innovation begins."`,
          `"Education is not the filling of a pail, but the lighting of a fire."`,
          `"Learning to solve problems that matter."`,
          `"Building the foundation for a lifetime of growth."`
        ];
        
        // Select quote based on field or use default
        let quote = quotes[processed.length % quotes.length];
        if (field.toLowerCase().includes('computer') || field.toLowerCase().includes('software')) {
          quote = `"Code is poetry. Architecture is the story it tells."`;
        } else if (field.toLowerCase().includes('business') || field.toLowerCase().includes('management')) {
          quote = `"Engineering taught me precision. Business taught me purpose."`;
        } else if (field.toLowerCase().includes('design')) {
          quote = `"Design is not just what it looks like. Design is how it works."`;
        } else if (field.toLowerCase().includes('data') || field.toLowerCase().includes('science')) {
          quote = `"In data we trust. In insights we grow."`;
        }
        
        processed.push({
          type,
          institution: edu.institution || 'Institution',
          degree: edu.degree || 'Degree',
          field: edu.field || '',
          year,
          grade: edu.grade || edu.gpa || '',
          quote,
          achievements: edu.achievements || []
        });
      }
    });
    
    return processed;
  };
  
  const educationItems = processEducation();
  
  // Generate placeholder education if none exists
  const getDisplayEducation = () => {
    if (educationItems.length > 0) {
      return educationItems.slice(0, 2);
    }
    
    // Create placeholder from profile data
    const placeholders = [];
    
    // Check if there's any education info in summary
    const summary = profile?.summary || personalInfo.summary || '';
    const educationMatch = summary.match(/(?:studying|studied|student|degree|university|college)[^.]*\./i);
    
    if (educationMatch) {
      placeholders.push({
        type: 'Degree',
        institution: 'University',
        degree: educationMatch[0],
        field: '',
        year: '',
        grade: '',
        quote: `"Every expert was once a beginner."`,
        achievements: []
      });
    }
    
    // Add based on skills if available
    const skills = profile?.skills || {};
    const technicalSkills = skills.technical || [];
    
    if (technicalSkills.length > 0) {
      const field = technicalSkills.slice(0, 3).join(', ');
      placeholders.push({
        type: technicalSkills.includes('React') || technicalSkills.includes('JavaScript') ? 'BSc' : 'Degree',
        institution: 'University',
        degree: `${field} & Related Technologies`,
        field: field,
        year: '',
        grade: '',
        quote: `"Continuous learning in ${technicalSkills[0]} and beyond."`,
        achievements: []
      });
    }
    
    return placeholders.slice(0, 2);
  };
  
  const displayEducation = getDisplayEducation();
  
  // If no education data at all, don't render
  if (displayEducation.length === 0) {
    return null;
  }

  return (
    <section className="relative min-h-[540px] bg-[#0E0A04] py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="font-['DM_Sans'] font-bold text-[10px] text-[#6A5040] tracking-[0.25em] uppercase">
            ACADEMIC RECORD
          </div>
          <div className="h-3" />
          <div className="font-['Playfair_Display'] font-bold text-[40px] lg:text-[56px] text-[#F5E6C8]">
            Education
          </div>
        </div>

        <div className="h-8 lg:h-12" />

        {/* Cards grid */}
        <div className={`grid ${displayEducation.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'} gap-6`}>
          {displayEducation.map((edu, index) => (
            <div
              key={index}
              className="relative rounded-[20px] bg-[#1A1810] border border-[#C8A050]/10 shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
            >
              {/* Grid lines */}
              <div 
                className="absolute inset-0 rounded-[20px] pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(255,255,255,0.02) 47px, rgba(255,255,255,0.02) 48px), repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(255,255,255,0.02) 47px, rgba(255,255,255,0.02) 48px)'
                }}
              />

              {/* Top gold accent strip */}
              <div className="h-1.5 bg-gradient-to-r from-[#C9A96E] to-[#F5A623] rounded-t-[20px]" />

              {/* Content */}
              <div className="relative p-8 lg:p-12">
                {/* Degree tag inset pill */}
                <div className="inline-flex px-3.5 py-2 bg-[#C8A050]/10 border border-[#C8A050]/20 rounded-[10px]">
                  <span className="font-['DM_Sans'] text-[10px] lg:text-[11px] text-[#C9A96E] uppercase tracking-wider">
                    {edu.type}
                  </span>
                </div>

                <div className="h-4 lg:h-5" />

                {/* Institution */}
                <div className="font-['Playfair_Display'] font-bold text-[22px] lg:text-[26px] text-[#F5E6C8] leading-tight">
                  {edu.institution}
                </div>

                <div className="h-2" />

                {/* Degree */}
                <div className="font-['DM_Sans'] text-[14px] lg:text-[15px] text-[#9A8060]">
                  {edu.degree}
                </div>
                
                {/* Field if available */}
                {edu.field && (
                  <div className="font-['DM_Sans'] text-[13px] text-[#7A6050] mt-0.5">
                    {edu.field}
                  </div>
                )}

                <div className="h-1.5" />

                {/* Year and Grade row */}
                <div className="flex items-center gap-4 flex-wrap">
                  {edu.year && (
                    <div className="font-['DM_Sans'] text-[12px] lg:text-[13px] text-[#C9A96E]">
                      {edu.year}
                    </div>
                  )}
                  {edu.grade && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-[#C8A050]/30" />
                      <div className="font-['DM_Sans'] text-[12px] lg:text-[13px] text-[#8B6B4A]">
                        Grade: {edu.grade}
                      </div>
                    </>
                  )}
                </div>

                {/* Achievements if available */}
                {edu.achievements.length > 0 && (
                  <>
                    <div className="h-4" />
                    <div className="space-y-1">
                      {edu.achievements.slice(0, 2).map((ach: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-[#C9A96E] mt-2 flex-shrink-0" />
                          <span className="font-['DM_Sans'] text-[11px] lg:text-[12px] text-[#8B6B4A]">
                            {ach.length > 50 ? ach.slice(0, 50) + '...' : ach}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="h-5 lg:h-6" />

                {/* Divider */}
                <div className="h-px bg-[#C8A050]/10" />

                <div className="h-4 lg:h-5" />

                {/* Quote */}
                <p className="font-['Playfair_Display'] italic text-[14px] lg:text-[15px] text-[#F5E6C8]/50 leading-[1.7]">
                  {edu.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional education summary if more than 2 items */}
        {educationItems.length > 2 && (
          <>
            <div className="h-6 lg:h-8" />
            <div className="max-w-2xl mx-auto">
              <div className="bg-black/20 border border-[#C8A050]/10 rounded-xl p-4 text-center">
                <span className="font-['DM_Sans'] text-[12px] text-[#8B6B4A]">
                  +{educationItems.length - 2} more {educationItems.length - 2 === 1 ? 'qualification' : 'qualifications'}
                </span>
              </div>
            </div>
          </>
        )}
        
        {/* Certifications section if available */}
        {profile?.certifications && profile.certifications.length > 0 && (
          <>
            <div className="h-12 lg:h-16" />
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <div className="font-['DM_Sans'] font-bold text-[10px] text-[#6A5040] tracking-[0.25em] uppercase">
                  CERTIFICATIONS
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {profile.certifications.slice(0, 4).map((cert: any, idx: number) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-[#C8A050]/5 border border-[#C8A050]/15 rounded-full"
                  >
                    <span className="font-['DM_Sans'] text-[12px] text-[#C9A96E]">
                      {cert.name || cert.title || cert}
                    </span>
                    {cert.date && (
                      <span className="font-['DM_Sans'] text-[10px] text-[#6A5040] ml-2">
                        {cert.date.split('-')[0]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}