interface SkillsSectionProps {
  profile: any;
}

export function SkillsSection({ profile }: SkillsSectionProps) {
  // Get real data from profile
  const personalInfo = profile?.personalInfo || {};
  const firstName = personalInfo.name?.split(' ')[0] || 'I\'ve';
  
  const skills = profile?.skills || { technical: [], tools: [], soft: [], domain: [] };
  
  // Combine all skills
  const allSkills = [
    ...(skills.technical || []).map((name: string) => ({ name, category: 'technical' })),
    ...(skills.tools || []).map((name: string) => ({ name, category: 'tool' })),
    ...(skills.soft || []).map((name: string) => ({ name, category: 'soft' })),
    ...(skills.domain || []).map((name: string) => ({ name, category: 'domain' }))
  ];
  
  // Process skills with proficiency levels
  const processSkills = () => {
    const processed: { name: string; proficiency: string; level: number }[] = [];
    
    allSkills.slice(0, 12).forEach((skill, index) => {
      // Generate proficiency based on skill position and category
      let baseLevel = 95 - (index * 3);
      
      // Adjust based on category
      if (skill.category === 'technical') baseLevel = Math.min(98, baseLevel + 2);
      if (skill.category === 'tool') baseLevel = Math.min(95, baseLevel);
      if (skill.category === 'soft') baseLevel = Math.min(96, baseLevel + 1);
      
      const level = Math.max(75, Math.min(98, baseLevel));
      
      let proficiency = 'Advanced';
      if (level >= 93) proficiency = 'Expert';
      else if (level >= 85) proficiency = 'Advanced';
      else if (level >= 75) proficiency = 'Proficient';
      
      processed.push({
        name: skill.name,
        proficiency,
        level
      });
    });
    
    return processed;
  };
  
  const processedSkills = processSkills();
  
  // Split into two columns
  const skillsLeft = processedSkills.slice(0, Math.ceil(processedSkills.length / 2));
  const skillsRight = processedSkills.slice(Math.ceil(processedSkills.length / 2));
  
  // Generate placeholder skills if none exist
  const getDisplaySkills = () => {
    if (processedSkills.length > 0) {
      return { left: skillsLeft, right: skillsRight };
    }
    
    // Create placeholder skills from work experience
    const workExperience = profile?.workExperience || [];
    const placeholderSkills: { name: string; proficiency: string; level: number }[] = [];
    
    // Extract skills from job titles and descriptions
    workExperience.slice(0, 3).forEach((exp: any) => {
      if (exp.role) {
        const roleWords = exp.role.split(' ');
        roleWords.forEach((word: string) => {
          if (word.length > 3 && !placeholderSkills.find(s => s.name === word)) {
            placeholderSkills.push({
              name: word,
              proficiency: 'Advanced',
              level: 88
            });
          }
        });
      }
    });
    
    // Default skills if still empty
    const defaultSkills = [
      { name: 'Strategic Planning', proficiency: 'Expert', level: 94 },
      { name: 'Process Optimization', proficiency: 'Expert', level: 92 },
      { name: 'Team Leadership', proficiency: 'Expert', level: 96 },
      { name: 'Project Management', proficiency: 'Advanced', level: 88 },
      { name: 'Data Analysis', proficiency: 'Advanced', level: 87 },
      { name: 'Communication', proficiency: 'Expert', level: 93 },
      { name: 'Problem Solving', proficiency: 'Expert', level: 95 },
      { name: 'Time Management', proficiency: 'Advanced', level: 89 }
    ];
    
    while (placeholderSkills.length < 8) {
      const defaultSkill = defaultSkills[placeholderSkills.length];
      if (!placeholderSkills.find(s => s.name === defaultSkill.name)) {
        placeholderSkills.push(defaultSkill);
      }
    }
    
    return {
      left: placeholderSkills.slice(0, 4),
      right: placeholderSkills.slice(4, 8)
    };
  };
  
  const displaySkills = getDisplaySkills();
  
  // If no skills at all, don't render
  if (displaySkills.left.length === 0 && displaySkills.right.length === 0) {
    return null;
  }

  const SkillRow = ({ skill }: { skill: { name: string; proficiency: string; level: number } }) => (
    <div className="py-10 lg:py-12 border-b border-black/[0.12] last:border-b-0">
      <div className="flex justify-between items-center mb-2.5">
        <span className="font-['Playfair_Display'] font-semibold text-[14px] lg:text-[16px] text-[#F5E6C8]">
          {skill.name}
        </span>
        <span className="font-['DM_Sans'] text-[11px] lg:text-[13px] text-[#F5E6C8]/60">
          {skill.proficiency}
        </span>
      </div>
      
      {/* Embossed gauge track */}
      <div className="relative h-2.5 bg-black/30 rounded-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
        <div 
          className="absolute left-0 top-0 h-full rounded-md bg-gradient-to-r from-[#F5E6C8] to-[#C9A96E] shadow-[0_0_8px_rgba(200,160,80,0.3)] transition-all duration-1000 ease-out"
          style={{ 
            width: `${skill.level}%`,
            borderTop: '1px solid rgba(255,255,255,0.3)'
          }}
        />
      </div>
    </div>
  );

  return (
    <section id="skills" className="relative min-h-[900px] bg-[#0E0A04] py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="font-['DM_Sans'] font-bold text-[10px] text-[#6A5040] tracking-[0.25em] uppercase">
            COMPETENCY INDEX
          </div>
          <div className="h-3" />
          <div className="font-['Playfair_Display'] font-bold text-[40px] lg:text-[64px] leading-tight">
            <span className="text-[#F5E6C8]">Skills </span>
            <span 
              className="bg-gradient-to-r from-[#C9A96E] to-[#F5A623] bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {firstName} mastered
            </span>
          </div>
        </div>

        <div className="h-8 lg:h-12" />

        {/* One large full-width card */}
        <div 
          className="relative rounded-[20px] border border-white/20 shadow-[0_20px_56px_rgba(0,0,0,0.6)]"
          style={{
            background: 'linear-gradient(135deg, #C4956A, #7A4E28)'
          }}
        >
          {/* Grid lines */}
          <div 
            className="absolute inset-0 rounded-[20px] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(0,0,0,0.04) 47px, rgba(0,0,0,0.04) 48px), repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(0,0,0,0.04) 47px, rgba(0,0,0,0.04) 48px)'
            }}
          />
          
          {/* Leather grain texture */}
          <div 
            className="absolute inset-0 rounded-[20px] opacity-[0.05]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 2px)'
            }}
          />

          {/* Stitched inset border */}
          <div className="absolute inset-5 rounded-[20px] border border-dashed border-white/10" />

          {/* Content */}
          <div className="relative p-8 lg:p-14">
            <div className={`grid ${displaySkills.right.length > 0 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-8 lg:gap-16`}>
              {/* Left Column */}
              <div>
                {displaySkills.left.map((skill) => (
                  <SkillRow key={skill.name} skill={skill} />
                ))}
              </div>

              {/* Right Column */}
              {displaySkills.right.length > 0 && (
                <div>
                  {displaySkills.right.map((skill) => (
                    <SkillRow key={skill.name} skill={skill} />
                  ))}
                </div>
              )}
            </div>
            
            {/* Skills summary footer */}
            <div className="mt-10 pt-6 border-t border-black/[0.12]">
              <div className="flex flex-wrap justify-center gap-3">
                {allSkills.length > 12 && (
                  <span className="font-['DM_Sans'] text-[12px] text-[#F5E6C8]/60">
                    +{allSkills.length - 12} more skills
                  </span>
                )}
                {allSkills.length === 0 && (
                  <span className="font-['DM_Sans'] text-[12px] text-[#F5E6C8]/60">
                    Core competencies based on professional experience
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tools and Technologies section if available */}
        {skills.tools && skills.tools.length > 0 && (
          <>
            <div className="h-8 lg:h-12" />
            <div className="max-w-3xl mx-auto">
              <div className="bg-black/20 border border-[#C8A050]/10 rounded-xl p-6">
                <div className="font-['DM_Sans'] font-bold text-[10px] text-[#6A5040] tracking-[0.2em] uppercase text-center mb-4">
                  TOOLS & TECHNOLOGIES
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {skills.tools.slice(0, 12).map((tool: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-[#C8A050]/10 border border-[#C8A050]/20 rounded-full font-['DM_Sans'] text-[12px] text-[#C9A96E]"
                    >
                      {tool}
                    </span>
                  ))}
                  {skills.tools.length > 12 && (
                    <span className="px-4 py-2 font-['DM_Sans'] text-[12px] text-[#8B6B4A]">
                      +{skills.tools.length - 12} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}