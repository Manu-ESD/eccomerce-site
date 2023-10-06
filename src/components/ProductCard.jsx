import { useSelector, useDispatch } from "react-redux";
import { updateAddToCart } from "../features/cartSlice";
import StarRatingsComponent from "../components/StarRatingsComponent";
import { useNavigate } from "react-router-dom";
import { updateProductViewId } from "../features/productViewSlice";

const ProductCard = ({ imgLink, title, rating, price, product, cardType }) => {
  const addToCart = useSelector((state) => state.addToCart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleRemoveToCart(id) {
    dispatch(updateAddToCart(addToCart.filter((item) => item.id !== id)));
  }

  function handleProductViewId(product) {
    dispatch(updateProductViewId(product));
  }

  const handleProductView = (product) => {
    console.log("product clicked id:", product);
    handleProductViewId(product);
    navigate("/products/view");
  };

  return (
    <>
      <div
        className="card w-64 h-72 shadow-lg bg-base-100 rounded-none cursor-pointer"
        onClick={() => handleProductView(product)}
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

          <div className="card-actions">
            {cardType === "remove" ? (
              <button
                className="btn btn-primary text-white"
                onClick={() => {
                  handleRemoveToCart(product.id);
                }}
              >
                Remove From Cart
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
