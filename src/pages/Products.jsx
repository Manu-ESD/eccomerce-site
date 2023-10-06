import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ShimmerSimpleGallery } from "react-shimmer-effects-18";
import Layout from "../components/Layout";
import FilterSelect from "../components/FilterSelect";
import { commonSortOptions } from "../utility/constants";
import { getProducts, getDataFromFirebase } from "../utility/utils";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getDataFromFirebase("products")
      .then((data) => {
        setProductsData(data);
        setFilteredProducts(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function sortByPrice(sortmethod) {
    if (sortmethod === commonSortOptions[0]) {
      const values = [...filteredProducts].sort((p1, p2) =>
        p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
      );
      setFilteredProducts(values);
    } else if (sortmethod === commonSortOptions[1]) {
      const values = [...filteredProducts].sort((p1, p2) =>
        p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0
      );
      setFilteredProducts(values);
    } else {
      console.log("sortByPrice Method Not Found");
    }
  }

  function sortByRating(sortmethod) {
    if (sortmethod === commonSortOptions[0]) {
      const values = [...filteredProducts].sort((r1, r2) =>
        r1.rating.rate < r2.rating.rate
          ? 1
          : r1.rating.rate > r2.rating.rate
          ? -1
          : 0
      );
      setFilteredProducts(values);
    } else if (sortmethod === commonSortOptions[1]) {
      const values = [...filteredProducts].sort((r1, r2) =>
        r1.rating.rate > r2.rating.rate
          ? 1
          : r1.rating.rate < r2.rating.rate
          ? -1
          : 0
      );
      setFilteredProducts(values);
    } else {
      console.log("sortByPrice Method Not Found");
    }
  }

  return (
    <Layout>
      {productsData.length === 0 ? (
        <div className=" min-h-screen w-[75vw]">
          <ShimmerSimpleGallery card imageHeight={300} caption />
        </div>
      ) : (
        <div className="min-h-screen">
          <div className="flex flex-row-reverse">
            <FilterSelect
              filterName="Sort by Price"
              filterOptions={commonSortOptions}
              filterFunction={sortByPrice}
            />
            <FilterSelect
              filterName="Sort by Rating"
              filterOptions={commonSortOptions}
              filterFunction={sortByRating}
            />
          </div>

          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-row flex-wrap gap-6 max-w-fit">
              {filteredProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  imgLink={item.image}
                  title={item.title}
                  description={item.description}
                  rating={item.rating.rate}
                  price={item.price}
                  product={item}
                  cardType="add"
                ></ProductCard>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Products;
