import React from "react";
function ArrowLeftIcon({ arrowFill, rectFill }: any) {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.5" width="32" height="32" rx="4" fill={rectFill} />
      <path
        d="M14.7178 16.8651L21.224 23.3711L19.3651 25.23L11 16.8651L19.3651 8.5L21.224 10.3589L14.7178 16.8651Z"
        fill={arrowFill}
      />
    </svg>
  );
}

export default ArrowLeftIcon;
