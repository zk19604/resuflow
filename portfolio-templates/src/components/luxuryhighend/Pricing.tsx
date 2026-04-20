import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Pricing() {
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

  const tiers = [
    {
      name: 'Essentials',
      price: '$5,000',
      features: [
        'Single deliverable project',
        'Up to 2 revision rounds',
        'Standard turnaround (2-3 weeks)',
        'HD export formats',
      ],
      cta: 'Get Started',
      featured: false,
    },
    {
      name: 'Signature',
      price: '$15,000',
      features: [
        'Multi-deliverable campaign',
        'Unlimited revisions',
        'Priority turnaround (1-2 weeks)',
        '4K + multi-format exports',
        'Strategic consultation included',
        'Dedicated project management',
      ],
      cta: 'Most Requested',
      featured: true,
    },
    {
      name: 'Bespoke',
      price: "Let's talk",
      features: [
        'Full-service creative partnership',
        'Custom scope & timeline',
        'Ongoing creative direction',
        'Team integration & leadership',
      ],
      cta: 'Schedule Call',
      featured: false,
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-40"
      style={{ background: 'var(--bg-alt)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-4"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
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
              Investment
            </span>
            <div 
              className="w-10 h-[1px]"
              style={{ background: 'var(--gold-primary)' }}
            />
          </div>

          <h2 
            className="text-4xl md:text-5xl mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              color: 'var(--text-primary)',
            }}
          >
            Investment
          </h2>

          <p 
            className="text-[15px]"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
            }}
          >
            Clarity from the first conversation.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.9, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              className="relative p-8 border"
              style={{
                background: tier.featured ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                borderColor: tier.featured ? 'rgba(201, 169, 110, 0.25)' : 'rgba(201, 169, 110, 0.08)',
                borderRadius: '4px',
                transform: tier.featured ? 'scale(1.04)' : 'scale(1)',
                boxShadow: tier.featured ? '0 0 60px rgba(201, 169, 110, 0.06)' : 'none',
              }}
            >
              {/* Featured Label */}
              {tier.featured && (
                <div className="text-center mb-6">
                  <span 
                    className="text-[10px] tracking-[0.18em] uppercase"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--gold-primary)',
                    }}
                  >
                    Most Requested
                  </span>
                  <div 
                    className="w-20 h-[1px] mx-auto mt-2"
                    style={{ background: 'var(--gold-primary)' }}
                  />
                </div>
              )}

              {/* Tier Name */}
              <p 
                className="text-xs tracking-[0.12em] uppercase mb-4"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--gold-primary)',
                }}
              >
                {tier.name}
              </p>

              {/* Price */}
              <div className="mb-6">
                {tier.name === 'Bespoke' ? (
                  <h3 
                    className="text-4xl italic"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {tier.price}
                  </h3>
                ) : (
                  <h3 
                    className="text-5xl"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 300,
                      color: tier.featured ? 'var(--gold-primary)' : 'var(--text-primary)',
                    }}
                  >
                    {tier.price}
                  </h3>
                )}
              </div>

              {/* Divider */}
              <div 
                className="w-full h-[1px] mb-6"
                style={{ background: 'rgba(201, 169, 110, 0.15)' }}
              />

              {/* Features */}
              <div className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span 
                      className="text-xs mt-0.5"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      —
                    </span>
                    <span 
                      className="text-sm"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className="w-full py-3 border transition-all duration-300"
                style={{
                  borderColor: tier.featured ? 'transparent' : 'rgba(201, 169, 110, 0.35)',
                  background: tier.featured ? 'var(--gold-primary)' : 'transparent',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: tier.featured ? 'var(--bg-base)' : 'var(--text-secondary)',
                }}
                onMouseEnter={(e) => {
                  if (tier.featured) {
                    e.currentTarget.style.background = 'var(--gold-light)';
                  } else {
                    e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.50)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (tier.featured) {
                    e.currentTarget.style.background = 'var(--gold-primary)';
                  } else {
                    e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.35)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
