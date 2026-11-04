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
    <div className="w-full border-y border-white/8 bg-[#0B0F18]/90 backdrop-blur-xs py-3 overflow-hidden select-none group relative z-10">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <div className="flex items-center shrink-0">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={idx} className="flex items-center whitespace-nowrap">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-[#9AA3B2] font-medium mx-6">
                {item}
              </span>
              <span className="text-[#1558C9] text-[14px]">✦</span>
            </div>
          ))}
        </div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center whitespace-nowrap">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-[#9AA3B2] font-medium mx-6">
                {item}
              </span>
              <span className="text-[#1558C9] text-[14px]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
