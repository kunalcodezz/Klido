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
    <section id="pricing" className="py-[72px] lg:py-32 bg-white relative z-10 border-t border-[#E5EAF5]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 lg:col-span-8 bg-[#F3F6FF] p-6 sm:p-8 rounded-2xl border border-[#E5EAF5] shadow-xs">
            <span className="text-[12px] uppercase font-mono tracking-[0.1em] font-semibold text-[#3D5AFE] block mb-3">
              04 / Pricing
            </span>
            <h2 className="font-sans text-[32px] sm:text-[50px] font-bold text-[#111827] leading-[1.08] tracking-[-0.03em] mb-4">
              Fixed monthly retainers and custom plans.
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#64748B] max-w-[60ch]">
              Select individual services or choose a structured monthly retainer. Zero hidden markup.
            </p>
          </div>
        </div>

        {/* 1. "Select Services" Interactive Calculator ABOVE the cards */}
        <div
          ref={calculatorRef}
          id="pricing-calculator"
          className="border border-[#E5EAF5] rounded-2xl bg-[#F8FAFC] p-8 sm:p-10 mb-20 scroll-mt-24 transition-shadow duration-200 hover:border-[#3D5AFE] shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#E5EAF5] mb-6">
            <div>
              <span className="text-[12px] uppercase font-mono tracking-[0.08em] font-semibold text-[#3D5AFE] block mb-1">
                Interactive Calculator
              </span>
              <h3 className="font-sans text-[22px] font-bold text-[#111827] tracking-tight">
                Select Services & Build Plan
              </h3>
            </div>
            {selectedServices.length > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="text-[12px] text-[#64748B] hover:text-[#3D5AFE] underline underline-offset-4 cursor-pointer transition-colors font-medium"
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
                  className={`p-4 border rounded-xl cursor-pointer flex items-start gap-4 transition-all duration-150 select-none shadow-xs ${
                    isChecked
                      ? 'border-[#3D5AFE] bg-[#E8EDFF] -translate-y-0.5 shadow-md shadow-[#3D5AFE]/10'
                      : 'border-[#E5EAF5] hover:border-[#3D5AFE] bg-white'
                  }`}
                >
                  <div
                    className={`mt-1 h-4 w-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'border-[#3D5AFE] bg-[#3D5AFE]'
                        : 'border-[#CBD5E1] bg-white'
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
                      <span className="text-[14px] font-semibold text-[#111827]">
                        {service.name}
                      </span>
                      <span className="font-price text-[14px] font-bold text-[#111827]">
                        <NumberFlow
                          value={service.price}
                          locales="en-IN"
                          format={{
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0,
                          }}
                        />
                        <span className="text-[12px] text-[#64748B] font-normal">/mo</span>
                      </span>
                    </div>
                    <p className="text-[12px] text-[#64748B]">
                      {service.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calculator Output Row with NumberFlow */}
          <div className="pt-6 border-t border-[#E5EAF5] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[12px] text-[#64748B] font-medium block mb-1">
                {matchingBundle ? `Active Bundle: ${matchingBundle.name}` : `${selectedServices.length} Service(s) Active`}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-price text-[32px] font-bold text-[#111827]">
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
                <span className="text-[14px] text-[#64748B]">/ month</span>
                {savings > 0 && (
                  <span className="text-[12px] font-price font-semibold text-[#3D5AFE] bg-[#E8EDFF] px-2.5 py-0.5 rounded-full ml-2">
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
                className="h-12 px-6 rounded-full border border-[#E5EAF5] bg-white text-[#111827] hover:border-[#3D5AFE] hover:text-[#3D5AFE] text-[14px] font-medium leading-none flex items-center justify-center transition-all duration-150 ease-out shadow-xs"
              >
                Inquire on WhatsApp
              </a>

              <button
                type="button"
                onClick={handleProceedToContact}
                disabled={selectedServices.length === 0}
                className="h-12 px-7 rounded-full bg-[#3D5AFE] hover:bg-[#2F47D4] disabled:opacity-40 text-white text-[14px] font-semibold leading-none transition-all duration-150 ease-out cursor-pointer text-center hover:-translate-y-0.5 shadow-md shadow-[#3D5AFE]/25"
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
        <div className="pt-16 sm:pt-20 border-t border-[#E5EAF5]">
          <h3 className="font-sans text-[32px] sm:text-[40px] md:text-[44px] font-bold tracking-tight text-[#111827] mb-10 sm:mb-14">
            How we start
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {HOW_WE_START_STEPS.map((step) => (
              <div key={step.step} className="border-t border-[#111827] pt-6 sm:pt-8">
                <span className="font-sans text-[36px] sm:text-[44px] font-bold leading-none text-[#3D5AFE] block mb-4 sm:mb-5">
                  {step.step}
                </span>
                <h4 className="font-sans text-[18px] sm:text-[20px] font-bold text-[#111827] mb-2 sm:mb-3">
                  {step.title}
                </h4>
                <p className="font-sans text-[14px] sm:text-[15px] leading-[1.6] text-[#64748B] max-w-[34ch]">
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
