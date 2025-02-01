import React from "react";

const Card = ({ children }) => {
  return (
    <section className="shadow-md p-4 rounded bg-white space-y-2">
      {children}
    </section>
  );
};

export default Card;
