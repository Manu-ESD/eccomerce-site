import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ShimmerSimpleGallery } from "react-shimmer-effects-18";
import Layout from "../components/Layout";
import FilterSelect from "../components/FilterSelect";
import PageBreadCrumb from "../components/PageBreadCrumb";
import { commonSortOptions } from "../utility/constants";
import { getDataFromFirebase } from "../utility/utils";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentCategoryProducts, updateProductsData } from "../features/productsSlice";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productsData = useSelector((state) => state.productsData.value);
  const currentCategoryProducts = useSelector((state) => state.currentCategoryProducts.value);
  // const searchValue = useSelector((state) => state.searchValue);
  const selectedCategory = searchParams.get("category");
  const selectedSubCategory = searchParams.get("sub-category");
  //TODO: search feature
  // useEffect(() => {
  //   dispatch(
  //     updateCurrentCategoryProducts(
  //       productsData.filter((item) => {
  //         return item.title.toLowerCase().includes(searchValue.toLowerCase());
  //       })
  //     )
  //   );
  // }, [dispatch, productsData, searchValue]);

  useEffect(() => {
    dispatch(
      updateCurrentCategoryProducts(
        selectedSubCategory
          ? productsData.filter(
              (item) => item["sub-category"] === selectedSubCategory
            )
          : selectedCategory
          ? productsData.filter((item) => item.category === selectedCategory)
          : productsData
      )
    );
  }, [dispatch, productsData, selectedSubCategory, selectedCategory]);

  useEffect(() => {
    getDataFromFirebase("products")
      .then((data) => {
        dispatch(updateProductsData(data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch]);


  return (
    <Layout>
      {productsData.length === 0 ? (
        <div className="min-h-screen w-[75vw]">
          <ShimmerSimpleGallery card imageHeight={300} caption />
        </div>
      ) : (
        <div className="min-h-screen">
          <div className="page-crumb-container">
          <PageBreadCrumb/>
          <div>
            <FilterSelect
              filterName="Sort by Price"
              filterOptions={commonSortOptions}
              sortingType="price"
              products={currentCategoryProducts}
            />
            <FilterSelect
              filterName="Sort by Rating"
              filterOptions={commonSortOptions}
              sortingType="rating"
              products={currentCategoryProducts}
            />
          </div>
          </div>

          <div className="flex flex-row items-center flex-wrap gap-6 max-w-fit">
          {currentCategoryProducts?.map((item) => (
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
      )}
    </Layout>
  );
};

export default Products;
