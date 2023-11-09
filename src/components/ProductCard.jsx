import { useDispatch } from "react-redux";
import StarRatingsComponent from "../components/StarRatingsComponent";
import { useNavigate, createSearchParams } from "react-router-dom";
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
    <div
        className={`card w-[16rem] h-72 shadow-lg bg-base-100 cursor-pointer rounded-none ${
          cardType === "display" && "border border-grey-400"
        }`}
        onClick={() => {handleProductView(product, cardType)}}
      >
        <div className="card-body w-[16rem]">
          <figure>
            <img src={imgLink} alt="product-img" className="h-[130px]" />
          </figure>
          {cardType !== "display" ? (
            <div className="flex justify-center items-center flex-col absolute bottom-5 w-[14rem] left-[1rem] right-0">
              <span className="card-title text-sm font-bold text-center ">
                {title.length > 50 ? `${title.substring(0, 50)}...` : title}
              </span>
              <div className="flex justify-center mt-3 items-center">
                <StarRatingsComponent ratings={rating} />

                <span className="flex text-sm font-bold ml-3">
                  Price:${price}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col absolute bottom-5 w-[14rem] left-[1rem] right-0">
              <span className="card-title text-[16px] font-bold text-center ">
                Best of {product["sub-category"]}
              </span>
              <div className="flex justify-center mt-3 items-center">
                <span className="flex text-sm font-medium ml-3">
                  Price range starts at ${price}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default ProductCard;
