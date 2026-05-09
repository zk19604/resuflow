'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Folder, ChevronDown, Copy, Check } from 'lucide-react';
import { GitHub, LinkedIn, XIcon } from './components/BrandIcons';
import { motion } from 'motion/react';
import { ProjectModal } from './components/ProjectModal';

interface Project {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  tech: string[];
  category: string;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  dates: string;
  description: string;
  tech: string[];
}

export default function App() {
  const [expandedExperience, setExpandedExperience] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [emailCopied, setEmailCopied] = useState(false);
  const [learningProgress] = useState({
    Rust: 45,
    eBPF: 30,
    WebAssembly: 25
  });

  const projects: Project[] = [
    {
      id: '1',
      name: 'Distributed Task Queue',
      description: 'High-performance async task processing system built with Go and Redis',
      fullDescription: 'A production-ready distributed task queue system that handles millions of tasks daily. Features include retry logic, priority queuing, worker pools, and comprehensive monitoring. Built to scale horizontally with Redis as the message broker.',
      tech: ['Go', 'Redis', 'Docker', 'Kubernetes'],
      category: 'Backend',
      featured: true,
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: '2',
      name: 'Real-time Analytics API',
      description: 'FastAPI-based analytics engine processing 10M+ events per day',
      fullDescription: 'Real-time analytics platform that ingests, processes, and visualizes user behavior data at scale. Implements stream processing, time-series aggregation, and provides RESTful APIs for dashboard integration.',
      tech: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      category: 'Backend',
      githubUrl: '#'
    },
    {
      id: '3',
      name: 'DevOps Automation Suite',
      description: 'Infrastructure as Code toolkit for AWS deployment automation',
      fullDescription: 'Complete DevOps automation suite built with Terraform and Python. Automates infrastructure provisioning, deployment pipelines, and monitoring setup across multiple AWS regions.',
      tech: ['Terraform', 'AWS', 'Python', 'GitHub Actions'],
      category: 'Full Stack',
      githubUrl: '#'
    },
    {
      id: '4',
      name: 'Open Source Logger',
      description: 'Lightweight structured logging library with 2k+ GitHub stars',
      fullDescription: 'A fast, zero-allocation structured logger for Go applications. Popular in the open source community with extensive documentation and active maintainer support.',
      tech: ['Go', 'Testing', 'CI/CD'],
      category: 'OSS',
      githubUrl: '#'
    }
  ];

  const experiences: ExperienceItem[] = [
    {
      company: 'TechCorp Solutions',
      role: 'Senior Backend Engineer',
      dates: '2023 - Present',
      description: 'Leading backend architecture for high-scale microservices. Reduced API latency by 40% and improved system reliability to 99.99% uptime.',
      tech: ['Go', 'Kubernetes', 'PostgreSQL', 'Redis']
    },
    {
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      dates: '2021 - 2023',
      description: 'Built core platform features from scratch. Shipped 15+ major features serving 50k+ users. Mentored 3 junior developers.',
      tech: ['Python', 'FastAPI', 'React', 'AWS']
    },
    {
      company: 'DevLabs Inc',
      role: 'Backend Developer',
      dates: '2020 - 2021',
      description: 'Developed RESTful APIs and background job systems. Optimized database queries reducing costs by 35%.',
      tech: ['Node.js', 'MongoDB', 'Docker']
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        (e.target as HTMLFormElement).reset();
      }, 3000);
    }, 1500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('ahmed.raza@example.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2EFE9' }}>
      {/* Main Content */}
      <div className="p-10 max-w-[1600px] mx-auto">
        <div className="space-y-4">
          
          {/* ROW 1 - Hero Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Card 1A - Name + Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="md:col-span-5 bg-[#1A1A2E] rounded-[24px] p-9 flex flex-col justify-between hover:scale-[1.015] transition-transform duration-200"
            >
              <div>
                <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] uppercase tracking-wider text-[#F5C842] mb-4">SOFTWARE ENGINEER</p>
                <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[64px] leading-none mb-1 text-[#F2EFE9]">Ahmed</h1>
                <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[64px] leading-none text-[#F5C842] mb-6">Raza.</h1>
                <div className="h-[1px] w-full mb-6" style={{ backgroundColor: 'rgba(242, 239, 233, 0.15)' }}></div>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[15px] leading-relaxed text-[#F2EFE9] opacity-70 max-w-[280px]">
                  I build fast, reliable, and scalable backend systems.
                </p>
              </div>
              <div className="flex gap-3 mt-8">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-150" style={{ backgroundColor: 'rgba(242, 239, 233, 0.1)' }}>
                  <GitHub className="w-5 h-5 text-[#F2EFE9]" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-150" style={{ backgroundColor: 'rgba(242, 239, 233, 0.1)' }}>
                  <LinkedIn className="w-5 h-5 text-[#F2EFE9]" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-150" style={{ backgroundColor: 'rgba(242, 239, 233, 0.1)' }}>
                  <XIcon className="w-5 h-5 text-[#F2EFE9]" />
                </a>
              </div>
            </motion.div>

            {/* Card 1B - Avatar + Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="md:col-span-2 bg-white border border-[#E5E1D8] rounded-[24px] p-7 flex flex-col items-center hover:scale-[1.015] transition-transform duration-200"
            >
              <div className="relative mb-4">
                <div className="w-[100px] h-[100px] rounded-full bg-[#F2EFE9] border-[3px] border-[#F5C842] flex items-center justify-center">
                  <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }} className="text-[28px] text-[#1A1A2E]">AR</span>
                </div>
              </div>
              <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[16px] text-[#1A1A2E] mb-1">Ahmed Raza</p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280] mb-4">Backend Engineer</p>
              <div className="h-[1px] w-full bg-[#E5E1D8] mb-4"></div>
              <div className="flex items-center gap-2 px-[14px] py-[6px] rounded-full bg-[#DCFCE7] border border-[#86EFAC] mb-4">
                <div className="w-2 h-2 rounded-full bg-[#166534] animate-pulse"></div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] text-[#166534]">Available for work</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[14px]">📍</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280]">Lahore, PK</span>
              </div>
            </motion.div>

            {/* Card 1C - Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="md:col-span-3 bg-[#F5C842] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#1A1A2E] opacity-60 mb-6">BY THE NUMBERS</p>
              <div className="space-y-4">
                <div>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[48px] text-[#1A1A2E] leading-none">24+</p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#1A1A2E] opacity-60">Projects Shipped</p>
                </div>
                <div className="h-[1px] w-full" style={{ backgroundColor: 'rgba(26, 26, 46, 0.15)' }}></div>
                <div>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[48px] text-[#1A1A2E] leading-none">4+</p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#1A1A2E] opacity-60">Years Experience</p>
                </div>
                <div className="h-[1px] w-full" style={{ backgroundColor: 'rgba(26, 26, 46, 0.15)' }}></div>
                <div>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[48px] text-[#1A1A2E] leading-none">18+</p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#1A1A2E] opacity-60">Happy Clients</p>
                </div>
              </div>
            </motion.div>

            {/* Card 1D - CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              onClick={scrollToContact}
              className="md:col-span-2 bg-[#4F46E5] rounded-[24px] p-7 flex flex-col items-center justify-center hover:bg-[#4338CA] hover:scale-[1.015] transition-all duration-200 cursor-pointer"
            >
              <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }} className="text-[22px] text-white text-center leading-tight mb-4">Let's work together →</p>
              <button className="px-[28px] py-[12px] rounded-full bg-white text-[#4F46E5] hover:bg-[#F5C842] hover:text-[#1A1A2E] transition-all duration-200" style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '14px' }}>
                Hire Me
              </button>
            </motion.div>
          </div>

          {/* ROW 2 - About + Skills */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Card 2A - About Me */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="md:col-span-4 bg-white border border-[#E5E1D8] rounded-[24px] p-8 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#6B7280] mb-3">ABOUT</p>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[22px] text-[#1A1A2E] mb-4">A bit about me.</h3>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[14px] leading-[1.8] text-[#6B7280] mb-6">
                I'm a passionate backend engineer specializing in building robust, scalable systems. With expertise in distributed systems, microservices architecture, and cloud infrastructure, I thrive on solving complex technical challenges. When I'm not coding, you'll find me contributing to open source or exploring new technologies.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-[14px] py-[6px] rounded-full bg-[#F2EFE9] border border-[#E5E1D8] text-[11px] text-[#1A1A2E]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>📍 Lahore</span>
                <span className="px-[14px] py-[6px] rounded-full bg-[#F2EFE9] border border-[#E5E1D8] text-[11px] text-[#1A1A2E]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>🎓 FAST NUCES</span>
                <span className="px-[14px] py-[6px] rounded-full bg-[#F2EFE9] border border-[#E5E1D8] text-[11px] text-[#1A1A2E]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>🔭 OSS Contributor</span>
              </div>
            </motion.div>

            {/* Card 2B - Currently Building */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-3 bg-[#F0FFF4] border border-[#BBF7D0] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#166534] mb-3">CURRENTLY BUILDING</p>
              <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }} className="text-[20px] text-[#1A1A2E] mb-2">RealtimeDB</h4>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280] mb-4 leading-relaxed">
                A distributed real-time database with pub/sub capabilities, built for low-latency applications.
              </p>
              <div className="bg-[#1A1A2E] rounded-[10px] px-4 py-3 mb-4">
                <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[12px] text-[#86EFAC]">&gt; npm run deploy ✓</p>
              </div>
              <a href="#" className="inline-flex items-center gap-1 text-[13px] text-[#166534] hover:text-[#1A1A2E] transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
                GitHub ↗
              </a>
            </motion.div>

            {/* Card 2C - Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="md:col-span-5 bg-[#E8F0FE] border border-[#BFDBFE] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#1E40AF] mb-3">TECH STACK</p>
              <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[18px] text-[#1A1A2E] mb-4">What I work with</h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Go', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'FastAPI', 'Next.js', 'Terraform', 'Linux'].map((tech) => (
                  <span
                    key={tech}
                    className="px-[14px] py-[6px] rounded-lg bg-white border border-[#BFDBFE] text-[12px] text-[#1A1A2E] hover:bg-[#4F46E5] hover:text-white hover:border-[#4F46E5] transition-all duration-150 cursor-pointer"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500 }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ROW 3 - Experience Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Card 3A - Big Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="md:col-span-3 bg-[#FF6B35] rounded-[24px] p-8 hover:scale-[1.015] transition-transform duration-200"
            >
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[32px] text-white leading-tight mb-4">
                4 Years of shipping real products.
              </h3>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[14px] text-white opacity-70 mb-6">
                From startups to enterprise. Backend systems at scale.
              </p>
              <button className="px-[22px] py-[10px] rounded-full bg-white text-[#FF6B35] hover:bg-[#F2EFE9] transition-colors duration-200" style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '13px' }}>
                View Resume ↓
              </button>
            </motion.div>

            {/* Card 3B - Experience Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48 }}
              className="md:col-span-5 bg-white border border-[#E5E1D8] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#6B7280] mb-4">EXPERIENCE</p>
              <div className="space-y-2">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="border border-transparent hover:bg-[#F2EFE9] rounded-[12px] transition-all duration-150">
                    <button
                      onClick={() => setExpandedExperience(expandedExperience === idx ? -1 : idx)}
                      className="w-full p-3 flex items-center gap-3 text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#F2EFE9] flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[14px] text-[#1A1A2E]">{exp.company}</p>
                        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280]">{exp.role}</p>
                      </div>
                      <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] text-[#6B7280] hidden md:block">{exp.dates}</p>
                      <ChevronDown className={`w-5 h-5 text-[#6B7280] transition-transform duration-250 ${expandedExperience === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedExperience === idx && (
                      <div className="px-3 pb-3 space-y-3">
                        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280] leading-relaxed pl-11">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pl-11">
                          {exp.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-[10px] py-[4px] rounded-md bg-[#F2EFE9] text-[11px] text-[#1A1A2E]"
                              style={{ fontFamily: 'JetBrains Mono, monospace' }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 3C - Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.54 }}
              className="md:col-span-4 bg-[#FFF0F0] border border-[#FECACA] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#991B1B] mb-4">EDUCATION</p>
              <div className="space-y-4">
                <div>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[16px] text-[#1A1A2E] mb-1">BS Computer Science</p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280] mb-1">FAST NUCES</p>
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] text-[#6B7280]">2016-2020</span>
                    <span className="px-2 py-1 rounded-md text-[11px] text-[#4F46E5] border" style={{ fontFamily: 'JetBrains Mono, monospace', backgroundColor: 'rgba(79, 70, 229, 0.12)', borderColor: 'rgba(79, 70, 229, 0.3)' }}>GPA 3.8</span>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-[#FECACA]"></div>
                <div>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[16px] text-[#1A1A2E] mb-1">Intermediate</p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280] mb-1">Punjab College</p>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] text-[#6B7280]">2014-2016</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['🏆 Hackathon Winner', '📚 Dean\'s List', '🎖 Gold Medal'].map((achievement) => (
                  <span
                    key={achievement}
                    className="px-[12px] py-[5px] rounded-full bg-white border border-[#FECACA] text-[12px] text-[#1A1A2E]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ROW 4 - Projects Row */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[12px] text-[#6B7280]">// selected work</p>
              <div className="flex gap-2">
                {['All', 'Backend', 'Full Stack', 'OSS'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-[6px] rounded-full text-[12px] transition-all duration-150 ${
                      activeFilter === filter
                        ? 'bg-[#1A1A2E] text-[#F2EFE9]'
                        : 'bg-[#F2EFE9] border border-[#E5E1D8] text-[#6B7280] hover:border-[#1A1A2E]'
                    }`}
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500 }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Card 4A - Featured Project */}
              {filteredProjects.filter(p => p.featured).map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.06 }}
                  onClick={() => setSelectedProject(project)}
                  className="md:col-span-7 bg-[#1A1A2E] rounded-[24px] p-9 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                >
                  <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] uppercase tracking-wider text-[#F5C842] mb-3">FEATURED PROJECT</p>
                  <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }} className="text-[28px] text-[#F2EFE9] mb-3">{project.name}</h3>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[14px] leading-[1.8] text-[#F2EFE9] opacity-60 mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-[12px] py-[6px] rounded-md text-[11px] text-[#F2EFE9]"
                        style={{ fontFamily: 'JetBrains Mono, monospace', backgroundColor: 'rgba(242, 239, 233, 0.1)', border: '1px solid rgba(242, 239, 233, 0.2)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={project.liveUrl} onClick={(e) => e.stopPropagation()} className="px-[20px] py-[10px] rounded-full bg-[#F5C842] text-[#1A1A2E] hover:bg-[#F5D666] transition-colors duration-200" style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '13px' }}>
                      Live Demo ↗
                    </a>
                    <a href={project.githubUrl} onClick={(e) => e.stopPropagation()} className="px-[20px] py-[10px] rounded-full text-[#F2EFE9] hover:bg-[rgba(242,239,233,0.1)] transition-colors duration-200" style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '13px', border: '1px solid rgba(242, 239, 233, 0.3)' }}>
                      GitHub →
                    </a>
                  </div>
                </motion.div>
              ))}

              {/* Card 4B, 4C, 4D - Smaller Project Cards */}
              <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredProjects.filter(p => !p.featured).map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.66 + idx * 0.06 }}
                    onClick={() => setSelectedProject(project)}
                    className="bg-white border border-[#E5E1D8] rounded-[24px] p-6 hover:border-[#4F46E5] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <Folder className="w-6 h-6 text-[#4F46E5]" />
                      <div className="flex gap-2">
                        <GitHub className="w-4 h-4 text-[#6B7280] hover:text-[#1A1A2E]" />
                        <ExternalLink className="w-4 h-4 text-[#6B7280] hover:text-[#1A1A2E]" />
                      </div>
                    </div>
                    <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[16px] text-[#1A1A2E] mb-2">{project.name}</h4>
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280] mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-[10px] py-[4px] rounded-md bg-[#F2EFE9] text-[11px] text-[#1A1A2E]"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 5 - Personality + Testimonial */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Card 5A - Fun Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.84 }}
              className="md:col-span-4 bg-[#F5C842] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#1A1A2E] opacity-60 mb-3">FUN FACTS</p>
              <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }} className="text-[22px] text-[#1A1A2E] mb-6">Beyond the code</h4>
              <div className="space-y-4">
                {[
                  '☕ 3 coffees a day minimum',
                  '♟ Ranked chess player',
                  '🌙 Night owl coder',
                  '📖 Currently reading DDIA'
                ].map((fact, idx) => (
                  <div key={idx}>
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500 }} className="text-[14px] text-[#1A1A2E]">{fact}</p>
                    {idx < 3 && <div className="h-[1px] w-full mt-4" style={{ backgroundColor: 'rgba(26, 26, 46, 0.15)' }}></div>}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 5B - Currently Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="md:col-span-3 bg-[#E8F0FE] border border-[#BFDBFE] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#1E40AF] mb-4">CURRENTLY LEARNING</p>
              <div className="space-y-5">
                {Object.entries(learningProgress).map(([tech, progress]) => (
                  <div key={tech}>
                    <div className="flex justify-between items-center mb-2">
                      <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[14px] text-[#1A1A2E]">{tech}</p>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] text-[#6B7280]">{progress}%</span>
                    </div>
                    <div className="h-[3px] w-full bg-[#BFDBFE] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 1 }}
                        className="h-full bg-[#4F46E5]"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280] italic mt-6">Always learning →</p>
            </motion.div>

            {/* Card 5C - Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.96 }}
              className="md:col-span-5 bg-white border border-[#E5E1D8] rounded-[24px] p-8 hover:scale-[1.015] transition-transform duration-200"
            >
              <div className="relative">
                <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[80px] leading-none text-[#F2EFE9] absolute -top-4 -left-2">"</p>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[16px] leading-[1.8] text-[#1A1A2E] italic mb-6 pl-8">
                  Ahmed is an exceptional engineer. His technical depth and ability to deliver complex backend systems on time is unmatched. A true asset to any team.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F2EFE9]"></div>
                <div>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[14px] text-[#1A1A2E]">Sarah Johnson</p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[12px] text-[#6B7280]">CTO, TechCorp</p>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#F5C842] text-[16px]">★</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ROW 6 - Contact Row */}
          <div id="contact" className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Card 6A - Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.02 }}
              className="md:col-span-5 bg-[#1A1A2E] rounded-[24px] p-9 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] uppercase tracking-wider text-[#F5C842] mb-4">GET IN TOUCH</p>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[36px] text-[#F2EFE9] leading-tight mb-2">
                Have a project in mind?
              </h3>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[36px] text-[#F5C842] leading-tight mb-4">
                Let's talk about it.
              </h3>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[14px] text-[#F2EFE9] opacity-60 mb-8">
                I'm always open to new opportunities and interesting problems.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <a href="mailto:ahmed.raza@example.com" className="px-[24px] py-[12px] rounded-full bg-[#F5C842] text-[#1A1A2E] hover:bg-[#F5D666] transition-colors duration-200" style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '13px' }}>
                  Send Email ↗
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-[24px] py-[12px] rounded-full text-[#F2EFE9] hover:bg-[rgba(242,239,233,0.1)] transition-colors duration-200" style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '13px', border: '1px solid rgba(242, 239, 233, 0.3)' }}>
                  LinkedIn →
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[12px] text-[#F2EFE9] opacity-60">ahmed.raza@example.com</span>
                <button onClick={copyEmail} className="text-[#F2EFE9] opacity-60 hover:opacity-100 transition-opacity">
                  {emailCopied ? <Check className="w-4 h-4 text-[#F5C842]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Card 6B - Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.08 }}
              className="md:col-span-7 bg-white border border-[#E5E1D8] rounded-[24px] p-8 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#6B7280] mb-4">SEND A MESSAGE</p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-[10px] bg-[#F2EFE9] border border-[#E5E1D8] text-[14px] text-[#1A1A2E] placeholder-[#6B7280] focus:bg-white focus:border-[#4F46E5] focus:outline-none transition-all"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: 'none' }}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.08)'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    className="w-full px-4 py-3 rounded-[10px] bg-[#F2EFE9] border border-[#E5E1D8] text-[14px] text-[#1A1A2E] placeholder-[#6B7280] focus:bg-white focus:border-[#4F46E5] focus:outline-none transition-all"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.08)'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-3 rounded-[10px] bg-[#F2EFE9] border border-[#E5E1D8] text-[14px] text-[#1A1A2E] placeholder-[#6B7280] focus:bg-white focus:border-[#4F46E5] focus:outline-none transition-all"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.08)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
                <textarea
                  placeholder="Your message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-[10px] bg-[#F2EFE9] border border-[#E5E1D8] text-[14px] text-[#1A1A2E] placeholder-[#6B7280] focus:bg-white focus:border-[#4F46E5] focus:outline-none transition-all resize-none"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.08)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                ></textarea>
                <button
                  type="submit"
                  disabled={formStatus === 'loading' || formStatus === 'success'}
                  className={`w-full h-12 rounded-[12px] text-white text-[14px] transition-all duration-200 ${
                    formStatus === 'success'
                      ? 'bg-[#166534] hover:bg-[#166534]'
                      : 'bg-[#4F46E5] hover:bg-[#4338CA]'
                  }`}
                  style={{ 
                    fontFamily: 'Sora, sans-serif', 
                    fontWeight: 600,
                    boxShadow: formStatus !== 'success' ? '0 4px 16px rgba(79,70,229,0.3)' : 'none'
                  }}
                >
                  {formStatus === 'loading' ? 'Sending...' : formStatus === 'success' ? 'Sent ✓' : 'Send Message →'}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E5E1D8] py-7 px-10" style={{ backgroundColor: '#F2EFE9' }}>
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[16px] text-[#1A1A2E]">
            <span className="text-[#4F46E5]">&lt;</span>AR<span className="text-[#4F46E5]"> /&gt;</span>
          </div>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[12px] text-[#6B7280]">
            Built with ResuFlow · 2025
          </p>
          <button
            onClick={scrollToTop}
            className="text-[12px] text-[#6B7280] hover:text-[#1A1A2E] transition-colors cursor-pointer"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Back to top ↑
          </button>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </div>
  );
}
