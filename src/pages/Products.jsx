import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ShimmerSimpleGallery } from "react-shimmer-effects-18";
import Layout from "../components/Layout";
import FilterSelect from "../components/FilterSelect";
import { commonSortOptions } from "../utility/constants";
import { getProducts } from "../utility/utils";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service";
import { doc, setDoc } from "firebase/firestore";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getAllDocumentsInCollection = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      console.log("Data from DB");
    });
    await setDoc(doc(db, "products", "1"), {
      brand: "Los Angeles",
      category: "CA",
      description: "USA",
    });
  };

  useEffect(() => {
    // TODO: Testing code not final code, have to refactor
    // TODO : manohar check code fom here, need to fetch data from firebase db
    getAllDocumentsInCollection();

    getProducts()
      .then((data) => {
        setProductsData(data);
        setFilteredProducts(data);
      })
      .catch((err) => {
        console.err(err);
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
