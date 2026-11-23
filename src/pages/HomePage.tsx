import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CampaignMap } from '../components/CampaignMap';
import { BrandsSection } from '../components/BrandsSection';
import { SeniorStudioSection } from '../components/SeniorStudioSection';
import { PricingSection } from '../components/PricingSection';
import { HowWeWorkSection } from '../components/HowWeWorkSection';
import { ContactSection } from '../components/ContactSection';
import { FAQSection } from '../components/FAQSection';
import { ScopePlanner } from '../components/ScopePlanner';
import { ResilientImage } from '../components/ResilientImage';
import { PRACTICE_AREAS, STUDIO_IMAGES, AUDIT_DOMAINS, OPERATING_BOUNDARIES } from '../data/klidoData';
import { Check, ChevronDown } from 'lucide-react';
import type { SelectedPlanState } from '../components/ProjectBriefSection';

export function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanState | null>(null);
  const [activeDomainId, setActiveDomainId] = useState<string>(AUDIT_DOMAINS[0].id);
  const [expandedCheckId, setExpandedCheckId] = useState<string>(
    AUDIT_DOMAINS[0].checks[0].id,
  );

  const activeDomain =
    AUDIT_DOMAINS.find((d) => d.id === activeDomainId) ?? AUDIT_DOMAINS[0];

  const handlePlanSelect = (plan: SelectedPlanState) => {
    setSelectedPlan(plan);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDomainSelect = (id: string) => {
    setActiveDomainId(id);
    const next = AUDIT_DOMAINS.find((d) => d.id === id);
    if (next && next.checks.length > 0) {
      setExpandedCheckId(next.checks[0].id);
    }
  };

  return (
    <div>
      {/* ========================================================================= */}
      {/* SECTION 1: HOME (#home)                                                  */}
      {/* ========================================================================= */}
      <section
        id="home"
        className="relative scroll-mt-24 overflow-hidden border-b border-[#E5E9F2] bg-gradient-to-b from-[#FFFFFF] via-[#F9FAFE] to-[#F4F6FC]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-[42%] bg-gradient-to-bl from-[#C2F81A]/60 via-[#C2F81A]/20 to-transparent blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-[44%] bg-gradient-to-tr from-[#123FFF]/55 via-[#123FFF]/18 to-transparent blur-2xl"
        />

        <div className="relative mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
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

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#123FFF] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0D31CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF]"
                >
                  <span>Tell us what you&apos;re building</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>

                <a
                  href="#approach"
                  className="group inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-[#0D1126] transition-colors duration-150 hover:text-[#123FFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123FFF]"
                >
                  <span>See how we work</span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <CampaignMap />
            </div>
          </div>
        </div>
      </section>

      {/* Selected Client Brands Showcase */}
      <BrandsSection />

      {/* ========================================================================= */}
      {/* SECTION 2: SERVICES (#services)                                          */}
      {/* ========================================================================= */}
      <section id="services" className="scroll-mt-24">
        {/* Core Integrated Disciplines Header */}
        <div className="border-b border-[#E5E9F2] bg-[#F7F9FE] py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5268]">
                  <span
                    className="inline-block h-[3px] w-5 rounded-full bg-[#C2F81A]"
                    aria-hidden="true"
                  />
                  <span className="uppercase tracking-wider">YOUR PARTNER IN DIGITAL GROWTH</span>
                </div>
                <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-tight text-[#0D1126] sm:text-4xl lg:text-5xl">
                  We turn ambitious brands into{' '}
                  <span className="relative inline-block text-[#123FFF]">
                    <span>brands people remember.</span>
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
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4A5268]">
                  From brand positioning and performance marketing to creative campaigns and
                  business operations, Klido brings everything together to help businesses
                  build a stronger presence and grow with purpose.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href="#scope-planner"
                    className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#123FFF] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0D31CC]"
                  >
                    <span>Build Your Scope Outline</span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                  <a
                    href="#approach"
                    className="inline-flex min-h-[46px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-[#CFD6E6] bg-white px-5 py-2.5 text-sm font-medium text-[#0D1126] transition-colors duration-150 hover:bg-[#F7F9FE]"
                  >
                    See Operating Standards
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <ResilientImage
                  src={STUDIO_IMAGES.strategyDesk}
                  alt="Strategist desk with layout sketchpad, metal pen, and espresso on a limestone surface"
                  aspectClassName="aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Service Descriptions & Deliverables */}
        <div className="bg-white py-14 sm:py-18">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="divide-y divide-[#E5E9F2] border-y border-[#E5E9F2]">
              {PRACTICE_AREAS.map((area) => (
                <article key={area.id} className="py-10 sm:py-12">
                  <div className="grid gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <span className="font-mono-tabular text-sm font-medium text-[#123FFF]">
                        {area.index}
                      </span>
                      <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-[#0D1126]">
                        {area.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#4A5268] sm:text-base">
                        {area.description}
                      </p>
                      <p className="mt-4 text-xs font-medium text-[#6B7388]">
                        Cadence · {area.cadence}
                      </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
                      <div className="rounded-xl border border-[#E5E9F2] bg-[#F7F9FE] p-5">
                        <h4 className="font-display text-sm font-semibold text-[#0D1126]">
                          Core Deliverables
                        </h4>
                        <ul className="mt-3.5 space-y-2.5 text-sm text-[#4A5268]">
                          {area.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#123FFF]"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col justify-between rounded-xl border border-[#E5E9F2] bg-white p-5">
                        <div>
                          <h4 className="font-display text-sm font-semibold text-[#0D1126]">
                            Primary Stack &amp; Tooling
                          </h4>
                          <ul className="mt-3.5 space-y-2 text-sm text-[#4A5268]">
                            {area.tooling.map((tool) => (
                              <li
                                key={tool}
                                className="border-b border-[#E5E9F2] pb-2 last:border-b-0 last:pb-0"
                              >
                                {tool}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-5 pt-3">
                          <a
                            href="#contact"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123FFF] hover:text-[#0D31CC]"
                          >
                            <span>Discuss {area.title.split(' ')[0]} scope</span>
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & Packages */}
        <PricingSection onSelectPlan={handlePlanSelect} />

        {/* Scope Planner */}
        <div id="scope-planner" className="scroll-mt-24 border-t border-[#E5E9F2] bg-[#F7F9FE] py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <ScopePlanner />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: APPROACH (#approach)                                          */}
      {/* ========================================================================= */}
      <section id="approach" className="scroll-mt-24">
        {/* Working Methodology & 90-Day Rhythm */}
        <div className="border-t border-[#E5E9F2] bg-[#F7F9FE] py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5268]">
                <span
                  className="inline-block h-[3px] w-5 rounded-full bg-[#C2F81A]"
                  aria-hidden="true"
                />
                <span>Operating Approach</span>
              </div>
              <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-tight text-[#0D1126] sm:text-4xl lg:text-5xl">
                Clear sequences, verifiable tracking, and zero black-box management.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4A5268] sm:text-lg">
                Good marketing operations feel calm and predictable. Here is how Klido
                onboards accounts, inspects diagnostic hygiene, and collaborates week to week.
              </p>
            </div>
          </div>
        </div>

        {/* How We Work Process Timeline */}
        <HowWeWorkSection />

        {/* Diagnostic Onboarding Matrix */}
        <div id="audit-matrix" className="scroll-mt-24 border-t border-[#E5E9F2] bg-[#F7F9FE] py-14 sm:py-18">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5268]">
                <span
                  className="inline-block h-[3px] w-5 rounded-full bg-[#C2F81A]"
                  aria-hidden="true"
                />
                <span>Onboarding Diagnostics</span>
              </div>
              <h3 className="font-display mt-2.5 text-2xl font-semibold tracking-tight text-[#0D1126] sm:text-3xl">
                What we inspect in Weeks 1–2
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#4A5268] sm:text-base">
                Select a diagnostic domain to examine the concrete technical checks and
                artifacts produced during onboarding.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#E5E9F2] bg-white shadow-[0_18px_45px_-20px_rgba(13,17,38,0.08)]">
              <div
                role="tablist"
                aria-label="Diagnostic domains"
                className="flex flex-wrap gap-1.5 border-b border-[#E5E9F2] px-4 py-3.5 sm:px-6"
              >
                {AUDIT_DOMAINS.map((domain) => {
                  const selected = domain.id === activeDomain.id;
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => handleDomainSelect(domain.id)}
                      className={`shrink-0 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF] ${
                        selected
                          ? 'bg-[#EEF2FF] text-[#123FFF]'
                          : 'text-[#4A5268] hover:bg-[#F7F9FE] hover:text-[#0D1126]'
                      }`}
                    >
                      {domain.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-6 sm:p-8">
                <p className="max-w-3xl text-sm leading-relaxed text-[#4A5268] sm:text-base">
                  {activeDomain.summary}
                </p>

                <div className="mt-6 divide-y divide-[#E5E9F2] border-y border-[#E5E9F2]">
                  {activeDomain.checks.map((check) => {
                    const isOpen = expandedCheckId === check.id;
                    return (
                      <div key={check.id}>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() =>
                            setExpandedCheckId(isOpen ? '' : check.id)
                          }
                          className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-150 hover:text-[#123FFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF]"
                        >
                          <span className="font-display text-sm font-semibold text-[#0D1126] sm:text-base">
                            {check.title}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-[#6B7388] transition-transform duration-150 ${
                              isOpen ? 'rotate-180 text-[#123FFF]' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                        {isOpen ? (
                          <div className="pb-5 pr-8 text-sm leading-relaxed text-[#4A5268]">
                            <p>{check.detail}</p>
                            <p className="mt-2.5 text-xs font-medium text-[#0D1126]">
                              Delivered artifact:{' '}
                              <span className="font-normal text-[#4A5268]">
                                {check.artifact}
                              </span>
                            </p>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Boundaries: Klido vs Agency Habits */}
        <div className="border-t border-[#E5E9F2] bg-white py-14 sm:py-18">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5268]">
                <span
                  className="inline-block h-[3px] w-5 rounded-full bg-[#C2F81A]"
                  aria-hidden="true"
                />
                <span>Working Boundaries</span>
              </div>
              <h3 className="font-display mt-2.5 text-2xl font-semibold tracking-tight text-[#0D1126] sm:text-3xl">
                How Klido operates vs. standard agency habits
              </h3>
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-[#E5E9F2]">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E5E9F2] bg-[#F7F9FE] text-xs font-semibold text-[#6B7388]">
                    <th className="w-1/5 px-5 py-3.5">Area</th>
                    <th className="w-2/5 px-5 py-3.5 text-[#0D1126]">Klido Standard</th>
                    <th className="w-2/5 px-5 py-3.5">What We Avoid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E9F2] bg-white">
                  {OPERATING_BOUNDARIES.map((row) => (
                    <tr key={row.aspect}>
                      <td className="px-5 py-4 align-top font-semibold text-[#0D1126]">
                        {row.aspect}
                      </td>
                      <td className="px-5 py-4 align-top leading-relaxed text-[#0D1126]">
                        {row.klidoStandard}
                      </td>
                      <td className="px-5 py-4 align-top leading-relaxed text-[#6B7388]">
                        {row.industryHabit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: ABOUT (#about)                                                */}
      {/* ========================================================================= */}
      <section id="about" className="scroll-mt-24">
        {/* Senior Studio Positioning */}
        <SeniorStudioSection />

        {/* Agency Introduction & Workspace */}
        <div className="border-b border-[#E5E9F2] bg-[#F7F9FE] py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5268]">
                <span
                  className="inline-block h-[3px] w-5 rounded-full bg-[#C2F81A]"
                  aria-hidden="true"
                />
                <span>About Klido Studio</span>
              </div>
              <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-tight text-[#0D1126] sm:text-4xl lg:text-5xl">
                An independent studio built to connect analytical media with clear design.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#4A5268] sm:text-lg">
                Klido was founded around a straightforward observation: most companies split
                paid acquisition, social, influencer campaigns, operations, and analytics
                across disconnected vendors. We operate as one compact studio so strategy,
                operations, creative, and measurement move together.
              </p>
            </div>

            <div className="mt-10">
              <ResilientImage
                src={STUDIO_IMAGES.studioInterior}
                alt="Inside the Klido studio workspace in natural daylight with oak tables and birch shelving"
                aspectClassName="aspect-video"
                caption="Klido studio workspace · Working with consumer and B2B brands globally."
              />
            </div>
          </div>
        </div>

        {/* Studio Values & Operating Principles */}
        <div className="border-b border-[#E5E9F2] bg-white py-14 sm:py-18">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-[#0D1126] sm:text-3xl">
              Three principles guiding our work
            </h3>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                {
                  index: '01.',
                  title: 'Measurement precedes spend',
                  body: 'Scaling media budget on broken conversion tracking hides wasted spend. Every engagement validates event accuracy and CRM alignment first.',
                },
                {
                  index: '02.',
                  title: 'Design is part of acquisition',
                  body: 'Ads do half the job; the landing experience closes the loop. Our strategists and designers work in the same sprint rather than separate silos.',
                },
                {
                  index: '03.',
                  title: 'Plain language over jargon',
                  body: 'Marketing reports should explain what changed, why it moved, and what we are testing next—without hiding behind vanity metrics.',
                },
              ].map((item, idx) => (
                <div
                  key={item.index}
                  className={`border-t-2 pt-6 ${
                    idx === 0 ? 'border-[#C2F81A]' : 'border-[#CFD6E6]'
                  }`}
                >
                  <span className="font-mono-tabular text-xs font-medium text-[#123FFF]">
                    {item.index}
                  </span>
                  <h4 className="font-display mt-2 text-lg font-semibold text-[#0D1126]">
                    {item.title}
                  </h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#4A5268]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: CONTACT (#contact) & FAQ                                      */}
      {/* ========================================================================= */}
      <section id="contact" className="scroll-mt-24">
        {/* Contact Form with Interactive Globe & EmailJS Automation */}
        <ContactSection id="contact-form" selectedPlan={selectedPlan} />
      </section>

      {/* Frequently Asked Questions */}
      <FAQSection />
    </div>
  );
}
