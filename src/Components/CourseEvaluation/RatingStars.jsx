import React from "react";
import Star from "../../assets/Images/Star.svg";
import UnFilledStar from "../../assets/Images/UnFilledStar.svg";

export const RatingStars = ({ count }) => {
  return (
    <div className="flex justify-center gap-1">
      {[...Array(5)].map((_, index) => (
        <img
          key={index}
          src={index < count ? Star : UnFilledStar}
          alt={index < count ? "Filled star" : "Unfilled star"}
          className="w-4 h-4 md:w-5 md:h-5"
        />
      ))}
    </div>
  );
};
export default RatingStars;
