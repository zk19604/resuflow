import { UserProfile } from '@/types/userProfile';

interface FooterProps {
  profile: UserProfile;
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '24px 80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          {profile?.personalInfo?.name || 'Portfolio'} © {new Date().getFullYear()}
        </span>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          Crafted with depth.
        </span>
      </div>
    </footer>
  );
}
