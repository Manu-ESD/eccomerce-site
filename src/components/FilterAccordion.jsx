import React from "react";

const FilterAccordion = ({title,children}) => {
  return (
    <div className="collapse collapse-arrow border rounded-none">
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-sm font-bold">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

export default FilterAccordion;
