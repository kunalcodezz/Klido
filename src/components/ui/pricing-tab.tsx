import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PricingTabProps {
  frequencies: string[];
  selectedFrequency: string;
  onFrequencyChange: (frequency: string) => void;
  className?: string;
}

export const PricingTab: React.FC<PricingTabProps> = ({
  frequencies,
  selectedFrequency,
  onFrequencyChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex p-1 bg-[#F3F6FF] border border-[#E5EAF5] rounded-full",
        className
      )}
    >
      {frequencies.map((frequency) => {
        const isSelected = selectedFrequency === frequency;
        return (
          <button
            key={frequency}
            type="button"
            onClick={() => onFrequencyChange(frequency)}
            className={cn(
              "relative px-5 py-2 text-[13px] font-semibold transition-colors duration-150 ease-out rounded-full cursor-pointer focus:outline-none",
              isSelected ? "text-white" : "text-[#64748B] hover:text-[#111827]"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="pricing-tab-indicator"
                className="absolute inset-0 bg-[#3D5AFE] rounded-full shadow-sm shadow-[#3D5AFE]/25"
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
            <span className="relative z-10">{frequency}</span>
          </button>
        );
      })}
    </div>
  );
};
