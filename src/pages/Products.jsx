import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ShimmerSimpleGallery } from "react-shimmer-effects-18";
import Layout from "../components/Layout";
import FilterSelect from "../components/FilterSelect";
import { commonSortOptions } from "../utility/constants";

const Products = () => {
  const [Products, setProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([]);

  const getProducts = async () => {
    const data = await fetch("https://fakestoreapi.com/products/");
    const json = await data.json();
    setProducts(json);
    setFilteredProducts(json);
  };

  useEffect(() => {
    getProducts();
  }, []);

  function sortByPriceHighToLow() {
    const values = [...FilteredProducts].sort((p1, p2) =>
      p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
    );
    setFilteredProducts(values);
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
  }

  function sortByPriceLowToHigh() {
    const values = [...FilteredProducts].sort((p1, p2) =>
      p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0
    );
    setFilteredProducts(values);
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
  }

  return (
    <Layout>
      {Products.length === 0 ? (
        <>
          <ShimmerSimpleGallery card imageHeight={300} caption />
        </>
      ) : (
        <div className="min-h-screen">
          <div className="flex flex-row-reverse">
            <FilterSelect
              filterName="Sort by Price"
              filteroptions={commonSortOptions}
              filterfunctions={[sortByPriceHighToLow, sortByPriceLowToHigh]}
            />
            <FilterSelect
              filterName="Sort by Rating"
              filteroptions={commonSortOptions}
              filterfunctions={[sortByRatingHighToLow, sortByRatingLowToHigh]}
            />
          </div>
          <div className="flex flex-row flex-wrap gap-4">
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
