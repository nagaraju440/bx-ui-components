import React from "react";

interface CustomSVGProps {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

const Sent: React.FC<CustomSVGProps> = ({
  width = 17,
  height = 15,
  fill,
  className,
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10014_413)">
        <path d="M18.1056 2.4643L13.5612 18.3695C13.4355 18.8099 13.165 18.8299 12.9636 18.4274L9.16671 10.8335L1.60246 7.80784C1.17773 7.63795 1.18298 7.3837 1.63083 7.23442L17.536 1.93269C17.9764 1.78589 18.229 2.0324 18.1056 2.4643ZM15.8628 4.24724L5.67688 7.64256L10.374 9.52144L12.908 14.5892L15.8628 4.24724Z" />
      </g>
      <defs>
        <clipPath id="clip0_10014_413">
          <rect width="20" height="20" fill={fill} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Sent;
