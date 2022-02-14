import React, { useState } from "react";
import { Rating } from "semantic-ui-react";
import axios from "axios";

  //when recipe is created, we should create the rating as well so the method called here is 'put' for update instead of create
  //now we need to pass in the userId and recipeId

const RatingButton = (props) => {
  const [rating, setRating] = useState(props?.rating ?? 0);
  const login = false;
  const handleRate = async (e, { rating, maxRating }) => {
    console.log(rating);
    if (!login) {
      alert("please login to rate");
    } else {
      setRating(rating);
      const res = await axios
        .put("/api/ratings", { rating: rating })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Rating
        maxRating={5}
        rating={rating}
        icon="star"
        size="small"
        onRate={handleRate}
      />
    </div>
  );
};
export default RatingButton;
