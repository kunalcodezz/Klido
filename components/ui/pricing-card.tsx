import React from "react";
import NumberFlow from "@number-flow/react";
import { Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PricingTier {
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
}

interface PricingCardProps {
  tier: PricingTier;
  onSelect: (tier: PricingTier) => void;
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  onSelect,
  className,
}) => {
  const isHighlighted = tier.highlighted;
  const isPopular = tier.popular;

  return (
    <div
      className={cn(
        "relative rounded-[2px] border p-8 flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 group",
        isHighlighted
          ? "bg-[#0B0F18] border-[#1558C9] text-[#F4F6FA] animate-border-sweep"
          : isPopular
          ? "bg-[#0B0F18] border-[#1558C9]/60 text-[#F4F6FA] hover:border-[#1558C9]"
          : "bg-[#0B0F18] border-white/8 text-[#F4F6FA] hover:border-[#1558C9]",
        className
      )}
    >
      {/* Faint Grid Pattern for Highlighted Card */}
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

      {/* Top Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3 min-h-[24px]">
          <span className="text-[12px] uppercase font-sans tracking-[0.08em] font-medium text-[#9AA3B2]">
            Tier Plan
          </span>

          {isPopular && (
            <Badge variant="popular" className="rounded-[2px] text-[11px] font-medium">
              Most popular
            </Badge>
          )}

          {isHighlighted && (
            <Badge
              variant="default"
              className="rounded-[2px] bg-[#1558C9] text-white text-[11px] font-medium"
            >
              Full Operations
            </Badge>
          )}
        </div>

        <h3
          className={cn(
            "font-serif text-[20px] font-normal tracking-[-0.02em] mb-2 group-hover:text-[#1558C9] transition-colors",
            isHighlighted ? "text-white group-hover:text-white" : "text-[#F4F6FA]"
          )}
        >
          {tier.name}
        </h3>

        <p className="text-[14px] leading-[1.6] mb-6 min-h-[44px] text-[#9AA3B2]">
          {tier.description}
        </p>

        {/* Pricing Block with NumberFlow */}
        <div className="mb-6 pt-4 border-t border-white/8">
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                "font-price text-[32px] font-normal leading-none",
                isHighlighted ? "text-white" : "text-[#F4F6FA]"
              )}
            >
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
              / month
            </span>
          </div>

          {/* Struck-through and savings */}
          <div className="min-h-[22px] mt-1 flex items-center gap-2">
            {tier.originalPrice && tier.originalPrice > tier.price && (
              <span className="text-[12px] text-[#9AA3B2] line-through font-price">
                was ₹{tier.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            {tier.savings && tier.savings > 0 && (
              <span className="text-[12px] font-price text-[#D4FF24]">
                Save ₹{tier.savings.toLocaleString("en-IN")}/mo
              </span>
            )}
          </div>
        </div>

        {/* Features List */}
        <div className="pt-4 border-t border-white/8 mb-8">
          <span className="text-[12px] uppercase font-sans tracking-[0.08em] block mb-3 font-medium text-[#9AA3B2]">
            Included Deliverables
          </span>
          <ul className="space-y-2.5">
            {tier.features.map((feature, idx) => (
              <li
                key={idx}
                className={cn(
                  "text-[14px] flex items-start gap-2.5 leading-snug",
                  isHighlighted ? "text-white" : "text-[#F4F6FA]"
                )}
              >
                <Check
                  size={16}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#1558C9]"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Button Row */}
      <div className="relative z-10 pt-4 border-t border-white/8">
        <Button
          type="button"
          onClick={() => onSelect(tier)}
          variant={isHighlighted ? "inverted" : isPopular ? "default" : "secondary"}
          className="w-full flex items-center justify-center gap-2 group/btn"
        >
          <span>{tier.cta}</span>
          <ArrowRight
            size={16}
            strokeWidth={1.5}
            className="transition-transform duration-150 group-hover/btn:translate-x-1"
          />
        </Button>
      </div>
    </div>
  );
};
