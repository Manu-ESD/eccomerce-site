import { useDispatch } from "react-redux";
import StarRatingsComponent from "../components/StarRatingsComponent";
import { useNavigate,createSearchParams } from "react-router-dom";
import { updateProductViewId } from "../features/productViewSlice";

const ProductCard = ({ imgLink, title, rating, price, product, cardType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleProductViewId(product) {
    dispatch(updateProductViewId(product));
  }

  const handleProductView = (product, cardType) => {
    handleProductViewId(product);
    if (cardType !== "remove") {
      navigate({
        pathname: "/products/view",
        search: createSearchParams({
          id: product.id,
        }).toString(),
      });
    }
  };

  return (
    <>
      <div
        className="card w-64 h-72 shadow-lg bg-base-100 rounded-none cursor-pointer"
        onClick={() => handleProductView(product, cardType)}
      >
        <div className="card-body">
          <figure>
            <img src={imgLink} alt="product-img" className="h-[130px]" />
          </figure>
          <span className="card-title text-sm font-bold">
            {title.length > 50 ? `${title.substring(0, 50)}...` : title}
          </span>
          <div className="flex justify-center mt-3 items-center">
            <StarRatingsComponent ratings={rating} />
            <span className="flex text-sm font-bold ml-3">Price:${price}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
