import { useState, useRef, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

const BestProducts = ({ category }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const productsData = useSelector((state) => state.productsData.value)?.filter(
    (data) => data?.category === category?.toLowerCase()
  );

  // Filter electronics category products
  const electronicsProducts = productsData.filter(
    (product) => product.category === "electronics"
  );

  // Create an object to store the lowest priced products for each subcategory
  const lowestPricedProducts = electronicsProducts.reduce((acc, product) => {
    // If the subcategory doesn't exist in 'acc' or the current product is cheaper than the stored one, update it
    if (
      !acc[product["sub-category"]] ||
      product.price < acc[product["sub-category"]].price
    ) {
      acc[product["sub-category"]] = product;
    }
    return acc;
  }, {});

  // Convert the object of lowest priced products back to an array
  const lowestPricedProductsArray = Object.values(lowestPricedProducts);
// TODO: too much re-rendering check it
  // useEffect(() => {
  //   const sortedProducts = [...productsData].sort((r1, r2) =>
  //     r1.price > r2.price ? 1 : r1.price < r2.price ? -1 : 0
  //   );
  //   setFilteredProducts(sortedProducts);
  // }, [productsData]);

  const handleNext = () => {
    scrollToElement("forward");
  };

  const handlePrev = () => {
    scrollToElement("reverse");
  };

  const scrollToElement = (move) => {
    const elementWidth = containerRef.current.clientWidth;
    if (move === "forward") {
      containerRef.current.scrollLeft += 500;
    }
    if (move === "reverse") {
      containerRef.current.scrollLeft -= 500;
    }
  };

  return (
    <div className="mx-auto my-4 w-full h-[24rem] px-10 shadow-lg border border-[#CFD2CF] relative">
      <h2 className="text-2xl font-bold mt-3">Best of {category}</h2>
      <button
        className="bg-gray-300 w-[2.5rem] h-[8rem] rounded-tr-2xl rounded-br-2xl text-2xl absolute z-10 left-0 top-[30%]"
        onClick={handlePrev}
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
        className="w-calc-full  h-[20rem] mt-2 flex flex-row gap-6 overflow-hidden scroll-smooth"
        ref={containerRef}
      >
        {lowestPricedProductsArray.map((item, index) => (
          <ProductCard
            key={item.id}
            imgLink={item.image}
            title={item.title}
            description={item.description}
            rating={item.rating.rate}
            price={item.price}
            product={item}
            cardType="display"
          />
        ))}
      </div>
    </div>
  );
};

export default BestProducts;
