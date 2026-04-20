import React from 'react';

export const NeonProjectCard = ({ title, tech }: { title: string, tech: string }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    backdropFilter: 'blur(10px)',
    transition: '0.3s'
  }}>
    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>{title}</h3>
    <p style={{ color: '#94a3b8', fontSize: '14px' }}>{tech}</p>
  </div>
);