import React from "react";
import { useDispatch } from "react-redux";
import { updateAddToCart } from "../features/cartSlice";

const ProductLayout = () => {
  // TODO: Individual product page layout
  // Name,description, etc all detail will be here
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(updateAddToCart([...addToCart, Product]));
  }
  return (
    <>
      <div>ProductLayout</div>

      {/* <div className="card-actions justify-end">
      {cardType === "add" ? (
        <div className="flex justify-between">
            <button className="btn bg-orange-600 mx-3 text-white" onClick={handleAddToCart}>
              Buy Now
            </button>
            <button className="btn btn-warning text-white" onClick={handleAddToCart}>
              Add to Cart
            </button>
        </div>
          ) : (
            <button
            className="btn btn-primary text-white"
              onClick={() => {
                handleRemoveToCart(Product.id);
              }}
            >
              Remove From Cart
            </button>
          )}
    </div> */}
    </>
  );
};

export default ProductLayout;
