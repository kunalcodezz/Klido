import React from 'react';

export const Influencer: React.FC = () => {
  const reelSamples = [
    {
      id: 'reel-1',
      title: 'Aesthetic Packaging & Product Unboxing',
      handle: '@style_curator',
      quote: '"Stop buying fast fashion essentials before checking the unit details..."',
      image: '/src/assets/images/creator_ugc_lifestyle_1793541111707.jpg',
      url: 'https://www.instagram.com/reel/DbP_zloyIXk/'
    },
    {
      id: 'reel-2',
      title: 'Artisan Workshop & Craftsmanship',
      handle: '@urban_sanctuary',
      quote: '"The packaging alone convinced me this was artisanal perfection."',
      image: '/src/assets/images/creator_ugc_artisan_1793541111804.jpg',
      url: 'https://www.instagram.com/reel/Dazr8B-qAcl/'
    },
    {
      id: 'reel-3',
      title: 'Everyday Minimalist EDC Review',
      handle: '@modern_essentials',
      quote: '"Clean aesthetic with real utility. Exactly what a luxury brand should feel like."',
      image: '/src/assets/images/zegore_leather_accessories_1793541111684.jpg',
      url: 'https://www.instagram.com/reel/DZZ2Ye6tczI/'
    }
  ];

  const pipeline = [
    {
      step: '01',
      name: 'Source Creators',
      desc: 'Identify relevant creators whose audience matches your customer profile and aesthetic.'
    },
    {
      step: '02',
      name: 'Outreach & Agreement',
      desc: 'Handle communication, barter deliverables, timeline confirmation, and address logistics.'
    },
    {
      step: '03',
      name: 'Creative Brief',
      desc: 'Provide clear talking points, visual angles, dos & don’ts, and call-to-action guidelines.'
    },
    {
      step: '04',
      name: 'Review & Posting',
      desc: 'Check drafts before posting and ensure tags, discount codes, and live links are active.'
    },
    {
      step: '05',
      name: 'Performance Review',
      desc: 'Track views, engagement rates, comment intent, and direct website referral traffic.'
    }
  ];

  return (
    <section id="creators" className="py-28 md:py-36 bg-[#EEF4FA] border-t border-[#DCE6F0]">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Left-Aligned Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-medium text-[#4A90D9] block mb-3">Creator Network</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0F1B2D] leading-[1.18] tracking-[-0.015em] mb-4">
            Creator campaigns that feel natural, not scripted.
          </h2>
          <p className="text-base text-[#5B6B7F] leading-relaxed">
            We manage creator sourcing, barter arrangements, and creative briefs so you receive high-quality user-generated content every month.
          </p>
        </div>

        {/* 3 Reel Cards (Natural photo, subtle handle label, quiet quote) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {reelSamples.map((reel) => (
            <div
              key={reel.id}
              className="bg-white rounded-lg border border-[#DCE6F0] overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F7FAFD]">
                <img
                  src={reel.image}
                  alt={reel.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-xs font-mono text-[#4A90D9] block mb-2">
                    {reel.handle}
                  </span>
                  <h3 className="font-serif text-lg font-normal text-[#0F1B2D] mb-3">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-[#5B6B7F] italic leading-relaxed">
                    {reel.quote}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#DCE6F0]">
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-[#0F1B2D] hover:text-[#4A90D9] transition-colors inline-flex items-center gap-1.5"
                  >
                    View on Instagram →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5-Stage Workflow Described in Clean Prose */}
        <div className="border-t border-[#DCE6F0] pt-16">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-medium text-[#4A90D9] block mb-2">The Process</span>
            <h3 className="font-serif text-2xl font-normal text-[#0F1B2D]">
              Five steps from discovery to final delivery.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {pipeline.map((item) => (
              <div key={item.step} className="border-t border-[#DCE6F0] pt-4">
                <span className="font-mono text-xs text-[#4A90D9] block mb-2">{item.step}</span>
                <h4 className="font-serif text-base font-normal text-[#0F1B2D] mb-2">{item.name}</h4>
                <p className="text-xs text-[#5B6B7F] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
