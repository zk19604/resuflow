import React from 'react';

export const NeonProjectCard = ({ title, tech }: { title: string, tech: string }) => (
  <div style={{
    background: '#0f172a',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '24px',
    padding: '32px',
    transition: '0.3s'
  }}>
    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>{title}</h3>
    <p style={{ color: '#94a3b8', fontSize: '14px' }}>{tech}</p>
  </div>
);