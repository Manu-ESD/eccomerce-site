import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAddToCart } from "../features/cartSlice";
import StarRatingsComponent from "../components/StarRatingsComponent";

const ProductCard = ({
  Imglink,
  Title,
  Rating,
  Price,
  Product,
  cardType,
}) => {
  const addToCart = useSelector((state) => state.addToCart.value);
  const dispatch = useDispatch();

  function handleRemoveToCart(id) {
    dispatch(updateAddToCart(addToCart.filter((item) => item.id !== id)));
  }

  return (
    <div className="card w-64 h-72 shadow-lg bg-base-100 rounded-none">
      <div className="card-body">
      <figure>
        <img
          src={Imglink}
          alt="product-img"
          className="h-[130px]"
        />
      </figure>
        <span className="card-title text-sm font-bold">{Title.substring(0,50)}...</span>
        <div className="flex justify-center mt-3 items-center">
            <StarRatingsComponent ratings={Rating}/>
            <span className="flex text-sm font-bold ml-3">Price:${Price}</span>
        </div>

        <div className="card-actions">
          {cardType === "remove" ? (
            <button
              className="btn btn-primary text-white"
              onClick={() => {
                handleRemoveToCart(Product.id);
              }}
            >
              Remove From Cart
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
