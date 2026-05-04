export const TransferInfoIcon = ({ fill = "#E6470E" }: { fill?: string }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 4.27734H7.00681V4.28415H7V4.27734Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7 7V9.72222"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
