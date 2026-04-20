'use client';
import { useRef, useEffect, useState } from 'react';

const steps = [
  { number: '01', title: 'Discovery', subtitle: 'I listen before I create.', description: 'Deep dive into your background, goals, and audience. Understanding the why behind the what.', checklist: ['Profile analysis & research', 'Goals identification', 'Audience mapping'] },
  { number: '02', title: 'Concept', subtitle: 'Strategy meets creative vision.', description: 'Translating insights into compelling visual narratives. Story frameworks designed for impact.', checklist: ['Creative brief development', 'Concept boards & mood', 'Structure planning'] },
  { number: '03', title: 'Production', subtitle: 'Precision in execution.', description: 'Meticulous execution with the right tools, approach, and creative energy to bring vision to life.', checklist: ['Content creation', 'Design & development', 'Quality assurance'] },
  { number: '04', title: 'Delivery', subtitle: 'Where the story truly comes to life.', description: 'Final polish, refinement, and delivery optimised to perfection.', checklist: ['Review & refinement', 'Final delivery', 'Post-launch support'] },
];

export default function Process() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} style={{ position: 'relative', padding: '160px 0', background: 'var(--bg-base)' }}>
      <div style={{ position: 'absolute', top: 80, left: 48, fontSize: 200, fontFamily: 'var(--font-mono)', fontWeight: 300, color: 'var(--gold-primary)', opacity: 0.04, pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>05</div>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ marginBottom: 80, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold-primary)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>Process</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px,3.5vw,48px)', color: 'var(--text-primary)', margin: 0 }}>How I Work</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {steps.map((step, i) => (
            <div key={i}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.9s ease ${i*0.15}s, transform 0.9s ease ${i*0.15}s` }}>
                {/* Number side */}
                <div style={i % 2 === 1 ? { order: 2 } : {}}>
                  <div style={{ fontSize: 120, fontFamily: 'var(--font-mono)', fontWeight: 300, color: 'var(--gold-primary)', opacity: 0.06, lineHeight: 1, userSelect: 'none' }}>{step.number}</div>
                </div>
                {/* Content side */}
                <div style={i % 2 === 1 ? { order: 1 } : {}}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold-primary)', marginBottom: 12 }}>{step.number} /</p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(28px,3vw,40px)', color: 'var(--text-primary)', marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 18, fontStyle: 'italic', color: 'var(--gold-primary)', marginBottom: 24 }}>{step.subtitle}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: 440, marginBottom: 24 }}>{step.description}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {step.checklist.map((item, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <div style={{ width: 1, height: 12, background: 'var(--gold-primary)', marginTop: 4, flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 1, height: 60, background: 'var(--gold-primary)', opacity: 0.12, margin: '48px auto 0' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
