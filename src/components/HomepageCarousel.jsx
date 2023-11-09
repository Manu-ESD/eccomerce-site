import { useState,useEffect } from "react";
import { uploadfilestoFirbaseStorage, getAllFilesFromFirebaseStorage } from "../utility/utils";
import { ShimmerThumbnail } from "react-shimmer-effects-18";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const HomepageCarousel = ({autoScroll=true, autoscrollduration=2000}) => {
  const [activeCarousel, setActiveCarousel] = useState(0);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    console.log("effect called");
  
    getAllFilesFromFirebaseStorage().then((res) => {
      console.log("asd1", res.length - 1);
      setImageList([...res.map((s) => <img src={s} key={s} />)]);
    });
  
  }, []); 

  useEffect(() => {
    console.log("asd2", imageList.length - 1);
  
    if (autoScroll) {
      const slideInterval = setInterval(next, autoscrollduration);
      return () => clearInterval(slideInterval);
    }
  }, [imageList]); 
  
  
  const prev = () => {
    setActiveCarousel((curr)=> (curr === 0 ? imageList.length-1 : curr-1 ))
  }
  const next = () => {
    setActiveCarousel((curr)=> (curr == imageList.length-1 ? 0 : curr+1 ))
    
  }
  
  // used to upload files to Firbase Storage
  // useEffect(() => {
  //   uploadfilestoFirbaseStorage(car5, "CAR5");
  // }, []);

  return (
    <div className="carousel w-full max-h-full bg-white">
      {imageList.length<=2
      ?<div className="relative height-ratio"><ShimmerThumbnail/>
      {/* <h1 className="flex mx-auto w-[50px] items-center z-10 font-black absolute inset-0">Loading...</h1> */}
      </div>
      :
        <div className="max-w-full height-ratio  overflow-hidden relative">
           <div className="flex flex-row transition-transform ease-out duration-500" style={{transform: `translateX(-${activeCarousel * 100}%)`}}>
               {imageList}
           </div>
           <div className="absolute inset-0 flex flex-row items-center justify-between p-6">
           <button className="rounded-full p-2 bg-white opacity-80 hover:opacity-100"
           onClick={prev}>
            <BiChevronLeft size={40}></BiChevronLeft>
           </button>
           <button className="rounded-full p-2 bg-white opacity-80 hover:opacity-100"
           onClick={next}>
            <BiChevronRight size={40}></BiChevronRight>
           </button>
           <div className="absolute bottom-5 left-0 right-0">
           <div className="flex flex-row gap-2 items-center justify-center">
             {imageList.map((_,i)=>(
              <p className={`bg-white  rounded-full w-3 h-3 ${activeCarousel === i ? "p-2 opacity-100" : "p-1 opacity-50"}`} key={i}></p>
             
             ))}
             </div>
           </div>

           </div>
        </div>
      }
    </div>
  );
};

export default HomepageCarousel;

