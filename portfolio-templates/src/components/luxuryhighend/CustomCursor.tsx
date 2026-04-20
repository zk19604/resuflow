import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Lag effect for outer ring
      setTimeout(() => {
        setOuterPosition({ x: e.clientX, y: e.clientY });
      }, 120);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold-primary)' }} />
      </div>
      
      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-300"
        style={{
          left: outerPosition.x,
          top: outerPosition.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.7 : isHovering ? 1.7 : 1})`,
        }}
      >
        <div 
          className="w-7 h-7 rounded-full border transition-all duration-300"
          style={{
            borderColor: 'rgba(201, 169, 110, 0.4)',
            background: isHovering ? 'rgba(201, 169, 110, 0.08)' : 'transparent',
          }}
        />
      </div>
    </>
  );
}
