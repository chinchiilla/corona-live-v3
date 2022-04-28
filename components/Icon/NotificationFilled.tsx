import React from "react";

function IconTemplate() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 100 125"
      x="0px"
      y="0px"
      strokeWidth="1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M84.14,69.45C77,61.2,82.08,50.13,78.7,32.13c-2.3-12.27-14.78-16.52-22.51-18V11.68a6.19,6.19,0,1,0-12.38,0v2.46c-7.73,1.47-20.21,5.72-22.51,18-3.38,18,1.69,29.07-5.44,37.33s-4.31,9.19-4.31,9.19h76.9S91.27,77.71,84.14,69.45Z"
      />
      <path
        style={{ transform: "translateY(6px)" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M61,82.08H37.24v.55A11.92,11.92,0,0,0,49.13,94.51h0A11.92,11.92,0,0,0,61,82.62v-.55Z"
      />
    </svg>
  );
}

export default React.memo(IconTemplate);
