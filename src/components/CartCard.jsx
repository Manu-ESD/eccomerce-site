import { useSelector, useDispatch } from "react-redux";
import { updateAddToCart } from "../features/cartSlice";
import StarRatingsComponent from "./StarRatingsComponent";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { postDataToFirebase } from "../utility/utils";

const CartCard = ({ index,imgLink, title, rating, price, product }) => {
  const dispatch = useDispatch();
  const addToCart = useSelector((state) => state.addToCart.value);
  const [showRemoveAlert, setshowRemoveAlert] = useState(false);
  const [showRemoveConfirmAlert, setShowRemoveConfirmAlert] = useState(false);
  const [orderQty,setOrderQty] = useState(product.orderQty);

  const handleCartUpdate = ({ operation, id,orderQty }) => {
    if(operation === "delete"){
      postDataToFirebase({
      collectionName:"cart",
      id:`cart-${id}`,
      operation:"delete"
    });
    dispatch(updateAddToCart(addToCart.filter(cartData=>cartData.id!==id)));
    }else{
    /**
     * * When working with nested objects or arrays in Redux, making a deep copy becomes crucial to avoid unintentional mutations.
     * * If you directly modify a nested property of an object in the Redux state.
     * * It can lead to unexpected behavior and make it difficult to track changes.
     */

      const cartData = JSON.parse(JSON.stringify(addToCart));
      const dataToUpdate = cartData.filter((cartItem) => cartItem.id === id)[0];
      dataToUpdate.orderQty = orderQty;
      postDataToFirebase({
        collectionName:"cart",
        id:`cart-${id}`,
        operation:"add",
        dataToOperate:dataToUpdate
      });
      dispatch(updateAddToCart(cartData));
    }

  };

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

  const updateQtyHandler = ({ type, value }) => {
    setOrderQty((prev) => {
      let newQty;
      if (type === "increment") {
        newQty = prev + 1;
      } else if (type === "decrement") {
        newQty = prev - 1;
      } else {
        newQty = value;
      }

      handleCartUpdate({
        id: product.id,
        orderQty: newQty,
      });

      return newQty;
    });
  };

  return (
    <div className={`card w-[100%] h-[15rem] shadow-md rounded-none cursor-pointer flex flex-col justify-around ${index === 0 ?"":"mt-4"} p-3 border border-[#CFD2CF]`}>
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
            onClick={() => updateQtyHandler({type:"decrement"})}
          >
            <AiOutlineMinus />
          </button>
          <input className="px-2 w-10 text-center border-2 border-[#afafaf] rounded-md"
          value={orderQty}
          onChange={(e)=>updateQtyHandler({type:"",value:e.target.value})}
          />
          <button
            className="text-black hover:text-blue-400 rounded-full border-2 p-1 border-[#afafaf] scale-75"
            onClick={() => updateQtyHandler({type:"increment"})}
          >
            <AiOutlinePlus />
          </button>
        </div>
        <p
          className="font-medium hover:text-blue-600 ml-3"
          onClick={() => handleCartUpdate({operation:"delete",id:product.id})}>
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

export default CartCard;
