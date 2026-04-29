'use client';

import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { GitHub } from './BrandIcons';

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

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '24px',
          padding: '40px',
          maxWidth: '600px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#F2EFE9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X className="w-4 h-4 text-[#1A1A2E]" />
        </button>

        <p
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}
        >
          {project.category}
        </p>
        <h2
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1A1A2E', marginBottom: '16px' }}
        >
          {project.name}
        </h2>
        <p
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', lineHeight: 1.8, color: '#6B7280', marginBottom: '24px' }}
        >
          {project.fullDescription}
        </p>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '10px' }}>
            Tech Stack
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '12px',
                  padding: '4px 12px',
                  borderRadius: '8px',
                  backgroundColor: '#F2EFE9',
                  border: '1px solid #E5E1D8',
                  color: '#1A1A2E',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                borderRadius: '999px',
                backgroundColor: '#F5C842',
                color: '#1A1A2E',
                fontFamily: 'Sora, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
              }}
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                borderRadius: '999px',
                border: '1px solid #E5E1D8',
                color: '#1A1A2E',
                fontFamily: 'Sora, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
              }}
            >
              <GitHub className="w-4 h-4" /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}