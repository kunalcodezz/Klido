import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare, Minus, Plus } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'meta-ads-included',
    question: 'What is included in ₹9,999/month (Meta Ads)?',
    answer:
      'It includes campaign strategy, ad setup, creative guidance, audience targeting, performance monitoring and monthly reporting. The ad spend is separate.',
  },
  {
    id: 'ad-budget',
    question: 'Is the advertising budget included in your pricing?',
    answer:
      'No, the advertising media spend is billed directly by Meta, Google, or the platform through your own payment method. All ad accounts, pixels, and data assets remain 100% under your legal ownership.',
  },
  {
    id: 'contracts',
    question: 'Do you offer monthly contracts?',
    answer:
      'Yes, we operate on flexible monthly rolling retainers with a 30-day notice period, as well as milestone-based 90-day sprints. You are never locked into long, punitive annual contracts.',
  },
  {
    id: 'individual-services',
    question: 'Can I purchase individual services?',
    answer:
      'Yes, you can engage us exclusively for single scopes—such as Meta Ads management, operational SOP structuring, or influencer marketing campaigns—as well as comprehensive full-funnel growth packages.',
  },
  {
    id: 'get-started',
    question: 'How do we get started?',
    answer:
      'Submit your details via the project brief below or book an intro call. We audit your existing accounts and provide a detailed scope, milestone roadmap, and onboarding plan within 48 hours.',
  },
  {
    id: 'timeline-results',
    question: 'How long does it take to see results?',
    answer:
      'Diagnostic audits and initial campaign launches happen in the first 1–2 weeks. Measurable statistical improvements in customer acquisition cost (CAC), ROAS, and qualified volume typically crystallize over days 30 to 60.',
  },
  {
    id: 'content-production',
    question: 'Do you also handle content production (reels, creatives, photoshoots)?',
    answer:
      'Yes, our studio coordinates creative direction, conversion copy, high-impact video reels, static graphics, and visual guidelines tailored for high-converting social and performance campaigns.',
  },
];

export function FAQSection() {
  // First item open by default matching reference design
  const [openId, setOpenId] = useState<string | null>('meta-ads-included');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative scroll-mt-20 overflow-hidden border-b border-[#E5E9F2] bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Top-right signature neon lime glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-[44%] bg-gradient-to-bl from-[#C2F81A]/55 via-[#C2F81A]/18 to-transparent blur-3xl"
      />

      {/* Bottom-left signature neon lime glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-[44%] bg-gradient-to-tr from-[#C2F81A]/55 via-[#C2F81A]/18 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Heading, Subtitle & Contact Card */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="lg:sticky lg:top-28">
              {/* Category pill indicator */}
              <div className="inline-flex items-center gap-2.5 text-sm font-medium text-[#0D1126]">
                <span
                  className="inline-block h-[3px] w-6 rounded-full bg-[#C2F81A]"
                  aria-hidden="true"
                />
                <span>FAQ</span>
              </div>

              {/* Main Heading with signature curved lime underline */}
              <h2 className="font-display mt-5 text-[2.5rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0D1126] sm:text-5xl lg:text-[3.25rem]">
                Frequently
                <br />
                Asked
                <br />
                <span className="relative inline-block text-[#123FFF]">
                  <span>Questions.</span>
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
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              {/* Subtitle */}
              <p className="mt-6 max-w-sm text-base leading-relaxed text-[#4A5268]">
                Got questions? Here are some quick answers about our services, process and
                working model.
              </p>

              {/* "Still have a question?" Card */}
              <div className="mt-10 max-w-sm rounded-2xl border border-[#E5E9F2] bg-white p-5 shadow-[0_10px_30px_-15px_rgba(13,17,38,0.06)] sm:p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#123FFF]"
                    aria-hidden="true"
                  >
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#0D1126]">
                      Still have a question?
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#4A5268]">
                      Reach out to our team, we&apos;re happy to help.
                    </p>
                    <div className="mt-3.5">
                      <Link
                        to="/contact"
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D1126] transition-colors hover:text-[#123FFF]"
                      >
                        <span className="relative">
                          <span>Contact us</span>
                          <span
                            className="absolute -bottom-0.5 left-0 h-[2.5px] w-full rounded-full bg-[#C2F81A]"
                            aria-hidden="true"
                          />
                        </span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion Questions */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="space-y-3.5 sm:space-y-4">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <article
                    key={item.id}
                    className={`overflow-hidden rounded-2xl transition-all duration-200 ${
                      isOpen
                        ? 'border border-[#DCE4FF] bg-[#EEF2FF] p-5 shadow-xs sm:p-6'
                        : 'border border-[#E5E9F2] bg-white px-5 py-4 shadow-xs hover:border-[#CFD6E6] hover:bg-[#FAFBFD] sm:px-6 sm:py-4.5'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF]"
                    >
                      <h3 className="font-display text-base font-bold tracking-tight text-[#0D1126] sm:text-lg">
                        {item.question}
                      </h3>
                      <span
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#0D1126]"
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus className="h-5 w-5" strokeWidth={2.4} />
                        ) : (
                          <Plus className="h-5 w-5" strokeWidth={2.4} />
                        )}
                      </span>
                    </button>

                    {isOpen ? (
                      <div className="mt-3.5 text-sm leading-relaxed text-[#4A5268] sm:text-[0.95rem]">
                        <p>{item.answer}</p>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
