import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import { UserProfile } from '@/types/userProfile';

interface EditorialProps {
  profile: UserProfile;
}

// Unsplash placeholder images — used when no image is available
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1593527658229-95d536591c83?auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1651629679477-82cab6ec3443?auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1763121379638-8839d20e7551?auto=format&fit=crop&w=1080&q=80',
];

interface ArticleItem {
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  image: string;
  href: string;
}

export default function Editorial({ profile }: EditorialProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Build articles from publications first, then projects as fallback
  const articles: ArticleItem[] = [];

  profile.publications.forEach((pub, i) => {
    articles.push({
      title: pub.title || 'Untitled Publication',
      category: pub.publisher || 'Publication',
      excerpt: `Published ${pub.date ? `on ${pub.date}` : ''}${pub.publisher ? ` by ${pub.publisher}` : ''}.`.trim(),
      readTime: '5 min',
      image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
      href: pub.link || '#',
    });
  });

  profile.projects.slice(0, Math.max(0, 3 - articles.length)).forEach((proj, i) => {
    articles.push({
      title: proj.name || 'Untitled Project',
      category: proj.type || 'Project',
      excerpt: proj.description || 'An in-depth project showcasing expertise and craft.',
      readTime: `${3 + i} min`,
      image: PLACEHOLDER_IMAGES[(articles.length + i) % PLACEHOLDER_IMAGES.length],
      href: proj.link || '#',
    });
  });

  // If still not enough, pad with achievement entries
  if (articles.length < 3) {
    const achievementItems = Array.isArray(profile.achievements)
      ? profile.achievements
      : [];
    achievementItems.slice(0, 3 - articles.length).forEach((ach, i) => {
      const title = typeof ach === 'string' ? ach : ach.title;
      const description = typeof ach === 'string' ? '' : ach.description;
      articles.push({
        title: title || 'Achievement',
        category: 'Achievement',
        excerpt: description || title || '',
        readTime: '3 min',
        image: PLACEHOLDER_IMAGES[(articles.length + i) % PLACEHOLDER_IMAGES.length],
        href: '#',
      });
    });
  }

  // If no real content at all, show placeholder cards
  const displayArticles: ArticleItem[] =
    articles.length >= 1
      ? articles.slice(0, 3)
      : [
          {
            title: 'Add publications or projects to populate this section',
            category: 'Getting started',
            excerpt:
              'Upload a CV with publications, projects, or achievements to display them here automatically.',
            readTime: '1 min',
            image: PLACEHOLDER_IMAGES[0],
            href: '#',
          },
        ];

  // Hide section entirely if no relevant data
  const hasContent =
    profile.publications.length > 0 ||
    profile.projects.length > 0 ||
    (Array.isArray(profile.achievements) && profile.achievements.length > 0);

  if (!hasContent) return null;

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-10 h-[1px]"
              style={{ background: 'var(--gold-primary)' }}
            />
            <span
              className="text-xs tracking-[0.18em] uppercase"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--gold-primary)',
              }}
            >
              {profile.publications.length > 0 ? 'Publications' : 'Projects & Work'}
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              color: 'var(--text-primary)',
            }}
          >
            {profile.publications.length > 0 ? 'Perspectives' : 'Selected Work'}
          </h2>
        </motion.div>

        {/* Articles Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article (takes 2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-2 group cursor-pointer"
          >
            <div
              className="relative h-[400px] overflow-hidden border mb-6"
              style={{
                borderColor: 'rgba(201, 169, 110, 0.10)',
                borderRadius: '4px',
              }}
            >
              <img
                src={displayArticles[0].image}
                alt={displayArticles[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(to top, rgba(12,12,14,0.8) 0%, transparent 60%)',
                }}
              />
            </div>

            <div className="mb-3">
              <span
                className="text-xs tracking-[0.12em] uppercase"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--gold-primary)',
                }}
              >
                {displayArticles[0].category}
              </span>
            </div>

            <h3
              className="text-3xl mb-4 transition-colors duration-300 group-hover:text-[var(--gold-primary)]"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                color: 'var(--text-primary)',
              }}
            >
              {displayArticles[0].title}
            </h3>

            <p
              className="text-[15px] leading-[1.75] mb-4 max-w-2xl"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
              }}
            >
              {displayArticles[0].excerpt}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
                <span
                  className="text-xs"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  {displayArticles[0].readTime} read
                </span>
              </div>
              <a
                href={displayArticles[0].href}
                target={displayArticles[0].href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs transition-colors duration-300 group-hover:text-[var(--gold-primary)]"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                }}
              >
                Read
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Smaller Articles */}
          <div className="space-y-8">
            {displayArticles.slice(1).map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.2 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group cursor-pointer pb-8 border-b"
                style={{
                  borderColor:
                    index < displayArticles.slice(1).length - 1
                      ? 'rgba(201, 169, 110, 0.08)'
                      : 'transparent',
                }}
              >
                <div className="flex gap-4">
                  <div
                    className="w-24 h-24 flex-shrink-0 overflow-hidden border"
                    style={{ borderColor: 'rgba(201, 169, 110, 0.10)', borderRadius: '4px' }}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-2">
                      <span
                        className="text-[10px] tracking-[0.12em] uppercase"
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: 'var(--gold-primary)',
                        }}
                      >
                        {article.category}
                      </span>
                    </div>

                    <h3
                      className="text-xl mb-2 leading-tight transition-colors duration-300 group-hover:text-[var(--gold-primary)]"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {article.title}
                    </h3>

                    <p
                      className="text-xs mb-2 line-clamp-2"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-3">
                      <span
                        className="text-[10px]"
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: 'var(--text-tertiary)',
                        }}
                      >
                        {article.readTime}
                      </span>
                      <a
                        href={article.href}
                        target={article.href !== '#' ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-[10px] transition-colors duration-300 group-hover:text-[var(--gold-primary)]"
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        Read →
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
