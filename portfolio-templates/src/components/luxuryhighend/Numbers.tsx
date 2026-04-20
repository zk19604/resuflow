import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { UserProfile } from '@/types/userProfile';

interface NumbersProps {
  profile: UserProfile;
}

export default function Numbers({ profile }: NumbersProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Derive meaningful stats from real profile data
  const yearsOfExperience = (() => {
    const dates = profile.workExperience
      .map((w) => parseInt(w.startDate?.slice(0, 4)))
      .filter((y) => !isNaN(y));
    if (!dates.length) return null;
    return new Date().getFullYear() - Math.min(...dates);
  })();

  const totalSkills =
    profile.skills.technical.length +
    profile.skills.tools.length +
    profile.skills.soft.length +
    profile.skills.domain.length;

  const stats = [
    profile.projects.length > 0 && {
      label: 'Projects Delivered',
      number: profile.projects.length,
      suffix: '+',
      eyebrow: 'Portfolio',
    },
    yearsOfExperience !== null && {
      label: 'Years Experience',
      number: yearsOfExperience,
      suffix: '+',
      eyebrow: 'Career',
    },
    profile.workExperience.length > 0 && {
      label: 'Companies Worked',
      number: profile.workExperience.length,
      suffix: '',
      eyebrow: 'Clients',
    },
    totalSkills > 0 && {
      label: 'Skills & Tools',
      number: totalSkills,
      suffix: '+',
      eyebrow: 'Expertise',
    },
    profile.certifications.length > 0 && {
      label: 'Certifications',
      number: profile.certifications.length,
      suffix: '',
      eyebrow: 'Credentials',
    },
    profile.education.length > 0 && {
      label: 'Degrees & Education',
      number: profile.education.length,
      suffix: '',
      eyebrow: 'Education',
    },
  ]
    .filter(Boolean)
    .slice(0, 4) as { label: string; number: number; suffix: string; eyebrow: string }[];

  if (stats.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-28"
      style={{ background: 'var(--bg-alt)' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div
          className={`grid gap-8 md:gap-12 ${
            stats.length === 4
              ? 'grid-cols-2 lg:grid-cols-4'
              : stats.length === 3
              ? 'grid-cols-3'
              : 'grid-cols-2'
          }`}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-center group"
            >
              <p
                className="text-[10px] tracking-[0.18em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-tertiary)' }}
              >
                {stat.eyebrow}
              </p>

              <div className="flex items-baseline justify-center mb-2">
                <CountUpNumber end={stat.number} isInView={isInView} delay={index * 0.1} />
                {stat.suffix && (
                  <span
                    className="text-4xl md:text-5xl ml-1"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 300,
                      color: 'var(--gold-muted)',
                    }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>

              <p
                className="text-sm mt-2"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vertical Dividers */}
      {stats.length === 4 && (
        <div className="absolute inset-0 max-w-[1600px] mx-auto px-6 md:px-12 pointer-events-none hidden lg:block">
          <div className="h-full grid grid-cols-4 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative">
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-1/3 w-[1px]"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 0%, rgba(201, 169, 110, 0.15) 50%, transparent 100%)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function CountUpNumber({
  end,
  isInView,
  delay,
}: {
  end: number;
  isInView: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, end, delay]);

  return (
    <span
      className="text-5xl md:text-7xl transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(201,169,110,0.4)]"
      style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, color: 'var(--gold-primary)' }}
    >
      {count}
    </span>
  );
}
