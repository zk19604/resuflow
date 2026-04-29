import { UserProfile } from '@/types/userProfile';

interface AchievementsProps {
  profile?: UserProfile;
}

const fallbackAchievements = [
  { stat: '3×', label: 'TOP PERFORMER', description: "Recognized three consecutive years as a leading professional in the field" },
  { stat: '10+', label: 'MAJOR PROJECTS', description: 'Significant projects delivered across diverse industries and domains' },
  { stat: '5+', label: 'YEARS EXP', description: 'Dedicated years of professional experience and continuous growth' },
];

export function Achievements({ profile }: AchievementsProps) {
  const profileAchievements = profile?.achievements;

  const achievements =
    profileAchievements && profileAchievements.length > 0
      ? profileAchievements.slice(0, 3).map((a) => ({
          stat: a.date ? a.date.slice(0, 4) : '★',
          label: a.title?.toUpperCase() || 'ACHIEVEMENT',
          description: a.description || '',
        }))
      : (() => {
          const yearsExp = (() => {
            const dates = (profile?.workExperience || [])
              .map((w) => parseInt((w.startDate || '').slice(0, 4)))
              .filter((y) => !isNaN(y));
            return dates.length ? new Date().getFullYear() - Math.min(...dates) : null;
          })();
          const projectCount = profile?.projects?.length;
          const certCount = profile?.certifications?.length;

          if (yearsExp != null || projectCount != null || certCount != null) {
            return [
              yearsExp != null
                ? { stat: `${yearsExp}+`, label: 'YEARS EXP', description: 'Years of dedicated professional experience and growth' }
                : null,
              projectCount != null
                ? { stat: `${projectCount}+`, label: 'PROJECTS', description: 'Projects delivered across diverse domains and industries' }
                : null,
              certCount != null
                ? { stat: `${certCount}`, label: 'CERTIFICATIONS', description: 'Professional certifications earned and maintained' }
                : null,
            ].filter(Boolean) as typeof fallbackAchievements;
          }
          return fallbackAchievements;
        })();

  const location = profile?.personalInfo?.location || 'PROFESSIONAL';
  const role = profile?.workExperience?.[0]?.role || 'PROFESSIONAL';

  return (
    <section
      id="achievements"
      className="relative"
      style={{
        minHeight: '960px',
        backgroundColor: '#C9340A',
        backgroundImage: 'repeating-linear-gradient(180deg, transparent, transparent 39px, rgba(0,0,0,0.04) 40px)',
        paddingTop: '80px',
        paddingBottom: '80px',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 2px, transparent 2px)',
          backgroundSize: '8px 8px', pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: '#F5EDD8', letterSpacing: '0.4em', marginBottom: '12px' }}>
            ★ HALL OF FAME ★
          </div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '72px', color: '#F5EDD8', lineHeight: '0.9', marginBottom: '24px' }}>
            NOTABLE ACHIEVEMENTS
          </div>
          <div style={{ width: '600px', height: '3px', backgroundColor: '#1A1208', margin: '0 auto' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${achievements.length}, 1fr)`,
            gap: '24px',
            padding: '0 80px',
            marginBottom: '56px',
          }}
        >
          {achievements.map((achievement, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#F5EDD8',
                border: '3px solid #1A1208',
                boxShadow: '6px 6px 0 #1A1208',
                overflow: 'hidden',
              }}
            >
              <div style={{ height: '4px', backgroundColor: '#1A1208' }} />
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif', fontSize: '104px',
                    color: '#C9340A', textShadow: '3px 3px 0 rgba(26,18,8,0.2)', lineHeight: '1',
                  }}
                >
                  {achievement.stat}
                </div>
                <div style={{ width: '80%', height: '2px', backgroundColor: '#1A1208', margin: '24px auto' }} />
                <div
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px',
                    color: '#1A1208', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px',
                  }}
                >
                  {achievement.label}
                </div>
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif', fontSize: '14px',
                    color: '#5C4030', lineHeight: '1.75', maxWidth: '280px', margin: '0 auto',
                  }}
                >
                  {achievement.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center" style={{ width: '100%', height: '48px', backgroundColor: '#1A1208' }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', color: '#C9340A', letterSpacing: '0.3em' }}>
            ★ {role.toUpperCase()} ★ {location.toUpperCase()} ★ POWERED BY RESUFLOW ★
          </div>
        </div>
      </div>
    </section>
  );
}
