import {useEffect, useState} from "react";
import seed from "./models/seed_recipes";
import { Link } from "react-router-dom";
import { Rating } from "semantic-ui-react";
import axios from "axios";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const Home = ({allRecipes, setAllRecipes}) => {
  let indexArray = [];
  let randomRecipeArray = [];
  let randomIndexArray = [];
  
  useEffect(() => {
    const fetchrecipes = async () => {
      const fetched = await axios.get("/api/recipes");
      console.log(fetched);
      setAllRecipes(fetched?.data?.data);
    };
    fetchrecipes();
  }, []);
  console.log(allRecipes);
  
    //arrayOfIndex = [0,1,2,3,4,5,6,7,8]
    for (let i = 0; i < allRecipes.length; i++) {
      indexArray.push(i);
    }
  
    for (let i = 0; i < 6; i++) {
      let randomNumber = Math.floor(Math.random() * indexArray.length);
      let randomIndex = indexArray[randomNumber];
      //randomArr = [allRecipes[randomNumber] * 6]
      randomRecipeArray.push(allRecipes[randomIndex]);
      //arrayOfRandomIndex = [randomIndex * 6]
      randomIndexArray.push(randomIndex);
      //removes duplicates
      indexArray.splice(randomNumber, 1);
    }


  const randomCards = randomRecipeArray.map((item, index) => {
    return (
      <div className="homediv">
        <Link to={"/recipes/" + item?._id} key={index}>
          <div className="ui card">
            <div className="image">
              <img src={item?.image} alt=''/>
            </div>
            <div className="content" id="homeContent">
              <div className="header">{item?.name}</div>
              <div className="meta">
                <div>Servings: {item?.servings}</div>
                <Rating icon="star" defaultRating={item?.rating} maxRating={5} disabled />
                <div>{item?.description}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className="home" style={{ padding: "100px 0px" }}>
      <h1>Popular</h1>
      <div className="randomCards">{randomCards}</div>
    </div>
  );
};

export default Home;
