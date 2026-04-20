import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 h-screen w-[1px] z-40 pointer-events-none">
      <div 
        className="w-full transition-all duration-100"
        style={{
          height: `${progress}%`,
          background: 'var(--gold-primary)',
          opacity: 0.6,
        }}
      />
      <div 
        className="absolute w-2 h-2 rounded-full -left-[3px] transition-all duration-100"
        style={{
          top: `${progress}%`,
          background: 'var(--gold-primary)',
          boxShadow: '0 0 8px rgba(201, 169, 110, 0.5)',
        }}
      />
    </div>
  );
}
