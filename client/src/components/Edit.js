import React from 'react'
import { useNavigate, useEffect } from 'react-router-dom';
import axios from "axios";


const Edit = (props) => {
const navigate = useNavigate();


    const handleSubmit = async (e) => {
      e.preventDefault();
      const editUser = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
      props.setUser(e.target.email.value)
      await axios.put(`/api/users/${props.user}`, editUser);
      navigate('/myaccount');
    };

    console.log(props.currentUser)
  return (
    <div>
      <div className="login" style={{ padding: "100px" }}>
        <h2>Edit Details</h2>
        <form class="ui form" onSubmit={handleSubmit}>
          <div class="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              defaultValue={props?.currentUser?.username}
            />
          </div>
          <div class="field">
            <label>E-Mail</label>
            <input
              type="text"
              name="email"
              placeholder="E-Mail"
              defaultValue={props?.currentUser?.email}
            />
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>

          <button class="ui button" type="submit">
            Submit
          </button>
        </form>
        <a href="/login">Log In</a>
      </div>
    </div>
  );
}

export default Edit