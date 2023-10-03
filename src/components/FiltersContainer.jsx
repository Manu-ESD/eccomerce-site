import React from "react";
import FilterAccordion from "./FilterAccordion";

const FiltersContainer = () => {
  return (
    <>
      <div className="w-[75vw] h-[50vw] bg-base-100 shadow-xl m-3 rounded-none">
        <div className="card">
        <div className="collapse-title text-lg font-bold border">Filters</div>
        <FilterAccordion title="PRICE">
            Test
          </FilterAccordion>
          <FilterAccordion title="CUSTOMER RATINGS">
            Test
          </FilterAccordion>
          <FilterAccordion title="BRAND">
            Test
          </FilterAccordion>
          <FilterAccordion title="TYPE">
            Test
          </FilterAccordion>
        </div>
      </div>
    </>
  );
};

export default FiltersContainer;
