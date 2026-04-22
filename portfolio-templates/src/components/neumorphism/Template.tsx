'use client';

import { UserProfile, PortfolioConfig } from '@/types/userProfile';
import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { About, Statistics } from './AboutAndStats';
import { Skills } from './ServicesAndSkills';
import { Portfolio } from './Portfolio';
import './neumorphism.css';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

// Custom SVG Icons for social media (since lucide-react doesn't have them)
const LinkedinIcon = ({ size = 20, color = '#E8B29B' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 20, color = '#E8B29B' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface NeumorphismTemplateProps {
  profile: UserProfile;
  config: PortfolioConfig;
}

// Contact Section Component
function ContactSection({ profile }: { profile: any }) {
  const personalInfo = profile?.personalInfo || {};
  const email = personalInfo.email || '';
  const phone = personalInfo.phone || '';
  const location = personalInfo.location || '';
  const linkedin = personalInfo.linkedin || '';
  const github = personalInfo.github || '';
  const website = personalInfo.website || personalInfo.portfolio || '';
  
  const hasContact = email || phone || location || linkedin || github || website;
  
  if (!hasContact) return null;
  
  return (
    <section id="contact" className="bg-[#E8E3DC] py-28 lg:py-40 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <h2
          className="font-serif mb-16 text-center"
          style={{ fontSize: 'clamp(40px, 6vw, 56px)', color: '#3D3830', fontWeight: 400 }}
        >
          Get In Touch
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="p-8 lg:p-12 rounded-[32px] bg-[#E8E3DC] shadow-raised-lg">
            <p
              className="text-center mb-12"
              style={{
                fontFamily: 'DM Sans',
                fontSize: '18px',
                color: '#7A7268',
                lineHeight: 1.8,
              }}
            >
              I'm always interested in hearing about new opportunities, 
              collaborations, or just having a chat about technology and development.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="p-6 rounded-2xl bg-[#E8E3DC] shadow-raised hover:shadow-raised-lg transition-all flex items-center gap-4"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#E8E3DC] shadow-raised-sm flex items-center justify-center">
                    <Mail size={20} color="#E8B29B" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#A09890' }}>Email</div>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '15px', color: '#3D3830', fontWeight: 600 }}>
                      {email}
                    </div>
                  </div>
                </a>
              )}
              
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="p-6 rounded-2xl bg-[#E8E3DC] shadow-raised hover:shadow-raised-lg transition-all flex items-center gap-4"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#E8E3DC] shadow-raised-sm flex items-center justify-center">
                    <Phone size={20} color="#E8B29B" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#A09890' }}>Phone</div>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '15px', color: '#3D3830', fontWeight: 600 }}>
                      {phone}
                    </div>
                  </div>
                </a>
              )}
              
              {location && (
                <div className="p-6 rounded-2xl bg-[#E8E3DC] shadow-raised flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E8E3DC] shadow-raised-sm flex items-center justify-center">
                    <MapPin size={20} color="#E8B29B" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#A09890' }}>Location</div>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '15px', color: '#3D3830', fontWeight: 600 }}>
                      {location}
                    </div>
                  </div>
                </div>
              )}
              
              {(linkedin || github || website) && (
                <div className="p-6 rounded-2xl bg-[#E8E3DC] shadow-raised">
                  <div style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#A09890', marginBottom: '12px' }}>
                    Social & Web
                  </div>
                  <div className="flex gap-4">
                    {linkedin && (
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#E8E3DC] shadow-raised-sm flex items-center justify-center hover:shadow-raised transition-all"
                      >
                        <LinkedinIcon size={18} color="#E8B29B" />
                      </a>
                    )}
                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#E8E3DC] shadow-raised-sm flex items-center justify-center hover:shadow-raised transition-all"
                      >
                        <GithubIcon size={18} color="#E8B29B" />
                      </a>
                    )}
                    {website && (
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#E8E3DC] shadow-raised-sm flex items-center justify-center hover:shadow-raised transition-all"
                      >
                        <Globe size={18} color="#E8B29B" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {email && (
              <div className="mt-8 text-center">
                <a
                  href={`mailto:${email}?subject=Hello ${personalInfo.name || ''}`}
                  className="inline-block px-8 py-4 rounded-xl gradient-accent text-white shadow-accent transition-shadow hover:shadow-accent-lg"
                  style={{ 
                    fontFamily: 'DM Sans', 
                    fontSize: '15px', 
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Send Me a Message
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        .shadow-raised {
          box-shadow: -6px -6px 12px rgba(255,252,247,0.8), 6px 6px 12px rgba(163,156,146,0.4);
        }
        .shadow-raised-sm {
          box-shadow: -3px -3px 6px rgba(255,252,247,0.6), 3px 3px 6px rgba(163,156,146,0.3);
        }
        .shadow-raised-lg {
          box-shadow: -8px -8px 16px rgba(255,252,247,0.9), 8px 8px 16px rgba(163,156,146,0.5);
        }
        .shadow-accent {
          box-shadow: 0 4px 12px rgba(139,115,85,0.3);
        }
        .shadow-accent-lg {
          box-shadow: 0 6px 18px rgba(139,115,85,0.4);
        }
        .gradient-accent {
          background: linear-gradient(135deg, #8B7355 0%, #D3A29D 100%);
        }
      `}</style>
    </section>
  );
}

export function NeumorphismTemplate({ profile, config }: NeumorphismTemplateProps) {
  const visible = config?.sectionsVisible || {};
  const isVisible = (section: string) => visible[section.toLowerCase()] !== false;

  return (
    <main className="neumorphism-template">
      <Navigation profile={profile} />
      <Hero profile={profile} />
      
      {isVisible('about') && <About profile={profile} />}
      
      <Statistics profile={profile} />
      
      {isVisible('skills') && <Skills profile={profile} />}
      
      {isVisible('work') && <Portfolio profile={profile} />}
      
      {isVisible('contact') && <ContactSection profile={profile} />}
      
      {/* Footer */}
      <footer style={{ 
        background: '#DEDAD3', 
        padding: '40px 24px', 
        textAlign: 'center' 
      }}>
        <div className="section-divider max-w-[1400px] mx-auto mb-8" />
        <p style={{ 
          fontFamily: 'DM Sans', 
          fontSize: '12px', 
          color: '#A09890' 
        }}>
          © {new Date().getFullYear()} {profile?.personalInfo?.name || 'Your Name'}. 
          Built with ResuFlow
        </p>
      </footer>
    </main>
  );
}