import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductInCartCard from "./ProductInCartCard";

export const Cart = () => {
  const addToCart = useSelector((state) => state.addToCart.value);
  const [totalPrice, settotalPrice] = useState(0);
  const [discount, setdiscount] = useState(0);
  const [coupons, setCoupons] = useState(0);

  useEffect(() => {
    console.log("rendered");
    const price = addToCart.reduce((total, item) => {
      return total + item.price * item.orderQty;
    }, 0);
    settotalPrice(price);
  }, [addToCart]);

  return (
    <Layout>
      <div className="h-screen flex flex-row gap-4 my-4 w-full px-5 mx-auto justify-center">
        <div className="w-[65vw]">
          <div className="overflow-y-scroll	h-[90vh] ">
            {addToCart.length === 0 && (
              <p className="text-center">CART IS EMPTY</p>
            )}
            {addToCart.map((item) => (
              <ProductInCartCard
                key={item.id}
                imgLink={item.image}
                title={item.title}
                description={item.description}
                rating={item.rating.rate}
                price={item.price}
                product={item}
                cardType="remove"
              ></ProductInCartCard>
            ))}
          </div>
          <div className="w-[] h-[80px] shadow-lg flex flex-row justify-end items-center">
            <button className="bg-blue-950 py-2 px-4 mr-4 text-white">
              Buy Now
            </button>
          </div>
        </div>
        <div className="w-[25vw] h-fit p-4 shadow-md">
          <div className="flex flex-col">
            <h2 className="font-semibold">PRICE DETAILS</h2>
            <div className="flex flex-row justify-between items-center my-2">
              <p>Price({addToCart.length} items)</p>
              <p>{totalPrice}</p>
            </div>
            <div className="flex flex-row justify-between items-center my-2">
              <p>Discount</p>
              <p>{discount}</p>
            </div>
            <div className="flex flex-row justify-between items-center my-2">
              <p>Coupons for you</p>
              <p>{0}</p>
            </div>
            <div className="flex flex-row justify-between items-center my-2 mb-6">
              <p>Delivery Charges</p>
              <p>{0}</p>
            </div>
            <hr className=" h-1 text-black w-[100%] text-[2px]" />
            <div className="flex flex-row justify-between items-center my-2 font-bold">
              <p>Total Amount</p>
              <p>{totalPrice - discount - coupons}</p>
            </div>
            <hr className=" h-1 text-black w-[100%] text-[2px]" />
          </div>
        </div>
      </div>
    </Layout>
  );
};
