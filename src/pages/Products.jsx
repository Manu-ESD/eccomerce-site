import { useEffect, useMemo } from "react";
import { ShimmerSimpleGallery } from "react-shimmer-effects-18";
import { commonSortOptions } from "../utility/constants";
import { getDataFromFirebase } from "../utility/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentCategoryProducts,
  updateProductsData,
} from "../features/productsSlice";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import FilterSelect from "../components/FilterSelect";
import PageBreadCrumb from "../components/PageBreadCrumb";

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productsData = useSelector((state) => state.productsData.value);
  const currentCategoryProducts = useSelector(
    (state) => state.currentCategoryProducts.value
  );
  const filterPillsData = useSelector((state) => state.filterPillsData.value);
  const filteredProducts = useSelector((state) => state.filteredProducts.value);
  const productsToShow = useMemo(() => {
    return filterPillsData.length ? filteredProducts : currentCategoryProducts;
  }, [currentCategoryProducts, filterPillsData, filteredProducts]);
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
            <PageBreadCrumb />
            <div>
              <FilterSelect
                filterName="Sort by Price"
                filterOptions={commonSortOptions}
                sortingType="price"
                products={productsToShow}
              />
              <FilterSelect
                filterName="Sort by Rating"
                filterOptions={commonSortOptions}
                sortingType="rating"
                products={productsToShow}
              />
            </div>
          </div>

          <div className="flex flex-row items-center flex-wrap gap-6 max-w-fit">
            {productsToShow?.map((item) => (
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
