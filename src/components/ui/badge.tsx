import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[2px] border px-2.5 py-0.5 text-[12px] font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-[#2F7FD1]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#2F7FD1] text-white",
        secondary:
          "border-[#D5E0EC] bg-[#EEF4FA] text-[#0F1B2D]",
        outline:
          "border-[#D5E0EC] text-[#5B6B7F] bg-white",
        popular:
          "border-[#2F7FD1] bg-[#EAF3FC] text-[#2F7FD1]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
