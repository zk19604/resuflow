'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  ChevronDown,
  Download,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  X,
  Copy,
  Check,
  Link,
  Link2,
  Share2,
} from 'lucide-react';

const Github = Link;
const Linkedin = Link2;
const Twitter = Share2;
import { toast, Toaster } from 'sonner';
import { UserProfile, PortfolioConfig } from '@/types/userProfile';

function FloatingBlob({ color, size, top, left, duration }: any) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        background: color,
        width: size,
        height: size,
        top,
        left,
        filter: 'blur(60px)',
        opacity: 0.5,
        pointerEvents: 'none',
      }}
      animate={{ y: [-15, 15, -15] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function GlassCard({ children, className = '', hover = true, ...props }: any) {
  return (
    <div className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}

function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-white font-semibold text-[13px]">{name}</span>
        <span className="text-white/50 font-medium text-[12px]">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: 'linear-gradient(135deg, #C850C0, #4158D0)' }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #C850C0, #4158D0)',
              boxShadow: '0 0 8px rgba(200, 80, 192, 0.6)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }: any) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} onClick={onClick} className="cursor-pointer">
      <GlassCard className="overflow-hidden p-0">
        <div
          className="relative h-[200px] w-full"
          style={{ background: 'linear-gradient(135deg, #1A1040, #2D1B69)' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-[#C850C0]/20 flex items-center justify-center">
              <span className="text-white text-[13px] font-semibold flex items-center gap-2">
                View Project <ExternalLink className="w-4 h-4" />
              </span>
            </motion.div>
          )}
        </div>
        <div className="p-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#C850C0]/15 text-[#C850C0] text-[10px] uppercase font-medium mb-3">
            {project.category}
          </div>
          <h3 className="text-white font-semibold text-[18px] mb-2">{project.name}</h3>
          <p className="text-white/55 text-[13px] leading-relaxed mb-4 line-clamp-2">{project.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {project.tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className="px-2 py-1 rounded-full bg-white/5 text-white/60 text-[10px]">{tag}</span>
              ))}
            </div>
            <span className="text-[12px] font-medium gradient-text cursor-pointer">View Case Study →</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: any) {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      style={{ background: 'rgba(13, 11, 30, 0.95)', backdropFilter: 'blur(20px)' }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card w-full max-w-[900px] max-h-[90vh] overflow-y-auto p-12 rounded-[32px] relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-white text-2xl hover:text-[#C850C0] transition-colors">
          <X />
        </button>
        <div className="w-full h-[300px] rounded-2xl mb-6" style={{ background: 'linear-gradient(135deg, #1A1040, #2D1B69)' }} />
        <div className="inline-block px-3 py-1 rounded-full bg-[#C850C0]/15 text-[#C850C0] text-[10px] uppercase font-medium mb-2">
          {project.category}
        </div>
        <span className="text-white/40 text-sm ml-3">2024</span>
        <h2 className="text-white text-3xl font-bold mt-4 mb-6">{project.name}</h2>
        <p className="text-white/60 text-[15px] leading-[1.8] mb-4">{project.description}</p>
        <p className="text-white/60 text-[15px] leading-[1.8] mb-6">
          This project involved comprehensive research, user testing, and iterative design processes.
        </p>
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3">Tools Used</h3>
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag: string) => (
              <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-[12px]">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[14px] text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #C850C0, #4158D0)' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 28px rgba(200, 80, 192, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            Live Preview <ExternalLink className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="px-6 py-3 rounded-xl border border-white/20 text-white font-semibold text-[14px] hover:border-[#C850C0]/50 transition-all">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface GlassDarkTemplateProps {
  profile: UserProfile;
  config: PortfolioConfig;
}

export function GlassDarkTemplate({ profile, config }: GlassDarkTemplateProps) {
  const name = profile?.personalInfo?.name || 'Fatima Mazhar';
  const firstName = name.split(' ')[0] || 'Fatima';
  const role = profile?.workExperience?.[0]?.role || 'UI/UX Designer';
  const location = profile?.personalInfo?.location || 'Lahore, Pakistan';
  const email = profile?.personalInfo?.email || 'hello@email.com';
  const summary = profile?.summary || 'UI/UX Designer & Brand Strategist. I turn complex problems into elegant digital solutions.';
  const allSkills = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
    ...(profile?.skills?.soft || []),
  ];
  const projects = (profile?.projects || []).map((p: any, i: number) => ({
    id: i + 1,
    name: p.name,
    category: p.technologies?.[0] || 'Project',
    description: p.description,
    tags: p.technologies?.slice(0, 3) || [],
  }));
  const fallbackProjects = [
    { id: 1, name: 'Fintech Dashboard Redesign', category: 'UI/UX', description: 'Modern banking dashboard with real-time analytics.', tags: ['Figma', 'Design Systems', 'Prototyping'] },
    { id: 2, name: 'Organic Beauty Brand', category: 'Branding', description: 'Complete brand identity for sustainable skincare startup.', tags: ['Illustrator', 'Photoshop', 'Brand Strategy'] },
    { id: 3, name: 'E-learning Platform', category: 'Web', description: 'Interactive learning platform with course management.', tags: ['Webflow', 'Framer', 'UX Research'] },
    { id: 4, name: 'Fitness Tracking App', category: 'UI/UX', description: 'Mobile app for workout tracking with social features.', tags: ['Figma', 'Prototyping', 'Motion Design'] },
  ];
  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  const skillBars = allSkills.slice(0, 6).map((s, i) => ({ name: typeof s === 'string' ? s : s, percentage: 92 - i * 5 }));
  const fallbackSkillBars = [
    { name: 'Figma', percentage: 92 }, { name: 'UI Design', percentage: 88 },
    { name: 'Brand Identity', percentage: 85 }, { name: 'Prototyping', percentage: 80 },
    { name: 'Design Systems', percentage: 75 }, { name: 'Motion Design', percentage: 65 },
  ];
  const displaySkillBars = skillBars.length > 0 ? skillBars : fallbackSkillBars;

  const toolTags = allSkills.slice(6, 20).length > 0
    ? allSkills.slice(0, 14).map((s) => (typeof s === 'string' ? s : String(s)))
    : ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'After Effects', 'Webflow', 'Framer', 'Notion', 'Miro', 'Lottie', 'Principle', 'Zeplin', 'Spline', 'Blender'];

  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('story');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [emailCopied, setEmailCopied] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = ['home', 'about', 'skills', 'work', 'contact'];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) { const rect = el.getBoundingClientRect(); return rect.top <= 100 && rect.bottom >= 100; }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = displayProjects.filter(
    (p) => activeFilter === 'all' || p.category.toLowerCase() === activeFilter
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => { setFormStatus('sent'); setTimeout(() => setFormStatus('idle'), 3000); }, 1500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    toast.success('Email copied!', {
      style: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', color: '#fff' },
    });
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const downloadCV = () => {
    toast.success('CV Downloaded ✓', {
      style: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', color: '#fff' },
    });
  };

  return (
    <div className="relative bg-[#0D0B1E] text-white overflow-x-hidden">
      <Toaster position="bottom-right" />

      <FloatingBlob color="#6B3FA0" size="180px" top="10%" left="80%" duration={7} />
      <FloatingBlob color="#C850C0" size="220px" top="30%" left="5%" duration={6} />
      <FloatingBlob color="#4158D0" size="160px" top="60%" left="85%" duration={8} />
      <FloatingBlob color="#FF6B9D" size="200px" top="80%" left="10%" duration={5.5} />

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 h-16 z-40 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(13,11,30,0.95)' : 'rgba(13,11,30,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-[16px]" style={{ background: 'linear-gradient(135deg, #C850C0, #4158D0)' }}>
              {firstName.charAt(0)}
            </div>
            <span className="text-white font-semibold text-[15px]">{name}</span>
          </div>
          <div className="flex items-center gap-8">
            {['Home', 'About', 'Skills', 'Work', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium text-[13px] transition-all ${activeSection === item.toLowerCase() ? 'gradient-text' : 'text-white/70 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className="px-6 py-2.5 rounded-full text-white font-semibold text-[13px] transition-all"
            style={{ background: 'linear-gradient(135deg, #C850C0, #4158D0)' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(200,80,192,0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            onClick={() => scrollToSection('contact')}
          >
            Hire Me →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-8 pt-16">
        <FloatingBlob color="#C850C0" size="280px" top="15%" left="75%" duration={8} />
        <div className="max-w-[1400px] w-full flex items-center justify-between">
          <div className="max-w-[800px]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)' }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-white/70 font-medium text-[12px]">Available for work</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-[72px] font-extrabold leading-[1.1] mb-6"
            >
              Hi, I'm {firstName} —<br />
              I design <span className="gradient-text">experiences</span> that matter.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-white/55 text-[17px] leading-[1.8] max-w-[520px] mb-8"
            >
              {summary}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-4">
              <button
                onClick={() => scrollToSection('work')}
                className="px-8 py-3.5 rounded-full text-white font-semibold text-[14px] transition-all"
                style={{ background: 'linear-gradient(135deg, #C850C0, #4158D0)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 28px rgba(200,80,192,0.5)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                View My Work
              </button>
              <button
                onClick={downloadCV}
                className="px-8 py-3.5 rounded-full border text-white font-semibold text-[14px] transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,80,192,0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              >
                <Download className="inline w-4 h-4 mr-2" />
                Download CV
              </button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <GlassCard className="w-[280px] h-[340px] p-8 flex flex-col items-center" hover={false}>
                <div className="w-20 h-20 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #1A1040, #2D1B69)', border: '3px solid transparent', backgroundClip: 'padding-box', position: 'relative' }}>
                  <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg, #C850C0, #4158D0)', zIndex: -1, margin: '-3px' }} />
                </div>
                <h3 className="text-white font-bold text-[18px] mb-1">{name}</h3>
                <p className="text-white/55 text-[13px] mb-6">{role}</p>
                <div className="w-full grid grid-cols-3 gap-4 text-center">
                  <div><div className="text-white font-extrabold text-[28px] gradient-text">24+</div><div className="text-white/40 text-[11px]">Projects</div></div>
                  <div><div className="text-white font-extrabold text-[28px] gradient-text">18+</div><div className="text-white/40 text-[11px]">Clients</div></div>
                  <div><div className="text-white font-extrabold text-[28px] gradient-text">3+</div><div className="text-white/40 text-[11px]">Years</div></div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/35 text-[11px] uppercase tracking-wider">Scroll Down</span>
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-white/35" />
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-32 px-8 bg-[#0D0B1E]">
        <FloatingBlob color="#6B3FA0" size="200px" top="10%" left="5%" duration={7} />
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-[10px] uppercase tracking-[0.15em] gradient-text font-medium mb-3">About Me</div>
            <h2 className="text-[40px] font-bold">Passionate about <span className="gradient-text">crafting beauty</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <GlassCard className="p-8 flex flex-col items-center">
              <div className="w-[100px] h-[100px] rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #1A1040, #2D1B69)', border: '2px solid transparent', backgroundClip: 'padding-box', position: 'relative' }}>
                <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg, #C850C0, #4158D0)', zIndex: -1, margin: '-2px' }} />
              </div>
              <h3 className="text-white font-bold text-[22px] mb-1">{name}</h3>
              <p className="text-white/55 text-[14px] mb-6">{role}</p>
              <div className="flex gap-3 mb-6">
                {[Github, Linkedin, Twitter].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all glass-card"
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #C850C0, #4158D0)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(200,80,192,0.4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
                  ><Icon className="w-4 h-4" /></button>
                ))}
              </div>
              <div className="w-full h-px bg-white/10 mb-6" />
              <div className="w-full space-y-4">
                {[{ label: 'Projects Completed', value: '24+' }, { label: 'Happy Clients', value: '18+' }, { label: 'Years Experience', value: '3+' }].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-white/40 text-[11px] uppercase">{stat.label}</span>
                    <span className="text-white font-bold text-[28px]">{stat.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div>
              <div className="flex gap-2 mb-6 p-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                {[{ id: 'story', label: 'My Story' }, { id: 'approach', label: 'My Approach' }, { id: 'facts', label: 'Fun Facts' }].map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-2.5 rounded-full font-medium text-[13px] transition-all ${activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                    style={activeTab === tab.id ? { background: 'linear-gradient(135deg, #C850C0, #4158D0)' } : {}}
                  >{tab.label}</button>
                ))}
              </div>
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                {activeTab === 'story' && (
                  <div className="space-y-4">
                    <p className="text-white/60 text-[15px] leading-[1.9]">{summary}</p>
                    <p className="text-white/60 text-[15px] leading-[1.9]">
                      I believe great design isn't just about aesthetics—it's about solving real problems for real people. Every project is an opportunity to learn, grow, and create something that makes a difference.
                    </p>
                  </div>
                )}
                {activeTab === 'approach' && (
                  <div className="space-y-6">
                    {[
                      { num: '01', title: 'Research & Discovery', desc: 'Understanding user needs and business goals through thorough research.' },
                      { num: '02', title: 'Iterate & Test', desc: 'Creating prototypes and gathering feedback to refine the solution.' },
                      { num: '03', title: 'Deliver Excellence', desc: 'Crafting polished, pixel-perfect designs ready for development.' },
                    ].map((p) => (
                      <div key={p.num} className="flex gap-4">
                        <div className="text-[48px] font-extrabold gradient-text leading-none">{p.num}</div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-[16px] mb-1">{p.title}</h4>
                          <p className="text-white/55 text-[14px]">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'facts' && (
                  <div className="flex flex-wrap gap-3">
                    {['☕ Coffee addict', '🎨 Digital art enthusiast', '📚 Bookworm', '🎵 Indie music lover', '✈️ Travel junkie', '🌱 Plant parent'].map((fact) => (
                      <motion.div key={fact} whileHover={{ y: -4 }} className="glass-card px-5 py-3 text-white text-[13px] cursor-default">{fact}</motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative py-32 px-8 bg-[#120F2D]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-[10px] uppercase tracking-[0.15em] gradient-text font-medium mb-3">Expertise</div>
            <h2 className="text-[40px] font-bold">My technical <span className="gradient-text">skill set</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>{displaySkillBars.map((s) => <SkillBar key={s.name} name={s.name} percentage={s.percentage} />)}</div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-medium mb-4">Tools & Technologies</div>
              <div className="flex flex-wrap gap-2">
                {toolTags.map((tool) => (
                  <motion.div key={tool} whileHover={{ y: -4 }}
                    className="glass-card px-4 py-2 rounded-full text-white/70 font-medium text-[12px] cursor-default hover:text-white transition-all"
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,80,192,0.4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  >{tool}</motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[{ value: '24+', label: 'Projects' }, { value: '18+', label: 'Clients' }, { value: '3+', label: 'Years' }, { value: '100%', label: 'Satisfaction' }].map((kpi) => (
              <GlassCard key={kpi.label} className="text-center p-8">
                <div className="text-[48px] font-extrabold gradient-text mb-2">{kpi.value}</div>
                <div className="text-white/50 text-[12px]">{kpi.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative py-32 px-8 bg-[#0D0B1E]">
        <FloatingBlob color="#4158D0" size="240px" top="20%" left="85%" duration={7.5} />
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[10px] uppercase tracking-[0.15em] gradient-text font-medium mb-3">Selected Work</div>
            <h2 className="text-[40px] font-bold mb-8">Projects I'm <span className="gradient-text">proud of</span></h2>
            <div className="flex justify-center gap-2 p-1 rounded-full inline-flex" style={{ background: 'rgba(255,255,255,0.05)' }}>
              {[{ id: 'all', label: 'All' }, { id: 'ui/ux', label: 'UI/UX' }, { id: 'branding', label: 'Branding' }, { id: 'web', label: 'Web' }].map((filter) => (
                <button key={filter.id} onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-2 rounded-full font-medium text-[13px] transition-all ${activeFilter === filter.id ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                  style={activeFilter === filter.id ? { background: 'linear-gradient(135deg, #C850C0, #4158D0)' } : {}}
                >{filter.label}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <motion.div key={project.id}
                animate={{ opacity: activeFilter === 'all' || project.category.toLowerCase() === activeFilter ? 1 : 0.2, scale: activeFilter === 'all' || project.category.toLowerCase() === activeFilter ? 1 : 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      {/* Contact */}
      <section id="contact" className="relative py-32 px-8 bg-[#120F2D]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-[10px] uppercase tracking-[0.15em] gradient-text font-medium mb-3">Get In Touch</div>
            <h2 className="text-[40px] font-bold">Let's work <span className="gradient-text">together</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-white/55 text-[15px] leading-[1.8] mb-8">Have a project in mind? Drop me a message and let's create something amazing together.</p>
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C850C0, #4158D0)' }}><Mail className="w-4 h-4 text-white" /></div>
                  <div>
                    <div className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Email</div>
                    <button onClick={copyEmail} className="text-white font-medium text-[14px] hover:text-[#C850C0] transition-colors flex items-center gap-2">
                      {email}
                      {emailCopied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C850C0, #4158D0)' }}><MapPin className="w-4 h-4 text-white" /></div>
                  <div>
                    <div className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Location</div>
                    <div className="text-white font-medium text-[14px]">{location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C850C0, #4158D0)' }}><Clock className="w-4 h-4 text-white" /></div>
                  <div>
                    <div className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Availability</div>
                    <div className="text-white font-medium text-[14px]">Open for freelance projects</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all glass-card"
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #C850C0, #4158D0)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(200,80,192,0.4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
                  ><Icon className="w-5 h-5" /></button>
                ))}
              </div>
            </div>
            <GlassCard className="p-8">
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder="First Name" className="form-input" required />
                  <input type="text" placeholder="Last Name" className="form-input" required />
                </div>
                <input type="email" placeholder="Email" className="form-input mb-4 w-full" required />
                <input type="text" placeholder="Subject" className="form-input mb-4 w-full" required />
                <textarea placeholder="Message" rows={5} className="form-input mb-6 w-full resize-none" required />
                <button type="submit" disabled={formStatus !== 'idle'}
                  className="w-full py-4 rounded-xl text-white font-semibold text-[14px] transition-all"
                  style={{ background: formStatus === 'sent' ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #C850C0, #4158D0)' }}
                  onMouseEnter={(e) => { if (formStatus === 'idle') { e.currentTarget.style.boxShadow = '0 0 28px rgba(200,80,192,0.5)'; e.currentTarget.style.transform = 'scale(1.01)'; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  {formStatus === 'idle' && 'Send Message →'}
                  {formStatus === 'sending' && 'Sending...'}
                  {formStatus === 'sent' && '✓ Message Sent'}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0B1E] border-t border-white/[0.08] py-10 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-[16px]" style={{ background: 'linear-gradient(135deg, #C850C0, #4158D0)' }}>{firstName.charAt(0)}</div>
                <span className="text-white font-semibold text-[15px]">{name}</span>
              </div>
              <p className="text-white/40 text-[13px]">Crafting beautiful digital experiences</p>
            </div>
            <div className="flex gap-6">
              {['Home', 'About', 'Skills', 'Work', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-white/50 hover:text-white text-[13px] transition-colors">{item}</button>
              ))}
            </div>
          </div>
          <div className="w-full h-px bg-white/[0.08] mb-6" />
          <div className="text-center text-white/30 text-[12px]">© 2025 {name}. Built with ResuFlow.</div>
        </div>
      </footer>

      <style>{`
        * { scroll-behavior: smooth; }
        .glass-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); backdrop-filter: blur(20px); border-radius: 24px; padding: 32px; }
        .glass-card-hover { transition: all 250ms ease; }
        .glass-card-hover:hover { border-color: rgba(200,80,192,0.4); box-shadow: 0 0 32px rgba(200,80,192,0.15); transform: translateY(-4px); }
        .gradient-text { background: linear-gradient(90deg, #C850C0, #FF6B9D); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .form-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 18px; color: white; font-size: 14px; outline: none; transition: all 200ms; }
        .form-input::placeholder { color: rgba(255,255,255,0.3); }
        .form-input:focus { border-color: rgba(200,80,192,0.5); box-shadow: 0 0 16px rgba(200,80,192,0.15); }
      `}</style>
    </div>
  );
}
