import { UserProfile } from '@/types/userProfile';

interface EducationProps {
  profile?: UserProfile;
}

const fallbackEducation = [
  { initials: 'UCB', institution: 'University of Chicago Booth', degree: 'MBA Operations Management', year: '2006–2008' },
  { initials: 'MSU', institution: 'Michigan State University', degree: 'BSc Industrial Engineering', year: '2002–2006' },
];

export function Education({ profile }: EducationProps) {
  const eduData = profile?.education;

  const education =
    eduData && eduData.length > 0
      ? eduData.map((edu) => {
          const words = edu.institution.split(/\s+/);
          const initials = words
            .filter((w) => w.length > 2)
            .slice(0, 3)
            .map((w) => w[0].toUpperCase())
            .join('');
          const startYear = (edu.startDate || '').slice(0, 4);
          const endYear = (edu.endDate || '').slice(0, 4);
          const yearRange = startYear && endYear ? `${startYear}–${endYear}` : startYear || endYear || '';
          const degreeLabel = [edu.degree, edu.field].filter(Boolean).join(' ');
          return { initials: initials || edu.institution.slice(0, 3).toUpperCase(), institution: edu.institution, degree: degreeLabel, year: yearRange };
        })
      : fallbackEducation;

  const name = profile?.personalInfo?.name || 'Morgan Hayes';

  return (
    <section
      id="education"
      className="relative"
      style={{
        minHeight: '520px',
        backgroundColor: '#1A1208',
        paddingTop: '80px',
        paddingBottom: '80px',
        outline: '3px solid #C9340A',
        outlineOffset: '-20px',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      {/* Inner border */}
      <div
        style={{
          position: 'absolute', top: '28px', left: '28px', right: '28px', bottom: '28px',
          border: '1px solid rgba(245,237,216,0.2)', pointerEvents: 'none',
        }}
      />

      {/* Corner ornaments */}
      {[
        { top: '36px', left: '36px', borderTop: '2px solid #C9340A', borderLeft: '2px solid #C9340A' },
        { top: '36px', right: '36px', borderTop: '2px solid #C9340A', borderRight: '2px solid #C9340A' },
        { bottom: '36px', left: '36px', borderBottom: '2px solid #C9340A', borderLeft: '2px solid #C9340A' },
        { bottom: '36px', right: '36px', borderBottom: '2px solid #C9340A', borderRight: '2px solid #C9340A' },
      ].map((style, i) => (
        <div key={i} style={{ position: 'absolute', width: '24px', height: '24px', ...style }} />
      ))}

      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#9A8060', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '12px' }}>
          THIS CERTIFIES THAT
        </div>
        <div
          style={{
            fontFamily: 'Playfair Display, serif', fontWeight: 700, fontStyle: 'italic',
            fontSize: '48px', color: '#F5EDD8', textShadow: '0 2px 6px rgba(0,0,0,0.5)', marginBottom: '12px',
          }}
        >
          {name}
        </div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#9A8060', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '20px' }}>
          HAS COMPLETED THE FOLLOWING ACADEMIC DISTINCTIONS
        </div>
        <div style={{ width: '400px', height: '3px', backgroundColor: '#C9340A', margin: '0 auto' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', padding: '0 80px', flexWrap: 'wrap' }}>
        {education.map((edu, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: '72px', height: '72px', borderRadius: '50%',
                backgroundColor: '#C9340A', border: '3px solid #F5EDD8',
                margin: '0 auto 16px', fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', color: '#F5EDD8',
              }}
            >
              {edu.initials}
            </div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '22px', color: '#F5EDD8', marginBottom: '8px' }}>
              {edu.institution}
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#A09070', marginBottom: '8px' }}>
              {edu.degree}
            </div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: '#C9340A', marginBottom: '16px' }}>
              {edu.year}
            </div>
            <div style={{ width: '160px', height: '1px', backgroundColor: 'rgba(245,237,216,0.15)', margin: '0 auto' }} />
          </div>
        ))}
      </div>
    </section>
  );
}
