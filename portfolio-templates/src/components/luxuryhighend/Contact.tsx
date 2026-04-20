import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { UserProfile } from '@/types/userProfile';

interface ContactProps {
  profile: UserProfile;
}

export default function Contact({ profile }: ContactProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  // Build social links from profile — only include ones that exist
  const socialLinks = [
    profile.personalInfo.linkedin && { label: 'LinkedIn', href: profile.personalInfo.linkedin },
    profile.personalInfo.github && { label: 'GitHub', href: profile.personalInfo.github },
    profile.personalInfo.website && { label: 'Website', href: profile.personalInfo.website },
    profile.personalInfo.portfolio && { label: 'Portfolio', href: profile.personalInfo.portfolio },
  ].filter(Boolean) as { label: string; href: string }[];

  const { email, phone, location } = profile.personalInfo;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: 'var(--bg-alt)' }}
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
      </div>

      <div className="max-w-[900px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            <div
              className="text-5xl md:text-7xl mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                color: 'var(--text-primary)',
              }}
            >
              Start a Conversation
            </div>
            <div
              className="text-5xl md:text-7xl italic"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(201, 169, 110, 0.4)',
              }}
            >
              Let's build something lasting.
            </div>
          </h2>

          <p
            className="text-[15px] max-w-lg mx-auto"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
            }}
          >
            {profile.summary
              ? `${profile.summary.slice(0, 120)}${profile.summary.length > 120 ? '…' : ''}`
              : "Whether you're launching a new project or looking for the right talent, I'm ready to help craft work that resonates."}
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          onSubmit={handleSubmit}
          className="space-y-6 mb-12"
        >
          {/* Name & Email Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-5 py-4 border transition-all duration-300 focus:outline-none"
              style={{
                background: 'rgba(20, 20, 24, 0.8)',
                borderColor: 'rgba(201, 169, 110, 0.10)',
                borderRadius: '2px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.40)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.04)';
                e.currentTarget.style.background = 'rgba(20, 20, 24, 1.0)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.10)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(20, 20, 24, 0.8)';
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-5 py-4 border transition-all duration-300 focus:outline-none"
              style={{
                background: 'rgba(20, 20, 24, 0.8)',
                borderColor: 'rgba(201, 169, 110, 0.10)',
                borderRadius: '2px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.40)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.04)';
                e.currentTarget.style.background = 'rgba(20, 20, 24, 1.0)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.10)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(20, 20, 24, 0.8)';
              }}
            />
          </div>

          {/* Subject */}
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-5 py-4 border transition-all duration-300 focus:outline-none"
            style={{
              background: 'rgba(20, 20, 24, 0.8)',
              borderColor: 'rgba(201, 169, 110, 0.10)',
              borderRadius: '2px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.40)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.04)';
              e.currentTarget.style.background = 'rgba(20, 20, 24, 1.0)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.10)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = 'rgba(20, 20, 24, 0.8)';
            }}
          />

          {/* Message */}
          <textarea
            placeholder="Tell me about your project or opportunity..."
            required
            rows={4}
            className="w-full px-5 py-4 border transition-all duration-300 resize-none focus:outline-none"
            style={{
              background: 'rgba(20, 20, 24, 0.8)',
              borderColor: 'rgba(201, 169, 110, 0.10)',
              borderRadius: '2px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.40)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.04)';
              e.currentTarget.style.background = 'rgba(20, 20, 24, 1.0)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.10)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = 'rgba(20, 20, 24, 0.8)';
            }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 transition-all duration-300 relative overflow-hidden"
            style={{
              background: 'var(--gold-primary)',
              color: 'var(--bg-base)',
              borderRadius: '2px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              height: '52px',
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.background = 'var(--gold-light)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(201, 169, 110, 0.20)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--gold-primary)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            {isSubmitting && (
              <div
                className="absolute bottom-0 left-0 h-[1px] animate-loading-bar"
                style={{ background: 'var(--gold-light)' }}
              />
            )}
          </button>
        </motion.form>

        {/* Contact Info — only render rows that have data */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap items-center justify-center gap-8 mb-8"
        >
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
            >
              <Mail className="w-4 h-4" />
              {email}
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
            >
              <Phone className="w-4 h-4" />
              {phone}
            </a>
          )}
          {location && (
            <div
              className="flex items-center gap-2 text-sm"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
            >
              <MapPin className="w-4 h-4" />
              {location}
            </div>
          )}
        </motion.div>

        {/* Social Links — only render if any exist */}
        {socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-center"
          >
            <p
              className="text-xs tracking-[0.06em]"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-tertiary)' }}
            >
              {socialLinks.map((social, index) => (
                <span key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-[var(--gold-primary)]"
                  >
                    {social.label}
                  </a>
                  {index < socialLinks.length - 1 && ' · '}
                </span>
              ))}
            </p>
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out;
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, -30px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 40px); }
        }
        .animate-float-1 { animation: float-1 20s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 24s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
