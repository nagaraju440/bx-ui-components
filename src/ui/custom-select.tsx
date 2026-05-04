import GetScrollTypesAlert from "@components/GetScrollAlert";
import DropdownIcon from "@public/icons/DropdownIcon.svg";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useCommonComponentStrings } from "src/i18n/useCommonComponentStrings";
import { cn } from "src/lib/utils";
import { Button } from "src/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "src/ui/command";
import { Input } from "./input";

// Define the shape of each option
interface Option {
  value: string;
  label: string;
}

// Define the props for the CustomSelect component
interface CustomSelectProps {
  data: any;
  onSearch: (searchQuery: string) => void;
  onBottomReached: () => void;
  onChange: (selectedOption: Option) => void;
  placeholder: string;
  value: any;
  error?: any;
  selectBoxStyles?: any;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  data,
  onSearch,
  onBottomReached,
  onChange,
  placeholder,
  value: propValue,
  error,
  selectBoxStyles,
}: CustomSelectProps) => {
  const t = useCommonComponentStrings();

  // State to manage whether the dropdown is open or closed
  const [open, setOpen] = React.useState<boolean>(false);

  //This is to set the select styles
  const headerStyles = selectBoxStyles?.header || "";
  const dropdownStyles = selectBoxStyles?.dropdown || "";

  const requiredOption = data?.filter(
    (val: { value: any }) => val.value === propValue
  );

  // State to keep track of the currently selected option
  const [selectedValue, setSelectedValue] = useState<Option | null>(
    requiredOption?.[0]
  );

  // Reference to the command div for handling clicks outside the dropdown
  const commandRef = useRef<HTMLDivElement>(null);

  // Update the selected value when the propValue changes
  useEffect(() => {
    if (propValue !== undefined) {
      setSelectedValue(requiredOption?.[0]);
    } else {
      setSelectedValue(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue, data]);

  // Handle the selection of an option
  const handleSelect = (value: any) => {
    onChange(value?.value);
    setSelectedValue(value);
    setOpen(false);
    onSearch("");
  };

  // Add an event listener to close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
      onSearch("");
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Render the CustomSelect component
  return (
    <div className="relative">
      <Command>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          variant="outline"
          role="combobox"
          className={`h-[40px] w-full rounded-xl ${headerStyles} ${error ? "border-[#FF6D6D]" : "border-[#E1E1E1]"}`}
        >
          <div className="flex w-full justify-between text-sm">
            {selectedValue ? (
              <div className="font-semibold text-[#414141]">
                {selectedValue.label}
              </div>
            ) : (
              <div className="font-normal text-[#999999]">{placeholder}</div>
            )}
            <Image
              src={DropdownIcon.src}
              alt={t("customSelect.dropdownIconAlt")}
              width={10}
              height={5}
            />
          </div>
        </Button>
        <div
          className={`absolute top-full z-50 mt-2 w-full ${dropdownStyles}`}
          ref={commandRef}
        >
          {open && (
            <div className="rounded-xl border border-[1px] bg-[white]">
              <Input
                onChange={(e) => onSearch(e.target.value)}
                className="rounded-xl border-none text-[#999999] focus:outline-none"
              />
              <hr className="border-[#D6D7D8]" />
              <CommandEmpty>{t("customSelect.noOptionFound")}</CommandEmpty>
              <GetScrollTypesAlert
                id={"options"}
                onBottom={() => {
                  onBottomReached();
                }}
              >
                <CommandGroup
                  id={"options"}
                  className="scrollbar mr-1 mt-1 max-h-[300px] overflow-y-auto text-[#333333]"
                >
                  {data?.map((option: any, index: number) => {
                    return (
                      <div key={option.value}>
                        <CommandItem
                          value={option}
                          className={cn({
                            "bg-[#7677F4]/30 hover:!bg-[#7677F4]/30":
                              selectedValue &&
                              selectedValue.value === option.value,
                          })}
                          onSelect={() => handleSelect(option)}
                        >
                          {option.label}
                        </CommandItem>
                        {index < data?.length - 1 && (
                          <hr className="border-[#D6D7D8]" />
                        )}
                      </div>
                    );
                  })}
                </CommandGroup>
              </GetScrollTypesAlert>
            </div>
          )}
        </div>
      </Command>
    </div>
  );
};

export default CustomSelect;
