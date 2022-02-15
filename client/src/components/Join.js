import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Join = () => {
const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  const newUser = {
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };
  await axios
    .post("/api/users/join", newUser)
    .then((response) => {
     alert("Account created, please log into your account.");
     navigate(-1, { replace: true });
    })
    .catch((error) => {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    });
}

  return (
    <div>
      <div className='login' style={{padding:'100px'}}>
      <h2>Create Account</h2>
      <form class="ui form" onSubmit={handleSubmit}>
        <div class="field">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" required />
        </div>
        <div class="field">
          <label>E-Mail</label>
          <input type="text" name="email" placeholder="E-Mail" required />
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" required/>
        </div>

        <button class="ui button" type="submit" style={{marginBottom:'20px'}}>
          Submit
        </button>
      </form>
      <a href='/login'>Log In</a>
    </div>
    </div>
  );
};

export default Join;
