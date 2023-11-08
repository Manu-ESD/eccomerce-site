//TODO: get images from db itself using blob storage, don't store in bundle
import { useState } from "react";
import { uploadfilestoFirbaseStorage } from "../utility/utils";
import { getAllFilesFromFirebaseStorage } from "../utility/utils";
import { useEffect } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects-18";

const HomepageCarousel = () => {
  const [activeCarousel, setActiveCarousel] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [imageList, setImageList] = useState([]);

  // Get the Images from Firebase Storage
  useEffect(() => {
    getAllFilesFromFirebaseStorage().then((res) => {
      setImageList(res);
    });
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // used to upload files to Firbase Storage
  // useEffect(() => {
  //   uploadfilestoFirbaseStorage(car5, "CAR5");
  // }, []);

  const allCarousels = () => {
    return (
      <div>
        {imageList.map((url, index) => (
          <div className="carousel-item relative w-full" key={index}>
            <img src={url} className="w-full" alt={`Car ${index + 1}`} />
      
            
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button
                className="btn btn-circle text-black"
                onClick={() =>
                  setActiveCarousel((prev) =>{setImageLoaded(false);
                   return(prev >= 1 ? prev - 1 : prev)})
                }
              >
                ❮
              </button>
              <button
                className="btn btn-circle text-black"
                onClick={() =>
                  setActiveCarousel((prev) => {
                    // console.log(imageList.length - 1, prev);
                    setImageLoaded(false);
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
      </div>
    );
  };

  return (
    <div className="carousel w-[100vw] h-[24rem] bg-white">
    
      {imageList.length===0
      ?<div className="relative"><ShimmerThumbnail/>
      {/* <h1 className="flex mx-auto w-[50px] items-center z-10 font-black absolute inset-0">Loading...</h1> */}
      </div>
      :allCarousels().props.children[activeCarousel]}
    </div>
  );
};

export default HomepageCarousel;
