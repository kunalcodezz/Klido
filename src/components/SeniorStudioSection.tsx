import { Check } from 'lucide-react';
import { STUDIO_IMAGES } from '../data/klidoData';
import { ResilientImage } from './ResilientImage';

const STUDIO_POINTS = [
  'Senior attention from brief to review',
  'Clear scope, owners, and next decisions',
  'Built to work with your existing team',
];

export function SeniorStudioSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#E5E9F2] bg-gradient-to-b from-[#FFFFFF] via-[#FAFBFD] to-[#F5F7FC] py-16 sm:py-20 lg:py-24">
      {/* Corner organic accents matching brand visual language */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 h-64 w-64 rounded-[42%] bg-gradient-to-bl from-[#C2F81A]/55 via-[#C2F81A]/18 to-transparent blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-[44%] bg-gradient-to-tr from-[#123FFF]/50 via-[#123FFF]/15 to-transparent blur-2xl"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Left Studio Brand Desk Photography */}
          <div className="lg:col-span-6">
            <ResilientImage
              src={STUDIO_IMAGES.brandDesk}
              alt="Klido studio brand stationery, cobalt folder, color swatches, and geometric wireframe on a white desk"
              aspectClassName="aspect-square"
              className="shadow-[0_24px_60px_-20px_rgba(13,17,38,0.12)]"
            />
          </div>

          {/* Right Editorial Copy & Checklist */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2.5 text-sm font-medium text-[#4A5268]">
              <span
                className="inline-block h-[3px] w-6 rounded-full bg-[#C2F81A]"
                aria-hidden="true"
              />
              <span>A small, senior studio</span>
            </div>

            <h2 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-[#0D1126] sm:text-4xl lg:text-[2.75rem]">
              Close enough to understand the work. Experienced enough to{' '}
              <span className="relative inline-block text-[#123FFF]">
                <span>challenge it.</span>
                <svg
                  className="pointer-events-none absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 260 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8.5C74 3.5 178 2.5 258 6.5"
                    stroke="#C2F81A"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#4A5268]">
              Klido works directly with founders and marketing teams. The people shaping
              the strategy stay involved through creative development, launch, and
              review—so the thinking doesn&apos;t get diluted in handoffs.
            </p>

            <ul className="mt-8 divide-y divide-[#E5E9F2] border-y border-[#E5E9F2]">
              {STUDIO_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3.5 py-3.5 text-sm font-medium text-[#0D1126] sm:text-base"
                >
                  <Check
                    className="h-4 w-4 shrink-0 text-[#9AD900]"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
