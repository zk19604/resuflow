import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, ArrowRight } from 'lucide-react';
import { UserProfile } from '@/types/userProfile';

interface ServicesProps {
  profile: UserProfile;
}

interface ServiceItem {
  number: string;
  name: string;
  description: string;
  deliverables: string[];
}

export default function Services({ profile }: ServicesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
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

  // Build service items from work experience roles + domain skills
  // Each unique role becomes a service offering
  const roleServices: ServiceItem[] = [];
  const seenRoles = new Set<string>();

  profile.workExperience.forEach((exp, i) => {
    const role = exp.role?.trim();
    if (!role || seenRoles.has(role)) return;
    seenRoles.add(role);

    const achievements = Array.isArray(exp.achievements) ? exp.achievements : [];
    const deliverables = achievements.slice(0, 3).map((a) =>
      typeof a === 'string' ? a.slice(0, 40) : a
    );

    roleServices.push({
      number: String(roleServices.length + 1).padStart(2, '0'),
      name: role,
      description: exp.description || `Expert ${role.toLowerCase()} services delivering measurable results.`,
      deliverables:
        deliverables.length > 0
          ? deliverables
          : profile.skills.technical.slice(0, 3),
    });
  });

  // If no work experience, build from domain skills
  const domainServices: ServiceItem[] =
    roleServices.length === 0
      ? profile.skills.domain.slice(0, 6).map((domain, i) => ({
          number: String(i + 1).padStart(2, '0'),
          name: domain,
          description: `Specialised expertise in ${domain.toLowerCase()} delivering impactful outcomes.`,
          deliverables: profile.skills.technical.slice(i * 2, i * 2 + 3),
        }))
      : [];

  const services = [...roleServices, ...domainServices].slice(0, 6);

  if (services.length === 0) return null;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 md:py-40"
      style={{ background: 'var(--bg-alt)' }}
    >
      {/* Section Number */}
      <div
        className="absolute top-20 left-12 text-[200px] pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 300,
          color: 'var(--gold-primary)',
          opacity: 0.04,
        }}
      >
        03
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px]" style={{ background: 'var(--gold-primary)' }} />
            <span
              className="text-xs tracking-[0.18em] uppercase"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--gold-primary)' }}
            >
              Experience
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: 'var(--text-primary)' }}
          >
            What I Offer
          </h2>
        </motion.div>

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div
                className="border-t transition-colors duration-300"
                style={{ borderColor: 'rgba(201, 169, 110, 0.08)' }}
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full py-6 md:py-8 flex items-center gap-6 group text-left"
                >
                  {/* Number */}
                  <div
                    className="w-[15%] md:w-[10%] text-sm"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
                  >
                    {service.number}
                  </div>

                  {/* Name */}
                  <div
                    className="flex-1 text-xl md:text-3xl transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: 'var(--text-primary)' }}
                  >
                    <span className="group-hover:text-[var(--gold-primary)] transition-colors duration-300">
                      {service.name}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-4 h-4 flex items-center justify-center transition-transform duration-300"
                    style={{ transform: expandedIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    <Plus className="w-4 h-4" style={{ color: 'var(--gold-primary)' }} />
                  </div>
                </button>

                {/* Expanded Content */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: expandedIndex === index ? '220px' : '0' }}
                >
                  <div className="pb-8 pl-[15%] md:pl-[10%] pr-[10%] space-y-4">
                    <p
                      className="text-[15px] leading-[1.75] max-w-2xl"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
                    >
                      {service.description}
                    </p>

                    {service.deliverables.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {service.deliverables.map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 border text-xs tracking-[0.06em] uppercase"
                            style={{
                              borderColor: 'rgba(201, 169, 110, 0.15)',
                              fontFamily: 'var(--font-body)',
                              color: 'var(--text-secondary)',
                              borderRadius: '2px',
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-xs transition-colors duration-300 hover:text-[var(--gold-primary)]"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
                    >
                      Get in touch
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
