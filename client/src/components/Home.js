import React from "react";
import seed from "./models/seed_recipes";
import { Link } from "react-router-dom";
import { Rating } from "semantic-ui-react";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const Home = () => {
  let numArray = [];
  let randomArr = [];
  let randomNumber = [];

  for (let i = 0; i < seed.length; i++) {
    numArray.push(i);
  }

  for (let i = 0; i < 6; i++) {
    let num = Math.floor(Math.random() * numArray.length);
    let randomRecipes = numArray[num];
    randomArr.push(seed[randomRecipes]);
    randomNumber.push(randomRecipes);
    numArray.splice(numArray.indexOf(randomRecipes), 1);
  }

  const randomCards = randomArr.map((item, index) => {
    return (
      <div className="homediv">
        <Link to={"/recipe/" + randomNumber[index]} key={index}>
          <div className="ui card">
            <div className="image">
              <img src={item?.imageURL} alt={item?.originalURL}/>
            </div>
            <div className="content" id='homeContent'>
              <div className="header">{item?.name}</div>
              <div className="meta">
                <div>Servings: {item?.servings}</div>
                <div>Rating: {item?.rating}</div>
                <div>{item?.description}</div>
                {/* <div>
                  <br /> */}
                  {/* <Rating
                    icon="star"
                    defaultRating={5}
                    maxRating={8}
                    size="huge"
                    disabled
                  /> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
  <div className='home'>
    <h1>Popular</h1>
  <div className="randomCards">
    {randomCards}
    </div>

  </div>
  )
};

export default Home;
