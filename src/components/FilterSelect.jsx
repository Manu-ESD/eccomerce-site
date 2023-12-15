import { useState } from "react";
import { sortProducts, titleCase } from "../utility/utils";

const FilterSelect = ({ filterName, filterOptions, products, sortingType }) => {
  const [selectedValue, setSelectedValue] = useState("none");
  const handleSelection = (event) => {
    setSelectedValue(event.target.value);
    sortProducts(event.target.value, products, sortingType);
  };

  return (
    <select
      className="select select-xs select-bordered mx-2 my-3"
      onChange={handleSelection}
      value={selectedValue}
    >
      <option disabled value={"none"}>
        {filterName}
      </option>
      {filterOptions.map((item, index) => {
        return (
          <option key={`item-${index}`} onSelect={handleSelection} value={item}>
            {`Sort by: ${titleCase(sortingType)}: ${item}`}
          </option>
        );
      })}
    </select>
  );
};

export default FilterSelect;
