import Image from 'next/image';
import { UserProfile } from '@/types/userProfile';

const AVATAR_URL = "https://images.unsplash.com/photo-1763970540972-9479a63d6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduZXIlMjBwb3J0cmFpdCUyMGRhcmslMjBzdHVkaW98ZW58MXx8fHwxNzcyNjM2MDIzfDA&ixlib=rb-4.1.0&q=80&w=400";

interface AboutSectionProps {
  profile: UserProfile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const stats = [
    { value: profile.workExperience.length > 0 ? `${new Date().getFullYear() - new Date(profile.workExperience[0].startDate).getFullYear()} Years` : '0 Years', label: 'Experience', icon: '◆' },
    { value: String(profile.projects.length || 0), label: 'Projects', icon: '◈' },
    { value: '—', label: 'Location', icon: '◉' },
  ];
  return (
    <section id="about" style={{ padding: '120px 0', position: 'relative', zIndex: 2, width: '100%' }}>
      <div
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          borderBottom: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
          padding: '80px 80px',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          {/* Left: Avatar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: -8,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(123,47,255,0.6), rgba(26,111,255,0.4))',
                  filter: 'blur(16px)',
                  boxShadow: '0 0 60px rgba(123,47,255,0.55)',
                }}
              />
              <Image
                src={AVATAR_URL}
                alt="Alex Morgan"
                width={280}
                height={280}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  position: 'relative',
                  border: '2px solid rgba(255,255,255,0.15)',
                  filter: 'brightness(0.92) saturate(1.1)',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Right: Bio */}
          <div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 10,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: 20,
              }}
            >
              About Me
            </div>

            <h2
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 36,
                color: '#FFFFFF',
                lineHeight: 1.2,
                marginBottom: 28,
              }}
            >
              Designing futures,<br />one pixel at a time.
            </h2>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.60)', lineHeight: 1.75, marginBottom: 16 }}>
              {profile.summary || 'Passionate professional dedicated to creating meaningful digital experiences.'}
            </p>

            {/* Stat chips */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {stats.map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    borderRadius: 100,
                    padding: '10px 18px',
                  }}
                >
                  <span style={{ fontSize: 12, background: 'linear-gradient(135deg,#7B2FFF,#1A6FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {s.icon}
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#FFFFFF' }}>{s.value}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
