import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '@/types/userProfile';

interface HeroProps {
  profile: UserProfile;
}

export default function Hero({ profile }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Derive years of experience from earliest work experience start date
  const yearsOfExperience = (() => {
    if (!profile.workExperience.length) return null;
    const dates = profile.workExperience
      .map((w) => parseInt(w.startDate?.slice(0, 4)))
      .filter((y) => !isNaN(y));
    if (!dates.length) return null;
    return new Date().getFullYear() - Math.min(...dates);
  })();

  // Derive total projects from projects array length (fallback: count work entries)
  const totalProjects = profile.projects.length || profile.workExperience.length;

  // Derive skills as display tags (technical skills)
  const skillTags = profile.skills.technical.slice(0, 4);

  // Current role from most recent work experience
  const currentRole =
    profile.workExperience[0]?.role ||
    profile.personalInfo.title ||
    'Creative Professional';

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Generate initials from name
  const initials = profile.personalInfo.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] animate-float-1"
          style={{
            left: '20%',
            top: '50%',
            background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] animate-float-2"
          style={{
            right: '20%',
            top: '20%',
            background: 'radial-gradient(circle, rgba(142,154,171,0.05) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[90px] animate-float-3"
          style={{
            left: '60%',
            bottom: '20%',
            background: 'radial-gradient(circle, rgba(155,123,123,0.04) 0%, transparent 55%)',
          }}
        />
      </div>

      {/* Gold Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-dust-float"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: 'var(--gold-primary)',
              opacity: Math.random() * 0.15 + 0.15,
              animationDelay: Math.random() * 20 + 's',
              animationDuration: Math.random() * 15 + 15 + 's',
            }}
          />
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <div
                className="inline-flex items-center gap-2 px-3 py-2 border"
                style={{
                  borderColor: 'rgba(201, 169, 110, 0.25)',
                  background: 'rgba(201, 169, 110, 0.04)',
                  borderRadius: '2px',
                }}
              >
                <div
                  className="w-[5px] h-[5px] rounded-full relative"
                  style={{ background: '#6B9E6B' }}
                >
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      background: '#6B9E6B',
                      animationDuration: '2s',
                    }}
                  />
                </div>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Currently accepting projects
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p
                className="text-xs tracking-[0.20em] uppercase mb-4"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--gold-primary)',
                }}
              >
                {currentRole}
              </p>

              <h1 className="space-y-2">
                <div
                  className="text-5xl md:text-7xl lg:text-8xl"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 0.95,
                    color: 'var(--text-primary)',
                  }}
                >
                  {profile.personalInfo.name || 'Your Name'}
                </div>
                {/* Subtitle: use personalInfo.title or first skill domain as stylistic second line */}
                {(profile.personalInfo.title || profile.skills.domain[0]) && (
                  <div
                    className="text-5xl md:text-7xl lg:text-8xl"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      letterSpacing: '-0.02em',
                      lineHeight: 0.95,
                      color: 'transparent',
                      WebkitTextStroke: '1px rgba(201, 169, 110, 0.5)',
                    }}
                  >
                    {profile.personalInfo.title || profile.skills.domain[0]}
                  </div>
                )}
              </h1>
            </motion.div>

            {/* Skill tags */}
            {skillTags.length > 0 && (
              <motion.div variants={itemVariants}>
                <p
                  className="text-base"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {skillTags.map((skill, i) => (
                    <span key={skill}>
                      <span style={{ color: 'var(--gold-primary)' }}>{skill}</span>
                      {i < skillTags.length - 1 && ' · '}
                    </span>
                  ))}
                </p>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <p
                className="max-w-[440px] text-[15px] leading-[1.75]"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                }}
              >
                {profile.summary || 'Crafting exceptional experiences that connect, inspire, and deliver results.'}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
              <a
                href="#work"
                className="px-8 py-3.5 transition-all duration-300"
                style={{
                  background: 'var(--gold-primary)',
                  color: 'var(--bg-base)',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--gold-light)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(201, 169, 110, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--gold-primary)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                View Work
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 border transition-all duration-300"
                style={{
                  borderColor: 'rgba(201, 169, 110, 0.25)',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.50)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.25)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                Get in Touch
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2"
                    style={{
                      background: `linear-gradient(135deg, rgba(201,169,110,${0.3 + i * 0.1}) 0%, rgba(142,154,171,${0.2 + i * 0.1}) 100%)`,
                      borderColor: 'var(--bg-base)',
                    }}
                  />
                ))}
              </div>
              <span
                className="text-xs"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-tertiary)',
                }}
              >
                {profile.workExperience.length > 0
                  ? `${profile.workExperience.length}+ companies worked with`
                  : 'Available for opportunities'}
              </span>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{
              opacity: isVisible ? 1 : 0,
              clipPath: isVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            }}
            transition={{
              duration: 1.2,
              ease: [0.77, 0, 0.18, 1],
              delay: 0.3,
            }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Portrait / Initials Placeholder */}
              <div
                className="relative w-full h-[560px] rounded overflow-hidden border flex items-center justify-center"
                style={{
                  borderColor: 'rgba(201, 169, 110, 0.12)',
                  background: 'rgba(20, 20, 24, 0.6)',
                }}
              >
                {/* Decorative initials as portrait placeholder */}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '180px',
                    fontWeight: 300,
                    color: 'var(--gold-primary)',
                    opacity: 0.08,
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {initials}
                </div>

                {/* Corner Accents */}
                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map(
                  (pos, i) => (
                    <div
                      key={i}
                      className={`absolute ${pos} w-5 h-5`}
                      style={{
                        borderColor: 'rgba(201, 169, 110, 0.4)',
                        ...(pos.includes('top') &&
                          pos.includes('left') && {
                            borderTop: '1px solid',
                            borderLeft: '1px solid',
                          }),
                        ...(pos.includes('top') &&
                          pos.includes('right') && {
                            borderTop: '1px solid',
                            borderRight: '1px solid',
                          }),
                        ...(pos.includes('bottom') &&
                          pos.includes('left') && {
                            borderBottom: '1px solid',
                            borderLeft: '1px solid',
                          }),
                        ...(pos.includes('bottom') &&
                          pos.includes('right') && {
                            borderBottom: '1px solid',
                            borderRight: '1px solid',
                          }),
                      }}
                    />
                  )
                )}
              </div>

              {/* Floating Stats Cards */}
              {yearsOfExperience !== null && (
                <div
                  className="absolute -top-4 -left-4 px-4 py-3 border animate-float-gentle"
                  style={{
                    background: 'rgba(20, 20, 24, 0.90)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(201, 169, 110, 0.15)',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    className="text-3xl mb-1"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 300,
                      color: 'var(--gold-primary)',
                    }}
                  >
                    {String(yearsOfExperience).padStart(2, '0')}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Years of craft
                  </div>
                </div>
              )}

              {totalProjects > 0 && (
                <div
                  className="absolute -bottom-4 -right-4 px-4 py-3 border animate-float-gentle-delayed"
                  style={{
                    background: 'rgba(20, 20, 24, 0.90)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(201, 169, 110, 0.15)',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    className="text-3xl mb-1"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 300,
                      color: 'var(--gold-primary)',
                    }}
                  >
                    {totalProjects}+
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Projects delivered
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-[10px] tracking-[0.15em] uppercase"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-tertiary)',
          }}
        >
          Scroll
        </span>
        <div
          className="w-[1px] h-10 relative"
          style={{ background: 'rgba(201, 169, 110, 0.3)' }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full animate-scroll-indicator"
            style={{ background: 'var(--gold-primary)' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, -30px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 40px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }
        @keyframes dust-float {
          0% { transform: translateY(0) translateX(0); opacity: 0.15; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes float-gentle-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes scroll-indicator {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, 40px); opacity: 0; }
        }
        .animate-float-1 { animation: float-1 20s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 24s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 16s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
        .animate-float-gentle-delayed { animation: float-gentle-delayed 4s ease-in-out infinite 1.5s; }
        .animate-scroll-indicator { animation: scroll-indicator 1.8s ease-in-out infinite; }
        .animate-dust-float { animation: dust-float linear infinite; }
      `}</style>
    </section>
  );
}
