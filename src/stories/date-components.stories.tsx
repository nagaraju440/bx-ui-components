import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar as CalendarBase } from "src/ui/calendar";
import { DateCalendar } from "src/ui/DateCalendar";
import { DateField } from "src/ui/DateField";
import { DateOfBirthSelector } from "src/ui/DateOfBirthSelector";
import { DateRangePicker } from "src/ui/DateRangePicker";
import { Calendar as DobCalendar, YearsAndMonthsDropdown } from "src/ui/DobCalendar";

const meta: Meta = {
  title: "Common Components/Date Components",
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj;

export const CalendarVariants: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 4, 8));

    return (
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-3">
          <CalendarBase mode="single" selected={date} onSelect={setDate} />
        </div>
        <div className="rounded-lg border bg-white p-3">
          <DateCalendar
            mode="single"
            selected={date}
            onSelect={setDate}
            count={4}
            name="storybook-date-calendar"
          />
        </div>
      </div>
    );
  },
};

export const DateRangePickerAndDateField: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 4, 8));
    const [range, setRange] = useState<any>({
      from: new Date(2026, 4, 8),
      to: new Date(2026, 4, 10),
    });

    return (
      <div className="w-[760px] space-y-6">
        <DateField
          value={date}
          onChange={setDate}
          placeholder="Pick a date"
          name="storybook-date-field"
        />
        <DateRangePicker
          mode="range"
          selected={range}
          onSelect={setRange}
          captionLayout="dropdown-buttons"
          fromYear={2024}
          toYear={2028}
          name="storybook-range"
        />
      </div>
    );
  },
};

export const DateOfBirthAndDobCalendar: Story = {
  render: () => {
    const [dob, setDob] = useState("1992/05/08");

    return (
      <div className="grid w-[760px] gap-6 md:grid-cols-2">
        <DateOfBirthSelector
          value={dob}
          onChange={setDob}
          fromDate={new Date(1900, 0, 1)}
          toDate={new Date()}
        />
        <div className="rounded-lg border bg-white p-3">
          <DobCalendar
            mode="single"
            selected={dob ? new Date(dob) : undefined}
            onSelect={(next) => setDob(next ? "1992/05/08" : "")}
            captionLayout="dropdown-buttons"
            fromYear={1900}
            toYear={2026}
          />
          <div className="mt-3 rounded border p-2 text-xs">
            YearsAndMonthsDropdown is used internally by DobCalendar dropdown
            captions.
          </div>
        </div>
      </div>
    );
  },
};

export const YearsAndMonthsDropdownReference: Story = {
  render: () => (
    <div className="rounded-lg border bg-white p-4 text-sm">
      <p>
        <code>YearsAndMonthsDropdown</code> is exported for the custom DOB
        calendar caption and is exercised in the DOB calendar story above.
      </p>
    </div>
  ),
};
