// 'use client';
// import { useEffect, useRef, useState } from 'react';
 
// interface NeonContactProps {
//   profile?: {
//     personalInfo?: {
//       name?: string;
//       email?: string;
//       location?: string;
//       github?: string;
//       linkedin?: string;
//       website?: string;
//     };
//   };
// }
 
// export default function NeonContact({ profile }: NeonContactProps) {
//   const [visible, setVisible] = useState(false);
//   const ref = useRef<HTMLElement>(null);
 
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
 
//   const email    = profile?.personalInfo?.email    || 'hello@example.com';
//   const location = profile?.personalInfo?.location || 'Remote';
//   const github   = profile?.personalInfo?.github   || '#';
//   const linkedin = profile?.personalInfo?.linkedin || '#';
//   const name     = profile?.personalInfo?.name     || 'You';
 
//   return (
//     <>
//       <style>{`
//         @keyframes contact-in {
//           from { opacity:0; transform:translateY(24px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         .nv-contact-card {
//           opacity:0; animation: contact-in 0.6s ease both;
//         }
//         .nv-social-btn {
//           display:inline-flex; align-items:center; gap:8px;
//           padding:12px 24px; border-radius:999px;
//           border:1px solid rgba(148,163,184,0.2);
//           color:rgba(148,163,184,0.7); font-size:13px;
//           background:transparent; cursor:pointer;
//           transition:all 0.2s; text-decoration:none;
//         }
//         .nv-social-btn:hover {
//           border-color:rgba(6,182,212,0.5);
//           color:#22d3ee;
//           background:rgba(6,182,212,0.08);
//           transform:translateY(-2px);
//         }
//       `}</style>
 
//       <section
//         ref={ref}
//         id="contact"
//         style={{
//           padding: '100px 24px 80px',
//           textAlign: 'center',
//           opacity: visible ? 1 : 0,
//           transform: visible ? 'none' : 'translateY(24px)',
//           transition: 'opacity 0.7s ease, transform 0.7s ease',
//         }}
//       >
//         <div style={{ maxWidth: '700px', margin: '0 auto' }}>
//           <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#22d3ee', letterSpacing: '0.2em', marginBottom: '12px' }}>
//             &gt; CONTACT.INIT()
//           </p>
//           <h2
//             style={{
//               fontSize: 'clamp(28px, 5vw, 52px)',
//               fontWeight: 900,
//               fontFamily: "'Syne', sans-serif",
//               letterSpacing: '-0.03em',
//               margin: '0 0 16px',
//               background: 'linear-gradient(90deg, #fff 0%, #22d3ee 50%, #a855f7 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}
//           >
//             Let's Build Something
//           </h2>
//           <p style={{ fontSize: '16px', color: 'rgba(148,163,184,0.7)', lineHeight: 1.7, marginBottom: '40px' }}>
//             Open to freelance, full-time roles, and interesting collaborations.
//             <br />Based in {location}.
//           </p>
 
//           {/* main CTA */}
//           <a
//             href={`mailto:${email}`}
//             style={{
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '10px',
//               padding: '16px 40px',
//               borderRadius: '999px',
//               background: 'linear-gradient(90deg, #06b6d4, #9333ea)',
//               color: '#fff',
//               fontWeight: 700,
//               fontSize: '15px',
//               letterSpacing: '0.04em',
//               textDecoration: 'none',
//               boxShadow: '0 0 40px rgba(6,182,212,0.3), 0 0 80px rgba(147,51,234,0.2)',
//               transition: 'transform 0.2s, box-shadow 0.2s',
//               marginBottom: '32px',
//             }}
//             onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; }}
//             onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
//           >
//             <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//             Send a Message
//           </a>
 
//           {/* social links */}
//           <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
//             <a href={github} target="_blank" rel="noopener noreferrer" className="nv-social-btn">
//               <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
//               GitHub
//             </a>
//             <a href={linkedin} target="_blank" rel="noopener noreferrer" className="nv-social-btn">
//               <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
//               LinkedIn
//             </a>
//             <a href={`mailto:${email}`} className="nv-social-btn">
//               <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//               {email}
//             </a>
//           </div>
 
//           {/* divider */}
//           <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)', marginBottom: '32px' }} />
 
//           <p style={{ fontSize: '13px', color: 'rgba(148,163,184,0.35)', fontFamily: 'monospace' }}>
//             © {new Date().getFullYear()} {name} · Built with{' '}
//             <span style={{ color: '#22d3ee' }}>ResuFlow</span>
//           </p>
//         </div>
//       </section>
//     </>
//   );
// }

'use client';
import { useEffect, useRef, useState } from 'react';

interface NeonContactProps {
  profile?: {
    personalInfo?: {
      name?: string;
      email?: string;
      location?: string;
      github?: string;
      linkedin?: string;
      website?: string;
    };
  };
}

export default function NeonContact({ profile }: NeonContactProps) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const email = profile?.personalInfo?.email || 'hello@alexkim.dev';
  const location = profile?.personalInfo?.location || 'Seoul, Korea';
  const github = profile?.personalInfo?.github || 'https://github.com';
  const linkedin = profile?.personalInfo?.linkedin || 'https://linkedin.com';
  const name = profile?.personalInfo?.name || 'Alex Kim';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-wider mb-2">&gt; CONTACT.INIT()</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Let's Build <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Something</span>
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mt-3 sm:mt-4" />
          <p className="text-slate-400 text-sm sm:text-base mt-5 sm:mt-6 max-w-md mx-auto px-4">
            Open to freelance, full-time roles, and interesting collaborations.
            <br />Based in {location}.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-6 sm:gap-8 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}>
          {/* Contact Form */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-800">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Send a Message</h3>
            <form className="space-y-3 sm:space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm sm:text-base font-bold hover:scale-[1.02] transition-transform"
              >
                Send Message →
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-5 sm:space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Direct Contact</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-slate-500">Email</p>
                    <button onClick={copyEmail} className="text-slate-300 text-xs sm:text-sm hover:text-cyan-400 transition-colors flex items-center gap-2">
                      <span className="truncate">{email}</span>
                      <span className="text-[9px] sm:text-[10px] text-cyan-400 flex-shrink-0">{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-500">Location</p>
                    <p className="text-slate-300 text-xs sm:text-sm">{location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Social</h3>
              <div className="flex gap-3 sm:gap-4">
                <a href={github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-xl border border-slate-700 text-slate-400 hover:border-cyan-500 hover:text-cyan-400 transition-all text-sm">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span className="text-xs sm:text-sm">GitHub</span>
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-xl border border-slate-700 text-slate-400 hover:border-purple-500 hover:text-purple-400 transition-all text-sm">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-xs sm:text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 text-center border-t border-slate-800">
          <p className="text-[10px] sm:text-xs text-slate-500 font-mono">
            © {new Date().getFullYear()} {name} · Built with{' '}
            <span className="text-cyan-400">ResuFlow</span>
          </p>
        </div>
      </div>
    </section>
  );
}