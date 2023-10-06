import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ShimmerSimpleGallery } from "react-shimmer-effects-18";
import Layout from "../components/Layout";
import FilterSelect from "../components/FilterSelect";
import { commonSortOptions } from "../utility/constants";
import { getProducts } from "../utility/utils";
import { db } from "../service";
import { ref,child,get,onValue } from "firebase/database";


const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // const dbRef = ref(db,'products');
    // onValue(dbRef,(snapshot)=>{
    //   const response = snapshot.map(childSnapshot=>{
    //     const keyName = childSnapshot.key;
    //     const data = childSnapshot.val();
    //     return {"key":keyName,"data":data}
    //   });
    // });

    // TODO: Testing code not final code, have to refactor
// TODO : manohar check code fom here, need to fetch data from firebase db

    const dbRef = ref(db, 'products');
  // onValue(dbRef, (snapshot) => {
  // const data = snapshot.val();
  // console.log(data,"data");

  get(dbRef).then((snapshot) => {
    console.log(snapshot.val());
  }).catch((error) => {
    console.error(error);
  });

    getProducts()
      .then((data) => {
        setProductsData(data);
        setFilteredProducts(data);
      })
      .catch((err) => {
        console.err(err);
      });
  }, []);
  // TODO: explain about code blunder to @manohar
  function sortByPriceHighToLow() {
    const values = [...filteredProducts].sort((p1, p2) =>
      p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
    );
    setFilteredProducts(values);
  }

  // TODO: explain about code blunder to @manohar
  function sortByRatingHighToLow() {
    const values = [...filteredProducts].sort((r1, r2) =>
      r1.rating.rate < r2.rating.rate
        ? 1
        : r1.rating.rate > r2.rating.rate
        ? -1
        : 0
    );
    setFilteredProducts(values);
  }

  // TODO: explain about code blunder to @manohar

  function sortByPriceLowToHigh() {
    const values = [...filteredProducts].sort((p1, p2) =>
      p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0
    );
    setFilteredProducts(values);
  }
  // TODO: explain about code blunder to @manohar

  function sortByRatingLowToHigh() {
    const values = [...filteredProducts].sort((r1, r2) =>
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
      {productsData.length === 0 ? (
        <div className=" min-h-screen w-[75vw]">
          <ShimmerSimpleGallery card imageHeight={300} caption />
        </div>
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

          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-row flex-wrap gap-6 max-w-fit">
              {filteredProducts.map((item) => (
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
        </div>
      )}
    </Layout>
  );
};

export default Products;
