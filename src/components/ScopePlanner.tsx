import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

type BusinessModel = 'B2B SaaS & Services' | 'Direct-to-Consumer' | 'Multi-Location Brand';
type Bottleneck =
  | 'Acquisition Efficiency'
  | 'Organic Search Visibility'
  | 'Landing Page Conversion'
  | 'Attribution & Tracking';
type Cadence = '90-Day Foundation Sprint' | 'Ongoing Monthly Retainer';

const BUSINESS_MODELS: BusinessModel[] = [
  'B2B SaaS & Services',
  'Direct-to-Consumer',
  'Multi-Location Brand',
];

const BOTTLENECKS: Bottleneck[] = [
  'Acquisition Efficiency',
  'Organic Search Visibility',
  'Landing Page Conversion',
  'Attribution & Tracking',
];

const CHANNEL_OPTIONS = [
  { id: 'paid-search', label: 'Paid Search' },
  { id: 'paid-social', label: 'Paid Social' },
  { id: 'technical-seo', label: 'Technical SEO' },
  { id: 'editorial-content', label: 'Editorial Content' },
  { id: 'conversion-design', label: 'Conversion Design' },
  { id: 'server-tracking', label: 'Analytics & Tracking' },
] as const;

export type ChannelId = (typeof CHANNEL_OPTIONS)[number]['id'];

export interface ScopeTransferState {
  businessModel: BusinessModel;
  bottleneck: Bottleneck;
  channels: string[];
  cadence: Cadence;
}

