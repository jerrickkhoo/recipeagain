import { Route, Routes, Link, Outlet } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router";
import { useState, useEffect, createContext } from "react";
import Home from "./components/Home";
import Card from "./components/Card";
import Favourites from "./components/Favourites";
import Join from "./components/Join";
import Post from "./components/Post";
import Login from "./components/Login";
import AllCards from "./components/AllCards";
import seed from "./components/models/seed_recipes";
import Search from "./components/Search";

function NotFound() {
  const navigate = useNavigate();
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

export const AppContext = createContext();

function App() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [recipes, setRecipes] = useState(seed);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [login, setLogin] = useState(""); //not login = empty string | login = user_id/name

  const filterRecipes = (recipes, query) => {
    return recipes.filter((recipe) => {
      const recipeName = recipe.name.toLowerCase();
      return recipeName.includes(query);
    });
  };

  const filteringRecipes = () => {
    if (searchQuery) {
      const filteredRecipes = filterRecipes(recipes, searchQuery);
      return filteredRecipes;
    }
  };

  return (
    <>
      <div>
        <div className="ui inverted segment" id="nav">
          <div className="ui inverted secondary pointing menu">
            <Link className="item" to="/">
              Home
            </Link>
            <Link className="item" to="/recipe/favourites">
              Favourites
            </Link>
            <Link className="item" to="/recipe/join">
              Join
            </Link>
            <Link className="item" to="/recipe/login">
              Login
            </Link>
            <Link className="item" to="/recipe/post">
              Post Recipe
            </Link>
            <Search id="searchBar" />
          </div>
        </div>
        <ul>
          {filteringRecipes()
            ? filteringRecipes()?.map((recipe, index) => (
                <li>
                  <AllCards {...recipe} key={index} />
                </li>
              ))
            : null}
        </ul>
        <AppContext.Provider value={{ loginContext: [login, setLogin] }}>
          <Routes>
            {/* <Route path="/" /> */}
            <Route path="/" element={<Home />} />
            <Route path="/recipe/favourites" element={<Favourites />} />
            {/* </Route> */}
            <Route path="/recipe/join" element={<Join />} />
            <Route path="/searchrecipe/" element={<AllCards />} />
            <Route path="/recipe/:id" element={<Card />} />
            <Route path="/recipe/post" element={<Post />} />
            <Route path="/recipe/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppContext.Provider>
      </div>
    </>
  );
}

export default App;
