// // This tells TypeScript exactly what to expect
// interface HeroProps {
//   name: string;
//   title: string;
// }

// export default function NeonHero({ name, title }: HeroProps) {
//   return (
//     <section className="flex flex-col items-center justify-center py-20 text-center">
//       <h1 className="text-6xl font-bold tracking-tighter text-white sm:text-7xl font-syne">
//         <span className="bg-gradient-to-b from-white to-purple-400 bg-clip-text text-transparent">
//           {name}
//         </span>
//       </h1>
//       <div className="mt-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
//         {title}
//       </div>
//     </section>
//   );
// }

'use client';
import { useEffect, useState } from 'react';

interface HeroProps {
  name: string;
  title: string;
  location?: string;
  bio?: string;
  stats?: {
    years: number;
    projects: number;
    users: number;
  };
}

export default function NeonHero({ name, title, location, bio, stats }: HeroProps) {
  const [counters, setCounters] = useState({ years: 0, projects: 0, users: 0 });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!stats || !animated) return;
    
    const duration = 2000;
    const step = 20;
    const incrementYears = stats.years / (duration / step);
    const incrementProjects = stats.projects / (duration / step);
    const incrementUsers = stats.users / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= duration) {
        setCounters({ years: stats.years, projects: stats.projects, users: stats.users });
        clearInterval(timer);
      } else {
        setCounters({
          years: Math.min(Math.floor(incrementYears * (current / step)), stats.years),
          projects: Math.min(Math.floor(incrementProjects * (current / step)), stats.projects),
          users: Math.min(Math.floor(incrementUsers * (current / step)), stats.users),
        });
      }
    }, step);

    return () => clearInterval(timer);
  }, [stats, animated]);

  const defaultStats = stats || { years: 4, projects: 60, users: 12000 };
  const displayStats = counters.years === 0 ? defaultStats : counters;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-28 pb-16">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6 sm:mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-wider">AVAILABLE FOR WORK</span>
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-3 sm:mb-4 animate-slide-up">
          <span className="bg-gradient-to-r from-white via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {name.split(' ')[0] || 'Alex'}
          </span>
          <br />
          <span className="text-white">{name.split(' ').slice(1).join(' ') || 'Kim'}</span>
        </h1>

        {/* Title + Location */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-6 animate-slide-up animation-delay-100">
          <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm">
            {title || 'Full Stack Developer'}
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location || 'Seoul, Korea'}
          </span>
        </div>

        {/* Bio */}
        <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed mb-8 sm:mb-12 animate-slide-up animation-delay-200 px-4">
          {bio || "I build fast, scalable web products with clean code and bold design. 4+ years shipping full-stack applications from concept to production."}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto mb-8 sm:mb-12 animate-slide-up animation-delay-300">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{displayStats.years}+</div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-mono mt-1">YEARS EXP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{displayStats.projects}+</div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-mono mt-1">PROJECTS</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{displayStats.users.toLocaleString()}+</div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-mono mt-1">ACTIVE USERS</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-slide-up animation-delay-400">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-5 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm sm:text-base font-bold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/25"
          >
            Get In Touch
          </button>
          <button
            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-5 sm:px-8 py-2.5 sm:py-3 rounded-full border border-slate-700 text-slate-300 text-sm sm:text-base font-bold hover:border-cyan-500 hover:text-cyan-400 transition-all"
          >
            View Work ↓
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.6s ease-out forwards;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
      `}</style>
    </section>
  );
}