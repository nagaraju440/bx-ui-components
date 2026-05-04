import CalenderIcon from "@public/assets/CalenderIcon";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { cn } from "src/lib/utils";
import { Button, buttonVariants } from "src/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "src/ui/popover";
import dayjs from "dayjs";
import { DateRangePicker } from "./DateRangePicker";
interface DateFieldProps {
  /**
   * The selected date to be displayed in the calendar.
   */
  value?: Date;
  /**
   * Function to set the selected date.
   * @param value - The date to set as the selected date.
   */
  onChange: (value: Date) => void;

  /**
   * Name attribute for the DateField component
   */
  name?: string;

  /**
   * Placeholder text to display when no date is selected.
   */
  placeholder?: string;
  /**
   * className to change stylings of the calendar.
   */
  className?: string;

  // Enable or disable the date picker

  disabled?: boolean;

  fromDate?: Date;

  toDate?: Date;
  /**
   * This is to define the format to be displayed in input when we select the date
   */
  formatType?: string;
  /**
   * If error is true, then make border will be red
   */
  error?: boolean;

  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;

  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
}
export const DateField = ({
  value,
  onChange,
  placeholder,
  className,
  disabled,
  fromDate,
  toDate,
  error = false,
  formatType = "DD MMM, YYYY",
  onBlur,
  onFocus,
  name,
}: DateFieldProps) => {
  // State to manage the visibility of the popover
  const [isOpen, setIsOpen] = useState(false);

  const fromYear = fromDate ? fromDate.getFullYear() : 1900;
  const toYear = toDate ? toDate.getFullYear() : 2030;

  /**
   * Function to handle the selected date
   */
  const handleSelectDate = (value: any) => {
    if (value) onChange(value);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `flex flex-row justify-start gap-2 px-3`,
            error && "border border-red",
            className,
            value ? "text-grey" : "font-normal text-grey2"
          )}
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled ? true : false}
          onBlur={onBlur}
          onFocus={onFocus}
          data-testid={`date-field-button-${name}`}
        >
          <CalenderIcon color="#666666" className="mr-2 h-4 w-4" />

          {/* Render the formatted date if date is selected, otherwise render the placeholder */}
          {value ? (
            <div className="capitalize">
              {value && dayjs(value).format(formatType)}
            </div>
          ) : (
            <span>{placeholder ? placeholder : "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] rounded-3xl p-0">
        <DateRangePicker
          mode="single"
          selected={value}
          onSelect={(val: any) => {
            handleSelectDate(val);
          }}
          captionLayout="dropdown-buttons"
          fromYear={fromYear}
          toYear={toYear}
          fromDate={fromDate}
          toDate={toDate}
          yearMonthDropdownClassName="!w-[80px]"
          classNames={{
            month: "border-none border border-stroke min-w-[320px] rounded-3xl",
            cell: "h-10 w-10 text-center rounded-full text-xs p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-primary [&:has([aria-selected])]:bg-primary-light first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 flex justify-center items-center",
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "h-10 w-10 text-xs px-2 !rounded-full text-grey font-semibold aria-selected:opacity-100"
            ),
            head_cell: "text-grey2 rounded-md w-10 font-normal text-xs",
            head_row:
              "flex capitalize text-grey2 items-center justify-center text-xs h-[44px]",
            nav_button: cn(
              buttonVariants({ variant: "outline" }),
              "h-8 w-8 p-2 border border-grey-light-hover"
            ),
            table: "w-full border-collapse space-y-2 min-h-[250px]",
          }}
          disabled={(date) => {
            const isAfterDisableDate = toDate ? date > toDate : false;
            const isBeforeEnableDate = fromDate ? date < fromDate : false;
            return isAfterDisableDate || isBeforeEnableDate;
          }}
          defaultMonth={value}
          name={name}
        />
      </PopoverContent>
    </Popover>
  );
};
