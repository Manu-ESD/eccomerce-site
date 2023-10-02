import React, { useEffect } from "react";
import { useState } from "react";

const FilterSelect = ({ filterName, filteroptions, filterfunctions }) => {
  //TODO: ({filterName,options,filterFunction})
  // TODO: [1] sort by pricing [2] sort by rating

  const [seletedValue, setSelectedValue] = useState("");

  const handleSelection = (event) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value);
  };

  const filterReset = () => {
    setSelectedValue("");
  };

  useEffect(() => {
    if (seletedValue.length > 1) {
      const indexvalue = filteroptions.indexOf(seletedValue);
      filterfunctions[indexvalue]();
    }
  }, [seletedValue]);

  return (
    <select
      className="select select-bordered w-full max-w-xs"
      onChange={handleSelection}
      value={seletedValue}
    >
      <option disabled selected value={""}>
        {filterName}
      </option>
      {filteroptions.map((item) => {
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
