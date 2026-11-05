import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { CountUp } from 'countup.js';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

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
        {/* Hero Split: 55% Text zone on the left, 45% Before/After Showcase on the right */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-14">
          {/* Text Column */}
          <div className="w-full lg:w-[55%] relative z-20 pointer-events-auto">
            {/* Availability / Status Badge */}
            <div className="hero-subhead inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E8EDFF] border border-[#3D5AFE]/25 text-[#3D5AFE] text-[12px] font-semibold tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-[#3D5AFE] animate-pulse" />
              <span>AVAILABLE FOR NEW CLIENTS · Q2 2026</span>
            </div>

            {/* Headline: Modern bold sans-serif with electric blue highlight */}
            <h1
              ref={headlineRef}
              className="font-sans font-bold text-[#111827] leading-[1.04] tracking-[-0.035em] mb-6"
              style={{ fontSize: 'clamp(42px, 6.2vw, 82px)' }}
            >
              Growth without the <span className="text-[#3D5AFE]">chaos</span>.
            </h1>

            {/* Subtext: Muted grey #64748B, max width 50ch */}
            <p className="hero-subhead text-[17px] sm:text-[18px] leading-[1.65] text-[#64748B] max-w-[50ch] mb-8 font-normal">
              We run the marketing and the back-end, so your brand can scale without chaos. All unit economics audited before scaling.
            </p>

            {/* Two Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary button: Electric Blue #3D5AFE with white text & subtle lime accent */}
              <button
                type="button"
                onClick={() => scrollTo('services')}
                className="hero-cta-btn h-12 px-8 rounded-full bg-[#3D5AFE] hover:bg-[#2F47D4] text-white text-[15px] font-semibold leading-none transition-all duration-150 ease-out text-center cursor-pointer hover:-translate-y-0.5 whitespace-nowrap inline-flex items-center justify-center shadow-md shadow-[#3D5AFE]/25 hover:shadow-lg hover:shadow-[#3D5AFE]/30"
              >
                Explore Our Services
              </button>

              {/* Secondary button: Clean white with subtle border and text #111827 */}
              <button
                type="button"
                onClick={() => scrollTo('pricing')}
                className="hero-cta-btn h-12 px-8 rounded-full bg-white border border-[#E5EAF5] hover:border-[#3D5AFE] hover:bg-[#F3F6FF] text-[#111827] text-[15px] font-medium leading-none transition-all duration-150 ease-out text-center cursor-pointer hover:-translate-y-0.5 whitespace-nowrap inline-flex items-center justify-center shadow-xs"
              >
                Build Your Growth Plan
              </button>
            </div>
          </div>

          {/* On tablet & mobile (< 1024px): Interactive Before/After Comparison Showcase inside white rounded card */}
          <div className="block lg:hidden w-full my-6 pointer-events-auto">
            <div className="rounded-3xl p-2.5 sm:p-3 bg-white border border-[#E5EAF5] shadow-[0_20px_50px_rgba(61,90,254,0.07)]">
              <BeforeAfterSlider />
            </div>
          </div>

          {/* Desktop Right Zone: 45% width inside large white rounded container with subtle shadow */}
          <div className="hidden lg:flex lg:w-[45%] items-center justify-center pointer-events-auto">
            <div className="w-full rounded-3xl p-3 sm:p-4 bg-white border border-[#E5EAF5] shadow-[0_20px_50px_rgba(61,90,254,0.07)]">
              <BeforeAfterSlider />
            </div>
          </div>
        </div>

        {/* Stats Bar: Clean white rounded card with 1px border #E5EAF5 and soft shadow */}
        <div className="hero-divider bg-white p-6 sm:p-8 rounded-2xl border border-[#E5EAF5] mt-14 grid grid-cols-12 gap-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
          <div className="hero-metric-item col-span-12 sm:col-span-4">
            <span
              ref={metricNum1}
              className="font-sans text-[26px] font-bold text-[#111827] block mb-1 tabular-nums tracking-tight"
            >
              0% Markup
            </span>
            <p className="text-[14px] leading-relaxed text-[#64748B]">
              Ad spend paid directly to Meta with zero markup or hidden margin cuts.
            </p>
          </div>

          <div className="hero-metric-item col-span-12 sm:col-span-4 sm:border-l sm:border-[#E5EAF5] sm:pl-8">
            <span
              ref={metricNum2}
              className="font-sans text-[26px] font-bold text-[#111827] block mb-1 tabular-nums tracking-tight"
            >
              10 Creators / mo
            </span>
            <p className="text-[14px] leading-relaxed text-[#64748B]">
              Vetted barter creator placements delivering monthly UGC assets for ad testing.
            </p>
          </div>

          <div className="hero-metric-item col-span-12 sm:col-span-4 sm:border-l sm:border-[#E5EAF5] sm:pl-8">
            <span
              ref={metricNum3}
              className="font-sans text-[26px] font-bold text-[#111827] block mb-1 tabular-nums tracking-tight"
            >
              72h Deployment
            </span>
            <p className="text-[14px] leading-relaxed text-[#64748B]">
              Account access, tracking setup, and SKU audit initiated within three business days.
            </p>
          </div>
        </div>

        {/* Subtle Animated Scroll Hint (Disappears after first scroll) */}
        <div
          className={`flex flex-col items-center justify-center mt-12 transition-all duration-500 ${hasScrolled ? 'opacity-0 translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
          aria-hidden={hasScrolled}
        >
          <span className="text-[11px] uppercase font-sans tracking-[0.2em] font-semibold text-[#64748B] mb-2.5">
            Scroll to explore
          </span>
          <div className="w-[2px] h-8 bg-gradient-to-b from-[#3D5AFE] via-[#C6F432] to-transparent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
