"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "src/lib/utils"; // Utility function for className merging

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = (props: TooltipPrimitive.TooltipTriggerProps) => (
  <TooltipPrimitive.Trigger
    {...props}
    type="button"
    className={cn("cursor-auto", props.className)}
  />
);

const TooltipPortal = TooltipPrimitive.Portal;

interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  showArrow?: boolean; // New prop to control arrow visibility
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, showArrow = true, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 max-w-[80vw] overflow-hidden rounded-xl bg-grey-dark-hover p-2.5 !text-xxs font-normal leading-xxs text-white animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  >
    {props.children}
    {showArrow && (
      <TooltipPrimitive.Arrow
        className="text-grey-dark-hover"
        height={15}
        width={17}
      />
    )}
  </TooltipPrimitive.Content>
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipPortal,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
};
