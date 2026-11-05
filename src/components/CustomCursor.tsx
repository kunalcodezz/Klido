import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only on desktop fine pointer devices (pointer: fine) and screen width >= 1024px
    if (typeof window === 'undefined') return;

    const checkEnabled = () => {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const isWideEnough = window.innerWidth >= 1024;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return isFinePointer && !isCoarsePointer && isWideEnough && !prefersReducedMotion;
    };

    const enabled = checkEnabled();
    setIsEnabled(enabled);
    if (!enabled) return;

    const el = cursorRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.18, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.18, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], label, .cursor-pointer');
      setIsHovered(!!isInteractive);
    };

    const handleResize = () => {
      const currentlyEnabled = checkEnabled();
      setIsEnabled(currentlyEnabled);
      if (!currentlyEnabled) setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[999] rounded-full transition-all duration-200 ease-out ${!isVisible ? 'opacity-0' : 'opacity-100'
        } ${isHovered
          ? 'w-10 h-10 border-2 border-[#3D5AFE] bg-[#3D5AFE]/10'
          : 'w-2.5 h-2.5 bg-[#3D5AFE]'
        }`}
    />
  );
};
