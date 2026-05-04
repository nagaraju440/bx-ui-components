import React from "react";

interface RefreshIconProps {
  width?: number | string | undefined;  
  height?: number | string | undefined;
}

const RefreshIcon: React.FC<RefreshIconProps> = ({width, height}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 39 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.532715"
        width="38"
        height="39"
        rx="11.5"
        fill="white"
      />
      <rect
        x="0.5"
        y="0.532715"
        width="38"
        height="39"
        rx="11.5"
        stroke="currentColor"
      />
      <path
        d="M29.5 20.0327C29.5 25.5555 25.0229 30.0327 19.5 30.0327C13.9772 30.0327 9.5 25.5555 9.5 20.0327C9.5 14.5099 13.9772 10.0327 19.5 10.0327V12.0327C15.0817 12.0327 11.5 15.6144 11.5 20.0327C11.5 24.451 15.0817 28.0327 19.5 28.0327C23.9183 28.0327 27.5 24.451 27.5 20.0327C27.5 17.2829 26.1127 14.8572 23.9998 13.4172L24 16.0327H22V10.0327H28V12.0327L25.5008 12.0326C27.9293 13.8571 29.5 16.7614 29.5 20.0327Z"
        fill="black"
      />
    </svg>
  );
};

export default RefreshIcon;
