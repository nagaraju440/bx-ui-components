import React from "react";

function Important({ width = "14", height = "14", fill = "#7677F4" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Filled circle */}
      <circle cx="7" cy="7" r="7" fill={fill} />

      {/* Dot of i */}
      <circle cx="7" cy="4.2" r="0.7" fill="#ffffff" />

      {/* Line of i */}
      <rect x="6.4" y="6" width="1.2" height="4" rx="0.6" fill="#ffffff" />
    </svg>
  );
}

export default Important;
