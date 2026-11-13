import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  Headphones,
  Infinity as InfinityIcon,
  Layers,
  Settings,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from 'lucide-react';

export interface ServicePlan {
  id: string;
  name: string;
  subtitle: string;
  originalPrice: string;
  discountLabel: string;
  price: string;
  period: string;
  features: string[];
  mappedDisciplines: string[];
  featured?: boolean;
}

const SERVICE_PLANS: ServicePlan[] = [
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    subtitle: 'Run, optimize & scale paid campaigns on Meta',
    originalPrice: '₹12,999',
    discountLabel: '23% OFF',
    price: '₹9,999',
    period: '/month',
    features: [
      'Campaign Setup & Management',
      'Creative Testing (A/B)',
      'Audience Targeting & Refinement',
      'Budget Optimization',
      'Monthly Performance Report',
    ],
    mappedDisciplines: ['Meta Ads'],
  },
  {
    id: 'influencer-marketing',
    name: 'Influencer Marketing',
    subtitle: 'Collaborate with the right creators for real reach',
    originalPrice: '₹9,999',
    discountLabel: '30% OFF',
    price: '₹6,999',
    period: '/month',
    features: [
      'Creator Research & Shortlisting',
      'Outreach & Collaboration',
      'Campaign Execution',
      'Content Review & Approval',
      'Performance & ROI Report',
    ],
    mappedDisciplines: ['Influencer Marketing'],
  },
  {
    id: 'social-media',
    name: 'Social Media',
    subtitle: 'Build a strong and active brand presence',
    originalPrice: '₹9,999',
    discountLabel: '30% OFF',
    price: '₹6,999',
    period: '/month',
    features: [
      'Content Strategy & Calendar',
      'Post Creation (Graphics & Reels)',
      'Multi-Platform Management',
      'Community Engagement',
      'Monthly Growth Report',
    ],
    mappedDisciplines: ['Social Media'],
  },
  {
    id: 'business-operations',
    name: 'Business Operations',
    subtitle: 'Streamline, manage and scale your business',
    originalPrice: '₹9,999',
    discountLabel: '30% OFF',
    price: '₹6,999',
    period: '/month',
    features: [
      'Process Setup & Optimization',
      'Operations & Workflow Management',
      'Tool & Automation Setup',
      'Team & Task Coordination',
      'Performance & Efficiency Report',
    ],
    mappedDisciplines: ['Business Operations'],
  },
  {
    id: 'growth-bundle',
    name: 'Growth Bundle',
    subtitle: 'All-in-one growth plan for maximum impact',
    originalPrice: '₹39,999',
    discountLabel: '28% OFF',
    price: '₹28,999',
    period: '/month',
    features: [
      'Meta Ads Management',
      'Influencer Campaigns',
      'Social Media Management',
      'Business Operations Support',
      'Unified Growth Report',
    ],
    mappedDisciplines: [
      'Meta Ads',
      'Social Media',
      'Influencer Marketing',
      'Business Operations',
    ],
    featured: true,
  },
];

const PLAN_HIGHLIGHTS = [
  {
    icon: Zap,
    title: 'Transparent Pricing',
    detail: 'No hidden charges',
  },
  {
    icon: Calendar,
    title: 'Flexible Plans',
    detail: 'Upgrade or switch anytime',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    detail: 'Quick and reliable',
  },
  {
    icon: ShieldCheck,
    title: 'Growth Focused',
    detail: 'Built for real business results',
  },
];

function PlanIcon({ id, featured }: { id: string; featured?: boolean }) {
  const iconClass = featured ? 'h-5 w-5 text-[#123FFF]' : 'h-5 w-5 text-[#123FFF]';
  switch (id) {
    case 'meta-ads':
      return <InfinityIcon className={iconClass} aria-hidden="true" />;
    case 'influencer-marketing':
      return <Users className={iconClass} aria-hidden="true" />;
    case 'social-media':
      return <Layers className={iconClass} aria-hidden="true" />;
    case 'business-operations':
      return <Settings className={iconClass} aria-hidden="true" />;
    default:
      return <BarChart3 className={iconClass} aria-hidden="true" />;
  }
}

interface PricingSectionProps {
  onSelectPlan?: (plan: {
    name: string;
    price: string;
    features: string[];
    disciplines: string[];
  }) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const navigate = useNavigate();

  const handleChoosePlan = (plan: ServicePlan) => {
    const payload = {
      name: plan.name,
      price: `${plan.price}${plan.period}`,
      features: plan.features,
      disciplines: plan.mappedDisciplines,
    };
    if (onSelectPlan) {
      onSelectPlan(payload);
      return;
    }
    navigate('/contact', {
      state: {
        selectedPlan: payload,
      },
    });
  };

