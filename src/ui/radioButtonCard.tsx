import classNames from "classnames";
import { Label } from "src/ui/label";
import { RadioGroupCircleItem } from "src/ui/radio-group";
import { Text } from "src/ui/text";
import { useRadioGroupContext } from "src/ui/RadioGroupContext/RadioGroupContext";

interface RadioItemProps {
  value: any;
  className?: string;
  label: string;
  id?: string;
}

export const RadioButtonCard: React.FC<RadioItemProps> = ({
  value,
  label,
  className,
  id,
}) => {
  const { value: selectedRadioValue, disabled } = useRadioGroupContext();

  const cardClassName = classNames(
    "flex items-center gap-2 border shadow-none h-10 pl-4 rounded-xl cursor-pointer",
    {
      "border-primary": selectedRadioValue === value && !disabled,
      "border-grey-lightHover": selectedRadioValue !== value && !disabled,
      "border-stroke cursor-not-allowed": disabled,
    },
    className
  );

  return (
    <Label htmlFor={id} className={cardClassName}>
      <RadioGroupCircleItem
        value={value}
        id={id}
        className={classNames({
          "!bg-primary": selectedRadioValue === value && !disabled,
          "border border-grey-light-hover":
            selectedRadioValue !== value && !disabled,
          "bg-stroke": selectedRadioValue === value && disabled,
          "border border-stroke": selectedRadioValue !== value && disabled,
        })}
      />
      <Text
        size="14"
        className={`w-full ${classNames({
          "font-semibold !text-primary":
            selectedRadioValue === value && !disabled,
          "font-normal text-grey": selectedRadioValue === value && !disabled,
        })}`}
      >
        {label}
      </Text>
    </Label>
  );
};
