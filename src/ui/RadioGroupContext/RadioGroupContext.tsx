import { createContext, useContext } from "react";

// Define the type of the context value
interface RadioGroupContextType {
  value?: string;
  disabled?: boolean;
}

// Create the context
export const RadioGroupContext = createContext<
  RadioGroupContextType | undefined
>(undefined);

// Custom hook to use the context
export const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  if (context === undefined) {
    throw new Error("useRadioGroupContext must be used within a MyProvider");
  }
  return context;
};
