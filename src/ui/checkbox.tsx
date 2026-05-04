"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/lib/utils";

// Define variants using CVA
const checkboxVariants = cva(
  "m-1 flex items-center justify-center peer shrink-0 rounded-lg border focus:outline-keyboardTab leading-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:border-transparent data-[state=unchecked]:border-gray-hover box-border",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-7 w-7",
        xxl: "h-8 w-8",
      },
      error: {
        true: "border-red",
        false: "border-gray-hover",
      },
    },
    defaultVariants: {
      size: "lg",
      error: false,
    },
  }
);

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  asChild?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size, error, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ size, error: !!error }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-[80%] w-[80%] transition-transform duration-150" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
