
import React from 'react'
import { useNavigate, useEffect, Link  } from 'react-router-dom';
import axios from "axios";


const Edit = ({currentUser, setCurrentUser}) => {
const navigate = useNavigate();

//    const user = JSON.parse(localStorage.getItem("data"));
//   console.log(user)



    const handleSubmit = async (e) => {
        e.preventDefault();
      const editUser = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
      await axios.put(`/api/users/${currentUser?._id}`, editUser)
      .then((response) => {
        console.log(response)
        setCurrentUser(response?.data?.data);
        alert('Changes Saved')
        navigate('/myaccount');
        
      })
      .catch((error) => {
        console.log(error.response.data.message);
        alert(error.response.data.message);
    });
    };

    // console.log(props.currentUser)
  return (
    <div style={{ backgroundColor: "lightyellow", paddingBottom: "100%" }}>
      <div id="homebanner">
        <h1 className="titles">Edit Details</h1>
      </div>
      <div className="login" style={{ padding: "100px" }} id="font">
        <form
          class="ui form"
          onSubmit={handleSubmit}
          style={{ paddingBottom: "30px" }}
        >
          <div class="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              defaultValue={currentUser?.username}
            />
          </div>
          <div class="field">
            <label>E-Mail</label>
            <input
              type="text"
              name="email"
              placeholder="E-Mail"
              defaultValue={currentUser?.email}
            />
          </div>
          <div class="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Please enter new password"
              required
            />
          </div>

          <button
            class="ui button"
            type="submit"
            style={{
              backgroundColor: "gold",
              color: "black",
            }}
          >
            Submit
          </button>
        </form>
        <Link style={{ color: "gold" }} to="/myaccount">
          Back to MyAccount
        </Link>
      </div>
    </div>
  );
}

export default Edit
