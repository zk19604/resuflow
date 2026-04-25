import { useEffect, useRef, useState } from 'react';
import { UserProfile } from '@/types/userProfile';

interface Skill {
  name: string;
  percentage: number;
  proficiency: string;
  years: string;
}

interface SkillsProps {
  profile?: UserProfile;
}

const fallbackLeft: Skill[] = [
  { name: 'Operations Strategy', percentage: 95, proficiency: 'Expert', years: '12 YRS' },
  { name: 'Process Engineering', percentage: 90, proficiency: 'Expert', years: '10 YRS' },
  { name: 'Supply Chain', percentage: 88, proficiency: 'Expert', years: '14 YRS' },
  { name: 'Cost Reduction', percentage: 92, proficiency: 'Expert', years: '11 YRS' },
  { name: 'Lean Management', percentage: 85, proficiency: 'Expert', years: '9 YRS' },
];

const fallbackRight: Skill[] = [
  { name: 'Team Leadership', percentage: 93, proficiency: 'Expert', years: '15 YRS' },
  { name: 'Risk Assessment', percentage: 87, proficiency: 'Expert', years: '10 YRS' },
  { name: 'Vendor Relations', percentage: 80, proficiency: 'Advanced', years: '8 YRS' },
  { name: 'P&L Oversight', percentage: 89, proficiency: 'Expert', years: '12 YRS' },
  { name: 'Change Management', percentage: 84, proficiency: 'Expert', years: '9 YRS' },
];

function buildSkills(names: string[], basePercentage: number): Skill[] {
  return names.map((name, idx) => ({
    name,
    percentage: Math.max(70, basePercentage - idx * 3),
    proficiency: basePercentage - idx * 3 >= 88 ? 'Expert' : 'Advanced',
    years: `${Math.max(1, 8 - idx)} YRS`,
  }));
}

export function Skills({ profile }: SkillsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const allTechnical = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
  ];
  const allSoft = [
    ...(profile?.skills?.soft || []),
    ...(profile?.skills?.domain || []),
  ];

  const leftSkills: Skill[] = allTechnical.length > 0
    ? buildSkills(allTechnical.slice(0, 5), 93)
    : fallbackLeft;

  const rightSkills: Skill[] = allSoft.length > 0
    ? buildSkills(allSoft.slice(0, 5), 90)
    : fallbackRight;

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting && !isVisible) setIsVisible(true); });
      },
      { threshold: 0.3 }
    );
    if (sectionElement) observer.observe(sectionElement);
    return () => { if (sectionElement) observer.unobserve(sectionElement); };
  }, [isVisible]);

  const SkillRow = ({ skill }: { skill: Skill }) => (
    <div
      style={{
        paddingTop: '22px',
        paddingBottom: '22px',
        borderBottom: '1px solid rgba(26,18,8,0.15)',
        display: 'grid',
        gridTemplateColumns: '260px 1fr 140px 80px',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', color: '#1A1208', letterSpacing: '0.08em' }}>
        {skill.name}
      </div>
      <div style={{ height: '10px', backgroundColor: 'rgba(26,18,8,0.1)', border: '2px solid rgba(26,18,8,0.2)', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            backgroundColor: '#C9340A',
            border: '2px solid #1A1208',
            width: isVisible ? `${skill.percentage}%` : '0%',
            transition: 'width 1.2s ease',
            position: 'absolute',
            top: '-2px',
            left: '-2px',
          }}
        />
      </div>
      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#8B6B4A', textAlign: 'right' }}>
        {skill.proficiency}
      </div>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '11px', color: '#F5EDD8', backgroundColor: '#1A1208', padding: '6px 10px', textAlign: 'center' }}>
        {skill.years}
      </div>
    </div>
  );

  const location = profile?.personalInfo?.location || 'LONDON, ENGLAND';
  const startYear = (() => {
    const dates = (profile?.workExperience || [])
      .map((w) => parseInt((w.startDate || '').slice(0, 4)))
      .filter((y) => !isNaN(y));
    return dates.length ? Math.min(...dates) : 2008;
  })();

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative"
      style={{
        minHeight: '900px',
        backgroundColor: '#F5EDD8',
        backgroundImage: 'radial-gradient(circle, rgba(80,40,0,0.06) 2px, transparent 2px)',
        backgroundSize: '10px 10px',
        paddingTop: '80px',
        paddingBottom: '80px',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div className="flex items-center justify-center gap-4" style={{ marginBottom: '12px' }}>
          <div style={{ width: '200px', height: '3px', backgroundColor: '#1A1208' }} />
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: '#1A1208', letterSpacing: '0.4em' }}>
            COMPETENCY CATALOGUE
          </div>
          <div style={{ width: '200px', height: '3px', backgroundColor: '#1A1208' }} />
        </div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#C9340A', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          ★ EST. {startYear} · {location.toUpperCase()} ★
        </div>
      </div>

      <div style={{ padding: '0 80px' }}>
        <div
          style={{
            border: '3px solid #1A1208',
            boxShadow: '6px 6px 0 rgba(26,18,8,0.2)',
            backgroundColor: '#FBF5E6',
            padding: '48px',
            position: 'relative',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2px 1fr', gap: '64px' }}>
            <div>
              {leftSkills.map((skill, index) => (
                <SkillRow key={index} skill={skill} />
              ))}
            </div>
            <div style={{ width: '2px', height: '100%', backgroundColor: '#1A1208' }} />
            <div>
              {rightSkills.map((skill, index) => (
                <SkillRow key={index} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
