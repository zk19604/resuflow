"use client";

import Image from 'next/image';
import { useState } from 'react';
import { WorkExperience } from '@/types/userProfile';

interface WorkSectionProps {
  experience: WorkExperience[];
}

const IMG_DASHBOARD = "https://images.unsplash.com/photo-1687125114692-54f19a0fd438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVSSUyMGRlc2lnbiUyMGRhc2hib2FyZCUyMGRhcmslMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcyNjM2MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_MOBILE = "https://images.unsplash.com/photo-1748801583967-3038967d7279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBwcm9kdWN0JTIwc2NyZWVufGVufDF8fHx8MTc3MjYzNjAyN3ww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_BRAND = "https://images.unsplash.com/photo-1760037034804-2dce280659e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWduJTIwbG9nbyUyMGFic3RyYWN0fGVufDF8fHx8MTc3MjYzNjAyN3ww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_SPATIAL = "https://images.unsplash.com/photo-1687389806477-22be64a5480f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHNwYXRpYWwlMjBpbnRlcmZhY2UlMjBhdWdtZW50ZWQlMjByZWFsaXR5JTIwdmlzaW9ufGVufDF8fHx8MTc3MjYzNjAyOXww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_DS = "https://images.unsplash.com/photo-1667422380246-3bed910ffae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBjb21wb25lbnQlMjBsaWJyYXJ5JTIwd2VifGVufDF8fHx8MTc3MjYzNjAyOXww&ixlib=rb-4.1.0&q=80&w=1080";

interface Project {
  title: string;
  category: string;
  image: string;
  featured?: boolean;
  accent: string;
}

const projects: Project[] = [
  {
    title: 'Horizon OS — Vision Pro Interface',
    category: 'Spatial Computing',
    image: IMG_SPATIAL,
    featured: true,
    accent: 'rgba(123,47,255,0.6)',
  },
  {
    title: 'Pulse Analytics Dashboard',
    category: 'Product Design',
    image: IMG_DASHBOARD,
    accent: 'rgba(26,111,255,0.55)',
  },
  {
    title: 'Bloom — Mobile Health App',
    category: 'Mobile UX',
    image: IMG_MOBILE,
    accent: 'rgba(255,45,120,0.55)',
  },
  {
    title: 'Nova Design System',
    category: 'Design Systems',
    image: IMG_DS,
    accent: 'rgba(0,212,200,0.5)',
  },
  {
    title: 'Aether Brand Identity',
    category: 'Creative Direction',
    image: IMG_BRAND,
    accent: 'rgba(123,47,255,0.5)',
  },
];

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        height: featured ? 480 : 320,
        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
        cursor: 'pointer',
        boxShadow: hovered
          ? `0 24px 80px rgba(0,0,0,0.5), 0 0 60px ${project.accent}`
          : '0 8px 48px rgba(0,0,0,0.35)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: hovered ? 'blur(32px)' : 'blur(20px)',
        WebkitBackdropFilter: hovered ? 'blur(32px)' : 'blur(20px)',
      }}
    >
      {/* Image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes={featured ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
        style={{
          objectFit: 'cover',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 500ms cubic-bezier(0.25,0.46,0.45,0.94)',
          filter: 'brightness(0.75) saturate(1.1)',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(8,8,16,0.88) 0%, rgba(8,8,16,0.20) 50%, transparent 100%)',
        }}
      />

      {/* Orb glow behind card on hover */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            bottom: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 300,
            height: 200,
            borderRadius: '50%',
            background: project.accent,
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32 }}>
        {/* Category tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.10)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 100,
            padding: '5px 12px',
            marginBottom: 12,
          }}
        >
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.70)' }}>
            {project.category}
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: featured ? 28 : 20,
            color: '#FFFFFF',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>
      </div>
    </div>
  );
}

export function WorkSection({ experience }: WorkSectionProps) {
  const roleLabel = experience[0]?.role || 'Professional';
  
  return (
    <section id="work" style={{ padding: '120px 80px', position: 'relative', zIndex: 2, width: '100%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Label */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)' }}>
            Experience
          </span>
        </div>
        <h2
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 42, color: '#FFFFFF', marginBottom: 64, textAlign: 'center' }}
        >
          My Journey
        </h2>

        {/* Featured project */}
        <div style={{ marginBottom: 20 }}>
          <ProjectCard project={projects[0]} featured />
        </div>

        {/* 2-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <ProjectCard project={projects[1]} />
          <ProjectCard project={projects[2]} />
        </div>

        {/* Asymmetric row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }}>
          <ProjectCard project={projects[3]} />
          <ProjectCard project={projects[4]} />
        </div>
      </div>
    </section>
  );
}