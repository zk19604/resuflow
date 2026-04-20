import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Process() {
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

  const steps = [
    {
      number: '01',
      title: 'Discovery',
      subtitle: 'I listen before I create.',
      description: 'Deep dive into your brand, goals, and audience. Understanding the why behind the what.',
      checklist: ['Brand audit & research', 'Stakeholder interviews', 'Competitive landscape analysis'],
    },
    {
      number: '02',
      title: 'Concept',
      subtitle: 'Strategy meets creative vision.',
      description: 'Translating insights into compelling visual narratives. Story frameworks designed for impact.',
      checklist: ['Creative brief development', 'Concept boards & mood', 'Script & storyboard'],
    },
    {
      number: '03',
      title: 'Production',
      subtitle: 'Precision on set or in the studio.',
      description: 'Meticulous execution with the right team, tools, and creative energy to bring vision to life.',
      checklist: ['Pre-production planning', 'Principal photography', 'On-set direction'],
    },
    {
      number: '04',
      title: 'Post',
      subtitle: 'Where the story truly comes to life.',
      description: 'Editorial craft, color science, sound design, and motion graphics refined to perfection.',
      checklist: ['Narrative editing', 'Color grading & VFX', 'Audio mix & mastering'],
    },
    {
      number: '05',
      title: 'Handoff',
      subtitle: 'Clean delivery, full rights, total transparency.',
      description: 'Final assets delivered in every format you need, with clear documentation and ongoing support.',
      checklist: ['Multi-format delivery', 'Asset organization', 'Post-launch support'],
    },
  ];

  return (
    <section 
      id="process"
      ref={sectionRef}
      className="relative py-32 md:py-40"
      style={{ background: 'var(--bg-base)' }}
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
        05
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
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
              Process
            </span>
          </div>

          <h2 
            className="text-4xl md:text-5xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              color: 'var(--text-primary)',
            }}
          >
            How I Work
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div key={index}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.9, 
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Number Side */}
                <div 
                  className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  <div 
                    className="text-[120px] leading-none select-none pointer-events-none"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 300,
                      color: 'var(--gold-primary)',
                      opacity: 0.06,
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content Side */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <p 
                    className="text-xs mb-3"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--gold-primary)',
                    }}
                  >
                    {step.number} /
                  </p>
                  
                  <h3 
                    className="text-3xl md:text-4xl mb-2"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {step.title}
                  </h3>
                  
                  <p 
                    className="text-lg italic mb-6"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      color: 'var(--gold-primary)',
                    }}
                  >
                    {step.subtitle}
                  </p>
                  
                  <p 
                    className="text-[15px] leading-[1.75] mb-6 max-w-md"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {step.description}
                  </p>

                  <div className="space-y-2">
                    {step.checklist.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div 
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: 'var(--gold-primary)' }}
                        >
                          <div 
                            className="w-[1px] h-3"
                            style={{ background: 'var(--gold-primary)' }}
                          />
                        </div>
                        <span 
                          className="text-sm"
                          style={{
                            fontFamily: 'var(--font-body)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={isVisible ? { height: '60px' } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15 + 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                  className="w-[1px] mx-auto mt-12 overflow-hidden"
                  style={{
                    background: 'var(--gold-primary)',
                    opacity: 0.12,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
