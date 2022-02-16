import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Rating } from "semantic-ui-react";
import axios from "axios";



const TagsPage = ({allRecipes, setAllRecipes}) => {
  const { tagID } = useParams();
    const [ratings, setRatings] = useState({});


 useEffect(() => {
   const fetchrecipes = async () => {
     const fetched = await axios.get("/api/recipes");
     console.log(fetched);
     setAllRecipes(fetched?.data?.data);
    //  localStorage.setItem("recipes", JSON.stringify(fetched?.data?.data));
   };
   fetchrecipes();
 }, []);
 console.log(allRecipes);   

  //fetch all recipes and search for recipeID that has tags array that contain the tagID
  const recipes = JSON.parse(localStorage.getItem("recipes"));
  console.log(recipes);

  let relatedRecipes = recipes.filter(function (recipe) {
    return recipe.tags.includes(tagID);
  });
  console.log(relatedRecipes)

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

  const tagRecipes = relatedRecipes.map((item, index) => {
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
    <div className="home" style={{ paddingTop: "100px" }}>
      <h1>{tagID.toUpperCase()}</h1>
      <div className="randomCards">{tagRecipes}</div>
    </div>
  );
};

export default TagsPage;
