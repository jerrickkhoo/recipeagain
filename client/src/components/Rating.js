import React, { useState, useEffect } from "react";
import { Rating } from "semantic-ui-react";
import axios from "axios";

//when recipe is created, we should create the rating as well so the method called here is 'put' for update instead of create
//now we need to pass in the userId and recipeId

const RatingButton = (props) => {
  console.log(props);
  const [rating, setRating] = useState(0);
  const [ratingID, setRatingID] = useState("");
  const login = true;
  const handleRate = async (e, { rating, maxRating }) => {
    console.log(rating);
    if (!login) {
      alert("please login to rate");
    } else {
      console.log("ratingID",ratingID);
      if (ratingID !== "") {
        const res = await axios
          .put("/api/ratings", { id:ratingID, rating: rating })
          .catch((err) => console.log(err));
        setRating(rating);
        console.log(res);
      } else {
        const res = await axios
          .post("/api/ratings", { rating: rating })
          .catch((err) => console.log(err));
        setRating(rating);
        console.log(res);
      }
    }
  };

  useEffect(async () => {
    const res = await axios
      .post("/api/ratings", { userId: 1, recipeId: 1 })
      .catch((err) => console.log(err));
    console.log(res);
    if (res !== undefined) {
      setRating(res.data.data.rating);
      setRatingID(res.data.data._id);
    }
  }, []);

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
