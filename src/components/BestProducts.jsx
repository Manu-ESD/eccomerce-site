import React from 'react'

const BestProducts = ({category,categoryData}) => {
  return (
    <div className="h-screen mx-auto my-4 w-full h-[22rem] px-5 mx-auto justify-center grid grid-cols-3 gap-4 shadow-lg border border-[#CFD2CF]">
        <h2 className="text-2xl font-bold mt-3">Best of {category}</h2>

   </div>
  )
}

export default BestProducts