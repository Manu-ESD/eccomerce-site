import { useSelector } from "react-redux";
import React from "react";
import Layout from "../components/Layout";
import ProductCard from "./ProductCard";

export const Cart = () => {
  const addToCart = useSelector((state) => state.addToCart.value);

  return (
    <Layout>
      <div className="min-h-screen flex flex-row flex-wrap gap-4 my-4 w-[90%] mx-auto">
        {addToCart.map((item) => (
          <ProductCard
            key={item.id}
            Imglink={item.image}
            Title={item.title}
            Discription={item.description}
            Rating={item.rating.rate}
            Price={item.price}
            Product={item}
            cardType="remove"
          ></ProductCard>
        ))}
      </div>
    </Layout>
  );
};
