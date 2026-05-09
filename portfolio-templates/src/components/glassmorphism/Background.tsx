import { PortfolioConfig } from '@/types/userProfile';

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

interface BackgroundProps {
  palette?: PortfolioConfig['palette'];
}

export function Background({ palette }: BackgroundProps) {
  const base   = palette?.colors?.[0] || '#080810';
  const orb1   = hexToRgba(palette?.colors?.[1] || '#7B2FFF', 0.55);
  const orb2   = hexToRgba(palette?.colors?.[4] || '#1A6FFF', 0.50);
  const orb3   = hexToRgba(palette?.colors?.[2] || '#FF2D78', 0.42);
  const orb4   = hexToRgba(palette?.colors?.[3] || '#00D4C8', 0.35);
  const orb5   = hexToRgba(palette?.colors?.[1] || '#7B2FFF', 0.30);
  const orb6   = hexToRgba(palette?.colors?.[4] || '#1A6FFF', 0.28);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base */}
      <div className="absolute inset-0" style={{ background: base }} />

      {/* Orb 1 — top-right */}
      <div
        className="absolute orb-drift-1"
        style={{
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orb1} 0%, transparent 70%)`,
          filter: 'blur(120px)',
          top: '-120px',
          right: '80px',
        }}
      />

      {/* Orb 2 — bottom-left */}
      <div
        className="absolute orb-drift-2"
        style={{
          width: 650,
          height: 650,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orb2} 0%, transparent 70%)`,
          filter: 'blur(140px)',
          bottom: '80px',
          left: '-60px',
        }}
      />

      {/* Orb 3 — center-far-left */}
      <div
        className="absolute orb-drift-3"
        style={{
          width: 580,
          height: 580,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orb3} 0%, transparent 70%)`,
          filter: 'blur(150px)',
          top: '35%',
          left: '-40px',
        }}
      />

      {/* Orb 4 — bottom-right mid */}
      <div
        className="absolute orb-drift-4"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orb4} 0%, transparent 70%)`,
          filter: 'blur(130px)',
          bottom: '200px',
          right: '120px',
        }}
      />

      {/* Orb 5 — mid-center */}
      <div
        className="absolute orb-drift-5"
        style={{
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orb5} 0%, transparent 70%)`,
          filter: 'blur(160px)',
          top: '55%',
          left: '40%',
        }}
      />

      {/* Orb 6 — top-left subtle */}
      <div
        className="absolute orb-drift-6"
        style={{
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orb6} 0%, transparent 70%)`,
          filter: 'blur(120px)',
          top: '20%',
          left: '30%',
        }}
      />
    </div>
  );
}
