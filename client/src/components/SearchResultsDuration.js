import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Rating } from "semantic-ui-react";

const SearchResultsDuration = ({ searchQuery, allRecipes, searchBy }) => {
  const { recipeID } = useParams();
  const params = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [ratings, setRatings] = useState({});

  
  const recipes = JSON.parse(localStorage.getItem("recipes"));
  console.log(recipes);


  let foundRecipes = recipes.filter(function (recipe) {
    return recipe.duration<=(params.searchID);
  });

  console.log(foundRecipes)

  const reducer = (prev, curr, index, array) => prev + curr.rating;
  useEffect(() => {
    if (allRecipes !== undefined && allRecipes?.length !== 0) {
      let returnObj = {};
      for (const recipe of allRecipes) {
        console.log(recipe);
        if (recipe?.ratings?.length !== 0 && recipe?.ratings) {
          returnObj[`${recipe._id}`] =
            recipe.ratings.reduce(reducer, 0) / recipe.ratings.length;
        }
      }
      setRatings(returnObj);
    }
  }, [allRecipes]);

  const searchRecipes = foundRecipes.map((item, index) => {
    return (
      <div className="homediv" key={index}>
        <Link to={"/recipes/" + item?._id}>
          <div className="ui card">
            <div
              className="image"
              style={{
                backgroundImage: `url(${item?.image})`,
                backgroundSize: "100% 100%",
              }}
            ></div>
            <div className="content" id="homeContent">
              <div
                className="header"
                style={{
                  fontFamily: "Josefin Sans, sans-serif",
                  textAlign: "center",
                }}
              >
                {item?.name}
              </div>
              <div className="meta" style={{ textAlign: "center" }}>
                <div>Servings: {item?.servings}</div>
                <Rating
                  icon="star"
                  rating={ratings[`${item?._id}`] ?? 0}
                  maxRating={5}
                  disabled
                />
                <div>{item?.description}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return (
    <div style={{ backgroundColor: "lightyellow", paddingBottom: "100%" }}>
      <div id="homebanner">
        <h1 className="titles">Results</h1>
      </div>
      <div className="randomCards">{searchRecipes}</div>
    </div>
  );
};

export default SearchResultsDuration;
