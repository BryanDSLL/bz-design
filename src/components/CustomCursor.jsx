import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor({ active = true }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!active || !cursorRef.current) return;

    // Follow mouse with a smooth spring/interpolation
    const xTo = gsap.quickTo(cursorRef.current, 'x', {
      duration: 0.15,
      ease: 'power3',
    });
    const yTo = gsap.quickTo(cursorRef.current, 'y', {
      duration: 0.15,
      ease: 'power3',
    });

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Magnetic interactions on hoverable items
    const handleMouseOver = (e) => {
      const target = e.target;
      const isHoverable = target.tagName.toLowerCase() === 'a' || 
                          target.tagName.toLowerCase() === 'button' || 
                          target.closest('a') || 
                          target.closest('button') ||
                          target.classList.contains('magnetic');
                          
      if (isHoverable) {
        gsap.to(cursorRef.current, {
          scale: 3,
          backgroundColor: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.5)',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseOut = () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: '#fff',
        border: 'none',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-difference z-[9999] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
    />
  );
}
