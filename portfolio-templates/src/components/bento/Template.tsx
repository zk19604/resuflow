'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Folder, ChevronDown, Copy, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, PortfolioConfig } from '@/types/userProfile';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ── ProjectModal ──────────────────────────────────────────────────────────────

interface ModalProject {
  name: string;
  description: string;
  fullDescription: string;
  tech: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
}

function ProjectModal({ isOpen, onClose, project }: { isOpen: boolean; onClose: () => void; project: ModalProject }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(26,26,46,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-[24px] p-8 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 rounded-full bg-[#F2EFE9] text-[11px] text-[#6B7280]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}>{project.category}</span>
              <button onClick={onClose} className="text-[#6B7280] hover:text-[#1A1A2E] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }} className="text-[24px] text-[#1A1A2E] mb-3">
              {project.name}
            </h2>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[14px] leading-[1.8] text-[#6B7280] mb-6">
              {project.fullDescription || project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="px-[12px] py-[5px] rounded-md bg-[#F2EFE9] text-[11px] text-[#1A1A2E]"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}>{t}</span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="px-[20px] py-[10px] rounded-full bg-[#4F46E5] text-white text-[13px] hover:bg-[#4338CA] transition-colors"
                  style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }}>
                  Live Demo ↗
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="px-[20px] py-[10px] rounded-full border border-[#E5E1D8] text-[#1A1A2E] text-[13px] hover:border-[#4F46E5] transition-colors"
                  style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }}>
                  GitHub →
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── BentoTemplate ─────────────────────────────────────────────────────────────

export function BentoTemplate({ profile, config }: { profile: UserProfile; config: PortfolioConfig }) {
  const [expandedExperience, setExpandedExperience] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ModalProject | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [emailCopied, setEmailCopied] = useState(false);

  const visible = config?.sectionsVisible || {};
  const isVisible = (s: string) => visible[s] !== false;

  // ── Profile data ────────────────────────────────────────────────────────────
  const name = profile?.personalInfo?.name || 'Your Name';
  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || 'YOUR';
  const lastName = nameParts.slice(1).join(' ') || 'NAME';
  const initials = nameParts.map((p: string) => p[0]).join('').slice(0, 2).toUpperCase();

  const role = profile?.workExperience?.[0]?.role || 'Professional';
  const location = profile?.personalInfo?.location || '';
  const email = profile?.personalInfo?.email || '';
  const github = profile?.personalInfo?.github || '';
  const linkedin = profile?.personalInfo?.linkedin || '';
  const summary = profile?.summary || '';

  const allSkills = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
    ...(profile?.skills?.domain || []),
  ];

  const experiences = (profile?.workExperience || []).map((exp) => ({
    company: exp.company,
    role: exp.role,
    dates: [exp.startDate, exp.endDate].filter(Boolean).join(' – '),
    description: exp.description || '',
    tech: exp.achievements?.slice(0, 3) || [],
  }));

  // Derive years of experience from oldest start date
  const yearsExp = (() => {
    const dates = (profile?.workExperience || [])
      .map((e) => e.startDate)
      .filter(Boolean)
      .map((d) => new Date(d).getFullYear())
      .filter((y) => !isNaN(y));
    if (!dates.length) return null;
    return new Date().getFullYear() - Math.min(...dates);
  })();

  const projectsCount = (profile?.projects || []).length;

  const education = profile?.education || [];
  const interests = profile?.extras?.interests || [];
  const certifications = profile?.certifications || [];

  // ── Projects ────────────────────────────────────────────────────────────────
  const modalProjects: ModalProject[] = (profile?.projects || []).map((p) => ({
    name: p.name,
    description: p.description || '',
    fullDescription: p.description || '',
    tech: p.tools || [],
    category: p.type || 'Project',
    liveUrl: p.link || undefined,
    githubUrl: undefined,
  }));

  const categories = ['All', ...Array.from(new Set(modalProjects.map((p) => p.category)))];
  const filteredProjects = activeFilter === 'All'
    ? modalProjects
    : modalProjects.filter((p) => p.category === activeFilter);

  const featuredProject = filteredProjects[0] || null;
  const otherProjects = filteredProjects.slice(1, 4);

  // ── Handlers ────────────────────────────────────────────────────────────────
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
    if (email) navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2EFE9' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>

      <div className="p-10 max-w-[1600px] mx-auto">
        <div className="space-y-4">

          {/* ROW 1 – Hero */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Name + tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0 }}
              className="md:col-span-5 bg-[#1A1A2E] rounded-[24px] p-9 flex flex-col justify-between hover:scale-[1.015] transition-transform duration-200"
            >
              <div>
                <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] uppercase tracking-wider text-[#F5C842] mb-4">
                  {role.toUpperCase()}
                </p>
                <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[64px] leading-none mb-1 text-[#F2EFE9]">
                  {firstName}
                </h1>
                <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[64px] leading-none text-[#F5C842] mb-6">
                  {lastName || '.'}
                </h1>
                <div className="h-[1px] w-full mb-6" style={{ backgroundColor: 'rgba(242,239,233,0.15)' }}></div>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[15px] leading-relaxed text-[#F2EFE9] opacity-70 max-w-[280px]">
                  {summary || 'Building reliable software.'}
                </p>
              </div>
              <div className="flex gap-3 mt-8">
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-150"
                    style={{ backgroundColor: 'rgba(242,239,233,0.1)' }}>
                    <GithubIcon className="w-5 h-5 text-[#F2EFE9]" />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-150"
                    style={{ backgroundColor: 'rgba(242,239,233,0.1)' }}>
                    <LinkedinIcon className="w-5 h-5 text-[#F2EFE9]" />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Avatar + status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06 }}
              className="md:col-span-2 bg-white border border-[#E5E1D8] rounded-[24px] p-7 flex flex-col items-center hover:scale-[1.015] transition-transform duration-200"
            >
              <div className="relative mb-4">
                <div className="w-[100px] h-[100px] rounded-full bg-[#F2EFE9] border-[3px] border-[#F5C842] flex items-center justify-center">
                  <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }} className="text-[28px] text-[#1A1A2E]">
                    {initials}
                  </span>
                </div>
              </div>
              <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[16px] text-[#1A1A2E] mb-1 text-center">{name}</p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280] mb-4 text-center">{role}</p>
              <div className="h-[1px] w-full bg-[#E5E1D8] mb-4"></div>
              <div className="flex items-center gap-2 px-[14px] py-[6px] rounded-full bg-[#DCFCE7] border border-[#86EFAC] mb-4">
                <div className="w-2 h-2 rounded-full bg-[#166534] animate-pulse"></div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] text-[#166534]">Available for work</span>
              </div>
              {location && (
                <div className="flex items-center gap-2">
                  <span className="text-[14px]">📍</span>
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280]">{location}</span>
                </div>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
              className="md:col-span-3 bg-[#F5C842] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#1A1A2E] opacity-60 mb-6">BY THE NUMBERS</p>
              <div className="space-y-4">
                {projectsCount > 0 && (
                  <div>
                    <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[48px] text-[#1A1A2E] leading-none">{projectsCount}+</p>
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#1A1A2E] opacity-60">Projects Shipped</p>
                  </div>
                )}
                {yearsExp !== null && (
                  <>
                    <div className="h-[1px] w-full" style={{ backgroundColor: 'rgba(26,26,46,0.15)' }}></div>
                    <div>
                      <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[48px] text-[#1A1A2E] leading-none">{yearsExp}+</p>
                      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#1A1A2E] opacity-60">Years Experience</p>
                    </div>
                  </>
                )}
                {experiences.length > 0 && (
                  <>
                    <div className="h-[1px] w-full" style={{ backgroundColor: 'rgba(26,26,46,0.15)' }}></div>
                    <div>
                      <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[48px] text-[#1A1A2E] leading-none">{experiences.length}+</p>
                      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#1A1A2E] opacity-60">Companies</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
              onClick={scrollToContact}
              className="md:col-span-2 bg-[#4F46E5] rounded-[24px] p-7 flex flex-col items-center justify-center hover:bg-[#4338CA] hover:scale-[1.015] transition-all duration-200 cursor-pointer"
            >
              <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }} className="text-[22px] text-white text-center leading-tight mb-4">Let's work together →</p>
              <button className="px-[28px] py-[12px] rounded-full bg-white text-[#4F46E5] hover:bg-[#F5C842] hover:text-[#1A1A2E] transition-all duration-200"
                style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '14px' }}>
                Hire Me
              </button>
            </motion.div>
          </div>

          {/* ROW 2 – About + Skills */}
          {isVisible('about') && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
                className="md:col-span-4 bg-white border border-[#E5E1D8] rounded-[24px] p-8 hover:scale-[1.015] transition-transform duration-200"
              >
                <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#6B7280] mb-3">ABOUT</p>
                <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[22px] text-[#1A1A2E] mb-4">A bit about me.</h3>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[14px] leading-[1.8] text-[#6B7280] mb-6">
                  {summary || 'Passionate about building great software.'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {location && (
                    <span className="px-[14px] py-[6px] rounded-full bg-[#F2EFE9] border border-[#E5E1D8] text-[11px] text-[#1A1A2E]"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}>📍 {location}</span>
                  )}
                  {education[0] && (
                    <span className="px-[14px] py-[6px] rounded-full bg-[#F2EFE9] border border-[#E5E1D8] text-[11px] text-[#1A1A2E]"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}>🎓 {education[0].institution}</span>
                  )}
                  {interests[0] && (
                    <span className="px-[14px] py-[6px] rounded-full bg-[#F2EFE9] border border-[#E5E1D8] text-[11px] text-[#1A1A2E]"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}>🔭 {interests[0]}</span>
                  )}
                </div>
              </motion.div>

              {/* Featured project / currently building */}
              {featuredProject && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                  className="md:col-span-3 bg-[#F0FFF4] border border-[#BBF7D0] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200"
                >
                  <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#166534] mb-3">FEATURED PROJECT</p>
                  <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }} className="text-[20px] text-[#1A1A2E] mb-2">{featuredProject.name}</h4>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280] mb-4 leading-relaxed">
                    {featuredProject.description}
                  </p>
                  {featuredProject.liveUrl && (
                    <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[13px] text-[#166534] hover:text-[#1A1A2E] transition-colors"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
                      View Project ↗
                    </a>
                  )}
                </motion.div>
              )}

              {/* Tech Stack */}
              {isVisible('skills') && allSkills.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.36 }}
                  className={`${featuredProject ? 'md:col-span-5' : 'md:col-span-8'} bg-[#E8F0FE] border border-[#BFDBFE] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200`}
                >
                  <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#1E40AF] mb-3">TECH STACK</p>
                  <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[18px] text-[#1A1A2E] mb-4">What I work with</h4>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((tech) => (
                      <span key={tech}
                        className="px-[14px] py-[6px] rounded-lg bg-white border border-[#BFDBFE] text-[12px] text-[#1A1A2E] hover:bg-[#4F46E5] hover:text-white hover:border-[#4F46E5] transition-all duration-150 cursor-pointer"
                        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500 }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* ROW 3 – Experience */}
          {isVisible('experience') && experiences.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.42 }}
                className="md:col-span-3 bg-[#FF6B35] rounded-[24px] p-8 hover:scale-[1.015] transition-transform duration-200"
              >
                <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[32px] text-white leading-tight mb-4">
                  {yearsExp ? `${yearsExp} Year${yearsExp > 1 ? 's' : ''} of shipping real products.` : 'Shipping real products.'}
                </h3>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[14px] text-white opacity-70">
                  {experiences.map((e) => e.company).join(', ')}.
                </p>
              </motion.div>

              {/* Experience accordion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.48 }}
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
                          {exp.tech.length > 0 && (
                            <div className="flex flex-wrap gap-2 pl-11">
                              {exp.tech.map((t) => (
                                <span key={t} className="px-[10px] py-[4px] rounded-md bg-[#F2EFE9] text-[11px] text-[#1A1A2E]"
                                  style={{ fontFamily: 'JetBrains Mono, monospace' }}>{t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Education */}
              {education.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.54 }}
                  className="md:col-span-4 bg-[#FFF0F0] border border-[#FECACA] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200"
                >
                  <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#991B1B] mb-4">EDUCATION</p>
                  <div className="space-y-4">
                    {education.slice(0, 2).map((edu, idx) => (
                      <div key={idx}>
                        {idx > 0 && <div className="h-[1px] w-full bg-[#FECACA] mb-4"></div>}
                        <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[16px] text-[#1A1A2E] mb-1">
                          {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                        </p>
                        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280] mb-1">{edu.institution}</p>
                        <div className="flex items-center gap-2">
                          <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] text-[#6B7280]">
                            {[edu.startDate, edu.endDate].filter(Boolean).join('–')}
                          </span>
                          {edu.grade && (
                            <span className="px-2 py-1 rounded-md text-[11px] text-[#4F46E5] border"
                              style={{ fontFamily: 'JetBrains Mono, monospace', backgroundColor: 'rgba(79,70,229,0.12)', borderColor: 'rgba(79,70,229,0.3)' }}>
                              {edu.grade}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {certifications.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {certifications.slice(0, 3).map((cert) => (
                        <span key={cert.name}
                          className="px-[12px] py-[5px] rounded-full bg-white border border-[#FECACA] text-[12px] text-[#1A1A2E]"
                          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                          🏆 {cert.name}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}

          {/* ROW 4 – Projects */}
          {isVisible('projects') && modalProjects.length > 0 && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[12px] text-[#6B7280]">// selected work</p>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((filter) => (
                    <button key={filter} onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-[6px] rounded-full text-[12px] transition-all duration-150 ${
                        activeFilter === filter
                          ? 'bg-[#1A1A2E] text-[#F2EFE9]'
                          : 'bg-[#F2EFE9] border border-[#E5E1D8] text-[#6B7280] hover:border-[#1A1A2E]'
                      }`}
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500 }}>
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Featured */}
                {featuredProject && (
                  <motion.div
                    key={featuredProject.name}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
                    onClick={() => setSelectedProject(featuredProject)}
                    className="md:col-span-7 bg-[#1A1A2E] rounded-[24px] p-9 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                  >
                    <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] uppercase tracking-wider text-[#F5C842] mb-3">FEATURED PROJECT</p>
                    <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }} className="text-[28px] text-[#F2EFE9] mb-3">{featuredProject.name}</h3>
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[14px] leading-[1.8] text-[#F2EFE9] opacity-60 mb-6">
                      {featuredProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProject.tech.map((t) => (
                        <span key={t} className="px-[12px] py-[6px] rounded-md text-[11px] text-[#F2EFE9]"
                          style={{ fontFamily: 'JetBrains Mono, monospace', backgroundColor: 'rgba(242,239,233,0.1)', border: '1px solid rgba(242,239,233,0.2)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    {featuredProject.liveUrl && (
                      <a href={featuredProject.liveUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer"
                        className="px-[20px] py-[10px] rounded-full bg-[#F5C842] text-[#1A1A2E] hover:bg-[#F5D666] transition-colors duration-200"
                        style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '13px' }}>
                        View Project ↗
                      </a>
                    )}
                  </motion.div>
                )}

                {/* Other projects */}
                <div className={`${featuredProject ? 'md:col-span-5' : 'md:col-span-12'} grid grid-cols-1 md:grid-cols-${featuredProject ? '1' : '3'} gap-4`}
                  style={{ gridTemplateColumns: featuredProject ? undefined : 'repeat(3, 1fr)' }}>
                  {(featuredProject ? otherProjects : filteredProjects).map((project, idx) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.66 + idx * 0.06 }}
                      onClick={() => setSelectedProject(project)}
                      className="bg-white border border-[#E5E1D8] rounded-[24px] p-6 hover:border-[#4F46E5] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <Folder className="w-6 h-6 text-[#4F46E5]" />
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <ExternalLink className="w-4 h-4 text-[#6B7280] hover:text-[#1A1A2E]" />
                          </a>
                        )}
                      </div>
                      <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[16px] text-[#1A1A2E] mb-2">{project.name}</h4>
                      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[13px] text-[#6B7280] mb-4 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 2).map((t) => (
                          <span key={t} className="px-[10px] py-[4px] rounded-md bg-[#F2EFE9] text-[11px] text-[#1A1A2E]"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}>{t}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ROW 5 – Interests + Certs */}
          {(interests.length > 0 || certifications.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {interests.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.84 }}
                  className="md:col-span-4 bg-[#F5C842] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200"
                >
                  <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#1A1A2E] opacity-60 mb-3">INTERESTS</p>
                  <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }} className="text-[22px] text-[#1A1A2E] mb-6">Beyond the code</h4>
                  <div className="space-y-4">
                    {interests.slice(0, 4).map((fact, idx) => (
                      <div key={idx}>
                        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500 }} className="text-[14px] text-[#1A1A2E]">{fact}</p>
                        {idx < Math.min(interests.length, 4) - 1 && (
                          <div className="h-[1px] w-full mt-4" style={{ backgroundColor: 'rgba(26,26,46,0.15)' }}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {certifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.9 }}
                  className={`${interests.length > 0 ? 'md:col-span-8' : 'md:col-span-12'} bg-[#E8F0FE] border border-[#BFDBFE] rounded-[24px] p-7 hover:scale-[1.015] transition-transform duration-200`}
                >
                  <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#1E40AF] mb-4">CERTIFICATIONS</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certifications.map((cert) => (
                      <div key={cert.name} className="bg-white rounded-[12px] p-4 border border-[#BFDBFE]">
                        <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }} className="text-[14px] text-[#1A1A2E] mb-1">{cert.name}</p>
                        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[12px] text-[#6B7280]">{cert.issuer}</p>
                        {cert.date && (
                          <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] text-[#6B7280] mt-1">{cert.date}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* ROW 6 – Contact */}
          <div id="contact" className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.02 }}
              className="md:col-span-5 bg-[#1A1A2E] rounded-[24px] p-9 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[11px] uppercase tracking-wider text-[#F5C842] mb-4">GET IN TOUCH</p>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[36px] text-[#F2EFE9] leading-tight mb-2">Have a project in mind?</h3>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800 }} className="text-[36px] text-[#F5C842] leading-tight mb-4">Let's talk about it.</h3>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[14px] text-[#F2EFE9] opacity-60 mb-8">
                I'm always open to new opportunities and interesting problems.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {email && (
                  <a href={`mailto:${email}`}
                    className="px-[24px] py-[12px] rounded-full bg-[#F5C842] text-[#1A1A2E] hover:bg-[#F5D666] transition-colors duration-200"
                    style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '13px' }}>
                    Send Email ↗
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer"
                    className="px-[24px] py-[12px] rounded-full text-[#F2EFE9] hover:bg-[rgba(242,239,233,0.1)] transition-colors duration-200"
                    style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '13px', border: '1px solid rgba(242,239,233,0.3)' }}>
                    LinkedIn →
                  </a>
                )}
              </div>
              {email && (
                <div className="flex items-center gap-3">
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[12px] text-[#F2EFE9] opacity-60">{email}</span>
                  <button onClick={copyEmail} className="text-[#F2EFE9] opacity-60 hover:opacity-100 transition-opacity">
                    {emailCopied ? <Check className="w-4 h-4 text-[#F5C842]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.08 }}
              className="md:col-span-7 bg-white border border-[#E5E1D8] rounded-[24px] p-8 hover:scale-[1.015] transition-transform duration-200"
            >
              <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] uppercase tracking-wider text-[#6B7280] mb-4">SEND A MESSAGE</p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your name" required
                    className="w-full px-4 py-3 rounded-[10px] bg-[#F2EFE9] border border-[#E5E1D8] text-[14px] text-[#1A1A2E] placeholder-[#6B7280] focus:bg-white focus:border-[#4F46E5] focus:outline-none transition-all"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} />
                  <input type="email" placeholder="Your email" required
                    className="w-full px-4 py-3 rounded-[10px] bg-[#F2EFE9] border border-[#E5E1D8] text-[14px] text-[#1A1A2E] placeholder-[#6B7280] focus:bg-white focus:border-[#4F46E5] focus:outline-none transition-all"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} />
                </div>
                <input type="text" placeholder="Subject" required
                  className="w-full px-4 py-3 rounded-[10px] bg-[#F2EFE9] border border-[#E5E1D8] text-[14px] text-[#1A1A2E] placeholder-[#6B7280] focus:bg-white focus:border-[#4F46E5] focus:outline-none transition-all"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} />
                <textarea placeholder="Your message" rows={4} required
                  className="w-full px-4 py-3 rounded-[10px] bg-[#F2EFE9] border border-[#E5E1D8] text-[14px] text-[#1A1A2E] placeholder-[#6B7280] focus:bg-white focus:border-[#4F46E5] focus:outline-none transition-all resize-none"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}></textarea>
                <button type="submit" disabled={formStatus === 'loading' || formStatus === 'success'}
                  className={`w-full h-12 rounded-[12px] text-white text-[14px] transition-all duration-200 ${
                    formStatus === 'success' ? 'bg-[#166534]' : 'bg-[#4F46E5] hover:bg-[#4338CA]'
                  }`}
                  style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600,
                    boxShadow: formStatus !== 'success' ? '0 4px 16px rgba(79,70,229,0.3)' : 'none' }}>
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
            <span className="text-[#4F46E5]">&lt;</span>{initials}<span className="text-[#4F46E5]"> /&gt;</span>
          </div>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[12px] text-[#6B7280]">
            Built with ResuFlow · {new Date().getFullYear()}
          </p>
          <button onClick={scrollToTop} className="text-[12px] text-[#6B7280] hover:text-[#1A1A2E] transition-colors cursor-pointer"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Back to top ↑
          </button>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />
      )}
    </div>
  );
}
