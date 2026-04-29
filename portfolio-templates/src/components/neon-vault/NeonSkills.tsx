// // interface SkillGroups {
// //   technical?: string[];
// //   tools?: string[];
// //   soft?: string[];
// //   domain?: string[];
// //   languages?: string[];
// // }

// // interface NeonSkillsProps {
// //   skills?: string[] | SkillGroups;
// // }

// // export default function NeonSkills({ skills }: NeonSkillsProps) {
// //   const skillList = Array.isArray(skills)
// //     ? skills
// //     : [
// //         ...(skills?.technical || []),
// //         ...(skills?.tools || []),
// //         ...(skills?.soft || []),
// //         ...(skills?.domain || []),
// //         ...(skills?.languages || []),
// //       ];

// //   return (
// //     <section className="py-12">
// //       <h2 className="font-syne text-2xl font-bold uppercase tracking-widest text-slate-400 mb-8">
// //         Technical Arsenal
// //       </h2>
// //       <div className="flex flex-wrap gap-4">
// //         {skillList.map((skill: string, index: number) => (
// //           <div 
// //             key={index}
// //             className="neon-border-purple bg-slate-900 border border-purple-500/30 px-6 py-2 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-purple-900/20"
// //           >
// //             <span className="mr-2 text-cyan-400">#</span>
// //             {skill}
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }


// 'use client';
// import { useEffect, useRef, useState } from 'react';

// interface SkillGroups {
//   technical?: string[];
//   tools?: string[];
//   soft?: string[];
//   domain?: string[];
//   languages?: string[];
// }

// interface NeonSkillsProps {
//   skills?: string[] | SkillGroups;
// }

// export default function NeonSkills({ skills }: NeonSkillsProps) {
//   const [visible, setVisible] = useState(false);
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) setVisible(true);
//     }, { threshold: 0.1, rootMargin: '50px' });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);

//   let categories: { title: string; items: string[] }[] = [];

//   if (Array.isArray(skills)) {
//     categories = [{ title: 'TECHNICAL ARSENAL', items: skills }];
//   } else if (skills) {
//     if (skills.technical?.length) categories.push({ title: 'TECH STACK', items: skills.technical });
//     if (skills.tools?.length) categories.push({ title: 'TOOLS', items: skills.tools });
//     if (skills.domain?.length) categories.push({ title: 'EXPERTISE', items: skills.domain });
//     if (skills.soft?.length) categories.push({ title: 'SOFT SKILLS', items: skills.soft });
//     if (skills.languages?.length) categories.push({ title: 'LANGUAGES', items: skills.languages });
//   }

//   if (categories.length === 0) {
//     categories = [{ title: 'TECH STACK', items: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Figma', 'AWS'] }];
//   }

//   const skillColors = [
//     'border-cyan-500/30 hover:border-cyan-500 hover:shadow-cyan-500/20',
//     'border-purple-500/30 hover:border-purple-500 hover:shadow-purple-500/20',
//     'border-pink-500/30 hover:border-pink-500 hover:shadow-pink-500/20',
//   ];

//   return (
//     <section id="skills" ref={ref} className="py-16 sm:py-20 px-4 sm:px-6">
//       <div className="max-w-5xl mx-auto">
//         <div className="text-center mb-10 sm:mb-12">
//           <p className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-wider mb-2">&gt; SKILLS.DEPLOY()</p>
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
//             Technical <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Arsenal</span>
//           </h2>
//           <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mt-3 sm:mt-4" />
//         </div>

//         {categories.map((category, catIdx) => (
//           <div key={catIdx} className="mb-10 sm:mb-12">
//             <h3 className="text-xs sm:text-sm font-mono text-slate-400 mb-3 sm:mb-4 tracking-wider">{category.title}</h3>
//             <div className="flex flex-wrap gap-2 sm:gap-3">
//               {category.items.map((skill: string, idx: number) => (
//                 <div
//                   key={idx}
//                   className={`group px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full border transition-all duration-300 ${
//                     skillColors[idx % skillColors.length]
//                   } bg-slate-900/50 backdrop-blur-sm hover:scale-105 hover:shadow-lg ${
//                     visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//                   }`}
//                   style={{ transitionDelay: `${(idx + catIdx * 10) * 30}ms` }}
//                 >
//                   <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
//                     {skill}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

'use client';
import { useEffect, useRef, useState } from 'react';
import type { Skills } from '@/types/userProfile';

interface NeonSkillsProps {
  skills?: Skills;
}

export default function NeonSkills({ skills }: NeonSkillsProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1, rootMargin: '50px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Only show categories that have actual items
  const categories = [
    { title: 'TECH STACK', items: skills?.technical || [], defaultItems: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'] },
    { title: 'TOOLS', items: skills?.tools || [], defaultItems: ['Figma', 'Git', 'Docker', 'Vercel'] },
    { title: 'EXPERTISE', items: skills?.domain || [], defaultItems: ['Full Stack', 'UI/UX Design', 'System Architecture'] },
    { title: 'SOFT SKILLS', items: skills?.soft || [], defaultItems: ['Leadership', 'Communication', 'Problem Solving'] },
    { title: 'LANGUAGES', items: skills?.languages || [], defaultItems: ['English', 'Korean'] },
  ].filter(cat => {
    // Show category if it has items from profile OR use defaults only if no skills provided at all
    const hasItems = cat.items.length > 0;
    const hasAnySkills = skills && Object.values(skills).some(arr => arr && arr.length > 0);
    return hasItems || (!hasAnySkills && cat.defaultItems.length > 0);
  }).map(cat => ({
    ...cat,
    displayItems: cat.items.length > 0 ? cat.items : cat.defaultItems
  }));

  // If no skills at all, show nothing
  if (categories.length === 0) return null;

  const skillColors = [
    'border-cyan-500/30 hover:border-cyan-500 hover:shadow-cyan-500/20',
    'border-purple-500/30 hover:border-purple-500 hover:shadow-purple-500/20',
    'border-pink-500/30 hover:border-pink-500 hover:shadow-pink-500/20',
    'border-emerald-500/30 hover:border-emerald-500 hover:shadow-emerald-500/20',
    'border-orange-500/30 hover:border-orange-500 hover:shadow-orange-500/20',
  ];

  return (
    <section id="skills" ref={ref} className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Centered Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-wider mb-2">&gt; SKILLS.DEPLOY()</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Technical <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Arsenal</span>
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mt-3 sm:mt-4" />
        </div>

        {/* Centered Categories */}
        <div className="space-y-10 sm:space-y-12">
          {categories.map((category, catIdx) => (
            <div key={catIdx} className="text-center">
              <h3 className="text-xs sm:text-sm font-mono text-slate-400 mb-3 sm:mb-4 tracking-wider">
                {category.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {category.displayItems.map((skill: string, idx: number) => (
                  <div
                    key={idx}
                    className={`group px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full border transition-all duration-300 ${
                      skillColors[idx % skillColors.length]
                    } bg-slate-900/50 backdrop-blur-sm hover:scale-105 hover:shadow-lg ${
                      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${(idx + catIdx * 10) * 30}ms` }}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}