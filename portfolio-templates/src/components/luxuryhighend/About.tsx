import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '@/types/userProfile';

interface AboutProps {
  profile: UserProfile;
}

export default function About({ profile }: AboutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Build timeline from work experience (most recent first, max 4)
  const timeline = profile.workExperience.slice(0, 4).map((exp) => ({
    year: exp.startDate?.slice(0, 4) || '',
    role: exp.role || '',
    company: exp.company || '',
    achievement: Array.isArray(exp.achievements) && exp.achievements.length > 0
      ? exp.achievements[0]
      : exp.description?.split('.')[0] || '',
  }));

  // Build values cards from skill categories that have data
  const valueEntries: { title: string; desc: string }[] = [];
  if (profile.skills.technical.length > 0)
    valueEntries.push({ title: 'Technical depth', desc: profile.skills.technical.slice(0, 3).join(', ') });
  if (profile.skills.tools.length > 0)
    valueEntries.push({ title: 'Tools & craft', desc: profile.skills.tools.slice(0, 3).join(', ') });
  if (profile.skills.soft.length > 0)
    valueEntries.push({ title: 'Soft skills', desc: profile.skills.soft.slice(0, 3).join(', ') });
  if (profile.skills.domain.length > 0)
    valueEntries.push({ title: 'Domain expertise', desc: profile.skills.domain.slice(0, 3).join(', ') });

  // Fall back to 2 placeholder values if no skills provided
  const values =
    valueEntries.length >= 2
      ? valueEntries.slice(0, 4)
      : [
          { title: 'Results-driven', desc: 'Impact measured, not just aesthetics' },
          { title: 'Collaborative', desc: 'Working closely with stakeholders' },
        ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-40"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Section Number Background */}
      <div
        className="absolute top-20 left-12 text-[200px] pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 300,
          color: 'var(--gold-primary)',
          opacity: 0.04,
        }}
      >
        01
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-32">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-[1px]"
                style={{ background: 'var(--gold-primary)' }}
              />
              <span
                className="text-xs tracking-[0.18em] uppercase"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--gold-primary)',
                }}
              >
                About
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl max-w-[380px]"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                color: 'var(--text-primary)',
              }}
            >
              The Mind Behind the Work
            </h2>

            <div className="space-y-6">
              <p
                className="text-base leading-[1.80]"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                }}
              >
                {profile.summary ||
                  'A professional dedicated to delivering exceptional results through expertise, creativity, and strategic thinking.'}
              </p>

              {/* Location & contact snippet */}
              {(profile.personalInfo.location || profile.personalInfo.email) && (
                <p
                  className="text-sm"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  {[profile.personalInfo.location, profile.personalInfo.email]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}
            </div>

            <div
              className="w-15 h-[1px] my-8"
              style={{
                background: 'var(--gold-primary)',
                opacity: 0.4,
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="pl-4 border-l-2"
                  style={{ borderColor: 'rgba(201, 169, 110, 0.3)' }}
                >
                  <h3
                    className="text-sm mb-1"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Vertical Line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[1px]"
              style={{
                background: 'var(--gold-primary)',
                opacity: 0.15,
              }}
            />

            <div className="space-y-12 pl-12">
              {timeline.length > 0 ? (
                timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.4 + index * 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="relative"
                  >
                    {/* Node */}
                    <div
                      className="absolute -left-12 top-0 w-2 h-2 rounded-full"
                      style={{
                        background: 'var(--gold-primary)',
                        boxShadow: '0 0 0 4px rgba(201, 169, 110, 0.12)',
                        marginLeft: '-4px',
                      }}
                    />

                    <div className="space-y-1">
                      <p
                        className="text-xs"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--gold-primary)',
                        }}
                      >
                        {item.year}
                      </p>
                      <h3
                        className="text-lg"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {item.role}
                      </h3>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {item.company}
                      </p>
                      {item.achievement && (
                        <p
                          className="text-xs pt-1"
                          style={{
                            fontFamily: 'var(--font-body)',
                            color: 'var(--text-tertiary)',
                          }}
                        >
                          {item.achievement}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p
                  className="text-sm"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  No work experience provided.
                </p>
              )}

              {/* End Diamond */}
              <div
                className="absolute -left-[15px] w-2 h-2 rotate-45"
                style={{
                  background: 'var(--gold-primary)',
                  opacity: 0.4,
                  bottom: 0,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
