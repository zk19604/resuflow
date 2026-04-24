// 'use client';
// import { useEffect, useRef, useState } from 'react';

// interface ExperienceItem {
//   role: string;
//   company: string;
//   duration?: string;
//   startDate?: string;
//   endDate?: string;
//   description: string;
//   achievements?: string[];
//   projectsShipped?: number;
//   usersReached?: number;
// }

// interface NeonWorkProps {
//   experience?: ExperienceItem[];
// }

// export default function NeonWork({ experience }: NeonWorkProps) {
//   const [visible, setVisible] = useState(false);
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) setVisible(true);
//     }, { threshold: 0.1, rootMargin: '50px' });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);

//   const entries = experience && experience.length > 0 ? experience.map(exp => ({
//     ...exp,
//     duration: exp.duration || [exp.startDate, exp.endDate || 'Present'].filter(Boolean).join(' — '),
//   })) : [
//     {
//       role: 'Lead Frontend Engineer',
//       company: 'NovaTech Labs',
//       location: 'Seoul, South Korea',
//       duration: '2022 — Present',
//       projectsShipped: 14,
//       usersReached: 12000,
//       description: 'Led a team of 6 engineers shipping 14 production-grade products serving 12,000 monthly active users. Rebuilt core UI architecture cutting load time by 60% and lifting accessibility scores to 98/100.',
//     },
//     {
//       role: 'UI Engineer',
//       company: 'Pulse Digital',
//       location: 'Tokyo, Japan',
//       duration: '2020 — 2022',
//       projectsShipped: 8,
//       usersReached: 40000,
//       description: 'Designed and developed responsive web applications for 8 global clients. Grew the flagship product to 40,000 monthly active users within 6 months of launch.',
//     },
//     {
//       role: 'Junior Developer',
//       company: 'Startup Lab',
//       location: 'Seoul, Korea',
//       duration: '2019 — 2020',
//       description: 'Started professional career building MVPs for early-stage startups. Developed full-stack prototypes and learned production engineering best practices.',
//     },
//   ];

//   return (
//     <section id="experience" ref={ref} className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-950/30">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-10 sm:mb-12">
//           <p className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-wider mb-2">&gt; EXPERIENCE.LOAD()</p>
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
//             Mission <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">History</span>
//           </h2>
//           <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mt-3 sm:mt-4" />
//         </div>

//         <div className="relative">
//           {/* Timeline line - hidden on mobile */}
//           <div className="hidden md:block absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

//           {entries.map((exp, index) => (
//             <div
//               key={index}
//               className={`relative mb-12 sm:mb-16 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//               style={{ transitionDelay: `${index * 150}ms`, transition: 'all 0.6s ease' }}
//             >
//               <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
//                 {/* Content */}
//                 <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:text-right'}`}>
//                   <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-cyan-500/50 transition-all group">
//                     <div className="flex flex-wrap justify-between items-start gap-2 mb-2 sm:mb-3">
//                       <h3 className={`text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors ${index % 2 === 0 ? '' : 'md:text-right'}`}>
//                         {exp.role}
//                       </h3>
//                       <span className="text-[10px] sm:text-xs font-mono text-cyan-400 px-2 py-1 rounded bg-cyan-500/10 whitespace-nowrap">
//                         {exp.duration}
//                       </span>
//                     </div>
//                     <p className={`text-purple-400 font-medium text-xs sm:text-sm mb-2 sm:mb-3 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
//                       {exp.company}
//                     </p>
//                     <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
//                       {exp.description}
//                     </p>
//                     {(exp.projectsShipped || exp.usersReached) && (
//                       <div className={`flex gap-3 sm:gap-4 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-800 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
//                         {exp.projectsShipped && (
//                           <div className="text-center">
//                             <div className="text-base sm:text-lg font-bold text-cyan-400">{exp.projectsShipped}+</div>
//                             <div className="text-[8px] sm:text-[10px] text-slate-500">PROJECTS SHIPPED</div>
//                           </div>
//                         )}
//                         {exp.usersReached && (
//                           <div className="text-center">
//                             <div className="text-base sm:text-lg font-bold text-purple-400">{exp.usersReached.toLocaleString()}+</div>
//                             <div className="text-[8px] sm:text-[10px] text-slate-500">USERS REACHED</div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Timeline dot - hidden on mobile */}
//                 <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/50" />
                
//                 <div className="flex-1 hidden md:block" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';
import { useEffect, useRef, useState } from 'react';
import type { WorkExperience } from '@/types/userProfile';

interface NeonWorkProps {
  experience?: WorkExperience[];
}

export default function NeonWork({ experience }: NeonWorkProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1, rootMargin: '50px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // If no experience, don't render anything
  if (!experience || experience.length === 0) {
    return null;
  }

  // Helper function to safely get achievements array
  const getAchievementsArray = (achievements: any): string[] => {
    if (!achievements) return [];
    if (Array.isArray(achievements)) return achievements;
    if (typeof achievements === 'string') return [achievements];
    return [];
  };

  return (
    <section id="experience" ref={ref} className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-950/30">
      <div className="max-w-4xl mx-auto">
        {/* Centered Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-wider mb-2">&gt; EXPERIENCE.LOAD()</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Mission <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">History</span>
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mt-3 sm:mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line - centered */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

          {experience.map((exp, index) => {
            const duration = `${exp.startDate || 'Start'} — ${exp.endDate || 'Present'}`;
            const achievementsArray = getAchievementsArray(exp.achievements);
            
            return (
              <div
                key={index}
                className={`relative mb-12 sm:mb-16 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ 
                  transitionDelay: `${index * 150}ms`, 
                  transition: 'all 0.6s ease' 
                }}
              >
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  {/* Content - alternating sides */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-cyan-500/50 transition-all group">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2 sm:mb-3">
                        <h3 className={`text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                          {exp.role}
                        </h3>
                        <span className="text-[10px] sm:text-xs font-mono text-cyan-400 px-2 py-1 rounded bg-cyan-500/10 whitespace-nowrap">
                          {duration}
                        </span>
                      </div>
                      <p className={`text-purple-400 font-medium text-xs sm:text-sm mb-2 sm:mb-3 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        {exp.company}
                      </p>
                      <p className={`text-slate-400 text-xs sm:text-sm leading-relaxed ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        {exp.description}
                      </p>
                      {achievementsArray.length > 0 && (
                        <div className={`flex flex-wrap gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-800 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
                          {achievementsArray.slice(0, 2).map((achievement, i) => (
                            <span key={i} className="text-[10px] sm:text-xs text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-full">
                              ✦ {achievement}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline dot - centered */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/50" />
                  
                  <div className="flex-1 hidden md:block" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}