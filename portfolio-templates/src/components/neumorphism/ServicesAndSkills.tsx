import { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

interface ServicesAndSkillsProps {
  profile: any;
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
  
  const generateSkillBars = () => {
    const bars: any[] = [];
    
    if (allSkills.length > 0) {
      allSkills.slice(0, 6).forEach((skill: string, index: number) => {
        const percentage = Math.max(70, 98 - (index * 4));
        bars.push({
          name: skill,
          percentage: Math.min(98, percentage)
        });
      });
    }
    
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
    <section ref={sectionRef} id="skills" className="bg-[#E8E3DC] py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <h2
          className="font-serif mb-14 lg:mb-20"
          style={{ fontSize: 'clamp(36px, 5vw, 52px)', color: '#3D3830', fontWeight: 400 }}
        >
          Skills & Expertise
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Skill Progress Bars */}
          <div className="space-y-8">
            {skillBars.map((skill, idx) => (
              <div key={idx} className="space-y-3">
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
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-1 h-2 rounded-full gradient-primary shadow-raised-sm transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `calc(${skill.percentage}% - 8px)` : '0%',
                    }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full gradient-accent shadow-raised-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Tools Grid */}
          <div className="space-y-10">
            {tools.length > 0 && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {tools.slice(0, 9).map((tool: string) => {
                    const isSelected = selectedTools.includes(tool);
                    return (
                      <button
                        key={tool}
                        onClick={() => toggleTool(tool)}
                        className={`px-5 py-4 rounded-2xl transition-all ${
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

                {selectedTools.length > 0 && (
                  <div className="p-5 rounded-xl bg-[#E8E3DC] shadow-raised-sm">
                    <p style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#7A7268' }}>
                      <strong style={{ color: '#3D3830' }}>{selectedTools.length}</strong> tool{selectedTools.length !== 1 ? 's' : ''} selected: {selectedTools.join(', ')}
                    </p>
                  </div>
                )}
              </>
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
                style={{ fontSize: '22px', color: '#3D3830', fontWeight: 400, lineHeight: 1.4 }}
              >
                {getCurrentLearning()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .gradient-accent {
          background: linear-gradient(135deg, #8B7355 0%, #D3A29D 100%);
        }
        .gradient-primary {
          background: linear-gradient(135deg, #D3A29D 0%, #8B7355 100%);
        }
        .shadow-raised {
          box-shadow: -6px -6px 12px rgba(255,252,247,0.8), 6px 6px 12px rgba(163,156,146,0.4);
        }
        .shadow-raised-sm {
          box-shadow: -3px -3px 6px rgba(255,252,247,0.6), 3px 3px 6px rgba(163,156,146,0.3);
        }
        .shadow-raised-lg {
          box-shadow: -8px -8px 16px rgba(255,252,247,0.9), 8px 8px 16px rgba(163,156,146,0.5);
        }
        .shadow-inset {
          box-shadow: inset -4px -4px 8px rgba(255,252,247,0.8), inset 4px 4px 8px rgba(163,156,146,0.3);
        }
      `}</style>
    </section>
  );
}