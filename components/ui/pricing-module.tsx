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
    id: `single-${s.id}`,
    name: s.name,
    price: s.price,
    description: s.subtitle,
    features: SERVICE_FEATURES_MAP[s.id] || [s.subtitle],
    cta: "Select service",
    popular: false,
    highlighted: false,
    serviceIds: [s.id],
    billingPeriod: "/ month",
  }));
};

export const PricingModule: React.FC<PricingModuleProps> = ({
  title = "Predictable pricing with zero hidden markups.",
  subtitle = "Choose an integrated monthly retainer bundle or select individual capabilities.",
  bundleTiers,
  singleTiers,
  frequencies = ["Bundles", "Single services"],
  defaultFrequency = "Bundles",
  onSelectPlan,
  className,
}) => {
  const [selectedFrequency, setSelectedFrequency] = useState<string>(defaultFrequency);

  // Use mapped real Klido data unless custom tiers are passed
  const activeBundleTiers = bundleTiers || mapBundlesToPlanTiers(PRICING_BUNDLES);
  const activeSingleTiers = singleTiers || mapServicesToPlanTiers(PRICING_SERVICES);

  const currentTiers =
    selectedFrequency === "Bundles" ? activeBundleTiers : activeSingleTiers;

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
          <span className="text-[12px] uppercase font-sans tracking-[0.08em] font-medium text-[#9AA3B2] block mb-1">
            Pricing Model
          </span>
          <p className="text-[14px] text-[#F4F6FA]">
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
                "relative rounded-[2px] border p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 group bg-[#0B0F18]",
                isHighlighted
                  ? "border-[#1558C9] shadow-[0_0_24px_rgba(21,88,201,0.22)]"
                  : isPopular
                  ? "border-[#1558C9]/60 hover:border-[#1558C9]"
                  : "border-white/8 hover:border-[#1558C9]"
              )}
            >
              {/* Subtle Ambient Grid Pattern for Recommended Full Operations Tier */}
              {isHighlighted && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.08]"
                  style={{
                    backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
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
                    <span className="text-[11px] uppercase font-mono tracking-[0.08em] font-medium text-[#9AA3B2]">
                      Tier Plan
                    </span>

                    {tier.badge && (
                      <Badge
                        variant={isHighlighted ? "default" : "popular"}
                        className={cn(
                          "rounded-[2px] text-[11px] font-medium px-2 py-0.5",
                          isHighlighted
                            ? "bg-[#1558C9] text-white border-transparent"
                            : "bg-[#1558C9]/15 text-[#D4FF24] border-[#1558C9]/40"
                        )}
                      >
                        {tier.badge}
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="font-serif text-[20px] font-normal tracking-[-0.02em] text-[#F4F6FA] group-hover:text-[#1558C9] transition-colors">
                    {tier.name}
                  </CardTitle>

                  <CardDescription className="text-[13px] leading-[1.6] text-[#9AA3B2] mt-1.5 min-h-[42px]">
                    {tier.description}
                  </CardDescription>
                </CardHeader>

                {/* Pricing Block with NumberFlow currency formatting */}
                <CardContent className="p-0 pt-4 pb-4 border-t border-white/8">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-price text-[28px] sm:text-[32px] font-bold leading-none text-[#F4F6FA]">
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
                    <span className="text-[12px] text-[#9AA3B2]">
                      {tier.billingPeriod || "/ month"}
                    </span>
                  </div>

                  {/* Struck-through price & savings pill */}
                  <div className="min-h-[22px] mt-1.5 flex items-center gap-2">
                    {tier.originalPrice && tier.originalPrice > tier.price && (
                      <span className="text-[12px] text-[#9AA3B2] line-through font-price">
                        was ₹{tier.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                    {tier.savings && tier.savings > 0 && (
                      <span className="text-[11px] font-price font-medium text-[#D4FF24]">
                        Save ₹{tier.savings.toLocaleString("en-IN")}/mo
                      </span>
                    )}
                  </div>
                </CardContent>

                {/* Features List with Checkmark icon */}
                <div className="pt-4 border-t border-white/8 mb-6 flex-1">
                  <span className="text-[11px] uppercase font-sans tracking-[0.08em] block mb-3 font-semibold text-[#9AA3B2]">
                    Included Deliverables
                  </span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-[13px] sm:text-[14px] flex items-start gap-2.5 leading-snug text-[#F4F6FA]"
                      >
                        <Check
                          size={15}
                          strokeWidth={2}
                          className="mt-0.5 shrink-0 text-[#1558C9]"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <CardFooter className="p-0 pt-4 border-t border-white/8 relative z-10">
                <Button
                  type="button"
                  onClick={() => handleSelectTier(tier)}
                  variant={isHighlighted ? "default" : isPopular ? "default" : "secondary"}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 group/btn rounded-[2px] cursor-pointer",
                    isHighlighted
                      ? "bg-[#1558C9] hover:bg-[#1A66E0] text-white"
                      : isPopular
                      ? "bg-[#1558C9]/20 hover:bg-[#1558C9] text-white border border-[#1558C9]/50"
                      : "border border-white/20 bg-transparent text-[#F4F6FA] hover:border-[#1558C9] hover:text-[#D4FF24]"
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

