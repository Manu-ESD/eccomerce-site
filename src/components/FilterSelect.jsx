import React from "react";

const FilterSelect = () => {
    //TODO: ({filterName,options,filterFunction})
    // TODO: [1] sort by pricing [2] sort by rating
  return (
    <select className="select select-bordered w-full max-w-xs">
      <option disabled selected>
        Who shot first?
      </option>
      <option>Han Solo</option>
      <option>Greedo</option>
    </select>
  );
};

export default FilterSelect;
