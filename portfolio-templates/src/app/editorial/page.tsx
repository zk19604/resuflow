'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function App() {
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      // Scroll spy
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
      const offset = 56; // navbar height
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

  const handleDownloadCV = () => {
    setShowToast('CV Downloaded!');
    setTimeout(() => setShowToast(''), 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFormSuccess(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setShowFormSuccess(false), 3000);
  };

  const skills = [
    { name: 'Brand Identity', category: 'design', size: 'large' },
    { name: 'UI Design', category: 'design', size: 'large' },
    { name: 'Typography', category: 'strategy', size: 'medium' },
    { name: 'Motion', category: 'strategy', size: 'medium' },
    { name: 'FIGMA', category: 'tools', size: 'small' },
    { name: 'AFTER EFFECTS', category: 'tools', size: 'small' },
    { name: 'ILLUSTRATION', category: 'tools', size: 'small' },
  ];

  const filteredSkills = activeSkillsFilter === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeSkillsFilter);

  const experiences = [
    {
      number: '01',
      company: 'CREATIVE AGENCY CO.',
      role: 'Senior Brand Designer',
      date: '2022 — Present',
      impact: 'Led brand transformation for 15+ clients across tech and lifestyle sectors.',
      achievements: [
        'Increased client retention by 40% through strategic brand positioning',
        'Designed award-winning identity system for Fortune 500 company',
        'Mentored team of 5 junior designers'
      ],
      skills: ['Brand Strategy', 'Art Direction', 'Team Leadership']
    },
    {
      number: '02',
      company: 'DIGITAL STUDIO',
      role: 'UI/UX Lead',
      date: '2020 — 2022',
      impact: 'Established design system and processes for 50+ digital products.',
      achievements: [
        'Created scalable design system used across 8 product teams',
        'Improved user engagement metrics by 65%',
        'Led accessibility compliance initiative'
      ],
      skills: ['Design Systems', 'Prototyping', 'User Research']
    },
    {
      number: '03',
      company: 'STARTUP VENTURES',
      role: 'Product Designer',
      date: '2018 — 2020',
      impact: 'Shaped early-stage product design for multiple venture-backed startups.',
      achievements: [
        'Designed MVPs for 3 successful funding rounds',
        'Conducted user research with 200+ participants',
        'Established design culture from ground up'
      ],
      skills: ['Product Design', 'Rapid Prototyping', 'User Testing']
    }
  ];

  const projects = [
    { id: 1, number: '01', name: 'LUXE COSMETICS', category: 'branding', height: 320 },
    { id: 2, number: '02', name: 'FINTECH APP', category: 'ui-ux', height: 280 },
    { id: 3, number: '03', name: 'ANNUAL REPORT', category: 'print', height: 360 }
  ];

  const filteredProjects = activeWorkFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeWorkFilter);

  return (
    <div className="bg-[#F5F0E8] scroll-smooth" style={{ animation: 'fadeIn 400ms ease' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        html {
          scroll-behavior: smooth;
        }
        .playfair {
          font-family: 'Playfair Display', serif;
        }
        .dm-sans {
          font-family: 'DM Sans', sans-serif;
        }
        *:focus-visible {
          outline: 1px solid #C8391A;
          outline-offset: 2px;
        }
        .drop-cap::first-letter {
          font-family: 'Playfair Display', serif;
          font-size: 64px;
          float: left;
          line-height: 0.9;
          margin-right: 8px;
          color: #C8391A;
        }
        .transition-all {
          transition: all 150ms ease;
        }
        .transition-opacity-200 {
          transition: opacity 200ms ease;
        }
        .transition-max-height {
          transition: max-height 250ms ease, opacity 250ms ease;
        }
        .rotate-45 {
          transform: rotate(45deg);
        }
      `}</style>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#1A1A1A] text-[#F5F0E8] dm-sans px-6 py-3 z-50 transition-opacity-200"
          style={{ animation: 'fadeIn 200ms ease' }}>
          {showToast}
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 h-14 bg-[#F5F0E8] border-b border-[#C8C4B8] z-40 transition-all ${
        scrolled ? 'backdrop-blur-sm bg-opacity-95' : ''
      }`}>
        <div className="max-w-[1400px] mx-auto px-20 h-full flex items-center justify-between">
          <div className="playfair italic text-[13px] text-[#6B6B6B]">
            PORTFOLIO № 01
          </div>
          
          <div className="dm-sans text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A]">
            FATIMA MAZHAR
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {['work', 'about', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`dm-sans text-[11px] uppercase cursor-pointer transition-all ${
                  activeSection === section 
                    ? 'text-[#C8391A] underline underline-offset-4' 
                    : 'text-[#1A1A1A] hover:text-[#C8391A]'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F5F0E8] border-t border-[#C8C4B8] py-4">
            <div className="flex flex-col gap-4 px-20">
              {['work', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="dm-sans text-[11px] uppercase text-[#1A1A1A] hover:text-[#C8391A] transition-all text-left cursor-pointer"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-14 h-[85vh] bg-[#F5F0E8]">
        <div className="max-w-[1400px] mx-auto px-20 h-full grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left - Image */}
          <div className="md:col-span-7 relative h-full group cursor-pointer"
            onClick={() => scrollToSection('about')}>
            <div className="w-full h-full bg-[#D4CFC4] relative overflow-hidden">
              <div className="absolute inset-0 bg-[#1A1A1A] opacity-0 group-hover:opacity-40 transition-opacity-200 flex items-center justify-center">
                <div className="dm-sans text-[13px] text-[#F5F0E8] opacity-0 group-hover:opacity-100 transition-opacity-200">
                  View Full Profile →
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-[#F5F0E8] px-5 py-3">
                <div className="dm-sans text-[10px] uppercase tracking-wide text-[#C8391A]">
                  UI/UX DESIGNER
                </div>
              </div>
            </div>
          </div>

          {/* Right - Text */}
          <div className="md:col-span-5 flex flex-col justify-center gap-6 relative">
            <div className="h-px bg-[#C8C4B8] w-16"></div>
            <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A]">
              FEATURED PORTFOLIO
            </div>
            <div className="playfair">
              <div className="text-[92px] font-bold leading-[0.9] text-[#1A1A1A]">FATIMA</div>
              <div className="text-[92px] font-bold italic leading-[0.9] text-[#1A1A1A]">MAZ-</div>
              <div className="text-[92px] font-bold leading-[0.9] text-[#C8391A]">HAR</div>
            </div>
            <div className="h-px bg-[#C8C4B8] w-16"></div>
            <div className="dm-sans font-light text-[18px] text-[#6B6B6B]">
              Art Director & Brand Strategist
            </div>
            <div className="dm-sans text-[12px] text-[#6B6B6B]">
              Lahore, Pakistan — Open to Opportunities
            </div>
            <div className="flex gap-4 mt-4">
              <button 
                onClick={() => scrollToSection('work')}
                className="bg-[#1A1A1A] text-[#F5F0E8] dm-sans text-[12px] uppercase tracking-wider px-7 py-3.5 cursor-pointer hover:bg-[#C8391A] transition-all"
              >
                View My Work →
              </button>
              <button 
                onClick={handleDownloadCV}
                className="border border-[#1A1A1A] text-[#1A1A1A] dm-sans text-[12px] uppercase tracking-wider px-7 py-3.5 cursor-pointer hover:bg-[#1A1A1A] hover:text-[#F5F0E8] transition-all"
              >
                Download CV
              </button>
            </div>
            <div className="playfair italic text-[120px] text-[#C8C4B8] absolute bottom-0 right-0 leading-none pointer-events-none">
              01
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[#F5F0E8] py-20 px-20 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A] transform -rotate-90 origin-left absolute left-8 top-40">
            ABOUT THE DESIGNER
          </div>

          {/* Tab Bar */}
          <div className="flex gap-8 mb-12 ml-20">
            {[
              { id: 'story', label: 'Story' },
              { id: 'philosophy', label: 'Philosophy' },
              { id: 'personal', label: 'Personal' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveAboutTab(tab.id)}
                className={`dm-sans text-[11px] uppercase tracking-wider pb-2 cursor-pointer transition-all ${
                  activeAboutTab === tab.id
                    ? 'text-[#1A1A1A] border-b-2 border-[#C8391A]'
                    : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="ml-20">
            {/* Story Tab */}
            {activeAboutTab === 'story' && (
              <div className="grid md:grid-cols-2 gap-12 transition-opacity-200" style={{ animation: 'fadeIn 200ms ease' }}>
                <div className="bg-[#1A1A1A] p-8">
                  <div className="playfair italic text-[22px] text-[#F5F0E8] mb-4">
                    "Design is not decoration. It is communication."
                  </div>
                  <div className="dm-sans text-[11px] text-[#6B6B6B]">
                    — Fatima Mazhar
                  </div>
                </div>
                <div>
                  <p className="dm-sans font-light text-[15px] text-[#1A1A1A] leading-[1.9] text-justify mb-6 drop-cap">
                    atima Mazhar is a multidisciplinary designer based in Lahore, Pakistan, specializing in brand identity and digital experiences. With over 8 years in the industry, she has worked with startups, Fortune 500 companies, and cultural institutions to craft meaningful visual narratives.
                  </p>
                  <div className="h-px bg-[#C8C4B8] my-6"></div>
                  <p className="dm-sans font-light text-[15px] text-[#1A1A1A] leading-[1.9] text-justify">
                    Her approach merges strategic thinking with aesthetic precision, believing that great design should be both beautiful and purposeful. She draws inspiration from editorial design, modernist architecture, and the rich visual culture of South Asia.
                  </p>
                </div>
              </div>
            )}

            {/* Philosophy Tab */}
            {activeAboutTab === 'philosophy' && (
              <div className="space-y-8 transition-opacity-200" style={{ animation: 'fadeIn 200ms ease' }}>
                {[
                  {
                    number: '01',
                    title: 'Clarity Over Complexity',
                    description: 'The best solutions are often the simplest ones that communicate with precision.'
                  },
                  {
                    number: '02',
                    title: 'Context Drives Design',
                    description: 'Every project exists within cultural, historical, and business contexts that must inform decisions.'
                  },
                  {
                    number: '03',
                    title: 'Craft Matters',
                    description: 'Attention to typographic detail and compositional balance separates good work from great work.'
                  }
                ].map((principle, index) => (
                  <div key={index}>
                    {index > 0 && <div className="h-px bg-[#C8C4B8] mb-8"></div>}
                    <div className="flex gap-8">
                      <div className="playfair italic text-[28px] text-[#C8391A]">{principle.number}</div>
                      <div>
                        <div className="dm-sans font-semibold text-[18px] text-[#1A1A1A] mb-2">
                          {principle.title}
                        </div>
                        <div className="dm-sans font-light text-[14px] text-[#6B6B6B]">
                          {principle.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Personal Tab */}
            {activeAboutTab === 'personal' && (
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 transition-opacity-200" style={{ animation: 'fadeIn 200ms ease' }}>
                {[
                  { category: 'Currently Reading', value: 'Thinking Fast and Slow' },
                  { category: 'Favorite Tool', value: 'Figma' },
                  { category: 'Based In', value: 'Lahore Pakistan' },
                  { category: 'Languages', value: 'Urdu English French' },
                  { category: 'Hobby', value: 'Film Photography' },
                  { category: 'Dream Project', value: 'Brand a City' }
                ].map((fact, index) => (
                  <div key={index} className="border-t border-[#C8C4B8] pt-5">
                    <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A] mb-2">
                      {fact.category}
                    </div>
                    <div className="playfair italic text-[20px] text-[#1A1A1A]">
                      {fact.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-[#EDEAE0] py-16 px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A]">
              EXPERTISE
            </div>
            <div className="flex gap-6">
              {['all', 'design', 'strategy', 'tools'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveSkillsFilter(filter)}
                  className={`dm-sans text-[10px] uppercase cursor-pointer transition-all ${
                    activeSkillsFilter === filter
                      ? 'text-[#1A1A1A] border-b border-[#C8391A]'
                      : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="h-px bg-[#C8C4B8] mb-12"></div>
          
          <div className="flex flex-wrap gap-x-12 gap-y-6 items-baseline">
            {filteredSkills.map((skill, index) => (
              <div
                key={index}
                className={`cursor-pointer transition-all hover:text-[#C8391A] ${
                  skill.size === 'large'
                    ? 'playfair font-bold italic text-[36px] text-[#1A1A1A]'
                    : skill.size === 'medium'
                    ? 'dm-sans font-semibold text-[20px] text-[#6B6B6B]'
                    : 'dm-sans font-light text-[14px] uppercase text-[#6B6B6B]'
                }`}
                style={{ 
                  opacity: 1,
                  transition: 'opacity 200ms ease'
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="bg-[#F5F0E8] py-16 px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A] mb-2">
            EXPERIENCE
          </div>
          <div className="h-px bg-[#C8C4B8] mb-8"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="mb-0">
              <div
                className="grid grid-cols-12 gap-8 py-6 cursor-pointer group"
                onClick={() => setExpandedExperience(expandedExperience === index ? -1 : index)}
              >
                <div className="col-span-2">
                  <div className={`playfair italic text-[72px] leading-none transition-all ${
                    expandedExperience === index ? 'text-[#C8391A]' : 'text-[#C8C4B8] group-hover:text-[#C8391A]'
                  }`}>
                    {exp.number}
                  </div>
                </div>
                <div className="col-span-9 flex flex-col justify-center">
                  <div className="dm-sans font-bold text-[18px] uppercase text-[#1A1A1A]">
                    {exp.company}
                  </div>
                  <div className="playfair italic text-[22px] text-[#C8391A]">
                    {exp.role}
                  </div>
                  <div className="dm-sans font-light text-[13px] text-[#6B6B6B]">
                    {exp.date}
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <div 
                    className={`text-[18px] transition-all ${
                      expandedExperience === index ? 'text-[#C8391A] rotate-45' : 'text-[#6B6B6B]'
                    }`}
                  >
                    +
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedExperience === index && (
                <div 
                  className="grid grid-cols-12 gap-8 pb-6 overflow-hidden transition-max-height"
                  style={{ 
                    maxHeight: '500px',
                    animation: 'fadeIn 250ms ease'
                  }}
                >
                  <div className="col-span-2"></div>
                  <div className="col-span-10">
                    <p className="dm-sans font-light text-[14px] italic text-[#1A1A1A] mb-4">
                      {exp.impact}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="dm-sans text-[13px] text-[#6B6B6B] flex">
                          <span className="mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="border border-[#C8C4B8] dm-sans text-[10px] text-[#6B6B6B] px-3 py-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="h-px bg-[#C8C4B8]"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="work" className="bg-[#1A1A1A] py-16 px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="dm-sans text-[9px] uppercase tracking-wider text-[#F5F0E8] mb-2">
            SELECTED WORKS
          </div>
          <div className="h-px bg-[#6B6B6B] mb-8"></div>

          {/* Work Filter Tabs */}
          <div className="flex gap-8 mb-12">
            {[
              { id: 'all', label: 'All Work' },
              { id: 'branding', label: 'Branding' },
              { id: 'ui-ux', label: 'UI/UX' },
              { id: 'print', label: 'Print' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveWorkFilter(filter.id)}
                className={`dm-sans text-[11px] uppercase tracking-wider pb-2 cursor-pointer transition-all ${
                  activeWorkFilter === filter.id
                    ? 'text-[#F5F0E8] border-b-2 border-[#C8391A]'
                    : 'text-[#6B6B6B] hover:text-[#F5F0E8]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="cursor-pointer group transition-all hover:scale-[1.02]"
                onClick={() => setModalProject(project.id)}
                style={{ transition: 'transform 200ms ease, opacity 200ms ease' }}
              >
                <div 
                  className="bg-[#2A2A2A] relative overflow-hidden"
                  style={{ height: `${project.height}px` }}
                >
                  <div className="absolute inset-0 bg-[#C8391A] opacity-0 group-hover:opacity-20 transition-opacity-200 flex items-center justify-center">
                    <div className="dm-sans text-[12px] text-[#F5F0E8] opacity-0 group-hover:opacity-100 transition-opacity-200">
                      View Project →
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="playfair italic text-[18px] text-[#C8391A]">
                    {project.number}
                  </div>
                  <div className="dm-sans text-[13px] uppercase tracking-wide text-[#F5F0E8]">
                    {project.name}
                  </div>
                  <div className="dm-sans font-light text-[11px] text-[#6B6B6B]">
                    {project.category.replace('-', '/')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {modalProject !== null && (
        <div 
          className="fixed inset-0 bg-[#1A1A1A] bg-opacity-80 z-50 flex items-center justify-center p-8"
          onClick={() => setModalProject(null)}
          style={{ animation: 'fadeIn 200ms ease' }}
        >
          <div 
            className="bg-[#F5F0E8] p-16 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'scaleIn 250ms ease' }}
          >
            <style>{`
              @keyframes scaleIn {
                from { transform: scale(0.97); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
            `}</style>
            
            <button 
              className="absolute top-8 right-8 dm-sans text-[24px] text-[#1A1A1A] cursor-pointer hover:text-[#C8391A] transition-all"
              onClick={() => setModalProject(null)}
            >
              ×
            </button>

            <div className="bg-[#D4CFC4] w-full h-[400px] mb-8"></div>
            
            <div className="flex gap-4 mb-6">
              <div className="playfair italic text-[18px] text-[#C8391A]">
                {projects.find(p => p.id === modalProject)?.number}
              </div>
              <div className="dm-sans text-[18px] uppercase tracking-wide text-[#1A1A1A]">
                {projects.find(p => p.id === modalProject)?.name}
              </div>
              <div className="dm-sans font-light text-[14px] text-[#6B6B6B] flex items-center">
                {projects.find(p => p.id === modalProject)?.category.replace('-', '/')}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="mb-6">
                  <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A] mb-2">
                    Project Description
                  </div>
                  <p className="dm-sans font-light text-[15px] text-[#1A1A1A] leading-[1.8]">
                    A comprehensive brand identity and digital experience designed to elevate market positioning and create meaningful connections with target audiences through strategic visual storytelling.
                  </p>
                </div>
                
                <div className="mb-4">
                  <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A] mb-2">Role</div>
                  <div className="dm-sans text-[13px] text-[#1A1A1A]">Lead Designer & Art Director</div>
                </div>
                
                <div className="mb-4">
                  <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A] mb-2">Year</div>
                  <div className="dm-sans text-[13px] text-[#1A1A1A]">2024</div>
                </div>
                
                <div>
                  <div className="dm-sans text-[9px] uppercase tracking-wider text-[#C8391A] mb-2">Tools</div>
                  <div className="dm-sans text-[13px] text-[#1A1A1A]">Figma, Illustrator, After Effects</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#D4CFC4] w-full h-[200px]"></div>
                <div className="bg-[#D4CFC4] w-full h-[200px]"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Footer */}
      <footer id="contact" className="bg-[#F5F0E8] border-t-[3px] border-[#1A1A1A] py-12 px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left Column */}
            <div>
              <div className="playfair font-bold text-[28px] text-[#1A1A1A] mb-2">
                Fatima Mazhar
              </div>
              <button
                onClick={() => copyToClipboard('fatima@example.com', 'Copied!')}
                className="dm-sans text-[13px] text-[#6B6B6B] hover:text-[#C8391A] cursor-pointer mb-4 transition-all"
              >
                fatima@example.com
              </button>

              <div className="flex gap-6 mb-8">
                {[
                  { name: 'LinkedIn', url: 'https://linkedin.com' },
                  { name: 'Dribbble', url: 'https://dribbble.com' },
                  { name: 'Instagram', url: 'https://instagram.com' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dm-sans text-[11px] uppercase text-[#6B6B6B] hover:text-[#C8391A] cursor-pointer transition-all"
                  >
                    {social.name} ↗
                  </a>
                ))}
              </div>

              {/* Contact Form */}
              {!showFormSuccess ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full bg-transparent border-b border-[#C8C4B8] dm-sans text-[14px] text-[#1A1A1A] py-3 focus:border-[#C8391A] outline-none transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full bg-transparent border-b border-[#C8C4B8] dm-sans text-[14px] text-[#1A1A1A] py-3 focus:border-[#C8391A] outline-none transition-all"
                  />
                  <textarea
                    placeholder="Message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-[#C8C4B8] dm-sans text-[14px] text-[#1A1A1A] py-3 focus:border-[#C8391A] outline-none resize-none transition-all"
                  />
                  <button
                    type="submit"
                    className="dm-sans text-[11px] uppercase text-[#C8391A] tracking-wider cursor-pointer hover:tracking-[0.2em] transition-all"
                  >
                    Send Message →
                  </button>
                </form>
              ) : (
                <div className="playfair italic text-[16px] text-[#1A1A1A] py-12">
                  Message Sent. I'll be in touch.
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-end">
              <div 
                className="bg-[#1A1A1A] w-[120px] h-[120px] mb-2 cursor-pointer"
                onClick={() => copyToClipboard('https://portfolio.example.com', 'Link Copied!')}
              ></div>
              <div className="dm-sans text-[10px] text-[#6B6B6B]">
                Scan for digital version
              </div>
            </div>
          </div>

          <div className="h-px bg-[#C8C4B8] my-8"></div>
          <div className="text-center dm-sans text-[9px] uppercase tracking-wider text-[#6B6B6B]">
            RESUFLOW PORTFOLIO STUDIO · ISSUE 2025 · LAHORE, PAKISTAN
          </div>
        </div>
      </footer>
    </div>
  );
}
