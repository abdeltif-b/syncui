import React from "react";

export const State = (state, color, ...props) => {
  const className = props[0]?.className ? `text-${color}-600 ${props[0].className}` : `text-${color}-600`;

  return (
    <div
      className={`flex align-items-center justify-content-center bg-${color}-100 border-1 border-${color}-600 border-round-xs`}
    >
      <div className={className}>{state}</div>
    </div>
  );
};
