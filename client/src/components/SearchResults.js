import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import seed from "../unusedComponents/models/seed_recipes";
import { Rating } from "semantic-ui-react";
import axios from "axios";

const SearchResults = ({ searchQuery, allRecipes }) => {
  const { recipeID } = useParams();
    const [currentRecipe, setCurrentRecipe] = useState({});


  let foundRecipes = allRecipes.filter(function (recipe) {
    // return recipe.name.toLowerCase() === searchQuery
    return recipe.name.toLowerCase().split(" ").includes(searchQuery);
  });

  const fetchCurrentRecipe = async () => {
    const foundRecipe = await axios.get(`/api/recipes/${recipeID}`);
    //console.log(foundRecipe.data.data)
    setCurrentRecipe(foundRecipe.data.data);
  };
  useEffect(() => {
    fetchCurrentRecipe();
  }, []);

  const searchRecipes = foundRecipes.map((item, index) => {
    return (
      <div className="homediv">
        <Link to={"/recipes/" + item?._id} key={index}>
        <div className="ui card">
          <div className="image">
            <img src={item?.image} alt={item?.originalURL} />
          </div>
          <div className="content" id="homeContent">
            <div className="header">{item?.name}</div>
            <div className="meta">
              <div>Servings: {item?.servings}</div>
              <Rating icon="star" defaultRating={item?.rating} maxRating={5} />
              <div>{item?.description}</div>
            </div>
          </div>
        </div>
        </Link>
      </div>
    );
  });
  return (
    <div className="home" style={{ padding: "100px" }}>
      <h1>Results</h1>
      <div className="randomCards">{searchRecipes}</div>
    </div>
  );
};

export default SearchResults;
