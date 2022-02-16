import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const MyPostPage = ({ currentUser }) => {

  const [currPosts, setCurrPosts] = useState([])

  //get all posts

  //remove post button that delete recipe from recipe table and remove recipeID from user posts
  return (
    <div>
        <h1>Hello {currentUser.username?.charAt(0).toUpperCase() + currentUser.username?.slice(1)}!</h1>
        <h2>Below are your posted recipes:</h2>
      
    </div>
  );

};

export default MyPostPage;
