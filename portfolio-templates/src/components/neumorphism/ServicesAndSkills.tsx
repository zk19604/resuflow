import { useState, useEffect, useRef } from 'react';
import { Palette, Layout, Layers, Search, Sparkles, MessageSquare, Check, Code, Briefcase, Users } from 'lucide-react';

interface ServicesAndSkillsProps {
  profile: any;
}

export function Services({ profile }: ServicesAndSkillsProps) {
  const skills = profile?.skills || { technical: [], tools: [], soft: [], domain: [] };
  const workExperience = profile?.workExperience || [];
  const projects = profile?.projects || [];
  
  // Generate services based on actual skills and experience
  const generateServices = () => {
    const services: any[] = [];
    const iconPool = [Palette, Layout, Layers, Search, Sparkles, MessageSquare, Code, Briefcase, Users];
    
    // Service 1: Primary role from work experience
    if (workExperience.length > 0 && workExperience[0]?.role) {
      services.push({
        number: '01',
        icon: iconPool[0],
        title: workExperience[0].role,
        description: workExperience[0].description || `Experienced in ${workExperience[0].role} with proven track record.`,
        tags: skills.technical?.slice(0, 3) || ['Design', 'Development', 'Strategy'],
      });
    }
    
    // Service 2: Based on domain skills
    if (skills.domain && skills.domain.length > 0) {
      services.push({
        number: '02',
        icon: iconPool[1],
        title: skills.domain[0],
        description: `Specialized expertise in ${skills.domain[0]} with focus on delivering quality results.`,
        tags: skills.tools?.slice(0, 3) || ['Research', 'Analysis', 'Implementation'],
      });
    }
    
    // Service 3: Based on technical skills
    if (skills.technical && skills.technical.length > 0) {
      services.push({
        number: '03',
        icon: iconPool[2],
        title: 'Technical Expertise',
        description: `Proficient in ${skills.technical.slice(0, 3).join(', ')} and related technologies.`,
        tags: skills.technical.slice(0, 3),
      });
    }
    
    // Service 4: Based on tools
    if (skills.tools && skills.tools.length > 0) {
      services.push({
        number: '04',
        icon: iconPool[3],
        title: 'Tools & Platforms',
        description: `Experienced with industry-standard tools including ${skills.tools.slice(0, 3).join(', ')}.`,
        tags: skills.tools.slice(0, 3),
      });
    }
    
    // Service 5: Based on soft skills
    if (skills.soft && skills.soft.length > 0) {
      services.push({
        number: '05',
        icon: iconPool[4],
        title: skills.soft[0],
        description: `${skills.soft[0]} approach to work with focus on collaboration and results.`,
        tags: skills.soft.slice(0, 3),
      });
    }
    
    // Service 6: Project experience
    if (projects.length > 0) {
      services.push({
        number: '06',
        icon: iconPool[5],
        title: 'Project Delivery',
        description: `Successfully delivered ${projects.length}+ projects from concept to completion.`,
        tags: ['Planning', 'Execution', 'Delivery'],
      });
    }
    
    return services.slice(0, 6);
  };

  const services = generateServices();

  // Don't render if no services could be generated
  if (services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="bg-[#E8E3DC] py-28 lg:py-40 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <h2
          className="font-serif mb-16"
          style={{ fontSize: 'clamp(40px, 6vw, 56px)', color: '#3D3830', fontWeight: 400 }}
        >
          What I Do
        </h2>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-${Math.min(services.length, 3)} gap-6 lg:gap-8`}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.number}
                className="group p-8 lg:p-9 rounded-[28px] bg-[#E8E3DC] shadow-raised transition-shadow hover:shadow-raised-lg cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  {/* Icon Pad */}
                  <div className="w-[72px] h-[72px] rounded-2xl bg-[#E8E3DC] shadow-raised-sm flex items-center justify-center transition-all group-hover:shadow-inset">
                    <Icon size={32} color="#8B7355" strokeWidth={1.5} />
                  </div>

                  {/* Number */}
                  <div
                    className="font-mono"
                    style={{ fontSize: '11px', color: '#A09890', letterSpacing: '0.1em' }}
                  >
                    {service.number}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '20px',
                      color: '#3D3830',
                      fontWeight: 700,
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '14px',
                      color: '#7A7268',
                      lineHeight: 1.7,
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Tags */}
                  {service.tags && service.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {service.tags.map((tag: string) => (
                        <div
                          key={tag}
                          className="px-3 py-1.5 rounded-xl bg-[#E8E3DC] shadow-raised-sm"
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '10px',
                            color: '#7A7268',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                          }}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Skills({ profile }: ServicesAndSkillsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillsData = profile?.skills || { technical: [], tools: [], soft: [], domain: [] };
  const allSkills = [
    ...(skillsData.technical || []),
    ...(skillsData.domain || []),
    ...(skillsData.soft || [])
  ];
  
  const tools = skillsData.tools || [];
  
  // Generate skill percentages based on available skills
  const generateSkillBars = () => {
    const bars: any[] = [];
    
    if (allSkills.length > 0) {
      allSkills.slice(0, 6).forEach((skill: string, index: number) => {
        // Generate realistic percentages based on skill position
        const percentage = Math.max(70, 98 - (index * 4));
        bars.push({
          name: skill,
          percentage: Math.min(98, percentage)
        });
      });
    }
    
    // Fallback if no skills
    if (bars.length === 0) {
      bars.push(
        { name: 'Professional Experience', percentage: 90 },
        { name: 'Technical Skills', percentage: 85 },
        { name: 'Communication', percentage: 88 }
      );
    }
    
    return bars;
  };

  const skillBars = generateSkillBars();
  
  // Get current learning focus based on tools or recent projects
  const getCurrentLearning = () => {
    const projects = profile?.projects || [];
    const recentProject = projects[0];
    
    if (recentProject?.tools && recentProject.tools.length > 0) {
      return `Mastering ${recentProject.tools.slice(0, 2).join(' & ')}`;
    }
    
    if (tools.length > 0) {
      return `Advanced ${tools[tools.length - 1]} Techniques`;
    }
    
    const education = profile?.education || [];
    if (education.length > 0 && education[0]?.field) {
      return education[0].field;
    }
    
    return 'Continuous Professional Development';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  return (
    <section ref={sectionRef} id="skills" className="bg-[#E8E3DC] py-28 lg:py-40 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <h2
          className="font-serif mb-16"
          style={{ fontSize: 'clamp(40px, 6vw, 56px)', color: '#3D3830', fontWeight: 400 }}
        >
          Skills & Expertise
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Skill Progress Bars */}
          <div className="space-y-8">
            {skillBars.map((skill, idx) => (
              <div key={idx} className="space-y-2">
                {/* Skill Header */}
                <div className="flex items-center justify-between">
                  <div
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '15px',
                      color: '#3D3830',
                      fontWeight: 600,
                    }}
                  >
                    {skill.name}
                  </div>
                  <div
                    className="font-mono"
                    style={{ fontSize: '13px', color: '#D3A29D' }}
                  >
                    {skill.percentage}%
                  </div>
                </div>

                {/* Skill Bar */}
                <div className="relative h-3 rounded-full bg-[#E8E3DC] shadow-inset overflow-hidden">
                  {/* Fill */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-1 h-2 rounded-full gradient-primary shadow-raised-sm transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `calc(${skill.percentage}% - 8px)` : '0%',
                    }}
                  >
                    {/* Bead at the end */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full gradient-accent shadow-raised-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Tools Grid */}
          <div className="space-y-8">
            {tools.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tools.slice(0, 9).map((tool: string) => {
                  const isSelected = selectedTools.includes(tool);
                  return (
                    <button
                      key={tool}
                      onClick={() => toggleTool(tool)}
                      className={`px-5 py-3.5 rounded-2xl transition-all ${
                        isSelected ? 'shadow-inset' : 'shadow-raised hover:shadow-raised-lg'
                      } active:shadow-inset`}
                      style={{ backgroundColor: '#E8E3DC' }}
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <span
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '13px',
                            color: isSelected ? '#8B7355' : '#3D3830',
                            fontWeight: 600,
                          }}
                        >
                          {tool}
                        </span>
                        {isSelected && <Check size={14} color="#8B7355" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Currently Learning Card */}
            <div className="p-8 rounded-2xl bg-[#E8E3DC] shadow-raised-lg">
              <div
                className="mb-3"
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '12px',
                  color: '#A09890',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                Currently Learning
              </div>
              <div
                className="font-serif italic"
                style={{ fontSize: '24px', color: '#3D3830', fontWeight: 400 }}
              >
                {getCurrentLearning()}
              </div>
            </div>
            
            {/* Selected Tools Summary */}
            {selectedTools.length > 0 && (
              <div className="p-4 rounded-xl bg-[#E8E3DC] shadow-raised-sm">
                <p style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#7A7268' }}>
                  <strong>{selectedTools.length}</strong> tool{selectedTools.length !== 1 ? 's' : ''} selected: {selectedTools.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}