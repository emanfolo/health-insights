import React from "react";
import { FilledStar, EmptyStar } from "../icons";

export const StarRating = ({ rating, voteCount }) => {
  const totalStars = 5;

  const stars = Array.from({ length: totalStars }, (_, index) => {
    return index < Math.round(rating) ? (
      <FilledStar key={index} />
    ) : (
      <EmptyStar key={index} />
    );
  });

  return (
    <div className="flex items-center">
      {stars}
      <span className="ml-2 text-sm text-gray-600">({voteCount} votes)</span>
    </div>
  );
};
