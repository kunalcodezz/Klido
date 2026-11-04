import React from 'react';

export const Introduction: React.FC = () => {
  return (
    <section id="about" className="py-28 md:py-36 bg-[#EEF4FA] border-t border-[#DCE6F0]">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Left-Aligned Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-medium text-[#4A90D9] block mb-3">Our Approach</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0F1B2D] leading-[1.18] tracking-[-0.015em] mb-4">
            Marketing that sells. Operations that protect your margin.
          </h2>
          <p className="text-base text-[#5B6B7F] leading-relaxed">
            Most agencies only focus on top-line ad clicks. We work directly on both customer acquisition and internal logistics so your revenue translates into actual profit.
          </p>
        </div>

        {/* 3 Editorial Columns with thin dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 border-t border-[#DCE6F0]">
          {/* 01 Grow */}
          <div>
            <span className="font-mono text-xs text-[#5B6B7F] block mb-3">01 / Grow</span>
            <h3 className="font-serif text-2xl font-normal text-[#0F1B2D] mb-3">
              Customer Acquisition
            </h3>
            <p className="text-[#5B6B7F] text-sm leading-relaxed mb-6">
              Meta ads and authentic creator partnerships structured to reliably attract paying customers while maintaining sustainable unit economics.
            </p>
            <p className="text-xs text-[#0F1B2D] font-medium">
              Meta Ads · Creator Sourcing · Creative Direction
            </p>
          </div>

          {/* 02 Operate */}
          <div className="md:border-l md:border-[#DCE6F0] md:pl-10">
            <span className="font-mono text-xs text-[#4A90D9] block mb-3">02 / Operate — Our Edge</span>
            <h3 className="font-serif text-2xl font-normal text-[#0F1B2D] mb-3">
              Margin Defense
            </h3>
            <p className="text-[#5B6B7F] text-sm leading-relaxed mb-6">
              Unit economics, SKU rationalization, and fulfillment standard operating procedures that keep order processing smooth as daily orders climb.
            </p>
            <p className="text-xs text-[#0F1B2D] font-medium">
              Unit Costing · SKU Audits · Packing & Dispatch SOPs
            </p>
          </div>

          {/* 03 Experience */}
          <div className="md:border-l md:border-[#DCE6F0] md:pl-10">
            <span className="font-mono text-xs text-[#5B6B7F] block mb-3">03 / Experience</span>
            <h3 className="font-serif text-2xl font-normal text-[#0F1B2D] mb-3">
              Hands-on Partnership
            </h3>
            <p className="text-[#5B6B7F] text-sm leading-relaxed mb-6">
              You work directly with experienced operators who know e-commerce firsthand. No juniors, no bloated pitch presentations, and no guesswork.
            </p>
            <p className="text-xs text-[#0F1B2D] font-medium">
              Weekly Number Tracking · Monthly Founder Calls
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
