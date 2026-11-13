import { useState } from 'react';
import { BarChart2, Target } from 'lucide-react';

type StageKey = 'starting-point' | 'the-argument' | 'in-market';

const STAGE_DETAILS: Record<
  StageKey,
  { label: string; category: 'Direction' | 'Evidence'; summary: string }
> = {
  'starting-point': {
    label: 'Starting point',
    category: 'Evidence',
    summary:
      'Before spending on ads or content, we isolate product truth, unit economics, and why a buyer switches.',
  },
  'the-argument': {
    label: 'The argument',
    category: 'Direction',
    summary:
      'Positioning and landing page hierarchy turn that offer into one clear commercial case across channels.',
  },
  'in-market': {
    label: 'In market',
    category: 'Evidence',
    summary:
      'Paid media, social, influencer, and search campaigns generate clean signals read against real pipeline.',
  },
};

export function CampaignMap() {
  const [activeStage, setActiveStage] = useState<StageKey>('starting-point');
  const activeDetail = STAGE_DETAILS[activeStage];

  return (
    <div className="bg-grid-paper relative overflow-hidden rounded-2xl border border-[#E5E9F2] shadow-[0_24px_60px_-20px_rgba(13,17,38,0.12)]">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#E5E9F2] bg-white/90 px-5 py-3.5 backdrop-blur-[2px]">
        <span className="font-display text-sm font-semibold text-[#0D1126]">
          Campaign map
        </span>
        <span className="text-xs font-medium text-[#6B7388]">
          One clear route to market
        </span>
      </div>

      {/* Staggered Route Canvas */}
      <div className="relative px-4 py-6 sm:px-6 sm:py-8">
        {/* Connecting Dashed Curves (visible sm+) */}
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
          viewBox="0 0 560 400"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 275 112 C 345 112, 355 155, 360 175"
            stroke="#123FFF"
            strokeWidth="2.2"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
          <path
            d="M 385 225 C 445 232, 460 262, 465 282"
            stroke="#123FFF"
            strokeWidth="2.2"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
          {/* Card 1: Starting point */}
          <button
            type="button"
            onClick={() => setActiveStage('starting-point')}
            className={`w-full overflow-hidden rounded-xl border bg-white text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF] sm:w-[64%] ${
              activeStage === 'starting-point'
                ? 'border-[#CFD6E6] shadow-[0_12px_28px_-10px_rgba(13,17,38,0.12)]'
                : 'border-[#E5E9F2] shadow-[0_6px_18px_-8px_rgba(13,17,38,0.06)] hover:border-[#CFD6E6]'
            }`}
          >
            <div className="h-[3px] w-full bg-[#C2F81A]" />
            <div className="p-4 sm:p-5">
              <p className="text-xs font-medium text-[#6B7388]">Starting point</p>
              <p className="font-display mt-1 text-base font-semibold leading-snug text-[#0D1126]">
                What makes the offer worth choosing?
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#4A5268]">
                Product truth, audience tension, commercial objective
              </p>
            </div>
          </button>

          {/* Card 2: The argument */}
          <button
            type="button"
            onClick={() => setActiveStage('the-argument')}
            className={`w-full rounded-xl border bg-white p-4 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF] sm:ml-auto sm:mr-[14%] sm:w-[54%] sm:p-5 ${
              activeStage === 'the-argument'
                ? 'border-[#123FFF]/40 shadow-[0_12px_28px_-10px_rgba(18,63,255,0.15)]'
                : 'border-[#E5E9F2] shadow-[0_6px_18px_-8px_rgba(13,17,38,0.06)] hover:border-[#CFD6E6]'
            }`}
          >
            <Target className="h-4 w-4 text-[#123FFF]" aria-hidden="true" />
            <p className="mt-2 text-xs font-medium text-[#6B7388]">The argument</p>
            <p className="font-display mt-0.5 text-base font-semibold leading-snug text-[#0D1126]">
              A message built around what matters
            </p>
          </button>

          {/* Card 3: In market */}
          <button
            type="button"
            onClick={() => setActiveStage('in-market')}
            className={`w-full rounded-xl border bg-white p-4 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF] sm:ml-auto sm:w-[52%] sm:p-5 ${
              activeStage === 'in-market'
                ? 'border-[#B8EE12] shadow-[0_12px_28px_-10px_rgba(13,17,38,0.12)]'
                : 'border-[#E5E9F2] shadow-[0_6px_18px_-8px_rgba(13,17,38,0.06)] hover:border-[#CFD6E6]'
            }`}
          >
            <BarChart2 className="h-4 w-4 text-[#96C700]" aria-hidden="true" />
            <p className="mt-2 text-xs font-medium text-[#6B7388]">In market</p>
            <p className="font-display mt-0.5 text-base font-semibold leading-snug text-[#0D1126]">
              Useful signals, read in context
            </p>
          </button>
        </div>
      </div>

      {/* Bottom Legend & Active Stage Note */}
      <div className="flex flex-col gap-2 border-t border-[#E5E9F2] bg-white/90 px-5 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5 shrink-0">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#0D1126]">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full bg-[#123FFF]"
              aria-hidden="true"
            />
            <span>Direction</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium text-[#0D1126]">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full bg-[#C2F81A]"
              aria-hidden="true"
            />
            <span>Evidence</span>
          </span>
        </div>
        <p className="text-[#4A5268] sm:text-right">{activeDetail.summary}</p>
      </div>
    </div>
  );
}
