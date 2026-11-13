import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  Coins,
  Copy,
  Link2,
  Lock,
  Mail,
  Pencil,
  RotateCcw,
  User,
} from 'lucide-react';
import type { ScopeTransferState } from './ScopePlanner';

export interface SelectedPlanState {
  name: string;
  price: string;
  features: string[];
  disciplines: string[];
}

interface ProjectBriefSectionProps {
  id?: string;
  initialScope?: ScopeTransferState;
  selectedPlan?: SelectedPlanState | null;
  headingAs?: 'h1' | 'h2';
}

const DISCIPLINES = [
  'Meta Ads',
  'Social Media',
  'Influencer Marketing',
  'Business Operations',
  'Technical SEO',
  'Conversion Design',
];

const ENGAGEMENT_OPTIONS = [
  '90-Day Foundation Sprint',
  'Ongoing Monthly Retainer',
  'Meta Ads Plan',
  'Influencer Marketing Plan',
  'Social Media Plan',
  'Business Operations Plan',
  'Growth Bundle',
];

const BUDGET_OPTIONS = [
  '₹5,000 – ₹15,000 / month',
  '₹15,000 – ₹40,000 / month',
  '₹40,000+ / month',
  'Under ₹5,000 / month',
];

const MAX_CONTEXT_LENGTH = 500;

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  disciplines?: string;
  notes?: string;
}

interface SubmittedBrief {
  name: string;
  email: string;
  company: string;
  website: string;
  engagementModel: string;
  budget: string;
  disciplines: string[];
  notes: string;
}

