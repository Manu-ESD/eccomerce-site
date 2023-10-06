import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { getProductByID } from "../utility/utils";
import { ShimmerContentBlock } from "react-shimmer-effects-18";
import StarRatingsComponent from "../components/StarRatingsComponent";

// TODO: @manohar On clicking the product card store its data in redux which will be used for populating here

const ProductPage = () => {
  const productViewId = useSelector((state) => state.productViewId.value);
  const [productData, setproductData] = useState({});

  useEffect(() => {
    getProductByID(productViewId)
      .then((data) => {
        setproductData(data);
      })
      .catch((err) => {
        console.err(err);
      });
  }, []);

  return (
    <Layout>
      {Object.keys(productData).length === 0 ? (
        <div className="min-h-screen w-[100vw] flex flex-row justify-center items-start p-10">
          <ShimmerContentBlock
            title
            text
            cta
            thumbnailWidth={450}
            thumbnailHeight={450}
          />
        </div>
      ) : (
        <div className="min-h-screen w-[100vw] flex flex-row justify-center items-start p-10">
          <div className="w-[40%] border-[0] border-blue-950 p-5">
            <img
              className="h-[250px] mx-auto"
              src={productData.image}
              alt="Product image"
            ></img>
            <div className="mt-6 text-center">
              <button className=" bg-blue-950 text-white font-medium px-4 py-3 rounded-lg hover:scale-105">
                ADD TO CART
              </button>
            </div>
          </div>
          <div className="w-[60%] flex flex-col gap-3 justify-start items-start ml-[50px]">
            <h2 className="text-[1.5rem] font-bold w-[80%]">
              {productData.title}
            </h2>
            <p>
              <span className="font-medium ">Category:</span>{" "}
              {productData.category}
            </p>
            <p className="w-[80%]">{productData.description}</p>
            <h3 className="text-[1.4rem] font-bold">₹{productData.price}</h3>
            <StarRatingsComponent ratings={productData.rating.rate} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductPage;
