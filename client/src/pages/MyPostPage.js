import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const MyPostPage = ({ currentUser }) => {

  const [currPosts, setCurrPosts] = useState([])

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

  const handleClickDeletePost = async (recipeID) => {
    await axios.delete(`/api/recipes/${recipeID}`)
    const updateUser = await axios.put(`/api/users/${currentUser._id}/removepost`)
    console.log('updateUserpost',updateUser.data.data.posts)
    setCurrPosts(currPosts.filter(post=>post._id!==recipeID))
  }

  const postArray = currPosts.map((post, i) => {
    return (
      <>
        <li>
          <Link to={`/recipes/${post._id}`}><h4>{post.name}</h4></Link>
          
          <button onClick={() => handleClickDeletePost(post._id)}>Delete Post</button>
          <p>{post.description}</p>
          <div>
            <img src={post.image} alt='' width="500px"></img>
          </div>
          <br /><br />
        </li>
      </>
    )
  })
  return (
    <div>
      <h1>Hello {currentUser.username?.charAt(0).toUpperCase() + currentUser.username?.slice(1)}!</h1>
      <h2>Below are recipes you posted:</h2>
      {(currPosts.length>0)
      ?
      <ol>
        {postArray}
      </ol>
      : 
      <>
      <p>You have not posted any recipes yet.</p>
      <Link to='/recipes/new'>Create new recipe here!</Link>
      </>
}
    </div>
  );

};

export default MyPostPage;
