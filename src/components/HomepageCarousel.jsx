//TODO: get images from db itself using blob storage, don't store in bundle
import { useState } from "react";
import car1 from "../assets/car-01.jpg";
import car2 from "../assets/car-02.jpg";
import car3 from "../assets/car-03.jpg";
import car4 from "../assets/car-04.jpg";
import car5 from "../assets/car-05.jpg";

const HomepageCarousel = () => {
  const carImages = [car1, car2, car3, car4, car5];
  const [activeCarousel, setActiveCarousel] = useState(0);
  const allCarousels = () => {
    return (
      <>
        {carImages.map((carImage, index) => (
          <div className="carousel-item relative w-full" key={index}>
            <img src={carImage} className="w-full" alt={`Car ${index + 1}`} />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button
                className="btn btn-circle text-black"
                onClick={() =>
                  setActiveCarousel((prev) => (prev >= 1 ? prev - 1 : prev))
                }
              >
                ❮
              </button>
              <button
                className="btn btn-circle text-black"
                onClick={() =>
                  setActiveCarousel((prev) =>
                    prev === carImages.length - 1
                      ? carImages.length - 1
                      : prev + 1
                  )
                }
              >
                ❯
              </button>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="carousel w-full">
      {allCarousels().props.children[activeCarousel]}
    </div>
  );
};

export default HomepageCarousel;
