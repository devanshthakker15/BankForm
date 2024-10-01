import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>{title}</h5>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
