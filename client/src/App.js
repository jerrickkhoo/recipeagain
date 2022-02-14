import { Route, Routes, Link, Outlet, Navigate } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router";
import { useState, useEffect, createContext } from "react";
import Home from "./components/Home";
import RecipeShowPage from "./pages/RecipeShowPage";
import Favourites from "./components/Favourites";
import Join from "./components/Join";
import MyAccount from "./components/MyAccount";
import Login from "./components/Login";
import Login2 from "./components/Login2";
import Card from './components/Card'
import AllCards from "./components/AllCards";
import SearchResults from "./components/SearchResults";
import Search from "./components/Search";
import Edit from './components/Edit'
import NewRecipe from './components/NewRecipe'
import { set } from "mongoose";



export const AppContext = createContext();
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState('');
  const [allRecipes, setAllRecipes] = useState({});




  const navigate = useNavigate();

  const getCurrentUser = (user) => {
    setCurrentUser(user)
  }

  const getAllRecipes = (recipe) => {
    setAllRecipes(recipe);
  };

  function NotFound() {
    useEffect(() => {
      navigate("/");
    });
    return (
      <div>
        <h2>Not Found - 404</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  function handleAccount() {
    if (currentUser === '') {
      navigate("/login");
    } else {
      navigate("/myaccount");
    }
  }

  return (
    <>
      <div>
        <div className="ui inverted segment" id="nav">
          <div className="ui inverted secondary pointing menu">
            <Link className="item" to="/">
              <i class="home icon"></i>
            </Link>
            <Link className="item" to="/favourites">
              <i class="heart icon"></i>
            </Link>
            <div className="item" style={{ cursor: "pointer" }}>
              <i className="user outline icon" onClick={handleAccount}></i>
            </div>
            {/* </Link> */}
            <Link className="item" to="/search">
              <i class="search icon"></i>
            </Link>
          </div>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Home allRecipes={allRecipes} setAllRecipes={getAllRecipes} />
            }
          />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/join" element={<Join />} />
          <Route path="/searchrecipe/" element={<AllCards />} />
          <Route path="/recipe/:id" element={<Card />} />
          <Route path="/newrecipe/" element={<NewRecipe />} />
          <Route
            path="/recipes/:recipeID"
            element={<RecipeShowPage currentUser={currentUser} />}
          />
          <Route
            path="/edit"
            element={
              <Edit currentUser={currentUser} setCurrentUser={getCurrentUser} />
            }
          />
          {/* <Route
            path="/myaccount"
            element={<RequireAuth> <MyAccount user={user} setUser={setUser} /></RequireAuth>}
          /> */}
          <Route
            path="/myaccount"
            element={
              <MyAccount
                currentUser={currentUser}
                setCurrentUser={getCurrentUser}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login2
                currentUser={currentUser}
                setCurrentUser={getCurrentUser}
              />
            }
          />
          <Route
            path="/search"
            element={
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          />
          <Route
            path="/recipe/search/:search"
            element={
              <SearchResults
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                allRecipes={allRecipes}
                setAllRecipes={getAllRecipes}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
