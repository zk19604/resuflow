import { useState, Fragment } from 'react';

interface AboutSectionProps {
  profile: any;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState('story');

  // Get real data from profile
  const personalInfo = profile?.personalInfo || {};
  const name = personalInfo.name || 'Your Name';
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  
  const workExperience = profile?.workExperience || [];
  const currentRole = workExperience[0] || {};
  const role = currentRole.role || 'Professional';
  const company = currentRole.company || '';
  
  // FIXED: Get full summary - don't split, show as one complete paragraph
  const summary = profile?.summary || personalInfo.summary || '';
  const fullSummary = summary && summary.trim().length > 0 
    ? (summary.endsWith('.') ? summary : summary + '.')
    : "With over 12 years of experience in operations management, I've dedicated my career to transforming complex business challenges into streamlined, efficient systems. My approach combines strategic thinking with hands-on execution. From scaling startups to optimizing Fortune 500 operations, I've learned that great systems aren't just about efficiency—they're about creating sustainable frameworks that empower teams and drive measurable impact.";
  
  const skills = profile?.skills || { technical: [], tools: [], soft: [] };
  const allSkills = [...(skills.technical || []), ...(skills.tools || []), ...(skills.soft || [])];
  const softSkills = skills.soft || [];
  
  const projects = profile?.projects || [];
  const education = profile?.education || [];
  const achievements = profile?.achievements || [];
  const certifications = profile?.certifications || [];
  
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
  const clientCount = profile?.stats?.clients || profile?.clients || Math.floor(projectCount * 2.5) || 0;
  
  // Generate stats from real data
  const stats = [
    { label: 'PROJECTS COMPLETED', value: projectCount > 0 ? `${projectCount}+` : '16+' },
    { label: 'HAPPY CLIENTS', value: clientCount > 0 ? `${clientCount}+` : '40+' },
    { label: 'YEARS EXPERIENCE', value: yearsExp > 0 ? `${yearsExp}+` : '12+' }
  ];
  
  // Generate key facts from skills and achievements
  const generateKeyFacts = () => {
    const facts: { icon: string; label: string }[] = [];
    
    if (softSkills.length > 0) {
      softSkills.slice(0, 3).forEach((skill: string) => {
        const icon = getIconForSkill(skill);
        facts.push({ icon, label: skill });
      });
    }
    
    const technicalSkills = skills.technical || [];
    if (technicalSkills.length > 0) {
      technicalSkills.slice(0, 2).forEach((skill: string) => {
        const icon = getIconForSkill(skill);
        if (!facts.some(f => f.label === skill)) {
          facts.push({ icon, label: skill });
        }
      });
    }
    
    const tools = skills.tools || [];
    if (tools.length > 0 && facts.length < 6) {
      facts.push({ icon: '🛠️', label: tools[0] });
    }
    
    const defaultFacts = [
      { icon: '📋', label: 'Operations Expert' },
      { icon: '🌍', label: 'Global Experience' },
      { icon: '📚', label: 'Continuous Learner' },
      { icon: '☕', label: 'Systems Thinker' },
      { icon: '✈️', label: 'Frequent Traveller' },
      { icon: '🎯', label: 'Results Driven' }
    ];
    
    while (facts.length < 6) {
      const defaultFact = defaultFacts[facts.length];
      if (!facts.some(f => f.label === defaultFact.label)) {
        facts.push(defaultFact);
      }
    }
    
    return facts.slice(0, 6);
  };
  
  const getIconForSkill = (skill: string): string => {
    const skillLower = skill.toLowerCase();
    if (skillLower.includes('leader') || skillLower.includes('manage')) return '👔';
    if (skillLower.includes('communicat')) return '💬';
    if (skillLower.includes('problem')) return '🔧';
    if (skillLower.includes('team')) return '👥';
    if (skillLower.includes('creative') || skillLower.includes('design')) return '🎨';
    if (skillLower.includes('code') || skillLower.includes('develop')) return '💻';
    if (skillLower.includes('data') || skillLower.includes('analyt')) return '📊';
    return '⭐';
  };
  
  const keyFacts = generateKeyFacts();
  
