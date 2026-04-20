import React from 'react';

export const NeonNavbar = () => (
  <nav style={{
    display: 'flex',
    justifyContent: 'space-between',
    padding: '32px 40px',
    position: 'relative',
    zIndex: 10
  }}>
    <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>
      NEON<span style={{ color: '#22d3ee' }}>VAULT</span>
    </div>
    <div style={{ display: 'flex', gap: '30px', alignItems: 'center', fontSize: '12px', color: '#94a3b8', fontWeight: 'bold' }}>
      <span>PROJECTS</span>
      <span>STACK</span>
      <button style={{
        padding: '8px 20px',
        border: '1px solid #22d3ee',
        background: 'rgba(34, 211, 238, 0.1)',
        color: '#22d3ee',
        borderRadius: '20px',
        cursor: 'pointer'
      }}>CONTACT</button>
    </div>
  </nav>
);