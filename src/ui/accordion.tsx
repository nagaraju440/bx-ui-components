"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "src/lib/utils";

// Define variants for each part of the accordion
const itemVariants = cva("border-b bg-white", {
  variants: {
    variant: {
      default: "border-b",
      secondary: "border border-grey-light-hover bg-white rounded-[24px] px-5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const triggerVariants = cva(
  "flex py-4 w-full items-center justify-between text-lg font-semibold transition-all outline-keyboardTab",
  {
    variants: {
      variant: {
        default: "text-grey",
        secondary: "text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const contentVariants = cva("text-sm transition-all", {
  variants: {
    variant: {
      default: "",
      secondary: "text-grey border-t pt-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// Create a context to pass the variant prop
const AccordionVariantContext = React.createContext<"default" | "secondary">(
  "default"
);

// Define custom props, including the `variant` prop
interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  variant?: "default" | "secondary";
}

const Accordion = AccordionPrimitive.Root;

// Define the AccordionItem component
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant = "default", ...props }, ref) => (
  <AccordionVariantContext.Provider value={variant}>
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(itemVariants({ variant }), className)}
      {...props}
    />
  </AccordionVariantContext.Provider>
));

AccordionItem.displayName = "AccordionItem";

// Define the AccordionTrigger component
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          triggerVariants({ variant }),
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// Define the AccordionContent component
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        contentVariants({ variant }),
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// Export all components for external use
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
