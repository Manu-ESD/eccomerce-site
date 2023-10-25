import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { ShimmerContentBlock } from "react-shimmer-effects-18";
import StarRatingsComponent from "../components/StarRatingsComponent";
import { updateAddToCart } from "../features/cartSlice";
import ReactImageZoom from "react-image-zoom";
import { useSearchParams } from "react-router-dom";
import { getProductById } from "../utility/utils";
import Toast from "../components/Toast";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [productData, setProductData] = useState([]);
  const addToCart = useSelector((state) => state.addToCart.value);
  const [showToast, setshowToast] = useState(false);

  const [toastProps, setToastProps] = useState({
    message: "Item already added !",
    status: "exclamation",
    loading: false,
  });

  useEffect(() => {
    getProductById("products", `product-${searchParams.get("id")}`).then(
      (data) => {
        setProductData(data);
        console.log("data", data);
      }
    );
  }, [searchParams]);

  const handleAddToCart = () => {
    const uniqueProducts = [];
    addToCart.forEach((products) => {
      uniqueProducts.push(products.id);
    });
    if (!uniqueProducts.includes(productData.id)) {
      const productInCart = { ...productData, orderQty: 1 };
      dispatch(updateAddToCart([...addToCart, productInCart]));
    } else {
      setshowToast(true);
      setTimeout(() => {
        setshowToast(false);
      }, 1500);
    }
  };

  const props = { height: 250, zoomWidth: 500, img: productData.image };

  return (
    <Layout>
      {showToast && (
        <Toast
          text={toastProps.message}
          status={toastProps.status}
          loading={toastProps.loading}
          requireConfirm={false}
        ></Toast>
      )}
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
          <div className="w-[40%] border-[0] border-blue-950 p-5 flex flex-col justify-center items-center">
            {/* <img
              className="h-[250px] mx-auto"
              src={productData.image}
              alt="Product image"
            ></img> */}
            <ReactImageZoom {...props} />

            <div className="mt-6 flex flex-row justify-center items-center gap-3">
              <button
                className=" bg-blue-950 text-white font-medium px-4 py-3 rounded-lg hover:scale-105"
                onClick={() => {
                  handleAddToCart();
                }}
              >
                ADD TO CART
              </button>
              <button className=" bg-blue-950 text-white font-medium px-4 py-3 rounded-lg hover:scale-105">
                BUY NOW
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
