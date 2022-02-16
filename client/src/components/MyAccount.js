import { useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const MyAccount = ({ setCurrentUser, currentUser, setIsLoggedIn }) => {
  const navigate = useNavigate();

  console.log(currentUser)

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await axios.get(`/api/users/${currentUser?._id}`);
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
  };

  const handleEdit = () => {
    navigate("/edit");
  };

  // const handleNewRecipe = () => {
  //   navigate("/recipes/new");
  // };

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

        <div style={{ paddingTop: "50px" }}>
        <Link to="/recipes/new">
        <button class="ui button" >
            Create NewRecipe
          </button>
        </Link>
        </div>
  
      </div>
    </div>
  );
};

export default MyAccount;
