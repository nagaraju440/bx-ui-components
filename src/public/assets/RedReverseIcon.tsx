import React from "react";

interface IconComponentPropType {
  width?: number;
  height?: number;
  circleFill?: string;
  pathFill?: string;
}

const RedReverseIcon = ({
  width = 24,
  height = 28,
  circleFill = "#EC7357",
  pathFill = "white",
}: IconComponentPropType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={height} fill="white" />
      <circle
        cx={width / 2}
        cy={height / 2}
        r={Math.min(width, height) / 2}
        fill={circleFill}
      />
      <path
        d="M12 12.0556H9.6006L9.6 19.3889H8.4V12.0556H6L9 9L12 12.0556ZM18 16.9444L15 20L12 16.9444H14.4V9.61111H15.6V16.9444H18Z"
        fill={pathFill}
      />
    </svg>
  );
};

export default RedReverseIcon;
