import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function Showreel() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  return (
    <section 
      ref={sectionRef}
      className="relative py-28 md:py-32"
      style={{ background: 'var(--bg-alt)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
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
              Showreel
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
            2024 Showreel
          </h2>

          <p 
            className="text-base max-w-md mx-auto"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
            }}
          >
            Three minutes. Eight years of work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative aspect-video w-[80%] mx-auto overflow-hidden border"
          style={{
            borderColor: 'rgba(201, 169, 110, 0.12)',
            borderRadius: '4px',
            boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,169,110,0.08), 0 60px 160px rgba(201,169,110,0.04)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Video Placeholder */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(20,20,24,1) 0%, rgba(28,24,20,1) 50%, rgba(20,20,24,1) 100%)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1638961837480-5aee8a8f90cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NzI2MjYyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Showreel"
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pulsing Ring */}
              <div 
                className="absolute inset-0 rounded-full border animate-pulse-ring"
                style={{
                  borderColor: 'rgba(201, 169, 110, 0.3)',
                  width: '80px',
                  height: '80px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              {/* Outer Ring */}
              <div 
                className="relative w-20 h-20 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{
                  borderColor: 'rgba(201, 169, 110, 0.3)',
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                {/* Inner Circle */}
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isHovered ? 'rgba(201, 169, 110, 0.18)' : 'rgba(201, 169, 110, 0.12)',
                  }}
                >
                  <Play 
                    className="w-4 h-4 ml-0.5"
                    style={{ 
                      color: 'var(--text-primary)',
                      fill: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-center mt-6 text-xs tracking-[0.12em] uppercase"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-tertiary)',
          }}
        >
          3:47 · 1080p · Dolby Audio
        </motion.p>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
      `}</style>
    </section>
  );
}
