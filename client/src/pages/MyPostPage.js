import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "semantic-ui-react";


const MyPostPage = ({ currentUser, allRecipes }) => {

  const [currPosts, setCurrPosts] = useState([])
  const [ratings, setRatings] = useState({});

  //get all posts
  const fetchCurrPosts = async () => {

    console.log('fetching currposts')
    console.log('currentUser', currentUser)
    const response = await axios.get(`/api/users/${currentUser._id}/posts`)
    const foundPosts = response.data.data.posts
    console.log('foundPosts', foundPosts)
    setCurrPosts(foundPosts)
  }
  useEffect(() => {
    fetchCurrPosts()
  }, [])



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
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                {item?.name}
              </div>
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
  })
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
