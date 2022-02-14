import React, { useState, useEffect } from "react";
import { Rating } from "semantic-ui-react";
import axios from "axios";

//when recipe is created, we should create the rating as well so the method called here is 'put' for update instead of create
//now we need to pass in the userId and recipeId

const RatingButton = (props) => {
  // console.log(props);
  const [currRating, setCurrRating] = useState(0);
  const [ratingID, setRatingID] = useState("");
  const login = true;

//variable name must be rating and maxRating due to semantic UI implmentation
  const handleRate = async (e, { rating, maxRating }) => {
    console.log(rating);
    if (!login) {
      alert("please login to rate");
    } else {
      if (currRating !== rating) {
        console.log("ratingID", ratingID);
        if (ratingID !== "") {
          const res = await axios
            .put("/api/ratings", { id: ratingID, rating: rating })
            .catch((err) => console.log(err));
          setCurrRating(rating);
          console.log(res);
        } else {
          const res = await axios
            .post("/api/ratings/new", {
              rating: rating,
              userId: "1",
              recipeId: "620a21874ecaa3359f8eaed8",
            })
            .catch((err) => console.log(err));
          setCurrRating(rating);
          console.log(res);
        }
      }
    } 
  };

  useEffect(() => {
    const getRating = async (userId, recipeId) => {
      const res = await axios
        .post("/api/ratings", { userId: userId, recipeId: recipeId })
        .catch((err) => console.log(err));
      console.log("get rating", res);
      if (res !== undefined) {
        setCurrRating(res.data.data.rating);
        setRatingID(res.data.data._id);
      }
    };
    getRating(1, 0);
  }, []);

  return (
    <div>
      <Rating
        maxRating={5}
        rating={currRating}
        icon="star"
        size="small"
        onRate={handleRate}
      />
    </div>
  );
};
export default RatingButton;
