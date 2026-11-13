import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PRACTICE_AREAS } from '../data/klidoData';
import { CampaignMap } from '../components/CampaignMap';
import { BrandsSection } from '../components/BrandsSection';
import { SeniorStudioSection } from '../components/SeniorStudioSection';
import { PricingSection } from '../components/PricingSection';
import {
  ProjectBriefSection,
  type SelectedPlanState,
} from '../components/ProjectBriefSection';

export function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanState | null>(null);

  const handlePlanSelect = (plan: SelectedPlanState) => {
    setSelectedPlan(plan);
    const el = document.getElementById('start-project');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* 1. Asymmetric Hero Split matching reference layout */}
      <section className="relative overflow-hidden border-b border-[#E5E9F2] bg-gradient-to-b from-[#FFFFFF] via-[#F9FAFE] to-[#F4F6FC]">
        {/* Subtle corner geometric accents mirroring reference composition */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-[42%] bg-gradient-to-bl from-[#C2F81A]/60 via-[#C2F81A]/20 to-transparent blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-[44%] bg-gradient-to-tr from-[#123FFF]/55 via-[#123FFF]/18 to-transparent blur-2xl"
        />

        <div className="relative mx-auto max-w-[1200px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* Left Copy & Actions */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2.5 text-sm font-medium text-[#4A5268]">
                <span
                  className="inline-block h-[3px] w-6 rounded-full bg-[#C2F81A]"
                  aria-hidden="true"
                />
                <span>Independent digital marketing studio</span>
              </div>

              <h1 className="font-display mt-5 text-balance text-4xl font-bold leading-[1.06] tracking-[-0.03em] text-[#0D1126] sm:text-5xl lg:text-[3.5rem]">
                Marketing that gives people a reason to{' '}
                <span className="relative inline-block text-[#123FFF]">
                  <span>choose you</span>
                  <svg
                    className="pointer-events-none absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 240 12"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8.5C68 3.5 162 2.5 238 6.5"
                      stroke="#C2F81A"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-relaxed text-[#4A5268] sm:text-lg">
                Klido turns a strong offer into clear positioning, considered campaigns, and
                a practical system for growth.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a
                  href="#start-project"
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#123FFF] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0D31CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF]"
                >
                  <span>Tell us what you&apos;re building</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>

                <Link
                  to="/approach"
                  className="group inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-[#0D1126] transition-colors duration-150 hover:text-[#123FFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123FFF]"
                >
                  <span>See how we work</span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            {/* Right Interactive Campaign Map */}
            <div className="lg:col-span-6">
              <CampaignMap />
            </div>
          </div>

          {/* 4-column Practice Index Strip below Hero */}
          <div className="mt-16 border-t border-[#E5E9F2] pt-9">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {PRACTICE_AREAS.map((area) => (
                <Link
                  key={area.id}
                  to={`/services#${area.id}`}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123FFF]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tabular text-xs font-medium text-[#123FFF]">
                      {area.index}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-[#6B7388] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0D1126]"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="font-display mt-2 text-base font-semibold text-[#0D1126] group-hover:text-[#123FFF]">
                    {area.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4A5268]">
                    {area.shortSummary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brands We Work With */}
      <BrandsSection />

      {/* 3. Senior Studio Section */}
      <SeniorStudioSection />

      {/* 4. Service Plans & Pricing */}
      <PricingSection onSelectPlan={handlePlanSelect} />

      {/* 5. Start a Project — Inline Project Brief Section */}
      <ProjectBriefSection selectedPlan={selectedPlan} />
    </div>
  );
}
