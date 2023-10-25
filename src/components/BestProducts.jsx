import { useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const BestProducts = ({ category }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredProducts, setFIlteredProducts] = useState([]);
  //TODO: @manohar : this products data will be sub category data you have to show the lower price and image of every sub-category
  // TODO: Refer the screenshot i sent you in whats of flipkart

  const productsData = useSelector((state) => state.productsData.value)?.filter(
    (data) => data?.category === category?.toLowerCase()
  );

  useEffect(() => {
    setFIlteredProducts(
      [...productsData].sort((r1, r2) =>
        r1.price > r2.price ? 1 : r1.price < r2.price ? -1 : 0
      )
    );
    console.log(filteredProducts);
  }, []);

  const scrollToElement = (index) => {
    const elementWidth = containerRef.current.clientWidth;
    containerRef.current.scrollLeft = index * elementWidth;
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productsData.length);
    scrollToElement((currentIndex + 1) % productsData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + productsData.length) % productsData.length
    );
    scrollToElement(
      (currentIndex - 1 + productsData.length) % productsData.length
    );
  };

  return (
    <div className="mx-auto my-4 w-full h-[24rem] px-10 shadow-lg border border-[#CFD2CF] relative">
      <h2 className="text-2xl font-bold mt-3">Best of {category}</h2>
      <button
        className="bg-gray-300 w-[2.5rem] h-[8rem] rounded-tr-2xl rounded-br-2xl text-2xl absolute z-10 left-0 top-[30%]"
        onClick={handlePrevious}
      >
        ❮
      </button>
      <button
        className="bg-gray-300 w-[2.5rem] h-[8rem] rounded-ss-2xl rounded-bl-2xl text-2xl absolute z-10 right-0 top-[30%]"
        onClick={handleNext}
      >
        ❯
      </button>
      <div
        ref={containerRef}
        className=" w-[92.5vw] h-[20rem] mt-2 overflow-hidden overflow-x-scroll no-scrollbar smooth-scroll flex items-center gap-6"
      >
        {filteredProducts.map((item) => (
          <ProductCard
            key={item.id}
            imgLink={item.image}
            title={item.title}
            description={item.description}
            rating={item.rating.rate}
            price={item.price}
            product={item}
            cardType="display"
          ></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default BestProducts;
