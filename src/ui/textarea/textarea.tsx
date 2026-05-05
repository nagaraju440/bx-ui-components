import * as React from "react";

import { cn } from "src/lib/utils";
import { ccn } from "src/utility/CommonComponentsUtil";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps & { error?: boolean }
>(({ className, error, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:font-[400] placeholder:text-[#999999] disabled:cursor-not-allowed disabled:opacity-50",
        error ? "!border-[#FF6D6D]" : "",
        className,
        ccn(error, props.value)
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
