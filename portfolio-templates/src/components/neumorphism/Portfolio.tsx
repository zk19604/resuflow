import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';

// Simple SVG Icon Component for GitHub (no external dependency)
const GithubIcon = ({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface PortfolioProps {
  profile: any;
}

export function Portfolio({ profile }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  // Get real projects from profile
  const projects = profile?.projects || [];
  const workExperience = profile?.workExperience || [];
  const achievements = profile?.achievements || [];
  
  // Generate portfolio items from multiple sources
  const generatePortfolioItems = () => {
    const items: any[] = [];
    
    // Add actual projects
    projects.forEach((project: any, index: number) => {
      if (project.name || project.title) {
        items.push({
          id: `proj-${index}`,
          title: project.name || project.title,
          category: project.type || project.category || 'Project',
          description: project.description || '',
          tools: project.tools || project.technologies || [],
          link: project.link || project.url || '',
          github: project.github || '',
          size: index === 0 ? 'large' : index < 3 ? 'medium' : 'small',
          number: `${(index + 1).toString().padStart(2, '0')} / ${projects.length.toString().padStart(2, '0')}`,
          source: 'project'
        });
      }
    });
    
    // Add work experience as portfolio items if no projects
    if (items.length === 0 && workExperience.length > 0) {
      workExperience.forEach((exp: any, index: number) => {
        if (exp.role || exp.company) {
          items.push({
            id: `exp-${index}`,
            title: exp.role || 'Position',
            category: exp.company || 'Experience',
            description: exp.description || exp.achievements?.join(' · ') || '',
            size: index === 0 ? 'large' : index < 3 ? 'medium' : 'small',
            number: `${(index + 1).toString().padStart(2, '0')} / ${workExperience.length.toString().padStart(2, '0')}`,
            source: 'experience'
          });
        }
      });
    }
    
    // Add achievements as fallback
    if (items.length === 0 && achievements.length > 0) {
      achievements.forEach((achievement: any, index: number) => {
        if (achievement.title) {
          items.push({
            id: `ach-${index}`,
            title: achievement.title,
            category: 'Achievement',
            description: achievement.description || '',
            size: index === 0 ? 'large' : 'medium',
            number: `${(index + 1).toString().padStart(2, '0')} / ${achievements.length.toString().padStart(2, '0')}`,
            source: 'achievement'
          });
        }
      });
    }
    
    return items;
  };

  const portfolioItems = generatePortfolioItems();
  
  // Get unique categories for filters
  const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];
  
  // Filter items based on active filter
  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  // Separate items by size for layout
  const featuredItem = filteredItems[0];
  const mediumItems = filteredItems.slice(1, 3);
  const smallItems = filteredItems.slice(3);

  // Generate placeholder gradient for items without images
  const getPlaceholderGradient = (title: string) => {
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = hash % 360;
    const hue2 = (hue1 + 40) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 40%, 80%), hsl(${hue2}, 50%, 70%))`;
  };

  // Don't render if no portfolio items
  if (portfolioItems.length === 0) {
    return null;
  }

  return (
    <section id="work" className="bg-[#E8E3DC] py-28 lg:py-40 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <h2
          className="font-serif mb-12"
          style={{ fontSize: 'clamp(40px, 6vw, 56px)', color: '#3D3830', fontWeight: 400 }}
        >
          {portfolioItems[0]?.source === 'project' ? 'Selected Work' : 
           portfolioItems[0]?.source === 'experience' ? 'Professional Journey' : 
           'Highlights'}
        </h2>

        {/* Filter Tabs - Only show if multiple categories */}
        {categories.length > 2 && (
          <div className="mb-16 inline-flex p-1.5 rounded-2xl bg-[#E8E3DC] shadow-inset relative flex-wrap">
            {categories.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-6 py-2.5 rounded-2xl transition-all ${
                    isActive ? 'shadow-raised' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? '#E8E3DC' : 'transparent',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '13px',
                      color: isActive ? '#3D3830' : '#A09890',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {filter}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Project Grid */}
        <div className="space-y-8">
          {/* Featured Item */}
          {featuredItem && (
            <div className="group p-0 rounded-[32px] bg-[#E8E3DC] shadow-raised-lg overflow-hidden transition-shadow hover:shadow-raised-xl cursor-pointer">
              <div className="grid lg:grid-cols-2 items-center">
                {/* Image Area */}
                <div className="h-[300px] lg:h-[480px] overflow-hidden">
                  <div 
                    className="w-full h-full transition-transform duration-500 group-hover:scale-105 flex items-center justify-center"
                    style={{ background: getPlaceholderGradient(featuredItem.title) }}
                  >
                    <span
                      className="font-serif"
                      style={{
                        fontSize: 'clamp(40px, 8vw, 80px)',
                        color: 'rgba(255,255,255,0.3)',
                        fontWeight: 300,
                      }}
                    >
                      {featuredItem.title.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 space-y-6">
                  <div
                    className="font-mono"
                    style={{ fontSize: '11px', color: '#A09890' }}
                  >
                    {featuredItem.number}
                  </div>

                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#E8E3DC] shadow-raised-sm">
                    <span
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '11px',
                        color: '#8B7355',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {featuredItem.category}
                    </span>
                  </div>

                  <h3
                    className="font-serif"
                    style={{ fontSize: '40px', color: '#3D3830', fontWeight: 400 }}
                  >
                    {featuredItem.title}
                  </h3>

                  {featuredItem.description && (
                    <p
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '15px',
                        color: '#7A7268',
                        lineHeight: 1.7,
                      }}
                    >
                      {featuredItem.description.slice(0, 150)}
                      {featuredItem.description.length > 150 ? '...' : ''}
                    </p>
                  )}

                  {/* Tools/Technologies */}
                  {featuredItem.tools && featuredItem.tools.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {featuredItem.tools.slice(0, 4).map((tool: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-[#E8E3DC] shadow-raised-sm"
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '11px',
                            color: '#7A7268',
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    {featuredItem.link ? (
                      <a
                        href={featuredItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-white shadow-accent transition-shadow hover:shadow-accent-lg active:shadow-accent-sm"
                        style={{ textDecoration: 'none' }}
                      >
                        <span
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '14px',
                            fontWeight: 600,
                          }}
                        >
                          View Project
                        </span>
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <button className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-white shadow-accent transition-shadow hover:shadow-accent-lg active:shadow-accent-sm">
                        <span
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '14px',
                            fontWeight: 600,
                          }}
                        >
                          Learn More
                        </span>
                        <ArrowRight size={16} />
                      </button>
                    )}
                    
                    {featuredItem.github && (
                      <a
                        href={featuredItem.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8E3DC] shadow-raised text-[#3D3830] transition-shadow hover:shadow-raised-lg"
                        style={{ textDecoration: 'none' }}
                      >
                        <GithubIcon size={16} color="#3D3830" />
                        <span
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '14px',
                            fontWeight: 600,
                          }}
                        >
                          Code
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Two Column Items */}
          {mediumItems.length > 0 && (
            <div className={`grid ${mediumItems.length === 1 ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-8`}>
              {mediumItems.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-[24px] bg-[#E8E3DC] shadow-raised overflow-hidden transition-shadow hover:shadow-raised-lg cursor-pointer"
                >
                  <div className="h-48 overflow-hidden">
                    <div 
                      className="w-full h-full transition-transform duration-500 group-hover:scale-105 flex items-center justify-center"
                      style={{ background: getPlaceholderGradient(item.title) }}
                    >
                      <span
                        className="font-serif"
                        style={{
                          fontSize: '40px',
                          color: 'rgba(255,255,255,0.3)',
                        }}
                      >
                        {item.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#E8E3DC] shadow-raised-sm">
                      <span
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '10px',
                          color: '#8B7355',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '20px',
                        color: '#3D3830',
                        fontWeight: 700,
                      }}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '14px',
                          color: '#7A7268',
                        }}
                      >
                        {item.description.slice(0, 80)}
                        {item.description.length > 80 ? '...' : ''}
                      </p>
                    )}
                    <div className="flex gap-2 pt-2">
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '13px',
                            color: '#8B7355',
                            fontWeight: 600,
                            textDecoration: 'none',
                          }}
                        >
                          View <span>→</span>
                        </a>
                      )}
                      {item.github && (
                        <a
                          href={item.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1"
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '13px',
                            color: '#7A7268',
                            textDecoration: 'none',
                            marginLeft: '12px',
                          }}
                        >
                          <GithubIcon size={14} color="#7A7268" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Three Column Items */}
          {smallItems.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {smallItems.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-[#E8E3DC] shadow-raised overflow-hidden transition-shadow hover:shadow-raised-lg cursor-pointer"
                >
                  <div className="h-32 overflow-hidden">
                    <div 
                      className="w-full h-full transition-transform duration-500 group-hover:scale-105 flex items-center justify-center"
                      style={{ background: getPlaceholderGradient(item.title) }}
                    >
                      <span
                        className="font-serif"
                        style={{
                          fontSize: '24px',
                          color: 'rgba(255,255,255,0.3)',
                        }}
                      >
                        {item.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#E8E3DC] shadow-raised-sm">
                      <span
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '9px',
                          color: '#8B7355',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '16px',
                        color: '#3D3830',
                        fontWeight: 700,
                      }}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '13px',
                          color: '#7A7268',
                        }}
                      >
                        {item.description.slice(0, 50)}
                        {item.description.length > 50 ? '...' : ''}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Empty state if filter returns no results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p style={{ fontFamily: 'DM Sans', fontSize: '16px', color: '#A09890' }}>
              No items match this filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}