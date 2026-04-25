import { useState } from 'react';
import { UserProfile } from '@/types/userProfile';

interface AboutProps {
  profile?: UserProfile;
}

export function About({ profile }: AboutProps) {
  const [activeTab, setActiveTab] = useState('story');

  const tabs = [
    { id: 'story', label: 'My Story' },
    { id: 'approach', label: 'My Approach' },
    { id: 'facts', label: 'Key Skills' },
  ];

  const name = profile?.personalInfo?.name || 'Morgan Hayes';
  const nameParts = name.split(' ');
  const initials = nameParts.map((p) => p[0]).join('').slice(0, 2).toUpperCase();

  const role = profile?.workExperience?.[0]?.role || 'Chief Operations Officer';
  const summary = profile?.summary || "I'm a professional with years of experience building operations that don't just function — they dominate. I specialize in turning complexity into scalable systems.";

  const yearsExp = (() => {
    const dates = (profile?.workExperience || [])
      .map((w) => parseInt((w.startDate || '').slice(0, 4)))
      .filter((y) => !isNaN(y));
    return dates.length ? new Date().getFullYear() - Math.min(...dates) : 16;
  })();

  const projectCount = profile?.projects?.length ?? 80;
  const clientCount = profile?.workExperience?.length ?? 12;

  const expertiseTags = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.domain || []),
    ...(profile?.skills?.soft || []),
  ].slice(0, 6);

  const fallbackTags = ['Operations', 'Supply Chain', 'Process Design', 'Cost Reduction', 'Team Scaling', 'Risk Mitigation'];
  const displayTags = expertiseTags.length > 0 ? expertiseTags : fallbackTags;

  const stats = [
    { label: 'PROJECTS', value: `${projectCount}+` },
    { label: 'ROLES', value: `${clientCount}+` },
    { label: 'YEARS', value: `${yearsExp}+` },
  ];

  return (
    <section
      id="about"
      className="relative"
      style={{
        minHeight: '920px',
        backgroundColor: '#F0E8D0',
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, rgba(139,101,74,0.08) 24px)',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          backgroundColor: '#1A1208',
          height: '80px',
          borderBottom: '3px solid #C9340A',
        }}
      >
        <span style={{ color: '#C9340A', fontSize: '24px', marginRight: '16px' }}>★</span>
        <span
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '28px',
            color: '#F5EDD8',
            letterSpacing: '0.3em',
          }}
        >
          THE {name.toUpperCase()} STORY
        </span>
        <span style={{ color: '#C9340A', fontSize: '24px', marginLeft: '16px' }}>★</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '28% 44% 28%',
          gap: '40px',
          padding: '64px 80px',
        }}
      >
        {/* Left card */}
        <div
          style={{
            backgroundColor: '#1A1208',
            border: '2px solid #1A1208',
            boxShadow: '4px 4px 0 #C9340A',
            borderRadius: '4px',
            padding: '40px',
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              backgroundColor: '#C9340A',
              border: '3px solid #F5EDD8',
              margin: '0 auto 20px',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: '28px',
              color: '#F5EDD8',
            }}
          >
            {initials}
          </div>

          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: '#F5EDD8', textAlign: 'center' }}>
            {name}
          </div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#9A8060', textAlign: 'center', marginTop: '4px' }}>
            {role}
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(245,237,216,0.15)', margin: '28px 0' }} />

          <div className="space-y-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between" style={{ padding: '16px 0' }}>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '9px', color: '#6A5040', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '44px', color: '#C9340A' }}>
                    {stat.value}
                  </div>
                </div>
                {index < 2 && (
                  <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(245,237,216,0.1)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center column */}
        <div style={{ padding: '0 20px' }}>
          <div className="flex items-center justify-center gap-4" style={{ marginBottom: '28px' }}>
            <div style={{ flex: 1, height: '2px', backgroundColor: '#1A1208' }} />
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '14px', color: '#C9340A', letterSpacing: '0.3em' }}>
              THE STORY
            </div>
            <div style={{ flex: 1, height: '2px', backgroundColor: '#1A1208' }} />
          </div>

          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '80px', color: '#1A1208', lineHeight: '0.9' }}>
            HELLO,
          </div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', color: '#C9340A', lineHeight: '0.9' }}>
            I&apos;M {name.toUpperCase()}
          </div>

          <div
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '16px',
              color: '#3D2B1A',
              lineHeight: '1.95',
              marginTop: '36px',
            }}
          >
            {summary}
          </div>

          <div
            style={{
              marginTop: '36px',
              backgroundColor: '#1A1208',
              border: '2px solid #1A1208',
              padding: '6px',
              display: 'flex',
              gap: '8px',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '14px',
                  padding: '12px 20px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === tab.id ? '#C9340A' : '#F5EDD8',
                  color: activeTab === tab.id ? '#F5EDD8' : '#1A1208',
                  boxShadow: activeTab === tab.id ? '2px 2px 0 #1A1208' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right card */}
        <div
          style={{
            backgroundColor: '#C9340A',
            border: '2px solid #1A1208',
            boxShadow: '4px 4px 0 #1A1208',
            borderRadius: '4px',
            padding: '32px',
          }}
        >
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '14px', color: '#F5EDD8', letterSpacing: '0.3em', textAlign: 'center' }}>
            AREAS OF
          </div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '36px', color: '#F5EDD8', textAlign: 'center', marginBottom: '24px' }}>
            EXPERTISE
          </div>
          <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(245,237,216,0.3)', marginBottom: '24px' }} />

          <div className="space-y-3">
            {displayTags.map((skill) => (
              <div
                key={skill}
                style={{
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(245,237,216,0.2)',
                  padding: '12px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '12px',
                  color: '#F5EDD8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
