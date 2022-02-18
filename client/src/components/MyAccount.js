import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const MyAccount = ({ setCurrentUser, currentUser, setIsLoggedIn, isLoggedIn }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  console.log(currentUser)
  console.log(isLoggedIn)

  useEffect(() => {
    const fetchUser = async () => {
          setStatus("pending");
      const fetchedUser = await axios.get(`/api/users/${currentUser?._id}`);
          setStatus("complete");
      // sessionStorage.setItem("user", JSON.stringify(fetchedUser?.data?.data));
      console.log(fetchedUser)
    };
    fetchUser();
  }, [currentUser?._id]);
  
  // const user = JSON.parse(sessionStorage.getItem('user'))
  // console.log(user)

  const handleLogOut = async (e) => {
    e.preventDefault();
    await axios.post("/api/users/logout");
    localStorage.removeItem("user");
    setCurrentUser("");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.delete(`/api/users/${currentUser?._id}`);
    alert("Account deleted");
    navigate("/login");
    setCurrentUser("")
    setIsLoggedIn(false)
  };

  const handleEdit = () => {
    navigate("/edit");
  };

  const handleNewRecipe = () => {
    navigate("/recipes/new");
  };

 if (status === "pending") {
   return "LOADING";
 }

 if (status === "error") {
   return "NO DATA FOUND";
 }

  return (
    
    <div style={{backgroundColor:'lightyellow', paddingBottom:'100%'}}>
      <div id="homebanner">
        <h1 className="titles">My Account</h1>
      </div>
      <div className="homepage" style={{ padding: "0 50px" }}>
        <div className="myaccount">
          <div
            id="accountchild"
            style={{ paddingTop: "50px", textAlign: "center" }}
          >
            <Link to="/myposts">
              <button
                class="ui button"
                style={{
                  backgroundColor: "gold",
                  color: "black",
                }}
              >
                My Recipes
              </button>
            </Link>
          </div>

          <form
            class="ui form"
            onSubmit={handleEdit}
            style={{ paddingTop: "50px", textAlign: "center" }}
            id="accountchild"
          >
            <button
              className="accountchild"
              class="ui button"
              type="submit"
              style={{
                backgroundColor: "gold",
                color: "black",
              }}
            >
              Edit Account
            </button>
          </form>
          <form
            class="ui form"
            onSubmit={handleDelete}
            style={{ paddingTop: "50px", textAlign: "center" }}
            id="accountchild"
          >
            <button
              class="ui button"
              type="submit"
              style={{
                backgroundColor: "gold",
                color: "black",
              }}
            >
              Delete Account
            </button>
          </form>
          <form
            class="ui form"
            onSubmit={handleLogOut}
            style={{ paddingTop: "50px", textAlign: "center" }}
            id="accountchild"
          >
            <button
              class="ui button"
              type="submit"
              style={{
                backgroundColor: "gold",
                color: "black",
              }}
            >
              Log Out
            </button>
          </form>
        </div>
        <div style={{ paddingTop: "100px", textAlign: "center" }}>
          <h3 style={{ fontSize: "28px" }} id="font">
            Username: {currentUser?.username}
          </h3>
          <h3 style={{ fontSize: "28px" }} id="font">
            E-Mail: {currentUser?.email}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
