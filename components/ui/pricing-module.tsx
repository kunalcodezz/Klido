import React, { useState } from "react";
import NumberFlow from "@number-flow/react";
import { Check, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PricingTab } from "@/components/ui/pricing-tab";
import { cn } from "@/lib/utils";
import {
  PRICING_BUNDLES,
  PRICING_SERVICES,
  PricingBundle,
  PricingServiceOption,
} from "../../src/data/pricing";

export interface PricingPlanTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  savings?: number;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  highlighted?: boolean;
  serviceIds: string[];
  badge?: string;
  billingPeriod?: string;
}

export interface PricingModuleProps {
  title?: string;
  subtitle?: string;
  bundleTiers?: PricingPlanTier[];
  singleTiers?: PricingPlanTier[];
  frequencies?: string[];
  defaultFrequency?: string;
  onSelectPlan?: (tier: PricingPlanTier) => void;
  className?: string;
}

// Service feature deliverables mapping from Klido service definitions
const SERVICE_FEATURES_MAP: Record<string, string[]> = {
  "meta-ads": [
    "Account setup & tracking architecture",
    "Full campaign funnel structure",
    "High-converting ad creatives & hooks",
    "Weekly algorithmic optimisation",
  ],
  "influencer-marketing": [
    "Niche creator discovery & audience vetting",
    "10 Barter creator placements per month",
    "Visual briefs & brand guidelines",
    "Deliverable tracking & usage logging",
  ],
  "social-media": [
    "Strategic monthly content calendar",
    "15 Custom feed assets & carousel designs",
    "Daily active story sequences & polls",
    "Community moderation & brand voice",
  ],
  "business-operations": [
    "Granular SKU unit economics & margins",
    "Costing & master P&L modeling",
    "Standard Operating Procedures (SOPs)",
    "Stock threshold & reorder trigger rules",
  ],
};

// Safe mapping layer: Transform raw Klido pricing data to component props without modifying sources
export const mapBundlesToPlanTiers = (bundles: PricingBundle[]): PricingPlanTier[] => {
  return bundles.map((b) => ({
    id: b.id,
    name: b.name,
    price: b.bundlePrice,
    originalPrice: b.originalPrice > b.bundlePrice ? b.originalPrice : undefined,
    savings: b.savings > 0 ? b.savings : undefined,
    description: b.tagline,
    features: b.features,
    cta: "Select bundle",
    popular: b.id === "bundle-growth-stack",
    highlighted: Boolean(b.recommended),
    serviceIds: b.serviceIds,
    badge: b.recommended
      ? "Full Operations"
      : b.id === "bundle-growth-stack"
      ? "Most popular"
      : undefined,
    billingPeriod: "/ month",
  }));
};

export const mapServicesToPlanTiers = (services: PricingServiceOption[]): PricingPlanTier[] => {
  return services.map((s) => ({
    id: s.id,
    name: s.name,
    price: s.price,
    description: s.subtitle,
    features: SERVICE_FEATURES_MAP[s.id] || [
      "Dedicated management",
      "Regular updates",
      "Performance reporting",
    ],
    cta: "Select service",
    serviceIds: [s.id],
    badge: undefined,
    billingPeriod: "/ month",
  }));
};

export const defaultKlidoBundleTiers = mapBundlesToPlanTiers(PRICING_BUNDLES);
export const defaultKlidoSingleTiers = mapServicesToPlanTiers(PRICING_SERVICES);

