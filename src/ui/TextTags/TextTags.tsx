import React, { HTMLAttributes } from "react";
import { cn } from "src/lib/utils";
import { Text as MainText } from "src/ui/text";
/** Component for a level 1 heading with a font size of 32px and semibold font weight
 *
 * @param Example  "Happiness Program for Youth"
 */
const MainHeader: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={cn("text-[32px] font-semibold text-[#333333]", className)}
      {...props}
    >
      {children}
    </p>
  );
};

/** Component for a level 2 heading with a font size of 24px and semibold font weight
 *
 * @param Example "Happiness Program for Youth"
 */
const SubHeader: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={cn("text-2xl font-semibold text-[#333333]", className)}
      {...props}
    >
      {children}
    </p>
  );
};

/** Component for a level 3 heading with a font size of 18px and semibold font weight
 *
 * @param Example "Course Information"
 */
const Header: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={cn("text-lg font-semibold text-[#333333]", className)}
      {...props}
    >
      {children}
    </p>
  );
};

/** Component for an item label with a font size of 14px and normal font weight, and light gray color
 *
 * @param Example "Course ID"
 */
const CardLabel: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <MainText size="14" className={cn("text-grey2", className)} {...props}>
      {children}
    </MainText>
  );
};

/** Component for an item value with a font size of 16px and semibold font weight, and dark gray color
 *
 * @param Example "ALTABC740"
 */
const CardValue: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <MainText
      size="16"
      weight="600"
      className={cn("text-grey1", className)}
      {...props}
    >
      {children}
    </MainText>
  );
};

/** Component for a table header with a font size of 14px and semibold font weight,
 * and either the specified color or default dark gray color
 *
 * @param Example "Deposit date"
 * @param OptionalProp color
 */
const TableHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex items-center text-[16px] text-sm font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/** Component for generic text with a font size of 14px, normal font weight, and dark gray color
 *
 * @param Example "Instructions in course accounting form"
 */
const Text: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={cn("text-sm font-normal text-[#333333]", className)}
      {...props}
    >
      {children}
    </p>
  );
};

export {
  CardLabel,
  CardValue,
  Header,
  MainHeader,
  SubHeader,
  TableHeader,
  Text,
};
