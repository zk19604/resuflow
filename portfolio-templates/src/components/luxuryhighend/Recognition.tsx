import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '@/types/userProfile';

interface RecognitionProps {
  profile: UserProfile;
}

interface AwardItem {
  name: string;
  body: string;
  year: string;
}

export default function Recognition({ profile }: RecognitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Build awards from certifications first, then structured achievements
  const awards: AwardItem[] = [];

  profile.certifications.forEach((cert) => {
    awards.push({
      name: cert.name || 'Certification',
      body: cert.issuer || '',
      year: cert.date?.slice(0, 4) || '',
    });
  });

  // Add structured achievements (object form)
  const achievementItems = Array.isArray(profile.achievements) ? profile.achievements : [];
  achievementItems.forEach((ach) => {
    if (typeof ach === 'object' && ach.title) {
      awards.push({
        name: ach.title,
        body: ach.description || '',
        year: ach.date?.slice(0, 4) || '',
      });
    }
  });

  // Cap at 4 for the 2-col grid layout
  const displayAwards = awards.slice(0, 4);

  if (displayAwards.length === 0) return null;

  return (
    <section
      id="recognition"
      ref={sectionRef}
      className="relative py-28 md:py-32"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: 'var(--text-primary)' }}
          >
            {profile.certifications.length > 0 ? 'Certifications & Recognition' : 'Recognition'}
          </h2>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto">
          {displayAwards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-center"
            >
              <div className="mb-4">
                <span className="text-[10px]" style={{ color: 'var(--gold-primary)', opacity: 0.3 }}>
                  ★
                </span>
              </div>

              <div
                className="w-10 h-[1px] mx-auto mb-6"
                style={{ background: 'var(--gold-primary)' }}
              />

              <h3
                className="text-2xl mb-3"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: 'var(--text-primary)' }}
              >
                {award.name}
              </h3>

              <p
                className="text-sm"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
              >
                {[award.body, award.year].filter(Boolean).join(' · ')}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
