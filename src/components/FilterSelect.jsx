import React, { useEffect } from "react";
import { useState } from "react";

const FilterSelect = ({ filterName, filterOptions, filterFunction }) => {
  const [selectedValue, setSelectedValue] = useState("none");

  const handleSelection = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    filterFunction(selectedValue);
  }, [selectedValue]);

  return (
    <select
      className="select select-xs select-bordered mx-2 my-3"
      onChange={handleSelection}
      value={selectedValue}
    >
      <option disabled selected value={"none"}>
        {filterName}
      </option>
      {filterOptions.map((item) => {
        return (
          <option onSelect={handleSelection} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default FilterSelect;
