import { UserProfile } from '@/types/userProfile';

interface ExperienceProps {
  profile?: UserProfile;
}

const fallbackExperiences = [
  {
    year: '2019 —',
    present: 'PRESENT',
    title: 'CHIEF OPERATIONS OFFICER',
    company: 'Apex Logistics Group',
    description: 'Leading global operations strategy for EMEA region, overseeing 40+ facilities and 2,000+ staff. Implemented lean manufacturing principles that reduced operational costs significantly.',
    location: 'London, UK',
    badge: 'CURRENT ROLE',
  },
  {
    year: '2014 —',
    present: '2019',
    title: 'VP OPERATIONS',
    company: 'Sterling Manufacturing',
    description: 'Managed manufacturing plants across North America and Europe. Spearheaded digital transformation initiative that improved production efficiency by 35%.',
    location: 'Detroit, USA',
    badge: '5 YEARS',
  },
];

export function Experience({ profile }: ExperienceProps) {
  const workExperience = profile?.workExperience;

  const experiences =
    workExperience && workExperience.length > 0
      ? workExperience.map((exp) => {
          const startYear = (exp.startDate || '').slice(0, 4);
          const endYear = exp.endDate === 'Present' || !exp.endDate ? 'PRESENT' : (exp.endDate || '').slice(0, 4);
          const badge = exp.achievements?.[0]
            ? exp.achievements[0].slice(0, 20).toUpperCase()
            : endYear === 'PRESENT' ? 'CURRENT ROLE' : `${startYear}–${endYear}`;
          return {
            year: startYear ? `${startYear} —` : '—',
            present: endYear,
            title: exp.role?.toUpperCase() || 'ROLE',
            company: exp.company || '',
            description: exp.description || '',
            badge,
          };
        })
      : fallbackExperiences;

  const location = profile?.personalInfo?.location || 'LONDON EDITION';

  return (
    <section
      id="experience"
      className="relative"
      style={{
        minHeight: '1100px',
        backgroundColor: '#EDE4C8',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      {/* Newspaper masthead */}
      <div
        style={{
          backgroundColor: '#1A1208',
          height: '96px',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          alignItems: 'center',
          padding: '0 80px',
        }}
      >
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#9A8060', letterSpacing: '0.2em' }}>
          VOL. XII · NO. {experiences.length}
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '36px', color: '#F5EDD8' }}>
            THE CAREER GAZETTE
          </div>
          <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(245,237,216,0.3)', margin: '8px 0' }} />
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#9A8060', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            02 / EXPERIENCE & CAREER TIMELINE
          </div>
        </div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#9A8060', letterSpacing: '0.2em', textAlign: 'right' }}>
          {location.toUpperCase()} · {new Date().getFullYear()}
        </div>
      </div>

      <div style={{ width: '100%', height: '3px', backgroundColor: '#C9340A' }} />

      <div style={{ padding: '48px 80px 80px' }}>
        {experiences.map((exp, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '10% 15% 2px 50% 23%',
              gap: '32px',
              paddingTop: '80px',
              paddingBottom: '80px',
              borderBottom: index < experiences.length - 1 ? '2px solid #1A1208' : 'none',
              alignItems: 'start',
            }}
          >
            <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '32px', color: 'rgba(26,18,8,0.15)' }}>
              № {String(index + 1).padStart(2, '0')}
            </div>

            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: '#C9340A', textTransform: 'uppercase' }}>
                {exp.year}
              </div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: '#C9340A', textTransform: 'uppercase' }}>
                {exp.present}
              </div>
            </div>

            <div style={{ width: '2px', height: '80px', backgroundColor: '#1A1208' }} />

            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '44px', color: '#1A1208', textTransform: 'uppercase', lineHeight: '1.1' }}>
                {exp.title}
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '16px', color: '#5C4030', marginTop: '8px' }}>
                {exp.company}
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '14px', color: '#3D2B1A', lineHeight: '1.85', marginTop: '16px', maxWidth: '520px' }}>
                {exp.description}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#C9340A',
                  border: '2px solid #1A1208',
                  boxShadow: '3px 3px 0 #1A1208',
                  padding: '10px 16px',
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '13px',
                  color: '#F5EDD8',
                  textTransform: 'uppercase',
                  cursor: 'default',
                }}
              >
                {exp.badge}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
