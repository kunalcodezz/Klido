import React from 'react';
import { AGENCY_CONTACT } from '../data/pricing';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0F18] backdrop-blur-xs border-t border-white/8 py-16 text-[#9AA3B2] relative z-10">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-12 gap-8 pb-12 border-b border-white/8">
          {/* Brand Column */}
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/klido-logo.jpeg"
                alt="Klido Logo"
                className="w-8 h-8 rounded-[8px] object-cover border border-white/10 shadow-sm"
              />
              <span className="font-serif text-[22px] font-normal text-[#F4F6FA]">
                Klido
              </span>
            </div>
            <p className="text-[14px] leading-[1.6] text-[#9AA3B2] max-w-[40ch] mb-4">
              Digital growth and e-commerce operations agency. Meta ads, creator partnerships, and back-office systems for independent brands.
            </p>
            <p className="text-[12px] text-[#9AA3B2]">
              {AGENCY_CONTACT.hubs}
            </p>
          </div>

          {/* Navigation with animated underline draw on hover */}
          <div className="col-span-6 md:col-span-3">
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#F4F6FA] font-medium block mb-3">
              Navigation
            </span>
            <ul className="space-y-2 text-[14px]">
              {['Home', 'Services', 'Work', 'Process', 'Pricing', 'FAQ'].map((item) => {
                const targetId = item.toLowerCase();
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => scrollTo(targetId)}
                      className="relative group text-[#9AA3B2] hover:text-[#F4F6FA] transition-colors cursor-pointer text-left py-0.5"
                    >
                      <span>{item}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1558C9] transition-all duration-200 group-hover:w-full" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact with animated underline */}
          <div className="col-span-6 md:col-span-4">
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#F4F6FA] font-medium block mb-3">
              Direct Contact
            </span>
            <ul className="space-y-2 text-[14px]">
              <li>
                <a
                  href={`https://wa.me/91${AGENCY_CONTACT.phone}?text=${encodeURIComponent(
                    AGENCY_CONTACT.whatsappMessageBase
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="relative group inline-block text-[#9AA3B2] hover:text-[#F4F6FA] transition-colors py-0.5"
                >
                  <span>WhatsApp: {AGENCY_CONTACT.phoneDisplay}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1558C9] transition-all duration-200 group-hover:w-full" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${AGENCY_CONTACT.email}`}
                  className="relative group inline-block text-[#9AA3B2] hover:text-[#F4F6FA] transition-colors py-0.5"
                >
                  <span>Email: {AGENCY_CONTACT.email}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1558C9] transition-all duration-200 group-hover:w-full" />
                </a>
              </li>
              <li>
                <a
                  href={AGENCY_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="relative group inline-block text-[#9AA3B2] hover:text-[#F4F6FA] transition-colors py-0.5"
                >
                  <span>Instagram: {AGENCY_CONTACT.instagram}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1558C9] transition-all duration-200 group-hover:w-full" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-baseline justify-between gap-4 text-[12px] text-[#9AA3B2]">
          <p>© {new Date().getFullYear()} Klido. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Direct execution</span>
            <span>·</span>
            <span>No lock-in</span>
            <span>·</span>
            <span>Zero spend markup</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
