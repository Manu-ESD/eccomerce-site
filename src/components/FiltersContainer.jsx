import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilterPillsData,
  updateFilteredProducts,
} from "../features/productsSlice";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import FilterAccordion from "./FilterAccordion";

//TODO: [1] Add filter pills [x]
//TODO: [2] Remove filter pills function [x]
//TODO: [3] Clear all filter logic [x]
//TODO: [4] Populated filtersData in product page [x]
//TODO: [5] Add all the other pending filters UI and logic

const FiltersContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentCategoryProducts = useSelector(
    (state) => state.currentCategoryProducts.value
  );
  const filterPillsData = useSelector((state) => state.filterPillsData.value);
  const [priceRange, setPriceRange] = useState({});
  // const [maxFilterShow] = useState(4);

  const addFilterPills = (filterAttr, value) => {
    let filterPillData;
    if (filterAttr === "price") {
      const values = value.split("-");
      filterPillData = `Price ${values[0]}-${values[1]}`;
    }
    dispatch(
      updateFilterPillsData([
        ...filterPillsData.filter(
          (data) => data.split(" ")[0].toLowerCase() !== filterAttr
        ),
        filterPillData,
      ])
    );
  };

  const applyFiltersFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramsArray = urlParams.entries();
    for (const [key, value] of paramsArray) {
      if (key !== "category" && key !== "sub-category") {
        addFilterPills(key, value);
        if (key === "price") {
          const values = value.split("-");
          setPriceRange({
            min: +values[0],
            max: +values[1],
          });
        }
      }
    }
  };

  const addFiltersToUrlParams = (filterAttr, minRange, maxRange) => {
    const currentParams = new URLSearchParams(window.location.search);
    const valueToSet = `${minRange}-${maxRange}`;
    currentParams.set(filterAttr, valueToSet);
    navigate({
      pathname: window.location.pathname,
      search: currentParams.toString(),
    });
    addFilterPills(filterAttr, valueToSet);
  };

  const removeFilters = (filter) => {
    const filterKey = filter.split(" ")[0].toLowerCase();
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete(filterKey);
    navigate({
      pathname: window.location.pathname,
      search: currentParams.toString(),
    });
    dispatch(
      updateFilterPillsData(filterPillsData.filter((data) => data !== filter))
    );
  };

  const clearAllFilters = () => {
    const currentParams = new URLSearchParams(window.location.search);
    filterPillsData.forEach((filter) => {
      const filterKey = filter.split(" ")[0].toLowerCase();
      currentParams.delete(filterKey);
    });
    navigate({
      pathname: window.location.pathname,
      search: currentParams.toString(),
    });
    dispatch(updateFilterPillsData([]));
  };

  const filterProducts = (filterType, filterAttr, minRange, maxRange) => {
    addFiltersToUrlParams(filterAttr, minRange, maxRange);
    let productsToBeFiltered;
    if (filterType === "range") {
      productsToBeFiltered = currentCategoryProducts.filter(
        (products) =>
          products[filterAttr] > minRange && products[filterAttr] < maxRange
      );
    }
    dispatch(updateFilteredProducts(productsToBeFiltered));
  };

  const filterPills = (filter, index) => (
    <div
      className="badge bg-slate-100 hover:bg-slate-100 p-3.5 flex text-xs items-center justify-center"
      key={`${filter}-${index}`}
    >
      <div>{filter}</div>
      <IoClose
        className="inline-block w-4 h-4 stroke-current cursor-pointer ml-1"
        onClick={() => removeFilters(filter)}
      />
    </div>
  );

  useEffect(() => {
    applyFiltersFromUrl();
  }, []);

  return (
    <>
      <div className="min-w-[20vw] h-[50vw] bg-base-100 shadow-xl m-3 rounded-none">
        <div className="card border-1 border-white">
          <div className="flex flex-col justify-between items-center collapse-title text-sm font-bold border px-3">
            <div className="flex justify-between items-center w-full mb-5">
              <div>FILTERS</div>
              {filterPillsData.length ? (
                <button
                  className="bg-transparent text-blue-600"
                  onClick={clearAllFilters}
                >
                  CLEAR ALL
                </button>
              ) : null}
            </div>
            <div className="flex w-full">
              {filterPillsData?.map((pillData, index) =>
                filterPills(pillData, index)
              )}
            </div>
          </div>
          <FilterAccordion title="PRICE">
            <div className="flex justify-between items-center">
              <input
                id="min-price-input"
                className="w-50 p-[5px] text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    max: prev.max,
                    min: e.target.value,
                  }))
                }
              />
              <span className="mx-1">to</span>
              <input
                id="max-price-input"
                className="w-50 p-[5px] text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    min: prev.min,
                    max: e.target.value,
                  }))
                }
              />
              <button
                className="btn btn-sm shadow-md mx-1 bg-white hover:bg-slate-100"
                onClick={() =>
                  filterProducts(
                    "range",
                    "price",
                    priceRange.min,
                    priceRange.max
                  )
                }
              >
                Go
              </button>
            </div>
          </FilterAccordion>
          <FilterAccordion title="CUSTOMER RATINGS">Test</FilterAccordion>
          <FilterAccordion title="BRAND">Test</FilterAccordion>
          <FilterAccordion title="TYPE">Test</FilterAccordion>
        </div>
      </div>
    </>
  );
};

export default FiltersContainer;
