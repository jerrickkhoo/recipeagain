import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const MyAccount = (props) => {
  const navigate = useNavigate();
  
  let setCurrentUser = props.setCurrentUser
  let currentUser = props.currentUser;

  
  // console.log(currentUser)
  // console.log(props.user)
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await axios.get(`/api/users/${props.user}`)
      setCurrentUser(fetchedUser?.data?.data)
    }
    fetchUser()
  },[props.user])
  
 

  const handleLogOut = async (e) => {
  e.preventDefault()
  props.setUser('')
  await axios.post('/api/users/logout')
  navigate('/login')
}

const handleDelete = async (e) => {
  e.preventDefault();
  await axios.delete(`/api/users/${props.user}`);
  alert('Account deleted')
  navigate("/login");
};

const handleEdit = () => {
  navigate('/edit')
}

  return (
    <div>
      <div className="home" style={{ padding: "100px" }}>
        <h1>Account Details</h1>
        <h3>Username: {currentUser?.username}</h3>
        <h3>E-Mail: {currentUser?.email}</h3>
        <form
          class="ui form"
          onSubmit={handleLogOut}
          style={{ paddingTop: "50px" }}
        >
          <button class="ui button" type="submit">
            Log Out
          </button>
        </form>
        <form
          class="ui form"
          onSubmit={handleEdit}
          style={{ paddingTop: "50px" }}
        >
          <button class="ui button" type="submit">
            Edit Account
          </button>
        </form>
        <form
          class="ui form"
          onSubmit={handleDelete}
          style={{ paddingTop: "50px" }}
        >
          <button class="ui button" type="submit">
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
