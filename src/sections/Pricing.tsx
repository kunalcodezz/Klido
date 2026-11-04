import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import { PRICING_SERVICES, PRICING_BUNDLES, HOW_WE_START_STEPS, AGENCY_CONTACT } from '../data/pricing';
import { PricingModule, PricingPlanTier } from '@/components/ui/pricing-module';

interface PricingProps {
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
  onPlanSelected?: (services: string[], finalPrice: number, bundleName?: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({
  selectedServices,
  setSelectedServices,
  onPlanSelected
}) => {
  const calculatorRef = useRef<HTMLDivElement>(null);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSelectedServices([]);
  };

  // Match current selections with a bundle
  const matchingBundle = PRICING_BUNDLES.find((bundle) => {
    if (bundle.serviceIds.length !== selectedServices.length) return false;
    return bundle.serviceIds.every((id) => selectedServices.includes(id));
  });

  const individualSum = selectedServices.reduce((acc, id) => {
    const s = PRICING_SERVICES.find((srv) => srv.id === id);
    return acc + (s ? s.price : 0);
  }, 0);

  const finalPrice = matchingBundle ? matchingBundle.bundlePrice : individualSum;
  const savings = matchingBundle ? matchingBundle.originalPrice - matchingBundle.bundlePrice : 0;

  const getWhatsAppLink = () => {
    const names = selectedServices
      .map((id) => PRICING_SERVICES.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = selectedServices.length > 0
      ? `Hi Klido, I selected: ${names} (${matchingBundle ? matchingBundle.name : 'Custom Selection'}). Quoted fee: ₹${finalPrice.toLocaleString('en-IN')}/mo. Please let me know the next steps.`
      : `Hi Klido, I would like to enquire about your growth and operations pricing.`;

    return `https://wa.me/91${AGENCY_CONTACT.phone}?text=${encodeURIComponent(text)}`;
  };

  const handleProceedToContact = () => {
    if (onPlanSelected) {
      onPlanSelected(selectedServices, finalPrice, matchingBundle?.name);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When a card in the PricingModule is clicked:
  const handleSelectTierFromCard = (tier: PricingPlanTier) => {
    setSelectedServices(tier.serviceIds);
    if (onPlanSelected) {
      onPlanSelected(tier.serviceIds, tier.price, tier.name);
    }
    // Smooth scroll to calculator above
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="pricing" className="py-[72px] lg:py-32 bg-transparent relative z-10 border-t border-white/8">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 lg:col-span-8 bg-[#0B0F18]/95 backdrop-blur-xs p-6 sm:p-8 rounded-[2px] border border-white/8">
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] font-medium text-[#9AA3B2] block mb-3">
              04 / Pricing
            </span>
            <h2 className="font-serif text-[32px] sm:text-[56px] font-normal text-[#F4F6FA] leading-[1.08] tracking-[-0.02em] mb-4">
              Fixed monthly retainers and custom plans.
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#9AA3B2] max-w-[60ch]">
              Select individual services or choose a structured monthly retainer. Zero hidden markup.
            </p>
          </div>
        </div>

        {/* 1. "Select Services" Interactive Calculator ABOVE the cards */}
        <div
          ref={calculatorRef}
          id="pricing-calculator"
          className="border border-white/8 rounded-[2px] bg-[#0B0F18] p-8 sm:p-10 mb-20 scroll-mt-24 transition-shadow duration-200 hover:border-[#1558C9]"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-white/8 mb-6">
            <div>
              <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#9AA3B2] block mb-1">
                Interactive Calculator
              </span>
              <h3 className="font-serif text-[20px] font-normal text-[#F4F6FA]">
                Select Services & Build Plan
              </h3>
            </div>
            {selectedServices.length > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="text-[12px] text-[#9AA3B2] hover:text-[#F4F6FA] underline underline-offset-4 cursor-pointer transition-colors"
              >
                Reset selections
              </button>
            )}
          </div>

          {/* Service Module Checkboxes with Framer Motion animated SVG draw */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {PRICING_SERVICES.map((service) => {
              const isChecked = selectedServices.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-4 border rounded-[2px] cursor-pointer flex items-start gap-4 transition-all duration-150 select-none ${
                    isChecked
                      ? 'border-[#1558C9] bg-[#1558C9]/15 -translate-y-0.5'
                      : 'border-white/8 hover:border-[#1558C9] bg-[#030407]'
                  }`}
                >
                  <div
                    className={`mt-1 h-4 w-4 rounded-[2px] border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'border-[#1558C9] bg-[#1558C9]'
                        : 'border-white/20 bg-[#0B0F18]'
                    }`}
                  >
                    {isChecked && (
                      <motion.svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <motion.path
                          d="M20 6L9 17L4 12"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                        />
                      </motion.svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[14px] font-medium text-[#F4F6FA]">
                        {service.name}
                      </span>
                      <span className="font-price text-[14px] text-[#F4F6FA]">
                        <NumberFlow
                          value={service.price}
                          locales="en-IN"
                          format={{
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0,
                          }}
                        />
                        <span className="text-[12px] text-[#9AA3B2]">/mo</span>
                      </span>
                    </div>
                    <p className="text-[12px] text-[#9AA3B2]">
                      {service.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calculator Output Row with NumberFlow */}
          <div className="pt-6 border-t border-white/8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[12px] text-[#9AA3B2] block mb-1">
                {matchingBundle ? `Active Bundle: ${matchingBundle.name}` : `${selectedServices.length} Service(s) Active`}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-price text-[32px] font-semibold text-[#F4F6FA]">
                  <NumberFlow
                    value={finalPrice}
                    locales="en-IN"
                    format={{
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0,
                    }}
                  />
                </span>
                <span className="text-[14px] text-[#9AA3B2]">/ month</span>
                {savings > 0 && (
                  <span className="text-[12px] font-price text-[#D4FF24] ml-2">
                    (Save ₹{savings.toLocaleString('en-IN')}/mo with bundle)
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="h-12 px-6 rounded-[2px] border border-white/20 text-[#F4F6FA] hover:border-[#1558C9] hover:text-[#D4FF24] text-[14px] font-medium leading-none flex items-center justify-center transition-all duration-150 ease-out"
              >
                Inquire on WhatsApp
              </a>

              <button
                type="button"
                onClick={handleProceedToContact}
                disabled={selectedServices.length === 0}
                className="h-12 px-6 rounded-[2px] bg-[#1558C9] hover:bg-[#1A66E0] disabled:opacity-40 text-white text-[14px] font-medium leading-none transition-all duration-150 ease-out cursor-pointer text-center hover:-translate-y-0.5"
              >
                Proceed to Contact
              </button>
            </div>
          </div>
        </div>

        {/* 2. Integrated PricingModule Component with Mode Toggle and Real Klido Data */}
        <div className="mb-20">
          <PricingModule onSelectPlan={handleSelectTierFromCard} />
        </div>

        {/* 3. How we start */}
        <div className="pt-16 sm:pt-20 border-t border-white/8">
          <h3 className="font-sans text-[32px] sm:text-[42px] md:text-[48px] font-bold tracking-tight text-[#F4F6FA] mb-10 sm:mb-14">
            How we start
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {HOW_WE_START_STEPS.map((step) => (
              <div key={step.step} className="border-t border-white/20 pt-6 sm:pt-8">
                <span className="font-sans text-[36px] sm:text-[44px] font-bold leading-none text-[#3B82F6] block mb-4 sm:mb-5">
                  {step.step}
                </span>
                <h4 className="font-sans text-[18px] sm:text-[20px] font-bold text-[#F4F6FA] mb-2 sm:mb-3">
                  {step.title}
                </h4>
                <p className="font-sans text-[14px] sm:text-[15px] leading-[1.6] text-[#9AA3B2] max-w-[34ch]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
