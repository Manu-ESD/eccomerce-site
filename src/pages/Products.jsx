import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ShimmerSimpleGallery } from "react-shimmer-effects-18";
import Layout from "../components/Layout";
import FilterSelect from "../components/FilterSelect";

const Products = () => {
  const [Products, setProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [SearchValue, setSearchValue] = useState([]);

  const optionsForSortByPrice = ["high to low", "low to high"];
  const optionsForSortByRating = ["high to low", "low to high"];

  const getProducts = async () => {
    const data = await fetch("https://fakestoreapi.com/products/");
    const json = await data.json();
    // console.log(json);
    setProducts(json);
    setFilteredProducts(json);
  };

  useEffect(() => {
    getProducts();
  }, []);

  function handleSearch(event) {
    setSearchValue(event.target.value);
  }

  function handleFiltertext() {
    const values = Products.filter((items) => {
      return items.title.includes(SearchValue);
    });
    setFilteredProducts(values);
  }

  function handleReset() {
    setFilteredProducts(Products);
    filterreset();
  }

  function handleAbove4Start() {
    const values = FilteredProducts.filter((items) => {
      return items.rating.rate > 4;
    });
    setFilteredProducts(values);
  }

  function handlePricebelow1000() {
    const values = FilteredProducts.filter((items) => {
      return items.price < 10;
    });
    setFilteredProducts(values);
  }

  function sortByPriceHighToLow() {
    const values = [...FilteredProducts].sort((p1, p2) =>
      p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
    );
    setFilteredProducts(values);
    console.log(values);
    console.log("sortedbyprice");
  }

  function sortByRatingHighToLow() {
    const values = [...FilteredProducts].sort((r1, r2) =>
      r1.rating.rate < r2.rating.rate
        ? 1
        : r1.rating.rate > r2.rating.rate
        ? -1
        : 0
    );
    setFilteredProducts(values);
    console.log(values);
    console.log("sortedbyrating");
  }

  function sortByPriceLowToHigh() {
    const values = [...FilteredProducts].sort((p1, p2) =>
      p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0
    );
    setFilteredProducts(values);
    console.log(values);
    console.log("sortedbyprice");
  }

  function sortByRatingLowToHigh() {
    const values = [...FilteredProducts].sort((r1, r2) =>
      r1.rating.rate > r2.rating.rate
        ? 1
        : r1.rating.rate < r2.rating.rate
        ? -1
        : 0
    );
    setFilteredProducts(values);
    console.log(values);
    console.log("sortedbyrating");
  }

  function filterreset() {}

  // console.log(Products);

  return (
    <Layout>
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <div className="w-[28%] flex justify-between items-center my-3">
          <input
            className="h-[30px] rounded-md px-3 outline-1 border-t-blue-100"
            placeholder="Enter the Product"
            type="text"
            onChange={handleSearch}
          ></input>
          <button
            onClick={handleFiltertext}
            className="px-[0.5em] py-[0.25rem] mr-5 rounded-md bg-[#6555fb] hover:bg-[#1c0e99] hover:text-[#ffffff] active:translate-y-1 "
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="px-[0.5em] py-[0.25rem] rounded-md bg-[#6555fb] hover:bg-[#1c0e99] hover:text-[#ffffff] active:translate-y-1 "
          >
            Reset
          </button>
        </div>

        <div className="flex flex-row items-center justify-around  gap-3 w-[60%]">
          <FilterSelect
            filterName="Sort by Price"
            filteroptions={optionsForSortByPrice}
            filterfunctions={[sortByPriceHighToLow, sortByPriceLowToHigh]}
          />
          <FilterSelect
            filterName="Sort by Rating"
            filteroptions={optionsForSortByRating}
            filterfunctions={[sortByRatingHighToLow, sortByRatingLowToHigh]}
          />
          <button
            onClick={handleAbove4Start}
            className="px-[0.5em] py-[0.25rem] rounded-md bg-[#cfced0] hover:bg-[#a6a6a8] hover:text-[#ffffff] active:translate-y-1 font-thin"
          >
            above 4 start
          </button>
          <button
            onClick={handlePricebelow1000}
            className="px-[0.5em] py-[0.25rem] rounded-md bg-[#cfced0] hover:bg-[#a6a6a8] hover:text-[#ffffff] active:translate-y-1 font-thin"
          >
            Price below 1000
          </button>
        </div>
      </div>
      {Products.length === 0 ? (
        <>
          <ShimmerSimpleGallery card imageHeight={300} caption />
        </>
      ) : (
        <div className=" min-h-screen">
          <hr className="w-[90%] mx-auto mt-[10px] mb-[30px]" />

          <div className="Products flex flex-row flex-wrap gap-4 w-[90%] mx-auto">
            {FilteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                Imglink={item.image}
                Title={item.title}
                Discription={item.description}
                Rating={item.rating.rate}
                Price={item.price}
                Product={item}
                cardType="add"
              ></ProductCard>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Products;
