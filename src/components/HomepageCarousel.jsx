//TODO: get images from db itself using blob storage, don't store in bundle
import { useState } from "react";
import { uploadfilestoFirbaseStorage } from "../utility/utils";
import { getAllFilesFromFirebaseStorage } from "../utility/utils";
import { useEffect } from "react";

const HomepageCarousel = () => {
  const [activeCarousel, setActiveCarousel] = useState(0);

  const [imageList, setImageList] = useState([]);

  // Get the Images from Firebase Storage
  useEffect(() => {
    getAllFilesFromFirebaseStorage().then((res) => {
      setImageList(res);
    });
  }, []);

  // used to upload files to Firbase Storage
  // useEffect(() => {
  //   uploadfilestoFirbaseStorage(car5, "CAR5");
  // }, []);

  const allCarousels = () => {
    return (
      <>
        {imageList.map((url, index) => (
          <div className="carousel-item relative w-full" key={index}>
            <img src={url} className="w-full" alt={`Car ${index + 1}`} />
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
                  setActiveCarousel((prev) => {
                    // console.log(imageList.length - 1, prev);
                    return prev === imageList.length - 1
                      ? imageList.length - 1
                      : prev + 1;
                  })
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