  const generateFactsList = () => {
    const facts: string[] = [];
    
    if (yearsExp > 0) {
      facts.push(`Over ${yearsExp} years of professional experience`);
    }
    
    if (workExperience.length > 0) {
      const companies = workExperience.map((exp: any) => exp.company).filter(Boolean);
      if (companies.length > 0) {
        facts.push(`Worked with ${companies.slice(0, 3).join(', ')}${companies.length > 3 ? ' and others' : ''}`);
      }
    }
    
    if (education.length > 0) {
      const degrees = education.map((edu: any) => edu.degree).filter(Boolean);
      if (degrees.length > 0) {
        facts.push(`${degrees[0]}${degrees.length > 1 ? ` and ${degrees.length - 1} more` : ''}`);
      }
    }
    
    if (allSkills.length > 0) {
      facts.push(`Expert in ${allSkills.slice(0, 4).join(', ')}${allSkills.length > 4 ? ' and more' : ''}`);
    }
    
    if (certifications.length > 0) {
      facts.push(`${certifications.length} professional certification${certifications.length !== 1 ? 's' : ''}`);
    }
    
    if (achievements.length > 0) {
      facts.push(`${achievements.length} key achievement${achievements.length !== 1 ? 's' : ''}`);
    }
    
    const defaultFacts = [
      'Managed operations across multiple teams',
      'Led cross-functional initiatives',
      'Delivered measurable business impact',
      'Expert in process optimization',
      'Strong analytical and problem-solving skills',
      'Excellent communication and leadership'
    ];
    
    while (facts.length < 6) {
      const defaultFact = defaultFacts[facts.length];
      if (!facts.includes(defaultFact)) {
        facts.push(defaultFact);
      }
    }
    
    return facts.slice(0, 6);
  };
  
  const factsList = generateFactsList();

