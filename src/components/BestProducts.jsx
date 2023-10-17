import { useState, useRef } from 'react';
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";


const BestProducts = ({category}) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  //TODO: @manohar : this products data will be sub category data you have to show the lower price and image of every sub-category
  // TODO: Refer the screenshot i sent you in whats of flipkart 
  const productsData = useSelector((state) => state.productsData.value)?.filter((data)=>data?.category === category?.toLowerCase());

  const scrollToElement = (index) => {
    const elementWidth = containerRef.current.clientWidth;
    containerRef.current.scrollLeft = index * elementWidth;
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productsData.length);
    scrollToElement((currentIndex + 1) % productsData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + productsData.length) % productsData.length);
    scrollToElement((currentIndex - 1 + productsData.length) % productsData.length);
  };

  return (
    <div className="h-screen mx-auto my-4 w-full h-[24rem] px-5 mx-auto shadow-lg border border-[#CFD2CF] relative">
        <h2 className="text-2xl font-bold mt-3">Best of {category}</h2>
        <button className="bg-gray-200 w-[2.5rem] h-[8rem] text-2xl absolute z-10 left-0 top-[30%]" onClick={handlePrevious}>❮</button>
        <button className="bg-gray-200 w-[2.5rem] h-[8rem] text-2xl absolute z-10 right-0 top-[30%]" onClick={handleNext}>❯</button>
        <div ref={containerRef} className="flex w-full items-center gap-6 container mt-2 overflow-hidden overflow-x-scroll no-scrollbar smooth-scroll">
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