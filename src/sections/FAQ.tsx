import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqsData } from '../data/faqs';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-[72px] lg:py-32 bg-transparent relative z-10 border-t border-white/8">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Heading */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 bg-[#0B0F18]/95 backdrop-blur-xs p-6 rounded-[2px] border border-white/8">
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] font-medium text-[#9AA3B2] block mb-3">
              05 / FAQ
            </span>
            <h2 className="font-serif text-[32px] sm:text-[56px] font-normal text-[#F4F6FA] leading-[1.08] tracking-[-0.02em] mb-4">
              Frequently asked questions.
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#9AA3B2] max-w-[40ch]">
              Commercial terms, ad account custody, and operational handover protocols.
            </p>
          </div>

          {/* Right Column: Questions with Framer Motion Accordion & 45-degree rotating plus icon */}
          <div className="col-span-12 lg:col-span-8 bg-[#0B0F18]/95 backdrop-blur-xs p-6 sm:p-8 rounded-[2px] border border-white/8">
            {faqsData.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="border-b border-white/8 py-6">
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="w-full text-left flex items-start justify-between gap-6 cursor-pointer focus:outline-none group"
                  >
                    <h3 className="font-serif text-[20px] font-normal text-[#F4F6FA] leading-snug group-hover:text-[#1558C9] transition-colors">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="font-mono text-[22px] leading-none text-[#9AA3B2] shrink-0 pt-0.5 select-none w-6 h-6 flex items-center justify-center group-hover:text-[#1558C9]"
                    >
                      +
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.25, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.15 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pr-12">
                          <p className="text-[16px] leading-[1.6] text-[#9AA3B2] max-w-[60ch]">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
