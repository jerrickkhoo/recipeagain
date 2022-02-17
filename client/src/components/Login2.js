import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginValidationSchema } from "./validation";

const Login2 = ({currentUser, setCurrentUser, setIsLoggedIn}) => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const {error} = LoginValidationSchema.validate(user)
    console.log("FEjoierror",error)
    if(error){
      alert(error)
      return
    } 
    //passing passing FE val, send request to BE
    await axios.post("/api/users/login", user)
    .then((response) => {
        // localStorage.setItem("user", JSON.stringify(response?.data?.data));
        // console.log(response)
        setCurrentUser(response?.data?.data)
        setIsLoggedIn(true)
        // console.log(currentUser)
        navigate("/myaccount");
    })
    .catch((err) => {
        //console.log("joierro",error);
        alert(err.response.data.message);
    });
};
  
  return (
    <div style={{ backgroundColor: "lightyellow", paddingBottom: "100%" }}>
      <div id="homebanner">
        <h1 className="titles">Log In</h1>
      </div>
      <div className="login" style={{ padding: "100px" }}>
        <form class="ui form" onSubmit={handleSubmit}>
          <div class="field">
            <label>E-Mail</label>
            <input type="text" name="email" placeholder="E-Mail" />
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>

          <button
            class="ui button"
            type="submit"
            style={{
              marginBottom: "20px",
              color: "black",
              backgroundColor: "gold",
            }}
          >
            Submit
          </button>
        </form>
        <a style={{ color: "gold" }} href="/join">
          Create an Account
        </a>
      </div>
    </div>
  );
};

export default Login2;
