import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { CountUp } from 'countup.js';
import { StaticHeroPhone } from '../canvas/SharedCanvas';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const metricNum1 = useRef<HTMLSpanElement>(null);
  const metricNum2 = useRef<HTMLSpanElement>(null);
  const metricNum3 = useRef<HTMLSpanElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let splitInstance: SplitType | null = null;
    const ctx = gsap.context(() => {
      // SplitType headline reveal
      if (headlineRef.current) {
        splitInstance = new SplitType(headlineRef.current, { types: 'lines' });
        if (splitInstance.lines) {
          // Wrap each line in an overflow-hidden container for clean mask reveal
          splitInstance.lines.forEach((line) => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'block';
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });

          gsap.from(splitInstance.lines, {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.2,
          });
        }
      }

      // Subheading & CTAs reveal
      gsap.from('.hero-subhead', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.45,
      });

      gsap.fromTo(
        '.hero-cta-btn',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.6 }
      );

      // Metric bar line reveal scaleX
      gsap.from('.hero-divider', {
        scaleX: 0,
        transformOrigin: '0 50%',
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.7,
      });

      // Metric items fade up
      gsap.from('.hero-metric-item', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.8,
        onComplete: () => {
          // Run CountUp for 10 creators and 72 hours
          if (metricNum2.current) {
            const c2 = new CountUp(metricNum2.current, 10, { duration: 1.5, suffix: ' Creators / mo' });
            if (!c2.error) c2.start();
          }
          if (metricNum3.current) {
            const c3 = new CountUp(metricNum3.current, 72, { duration: 1.8, suffix: 'h Deployment' });
            if (!c3.error) c3.start();
          }
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (splitInstance) splitInstance.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="pt-24 pb-16 lg:pt-36 lg:pb-24 bg-transparent relative z-20 pointer-events-auto"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        {/* Hero Split: 55% Text zone on the left, 45% 3D Portal zone on the right on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
          {/* Text Column: sits directly on clean #030407 background with no box */}
          <div className="w-full lg:w-[55%] relative z-20 pointer-events-auto">
            <span className="hero-subhead text-[12px] uppercase font-sans tracking-[0.08em] font-medium text-[#9AA3B2] block mb-4">
              Digital Growth & E-Commerce Operations
            </span>

            {/* Headline: maximum 2 lines, clamp(40px, 6vw, 84px), color #F4F6FA, strong contrast */}
            <h1
              ref={headlineRef}
              className="font-serif font-normal text-[#F4F6FA] leading-[1.06] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 84px)' }}
            >
              Growth without the chaos.
            </h1>

            {/* Subtext: #9AA3B2, max width 52ch */}
            <p className="hero-subhead text-[16px] sm:text-[17px] leading-[1.6] text-[#9AA3B2] max-w-[52ch] mb-8">
              We run the marketing and the back-end, so your brand can scale without chaos. All unit economics audited before scaling.
            </p>

            {/* Buttons: 48px height, 2px radius, same spacing, fully visible at scroll 0 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary button: solid Acid Lime #D4FF24 with #030407 text */}
              <button
                type="button"
                onClick={() => scrollTo('services')}
                className="hero-cta-btn h-12 px-6 rounded-[2px] bg-[#D4FF24] hover:bg-[#c2ed18] text-[#030407] text-[14px] font-semibold leading-none transition-all duration-150 ease-out text-center cursor-pointer hover:-translate-y-0.5 whitespace-nowrap inline-flex items-center justify-center shadow-sm"
              >
                Explore Our Services
              </button>

              {/* Secondary button: transparent with 1px rgba(255,255,255,0.35) border and #F4F6FA text, hover border #1558C9 */}
              <button
                type="button"
                onClick={() => scrollTo('pricing')}
                className="hero-cta-btn h-12 px-6 rounded-[2px] bg-transparent border border-[rgba(255,255,255,0.35)] hover:border-[#1558C9] hover:bg-[#1558C9]/10 text-[#F4F6FA] text-[14px] font-medium leading-none transition-all duration-150 ease-out text-center cursor-pointer hover:-translate-y-0.5 whitespace-nowrap inline-flex items-center justify-center"
              >
                Build Your Growth Plan
              </button>
            </div>
          </div>

          {/* On tablet & mobile (< 1024px): Dedicated slot below the text */}
          <div className="block lg:hidden w-full h-[54vh] max-h-[480px] my-4 pointer-events-none">
            <StaticHeroPhone />
          </div>

          {/* Desktop Right Zone: 45% width dedicated portal space (min-height 70vh, vertically centered) */}
          <div
            className="hidden lg:flex lg:w-[45%] min-h-[70vh] items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <StaticHeroPhone />
          </div>
        </div>

        {/* Stats Bar: Fully opaque #0B0F18 with 1px rgba(255,255,255,0.08) border, 48px spacing from buttons (mt-12) */}
        <div className="hero-divider bg-[#0B0F18] p-6 sm:p-8 rounded-[2px] border border-[rgba(255,255,255,0.08)] mt-12 grid grid-cols-12 gap-8 shadow-xs">
          <div className="hero-metric-item col-span-12 sm:col-span-4">
            <span
              ref={metricNum1}
              className="font-serif text-[24px] font-normal text-[#F4F6FA] block mb-1 tabular-nums"
            >
              0% Markup
            </span>
            <p className="text-[14px] leading-relaxed text-[#9AA3B2]">
              Ad spend paid directly to Meta with zero markup or hidden margin cuts.
            </p>
          </div>

          <div className="hero-metric-item col-span-12 sm:col-span-4 sm:border-l sm:border-[rgba(255,255,255,0.08)] sm:pl-8">
            <span
              ref={metricNum2}
              className="font-serif text-[24px] font-normal text-[#F4F6FA] block mb-1 tabular-nums"
            >
              10 Creators / mo
            </span>
            <p className="text-[14px] leading-relaxed text-[#9AA3B2]">
              Vetted barter creator placements delivering monthly UGC assets for ad testing.
            </p>
          </div>

          <div className="hero-metric-item col-span-12 sm:col-span-4 sm:border-l sm:border-[rgba(255,255,255,0.08)] sm:pl-8">
            <span
              ref={metricNum3}
              className="font-serif text-[24px] font-normal text-[#F4F6FA] block mb-1 tabular-nums"
            >
              72h Deployment
            </span>
            <p className="text-[14px] leading-relaxed text-[#9AA3B2]">
              Account access, tracking setup, and SKU audit initiated within three business days.
            </p>
          </div>
        </div>

        {/* Subtle Animated Scroll Hint (Disappears after first scroll) */}
        <div
          className={`flex flex-col items-center justify-center mt-10 transition-all duration-500 ${hasScrolled ? 'opacity-0 translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
          aria-hidden={hasScrolled}
        >
          <span className="text-[11px] uppercase font-sans tracking-[0.2em] font-medium text-[#9AA3B2] mb-2.5">
            Scroll to explore
          </span>
          <div className="w-[1.5px] h-8 bg-gradient-to-b from-[#D4FF24] via-[#1558C9] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};
