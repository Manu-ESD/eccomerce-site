import React from "react";
import FilterAccordion from "./FilterAccordion";

const FiltersContainer = () => {
  return (
    <>
      <div className="min-w-[20vw] h-[50vw] bg-base-100 shadow-xl m-3 rounded-none">
        <div className="card border-1 border-white">
          <div className="collapse-title text-sm font-bold border">Filters</div>
          <FilterAccordion title="PRICE">Test</FilterAccordion>
          <FilterAccordion title="CUSTOMER RATINGS">Test</FilterAccordion>
          <FilterAccordion title="BRAND">Test</FilterAccordion>
          <FilterAccordion title="TYPE">Test</FilterAccordion>
        </div>
      </div>
    </>
  );
};

export default FiltersContainer;
