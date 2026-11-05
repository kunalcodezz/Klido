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
        "relative rounded-2xl border p-7 flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 group bg-white shadow-xs hover:shadow-lg hover:shadow-[#3D5AFE]/10",
        isHighlighted
          ? "border-[#3D5AFE] ring-2 ring-[#3D5AFE]/20 text-[#111827] animate-border-sweep shadow-md shadow-[#3D5AFE]/10"
          : isPopular
          ? "border-[#3D5AFE]/40 text-[#111827] hover:border-[#3D5AFE]"
          : "border-[#E5EAF5] text-[#111827] hover:border-[#3D5AFE]",
        className
      )}
    >
      {/* Faint Grid Pattern for Highlighted Card */}
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

      {/* Top Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3 min-h-[24px]">
          <span className="text-[12px] uppercase font-mono tracking-[0.08em] font-semibold text-[#64748B]">
            Tier Plan
          </span>

          {isPopular && (
            <Badge variant="popular" className="rounded-full text-[11px] font-semibold bg-[#E8EDFF] text-[#3D5AFE] border-[#3D5AFE]/30">
              Most popular
            </Badge>
          )}

          {isHighlighted && (
            <Badge
              variant="default"
              className="rounded-full bg-[#3D5AFE] text-white text-[11px] font-semibold"
            >
              Full Operations
            </Badge>
          )}
        </div>

        <h3
          className={cn(
            "font-sans text-[20px] font-bold tracking-tight mb-2 group-hover:text-[#3D5AFE] transition-colors text-[#111827]"
          )}
        >
          {tier.name}
        </h3>

        <p className="text-[14px] leading-[1.6] mb-6 min-h-[44px] text-[#64748B]">
          {tier.description}
        </p>

        {/* Pricing Block with NumberFlow */}
        <div className="mb-6 pt-4 border-t border-[#E5EAF5]">
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                "font-price text-[32px] font-bold leading-none text-[#111827]"
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
            <span className="text-[12px] text-[#64748B]">
              / month
            </span>
          </div>

          {/* Struck-through and savings */}
          <div className="min-h-[22px] mt-1 flex items-center gap-2">
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
        </div>

        {/* Features List */}
        <div className="pt-4 border-t border-[#E5EAF5] mb-8">
          <span className="text-[12px] uppercase font-sans tracking-[0.08em] block mb-3 font-semibold text-[#64748B]">
            Included Deliverables
          </span>
          <ul className="space-y-2.5">
            {tier.features.map((feature, idx) => (
              <li
                key={idx}
                className={cn(
                  "text-[14px] flex items-start gap-2.5 leading-snug text-[#111827]"
                )}
              >
                <Check
                  size={16}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-[#3D5AFE]"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Button Row */}
      <div className="relative z-10 pt-4 border-t border-[#E5EAF5]">
        <Button
          type="button"
          onClick={() => onSelect(tier)}
          variant={isHighlighted ? "default" : isPopular ? "default" : "secondary"}
          className={cn(
            "w-full flex items-center justify-center gap-2 group/btn rounded-full h-11 text-[14px] font-semibold cursor-pointer",
            isHighlighted
              ? "bg-[#3D5AFE] hover:bg-[#2F47D4] text-white shadow-sm shadow-[#3D5AFE]/25"
              : isPopular
              ? "bg-[#E8EDFF] hover:bg-[#3D5AFE] hover:text-white text-[#3D5AFE] border border-[#3D5AFE]/30"
              : "border border-[#E5EAF5] bg-white text-[#111827] hover:border-[#3D5AFE] hover:bg-[#F3F6FF]"
          )}
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
