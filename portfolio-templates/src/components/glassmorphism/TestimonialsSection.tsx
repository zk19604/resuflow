const testimonials = [
  {
    quote: "Alex brought a level of spatial thinking I've never seen in a designer. The Vision Pro UI they designed for us became the blueprint for our entire product vision.",
    name: "Sarah Chen",
    role: "CPO at Luminary Labs",
    initials: "SC",
    blur: 18,
    accentColor: 'rgba(123,47,255,0.5)',
  },
  {
    quote: "Working with Alex is like having a creative polymath on your team. They bridge design, engineering and strategy in a way that's genuinely rare.",
    name: "Marcus Okafor",
    role: "VP Design at Nexus AI",
    initials: "MO",
    blur: 24,
    accentColor: 'rgba(26,111,255,0.5)',
  },
  {
    quote: "The design system Alex architected scaled from 3 products to 40+ in 18 months. Clean, opinionated, and beautiful — exactly what we needed.",
    name: "Priya Nair",
    role: "Head of Design at Scale",
    initials: "PN",
    blur: 20,
    accentColor: 'rgba(255,45,120,0.5)',
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: `blur(${t.blur}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${t.blur}px) saturate(180%)`,
        border: '1px solid rgba(255,255,255,0.13)',
        borderTop: '1px solid rgba(255,255,255,0.22)',
        borderLeft: '1px solid rgba(255,255,255,0.22)',
        borderRadius: 20,
        padding: 32,
        boxShadow: '0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)',
        minWidth: 320,
        flex: '0 0 380px',
      }}
    >
      {/* Quote mark */}
      <div
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 64,
          lineHeight: 0.8,
          marginBottom: 20,
          background: 'linear-gradient(135deg, #7B2FFF, #1A6FFF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
        }}
      >
        &ldquo;
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 15,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.75,
          marginBottom: 28,
        }}
      >
        {t.quote}
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${t.accentColor}, rgba(26,111,255,0.5))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.15)',
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>
            {t.initials}
          </span>
        </div>
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>
            {t.name}
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.40)' }}>
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section style={{ padding: '120px 0', position: 'relative', zIndex: 2, overflow: 'hidden', width: '100%' }}>
      {/* Heading */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 80px', marginBottom: 56 }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)' }}>
            Testimonials
          </span>
        </div>
        <h2
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 42, color: '#FFFFFF', textAlign: 'center' }}
        >
          What others say
        </h2>
      </div>

      {/* Scroll row */}
      <div
        style={{
          display: 'flex',
          gap: 20,
          padding: '0 80px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </div>
    </section>
  );
}
