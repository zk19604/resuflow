'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { UserProfile, PortfolioConfig } from '@/types/userProfile';

export function EditorialTemplate({ profile, config }: { profile: UserProfile; config: PortfolioConfig }) {
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAboutTab, setActiveAboutTab] = useState('story');
  const [activeSkillsFilter, setActiveSkillsFilter] = useState('all');
  const [expandedExperience, setExpandedExperience] = useState(0);
  const [activeWorkFilter, setActiveWorkFilter] = useState('all');
  const [modalProject, setModalProject] = useState<number | null>(null);
  const [showToast, setShowToast] = useState('');
  const [showFormSuccess, setShowFormSuccess] = useState(false);

  const visible = config?.sectionsVisible || {};
  const isVisible = (s: string) => visible[s] !== false;

  // Profile data
  const name = profile?.personalInfo?.name || 'Your Name';
  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || 'YOUR';
  const lastName = nameParts.slice(1).join(' ') || 'NAME';
  // Split last name for the editorial broken layout
  const lastNameMid = lastName.slice(0, Math.ceil(lastName.length / 2));
  const lastNameEnd = lastName.slice(Math.ceil(lastName.length / 2));

  const role = profile?.workExperience?.[0]?.role || profile?.personalInfo?.name || 'Professional';
  const location = profile?.personalInfo?.location || '';
  const email = profile?.personalInfo?.email || '';
  const linkedin = profile?.personalInfo?.linkedin || '';
  const summary = profile?.summary || '';

  const allSkills = [
    ...(profile?.skills?.technical || []).map(s => ({ name: s, category: 'technical', size: 'large' as const })),
    ...(profile?.skills?.domain || []).map(s => ({ name: s, category: 'domain', size: 'medium' as const })),
    ...(profile?.skills?.tools || []).map(s => ({ name: s, category: 'tools', size: 'small' as const })),
    ...(profile?.skills?.soft || []).map(s => ({ name: s, category: 'soft', size: 'small' as const })),
  ];

  const filteredSkills = activeSkillsFilter === 'all'
    ? allSkills
    : allSkills.filter(s => s.category === activeSkillsFilter);

  const experiences = (profile?.workExperience || []).map((exp, i) => ({
    number: String(i + 1).padStart(2, '0'),
    company: exp.company,
    role: exp.role,
    date: [exp.startDate, exp.endDate].filter(Boolean).join(' — '),
    impact: exp.description || '',
    achievements: Array.isArray(exp.achievements) ? exp.achievements : [],
    skills: [],
  }));

  const projects = (profile?.projects || []).map((p, i) => ({
    id: i + 1,
    number: String(i + 1).padStart(2, '0'),
    name: p.name,
    category: p.type || 'project',
    description: p.description || '',
    tools: (p.tools || []).join(', '),
    link: p.link || '',
  }));

  const workCategories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = activeWorkFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeWorkFilter);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
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
      const offset = 56;
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(message);
    setTimeout(() => setShowToast(''), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFormSuccess(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setShowFormSuccess(false), 3000);
  };

  return (
    <div className="bg-[#F5F0E8] scroll-smooth" style={{ animation: 'fadeIn 400ms ease' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.97); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        html { scroll-behavior: smooth; }
        .playfair { font-family: 'Playfair Display', serif; }
        .dm-sans { font-family: 'DM Sans', sans-serif; }
        *:focus-visible { outline: 1px solid #C8391A; outline-offset: 2px; }
        .drop-cap::first-letter {
          font-family: 'Playfair Display', serif;
          font-size: 64px; float: left; line-height: 0.9;
          margin-right: 8px; color: #C8391A;
        }
      `}</style>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#1A1A1A] text-[#F5F0E8] dm-sans px-6 py-3 z-50"
          style={{ animation: 'fadeIn 200ms ease' }}>
          {showToast}
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 h-14 bg-[#F5F0E8] border-b border-[#C8C4B8] z-40 transition-all ${scrolled ? 'backdrop-blur-sm bg-opacity-95' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-20 h-full flex items-center justify-between">
          <div className="playfair italic text-[13px] text-[#6B6B6B]">PORTFOLIO № 01</div>
          <div className="dm-sans text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A]">{name.toUpperCase()}</div>
          <div className="hidden md:flex gap-8">
            {['work', 'about', 'contact'].map((section) => (
              <button key={section} onClick={() => scrollToSection(section)}
                className={`dm-sans text-[11px] uppercase cursor-pointer transition-all ${activeSection === section ? 'text-[#C8391A] underline underline-offset-4' : 'text-[#1A1A1A] hover:text-[#C8391A]'}`}>
                {section}
              </button>
            ))}
          </div>
          <button className="md:hidden cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F5F0E8] border-t border-[#C8C4B8] py-4">
            <div className="flex flex-col gap-4 px-20">
              {['work', 'about', 'contact'].map((section) => (
                <button key={section} onClick={() => scrollToSection(section)}
                  className="dm-sans text-[11px] uppercase text-[#1A1A1A] hover:text-[#C8391A] transition-all text-left cursor-pointer">
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-14 h-[85vh] bg-[#F5F0E8]">
        <div className="max-w-[1400px] mx-auto px-20 h-full grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 relative h-full group cursor-pointer" onClick={() => scrollToSection('about')}>
            <div className="w-full h-full bg-[#D4CFC4] relative overflow-hidden">
              <div className="absolute inset-0 bg-[#1A1A1A] opacity-0 group-hover:opacity-40 transition-all flex items-center justify-center">
                <div className="dm-sans text-[13px] text-[#F5F0E8] opacity-0 group-hover:opacity-100 transition-all">View Full Profile →</div>
              </div>
              <div className="absolute bottom-4 left-4 bg-[#F5F0E8] px-5 py-3">
                <div className="dm-sans text-[10px] uppercase tracking-wide text-[#C8391A]">{role.toUpperCase()}</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col justify-center gap-6 relative">
            <div className="h-px bg-[#C8C4B8] w-16"></div>
            <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A]">FEATURED PORTFOLIO</div>
            <div className="playfair">
              <div className="text-[92px] font-bold leading-[0.9] text-[#1A1A1A]">{firstName.toUpperCase()}</div>
              <div className="text-[92px] font-bold italic leading-[0.9] text-[#1A1A1A]">{lastNameMid.toUpperCase()}-</div>
              <div className="text-[92px] font-bold leading-[0.9] text-[#C8391A]">{lastNameEnd.toUpperCase()}</div>
            </div>
            <div className="h-px bg-[#C8C4B8] w-16"></div>
            <div className="dm-sans font-light text-[18px] text-[#6B6B6B]">{role}</div>
            {location && <div className="dm-sans text-[12px] text-[#6B6B6B]">{location} — Open to Opportunities</div>}
            <div className="flex gap-4 mt-4">
              <button onClick={() => scrollToSection('work')}
                className="bg-[#1A1A1A] text-[#F5F0E8] dm-sans text-[12px] uppercase tracking-wider px-7 py-3.5 cursor-pointer hover:bg-[#C8391A] transition-all">
                View My Work →
              </button>
            </div>
            <div className="playfair italic text-[120px] text-[#C8C4B8] absolute bottom-0 right-0 leading-none pointer-events-none">01</div>
          </div>
        </div>
      </section>

      {/* About */}
      {isVisible('about') && (
        <section id="about" className="bg-[#F5F0E8] py-20 px-20 relative">
          <div className="max-w-[1400px] mx-auto">
            <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A] transform -rotate-90 origin-left absolute left-8 top-40">
              ABOUT THE PROFESSIONAL
            </div>
            <div className="flex gap-8 mb-12 ml-20">
              {[{ id: 'story', label: 'Story' }, { id: 'philosophy', label: 'Philosophy' }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveAboutTab(tab.id)}
                  className={`dm-sans text-[11px] uppercase tracking-wider pb-2 cursor-pointer transition-all ${activeAboutTab === tab.id ? 'text-[#1A1A1A] border-b-2 border-[#C8391A]' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="ml-20">
              {activeAboutTab === 'story' && (
                <div className="grid md:grid-cols-2 gap-12" style={{ animation: 'fadeIn 200ms ease' }}>
                  <div className="bg-[#1A1A1A] p-8">
                    <div className="playfair italic text-[22px] text-[#F5F0E8] mb-4">
                      "Great work is both beautiful and purposeful."
                    </div>
                    <div className="dm-sans text-[11px] text-[#6B6B6B]">— {name}</div>
                  </div>
                  <div>
                    {summary ? (
                      <p className="dm-sans font-light text-[15px] text-[#1A1A1A] leading-[1.9] text-justify">{summary}</p>
                    ) : (
                      <p className="dm-sans font-light text-[15px] text-[#6B6B6B] leading-[1.9]">No summary provided.</p>
                    )}
                  </div>
                </div>
              )}
              {activeAboutTab === 'philosophy' && (
                <div className="space-y-8" style={{ animation: 'fadeIn 200ms ease' }}>
                  {(profile?.achievements || []).slice(0, 3).map((a, i) => {
                    const title = typeof a === 'string' ? a : (a as any).title || '';
                    const desc = typeof a === 'string' ? '' : (a as any).description || '';
                    return (
                      <div key={i}>
                        {i > 0 && <div className="h-px bg-[#C8C4B8] mb-8"></div>}
                        <div className="flex gap-8">
                          <div className="playfair italic text-[28px] text-[#C8391A]">{String(i + 1).padStart(2, '0')}</div>
                          <div>
                            <div className="dm-sans font-semibold text-[18px] text-[#1A1A1A] mb-2">{title}</div>
                            {desc && <div className="dm-sans font-light text-[14px] text-[#6B6B6B]">{desc}</div>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {(profile?.achievements || []).length === 0 && (
                    <p className="dm-sans text-[14px] text-[#6B6B6B]">No achievements listed.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {isVisible('skills') && allSkills.length > 0 && (
        <section id="skills" className="bg-[#EDEAE0] py-16 px-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A]">EXPERTISE</div>
              <div className="flex gap-6">
                {['all', 'technical', 'domain', 'tools', 'soft'].map((filter) => (
                  <button key={filter} onClick={() => setActiveSkillsFilter(filter)}
                    className={`dm-sans text-[10px] uppercase cursor-pointer transition-all ${activeSkillsFilter === filter ? 'text-[#1A1A1A] border-b border-[#C8391A]' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}>
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-px bg-[#C8C4B8] mb-12"></div>
            <div className="flex flex-wrap gap-x-12 gap-y-6 items-baseline">
              {filteredSkills.map((skill, i) => (
                <div key={i}
                  className={`cursor-default transition-all hover:text-[#C8391A] ${
                    skill.size === 'large' ? 'playfair font-bold italic text-[36px] text-[#1A1A1A]'
                    : skill.size === 'medium' ? 'dm-sans font-semibold text-[20px] text-[#6B6B6B]'
                    : 'dm-sans font-light text-[14px] uppercase text-[#6B6B6B]'
                  }`}>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {isVisible('experience') && experiences.length > 0 && (
        <section id="experience" className="bg-[#F5F0E8] py-16 px-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A] mb-2">EXPERIENCE</div>
            <div className="h-px bg-[#C8C4B8] mb-8"></div>
            {experiences.map((exp, index) => (
              <div key={index}>
                <div className="grid grid-cols-12 gap-8 py-6 cursor-pointer group"
                  onClick={() => setExpandedExperience(expandedExperience === index ? -1 : index)}>
                  <div className="col-span-2">
                    <div className={`playfair italic text-[72px] leading-none transition-all ${expandedExperience === index ? 'text-[#C8391A]' : 'text-[#C8C4B8] group-hover:text-[#C8391A]'}`}>
                      {exp.number}
                    </div>
                  </div>
                  <div className="col-span-9 flex flex-col justify-center">
                    <div className="dm-sans font-bold text-[18px] uppercase text-[#1A1A1A]">{exp.company}</div>
                    <div className="playfair italic text-[22px] text-[#C8391A]">{exp.role}</div>
                    <div className="dm-sans font-light text-[13px] text-[#6B6B6B]">{exp.date}</div>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <div className={`text-[18px] transition-all ${expandedExperience === index ? 'text-[#C8391A]' : 'text-[#6B6B6B]'}`}
                      style={{ transform: expandedExperience === index ? 'rotate(45deg)' : 'none' }}>+</div>
                  </div>
                </div>
                {expandedExperience === index && (
                  <div className="grid grid-cols-12 gap-8 pb-6" style={{ animation: 'fadeIn 250ms ease' }}>
                    <div className="col-span-2"></div>
                    <div className="col-span-10">
                      {exp.impact && <p className="dm-sans font-light text-[14px] italic text-[#1A1A1A] mb-4">{exp.impact}</p>}
                      {exp.achievements.length > 0 && (
                        <ul className="space-y-2">
                          {exp.achievements.map((a, i) => (
                            <li key={i} className="dm-sans text-[13px] text-[#6B6B6B] flex">
                              <span className="mr-2">•</span><span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
                <div className="h-px bg-[#C8C4B8]"></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {isVisible('projects') && projects.length > 0 && (
        <section id="work" className="bg-[#1A1A1A] py-16 px-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="dm-sans text-[9px] uppercase tracking-wider text-[#F5F0E8] mb-2">SELECTED WORKS</div>
            <div className="h-px bg-[#6B6B6B] mb-8"></div>
            <div className="flex gap-8 mb-12">
              {workCategories.map((cat) => (
                <button key={cat} onClick={() => setActiveWorkFilter(cat)}
                  className={`dm-sans text-[11px] uppercase tracking-wider pb-2 cursor-pointer transition-all ${activeWorkFilter === cat ? 'text-[#F5F0E8] border-b-2 border-[#C8391A]' : 'text-[#6B6B6B] hover:text-[#F5F0E8]'}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="cursor-pointer group"
                  onClick={() => setModalProject(project.id)}
                  style={{ transition: 'transform 200ms ease' }}>
                  <div className="bg-[#2A2A2A] relative overflow-hidden" style={{ height: '300px' }}>
                    <div className="absolute inset-0 bg-[#C8391A] opacity-0 group-hover:opacity-20 transition-all flex items-center justify-center">
                      <div className="dm-sans text-[12px] text-[#F5F0E8] opacity-0 group-hover:opacity-100 transition-all">View Project →</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="playfair italic text-[18px] text-[#C8391A]">{project.number}</div>
                    <div className="dm-sans text-[13px] uppercase tracking-wide text-[#F5F0E8]">{project.name}</div>
                    <div className="dm-sans font-light text-[11px] text-[#6B6B6B]">{project.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Modal */}
      {modalProject !== null && (() => {
        const p = projects.find(pr => pr.id === modalProject);
        if (!p) return null;
        return (
          <div className="fixed inset-0 bg-[#1A1A1A] bg-opacity-80 z-50 flex items-center justify-center p-8"
            onClick={() => setModalProject(null)} style={{ animation: 'fadeIn 200ms ease' }}>
            <div className="bg-[#F5F0E8] p-16 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()} style={{ animation: 'scaleIn 250ms ease' }}>
              <button className="absolute top-8 right-8 dm-sans text-[24px] text-[#1A1A1A] cursor-pointer hover:text-[#C8391A] transition-all"
                onClick={() => setModalProject(null)}>×</button>
              <div className="bg-[#D4CFC4] w-full h-[300px] mb-8"></div>
              <div className="flex gap-4 mb-6">
                <div className="playfair italic text-[18px] text-[#C8391A]">{p.number}</div>
                <div className="dm-sans text-[18px] uppercase tracking-wide text-[#1A1A1A]">{p.name}</div>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  {p.description && (
                    <div className="mb-6">
                      <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A] mb-2">Description</div>
                      <p className="dm-sans font-light text-[15px] text-[#1A1A1A] leading-[1.8]">{p.description}</p>
                    </div>
                  )}
                  <div className="mb-4">
                    <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A] mb-2">Category</div>
                    <div className="dm-sans text-[13px] text-[#1A1A1A]">{p.category}</div>
                  </div>
                  {p.tools && (
                    <div className="mb-4">
                      <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A] mb-2">Tools</div>
                      <div className="dm-sans text-[13px] text-[#1A1A1A]">{p.tools}</div>
                    </div>
                  )}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      className="dm-sans text-[11px] uppercase text-[#C8391A] tracking-wider hover:underline">
                      View Live ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Contact Footer */}
      <footer id="contact" className="bg-[#F5F0E8] border-t-[3px] border-[#1A1A1A] py-12 px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="playfair font-bold text-[28px] text-[#1A1A1A] mb-2">{name}</div>
              {email && (
                <button onClick={() => copyToClipboard(email, 'Email copied!')}
                  className="dm-sans text-[13px] text-[#6B6B6B] hover:text-[#C8391A] cursor-pointer mb-4 transition-all block">
                  {email}
                </button>
              )}
              <div className="flex gap-6 mb-8">
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer"
                    className="dm-sans text-[11px] uppercase text-[#6B6B6B] hover:text-[#C8391A] transition-all">
                    LinkedIn ↗
                  </a>
                )}
                {profile?.personalInfo?.github && (
                  <a href={profile.personalInfo.github} target="_blank" rel="noopener noreferrer"
                    className="dm-sans text-[11px] uppercase text-[#6B6B6B] hover:text-[#C8391A] transition-all">
                    GitHub ↗
                  </a>
                )}
              </div>
              {!showFormSuccess ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <input type="text" placeholder="Name" required
                    className="w-full bg-transparent border-b border-[#C8C4B8] dm-sans text-[14px] text-[#1A1A1A] py-3 focus:border-[#C8391A] outline-none transition-all" />
                  <input type="email" placeholder="Email" required
                    className="w-full bg-transparent border-b border-[#C8C4B8] dm-sans text-[14px] text-[#1A1A1A] py-3 focus:border-[#C8391A] outline-none transition-all" />
                  <textarea placeholder="Message" required rows={4}
                    className="w-full bg-transparent border-b border-[#C8C4B8] dm-sans text-[14px] text-[#1A1A1A] py-3 focus:border-[#C8391A] outline-none resize-none transition-all" />
                  <button type="submit"
                    className="dm-sans text-[11px] uppercase text-[#C8391A] tracking-wider cursor-pointer hover:tracking-[0.2em] transition-all">
                    Send Message →
                  </button>
                </form>
              ) : (
                <div className="playfair italic text-[16px] text-[#1A1A1A] py-12">
                  Message Sent. I'll be in touch.
                </div>
              )}
            </div>
          </div>
          <div className="h-px bg-[#C8C4B8] my-8"></div>
          <div className="text-center dm-sans text-[9px] uppercase tracking-wider text-[#6B6B6B]">
            RESUFLOW PORTFOLIO STUDIO · {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
}
