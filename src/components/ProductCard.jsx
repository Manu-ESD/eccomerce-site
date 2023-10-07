import { useSelector, useDispatch } from "react-redux";
import { updateAddToCart } from "../features/cartSlice";
import StarRatingsComponent from "../components/StarRatingsComponent";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { updateProductViewId } from "../features/productViewSlice";

const ProductCard = ({ imgLink, title, rating, price, product, cardType }) => {
  const addToCart = useSelector((state) => state.addToCart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleRemoveQty(productID) {
    const updatedCart = addToCart.map((item) => {
      if (item.id === productID && item.orderQty > 1) {
        return { ...item, orderQty: item.orderQty - 1 };
      } else {
        return item;
      }
    });
    dispatch(updateAddToCart(updatedCart));
  }

  function handleAddQty(productID) {
    const updatedCart = addToCart.map((item) => {
      if (item.id === productID && item.orderQty < item.stock) {
        return { ...item, orderQty: item.orderQty + 1 };
      } else {
        return item;
      }
    });
    dispatch(updateAddToCart(updatedCart));
  }

  function handleProductViewId(product) {
    dispatch(updateProductViewId(product));
  }

  const handleProductView = (product, cardType) => {
    console.log("product clicked id:", product);
    handleProductViewId(product);
    if (cardType !== "remove") {
      navigate("/products/view");
    }
  };

  return (
    <>
      <div
        className="card w-64 max-h-[21.5rem] shadow-lg bg-base-100 rounded-none cursor-pointer"
        onClick={() => handleProductView(product, cardType)}
      >
        <div className="card-body">
          <figure>
            <img src={imgLink} alt="product-img" className="h-[130px]" />
          </figure>
          <span className="card-title text-sm font-bold">
            {title.substring(0, 50)}...
          </span>
          <div className="flex justify-center mt-3 items-center">
            <StarRatingsComponent ratings={rating} />
            <span className="flex text-sm font-bold ml-3">Price:${price}</span>
          </div>

          <div className="card-actions flex flex-row justify-center items-center gap-5 translate-y-2 absolute bottom-5 left-0 right-0">
            {cardType === "remove" ? (
              <div className="flex flex-row gap-2">
                <button
                  className="text-black hover:text-blue-400 rounded-full border-2 p-1 border-[#afafaf] scale-75"
                  onClick={() => {
                    handleRemoveQty(product.id);
                  }}
                >
                  <AiOutlineMinus />
                </button>
                <p className="px-2 w-10 text-center border-2 border-[#afafaf] rounded-md">
                  {product.orderQty}
                </p>
                <button
                  className="text-black hover:text-blue-400 rounded-full border-2 p-1 border-[#afafaf] scale-75"
                  onClick={() => {
                    handleAddQty(product.id);
                  }}
                >
                  <AiOutlinePlus />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
