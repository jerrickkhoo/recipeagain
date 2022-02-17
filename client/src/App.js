import {
  Route,
  Routes,
  Link,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useState, useEffect, createContext } from "react";
import Home from "./components/Home";
import RecipeShowPage from "./pages/RecipeShowPage";
import FavoritesPage from "./pages/FavoritesPage";
import Join from "./components/Join";
import MyAccount from "./components/MyAccount";
import Login2 from "./components/Login2";
import AllCards from "./components/AllCards";
import SearchResultsName from "./components/SearchResultsName";
import Search from "./components/Search";

import MyPostPage from "./pages/MyPostPage";
import Edit from './components/Edit'
import RecipeCreatePage from './pages/RecipeCreatePage'
import RecipeEditPage from './pages/RecipeEditPage'


import TagsPage from "./pages/TagsPage";

export const AppContext = createContext();
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [allRecipes, setAllRecipes] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const getCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const getAllRecipes = (recipe) => {
    setAllRecipes(recipe);
  };

  const getIsLoggedIn = (status) => {
    setIsLoggedIn(status);
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

  const ProtectedRoute = ({ children, redirectTo }) => {
    return isLoggedIn ? children : <Navigate to={redirectTo} />;
  };

  //console.log('allRecipes',allRecipes)
  console.log("currentUser", currentUser);
  return (
    <>
      <div>
        <div className="ui inverted segment" id="nav">
          <div className="ui inverted secondary pointing menu">
            <div className="navbar">
              <Link className="item" to="/">
                <i style={{ color: "gold" }} class="home icon "></i>
                <div style={{ color: "gold" }} className="font">
                  Home
                </div>
              </Link>
            </div>
            <div
              className="navbar"
              style={{ display: isLoggedIn ? "block" : "none" }}
            >
              <Link className="item" to="/favorites">
                <i style={{ color: "gold" }} class="star icon"></i>
                <div style={{ color: "gold" }} className="font">
                  Favorites
                </div>
              </Link>
            </div>
            <div
              className="navbar"
              style={{
                display: isLoggedIn ? "block" : "none",
                whiteSpace: "nowrap",
              }}
            >
              <Link className="item" to="/recipes/new">
                <i
                  style={{ color: "gold" }}
                  class="plus square outline icon"
                ></i>
                <div style={{ color: "gold" }} className="font">
                  New Recipe
                </div>
              </Link>
            </div>
            <div
              className="navbar"
              style={{
                display: isLoggedIn ? "block" : "none",
                whiteSpace: "nowrap",
              }}
            >
              <Link className="item" to="/myposts">
                <i
                  style={{ color: "gold" }}
                  class="lemon icon"
                ></i>
                <div style={{ color: "gold" }} className="font">
                  My Recipes
                </div>
              </Link>
            </div>
            <div className="navbar" id="myaccount">
              <Link className="item" to="/myaccount">
                <i style={{ color: "gold" }} className="user outline icon"></i>
                <div style={{ color: "gold" }} className="font">
                  My Account
                </div>
              </Link>
            </div>
            <div id="search">
              <Link className="item" to="/search">
                <i style={{ color: "gold" }} class="search icon"></i>
                <div style={{ color: "gold" }} className="font">
                  Search
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Home allRecipes={allRecipes} setAllRecipes={getAllRecipes} />
            }
          />

          <Route
            path="/myposts"
            element={
              <ProtectedRoute redirectTo="/login">
                <MyPostPage currentUser={currentUser} allRecipes={allRecipes} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute redirectTo="/login">
                <FavoritesPage
                  currentUser={currentUser}
                  allRecipes={allRecipes}
                />
              </ProtectedRoute>
            }
          />

          <Route path="/join" element={<Join />} />
          <Route path="/searchrecipe/" element={<AllCards />} />
          <Route path="/recipes/tags/tagID" element={<TagsPage />} />
          <Route
            path="/recipes/new"
            element={
              <ProtectedRoute redirectTo="/login">
                <RecipeCreatePage currentUser={currentUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes/:recipeID"
            element={
              <RecipeShowPage
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/recipes/:recipeID/edit"
            element={
              <ProtectedRoute redirectTo="/login">
                <RecipeEditPage
                  currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit"
            element={
              <ProtectedRoute redirectTo="/login">
                <Edit
                  currentUser={currentUser}
                  setCurrentUser={getCurrentUser}
                  isLoggedIn={isLoggedIn}
                />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/myaccount"
            element={<RequireAuth> <MyAccount user={user} setUser={setUser} /></RequireAuth>}
          /> */}
          <Route
            path="/myaccount"
            element={
              <ProtectedRoute redirectTo="/login">
                <MyAccount
                  currentUser={currentUser}
                  setCurrentUser={getCurrentUser}
                  setIsLoggedIn={getIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <Login2
                currentUser={currentUser}
                setCurrentUser={getCurrentUser}
                setIsLoggedIn={getIsLoggedIn}
              />
            }
          />
          <Route
            path="/search"
            element={
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                allRecipes={allRecipes}
                setAllRecipes={getAllRecipes}
              />
            }
          />
          <Route
            path="/search/:searchID"
            element={
              <SearchResultsName
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                allRecipes={allRecipes}
                setAllRecipes={getAllRecipes}
              />
            }
          />

          <Route
            path="/tags/:tagID"
            element={
              <TagsPage allRecipes={allRecipes} setAllRecipes={getAllRecipes} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
