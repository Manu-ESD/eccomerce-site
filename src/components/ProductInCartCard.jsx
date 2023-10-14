import { useSelector, useDispatch } from "react-redux";
import { updateAddToCart } from "../features/cartSlice";
import StarRatingsComponent from "../components/StarRatingsComponent";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service";
import { postDataToFirebase } from "../utility/utils";

const ProductInCartCard = ({ imgLink, title, rating, price, product }) => {
  const addToCart = useSelector((state) => state.addToCart.value);
  const dispatch = useDispatch();

  const [showRemoveAlert, setshowRemoveAlert] = useState(false);
  const [showRemoveConfirmAlert, setShowRemoveConfirmAlert] = useState(false);

  const handleCartUpdate = ({ operation, id }) => {
    const dataToUpdate = addToCart.filter((cartItem) => cartItem.id === id)[0];

    // postDataToFirebase({
    //   collectionName:"cart",
    //   dataToOperate:{ ...element },
    //   id:`cart-${element.id}`,
    //   operation:"add"
    // });
  };

  function handleRemoveQty(productID) {
    const updatedCart = addToCart.map((item) => {
      if (item.id === productID && item.orderQty > 1) {
        (async () => {
          await setDoc(doc(db, "cart", `cart-${item.id}`), {
            ...item,
            orderQty: item.orderQty - 1,
          });
        })();
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
        (async () => {
          await setDoc(doc(db, "cart", `cart-${item.id}`), {
            ...item,
            orderQty: item.orderQty + 1,
          });
        })();
        console.log("item", item);
        return { ...item, orderQty: item.orderQty + 1 };
      } else {
        return item;
      }
    });
    dispatch(updateAddToCart(updatedCart));
  }

  useEffect(() => {
    console.log("____++++____");
  }, [addToCart]);

  //TODO: SAVE FOR LATER to be implemented
  function handleSaveForLater() {
    console.log("SAVE FOR LATER");
  }

  function handleRemoveProduct(ID) {
    setshowRemoveAlert(false);
    setTimeout(() => {
      const updatedCart = addToCart.filter((item) => item.id !== ID);
      dispatch(updateAddToCart(updatedCart));
    }, 500);
    setTimeout(() => {
      setShowRemoveConfirmAlert(true);
    }, 1000);
  }

  return (
    <div className="w-[100%] h-[15rem] shadow-grey rounded-none cursor-pointer flex flex-col justify-around mt-4">
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
      <div className="flex flex-row justify-start items-center w-[100%] pb-5">
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
        {/* <p
          className="font-medium mr-6 ml-3 hover:text-blue-600"
          onClick={handleSaveForLater}
        >
          SAVE FOR LATER
        </p> */}
        <p
          className="font-medium hover:text-blue-600 ml-3"
          onClick={() => {
            setshowRemoveAlert(true);
          }}
        >
          REMOVE
        </p>
      </div>
      {/* ALERT */}
      {showRemoveAlert ? (
        <div className="alert absolute top-[50px] w-[500px] left-[calc(50%-250px)] border-2 border-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Do you want to remove the item from Cart?</span>
          <div>
            <button
              onClick={() => {
                setshowRemoveAlert(false);
              }}
              className="btn btn-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleRemoveProduct(product.id);
              }}
              className="btn btn-sm btn-primary"
            >
              Accept
            </button>
          </div>
        </div>
      ) : null}
      {showRemoveConfirmAlert ? (
        <div className="alert alert-info absolute top-[50px] w-[500px] left-[calc(50%-250px)] border-2 border-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>item Removed.</span>
        </div>
      ) : null}
    </div>
  );
};

export default ProductInCartCard;
