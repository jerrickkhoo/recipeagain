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
    <div style={{ backgroundColor: "lightyellow", paddingBottom: "100%" }}>
      <div id="homebanner">
        <h1 className="titles">Join Us</h1>
      </div>
      <div className="login" style={{ padding: "100px" }}>
        <form class="ui form" onSubmit={handleSubmit}>
          <div class="field">
            <label id="font">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div class="field">
            <label id="font">E-Mail</label>
            <input type="text" name="email" placeholder="E-Mail" required />
          </div>
          <div class="field">
            <label id="font">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <button
            class="ui button"
            type="submit"
            id="font"
            style={{
              marginBottom: "20px",
              color: "black",
              backgroundColor: "gold",
            }}
          >
            Submit
          </button>
        </form>
        <a id="font" style={{ color: "gold" }} href="/login">
          Log In
        </a>
      </div>
    </div>
  );
};

export default Join;
