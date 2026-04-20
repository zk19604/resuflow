import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-9 h-9 rounded-full border transition-all duration-500 z-40 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5 pointer-events-none'
      }`}
      style={{
        borderColor: 'rgba(201, 169, 110, 0.25)',
        background: 'rgba(20, 20, 24, 0.9)',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.5)';
        e.currentTarget.style.background = 'rgba(25, 25, 32, 0.95)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.25)';
        e.currentTarget.style.background = 'rgba(20, 20, 24, 0.9)';
      }}
    >
      <ArrowUp className="w-4 h-4 mx-auto transition-transform duration-300 hover:-translate-y-0.5" style={{ color: 'var(--gold-primary)' }} />
    </button>
  );
}
