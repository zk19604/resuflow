'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone } from 'lucide-react';

export default function HandcraftedPage() {
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
      
      const sections = ['work', 'about', 'contact'];
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

  // USE REAL PROFILE DATA WITH FALLBACKS
  const personalInfo = profile?.personalInfo || {};
  const name = personalInfo.name || "Your Name";
  const email = personalInfo.email || "";
  const phone = personalInfo.phone || "";
  const location = personalInfo.location || personalInfo.address || "";
  
  // Get role from first work experience
  const workExperience = profile?.workExperience || [];
  const currentRole = workExperience[0] || {};
  const role = currentRole.role || "Professional";
  const company = currentRole.company || "";
  
  // Get summary from profile
  const summary = profile?.summary || personalInfo.summary || "";
  
  // Get skills
  const technicalSkills = profile?.skills?.technical || [];
  const toolsSkills = profile?.skills?.tools || [];
  const softSkills = profile?.skills?.soft || [];
  const allSkills = [...technicalSkills, ...toolsSkills, ...softSkills].slice(0, 8);
  
  // Get education
  const education = profile?.education || [];
  const currentEducation = education[0] || {};
  
  // Get projects
  const projects = profile?.projects || [];
  
  // Calculate stats from real data
  const projectCount = projects.length || workExperience.length || 0;
  const experienceYears = workExperience.reduce((total: number, exp: any) => {
    // Simple calculation - can be improved with date parsing
    return total + 1;
  }, 0) || workExperience.length;

  return (
    <div className="min-h-screen bg-[#F9F6F0]" style={{ animation: 'fadeIn 400ms ease' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        html {
          scroll-behavior: smooth;
        }
        .cormorant {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .inter {
          font-family: 'Inter', -apple-system, sans-serif;
        }
        .transition-all {
          transition: all 200ms ease;
        }
      `}</style>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#3E3A36] text-[#F9F6F0] inter px-6 py-3 z-50 text-sm">
          {showToast}
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all inter ${
        scrolled ? 'bg-[#F9F6F0]/95 backdrop-blur-sm border-b border-[#C4724B]/20' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('hero')}
            className="cormorant text-2xl tracking-wide text-[#3E3A36] hover:text-[#C4724B] transition-all"
          >
            {name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
          </button>
          
          <div className="hidden md:flex items-center gap-12">
            {['About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`inter text-xs uppercase tracking-[0.2em] transition-all ${
                  activeSection === item.toLowerCase()
                    ? 'text-[#C4724B]'
                    : 'text-[#8B7E74] hover:text-[#3E3A36]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden text-[#3E3A36]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F9F6F0] border-t border-[#C4724B]/20 py-6">
            <div className="flex flex-col items-center gap-6">
              {['About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="inter text-xs uppercase tracking-[0.2em] text-[#8B7E74] hover:text-[#C4724B] transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-px bg-[#C4724B]/40"></div>
          </div>
          
          <h1 className="cormorant text-5xl md:text-7xl font-light text-[#3E3A36] mb-4 tracking-wide">
            {name}
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C4724B]/40"></span>
            <span className="inter text-sm uppercase tracking-[0.3em] text-[#C4724B]">
              {role}
            </span>
            <span className="w-8 h-px bg-[#C4724B]/40"></span>
          </div>
          
          <p className="inter text-sm text-[#8B7E74] mb-8">
            {[company, location].filter(Boolean).join(' · ')}
          </p>
          
          {summary && (
            <p className="cormorant text-xl md:text-2xl italic text-[#5A554F] max-w-3xl mx-auto mb-10 leading-relaxed">
              "{summary.slice(0, 150)}{summary.length > 150 ? '…' : ''}"
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 inter text-sm text-[#8B7E74] mb-12">
            {email && (
              <button 
                onClick={() => copyToClipboard(email, 'Email copied!')}
                className="flex items-center gap-2 hover:text-[#C4724B] transition-all"
              >
                <Mail size={14} /> {email}
              </button>
            )}
            {phone && (
              <button 
                onClick={() => copyToClipboard(phone, 'Phone copied!')}
                className="flex items-center gap-2 hover:text-[#C4724B] transition-all"
              >
                <Phone size={14} /> {phone}
              </button>
            )}
          </div>
          
          <button
            onClick={() => scrollToSection('about')}
            className="inline-block px-10 py-4 border-2 border-[#C4724B] text-[#C4724B] inter text-xs uppercase tracking-[0.2em] hover:bg-[#C4724B] hover:text-white transition-all"
          >
            View Profile
          </button>
        </div>
      </section>

      {/* Skills Section */}
      <section id="about" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inter text-xs uppercase tracking-[0.3em] text-[#C4724B]">Expertise</span>
            <div className="flex justify-center mt-4">
              <div className="w-12 h-px bg-[#C4724B]/30"></div>
            </div>
          </div>
          
          {allSkills.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allSkills.map((skill, index) => (
                <div
                  key={index}
                  className="border border-[#C4724B]/20 bg-[#F9F6F0] p-6 text-center hover:border-[#C4724B] transition-all cursor-default"
                >
                  <span className="cormorant text-lg text-[#3E3A36]">{skill}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Stats */}
          <div className="mt-16 flex justify-center gap-12">
            <div className="text-center">
              <div className="cormorant text-4xl text-[#C4724B]">{projectCount}+</div>
              <div className="inter text-xs uppercase tracking-wider text-[#8B7E74]">Projects</div>
            </div>
            <div className="text-center">
              <div className="cormorant text-4xl text-[#C4724B]">{experienceYears}</div>
              <div className="inter text-xs uppercase tracking-wider text-[#8B7E74]">Experience</div>
            </div>
          </div>
          
          {/* Education */}
          {currentEducation.degree && (
            <div className="mt-16 text-center">
              <span className="inter text-xs uppercase tracking-[0.3em] text-[#C4724B]">Education</span>
              <div className="flex justify-center mt-4 mb-6">
                <div className="w-12 h-px bg-[#C4724B]/30"></div>
              </div>
              <p className="cormorant text-xl text-[#3E3A36]">
                {currentEducation.degree}{currentEducation.field ? ` in ${currentEducation.field}` : ''}
              </p>
              <p className="inter text-sm text-[#8B7E74]">
                {currentEducation.institution}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section id="work" className="py-24 px-6 md:px-12 bg-[#F9F6F0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inter text-xs uppercase tracking-[0.3em] text-[#C4724B]">Featured Projects</span>
              <div className="flex justify-center mt-4">
                <div className="w-12 h-px bg-[#C4724B]/30"></div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {projects.slice(0, 4).map((project: any, index: number) => (
                <div key={index} className="group">
                  <div className="border border-[#C4724B]/20 bg-[#E8E4DC] h-48 flex items-center justify-center">
                    <span className="cormorant text-4xl text-[#C4724B]/30">{index + 1}</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="cormorant text-2xl text-[#3E3A36]">{project.name || `Project ${index + 1}`}</h3>
                    {project.description && (
                      <p className="inter text-sm text-[#8B7E74] mt-2">{project.description.slice(0, 80)}...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Footer */}
      <footer id="contact" className="bg-[#3E3A36] py-16 px-6 md:px-12 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="cormorant text-4xl md:text-5xl font-light mb-6">Connect</h2>
          
          {email && (
            <button
              onClick={() => copyToClipboard(email, 'Email copied!')}
              className="inline-block px-10 py-4 border-2 border-[#C4724B] text-[#C4724B] inter text-xs uppercase tracking-[0.2em] hover:bg-[#C4724B] hover:text-white transition-all mb-12"
            >
              {email}
            </button>
          )}
          
          <div className="flex justify-center gap-8 inter text-sm text-[#D4CFC4]">
            {phone && <span>{phone}</span>}
            {location && (
              <>
                {phone && <span className="text-[#C4724B]">◆</span>}
                <span>{location}</span>
              </>
            )}
          </div>
          
          <div className="mt-16 pt-8 border-t border-[#C4724B]/20">
            <div className="cormorant text-2xl tracking-wide mb-2">
              {name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <p className="inter text-xs uppercase tracking-[0.2em] text-[#8B7E74]">
              Powered by ResuFlow
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}