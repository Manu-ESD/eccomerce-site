import { GiShoppingCart } from "react-icons/gi";

const EmptyCart = () => {
  return (
    <div className="text-[#9CA3AF] w-[90vw] shadow-md border border-[#CFD2CF] m-6 min-h-fit ">
      <GiShoppingCart className="h-[13rem] w-[13rem] bg-white mx-auto" />
      <div className="text-center text-5xl font-bold my-5">CART IS EMPTY</div>
    </div>
  );
};

export default EmptyCart;
