import React, { useState } from "react";
import { PricingTab } from "@/components/ui/pricing-tab";
import { PricingCard, PricingTier } from "@/components/ui/pricing-card";

export interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  bundleTiers?: PricingTier[];
  singleTiers?: PricingTier[];
  frequencies?: string[];
  onSelectTier?: (tier: PricingTier) => void;
}

export const defaultBundleTiers: PricingTier[] = [
  {
    id: "bundle-social-influencer",
    name: "Social Media + Influencer",
    price: 9000,
    originalPrice: 11000,
    savings: 2000,
    description: "Organic brand proof & creator velocity.",
    features: [
      "Complete content grid & stories",
      "10 barter creator placements monthly",
      "Unified aesthetic & creator briefs",
      "Deliverable management & reporting",
    ],
    cta: "Select bundle",
    serviceIds: ["social-media", "influencer-marketing"],
  },
  {
    id: "bundle-ads-influencer",
    name: "Meta Ads + Influencer",
    price: 11000,
    originalPrice: 13000,
    savings: 2000,
    description: "Direct customer acquisition engine.",
    features: [
      "High-converting ad account structure",
      "10 barter creators feeding ad creative",
      "Whitelisted creator assets for ads",
      "Weekly performance & ROAS audit",
    ],
    cta: "Select bundle",
    serviceIds: ["meta-ads", "influencer-marketing"],
  },
  {
    id: "bundle-growth-stack",
    name: "Meta Ads + Influencer + Social Media",
    price: 15000,
    originalPrice: 18000,
    savings: 3000,
    popular: true,
    description: "Total marketing command stack.",
    features: [
      "Omnichannel marketing synchronisation",
      "Creative pipeline from creators to ads",
      "Social proof compounding across channels",
      "Dedicated marketing sprint meetings",
    ],
    cta: "Select bundle",
    serviceIds: ["meta-ads", "influencer-marketing", "social-media"],
  },
  {
    id: "bundle-complete-partnership",
    name: "Complete Business Growth & Operations",
    price: 25000,
    highlighted: true,
    description: "All 4 services: marketing, operations & P&L guardrails.",
    features: [
      "End-to-end e-commerce management",
      "Customer acquisition (ads + creators + social)",
      "Operational guardrails (unit economics + SOPs)",
      "Master P&L modelling & landed cost audits",
      "Priority leadership Slack & weekly check-ins",
    ],
    cta: "Select bundle",
    serviceIds: ["meta-ads", "influencer-marketing", "social-media", "business-operations"],
  },
];

export const defaultSingleTiers: PricingTier[] = [
  {
    id: "single-meta-ads",
    name: "Meta Ads",
    price: 7000,
    description: "Fixed for ad spend under ₹1L, 10% above.",
    features: [
      "Account setup & tracking architecture",
      "Full campaign funnel structure",
      "High-converting ad creatives & hooks",
      "Weekly algorithmic optimisation",
    ],
    cta: "Select service",
    serviceIds: ["meta-ads"],
  },
  {
    id: "single-influencer",
    name: "Influencer Marketing",
    price: 6000,
    description: "10 barter videos included monthly.",
    features: [
      "Niche creator discovery & audience vetting",
      "10 barter creator placements per month",
      "Visual briefs & brand guidelines",
      "Deliverable tracking & usage logging",
    ],
    cta: "Select service",
    serviceIds: ["influencer-marketing"],
  },
  {
    id: "single-social-media",
    name: "Social Media",
    price: 5000,
    description: "Consistent organic presence & stories.",
    features: [
      "Strategic monthly content calendar",
      "Regular feed posts & aesthetic curation",
      "High-converting Instagram stories",
      "Brand communication & engagement tone",
    ],
    cta: "Select service",
    serviceIds: ["social-media"],
  },
  {
    id: "single-operations",
    name: "Business Operations",
    price: 7000,
    description: "Unit economics, costing & fulfillment SOPs.",
    features: [
      "Granular SKU unit economics & margins",
      "Costing & master P&L modeling",
      "Standard Operating Procedures (SOPs)",
      "Stock threshold & reorder trigger rules",
    ],
    cta: "Select service",
    serviceIds: ["business-operations"],
  },
];

export const PricingSection: React.FC<PricingSectionProps> = ({
  title = "Predictable pricing with zero hidden markups.",
  subtitle = "Choose an integrated monthly bundle or select individual capabilities.",
  bundleTiers = defaultBundleTiers,
  singleTiers = defaultSingleTiers,
  frequencies = ["Bundles", "Single services"],
  onSelectTier,
}) => {
  const [selectedFrequency, setSelectedFrequency] = useState<string>(frequencies[0]);

  const activeTiers = selectedFrequency === "Bundles" ? bundleTiers : singleTiers;

  const handleSelect = (tier: PricingTier) => {
    if (onSelectTier) {
      onSelectTier(tier);
    }
  };

  return (
    <div className="w-full">
      {/* Segmented Toggle Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <span className="text-[12px] uppercase font-sans tracking-[0.08em] font-medium text-[#9AA3B2] block mb-1">
            Pricing Model
          </span>
          <p className="text-[14px] text-[#F4F6FA]">
            Switch between bundled retainers and single capability pricing.
          </p>
        </div>

        <PricingTab
          frequencies={frequencies}
          selectedFrequency={selectedFrequency}
          onFrequencyChange={setSelectedFrequency}
        />
      </div>

      {/* 4-Column Grid: 1 col mobile, 2 col tablet, 4 col desktop, max-width 1152px, 32px gap */}
      <div className="max-w-[1152px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {activeTiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};
