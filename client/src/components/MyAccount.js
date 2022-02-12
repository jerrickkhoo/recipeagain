import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const MyAccount = () => {
  const navigate = useNavigate();
    const { userID } = useParams();

  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
      const fetchUser = async () => {
          const fetchedUser = await axios.get(`/api/users/${userID}`)
          // console.log(fetchedUser)
          setCurrentUser(fetchedUser?.data?.data)
      }
      fetchUser()
  },[userID])

  const handleSubmit = async (e) => {
  e.preventDefault()
  await axios.post('/api/users/logout')
  navigate(-1,{replace: true})
}


  return (
    <div>
      <h1>Account Details</h1>
      <p>Username: {currentUser?.username}</p>
      <p>E-Mail: {currentUser?.email}</p>
    <form class="ui form" onSubmit={handleSubmit}>
        <button class="ui button" type="submit">
          Log Out
        </button>
      </form>
    </div>
  );
};

export default MyAccount;
