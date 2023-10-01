import ProductCARD from "./ProductInCartCard";
import { useSelector, useDispatch } from "react-redux";
import { updateAddtoCart } from "../features/cartSlice";
import React, { useState, useEffect, useContext } from "react";
import Layout from "../Components/Layout";

export const Cart = () => {
  const addToCart = useSelector((state) => state.addToCart.value);
  const dispatch = useDispatch();

  return (
    <Layout>
      <div className="min-h-screen flex flex-row flex-wrap gap-4 my-4 w-[90%] mx-auto">
        {addToCart.map((item) => (
          <ProductCARD
            key={item.id}
            Imglink={item.image}
            Title={item.title}
            Discription={item.description}
            Rating={item.rating.rate}
            Price={item.price}
            Product={item}
            cardType="remove"
          ></ProductCARD>
        ))}
      </div>
    </Layout>
  );
};
