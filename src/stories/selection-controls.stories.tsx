import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "src/ui/command";
import CustomSelect from "src/ui/custom-select";
import { MultiSelect } from "src/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectInput,
  SelectItem,
  SelectItems,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "src/ui/select";
import {
  CommandShortcut as MVPCommandShortcut,
  MVPSelect,
  MVPSelectContent,
  MVPSelectInput,
  MVPSelectItem,
  MVPSelectItems,
  MVPSelectLoading,
  MVPSelectSeparator,
  MVPSelectTrigger,
} from "src/ui/SelectCommand";

const meta: Meta = {
  title: "Common Components/Selection",
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj;

const options = [
  { value: "happiness", label: "Happiness Program" },
  { value: "meditation", label: "Sahaj Samadhi Meditation" },
  { value: "silence", label: "Art of Silence" },
  { value: "yoga", label: "Sri Sri Yoga" },
  { value: "intuition", label: "Intuition Process" },
  { value: "dsn", label: "DSN" },
];

export const SelectComponents: Story = {
  render: () => {
    const [value, setValue] = useState("happiness");

    return (
      <div className="w-[360px] space-y-4">
        <Select value={value} onValueChange={(next) => setValue(next as string)}>
          <SelectTrigger>
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            <SelectScrollUpButton />
            <SelectItems>
              <SelectGroup>
                <SelectLabel>Courses</SelectLabel>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectSeparator />
            </SelectItems>
            <SelectScrollDownButton />
          </SelectContent>
        </Select>

        <SelectInput placeholder="SelectInput helper" />
      </div>
    );
  },
};

export const CommandComponents: Story = {
  render: () => (
    <Command className="w-[420px] rounded-xl border bg-white">
      <CommandInput placeholder="Search command" />
      <CommandList>
        <CommandEmpty>No command found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>Open participant</CommandItem>
          <CommandItem>
            Export report
            <CommandShortcut>Ctrl E</CommandShortcut>
          </CommandItem>
          <CommandSeparator />
          <CommandItem disabled>Archive course</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const MVPSelectComponents: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="w-[420px] space-y-4">
        <MVPSelect
          value={value}
          onChange={(next) => setValue(next)}
          defaultOptions={options}
        >
          <MVPSelectTrigger placeholder="Select course" />
          <MVPSelectContent>
            <MVPSelectInput />
            <MVPSelectItems>
              {options.map((option) => (
                <MVPSelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </MVPSelectItem>
              ))}
            </MVPSelectItems>
            <MVPSelectSeparator />
          </MVPSelectContent>
        </MVPSelect>

        <div className="rounded-lg border bg-white p-3 text-sm">
          <MVPSelectLoading>Loading options...</MVPSelectLoading>
          <MVPCommandShortcut className="ml-3">Ctrl K</MVPCommandShortcut>
        </div>
      </div>
    );
  },
};

export const MultiSelectAndCustomSelect: Story = {
  render: () => {
    const [multiValue, setMultiValue] = useState(["happiness", "yoga"]);
    const [singleValue, setSingleValue] = useState("meditation");

    return (
      <div className="w-[460px] space-y-6">
        <MultiSelect
          data={options}
          value={multiValue}
          onChange={setMultiValue}
          onSearch={() => {}}
          onBottomReached={() => {}}
          placeholder="Select courses"
          variant="standard"
          name="storybook"
        />

        <CustomSelect
          data={options}
          value={singleValue}
          onChange={(next: any) => setSingleValue(next)}
          onSearch={() => {}}
          onBottomReached={() => {}}
          placeholder="Select one course"
        />
      </div>
    );
  },
};
