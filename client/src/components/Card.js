import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import RatingButton from "./Rating";
import axios from "axios";
import AddToFavoriteBttn from "./addToFavoriteBttn";
import dayjs from "dayjs";
import joi from "joi"

const Card = ({ currentUser, recipeID, isLoggedIn }) => {
  //const { recipeID } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [currentUserisAuthor, setCurrentUserisAuthor] = useState(false);

  const fetchCurrentRecipe = async () => {
    const foundRecipe = await axios.get(`/api/recipes/${recipeID}`);
    console.log('foundRecipe',foundRecipe.data.data)
    const foundAuthor = foundRecipe.data.data?.author?._id ??'deleted user'
    console.log('foundauthor',foundAuthor)
    //console.log('test',foundRecipe.data.data.author._id===currentUser._id)
    setCurrentRecipe(foundRecipe.data.data);
    setCurrentUserisAuthor(foundAuthor===currentUser._id)
  };
  useEffect(() => {
    fetchCurrentRecipe();
  }, []);

  console.log(currentRecipe);

  const ingredients = currentRecipe?.ingredients?.map((item, index) => {
    return (
      <ul className="unorderedList" key={index}>
        <li>
          <h3 id="font2">
            {item?.name} {item?.quantity} {item?.units}
          </h3>
        </li>
      </ul>
    );
  });

  const steps = currentRecipe?.steps?.map((item, index) => {
    return (
      <ol key={index}>
        <h3 id="font2">{item}</h3>
      </ol>
    );
  });

  const tags = currentRecipe?.tags?.map((item, index) => {
    return (
      <Link to={`/tags/${item}`} style={{ paddingRight: "30px" }}>
        <a class="ui label" id="tags">
          {" "}
          {item}
        </a>
      </Link>
    );
  });

  const prep_time_hr = currentRecipe?.duration/60
  const prep_time = (Number.isInteger(prep_time_hr))
                  ?`${prep_time_hr} hr`
                  :`${Math.floor(prep_time_hr)} hr ${currentRecipe?.duration%60}mins`
  
  console.log("currentUser", currentUser);
  console.log('isLoggedIn',isLoggedIn)
  console.log('currentRecipe',currentRecipe)

  return (
    <div className="cards">
      <div className="cardHeader" style={{ paddingTop: "50px" }}>
        {/* <img className="headerBackground" src={currentRecipe?.image} alt="" /> */}
        <div className="headerBackground">
          <div class="column">
            <div class="ui fluid image" id="resize">
              <a className="ui left corner label">
                <AddToFavoriteBttn
                  recipeID={recipeID}
                  currentUser={currentUser}
                  id="favbutton"
                />
              </a>
              <img src={currentRecipe?.image} alt="" />
            </div>
          </div>
        </div>
        <div className="headerText">
          <div style={{ whiteSpace: "nowrap" }}>
            <h1 id="font2" style={{ fontSize: "45px", whiteSpace: "initial" }}>
              {currentRecipe?.name}
            </h1>
            <div>
              <Link to={`/recipes/${recipeID}/edit`}>
                <i
                  class="pencil alternate icon"
                  style={{
                    color: "black",
                    display: currentUserisAuthor ? "block" : "none",
                  }}
                ></i>
              </Link>
            </div>
          </div>
          {/* // ) : null} */}
          <h3 id="font2">recipe by {currentRecipe?.author?.username ?? "deleted user"}</h3>
          <h3 id="font2">
            on {dayjs(currentRecipe?.createdAt).format("DD-MMM-YYYY")}
          </h3>
          <a href className="ui tag label">
            {" "}
            Prep time: {prep_time}
          </a>
          <br />
          <br />
          <a href className="ui tag label">
            Servings: {currentRecipe?.servings}
          </a>
          <h2 id="font2">{currentRecipe?.description}</h2>
          <br />
        </div>
      </div>
      <div className="cardContent">
        <div className="ingredients" style={{ paddingTop: "20px" }}>
          <h2 id="font2" style={{ fontSize: "35px" }}>
            Ingredients:
          </h2>
          {ingredients}
        </div>
        <div className="ingredients" style={{ paddingTop: "20px" }}>
          <h2 id="font2" style={{ fontSize: "35px" }}>
            Steps:
          </h2>
          {steps}
        </div>
        <h1 className="font" style={{ paddingTop: "20px" }}>
          Give us your feedback
        </h1>
        <RatingButton currentUser={currentUser} />
        <h2 id="font">Want more? See our related tags below</h2>
        {tags}
      </div>
      {/* {currentUserisAuthor ? ( */}
    </div>
  );
};

export default Card;
