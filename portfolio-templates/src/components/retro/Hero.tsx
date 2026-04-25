import { UserProfile } from '@/types/userProfile';

interface HeroProps {
  profile?: UserProfile;
}

export function Hero({ profile }: HeroProps) {
  const name = profile?.personalInfo?.name || 'Morgan Hayes';
  const nameParts = name.split(' ');
  const firstName = nameParts[0] || 'MORGAN';
  const lastName = nameParts.slice(1).join(' ') || 'HAYES';

  const role = profile?.workExperience?.[0]?.role || 'Chief Operations Officer';
  const location = profile?.personalInfo?.location || 'London, UK';
  const ribbonText = [role, location].filter(Boolean).join(' · ');

  const yearsExp = (() => {
    const dates = (profile?.workExperience || [])
      .map((w) => parseInt((w.startDate || '').slice(0, 4)))
      .filter((y) => !isNaN(y));
    return dates.length ? new Date().getFullYear() - Math.min(...dates) : 16;
  })();

  const projectCount = profile?.projects?.length ?? 80;
  const certCount = profile?.certifications?.length;

  const stats = [
    { number: `${yearsExp}+`, label: 'YEARS' },
    { number: `${projectCount}+`, label: 'PROJECTS' },
    certCount != null
      ? { number: `${certCount}`, label: 'CERTS' }
      : { number: '$1.2B', label: 'DELIVERED' },
  ];

  const summary = profile?.summary || '';
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return (
    <section
      id="home"
      className="relative"
      style={{
        minHeight: '940px',
        height: '100vh',
        backgroundColor: '#F5EDD8',
        backgroundImage: 'radial-gradient(circle, rgba(80,40,0,0.08) 2px, transparent 2px)',
        backgroundSize: '10px 10px',
        display: 'grid',
        gridTemplateColumns: '62% 38%',
        maxWidth: '1440px',
        margin: '0 auto',
        paddingTop: '72px',
      }}
    >
      {/* Left column */}
      <div className="flex flex-col justify-center" style={{ paddingLeft: '80px' }}>
        <div
          className="flex items-center justify-center"
          style={{
            backgroundColor: '#1A1208',
            height: '48px',
            borderBottom: '3px solid #C9340A',
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '18px',
            color: '#F5EDD8',
            letterSpacing: '0.4em',
          }}
        >
          RESUFLOW PRESENTS
        </div>

        <div style={{ marginTop: '32px' }}>
          <div
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '120px',
              color: '#1A1208',
              lineHeight: '0.85',
              textTransform: 'uppercase',
            }}
          >
            THE ONE &
          </div>
          <div
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '180px',
              color: '#C9340A',
              lineHeight: '0.85',
              textTransform: 'uppercase',
            }}
          >
            ONLY
          </div>
          <div
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '96px',
              color: '#1A1208',
              lineHeight: '0.85',
              textTransform: 'uppercase',
            }}
          >
            {firstName}
          </div>
          {lastName && (
            <div
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '96px',
                color: '#F5EDD8',
                backgroundColor: '#1A1208',
                lineHeight: '0.85',
                display: 'inline-block',
                padding: '0 12px',
                textTransform: 'uppercase',
              }}
            >
              {lastName}
            </div>
          )}
        </div>

        <div
          className="flex items-center justify-center"
          style={{
            marginTop: '28px',
            backgroundColor: '#C9340A',
            height: '56px',
            borderTop: '2px solid #1A1208',
            borderBottom: '2px solid #1A1208',
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '20px',
            color: '#F5EDD8',
            letterSpacing: '0.25em',
          }}
        >
          {ribbonText.toUpperCase()}
        </div>

        {summary && (
          <div
            style={{
              marginTop: '36px',
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: '24px',
              color: '#5C2A0A',
              lineHeight: '1.65',
              maxWidth: '560px',
            }}
          >
            &quot;{summary.slice(0, 140)}{summary.length > 140 ? '…' : ''}&quot;
          </div>
        )}

        <div
          style={{
            marginTop: '32px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '11px',
            color: '#8B6B4A',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
          }}
        >
          RESUFLOW PORTFOLIO · EXECUTIVE SERIES · {new Date().getFullYear()}
        </div>

        <div className="flex gap-4" style={{ marginTop: '44px' }}>
          <button
            className="transition-all duration-100"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '16px',
              color: '#F5EDD8',
              backgroundColor: '#C9340A',
              border: '2px solid #1A1208',
              boxShadow: '4px 4px 0 #1A1208',
              height: '52px',
              width: '220px',
              borderRadius: '0px',
              cursor: 'pointer',
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(4px, 4px)'; e.currentTarget.style.boxShadow = 'none'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '4px 4px 0 #1A1208'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '4px 4px 0 #1A1208'; }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            READ FULL PROFILE
          </button>
          <button
            className="transition-all duration-100"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '16px',
              color: '#1A1208',
              backgroundColor: '#F5EDD8',
              border: '2px solid #1A1208',
              boxShadow: '4px 4px 0 #1A1208',
              height: '52px',
              width: '220px',
              borderRadius: '0px',
              cursor: 'pointer',
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(4px, 4px)'; e.currentTarget.style.boxShadow = 'none'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '4px 4px 0 #1A1208'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '4px 4px 0 #1A1208'; }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            GET IN TOUCH
          </button>
        </div>
      </div>

      {/* Right column */}
      <div
        className="flex flex-col items-center justify-center"
        style={{ backgroundColor: '#1A1208', padding: '40px' }}
      >
        <div
          className="flex flex-col items-center justify-center"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: '#C9340A',
            border: '3px solid #F5EDD8',
            marginBottom: '36px',
          }}
        >
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#F5EDD8' }}>
            №001
          </div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#F5EDD8', textTransform: 'uppercase' }}>
            PORTFOLIO
          </div>
        </div>

        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(245,237,216,0.2)', marginBottom: '36px' }} />

        <div className="w-full space-y-10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '64px', color: '#C9340A', lineHeight: '1' }}>
                {stat.number}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#9A8060', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '8px' }}>
                {stat.label}
              </div>
              {index < 2 && (
                <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(245,237,216,0.15)', marginTop: '16px' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '36px', textAlign: 'center' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#F5EDD8',
              border: '2px solid #C9340A',
              margin: '0 auto',
              backgroundImage: 'linear-gradient(#1A1208 1px, transparent 1px), linear-gradient(90deg, #1A1208 1px, transparent 1px)',
              backgroundSize: '10px 10px',
            }}
          />
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#9A8060', marginTop: '8px' }}>
            resuflow.app/{slug}
          </div>
        </div>
      </div>
    </section>
  );
}
