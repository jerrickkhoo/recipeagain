import { useEffect, useState } from "react";
import seed from "../unusedComponents/models/seed_recipes";
import { Link } from "react-router-dom";
import { Rating } from "semantic-ui-react";
import axios from "axios";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const Home = ({ allRecipes, setAllRecipes }) => {
  let indexArray = [];
  let randomRecipeArray = [];
  let randomIndexArray = [];
  const [ratings, setRatings] = useState({});
  useEffect(() => {
    const fetchrecipes = async () => {
      const fetched = await axios.get("/api/recipes");
      console.log(fetched);
      setAllRecipes(fetched?.data?.data);
      localStorage.setItem("recipes", JSON.stringify(fetched?.data?.data));
    };
    fetchrecipes();
  }, []);
  console.log(allRecipes);

  const reducer = (prev, curr, index, array) => prev + curr.rating;
  useEffect(() => {
    if (allRecipes !== undefined && allRecipes?.length !== 0) {
      let returnObj = {};
      for (const recipe of allRecipes) {
        console.log(recipe);
        if (recipe?.ratings?.length!==0 && recipe?.ratings) {
          returnObj[`${recipe._id}`] = (recipe.ratings.reduce(
            reducer,0) / recipe.ratings.length
          );
        }
      }
      setRatings(returnObj);
    }
  }, [allRecipes]);

  //arrayOfIndex = [0,1,2,3,4,5,6,7,8]
  for (let i = 0; i < allRecipes.length; i++) {
    indexArray.push(i);
  }

  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * indexArray.length);
    let randomNumber = indexArray[randomIndex];
    //randomArr = [allRecipes[randomNumber] * 6]
    randomRecipeArray.push(allRecipes[randomNumber]);
    //removes duplicates
    indexArray.splice(randomIndex, 1);
  }

  const randomCards = randomRecipeArray.map((item, index) => {
    return (
      
      <div className="homediv" key={index}>
        <Link to={"/recipes/" + item?._id}>
          <div className="ui card">
            <div className="image" style={{backgroundImage:`url(${item?.image})`, backgroundSize: '100% 100%'}}>
            </div>
            <div className="content" id="homeContent">
              <div className="header" style={{ fontFamily: 'Josefin Sans, sans-serif'}}>{item?.name}</div>
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
    <div className="home">
      <div id="homebanner">
        <h1 className="titles">Featured</h1>
      </div>
      <div className="randomCards">{randomCards}</div>
    </div>
  );
};

export default Home;
