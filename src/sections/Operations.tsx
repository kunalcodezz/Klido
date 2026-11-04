import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export const Operations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  const steps = [
    {
      num: '01',
      title: 'Audit',
      headline: 'Map every SKU, process and bottleneck.',
      description: 'Catalog analysis to cut unprofitable product variants. We inspect packaging stages, dispatch logistics, vendor minimums, and warehouse bottlenecks to find where money is leaking.',
      keyActions: [
        'SKU-level gross margin analysis',
        'Dead stock identification',
        'Packaging & dispatch time studies',
        'Supplier dependency audit'
      ],
      output: 'SKU Rationalization & Leakage Audit Report'
    },
    {
      num: '02',
      title: 'Costing',
      headline: 'Unit economics, pricing and a master P&L.',
      description: 'Real unit economics, wholesale vs direct margins, and a comprehensive Master P&L model. Factoring in return packaging, shipping losses, and payment gateway deductions.',
      keyActions: [
        'Exact landed cost per bill of materials',
        'Realistic return & RTO provisions',
        'Break-even ROAS benchmark per collection',
        'Dynamic Master P&L spreadsheet'
      ],
      output: 'True-Landed Margin & Master P&L Model'
    },
    {
      num: '03',
      title: 'SOPs',
      headline: 'Written processes for orders, stock, packing and returns.',
      description: 'Documented step-by-step procedures for inventory intake, packing protocols, and returns handling. Standardizes fulfillment so it runs smoothly without owner micromanagement.',
      keyActions: [
        'Standardized 4-point QC packing checklist',
        'Order intake to dispatch SLA timers',
        'Stock threshold and reorder trigger alerts',
        'RTO inspection & restocking protocol'
      ],
      output: 'Operational SOP Playbook & Guides'
    },
    {
      num: '04',
      title: 'Review',
      headline: 'Weekly tracker and monthly numbers review.',
      description: 'Weekly operational numbers tracking and dedicated monthly leadership strategy calls. Full visibility over working capital, buffer runway, inventory velocity, and expansion pace.',
      keyActions: [
        'Weekly dispatch & return rate tracker',
        'Monthly P&L reconciliation call',
        'Working capital & stock turnover velocity',
        'Next-phase scaling roadmap'
      ],
      output: 'Weekly KPI Dashboard & Strategy Review'
    }
  ];

  return (
    <section id="operations" className="py-28 md:py-36 bg-[#F7FAFD]">
      <div className="max-w-[1100px] mx-auto px-6" ref={containerRef}>
        {/* Left-Aligned Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-medium text-[#4A90D9] block mb-3">Business Operations Case Study</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0F1B2D] leading-[1.18] tracking-[-0.015em] mb-4">
            From home business to scalable online brand.
          </h2>
          <p className="text-base text-[#5B6B7F] leading-relaxed">
            Our 4-phase transformation methodology that installs order, financial clarity, and standard operating procedures.
          </p>
        </div>

        {/* Desktop Horizontal Timeline & Mobile Vertical Timeline */}
        <div className="relative pt-6">
          {/* Subtle connecting line across steps */}
          <div className="hidden lg:block absolute top-[42px] left-0 right-0 h-[1px] bg-[#DCE6F0] z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex flex-col border-l-2 lg:border-l-0 border-[#DCE6F0] pl-6 lg:pl-0"
              >
                {/* Step indicator dot */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#EAF3FC] text-[#4A90D9] font-mono text-xs font-medium border border-[#4A90D9]/30">
                    {step.num}
                  </span>
                  <span className="text-xs font-medium text-[#0F1B2D] uppercase tracking-wide">
                    {step.title}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-normal text-[#0F1B2D] mb-3 leading-snug">
                  {step.headline}
                </h3>

                <p className="text-sm text-[#5B6B7F] leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Key Actions */}
                <div className="mt-auto pt-4 border-t border-[#DCE6F0]">
                  <span className="text-[11px] font-medium text-[#5B6B7F] uppercase tracking-wider block mb-2">
                    Key Deliverable
                  </span>
                  <p className="text-xs font-medium text-[#0F1B2D]">
                    {step.output}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
