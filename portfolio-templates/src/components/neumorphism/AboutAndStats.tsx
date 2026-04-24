import { useState, useEffect, useRef } from 'react';
import { Target, Eye, Lightbulb, Layers, LucideIcon } from 'lucide-react';

interface AboutProps {
  profile: any;
}

interface ValueItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  result: string;
  active: boolean;
}

interface StatItem {
  value: number;
  label: string;
  suffix: string;
}

export function About({ profile }: AboutProps) {
  const name = profile?.personalInfo?.name || "Your Name";
  const firstName = name.split(' ')[0];
  const summary = profile?.summary || profile?.personalInfo?.summary || "";
  const workExperience = profile?.workExperience || [];
  const education = profile?.education || [];
  const skills = profile?.skills || { technical: [], tools: [], soft: [] };
  
  const softSkills: string[] = skills.soft || [];
  
  // Full summary - no truncation
  const summaryParagraphs: string[] = summary 
    ? summary.split('. ')
        .filter((p: string) => p.trim().length > 0)
        .map((p: string) => p.trim().endsWith('.') ? p.trim() : p.trim() + '.')
    : [];

  const valueIcons: LucideIcon[] = [Target, Eye, Lightbulb, Layers];
  const values: ValueItem[] = softSkills.length > 0 
    ? softSkills.slice(0, 4).map((skill: string, index: number) => ({
        icon: valueIcons[index % valueIcons.length],
        title: skill,
        desc: index === 0 ? 'Core strength in my professional approach' :
              index === 1 ? 'Essential to how I work and collaborate' :
              index === 2 ? 'Drives my problem-solving methodology' :
              'Key aspect of my professional identity'
      }))
    : [];

  const timeline: TimelineItem[] = workExperience
    .filter((exp: any) => exp.role || exp.company)
    .slice(0, 4)
    .map((exp: any, index: number) => {
      const achievements = exp.achievements || [];
      const description = exp.description || '';
      const result = achievements[0] || description;
      
      return {
        year: exp.startDate?.split('-')[0] || exp.endDate?.split('-')[0] || new Date().getFullYear().toString(),
        role: exp.role || 'Professional',
        company: exp.company || '',
        result: result || '',
        active: index === 0,
      };
    });

  const displayTimeline: TimelineItem[] = timeline.length > 0 
    ? timeline 
    : education
        .filter((edu: any) => edu.degree || edu.institution)
        .slice(0, 4)
        .map((edu: any, index: number) => ({
          year: edu.endDate?.split('-')[0] || edu.startDate?.split('-')[0] || '',
          role: edu.degree || 'Student',
          company: edu.institution || '',
          result: edu.field ? `Studied ${edu.field}` : edu.grade || '',
          active: index === 0,
        }));

  const hasTimeline: boolean = displayTimeline.length > 0;
  const hasSummary: boolean = summaryParagraphs.length > 0;
  const hasValues: boolean = values.length > 0;
  const hasContent = hasSummary || hasValues || hasTimeline;

  if (!hasContent && !name) {
    return null;
  }

  return (
    <section id="about" className="bg-[#E8E3DC] py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {name && hasContent && (
          <h2
            className="font-serif mb-14 lg:mb-20"
            style={{ fontSize: 'clamp(36px, 5vw, 52px)', color: '#3D3830', fontWeight: 400 }}
          >
            About {firstName}
          </h2>
        )}

        {hasContent ? (
          <div className={`grid ${hasTimeline ? 'lg:grid-cols-[1.2fr_0.8fr]' : 'lg:grid-cols-1'} gap-12 lg:gap-16`}>
            <div className="space-y-10">
              {hasSummary && (
                <div className="space-y-5">
                  {summaryParagraphs.map((paragraph: string, idx: number) => (
                    <p key={idx} style={{ fontFamily: 'DM Sans', fontSize: '16px', color: '#7A7268', lineHeight: 1.85, wordBreak: 'break-word' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {hasSummary && hasValues && (
                <div className="w-20 h-0.5 rounded-full gradient-accent shadow-raised-sm" />
              )}

              {hasValues && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {values.map(({ icon: Icon, title, desc }: ValueItem) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#E8E3DC] shadow-raised-sm flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-[#E8B29B]" />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'DM Sans', fontSize: '15px', color: '#3D3830', fontWeight: 600, marginBottom: '4px' }}>
                          {title}
                        </div>
                        <div style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#7A7268', lineHeight: 1.5 }}>
                          {desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {hasTimeline && (
              <div className="p-8 lg:p-10 rounded-[32px] bg-[#E8E3DC] shadow-raised-lg h-fit">
                <div className="relative">
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-transparent via-[#D3A29D] to-transparent" />
                  <div className="space-y-9 relative pl-10">
                    {displayTimeline.map((item: TimelineItem, idx: number) => (
                      <div key={idx} className="relative">
                        <div
                          className={`absolute -left-[44px] top-1.5 w-4 h-4 rounded-full ${
                            item.active ? 'gradient-accent shadow-accent' : 'bg-[#E8E3DC] shadow-raised-sm border border-[#DEDAD3]'
                          }`}
                        />
                        <div className="space-y-1.5">
                          {item.year && (
                            <div className="font-mono" style={{ fontSize: '12px', color: '#D3A29D', fontWeight: 500 }}>
                              {item.year}
                            </div>
                          )}
                          {item.role && (
                            <div style={{ fontFamily: 'DM Sans', fontSize: '16px', color: '#3D3830', fontWeight: 600 }}>
                              {item.role}
                            </div>
                          )}
                          {item.company && (
                            <div style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#7A7268' }}>
                              {item.company}
                            </div>
                          )}
                          {item.result && (
                            <div style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#A09890', lineHeight: 1.5, wordBreak: 'break-word' }}>
                              {item.result.length > 100 ? item.result.slice(0, 100) + '...' : item.result}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
      
      <style>{`
        .gradient-accent {
          background: linear-gradient(135deg, #8B7355 0%, #D3A29D 100%);
        }
        .shadow-raised-sm {
          box-shadow: -3px -3px 6px rgba(255,252,247,0.6), 3px 3px 6px rgba(163,156,146,0.3);
        }
        .shadow-raised-lg {
          box-shadow: -8px -8px 16px rgba(255,252,247,0.9), 8px 8px 16px rgba(163,156,146,0.5);
        }
        .shadow-accent {
          box-shadow: 0 4px 12px rgba(139,115,85,0.3);
        }
      `}</style>
    </section>
  );
}

export function Statistics({ profile }: AboutProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const workExperience: any[] = profile?.workExperience || [];
  const projects: any[] = profile?.projects || [];
  const skills: any = profile?.skills || { technical: [], tools: [], soft: [] };
  const allSkills: string[] = [...(skills.technical || []), ...(skills.tools || []), ...(skills.soft || [])];
  
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

  const yearsExp: number = calculateYears();
  const projectCount: number = projects.length || workExperience.length || 0;
  const skillCount: number = allSkills.length || 0;
  
  const stats: StatItem[] = [];
  
  if (yearsExp > 0) stats.push({ value: yearsExp, label: yearsExp === 1 ? 'Year' : 'Years', suffix: '+' });
  if (projectCount > 0) stats.push({ value: projectCount, label: projectCount === 1 ? 'Project' : 'Projects', suffix: '' });
  if (skillCount > 0) stats.push({ value: skillCount, label: skillCount === 1 ? 'Skill' : 'Skills', suffix: '+' });

  const [counts, setCounts] = useState<number[]>(new Array(stats.length).fill(0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || stats.length === 0) return;
    const duration: number = 1400;
    const steps: number = 60;
    const interval: number = duration / steps;
    const timers: NodeJS.Timeout[] = stats.map((stat: StatItem, idx: number) => {
      return setInterval(() => {
        setCounts((prev: number[]) => {
          const newCounts: number[] = [...prev];
          const increment: number = stat.value / steps;
          if (newCounts[idx] >= stat.value) {
            clearInterval(timers[idx]);
            newCounts[idx] = stat.value;
          } else {
            newCounts[idx] = Math.min(newCounts[idx] + increment, stat.value);
          }
          return newCounts;
        });
      }, interval);
    });
    return () => timers.forEach((timer: NodeJS.Timeout) => clearInterval(timer));
  }, [isVisible, stats.length]);

  if (stats.length === 0) return null;

  return (
    <section ref={sectionRef} className="bg-[#E8E3DC] py-20 lg:py-28 px-6 lg:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="p-10 lg:p-14 rounded-[40px] bg-[#E8E3DC] shadow-inset-lg">
          <div 
            className="grid gap-8 lg:gap-10"
            style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)` }}
          >
            {stats.map((stat: StatItem, idx: number) => (
              <div key={idx} className="relative group">
                <div
                  className={`p-6 lg:p-8 rounded-2xl bg-[#E8E3DC] text-center transition-all duration-700 ${
                    counts[idx] >= stat.value ? 'shadow-inset' : 'shadow-raised'
                  }`}
                >
                  <div
                    className="font-mono mb-2"
                    style={{
                      fontSize: 'clamp(36px, 4vw, 52px)',
                      color: '#3D3830',
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    {Math.floor(counts[idx])}{stat.suffix}
                  </div>
                  <div
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '11px',
                      color: '#7A7268',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
                {idx < stats.length - 1 && (
                  <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-[#D3A29D] to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .shadow-raised {
          box-shadow: -6px -6px 12px rgba(255,252,247,0.8), 6px 6px 12px rgba(163,156,146,0.4);
        }
        .shadow-inset {
          box-shadow: inset -4px -4px 8px rgba(255,252,247,0.8), inset 4px 4px 8px rgba(163,156,146,0.3);
        }
        .shadow-inset-lg {
          box-shadow: inset -8px -8px 16px rgba(255,252,247,0.9), inset 8px 8px 16px rgba(163,156,146,0.4);
        }
      `}</style>
    </section>
  );
}