/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Marquee } from './components/Marquee';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { StoryStage } from './sections/StoryStage';
import { Pricing } from './sections/Pricing';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';

export default function App() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'meta-ads',
    'influencer-marketing'
  ]);
  const [quotedPrice, setQuotedPrice] = useState<number>(11000);
  const [bundleName, setBundleName] = useState<string>('Meta Ads + Influencer');

  const handleSelectServiceFromCard = (serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) return prev;
      return [...prev, serviceId];
    });
  };

  const handlePlanSelected = (services: string[], finalPrice: number, matchedBundle?: string) => {
    setSelectedServices(services);
    setQuotedPrice(finalPrice);
    setBundleName(matchedBundle || 'Custom Service Selection');
  };

  return (
    <SmoothScroll>
      {/* Minimal Preloader */}
      <Preloader />

      {/* Desktop 60fps Custom Cursor */}
      <CustomCursor />

      <div className="relative z-10 min-h-screen text-[#F4F6FA] font-sans selection:bg-[#1558C9] selection:text-[#F4F6FA] overflow-x-hidden antialiased bg-transparent">
        {/* Smart Navbar with hairline border and layoutId sliding underline */}
        <Navbar
          onOpenContact={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <main>
          {/* HERO SECTION with SplitType Line Reveals & Initial Phone Pose */}
          <Hero />

          {/* 500vh PINNED STORY STAGE: 4-Stage Cinematic 3D Phone Sequence */}
          <StoryStage
            onSelectService={handleSelectServiceFromCard}
            onOpenContact={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* INFINITE MARQUEE STRIP */}
          <Marquee />

          {/* 04 / PRICING & CALCULATOR with NumberFlow and Framer Motion checkmarks */}
          <Pricing
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            onPlanSelected={handlePlanSelected}
          />

          {/* 05 / FAQ with Framer Motion accordion height and rotating plus */}
          <FAQ />

          {/* CONTACT AUDIT FORM with Magnetic Submit Button */}
          <Contact
            initialServices={selectedServices}
            initialQuotedPrice={quotedPrice}
            initialBundleName={bundleName}
          />
        </main>

        {/* FOOTER with animated underline hover */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
