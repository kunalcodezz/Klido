import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#3D5AFE]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#3D5AFE] text-white",
        secondary:
          "border-[#E5EAF5] bg-[#F3F6FF] text-[#111827]",
        outline:
          "border-[#E5EAF5] text-[#64748B] bg-white",
        popular:
          "border-[#3D5AFE]/30 bg-[#E8EDFF] text-[#3D5AFE]",
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
