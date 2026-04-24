

'use client';
import { useEffect, useState } from 'react';

export default function NeonBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
        {/* Animated gradient orbs */}
        <div 
          className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"
          style={{ animationDuration: '6s' }}
        />
        <div 
          className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-600/20 blur-[120px] animate-pulse"
          style={{ animationDuration: '8s', animationDelay: '1s' }}
        />
        <div 
          className="absolute top-[40%] left-[30%] h-[400px] w-[400px] rounded-full bg-pink-600/10 blur-[100px] animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="fixed inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, #22d3ee08 1px, transparent 1px),
            linear-gradient(to bottom, #22d3ee08 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Noise overlay */}
      <div 
        className="fixed inset-0 -z-5 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px'
        }}
      />
    </>
  );
}