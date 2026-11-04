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
    <section ref={containerRef} id="contact" className="py-[72px] lg:py-32 bg-transparent relative z-10 border-t border-white/8">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Agency Information */}
          <div className="col-span-12 lg:col-span-5 bg-[#0B0F18]/95 backdrop-blur-xs p-6 sm:p-8 rounded-[2px] border border-white/8">
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] font-medium text-[#9AA3B2] block mb-3">
              Direct Contact
            </span>
            <h2
              ref={headlineRef}
              className="font-serif text-[32px] sm:text-[56px] font-normal text-[#F4F6FA] leading-[1.08] tracking-[-0.02em] mb-4"
            >
              Ready to scale without losing control?
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#9AA3B2] max-w-[45ch] mb-10">
              Complimentary 20-minute margin and unit economics review with our senior team.
            </p>

            <div className="space-y-6 pt-6 border-t border-white/8">
              <div>
                <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#9AA3B2] block mb-1">
                  WhatsApp Direct Desk
                </span>
                <a
                  href={`https://wa.me/91${AGENCY_CONTACT.phone}?text=${encodeURIComponent(
                    AGENCY_CONTACT.whatsappMessageBase
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[16px] tabular-nums text-[#F4F6FA] hover:text-[#D4FF24] hover:underline underline-offset-4"
                >
                  {AGENCY_CONTACT.phoneDisplay}
                </a>
              </div>

              <div>
                <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#9AA3B2] block mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${AGENCY_CONTACT.email}`}
                  className="text-[16px] text-[#F4F6FA] hover:text-[#D4FF24] hover:underline underline-offset-4"
                >
                  {AGENCY_CONTACT.email}
                </a>
              </div>

              <div>
                <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#9AA3B2] block mb-1">
                  Instagram
                </span>
                <a
                  href={AGENCY_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[16px] text-[#F4F6FA] hover:text-[#D4FF24] hover:underline underline-offset-4"
                >
                  {AGENCY_CONTACT.instagram}
                </a>
              </div>

              <div>
                <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#9AA3B2] block mb-1">
                  Operating Hubs
                </span>
                <p className="text-[14px] text-[#F4F6FA]">
                  {AGENCY_CONTACT.hubs}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form with magnetic submit button */}
          <div className="col-span-12 lg:col-span-7 bg-[#0B0F18] border border-white/8 rounded-[2px] p-8 sm:p-10 transition-shadow duration-200">
            {submittedStatus === 'redirected' ? (
              <div className="py-8">
                <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#1558C9] block mb-2 font-medium">
                  Inquiry Dispatched
                </span>
                <h3 className="font-serif text-[32px] font-normal text-[#F4F6FA] mb-4">
                  We have received your parameters.
                </h3>
                <p className="text-[16px] leading-[1.6] text-[#9AA3B2] max-w-[50ch] mb-8">
                  WhatsApp draft opened. Our team will review your catalogue numbers and respond within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedStatus('idle')}
                  className="h-12 px-6 rounded-[2px] border border-white/20 text-[#F4F6FA] hover:border-[#1558C9] text-[14px] font-medium leading-none bg-transparent transition-colors duration-150 ease-out cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#F4F6FA] mb-2 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rohan Sharma"
                      className="w-full h-12 px-4 rounded-[2px] bg-[#030407] border border-white/8 text-[14px] text-[#F4F6FA] placeholder-[#9AA3B2]/50 focus:outline-none focus:border-[#1558C9] transition-colors"
                    />
                    {errors.name && <p className="text-[12px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#F4F6FA] mb-2 font-medium">
                      Brand Name *
                    </label>
                    <input
                      type="text"
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      placeholder="e.g. SpaceApparel"
                      className="w-full h-12 px-4 rounded-[2px] bg-[#030407] border border-white/8 text-[14px] text-[#F4F6FA] placeholder-[#9AA3B2]/50 focus:outline-none focus:border-[#1558C9] transition-colors"
                    />
                    {errors.brandName && <p className="text-[12px] text-red-400 mt-1">{errors.brandName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#F4F6FA] mb-2 font-medium">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rohan@spaceapparel.com"
                      className="w-full h-12 px-4 rounded-[2px] bg-[#030407] border border-white/8 text-[14px] text-[#F4F6FA] placeholder-[#9AA3B2]/50 focus:outline-none focus:border-[#1558C9] transition-colors"
                    />
                    {errors.email && <p className="text-[12px] text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#F4F6FA] mb-2 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98000 12345"
                      className="w-full h-12 px-4 rounded-[2px] bg-[#030407] border border-white/8 text-[14px] text-[#F4F6FA] placeholder-[#9AA3B2]/50 focus:outline-none focus:border-[#1558C9] transition-colors"
                    />
                    {errors.phone && <p className="text-[12px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#F4F6FA] mb-2 font-medium">
                    Website or Instagram URL
                  </label>
                  <input
                    type="text"
                    value={formData.websiteOrInstagram}
                    onChange={(e) => setFormData({ ...formData, websiteOrInstagram: e.target.value })}
                    placeholder="https://yourbrand.com or @yourbrand"
                    className="w-full h-12 px-4 rounded-[2px] bg-[#030407] border border-white/8 text-[14px] text-[#F4F6FA] placeholder-[#9AA3B2]/50 focus:outline-none focus:border-[#1558C9] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#F4F6FA] mb-2 font-medium">
                    Services of Interest
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {PRICING_SERVICES.map((s) => {
                      const isChecked = formData.selectedServices.includes(s.id);
                      return (
                        <label
                          key={s.id}
                          className={`p-3 border rounded-[2px] text-[12px] cursor-pointer flex items-center gap-2.5 transition-all select-none ${
                            isChecked
                              ? 'border-[#1558C9] bg-[#1558C9]/20 text-[#F4F6FA]'
                              : 'border-white/8 text-[#9AA3B2] hover:border-[#1558C9]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleFormService(s.id)}
                            className="rounded-[2px] border-white/20 text-[#1558C9] focus:ring-[#1558C9]"
                          />
                          <span>{s.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#F4F6FA] mb-2 font-medium">
                    Current Monthly Revenue / Ad Spend
                  </label>
                  <select
                    value={formData.monthlyBudget}
                    onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                    className="w-full h-12 px-4 rounded-[2px] bg-[#030407] border border-white/8 text-[14px] text-[#F4F6FA] focus:outline-none focus:border-[#1558C9] transition-colors cursor-pointer"
                  >
                    <option value="under-1L" className="bg-[#0B0F18] text-[#F4F6FA]">Under ₹1 Lakh/month (Early-Stage)</option>
                    <option value="1L-5L" className="bg-[#0B0F18] text-[#F4F6FA]">₹1 Lakh – ₹5 Lakh/month (Scaling)</option>
                    <option value="5L-15L" className="bg-[#0B0F18] text-[#F4F6FA]">₹5 Lakh – ₹15 Lakh/month (Growth)</option>
                    <option value="15L-plus" className="bg-[#0B0F18] text-[#F4F6FA]">₹15 Lakh+/month (Established)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] uppercase font-sans tracking-[0.08em] text-[#F4F6FA] mb-2 font-medium">
                    Operational Objectives
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Current order volume, return rate, or margin targets..."
                    className="w-full p-4 rounded-[2px] bg-[#030407] border border-white/8 text-[14px] text-[#F4F6FA] placeholder-[#9AA3B2]/50 focus:outline-none focus:border-[#1558C9] transition-colors"
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
                  className="w-full h-12 rounded-[2px] bg-[#1558C9] hover:bg-[#1A66E0] disabled:opacity-40 text-white text-[14px] font-medium leading-none transition-colors duration-150 ease-out cursor-pointer text-center"
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
