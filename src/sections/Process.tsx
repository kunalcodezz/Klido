import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const phasesContainerRef = useRef<HTMLDivElement>(null);

  const transformationPhases = [
    {
      num: '01',
      title: 'Catalog & Costing Audit',
      focus: 'SKU rationalization and margin leakage identification.',
      details: 'We audit every SKU against its bill of materials, packaging costs, shipping tiers, and RTO return history to isolate loss-making variants before running paid traffic.',
      deliverable: 'SKU Rationalization & Leakage Audit Report'
    },
    {
      num: '02',
      title: 'Landed Unit Economics & P&L',
      focus: 'Mathematical break-even ROAS benchmarks and financial guardrails.',
      details: 'Building your dynamic Master P&L model. We factor in payment gateway fees, return losses, and supplier minimums so you know the exact allowable cost per acquisition.',
      deliverable: 'True Landed Margin & Master P&L Model'
    },
    {
      num: '03',
      title: 'Standard Operating Procedures',
      focus: 'Fulfillment checklists, inventory triggers, and SLA timers.',
      details: 'Written protocols for stock intake, 4-point quality inspection, packing dispatch speed, and RTO returns handling to eliminate fulfillment errors during sales spikes.',
      deliverable: 'Fulfillment SOP Playbook'
    },
    {
      num: '04',
      title: 'Weekly Tracking & Monthly Review',
      focus: 'Reconciliation of unit performance and working capital runway.',
      details: 'Weekly review of orders, return percentages, and net contribution margin followed by a monthly strategic alignment call to adjust ad budgets and inventory orders.',
      deliverable: 'Weekly Tracker & Monthly Founder Call'
    }
  ];

  const onboardingSteps = [
    {
      step: 'Step 1',
      title: 'Intro Call',
      desc: '20-minute discussion to evaluate current order volume, ad account status, and immediate operational bottlenecks.'
    },
    {
      step: 'Step 2',
      title: '30-Day Start',
      desc: 'Written scope signed, tracking credentials connected, and initial SOP priorities deployed within 72 hours.'
    },
    {
      step: 'Step 3',
      title: 'Monthly Review',
      desc: 'One concise executive report and one monthly strategy call analyzing ROAS, inventory turnover, and next steps.'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Scrub vertical line drawing
      if (lineRef.current && phasesContainerRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: phasesContainerRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.6,
            },
          }
        );
      }

      // Staggered reveal of phases
      const items = phasesContainerRef.current?.querySelectorAll('.process-phase-item');
      if (items && items.length > 0) {
        gsap.from(items, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: phasesContainerRef.current,
            start: 'top 75%',
          },
        });
      }

      // Onboarding columns reveal
      gsap.from('.onboarding-col', {
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.onboarding-container',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-[72px] lg:py-32 bg-transparent relative z-10 border-t border-[#D5E0EC]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 lg:col-span-8 bg-white/95 backdrop-blur-xs p-6 sm:p-8 rounded-[2px] border border-[#D5E0EC]/60">
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] font-medium text-[#5B6B7F] block mb-3">
              03 / Process
            </span>
            <h2 className="font-serif text-[32px] sm:text-[56px] font-normal text-[#0F1B2D] leading-[1.08] tracking-[-0.02em] mb-4">
              Our systematic 4-step method.
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#5B6B7F] max-w-[60ch]">
              From audit and financial modeling to weekly execution and fulfillment standardization.
            </p>
          </div>
        </div>

        {/* 4 Transformation Phases as Rows with vertical scrub progress line */}
        <div ref={phasesContainerRef} className="relative mb-20 space-y-4">
          {/* Vertical scrub indicator line positioned along the numbers */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-[3px] top-0 bottom-0 w-[2px] bg-[#2F7FD1] origin-top pointer-events-none"
          />

          {transformationPhases.map((phase) => (
            <div
              key={phase.num}
              className="process-phase-item p-6 sm:p-8 rounded-[2px] bg-white/95 backdrop-blur-xs border border-[#D5E0EC] grid grid-cols-12 gap-8 items-start transition-all duration-150 hover:border-[#2F7FD1]"
            >
              {/* Left Column: Number & Title */}
              <div className="col-span-12 md:col-span-4 pl-0 md:pl-6">
                <span className="font-mono text-[14px] text-[#2F7FD1] block mb-1 tabular-nums font-medium">
                  Phase {phase.num}
                </span>
                <h3 className="font-serif text-[20px] font-normal text-[#0F1B2D]">
                  {phase.title}
                </h3>
              </div>

              {/* Right Column: Focus, Details & Deliverable */}
              <div className="col-span-12 md:col-span-8">
                <p className="text-[16px] font-medium text-[#0F1B2D] mb-2">
                  {phase.focus}
                </p>
                <p className="text-[16px] leading-[1.6] text-[#5B6B7F] max-w-[60ch] mb-4">
                  {phase.details}
                </p>
                <div className="pt-3 border-t border-[#D5E0EC] flex items-center gap-2">
                  <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#5B6B7F]">
                    Deliverable:
                  </span>
                  <span className="text-[14px] text-[#0F1B2D] font-medium">
                    {phase.deliverable}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Onboarding Flow: 3 Aligned Columns with Staggered Entrance */}
        <div className="onboarding-container bg-white/95 backdrop-blur-xs p-8 rounded-[2px] border border-[#D5E0EC]/60">
          <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#5B6B7F] block mb-8 font-medium">
            Onboarding Timeline
          </span>
          <div className="grid grid-cols-12 gap-8">
            {onboardingSteps.map((item, idx) => (
              <div
                key={item.step}
                className={`onboarding-col col-span-12 md:col-span-4 ${
                  idx > 0 ? 'md:border-l md:border-[#D5E0EC] md:pl-8' : ''
                }`}
              >
                <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#2F7FD1] block mb-2 font-medium">
                  {item.step}
                </span>
                <h4 className="font-serif text-[20px] font-normal text-[#0F1B2D] mb-2">
                  {item.title}
                </h4>
                <p className="text-[14px] leading-[1.6] text-[#5B6B7F]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
