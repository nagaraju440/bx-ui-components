import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap  cursor-pointer disabled:cursor-not-allowed focus:outline-keyboardTab",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-white border border-primary text-primary ",
        disable: "bg-grey2 text-white",
        success: "bg-green text-white",
        danger: "bg-red text-white",
        warning: "bg-yellow text-white",
        link: "bg-white text-primary",

        // TODO: need to remove after implementing the new design
        default: "bg-primary text-primary-foreground ",
        outline: "border border-input bg-white ",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        plain: "!px-0 !py-1 text-primary",
      },
      size: {
        default: "h-10 px-6 py-3 rounded-xl text-base font-medium",
        sm: "h-9 px-6 py-2 rounded-xl text-base font-medium",
        lg: "h-11 px-6 py-3 rounded-xl text-base font-medium",
        xl: "h-12 px-6 py-3 rounded-xl text-base font-medium",
        xs: "px-2 py-2 rounded-xl text-base font-medium",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean; // New prop for loading state
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      type = "button", // Default type set to "button"
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          (isLoading || props.disabled) && "opacity-50"
        )}
        ref={ref}
        disabled={isLoading || props.disabled} // Disable button when loading
        type={type} // Apply the type prop
        {...props}
      >
        {isLoading ? (
          <div className="loader-small">
            <div className="loader"></div>
          </div>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";
Button.displayName = "Button";

export { Button, buttonVariants };
