import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { JoinValidationSchema } from "./validation";

const Join = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    //FE validation before sending post request (save the trouble)
    const { error } = JoinValidationSchema.validate(newUser)
    console.log("FEjoierror", error)
    if (error) {
      alert(error)
    } else 
    {
      //check if email already exists
      try {
        const response = await axios.get(`/api/users/login/${newUser.email}`)
        console.log('response', response.data)
        if (response.data.status === 'ok') 
        {
          alert('error, an account already exists under this email')
        }
      } catch (err1) {
            console.log('error in get email', err1)
                //after passing FE val,and confirm that the same email does not already exist, post to BE
                console.log('posting to BE')
                await axios
                  .post("/api/users/join", newUser)
                  .then((response) => {
                    alert("Account created, please log into your account.");
                    navigate("/login", { replace: true });
                  })
                  .catch((err) => {
                    let BError
                    if (err.response.data.error.details) {
                      BError = (err.response.data.error.details[0].message)
                    } else {
                      BError = (err.response.data.message)
                    }
                    alert(BError);
                  });
      }
    }
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
