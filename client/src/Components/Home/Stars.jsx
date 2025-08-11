import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

function Rating({ value }) {
  // Create an array to hold the stars
  const stars = [];

  // Loop through 5 times to generate stars
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i}>
        {value >= i ? (
          <FaStar />
        ) : value >= i - 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  }

  return <>{stars}</>;
}

export default Rating;
