import { useSelector, useDispatch } from "react-redux";
import { updateAddToCart } from "../features/cartSlice";
import StarRatingsComponent from "../components/StarRatingsComponent";
import { useNavigate } from "react-router-dom";
import { FaRegCircleXmark } from "react-icons/fa6";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { updateProductViewId } from "../features/productViewSlice";

const ProductInCartCard = ({
  imgLink,
  title,
  rating,
  price,
  product,
  cardType,
}) => {
  const addToCart = useSelector((state) => state.addToCart.value);
  const dispatch = useDispatch();

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
  //TODO: SAVE FOR LATER to be implemented
  function handleSaveForLater() {
    console.log("SAVE FOR LATER");
  }

  function handleRemoveProduct(ID) {
    const updatedCart = addToCart.filter((item) => item.id !== ID);
    dispatch(updateAddToCart(updatedCart));
  }

  return (
    <div className="w-[100%] h-[15rem] shadow-lg rounded-none cursor-pointer flex flex-col justify-around mt-4">
      <div className="w-[100%] h-[80%] flex flex-row ga-5">
        <figure className="w-[20%] ml-3 mt-5">
          <img src={imgLink} alt="product-img" className="h-[80%] mx-auto" />
        </figure>

        <div className="w-[80%] flex flex-col gap-4 ml-3">
          <span className="text-lg font-bold">{title}</span>
          <span className="text-sm w-[90%]">
            {product.description.substring(0, 200)}...
          </span>
          <div className="flex justify-start mt-3 items-center">
            <StarRatingsComponent ratings={rating} />
            <span className="flex text-sm font-bold ml-3">Price:${price}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-start items-center w-[100%]">
        <div className="flex flex-row gap-2 w-[20%] justify-center">
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
        <p
          className="font-medium mr-6 ml-3 hover:text-blue-600"
          onClick={handleSaveForLater}
        >
          SAVE FOR LATER
        </p>
        <p
          className="font-medium hover:text-blue-600"
          onClick={() => {
            handleRemoveProduct(product.id);
          }}
        >
          REMOVE
        </p>
      </div>
    </div>
  );
};

export default ProductInCartCard;
