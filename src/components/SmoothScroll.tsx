import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { updateScrollState } from '../canvas/scrollStore';

gsap.registerPlugin(ScrollTrigger);

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Update ScrollTrigger & scrollState directly on Lenis scroll (NO setState per scroll tick!)
    const onLenisScroll = (e: { scroll: number }) => {
      ScrollTrigger.update();
      const currentY = e.scroll;
      updateScrollState(currentY);

      if (progressBarRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? Math.min(1, Math.max(0, currentY / total)) : 0;
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    lenis.on('scroll', onLenisScroll);

    // EXACTLY ONE animation loop: Lenis driven by gsap.ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return (
    <>
      {/* 2px Accent Line Scroll Progress Indicator fixed at top (Direct DOM transform, no React state) */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[90] pointer-events-none bg-transparent"
        style={{ transformOrigin: '0 50%' }}
      >
        <div
          ref={progressBarRef}
          className="h-full bg-[#1558C9] origin-left will-change-transform"
          style={{ transform: 'scaleX(0)', transformOrigin: '0 50%' }}
        />
      </div>
      {children}
    </>
  );
};
