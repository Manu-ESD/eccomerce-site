import React from 'react';
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";


const BestProducts = ({category}) => {
  const productsData = useSelector((state) => state.productsData.value)?.filter((data)=>data?.category === category?.toLowerCase());

  return (
    <div className="h-screen mx-auto my-4 w-full h-[24rem] px-5 mx-auto shadow-lg border border-[#CFD2CF]">
        <h2 className="text-2xl font-bold mt-3">Best of {category}</h2>
        <div className="flex items-center gap-6 container mt-2 overflow-hidden overflow-x-scroll no-scrollbar">
          {productsData.map((item) => (
                <ProductCard
                  key={item.id}
                  imgLink={item.image}
                  title={item.title}
                  description={item.description}
                  rating={item.rating.rate}
                  price={item.price}
                  product={item}
                  cardType="add"
                ></ProductCard>
              ))}
        </div>
   </div>
  )
}

export default BestProducts