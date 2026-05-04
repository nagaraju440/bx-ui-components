import React from "react";

function DotIcon({ color = "#666666" }: any) {
  return (
    <svg
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="-mt-1 inline-block"
    >
      <circle cx="2" cy="2" r="2" fill={color} />
    </svg>
  );
}

export default DotIcon;
