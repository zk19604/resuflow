'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MapPin } from 'lucide-react';

export default function NeumorphismPage() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showToast, setShowToast] = useState('');
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // GET REAL PROFILE DATA FROM LOCALSTORAGE
    const stored = localStorage.getItem("resuflow_profile");
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'skills', 'work', 'contact'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(message);
    setTimeout(() => setShowToast(''), 2000);
  };

  // USE REAL PROFILE DATA
  const personalInfo = profile?.personalInfo || {};
  const name = personalInfo.name || "Your Name";
  const email = personalInfo.email || "";
  const phone = personalInfo.phone || "";
  const location = personalInfo.location || personalInfo.address || "";
  
  const workExperience = profile?.workExperience || [];
  const currentRole = workExperience[0] || {};
  const role = currentRole.role || "Professional";
  const company = currentRole.company || "";
  
  const summary = profile?.summary || personalInfo.summary || "";
  
  const technicalSkills = profile?.skills?.technical || [];
  const toolsSkills = profile?.skills?.tools || [];
  const softSkills = profile?.skills?.soft || [];
  const allSkills = [...technicalSkills, ...toolsSkills, ...softSkills].slice(0, 6);
  
  const education = profile?.education || [];
  const currentEducation = education[0] || {};
  
  const projects = profile?.projects || [];
  
  // Calculate stats from real data
  const projectCount = projects.length || workExperience.length || 0;
  const experienceYears = workExperience.length || 0;

  return (
    <div className="min-h-screen bg-[#E4E9F2]" style={{ animation: 'fadeIn 400ms ease' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        html {
          scroll-behavior: smooth;
        }
        .inter {
          font-family: 'Inter', -apple-system, sans-serif;
        }
        .neumorph {
          background: #E4E9F2;
          box-shadow: 8px 8px 16px rgba(163, 177, 198, 0.4),
                      -8px -8px 16px rgba(255, 255, 255, 0.7);
        }
        .neumorph-inset {
          background: #E4E9F2;
          box-shadow: inset 6px 6px 12px rgba(163, 177, 198, 0.3),
                      inset -6px -6px 12px rgba(255, 255, 255, 0.8);
        }
        .neumorph-card {
          background: #E4E9F2;
          box-shadow: 6px 6px 12px rgba(163, 177, 198, 0.3),
                      -6px -6px 12px rgba(255, 255, 255, 0.7);
          border-radius: 24px;
        }
        .neumorph-button {
          background: #E4E9F2;
          box-shadow: 4px 4px 8px rgba(163, 177, 198, 0.3),
                      -4px -4px 8px rgba(255, 255, 255, 0.7);
          border-radius: 40px;
          transition: all 150ms ease;
        }
        .neumorph-button:active {
          box-shadow: inset 3px 3px 6px rgba(163, 177, 198, 0.4),
                      inset -3px -3px 6px rgba(255, 255, 255, 0.6);
        }
        .transition-all {
          transition: all 200ms ease;
        }
      `}</style>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 neumorph-card inter px-6 py-3 z-50 text-sm text-[#3A4151]">
          {showToast}
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all inter ${
        scrolled ? 'bg-[#E4E9F2]/90 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="neumorph-button w-10 h-10 flex items-center justify-center rounded-full">
            <span className="text-[#3A4151] font-semibold text-lg">
              {name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          </div>
          
          <div className="hidden md:flex gap-4">
            {['Home', 'Skills', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`neumorph-button px-6 py-2.5 text-sm font-medium ${
                  activeSection === item.toLowerCase()
                    ? 'text-[#6B7B8D] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.6)]'
                    : 'text-[#5A6778]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden neumorph-button w-10 h-10 flex items-center justify-center rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-6">
            <div className="neumorph-card p-4 flex flex-col gap-3">
              {['Home', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="neumorph-button px-6 py-3 text-sm font-medium text-[#5A6778] w-full"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-20">
        <div className="max-w-5xl mx-auto">
          <div className="neumorph-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Avatar */}
              <div className="neumorph w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="neumorph-inset w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-[#6B7B8D]">
                    {name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-bold text-[#3A4151] mb-2 tracking-tight">
                  {name}
                </h1>
                <p className="text-lg text-[#6B7B8D] mb-2">{role}</p>
                <p className="text-sm text-[#8895A9] mb-4">{company}</p>
                {location && (
                  <p className="text-sm text-[#8895A9] mb-6 flex items-center justify-center md:justify-start gap-1">
                    <MapPin size={14} /> {location}
                  </p>
                )}
                
                {/* Stats */}
                <div className="flex justify-center md:justify-start gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#6B7B8D]">{projectCount}+</div>
                    <div className="text-xs text-[#8895A9] uppercase tracking-wider">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#6B7B8D]">{experienceYears}</div>
                    <div className="text-xs text-[#8895A9] uppercase tracking-wider">Experience</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Summary */}
            {summary && (
              <div className="mt-6 pt-6 border-t border-[#A3B1C6]/30">
                <p className="text-sm text-[#5A6778] italic">"{summary.slice(0, 200)}{summary.length > 200 ? '…' : ''}"</p>
              </div>
            )}
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => scrollToSection('skills')}
                className="neumorph-button px-8 py-3 text-sm font-semibold text-white"
                style={{ 
                  background: 'linear-gradient(145deg, #6B7B8D, #7B8D9D)',
                  boxShadow: '4px 4px 8px rgba(163, 177, 198, 0.4), -4px -4px 8px rgba(255, 255, 255, 0.6)'
                }}
              >
                View Skills
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="neumorph-button px-8 py-3 text-sm font-medium text-[#5A6778]"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3A4151] mb-2">Core Skills</h2>
            <div className="neumorph-inset w-20 h-1 rounded-full mx-auto"></div>
          </div>
          
          {allSkills.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allSkills.map((skill, index) => (
                <div key={index} className="neumorph-card p-5 text-center">
                  <span className="text-[#5A6778] font-medium">{skill}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Education */}
          {currentEducation.degree && (
            <div className="mt-12 neumorph-card p-6">
              <h3 className="text-lg font-semibold text-[#3A4151] mb-2">Education</h3>
              <p className="text-[#5A6778]">
                {currentEducation.degree}{currentEducation.field ? ` in ${currentEducation.field}` : ''}
              </p>
              <p className="text-sm text-[#8895A9]">{currentEducation.institution}</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="neumorph-card p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-[#3A4151] mb-4">Get In Touch</h2>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              {email && (
                <button
                  onClick={() => copyToClipboard(email, 'Email copied!')}
                  className="neumorph-button px-6 py-3 flex items-center justify-center gap-2 text-[#5A6778]"
                >
                  <Mail size={16} /> {email}
                </button>
              )}
              {phone && (
                <button
                  onClick={() => copyToClipboard(phone, 'Phone copied!')}
                  className="neumorph-button px-6 py-3 flex items-center justify-center gap-2 text-[#5A6778]"
                >
                  <Phone size={16} /> {phone}
                </button>
              )}
            </div>
            
            <div className="mt-12 pt-8 border-t border-[#A3B1C6]/30">
              <p className="text-xs text-[#8895A9] uppercase tracking-wider">
                Powered by ResuFlow
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}