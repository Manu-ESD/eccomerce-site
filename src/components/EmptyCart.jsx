import { GiShoppingCart } from "react-icons/gi";

const EmptyCart = () => {
    return (
        <div className='grid justify-center text-[#9CA3AF] w-[88vw] h-[38vh] shadow-md border border-[#CFD2CF] m-6'>
            <GiShoppingCart className="h-[13rem] w-[13rem] ml-10" />
            <div className="text-center text-5xl font-bold">CART IS EMPTY</div>
        </div>
    )
}

export default EmptyCart