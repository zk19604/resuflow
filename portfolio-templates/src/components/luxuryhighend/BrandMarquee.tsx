'use client';
import { UserProfile } from '@/types/userProfile';

export default function BrandMarquee({ profile }: { profile: UserProfile }) {
  const experienceCompanies = profile.workExperience.map((w) => w.company).filter(Boolean);
  const toolNames = profile.skills.tools.slice(0, 6);
  const rawBrands = [...experienceCompanies, ...toolNames].slice(0, 10);
  const brands = rawBrands.length >= 3 ? rawBrands : ['Experience', 'Leadership', 'Innovation', 'Strategy', 'Execution', 'Growth'];
  const marqueeItems = [...brands, ...brands, ...brands];
  const label = experienceCompanies.length >= 2 ? 'Collaborated with' : profile.skills.tools.length >= 3 ? 'Technologies & tools' : 'Professional experience';

  return (
    <section style={{ position: 'relative', padding: '48px 0', borderTop: '1px solid rgba(201,169,110,0.06)', borderBottom: '1px solid rgba(201,169,110,0.06)', overflow: 'hidden', background: 'var(--bg-alt)' }}>
      <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 32 }}>{label}</p>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 10, background: 'linear-gradient(to right, var(--bg-alt) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 10, background: 'linear-gradient(to left, var(--bg-alt) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 30s linear infinite' }}>
          {marqueeItems.map((brand, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', margin: '0 32px', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: 'var(--text-tertiary)' }}>
              {brand}
              <span style={{ margin: '0 32px', color: 'var(--gold-primary)' }}>·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
    </section>
  );
}