export function ScopePlanner() {
  const navigate = useNavigate();
  const [businessModel, setBusinessModel] = useState<BusinessModel>('B2B SaaS & Services');
  const [bottleneck, setBottleneck] = useState<Bottleneck>('Acquisition Efficiency');
  const [selectedChannels, setSelectedChannels] = useState<ChannelId[]>([
    'paid-search',
    'conversion-design',
    'server-tracking',
  ]);
  const [cadence, setCadence] = useState<Cadence>('90-Day Foundation Sprint');

  const toggleChannel = (id: ChannelId) => {
    setSelectedChannels((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((item) => item !== id) : prev;
      }
      return [...prev, id];
    });
  };

  const plan = useMemo(() => {
    const channelLabels = CHANNEL_OPTIONS.filter((c) =>
      selectedChannels.includes(c.id),
    ).map((c) => c.label);

    const phaseOne: string[] = [
      'Full baseline audit of existing ad accounts, search console, and conversion paths',
    ];

    if (selectedChannels.includes('server-tracking') || bottleneck === 'Attribution & Tracking') {
      phaseOne.push('Server-side tag governance, UTM taxonomy, and CRM conversion mapping');
    }
    if (selectedChannels.includes('technical-seo') || bottleneck === 'Organic Search Visibility') {
      phaseOne.push('Crawl cleanup, canonical fixes, and commercial keyword-to-URL map');
    }
    if (selectedChannels.includes('paid-search') || selectedChannels.includes('paid-social')) {
      phaseOne.push('Intent-tiered campaign restructure and negative keyword/placement exclusions');
    }

    const phaseTwo: string[] = [];
    if (selectedChannels.includes('conversion-design') || bottleneck === 'Landing Page Conversion') {
      phaseTwo.push('Dedicated campaign landing pages with message-match copy and form UX overhaul');
    }
    if (selectedChannels.includes('editorial-content')) {
      phaseTwo.push('Product-led comparison hubs and technical editorial sprint production');
    }
    if (selectedChannels.includes('paid-social') || selectedChannels.includes('paid-search')) {
      phaseTwo.push('Bi-weekly creative and copy test batches tied to pipeline qualification');
    }
    if (phaseTwo.length === 0) {
      phaseTwo.push('Weekly operating ledger review and controlled landing page split tests');
    }

    const cadenceSummary =
      cadence === '90-Day Foundation Sprint'
        ? 'Twelve-week structured build designed to hand over clean systems, documentation, and internal playbooks.'
        : 'Continuous weekly optimization, creative production, and conversion testing with rolling 30-day terms.';

    return {
      channelLabels,
      phaseOne,
      phaseTwo,
      cadenceSummary,
      focusNote: `Tailored for ${businessModel} addressing ${bottleneck.toLowerCase()}.`,
    };
  }, [businessModel, bottleneck, selectedChannels, cadence]);

  const handleCarryToContact = () => {
    const scopeState: ScopeTransferState = {
      businessModel,
      bottleneck,
      channels: plan.channelLabels,
      cadence,
    };
    navigate('/contact', { state: { scope: scopeState } });
  };

  return (
    <div
      id="scope-planner"
      className="rounded-2xl border border-[#E5E9F2] bg-white p-6 shadow-[0_18px_45px_-20px_rgba(13,17,38,0.08)] sm:p-8 lg:p-10"
    >
      <div className="border-b border-[#E5E9F2] pb-6">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5268]">
          <span
            className="inline-block h-[3px] w-5 rounded-full bg-[#C2F81A]"
            aria-hidden="true"
          />
          <span>Interactive Scope Planner</span>
        </div>
        <h2 className="font-display mt-2.5 text-2xl font-semibold tracking-tight text-[#0D1126] sm:text-3xl">
          Configure an engagement outline
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4A5268] sm:text-base">
          Select your operating model, current bottleneck, and priority channels to preview
          how Klido sequences the first 90 days.
        </p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        {/* Controls Column */}
        <div className="space-y-7 lg:col-span-6">
          <div>
            <label className="block text-sm font-medium text-[#0D1126]">
              1. Business model
            </label>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {BUSINESS_MODELS.map((model) => {
                const active = businessModel === model;
                return (
                  <button
                    key={model}
                    type="button"
                    onClick={() => setBusinessModel(model)}
                    className={`min-h-[40px] rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF] ${
                      active
                        ? 'border-[#123FFF] bg-[#EEF2FF] text-[#123FFF]'
                        : 'border-[#E5E9F2] bg-white text-[#4A5268] hover:border-[#CFD6E6] hover:text-[#0D1126]'
                    }`}
                  >
                    {model}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0D1126]">
              2. Primary growth bottleneck
            </label>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
              {BOTTLENECKS.map((item) => {
                const active = bottleneck === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setBottleneck(item)}
                    className={`min-h-[40px] rounded-lg border px-3.5 py-2 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF] ${
                      active
                        ? 'border-[#123FFF] bg-[#EEF2FF] text-[#123FFF]'
                        : 'border-[#E5E9F2] bg-white text-[#4A5268] hover:border-[#CFD6E6] hover:text-[#0D1126]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-[#0D1126]">
                3. Priority channels &amp; systems
              </label>
              <span className="text-xs text-[#6B7388] tabular-nums">
                {selectedChannels.length} selected
              </span>
            </div>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
              {CHANNEL_OPTIONS.map((channel) => {
                const active = selectedChannels.includes(channel.id);
                return (
                  <button
                    key={channel.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleChannel(channel.id)}
                    className={`flex min-h-[40px] items-center justify-between rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF] ${
                      active
                        ? 'border-[#123FFF] bg-[#EEF2FF] text-[#123FFF]'
                        : 'border-[#E5E9F2] bg-white text-[#4A5268] hover:border-[#CFD6E6] hover:text-[#0D1126]'
                    }`}
                  >
                    <span className="truncate">{channel.label}</span>
                    {active ? (
                      <Check className="h-4 w-4 shrink-0 text-[#123FFF]" aria-hidden="true" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0D1126]">
              4. Engagement structure
            </label>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
              {(
                ['90-Day Foundation Sprint', 'Ongoing Monthly Retainer'] as Cadence[]
              ).map((option) => {
                const active = cadence === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setCadence(option)}
                    className={`min-h-[40px] rounded-lg border px-3.5 py-2 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF] ${
                      active
                        ? 'border-[#123FFF] bg-[#EEF2FF] text-[#123FFF]'
                        : 'border-[#E5E9F2] bg-white text-[#4A5268] hover:border-[#CFD6E6] hover:text-[#0D1126]'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Output Column */}
        <div className="bg-grid-paper flex flex-col justify-between overflow-hidden rounded-xl border border-[#E5E9F2] lg:col-span-6">
          <div>
            <div className="h-[3px] w-full bg-[#C2F81A]" />
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E9F2] pb-4">
                <h3 className="font-display text-base font-semibold text-[#0D1126]">
                  Recommended Execution Sequence
                </h3>
                <span className="text-xs font-medium text-[#6B7388]">{cadence}</span>
              </div>

              <p className="mt-4 text-sm font-medium text-[#0D1126]">{plan.focusNote}</p>
              <p className="mt-1 text-sm text-[#4A5268]">{plan.cadenceSummary}</p>

              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="text-xs font-semibold text-[#6B7388]">
                    Weeks 1–4 · Baseline &amp; Architecture
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-sm text-[#0D1126]">
                    {plan.phaseOne.map((step) => (
                      <li key={step} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#123FFF]"
                          aria-hidden="true"
                        />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#6B7388]">
                    Weeks 5–12 · Execution &amp; Experimentation
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-sm text-[#0D1126]">
                    {plan.phaseTwo.map((step) => (
                      <li key={step} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#123FFF]"
                          aria-hidden="true"
                        />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E5E9F2] bg-white/90 p-6">
            <p className="mb-3 text-xs text-[#6B7388]">
              Active channels: {plan.channelLabels.join(' · ')}
            </p>
            <button
              type="button"
              onClick={handleCarryToContact}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#123FFF] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0D31CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF]"
            >
              <span>Carry This Scope to Project Brief</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
