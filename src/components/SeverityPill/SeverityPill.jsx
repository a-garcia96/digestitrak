import React from "react";

const SeverityPill = ({ severity, children }) => {
  if (severity == "severe") {
    return (
      <div className="rounded-full w-fit bg-red-100 px-2 py-1 text-red-500 font-medium">
        {children}
      </div>
    );
  } else if (severity == "moderate") {
    return (
      <div className="rounded-full w-fit bg-yellow-100 px-2 py-1 text-yellow-500 font-medium">
        {children}
      </div>
    );
  } else {
    return (
      <div className="rounded-full w-fit bg-green-100 px-2 py-1 text-green-500 font-medium">
        {children}
      </div>
    );
  }
};

export default SeverityPill;
