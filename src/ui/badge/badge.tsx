import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "src/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-[5px] whitespace-nowrap max-w-fit ",
  {
    variants: {
      variant: {
        primary: "bg-primary-light text-primary",
        success: "bg-green-light text-green",
        danger: "bg-red-light text-red",
        warning: "bg-yellow-light text-yellow",
        pending: "bg-orange-light text-orange",
        disable: "bg-grey2-light text-grey2",
        "border-primary": "bg-primary-light border border-primary text-primary",
        "border-success": "bg-green-light border border-green text-green",
        "border-danger": "bg-red-light border border-red text-red",
        "border-warning": "bg-yellow-light border border-yellow text-yellow",
        "border-pending": "bg-orange-light border border-orange text-orange",
        "border-disable": "bg-grey2-light border border-grey2 text-grey2",
        "secondary-primary": "bg-white text-primary",
        "secondary-success": "bg-white text-green",
        "secondary-danger": "bg-white text-red",
        "secondary-warning": "bg-white text-yellow",
        "secondary-pending": "bg-white text-orange",
        "secondary-disable": "bg-white text-grey2",

        //TODO: Remove bellow styles after new design is implemented
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
      size: {
        default: "h-6 px-2 py-2 rounded-full text-sm font-semibold",
        sm: "h-7 px-3 py-2 rounded-full text-sm font-medium",
        lg: "h-8 px-3 py-2 rounded-full text-sm font-medium",
        xl: "h-9 px-3 py-2 rounded-full text-sm font-medium",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
