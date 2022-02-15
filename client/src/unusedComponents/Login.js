import React, { useContext, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { AppContext } from "../App";

const validInput = (input, type) => {
  switch (type) {
    case "email":
      const specialCharRegex = /[!|#|$|%|^|&|*|(|)|,|?|"|:|{|}|||<|>]/g;
      if (input === "") {
        return `${type} cannot be empty`;
      } else if (input.match(specialCharRegex)) {
        return `special characters other than @ . are not allowed`;
      }
      break;

    case "password":
      if (input === "") {
        return `${type} cannot be empty`;
      }
    default:
      break;
  }
};

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();

  let { loginContext } = useContext(AppContext);
  const [login, setLogin] = loginContext;
  const [errMsg, setErrMsg] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();

    if(event.target.email.value === ""){
      setErrMsg("email cannot be empty");
      return;
    }else if(event.target.password.value === ""){
      setErrMsg("password cannot be empty");
      return;
    }else {
      setErrMsg("Login-ing");
    }
    fetch("http://localhost:5000/session/", {
      method: "POST",
      //must be same as schema
      body: JSON.stringify({
        username: event.target.email.value,
        password: event.target.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        // setLogin(true);
        navigate(from, { replace: true });
      })
      .catch((error) => console.error({ Error: error }));
  };

  return (
    <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui teal image header">
          {/* <img src="assets/images/logo.png" className="image" /> */}
          <div className="content">Log-in to your account</div>
        </h2>
        <p>{errMsg}</p>
        <form className="ui large form" onSubmit={handleSubmit}>
          <label htmlFor="email" />
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail address"
                  onChange={(event) =>
                    setErrMsg(validInput(event.target.value, "email"))
                  }
                />
              </div>
            </div>
            <label htmlFor="password" />
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(event) =>
                    setErrMsg(validInput(event.target.value, "password"))
                  }
                />
              </div>
            </div>
            <input
              type="submit"
              value="Login"
              className="ui fluid large teal submit button"
            />
          </div>

          <div className="ui error message"></div>
        </form>

        <div className="ui message">
          New to us? <a href="#">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
