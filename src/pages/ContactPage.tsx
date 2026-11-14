import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Headphones,
  Info,
  Lock,
  Mail,
  PenLine,
  Phone,
  Store,
  User,
} from 'lucide-react';
import { InteractiveGlobe } from '../components/InteractiveGlobe';
import type { ScopeTransferState } from '../components/ScopePlanner';
import type { SelectedPlanState } from '../components/ProjectBriefSection';

type SubmissionStatus = 'idle' | 'full_success' | 'partial_success' | 'error';

// EmailJS Environment Variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || '';
const CUSTOMER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID || '';

export function ContactPage() {
  const location = useLocation();
  const routeState = location.state as {
    scope?: ScopeTransferState;
    selectedPlan?: SelectedPlanState;
  } | null;

  // Prepopulate project details if redirected from pricing or scope planner
  const defaultDetails = routeState?.selectedPlan
    ? `Interested in the ${routeState.selectedPlan.name} plan (${routeState.selectedPlan.price}). `
    : routeState?.scope
      ? `Model: ${routeState.scope.businessModel}, Channels: ${routeState.scope.channels.join(', ')}. `
      : '';

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    projectDetails: defaultDetails,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submittedInfo, setSubmittedInfo] = useState<{ name: string; email: string }>({
    name: '',
    email: '',
  });

  // Security & anti-spam protections
  const [honeypot, setHoneypot] = useState('');
  const formMountTime = useRef(Date.now());
  const isSubmittingRef = useRef(false);

  const MAX_DETAILS_LENGTH = 500;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Full name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please enter your work email';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid work email address (e.g. name@brand.com)';
    }

    if (!formData.projectDetails.trim()) {
      errs.projectDetails = 'Please share a few details about your project';
    } else if (formData.projectDetails.trim().length < 5) {
      errs.projectDetails = 'Please provide a bit more context (at least 5 characters)';
    } else if (formData.projectDetails.length > MAX_DETAILS_LENGTH) {
      errs.projectDetails = `Project details must not exceed ${MAX_DETAILS_LENGTH} characters`;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Anti-spam honeypot check (bots auto-fill hidden input)
    if (honeypot) {
      console.warn('[Security] Honeypot field triggered. Discarding automated submission.');
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 600));
      setIsSubmitting(false);
      setSubmissionStatus('full_success');
      return;
    }

    // 2. Prevent duplicate concurrent submissions
    if (isSubmitting || isSubmittingRef.current) {
      return;
    }

    // 3. Validate form inputs
    if (!validate()) return;

    // 4. Basic rate limiting: reject submission if completed under 1 second
    if (Date.now() - formMountTime.current < 1000) {
      console.warn('[Security] Form submitted too rapidly, likely automated.');
      return;
    }

    // 5. Environment configuration verification
    if (!SERVICE_ID || !PUBLIC_KEY || !ADMIN_TEMPLATE_ID || !CUSTOMER_TEMPLATE_ID) {
      console.error('[EmailJS] Configuration error: Missing environment variables.', {
        hasServiceId: Boolean(SERVICE_ID),
        hasPublicKey: Boolean(PUBLIC_KEY),
        hasAdminTemplate: Boolean(ADMIN_TEMPLATE_ID),
        hasCustomerTemplate: Boolean(CUSTOMER_TEMPLATE_ID),
      });
      setErrorMessage(
        'Email automation is currently unconfigured. Please email us directly at contact@klido.in.'
      );
      setSubmissionStatus('error');
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage('');

    const customerName = formData.fullName.trim();
    const customerEmail = formData.email.trim();
    const customerCompany = formData.company.trim() || 'Not specified';
    const customerMessage = formData.projectDetails.trim();

    // Detect if customer optionally wrote a phone number inside the project details
    const phoneMatch = customerMessage.match(
      /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+?\d{10,13}/
    );
    const detectedPhone = phoneMatch ? phoneMatch[0] : 'Not provided';

    const selectedService = routeState?.selectedPlan?.name
      ? routeState.selectedPlan.name
      : routeState?.scope
        ? `Growth Channels: ${routeState.scope.channels.join(', ')}`
        : 'General Growth Inquiry';

    const selectedBudget = routeState?.selectedPlan?.price
      ? routeState.selectedPlan.price
      : routeState?.scope?.cadence
        ? `Cadence: ${routeState.scope.cadence}`
        : 'Not specified';

    const submissionTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // Exact Admin parameters required by EmailJS template
    const adminParams = {
      name: customerName,
      from_name: customerName,
      email: customerEmail,
      reply_to: customerEmail,
      phone: detectedPhone,
      company: customerCompany,
      service: selectedService,
      budget: selectedBudget,
      message: customerMessage,
      submission_time: submissionTime,
    };

    try {
      // Step 1: Send Admin notification first
      await emailjs.send(
        SERVICE_ID,
        ADMIN_TEMPLATE_ID,
        adminParams,
        PUBLIC_KEY
      );

      // Save user info for display on success screen
      setSubmittedInfo({
        name: customerName,
        email: customerEmail,
      });

      // Reset form fields ONLY AFTER admin email succeeds
      setFormData({
        fullName: '',
        company: '',
        email: '',
        projectDetails: '',
      });
      setErrors({});

      // Step 2: Send Customer acknowledgement second
      const customerParams = {
        to_email: customerEmail,
        to_name: customerName,
        name: customerName,
        service: selectedService,
      };

      try {
        await emailjs.send(
          SERVICE_ID,
          CUSTOMER_TEMPLATE_ID,
          customerParams,
          PUBLIC_KEY
        );
        // Both emails succeeded
        setSubmissionStatus('full_success');
      } catch (custErr) {
        console.error('[EmailJS] Customer acknowledgement email failed:', custErr);
        // Admin succeeded, customer email failed: show partial-success
        setSubmissionStatus('partial_success');
      }
    } catch (adminErr) {
      console.error('[EmailJS] Admin notification email failed:', adminErr);
      // Admin failed: Preserve entered form data so customer doesn't lose inputs!
      setSubmissionStatus('error');
      setErrorMessage(
        'We encountered an issue sending your message. Your entered details have been preserved. Please try again or reach out directly at contact@klido.in.'
      );
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      company: '',
      email: '',
      projectDetails: '',
    });
    setErrors({});
    setErrorMessage('');
    setSubmissionStatus('idle');
  };

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-white text-[#0D1126]">
      {/* Top-Right Signature Neon Lime Ambient Glow matching design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-[440px] w-[440px] rounded-[45%] bg-gradient-to-bl from-[#D6FF00]/65 via-[#D6FF00]/18 to-transparent blur-3xl"
      />

      {/* Bottom-Left Electric Blue Glow behind the Interactive Globe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 h-[480px] w-[480px] rounded-[45%] bg-gradient-to-tr from-[#2457FF]/40 via-[#2457FF]/14 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* ================= LEFT COLUMN ================= */}
          <div className="flex flex-col justify-between lg:col-span-5 xl:col-span-5">
            <div>
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-2.5 text-sm font-medium text-[#0D1126]">
                <span
                  className="inline-block h-[3px] w-6 rounded-full bg-[#D6FF00]"
                  aria-hidden="true"
                />
                <span>Contact Us</span>
              </div>

              {/* Bold Headline */}
              <h1 className="font-display mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#0D1126] sm:text-5xl lg:text-[3.5rem]">
                Let&apos;s Build
                <br />
                Something Great
                <br />
                <span className="text-[#2457FF]">Together.</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#4A5268]">
                Have a project in mind, a question about our services, or just want to say
                hello? We&apos;d love to hear from you.
              </p>

              {/* Contact Details List */}
              <div className="mt-8 space-y-4">
                {/* 1. Email */}
                <a
                  href="mailto:contact@klido.in"
                  className="group flex items-center gap-3.5 text-sm font-medium text-[#0D1126] transition-colors hover:text-[#2457FF]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#2457FF] transition-all duration-150 group-hover:scale-105 group-hover:bg-[#2457FF] group-hover:text-white shadow-xs">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>contact@klido.in</span>
                </a>

                {/* 2. Phone */}
                <a
                  href="tel:+919876543210"
                  className="group flex items-center gap-3.5 text-sm font-medium text-[#0D1126] transition-colors hover:text-[#2457FF]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#2457FF] transition-all duration-150 group-hover:scale-105 group-hover:bg-[#2457FF] group-hover:text-white shadow-xs">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+91 98765 43210</span>
                </a>

                {/* 3. Support */}
                <a
                  href="mailto:support@klido.in"
                  className="group flex items-center gap-3.5 text-sm font-medium text-[#0D1126] transition-colors hover:text-[#2457FF]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#2457FF] transition-all duration-150 group-hover:scale-105 group-hover:bg-[#2457FF] group-hover:text-white shadow-xs">
                    <Headphones className="h-4 w-4" />
                  </div>
                  <span>support@klido.in</span>
                </a>
              </div>
            </div>

            {/* Subtle Interactive Globe positioned at bottom-left */}
            <div className="relative mt-10 -ml-4 w-full max-w-[360px] sm:max-w-[420px] lg:mt-14">
              <div className="aspect-square w-full">
                <InteractiveGlobe className="h-full w-full" />
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (CONTACT FORM) ================= */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="rounded-[28px] border border-[#E5E9F2] bg-white p-6 shadow-[0_24px_60px_-18px_rgba(13,17,38,0.08)] sm:p-9 lg:p-10">
              {submissionStatus !== 'full_success' && submissionStatus !== 'partial_success' ? (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Invisible Honeypot Field for Spam Protection */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Leave blank</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Form Header */}
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-[#0D1126] sm:text-[1.75rem]">
                      Send us a message
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#4A5268]">
                      Fill out the form and we&apos;ll get back to you within one business
                      day.
                    </p>
                  </div>

                  {/* Dotted Divider matching reference */}
                  <div className="my-6 border-b border-dotted border-[#D1D8E8]" />

                  {/* Admin Error Alert Banner */}
                  {errorMessage && (
                    <div
                      role="alert"
                      className="mb-6 flex items-start gap-3 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-4 text-sm text-[#991B1B] shadow-xs"
                    >
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#DC2626]" />
                      <div className="flex-1">
                        <p className="font-semibold text-[#7F1D1D]">Submission Error</p>
                        <p className="mt-0.5 leading-relaxed">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-5">
                    {/* Two Column Row: Full Name & Company */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#0D1126]"
                        >
                          Full Name <span className="text-[#EF4444]">*</span>
                        </label>
                        <div className="relative mt-2">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8C95A8]">
                            <User className="h-4 w-4" />
                          </div>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            disabled={isSubmitting}
                            value={formData.fullName}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                fullName: e.target.value,
                              }));
                              if (errors.fullName) {
                                setErrors((prev) => ({ ...prev, fullName: '' }));
                              }
                            }}
                            placeholder="Riya Sharma"
                            className={`block w-full rounded-xl border bg-white py-3 pl-10 pr-3.5 text-sm text-[#0D1126] placeholder-[#8C95A8] transition-colors focus:bg-white focus:outline-none focus:ring-2 disabled:bg-[#F9FAFE] disabled:text-[#8C95A8] ${
                              errors.fullName
                                ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20'
                                : 'border-[#E5E9F2] hover:border-[#CFD6E6] focus:border-[#2457FF] focus:ring-[#2457FF]/20'
                            }`}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="mt-1.5 text-xs font-medium text-[#EF4444]">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Company / Brand */}
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#0D1126]"
                        >
                          Company / Brand
                        </label>
                        <div className="relative mt-2">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8C95A8]">
                            <Store className="h-4 w-4" />
                          </div>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            disabled={isSubmitting}
                            value={formData.company}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                company: e.target.value,
                              }))
                            }
                            placeholder="Brand Name"
                            className="block w-full rounded-xl border border-[#E5E9F2] bg-white py-3 pl-10 pr-3.5 text-sm text-[#0D1126] placeholder-[#8C95A8] transition-colors hover:border-[#CFD6E6] focus:border-[#2457FF] focus:outline-none focus:ring-2 focus:ring-[#2457FF]/20 disabled:bg-[#F9FAFE] disabled:text-[#8C95A8]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Work Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#0D1126]"
                      >
                        Work Email <span className="text-[#EF4444]">*</span>
                      </label>
                      <div className="relative mt-2">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8C95A8]">
                          <Mail className="h-4 w-4" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          disabled={isSubmitting}
                          value={formData.email}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }));
                            if (errors.email) {
                              setErrors((prev) => ({ ...prev, email: '' }));
                            }
                          }}
                          placeholder="name@brand.com"
                          className={`block w-full rounded-xl border bg-white py-3 pl-10 pr-3.5 text-sm text-[#0D1126] placeholder-[#8C95A8] transition-colors focus:bg-white focus:outline-none focus:ring-2 disabled:bg-[#F9FAFE] disabled:text-[#8C95A8] ${
                            errors.email
                              ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20'
                              : 'border-[#E5E9F2] hover:border-[#CFD6E6] focus:border-[#2457FF] focus:ring-[#2457FF]/20'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1.5 text-xs font-medium text-[#EF4444]">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Project Details */}
                    <div>
                      <label
                        htmlFor="projectDetails"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#0D1126]"
                      >
                        Project Details <span className="text-[#EF4444]">*</span>
                      </label>
                      <div className="relative mt-2">
                        <div className="pointer-events-none absolute top-3.5 left-3.5 text-[#8C95A8]">
                          <PenLine className="h-4 w-4" />
                        </div>
                        <textarea
                          id="projectDetails"
                          name="projectDetails"
                          rows={4}
                          disabled={isSubmitting}
                          maxLength={MAX_DETAILS_LENGTH}
                          value={formData.projectDetails}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              projectDetails: e.target.value,
                            }));
                            if (errors.projectDetails) {
                              setErrors((prev) => ({
                                ...prev,
                                projectDetails: '',
                              }));
                            }
                          }}
                          placeholder="Tell us about your project, goals and any specific requirements..."
                          className={`block w-full rounded-xl border bg-white py-3 pl-10 pr-3.5 text-sm text-[#0D1126] placeholder-[#8C95A8] transition-colors focus:bg-white focus:outline-none focus:ring-2 disabled:bg-[#F9FAFE] disabled:text-[#8C95A8] ${
                            errors.projectDetails
                              ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20'
                              : 'border-[#E5E9F2] hover:border-[#CFD6E6] focus:border-[#2457FF] focus:ring-[#2457FF]/20'
                          }`}
                        />
                      </div>
                      <div className="mt-1.5 flex items-center justify-between">
                        {errors.projectDetails ? (
                          <p className="text-xs font-medium text-[#EF4444]">
                            {errors.projectDetails}
                          </p>
                        ) : (
                          <div />
                        )}
                        <span className="font-mono-tabular text-xs text-[#8C95A8]">
                          {formData.projectDetails.length} / {MAX_DETAILS_LENGTH}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Row: Security Note + Send Button */}
                  <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-2 text-xs text-[#6B7388]">
                      <Lock className="h-4 w-4 shrink-0 text-[#8C95A8]" />
                      <p className="max-w-[260px] leading-tight">
                        Your information is secure and will only be used to respond to
                        your inquiry.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2457FF] px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:bg-[#123FFF] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2457FF]/40 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : submissionStatus === 'full_success' ? (
                /* Full Success State Banner (Both Admin and Customer Succeeded) */
                <div className="py-8 text-center sm:py-12">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D6FF00]/25 text-[#123FFF]">
                    <CheckCircle2 className="h-8 w-8 text-[#2457FF]" />
                  </div>
                  <h3 className="font-display mt-5 text-2xl font-bold tracking-tight text-[#0D1126]">
                    Message received!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#4A5268]">
                    Thank you for reaching out,{' '}
                    <strong className="text-[#0D1126]">{submittedInfo.name}</strong>. Your
                    inquiry has been received by our senior team, and we have sent an
                    automated confirmation to{' '}
                    <strong className="text-[#0D1126]">{submittedInfo.email}</strong>. We
                    will get back to you within one business day.
                  </p>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center rounded-xl border border-[#E5E9F2] bg-white px-5 py-2.5 text-sm font-semibold text-[#0D1126] transition-colors hover:border-[#CFD6E6] hover:bg-[#F9FAFE]"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                /* Partial Success State Banner (Admin Succeeded, Customer Email Failed) */
                <div className="py-8 text-center sm:py-12">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#2457FF]">
                    <Info className="h-8 w-8 text-[#2457FF]" />
                  </div>
                  <h3 className="font-display mt-5 text-2xl font-bold tracking-tight text-[#0D1126]">
                    Enquiry Delivered to Team!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#4A5268]">
                    Thank you for reaching out,{' '}
                    <strong className="text-[#0D1126]">{submittedInfo.name}</strong>. Your
                    message has been successfully delivered to the Klido studio team.
                    (Note: We encountered an issue sending the automated copy to{' '}
                    <strong className="text-[#0D1126]">{submittedInfo.email}</strong>, but
                    our team has your inquiry on file and will reach out to you within one
                    business day.)
                  </p>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center rounded-xl border border-[#E5E9F2] bg-white px-5 py-2.5 text-sm font-semibold text-[#0D1126] transition-colors hover:border-[#CFD6E6] hover:bg-[#F9FAFE]"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
