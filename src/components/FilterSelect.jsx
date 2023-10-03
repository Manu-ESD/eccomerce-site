import React, { useEffect } from "react";
import { useState } from "react";

const FilterSelect = ({ filterName, filteroptions, filterfunctions }) => {
  const [seletedValue, setSelectedValue] = useState("");

  const handleSelection = (event) => {
    setSelectedValue(event.target.value);
  };
// TODO: Code blunder discuss with Manohar
  useEffect(() => {
    if (seletedValue.length > 1) {
      const indexvalue = filteroptions.indexOf(seletedValue);
      filterfunctions[indexvalue]();
    }
  }, [seletedValue]);

  return (
    <select
      className="select select-xs select-bordered mx-2 my-3"
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