export const PricingModule: React.FC<PricingModuleProps> = ({
  bundleTiers = defaultKlidoBundleTiers,
  singleTiers = defaultKlidoSingleTiers,
  frequencies = ["Bundles", "Single services"],
  defaultFrequency = "Bundles",
  onSelectPlan,
  className,
}) => {
  const [selectedFrequency, setSelectedFrequency] = useState<string>(defaultFrequency);

  const currentTiers = selectedFrequency === "Bundles" ? bundleTiers : singleTiers;

  const handleSelectTier = (tier: PricingPlanTier) => {
    if (onSelectPlan) {
      onSelectPlan(tier);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Mode / Frequency Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <span className="text-[12px] uppercase font-mono tracking-[0.1em] font-semibold text-[#3D5AFE] block mb-1">
            Pricing Model
          </span>
          <p className="text-[14px] text-[#64748B]">
            {selectedFrequency === "Bundles"
              ? "Comprehensive multi-service monthly retainers with bundled savings."
              : "Individual dedicated service capabilities billed monthly in advance."}
          </p>
        </div>

        <PricingTab
          frequencies={frequencies}
          selectedFrequency={selectedFrequency}
          onFrequencyChange={setSelectedFrequency}
        />
      </div>

      {/* 4-Column Responsive Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
        {currentTiers.map((tier) => {
          const isHighlighted = tier.highlighted;
          const isPopular = tier.popular;

          return (
            <Card
              key={tier.id}
              className={cn(
                "relative rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 group bg-white shadow-xs hover:shadow-lg hover:shadow-[#3D5AFE]/10",
                isHighlighted
                  ? "border-[#3D5AFE] ring-2 ring-[#3D5AFE]/20 shadow-md shadow-[#3D5AFE]/10"
                  : isPopular
                  ? "border-[#3D5AFE]/40 hover:border-[#3D5AFE]"
                  : "border-[#E5EAF5] hover:border-[#3D5AFE]"
              )}
            >
              {/* Subtle Ambient Grid Pattern for Recommended Full Operations Tier */}
              {isHighlighted && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(to right, #3D5AFE 1px, transparent 1px), linear-gradient(to bottom, #3D5AFE 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                    maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
                  }}
                />
              )}

              {/* Top Details & Header */}
              <div className="relative z-10 flex-1 flex flex-col">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-2 min-h-[24px]">
                    <span className="text-[11px] uppercase font-mono tracking-[0.08em] font-semibold text-[#64748B]">
                      Tier Plan
                    </span>

                    {tier.badge && (
                      <Badge
                        variant={isHighlighted ? "default" : "popular"}
                        className={cn(
                          "rounded-full text-[11px] font-semibold px-2.5 py-0.5",
                          isHighlighted
                            ? "bg-[#3D5AFE] text-white border-transparent"
                            : "bg-[#E8EDFF] text-[#3D5AFE] border-[#3D5AFE]/30"
                        )}
                      >
                        {tier.badge}
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="font-sans text-[20px] font-bold tracking-tight text-[#111827] group-hover:text-[#3D5AFE] transition-colors">
                    {tier.name}
                  </CardTitle>

                  <CardDescription className="text-[13px] leading-[1.6] text-[#64748B] mt-1.5 min-h-[42px]">
                    {tier.description}
                  </CardDescription>
                </CardHeader>

                {/* Pricing Block with NumberFlow currency formatting */}
                <CardContent className="p-0 pt-4 pb-4 border-t border-[#E5EAF5]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-price text-[28px] sm:text-[32px] font-bold leading-none text-[#111827]">
                      <NumberFlow
                        value={tier.price}
                        locales="en-IN"
                        format={{
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 0,
                        }}
                      />
                    </span>
                    <span className="text-[12px] text-[#64748B]">
                      {tier.billingPeriod || "/ month"}
                    </span>
                  </div>

                  {/* Struck-through price & savings pill */}
                  <div className="min-h-[22px] mt-1.5 flex items-center gap-2">
                    {tier.originalPrice && tier.originalPrice > tier.price && (
                      <span className="text-[12px] text-[#94A3B8] line-through font-price">
                        was ₹{tier.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                    {tier.savings && tier.savings > 0 && (
                      <span className="text-[11px] font-price font-semibold text-[#3D5AFE] bg-[#E8EDFF] px-2 py-0.5 rounded-full">
                        Save ₹{tier.savings.toLocaleString("en-IN")}/mo
                      </span>
                    )}
                  </div>
                </CardContent>

                {/* Features List with Checkmark icon */}
                <div className="pt-4 border-t border-[#E5EAF5] mb-6 flex-1">
                  <span className="text-[11px] uppercase font-sans tracking-[0.08em] block mb-3 font-semibold text-[#64748B]">
                    Included Deliverables
                  </span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-[13px] sm:text-[14px] flex items-start gap-2.5 leading-snug text-[#111827]"
                      >
                        <Check
                          size={15}
                          strokeWidth={2.2}
                          className="mt-0.5 shrink-0 text-[#3D5AFE]"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <CardFooter className="p-0 pt-4 border-t border-[#E5EAF5] relative z-10">
                <Button
                  type="button"
                  onClick={() => handleSelectTier(tier)}
                  variant={isHighlighted ? "default" : isPopular ? "default" : "secondary"}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 group/btn rounded-full cursor-pointer h-11 text-[14px] font-semibold transition-all duration-150",
                    isHighlighted
                      ? "bg-[#3D5AFE] hover:bg-[#2F47D4] text-white shadow-sm shadow-[#3D5AFE]/25"
                      : isPopular
                      ? "bg-[#E8EDFF] hover:bg-[#3D5AFE] hover:text-white text-[#3D5AFE] border border-[#3D5AFE]/30"
                      : "border border-[#E5EAF5] bg-white text-[#111827] hover:border-[#3D5AFE] hover:bg-[#F3F6FF]"
                  )}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight
                    size={15}
                    strokeWidth={2}
                    className="transition-transform duration-150 group-hover/btn:translate-x-1"
                  />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
