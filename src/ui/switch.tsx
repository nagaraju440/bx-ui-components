"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "src/lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-keyboardTab disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default:
          "h-6 w-14 data-[state=checked]:bg-primary data-[state=unchecked]:bg-grey1-light-active", // Default style
        sm: "h-6 w-12 data-[state=checked]:bg-primary data-[state=unchecked]:bg-grey1-light-active",
        md: "h-8 w-16 data-[state=checked]:bg-primary data-[state=unchecked]:bg-grey1-light-active",
      },
    },
    defaultVariants: {
      size: "default", // Your current style as the default
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        default:
          "h-4 w-4 data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-1", // Default style
        sm: "h-4 w-4 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1",
        md: "h-6 w-6 data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-1",
      },
    },
    defaultVariants: {
      size: "default", // Your current style as the default
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ size, className }))}
    ref={ref}
    {...props}
  >
    <SwitchPrimitives.Thumb className={cn(thumbVariants({ size }))} />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
