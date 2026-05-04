import * as React from "react";
import { cn } from "src/lib/utils";
import { ccn } from "src/utility/CommonComponentsUtil";
import { staticDataStore } from "src/zustandStore/StaticDataStore";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  extendedType?: "number-input" | "decimal-input" | "amount-input";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, extendedType, error, ...props }, ref) => {
    const { staticData } = staticDataStore();
    const delimiter = staticData?.countryConfigData?.decimal_delimiter || ".";

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>
      handleKeyDownExternal(e, props, delimiter, extendedType);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
      handleBlurExternal(e, props, delimiter, extendedType);

    /**
     * If the extendedType is not mentioned we dont need to change format of input value
     * If the extendedType is mentioned then we need to change the input
     * based on the extendedType
     * We have to replace delimeter with country config delimeter
     */
    const inputValue =
      (extendedType === "amount-input" || extendedType === "decimal-input") &&
      props.value
        ? (typeof props.value === "number"
            ? JSON.stringify(props.value)
            : (props.value as string)
          )?.replace(".", delimiter)
        : props.value;

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full bg-background px-3 py-2 font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-[400] placeholder:text-[#999999] disabled:cursor-not-allowed data-[no-outline=true]:focus:outline-none",
          ccn(error, props?.value),
          className
        )}
        ref={ref}
        {...props}
        value={inputValue}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };

const handleBlurExternal = (
  e: React.FocusEvent<HTMLInputElement>,
  props: InputProps,
  delimiter: string,
  extendedType?: string
) => {
  if (extendedType === "amount-input") {
    // we need to convert the delimiter to dot for converting the entered input from string to number.
    const value = e.target.value?.replace(delimiter, ".");
    const parsedValue = parseFloat(value);
    if (value === "") {
      e.preventDefault();
    } else if (value === ".") {
      e.target.value = "0.00";
      if (props.onChange) {
        props.onChange(e);
      }
    } else {
      const formattedValue = isNaN(parsedValue) ? "" : parsedValue.toFixed(2);
      e.target.value = formattedValue;
      if (props.onChange) {
        props.onChange(e);
      }
    }
  }
  if (props.onBlur) {
    props.onBlur(e);
  }
};

const handleKeyDownExternal = (
  e: React.KeyboardEvent<HTMLInputElement>,
  props: InputProps,
  delimiter: string,
  extendedType?: string
) => {
  if (
    extendedType === "amount-input" ||
    extendedType === "decimal-input" ||
    extendedType === "number-input"
  ) {
    // Define a list of special keys that should be allowed
    const allowedSpecialKeys = [
      "a",
      "x",
      "c",
      "v",
      "z",
      "y",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Enter",
      "Escape",
      "Tab",
      "Backspace",
      "Delete",
      "Home",
      "End",
      "PageUp",
      "PageDown",
    ];

    // If any modifier keys (Ctrl, Alt, Shift, Meta) are pressed
    // allow functionality for common key combinations (e.g., copy, paste, navigation)
    if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
      if (allowedSpecialKeys.includes(e.key)) return;
    }

    // Check if the key pressed is a printable character (e.g., alphabets, numbers, special characters)
    // or a non-printable key (e.g., Backspace, Enter, Shift, etc.)
    if (e.key.length === 1) {
      const { value } = e.target as HTMLInputElement;

      if (extendedType === "number-input") {
        // For "number-input", allow only numeric characters
        if (!/^[0-9]$/.test(e.key)) e.preventDefault();
      } else if (["decimal-input", "amount-input"].includes(extendedType)) {
        // For "decimal-input" or "amount-input", allow numeric characters and the delimiter
        const allowedChars = new RegExp(`^[0-9${delimiter}]$`);
        if (
          !allowedChars.test(e.key) ||
          (e.key === delimiter && value.includes(delimiter))
        ) {
          e.preventDefault(); // Prevent the default action if the key does not match the allowed pattern
        }
      }
    }
  }
  if (props.onKeyDown) props.onKeyDown(e);
};
