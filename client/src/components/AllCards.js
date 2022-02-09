import React from "react";
import { useState } from "react";
import seed from "./models/seed_recipes";
console.log(seed);

const AllCards = () => {
  const [recipe, setRecipe] = useState(seed);
  console.log(recipe);
  const cards = recipe.map((item, index) => {
    return <AllCards {...item} key={index} />;
  });

  return (
    <>
      <div className="ui card">
        <a className="image" href="#">
          <img src="/images/avatar/medium/steve.jpg" />
        </a>
        <div className="content">
          <a className="header" href="#">
            Steve Jobes
          </a>
          <div className="meta">
            <a>Last Seen 2 days ago</a>
          </div>
        </div>
      </div>
      <div>AllCards</div>
    </>
  );
};

export default AllCards;
