import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '@/types/userProfile';

interface TestimonialsProps {
  profile: UserProfile;
}

interface TestimonialItem {
  text: string;
  name: string;
  role: string;
  company: string;
}

export default function Testimonials({ profile }: TestimonialsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Build testimonials from profile.references
  const testimonials: TestimonialItem[] = profile.references.map((ref) => ({
    // references have no "quote" field in the schema, so use a neutral phrase
    text: `A trusted colleague and reference. ${ref.role ? `${ref.role}.` : ''}`.trim(),
    name: ref.name || 'Reference',
    role: ref.role || '',
    company: ref.contact || '',
  }));

  // If no references, hide the section entirely
  if (testimonials.length === 0) return null;

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40"
      style={{ background: 'var(--bg-alt)' }}
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
        06
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px]" style={{ background: 'var(--gold-primary)' }} />
            <span
              className="text-xs tracking-[0.18em] uppercase"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--gold-primary)' }}
            >
              References
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: 'var(--text-primary)' }}
          >
            Professional References
          </h2>
        </motion.div>

        {/* Testimonial Display */}
        <div className="relative min-h-[300px]">
          {/* Large Quotation Mark */}
          <div
            className="absolute -top-12 left-0 text-[180px] leading-none select-none pointer-events-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 200,
              color: 'var(--gold-primary)',
              opacity: 0.08,
            }}
          >
            "
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.5 }}
              className="relative text-center"
            >
              <p
                className="text-2xl md:text-3xl italic max-w-3xl mx-auto mb-12 leading-[1.65]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: 'var(--text-primary)' }}
              >
                {testimonials[currentIndex].text}
              </p>

              <div
                className="w-10 h-[1px] mx-auto mb-6"
                style={{ background: 'var(--gold-primary)', opacity: 0.4 }}
              />

              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(201,169,110,0.3) 0%, rgba(142,154,171,0.2) 100%)',
                  }}
                />
                <div className="text-left">
                  <p
                    className="text-[15px] mb-0.5"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-primary)' }}
                  >
                    {testimonials[currentIndex].name}
                  </p>
                  <p
                    className="text-sm"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
                  >
                    {[testimonials[currentIndex].role, testimonials[currentIndex].company]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Indicators — only if multiple */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-3 mt-16">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="relative transition-all duration-300"
                  style={{
                    width: currentIndex === index ? '80px' : '40px',
                    height: '2px',
                    background:
                      currentIndex === index ? 'var(--gold-primary)' : 'rgba(201, 169, 110, 0.15)',
                  }}
                >
                  {currentIndex === index && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 7, ease: 'linear' }}
                      style={{ background: 'var(--gold-primary)' }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
