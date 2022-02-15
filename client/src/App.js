import { Route, Routes, Link, Outlet,useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect, createContext } from "react";
import Home from "./components/Home";
import RecipeShowPage from "./pages/RecipeShowPage";
import FavoritesPage from "./pages/FavoritesPage";
import Join from "./components/Join";
import MyAccount from "./components/MyAccount";
import Login2 from "./components/Login2";
import AllCards from "./components/AllCards";
import SearchResults from "./components/SearchResults";
import Search from "./components/Search";
import Edit from './components/Edit'
import RecipeCreatePage from './pages/RecipeCreatePage'
import RecipeEditPage from './pages/RecipeEditPage'
import TagsPage from "./pages/TagsPage";

export const AppContext = createContext();
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState('');
  const [allRecipes, setAllRecipes] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate();

  const getCurrentUser = (user) => {
    setCurrentUser(user)
  }

  const getAllRecipes = (recipe) => {
    setAllRecipes(recipe);
  };

  const getIsLoggedIn = (status) => {
    setIsLoggedIn(status)
  }

  
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
  const ProtectedRoute = ( {children, redirectTo}) => {
      return isLoggedIn ? children : <Navigate to={redirectTo} />
  }
  
  //console.log('allRecipes',allRecipes)
  console.log('currentUser',currentUser)
  return (
    <>
      <div>
        <div className="ui inverted segment" id="nav">
          <div className="ui inverted secondary pointing menu">
            <Link className="item" to="/">
              <i class="home icon"></i>
            </Link>
            <Link className="item" to="/favorites">
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
          <Route path="/favorites" element={<FavoritesPage currentUser={currentUser}/>} />
          <Route path="/join" element={<Join />} />
          <Route path="/searchrecipe/" element={<AllCards />} />
          <Route
            path="/recipes/new"
            element={
              <ProtectedRoute redirectTo="/login">
                <RecipeCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes/:recipeID"
            element={<RecipeShowPage currentUser={currentUser} />}
          />
          <Route
            path="/recipes/:recipeID/edit"
            element={
              <ProtectedRoute redirectTo="/login">
                <RecipeEditPage currentUser={currentUser} />
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
