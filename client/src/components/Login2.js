import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login2 = () => {

const navigate = useNavigate();
const handleSubmit = async (e) => {

  e.preventDefault();
  const user = {
    email: e.target.email.value,
    password: e.target.password.value,
  };
  await axios.post("/api/users/login", user);
  navigate(-1, { replace: true });
};

  return (
    <div>
      <h2>Log In</h2>
      <form class="ui form" onSubmit={handleSubmit}>
       
        <div class="field">
          <label>E-Mail</label>
          <input type="text" name="email" placeholder="E-Mail" />
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" />
        </div>

        <button class="ui button" type="submit">
          Submit
        </button>
      </form>
      <a href='/join'>Create an Account</a>
    </div>
  );
}

export default Login2