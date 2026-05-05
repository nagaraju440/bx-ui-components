import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "src/lib/utils";

interface LabelProps {
  name: string;
  required?: boolean;
}
const textVariants = cva("font-sans text-[#333333]", {
  variants: {
    size: {
      "10": "text-xxs leading-xxs",
      "12": "text-xs leading-xs",
      "14": "text-sm leading-sm",
      "16": "text-base leading-base",
      "18": "text-lg leading-lg",
      "24": "text-xl leading-xl",
    },
    weight: {
      "400": "font-normal",
      "600": "font-semibold",
      "700": "font-bold",
      "500": "font-medium",
    },
  },
  defaultVariants: {
    size: "16",
    weight: "400",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <Comp
        className={cn(textVariants({ size, weight, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };
