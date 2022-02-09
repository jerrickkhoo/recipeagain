import React from "react";
import seed from "./models/seed_recipes";
import { Link } from "react-router-dom";

const Home = () => {
  const randomArr = [];
  let num = 0;

  for (let i = 0; i < 2; i++) {
    const randomNum = (number) => {
      let num = Math.floor(Math.random() * number) + 1;
      return num;
    };
    num = randomNum(8);
    const item = seed[num];
    randomArr.push(item);
  }

  const randomCards = randomArr.map((item, index) => {
    return (
      <Link to={"/recipe/" + num} key={index}>
        <div className="ui card">
          <div className="image">
            <img src={item?.imageURL} alt={item?.originalURL} />
          </div>
          <div className="content">
            <div className="header">{item?.name}</div>
            <div className="meta">
              <div>Servings: {item?.servings}</div>
              <div>Rating:{item?.rating} </div>
            </div>
            {/* <div className="ui star rating" data-rating="2"></div> */}
          </div>
        </div>
      </Link>
    );
  });

  return <div>{randomCards}</div>;
};

export default Home;
