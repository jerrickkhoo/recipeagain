import { Route, Routes, Link, Outlet } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router";
import { useState, useEffect, createContext } from "react";
import Home from "./components/Home";
import Card from "./components/Card";
import Favourites from "./components/Favourites";
import Join from "./components/Join";
import MyAccount from "./components/MyAccount";
import Login from "./components/Login";
import Login2 from "./components/Login2";
import AllCards from "./components/AllCards";
import SearchResults from "./components/SearchResults";
import seed from "./components/models/seed_recipes";
import Search from "./components/Search";

export const AppContext = createContext();

function App() {
  const { search } = window.location;
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState(seed);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [login, setLogin] = useState(""); //not login = empty string | login = user_id/name

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
  // const filterRecipes = (recipes, query) => {
  //   return recipes.filter((recipe) => {
  //     const recipeName = recipe.name.toLowerCase();
  //     return recipeName.includes(query);
  //   });
  // };

  // const filteringRecipes = () => {
  //   if (searchQuery) {
  //     const filteredRecipes = filterRecipes(recipes, searchQuery);
  //     return filteredRecipes;
  //   }
  // };

  return (
    <>
      <div>
        <div className="ui inverted segment" id="nav">
          <div className="ui inverted secondary pointing menu">
            <Link className="item" to="/">
              Home
            </Link>
            <Link className="item" to="/favourites">
              Favourites
            </Link>
            <Link className="item" to="/myaccount">
              My Account
            </Link>
            <Link className="item" to="/login">
              <i class="user outline icon"></i>
            </Link>
            <Link className="item" to="/search">
              <i class="search icon"></i>
            </Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/join" element={<Join />} />
          <Route path="/searchrecipe/" element={<AllCards />} />
          <Route path="/recipe/:id" element={<Card />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/login" element={<Login2 />} />
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
