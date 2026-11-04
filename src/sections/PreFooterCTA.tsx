import React from 'react';
import { AGENCY_CONTACT } from '../data/pricing';

export const PreFooterCTA: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 bg-[#EEF4FA] border-t border-[#DCE6F0]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-medium text-[#4A90D9] block mb-3">Get Started</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0F1B2D] leading-[1.18] tracking-[-0.015em] mb-4">
            Build the marketing and operations foundation your brand deserves.
          </h2>
          <p className="text-base text-[#5B6B7F] leading-relaxed mb-8">
            Transparent management, hands-on account execution, and systematic back-end operations designed to protect your margin.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#4A90D9] hover:bg-[#3578BD] text-white text-sm font-medium transition-colors cursor-pointer text-center"
            >
              Request an Audit & Growth Plan
            </button>

            <a
              href={`https://wa.me/91${AGENCY_CONTACT.phone}?text=${encodeURIComponent(
                AGENCY_CONTACT.whatsappMessageBase
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 text-[#0F1B2D] hover:text-[#4A90D9] text-sm font-medium transition-colors text-center"
            >
              Chat on WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