export function ProjectBriefSection({
  id = 'start-project',
  initialScope,
  selectedPlan,
  headingAs = 'h2',
}: ProjectBriefSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [engagementModel, setEngagementModel] = useState<string>(
    initialScope?.cadence ?? ENGAGEMENT_OPTIONS[0],
  );
  const [budget, setBudget] = useState<string>(BUDGET_OPTIONS[0]);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>(
    initialScope?.channels?.length
      ? initialScope.channels
      : ['Social Media', 'Influencer Marketing'],
  );
  const [notes, setNotes] = useState(
    initialScope
      ? `Business model: ${initialScope.businessModel}. Primary bottleneck: ${initialScope.bottleneck}.`
      : '',
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<SubmittedBrief | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!selectedPlan) return;
    setSubmitted(null);
    const matchedOption =
      ENGAGEMENT_OPTIONS.find((opt) =>
        opt.toLowerCase().includes(selectedPlan.name.toLowerCase()),
      ) ?? 'Ongoing Monthly Retainer';
    setEngagementModel(matchedOption);
    setBudget(`${selectedPlan.name} (${selectedPlan.price})`);
    if (selectedPlan.disciplines.length > 0) {
      setSelectedDisciplines(selectedPlan.disciplines);
    }
    setNotes(
      `Interested in ${selectedPlan.name} (${selectedPlan.price}): ${selectedPlan.features.join(', ')}.`.slice(
        0,
        MAX_CONTEXT_LENGTH,
      ),
    );
  }, [selectedPlan]);

  const toggleDiscipline = (label: string) => {
    setSelectedDisciplines((prev) => {
      const next = prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label];
      if (next.length > 0 && errors.disciplines) {
        setErrors((err) => ({ ...err, disciplines: undefined }));
      }
      return next;
    });
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!name.trim()) {
      next.name = 'Please enter your full name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      next.email = 'Please enter your work email.';
    } else if (!emailPattern.test(email.trim())) {
      next.email = 'Enter a valid email address (for example, name@brand.com).';
    }
    if (!company.trim()) {
      next.company = 'Please enter your brand or company name.';
    }
    if (website.trim()) {
      const domainPattern = /^(https?:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+/;
      if (!domainPattern.test(website.trim())) {
        next.website = 'Enter a valid website or Instagram URL.';
      }
    }
    if (selectedDisciplines.length === 0) {
      next.disciplines = 'Select at least one discipline.';
    }
    if (!notes.trim() || notes.trim().length < 10) {
      next.notes = 'Please share a brief note about your channels or goals.';
    }
    return next;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitted({
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      website: website.trim() || 'Not specified',
      engagementModel,
      budget,
      disciplines: selectedDisciplines,
      notes: notes.trim(),
    });
  };

  const handleCopyBrief = async () => {
    if (!submitted) return;
    const summaryText = [
      'Klido Project Brief',
      `Name: ${submitted.name}`,
      `Email: ${submitted.email}`,
      `Brand: ${submitted.company}`,
      `URL: ${submitted.website}`,
      `Engagement: ${submitted.engagementModel}`,
      `Budget / Plan: ${submitted.budget}`,
      `Disciplines: ${submitted.disciplines.join(', ')}`,
      `Context: ${submitted.notes}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const HeadingTag = headingAs;

  return (
    <section
      id={id}
      className="relative scroll-mt-20 overflow-hidden border-t border-[#E5E9F2] bg-gradient-to-b from-[#FFFFFF] via-[#F9FAFE] to-[#F4F6FC] py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle corner organic accents matching Klido system */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-[42%] bg-gradient-to-bl from-[#C2F81A]/55 via-[#C2F81A]/18 to-transparent blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-[44%] bg-gradient-to-tr from-[#123FFF]/50 via-[#123FFF]/15 to-transparent blur-2xl"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Headline Column */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 text-sm font-medium text-[#0D1126]">
              <span
                className="inline-block h-[3px] w-6 rounded-full bg-[#C2F81A]"
                aria-hidden="true"
              />
              <span>Start a project</span>
            </div>

            <HeadingTag className="font-display mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#0D1126] sm:text-5xl">
              Tell us what you&apos;re{' '}
              <span className="relative inline-block text-[#123FFF]">
                <span>building.</span>
                <svg
                  className="pointer-events-none absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 220 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8.5C64 3.5 152 2.5 218 6.5"
                    stroke="#C2F81A"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </HeadingTag>

            {selectedPlan ? (
              <div className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[#E5E9F2] bg-white px-3.5 py-2 text-xs text-[#4A5268]">
                <span>Selected plan:</span>
                <strong className="font-semibold text-[#0D1126]">
                  {selectedPlan.name} ({selectedPlan.price})
                </strong>
              </div>
            ) : initialScope ? (
              <div className="mt-8 flex flex-wrap items-center gap-2 rounded-lg border border-[#E5E9F2] bg-white px-3.5 py-2 text-xs text-[#4A5268]">
                <span>
                  Scope imported:{' '}
                  <strong className="font-semibold text-[#0D1126]">
                    {initialScope.businessModel}
                  </strong>{' '}
                  · {initialScope.cadence}
                </span>
                <Link
                  to="/services#scope-planner"
                  className="font-semibold text-[#123FFF] hover:underline"
                >
                  Adjust
                </Link>
              </div>
            ) : null}
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="rounded-2xl border border-[#E5E9F2] bg-white p-6 shadow-[0_24px_60px_-20px_rgba(13,17,38,0.12)] sm:p-8">
                <div className="flex items-start gap-3 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-4">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#166534]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#166534]">
                      Project brief received
                    </h3>
                    <p className="mt-1 text-sm text-[#166534]">
                      Thank you, {submitted.name}. We will review your brief for{' '}
                      {submitted.company} and respond to {submitted.email} within one
                      business day.
                    </p>
                  </div>
                </div>

                <dl className="mt-6 divide-y divide-[#E5E9F2] border-y border-[#E5E9F2] text-sm">
                  <div className="grid grid-cols-3 gap-4 py-3">
                    <dt className="font-medium text-[#6B7388]">Brand</dt>
                    <dd className="col-span-2 text-[#0D1126]">
                      {submitted.company} ({submitted.website})
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-3">
                    <dt className="font-medium text-[#6B7388]">Plan / Budget</dt>
                    <dd className="col-span-2 text-[#0D1126]">
                      {submitted.engagementModel} · {submitted.budget}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-3">
                    <dt className="font-medium text-[#6B7388]">Disciplines</dt>
                    <dd className="col-span-2 text-[#0D1126]">
                      {submitted.disciplines.join(' · ')}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-3">
                    <dt className="font-medium text-[#6B7388]">Context</dt>
                    <dd className="col-span-2 text-[#4A5268]">{submitted.notes}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#CFD6E6] bg-white px-4 py-2 text-sm font-medium text-[#0D1126] transition-colors duration-150 hover:bg-[#F7F9FE]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-[#166534]" aria-hidden="true" />
                        <span>Brief Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-[#4A5268]" aria-hidden="true" />
                        <span>Copy Brief Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(null);
                      setCopied(false);
                    }}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[#4A5268] transition-colors duration-150 hover:bg-[#F7F9FE] hover:text-[#0D1126]"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    <span>Edit or Submit Another</span>
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-[#E5E9F2] bg-white p-6 shadow-[0_24px_60px_-20px_rgba(13,17,38,0.12)] sm:p-8"
              >
                {/* Row 1: Full name + Work email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`${id}-name`}
                      className="block text-sm font-semibold text-[#0D1126]"
                    >
                      Full name <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <User
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7388]"
                        aria-hidden="true"
                      />
                      <input
                        id={`${id}-name`}
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name)
                            setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Riya Sharma"
                        aria-invalid={Boolean(errors.name)}
                        className={`block min-h-[44px] w-full rounded-lg border py-2 pl-10 pr-3.5 text-sm text-[#0D1126] placeholder:text-[#6B7388]/80 focus:outline-2 focus:outline-offset-0 focus:outline-[#123FFF] ${
                          errors.name ? 'border-[#DC2626]' : 'border-[#CFD6E6]'
                        }`}
                      />
                    </div>
                    {errors.name ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#DC2626]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.name}</span>
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor={`${id}-email`}
                      className="block text-sm font-semibold text-[#0D1126]"
                    >
                      Work email <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <Mail
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7388]"
                        aria-hidden="true"
                      />
                      <input
                        id={`${id}-email`}
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email)
                            setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="name@brand.com"
                        aria-invalid={Boolean(errors.email)}
                        className={`block min-h-[44px] w-full rounded-lg border py-2 pl-10 pr-3.5 text-sm text-[#0D1126] placeholder:text-[#6B7388]/80 focus:outline-2 focus:outline-offset-0 focus:outline-[#123FFF] ${
                          errors.email ? 'border-[#DC2626]' : 'border-[#CFD6E6]'
                        }`}
                      />
                    </div>
                    {errors.email ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#DC2626]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Row 2: Brand name + Website URL */}
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`${id}-company`}
                      className="block text-sm font-semibold text-[#0D1126]"
                    >
                      Brand or company name <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <Briefcase
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7388]"
                        aria-hidden="true"
                      />
                      <input
                        id={`${id}-company`}
                        type="text"
                        value={company}
                        onChange={(e) => {
                          setCompany(e.target.value);
                          if (errors.company)
                            setErrors((prev) => ({ ...prev, company: undefined }));
                        }}
                        placeholder="Brand Name"
                        aria-invalid={Boolean(errors.company)}
                        className={`block min-h-[44px] w-full rounded-lg border py-2 pl-10 pr-3.5 text-sm text-[#0D1126] placeholder:text-[#6B7388]/80 focus:outline-2 focus:outline-offset-0 focus:outline-[#123FFF] ${
                          errors.company ? 'border-[#DC2626]' : 'border-[#CFD6E6]'
                        }`}
                      />
                    </div>
                    {errors.company ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#DC2626]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.company}</span>
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor={`${id}-website`}
                      className="block text-sm font-semibold text-[#0D1126]"
                    >
                      Website or Instagram URL
                    </label>
                    <div className="relative mt-1.5">
                      <Link2
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7388]"
                        aria-hidden="true"
                      />
                      <input
                        id={`${id}-website`}
                        type="text"
                        value={website}
                        onChange={(e) => {
                          setWebsite(e.target.value);
                          if (errors.website)
                            setErrors((prev) => ({ ...prev, website: undefined }));
                        }}
                        placeholder="https://brand.com"
                        aria-invalid={Boolean(errors.website)}
                        className={`block min-h-[44px] w-full rounded-lg border py-2 pl-10 pr-3.5 text-sm text-[#0D1126] placeholder:text-[#6B7388]/80 focus:outline-2 focus:outline-offset-0 focus:outline-[#123FFF] ${
                          errors.website ? 'border-[#DC2626]' : 'border-[#CFD6E6]'
                        }`}
                      />
                    </div>
                    {errors.website ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#DC2626]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.website}</span>
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Row 3: Engagement model + Monthly budget */}
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`${id}-engagement`}
                      className="block text-sm font-semibold text-[#0D1126]"
                    >
                      Engagement model <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <Calendar
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7388]"
                        aria-hidden="true"
                      />
                      <select
                        id={`${id}-engagement`}
                        value={engagementModel}
                        onChange={(e) => setEngagementModel(e.target.value)}
                        className="block min-h-[44px] w-full rounded-lg border border-[#CFD6E6] bg-white py-2 pl-10 pr-3.5 text-sm text-[#0D1126] focus:outline-2 focus:outline-offset-0 focus:outline-[#123FFF]"
                      >
                        {ENGAGEMENT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`${id}-budget`}
                      className="block text-sm font-semibold text-[#0D1126]"
                    >
                      Monthly marketing &amp; media budget{' '}
                      <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <Coins
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7388]"
                        aria-hidden="true"
                      />
                      <select
                        id={`${id}-budget`}
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="block min-h-[44px] w-full rounded-lg border border-[#CFD6E6] bg-white py-2 pl-10 pr-3.5 text-sm text-[#0D1126] focus:outline-2 focus:outline-offset-0 focus:outline-[#123FFF]"
                      >
                        {selectedPlan ? (
                          <option value={`${selectedPlan.name} (${selectedPlan.price})`}>
                            {selectedPlan.name} ({selectedPlan.price})
                          </option>
                        ) : null}
                        {BUDGET_OPTIONS.map((tier) => (
                          <option key={tier} value={tier}>
                            {tier}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 4: Relevant disciplines (2x3 grid) */}
                <div className="mt-5">
                  <span className="block text-sm font-semibold text-[#0D1126]">
                    Relevant disciplines <span className="text-[#DC2626]">*</span>
                  </span>
                  <div className="mt-2 grid gap-2.5 sm:grid-cols-3">
                    {DISCIPLINES.map((discipline) => {
                      const active = selectedDisciplines.includes(discipline);
                      return (
                        <button
                          key={discipline}
                          type="button"
                          aria-pressed={active}
                          onClick={() => toggleDiscipline(discipline)}
                          className={`flex min-h-[42px] items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF] ${
                            active
                              ? 'border-[#123FFF] bg-[#F4F7FF] text-[#123FFF]'
                              : 'border-[#CFD6E6] bg-white text-[#0D1126] hover:border-[#9FA8BE]'
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border ${
                              active
                                ? 'border-[#123FFF] bg-[#123FFF] text-white'
                                : 'border-[#9FA8BE] bg-white'
                            }`}
                            aria-hidden="true"
                          >
                            {active ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                          </span>
                          <span className="truncate">{discipline}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.disciplines ? (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#DC2626]">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.disciplines}</span>
                    </p>
                  ) : null}
                </div>

                {/* Row 5: Project context textarea with 0 / 500 counter */}
                <div className="mt-5">
                  <label
                    htmlFor={`${id}-notes`}
                    className="block text-sm font-semibold text-[#0D1126]"
                  >
                    Project context &amp; current priorities{' '}
                    <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <Pencil
                      className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#6B7388]"
                      aria-hidden="true"
                    />
                    <textarea
                      id={`${id}-notes`}
                      rows={4}
                      maxLength={MAX_CONTEXT_LENGTH}
                      value={notes}
                      onChange={(e) => {
                        setNotes(e.target.value);
                        if (errors.notes)
                          setErrors((prev) => ({ ...prev, notes: undefined }));
                      }}
                      placeholder="Share your current channels, SKU count or offer, and what you want to achieve over the next quarter."
                      aria-invalid={Boolean(errors.notes)}
                      className={`block w-full rounded-lg border py-3 pl-10 pr-3.5 text-sm text-[#0D1126] placeholder:text-[#6B7388]/80 focus:outline-2 focus:outline-offset-0 focus:outline-[#123FFF] ${
                        errors.notes ? 'border-[#DC2626]' : 'border-[#CFD6E6]'
                      }`}
                    />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between gap-4">
                    <div>
                      {errors.notes ? (
                        <p className="flex items-center gap-1.5 text-xs text-[#DC2626]">
                          <AlertCircle
                            className="h-3.5 w-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{errors.notes}</span>
                        </p>
                      ) : null}
                    </div>
                    <span className="font-mono-tabular text-xs text-[#6B7388]">
                      {notes.length} / {MAX_CONTEXT_LENGTH}
                    </span>
                  </div>
                </div>

                {/* Form Footer */}
                <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-[#E5E9F2] pt-5 sm:flex-row sm:items-center">
                  <p className="inline-flex items-center gap-2 text-xs text-[#4A5268]">
                    <Lock className="h-3.5 w-3.5 shrink-0 text-[#6B7388]" aria-hidden="true" />
                    <span>No automated mailing lists. Used strictly for project scheduling.</span>
                  </p>
                  <button
                    type="submit"
                    className="inline-flex min-h-[46px] w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#123FFF] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0D31CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF] sm:w-auto"
                  >
                    <span>Submit Project Brief</span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
