import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "semantic-ui-react";

const MyPostPage = ({ currentUser, allRecipes }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [currPosts, setCurrPosts] = useState([]);
  const [ratings, setRatings] = useState({});

  //get all posts
  const fetchCurrPosts = async () => {
    setStatus("pending");
    // console.log('fetching currposts')
    // console.log('currentUser', currentUser)
    const response = await axios.get(`/api/users/${currentUser._id}/posts`);
    setStatus("complete");

    const foundPosts = response.data.data.posts;
    console.log("foundPosts", foundPosts);
    setCurrPosts(foundPosts);
  };
  useEffect(() => {
    fetchCurrPosts();
  }, []);

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

  if (status === "pending") {
    return "LOADING";
  }

  if (status === "error") {
    return "NO DATA FOUND";
  }

  const deleteRecipe = async (recipeID, recipeName) => {
    await axios.delete(`/api/recipes/${recipeID}`);
    alert(`${recipeName} deleted`);
    navigate("/myposts");
  };

  const postArray = currPosts.map((item, index) => {
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
                <i
                  id="deleterecipe"
                  class="trash alternate outline icon"
                  onClick={() => deleteRecipe(item._id, item.name)}
                ></i>
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
        <h1 className="titles">Shhhh! My secret recipes</h1>
      </div>
      {currPosts.length > 0 ? (
        <div className="randomCards">{postArray}</div>
      ) : (
        <div>
          <h1 className="titles" style={{ textAlign: "center" }}>
            ...
          </h1>
          <h1 className="titles" style={{ textAlign: "center" }}>
            ...
          </h1>

          <h1 className="titles" style={{ textAlign: "center" }}>
            ...
          </h1>
          <h1 className="titles" style={{ textAlign: "center" }}>
            Sharing is caring y'know
          </h1>
        </div>
      )}
    </div>
  );
};

export default MyPostPage;
