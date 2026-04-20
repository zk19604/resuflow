import { UserProfile } from '@/types/userProfile';

interface BrandMarqueeProps {
  profile: UserProfile;
}

export default function BrandMarquee({ profile }: BrandMarqueeProps) {
  // Extract company names from work experience; fall back to skill tools if too few
  const experienceCompanies = profile.workExperience
    .map((w) => w.company)
    .filter(Boolean);

  const toolNames = profile.skills.tools.slice(0, 6);

  // Merge: prefer companies, pad with tools if needed, cap at 10
  const rawBrands = [...experienceCompanies, ...toolNames].slice(0, 10);

  // Need at least a few items to look good — use defaults if profile is empty
  const brands =
    rawBrands.length >= 3
      ? rawBrands
      : ['Experience', 'Leadership', 'Innovation', 'Strategy', 'Execution', 'Growth'];

  // Triple the array so the marquee loop is seamless
  const marqueeItems = [...brands, ...brands, ...brands];

  const label =
    experienceCompanies.length >= 2
      ? 'Collaborated with'
      : profile.skills.tools.length >= 3
      ? 'Technologies & tools'
      : 'Professional experience';

  return (
    <section
      className="relative py-12 border-t border-b overflow-hidden"
      style={{
        background: 'var(--bg-alt)',
        borderColor: 'rgba(201, 169, 110, 0.06)',
      }}
    >
      <p
        className="text-center text-xs tracking-[0.15em] uppercase mb-8"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--text-tertiary)',
        }}
      >
        {label}
      </p>

      <div className="relative">
        {/* Gradient Masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--bg-alt) 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, var(--bg-alt) 0%, transparent 100%)',
          }}
        />

        {/* Marquee */}
        <div className="flex whitespace-nowrap animate-marquee">
          {marqueeItems.map((brand, index) => (
            <span
              key={index}
              className="inline-flex items-center mx-8 transition-colors duration-400 hover:text-[var(--text-secondary)]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                fontWeight: 300,
                color: 'var(--text-tertiary)',
              }}
            >
              {brand}
              <span className="mx-8" style={{ color: 'var(--gold-primary)' }}>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
