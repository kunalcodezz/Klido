import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] text-[14px] font-medium leading-none transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2F7FD1] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#2F7FD1] text-white hover:bg-[#256bb3]",
        secondary:
          "border border-[#D5E0EC] bg-transparent text-[#0F1B2D] hover:border-[#2F7FD1]",
        outline:
          "border border-[#D5E0EC] bg-white text-[#0F1B2D] hover:border-[#2F7FD1]",
        inverted:
          "bg-white text-[#0F1B2D] hover:bg-[#F7FAFD] border border-white",
        ghost:
          "hover:bg-[#EEF4FA] text-[#0F1B2D]",
        link:
          "text-[#2F7FD1] underline-offset-4 hover:underline",
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
