import { useState } from 'react';
import { UserProfile } from '@/types/userProfile';

interface AvailabilityBadgeProps {
  profile: UserProfile;
}

export default function AvailabilityBadge({ profile }: AvailabilityBadgeProps) {
  const [expanded, setExpanded] = useState(false);

  // Link to email if available, otherwise the contact section
  const contactHref = profile.personalInfo.email
    ? `mailto:${profile.personalInfo.email}`
    : '#contact';

  return (
    <div
      className="fixed bottom-8 left-8 z-40 transition-all duration-300"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        background: 'rgba(20, 20, 24, 0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(201, 169, 110, 0.15)',
        borderRadius: '2px',
        padding: '8px 14px',
        width: expanded ? '160px' : '140px',
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full relative"
          style={{ background: '#6B9E6B' }}
        >
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: '#6B9E6B',
              animationDuration: '2s',
            }}
          />
        </div>
        <span
          className="text-xs transition-all duration-300"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-secondary)',
          }}
        >
          {expanded ? (
            <a
              href={contactHref}
              className="hover:text-[var(--gold-primary)] transition-colors"
            >
              Book a call →
            </a>
          ) : (
            'Open for work'
          )}
        </span>
      </div>
    </div>
  );
}
