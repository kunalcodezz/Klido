import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NumberFlow from '@number-flow/react';
import { ArrowUpRight } from 'lucide-react';
import { servicesData } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onSelectService?: (serviceId: string) => void;
}

// Micro animated line icon for each service
const ServiceLineIcon: React.FC<{ type: string }> = ({ type }) => {
  return (
    <div className="w-8 h-8 rounded-[2px] border border-[#D5E0EC] bg-[#EEF4FA] flex items-center justify-center shrink-0 text-[#2F7FD1] group-hover:border-[#2F7FD1] transition-colors duration-200">
      {type === 'meta-ads' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      )}
      {type === 'influencer-marketing' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      )}
      {type === 'social-media' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )}
      {type === 'business-operations' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )}
    </div>
  );
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const rowsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ScaleX divider rule
      if (dividerRef.current) {
        gsap.from(dividerRef.current, {
          scaleX: 0,
          transformOrigin: '0 50%',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 85%',
          },
        });
      }

      // Staggered rows fade-up
      const rows = rowsContainerRef.current?.querySelectorAll('.service-row');
      if (rows && rows.length > 0) {
        gsap.from(rows, {
          y: 32,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rowsContainerRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSelectService = (id: string) => {
    if (onSelectService) {
      onSelectService(id);
    }
    const pricingEl = document.getElementById('pricing');
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="services" className="py-[72px] lg:py-32 bg-transparent relative z-10">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        {/* Section Header with frosted backing for high contrast readability */}
        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 lg:col-span-9 bg-white/95 backdrop-blur-xs p-6 sm:p-8 rounded-[2px] border border-[#D5E0EC]/60">
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] font-medium text-[#5B6B7F] block mb-3">
              01 / Services
            </span>
            <h2 className="font-serif text-[32px] sm:text-[56px] font-normal text-[#0F1B2D] leading-[1.08] tracking-[-0.02em] mb-4">
              Capabilities for customer acquisition and back-office control.
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#5B6B7F] max-w-[60ch]">
              Four focused service lines. Available individually or bundled into an integrated monthly growth retainer.
            </p>
          </div>
        </div>

        {/* Section Divider with ScrollTrigger scaleX animation */}
        <div ref={dividerRef} className="border-t border-[#D5E0EC] mb-4" />

        {/* Rows: Left Column = Title & Price, Right Column = Description & Scope */}
        <div ref={rowsContainerRef} className="space-y-4">
          {servicesData.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="service-row group p-6 sm:p-8 rounded-[2px] bg-white/95 backdrop-blur-xs border border-[#D5E0EC] grid grid-cols-12 gap-8 items-start transition-all duration-200 hover:-translate-y-1 hover:border-[#2F7FD1]"
            >
              {/* Left Column: Title & Tabular Price with NumberFlow */}
              <div className="col-span-12 md:col-span-4">
                <div className="flex items-center gap-3 mb-2">
                  <ServiceLineIcon type={service.id} />
                  <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#5B6B7F] block">
                    Tier {service.number}
                  </span>
                </div>

                <h3 className="font-serif text-[22px] font-normal text-[#0F1B2D] mb-1 group-hover:text-[#2F7FD1] transition-colors">
                  {service.name}
                </h3>
                {service.id === 'meta-ads' && (
                  <span className="text-[12px] text-[#2F7FD1] font-mono block mb-2">
                    Ads that pay for themselves
                  </span>
                )}
                {service.id === 'influencer-marketing' && (
                  <span className="text-[12px] text-[#2F7FD1] font-mono block mb-2">
                    Creators. Campaigns. Real execution
                  </span>
                )}
                {service.id === 'business-operations' && (
                  <span className="text-[12px] text-[#2F7FD1] font-mono block mb-2">
                    From home business to online brand
                  </span>
                )}

                <div className="flex items-baseline gap-1 font-price text-[16px] text-[#0F1B2D] mt-2">
                  <NumberFlow
                    value={service.startingPrice}
                    locales="en-IN"
                    format={{
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0,
                    }}
                  />
                  <span className="text-[12px] text-[#5B6B7F]">/ mo</span>
                </div>
                {service.priceNote && (
                  <p className="text-[12px] text-[#5B6B7F] mt-1 max-w-[30ch]">
                    {service.priceNote}
                  </p>
                )}
              </div>

              {/* Right Column: Description & Concrete Deliverables */}
              <div className="col-span-12 md:col-span-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="max-w-[50ch]">
                  <p className="text-[16px] leading-[1.6] text-[#5B6B7F] mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="text-[14px] text-[#0F1B2D] flex items-start gap-2">
                        <span className="text-[#2F7FD1] text-[12px] mt-0.5">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 pt-2">
                  <button
                    type="button"
                    onClick={() => handleSelectService(service.id)}
                    className="group/btn h-12 px-6 rounded-[2px] border border-[#D5E0EC] text-[#0F1B2D] hover:border-[#2F7FD1] hover:text-[#2F7FD1] text-[14px] font-medium leading-none bg-white transition-all duration-150 ease-out cursor-pointer whitespace-nowrap flex items-center gap-2"
                  >
                    <span>Select for plan</span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