  return (
    <section id="about" className="relative min-h-[900px] bg-[#0E0A04] py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div 
          className="relative rounded-[20px] bg-[#1C1408] border border-[#C8A050]/10 shadow-[0_16px_48px_rgba(0,0,0,0.6)] p-8 lg:p-14"
        >
          <div 
            className="absolute inset-0 rounded-[20px] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(255,255,255,0.025) 47px, rgba(255,255,255,0.025) 48px), repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(255,255,255,0.025) 47px, rgba(255,255,255,0.025) 48px)'
            }}
          />
          
          <div 
            className="absolute inset-0 rounded-[20px] opacity-[0.02]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.5) 1px, rgba(255,255,255,0.5) 2px)'
            }}
          />

          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="lg:w-[38%]">
              <div className="bg-black/30 border border-[#C8A050]/12 rounded-2xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)] p-6 lg:p-8">
                <div className="flex justify-center">
                  <div 
                    className="w-[88px] h-[88px] rounded-full bg-gradient-to-b from-[#C9A96E] to-[#8B6914] border-2 border-white/20 shadow-[0_6px_16px_rgba(0,0,0,0.5)] flex items-center justify-center"
                  >
                    <span className="font-['Playfair_Display'] font-bold text-[28px] text-[#1A1004]">
                      {initials}
                    </span>
                  </div>
                </div>

                <div className="h-5" />

                <div className="text-center">
                  <div className="font-['Playfair_Display'] font-bold text-[20px] lg:text-[22px] text-[#F5E6C8]">
                    {name}
                  </div>
                  <div className="font-['DM_Sans'] text-[13px] lg:text-[14px] text-[#8B6B4A] mt-1">
                    {role}
                  </div>
                  {company && (
                    <div className="font-['DM_Sans'] text-[12px] text-[#6A5040] mt-0.5">
                      {company}
                    </div>
                  )}
                </div>

                <div className="h-6" />
                <div className="h-px bg-[#C8A050]/15" />
                <div className="h-6" />

                <div className="space-y-0">
                  {stats.map((stat) => (
                    <div 
                      key={stat.label}
                      className="flex justify-between items-center py-6 lg:py-8 border-b border-[#C8A050]/10 last:border-b-0"
                    >
                      <span className="font-['DM_Sans'] text-[9px] lg:text-[10px] text-[#6A5040] tracking-[0.15em] uppercase">
                        {stat.label}
                      </span>
                      <span className="font-['Playfair_Display'] font-bold text-[28px] lg:text-[36px] text-[#C9A96E] leading-none">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-[62%]">
              <div className="bg-black/30 rounded-3xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] p-1.5 flex gap-2">
                {[
                  { id: 'story', label: 'My Story' },
                  { id: 'approach', label: 'My Approach' },
                  { id: 'facts', label: 'Key Facts' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 lg:px-6 py-2.5 lg:py-3 rounded-[20px] font-['DM_Sans'] text-[11px] lg:text-[13px] transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-b from-[#C9A96E] to-[#8B6914] font-bold text-[#1A1004] shadow-[0_2px_6px_rgba(0,0,0,0.3)]'
                        : 'text-[#8B6B4A]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="h-6 lg:h-8" />

              {activeTab === 'story' && (
                <div>
                  <div className="font-['DM_Sans'] font-bold text-[9px] lg:text-[10px] text-[#8B6B4A] tracking-[0.2em] uppercase">
                    ABOUT ME
                  </div>
                  <div className="h-3 lg:h-4" />
                  <p className="font-['DM_Sans'] text-[14px] lg:text-[16px] text-[#C8B090] leading-[1.8] lg:leading-[1.9]">
                    {fullSummary}
                  </p>
                  
                  <div className="h-7 lg:h-9" />
                  
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
                    {keyFacts.map((fact) => (
                      <div
                        key={fact.label}
                        className="bg-black/25 border border-[#C8A050]/10 rounded-xl shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] p-3 lg:p-5 flex flex-col items-center text-center"
                      >
                        <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#C8A050]/15 flex items-center justify-center text-xs lg:text-sm mb-1.5 lg:mb-2">
                          {fact.icon}
                        </div>
                        <span className="font-['DM_Sans'] text-[10px] lg:text-[12px] text-[#A09070]">
                          {fact.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'approach' && (
                <div>
                  <div className="font-['DM_Sans'] font-bold text-[9px] lg:text-[10px] text-[#8B6B4A] tracking-[0.2em] uppercase">
                    MY APPROACH
                  </div>
                  <div className="h-3 lg:h-4" />
                  <p className="font-['DM_Sans'] text-[14px] lg:text-[16px] text-[#C8B090] leading-[1.8] lg:leading-[1.9]">
                    I believe in building systems that are both resilient and adaptable. Every project I touch is analyzed through the lens of scalability, efficiency, and human impact.
                  </p>
                  <div className="h-4 lg:h-5" />
                  <p className="font-['DM_Sans'] text-[14px] lg:text-[16px] text-[#9A8060] leading-[1.8] lg:leading-[1.9]">
                    My methodology combines data-driven decision making with empathetic leadership, ensuring that improvements benefit both the bottom line and the people who make it all happen.
                  </p>
                  
                  {softSkills.length > 0 && (
                    <>
                      <div className="h-6 lg:h-8" />
                      <div className="font-['DM_Sans'] font-bold text-[9px] lg:text-[10px] text-[#8B6B4A] tracking-[0.2em] uppercase">
                        CORE PRINCIPLES
                      </div>
                      <div className="h-3 lg:h-4" />
                      <div className="flex flex-wrap gap-2">
                        {softSkills.slice(0, 4).map((skill: string) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-[#C8A050]/10 border border-[#C8A050]/20 rounded-full font-['DM_Sans'] text-[12px] text-[#C9A96E]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'facts' && (
                <div>
                  <div className="font-['DM_Sans'] font-bold text-[9px] lg:text-[10px] text-[#8B6B4A] tracking-[0.2em] uppercase">
                    KEY FACTS
                  </div>
                  <div className="h-3 lg:h-4" />
                  <div className="space-y-3 lg:space-y-4">
                    {factsList.map((fact, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] mt-2 lg:mt-2.5 flex-shrink-0" />
                        <span className="font-['DM_Sans'] text-[14px] lg:text-[16px] text-[#C8B090] leading-[1.8] lg:leading-[1.9]">
                          {fact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}