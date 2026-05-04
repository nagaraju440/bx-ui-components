interface RightArrowProps {
  color?: string;
}

function RightArrow({ color = "#000000" }: RightArrowProps) {
  return (
    <div>
      <svg
        fill="none"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        id="right-arrow"
        xmlns="http://www.w3.org/2000/svg"
        className="icon line"
      >
        <path
          d="M3,12H21m-3,3,3-3L18,9"
          style={{
            stroke: color,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 1.5,
          }}
        />
      </svg>
    </div>
  );
}

export { RightArrow };
