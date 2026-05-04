import React from "react";

interface CustomSVGProps {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

const Draft: React.FC<CustomSVGProps> = ({
  width = 17,
  height = 15,
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
      <path d="M13.9645 2.49713L12.2978 4.1638H4.16667V15.8305H15.8333V7.69934L17.5 6.03268V16.6638C17.5 17.1241 17.1269 17.4972 16.6667 17.4972H3.33333C2.8731 17.4972 2.5 17.1241 2.5 16.6638V3.33047C2.5 2.87023 2.8731 2.49713 3.33333 2.49713H13.9645ZM17.0711 1.74756L18.2496 2.92607L10.5892 10.5864L9.41283 10.5885L9.41075 9.4079L17.0711 1.74756Z" />
    </svg>
  );
};

export default Draft;
