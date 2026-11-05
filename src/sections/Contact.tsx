import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { AGENCY_CONTACT, PRICING_SERVICES } from '../data/pricing';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  initialServices?: string[];
  initialQuotedPrice?: number;
  initialBundleName?: string;
}

export const Contact: React.FC<ContactProps> = ({
  initialServices = [],
  initialQuotedPrice = 0,
  initialBundleName = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    email: '',
    phone: '',
    websiteOrInstagram: '',
    selectedServices: initialServices,
    monthlyBudget: 'under-1L',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedStatus, setSubmittedStatus] = useState<'idle' | 'preparing' | 'redirected'>('idle');
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      setFormData((prev) => ({
        ...prev,
        selectedServices: initialServices
      }));
    }
  }, [initialServices]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let splitInstance: SplitType | null = null;
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        splitInstance = new SplitType(headlineRef.current, { types: 'lines' });
        if (splitInstance.lines) {
          splitInstance.lines.forEach((line) => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'block';
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });

          gsap.from(splitInstance.lines, {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
            },
          });
        }
      }
    }, containerRef);

    return () => {
      ctx.revert();
      if (splitInstance) splitInstance.revert();
    };
  }, []);

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    // limit max distance to 12px
    setBtnOffset({
      x: Math.max(-12, Math.min(12, x)),
      y: Math.max(-12, Math.min(12, y)),
    });
  };

  const handleButtonMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const toggleFormService = (serviceId: string) => {
    setFormData((prev) => {
      const current = prev.selectedServices;
      const updated = current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId];
      return { ...prev, selectedServices: updated };
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Required';
    if (!formData.brandName.trim()) errs.brandName = 'Required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errs.email = 'Valid email required';
    }

    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      errs.phone = 'Valid phone required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedStatus('preparing');

    const serviceNames = formData.selectedServices
      .map((id) => PRICING_SERVICES.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const whatsappText = `*Klido Growth & Operations Inquiry*
---------------------------------
*Name:* ${formData.name}
*Brand:* ${formData.brandName}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Website/IG:* ${formData.websiteOrInstagram || 'None'}
*Selected Modules:* ${serviceNames || 'None'}
*Monthly Budget:* ${formData.monthlyBudget}
*Plan:* ${initialBundleName || 'Custom'}
${initialQuotedPrice > 0 ? `*Quoted Fee:* ₹${initialQuotedPrice.toLocaleString('en-IN')}/mo` : ''}

*Notes:*
${formData.message || 'Ready for audit and alignment.'}`;

    const targetUrl = `https://wa.me/91${AGENCY_CONTACT.phone}?text=${encodeURIComponent(whatsappText)}`;

    setTimeout(() => {
      setSubmittedStatus('redirected');
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }, 200);
  };

  return (
    <section ref={containerRef} id="contact" className="py-[72px] lg:py-32 bg-white relative z-10 border-t border-[#E5EAF5]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Agency Information */}
          <div className="col-span-12 lg:col-span-5 bg-[#F3F6FF] p-6 sm:p-8 rounded-2xl border border-[#E5EAF5] shadow-xs">
            <span className="text-[12px] uppercase font-mono tracking-[0.1em] font-semibold text-[#3D5AFE] block mb-3">
              Direct Contact
            </span>
            <h2
              ref={headlineRef}
              className="font-sans font-bold text-[32px] sm:text-[44px] text-[#111827] leading-[1.08] tracking-[-0.03em] mb-4"
            >
              Ready to scale without losing control?
            </h2>
            <p className="text-[15px] leading-[1.65] text-[#64748B] max-w-[45ch] mb-10">
              Complimentary 20-minute margin and unit economics review with our senior team.
            </p>

            <div className="space-y-6 pt-6 border-t border-[#E5EAF5]">
              <div>
                <span className="text-[12px] uppercase font-mono tracking-[0.08em] font-semibold text-[#64748B] block mb-1">
                  WhatsApp Direct Desk
                </span>
                <a
                  href={`https://wa.me/91${AGENCY_CONTACT.phone}?text=${encodeURIComponent(
                    AGENCY_CONTACT.whatsappMessageBase
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[16px] font-semibold tabular-nums text-[#111827] hover:text-[#3D5AFE] hover:underline underline-offset-4"
                >
                  {AGENCY_CONTACT.phoneDisplay}
                </a>
              </div>

              <div>
                <span className="text-[12px] uppercase font-mono tracking-[0.08em] font-semibold text-[#64748B] block mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${AGENCY_CONTACT.email}`}
                  className="text-[15px] font-medium text-[#111827] hover:text-[#3D5AFE] hover:underline underline-offset-4"
                >
                  {AGENCY_CONTACT.email}
                </a>
              </div>

              <div>
                <span className="text-[12px] uppercase font-mono tracking-[0.08em] font-semibold text-[#64748B] block mb-1">
                  Instagram
                </span>
                <a
                  href={AGENCY_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[15px] font-medium text-[#111827] hover:text-[#3D5AFE] hover:underline underline-offset-4"
                >
                  {AGENCY_CONTACT.instagram}
                </a>
              </div>

              <div>
                <span className="text-[12px] uppercase font-mono tracking-[0.08em] font-semibold text-[#64748B] block mb-1">
                  Operating Hubs
                </span>
                <p className="text-[14px] text-[#111827] font-medium">
                  {AGENCY_CONTACT.hubs}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form with magnetic submit button */}
          <div className="col-span-12 lg:col-span-7 bg-[#F8FAFC] border border-[#E5EAF5] rounded-2xl p-8 sm:p-10 shadow-sm transition-shadow duration-200">
            {submittedStatus === 'redirected' ? (
              <div className="py-8">
                <span className="text-[12px] uppercase font-mono tracking-[0.1em] text-[#3D5AFE] block mb-2 font-semibold">
                  Inquiry Dispatched
                </span>
                <h3 className="font-sans text-[28px] sm:text-[32px] font-bold text-[#111827] mb-4 tracking-tight">
                  We have received your parameters.
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#64748B] max-w-[50ch] mb-8">
                  WhatsApp draft opened. Our team will review your catalogue numbers and respond within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedStatus('idle')}
                  className="h-12 px-7 rounded-full border border-[#E5EAF5] bg-white text-[#111827] hover:border-[#3D5AFE] hover:text-[#3D5AFE] text-[14px] font-semibold leading-none transition-all duration-150 ease-out cursor-pointer shadow-xs"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#111827] mb-2 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rohan Sharma"
                      className="w-full h-12 px-4 rounded-xl bg-white border border-[#E5EAF5] text-[14px] text-[#111827] placeholder-[#94A3B8] focus:outline-none focus:border-[#3D5AFE] focus:ring-2 focus:ring-[#3D5AFE]/20 transition-all shadow-xs"
                    />
                    {errors.name && <p className="text-[12px] text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#111827] mb-2 font-semibold">
                      Brand Name *
                    </label>
                    <input
                      type="text"
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      placeholder="e.g. SpaceApparel"
                      className="w-full h-12 px-4 rounded-xl bg-white border border-[#E5EAF5] text-[14px] text-[#111827] placeholder-[#94A3B8] focus:outline-none focus:border-[#3D5AFE] focus:ring-2 focus:ring-[#3D5AFE]/20 transition-all shadow-xs"
                    />
                    {errors.brandName && <p className="text-[12px] text-red-500 mt-1">{errors.brandName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#111827] mb-2 font-semibold">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rohan@spaceapparel.com"
                      className="w-full h-12 px-4 rounded-xl bg-white border border-[#E5EAF5] text-[14px] text-[#111827] placeholder-[#94A3B8] focus:outline-none focus:border-[#3D5AFE] focus:ring-2 focus:ring-[#3D5AFE]/20 transition-all shadow-xs"
                    />
                    {errors.email && <p className="text-[12px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#111827] mb-2 font-semibold">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98000 12345"
                      className="w-full h-12 px-4 rounded-xl bg-white border border-[#E5EAF5] text-[14px] text-[#111827] placeholder-[#94A3B8] focus:outline-none focus:border-[#3D5AFE] focus:ring-2 focus:ring-[#3D5AFE]/20 transition-all shadow-xs"
                    />
                    {errors.phone && <p className="text-[12px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#111827] mb-2 font-semibold">
                    Website or Instagram URL
                  </label>
                  <input
                    type="text"
                    value={formData.websiteOrInstagram}
                    onChange={(e) => setFormData({ ...formData, websiteOrInstagram: e.target.value })}
                    placeholder="https://yourbrand.com or @yourbrand"
                    className="w-full h-12 px-4 rounded-xl bg-white border border-[#E5EAF5] text-[14px] text-[#111827] placeholder-[#94A3B8] focus:outline-none focus:border-[#3D5AFE] focus:ring-2 focus:ring-[#3D5AFE]/20 transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#111827] mb-2 font-semibold">
                    Services of Interest
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {PRICING_SERVICES.map((s) => {
                      const isChecked = formData.selectedServices.includes(s.id);
                      return (
                        <label
                          key={s.id}
                          className={`p-3 border rounded-xl text-[12px] font-medium cursor-pointer flex items-center gap-2.5 transition-all select-none shadow-xs ${
                            isChecked
                              ? 'border-[#3D5AFE] bg-[#E8EDFF] text-[#111827]'
                              : 'border-[#E5EAF5] text-[#64748B] hover:border-[#3D5AFE] bg-white'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleFormService(s.id)}
                            className="rounded-[4px] border-[#CBD5E1] text-[#3D5AFE] focus:ring-[#3D5AFE]"
                          />
                          <span>{s.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#111827] mb-2 font-semibold">
                    Current Monthly Revenue / Ad Spend
                  </label>
                  <select
                    value={formData.monthlyBudget}
                    onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-white border border-[#E5EAF5] text-[14px] text-[#111827] focus:outline-none focus:border-[#3D5AFE] focus:ring-2 focus:ring-[#3D5AFE]/20 transition-all cursor-pointer shadow-xs"
                  >
                    <option value="under-1L" className="bg-white text-[#111827]">Under ₹1 Lakh/month (Early-Stage)</option>
                    <option value="1L-5L" className="bg-white text-[#111827]">₹1 Lakh – ₹5 Lakh/month (Scaling)</option>
                    <option value="5L-15L" className="bg-white text-[#111827]">₹5 Lakh – ₹15 Lakh/month (Growth)</option>
                    <option value="15L-plus" className="bg-white text-[#111827]">₹15 Lakh+/month (Established)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#111827] mb-2 font-semibold">
                    Operational Objectives
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Current order volume, return rate, or margin targets..."
                    className="w-full p-4 rounded-xl bg-white border border-[#E5EAF5] text-[14px] text-[#111827] placeholder-[#94A3B8] focus:outline-none focus:border-[#3D5AFE] focus:ring-2 focus:ring-[#3D5AFE]/20 transition-all shadow-xs"
                  />
                </div>

                {/* Magnetic Primary Submit Button */}
                <motion.button
                  type="submit"
                  onMouseMove={handleButtonMouseMove}
                  onMouseLeave={handleButtonMouseLeave}
                  animate={{ x: btnOffset.x, y: btnOffset.y }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  disabled={submittedStatus === 'preparing'}
                  className="w-full h-12 rounded-full bg-[#3D5AFE] hover:bg-[#2F47D4] disabled:opacity-40 text-white text-[15px] font-semibold leading-none transition-all duration-150 ease-out cursor-pointer text-center shadow-md shadow-[#3D5AFE]/25 hover:shadow-lg hover:shadow-[#3D5AFE]/30"
                >
                  {submittedStatus === 'preparing' ? 'Preparing Parameters...' : 'Submit Inquiry & Request Audit'}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
