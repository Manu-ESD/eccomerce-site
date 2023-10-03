import React from 'react';
import { StarIcon } from "@heroicons/react/24/outline";

const StarRatingsComponent = ({ totalStars = 5, ratings }) => {
  const filledStars = Math.floor(ratings);
  const hasHalfStar = ratings - filledStars >= 0.5;

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold">{ratings}</span>
        <span className="flex ml-1">
        {[...Array(totalStars)].map((_, index) => {
          const isFilled = index < filledStars || (index === filledStars && hasHalfStar);

          return (
            <StarIcon
              key={index}
              width={18}
              fill={isFilled ? "#FFA41D" : "none"}
              stroke="#E28439"
            />
          );
        })}
        </span>

      </div>
    </>
  );
}

export default StarRatingsComponent;