  return (
    <section
      id="pricing"
      className="relative scroll-mt-20 overflow-hidden border-t border-[#E5E9F2] bg-gradient-to-b from-[#FFFFFF] via-[#F9FAFE] to-[#F4F6FC] py-16 sm:py-20 lg:py-24"
    >
      {/* Corner cobalt/lime accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-[42%] bg-gradient-to-bl from-[#C2F81A]/55 via-[#C2F81A]/18 to-transparent blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-[44%] bg-gradient-to-tr from-[#123FFF]/50 via-[#123FFF]/15 to-transparent blur-2xl"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2.5 text-sm font-medium text-[#0D1126]">
            <span
              className="inline-block h-[3px] w-6 rounded-full bg-[#C2F81A]"
              aria-hidden="true"
            />
            <span>Our Service Plans</span>
          </div>

          <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.025em] text-[#0D1126] sm:text-4xl lg:text-[2.75rem]">
            Choose the right plan for{' '}
            <span className="relative inline-block text-[#123FFF]">
              <span>your brand</span>
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

          <p className="mt-5 text-base text-[#4A5268]">
            Focused, result-driven plans for every part of your digital growth.
          </p>
        </div>

        {/* 5-Column Plans Grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:items-stretch">
          {SERVICE_PLANS.map((plan) => {
            if (plan.featured) {
              return (
                <article
                  key={plan.id}
                  className="relative flex flex-col overflow-visible rounded-2xl border-2 border-[#C2F81A] bg-[#123FFF] shadow-[0_24px_60px_-20px_rgba(18,63,255,0.35)]"
                >
                  {/* Best Value top label */}
                  <div className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-[#C2F81A] px-3 py-1 text-xs font-bold text-[#0D1126]">
                      <Star className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Best Value</span>
                    </span>
                  </div>

                  {/* Cobalt Top Section */}
                  <div className="relative p-5 pt-7 text-white">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                        <PlanIcon id={plan.id} featured />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold leading-tight text-white">
                          {plan.name}
                        </h3>
                        <p className="mt-1 text-xs leading-snug text-white/85">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono-tabular text-sm text-white/75 line-through decoration-[#C2F81A] decoration-2">
                          {plan.originalPrice}
                        </span>
                        <span className="rounded-md bg-[#C2F81A] px-2 py-0.5 text-[11px] font-bold text-[#0D1126]">
                          {plan.discountLabel}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-baseline gap-1">
                        <span className="font-display font-mono-tabular text-3xl font-bold tracking-tight text-white">
                          {plan.price}
                        </span>
                        <span className="text-xs font-medium text-white/85">
                          {plan.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* White Bottom Feature Sheet */}
                  <div className="flex flex-1 flex-col justify-between rounded-b-[14px] rounded-t-2xl bg-white p-5">
                    <ul className="space-y-3 text-xs font-medium text-[#0D1126]">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9AD900]"
                            strokeWidth={3}
                            aria-hidden="true"
                          />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => handleChoosePlan(plan)}
                      className="mt-6 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-[#123FFF] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#0D31CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF]"
                    >
                      <span>Choose Plan</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={plan.id}
                className="flex flex-col justify-between rounded-2xl border border-[#E5E9F2] bg-white p-5 shadow-[0_18px_45px_-20px_rgba(13,17,38,0.08)]"
              >
                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
                      <PlanIcon id={plan.id} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold leading-tight text-[#0D1126]">
                        {plan.name}
                      </h3>
                      <p className="mt-1 text-xs leading-snug text-[#4A5268]">
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-b border-[#E5E9F2] pb-5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono-tabular text-sm text-[#6B7388] line-through decoration-[#DC2626] decoration-2">
                        {plan.originalPrice}
                      </span>
                      <span className="rounded-md bg-[#C2F81A] px-2 py-0.5 text-[11px] font-bold text-[#0D1126]">
                        {plan.discountLabel}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className="font-display font-mono-tabular text-3xl font-bold tracking-tight text-[#0D1126]">
                        {plan.price}
                      </span>
                      <span className="text-xs font-medium text-[#4A5268]">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3 text-xs font-medium text-[#0D1126]">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9AD900]"
                          strokeWidth={3}
                          aria-hidden="true"
                        />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleChoosePlan(plan)}
                  className="mt-6 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-[#123FFF] bg-white px-4 py-2 text-xs font-semibold text-[#0D1126] transition-colors duration-150 hover:bg-[#EEF2FF] hover:text-[#123FFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF]"
                >
                  <span>Choose Plan</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>

        {/* Bottom 4-Column Highlights Strip */}
        <div className="mt-12 grid gap-6 border-t border-[#E5E9F2] pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {PLAN_HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-3.5 lg:justify-center"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[#123FFF]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-[#0D1126]">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#4A5268]">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
