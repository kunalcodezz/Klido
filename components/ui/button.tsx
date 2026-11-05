import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[14px] font-semibold leading-none transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5AFE] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#3D5AFE] text-white hover:bg-[#2F47D4] shadow-sm shadow-[#3D5AFE]/25",
        secondary:
          "border border-[#E5EAF5] bg-white text-[#111827] hover:border-[#3D5AFE] hover:bg-[#F3F6FF]",
        outline:
          "border border-[#E5EAF5] bg-white text-[#111827] hover:border-[#3D5AFE]",
        inverted:
          "bg-white text-[#111827] hover:bg-[#F3F6FF] border border-[#E5EAF5]",
        ghost:
          "hover:bg-[#F3F6FF] text-[#111827]",
        link:
          "text-[#3D5AFE] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-9 px-4 text-[12px]",
        lg: "h-14 px-8 text-[16px]",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
