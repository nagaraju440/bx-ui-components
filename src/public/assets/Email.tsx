import React from "react";

interface CustomSVGProps {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

const Email: React.FC<CustomSVGProps> = ({
  width = 17,
  height = 15,
  className,
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.49935 2.5H17.4993C17.9596 2.5 18.3327 2.8731 18.3327 3.33333V16.6667C18.3327 17.1269 17.9596 17.5 17.4993 17.5H2.49935C2.03912 17.5 1.66602 17.1269 1.66602 16.6667V3.33333C1.66602 2.8731 2.03912 2.5 2.49935 2.5ZM16.666 6.0316L10.0592 11.9483L3.33268 6.01328V15.8333H16.666V6.0316ZM3.7589 4.16667L10.0509 9.71833L16.2502 4.16667H3.7589Z" />
    </svg>
  );
};

export default Email;
