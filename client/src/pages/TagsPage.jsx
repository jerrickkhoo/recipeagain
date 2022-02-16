import { useParams, Link } from "react-router-dom";
import { Rating } from "semantic-ui-react";


const TagsPage = () => {
  const { tagID } = useParams();
  //fetch all recipes and search for recipeID that has tags array that contain the tagID
  const recipes = JSON.parse(localStorage.getItem("recipes"));
  console.log(recipes);

  let relatedRecipes = recipes.filter(function (recipe) {
    return recipe.tags.includes(tagID);
  });
  console.log(relatedRecipes)

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
    <div className="home" style={{ paddingTop: "100px" }}>
      <h1>{tagID.toUpperCase()}</h1>
      <div className="randomCards">{tagRecipes}</div>
    </div>
  );
};

export default TagsPage;
