import { UserProfile } from '@/types/userProfile';

interface ContactProps {
  profile?: UserProfile;
}

export function Contact({ profile }: ContactProps) {
  const name = profile?.personalInfo?.name || 'Morgan Hayes';
  const email = profile?.personalInfo?.email || 'morgan@hayesops.com';
  const linkedin = profile?.personalInfo?.linkedin || 'linkedin.com/in/morganhayes';
  const location = profile?.personalInfo?.location || 'London · Chicago · Dubai';
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="relative"
      style={{
        minHeight: '760px',
        backgroundColor: '#F5EDD8',
        backgroundImage: 'radial-gradient(circle, rgba(80,40,0,0.06) 2px, transparent 2px)',
        backgroundSize: '10px 10px',
        paddingTop: '80px',
        paddingBottom: '0',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontSize: '24px', color: '#C9340A', marginBottom: '8px' }}>★</div>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '80px', color: '#1A1208', lineHeight: '0.85' }}>
          LET&apos;S
        </div>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '80px', color: '#C9340A', lineHeight: '0.85', marginBottom: '8px' }}>
          CONNECT
        </div>
        <div style={{ fontSize: '24px', color: '#C9340A' }}>★</div>
      </div>

      <div
        style={{
          maxWidth: '880px', margin: '0 auto 80px',
          backgroundColor: '#1A1208', border: '3px solid #C9340A',
          boxShadow: '8px 8px 0 rgba(26,18,8,0.3)', padding: '56px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2px 1fr', gap: '64px' }}>
          {/* Left */}
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '14px', color: '#C9340A', letterSpacing: '0.3em', marginBottom: '24px' }}>
              GET IN TOUCH
            </div>
            <div className="space-y-7">
              <div className="flex items-center gap-3">
                <span style={{ color: '#C9340A', fontSize: '18px' }}>→</span>
                <a href={`mailto:${email}`} style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '18px', color: '#F5EDD8', textDecoration: 'none' }}>
                  {email}
                </a>
              </div>
              {linkedin && (
                <div className="flex items-center gap-3">
                  <span style={{ color: '#C9340A', fontSize: '18px' }}>→</span>
                  <a href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#C9A96E', textDecoration: 'none' }}>
                    {linkedin.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3">
                <span style={{ color: '#C9340A', fontSize: '18px' }}>→</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#9A8060' }}>
                  {location}
                </span>
              </div>
            </div>

            <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(245,237,216,0.15)', margin: '48px 0 36px' }} />

            <div className="space-y-4">
              <button
                className="transition-all duration-100 w-full"
                style={{
                  fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', color: '#F5EDD8',
                  backgroundColor: '#C9340A', border: '2px solid #F5EDD8',
                  boxShadow: '4px 4px 0 rgba(245,237,216,0.3)', height: '52px', cursor: 'pointer',
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(4px, 4px)'; e.currentTarget.style.boxShadow = 'none'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '4px 4px 0 rgba(245,237,216,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '4px 4px 0 rgba(245,237,216,0.3)'; }}
                onClick={() => window.location.href = `mailto:${email}`}
              >
                SEND MESSAGE
              </button>
              {linkedin && (
                <button
                  className="transition-all duration-100 w-full"
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', color: 'rgba(245,237,216,0.7)',
                    backgroundColor: 'transparent', border: '2px solid rgba(245,237,216,0.3)', height: '52px', cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(245,237,216,0.5)'; e.currentTarget.style.color = '#F5EDD8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(245,237,216,0.3)'; e.currentTarget.style.color = 'rgba(245,237,216,0.7)'; }}
                  onClick={() => window.open(linkedin.startsWith('http') ? linkedin : `https://${linkedin}`, '_blank')}
                >
                  VIEW LINKEDIN
                </button>
              )}
            </div>
          </div>

          <div style={{ width: '2px', height: '100%', backgroundColor: 'rgba(245,237,216,0.15)' }} />

          {/* Right */}
          <div className="flex flex-col items-center justify-center">
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '14px', color: '#C9340A', letterSpacing: '0.3em', marginBottom: '20px' }}>
              SCAN TO VISIT
            </div>
            <div
              style={{
                width: '128px', height: '128px', backgroundColor: '#F5EDD8',
                border: '3px solid #C9340A', boxShadow: '4px 4px 0 #C9340A', marginBottom: '16px',
                backgroundImage: 'linear-gradient(#1A1208 1px, transparent 1px), linear-gradient(90deg, #1A1208 1px, transparent 1px)',
                backgroundSize: '12px 12px',
              }}
            />
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#9A8060', marginBottom: '8px' }}>
              resuflow.app/{slug}
            </div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '12px', color: '#6A5040', letterSpacing: '0.25em', marginBottom: '24px' }}>
              POWERED BY RESUFLOW
            </div>
            <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(245,237,216,0.1)', marginBottom: '16px' }} />
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#6A5040' }}>
              © {year} {name.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', borderTop: '3px solid #1A1208', backgroundColor: '#F5EDD8', padding: '40px 0', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '13px', color: '#C9340A', letterSpacing: '0.25em' }}>
          ★ RETRO THEME · POWERED BY RESUFLOW · EXECUTIVE PORTFOLIO · {year} ★
        </div>
      </div>
    </section>
  );
}
