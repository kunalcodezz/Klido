import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { AUDIT_DOMAINS, OPERATING_BOUNDARIES } from '../data/klidoData';

const TIMELINE_PHASES = [
  {
    phase: 'Weeks 01–02',
    title: 'Measurement Baseline & Diagnostic Audit',
    summary:
      'Before altering bids or rewriting pages, we verify tracking integrity, audit historical search queries, inspect technical crawl health, and align definitions of a qualified lead with your sales or product team.',
    outputs: [
      'Server-side GTM & CRM conversion trace',
      'Paid spend waste & search term audit',
      'Technical SEO crawl & template UX teardown',
    ],
  },
  {
    phase: 'Weeks 03–04',
    title: 'System Architecture & Launch Preparation',
    summary:
      'We rebuild campaign hierarchies around commercial intent tiers, establish naming and UTM standards, and ship dedicated landing templates calibrated to each traffic source.',
    outputs: [
      'Intent-tiered ad account structure',
      'Message-matched campaign landing pages',
      '90-day editorial & experiment roadmap',
    ],
  },
  {
    phase: 'Month 02 Onward',
    title: 'Weekly Operating Cadence & Controlled Testing',
    summary:
      'Execution settles into a predictable weekly rhythm: Monday written memos summarizing spend and pipeline movement, bi-weekly creative and landing page tests, and monthly attribution reconciliation.',
    outputs: [
      'Monday plain-English operating ledger',
      'Bi-weekly creative & CRO test cycles',
      'Monthly unit economics & channel review',
    ],
  },
];

export function ApproachPage() {
  const [activeDomainId, setActiveDomainId] = useState<string>(AUDIT_DOMAINS[0].id);
  const [expandedCheckId, setExpandedCheckId] = useState<string>(
    AUDIT_DOMAINS[0].checks[0].id,
  );

  const activeDomain =
    AUDIT_DOMAINS.find((d) => d.id === activeDomainId) ?? AUDIT_DOMAINS[0];

  const handleDomainSelect = (id: string) => {
    setActiveDomainId(id);
    const next = AUDIT_DOMAINS.find((d) => d.id === id);
    if (next && next.checks.length > 0) {
      setExpandedCheckId(next.checks[0].id);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="border-b border-[#E5E9F2] bg-[#F7F9FE] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5268]">
              <span
                className="inline-block h-[3px] w-5 rounded-full bg-[#C2F81A]"
                aria-hidden="true"
              />
              <span>Operating Approach</span>
            </div>
            <h1 className="font-display mt-3 text-balance text-3xl font-bold tracking-tight text-[#0D1126] sm:text-4xl lg:text-5xl">
              Clear sequences, verifiable tracking, and zero black-box management.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#4A5268] sm:text-lg">
              Good marketing operations feel calm and predictable. Here is how Klido
              onboards accounts, inspects diagnostic hygiene, and collaborates week to week.
            </p>
          </div>
        </div>
      </section>

      {/* Week-by-Week Rhythm */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[#0D1126] sm:text-3xl">
            First 90 days in three stages
          </h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {TIMELINE_PHASES.map((item, idx) => (
              <div
                key={item.phase}
                className={`flex flex-col justify-between border-t-2 pt-6 ${
                  idx === 0 ? 'border-[#C2F81A]' : 'border-[#0D1126]'
                }`}
              >
                <div>
                  <span className="font-mono-tabular text-xs font-medium text-[#123FFF]">
                    {item.phase}
                  </span>
                  <h3 className="font-display mt-2 text-lg font-semibold text-[#0D1126]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4A5268]">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#E5E9F2] pt-4">
                  <p className="text-xs font-semibold text-[#6B7388]">Key outputs</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#0D1126]">
                    {item.outputs.map((out) => (
                      <li key={out}>— {out}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Audit Matrix */}
      <section
        id="audit-matrix"
        className="scroll-mt-20 border-t border-[#E5E9F2] bg-[#F7F9FE] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5268]">
              <span
                className="inline-block h-[3px] w-5 rounded-full bg-[#C2F81A]"
                aria-hidden="true"
              />
              <span>Onboarding Diagnostics</span>
            </div>
            <h2 className="font-display mt-2.5 text-2xl font-semibold tracking-tight text-[#0D1126] sm:text-3xl">
              What we inspect in Weeks 1–2
            </h2>
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
      </section>

      {/* Operating Boundaries Comparison Table */}
      <section className="border-t border-[#E5E9F2] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5268]">
              <span
                className="inline-block h-[3px] w-5 rounded-full bg-[#C2F81A]"
                aria-hidden="true"
              />
              <span>Working Boundaries</span>
            </div>
            <h2 className="font-display mt-2.5 text-2xl font-semibold tracking-tight text-[#0D1126] sm:text-3xl">
              How Klido operates vs. standard agency habits
            </h2>
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

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E9F2] pt-8">
            <p className="text-sm text-[#4A5268]">
              Want to walk through how this diagnostic process applies to your current accounts?
            </p>
            <Link
              to="/contact"
              className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#123FFF] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0D31CC]"
            >
              <span>Tell us what you&apos;re building</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
