export function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base */}
      <div className="absolute inset-0" style={{ background: '#080810' }} />

      {/* Orb 1 — Electric Violet top-right */}
      <div
        className="absolute orb-drift-1"
        style={{
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,47,255,0.55) 0%, transparent 70%)',
          filter: 'blur(120px)',
          top: '-120px',
          right: '80px',
        }}
      />

      {/* Orb 2 — Cobalt Blue bottom-left */}
      <div
        className="absolute orb-drift-2"
        style={{
          width: 650,
          height: 650,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,111,255,0.50) 0%, transparent 70%)',
          filter: 'blur(140px)',
          bottom: '80px',
          left: '-60px',
        }}
      />

      {/* Orb 3 — Rose Magenta center-far-left */}
      <div
        className="absolute orb-drift-3"
        style={{
          width: 580,
          height: 580,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,45,120,0.42) 0%, transparent 70%)',
          filter: 'blur(150px)',
          top: '35%',
          left: '-40px',
        }}
      />

      {/* Orb 4 — Teal bottom-right mid */}
      <div
        className="absolute orb-drift-4"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,200,0.35) 0%, transparent 70%)',
          filter: 'blur(130px)',
          bottom: '200px',
          right: '120px',
        }}
      />

      {/* Orb 5 — Violet mid-center */}
      <div
        className="absolute orb-drift-5"
        style={{
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,47,255,0.30) 0%, transparent 70%)',
          filter: 'blur(160px)',
          top: '55%',
          left: '40%',
        }}
      />

      {/* Orb 6 — Cobalt top-left subtle */}
      <div
        className="absolute orb-drift-6"
        style={{
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,111,255,0.28) 0%, transparent 70%)',
          filter: 'blur(120px)',
          top: '20%',
          left: '30%',
        }}
      />
    </div>
  );
}
