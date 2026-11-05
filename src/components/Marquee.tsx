import React from 'react';

const marqueeItems = [
  '01 / PAID ADS',
  '02 / INFLUENCER SEEDING',
  '03 / CREATIVE DIRECTION',
  '04 / AUTOMATION & SOPS',
  '05 / PRODUCTION & UGC',
  '06 / UNIT ECONOMICS & P&L',
];

export const Marquee: React.FC = () => {
  return (
    <div className="w-full border-y border-[#E5EAF5] bg-[#F8FAFC] py-3.5 overflow-hidden select-none group relative z-10 shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <div className="flex items-center shrink-0">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={idx} className="flex items-center whitespace-nowrap">
              <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#64748B] font-semibold mx-6">
                {item}
              </span>
              <span className="text-[#3D5AFE] text-[14px]">✦</span>
            </div>
          ))}
        </div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center whitespace-nowrap">
              <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#64748B] font-semibold mx-6">
                {item}
              </span>
              <span className="text-[#3D5AFE] text-[14px]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
