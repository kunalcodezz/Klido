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
        "inline-flex p-1 bg-[#0B0F18] border border-white/8 rounded-[2px]",
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
              "relative px-5 py-2 text-[14px] font-medium transition-colors duration-150 ease-out rounded-[2px] cursor-pointer focus:outline-none",
              isSelected ? "text-white" : "text-[#9AA3B2] hover:text-[#F4F6FA]"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="pricing-tab-indicator"
                className="absolute inset-0 bg-[#1558C9] rounded-[2px] shadow-none"
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
