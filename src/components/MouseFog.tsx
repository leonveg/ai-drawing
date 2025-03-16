import React, { useEffect, useRef } from 'react';

const MouseFog = () => {
  const fogRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!fogRef.current) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      fogRef.current.style.background = `
        radial-gradient(
          600px circle at ${x}px ${y}px,
          rgba(255,255,255,0.05),
          transparent 40%
        )
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={fogRef}
      className="pointer-events-none fixed inset-0 z-30 transition-all duration-300"
      style={{ mixBlendMode: 'plus-lighter' }}
    />
  );
};

export default MouseFog;