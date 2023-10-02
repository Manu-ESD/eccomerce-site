import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAddToCart } from "../features/cartSlice";

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
    <div className="card w-64 h-72 bg-base-100 shadow-xl rounded-none">
      <div className="card-body">
      <figure>
        <img
          src={Imglink}
          alt="product-img"
          className="h-[130px]"
        />
      </figure>
        <h5 className="card-title font-bold h-12 text-[14px] flex items-center justify-center">
          {Title}
        </h5>
        <div className="w-[100%] flex justify-between my-3">
          <span className="card-text text-left font-medium text-[14px]">
            Rating:{Rating}
          </span>
          <span className="card-text text-left font-medium text-[14px]">
            Price:{Price}
          </span>
        </div>

        <div className="card-actions justify-end">
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
