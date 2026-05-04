export const UpwardArrow = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="currentColor" // Inherit fill color from parent
      xmlns="http://www.w3.org/2000/svg"
      className={className} // Apply Tailwind classes from parent
    >
      <path d="M7.6693 2.77614L1.93158 8.51387L0.98877 7.57107L6.7265 1.83333H1.66932V0.5H9.00263V7.83333H7.6693V2.77614Z" />
    </svg>
  );
};
