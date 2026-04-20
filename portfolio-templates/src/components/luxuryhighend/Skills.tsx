import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { UserProfile } from '@/types/userProfile';

interface SkillsProps {
  profile: UserProfile;
}

// Glow colours cycled for tool cards
const GLOW_COLORS = [
  'rgba(153, 102, 255, 0.15)',
  'rgba(147, 197, 253, 0.15)',
  'rgba(110, 168, 254, 0.15)',
  'rgba(139, 146, 164, 0.15)',
  'rgba(196, 144, 90, 0.15)',
  'rgba(167, 139, 250, 0.15)',
];

export default function Skills({ profile }: SkillsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Build skill bars: use technical skills as primary, max 6
  // We don't have percentages in the profile so we omit the bar UI for non-technical
  // and show all technical skills as tag-style items with no fake percentages.
  const technicalSkills = profile.skills.technical.slice(0, 8);
  const domainSkills = profile.skills.domain.slice(0, 4);

  // Combine for the left column
  const allSkillGroups = [
    { label: 'Technical', items: technicalSkills },
    { label: 'Domain', items: domainSkills },
    { label: 'Soft Skills', items: profile.skills.soft.slice(0, 4) },
    { label: 'Languages', items: profile.skills.languages.slice(0, 4) },
  ].filter((g) => g.items.length > 0);

  // Primary tool cards (first 6 tools)
  const primaryTools = profile.skills.tools.slice(0, 6).map((tool, i) => ({
    name: tool,
    desc: domainSkills[i] || technicalSkills[i] || '',
    glow: GLOW_COLORS[i % GLOW_COLORS.length],
  }));

  // Secondary tools — remaining tools + domain skills not shown yet
  const secondaryTools = profile.skills.tools.slice(6);

  const hasAnySkills =
    technicalSkills.length > 0 ||
    profile.skills.tools.length > 0 ||
    profile.skills.soft.length > 0;

  if (!hasAnySkills) return null;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 md:py-40"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Section Number */}
      <div
        className="absolute top-20 right-12 text-[200px] pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 300,
          color: 'var(--gold-primary)',
          opacity: 0.04,
        }}
      >
        04
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Skill Groups */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px]" style={{ background: 'var(--gold-primary)' }} />
              <span
                className="text-xs tracking-[0.18em] uppercase"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--gold-primary)' }}
              >
                Expertise
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl mb-12"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: 'var(--text-primary)' }}
            >
              Craft & Expertise
            </h2>

            <div ref={skillsRef} className="space-y-8">
              {allSkillGroups.map((group, gi) => (
                <motion.div
                  key={gi}
                  initial={{ opacity: 0, y: 12 }}
                  animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: gi * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Group label */}
                  <p
                    className="text-[10px] tracking-[0.14em] uppercase mb-3"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--gold-primary)' }}
                  >
                    {group.label}
                  </p>

                  {/* Skill pills */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, si) => (
                      <motion.span
                        key={si}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={skillsInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: gi * 0.1 + si * 0.05,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="px-3 py-1.5 border text-xs"
                        style={{
                          borderColor: 'rgba(201, 169, 110, 0.15)',
                          borderRadius: '2px',
                          fontFamily: 'var(--font-body)',
                          color: 'var(--text-secondary)',
                          background: 'rgba(201, 169, 110, 0.03)',
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Thin separator */}
                  {gi < allSkillGroups.length - 1 && (
                    <div
                      className="mt-6 h-[1px]"
                      style={{ background: 'rgba(201, 169, 110, 0.08)' }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Tools */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px]" style={{ background: 'var(--gold-primary)' }} />
              <span
                className="text-xs tracking-[0.18em] uppercase"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--gold-primary)' }}
              >
                Tools
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl mb-12"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: 'var(--text-primary)' }}
            >
              My Toolkit
            </h2>

            {primaryTools.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {primaryTools.map((tool, index) => (
                  <ToolCard key={index} tool={tool} index={index} isVisible={isVisible} />
                ))}
              </div>
            ) : (
              <p
                className="text-sm mb-8"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-tertiary)' }}
              >
                No tools listed in this profile.
              </p>
            )}

            {/* Secondary Tools */}
            {secondaryTools.length > 0 && (
              <div className="text-center pt-4">
                <p
                  className="text-xs tracking-[0.06em]"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--text-tertiary)' }}
                >
                  {secondaryTools.map((tool, index) => (
                    <span
                      key={index}
                      className="inline-block mx-2 transition-colors duration-300 hover:text-[var(--text-secondary)]"
                    >
                      {tool}
                      {index < secondaryTools.length - 1 && ' ·'}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ToolCard({
  tool,
  index,
  isVisible,
}: {
  tool: { name: string; desc: string; glow: string };
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="p-5 border transition-all duration-500"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'rgba(201, 169, 110, 0.10)',
        borderRadius: '4px',
        boxShadow: isHovered ? `0 0 24px ${tool.glow}` : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-8 h-8 mb-3 border flex items-center justify-center"
        style={{
          background: 'rgba(201, 169, 110, 0.06)',
          borderColor: 'rgba(201, 169, 110, 0.15)',
          borderRadius: '8px',
        }}
      >
        <div className="w-3 h-3 rounded" style={{ background: 'var(--gold-primary)', opacity: 0.5 }} />
      </div>
      <h3
        className="text-sm mb-1"
        style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-primary)' }}
      >
        {tool.name}
      </h3>
      {tool.desc && (
        <p className="text-xs" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
          {tool.desc}
        </p>
      )}
    </motion.div>
  );
}
