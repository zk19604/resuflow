import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { UserProfile } from '@/types/userProfile';

interface WorkProps {
  profile: UserProfile;
}

// Placeholder images cycled when projects have no image
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1638961837480-5aee8a8f90cd?auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1759308553474-ce2c768a6b7c?auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1593527658229-95d536591c83?auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1651629679477-82cab6ec3443?auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1763121379638-8839d20e7551?auto=format&fit=crop&w=1080&q=80',
];

interface ProjectItem {
  title: string;
  category: string;
  client: string;
  metric: string;
  type: string;
  image: string;
  link: string;
}

export default function Work({ profile }: WorkProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Build projects from profile.projects
  const projects: ProjectItem[] = profile.projects.map((proj, i) => ({
    title: proj.name || 'Untitled Project',
    category: proj.type || 'Project',
    client: '', // projects schema has no client field
    metric: proj.tools.length > 0 ? proj.tools.slice(0, 3).join(' · ') : '',
    type: proj.type || 'Project',
    image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
    link: proj.link || '#',
  }));

  // If no projects, fall back to work experience entries
  const displayProjects: ProjectItem[] =
    projects.length > 0
      ? projects
      : profile.workExperience.slice(0, 5).map((exp, i) => ({
          title: exp.role || 'Role',
          category: 'Experience',
          client: exp.company || '',
          metric:
            Array.isArray(exp.achievements) && exp.achievements.length > 0
              ? exp.achievements[0].slice(0, 60)
              : exp.description?.slice(0, 60) || '',
          type: exp.company || 'Work',
          image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
          link: '#',
        }));

  // Derive unique filter categories from the data
  const categories = ['All', ...Array.from(new Set(displayProjects.map((p) => p.category)))];

  const filteredProjects =
    activeFilter === 'All'
      ? displayProjects
      : displayProjects.filter((p) => p.category === activeFilter);

  if (displayProjects.length === 0) return null;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-32 md:py-40"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Section Number */}
      <div
        className="absolute top-20 right-12 text-[200px] pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 300,
          color: 'var(--gold-primary)',
          opacity: 0.04,
        }}
      >
        02
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px]" style={{ background: 'var(--gold-primary)' }} />
            <h2
              className="text-4xl md:text-5xl"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                color: 'var(--text-primary)',
              }}
            >
              Selected Work
            </h2>
          </div>

          {/* Filters — only show if more than one category */}
          {categories.length > 2 && (
            <div className="flex gap-6 flex-wrap">
              {categories.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="relative text-sm transition-colors duration-300 filter-tab"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: activeFilter === filter ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  }}
                >
                  {filter}
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute -bottom-1 left-0 right-0 h-[1px]"
                      style={{ background: 'var(--gold-primary)' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {filteredProjects[0] && (
            <ProjectCard
              project={filteredProjects[0]}
              index={0}
              isVisible={isVisible}
              featured
            />
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.slice(1, 3).map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index + 1}
                isVisible={isVisible}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {filteredProjects.slice(3).map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index + 3}
                isVisible={isVisible}
                compact
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .filter-tab:hover { color: var(--text-secondary); }
      `}</style>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isVisible,
  featured = false,
  compact = false,
}: {
  project: ProjectItem;
  index: number;
  isVisible: boolean;
  featured?: boolean;
  compact?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden border transition-all duration-500 hover:-translate-y-1"
      style={{
        background: 'var(--bg-card)',
        borderColor: isHovered ? 'rgba(201, 169, 110, 0.20)' : 'rgba(201, 169, 110, 0.08)',
        borderRadius: '4px',
        height: featured ? '520px' : compact ? '300px' : '380px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          featured ? 'h-full' : compact ? 'h-[60%]' : 'h-[65%]'
        }`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.04)' : 'scale(1)' }}
        />

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500 flex items-center justify-center"
          style={{ background: 'rgba(12, 12, 14, 0.5)', opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-9 h-9 rounded-full border flex items-center justify-center"
            style={{ borderColor: 'var(--text-primary)' }}
          >
            <Play className="w-4 h-4 ml-0.5" style={{ color: 'var(--text-primary)' }} />
          </motion.div>
        </div>

        {/* Category Pill on featured */}
        {featured && (
          <div
            className="absolute top-6 left-6 px-3 py-1.5 border"
            style={{
              borderColor: 'rgba(201, 169, 110, 0.25)',
              background: 'rgba(12, 12, 14, 0.8)',
              backdropFilter: 'blur(8px)',
              borderRadius: '2px',
            }}
          >
            <span
              className="text-xs tracking-[0.08em] uppercase"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--gold-primary)' }}
            >
              {project.type}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`${featured ? 'absolute bottom-0 left-0 right-0 p-8' : 'p-6'}`}>
        {featured && (
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(12,12,14,0.95) 0%, transparent 100%)',
            }}
          />
        )}

        <div className="relative">
          {!featured && (
            <div
              className="inline-block px-2 py-1 border mb-3"
              style={{ borderColor: 'rgba(201, 169, 110, 0.15)', borderRadius: '2px' }}
            >
              <span
                className="text-[10px] tracking-[0.08em] uppercase"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--gold-primary)' }}
              >
                {project.type}
              </span>
            </div>
          )}

          <h3
            className={`mb-2 ${featured ? 'text-4xl' : compact ? 'text-2xl' : 'text-3xl'}`}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: 'var(--text-primary)' }}
          >
            {project.title}
          </h3>

          {project.client && (
            <p className="text-sm mb-2" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
              {project.client}
            </p>
          )}

          {project.metric && (
            <p className="text-sm mb-4" style={{ fontFamily: 'var(--font-body)', color: 'var(--gold-primary)' }}>
              {project.metric}
            </p>
          )}

          <a
            href={project.link}
            target={project.link !== '#' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs transition-all duration-300"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
          >
            View Project
            <ArrowRight
              className="w-3 h-3 transition-transform duration-300"
              style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
